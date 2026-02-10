### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `iff_assoc` | `((a ↔ b) ↔ c) ↔ (a ↔ (b ↔ c))` | Associativity of logical equivalence (`↔`). |
| `iff_left_comm` | `(a ↔ (b ↔ c)) ↔ (b ↔ (a ↔ c))` | Left commutativity of `↔`. |
| `iff_right_comm` | `((a ↔ b) ↔ c) ↔ ((a ↔ c) ↔ b)` | Right commutativity of `↔`. |
| `HEq.eq`, `Eq.heq` | `heq_iff_eq` alias | Equivalence between heterogeneous equality (`heq`) and homogeneous equality (`eq`). |
| `dite_dite_distrib_left` | Equality of nested `dite` expressions (left-distributivity) | Distributes a `dite` over another `dite` on the left. |
| `dite_dite_distrib_right` | Equality of nested `dite` expressions (right-distributivity) | Distributes a `dite` over another `dite` on the right. |
| `ite_dite_distrib_left`, `ite_dite_distrib_right`, `dite_ite_distrib_left`, `dite_ite_distrib_right`, `ite_ite_distrib_left`, `ite_ite_distrib_right` | Various distributivity laws for `ite`/`dite` combinations | Special cases of `dite_dite_distrib_*` where one or both branches are `ite`. |
| `Prop.forall` | `(∀ p : Prop, f p) ↔ f True ∧ f False` | Reduces universal quantification over `Prop` to checking `True` and `False`. |
| `Prop.exists` | `(∃ p : Prop, f p) ↔ f True ∨ f False` | Reduces existential quantification over `Prop` to checking `True` or `False`. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `dite_`, `ite_`: Indicate use of dependent (`dite`) or non-dependent (`ite`) if-then-else.
  - `iff_`: Logical equivalence lemmas.
- **Suffixes**:
  - `_left`, `_right`: Indicates left/right associativity/commutativity/distributivity.
  - `_distrib_*`: Distributivity patterns (e.g., `dite_dite_distrib_left`).
- **Pattern**: `X_Y_Z` where `X`, `Y`, `Z` describe the structure of nested constructs (e.g., `dite_dite_distrib_left` = `dite` over `dite`, left-distributive).

#### 3. **Tactic Stack**
- **Primary tactics**:
  - `tauto`: Used for propositional logic tautologies (`iff_*` lemmas).
  - `split_ifs`: Used to case-split on decidable propositions in `ite`/`dite` expressions.
  - `rfl`: After `split_ifs`, to solve equalities by reflexivity.
  - `by_cases ... <;> simp only [...] <;> assumption`: For `Prop.forall`/`Prop.exists`, leveraging decidability and simplification.
  - `convert`: To adjust proof goals using definitional equality (e.g., in `Prop.exists`).
  - `aesop` is *not* used here — this file avoids heavy automation in favor of explicit, readable proofs.

#### 4. **Proof Logic**
- **Propositional equivalences (`iff_*`)**: Proven via `tauto`, leveraging classical logic and propositional reasoning.
- **`dite`/`ite` distributivity**: Proven by:
  1. `split_ifs` to case-split on decidable propositions (`p`, `q`).
  2. `rfl` to discharge resulting equalities (since branches match definitionally).
- **`Prop.forall`/`Prop.exists`**:
  - Use `em` (excluded middle) to case-split on `p : Prop`.
  - Simplify using `simp only [hp]` to reduce `f p` to `f True` or `f False`.
  - Combine branches via `assumption` or `convert`.

#### 5. **Imports**
- `Mathlib.Logic.Basic`: Core logic definitions (e.g., `heq`, `ite`, `dite`, `em`).
- `Mathlib.Tactic.Convert`: For `convert` tactic.
- `Mathlib.Tactic.SplitIfs`: For `split_ifs`.
- `Mathlib.Tactic.Tauto`: For `tauto`.

> **Design Note**: This file prioritizes *readable, explicit* proofs over automation, avoiding `if then else` syntax to preserve delta-reduced statements. It serves as a companion to `Logic.Basic`, focusing on equational reasoning about conditionals and propositional logic.