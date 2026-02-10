### Technical Metadata Brief: `Analysis.InnerProductSpace.LpPi`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `PiLp.innerProductSpace` | Instance: `PiLp 2 f` is an inner product space with inner product `∑ i, ⟪x i, y i⟫`. |
| `EuclideanSpace 𝕜 n` | Abbreviation: `PiLp 2 (λ _ : n => 𝕜)`, i.e., `L²` space of functions `n → 𝕜`. |
| `OrthonormalBasis 𝕜 ι E` | Structure: a linear isometric equivalence `E ≃ₗᵢ[𝕜] EuclideanSpace 𝕜 ι`. |
| `Basis.toOrthonormalBasis` | Constructor: turns a `Basis` that is orthonormal into an `OrthonormalBasis`. |
| `OrthonormalBasis.mk` | Constructor: finite orthonormal spanning family → orthonormal basis. |
| `OrthonormalBasis.mkOfOrthogonalEqBot` | Constructor: orthonormal family with trivial orthogonal complement of span → orthonormal basis. |
| `OrthonormalBasis.span` | Constructor: finite orthonormal family → orthonormal basis of its span. |
| `OrthonormalBasis.reindex` | Constructor: reindex an orthonormal basis along an equivalence. |
| `OrthonormalBasis.map` | Constructor: push forward an orthonormal basis along a linear isometry. |
| `Pi.orthonormalBasis` | Constructor: product of orthonormal bases → orthonormal basis on `PiLp 2`. |
| `DirectSum.IsInternal.isometryL2OfOrthogonalFamily` | Isometry: direct sum of orthogonal subspaces → `PiLp 2` of the subspaces. |
| `EuclideanSpace.basisFun` | Standard orthonormal basis of `EuclideanSpace 𝕜 ι`, given by `single i 1`. |
| `EuclideanSpace.single` | Vector with value `a` at coordinate `i`, zero elsewhere. |
| `EuclideanSpace.inner_single_left/right` | Inner product with `single` computes coordinate (up to conjugation). |
| `EuclideanSpace.orthonormal_single` | Family `(single i 1)` is orthonormal. |
| `OrthonormalBasis.repr_apply_apply` | Coordinate formula: `b.repr v i = ⟪b i, v⟫`. |
| `OrthonormalBasis.sum_repr'` | Reconstruction formula: `∑ i, ⟪b i, x⟫ • b i = x`. |
| `OrthonormalBasis.sum_inner_mul_inner` | Parseval identity: `∑ i, ⟪x, b i⟫ * ⟪b i, y⟫ = ⟪x, y⟫`. |
| `orthogonalProjection_eq_sum` | Projection onto subspace with orthonormal basis: `∑ i, ⟪b i, x⟫ • b i`. |
| `Complex.orthonormalBasisOneI` | Orthonormal basis `![1, I]` for `ℂ` over `ℝ`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `orthonormalBasis_`: constructors for orthonormal bases.
  - `EuclideanSpace.`: operations on Euclidean space (`single`, `proj`, `norm`, `dist`, etc.).
  - `PiLp.`: generic `PiLp`-level operations (norm, inner, etc.).
  - `Basis.`: conversions between `Basis` and `OrthonormalBasis`.
  - `DirectSum.IsInternal.`: constructions from internal direct sums.

- **Suffixes**:
  - `_left`, `_right`: indicate position in inner product (e.g., `inner_single_left`).
  - `_repr`: relate to the representing isometry (`repr_apply_apply`, `repr_self`, etc.).
  - `_single`: refer to `EuclideanSpace.single`.
  - `_zero`: refer to zero vectors/balls/spheres (e.g., `ball_zero_eq`).
  - `_eq_bot`, `_eq_top`: refer to trivial (zero/full) submodules.

- **Notation**:
  - `⟪x, y⟫`: inner product.
  - `!₂[x, y, ...]`: vector notation for `EuclideanSpace 𝕜 (Fin n)` (via `WithLp.equiv`).
  - `B i`: basis vector at index `i`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

- `simp` / `simp_rw`: simplification with `orthonormal_iff_ite`, `inner_single_left`, `repr_self`, etc.
- `congr!`: for functional extensionality and structure equality.
- `rw` / `erw`: rewriting using lemmas like `repr_apply_apply`, `sum_repr`.
- `ext`: extensionality for sets/functions.
- `fin_cases`: case analysis on `Fin n`.
- `convert`: for flexible congruence-based proof construction.
- `dsimp`, `unfold`: for unfolding definitions like `repr`, `coe`, `orthonormalBasis`.
- `linear_combination`-style reasoning via `sum_inner`, `map_sum`, `inner_add_left`, `inner_smul_left`.
- `have` + `rwa`: to introduce intermediate facts and rewrite goals.

---

#### **4. Proof Logic**

Typical proof patterns:

- **Induction on finite types** (`Fintype ι`) via `Finset.sum_congr`, `Finset.sum_add_distrib`.
- **Reduction to Euclidean space** via `repr`, `repr_symm`, and `WithLp.equiv`.
- **Orthogonality arguments** using `orthonormal_iff_ite`, `inner_right_fintype`.
- **Basis reconstruction** via `sum_repr'`, `sum_inner_mul_inner`, `orthogonalProjection_eq_sum`.
- **Equivalence chaining**: e.g., `LinearIsometryEquiv.trans`, `LinearEquiv.symm.trans`.
- **Submodule containment**: e.g., `hsp : ⊤ ≤ span`, `orthogonal_eq_bot_iff`.
- **Finite-dimensional simplifications**: `finrank_euclideanSpace`, `finite_dimensional.complete`.

---

#### **5. Imports**

Core dependencies defining the module’s scope:

- `Mathlib.Analysis.InnerProductSpace.Projection`: orthogonal projections, Hilbert space geometry.
- `Mathlib.Analysis.Normed.Lp.PiLp`: `PiLp` spaces, `L²` norm, `WithLp.equiv`.
- `Mathlib.LinearAlgebra.FiniteDimensional`: finite-dimensional vector spaces, `finrank`, completeness.
- `Mathlib.LinearAlgebra.UnitaryGroup`: unitary/orthogonal groups (indirectly via `LinearIsometryEquiv`).
- `Mathlib.Util.Superscript`: subscript notation support (e.g., `!₂`).

---

This metadata reflects the formalization of finite-dimensional Hilbert spaces via orthonormal bases and `L²` product structures, with heavy use of `PiLp 2` and `EuclideanSpace`.