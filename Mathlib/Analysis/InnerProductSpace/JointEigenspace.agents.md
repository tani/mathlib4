### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `orthogonalFamily_eigenspace_inf_eigenspace` | `IsSymmetric A → IsSymmetric B → OrthogonalFamily ...` | Shows joint eigenspaces of two commuting symmetric operators form an orthogonal family. |
| `orthogonalFamily_iInf_eigenspaces` | `(∀ i, (T i).IsSymmetric) → OrthogonalFamily ...` | Generalizes orthogonality to joint eigenspaces of a family of commuting symmetric operators. |
| `iSup_eigenspace_inf_eigenspace_of_commute` | `IsSymmetric B → Commute A B → ⨆ γ, eigenspace A α ⊓ eigenspace B γ = eigenspace A α` | Shows that restricting `B` to an eigenspace of `A` diagonalizes it — eigenspaces of `B` within an `A`-eigenspace span that subspace. |
| `iSup_iSup_eigenspace_inf_eigenspace_eq_top_of_commute` | `IsSymmetric A → IsSymmetric B → Commute A B → ⨆ α, ⨆ γ, eigenspace A α ⊓ eigenspace B γ = ⊤` | Simultaneous eigenspaces of `A` and `B` span the whole space. |
| `directSum_isInternal_of_commute` | `IsSymmetric A → IsSymmetric B → Commute A B → DirectSum.IsInternal ...` | Decomposes space as internal direct sum of pairwise orthogonal joint eigenspaces for a commuting pair. |
| `iSup_iInf_eq_top_of_commute` | `(∀ i, (T i).IsSymmetric) → Pairwise (Commute on T) → ⨆ χ, ⨅ i, eigenspace (T i) (χ i) = ⊤` | Simultaneous eigenspaces of a pairwise commuting symmetric family span the space. |
| `directSum_isInternal_of_pairwise_commute` | `(∀ i, (T i).IsSymmetric) → Pairwise (Commute on T) → DirectSum.IsInternal ...` | Internal direct sum decomposition for joint eigenspaces of a commuting family. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `orthogonalFamily_`: asserts orthogonality of families of submodules.
  - `iSup_`, `iInf_`: indexed supremum/infimum over eigenspaces or joint eigenspaces.
  - `directSum_isInternal_`: internal direct sum decomposition results.
  - `eigenspace_inf_eigenspace`: joint eigenspace defined as intersection (`⊓`) of eigenspaces.

- **Suffixes:**
  - `_of_commute`: applies when operators commute.
  - `_eq_top`: result shows that a sum of submodules equals the whole space (`⊤`).
  - `_eq_bot`: result shows orthogonal complement is trivial (`⊥`), often used in duality arguments.

- **Variables:**
  - `α`, `γ`, `χ`: eigenvalues or eigenvalue functions (scalars or tuples).
  - `A`, `B`: binary operators; `T`: family of operators.
  - `hA`, `hB`, `hT`: hypotheses of symmetry.
  - `hAB`, `h`: hypotheses of commutativity.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `conv_rhs => rw [...]`: for targeted rewriting.
- `simp only [...]`: simplification with precise lemmas.
- `congr 1`: congruence to reduce proof obligations.
- `apply ... mp`: applying lemmas in forward direction (e.g., `orthogonal_eq_bot_iff.mp`).
- `rw [...] at H`: rewriting hypotheses.
- `exact ...`: final step in many proofs.
- `all_goals intro ...`: case splitting or introduction of variables.
- `rwa [...]`: rewrite + assumption.
- `calc`: chaining equalities (used in `iSup_iInf_eq_top_of_commute`).

#### 4. **Proof Logic**

- **Inductive/Structural Pattern:**
  - Prove orthogonality first (via `OrthogonalFamily.of_pairwise` or `orthogonalFamily_iInf_eigenspaces`).
  - Use symmetry + finite-dimensionality to get semisimplicity (`isFinitelySemisimple`).
  - Apply invariance under restriction (e.g., `mapsTo_genEigenspace_of_comm`) to reduce to smaller subspaces.
  - Use orthogonal complement arguments: `orthogonalComplement_iSup_eigenspaces_eq_bot` + `orthogonal_eq_bot_iff`.
  - For direct sum decompositions: combine orthogonality + spanning (`isInternal_iff` or `OrthogonalFamily.isInternal_iff`).

- **Common Strategy:**
  - Reduce to known results about single operators (e.g., spectral theorem for symmetric operators).
  - Use inductive or product-indexed constructions for families.
  - Leverage `Pairwise (Commute on T)` to reduce to binary case or apply known lemmas like `iSup_iInf_maxGenEigenspace_eq_top_of_iSup_maxGenEigenspace_eq_top_of_commute`.

#### 5. **Imports**

- `Mathlib.Analysis.InnerProductSpace.Spectrum`: spectral theory in inner product spaces.
- `Mathlib.LinearAlgebra.Eigenspace.Pi`: eigenspaces for product-type families.
- `Mathlib.LinearAlgebra.Eigenspace.Semisimple`: semisimplicity of eigenspace decompositions.
- `Mathlib.Analysis.InnerProductSpace.Semisimple`: finite-dimensional semisimplicity in inner product spaces.

These imports indicate the module sits at the intersection of:
- Spectral theory of symmetric operators,
- Eigenspace decompositions,
- Orthogonal direct sum decompositions in finite-dimensional inner product spaces over `ℝ` or `ℂ` (`RCLike 𝕜`).

--- 

This metadata is suitable for building a domain-specific AI agent focused on automated reasoning in functional analysis and linear algebra, especially for spectral theory and simultaneous diagonalization.