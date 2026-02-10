Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Algebra Isomorphism Between Matrices of Polynomials and Polynomials of Matrices**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `toFunBilinear` | `A →ₗ[A] R[X] →ₗ[R] A[X]` — Bilinear map underlying the algebra homomorphism `A ⊗[R] R[X] →ₐ[R] A[X]`. |
| `toFunLinear` | `A ⊗[R] R[X] →ₗ[R] A[X]` — Linear map induced by `toFunBilinear` via the universal property of tensor product. |
| `toFunAlgHom` | `A ⊗[R] R[X] →ₐ[R] A[X]` — Algebra homomorphism constructed from `toFunLinear`, verified to preserve multiplication and unit. |
| `invFun` | `A[X] → A ⊗[R] R[X]` — Bare function (not a priori algebra map), defined via `eval₂` using `includeLeft`. Used to construct inverse of `toFunAlgHom`. |
| `equiv` | `A ⊗[R] R[X] ≃ A[X]` — Equivalence of types (not yet algebra), with inverse `invFun`. |
| `polyEquivTensor` | `A[X] ≃ₐ[R] A ⊗[R] R[X]` — **Algebra isomorphism** (the main equivalence of the `PolyEquivTensor` namespace). |
| `matPolyEquiv` | `Matrix n n R[X] ≃ₐ[R] (Matrix n n R)[X]` — **Key algebra isomorphism**: matrices of polynomials ↔ polynomials of matrices. Constructed via `matrixEquivTensor`, `Algebra.TensorProduct.comm`, and `polyEquivTensor.symm`. |
| `matPolyEquiv_coeff_apply` | `coeff (matPolyEquiv m) k i j = coeff (m i j) k` — **Characterization**: coefficient of degree `k` in `(matPolyEquiv m) i j` equals coefficient of degree `k` in `m i j`. |
| `matPolyEquiv_symm_apply_coeff` | `coeff (matPolyEquiv.symm p i j) k = coeff p k i j` — Inverse direction of above. |
| `RingHom.polyToMatrix` | `(A →+* Mₙ(R)) → (A[X] →+* Mₙ(R[X]))` — Extension of ring homomorphism to polynomial rings via `matPolyEquiv.symm`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `toFun*`: Implementation details for constructing algebra homomorphisms (`toFunBilinear`, `toFunLinear`, `toFunAlgHom`).
  - `invFun`: Inverse function (bare, not algebraic a priori).
  - `matPolyEquiv*`: Pertaining to the matrix–polynomial isomorphism.
  - `polyEquivTensor*`: Pertaining to the polynomial–tensor isomorphism.
- **Suffixes**:
  - `*apply`: Lemmas about application of maps on generators (e.g., `tmul`, `monomial`, `stdBasisMatrix`).
  - `*aux_*`: Intermediate technical lemmas (e.g., `toFunLinear_mul_tmul_mul_aux_1`, `matPolyEquiv_coeff_apply_aux_1`).
- **`*coeff_apply`**: Coefficient-wise behavior of `matPolyEquiv`.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Extensive simplification, especially with `coeff`, `sum`, `monomial`, `tmul`, `eval₂`.
- `induction_on` / `induction_on'`: Structural induction on polynomials and matrices.
- `ext`: Extensionality for functions/morphisms (especially coefficient-wise).
- `congr`: Congruence reasoning (e.g., for sums over indices).
- `rw`: Rewriting using lemmas like `coeff_mul`, `map_sum`, `smul_tmul`, etc.
- `split_ifs`: Handling `ite` expressions (e.g., in `coeff_monomial`).
- `classical`: Classical reasoning for decidability assumptions.
- `conv_rhs`: Focused rewriting on right-hand side of equations.

#### **4. Proof Logic**

- **Main strategy**:
  1. Construct algebra isomorphism `A ⊗[R] R[X] ≃ₐ[R] A[X]` via bilinear → linear → algebra map.
  2. Prove inverse explicitly (`invFun`) and verify `left_inv`/`right_inv` using:
     - Tensor induction (`TensorProduct.induction_on`)
     - Polynomial induction (`Polynomial.induction_on'`)
     - Explicit computation on generators (`tmul`, `monomial`).
  3. Combine with known isomorphisms:
     - `Matrix n n A ≃ₐ[R] A ⊗[R] Matrix n n R` (from `RingTheory.MatrixAlgebra`)
     - `A ⊗[R] R[X] ≃ₐ[R] A[X]` (just constructed)
     - `Matrix n n R[X] ≃ₐ[R] (Matrix n n R) ⊗[R] R[X]` (via `matrixEquivTensor`)
     - `A ⊗[R] R[X] ≃ R[X] ⊗[R] A` (via `Algebra.TensorProduct.comm`)
  4. Assemble `matPolyEquiv` as a composition of these equivalences.
  5. Prove key properties (e.g., `matPolyEquiv_coeff_apply`) by:
     - Reducing to `stdBasisMatrix` and `monomial` (via matrix/polynomial induction).
     - Computing coefficients explicitly using `coeff_monomial`, `coeff_sum`, etc.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Polynomial.AlgebraMap`
  - `Mathlib.Data.Matrix.Basis`
  - `Mathlib.Data.Matrix.Composition`
  - `Mathlib.Data.Matrix.DMatrix`
  - `Mathlib.RingTheory.MatrixAlgebra`
- **Scope**:
  - Commutative semirings (`CommSemiring R`)
  - Semirings with algebra structure (`[Semiring A] [Algebra R A]`)
  - Finite types `n` for matrix dimensions (`[Fintype n] [DecidableEq n]`)
- **Goal**: Prepare machinery for the **Cayley–Hamilton theorem**, via the isomorphism `matPolyEquiv`.

---

This module formalizes a foundational structural equivalence used to translate between matrix-valued polynomials and polynomial-valued matrices — a critical step in formalizing Cayley–Hamilton in a coordinate-free or basis-independent manner.