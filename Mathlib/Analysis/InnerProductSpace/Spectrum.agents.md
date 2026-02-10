### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSymmetric` | `T : E →ₗ[𝕜] E` is symmetric if `∀ x y, ⟪T x, y⟫ = ⟪x, T y⟫` | Core assumption: self-adjointness of linear operator `T`. |
| `conj_eigenvalue_eq_self` | `hT : T.IsSymmetric → HasEigenvalue T μ → conj μ = μ` | Eigenvalues of a symmetric operator are real. |
| `orthogonalFamily_eigenspaces` | `hT : T.IsSymmetric → OrthogonalFamily (eigenspace T μ)` | Eigenspaces corresponding to distinct eigenvalues are orthogonal. |
| `orthogonalComplement_iSup_eigenspaces_invariant` | `hT : T.IsSymmetric → v ∈ (⨆ μ, eigenspace T μ)ᗮ → T v ∈ (⨆ μ, eigenspace T μ)ᗮ` | The orthogonal complement of the union of eigenspaces is `T`-invariant. |
| `orthogonalComplement_iSup_eigenspaces` | `hT : T.IsSymmetric → eigenspace (T.restrict ...) μ = ⊥` | On the orthogonal complement, `T` has no eigenvalues. |
| `orthogonalComplement_iSup_eigenspaces_eq_bot` | `[FiniteDimensional 𝕜 E] → hT : T.IsSymmetric → (⨆ μ, eigenspace T μ)ᗮ = ⊥` | In finite dimensions, the space decomposes as the orthogonal sum of eigenspaces. |
| `directSumDecomposition` | `[hT : Fact T.IsSymmetric] → DirectSum.Decomposition (eigenspace T μ)` | Instance giving internal direct sum decomposition into eigenspaces. |
| `diagonalization` | `E ≃ₗᵢ[𝕜] PiLp 2 (eigenspace T μ)` | Linear isometry equivalence to the ℓ²-direct sum of eigenspaces. |
| `diagonalization_apply_self_apply` | `hT.diagonalization (T v) μ = μ • hT.diagonalization v μ` | `T` acts diagonally under the `diagonalization` equivalence. |
| `eigenvectorBasis` | `OrthonormalBasis (Fin n) 𝕜 E` | Orthonormal basis of eigenvectors in finite dimension. |
| `eigenvalues` | `Fin n → ℝ` | Real eigenvalues associated to the orthonormal eigenbasis. |
| `eigenvectorBasis_apply_self_apply` | `(hT.eigenvectorBasis).repr (T v) i = μ_i * (hT.eigenvectorBasis).repr v i` | `T` acts diagonally in the Euclidean coordinate chart induced by eigenbasis. |
| `inner_product_apply_eigenvector` | `v ∈ eigenspace T μ → ⟪v, T v⟫ = μ ‖v‖²` | Quadratic form evaluated on eigenvector. |
| `eigenvalue_nonneg_of_nonneg` | `(∀ x, 0 ≤ ⟪x, T x⟫) → HasEigenvalue T μ → 0 ≤ μ` | Positivity of quadratic form implies nonnegative eigenvalues. |
| `eigenvalue_pos_of_pos` | `(∀ x, 0 < ⟪x, T x⟫) → HasEigenvalue T μ → 0 < μ` | Strict positivity of quadratic form implies positive eigenvalues. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isSymmetric_...`: properties of symmetric operators (`isSymmetric.conj_eigenvalue_eq_self`, `isSymmetric.orthogonalFamily_eigenspaces`).
  - `orthogonalComplement_...`: properties involving orthogonal complements.
  - `direct_sum_...`: decomposition-related results.
  - `diagonalization_...`: versioned spectral theorems.
  - `eigenvectorBasis_...`, `eigenvalues`: finite-dimensional spectral data.

- **Suffixes**:
  - `_eq_bot`: equality to the zero submodule.
  - `_invariant`: invariance under operator.
  - `_apply_self_apply`: diagonal action of `T` under some equivalence.
  - `_of_nonneg`, `_of_pos`: monotonicity of eigenvalues w.r.t. quadratic form.

- **Notation**:
  - `⟪x, y⟫` for inner product (scoped locally).
  - `μ`, `v`, `w`, `T` standard for eigenvalue, eigenvector, operator.
  - `eigenspace T μ`: standard notation for eigenspace.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `intro`, `rw`, `simp`, `simpa`, `exact`, `refine`, `cases`, `by_cases`
- **Domain-specific**:
  - `rwa` (rewrite + assumption)
  - `convert` (via `congr_arg`, `congr_fun`)
  - `mod_cast` (cast between real/complex scalars)
  - `exact_mod_cast` (used in comments, but `mod_cast` preferred)
  - `apply_fun`, `funext`, `ext`
- **Library support**:
  - `subsingleton_of_no_eigenvalue_finiteDimensional` (from `Mathlib.LinearAlgebra.Eigenspace.Minpoly`)
  - `orthogonalProjection`, `iSup`, `iInf`, `orthogonal`, `DirectSum.decompose`
  - `isometryL2OfOrthogonalFamily`, `subordinateOrthonormalBasis`

---

#### 4. **Proof Logic**

- **General structure**:
  - **Step 1**: Use symmetry to derive basic spectral properties (reality of eigenvalues, orthogonality of eigenspaces).
  - **Step 2**: Show invariance of orthogonal complement of eigenspaces.
  - **Step 3**: Prove no eigenvalues on that complement (via contradiction or subsingleness).
  - **Step 4**: In finite dimensions, deduce complement is trivial → direct sum decomposition.
  - **Step 5**: Construct explicit isometries (`diagonalization`, `eigenvectorBasis`) and verify diagonal action.

- **Common proof patterns**:
  - **Induction on dimension** (implicit via `finiteDimensional` + `subsingleton_of_no_eigenvalue_finiteDimensional`).
  - **Case analysis on eigenvector ≠ 0** (to avoid division by zero).
  - **Use of `hasEigenvalue_of_hasEigenvector` / `hasEigenvector_of_hasEigenvalue`** to switch between definitions.
  - **Quadratic form manipulation** (e.g., `inner_product_apply_eigenvector`).
  - **Orthogonality arguments** (e.g., `disjoint`, `isOrtho_orthogonal_right`).

---

#### 5. **Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.InnerProductSpace.Rayleigh` | Rayleigh quotient, basic spectral theory tools. |
| `Mathlib.Analysis.InnerProductSpace.PiL2` | ℓ²-direct sums (`PiLp 2`), orthonormal bases, `PiL2`-isometries. |
| `Mathlib.Algebra.DirectSum.Decomposition` | Direct sum decompositions, `DirectSum.Decomposition`, `isInternal`. |
| `Mathlib.LinearAlgebra.Eigenspace.Minpoly` | Eigenspaces, minimal polynomial, `subsingleton_of_no_eigenvalue_finiteDimensional`. |

**Additional context**:
- Uses `RCLike 𝕜` to handle both `ℝ` and `ℂ` uniformly.
- Relies heavily on `Module.End`, `Submodule`, `OrthogonalFamily`, `OrthonormalBasis`, `EuclideanSpace`.
- Heavy use of `Fact` for instance parameters to enable typeclass inference.

--- 

Let me know if you'd like a dependency graph or a tactic trace for a specific theorem.