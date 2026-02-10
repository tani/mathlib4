### Technical Metadata Brief: Essential Image of a Functor (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `essImage` | `F.essImage : Set D` | Defines the *essential image* of a functor `F : C ⥤ D` as the set of objects in `D` isomorphic to some `F.obj X`. |
| `essImage.witness` | `Y ∈ F.essImage → C` | Extracts a witness object `X : C` such that `F.obj X ≅ Y`. |
| `essImage.getIso` | `Y ∈ F.essImage → F.obj (witness h) ≅ Y` | Extracts the explicit isomorphism from the witness. |
| `essImage.ofIso` | `Y ≅ Y' → Y ∈ essImage F → Y' ∈ essImage F` | Shows essential image is closed under isomorphism (hygienic). |
| `essImage.ofNatIso` | `F ≅ F' → Y ∈ essImage F → Y ∈ essImage F'` | Essential image is invariant under natural isomorphism of functors. |
| `essImage_eq_of_natIso` | `F ≅ F' → essImage F = essImage F'` | Isomorphic functors have equal essential images. |
| `obj_mem_essImage` | `F.obj Y ∈ essImage F` | Objects in the strict image lie in the essential image. |
| `EssImageSubcategory` | `FullSubcategory F.essImage` | Interprets essential image as a full subcategory of `D`. |
| `essImageInclusion` | `F.EssImageSubcategory ⥤ D` | The inclusion functor from the essential image subcategory. |
| `toEssImage` | `C ⥤ F.EssImageSubcategory` | Factorization of `F` through its essential image. |
| `toEssImageCompEssentialImageInclusion` | `F.toEssImage ⋙ F.essImageInclusion ≅ F` | Factorization isomorphism: `F` decomposes as essentially surjective → fully faithful. |
| `EssSurj` | `class EssSurj (F : C ⥤ D)` | Predicate for *essentially surjective* functors: every object in `D` is in `essImage F`. |
| `objPreimage` | `Y : D → C` | Given `EssSurj F`, picks a preimage object for `Y`. |
| `objObjPreimageIso` | `F.obj (objPreimage Y) ≅ Y` | Witness of essential surjectivity: image of preimage is iso to `Y`. |
| `Faithful.toEssImage`, `Full.toEssImage` | Instances | Faithfulness/fullness descends to the factorized functor `toEssImage`. |
| `essSurj_comp`, `essSurj_of_comp_fully_faithful`, etc. | Theorems | Closure properties of essentially surjective functors under composition and factorization. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `essImage_`: for definitions and lemmas about the essential image set/subcategory.
  - `objPreimage`, `objObjPreimageIso`: for constructions relying on essential surjectivity.
  - `toEssImage`: for the canonical factorization functor.
  - `essImageInclusion`: for the inclusion of the essential image subcategory.

- **Suffixes**:
  - `_ofIso`, `_ofNatIso`: indicate invariance under isomorphism / natural isomorphism.
  - `_ext`: extensionality lemmas (e.g., `essImage_ext`).
  - `_comp_...`: for factorization-related isomorphisms (e.g., `toEssImageCompEssentialImageInclusion`).

- **Class names**:
  - `EssSurj`: short for *essentially surjective*.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simpa` | Simplifying hom-sets, using `@[simps!]` lemmas, especially for `toEssImage`, `essImageInclusion`. |
| `exact` / `assumption` | Straightforward application of hypotheses or definitions. |
| ` Classical.choice` | Extracting witnesses from `∃`-statements (e.g., in `essImage.getIso`). |
| `funext`, `propext` | Proving equality of sets or propositions (e.g., `essImage_eq_of_natIso`). |
| `apply`, `refine` | Constructing morphisms or isomorphisms via composition (`≪≫`) and inverses. |
| `cases` / `obtain` | Destructuring existential hypotheses (e.g., `hY : Y ∈ essImage F`). |
| `aesop` / `tauto` | Not explicitly used here, but likely in downstream developments. |
| `ring` / `abel` | Not present — this is purely categorical, no additive structure. |

---

#### **4. Proof Logic**

- **General pattern**:
  - Prove properties of `essImage` by unfolding its definition: `Y ∈ F.essImage ↔ ∃ X, Nonempty (F.obj X ≅ Y)`.
  - Use `imp` (monotonicity of `Nonempty`) to propagate isomorphisms.
  - For constructions like `toEssImage`, use `FullSubcategory.lift` to define functors into the full subcategory.
  - Factorization isomorphisms (`toEssImageCompEssentialImageInclusion`) are proven via `FullSubcategory.lift_comp_inclusion`.
  - Essential surjectivity is often shown by constructing a witness using `objPreimage` and `objObjPreimageIso`.
  - Closure under composition uses `mapIso` to lift isomorphisms through functors.

- **Inductive/constructive style**: Lean’s noncomputable semantics and classical choice (`Classical.choice`) are used to extract witnesses from `∃`-types.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.NatIso` | Provides natural isomorphisms (`F ≅ G`), used in `essImage.ofNatIso`, `essSurj_of_iso`. |
| `Mathlib.CategoryTheory.FullSubcategory` | Enables definition of `EssImageSubcategory` and inclusion functors. |

**Scope**:  
This module formalizes foundational categorical concepts around *essential images* and *essential surjectivity*, with an emphasis on *homotopical correctness* (i.e., respecting equivalence/invariance under isomorphism). It sets up the *factorization system* (essentially surjective ⊣ fully faithful), which is foundational for e.g. defining *exponential ideals*, *localization*, and *Grothendieck fibrations*.

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for related results (e.g., orthogonal factorization systems).