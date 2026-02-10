### Technical Brief: Bernoulli Polynomials in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `bernoulli` | `ℕ → ℚ[X]` | Defines the *n*-th Bernoulli polynomial as a finite sum over monomials weighted by Bernoulli numbers and binomial coefficients. |
| `bernoulli_def` | `∀ n, bernoulli n = ∑ i ∈ range (n+1), monomial i (B_{n-i} * choose n i)` | Alternate indexing of the definition (reversed sum). |
| `derivative_bernoulli_add_one` | `∀ k, deriv (bernoulli (k+1)) = (k+1) • bernoulli k` | Derivative recurrence: derivative of *B*_{k+1} is *(k+1)·Bₖ*. |
| `derivative_bernoulli` | `∀ k, deriv (bernoulli k) = k • bernoulli (k-1)` | General derivative formula (handles *k = 0* separately). |
| `sum_bernoulli` | `∑ k ∈ range (n+1), choose (n+1) k • bernoulli k = monomial n (n+1)` | Core identity: binomial-weighted sum of Bernoulli polynomials yields a monomial. |
| `bernoulli_eq_sub_sum` | `(n+1) • Bₙ = Xⁿ·(n+1) - ∑_{k<n} choose (n+1) k • Bₖ` | Rearranged version of `sum_bernoulli`, useful for induction. |
| `sum_range_pow_eq_bernoulli_sub` | `(p+1)·∑_{k<n} kᵖ = B_{p+1}(n) - B_{p+1}` | Connects power sums to Bernoulli polynomials evaluated at integers. |
| `bernoulli_succ_eval` | `B_{p+1}(n) = B_{p+1} + (p+1)·∑_{k<n} kᵖ` | Explicit evaluation of Bernoulli polynomial at natural numbers. |
| `bernoulli_eval_one_add` | `Bₙ(1+x) = Bₙ(x) + n·x^{n-1}` | Functional equation for Bernoulli polynomials (shift by 1). |
| `bernoulli_generating_function` | `(∑ Bₙ(t)·Xⁿ/n!)·(exp X - 1) = X·exp(tX)` | Exponential generating function identity in a ℚ-algebra *A*. |

> **Note**: `_root_.bernoulli` refers to the Bernoulli *numbers* (scalars in ℚ), while `bernoulli` (without underscore) denotes the *polynomials*.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `bernoulli_`: All definitions and theorems related to Bernoulli *polynomials*.
  - `derivative_`: Theorems about derivatives of Bernoulli polynomials.
  - `sum_`: Identities involving sums over binomial coefficients or powers.
  - `eval_`: Theorems about evaluation of polynomials at specific points.

- **Suffixes**:
  - `_add_one`: Recurrence involving *k+1*.
  - `_succ`: Related to successor (e.g., `bernoulli_succ_eval`).
  - `_def`: Definition variants (e.g., `bernoulli_def`).
  - `_eq_`: Equality-based theorems (e.g., `bernoulli_eq_sub_sum`).

- **Special**:
  - `nonrec`: Used for `@[simp]` lemmas that are nonrecursive simplifiers (e.g., `sum_bernoulli`).
  - `mem_range_*`, `tsub_*`, `choose_*`: Standard Mathlib arithmetic lemmas reused.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification + definitional equalities (e.g., `bernoulli_def`, `eval_monomial`). |
| `rw` | Manual rewriting (often with symmetry, e.g., `choose_symm`, `Nat.sub_sub_self`). |
| `congr` / `apply_congr` | Structural congruence for sum terms (e.g., in `sum_bernoulli`, `bernoulli_eval_one_add`). |
| `sum_congr` | Proving termwise equality in finite sums. |
| `field_simp` | Cancelling units like `(n+1)!` in ℚ. |
| `norm_cast` | Managing coercions between `ℕ`, `ℚ`, and `A`. |
| `aesop` (implicit) | Not explicitly used, but `simp` + `rw` + `linarith`-style reasoning dominates. |
| `induction` / `strong_induction_on` | Used in `bernoulli_eval_one_add` (strong induction on *n*). |
| `cases'` / `cases` | Case analysis on naturals (e.g., `k = 0` in derivative). |
| `exact` / `apply` | Goal-directed proof construction (e.g., `exact mod_cast derivative_bernoulli_add_one k`). |

---

#### **4. Proof Logic**

- **Inductive/Recursive Structure**:  
  Proofs often proceed by:
  1. **Unfolding definitions** (`bernoulli`, `eval`, `derivative`).
  2. **Rewriting sums** using `sum_range_succ`, `sum_insert`, `sum_congr`.
  3. **Simplifying coefficients** via binomial identities (`choose_mul_succ_eq`, `choose_symm`).
  4. **Handling edge cases** (e.g., `k = 0`, `n = 0`) separately.
  5. **Canceling units** (e.g., factorials in ℚ) using `field_simp` or `mul_right_inj'`.

- **Key Logical Patterns**:
  - **Sum rearrangements**: `sum_range_reflect`, `sum_flip`, `sum_Ico_Ico_comm`.
  - **Evaluation lemmas**: `eval_finset_sum`, `eval_monomial`, `eval_C`.
  - **Power series coefficient comparison**: `ext n`, `coeff_*` lemmas for generating functions.
  - **Algebraic manipulation in ℚ**: `cast_mul`, `cast_add`, `mul_div_cancel₀`.

- **Induction Strategy**:
  - Strong induction on degree *n* (e.g., `bernoulli_eval_one_add`).
  - Structural induction on naturals via `cases k`.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Algebra.Polynomial.AlgebraMap`: For `aeval`, `algebraMap`, and polynomial evaluation in algebras.
  - `Mathlib.Algebra.Polynomial.Derivative`: Derivative calculus for polynomials.
  - `Mathlib.Data.Nat.Choose.Cast`: Binomial coefficient coercions (`choose n k : ℚ`).
  - `Mathlib.NumberTheory.Bernoulli`: Bernoulli *numbers* (`_root_.bernoulli`).

- **Domain**:  
  - **Algebraic combinatorics** (Bernoulli polynomials, power sums).
  - **Analysis** (exponential generating functions, formal power series).
  - **Number theory** (connection to power sums and zeta values).

- **Noncomputable Section**:  
  Uses `noncomputable section` because Bernoulli numbers are defined classically (via zeta function or generating functions).

---

### Summary

This file formalizes the foundational theory of Bernoulli polynomials in Lean 4, emphasizing:
- Explicit summation definitions,
- Derivative and evaluation properties,
- Connections to power sums (`sum_range_pow_eq_bernoulli_sub`),
- And the exponential generating function identity.

The proofs are highly computational, leveraging Mathlib’s rich library for finite sums, polynomial calculus, and ℚ-algebra manipulations. The style is typical of modern Mathlib: definitional clarity, heavy use of `simp_rw`, and modular decomposition of sums.