### Technical Metadata Brief: `Mathlib.Tactic.Tauto`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `distribNotOnceAt` | `Expr → MVarId → MetaM AssertAfterResult` | Applies de Morgan-style transformations to a *single* hypothesis (e.g., `¬(a ∧ b) ↔ ¬a ∨ ¬b`, `¬(a → b) ↔ a ∧ ¬b`, etc.), using decidability instances where needed. Attempts to replace the hypothesis and clear the old one. |
| `DistribNotState` | `structure` | Encapsulates the state for `distribNotAt`: list of remaining hypotheses (`fvars`) and current goal (`currentGoal`). |
| `distribNotAt` | `Nat → DistribNotState → MetaM DistribNotState` | Iteratively applies `distribNotOnceAt` up to `nIters` times on the head of the hypothesis list, updating hypotheses with substitutions from each transformation. |
| `distribNotAux` | `List Expr → MVarId → MetaM MVarId` | Recursively applies `distribNotAt` to all hypotheses in a list, propagating substitutions across hypotheses. |
| `distribNot` | `TacticM Unit` | Top-level tactic that collects all non-implementation-detail hypotheses and applies `distribNotAux` to them. Always succeeds (even if no progress). |
| `coreConstructorMatcher` | `Q(Prop) → MetaM Bool` | Matches propositions suitable for `constructor` in the core loop: `∧`, `↔`, `True`. |
| `casesMatcher` | `Q(Prop) → MetaM Bool` | Matches propositions suitable for `cases` in the core loop: `∧`, `∨`, `∃`, `False`. |
| `tautoCore` | `TacticM Unit` | Main loop of `tauto`: repeatedly applies intros, `distribNot`, `cases`, `contradiction`, `or_iff_not_imp_left`, `constructor`, and `assumption` until no progress. |
| `finishingConstructorMatcher` | `Q(Prop) → MetaM Bool` | Like `coreConstructorMatcher`, but includes `∃` for finishing stage. |
| `tautology` | `TacticM Unit` | Full implementation of `tauto`: runs `tautoCore`, then finishes with `rfl`, `solve_by_elim`, and `constructor`. |
| `Config` | `structure` | Placeholder for future configuration (currently empty). |
| `elabConfig` | `declare_config_elab` | Elaborates `Config`. |

**Key Theorems Used (via `Q(...)` terms):**
- `Decidable.not_and_iff_or_not_not'`
- `Decidable.not_or_iff`
- `Decidable.not_imp_iff_and_not`
- `Decidable.not_iff`
- `Decidable.iff_iff_and_or_not_and_not`
- `Decidable.of_not_not`
- `not_or.mp`
- `Eq.to_iff`, `propext`
- `or_iff_not_imp_left.mpr`

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `distribNot*`: All functions related to distributing negation via de Morgan laws.
  - `core*`, `finishing*`: Distinguish phases of the tactic (`tautoCore` vs finishing stage).
  - `elab*`: Elaboration functions (e.g., `elabConfig`).
- **Suffixes:**
  - `Matcher`: Functions returning `Bool` to decide tactic applicability.
  - `Aux`: Helper functions (e.g., `distribNotAux`).
  - `OnceAt`: Single-application variant (`distribNotOnceAt`).
- **Other:**
  - `fvar`/`hypFVar`: Refers to hypothesis variables (`fvar` = free variable).
  - `subst`, `assertAfter`, `clear`: Standard Lean metaprogramming operations.

---

#### **3. Tactic Stack**

Frequently used tactics & metaprogramming primitives:

| Tactic / Primitive | Usage |
|--------------------|-------|
| `intros!` | Repeatedly introduce implications/forall. |
| `distribNot` | Apply de Morgan transformations to hypotheses. |
| `casesMatching` | Case analysis on `∧`, `∨`, `∃`, `False`. |
| `constructorMatching` | Split goals on `∧`, `↔`, `True`, `∃`. |
| `contradiction` | Discharge goals of the form `False` from contradictory hypotheses. |
| `assumption` | Solve goal by matching a hypothesis. |
| `rfl` | Solve reflexive goals (e.g., `a = a`). |
| `solve_by_elim` | Solve goals by applying hypotheses (like `auto`/`eauto`). |
| `or_iff_not_imp_left.mpr` | Rewrite `a ∨ b` as `¬a → b`. |
| `tryTactic`, `andThenOnSubgoals` (`<;>`), `iterateUntilFailure` | Control flow combinators. |
| `liftMetaTactic`, `liftMetaTactic'` | Embed `MetaM` actions into `TacticM`. |
| `commitIfNoEx`, `try`, `catch` | Error handling / backtracking control. |

---

#### **4. Proof Logic / Strategy**

The `tauto` tactic follows a **progressive decomposition strategy**:

1. **Preprocessing (core loop):**
   - Introduce all implications/forall (`intros!`).
   - Apply `distribNot` to push negations inward (de Morgan, double-negation elimination via decidability).
   - Perform case analysis (`casesMatching`) on hypotheses like `∧`, `∨`, `∃`, `False`.
   - Try `contradiction` and `assumption` after each step to close goals early.
   - If goal is `a ∨ b`, rewrite as `¬a → b` using `or_iff_not_imp_left.mpr`, then intros again.
   - Split goal using `constructorMatching` on `∧`, `↔`, `True`, `∃`.
   - Repeat until no progress (fixed point).

2. **Finishing stage:**
   - Try `rfl` (for definitional equalities).
   - Try `solve_by_elim` (for goals solvable by applying hypotheses).
   - Try `constructorMatching` again (for remaining `∧`, `↔`, `∃`, `True` goals).

**Key properties:**
- **Non-backtracking**: Uses `iterateUntilFailure` and fixed-point iteration — no backtracking over tactic branches.
- **Classical by default**: Uses decidability instances (e.g., `Decidable.not_and_iff_or_not_not'`) — relies on classical logic via `classical`.
- **Goal-oriented**: Prioritizes discharging goals early via `contradiction`/`assumption`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.CasesM` | Provides `casesMatching`, used for case analysis. |
| `Mathlib.Tactic.Core` | Core tactic infrastructure (`focusAndDoneWithScope`, `tryTactic`, etc.). |
| `Mathlib.Lean.Elab.Tactic.Basic` | Elaboration utilities (`elabConfig`, tactic syntax). |
| `Mathlib.Logic.Basic` | Basic logic lemmas (e.g., `propext`, `Eq.to_iff`, `not_or`, etc.). |
| `Qq` | Quotation machinery (`q(...)`, `Q(Prop)`, ` synthInstanceQ`). |
| `Batteries.Tactic` | Additional tactic utilities (e.g., `andThenOnSubgoals`). |

**Key external dependencies:**
- `Decidable` typeclass for classical reasoning.
- `propext`, `Eq.to_iff` from logic basics.
- `or_iff_not_imp_left`, `not_and_iff_or_not_not'`, etc., from `Mathlib.Logic.Basic`.

---

### Summary

`tauto` is a **classical, non-backtracking, goal-directed tactic** for propositional logic, built around:
- **Negation normalization** (`distribNot`),
- **Progressive decomposition** (`tautoCore`),
- **Finishing with `rfl`/`solve_by_elim`**.

It is optimized for speed and predictability (no backtracking), at the cost of completeness for intuitionistic logic (see `itauto` for intuitionistic variant).