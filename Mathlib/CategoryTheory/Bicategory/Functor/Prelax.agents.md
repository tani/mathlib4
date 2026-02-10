Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Prelax Functors in Lean 4 (Category Theory Library)**

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `PrelaxFunctorStruct B C` | `Type (u₁ ⊔ u₂ ⊔ v₁ ⊔ v₂ ⊔ w₁ ⊔ w₂)` | A structure between bicategories `B`, `C` consisting of: <br>• `obj : B → C` <br>• `map : (a ⟶ b) → (F.obj a ⟶ F.obj b)` <br>• `map₂ : (f ⟶ g) → (map f ⟶ map g)` <br>Extends `Prefunctor B C`. |
| `PrelaxFunctor B C` | `Type (u₁ ⊔ u₂ ⊔ v₁ ⊔ v₂ ⊔ w₁ ⊔ w₂)` | A `PrelaxFunctorStruct` where `map₂` is functorial: <br>• `map₂ (𝟙 f) = 𝟙 (map f)` <br>• `map₂ (η ≫ θ) = map₂ η ≫ map₂ θ` |
| `PrelaxFunctorStruct.mkOfHomPrefunctors` | `F : B → C → (a b : B) → Prefunctor (a ⟶ b) (F a ⟶ F b) → PrelaxFunctorStruct B C` | Constructs a `PrelaxFunctorStruct` from object map + prefunctors on hom-quivers. |
| `PrelaxFunctor.mkOfHomFunctors` | `F : B → C → (a b : B) → (a ⟶ b) ⥤ (F a ⟶ F b) → PrelaxFunctor B C` | Constructs a `PrelaxFunctor` from object map + *functors* on hom-categories. |
| `PrelaxFunctorStruct.id B` | `PrelaxFunctorStruct B B` | Identity prelax functor structure (acts as identity on all levels). |
| `PrelaxFunctorStruct.comp F G` | `PrelaxFunctorStruct B D` | Composition of prelax functor structures. |
| `PrelaxFunctor.comp F G` | `PrelaxFunctor B D` | Composition of prelax functors. |
| `PrelaxFunctor.mapFunctor a b` | `(a ⟶ b) ⥤ (F.obj a ⟶ F.obj b)` | The induced functor on hom-categories. |
| `PrelaxFunctor.map₂Iso η` | `f ≅ g → F.map f ≅ F.map g` | Action on 2-isomorphisms. |
| `PrelaxFunctor.map₂_isIso` | `[IsIso η] → IsIso (F.map₂ η)` | `map₂` preserves isomorphisms. |
| `map₂_inv`, `map₂_hom_inv`, `map₂_inv_hom` | Lemmas | Behavior of `map₂` on inverses and composites of 2-isomorphisms. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `map₂`: for action on 2-morphisms.
  - `map`: for action on 1-morphisms.
  - `obj`: for action on objects.
- **Suffixes**:
  - `Struct`: for underlying structure without functoriality.
  - `mkOfHomPrefunctors` / `mkOfHomFunctors`: construction from hom-level data.
  - `id`, `comp`: standard categorical operations.
- **Iso-related**:
  - `map₂Iso`, `map₂_isIso`, `map₂_inv`, `map₂_hom_inv`, etc.

#### **3. Tactic Stack**

- **Core tactics**:
  - `aesop`, `aesop_cat`: used in proof obligations for `map₂_id` and `map₂_comp`.
  - `simp`, `rw`, `apply`, `exact`, `refl`, ` rfl`.
- **Rewriting & simplification**:
  - `simp_rw`, `simp only`, `simp [← ...]`, `simp [Iso.hom_inv_id]`, etc.
- **Category-specific**:
  - `reassoc`: used as an attribute for associativity lemmas (`map₂_comp`, etc.).
  - `initialize_simps_projections`: for simplifier projection setup.

#### **4. Proof Logic**

- **Structure definitions** rely on extending `Prefunctor` and adding `map₂`.
- **Functoriality of `map₂`** is enforced via two axioms (`map₂_id`, `map₂_comp`), proven via `aesop`/`aesop_cat`.
- **Lemmas about isomorphisms**:
  - Use `IsIso` typeclass.
  - Prove via `eq_inv_of_hom_inv_id` + `simp` + `map₂_comp`.
  - Often rely on `Iso.hom_inv_id`, `Iso.inv_hom_id`.
- **Construction lemmas** (e.g., `mkOfHomFunctors_mapFunctor`) are proven by `rfl`.

#### **5. Imports & Dependencies**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.Bicategory.Basic
  ```
- **Key dependencies**:
  - `CategoryTheory.Bicategory.Basic`: defines bicategories, 2-morphisms, hom-categories.
  - `CategoryTheory.Prefunctor`: used in `PrelaxFunctorStruct` extension.
  - `CategoryTheory.IsIso`, `CategoryTheory.Iso`: for invertibility of 2-morphisms.
  - `Mathlib.Util.Sims`: for `initialize_simps_projections`, `simps`, `simp`.

---

This file provides foundational infrastructure for lax and oplax functors by isolating the common structure of *prelax functors*, where `map₂` is functorial but no coherence laws (e.g., for composition or unitors) are imposed yet. It sets up the API needed for later definitions like `LaxFunctor`, `OplaxFunctor`, and their morphisms.