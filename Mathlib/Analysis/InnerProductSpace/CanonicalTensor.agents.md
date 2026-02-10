**Technical Brief: `CanonicalTensor.lean`**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type | Purpose |
|------|------|---------|
| `canonicalContravariantTensor` | `E ⊗[ℝ] E →ₗ[ℝ] ℝ` | Represents the inner product as a linear map from the tensor product to ℝ; corresponds to the metric tensor (type (0,2)). |
| `canonicalCovariantTensor` | `E ⊗[ℝ] E` (requires `FiniteDimensional ℝ E`) | The dual element of `canonicalContravariantTensor` under the canonical isomorphism $E \otimes E \cong (E \otimes E)^\*$; corresponds to the inverse metric (type (2,0)), often called the *Kronecker tensor*. |
| `canonicalCovariantTensor_eq_sum` | `∀ v : OrthonormalBasis ι ℝ E, canonicalCovariantTensor E = ∑ i, v i ⊗ₜ v i` | Shows that the canonical covariant tensor is independent of the choice of orthonormal basis and computes it explicitly as the sum of simple tensors over any orthonormal basis. |

---

### 2. NAMING CONVENTIONS

- **Prefix `canonical_`**: Indicates canonical constructions intrinsic to the structure (e.g., inner product space).
- **Suffix `_tensor`**: Denotes tensorial objects (covariant or contravariant).
- **`_contravariant` / `_covariant`**: Distinguishes between contravariant (linear map out of tensor) and covariant (element of tensor) forms.
- **`stdOrthonormalBasis`**: Standard orthonormal basis for finite-dimensional inner product spaces over ℝ.

---

### 3. TACTIC STACK

- `simp only [...]`: Extensive use of `simp` with explicit lemmas (e.g., `orthonormal_iff_ite`, `real_inner_comm`, `sum_repr'`).
- `congr 1 with m`: To reduce equality of sums to pointwise equality.
- `rw [...]`: Rewriting using orthonormality and basis expansion lemmas.
- `tauto`: For simple logical reasoning in `ite` simplifications.
- `simp_rw [...]`: For rewriting under summation with `sum_inner_mul_inner`.
- `Finset.sum_comm`: To reorder double sums.
- `calc`: Structured chain of equalities for the main theorem proof.

---

### 4. PROOF LOGIC

The proof of `canonicalCovariantTensor_eq_sum` proceeds as follows:

1. **Start** from the definition using `stdOrthonormalBasis`.
2. **Insert an identity resolution** using orthonormal basis expansion:  
   $ \delta_{mn} = \sum_i \langle w_m, v_i \rangle \langle v_i, w_n \rangle $.
3. **Rewrite** the sum using orthonormal basis expansion (`sum_inner_mul_inner`).
4. **Symmetrize** inner products using `real_inner_comm`.
5. **Rearrange sums** (via `sum_tmul`, `smul_tmul_smul`, `sum_comm`) to factor into tensor products of sums.
6. **Apply** the representation formula for basis vectors:  
   $ v_i = \sum_m \langle w_m, v_i \rangle w_m $, i.e., `w.sum_repr'`.
7. **Simplify** to obtain the desired expression in terms of arbitrary orthonormal basis `v`.

The key idea is to show that the expression is independent of the choice of orthonormal basis by relating any two via unitary transformations and using invariance of the sum under change of orthonormal basis.

---

### 5. IMPORTS

- `Mathlib.Analysis.InnerProductSpace.PiL2`: Provides foundational results on inner product spaces, including `innerₗ`, `lift`, and orthonormal basis machinery (`stdOrthonormalBasis`, `OrthonormalBasis`, etc.).

---

### 6. DEPENDENCY & THEORY OVERVIEW

#### Mermaid Diagram: Module Dependencies

```mermaid
graph TD
  A[CanonicalTensor.lean] --> B[Mathlib.Analysis.InnerProductSpace.PiL2]
  B --> C[Mathlib.Analysis.InnerProductSpace.Basic]
  B --> D[Mathlib.LinearAlgebra.TensorProduct]
  B --> E[Mathlib.LinearAlgebra.FiniteDimensional]
  B --> F[Mathlib.Order.Filter.Basic]  %% for Fintype, etc.
```

#### Mermaid Diagram: Theoretical Flow

```mermaid
graph LR
  A[InnerProductSpace ℝ E] --> B[Inner product map innerₗ : E → E → ℝ]
  B --> C[Lift to tensor: E ⊗ E → ℝ]
  C --> D[canonicalContravariantTensor]
  
  A --> E[FiniteDimensional ℝ E]
  E --> F[Isomorphism E ⊗ E ≃ (E ⊗ E)ᵈ]
  D --> G[Dual element under iso]
  G --> H[canonicalCovariantTensor]
  
  H --> I[Expression via orthonormal basis]
  I --> J[canonicalCovariantTensor_eq_sum]
```

#### Summary

This module formalizes the *metric tensor* and its dual (the *Kronecker tensor*) in a real inner product space. It leverages the Riesz representation theorem implicitly via the isomorphism $E \cong E^\*$ in finite dimensions, and constructs the canonical symmetric 2-tensor that corresponds to the inner product. The explicit basis-independent formula $ \sum_i e_i \otimes e_i $ is proven to be independent of the orthonormal basis used — a key property for geometric applications (e.g., in Riemannian geometry or quantum mechanics).

--- 

Let me know if you'd like a formalized dependency graph or a comparison with similar constructions in other libraries (e.g., `Mathlib.LinearAlgebra.TensorProduct.Basic`).
