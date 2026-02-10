### Technical Brief: `Mathlib.Rel` Module

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Rel α β` | `α → β → Prop` | Bundled binary relation between types `α` and `β`. |
| `r.inv` | `Rel β α` | Inverse relation: `r.inv x y ↔ r y x`. |
| `r.dom` | `Set α` | Domain: `{ x | ∃ y, r x y }`. |
| `r.codom` | `Set β` | Codomain (range): `{ y | ∃ x, r x y }`. |
| `r.comp s` | `Rel α γ` | Composition: `r • s x z ↔ ∃ y, r x y ∧ s y z`. |
| `r.image s` | `Set β` | Image of set `s : Set α`: `{ y | ∃ x ∈ s, r x y }`. |
| `r.preimage s` | `Set α` | Preimage: `r.inv.image s`. |
| `r.core s` | `Set α` | Core: `{ x | ∀ y, r x y → y ∈ s }`. |
| `r.restrictDomain s` | `Rel { x // x ∈ s } β` | Domain restriction to subtype. |
| `f.graph` | `Rel α β` | Graph of function `f : α → β`: `f x = y`. |
| `Rel.ext` | `(∀ a, r a = s a) → r = s` | Extensionality for relations. |
| `Rel.comp_assoc` | `(r • s) • t = r • (s • t)` | Associativity of relation composition. |
| `Rel.comp_right_id` | `r • Eq = r` | Right identity for composition (with equality relation). |
| `Rel.comp_left_id` | `Eq • r = r` | Left identity for composition. |
| `Rel.inv_comp` | `inv (r • s) = inv s • inv r` | Inverse reverses composition order. |
| `Rel.image_comp` | `image (r • s) t = image s (image r t)` | Image distributes over composition. |
| `Rel.image_core_gc` | `GaloisConnection r.image r.core` | Image and core form a Galois connection. |
| `Function.graph_injective` | `Injective graph` | Graph embedding is injective. |
| `Function.graph_comp` | `graph (f ∘ g) = graph g • graph f` | Graph of composition = relation composition. |
| `Relation.is_graph_iff` | `(∃! f, graph f = r) ↔ ∀ x, ∃! y, r x y` | Characterizes graphs among relations. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `inv_`: inverse (e.g., `inv_def`, `inv_comp`, `inv_bot`)
  - `dom_`, `codom_`: domain/codomain-related (e.g., `dom_mono`, `codom_inv`)
  - `image_`, `preimage_`, `core_`: set operations (e.g., `image_mono`, `preimage_union`, `core_inter`)
  - `comp_`: composition (e.g., `comp_assoc`, `comp_left_id`)
  - `restrictDomain_`: domain restriction (e.g., `restrictDomain`)

- **Suffixes**:
  - `_def`: definition lemmas (e.g., `inv_def`, `mem_image`, `mem_core`)
  - `_id`: identity laws (e.g., `comp_right_id`, `image_id`, `core_id`)
  - `_bot` / `_top`: behavior with bottom/top relations (e.g., `comp_right_bot`, `image_top`)
  - `_mono`: monotonicity (e.g., `image_mono`, `core_mono`)
  - `_gc`: Galois connection (e.g., `image_core_gc`)

- **Notation**:
  - `•` for relation composition (`r • s`), to avoid conflict with function composition `∘`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Proving equality of relations/sets by extensionality. |
| `simp` / `simp only` | Simplifying goals using definitions and lemmas (e.g., `mem_image`, `comp`, `inv_def`). |
| `rintro` / `intro` | Introducing existentials and conjunctions. |
| `constructor` | Splitting iff goals or conjunctions. |
| `aesop` | Automated reasoning (used in `Equiv.graph_inv`). |
| `rw` / `apply` | Rewriting using known equalities or applying lemmas. |
| ` rfl` | Trivial equalities (e.g., in `inv_def`, `mem_image`). |
| `Set.ext` | Proving set equality via extensionality. |
| `le_antisymm` | Proving set equality via mutual inclusion. |
| `unfold` | Unfolding definitions (e.g., `unfold comp`). |

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs are typically **extensional**: show two relations/sets are equal by proving pointwise membership equivalence (`ext` + `simp`/`rintro`/`intro`).
  - **Induction** is not used here (no inductive types involved).
  - **Case analysis** on `Set.mem` or `∃`/`∀` is common (e.g., `rcases hx with ⟨x, xs, rxy⟩`).
  - **Galois connections** are established via `image_subset_iff`, then `image_core_gc` is derived.
  - **Set-theoretic reasoning** dominates: subset inclusions via `Set.eq_of_subset_of_subset`, `image_subset`, `mono`, etc.

- **Typical proof pattern**:
  ```lean
  ext x y
  constructor
  · rintro ⟨z, ⟨y, rxy, syz⟩, tzw⟩
    exact ⟨y, rxy, z, syz, tzw⟩
  · rintro ⟨y, rxy, z, syz, tzw⟩
    exact ⟨z, ⟨y, rxy, syz⟩, tzw⟩
  ```

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Order.CompleteLattice` | Provides `CompleteLattice` instance for `Rel α β` (as `α → β → Prop`). |
| `Mathlib.Order.GaloisConnection` | Used for `GaloisConnection` and `GaloisInsertion` infrastructure (e.g., `image_core_gc`). |
| `Mathlib.Data.Set.Lattice` | Set operations, lattice structure, monotonicity, etc. |
| `Mathlib.Tactic.AdaptationNote` | For Lean version-specific `simp` notes (e.g., `#adaptation_note`). |

---

### Summary

This module formalizes **bundled binary relations** as predicates `α → β → Prop`, with rich algebraic and order-theoretic structure. It supports:
- **Composition**, **inverse**, **domain/codomain**, **image/preimage**, and **core** operations.
- **Lattice structure** (complete lattice via pointwise `Prop` lattice).
- **Galois connections** between image and core.
- **Embedding of functions** via their graphs, with compatibility with relation operations.

The design aligns with **categorical intuition** (composition order matches `CategoryTheory`), and avoids notation clashes with function composition using `•`. Proofs rely heavily on **extensionality**, **set-theoretic reasoning**, and **simplification** using definitional lemmas.