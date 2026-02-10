### Technical Brief: Divisibility Lemmas in Rings and Commutative Rings (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `dvd_smul_of_dvd` | `{x y : R} → x ∣ y → x ∣ m • y` | Extends divisibility under scalar multiplication in a semigroup with compatible action. |
| `dvd_nsmul_of_dvd` | `x ∣ y → x ∣ n • y` | Special case of `dvd_smul_of_dvd` for natural scalar multiplication in non-unital semirings. |
| `dvd_zsmul_of_dvd` | `x ∣ y → x ∣ z • y` | Extension to integer scalar multiplication in non-unital rings. |
| `pow_dvd_add_pow_of_pow_eq_zero_right` | `x^m ∣ (x + y)^p` under `y^n = 0`, `n + m ≤ p + 1`, `Commute x y` | Core lemma: if `y` is nilpotent and commutes with `x`, then a high enough power of `x + y` is divisible by a power of `x`. |
| `pow_dvd_add_pow_of_pow_eq_zero_left` | `y^m ∣ (x + y)^p` under symmetric conditions | Left-nilpotent variant of above. |
| `pow_dvd_pow_of_sub_pow_eq_zero` | `x^m ∣ y^p` under `(x - y)^n = 0` | Divisibility consequence of nilpotent difference. |
| `pow_dvd_pow_of_add_pow_eq_zero` | `x^m ∣ y^p` under `(x + y)^n = 0` | Variant using nilpotent sum. |
| `pow_dvd_sub_pow_of_pow_eq_zero_right/left` | `x^m ∣ (x - y)^p` or `y^m ∣ (x - y)^p` | Divisibility for binomial differences with nilpotent parts. |
| `add_pow_dvd_pow_of_pow_eq_zero_right/left` | `(x + y)^m ∣ y^p` or `(x + y)^m ∣ x^p` | Reverse-direction divisibility: sum raised to power divides one component. |
| `dvd_mul_sub_mul_mul_left_of_dvd` | `p ∣ a*x + b*y`, `p ∣ c*x + d*y` ⇒ `p ∣ (ad - bc)*x` | Linear algebraic elimination lemma: determinant-like factor divides one variable. |
| `dvd_mul_sub_mul_mul_right_of_dvd` | Same premises ⇒ `p ∣ (ad - bc)*y` | Symmetric version for `y`. |
| `dvd_mul_sub_mul_mul_gcd_of_dvd` | Same premises ⇒ `p ∣ (ad - bc) * gcd x y` | Refinement using GCD structure in integral domains with GCD monoid. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `dvd_`: divisibility-related lemmas (`dvd_smul`, `dvd_nsmul`, `dvd_zsmul`, `dvd_mul_sub_mul_mul_*`).
  - `pow_dvd_`: divisibility of powers (`pow_dvd_add_pow`, `pow_dvd_pow`, `pow_dvd_sub_pow`).
  - `add_pow_dvd_`: divisibility *by* powers of sums (`add_pow_dvd_pow`).
- **Suffixes**:
  - `_of_dvd`: premise is a divisibility hypothesis.
  - `_of_pow_eq_zero_*`: premise is nilpotence (`y^n = 0`, `x^n = 0`, `(x ± y)^n = 0`).
  - `_left` / `_right`: indicates which argument is nilpotent or involved in the action (e.g., `right` = second argument `y`).
- **Structure-specific**:
  - `Semiring`, `Ring`, `CommRing`: section-scoped qualifiers.
  - `Commute.*`: namespace for lemmas requiring `Commute x y`.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `rw`: extensive use for rewriting definitions (`h_comm.add_pow'`, `neg_pow`, `gcd_mul_left'`, etc.).
  - `refine`: constructing proofs with holes (e.g., `Finset.dvd_sum`).
  - `rcases` / `obtain`: destructing existential hypotheses (`⟨k, hk⟩`).
  - `cases` / `rcases` with `le_or_lt`: case analysis on order.
- **Arithmetic & simplification**:
  - `simp [pow_eq_zero_of_le … hy]`: simplifying using nilpotence.
  - `ring`: algebraic simplification (especially in `dvd_mul_sub_mul_mul_*` lemmas).
  - `omega`: solving linear arithmetic goals (e.g., `n ≤ j`).
  - `simpa`: simplifying and discharging goals using assumptions.
- **Domain-specific**:
  - `dvd_gcd_iff`, `gcd_mul_left'`: leveraging GCD monoid structure.

---

#### **4. Proof Logic**

- **Inductive/structural decomposition**:
  - Proofs often proceed by expanding binomial sums via `h_comm.add_pow'` (commuting elements allow binomial expansion).
  - Then apply `Finset.dvd_sum`: show each term in the sum is divisible by the target.
- **Case analysis**:
  - On `m ≤ i` vs `i < m` (or `i + 1 ≤ m`) to split terms where `x^m` divides `x^i` or where `y^j` vanishes due to nilpotence.
- **Symmetry exploitation**:
  - Many lemmas are derived by symmetry (e.g., swapping `x`/`y`, using `add_comm`, `sub_left`, `neg_*`, `Commute.symm`).
- **Reduction to core lemma**:
  - Subtraction/addition variants are reduced to `pow_dvd_add_pow_of_pow_eq_zero_right` via algebraic identities (`sub_add_cancel`, `neg_pow`, etc.).
- **Linear algebraic elimination**:
  - For `dvd_mul_sub_mul_mul_*`, proofs construct an explicit witness using the determinant `ad - bc`, then verify via ring arithmetic.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.GroupWithZero.Divisibility`: basic divisibility theory in monoids with zero.
  - `Mathlib.Algebra.Ring.Divisibility.Basic`: ring-specific divisibility.
  - `Mathlib.Data.Nat.Choose.Sum`: binomial coefficient identities (used in `add_pow'`).
  - `Mathlib.GroupTheory.GroupAction.Ring`: scalar multiplication compatibility (`SMulCommClass`).
  - `Mathlib.Algebra.GCDMonoid.Basic`: GCD structure for final lemma (`dvd_mul_sub_mul_mul_gcd_of_dvd`).
- **Scope**:
  - General rings/semirings → non-unital variants → unital rings → commutative rings.
  - Emphasis on nilpotent elements and commuting pairs.
  - Applications likely in algebraic geometry (nilpotents), module theory, or ideal theory.

--- 

This module provides a foundational toolkit for reasoning about divisibility in presence of nilpotents and commuting elements, with strong automation and structural reuse.