Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Submodule.LinearDisjoint` | `Prop`: Two submodules `M N : Submodule R S` are *linearly disjoint* if the natural multiplication map `mulMap M N : M ⊗[R] N →ₗ[R] S` is injective. |
| `LinearDisjoint.mulMap` | `M ⊗[R] N ≃ₗ[R] M * N`: Isomorphism induced by `mulMap` when `M` and `N` are linearly disjoint. |
| `LinearDisjoint.of_subsingleton` | `Subsingleton R ⇒ M.LinearDisjoint N`: Trivial case of linear disjointness. |
| `LinearDisjoint.of_subsingleton_top` | `Subsingleton S ⇒ M.LinearDisjoint N`: Another trivial case. |
| `linearDisjoint_op` | `M.LinearDisjoint N ↔ ...`: Linear disjointness preserved under multiplicative opposite. |
| `LinearDisjoint.symm_of_commute` | `∀ m n, Commute m.1 n.1 ⇒ M.LinearDisjoint N → N.LinearDisjoint M`: Symmetry under commutativity. |
| `linearDisjoint_comm_of_commute` | Equivalence of `M.LinearDisjoint N` and `N.LinearDisjoint M` under pairwise commutativity. |
| `map` | Linear disjointness preserved under injective algebra homomorphisms. |
| `of_basis_left'`, `of_basis_right'`, `of_basis_mul'` | Basis-based characterizations of linear disjointness via injectivity of `mulLeftMap`, `mulRightMap`, or product family. |
| `bot_left`, `bot_right` | `⊥` is linearly disjoint with any submodule. |
| `one_left`, `one_right` | Image of `R` in `S` is linearly disjoint with any submodule. |
| `of_linearDisjoint_fg_left/right` | Linear disjointness descends from finitely generated submodules. |
| `linearIndependent_left_of_flat`, `linearIndependent_right_of_flat` | If `M, N` are linearly disjoint and one is flat, then `R`-lin. indep. families in one module remain linearly independent over the other. |
| `of_basis_left`, `of_basis_right`, `of_basis_mul` | Converse basis-based characterizations using trivial kernel of `mulLeftMap`/`mulRightMap`. |
| `linearIndependent_mul_of_flat_left/right` | If `M, N` are linearly disjoint and one is flat, then products of lin. indep. families remain lin. indep. |
| `linearIndependent_mul_of_flat` | Disjunction version of above. |
| `of_le_left_of_flat`, `of_le_right_of_flat`, `of_le_of_flat_left/right` | Submodule stability under flatness assumptions. |
| `of_left_le_one_of_flat`, `of_right_le_one_of_flat` | Submodules inside `R`-image are linearly disjoint under flatness. |
| `not_linearIndependent_pair_of_commute_of_flat_left/right` | If `M, N` are linearly disjoint and one is flat, then any two *commuting* elements in `M ⊓ N` are not lin. indep. over `R`. |
| `rank_inf_le_one_of_commute_of_flat_left/right` | Under flatness and pairwise commutativity in `M ⊓ N`, rank ≤ 1. |
| `rank_le_one_of_commute_of_flat_of_self` | If `M` is linearly disjoint with itself, flat, and commutative, then `rank M ≤ 1`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `linearDisjoint_`: Module-level properties (e.g., symmetry, preservation).
  - `of_`: Implication from a condition to linear disjointness.
  - `not_linearIndependent_`: Negative results about linear independence.
  - `rank_`: Rank-related bounds.
- **Suffixes**:
  - `_left`, `_right`: Asymmetry in arguments (e.g., flatness of left/right module).
  - `_of_flat`: Assumes flatness of one module.
  - `_of_commute`: Assumes commutativity of elements.
  - `_of_self`: Self-application (e.g., `M` and `M`).
  - `_fg`: Finitely generated submodules.
- **Other**:
  - `symm`, `comm`: Symmetry/commutativity variants.
  - `op`: Multiplicative opposite.
  - `map`: Homomorphic image.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: Rewriting and simplification (especially with `mulMap`, `mulLeftMap`, `mulRightMap`, tensor equivalences).
- `exact`, `refine`, `apply`: Direct proof construction.
- `have`, `obtain`, `rcases`: Intermediate lemma introduction and case analysis.
- `ext`: Extensionality for linear maps, tensors, etc.
- `convert`: Flexible equality chaining.
- `nontriviality`, `by_contra`: Handling nontriviality and contradiction.
- `fin_cases`: Case analysis on `Fin n`.
- `Module.Flat.*_preserves_injective_linearMap`: Specialized lemmas for flat modules preserving injectivity.
- `TensorProduct.*`: Tactics involving tensor product congruences and equivalences.

---

### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern:  
    `linearDisjoint_iff` rewrites goal to injectivity of `mulMap`.  
    Then, injectivity is shown via composition of known injective maps (e.g., tensor of injective maps, flatness preserving injectivity, equivalence compositions).
- **Induction/Case Analysis**:
  - Not typical; proofs rely on algebraic properties of tensor products and flatness.
  - For `rank` bounds: contradiction via existence of two lin. indep. elements, then use `not_linearIndependent_pair_of_commute_of_flat`.
- **Key Logical Flow**:
  - **Forward direction**: Use flatness + injectivity of `mulMap` to lift independence.
  - **Backward direction**: Show injectivity of `mulMap` via basis or finite generation.
  - **Symmetry**: Use `mul_comm` or `Commute` to swap tensor factors via `TensorProduct.comm`.

---

### **5. Imports**

Primary dependencies defining scope:
- `Mathlib.LinearAlgebra.TensorProduct.Tower`: Tensor product over rings, base change.
- `Mathlib.LinearAlgebra.TensorProduct.Finiteness`: Finiteness conditions on tensor products.
- `Mathlib.LinearAlgebra.TensorProduct.Submodule`: Tensor products of submodules, `mulMap`.
- `Mathlib.LinearAlgebra.Dimension.Finite`: Rank, finite dimensionality, `Module.rank`.
- `Mathlib.RingTheory.Flat.Basic`: Flat modules, preservation of injectivity under tensoring.

---

Let me know if you'd like a **graphical dependency map**, **proof sketch templates**, or **automated lemma search patterns** derived from this metadata.