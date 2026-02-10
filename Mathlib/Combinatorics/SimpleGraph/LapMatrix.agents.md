### Technical Brief: Laplacian Matrix in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `degMatrix` | `def degMatrix [AddMonoidWithOne R] : Matrix V V R` | Diagonal matrix with vertex degrees on the diagonal. |
| `lapMatrix` | `def lapMatrix [AddGroupWithOne R] : Matrix V V R` | Laplacian matrix: `L = D - A`, where `D` is degree matrix and `A` adjacency matrix. |
| `isSymm_degMatrix` | `theorem isSymm_degMatrix` | Degree matrix is symmetric. |
| `isSymm_lapMatrix` | `theorem isSymm_lapMatrix` | Laplacian matrix is symmetric. |
| `lapMatrix_mulVec_apply` | `theorem lapMatrix_mulVec_apply` | Action of Laplacian on a vector: `(Lv)(i) = deg(i)·v(i) − ∑_{u ~ i} v(u)` |
| `lapMatrix_mulVec_const_eq_zero` | `theorem lapMatrix_mulVec_const_eq_zero` | Constant vector `1` lies in kernel of Laplacian. |
| `lapMatrix_toLinearMap₂'` | `theorem lapMatrix_toLinearMap₂'` | Quadratic form: `xᵀLx = (1/2) ∑_{i,j} [i~j] (x_i − x_j)²` |
| `posSemidef_lapMatrix` | `theorem posSemidef_lapMatrix` | Laplacian is positive semidefinite. |
| `lapMatrix_toLinearMap₂'_apply'_eq_zero_iff_forall_adj` | `theorem lapMatrix_toLinearMap₂'_apply'_eq_zero_iff_forall_adj` | `xᵀLx = 0 ⇔ x constant on each edge`. |
| `lapMatrix_toLinearMap₂'_apply'_eq_zero_iff_forall_reachable` | `theorem lapMatrix_toLinearMap₂'_apply'_eq_zero_iff_forall_reachable` | `xᵀLx = 0 ⇔ x constant on each connected component`. |
| `lapMatrix_ker_basis_aux` | `def lapMatrix_ker_basis_aux` | Basis vector for kernel: indicator function of a connected component. |
| `linearIndependent_lapMatrix_ker_basis_aux` | `lemma linearIndependent_lapMatrix_ker_basis_aux` | The auxiliary kernel vectors are linearly independent. |
| `top_le_span_range_lapMatrix_ker_basis_aux` | `lemma top_le_span_range_lapMatrix_ker_basis_aux` | These vectors span the entire kernel. |
| `lapMatrix_ker_basis` | `noncomputable def lapMatrix_ker_basis` | Basis of kernel indexed by connected components. |
| `card_ConnectedComponent_eq_rank_ker_lapMatrix` | `theorem card_ConnectedComponent_eq_rank_ker_lapMatrix` | Main result: number of connected components = nullity of Laplacian. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `degMatrix_`, `lapMatrix_`: for definitions and properties of degree/Laplacian matrices.
  - `isSymm_`, `posSemidef_`: for structural properties (symmetry, positivity).
  - `mulVec_`, `dotProduct_`, `toLinearMap₂'_`: for matrix-vector operations and bilinear forms.
  - `ker_`, `lapMatrix_ker_basis_`: for kernel-related constructions.

- **Suffixes**:
  - `_apply`: for function application lemmas (e.g., `mulVec_apply`, `toLinearMap₂'_apply'`).
  - `_eq_zero_iff_...`: for characterizations of when quadratic forms or linear maps vanish.
  - `_iff_...`: for biconditional characterizations.

- **Other patterns**:
  - `aux`: for auxiliary constructions used in proofs (e.g., `lapMatrix_ker_basis_aux`).
  - `mem_ker_...`: for membership in kernel lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification (e.g., expanding definitions like `lapMatrix`, `degMatrix`). |
| `simp` / `simp only` | Simplifying goals using lemmas; often with `disch := intros; positivity` for positivity arguments. |
| `rw` | Rewriting using equalities (e.g., `adj_comm`, `sum_comm`, `sum_ite_eq`). |
| `conv_lhs` | Entering and rewriting left-hand side of equations (e.g., changing summation order). |
| `congr` | Breaking down equalities over sums/ite expressions. |
| `ring` / `ring_nf` | Simplifying polynomial expressions (especially in quadratic form proofs). |
| `induction` | Structural induction on paths (`G.Reachable`) to propagate equality across components. |
| ` positivity` | Proving positivity of sums of squares (used in `posSemidef_lapMatrix`). |
| `ext` | Extensionality for functions/matrices/vectors. |
| `split_ifs` | Handling `if ... then ... else ...` cases. |
| `exact`, `rfl`, `apply` | Basic proof steps for equality and membership. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction & case analysis**: Used in `lapMatrix_toLinearMap₂'_apply'_eq_zero_iff_forall_reachable`, where induction on paths (`G.Reachable`) shows constancy on components.
  - **Summation manipulation**: Extensive use of `sum_comm`, `sum_ite_eq`, `sum_sub_distrib`, and `ite_*` lemmas to reorganize double sums over edges.
  - **Quadratic form equivalence**: `lapMatrix_toLinearMap₂'` rewrites `xᵀLx` into a sum over edges of squared differences, then uses symmetry (`adj_comm`) and algebra (`ring`) to simplify.
  - **Kernel characterization**:
    - First show `xᵀLx = 0 ⇔ x constant on edges`.
    - Then lift to connected components via induction on reachability.
  - **Basis construction**:
    - Define indicator functions per component.
    - Prove linear independence and spanning.
    - Conclude equality of cardinalities via `Module.finrank_eq_card_basis`.

- **Key logical flow**:
  1. Define matrices and basic algebraic properties (symmetry, action on vectors).
  2. Prove quadratic form identity.
  3. Derive positive semidefiniteness.
  4. Characterize kernel via constancy on components.
  5. Construct explicit kernel basis.
  6. Conclude dimension formula.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Combinatorics.SimpleGraph.AdjMatrix` | Defines adjacency matrix and basic graph-theoretic notions (`neighborFinset`, `degree`, `Reachable`, `ConnectedComponent`). |
| `Mathlib.LinearAlgebra.Matrix.PosDef` | Provides `PosSemidef`, `IsSymm`, `toLinearMap₂'`, and positivity-related lemmas. |

Additional assumptions used:
- `[Fintype V]`: Finite vertex set.
- `[DecidableRel G.Adj]`: Decidable adjacency.
- `[DecidableEq V]` / `[DecidableEq G.ConnectedComponent]`: For finite sums and case analysis.

---

### Summary

This file formalizes core spectral graph theory results in Lean 4, focusing on the Laplacian matrix. It leverages Mathlib’s matrix and graph libraries to prove:
- Symmetry and positive semidefiniteness of the Laplacian,
- A quadratic form identity linking `xᵀLx` to edge differences,
- A structural characterization of the kernel (constant on connected components),
- And the fundamental theorem: **number of connected components = nullity of Laplacian**.

The proofs are highly structured, combining algebraic manipulation, induction on graph structure, and module-theoretic arguments.