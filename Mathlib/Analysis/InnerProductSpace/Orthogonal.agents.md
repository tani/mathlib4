### Technical Brief: Orthogonal Complements and Orthogonality of Submodules in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `orthogonal K` | `Submodule 𝕜 E` | Defines the orthogonal complement of a submodule `K`: vectors orthogonal to all elements of `K`. |
| `Kᗮ` | Notation for `orthogonal K` | Shorthand for orthogonal complement. |
| `mem_orthogonal` | `v ∈ Kᗮ ↔ ∀ u ∈ K, ⟪u, v⟫ = 0` | Membership characterization in orthogonal complement. |
| `mem_orthogonal'` | `v ∈ Kᗮ ↔ ∀ u ∈ K, ⟪v, u⟫ = 0` | Equivalent formulation using symmetry of inner product. |
| `inner_right_of_mem_orthogonal`, `inner_left_of_mem_orthogonal` | `u ∈ K → v ∈ Kᗮ → ⟪u, v⟫ = 0` / `⟪v, u⟫ = 0` | Orthogonality of elements from `K` and `Kᗮ`. |
| `inf_orthogonal_eq_bot` | `K ⊓ Kᗮ = ⊥` | Trivial intersection of `K` and its orthogonal complement. |
| `orthogonal_gc` | `GaloisConnection orthogonal orthogonalᵒᵈ` | `orthogonal` is a Galois connection between `Submodule` and its dual. |
| `orthogonal_le` | `K₁ ≤ K₂ → K₂ᗮ ≤ K₁ᗮ` | `orthogonal` reverses inclusion. |
| `le_orthogonal_orthogonal` | `K ≤ Kᗮᗮ` | Double orthogonal contains original submodule (equality iff `K` is closed/subspace in Hilbert space). |
| `orthogonal_orthogonal_monotone` | `K₁ ≤ K₂ → K₁ᗮᗮ ≤ K₂ᗮᗮ` | Monotonicity of double orthogonal. |
| `inf_orthogonal`, `iInf_orthogonal`, `sInf_orthogonal` | `K₁ᗮ ⊓ K₂ᗮ = (K₁ ⊔ K₂)ᗮ`, etc. | Orthogonal of sup = inf of orthogonals (duality). |
| `top_orthogonal_eq_bot`, `bot_orthogonal_eq_top` | `(⊤)ᗮ = ⊥`, `(⊥)ᗮ = ⊤` | Orthogonal of whole space is zero, and vice versa. |
| `orthogonal_eq_top_iff` | `Kᗮ = ⊤ ↔ K = ⊥` | Characterization of when orthogonal complement is full space. |
| `IsOrtho U V` | `U ≤ Vᗮ` | Definition of orthogonality between submodules. |
| `U ⟂ V` | Notation for `IsOrtho U V` | Standard notation for orthogonal submodules. |
| `isOrtho_iff_inner_eq` | `U ⟂ V ↔ ∀ u ∈ U, v ∈ V, ⟪u, v⟫ = 0` | Pointwise orthogonality characterization. |
| `isOrtho_orthogonal_right/left` | `U ⟂ Uᗮ`, `Uᗮ ⟂ U` | A submodule is orthogonal to its complement. |
| `IsOrtho.disjoint` | `U ⟂ V → Disjoint U V` | Orthogonal submodules are disjoint. |
| `orthogonalFamily_self` | `OrthogonalFamily (cond b K Kᗮ)` | The pair `(K, Kᗮ)` forms an orthogonal family. |
| `orthogonalFamily_iff_pairwise` | `OrthogonalFamily V ↔ Pairwise (· ⟂ · on V)` | Connects orthogonal families with pairwise orthogonality. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `orthogonal_`: for properties of `orthogonal` operator (e.g., `orthogonal_gc`, `orthogonal_eq_inter`).
  - `isOrtho_`: for properties of `IsOrtho` relation (e.g., `isOrtho_bot_left`, `isOrtho_sup_left`).
  - `inner_..._of_mem_orthogonal`: for consequences of orthogonality (e.g., `inner_right_of_mem_orthogonal`).
