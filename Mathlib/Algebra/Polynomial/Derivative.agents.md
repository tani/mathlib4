### Technical Metadata Brief: `Polynomial.Derivative` Module (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `derivative` | `R[X] →ₗ[R] R[X]` | Formal derivative as an `R`-linear map; defined via sum over coefficients: `∑ n a, C(a * n) * X^(n-1)` |
| `derivative_apply` | `derivative p = ∑ n a, C(a * n) * X^(n-1)` | Definition unfolding |
| `coeff_derivative` | `coeff (derivative p) n = coeff p (n + 1) * (n + 1)` | Coefficient-wise formula for derivative |
| `iterate_derivative` | `derivative^[k]` | `k`-th iterated derivative (via `LinearMap.pow`) |
| `derivativeFinsupp` | `R[X] →ₗ[R] ℕ →₀ R[X]` | Finite-support function sending `k ↦ derivative^[k] p` |
| `derivative_mul` | `derivative (f * g) = derivative f * g + f * derivative g` | Leibniz rule (product rule) |
| `derivative_comp` | `derivative (p.comp q) = derivative q * p.derivative.comp q` | Chain rule for composition |
| `derivative_pow` | `derivative (p ^ n) = C n * p^(n-1) * derivative p` | Power rule |
| `natDegree_derivative_lt` | `p.natDegree ≠ 0 ⇒ derivative p.natDegree < p.natDegree` | Degree drops under derivative (non-constant case) |
| `natDegree_eq_zero_of_derivative_eq_zero` | `[NoZeroSMulDivisors ℕ R] ⇒ derivative f = 0 ⇒ f.natDegree = 0` | Only constants have zero derivative |
| `eq_C_of_derivative_eq_zero` | `[NoZeroSMulDivisors ℕ R] ⇒ derivative f = 0 ⇒ f = C (f.coeff 0)` | Characterization of polynomials with zero derivative |
| `iterate_derivative_eq_zero` | `p.natDegree < x ⇒ derivative^[x] p = 0` | High enough derivative of any polynomial is zero |
| `coeff_iterate_derivative` | `(derivative^[k] p).coeff m = (m + k).descFactorial k • p.coeff (m + k)` | Explicit coefficient formula for iterated derivative |
| `iterate_derivative_mul` | Leibniz rule for `k`-th derivative of product: `∑_{i=0}^k (k choose i) * derivative^[k-i] p * derivative^[i] q` | Generalized product rule (Faà di Bruno for polynomials) |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `derivative_`: Basic derivative properties (`derivative_apply`, `derivative_mul`, `derivative_X_pow`, etc.)
  - `iterate_derivative_`: Iterated derivatives (`iterate_derivative_zero`, `iterate_derivative_smul`, `iterate_derivative_eq_zero`, etc.)
  - `derivativeFinsupp_`: Properties of the finite-support version (`derivativeFinsupp_C`, `derivativeFinsupp_derivative`, etc.)
- **Suffixes**:
  - `_mul`, `_add`, `_sub`, `_neg`: Binary/unary operations
  - `_pow`, `_sq`: Powers and squares
  - `_C`, `_X`, `_X_pow`: Special cases with constants or `X`
  - `_natCast`, `_intCast`: For natural/integer scalars (deprecated aliases also exist)
- **Special**:
  - `mem_support_derivative`: Membership in support
  - `degree_derivative_`, `natDegree_derivative_`: Degree comparisons
  - `dvd_derivative_iff`: Divisibility characterization

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only`: Simplification with lemmas, especially `coeff_derivative`, `derivative_apply`, `derivative_C`, `derivative_X`, etc.
- `rw`: Rewriting using definitions and lemmas (e.g., `coeff_derivative`, `derivative_mul`, `pow_succ`)
- `induction` / `induction'`: Structural induction on polynomials (`Polynomial.induction_on'`) or on natural numbers (`Nat.strong_induction_on`, `Nat.casesOn`)
- `cases`: Case analysis on `n`, `p`, or `h : p = 0`
- `congr`: Congruence reasoning (e.g., for sums, products)
- `ring`: Simplifying commutative ring expressions (especially in `CommSemiring` section)
- `aesop`: Used in some `map_add'`, `map_smul'` proofs for automation
- `ext`: Extensionality for functions/finsups
- `norm_cast`: For casting between `ℕ`, `ℤ`, and `R`
- `push_neg`, `contrapose`: Logical manipulations
- `omega`: For arithmetic goals (e.g., in `iterate_derivative_mul`)

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Polynomials are handled via `Polynomial.induction_on'` (induction on monomials and sums).
  - Natural numbers often use `Nat.strong_induction_on`, `Nat.casesOn`, or standard induction.
- **Common proof patterns**:
  - **Coefficient-wise reasoning**: Prove equality by showing all coefficients match (`Polynomial.ext_iff`).
  - **Support analysis**: Use `mem_support_derivative`, `degree_derivative_lt`, `natDegree_derivative_le`.
  - **Degree arguments**: Compare degrees/nat-degrees to deduce zero or equality.
  - **Divisibility**: Use `pow_sub_one_dvd_derivative_of_pow_dvd` and variants for repeated root analysis.
  - **Linearity & module actions**: Leverage `LinearMap` properties (`map_add`, `map_smul`, `map_neg`, etc.).
  - **Chain rule & composition**: Prove via induction on `p`, reducing to powers and monomials.
- **Key logical flow**:
  - For product/chain rules: Induct on structure → reduce to monomials → simplify using `derivative_monomial`, `monomial_mul_monomial`, etc.
  - For `iterate_derivative_mul`: Induct on `n`, apply `derivative_mul` and binomial identities (`Nat.choose_succ_succ`).
  - For `natDegree_eq_zero_of_derivative_eq_zero`: Contrapositive via leading coefficient and `NoZeroSMulDivisors`.

---

#### **5. Imports**

Core dependencies defining scope:
- `Mathlib.Algebra.Polynomial.Degree.Domain`: Degree theory for polynomials over domains.
- `Mathlib.Algebra.Polynomial.Degree.Support`: Support and degree lemmas.
- `Mathlib.Algebra.Polynomial.Eval.Coeff`: Evaluation and coefficient interactions.
- `Mathlib.GroupTheory.GroupAction.Ring`: Scalar actions and module structures (used for `smul`, `DistribMulAction`, etc.).

> **Note**: The module is self-contained for formal derivative calculus over arbitrary semirings/rings, with extensions to commutative settings and no-zero-divisors assumptions.

--- 

This metadata reflects the formalization of the *formal derivative* in Lean 4, emphasizing its algebraic structure, iterated behavior, and interaction with ring operations, degree, and evaluation.