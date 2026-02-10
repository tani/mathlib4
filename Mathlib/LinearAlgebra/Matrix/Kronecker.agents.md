### Technical Brief: Kronecker Product in Lean 4 (`Kronecker.lean`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `kroneckerMap` | `f : α → β → γ → Matrix l m α → Matrix n p β → Matrix (l × n) (m × p) γ` | Generalized Kronecker product: applies `f` pairwise to entries of two matrices. |
| `kroneckerMap_apply` | `kroneckerMap f A B (i₁, i₂) (j₁, j₂) = f (A i₁ j₁) (B i₂ j₂)` | Core evaluation lemma; confirms definition. |
| `kroneckerMapBilinear` | `f : α →ₗ[R] β →ₗ[S] γ → Matrix l m α →ₗ[R] Matrix n p β →ₗ[S] Matrix (l × n) (m × p) γ` | Lifts bilinear `f` to a bilinear map on matrices. |
| `kronecker` | `Matrix l m α → Matrix n p α → Matrix (l × n) (m × p) α` | Standard Kronecker product: `kroneckerMap (*)`. |
| `kroneckerBilinear` | `Matrix l m α →ₗ[R] Matrix n p α →ₗ[R] Matrix (l × n) (m × p) α` | Bilinear version of `kronecker`, using `Algebra.lmul`. |
| `kroneckerTMul` | `Matrix l m α → Matrix n p β → Matrix (l × n) (m × p) (α ⊗[R] β)` | Tensor-product Kronecker: `kroneckerMap (⊗ₜ)`. |
| `kroneckerTMulBilinear` | `Matrix l m α →ₗ[S] Matrix n p β →ₗ[R] Matrix (l × n) (m × p) (α ⊗[R] β)` | Bilinear version for tensor product. |
| `det_kronecker` | `det (A ⊗ₖ B) = det A ^ n * det B ^ m` | Determinant of Kronecker product (for square matrices of sizes `m`, `n`). |
| `trace_kronecker` | `trace (A ⊗ₖ B) = trace A * trace B` | Trace of Kronecker product. |
| `kronecker_assoc'` | `submatrix (A ⊗ₖ B ⊗ₖ C) = A ⊗ₖ (B ⊗ₖ C)` | Associativity up to reindexing. |
| `det_kroneckerTMul` | `det (A ⊗ₖₜ B) = (det A ^ n) ⊗ₜ (det B ^ m)` | Determinant for tensor-product Kronecker. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `kroneckerMap_`: generic Kronecker map lemmas.
  - `kronecker_`: lemmas for `kroneckerMap (*)`.
  - `kroneckerTMul_`: lemmas for `kroneckerMap (⊗ₜ)`.
- **Suffixes**:
  - `_left`, `_right`: indicate which argument is varied.
  - `_add`, `_smul`, `_mul`: indicate behavior under algebraic operations.
  - `_diagonal`, `_single`: special cases for structured matrices.
  - `_assoc`, `_assoc'`: associativity lemmas (with/without `submatrix`).
  - `_natCast`, `_ofNat`: behavior with natural number scalars.
- **Notation**:
  - `⊗ₖ` for `kronecker` (requires `open Kronecker`).
  - `⊗ₖₜ`, `⊗ₖₜ[R]` for `kroneckerTMul`.

---

#### **3. Tactic Stack**

Frequent tactics used:
- `ext`: extensionality for matrices (entrywise equality).
- `simp` / `simp_rw`: simplification using `@[simp]` lemmas.
- `rfl`: reflexivity for definitional equalities.
- `congr!`, `congr_arg`: congruence for nested expressions.
- `grind`: custom tactic (likely from Mathlib’s `Grind` module) for `single`-based proofs.
- `dsimp`, `change`, `rw`: rewriting with definitions and lemmas.
- `Finset.sum_product`, `Finset.univ_product_univ`: for manipulating double sums.
- `calc`: chain of equalities (e.g., in `det_kroneckerMapBilinear`).
- `intro`, `apply`, `exact`: basic proof scripting.

---

#### **4. Proof Logic**

- **Structure**: Most proofs are *entrywise*:
  1. Use `ext` to reduce to arbitrary indices `(i₁, i₂)`, `(j₁, j₂)`.
  2. Expand definitions (`kroneckerMap_apply`, `mul_apply`, `trace`, `det`, etc.).
  3. Apply algebraic properties of `f` (e.g., bilinearity, multiplicativity).
  4. Simplify sums/products using `Finset.sum_product`, `diagonal`, `blockDiagonal`.
