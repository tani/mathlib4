### Technical Brief: Univariate Polynomial Coefficient Theory in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `coeff` | `R[X] → ℕ → R` | Extracts the coefficient of $X^n$ in a polynomial. |
| `coeff_add` | `coeff (p + q) n = coeff p n + coeff q n` | Linearity of coefficients over addition. |
| `coeff_smul` | `coeff (r • p) n = r • coeff p n` | Compatibility of scalar multiplication with coefficients. |
| `coeff_mul` | `coeff (p * q) n = ∑ x ∈ antidiagonal n, coeff p x.1 * coeff q x.2` | Convolution formula for coefficients of product. |
| `constantCoeff` | `R[X] →+* R` | Ring homomorphism sending polynomial to its constant term (`coeff p 0`). |
| `lcoeff R n` | `R[X] →ₗ[R] R` | Linear map version of `coeff`, used for summing over finite sets. |
| `lsum` | `(ℕ → A →ₗ[R] M) → A[X] →ₗ[R] M` | Linearization of `Polynomial.sum`. |
| `support_smul` | `support (r • p) ⊆ support p` | Support shrinks under scalar multiplication. |
| `card_support_mul_le` | `#(p * q).support ≤ #p.support * #q.support` | Upper bound on support size of product. |
| `coeff_X_pow` | `coeff (X^k) n = if n = k then 1 else 0` | Coefficient of monomial $X^k$. |
| `coeff_C_mul_X_pow` | `coeff (C x * X^k) n = if n = k then x else 0` | Coefficient of scalar multiple of monomial. |
| `coeff_mul_X_pow` | `coeff (p * X^n) (d + n) = coeff p d` | Shift property of coefficients under multiplication by $X^n$. |
| `coeff_X_add_C_pow` | `((X + C r)^n).coeff k = r^(n-k) * (n.choose k : R)` | Binomial expansion coefficients. |
| `C_dvd_iff_dvd_coeff` | `C r ∣ φ ↔ ∀ i, r ∣ φ.coeff i` | Divisibility of constant polynomial ↔ divisibility of all coefficients. |
| `update_eq_add_sub_coeff` | `p.update n a = p + C (a - p.coeff n) * X^n` | Polynomial update operation expressed via addition/multiplication. |
| `isRegular_X_pow` | `IsRegular (X^n)` | $X^n$ is regular (left and right cancellable). |
| `natCast_coeff_zero`, `intCast_coeff_zero` | `(n : R[X]).coeff 0 = n`, `(i : R[X]).coeff 0 = i` | Embedding of naturals/integers preserves constant term. |
| `natCast_inj`, `intCast_inj` | `(↑m : R[X]) = ↑n ↔ m = n` | Injectivity of natural/integer embedding under `CharZero`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coeff_`: coefficient-related theorems (e.g., `coeff_add`, `coeff_mul`, `coeff_X_pow`).
  - `lcoeff`, `lsum`: linear map versions (`l` for linear).
  - `isRegular_`: regularity properties (e.g., `isRegular_X_pow`).
  - `card_support_`: cardinality of support (e.g., `card_support_mul_le`, `card_support_binomial`).
  - `C_`, `X_`: operations involving constant polynomials or indeterminate.

- **Suffixes**:
  - `_zero`, `_one`: special cases for low-degree coefficients.
  - `_pow`: exponentiation-related (e.g., `coeff_X_pow`, `coeff_X_add_C_pow`).
  - `_mul`, `_add`: binary operation behavior (e.g., `coeff_mul`, `coeff_add`).
  - `_left`, `_right`: left/right variants (e.g., `coeff_X_mul`, `coeff_mul_X`).
  - `_ite`, `_ite_eq`: conditional expressions (`ite` = if-then-else).

- **Other patterns**:
  - `support_`: support-related lemmas (e.g., `support_binomial`, `support_trinomial`).
  - `natCast_`, `intCast_`: embedding-related properties.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rcases p with ⟨⟩`: destructures polynomials as `Finsupp`/`AddMonoidAlgebra`.
  - `simp_rw [...]`: rewrites using definitional equalities and lemmas.
  - `simp only [...]`: targeted simplification (e.g., with `coeff`, `mem_support_iff`, `ne_eq`).
  - `ext`: extensionality for polynomial equality (via `ext_iff`).
  - `apply subset_antisymm`: proves set equality via double inclusion.
  - `Finset.card_le_card`, `Finset.card_image₂_le`: cardinality reasoning.
  - `rwa [...]`: rewrite + assumption.
  - `cases i`: case analysis on integers/naturals.

- **Advanced tactics**:
  - `dsimp only`: used for definitional simplification in linear maps.
  - `convert`, `congr 1`: congruence-based equality proofs.
  - `intro ... rfl`: pattern matching with equality refl.
  - `rw [Nat.antidiagonal_eq_map]`: rewrites using known combinatorial identities.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **deconstruction → simplification → computation** pattern:
    1. **Destructure** polynomials as `Finsupp` (via `rcases p with ⟨p⟩`).
    2. **Rewrite** using `coeff_ofFinsupp`, `ofFinsupp_mul`, etc.
    3. **Apply** known lemmas from `AddMonoidAlgebra` or `Finsupp`.
    4. **Simplify** using `simp` with lemmas like `coeff_add`, `coeff_mul`, `mem_support_iff`.

- **Common proof techniques**:
  - **Induction**: used implicitly in binomial theorems (`coeff_X_add_C_pow`), often via `add_pow`.
  - **Case analysis on indices**: e.g., `if n = k then ... else ...`.
  - **Antidiagonal summation**: key for multiplication coefficient formula.
  - **Set extensionality**: via `subset_antisymm` for support equalities.
  - **Linear map abstraction**: `lcoeff`, `lsum` enable clean handling of sums over finite sets.

- **Regular elements**: Proofs of regularity use `IsLeftRegular` + symmetry via `commute_X_pow`.

---

#### **5. Imports & Scope**

- **Primary dependencies**:
  - `Mathlib.Algebra.MonoidAlgebra.Support`: support theory for `AddMonoidAlgebra`.
  - `Mathlib.Algebra.Polynomial.Basic`: foundational polynomial definitions.
  - `Mathlib.Algebra.Regular.Basic`: regular element theory.
  - `Mathlib.Data.Nat.Choose.Sum`: binomial coefficient identities.

- **Scope**:
  - Focuses on **univariate polynomials** over a semiring `R`.
  - Emphasizes **coefficient-level reasoning**, support properties, and algebraic structure (e.g., divisibility, regularity).
  - Includes embeddings of `ℕ`, `ℤ`, and `ℝ` (via `ofNat`, `intCast`), with `CharZero` assumptions for injectivity.

---

#### **6. Notable Design Patterns**

- **Finsupp-based semantics**: Polynomials are modeled as `Finsupp ℕ R`, enabling efficient support reasoning.
- **Linear maps for sums**: `lcoeff`, `lsum` abstract summation over finite sets.
- **Conditional simplification**: Heavy use of `if ... then ... else ...` in coefficient definitions (e.g., `coeff_X_pow`).
- **Support finiteness**: All polynomials have finite support by construction (via `Finsupp`).

---

This module forms the backbone of coefficient-level reasoning in Mathlib’s polynomial library, enabling both computational lemmas (e.g., `coeff_mul`) and structural results (e.g., `C_dvd_iff_dvd_coeff`).