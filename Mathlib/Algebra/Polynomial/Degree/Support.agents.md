### Technical Metadata Brief: Degree and Support of Univariate Polynomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `supDegree_eq_natDegree` | `p.toFinsupp.supDegree id = p.natDegree` | Equates the supremum degree of the Finsupp representation with the polynomial’s natural degree. |
| `le_natDegree_of_mem_supp` | `a ∈ p.support → a ≤ natDegree p` | Any exponent in the support is ≤ the natural degree. |
| `supp_subset_range` | `natDegree p < m → p.support ⊆ Finset.range m` | Support lies within any range strictly above the natural degree. |
| `supp_subset_range_natDegree_succ` | `p.support ⊆ Finset.range (natDegree p + 1)` | Immediate corollary: support ⊆ range up to `natDegree + 1`. |
| `as_sum_support` | `p = ∑ i ∈ p.support, monomial i (p.coeff i)` | Polynomial equals sum over its support using monomials. |
| `as_sum_support_C_mul_X_pow` | `p = ∑ i ∈ p.support, C (p.coeff i) * X ^ i` | Same as above, but in standard `C * X^i` form. |
| `sum_over_range'` | `p.sum f = ∑ a ∈ range n, f a (coeff p a)` (under `p.natDegree < n` and `f n 0 = 0`) | Re-expresses `p.sum f` over a larger range, ignoring zero coefficients. |
| `sum_over_range` | `p.sum f = ∑ a ∈ range (p.natDegree + 1), f a (coeff p a)` | Special case of `sum_over_range'` with minimal sufficient range. |
| `as_sum_range'` | `p = ∑ i ∈ range n, monomial i (coeff p i)` (if `natDegree p < n`) | Polynomial expressed as sum over a range (not just support). |
| `as_sum_range` | `p = ∑ i ∈ range (p.natDegree + 1), monomial i (coeff p i)` | Canonical range representation of a polynomial. |
| `as_sum_range_C_mul_X_pow` | `p = ∑ i ∈ range (natDegree p + 1), C (coeff p i) * X ^ i` | Same as `as_sum_range`, but in `C * X^i` notation. |
| `mem_support_C_mul_X_pow` | `a ∈ support (C c * X ^ n) → a = n` | Support of a monomial is singleton `{n}`. |
| `card_support_C_mul_X_pow_le_one` | `#(support (C c * X ^ n)) ≤ 1` | Monomial has at most one nonzero coefficient. |
| `card_supp_le_succ_natDegree` | `#p.support ≤ p.natDegree + 1` | Number of nonzero coefficients ≤ degree + 1. |
| `natDegree_mem_support_of_nonzero` | `p ≠ 0 → p.natDegree ∈ p.support` | Leading exponent is in support iff polynomial ≠ 0. |
| `natDegree_eq_support_max'` | `p ≠ 0 → p.natDegree = p.support.max' ...` | Natural degree equals maximum of support when nonzero. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `as_sum_...`: Expresses polynomial as a sum over a specific index set.
  - `sum_over_...`: Re-expresses `p.sum f` over a different index set.
  - `supp_...`: Relates support to degree or other sets.
  - `card_...`: Bounds on cardinality of support.
- **Suffixes**:
  - `_eq_natDegree`: Equates something to `natDegree`.
  - `_of_nonzero`: Requires `p ≠ 0` as hypothesis.
  - `_le_one`, `_le_succ_natDegree`: Inequality bounds.
- **Notable patterns**:
  - `C_mul_X_pow_eq_monomial`: Equivalence between `C * X^i` and `monomial i`.
  - `mem_support_iff`: Characterizes membership in support via nonzero coefficient.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `simp`: Rewriting and simplification (especially with `support`, `coeff`, `natDegree`, `degree`).
- `rcases` / `obtain`: Case analysis on equality (`eq_or_ne p 0`) or membership.
- `apply`, `exact`: Direct proof steps.
- `trans`: Chaining equalities.
- `antisymm`: Proving equality via mutual inequality (used in `natDegree_eq_support_max'`).
- `card_le_card`: For bounding cardinalities using subset relations.
- `by_cases`: Splitting on whether `p = 0`.
- `Finset.sum_eq_zero`, `sum_zero_index`: Handling zero sums over empty or trivial index sets.

---

#### **4. Proof Logic**

- **Inductive/Case-based structure**:
  - Many proofs split on `p = 0` vs `p ≠ 0`, especially when dealing with `natDegree`, `support`, or `degree`.
- **Degree vs support reasoning**:
  - Use `mem_support_iff` to translate between `a ∈ support p` and `p.coeff a ≠ 0`.
  - Use `natDegree_mem_support_of_nonzero` and `le_natDegree_of_mem_supp` to bound and locate the maximum element of support.
- **Summation reindexing**:
  - Leverage `sum_over_range'` + `sum_monomial_eq` to rewrite sums over support as sums over ranges.
  - Use `supp_subset_range` + `Finsupp.sum_of_support_subset` to justify restricting sums.
- **Cardinality bounds**:
  - Use subset inclusion (`supp_subset_range_natDegree_succ`) + monotonicity of `#` to derive `#support ≤ natDegree + 1`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Algebra.MonoidAlgebra.Support`: Provides `support`, `supDegree`, and Finsupp-based polynomial representation.
  - `Mathlib.Algebra.Polynomial.Degree.Operations`: Defines `degree`, `natDegree`, and their basic properties.
- **Domain scope**:
  - Univariate polynomials over a semiring (`Polynomial R`).
  - Focus on *support*, *degree*, and *natural degree*; no explicit use of `degree` vs `natDegree` distinctions beyond `degree_eq_natDegree` in proofs.
- **Assumptions**:
  - `[Semiring R]`: Base ring is a semiring (not necessarily commutative or with 1, though `Polynomial` assumes `R` has `0` and `+`).
  - Noncomputable section: Allows use of classical choice (e.g., for `max'`).

---

This module formalizes foundational structural facts about univariate polynomials, especially how their support and degree interact, and how they can be decomposed into sums over finite index sets. It serves as a basis for more advanced degree arguments and summation manipulations in Mathlib.