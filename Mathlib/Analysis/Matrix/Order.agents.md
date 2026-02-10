**Technical Brief: `Order.lean` — Partial Order and Inner Product Structures on Matrices**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `instPreOrder` | `Preorder (Matrix n n 𝕜)` | Defines preorder via `A ≤ B ↔ (B - A).PosSemidef` |
| `instPartialOrder` | `PartialOrder (Matrix n n 𝕜)` | Refines preorder to partial order using `le_antisymm_aux` |
| `instIsOrderedAddMonoid` | `IsOrderedAddMonoid (Matrix n n 𝕜)` | Ensures addition respects order: `A ≤ B ⇒ C + A ≤ C + B` |
| `instNonnegSpectrumClass` | `NonnegSpectrumClass ℝ (Matrix n n 𝕜)` | Connects nonnegativity of spectrum to positivity in ordered sense |
| `instStarOrderedRing` | `StarOrderedRing (Matrix n n 𝕜)` | Makes matrices a *-ordered ring: positivity preserved under `*`-operation |
| `dotProduct_mulVec_zero_iff` | `x⋆ A x = 0 ↔ A x = 0` | Characterizes nullspace of positive semidefinite matrices via quadratic form |
| `toMatrixInnerProductSpace` | `InnerProductSpace 𝕜 (Matrix n n 𝕜)` | Induces inner product `⟪x, y⟫ = trace(y * M * xᴴ)` from `M ≥ 0` |
| `toMatrixSeminormedAddCommGroup` | `SeminormedAddCommGroup (Matrix n n 𝕜)` | Seminorm from `‖x‖ = sqrt(trace(x * M * xᴴ))` for `M ≥ 0` |
| `toMatrixNormedAddCommGroup` | `NormedAddCommGroup (Matrix n n 𝕜)` | Normed structure when `M > 0` (positive definite) |
| `PosSemidef.sqrt` (deprecated) | `Matrix n n 𝕜` | Square root of `A ≥ 0`, now deprecated in favor of `CFC.sqrt` |
| `CFC.sqrt_*` family | e.g., `sq_sqrt`, `sqrt_sq`, `sqrt_eq_zero_iff`, etc. | Standard properties of functional calculus square root |
| `kronecker` | `x ≥ 0 ∧ y ≥ 0 ⇒ x ⊗ₖ y ≥ 0` | Kronecker product preserves positive (semi)definiteness |
| `posDef_iff_isUnit` | `A > 0 ↔ A` invertible (for `A ≥ 0`) | Links positive definiteness to invertibility |
| `posDef_iff_eq_conjTranspose_mul_self` | `A > 0 ↔ ∃ B invertible, A = Bᴴ B` | Factorization of positive definite matrices |
| `det_sqrt` | `det(sqrt A) = sqrt(det A)` | Determinant of square root equals square root of determinant |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `inst*`: Typeclass instances (`instPreOrder`, `instPartialOrder`, etc.)
  - `pos*`: Related to positive (semi)definiteness (`posSemidef`, `posDef`)
  - `dotProduct_*`, `toLinearMap₂'_*, toMatrix*`: Constructs from quadratic forms / inner products
  - `kronecker`: Kronecker product properties
- **Suffixes**:
  - `_iff`: Biconditional characterizations (`le_iff`, `nonneg_iff_posSemidef`, `dotProduct_mulVec_zero_iff`)
  - `_aux`: Internal lemmas (`le_antisymm_aux`)
  - `_*`: Deprecated aliases (`sqrt_*`, `commute_iff`, etc.)
- **Aliases**:
  - `⟨LE.le.posSemidef, PosSemidef.nonneg⟩ := nonneg_iff_posSemidef`
  - `⟨eq_of_sq_eq_sq, _⟩ := CFC.sq_eq_sq_iff`
  - `⟨IsStrictlyPositive.posDef, PosDef.isStrictlyPositive⟩ := isStrictlyPositive_iff_posDef`

---

### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop` | Forward reasoning, especially with `CStarAlgebra` rule sets |
| `simp_rw`, `simp only`, `simp` | Rewriting using definitional equalities and lemmas |
| `rw`, `rwa` | Rewriting with equivalences, often with `add_le_add_right`, `sub_eq_zero`, etc. |
| `exact`, `refine`, `obtain` | Constructing proofs, especially with existential quantifiers |
| `grind` | Automated simplification for matrix determinant proofs |
| `congr` | Congruence reasoning (e.g., `congr(y⁻¹ * $hx)`) |
| `contrapose!` | Contrapositive reasoning with negated goals |
| `lift` | Lifting to units (e.g., `lift y to (Matrix n n 𝕜)ˣ`) |
| `ext i j` | Extensionality for matrices (entrywise equality) |

