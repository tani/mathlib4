### Technical Metadata Brief: `peel` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `quantifiers` | `List Name` — defines the set of constants treated as quantifiers: `Exists`, `And`, `Filter.Eventually`, `Filter.Frequently`. |
| `whnfQuantifier` | `Expr → Bool → MetaM Expr` — reduces an expression head-first, optionally unfolding non-quantifier definitions. |
| `throwPeelError` | `Expr → Expr → MetaM α` — throws a user-facing error when quantifier structures mismatch. |
| `mkFreshBinderName` | `Expr → MetaM Name` — generates a hygienic binder name from a lambda or fresh variable. |
| `applyPeelThm` | `Name → MVarId → Expr → Expr → Expr → Name → Name → MetaM (FVarId × List MVarId)` — applies a "peel theorem" (e.g., `forall_imp`) and introduces two variables (the peeled hypothesis and new variable). |
| `peelCore` | `MVarId → Expr → Option Name → Name → Bool → MetaM (FVarId × List MVarId)` — core logic: matches quantifier structure of hypothesis and goal, then calls `applyPeelThm`. |
| `peelArgs` | `Expr → Nat → List Name → Option Name → Bool → TacticM Unit` — peels a fixed number (`num`) of quantifiers, using provided names. |
| `peelUnbounded` | `Expr → Option Name → Bool → TacticM Bool` — peels arbitrarily many quantifiers until no more match. |
| `peelIffAux` | `TacticM Unit` — applies a congruence lemma to peel one quantifier from an `↔` goal. |
| `peelArgsIff` | `List Name → TacticM Unit` — peels `n` quantifiers from an `↔` goal, naming introduced variables. |

**Auxiliary Theorems Used Internally:**
- `and_imp_left_of_imp_imp`: `(r → p → q) → r ∧ p → r ∧ q`
- `eventually_imp`: `(∀ x, p x → q x) → (∀ᶠ x in f, p x) → ∀ᶠ x in f, q x`
- `frequently_imp`: `(∀ x, p x → q x) → (∃ᶠ x in f, p x) → ∃ᶠ x in f, q x`
- `eventually_congr`: `(∀ x, p x ↔ q x) → (∀ᶠ x in f, p x) ↔ ∀ᶠ x in f, q x`
- `frequently_congr`: `(∀ x, p x ↔ q x) → (∃ᶠ x in f, p x) ↔ ∃ᶠ x in f, q x`

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `peel*`: main tactic logic (`peelCore`, `peelArgs`, `peelUnbounded`, `peelIffAux`, `peelArgsIff`)
  - `mkFresh*`: hygienic naming (`mkFreshBinderName`, `mkFreshUserName`)
  - `throw*`: error handling (`throwPeelError`)
- **Suffixes:**
  - `*Aux`: helper functions (`peelIffAux`)
  - `*Core`: core logic (`peelCore`)
- **Variable Naming:**
  - `n?`, `n'`: hypothesis name and peeled hypothesis name
  - `l`: list of user-provided binder names
  - `e`: input hypothesis/term
  - `ty`, `target`: types of `e` and goal, respectively

---

#### **3. Tactic Stack**

Frequently used tactics and utilities:
- `liftMetaTacticAux`: lifts `MetaM` actions into `TacticM`
- `intro`, `introN`, `withContext`, `withMainContext`: binder introduction
- `applyConst`, `apply`, `assignIfDefeq`: metavariable resolution
- `whnfR`, `whnfHeadPred`: weak head normalization with custom predicate
- `getMainGoal`, `replaceMainGoal`, `clear`: goal manipulation
- `elabTermForApply`: elaborates terms for application (supports implicit binders)
- `observing?`: runs a tactic and discards failures (used for optional introspection)
- `match` on `Expr` structure (`isForall`, `getAppFn`, `getAppNumArgs`, etc.)

---

#### **4. Proof Logic / Execution Flow**

1. **Parsing**:
   - Parses optional numeric argument (`num?`), optional term (`e`), optional binder names (`l`), optional hypothesis name (`n?`), and `using e` clause.
   - If `num?` absent but `l` nonempty, uses `l.length` as `num`.

2. **Core Peeling Logic** (`peelCore`):
   - Normalize `ty = inferType e` and `target = goal.getType` via `whnfQuantifier`.
   - Match quantifier forms:
     - `∀ x, p x` ↔ `∀ x, q x` → use `forall_imp`
     - `∃ x, p x` ↔ `∃ x, q x` → use `Exists.imp`
     - `p ∧ q` ↔ `p' ∧ q'` → use `and_imp_left_of_imp_imp`
     - `∀ᶠ x in f, p x` ↔ `∀ᶠ x in f, q x` → use `eventually_imp`
     - `∃ᶠ x in f, p x` ↔ `∃ᶠ x in f, q x` → use `frequently_imp`
   - If mismatch → `throwPeelError`.

3. **Introduction & Recursion**:
   - `applyPeelThm` applies the matched theorem, introduces two variables (`n`, `n'`), and returns new goal.
   - `peelArgs`: loops `num` times, peeling one quantifier per iteration.
   - `peelUnbounded`: recursively peels until no match; returns `true` if any peeled.

4. **Iff Goals**:
   - `peelIffAux` applies congruence lemmas (`forall_congr'`, `exists_congr`, etc.) to peel outermost quantifier from `↔`.
   - `peelArgsIff` repeats this `n` times, introducing named variables.

5. **`using e` Support**:
   - Macro expands `peel ... using e` → `peel ...; exact e`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Order.Filter.Basic`: for `Filter.Eventually`, `Filter.Frequently`, and related lemmas.
- `Mathlib.Tactic.Basic`: for basic tactic infrastructure (`tactic`, `elab`, `Meta`, `Expr`, etc.).

**Scope**:
- Defined in `Mathlib.Tactic.Peel` namespace.
- Designed for use in `tactic` syntax domain.
- Supports:
  - `∀`, `∃`, `∧`, `∀ᶠ`, `∃ᶠ`
  - Quantifier chains (e.g., `∀ ε > 0, ∃ N, ∀ n ≥ N, ...`)
  - Goals of the form `↔` with quantifiers
  - Automatic or manual naming of introduced variables/hypotheses
  - Immediate goal closure via `using`

---

### Summary

The `peel` tactic is a high-level, extensible quantifier-elimination tool for Lean 4, built on top of Lean’s metavariable and tactic infrastructure. It enables structured reasoning about nested quantifiers (including filter-based ones) by applying canonical implication/congruence lemmas and introducing variables with user-specified or hygienic names. Its design emphasizes flexibility (fixed/unbounded peeling, `↔` support, `using` clause) and robustness (error reporting, hygiene).