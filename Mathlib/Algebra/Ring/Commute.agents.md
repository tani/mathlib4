### Technical Brief: `Mathlib.Algebra.Ring.Basic` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Commute.add_right` | `[Distrib R] → Commute a b → Commute a c → Commute a (b + c)` | Sum of right-commuting elements still commutes. |
| `Commute.add_left` | `[Distrib R] → Commute a c → Commute b c → Commute (a + b) c` | Sum of left-commuting elements still commutes. |
| `Commute.mul_self_sub_mul_self_eq` | `[NonUnitalNonAssocRing R] → Commute a b → a² - b² = (a + b)(a - b)` | Difference of squares factorization for commuting elements. |
| `Commute.mul_self_eq_mul_self_iff` | `[NonUnitalNonAssocRing R] [NoZeroDivisors R] → Commute a b → a² = b² ↔ a = b ∨ a = -b` | Characterization of equal squares in domains with commuting elements. |
| `Commute.neg_right`, `neg_left`, `neg_right_iff`, `neg_left_iff` | Various | Interaction of negation with commutation. |
| `neg_one_right`, `neg_one_left` | `[MulOneClass R] [HasDistribNeg R] → Commute a (-1)` | `-1` commutes with all elements. |
| `neg_pow`, `neg_pow'` | `[Monoid R] [HasDistribNeg R] → (-a)ⁿ = (-1)ⁿ aⁿ` | Power of a negated element. |
| `neg_sq`, `neg_one_sq` | `(-a)² = a²`, `(-1)² = 1` | Squares of negations. |
| `sq_eq_one_iff` | `[Ring R] [NoZeroDivisors R] → a² = 1 ↔ a = 1 ∨ a = -1` | Units of order ≤2 in a domain. |
| `mul_self_sub_mul_self` | `[CommRing R] → a² - b² = (a + b)(a - b)` | Global difference-of-squares in commutative rings. |
| `sub_sq`, `sub_sq'` | `(a - b)² = a² ∓ 2ab + b²` | Expansion of square of difference. |
| `sq_eq_sq_iff_eq_or_eq_neg` | `[CommRing R] [NoZeroDivisors R] → a² = b² ↔ a = b ∨ a = -b` | Global version of equal-squares characterization. |
| `Units.sq_eq_sq_iff_eq_or_eq_neg` | `[CommRing R] [NoZeroDivisors R] → (u² = v²) ↔ u = v ∨ u = -v` | Same for units. |
| `Units.inv_eq_self_iff` | `[Ring R] [NoZeroDivisors R] → u⁻¹ = u ↔ u = 1 ∨ u = -1` | Self-inverse units in a domain. |
| `Ring.instBracket`, `lie_def` | `⁅x, y⁆ = x*y - y*x` | Defines Lie bracket via ring multiplication. |
| `commute_iff_lie_eq` | `Commute x y ↔ ⁅x, y⁆ = 0` | Commutativity ⇔ zero Lie bracket. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `neg_`: properties involving additive inverses (`neg_pow`, `neg_sq`, `neg_one_*`)
  - `sq_`: properties involving squares (`sq_sub_sq`, `sq_eq_one_iff`, `sq_eq_sq_iff_...`)
  - `mul_self_`: properties involving `a * a` (`mul_self_sub_mul_self_eq`, `mul_self_eq_mul_self_iff`)
  - `sub_`: properties involving subtraction (`sub_sq`, `sub_pow_two`)
- **Suffixes**:
  - `_iff`: biconditional characterizations (`sq_eq_one_iff`, `commute_iff_lie_eq`)
  - `_eq`: equality lemmas (`mul_self_sub_mul_self_eq`, `neg_one_sq`)
  - `_right`, `_left`: position of action (`add_right`, `neg_left`)
- **`Commute.*` namespace**: lemmas about the `Commute` relation.
- **`Units.*` namespace**: lemmas lifted to unit group.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting using equalities (e.g., `h.eq`, `sq`, `mul_one`) |
| `simp` / `simp_rw` | Simplification with lemmas like `neg_sq`, `one_pow`, `sub_eq_zero` |
| `rcases` / `obtain` | Case analysis on disjunctions (`neg_one_pow_eq_or`) |
| `push_cast` | Cast simplifications (e.g., from `u : Rˣ` to `val u : R`) |
| `exact` / `intro` / `intro h` | Basic proof structure |
| `apply` / `apply h` | Applying lemmas (e.g., `apply mul_eq_zero`) |
| `sub_eq_zero_of_eq`, `sub_eq_zero.symm` | Equating `a - b = 0` with `a = b` |
| `or_comm`, `and_comm` | Reordering disjunctions/conjunctions |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *rewrite-and-simplify* pattern:
    1. Expand definitions (`sq`, `sub`, `mul`, `neg`)
    2. Apply commutativity hypothesis (`h.eq`)
    3. Use ring identities (`sub_add_sub_cancel`, `mul_sub`, `add_mul`)
    4. Reduce to known lemmas (`mul_eq_zero`, `add_eq_zero_iff_eq_neg`)
  - For biconditionals (`↔`), proofs often split into two directions via `rw [← sub_eq_zero, ...]`.
  - Induction appears in `neg_one_pow_eq_or`, where `n` is natural.
  - Domain assumptions (`NoZeroDivisors R`) enable zero-product law (`mul_eq_zero`).
  - In `CommRing`, `Commute.all a b` replaces explicit `h : Commute a b`.

- **Common idioms**:
  - `rw [h.mul_self_sub_mul_self_eq]` — apply factorization using `h`.
  - `simp only [Units.ext_iff, val_pow_eq_pow_val]` — reduce unit equalities to base ring.
  - `rcases ... with h | h` — case split on `(-1)^n = 1 ∨ -1`.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Algebra.Ring.Semiconj` — semiconjugacy and `Commute` machinery.
- `Mathlib.Algebra.Ring.Units` — unit group structure.
- `Mathlib.Algebra.Group.Commute.Defs` — basic definitions of `Commute`.
- `Mathlib.Data.Bracket` — Lie bracket definition.

**Scope**:
- Focuses on **interaction of addition and multiplication** in rings/semirings/domains.
- Builds on `Distrib`, `NonUnitalNonAssocRing`, `Ring`, `CommRing`, `NoZeroDivisors`.
- Central theme: **commutativity**, **negation**, **squaring**, and **Lie brackets**.

---

This module serves as a foundational reference for algebraic identities in rings, especially where commutativity or domain properties simplify reasoning about squares, differences, and signs.