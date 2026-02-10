### Technical Brief: Hasse Derivatives in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasseDeriv` | `ℕ → R[X] →ₗ[R] R[X]` | The *k*-th Hasse derivative, defined as a linear map: `∑ (i.choose k) a_i X^(i−k)` for `f = ∑ a_i X^i`. |
| `hasseDeriv_apply` | `hasseDeriv k f = f.sum (λ i r, monomial (i - k) ((i.choose k) * r))` | Explicit coefficient-wise evaluation of `hasseDeriv`. |
| `hasseDeriv_coeff` | `(hasseDeriv k f).coeff n = (n + k).choose k * f.coeff (n + k)` | Coefficient formula: shifts coefficients by *k* and scales by binomial coefficient. |
| `hasseDeriv_zero'` / `hasseDeriv_zero` | `hasseDeriv 0 f = f` / `hasseDeriv 0 = id` | Identity for *k = 0*. |
| `hasseDeriv_one'` / `hasseDeriv_one` | `hasseDeriv 1 f = derivative f` / `hasseDeriv 1 = derivative` | First Hasse derivative coincides with standard derivative. |
| `factorial_smul_hasseDeriv` | `k! • (hasseDeriv k f) = derivative^[k] f` | Relates Hasse derivative to iterated usual derivative via factorial scaling. |
| `hasseDeriv_comp` | `(hasseDeriv k).comp (hasseDeriv l) = (k+l).choose k • hasseDeriv (k+l)` | Composition law: iterated Hasse derivatives satisfy a binomial scaling. |
| `hasseDeriv_mul` | `hasseDeriv k (f * g) = ∑_{(i,j) ∈ antidiagonal k} hasseDeriv i f * hasseDeriv j g` | Leibniz rule for multiplication, expressed over the antidiagonal of *k*. |
| `hasseDeriv_monomial` | `hasseDeriv k (monomial n r) = monomial (n - k) ((n.choose k) * r)` | Action on monomials — atomic building block. |
| `hasseDeriv_C` | `0 < k ⇒ hasseDeriv k (C r) = 0` | Hasse derivatives of constants vanish for *k > 0*. |
| `hasseDeriv_X` | `1 < k ⇒ hasseDeriv k X = 0` | Higher-order Hasse derivatives of *X* vanish. |
| `natDegree_hasseDeriv_le` | `natDegree (hasseDeriv n p) ≤ natDegree p - n` | Upper bound on natural degree after Hasse differentiation. |
| `natDegree_hasseDeriv` | `[NoZeroSMulDivisors ℕ R] ⇒ natDegree (hasseDeriv n p) = natDegree p - n` | Exact degree drop under mild assumptions on the semiring *R*. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasseDeriv_`: all definitions and lemmas related to Hasse derivatives.
  - `factorial_smul_`, `natDegree_`, `hasseDeriv_comp`, `hasseDeriv_mul`: descriptive naming for properties.
- **Suffixes**:
  - `_apply`: action on a general polynomial.
  - `_coeff`: coefficient-level behavior.
  - `_monomial`, `_C`, `_X`: special cases on basic polynomials.
  - `_zero`, `_one`: base cases *k = 0* or *k = 1*.
  - `_le`, `_eq`: inequality vs equality statements (often with additional hypotheses).
- **Operators**:
  - `•`: scalar multiplication (used in `factorial_smul_hasseDeriv`, `hasseDeriv_comp`).
  - `^[k]`: iteration of a function (e.g., `derivative^[k]`).
  - `antidiagonal k`: finite set `{(i,j) | i + j = k}`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification with precise control over rewrite rules (especially for coefficients, monomials, binomial coefficients). |
| `rw [← ...]` / `rw_mod_cast` | Rewriting with casted equalities (e.g., between `ℕ`, `ℚ`, and `R`). |
| `congr` / `congr 2` | Goal decomposition (especially for extensionality of linear maps or sums). |
| `ext` | Extensionality for linear maps or functions. |
| `by_cases` / `push_neg` | Case analysis on inequalities (e.g., `i < k`, `k ≤ n`). |
| `field_simp; ring` | Rational simplification and algebraic manipulation (in `hasseDeriv_comp`). |
| `norm_cast` | Normalization of casts between number types. |
| `apply nsmul_eq_mul` / `rw [nsmul_eq_mul]` | Conversion between additive and multiplicative scalar actions. |
| `exact ...` / `contrapose!` | Direct proof steps and logical contrapositive reasoning. |
| `tsub_eq_of_eq_add_rev`, `tsub_add_cancel_of_le`, etc. | Arithmetic lemmas for subtraction in `ℕ`. |

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs are largely **inductive** or **coefficient-wise**.
  - For identities involving linear maps (e.g., `hasseDeriv_comp`, `factorial_smul_hasseDeriv`), the standard pattern is:
    1. `ext f n : 2` — extend to arbitrary polynomial and coefficient index.
    2. Expand using `hasseDeriv_coeff`, `coeff_derivative`, etc.
    3. Reduce to binomial identities (e.g., `choose_symm_add`, `choose_succ_right_eq`).
  - For multiplicative properties (`hasseDeriv_mul`):
    - Use `finset_sum_apply`, `monomial_mul_monomial`, and `Finset.sum_congr`.
    - Reduce to combinatorial identity: `∑_{i+j=k} (m.choose i)(n.choose j) = (m+n.choose k)` (`Nat.add_choose_eq`).
- **Key Logical Moves**:
  - Case analysis on `i < k`, `k ≤ n`, etc., to handle vanishing binomial coefficients.
  - Use of `tsub_eq_iff_eq_add_of_le`, `tsub_add_cancel_of_le`, etc., to manage subtraction in `ℕ`.
  - Exploitation of `NoZeroSMulDivisors` to ensure degree drop is exact (non-vanishing of leading coefficient after scaling).

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Polynomial.BigOperators`: for `sum`, `coeff_sum`, `natDegree_sum_le`, etc.
- `Mathlib.Algebra.Polynomial.Derivative`: defines `derivative`, `iterate`, and basic calculus.
- `Mathlib.Data.Nat.Choose.Cast`, `Mathlib.Data.Nat.Choose.Vandermonde`: binomial coefficient arithmetic and identities (e.g., `choose_symm_add`, `add_choose_eq`).
- `Mathlib.Tactic.FieldSimp`, `Mathlib.Tactic.Positivity`: for field simplification and positivity reasoning.

**Scope**:
- Semiring `R` (not necessarily commutative or a field).
- Polynomials over `R`, with support, degree, and coefficient operations.
- Linear maps (`→ₗ[R]`) and additive monoid homomorphisms (`AddMonoidHom`).
- Use of `monomial`, `C`, `X`, `natDegree`, `support`, `coeff`, `sum`.

---

#### **Summary**

This file formalizes the *k*-th Hasse derivative for polynomials over a semiring, emphasizing its role as a normalized version of the *k*-th derivative (scaled by `1/k!`). It establishes foundational algebraic properties (composition, Leibniz rule, degree behavior), and connects it to the standard derivative via factorial scaling. The proofs rely heavily on binomial coefficient identities and careful handling of subtraction in `ℕ`. The formalization is modular, reusable, and aligns with Mathlib’s conventions for polynomial calculus.