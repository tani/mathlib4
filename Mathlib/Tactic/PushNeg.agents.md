### Technical Brief: `push_neg` Tactic in Lean 4 / Mathlib

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `not_not_eq` | `(¬ ¬ p) = p` — Double negation elimination (classical). |
| `not_and_eq` | `(¬ (p ∧ q)) = (p → ¬ q)` — Standard negation of conjunction (implicative form). |
| `not_and_or_eq` | `(¬ (p ∧ q)) = (¬ p ∨ ¬ q)` — Distributive form of negated conjunction (De Morgan). |
| `not_or_eq` | `(¬ (p ∨ q)) = (¬ p ∧ ¬ q)` — De Morgan for disjunction. |
| `not_forall_eq` | `(¬ ∀ x, s x) = (∃ x, ¬ s x)` — Negation of universal quantifier. |
| `not_exists_eq` | `(¬ ∃ x, s x) = (∀ x, ¬ s x)` — Negation of existential quantifier. |
| `not_implies_eq` | `(¬ (p → q)) = (p ∧ ¬ q)` — Negation of implication (classical). |
| `not_ne_eq` | `(¬ (x ≠ y)) = (x = y)` — Negation of inequality. |
| `not_iff` | `(¬ (p ↔ q)) = ((p ∧ ¬ q) ∨ (¬ p ∧ q))` — Negation of biconditional (exclusive or). |
| `not_le_eq`, `not_lt_eq`, `not_ge_eq`, `not_gt_eq` | In linear orders: e.g., `¬ (a ≤ b) = (b < a)` — Negations of order relations. |
| `not_nonempty_eq` | `(¬ s.Nonempty) = (s = ∅)` — Negation of non-emptiness of a set. |
| `ne_empty_eq_nonempty`, `empty_ne_eq_nonempty` | `(s ≠ ∅) = s.Nonempty`, etc. — Equivalences for non-emptiness via inequality. |
| `push_neg.use_distrib` | Boolean option (default `false`) — Controls whether `¬(p ∧ q)` → `¬p ∨ ¬q` (`true`) or `p → ¬q` (`false`). |
| `transformNegationStep` | `Expr → SimpM (Option Simp.Step)` — Core rewriting step: rewrites top-level negation using lemmas. |
| `transformNegation` | `Expr → SimpM Simp.Step` — Recursive version of `transformNegationStep`, handles nested negations (e.g., `¬¬¬p`). |
| `pushNegCore` | `Expr → MetaM Simp.Result` — Main core for `conv` mode: applies simplification with negation rewrites. |
| `pushNegTarget` | `TacticM Unit` — Applies `push_neg` to the main goal. |
| `pushNegLocalDecl` | `FVarId → TacticM Unit` — Applies `push_neg` to a specific local hypothesis. |

---

#### **2. Naming Conventions**

- **Theorems**:  
  - `not_*_eq`: Standard pattern for negation rewrites (`not_and_eq`, `not_forall_eq`, etc.).  
  - `not_*_eq` for order relations (`not_le_eq`, `not_lt_eq`, etc.) — often symmetric (`not_ge_eq` = `not_le_eq` under flip).  
  - `*_eq_*`: Set-theoretic equivalences (`not_nonempty_eq`, `ne_empty_eq_nonempty`, `empty_ne_eq_nonempty`).  
- **Options**:  
  - `push_neg.use_distrib` — Uses `push_neg.` prefix + descriptive suffix.  
- **Functions**:  
  - `transformNegation*`, `pushNeg*` — All prefixed with `pushNeg` or `transformNegation`.  
  - `mkSimpStep`, `handleIneq` — Internal helpers with descriptive verbs.

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `simp only [...]` — In proofs like `not_nonempty_eq`.
  - `rw [...]` — Rewriting with lemmas (e.g., `ne_comm`, `← not_nonempty_eq`).
  - `exact`, `intro`, `rwa`, `apply`, `mkAppM`, `inferType`, `isDefEq`, `guard`, `whnfR`, `mkEqTrans`, `applySimpResultToTarget`, `applySimpResultToLocalDecl`.
- **Simplifier infrastructure**:
  - `Simp.Step`, `Simp.Context`, `Simp.main`, `Simp.Result`.
- **Meta-level utilities**:
  - `Expr` manipulation (`.not?`, `.getAppFnArgs`, `.forallE`, `.lam`, etc.).
  - `withMainContext`, `getMainGoal`, `instantiateMVars`, `replaceMainGoal`, `logInfo`.

---

#### **4. Proof Logic / Algorithm Flow**

- **Top-level strategy**:
  1. Normalize expression (`whnfR`).
  2. Extract the negated subexpression (`e_whnf.not?`).
  3. Match on the *head symbol* of the negated expression (`And`, `Or`, `Eq`, `Ne`, `LE`, `LT`, `Exists`, `Forall`, etc.).
  4. Apply the corresponding rewrite lemma (e.g., `not_and_eq`, `not_forall_eq`, `not_le_eq`).
  5. For inequalities, synthesize the appropriate theorem using `handleIneq`, verifying instance compatibility.
  6. For sets, special-case `∅` and `Nonempty`.
  7. Recursively apply `transformNegation` to handle nested negations (e.g., `¬¬p`, `¬(¬p ∧ q)`).
- **Key logic**:
  - **Duality**: `¬∀ ↔ ∃¬`, `¬∃ ↔ ∀¬`, `¬(p ∧ q) ↔ p → ¬q` (or `¬p ∨ ¬q` in distrib mode).
  - **Order handling**: Uses `LinearOrder` instance to rewrite `¬(≤)` as `<`, etc.
  - **Set theory**: `¬Nonempty ↔ = ∅`, `≠ ∅ ↔ Nonempty`.
  - **Safety checks**: `guard (isDefEq e lhs)` ensures the lemma’s LHS matches the current expression.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Lean.Elab.Tactic.Location` | Parsing `at *`, `at h`, `at ⊢`, etc. |
| `Mathlib.Data.Set.Defs` | Definitions for `Set`, `Nonempty`, `∅`, etc. |
| `Mathlib.Logic.Basic` | Core logic (e.g., `not_not`, `not_and`, `not_forall`). |
| `Mathlib.Order.Defs.LinearOrder` | Linear order definitions (`≤`, `<`, etc.) and lemmas (`not_le`, `not_lt`). |
| `Mathlib.Tactic.Conv` | Conv tactic infrastructure (`Conv.applySimpResult`, `Conv.getLhs`). |

---

### Summary

The `push_neg` tactic is a **highly structured, lemma-driven simplifier** for pushing negations inward in propositional and first-order logic, with special support for:
- Linear orders (`≤`, `<`, etc.),
- Set-theoretic predicates (`Nonempty`, `∅`),
- Quantifiers (`∀`, `∃`),
- Logical connectives (`∧`, `∨`, `→`, `↔`, `=`, `≠`).

It leverages Lean’s simplifier framework (`SimpM`, `Simp.Step`) and is extensible via the `push_neg.use_distrib` option. Its design emphasizes **preservation of variable names** and **instance-aware rewriting**, making it robust in complex mathematical contexts.