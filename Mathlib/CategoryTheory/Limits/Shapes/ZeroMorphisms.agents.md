### Technical Metadata Brief: `CategoryTheory.Limits.ZeroMorphisms`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasZeroMorphisms` | `class` | Declares existence of a *designated* zero morphism in each hom-set, stable under composition on either side. |
| `HasZeroMorphisms.zero` | `∀ X Y, Zero (X ⟶ Y)` | Instance of zero element in each hom-set. |
| `comp_zero` / `zero_comp` | `f ≫ 0 = 0`, `0 ≫ f = 0` | Axioms ensuring zero morphisms absorb under composition. |
| `ext` | `I J : HasZeroMorphisms C → I = J` | Uniqueness of `HasZeroMorphisms` instance (subsingleton). |
| `IsZero` | `class` | Object `X` is *zero* if `X ≅ 0`, i.e., initial and terminal. |
| `IsZero.iff_id_eq_zero` | `IsZero X ↔ 𝟙 X = 0` | Characterization of zero objects via identity morphism. |
| `zeroMorphismsOfZeroObject` | `HasZeroObject C → HasZeroMorphisms C` | Constructs zero morphisms from a zero object (note: discouraged for library use). |
| `imageZero` | `image (0 : X ⟶ Y) ≅ 0` | Image of a zero morphism is the zero object. |
| `isIsoZeroEquiv` | `IsIso (0 : X ⟶ Y) ≃ 𝟙 X = 0 ∧ 𝟙 Y = 0` | Zero morphism is iso iff both identities are zero. |
| `isIsoZeroEquivIsoZero` | `IsIso (0 : X ⟶ Y) ≃ (X ≅ 0) × (Y ≅ 0)` | Zero morphism is iso iff source & target are zero objects. |
| `isoZeroOfMonoZero` / `isoZeroOfEpiZero` | `Mono (0 : X ⟶ Y) → X ≅ 0`, `Epi (0 : X ⟶ Y) → Y ≅ 0` | Monic/epic zero morphisms force source/target to be zero. |
| `idZeroEquivIsoZero` | `𝟙 X = 0 ≃ X ≅ 0` | Equivalence between zero identity and zero object isomorphism. |
| `hasZeroObject_of_hasInitial_object` / `hasZeroObject_of_hasTerminal_object` | Under `HasZeroMorphisms`, any initial/terminal object is zero. | |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `zero_`: e.g., `zero_comp`, `zero_of_to_zero`, `zero_of_from_zero`, `zero_app`.
  - `isIsoZero_`: e.g., `isIsoZeroEquiv`, `isIsoZeroSelfEquiv`, `isIsoZeroEquivIsoZero`.
  - `isoZero_`: e.g., `isoZeroOfMonoZero`, `isoZeroOfEpiZero`, `isoZeroOfMonoEqZero`.
  - `idZero_`: e.g., `idZeroEquivIsoZero`.
- **Suffixes**:
  - `_zero`: e.g., `imageZero`, `image.ι_zero`.
  - `_of_zero`: e.g., `zero_of_to_zero`, `zero_of_from_zero`.
  - `_of_`: e.g., `zero_of_epi_comp`, `eq_zero_of_src`, `eq_zero_of_tgt`.
- **Adjectives**:
  - `isSplitMono`, `isSplitEpi`, `Mono`, `Epi`, `IsIso`, `IsZero`, `IsInitial`, `IsTerminal`.
- **Functorial**:
  - `zero_app`, `zero_map`, `zero_obj`.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `aesop_cat`: Used extensively in class proofs and simplifications (e.g., `comp_zero`, `zero_comp`, `ext`).
  - `simp only`, `simp`: For simplifying zero morphism identities and hom-extremal properties.
  - `congr`: For congruence of morphism equalities (e.g., in `zeroMorphismsOfZeroObject`).
  - `rw`, `apply`, `subst`: Standard rewriting and elimination.
  - `ext`: Extensionality for morphisms (especially in `zeroIso*`, `id_zero`, `zero_of_*`).
  - `cases'`, `fconstructor`, `fapply`: For constructing subsingleton/equivalence proofs.
  - `calc`: For chain-of-equalities proofs (e.g., `hasZeroObject_of_hasInitial_object`).
  - `aesop`: General-purpose automation for propositional reasoning.

---

#### **4. Proof Logic**

- **Structure**:
  - **Induction/Case analysis** on `HasZeroMorphisms` instances (e.g., `ext_aux`).
  - **Subsingleton reasoning**: Prove uniqueness of `HasZeroMorphisms` via `ext`.
  - **Equivalence proofs**: Use `Equiv` + `left_inv`/`right_inv` for `↔` statements (e.g., `idZeroEquivIsoZero`).
  - **Factorization arguments**: Image/mono/epi factorization used to deduce zero-ness (e.g., `eq_zero_of_image_eq_zero`, `zero_of_epi_comp`).
  - **Iso-based reasoning**: Leverage `X ≅ 0` ↔ `𝟙 X = 0` to move between object-level and morphism-level zero conditions.
  - **Zero object as universal factor**: Many proofs use the unique morphism through `0` (e.g., `zeroMorphismsOfZeroObject`, `zero_of_to_zero`, `zero_of_from_zero`).
  - **Split mono/epi arguments**: Use split mono/epi structure to reduce to zero morphism properties (e.g., `isoZeroOfMonoEqZero`, `isSplitMono_sigma_ι`).

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Group.Pi.Basic` | For `Pi`-based constructions (e.g., product of hom-sets, used in `HasZeroMorphisms (C ⥤ D)`). |
| `Mathlib.CategoryTheory.Limits.Shapes.Products` | For product objects and projections (used in `isSplitEpi_prod_*`). |
| `Mathlib.CategoryTheory.Limits.Shapes.Images` | For image factorizations (`HasImage`, `image.ι`, `factorThruImage`). |
| `Mathlib.CategoryTheory.IsomorphismClasses` | For `IsIsomorphic`, `Iso`, and related equivalences. |
| `Mathlib.CategoryTheory.Limits.Shapes.ZeroObjects` | For `ZeroObject`, `IsZero`, `IsInitial`, `IsTerminal`, and related constructions. |

---

### Summary

This module formalizes the foundational theory of **zero morphisms** and **zero objects** in category theory. It emphasizes:
- **Uniqueness** of zero-morphism structure (`HasZeroMorphisms` is a subsingleton),
- **Equivalences** between zero morphisms, zero identities, and zero object isomorphisms,
- **Factorization behavior** (especially images of zero morphisms),
- **Universal properties** (e.g., zero object as both initial and terminal),
- **Functorial behavior** (zero functors, zero natural transformations),
- **Split mono/epi properties** in presence of zero morphisms.

The proofs rely heavily on `aesop_cat`, extensionality, and zero-object factorization, with careful attention to definitional equality issues (e.g., warnings against `zeroMorphismsOfZeroObject` in library code).