Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Metadata Brief: `LinearAlgebra.Determinant`**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `equivOfPiLEquivPi` | `((m → R) ≃ₗ[R] n → R) → m ≃ n`<br>Constructs a type equivalence from a linear equivalence of free modules. |
| `indexEquivOfInv` | `{M : Matrix m n A} {M' : Matrix n m A} → (M * M' = 1) → (M' * M = 1) → m ≃ n`<br>Shows that two-sided invertibility implies type equivalence (squareness up to equivalence). |
| `det_comm`, `det_comm'` | `det (M * N) = det (N * M)` for square or rectangular matrices with two-sided inverses. |
| `det_conj_of_mul_eq_one` | `det (M * N * M') = det N` when `M * M' = 1` and `M' * M = 1`. |
| `LinearMap.detAux` | `Trunc (Basis ι A M) → (M →ₗ[A] M) →* A`<br>Depends on a basis, but is independent of choice (proven via `det_toMatrix_eq_det_toMatrix`). |
| `LinearMap.det` | `(M →ₗ[A] M) →* A`<br>Noncomputable, basis-independent determinant of an endomorphism; returns `1` if no finite basis exists. |
| `LinearMap.det_toMatrix` | `Matrix.det (toMatrix b b f) = LinearMap.det f`<br>Simplifies determinant computation via a basis. |
| `LinearMap.det_smul` | `det (c • f) = c ^ finrank M * det f`<br>Scalar multiplication scales determinant by power of dimension. |
| `LinearMap.det_zero` | `det (0 : M →ₗ[A] M) = 0 ^ finrank M`<br>Zero map has determinant `0` unless dimension is `0`. |
| `LinearMap.det_conj` | `det (e ∘ f ∘ e.symm) = det f`<br>Determinant is invariant under conjugation by linear equivalences. |
| `LinearMap.isUnit_det` | `IsUnit f → IsUnit (det f)`<br>Invertible maps have unit determinants. |
| `LinearMap.equivOfDetNeZero` | `(f : M →ₗ[K] M) → det f ≠ 0 → M ≃ₗ[K] M`<br>Nonzero determinant implies invertibility in finite-dimensional spaces. |
| `LinearEquiv.det` | `(M ≃ₗ[R] M) →* Rˣ`<br>Determinant of a linear equivalence, valued in units of the ring. |
| `Basis.det` | `M [⋀^ι]→ₗ[R] R`<br>Alternating multilinear map sending a family of vectors to the determinant of their coordinate matrix w.r.t. `e`. |
| `Basis.det_apply` | `e.det v = det (e.toMatrix v)`<br>Definition of `Basis.det`. |
| `Basis.det_self` | `e.det e = 1`<br>Determinant of a basis w.r.t. itself is `1`. |
| `is_basis_iff_det` | `LinearIndependent v ∧ span v = ⊤ ↔ IsUnit (e.det v)`<br>Characterizes bases via unit determinant. |
| `Basis.det_comp` | `e.det (f ∘ v) = det f • e.det v`<br>Determinant transforms by `det f` under linear map application. |
| `Basis.det_unitsSMul`, `Basis.det_unitsSMul_self` | Describes determinant under column-wise unit scaling. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `det_`: for determinant-related functions/lemmas (`det_toMatrix`, `det_comp`, `det_smul`, `det_zero`, etc.)
  - `equivOf_`, `indexEquivOf_`: for constructions from linear equivalences or inverses.
  - `is_`, `isUnit_`: for properties like `isUnit_det`, `is_basis_iff_det`.
  - `of_`: for constructors (`ofIsUnitDet`, `equivOfDetNeZero`).
- **Suffixes**:
  - `_comp`: for composition-related lemmas (`det_comp`, `det_conj`).
  - `_self`: for self-application (`det_self`, `det_unitsSMul_self`).
  - `_map`, `_reindex`, `_unitsSMul`: for structural transformations of bases/vectors.
- **`toMatrix` / `toLin`**: for conversion between linear maps and matrices.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `simp` / `simp_rw`: for rewriting and simplification (especially with `det_toMatrix`, `det_apply`, `det_comp`).
- `convert`: to align goals modulo definitional equality.
- `rcases`, `cases`, `induction`: for case analysis on hypotheses or structures.
- `nontriviality`, `classical`, `field_simp`: for handling nontriviality, classical logic, and field-specific simplifications.
- `exact`, `apply`, `refine`: for direct proof construction.
- `congr`: for congruence reasoning (e.g., on `if` expressions).
- `ext`: for extensionality (e.g., on functions, alternating maps, multilinear maps).
- `have`, `suffices`: for intermediate claims.

#### **4. Proof Logic**

- **Basis independence proofs**: Use `det_toMatrix_eq_det_toMatrix` + `Trunc.induction_on` to show independence of basis choice.
- **Determinant of composite maps**: Use `det_comp` and `det_toMatrix` + `Matrix.det_mul`.
- **Invertibility ↔ unit determinant**: Prove via `det_comp`, `det_id`, and `isUnit_of_mul_eq_one`.
- **Finite-dimensionality arguments**: Often rely on `finiteDimensional_of_det_ne_one`, `finrank_eq_zero_of_not_exists_basis`, or `det_eq_one_of_not_module_finite`.
- **Alternating map characterizations**: Use `AlternatingMap.eq_smul_basis_det` and `Basis.ext_alternating`.
- **Matrix-based reasoning**: Leverage `toMatrix_comp`, `toMatrix_toLin`, `toMatrix_basis_equiv`, and matrix lemmas like `det_conj_of_mul_eq_one`.

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.LinearAlgebra.FreeModule.StrongRankCondition`
- `Mathlib.LinearAlgebra.GeneralLinearGroup`
- `Mathlib.LinearAlgebra.Matrix.Reindex`
- `Mathlib.Tactic.FieldSimp`
- `Mathlib.LinearAlgebra.Matrix.NonsingularInverse`
- `Mathlib.LinearAlgebra.Matrix.Basis`

**Domain Scope**:
- Determinants of linear maps, endomorphisms, and families of vectors w.r.t. a basis.
- Interplay between linear equivalences, bases, and determinants.
- Applications to invertibility, finite-dimensionality, and alternating multilinear algebra.
- Works over `CommRing` (commutative rings), with extensions to fields (`Field`) and modules with finite rank.

---

Let me know if you'd like a visual dependency graph or a summary of proof patterns for specific theorems.