- **Suffixes**:
  - `_left`, `_right`: indicate which argument of the inner product is fixed (e.g., `inner_left`, `inner_right`).
  - `_iff`: for biconditional characterizations (e.g., `mem_orthogonal`, `isOrtho_iff_inner_eq`).
- **Notation**:
  - `Kᗮ`: orthogonal complement.
  - `U ⟂ V`: orthogonality of submodules.
  - `⟪u, v⟫`: inner product.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`: rewriting using equalities/definitions (e.g., `rw [inner_add_right]`).
  - `simp` / `simp_rw`: simplification using lemmas like `inner_zero_right`, `mem_orthogonal`.
  - `exact`, `intro`, `apply`: basic proof construction.
  - `ext`: extensionality for set/submodule equality.
  - `apply le_antisymm`: to prove equality of submodules via double inclusion.
  - `convert`: for approximate unification (e.g., with `isClosed_iInter`).
  - `rwa`, `rintro`, `obtain`: advanced intro/rewrite combinators.
  - `convert ... using ...`: for applying continuity/closedness lemmas.
  - `symm`, `trans`: for symmetry/transitivity of relations.
  - `have`, `suffices`: intermediate proof steps.

- **Domain-specific automation**:
  - `aesop`: not used here (proofs are mostly manual and structured).
  - `ring`: not used (no arithmetic simplification needed beyond inner product properties).
  - `linarith`: not used (no linear inequalities).

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs are largely **definition-driven**, leveraging:
    - `mem_orthogonal` to reduce membership to universal quantification over `K`.
    - `orthogonal_gc` to translate between inclusion and orthogonality.
    - `inner_eq_zero_symm` to flip inner product arguments.
  - **Induction** is not used (no natural numbers or inductive types).
  - **Case analysis** appears in `orthogonalFamily_self`, where `cond b K Kᗮ` is handled by cases on `b : Bool`.
  - **Galois connection machinery** is heavily used to derive monotonicity, duality of sup/inf, and closure properties.
  - **Continuity arguments** for `isClosed_orthogonal`: use `isClosed_iInter` + `ContinuousLinearMap.isClosed_ker`.
  - **Disjointness/orthogonality equivalences** often reduce to `inner_self_eq_zero`.

- **Typical proof pattern**:
  ```lean
  rw [mem_orthogonal]
  intro u hu
  apply inner_right_of_mem_orthogonal hu
  exact hv
  ```

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.InnerProductSpace.Subspace` | Provides basic theory of subspaces in inner product spaces (e.g., `inner`, `norm`, topology). |
| `Mathlib.LinearAlgebra.SesquilinearForm` | Provides `innerSL`, `bilinFormOfRealInner`, and general sesquilinear form machinery. |

- **Key assumptions**:
  - `𝕜` is `RCLike` (i.e., `ℝ` or `ℂ`).
  - `E`, `F` are normed additive commutative groups and inner product spaces over `𝕜`.
  - Topological assumptions (e.g., `CompleteSpace`) used only in specific lemmas (`instOrthogonalCompleteSpace`, `isClosed_orthogonal`).

---

### Summary

This file formalizes the foundational theory of orthogonal complements and orthogonality of submodules in (pre-)Hilbert modules over `RCLike` fields. It establishes:
- A clean API for `orthogonal` as a Galois connection,
- Key algebraic/topological properties (closedness, completeness),
- Equivalences between orthogonality of submodules and pointwise inner product vanishing,
- Duality between sup/inf and orthogonal complements,
- Compatibility with linear isometries (`map`, `comap`).

The formalization is highly structured, leveraging Mathlib’s existing infrastructure for inner product spaces and Galois connections.