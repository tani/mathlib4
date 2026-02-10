**Technical Metadata Brief: `Mathlib.Util.TermBeta`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `betaStx` | Syntax rule: `"beta% " term : term` | Defines the syntax for the `beta%` term elaborator. |
| `elabBeta` | `TermElab` | Elaborates the input term `t`, instantiates metavariables, and applies one-step `headBeta` reduction. |

- **`Lean.Expr.headBeta`** (imported from `Lean.Elab.Term` / `Mathlib.Init`):  
  Performs *one* head beta-reduction step: if the expression is of the form `(λ x, b) a`, it returns `b[a/x]`. Does *not* reduce under binders or recursively.

---

### 2. **Naming Conventions**

- **Prefix**: `beta%` — indicates a *non-recursive*, *single-step* beta reduction at the top level.
- **Syntax identifier**: `betaStx` — follows Lean’s convention of suffixing syntax rules with `Stx`.
- **Elaborator name**: `elabBeta` — follows `elab<Name>` pattern for term elaborators.

---

### 3. **Tactic / Elaboration Stack**

- **Core operations used**:
  - `elabTerm`: Term elaboration.
  - `instantiateMVars`: Instantiate metavariables (required before reduction).
  - `.headBeta`: Apply one-step head beta reduction.
- **No tactics** (e.g., `simp`, `ring`) are used — this is a *low-level elaborator*, not a tactic.

---

### 4. **Proof / Elaboration Logic Flow**

1. Parse syntax: match `beta% $t`.
2. Elaborate `t` to a `Lean.Expr` `e`, respecting `expectedType?`.
3. Instantiate metavariables in `e`.
4. Apply `headBeta` to `e`.
5. Return the reduced expression.

- **No induction**, no case analysis — purely syntactic elaboration + reduction.
- **No recursive reduction**: only the outermost redex is reduced.

---

### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Provides core Lean infrastructure, including `Lean.Expr.headBeta`. |
| `Lean.Elab.Term` | Provides term elaboration utilities: `elabTerm`, `instantiateMVars`, syntax parsing, and `TermElab`. |

---

### Summary

This module defines a lightweight, *syntax-level* beta-reduction elaborator for Lean 4, intended for use in notations (e.g., `∀ i, beta% (p i)`) to force reduction of lambda applications *at the syntax level* during elaboration — not during proof search or simplification. It is precise, non-recursive, and optimized for metaprogramming use in formalization workflows.