### Technical Metadata Brief: Bernoulli Numbers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `bernoulli' : ℕ → ℚ` | Recursive definition via well-founded induction | Positive Bernoulli numbers defined by:  
$$B_n = 1 - \sum_{k < n} \binom{n}{k} \frac{B_k}{n - k + 1}$$ |
| `bernoulli : ℕ → ℚ` | `(-1)^n * bernoulli' n` | Standard Bernoulli numbers (including sign convention for odd indices > 1) |
| `bernoulli'PowerSeries A` | `PowerSeries A` | Exponential generating function: $\sum B_n' \frac{t^n}{n!}$ |
| `bernoulliPowerSeries A` | `PowerSeries A` | Exponential generating function for standard Bernoulli numbers |
| `bernoulli'_def`, `bernoulli'_def'` | Equality lemmas | Explicit recursive formula for `bernoulli'` |
| `bernoulli'_spec`, `bernoulli'_spec'` | Sum identities over `range` / `antidiagonal` | Key functional equation used in proofs |
| `sum_bernoulli'`, `sum_bernoulli` | `∑ k ∈ range n, (n.choose k : ℚ) * bernoulli' k = n`  
`∑ k ∈ range n, (n.choose k : ℚ) * bernoulli k = if n = 1 then 1 else 0` | Convolution identities encoding generating function relation |
| `bernoulli'_odd_eq_zero` | `Odd n → 1 < n → bernoulli' n = 0` | Vanishing of odd-indexed positive Bernoulli numbers beyond $B_1$ |
| `bernoulliPowerSeries_mul_exp_sub_one` | `bernoulliPowerSeries A * (exp A - 1) = X` | Core functional equation linking Bernoulli numbers to exponential series |
| `sum_range_pow` | Faulhaber’s formula | Closed-form expression for $\sum_{k=0}^{n-1} k^p$ in terms of Bernoulli numbers |
| `sum_Ico_pow` | Alternate Faulhaber form | Sum from $1$ to $n$, using `bernoulli'` instead of `bernoulli` |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `bernoulli'`: denotes *positive* Bernoulli numbers (no parity sign).
  - `bernoulli`: standard Bernoulli numbers (with parity sign).
- **Suffixes**:
  - `_def`: definition or equivalent form.
  - `_spec`, `_spec'`: key specification identities (often convolution-type).
  - `_PowerSeries`: power series constructions.
  - `sum_`: summation identities.
- **Other patterns**:
  - `eq_bernoulli'_of_ne_one`: conditional equivalence between `bernoulli` and `bernoulli'`.
  - `mul_exp_sub_one`: functional equations involving `(exp - 1)`.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` / `rw_mod_cast` | Rewriting definitions, especially with casts between `ℕ`, `ℚ`, and `A`. |
| `simp` / `simp_rw` | Simplifying sums, factorials, binomial coefficients, and `if`-expressions. |
| `norm_num` | Normalizing rational arithmetic and evaluating small cases (`B₀`, `B₁`, etc.). |
| `field_simp` | Simplifying divisions in ℚ, especially with factorials and nonzero denominators. |
| `congr` / `congr_arg` | Proving equality of sums or power series coefficients. |
| `ext` | Proving equality of power series by extensionality (`PowerSeries.ext`). |
| `have` / `suffices` / `convert` | Structuring intermediate lemmas and proof goals. |
| `cases'` | Inductive or case analysis on natural numbers or hypotheses. |
| `ring` | Solving polynomial identities in ℚ or `A`. |
| `aesop` (not explicitly used here) | Not present in this file; likely not needed due to heavy algebraic manipulation. |

---

#### **4. Proof Logic**

- **Inductive/Recursive Structure**:  
  Definitions use `WellFounded.fix` on `Nat.lt_wfRel.wf`, enabling well-founded recursion over `ℕ`.

- **Common Proof Strategy**:
  1. **Base Cases**: Small values (`n = 0, 1, 2, 3, 4`) verified via `norm_num` and `simp`.
  2. **Convolution Identities**: Prove key sums like `bernoulli'_spec` using `Finset.sum_eq_zero`, symmetry (`choose_symm`), and `tsub_self`.
  3. **Power Series Manipulation**:
     - Use `coeff_mul`, `coeff_exp`, `coeff_X`, and `sum_antidiagonal_*` lemmas.
     - Convert coefficient-wise identities to factorial/binomial identities.
     - Apply `field_simp`, `factorial_mul_factorial_dvd_factorial_add`, and `choose_mul_succ_eq`.
  4. **Parity Arguments**:
     - For `bernoulli'_odd_eq_zero`, compare `B - evalNegHom B` with `X` using `mul_right_inj'`.
  5. **Faulhaber’s Formula**:
     - Derive via Cauchy product of power series: `bernoulliPowerSeries * (exp^n - 1) = X * ...`.
     - Use `geom_sum_mul`, `exp_pow_sum`, and `mul_right_inj'` (requires `exp - 1 ≠ 0`).
     - Translate between sums over `range`, `Ico`, and `antidiagonal`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.RingTheory.PowerSeries.Inverse` | Inverses and basic operations on power series (e.g., `exp`, `X`, `1`). |
| `Mathlib.RingTheory.PowerSeries.WellKnown` | Standard power series (`exp`, `coeff_*`, `mul`, etc.). |

These imports provide foundational tools for manipulating formal power series over `CommRing A` with `Algebra ℚ A`, especially:
- `exp`, `coeff`, `X`, `mul`, `sub`, `one`
- `mk`, `evalNegHom`, `rescale`, `geom_sum_mul`, `exp_pow_eq_rescale_exp`

---

### Summary

This file formalizes Bernoulli numbers in Lean 4 using a well-founded recursive definition, establishes their core algebraic and analytic properties (including generating functions and vanishing of odd terms), and proves **Faulhaber’s formula** for sums of powers. The proofs rely heavily on:
- Power series calculus (especially coefficient extraction and multiplication),
- Binomial coefficient identities,
- Rational arithmetic simplifications (`field_simp`, `norm_num`),
- Parity-based case analysis.

The implementation reflects a *mathematically clean* separation between `bernoulli'` (positive) and `bernoulli` (signed), aligning with standard conventions in number theory.