---

### 4. **Proof Logic**

**Typical proof structure**:

1. **Reduction to known structures**:
   - Use `CStarAlgebra.nonneg_iff_eq_star_mul_self` to reduce `A ≥ 0` to `A = Bᴴ B`.
   - Use `CFC.sqrt_*` lemmas to reason about functional calculus square roots.

2. **Entrywise reasoning**:
   - For antisymmetry (`le_antisymm_aux`), prove diagonal entries vanish, then off-diagonals via quadratic form evaluation on basis vectors.

3. **Quadratic form analysis**:
   - For `dotProduct_mulVec_zero_iff`, reduce to `‖B x‖² = 0 ↔ B x = 0` via `A = Bᴴ B`.

4. **Spectral theory**:
   - Use eigenvalue decomposition (`eigenvalues_nonneg`, `spectrum_eq_image_range`) to link positivity to spectrum.

5. **Functional calculus**:
   - Leverage `CFC.sqrt`, `CFC.abs`, `CFC.sq_sqrt`, etc., for algebraic identities.

6. **Induction / finite case analysis**:
   - When `n` is finite, use `Fintype n` to access eigenvalue-based characterizations.

---

### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Instances` | General C*-algebraic tools, e.g., `CFC.sqrt`, `CFC.abs`, `nonneg_iff_eq_star_mul_self` |
| `Mathlib.Analysis.Matrix.HermitianFunctionalCalculus` | Hermitian functional calculus for matrices |
| `Mathlib.Analysis.Matrix.PosDef` | Definitions and basic properties of positive (semi)definite matrices |
| `Mathlib.Analysis.RCLike.Sqrt` | Square root on `RCLike` fields (e.g., `ℂ`) |
| `Mathlib.Analysis.SpecialFunctions.ContinuousFunctionalCalculus.Abs` | Absolute value via functional calculus (`CFC.abs`) |

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Top-Level)**

```mermaid
graph TD
  A[Order.lean] --> B[Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Instances]
  A --> C[Mathlib.Analysis.Matrix.HermitianFunctionalCalculus]
  A --> D[Mathlib.Analysis.Matrix.PosDef]
  A --> E[Mathlib.Analysis.RCLike.Sqrt]
  A --> F[Mathlib.Analysis.SpecialFunctions.ContinuousFunctionalCalculus.Abs]

  B --> G[CFC.sqrt, CFC.abs, CStarAlgebra.nonneg_iff_eq_star_mul_self]
  C --> H[Hermitian functional calculus]
  D --> I[PosSemidef, PosDef definitions]
  E --> J[RCLike.sqrt]
  F --> K[CFC.abs = sqrt(A*A*)]
```

#### **Overview of Theory Flow**

```mermaid
flowchart LR
  PosSemidef[A ≥ 0] -->|def| PreOrder[A ≤ B ↔ B−A ≥ 0]
  PreOrder --> PartialOrder[Partial order via antisymmetry]
  PartialOrder --> IsOrderedAddMonoid[Additive compatibility]
  IsOrderedAddMonoid --> StarOrderedRing[*-compatibility]
  StarOrderedRing --> NonnegSpectrumClass[_spectrum ≥ 0]
  
  PosSemidef -->|factorization| StarMulStar[A = Bᴴ B]
  StarMulStar -->|quadratic form| DotProductZero_iff[Ax=0 ↔ x*Ax=0]
  
  PosSemidef -->|inner product| MatrixInnerProductSpace[⟪x,y⟫ = tr(y M xᴴ)]
  PosSemidef -->|seminorm| MatrixSeminormedGroup[‖x‖ = sqrt(tr(x M xᴴ))]
  
  PosDef[A > 0] -->|invertibility| IsUnit[A invertible]
  PosDef -->|factorization| IsUnitStarMulStar[A = Bᴴ B, B invertible]
  PosDef -->|Kronecker| KroneckerPosDef[x⊗y > 0]
```

---

### 7. **Notes**

- **Scoped notation**: `open scoped MatrixOrder` required to use `≤` for matrices.
- **Deprecations**: Many matrix-specific lemmas (e.g., `sqrt`, `sq_sqrt`, `commute_iff`) are deprecated in favor of `CFC.*` equivalents.
- **Auxiliary definitions**: `matrixPreInnerProductSpace` is private, used only to construct `toMatrixInnerProductSpace`.
- **Finite vs. Finite**: Uses `[Finite n]` for Kronecker product lemmas (weaker than `[Fintype n]`), but `[Fintype n]` needed for eigenvalue-based results.

--- 

Let me know if you'd like a formalized dependency graph (e.g., in Lean’s `leanproject` format) or a visualization of the `MatrixOrder` scope usage.
