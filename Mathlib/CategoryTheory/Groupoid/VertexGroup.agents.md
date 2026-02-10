### Technical Metadata Brief: Vertex Group in Groupoids (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `vertexGroup` | `instance vertexGroup (c : C) : Group (c ⟶ c)` | Constructs the **vertex (isotropy) group** at object `c` in a groupoid `C`, with multiplication given by composition (`x * y = x ≫ y`), identity `𝟙 c`, and inverse `Groupoid.inv`. |
| `vertexGroup.inv_eq_inv` | `γ⁻¹ = CategoryTheory.inv γ` | Proves that the group-theoretic inverse coincides with the categorical inverse in a groupoid. |
| `vertexGroupIsomOfMap` | `{c d : C} → (f : c ⟶ d) → (c ⟶ c) ≃* (d ⟶ d)` | For any arrow `f : c → d`, defines a **group isomorphism** via conjugation: `γ ↦ f⁻¹ ≫ γ ≫ f`. |
| `vertexGroupIsomOfPath` | `{c d : C} → (p : Quiver.Path c d) → (c ⟶ c) ≃* (d ⟶ d)` | Extends the above to paths: a path `p : c ↝ d` induces a group isomorphism via composition of the path (as a morphism in the path category). |
| `mapVertexGroup` | `(φ : C ⥤ D) → (c : C) → (c ⟶ c) →* (φ c ⟶ φ c)` | A functor `φ` induces a **group homomorphism** between vertex groups at `c` and `φ(c)`. |

> **Note**: The `@[simps]` attribute ensures automatic generation of simplification lemmas for the structure components (`toFun`, `invFun`, `map_mul'`, etc.).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `vertexGroup*`: Denotes constructions related to the vertex/isotropy group.
  - `mapVertexGroup`: Functorial action on vertex groups.
- **Suffixes**:
  - `IsomOfMap` / `IsomOfPath`: Indicates an isomorphism induced by a morphism or path.
- **General patterns**:
  - `inv` used for categorical inverse (e.g., `inv f`).
  - `≈*` in typeclass `≃*` for *group isomorphisms*.
  - `→*` for *group homomorphisms*.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp_rw`: Rewriting with simplification lemmas (especially for associativity, identity, and inverse laws).
- `simp only [...]`: Fine-grained simplification using specific lemmas (e.g., `inv_comp`, `comp_id`, `assoc`).
- `by` + `simp_rw [...]`: Standard pattern for short proofs leveraging category axioms.
- `simp only [vertexGroup_mul, inv_eq_inv, ...]`: Combining group-theoretic and categorical definitions.

> **Notable**: No heavy automation like `aesop` or `ring`; proofs rely on structured `simp`-based reasoning.

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *direct computational* style:
  1. Unfold definitions (e.g., `vertexGroup_mul`, `inv_eq_inv`, `toFun`, `invFun`).
  2. Apply associativity, identity, and inverse laws (`assoc`, `id_comp`, `comp_id`, `inv_comp`).
  3. Use `simp_rw` to rewrite step-by-step, often with `← Category.assoc` to reassociate.
- **Induction**: Not used here — all proofs are *algebraic*, relying on groupoid axioms.
- **Key insight**: Conjugation by an isomorphism is an automorphism — verified via cancellation laws (`inv_comp`, `comp_inv`).

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Group.Equiv.Basic`: For `≃*` (group isomorphisms).
- `Mathlib.CategoryTheory.Groupoid`: Core groupoid theory (`Groupoid.inv`, `IsIso`, etc.).
- `Mathlib.CategoryTheory.PathCategory.Basic`: For `composePath` and path composition.
- `Mathlib.Combinatorics.Quiver.Path`: For `Quiver.Path` and path-related constructions.

**Domain**:  
This module formalizes *categorical isotropy groups* in the context of **groupoids**, bridging category theory and group theory. It is foundational for higher categorical/homotopical applications (e.g., fundamental groupoids, covering theory).

--- 

Let me know if you'd like a formalized summary in LaTeX or a dependency graph.