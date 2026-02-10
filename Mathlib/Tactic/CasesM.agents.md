### Technical Metadata Brief: `casesm`, `cases_type`, `constructorm` Tactics

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `casesMatching` | `matcher : Expr → MetaM Bool → recursive : Bool → allowSplit : Bool → throwOnNoMatch : Bool → MVarId → MetaM (List MVarId)` | Core helper: applies `cases` to all local hypotheses whose type satisfies `matcher`. Supports recursion and conditional splitting. |
| `casesType` | `heads : Array Name → recursive : Bool → allowSplit : Bool → MVarId → MetaM (List MVarId)` | Specialization of `casesMatching` where `matcher` checks if a hypothesis type head is in `heads`. |
| `elabPatterns` | `Array Term → TermElabM (Array AbstractMVarsResult)` | Elaborates user-provided pattern terms (with holes) into abstract pattern representations for matching. |
| `matchPatterns` | `Array AbstractMVarsResult → Expr → MetaM Bool` | Checks whether any of the compiled patterns match a given expression (after instantiation). |
| `constructorMatching` | `MVarId → (Expr → MetaM Bool) → recursive : Bool → throwOnNoMatch : Bool → MetaM (List MVarId)` | Applies `constructor` to the main goal if its type matches `matcher`. Supports recursion. |
| `elabCasesType` | `Array Ident → recursive : Bool → allowSplit : Bool → TacticM Unit` | Elaborator for `cases_type` and `cases_type!`. Converts syntax to global constants and invokes `casesType`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `casesM`, `casesType`, `constructorM`: tactic names (used in `elab` rules).
  - `casesMatching`, `constructorMatching`: internal matching logic.
  - `elabPatterns`, `matchPatterns`: pattern elaboration and matching utilities.
- **Suffixes**:
  - `!` (e.g., `cases_type!`): variant that disables splitting (`allowSplit := false`).
  - `*` (e.g., `casesm*`, `cases_type*`, `constructorm*`): recursive mode (`recursive := true`).
- **Structure**:
  - `cases_type` vs `casesm`: `cases_type` matches on *constant heads* (e.g., `And`, `Or`), while `casesm` matches on *user-provided patterns* (e.g., `_ ∨ _`).
  - `constructorm` mirrors `casesm` but operates on the *main goal* (not hypotheses), using `constructor`.

---

#### **3. Tactic Stack**

Frequently used tactics & utilities in implementation:

| Tactic / Utility | Role |
|------------------|------|
| `cases` | Core tactic to destruct hypotheses (inductive types). |
| `constructor` | Core tactic to introduct inductive constructors. |
| `Conv.matchPattern?` | Pattern matching engine (used in `matchPatterns`). |
| `abstractMVars` | Elaborates terms with holes into pattern placeholders. |
| `withTheReader`, `withRef`, `withoutErrToSorry`, `withoutModifyingElabMetaStateWithInfo` | Elaboration context & error handling utilities. |
| `saveState` / `restore` | Used to revert state if splitting is disallowed. |
| `getLCtx`, `withContext`, `getType`, `instantiateMVars` | Core `MetaM` utilities for introspection. |
| `liftMetaTactic` | Bridges `MetaM` (Lean 4 metaprogramming) with `TacticM`. |

---

#### **4. Proof Logic / Execution Flow**

- **`casesm` / `cases_type`**:
  1. Elaborate user patterns into abstract patterns (`elabPatterns`).
  2. Define `matcher` using `matchPatterns`.
  3. Call `casesMatching`:
     - Iterate over local context (`getLCtx`).
     - Skip implementation details (`isImplementationDetail`).
     - If `matcher type` holds:
       - Apply `cases` on the hypothesis.
       - If `allowSplit = false`, discard if >1 subgoal.
       - Recurse if `recursive = true`.
  4. Return final list of subgoals.

- **`constructorm`**:
  1. Elaborate patterns.
  2. Define `matcher`.
  3. Call `constructorMatching`:
     - Check if main goal type matches `matcher`.
     - If yes, apply `constructor`, recurse on new subgoals.
     - Else, keep goal unchanged.
  4. Return updated subgoals.

- **Common logic**:
  - **Pattern matching** via `Conv.matchPattern?`.
  - **State management** via `saveState`/`restore`.
  - **Error handling** via `throwOnNoMatch`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean + Mathlib utilities (e.g., `Meta`, `Term`, `Tactic` modules). |
| `Lean.Elab.Tactic.Conv.Pattern` | Provides `Conv.matchPattern?`, essential for pattern matching in `matchPatterns`. |

---

### Summary

These tactics (`casesm`, `cases_type`, `constructorm`) provide **high-level, pattern-driven automation** for inductive destructuring and construction. They abstract away boilerplate in repetitive `cases`/`constructor` usage, especially useful for handling nested logical connectives (e.g., `∧`, `∨`) or inductive families. The design emphasizes **modularity**, **extensibility** (via `matcher`), and **performance** (via pattern compilation in `*` variants).