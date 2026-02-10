### Technical Metadata Brief: `Matrix.unitaryGroup` and Related Structures in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `unitaryGroup` | `abbrev unitaryGroup := unitary (Matrix n n α)` | Defines the unitary group as the submonoid of matrices `A` satisfying `A * star A = 1` (i.e., `star A = A⁻¹`). |
| `mem_unitaryGroup_iff` | `A ∈ unitaryGroup ↔ A * star A = 1` | Characterizes membership in the unitary group via right-inverse condition. |
| `mem_unitaryGroup_iff'` | `A ∈ unitaryGroup ↔ star A * A = 1` | Characterizes membership via left-inverse condition (equivalent due to invertibility). |
| `det_of_mem_unitary` | `A ∈ unitaryGroup → A.det ∈ unitary α` | Shows determinant of a unitary matrix is a unitary element in the base ring. |
| `toLin'` | `unitaryGroup → (n → α) →ₗ[α] n → α` | Interprets a unitary matrix as a linear map via left multiplication. |
| `toLinearEquiv` | `unitaryGroup → (n → α) ≃ₗ[α] n → α` | Refines `toLin'` to a linear equivalence (invertible linear map), using inverse given by `star A`. |
| `toGL` | `unitaryGroup →* GLₙ(α)` | Group homomorphism embedding unitary group into general linear group. |
| `embeddingGL` | `unitaryGroup →* GeneralLinearGroup α (n → α)` | Explicit embedding of unitary group into `GLₙ(α)` as a monoid homomorphism. |
| `specialUnitaryGroup` | `unitaryGroup ⊓ ker(det)` | Subgroup of unitary matrices with determinant `1`. |
| `orthogonalGroup` | `abbrev orthogonalGroup := unitaryGroup n β` | Orthogonal group defined analogously over a commutative ring `β`, using `starRingOfComm` to induce `StarRing`. |
| `specialOrthogonalGroup` | `specialUnitaryGroup n β` | Orthogonal matrices with determinant `1`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mem_..._iff`: Membership characterizations (↔).
  - `..._iff` / `..._iff'`: Equivalent formulations of membership.
  - `..._val`, `..._apply`: Lemmas about coercion to underlying matrix / function.
  - `to...`: Construction of maps (e.g., `toLin'`, `toLinearEquiv`, `toGL`).
  - `embedding...`: Embeddings (e.g., `embeddingGL`).
- **Suffixes**:
  - `...Group`: Group/subgroup definitions (`unitaryGroup`, `orthogonalGroup`, `specialUnitaryGroup`, etc.).
  - `...MonoidHom`: Homomorphisms to multiplicative monoid (e.g., `detMonoidHom`).
- **`star`**: Used for involution (star-transpose); `star A` = conjugate transpose.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only [...]`: Simplify using definitional equalities and lemmas (e.g., `mul_eq_one_comm`, `toLin'_mul`).
- `rwa [...]`: Rewrite and then assume.
- `congr_arg`: Apply congruence to equalities involving functions (e.g., `congr_arg det`).
- `calc`: Chain equalities step-by-step (used in `toLinearEquiv` proofs).
- `rw [...]`: Rewrite using known equalities (e.g., `inv_mul_cancel`, `mul_inv_cancel`).
- ` rfl`: For definitional equalities (e.g., coercion lemmas).
- `exact ...` / `refine ...`: Direct proof construction.

No heavy automation (e.g., `aesop`, `linarith`) is used—proofs are mostly algebraic and definitional.

---

#### **4. Proof Logic**

- **Membership characterizations** (`mem_unitaryGroup_iff`, `mem_unitaryGroup_iff'`):
  - Use `unitary` definition: `A ∈ unitary S ↔ A * star A = 1 ∧ star A * A = 1`.
  - Prove equivalence by extracting one conjunct and rederiving the other via `mul_eq_one_comm`.

- **Determinant properties** (`det_of_mem_unitary`):
  - Apply `congr_arg det` to both sides of `A * star A = 1` and `star A * A = 1`.
  - Use `star_transpose = star` and properties of determinant under transpose.

- **Linear equivalence construction** (`toLinearEquiv`):
  - Define inverse as `toLin' A⁻¹`.
  - Prove left/right inverses using:
    - `← toLin'_mul` to convert composition to matrix multiplication,
    - `inv_mul_cancel`, `mul_inv_cancel`, and `toLin'_one`.

- **Group homomorphism proofs** (`toGL_one`, `toGL_mul`, `embeddingGL`):
  - Reduce to properties of `toLin'` via `coe_toGL`.
  - Use `Units.ext` to lift equalities to `GeneralLinearGroup`.

- **Special (unitary/orthogonal) groups**:
  - Defined via `⊓` (infimum/subgroup intersection) with kernel of determinant.
  - Membership condition follows directly from definition.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.LinearAlgebra.GeneralLinearGroup` | Defines `GeneralLinearGroup`, `ofLinearEquiv`, group structure. |
| `Mathlib.LinearAlgebra.Matrix.ToLin` | Provides `Matrix.toLin'`, linking matrices to linear maps. |
| `Mathlib.LinearAlgebra.Matrix.NonsingularInverse` | Supplies invertibility lemmas (e.g., `mul_eq_one_comm`). |
| `Mathlib.Algebra.Star.Unitary` | Defines `unitary` elements and `unitary α` group; basis for `unitaryGroup`. |

**Key algebraic structures used**:
- `StarRing α`: For involution (`star`).
- `CommRing α`: For matrix ring structure and determinant.
- `DecidableEq n`, `Fintype n`: For finite-dimensional matrix indexing.

---

### Summary

This file formalizes the **unitary group** and **orthogonal group** of matrices over rings with involution, emphasizing:
- Equivalence of left/right inverse conditions,
- Determinant constraints (unitary/determinant-1 subgroups),
- Embedding into general linear group via linear equivalence,
- Coercion and homomorphism properties.

It leverages Lean’s subtype-based group constructions (`unitary`, `MonoidHom.mker`) and standard matrix-to-linear-map machinery (`toLin'`, `toLinearEquiv`). The structure is modular and reusable across unitary/orthogonal contexts via `starRingOfComm`.