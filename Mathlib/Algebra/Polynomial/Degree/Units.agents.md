### Technical Metadata Brief: Degree of Polynomial Units in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `natDegree_eq_zero_of_isUnit` | `IsUnit p → natDegree p = 0` | Shows that any unit polynomial over a `Semiring R` with `NoZeroDivisors` has natural degree zero. |
| `degree_eq_zero_of_isUnit` | `[Nontrivial R] → IsUnit p → degree p = 0` | Refines the above for the (possibly `-∞`) degree function, assuming `R` is nontrivial. |
| `degree_coe_units` | `[Nontrivial R] → (u : R[X]ˣ) → degree (u : R[X]) = 0` | Special case: the degree of a unit (as a polynomial) is zero. |
| `isUnit_iff` | `IsUnit p ↔ ∃ r : R, IsUnit r ∧ C r = p` | Characterizes units in `R[X]` over an integral domain: a polynomial is a unit iff it's a constant unit polynomial. |
| `not_isUnit_of_degree_pos` | `0 < p.degree → ¬ IsUnit p` | If a polynomial has positive degree, it cannot be a unit. |
| `not_isUnit_of_natDegree_pos` | `0 < p.natDegree → ¬ IsUnit p` | Same as above, using natural degree. |
| `natDegree_coe_units` | `(u : R[X]ˣ) → natDegree (u : R[X]) = 0` | Natural degree of a unit polynomial is zero. |
| `coeff_coe_units_zero_ne_zero` | `[Nontrivial R] → (u : R[X]ˣ) → coeff (u : R[X]) 0 ≠ 0` | The constant term of a unit polynomial is nonzero. |
| `Monic.C_dvd_iff_isUnit` | `p.Monic → C a ∣ p ↔ IsUnit a` | For monic `p`, a constant polynomial divides `p` iff its coefficient is a unit. |
| `Monic.degree_pos_of_not_isUnit` | `p.Monic → ¬ IsUnit p → 0 < degree p` | A non-unit monic polynomial has positive degree. |
| `Monic.natDegree_pos_of_not_isUnit` | `p.Monic → ¬ IsUnit p → 0 < natDegree p` | Same as above, for natural degree. |
| `degree_pos_of_not_isUnit_of_dvd_monic` | `¬ IsUnit a → a ∣ p → 0 < degree a` (with `p.Monic`) | If a non-unit divides a monic polynomial, it must have positive degree. |
| `natDegree_pos_of_not_isUnit_of_dvd_monic` | `¬ IsUnit a → a ∣ p → 0 < natDegree a` | Natural degree version of the above. |

---

#### **2. Naming Conventions**

- **`isUnit_` prefix**: Used for lemmas about unit polynomials (`isUnit_iff`, `isUnit_C`).
- **`degree_` / `natDegree_` prefix**: For degree-related properties (`degree_eq_zero_of_isUnit`, `natDegree_pos_of_not_isUnit`).
- **`_of_` suffix**: Indicates the hypothesis used (e.g., `degree_eq_zero_of_isUnit`).
- **`_iff_`**: Biconditional characterizations (`isUnit_iff`, `Monic.C_dvd_iff_isUnit`).
- **`_pos` suffix**: Indicates positivity of degree/natDegree (`degree_pos_of_not_isUnit`, `natDegree_pos_of_not_isUnit`).
- **`_ne_zero` suffix**: For nonzero conclusions (`coeff_coe_units_zero_ne_zero`).
- **`coe_units`**: Refers to coercion of units `R[X]ˣ` to polynomials.

---

#### **3. Tactic Stack**

- **`nontriviality R`**: Used to assume `R` is nontrivial when needed (e.g., to avoid degenerate cases).
- **`obtain ⟨q, hq⟩ := h.exists_right_inv`**: Extracts the inverse of a unit.
- **`rw [...] at this`**: Rewriting with lemmas like `natDegree_mul`, `natDegree_one`, `eq_comm`, `add_eq_zero`.
- **`simp [Subsingleton.elim p 0]`**: Simplifies using subsingleton elimination.
- **`conv in 0 => rw [...]`**: Focused rewriting in a subexpression.
- **`contrapose!`**: Used to flip implications and introduce negations (e.g., in `degree_pos_of_not_isUnit_of_dvd_monic`).
- **`simpa [...] using`**: Simplifies and discharges goals using given facts.

---

#### **4. Proof Logic**

- **Induction-free reasoning**: Proofs rely on algebraic properties of degree functions (`natDegree_mul`, `degree_le_zero_iff`, etc.).
- **Case analysis on `Subsingleton_or_nontrivial R`**: Handles degenerate vs. nontrivial rings.
- **Equivalence via `isUnit_iff`**: Reduces unit questions to constant unit coefficients.
- **Contrapositive reasoning**: For proving non-units (e.g., `not_isUnit_of_degree_pos`).
- **Monic-specific arguments**: Use properties like `coeff_natDegree`, `C_dvd_iff_dvd_coeff`, and `degree_pos` for monic polynomials.

---

#### **5. Imports & Scope**

- **`Mathlib.Algebra.Polynomial.Degree.Domain`**: Provides degree theory for polynomial rings over domains (e.g., `natDegree_mul`, `degree_le_zero_iff`).
- **`Mathlib.Algebra.Polynomial.Degree.SmallDegree`**: Contains lemmas about low-degree polynomials (e.g., `eq_C_of_degree_le_zero`, `natDegree_eq_of_degree_eq_some`).

**Scope**: This module focuses on characterizing units in polynomial rings over semirings and integral domains, especially how degree constraints enforce or prevent invertibility. It bridges structural properties (e.g., `NoZeroDivisors`, `Nontrivial`) with algebraic behavior of units.

--- 

Let me know if you'd like a formalized summary or a diagram of dependencies.