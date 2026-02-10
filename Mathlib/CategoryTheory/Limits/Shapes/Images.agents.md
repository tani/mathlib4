### Technical Brief: Categorical Images in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `MonoFactorisation f` | `Structure` | A factorization `f = e ≫ m` with `m` monic. Components: `I`, `m : I ⟶ Y`, `e : X ⟶ I`, and proof `e ≫ m = f`. |
| `IsImage F` | `Structure` | Universal property: for any other mono factorization `F'`, there is a unique `lift : F.I ⟶ F'.I` such that `lift ≫ F'.m = F.m`. |
| `ImageFactorisation f` | `Structure` | A mono factorization `F` equipped with `IsImage F`. |
| `HasImage f` | `Class Prop` | Asserts existence of an image factorization for `f`. |
| `image f` | `def` | The object `I` in the chosen image factorization (via choice). |
| `image.ι f` | `def` | The monomorphism `m : image f ⟶ Y` in the image factorization. |
| `factorThruImage f` | `def` | The morphism `e : X ⟶ image f` in the image factorization. |
| `image.lift F'` | `def` | The mediating map from `image f` to any other mono factorization `F'`. |
| `ImageMap sq` | `Structure` | For a commutative square `sq : f ⟶ g`, a map `image f ⟶ image g` making the diagram commute. |
| `HasImageMap sq` | `Class Prop` | Asserts existence of an `ImageMap` for `sq`. |
| `HasImages C` | `Class Prop` | Every morphism in `C` has an image. |
| `HasImageMaps C` | `Class Prop` | Every commutative square in `C` admits an image map. |
| `HasStrongEpiImages C` | *Not defined in this file* (mentioned in intro) | Image factorizations where `e` is a strong epimorphism. |
| `image.ext` | `theorem` | If `factorThruImage f ≫ g = factorThruImage f ≫ h`, then `g = h`. Used to prove `factorThruImage f` is epi (under equalizers). |
| `imageMonoIsoSource` | `def` | For monic `f`, `image f ≅ X`. |
| `image.preComp f g` | `def` | Comparison map `image (f ≫ g) ⟶ image g`. |
| `image.eqToIso h` | `def` | For `h : f = f'`, an isomorphism `image f ≅ image f'`. |
| `image.map sq` | `def` | Under `HasImageMaps`, the induced map on images for square `sq`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `image.`: Core image-related definitions (`image`, `image.ι`, `factorThruImage`, `image.lift`, `image.map`, `image.preComp`, `image.eqToIso`, etc.)
  - `MonoFactorisation.`: Factorization-related operations (`self`, `compMono`, `ofCompIso`, `isoComp`, `ofIsoComp`, `ofArrowIso`)
  - `IsImage.`: Universal property operations (`lift`, `lift_fac`, `fac_lift`, `isoExt`, `ofArrowIso`)
  - `ImageFactorisation.`: Image factorization operations (`ofArrowIso`)
  - `ImageMap.`: Square-induced maps (`transport`, `factor_map`, `map_uniq`, `map_uniq_aux`)
- **Suffixes**:
  - `_fac`: Factorization-related proofs (e.g., `image.lift_fac`, `image.fac_lift`, `image.preComp_ι`)
  - `_iso`: Isomorphism constructions (`imageMonoIsoSource`, `image.eqToIso`, `image.compIso`, `image.isIso_precomp_iso`)
  - `_mono`, `_epi`: Instance proofs of mono/epi properties (`image.preComp_mono`, `image.preComp_epi_of_epi`)
- **`eqToHom` / `eqToIso`**: Standard Mathlib pattern for transport along equalities.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `aesop_cat`: Used for category-theoretic simplification and proof search (e.g., in `fac`, `lift_fac`, `map_ι`, `fac_lift`).
  - `simp`: Heavily used, especially with `reassoc` attributes on key lemmas.
  - `rw`: Rewriting using `image.fac`, `image.lift_fac`, `Category.assoc`, `Iso.hom_inv_id`, etc.
- **Categorical reasoning**:
  - `cancel_mono`: To prove equality of morphisms into a monomorphism.
  - `epi_of_epi`, `mono_of_mono`: To lift epi/mono properties through compositions.
  - `ext`: Extensionality for morphisms (e.g., `image.ext`, `ImageMap.ext`).
- **Category-theoretic helpers**:
  - `dsimp`, `erw`, `convert`: For delicate rewrites (e.g., in `image.eq_fac`, `image.preComp_comp`).
  - `infer_instance`: To discharge typeclass constraints.
  - `congr`: To prove equality of morphisms by uniqueness (e.g., `image.map_comp`, `image.map_id`).

---

#### **4. Proof Logic**

- **Factorization uniqueness up to iso**:
  - Use `IsImage.isoExt` to construct `F.I ≅ F'.I` from two image factorizations.
  - Prove isomorphism properties via `cancel_mono` on the monos `m`, `m'`.
- **Epi property of `factorThruImage f`**:
  - Assume `factorThruImage f ≫ g = factorThruImage f ≫ h`.
  - Construct a new mono factorization via equalizer `q : Eq(g,h) ⟶ image f`.
  - Use universal property to get `v : image f ⟶ Eq(g,h)` with `v ≫ q = 𝟙`.
  - Conclude `g = h` using `equalizer.condition`.
- **Image maps for squares**:
  - For `sq : f ⟶ g`, construct `image f ⟶ image g` as `image.lift (F')` where `F'` is a mono factorization of `f` composed with `sq`.
  - Uniqueness follows from `cancel_mono (image.ι g)` (since `image.ι g` is mono).
- **Transport & comparison maps**:
  - Use `image.lift` and `image.eqToHom` to compare images under equality or isomorphism of morphisms.
  - Prove naturality via `image.lift_fac` and associativity.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Shapes.Equalizers` | Needed for `image.ext` proof (epi of `factorThruImage`). |
| `Mathlib.CategoryTheory.Limits.Shapes.Pullback.Mono` | Used for mono factorization properties (e.g., pullbacks preserve monos). |
| `Mathlib.CategoryTheory.Limits.Shapes.StrongEpi` | Background for strong epimorphisms (mentioned in intro, not used directly here). |
| `Mathlib.CategoryTheory.MorphismProperty.Factorization` | General factorization system machinery (likely for future work or background). |

---

### Summary

This file formalizes **categorical images** in a general category `C`, emphasizing:
- **Existence & uniqueness** of image factorizations (up to canonical iso),
- **Universal property** (`IsImage`) and its consequences (e.g., `factorThruImage` is epi if equalizers exist),
- **Naturality** of images under commutative squares (`ImageMap`, `HasImageMaps`),
- **Functoriality** of the image construction under `HasImages + HasImageMaps`.

The formalization follows Mathlib’s conventions: noncomputable, uses choice for selected images, and leverages typeclasses (`HasImage`, `HasImages`, `HasImageMap`, `HasImageMaps`) for modularity.