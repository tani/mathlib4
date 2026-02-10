### Technical Metadata Brief: `Mathlib.Tactic.Conv.Change`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `changeLocalDecl'` | `MVarId → FVarId → Expr → MetaM MVarId` | Safely updates a local hypothesis’s type *while preserving variable order*, using `withReverted` to avoid scoping issues. |
| `runDefEqTactic` | `(Option FVarId → Expr → MetaM Expr) → Option location → String → Bool → TacticM Unit` | Generic tactic engine for transforming expressions *definitionally* at given locations (hypotheses or target). Supports optional definitional equality checking. |
| `runDefEqConvTactic` | `(Expr → MetaM Expr) → TacticM Unit` | Conv-mode variant of `runDefEqTactic`, operating on the left-hand side of a `conv` goal. |
| `unfoldFVars` | `Array FVarId → Expr → MetaM Expr` | Unfolds specified let-bound variables (zeta reduction) in an expression. |
| `refoldFVars` | `Array FVarId → Option FVarId → Expr → MetaM Expr` | Inverse of `unfoldFVars`: replaces let-bodies with their bound variables (zeta *expansion*). |
| `unfoldProjs` | `Expr → MetaM Expr` | Recursively unfolds projections of class instances (e.g., `Prod.fst`, `Mul.mul`). |
| `etaReduceAll` | `Expr → MetaM Expr` | Performs full eta-reduction on all subterms (e.g., `fun x => f x ↦ f`). |
| `etaExpandAll` | `Expr → MetaM Expr` | Performs full eta-expansion (e.g., `f ↦ fun x y => f x y`), also beta-reduces pre-existing eta-redexes. |
| `getProjectedExpr` | `Expr → MetaM (Option (Name × Nat × Expr))` | Extracts structure name, field index, and object from a projection application (`x.f`, `proj S i x`, or registered projection function). |
| `etaStruct?` | `Expr → Bool → MetaM (Option Expr)` | Detects and simplifies structure constructor applications via eta-reduction (e.g., `(x.1, x.2) ↦ x`). |
| `etaStructAll` | `Expr → MetaM Expr` | Applies `etaStruct?` recursively to all subterms. |

**Theorems / Properties (implicit)**:
- All transformations preserve definitional equality (`isDefEq` is used for validation when `checkDefEq := true`).
- `etaStruct?` relies on the *structure eta rule* (`isDefEq` check) to validate correctness.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `runDefEq*`: Generic tactic combinators for definitional transformations.
  - `*All`: Recursive application over expression trees (`etaReduceAll`, `etaStructAll`, `unfoldProjs`).
  - `get*`: Extractors returning `MetaM (Option _)`.
- **Suffixes**:
  - `?`: Returns `Option` (e.g., `etaStruct?`).
  - `Stx`: Syntax rule names (e.g., `betaReduceStx`, `etaStructStx`).
- **Tactic names**:
  - `* at loc`: Operate on hypotheses/targets via `loc?`.
  - `conv` variants omit `at loc` and use `runDefEqConvTactic`.

---

#### **3. Tactic Stack**

Frequently used tactics & utilities:
- `withLocation`, `expandOptLocation`, `atLocal`, `atTarget`, `failed`
- `liftMetaTactic1`, `withMainContext`, `withReverted`, `withContext`
- `instantiateMVars`, `whnf`, `Core.betaReduce`, `reduce`, `zetaReduce`
- `transform` (from `Lean.Meta.Transform`), `kabstract`, `instantiate1`
- `isDefEq`, `throwTacticEx`, `logWarning` (for deprecation)
- `getFVarIds`, `findDecl?`, `getValue?`, `getProjectedExpr`, `getProjectionFnInfo?`

---

#### **4. Proof Logic / Execution Flow**

- **Pattern**:
  1. Parse `loc?` (e.g., `at h`, `at *`, or implicit target).
  2. Expand `loc?` to a list of locations (hypotheses/target).
  3. For each location:
     - Retrieve expression (`getType` / `getLhs` in `conv`).
     - Instantiate metavariables (`instantiateMVars`).
     - Apply transformation function `m`.
     - Validate definitional equality (if `checkDefEq`).
     - Update context via `changeLocalDecl'` (hypotheses) or `change` (target).
- **Key logic**:
  - **Hypotheses**: Use `withReverted` to avoid index conflicts when changing types.
  - **Conv mode**: Operate on `Conv.getLhs` only (left-hand side of equality).
  - **Deprecation warnings**: `unfold_let`/`refold_let` emit warnings to use `unfold` instead.

---

#### **5. Imports**

- `Mathlib.Tactic.Basic` — Provides core tactic infrastructure (`withLocation`, `liftMetaTactic1`, etc.).
- **Implicit dependencies** (via Lean core & Mathlib):
  - `Lean.Meta` (`instantiateMVars`, `whnf`, `betaReduce`, `reduce`, `transform`, `isDefEq`)
  - `Lean.Elab.Tactic` (`TacticM`, `withMainContext`, `elab_rules`)
  - `Lean.Meta.Transform` (`transform`, `LOption`)
  - `Lean.Environment` (`getEnv`, `find?`, `getProjectionFnInfo?`, `getProjectionFnInfo?`)

---

### Summary

This module provides a **unified framework** for definitional transformations in Lean 4 tactics and `conv` mode. It emphasizes **safety** (via `checkDefEq`), **correctness** (via `changeLocalDecl'` and `withReverted`), and **extensibility** (via `runDefEqTactic`). The tactics cover standard normalization steps: β, η, zeta, projection unfolding, and structure eta-reduction — all critical for equational reasoning and simplification in dependent type theory.