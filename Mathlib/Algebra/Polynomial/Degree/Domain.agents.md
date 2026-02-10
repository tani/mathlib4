### Technical Metadata Brief: `Polynomial.Domain`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `instNoZeroDivisors` | `NoZeroDivisors R[X]` | Proves that if `R` has no zero divisors, then so does `R[X]`. Uses leading coefficient properties. |
| `natDegree_mul` | `p ≠ 0 → q ≠ 0 → (p * q).natDegree = p.natDegree + q.natDegree` | Degree additivity for nonzero polynomials over a semiring with no zero divisors. |
| `natDegree_smul` | `a ≠ 0 → (a • p).natDegree = p.natDegree` | Scalar multiplication by a nonzero element does not change the natural degree. |
| `natDegree_pow` | `(p ^ n).natDegree = n * p.natDegree` | Degree of a power of a polynomial; handles zero polynomial and zero exponent. |
| `natDegree_le_of_dvd` | `p ∣ q → q ≠ 0 → p.natDegree ≤ q.natDegree` | If `p` divides nonzero `q`, then degree of `p` ≤ degree of `q`. |
| `degree_le_of_dvd` | `p ∣ q → q ≠ 0 → degree p ≤ degree q` | Same as above but for `degree` (not `natDegree`). |
| `eq_zero_of_dvd_of_degree_lt` | `p ∣ q → degree q < degree p → q = 0` | Contrapositive: nonzero polynomial cannot have strictly smaller degree than its divisor. |
| `eq_zero_of_dvd_of_natDegree_lt` | `p ∣ q → natDegree q < natDegree p → q = 0` | Analogous to above for `natDegree`. |
| `not_dvd_of_degree_lt` | `q ≠ 0 → q.degree < p.degree → ¬ p ∣ q` | If `q` is nonzero and has smaller degree than `p`, then `p` does not divide `q`. |
| `not_dvd_of_natDegree_lt` | `q ≠ 0 → q.natDegree < p.natDegree → ¬ p ∣ q` | Same as above for `natDegree`. |
| `natDegree_sub_eq_of_prod_eq` | `p₁ * q₂ = p₂ * q₁ → (p₁.natDegree : ℤ) - q₁.natDegree = (p₂.natDegree : ℤ) - q₂.natDegree` | Ensures `intDegree` (difference of natDegrees) is well-defined for rational functions. |
| `instIsDomain` | `IsDomain R[X]` | If `R` is a nontrivial domain, then `R[X]` is also a domain. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `natDegree_`: Relates to natural degree (`ℕ`-valued degree).
  - `degree_`: Relates to full degree (`WithBot ℕ`-valued).
  - `eq_zero_of_...`: Lemmas concluding `q = 0` under certain divisibility/degree conditions.
  - `not_dvd_of_...`: Lemmas proving non-divisibility via degree comparison.

- **Suffixes:**
  - `_le_of_dvd`: Degree inequality derived from divisibility.
  - `_of_dvd_of_...`: Consequences of divisibility + degree condition.
  - `_eq_of_...`: Equality results (e.g., `natDegree_mul`, `natDegree_pow`).

- **Other patterns:**
  - `smul`, `pow`, `sub_eq_of_prod_eq`: Reflects algebraic operations used.

---

#### **3. Tactic Stack**

- **Core tactics used:**
  - `rw`: Rewriting using lemmas, definitions (`leadingCoeff_eq_zero`, `degree_eq_natDegree`, etc.)
  - `refine`: Constructing proofs with holes filled later.
  - `by_cases` / `obtain rfl | hp`: Case analysis on equality (`p = 0`, `n = 0`, etc.)
  - `simp only [...] using ...`: Simplification with specific lemmas and proof hints.
  - `norm_cast`: For lifting equalities from `ℕ` to `ℤ`.
  - `lt_iff_not_ge`: Classical reasoning for strict inequalities.
  - `by_contra`: Contrapositive reasoning (e.g., proving `¬p ∣ q` by assuming `p ∣ q` and deriving contradiction).
  - `exact`: Finalizing proofs with known facts.

- **No heavy automation** (e.g., no `linarith`, `omega`, or `interval_cases`), indicating a focus on structural reasoning.

---

#### **4. Proof Logic**

- **Inductive or structural reasoning** based on:
  - Leading coefficient behavior under multiplication (`leadingCoeff_mul`, `leadingCoeff_pow`).
  - Degree-natural degree equivalence for nonzero polynomials (`degree_eq_natDegree`).
  - Case analysis on whether polynomials or scalars are zero.
  - Contrapositive arguments for non-divisibility.
  - Casting between `ℕ` and `ℤ` for `intDegree`-style reasoning.

- **Typical proof flow:**
  1. Reduce to leading coefficient or degree properties.
  2. Use `rw` to rewrite using known lemmas (e.g., `← leadingCoeff_mul`).
  3. Apply `eq_zero_or_eq_zero_of_mul_eq_zero` (from `NoZeroDivisors R`) to deduce one factor is zero.
  4. For divisibility lemmas: assume `p ∣ q`, substitute `q = p * r`, then apply `natDegree_mul`.

---

#### **5. Imports**

- **Primary dependency:**
  ```lean
  import Mathlib.Algebra.Polynomial.Degree.Operations
  ```
  - Provides foundational degree lemmas: `degree_mul`, `degree_eq_natDegree`, `leadingCoeff_mul`, etc.

- **Implicit dependencies (via `Polynomial` namespace and `Finsupp`):**
  - `Mathlib.Algebra.Polynomial.Basic`
  - `Mathlib.Algebra.Polynomial.Degree.Definitions`
  - `Mathlib.Algebra.NoZeroDivisors`
  - `Mathlib.Algebra.Ring.IsDomain`

- **Contextual assumptions:**
  - `[Semiring R]`, `[Ring R]`, `[NoZeroDivisors R]`, `[IsDomain R]`, `[Nontrivial R]`

---

### Summary

This file establishes foundational algebraic properties of univariate polynomials over rings/semirings with no zero divisors or domain structure. It emphasizes **degree behavior under multiplication, scalar multiplication, powers, and divisibility**, using **leading coefficient arguments** and **case analysis on zero/nonzero**. The proofs are mostly constructive and rely on structural properties of polynomials as finitely supported functions (`Finsupp`).