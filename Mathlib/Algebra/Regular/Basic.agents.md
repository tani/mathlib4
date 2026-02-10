### Technical Brief: Regular Elements in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `IsLeftRegular c` | `Prop` | `c * ·` is injective (left multiplication by `c` is injective). |
| `IsRightRegular c` | `Prop` | `· * c` is injective (right multiplication by `c` is injective). |
| `IsRegular c` | `Structure` | Both `IsLeftRegular c` and `IsRightRegular c` hold. |
| `IsAddLeftRegular c`, `IsAddRightRegular c`, `IsAddRegular c` | Analogous additive versions | Additive counterparts (used in additive contexts, e.g., `AddMonoid`). |
| `isRegular_iff` | `IsRegular c ↔ IsLeftRegular c ∧ IsRightRegular c` | Equivalence between structure and conjunction. |
| `IsLeftRegular.mul` | `IsLeftRegular a → IsLeftRegular b → IsLeftRegular (a * b)` | Product of left-regular elements is left-regular (in semigroup). |
| `IsRightRegular.mul` | `IsRightRegular a → IsRightRegular b → IsRightRegular (a * b)` | Product of right-regular elements is right-regular. |
| `IsRegular.mul` | `IsRegular a → IsRegular b → IsRegular (a * b)` | Product of regular elements is regular. |
| `mul_isLeftRegular_iff` | `IsLeftRegular (a * b) ↔ IsLeftRegular b` (if `a` left-regular) | Left-regularity is preserved under left multiplication by a left-regular element. |
| `isRegular_mul_and_mul_iff` | `IsRegular (a * b) ∧ IsRegular (b * a) ↔ IsRegular a ∧ IsRegular b` | Characterization of regularity of products in noncommutative setting. |
| `isRegular_mul_iff` | `IsRegular (a * b) ↔ IsRegular a ∧ IsRegular b` (in `CommSemigroup`) | Simplified version in commutative setting. |
| `isRegular_of_ne_zero` | `a ≠ 0 → IsRegular a` (in `CancelMonoidWithZero`) | Non-zero elements in integral domains (or `CancelMonoidWithZero`) are regular. |
| `isRegular_iff_ne_zero` | `IsRegular a ↔ a ≠ 0` (in `Nontrivial CancelMonoidWithZero`) | Regularity ⇔ nonzeroness in integral domains. |
| `Units.isRegular` | `a : Rˣ → IsRegular a` | Units (invertible elements) are regular. |
| `IsUnit.isRegular` | `IsUnit a → IsRegular a` | Units (via `IsUnit`) are regular. |
| `isLeftRegular_zero_iff_subsingleton` | `IsLeftRegular 0 ↔ Subsingleton R` | `0` is left-regular iff ring is trivial. |
| `not_isLeftRegular_zero` | `Nontrivial R → ¬IsLeftRegular 0` | In nontrivial rings, `0` is not left-regular. |
| `IsLeftRegular.ne_zero` | `Nontrivial R → IsLeftRegular a → a ≠ 0` | Regular elements in nontrivial rings are nonzero. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLeftRegular`, `isRightRegular`, `isRegular`: predicate definitions.
  - `isAddLeftRegular`, `isAddRightRegular`, `isAddRegular`: additive analogues.
  - `mul_`, `add_`: distinguish multiplicative vs additive contexts.
  - `of_`: implication from a stronger hypothesis (e.g., `of_mul`, `of_comp`).
  - `and_of_`: forward direction of biconditional with split hypotheses (e.g., `and_of_mul_of_mul`).
  - `all`: universal statements (e.g., `IsLeftRegular.all`).
  - `_iff_`: biconditional theorems.

- **Suffixes**:
  - `_iff_`: equivalence (↔).
  - `_iff_zero`: special case for `0`.
  - `_subsingleton`: triviality condition.
  - `_ne_zero`: nonzero conclusion.

- **Structure fields**:
  - `left`, `right`: components of `IsRegular`/`IsAddRegular`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `rwa` | Rewriting using equalities or assumptions (e.g., `zero_mul`, `mul_zero`, `mul_assoc`). |
| `simp_rw` | Simplified rewriting with `simp`-style lemmas (e.g., `Commute.symm_iff`). |
| `exact` / `refine` | Direct proof construction or partial proof with holes. |
| `nth_rw` | nth rewrite (e.g., `nth_rw 1 [← mul_zero b]`). |
| `push_neg` | Push negation inward (e.g., in `not_isLeftRegular_zero_iff`). |
| `intro` / `rintro` | Introduce hypotheses or destruct conjunctions. |
| `cases` / `rcases` | Case analysis or destruct existential/structure hypotheses. |
| `congr_arg` | Congruence for function application. |
| `trans` | Transitivity of equality. |
| `symm` / `trans` | Symmetry and transitivity of equality. |
| `rwa` | `rw` + `assumption`. |
| `aesop` / `linarith` | Not used here — this file is mostly algebraic and manual. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs are **direct**, using injectivity definitions and algebraic identities (`mul_assoc`, `zero_mul`, etc.).
  - **Induction** is not used — this is mostly equational reasoning.
  - **Case analysis** on `Subsingleton` / `Nontrivial` is common (e.g., `isLeftRegular_zero_iff_subsingleton`).
  - **Biconditional proofs** follow standard `⟨→⟩` and `←⟩` splits.
  - **Leverage of structure fields**: `IsRegular` proofs often split into `left` and `right` parts.

- **Common proof patterns**:
  - To prove `IsLeftRegular c`, show `(c * ·).Injective` by assuming `c * x = c * y` and deducing `x = y`.
  - To prove `¬IsLeftRegular 0`, assume `IsLeftRegular 0`, derive `Subsingleton R`, contradict `Nontrivial R`.
  - To prove `a ≠ 0`, assume `a = 0`, derive contradiction using existence of distinct elements (`exists_pair_ne`).

- **Leverage of typeclass inference**:
  - `MulZeroClass`, `Monoid`, `CommSemigroup`, `CancelMonoidWithZero` provide algebraic structure.
  - `IsLeftCancelMul`, `IsRightCancelMul`, `IsCancelMul` enable cancellation lemmas.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Commute.Defs` | `Commute` and related definitions (used in `Commute.isRightRegular_iff`). |
| `Mathlib.Algebra.Group.Units.Defs` | `Units`, `IsUnit`, invertibility. |
| `Mathlib.Algebra.GroupWithZero.Defs` | `MulZeroClass`, `MonoidWithZero`, zero element behavior. |
| `Mathlib.Algebra.Order.Monoid.Unbundled.Basic` | Unbundled ordered monoids (used for `PartialOrder` in `MulLECancellable`). |
| `Mathlib.Tactic.NthRewrite` | For `nth_rw` tactic (used in `mul_left_eq_zero_iff`). |

---

### Summary

This file formalizes the foundational theory of **regular elements** in multiplicative and additive contexts, emphasizing:
- Injectivity of multiplication/addition maps,
- Behavior of `0` (trivial vs nontrivial rings),
- Closure under multiplication,
- Connection to invertibility (`Units`, `IsUnit`),
- Cancellation properties (`CancelMonoidWithZero` ⇒ regular ⇔ nonzero).

It serves as a stepping stone toward non-zero-divisor theory and regular sequences.