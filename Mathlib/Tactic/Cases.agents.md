### Technical Metadata Brief: `Mathlib.Tactic` — Backward-Compatible `cases'` and `induction'` Tactics

---

#### **1. Key Definitions & Theorems**

| Name | Type / Role | Purpose |
|------|-------------|---------|
| `getAltNumFields` | `ElimInfo → Name → TermElabM Nat` | Retrieves the number of fields (i.e., arguments) for a given constructor alternative in an elimination rule. Used to parse naming arguments correctly. |
| `ElimApp.evalNames` | `ElimInfo → Array ElimApp.Alt → Syntax → … → TermElabM (Array MVarId)` | Core helper for applying elimination rules and generating subgoals with named binders. Handles variable introduction, equation unification, clearing, and local variable info annotation. |
| `induction'` | `tactic` macro | Backward-compatible variant of Lean 4’s `induction`, supporting Lean 3-style naming syntax (`with hp hq`, `| inl hp => ...`). Uses `ElimApp.evalNames` to manage subgoal naming. |
| `cases'` | `tactic` macro | Backward-compatible variant of Lean 4’s `cases`, with similar naming syntax. Supports equation generalization (`numEqs`) and clearing of original hypotheses. |
| `getElimNameInfo` *(imported)* | `… → TermElabM ElimInfo` | Retrieves elimination info (e.g., induction/cases principle) for a target type. Used by both `induction'` and `cases'`. |
| `generalizeTargetsEq` *(imported)* | `MVarId → Expr → Array Expr → MVarId × Array Expr` | Generalizes target expressions with equalities (used in `cases'` to handle dependent types). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `get*`: Functions that extract or compute data (e.g., `getAltNumFields`, `getFVarIds`).
  - `eval*`: Functions that execute core tactic logic (e.g., `evalNames`).
  - `*App`: Refers to elimination application structures (e.g., `ElimApp`, `mkElimApp`).
- **Suffixes**:
  - `'` (prime): Denotes backward-compatible variants (e.g., `cases'`, `induction'`).
  - `N`, `NP`: For multi-introduction tactics (`introN`, `introNP`).
- **Other**:
  - `toClear`, `toTag`, `generalized`: Parameter names reflecting intent (variables to clear, tag info, generalized vars).
  - `altVarNames`, `subgoals`, `elimArgs`: Reflect internal data flow in elimination-based tactics.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities in this file:

| Tactic / Utility | Usage |
|------------------|-------|
| `introN`, `introNP` | Introduce multiple hypotheses with names (used in `evalNames`). |
| `Cases.unifyEqs?` | Solve definitional equalities introduced by `cases` (e.g., for inductive families). |
| `liftM`, `foldlM`, `foldl` | Monadic and functional iteration over lists/arrays (e.g., for substitution updates). |
| `getFVarIds`, `mkFVar`, `FVarId` | Management of free variables (hypotheses/variables in context). |
| `withRef`, `withContext` | Contextual scoping for error reporting and metavariable resolution. |
| `setGoals`, `assign`, `withMVarId` | Goal management and metavariable assignment. |
| `elabCasesTargets`, `elab` | Elaboration of tactic syntax (e.g., parsing `with hp hq`). |
| `generalizeTargetsEq` *(from `Lean.Elab.Tactic.Induction`)* | Generalizes targets with equalities before case analysis. |

---

#### **4. Proof Logic / Execution Flow**

- **Shared structure**:
  1. Parse and elaborate tactic arguments (`tgts`, `withArg`, `genArg`, etc.).
  2. Retrieve elimination info (`getElimNameInfo`) for the target type.
  3. Build elimination application (`mkElimApp`) and assign it to the current goal.
  4. For each alternative (constructor), extract the number of fields and binders.
  5. Introduce variables with user-provided names (or auto-generated fallbacks).
  6. Solve equalities (if any), generalize, clear, and annotate local variable info.
  7. Return list of generated subgoals.

- **`cases'`-specific**:
  - Adds `numEqs := targets.size` to `evalNames` to handle equations from inductive families.
  - Calls `generalizeTargetsEq` before elimination to handle dependent types.

- **`induction'`-specific**:
  - Supports `generalizing` clause to override automatic generalization.
  - Reverts variables before elimination, then re-introduces them in subgoals.
  - Uses `generalized := fvarIds` in `evalNames`.

- **Backward compatibility**:
  - Uses `withArg` to parse `with hp hq` or `| inl hp => ...` syntax.
  - Avoids Lean 4’s structured `case ... =>` syntax in favor of Lean 3-style alternatives.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Lean.Elab.Tactic.Induction` | Provides core elimination infrastructure (`getElimNameInfo`, `generalizeTargetsEq`, `generalizeVars`, etc.). |
| `Batteries.Tactic.OpenPrivate` | Enables access to private/protected definitions (e.g., `getElimNameInfo` is `open private` imported). |
| `Mathlib.Lean.Expr.Basic` | Basic expression utilities (e.g., `mkFVar`, `instantiateMVars`). |
| `Batteries.Data.List.Basic` | List utilities (e.g., `splitAtD`, `zip`). |

---

### Summary

This module provides **Lean 3-compatible variants** of `cases` and `induction`, preserving the `with`/`|` syntax for naming constructors. It leverages Lean 4’s elimination infrastructure (`ElimApp`, `getElimNameInfo`) but customizes naming and goal management via `evalNames`. Designed for backward compatibility, it is superseded by Lean 4’s structured `cases`/`induction` in new code, but remains useful for porting or style consistency.

Let me know if you'd like a formalized spec or a comparison table with Lean 4’s native tactics.