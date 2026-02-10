### Technical Metadata Brief: `Lean.Elab.Term.CoeImpl`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `elabPartiallyAppliedCoe` | `String → Expr → (Expr → Expr → TermElabM Expr) → TermElabM Expr` | Generic elaborator for partially applied coercion syntax (`(↑)`, `(⇑)`, `(↥)`). Validates expected function type, introduces lambda over domain, and applies user-provided coercion logic (`mkCoe`). |
| `elab "(" "↑" ")"` | Elaborator for `(↑)` | Implements partially applied *value-to-value* coercion: attempts `coerce? x b`; fails with error if no coercion exists. |
| `elab "(" "⇑" ")"` | Elaborator for `(⇑)` | Implements partially applied *value-to-function* coercion: uses `coerceToFunction? x`, then checks type equality with expected codomain `b`. |
| `elab "(" "↥" ")"` | Elaborator for `(↥)` | Implements partially applied *value-to-type* (sort) coercion: uses `coerceToSort? x`, then checks type equality with expected sort `b`. |

> **Note**: All three elaborators rely on `elabPartiallyAppliedCoe`, which enforces:
> - Expected type is a non-dependent function type (`∀ x : α, β` with `β` free of loose bound vars).
> - Delays elaboration (`tryPostpone`) if metavariables remain in domain/codomain.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `elab`: Standard for elaborator functions in Lean 4.
  - `coerce?`, `coerceToFunction?`, `coerceToSort?`: Query functions returning `Option Expr`.
- **Suffixes**:
  - `?`: Indicates partial/optional-returning functions (e.g., `coerce?`).
- **Syntax Symbols**:
  - `↑`, `⇑`, `↥`: Used consistently in both documentation and elaborator names (`"↑"`, `"⇑"`, `"↥"`).
  - Parenthesized forms `(↑)`, `(⇑)`, `(↥)` denote *partially applied* coercions (η-reduced forms of `(↑ ·)`, etc.).

---

#### **3. Tactic / Elaboration Stack**

| Tactic / Function | Role |
|-------------------|------|
| `instantiateMVars` | Resolve metavariables in expected type. |
| `withLocalDeclD` | Introduce local variable `x : α` for lambda abstraction. |
| `mkLambdaFVars` | Build lambda term `λ x, ...`. |
| `ensureHasType` | Type-check and unify expected vs actual type (fails if mismatch). |
| `tryPostpone` | Defer elaboration if metavariables prevent progress. |
| `etaExpanded?.getD f` | Apply η-expansion if available; fallback to `f`. |
| `do`-block + `←` | Standard monadic sequencing for `TermElabM`. |

---

#### **4. Proof / Elaboration Logic Flow**

1. **Type Validation**:
   - Unpack expected type as `∀ x : α, β`.
   - Reject dependent or non-function types (via pattern match + `tryPostpone`/`throwError`).
2. **Local Binding**:
   - Introduce `x : α` and elaborate body `β` using user-provided coercion logic (`mkCoe`).
3. **Coercion Application**:
   - For `(↑)`: Attempt `coerce? x b`; error if none.
   - For `(⇑)`: Extract function type via `coerceToFunction?`; verify against `b`.
   - For `(↥)`: Extract sort type via `coerceToSort?`; verify against `b`.
4. **η-Reduction**:
   - Return η-expanded lambda if possible (via `etaExpanded?`), else raw lambda.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean 4 infrastructure (not Mathlib-specific here; likely legacy). |
| `Lean.Elab.ElabRules` | Provides elaboration utilities (e.g., `elab` syntax, `TermElabM`, error reporting). |

- **Module Scope**: `Lean.Elab.Term.CoeImpl`
- **Namespace**: `Lean.Elab.Term.CoeImpl`
- **Purpose**: Extends Lean’s coercion system with *partially applied* coercion syntax, enabling concise expressions like `(↑) f x` instead of `↑(f x)` or `↑(f · x)`.

---

### Summary

This module formalizes **syntactic sugar for partially applied coercions** in Lean 4, supporting three distinct coercion directions (value → value, value → function, value → type). It leverages Lean’s elaboration monad (`TermElabM`) to validate types, defer ambiguous cases, and integrate with existing coercion infrastructure (`coerce?`, `coerceToFunction?`, `coerceToSort?`). The design emphasizes modularity via `elabPartiallyAppliedCoe`, ensuring consistent behavior across all three coercion notations.