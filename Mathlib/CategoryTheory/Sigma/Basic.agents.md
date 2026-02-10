### Technical Brief: Disjoint Union of Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `SigmaHom` | Inductive family of morphisms on the disjoint union `Σ i, C i`. For `⟨i, X⟩`, `⟨j, Y⟩`, `SigmaHom ⟨i, X⟩ ⟨j, Y⟩` is nonempty iff `i = j`, in which case it's `X ⟶ Y`. |
| `SigmaHom.id` | Identity morphism on any object `X : Σi, C i`. Defined as `mk (𝟙 X)`. |
| `SigmaHom.comp` | Composition of sigma morphisms: `mk f ≫ mk g = mk (f ≫ g)`. |
| `SigmaHom.comp_def` | Definitional equality: `comp (mk f) (mk g) = mk (f ≫ g)`. |
| `SigmaHom.assoc`, `id_comp`, `comp_id` | Category axioms lifted from component categories via `congr_arg mk`. |
| `Sigma.sigma` | Instance making `Σi, C i` into a category. Uses the above lemmas to satisfy category laws. |
| `incl i` | Inclusion functor `C i ↪ Σi, C i`. On objects: `X ↦ ⟨i, X⟩`; on morphisms: `f ↦ mk f`. Fully faithful (instances `Functor.Full`, `Functor.Faithful`). |
| `natTrans` | Constructs a natural transformation `F ⟶ G` on `Σi, C i` from a family `∀ i, incl i ⋙ F ⟶ incl i ⋙ G`. |
| `desc F` | *Coproduct* (or *disjoint union*) functor: given `F : ∀ i, C i ⥤ D`, produces `desc F : Σi, C i ⥤ D`. On objects: `(i, X) ↦ F i X`; on morphisms: `mk f ↦ F i f`. |
| `inclDesc F i` | Natural isomorphism `incl i ⋙ desc F ≅ F i`. Shows `desc F` restricts correctly on each component. |
| `descUniq F q h` | Uniqueness up to iso: if `q` restricts to `F i` on each `C i`, then `q ≅ desc F`. |
| `natIso` | If two functors `q₁, q₂` agree on each subcategory (up to iso), then `q₁ ≅ q₂`. |
| `Sigma.map C g` | Functor induced by `g : J → I`: `Σ j, C (g j) ⥤ Σ i, C i`, defined as `desc (incl ∘ g)`. |
| `mapId`, `mapComp` | Identity and composition laws for `map`: `map id ≅ id`, `map f ⋙ map g ≅ map (g ∘ f)`. |
| `Functor.sigma` | Assembles a family of functors `∀ i, C i ⥤ D i` into `Σi, C i ⥤ Σi, D i`. |
| `natTrans.sigma` | Assembles a family of natural transformations `∀ i, F i ⟶ G i` into `Functor.sigma F ⟶ Functor.sigma G`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Sigma.`: Module-level namespace for all definitions.
  - `incl`: Inclusion of a component category.
  - `desc`: “Descending” or “cocone” functor from coproduct universal property.
  - `map`: Induced functor from a function on indices.
  - `natTrans`, `natIso`: Natural transformations and isomorphisms.

- **Suffixes**:
  - `_app`: Component-wise application (e.g., `inclDesc_hom_app`, `descUniq_hom_app`).
  - `_def`: Definitional equalities (e.g., `comp_def`).
  - `_hom`, `_inv`: Components of isomorphisms (e.g., `inclDesc_hom`, `descUniq_inv`).

- **Pattern**:
  - `incl i ⋙ F ≅ F i` → `inclDesc F i`.
  - Uniqueness lemmas use `descUniq` + hypothesis on restrictions.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs and simplifications:

| Tactic | Usage |
|--------|-------|
| `rintro` / `intro` | Pattern matching on dependent pairs (`⟨i, X⟩`) and sigma morphisms (`mk f`). |
| `congr_arg mk` | Lift equalities from component categories to sigma morphisms. |
| `simp` / `simp_rw` | Apply `@[simp]` lemmas (e.g., `incl_obj`, `desc_map_mk`, `natTrans_app`). |
| `apply ...naturality` | Use naturality of given natural transformations (e.g., `(h j).naturality`). |
| ` rfl` | For definitional equalities (e.g., `desc_map_mk`, `incl_obj`). |
| `injection` | In `Functor.Faithful` instance to prove injectivity of `map`. |
| `isoWhiskerRight` | In `mapComp` to reassociate isomorphisms of functors. |
| `exact`, `refine`, `apply` | Standard proof scripting. |

---

#### **4. Proof Logic**

- **Category instance proof** (`sigma`):  
  Reduce to component category axioms via `congr_arg mk`, using `assoc`, `id_comp`, `comp_id`.

- **Natural transformation construction** (`natTrans`):  
  Define component-wise; naturality follows by applying naturality in each component.

- **Functor `desc` construction**:  
  - `obj`: Apply `F i` to `X`.  
  - `map`: Use `descMap`, which maps `mk f` to `(F i).map f`.  
  - `map_id`, `map_comp`: Follow from corresponding properties of each `F i`.

- **Uniqueness (`descUniq`)**:  
  Construct iso component-wise using `h i`. Naturality follows from naturality of each `(h i).hom`.

- **Functoriality of `map`**:  
  - `mapId`: Use `natIso` with identity components.  
  - `mapComp`: Combine `inclCompMap` and `descUniq` with whiskering.

- **Family constructions (`Functor.sigma`, `natTrans.sigma`)**:  
  Use `desc` and `natTrans` to assemble indexed families.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.CategoryTheory.Whiskering`: For `isoWhiskerRight`, used in `mapComp`.
- `Mathlib.CategoryTheory.Functor.FullyFaithful`: For `Functor.Full`/`Faithful` instances.
- `Mathlib.CategoryTheory.NatIso`: For `NatIso.ofComponents`, `hom`, `inv`, etc.

**Scope**:
- Defines the **coproduct** (disjoint union) of a family of categories indexed by `I : Type w₁`.
- Works in arbitrary universes: `w₁, w₂, w₃, v₁, v₂, u₁, u₂`.
- Central result: `Σi, C i` is the **coproduct** in the category **Cat**, witnessed by:
  - Inclusions `incl i : C i → Σi, C i`
  - Universal property via `desc F` and uniqueness up to natural isomorphism.

---

### Summary

This file formalizes the **coproduct of categories** in Lean 4, constructing the disjoint union `Σi, C i` as a category, proving its universal property, and verifying functoriality and naturality of constructions over families. It demonstrates how dependent sums interact with categorical structure, and serves as a foundational tool for reasoning about indexed families of categories (e.g., in fibered categories, Grothendieck constructions, or type-theoretic semantics).