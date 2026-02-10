### Technical Metadata Brief: Antichains in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsAntichain r s` | `r : α → α → Prop → s : Set α → Prop` | `s` is an *antichain* w.r.t. `r`: no two *distinct* elements of `s` are `r`-related. Formally: `s.Pairwise rᶜ`. |
| `IsStrongAntichain r s` | `r : α → α → Prop → s : Set α → Prop` | `s` is a *strong antichain*: no two distinct elements have a common upper bound (or lower bound, depending on convention) under `r`. Formally: `s.Pairwise (fun a b ↦ ∀ c, ¬r a c ∨ ¬r b c)`. |
| `IsWeakAntichain s` | `s : Set (∀ i, α i) → Prop` | In a product type `Π i, α i`, `s` is a *weak antichain*: no two distinct elements satisfy `a ≺ b` (i.e., `a < b` pointwise with strict inequality somewhere). Defined as `IsAntichain (· ≺ ·) s`. |
| `isAntichain_singleton` | `IsAntichain r {a}` | Any singleton set is trivially an antichain. |
| `Set.Subsingleton.isAntichain` | `s.Subsingleton → IsAntichain r s` | Subsingleton sets (at most one element) are antichains. |
| `IsAntichain.eq` | `a ∈ s → b ∈ s → r a b → a = b` | In an antichain, if two elements are related, they must be equal (antisymmetry on `s`). |
| `IsAntichain.isAntisymm` | `IsAntichain r univ → IsAntisymm α r` | If the whole type is an antichain, `r` is antisymmetric. |
| `IsAntichain.subsingleton [IsTrichotomous α r]` | `IsAntichain r s → s.Subsingleton` | In a trichotomous setting (e.g., strict total order), any antichain is a subsingleton. |
| `IsAntichain.not_lt` | `[Preorder α] → IsAntichain (· ≤ ·) s → a ∈ s → b ∈ s → ¬a < b` | In a preorder antichain, no two elements are strictly comparable. |
| `isAntichain_iff_forall_not_lt` | `[PartialOrder α]` | `IsAntichain (· ≤ ·) s ↔ ∀ a b ∈ s, ¬a < b`. Characterizes antichains in partial orders. |
| `IsStrongAntichain.isAntichain [IsRefl α r]` | `IsStrongAntichain r s → IsAntichain r s` | Strong antichains are antichains in reflexive relations. |
| `IsStrongAntichain.subsingleton [IsDirected α r]` | `IsStrongAntichain r s → s.Subsingleton` | In a directed relation (every pair has an upper bound), strong antichains are subsingletons. |
| `IsAntichain.of_strictMonoOn_antitoneOn` | `f : α → β`, `StrictMonoOn f s`, `AntitoneOn f s` ⇒ `IsAntichain (· ≤ ·) s` | If `f` is both strictly increasing and antitone on `s`, then `s` is an antichain. |
| `IsAntichain.image_relEmbedding` | `IsAntichain r s → r ↪r r' → IsAntichain r' (φ '' s)` | Antichains are preserved under rel-embeddings. |
| `IsAntichain.image_relIso_iff` | `IsAntichain r' (φ '' s) ↔ IsAntichain r s` | Rel-isomorphisms preserve and reflect antichains. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isAntichain_`, `isStrongAntichain_`, `isWeakAntichain_`: used for *iff* characterizations of insertion or membership (e.g., `isAntichain_insert`, `isStrongAntichain_insert`).
  - `image_`, `preimage_`: for behavior under function images/preimages.
  - `mono_`, `flip`, `swap`: for monotonicity and symmetry transformations.
  - `of_`: for implication-based introduction lemmas (e.g., `of_strictMonoOn_antitoneOn`).
  - `eq`, `eq'`: for equality consequences from relatedness.

- **Suffixes**:
  - `_iff`: for biconditional characterizations (e.g., `image_relEmbedding_iff`, `isAntichain_and_least_iff`).
  - `_on`: for restricted versions (e.g., `mono_on`, `StrictMonoOn`).
  - `_iff`: often paired with `image_`, `preimage_`, or `antichain_` to denote equivalence.

- **Other patterns**:
  - `to_dual`, `to_dual_iff`: relate antichains in `α` and its dual `αᵒᵈ`.
  - `insert`, `insert_of_symmetric`: for inductive construction of antichains.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `rintro`, `obtain`, `rw`, `exact`, `refl`, `symm`, `apply`, `cases`
- `aesop` (for automated reasoning in first-order logic)
- `simp` / `simp_rw` (for simplification using definitional equalities and lemmas)
- `ring` (for algebraic simplifications, though less common here)
- `linarith` / `nlinarith` (for order reasoning, especially in `Preorder`/`PartialOrder` sections)
- `swap` (to reverse goal order, used in symmetry arguments)
- `mt`, `not_not_intro`, `False.elim` (for negation handling)
- `pairwise_insert`, `pairwise_singleton` (from `Set.Pairwise`)

---

#### **4. Proof Logic & Strategy**

- **Induction & Case Analysis**:
  - Antichain properties are often proven by unfolding `Pairwise` and doing case analysis on equality (`a = b`) or inequality (`a ≠ b`).
  - Insertion lemmas (`isAntichain_insert`, etc.) use `Set.pairwise_insert` to reduce to membership conditions.

- **Symmetry & Duality**:
  - When `r` is symmetric, `insert` simplifies (e.g., `insert_of_symmetric`).
  - Dual orders (`αᵒᵈ`) are handled via `to_dual` and symmetry of `≤`.

- **Monotonicity & Embeddings**:
  - Preservation under embeddings/isomorphisms uses `map_rel_iff`, `injective`, and `relEmbedding.map_rel_iff`.

- **Order-Theoretic Reasoning**:
  - In `Preorder`/`PartialOrder`, proofs rely on `lt_iff_le_not_le`, `not_lt`, `le_antisymm`, and trichotomy/directedness assumptions.
  - Strong antichains use `directed_of` to derive subsingularity.

- **Subsingleton Arguments**:
  - Many results (`subsingleton`, `eq`, `eq'`) reduce to uniqueness of elements under the relation.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Data.Set.Pairwise.Basic`: Core definitions of `Pairwise`, used to define antichains.
- `Mathlib.Order.Bounds.Basic`: `IsLeast`, `IsGreatest`, `IsBot`, `IsTop`, etc.
- `Mathlib.Order.Directed`: `IsDirected`, `IsTrichotomous`, `directed_of`, `trichotomous_of`.
- `Mathlib.Order.Hom.Set`: Rel embeddings (`r ↪r r'`), rel isomorphisms (`r ≃r r'`), order embeddings (`α ↪o β`), order isomorphisms (`α ≃o β`).

**Domain Scope**:
- General binary relations (`α → α → Prop`)
- Preorders, partial orders, lattices, Boolean algebras (via `compl`)
- Product types `Π i, α i` with pointwise orders and strong order `≺`
- Applications to independent sets in graphs (via `G.adj`) and incomparability in posets.

---

This module formalizes a rich theory of antichains across multiple relational and order-theoretic contexts, with strong support for preservation under morphisms, duality, and product structures.