- **Induction**: Not used directly; instead, structural reasoning on matrices via `single`, `diagonal`, `blockDiagonal`.
- **Special cases**:
  - `single`/`diagonal` lemmas often use `grind` or `simp` with `diagonal`, `blockDiagonal`, and `apply_ite`.
  - Determinant proofs rely on factorization via `det_blockDiagonal`, `det_mul`, and `det_reindex_self`.
- **Reindexing**: Many proofs use `reindex` with `Equiv.prodAssoc`, `Equiv.prodComm`, or `Equiv.mapMatrix` to handle index permutations.

---

#### **5. Imports & Dependencies**

**Core imports**:
- `Mathlib.Data.Matrix.Basic`, `Block`
- `Mathlib.LinearAlgebra.Matrix.Determinant.Basic`, `Trace`
- `Mathlib.LinearAlgebra.TensorProduct.Basic`, `Associator`
- `Mathlib.RingTheory.TensorProduct.Basic`
- `Mathlib.GroupTheory.GroupAction.Ring`

**Key dependencies**:
- Matrix arithmetic (`Mul`, `Add`, `SMul`, `Semiring`, `CommRing`)
- Tensor product structure (`TensorProduct`, `tmul`, `assoc`)
- Module and algebra structures (`Module`, `Algebra`, `SMulCommClass`)
- Group actions and reindexing (`Equiv`, `reindex`, `submatrix`)

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Matrix.kroneckerMap] --> B[Matrix.kronecker (* )]
  A --> C[Matrix.kroneckerTMul (⊗ₜ)]
  B --> D[det_kronecker]
  B --> E[trace_kronecker]
  B --> F[mul_kronecker_mul]
  C --> G[det_kroneckerTMul]
  C --> H[trace_kroneckerTMul]
  A --> I[LinearMap.kroneckerMapBilinear]
  I --> J[Algebra.lmul]
  I --> K[TensorProduct.mk]
  L[TensorProduct] --> C
  M[GroupAction.Ring] --> I
  N[BlockMatrix] --> B & C
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph KroneckerMap
    A[Definition: kroneckerMap]
    B[Basic properties: apply, transpose, reindex]
    C[Algebraic behavior: add, smul, zero]
    D[Structured matrices: single, diagonal]
    E[Bilinearity: kroneckerMapBilinear]
    F[Determinant & trace: det_kroneckerMapBilinear, trace_kroneckerMapBilinear]
  end

  subgraph Kronecker (*)
    G[Definition: kronecker]
    H[Notation: ⊗ₖ]
    I[Specialized lemmas: zero, add, mul, assoc]
    J[Natural scalars: natCast, ofNat]
    K[Examples: trace, det, conjTranspose]
  end

  subgraph KroneckerTmul (⊗ₜ)
    L[Definition: kroneckerTMul]
    M[Notation: ⊗ₖₜ, ⊗ₖₜ[R]]
    N[Algebraic lemmas: zero, add, smul]
    O[Associativity: kroneckerTMul_assoc']
    P[Trace & determinant over tensor product]
  end

  A --> G
  A --> L
  I --> K
  N --> P
```

---

#### **7. Theory Context**

- **Purpose**: Formalize the Kronecker product and its interactions with linear algebraic operations (trace, determinant, tensor product, transpose, multiplication).
- **Scope**: Generalized Kronecker map (`kroneckerMap f`) → specialized to multiplication (`⊗ₖ`) and tensor product (`⊗ₖₜ`).
- **Applications**:
  - Matrix representations of tensor products of linear maps.
  - Determinant/trace identities for Kronecker products (used in quantum information, control theory).
  - Compatibility with ring/module structures (e.g., `Algebra.lmul`, `TensorProduct.mk`).
- **Design Philosophy**:
  - Maximize reuse via `kroneckerMap` abstraction.
  - Provide notations (`⊗ₖ`, `⊗ₖₜ`) for readability.
  - Ensure compatibility with `Matrix` infrastructure (`reindex`, `submatrix`, `blockDiagonal`).

--- 

This file is a canonical formalization of Kronecker products in Lean 4, with strong ties to linear algebra and tensor calculus, and is designed for extensibility and reuse in higher-level mathematics (e.g., representation theory, quantum mechanics).
