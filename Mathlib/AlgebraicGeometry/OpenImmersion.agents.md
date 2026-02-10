Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Open Immersions of Schemes in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsOpenImmersion` | `{X Y : Scheme} → (X ⟶ Y) → Prop` | Defines a scheme morphism as an *open immersion* if it is one as a morphism of *LocallyRingedSpaces*. |
| `opensRange` | `f : X ⟶ Y [IsOpenImmersion f] ↦ Y.Opens` | Represents the image of `f` as an open subset of `Y`. |
| `opensFunctor` | `X.Opens ⥤ Y.Opens` | The functor induced by `f`, mapping open sets in `X` to open sets in `Y`. |
| `appIso` | `U : X.Opens ↦ Γ(Y, f ''ᵁ U) ≅ Γ(X, U)` | The canonical isomorphism on sections induced by `f`. |
| `isoOfRangeEq` | `Set.range f.base = Set.range g.base → X ≅ Y` | Shows two open immersions with equal image are isomorphic. |
| `lift` | `Set.range g.base ⊆ Set.range f.base → Y ⟶ X` | Universal property: lifts a morphism `g` through `f` if its image lies in `f`’s image. |
| `ΓIso` | `U : Y.Opens ↦ Γ(X, f⁻¹ᵁ U) ≅ Γ(Y, f.opensRange ⊓ U)` | Global sections over preimage ≅ sections over intersection of image and `U`. |
| `ΓIsoTop` | `Γ(X, ⊤) ≅ Γ(Y, f.opensRange)` | Global sections of `X` ≅ sections of `Y` over the image of `f`. |
| `scheme` | `(X : LocallyRingedSpace) → (∀ x, ∃ affine chart over x) → Scheme` | Criterion for a LocallyRingedSpace to be a Scheme: existence of jointly surjective affine open immersions. |
| `toScheme` | `PresheafedSpace → Scheme → PresheafedSpace.IsOpenImmersion → Scheme` | If `X → Y` is an open immersion and `Y` is a scheme, then `X` is a scheme. |
| `of_stalk_iso` | `(f : X ⟶ Y) → IsOpenEmbedding f.base → (∀ x, IsIso (f.stalkMap x)) → IsOpenImmersion f` | Characterization: open immersion iff base is open embedding and all stalk maps are isomorphisms. |
| `iff_stalk_iso` | `IsOpenImmersion f ↔ IsOpenEmbedding f.base ∧ ∀ x, IsIso (f.stalkMap x)` | Equivalence between open immersion and stalk-wise isomorphism + open embedding. |
| `isIso_iff_isOpenImmersion` | `IsIso f ↔ IsOpenImmersion f ∧ Epi f.base` | A morphism is iso iff it’s an open immersion and epimorphism (i.e., surjective on underlying topological spaces). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsOpenImmersion`, `IsIso`, `IsOpenEmbedding` — property classes.
  - `opens_`: e.g., `opensRange`, `opensFunctor` — open-set-level constructions.
  - `app_`: e.g., `appIso`, `appLE`, `app_invApp` — sheaf-section-level maps.
  - `lift_`, `isoOf_`, `of_`, `to_`: e.g., `lift`, `isoOfRangeEq`, `ofRestrict`, `toScheme` — universal constructions or upgrades.

- **Suffixes**:
  - `_hom`, `_inv`, `_assoc`: for morphism components or associativity variants.
  - `_eq`, `__iff`, `_comp`, `_preimage`: logical or compositional properties.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` — simplification with definitional equalities and lemmas.
- `rw` / `erw` — rewriting using equalities (especially with `erw` for definitional rewriting).
- `exact`, `refine`, `apply` — constructing proofs term-by-term.
- `cases`, `obtain`, `let` — destructuring or introducing witnesses.
- `ext` / `ext1` — extensionality for functions/sets.
- `infer_instance` — typeclass inference.
- `aesop` — automated reasoning (less frequent here, but used in some proofs).
- `ring`, `linarith` — algebraic simplifications (rare, mostly in `CommRingCat` contexts).
- `dsimp`, `convert_to`, `congr` — definitional simplifications and congruence.

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *decomposition* pattern: reduce to known results in `LocallyRingedSpace`, `SheafedSpace`, or `PresheafedSpace`, then use `forget` functors to lift properties.
  - **Induction** is not used (no inductive types involved).
  - **Case analysis** on `IsOpenImmersion` instances via `H.base_open`, `H.c_iso`.
  - **Universal properties** (e.g., `lift`, `isoOfRangeEq`) are proven via:
    - `lift_fac`: shows the lift commutes.
    - `lift_uniq`: shows uniqueness using `cancel_mono`.
  - **Isomorphism proofs** often use `Scheme.Hom.ext'` (extensionality for scheme morphisms) or `Opens.ext` (extensionality for open sets).
  - **Stalk-based characterizations** rely on `of_stalk_iso`, `stalk_iso`, and `isIso_iff_stalk_iso`.

- **Common proof patterns**:
  - `rw [← forget_map_comp]; infer_instance` — lifting properties through forgetful functors.
  - `simp only [opensFunctor_map_homOfLE, ...]; rw [← Functor.map_comp]; rfl` — manipulating open-functor maps.
  - `apply Opens.ext; simp [Set.image_preimage_eq]` — proving equality of open sets.

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Geometry.RingedSpace.OpenImmersion` — foundational open immersion theory for ringed spaces.
- `Mathlib.AlgebraicGeometry.Scheme` — basic scheme theory.
- `Mathlib.CategoryTheory.Limits.Shapes.Pullback.CommSq` — pullback diagrams and commutative squares.
- `Mathlib.CategoryTheory.MorphismProperty.Limits` — properties of morphisms in limits.

**Scope**:
- Focuses on *open immersions* in the category of schemes (`Scheme.{u}`).
- Builds on `LocallyRingedSpace`, `SheafedSpace`, and `PresheafedSpace` to transfer properties.
- Emphasizes *functoriality* (`opensFunctor`, `lift`), *universal properties*, and *local-to-global* section isomorphisms (`appIso`, `ΓIso`).
- Includes technical lemmas for *pullbacks*, *restrictions*, and *stalks*.

---

This file formalizes a substantial portion of the categorical and sheaf-theoretic behavior of open immersions in algebraic geometry, with a focus on *effective reasoning* via typeclass inference and *explicit universe management* for performance.