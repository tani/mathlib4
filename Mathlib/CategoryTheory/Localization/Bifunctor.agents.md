Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### 📌 **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MorphismProperty.IsInvertedBy₂` | `W₁ : MorphismProperty C₁ → W₂ : MorphismProperty C₂ → F : C₁ ⥤ C₂ ⥤ E → Prop` | States that a bifunctor `F` inverts the product class `W₁.prod W₂` via `uncurry.obj F`. |
| `Localization.Lifting₂` | `class Lifting₂ (W₁ W₂ F F')` | A class expressing that `F' : D₁ ⥤ D₂ ⥤ E` lifts `F : C₁ ⥤ C₂ ⥤ E` up to a natural isomorphism after precomposition with `L₁ × L₂`. |
| `Localization.lift₂` | `lift₂ F hF L₁ L₂ : D₁ ⥤ D₂ ⥤ E` | The induced localized bifunctor, constructed using currying and the 1-ary `lift` on `uncurry.obj F`. |
| `Localization.lift₂NatTrans` | `lift₂NatTrans τ : F₁' ⟶ F₂'` | Induced natural transformation between lifted bifunctors from a natural transformation `τ : F₁ ⟶ F₂`. |
| `Localization.lift₂NatIso` | `lift₂NatIso e : F₁' ≅ F₂'` | Induced natural isomorphism between lifted bifunctors from `e : F₁ ≅ F₂`. |
| `Lifting₂.iso` | `(((whiskeringLeft₂ E).obj L₁).obj L₂).obj F' ≅ F` | The structural isomorphism witnessing the lifting. |
| `Lifting₂.fst`, `Lifting₂.snd`, `Lifting₂.flip` | Instances of `Lifting` for partial applications of `F'`. | Show that lifting of bifunctors implies lifting of their curried arguments. |
| `Lifting₂.uncurry` | Instance of `Lifting` for uncurried versions. | Connects `Lifting₂` with the standard `Lifting` for product categories. |
| `lift₂_iso_hom_app_app₁`, `lift₂_iso_hom_app_app₂` | Lemmas equating components of the lifting isomorphism. | Ensure coherence between the 2-ary and 1-ary lifting isomorphisms. |
| `natTrans₂_ext` | Extensionality principle for natural transformations between lifted bifunctors. | If two natural transformations agree on all `L₁ X₁, L₂ X₂`, they are equal. |

---

### 🔤 **2. Naming Conventions**

- **Prefixes**:
  - `isInvertedBy₂`: for properties of bifunctors relative to classes of morphisms.
  - `lift₂`: for constructions of lifted bifunctors.
  - `Lifting₂`: for the class and its projections (`fst`, `snd`, `flip`, `uncurry`).
  - `lift₂NatTrans`, `lift₂NatIso`: for induced transformations/isomorphisms.

- **Suffixes**:
  - `₂`: indicates bifunctorial (2-ary) analogues of 1-ary notions (`lift`, `Lifting`, `iso`).
  - `flip`: for swapping arguments (e.g., `F.flip`, `F'.flip`).
  - `app_app`: for double application in bifunctor components (e.g., `hom.app X₁ .app X₂`).

- **Variables**:
  - `L₁`, `L₂`: localization functors.
  - `W₁`, `W₂`: morphism properties (classes to invert).
  - `F`, `F'`: original and lifted bifunctors.
  - `τ`, `e`: natural transformations / isomorphisms.

---

### ⚙️ **3. Tactic Stack**

Frequently used tactics in proofs and constructions:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated category-theoretic reasoning (e.g., in `hom_inv_id`, `inv_hom_id`). |
| `simp only [...]` | Simplification with specific lemmas (e.g., `currying_unitIso_*`, `comp_id`, `id_comp`). |
| `rfl` | Reflexivity for definitional equalities (e.g., in `lift₂_iso_hom_app_app₁`). |
| `exact ...` | Direct proof steps (e.g., in `lift₂NatTrans_app_app`). |
| `dsimp`, `simp` | Definitional simplification and rewriting. |
| `apply ...`, `intro`, `cases` | Standard proof scripting. |
| `funext`, `natTrans_ext` | Extensionality for natural transformations. |

---

### 🧠 **4. Proof Logic / Strategy**

- **Reduction to 1-ary case**: All constructions for bifunctors are defined via **currying/uncurrying**, reducing to known results for functors on product categories.
- **Use of `Lifting` class**: The 1-ary `Lifting` is reused via instances like `Lifting₂.uncurry`, `Lifting₂.fst`, etc.
- **Isomorphism-based lifting**: The core idea is that if `F` inverts `W₁ × W₂`, then `uncurry F` inverts `W₁.prod W₂`, so `lift (uncurry F)` exists; currying back gives `lift₂ F`.
- **Uniqueness up to iso**: Lifted bifunctors are unique up to natural isomorphism, formalized via `Lifting₂.iso`.
- **Extensionality**: Natural transformations between lifted bifunctors are determined by their values on objects in the image of `L₁ × L₂`, via `natTrans₂_ext`.

---

### 📦 **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Localization.Prod` | Provides `L₁.prod L₂` and facts about localization of product categories. |
| `Mathlib.CategoryTheory.Functor.Currying` | Supplies `curry`, `uncurry`, `flipFunctor`, `currying.unitIso`, etc., for categorical currying. |

**Core underlying theories**:
- Localization of categories (via `Localization.lift`, `IsLocalization`, `Lifting`)
- Product categories and their universal properties
- Functor categories and natural transformations
- Whiskering and evaluation functors (`whiskeringLeft₂`, `evaluation`)

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch templates**, or **automated reasoning patterns** derived from this file.