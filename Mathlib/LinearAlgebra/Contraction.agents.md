### Technical Metadata Brief: `Mathlib.LinearAlgebra.Contraction`

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `contractLeft` | `Module.Dual R M ⊗[R] M →ₗ[R] R` | Natural left pairing: evaluates a dual vector on a vector. |
| `contractRight` | `M ⊗[R] Module.Dual R M →ₗ[R] R` | Natural right pairing: same as above but with tensor order flipped. |
| `dualTensorHom` | `Module.Dual R M ⊗[R] N →ₗ[R] M →ₗ[R] N` | Canonical map from dual ⊗ N to linear maps M → N. |
| `dualTensorHomEquivOfBasis` | `Module.Dual R M ⊗[R] N ≃ₗ[R] M →ₗ[R] N` | Equivalence when *M* is free (requires a basis). |
| `dualTensorHomEquiv` | `Module.Dual R M ⊗[R] N ≃ₗ[R] M →ₗ[R] N` | Equivalence when *M* is finite free (uses `chooseBasis`). |
| `lTensorHomEquivHomLTensor` | `P ⊗[R] (M →ₗ[R] Q) ≃ₗ[R] M →ₗ[R] P ⊗[R] Q` | Currying isomorphism for tensor-hom interaction (left version). |
| `rTensorHomEquivHomRTensor` | `(M →ₗ[R] P) ⊗[R] Q ≃ₗ[R] M →ₗ[R] P ⊗[R] Q` | Currying isomorphism for tensor-hom interaction (right version). |
| `homTensorHomEquiv` | `(M →ₗ[R] P) ⊗[R] (N →ₗ[R] Q) ≃ₗ[R] M ⊗[R] N →ₗ[R] P ⊗[R] Q` | Tensor-hom adjunction isomorphism for two modules. |

**Key Theorems (Simp lemmas & properties):**
- `contractLeft_apply`, `contractRight_apply`: Evaluate on simple tensors.
- `dualTensorHom_apply`: Action on simple tensors: `(f ⊗ n) ↦ (m ↦ f m • n)`.
- `transpose_dualTensorHom`: Relates transpose of `dualTensorHom` to swapped arguments.
- `map_dualTensorHom`: Compatibility with tensor product of maps.
- `comp_dualTensorHom`: Composition rule: `g ⊗ p ∘ f ⊗ n = g(n) • f ⊗ p`.
- `toMatrix_dualTensorHom`: Matrix representation is a standard basis matrix.
- `lTensorHomEquivHomLTensor_toLinearMap`, `rTensorHomEquivHomRTensor_toLinearMap`, `homTensorHomEquiv_toLinearMap`: Show equivalences extend the underlying maps.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `contract*`: Pairings between module and dual.
  - `dualTensor*`: Maps involving `M* ⊗ N`.
  - `*TensorHom*`, `*HomTensor*`: Tensor-hom interaction maps.
- **Suffixes:**
  - `Equiv`: Equivalence of linear maps (when invertible).
  - `OfBasis`: Construction depending on a chosen basis.
  - `apply`: Simp lemmas for action on elements.
  - `toLinearMap`: Relates equivalence to underlying linear map.
- **Other patterns:**
  - `prodMap`, `fst`, `inl`, `inr`: Used for product/module morphisms.
  - `stdBasisMatrix`, `coord`, `dualBasis`: Basis-related utilities.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: Extensive simplification using `simp` lemmas (e.g., `dualTensorHom_apply`, `LinearMap.smul_apply`, `Basis.coord_apply`).
- `ext`: Extensionality for linear maps/tensor products.
- `rw [...]`: Rewriting using definitions or lemmas (e.g., `← map_sum`, `smul_comm`).
- `cases'`: Case analysis on equalities (e.g., `cases' hij with hij hij`).
- `exact`, `refine`: Direct proof steps, often after `ext`.
- `classical`: Used to resolve decidability issues (e.g., basis choice).
- `cancel_right`, `cancel_left`: For proving equality of maps using surjectivity/injectivity.
- `congr`, `≪≫ₗ`: For constructing composite linear equivalences.

---

#### **4. Proof Logic**

- **Structure:** Proofs follow a pattern of:
  1. **Extensionality (`ext`)** to reduce to simple tensors or pointwise evaluation.
  2. **Simplification (`simp only`)** using definitional lemmas (`*_apply`, `*_toLinearMap`, `*_symm_cancel_*`).
  3. **Algebraic manipulation** (e.g., `rw [smul_comm]`, `ring`, `mul_comm`) to match target expressions.
  4. **Basis expansion** (e.g., `b.sum_repr`, `sum_tmul`, `Basis.sum_dual_apply_smul_coord`) in proofs involving `dualTensorHomEquivOfBasis`.
- **Induction/Case Splitting:** Rare; mostly algebraic reasoning.
- **Equivalence proofs:** Use `LinearEquiv.ofLinear` with explicit inverse constructions (sum over basis).
- **Matrix proofs:** Use `toMatrix_apply` and case analysis on index equality.

---

#### **5. Imports & Scope**

**Primary Imports:**
- `Mathlib.LinearAlgebra.Dual`: Dual module, evaluation map, transpose.
- `Mathlib.LinearAlgebra.Matrix.ToLin`: Matrix ↔ linear map correspondence.

**Domain Scope:**
- **Modules over a commutative semiring/ring.**
- **Free & finite free modules** (via `Basis`, `Free`, `Finite`).
- **Tensor products**, **duals**, **hom-modules**, and their interactions.
- **Matrix representations** of linear maps (via `toMatrix`).

**Key Structures Used:**
- `Module R M`, `AddCommMonoid`, `AddCommGroup`
- `Basis ι R M`, `Fintype ι`, `DecidableEq ι`
- `TensorProduct R M N`, `LinearMap R M N`, `Module.Dual R M`
- `LinearEquiv`, `congr`, `arrowCongr`, `lift.equiv`

---

### Summary

This file formalizes foundational *contraction* and *tensor-hom adjunction* maps in linear algebra over commutative rings, with emphasis on finite free modules. It establishes canonical linear maps and proves they are equivalences when bases exist, providing explicit inverses and verifying matrix representations. The proofs rely heavily on simplification, basis expansions, and extensionality arguments.