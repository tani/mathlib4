### Technical Brief: Definable Sets in First-Order Logic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Set.Definable` | `A.Definable L s ↔ ∃ φ : L[[A]].Formula α, s = setOf φ.Realize` | Defines when a subset `s ⊆ α → M` is definable over parameters `A` in structure `M` for language `L`. |
| `Set.Definable₁` | `A.Definable₁ L s ↔ A.Definable L { x : Fin 1 → M | x 0 ∈ s }` | Special case for subsets of `M`. |
| `Set.Definable₂` | `A.Definable₂ L s ↔ A.Definable L { x : Fin 2 → M | (x 0, x 1) ∈ s }` | Special case for subsets of `M × M`. |
| `FirstOrder.Language.DefinableSet` | `L.DefinableSet A α := { s : Set (α → M) // A.Definable L s }` | The type of definable subsets of `α → M` over `A`, with proof-carrying definability. |
| `Set.Definable.map_expansion` | `(h : A.Definable L s) → (φ : L →ᴸ L') → [φ.IsExpansionOn M] → A.Definable L' s` | Shows definability is preserved under language expansions. |
| `Set.definable_iff_exists_formula_sum` | `A.Definable L s ↔ ∃ φ : L.Formula (A ⊕ α), s = {v | φ.Realize (Sum.elim (↑) v)}` | Reformulates definability using formulas with constants from `A` encoded via `Sum`. |
| `Set.Definable.mono` | `A ⊆ B → A.Definable L s → B.Definable L s` | Monotonicity of definability in parameters. |
| `Set.Definable.inter`, `union`, `compl`, `sdiff`, `himp` | All closure properties under Boolean operations. | Show that definable sets form a Boolean algebra. |
| `Set.Definable.preimage_comp` | `A.Definable L s → A.Definable L ((g ↦ g ∘ f) ⁻¹' s)` | Closure under preimages of composition with `f : α → β`. |
| `Set.Definable.image_comp_embedding` | `[Finite β] → A.Definable L s → A.Definable L ((g ↦ g ∘ f) '' s)` for `f : α ↪ β` | Closure under finite projections via embeddings. |
| `Set.Definable.image_comp` | `[Finite α] [Finite β] → A.Definable L s → A.Definable L ((g ↦ g ∘ f) '' s)` | Main result: definability closed under finite-dimensional projections. |
| `Set.definable_iff_finitely_definable` | `A.Definable L s ↔ ∃ A0 : Finset M, A0 ⊆ A ∧ A0.Definable L s` | Definability only depends on finitely many parameters. |
| `FirstOrder.Language.DefinableSet.instBooleanAlgebra` | `BooleanAlgebra (L.DefinableSet A α)` | The definable sets form a Boolean algebra under set-theoretic operations. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `definable_`: for lemmas about `Definable` (e.g., `definable_empty`, `definable_univ`, `definable_finset_biUnion`).
  - `Definable.`: for the main inductive property (e.g., `Definable.inter`, `Definable.image_comp`).
  - `inst_`: for typeclass instances (e.g., `instTop`, `instBooleanAlgebra`).
- **Suffixes**:
  - `_iff`: for characterizations (`definable_iff_exists_formula_sum`, `definable_iff_finitely_definable`).
  - `_sum_inl_fin`, `_embedding`, `_comp`: for specialized projection lemmas.
- **Structure**:
  - `L.DefinableSet A α`: type of definable sets over `A` in dimension `α`.
  - `L[[A]]`: notation for extending language `L` with constants for elements of `A`.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp` + `ext`: for extensionality and simplification of set membership.
- `rcases` / `obtain`: to unpack existential quantifiers and subtype structure.
- `rw [← ...]`: to rewrite using set-theoretic identities (e.g., `Finset.inf_set_eq_iInter`).
- `congr`: for congruence reasoning on equalities of functions/sets.
- `exact`, `refine`: to construct witnesses for definability via formulas.
- `classical`: used to enable classical reasoning in finite cases.
- `Finset.induction`: for induction over finite sets.
- `aesop` is *not* used — proofs are mostly manual and formula-driven.

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs follow a pattern:
  1. Unpack definability as `∃ φ, s = setOf φ.Realize`.
  2. Construct a new formula (e.g., `φ ⊓ θ`, `φ.not`, `φ.relabel f`, `φ.exs`) corresponding to the operation.
  3. Use `ext` + `simp` to verify equality of sets via realizability.
- **Projection lemmas** (`image_comp`, `image_comp_embedding`):
  - Reduce to simpler cases using equivalences (`Equiv`, `sumCongr`, `Fintype.equivFin`).
  - Use `image_comp_equiv` and `preimage_comp` to move between domains.
  - Handle finite dimensions via `image_comp_sum_inl_fin` and `rangeSplitting`/`rangeFactorization`.
- **Boolean algebra construction**:
  - Lift set operations to `DefinableSet` using definability closure lemmas.
  - Use `Function.Injective.booleanAlgebra` to inherit algebra structure from `Set (α → M)`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Data.SetLike.Basic`: for `SetLike` typeclass.
  - `Mathlib.Data.Finset.Preimage`: for finite set operations and preimages.
  - `Mathlib.ModelTheory.Semantics`: for `FirstOrder.Language`, `Formula`, `Realize`, etc.
- **Scope**:
  - Formalizes definability in *first-order logic* over arbitrary structures.
  - Works in full generality: arbitrary languages, arbitrary types, parameters `A ⊆ M`.
  - Focuses on *finite* Cartesian powers (`α → M`) and *finite* projections.
  - Does *not* assume o-minimality, stability, or other model-theoretic hypotheses.

---

#### **6. Notable Design Choices**

- **Dependent type encoding**: Uses `α → M` instead of `M^α` for flexibility (works for infinite `α`, though projections require finiteness).
- **Proof-carrying definability**: `DefinableSet` is a subtype, ensuring definability is part of the type — avoids ambiguity.
- **Parameter handling**: Uses `L[[A]]` (language extension) and `Sum.elim` to encode constants, aligning with standard model-theoretic practice.
- **Boolean algebra structure**: Derived via injective map into `Set (α → M)`, preserving all operations.

--- 

This file is a foundational module for model theory in Lean, enabling formalization of definable closures, types, and geometry in first-order structures.