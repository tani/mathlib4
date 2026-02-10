### Technical Metadata Brief: Preservation and Reflection of (Co)limits in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PreservesLimit K F` | `class Prop` | Functor `F` maps *every* limit cone over diagram `K` to a *nonempty* limit cone in codomain (i.e., `F` preserves limits of shape `K`). |
| `PreservesColimit K F` | `class Prop` | Dual: `F` maps every colimit cocone over `K` to a nonempty colimit cocone. |
| `PreservesLimitsOfShape J F` | `class Prop` | `F` preserves limits for *all* diagrams `K : J ⥤ C`. |
| `PreservesColimitsOfShape J F` | `class Prop` | Dual for colimits of shape `J`. |
| `PreservesLimitsOfSize.{w', w} F` | `class Prop` | `F` preserves limits for all diagrams `K : J ⥤ C` where `J : Type w` with `[Category.{w'} J]`. |
| `PreservesLimits F` | `abbrev` | `PreservesLimitsOfSize.{v₂, v₂} F` — i.e., preserves *small* limits. |
| `ReflectsLimit K F` | `class Prop` | If `F(mapCone c)` is a limit cone, then `c` was already a limit cone. |
| `ReflectsColimit K F` | `class Prop` | Dual for colimits. |
| `ReflectsLimitsOfSize F` / `ReflectsLimits F` | `class` / `abbrev` | Reflects all (small) limits. |
| `isLimitOfPreserves F h` | `def` | Extracts the limit structure on `F.mapCone c` from `PreservesLimit K F` and `IsLimit c`. |
| `isLimitOfReflects F h` | `def` | Extracts limit structure on `c` from `ReflectsLimit K F` and `IsLimit (F.mapCone c)`. |
| `preservesLimit_of_preserves_limit_cone` | `lemma` | If `F` preserves *one* limit cone for `K`, then it preserves *all* limit cones for `K`. |
| `preservesLimit_of_natIso` | `lemma` | Preservation is invariant under natural isomorphism of functors: `F ≅ G ⇒ PreservesLimit K F ↔ PreservesLimit K G`. |
| `preservesLimit_of_iso_diagram` | `lemma` | Preservation is invariant under isomorphism of diagrams: `K₁ ≅ K₂ ⇒ PreservesLimit K₁ F → PreservesLimit K₂ F`. |
| `comp_preservesLimit` | `instance` | Preservation is preserved under composition: `PreservesLimit K F → PreservesLimit (K ⋙ F) G → PreservesLimit K (F ⋙ G)`. |
| `preservesSmallestLimits_of_preservesLimits` | `lemma` | If `F` preserves limits at some universe level, then it preserves limits at universe `0`. |
| `id_preservesLimitsOfSize` | `instance` | Identity functor preserves all limits. |
| `preservesLimitsOfSize_of_univLE` | `lemma` | If universe bounds satisfy `UnivLE`, then preserving larger limits implies preserving smaller ones. |

> **Note**: All `Preserves*` and `Reflects*` classes are subsingleton (`Subsingleton` instances), ensuring uniqueness of proofs — a key design choice for typeclass inference.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `preserves*`: for *preservation* properties (`PreservesLimit`, `PreservesLimitsOfShape`, `PreservesLimitsOfSize`, etc.).
  - `reflects*`: for *reflection* properties (`ReflectsLimit`, `ReflectsLimitsOfShape`, etc.).
  - `isLimitOf*`, `isColimitOf*`: convenience functions extracting witness structures.
  - `of_*`: e.g., `preservesLimit_of_natIso`, `preservesLimit_of_iso_diagram` — indicate *transfer* or *derivation* lemmas.

- **Suffixes**:
  - `OfShape`: shape-specific preservation (e.g., `PreservesLimitsOfShape J F`).
  - `OfSize`: universe-polymorphic preservation (e.g., `PreservesLimitsOfSize.{w', w} F`).
  - `Smallest*`: minimal-universe variants (e.g., `preservesSmallestLimits_of_preservesLimits`).

- **Aliases & Deprecations**:
  - Old-style lemmas (e.g., `compPreservesLimit`) are marked `@[deprecated]` and redirect to new `instance`-based lemmas (e.g., `comp_preservesLimit`), reflecting Lean 4’s preference for instances over lemmas for typeclassable properties.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `constructor`, `intro`, `cases`, `rcases`, `exact`, `refine`, `congr!`
  - `simp`, `dsimp`, `simp_rw` (used in whiskering, naturality, and cone/cocone extension proofs)
  - `ext` (for extensionality of cones/cocones)
  - `apply`, `have`, `let` (for intermediate constructions)
  - `infer_instance` (heavily used in class definitions and proofs)
  - `rw`, `apply_fun`, `funext` (for naturality and component-wise reasoning)

- **Category-theoretic automation**:
  - `Functor.mapIso`, `Functor.mapComp`, `Functor.map_id` (via `simp` lemmas)
  - `Cones.ext`, `Cocones.ext` (extensionality for cones/cocones)
  - `IsLimit.uniqueUpToIso`, `IsColimit.uniqueUpToIso` (uniqueness up to iso)
  - `Iso.refl`, `Iso.symm`, `Iso.trans` (for iso-based transfers)

- **Universe handling**:
  - `Shrink.equivalence`, `ShrinkHoms.equivalence`, `e.invFunIdAssoc`, `e.symm` (for universe-shrinking arguments)

---

#### **4. Proof Logic**

- **General pattern**:
  - **Preservation**: Prove `PreservesLimit K F` by showing:  
    `∀ (c : Cone K), IsLimit c → Nonempty (IsLimit (F.mapCone c))`.  
    Typically done by constructing an explicit witness using `⟨...⟩` and `isLimitOfPreserves`.
  - **Reflection**: Prove `ReflectsLimit K F` by:  
    `∀ (c : Cone K), IsLimit (F.mapCone c) → Nonempty (IsLimit c)`.  
    Often uses `IsLimit.ofIsoLimit` or `IsLimit.uniqueUpToIso` to transfer structure via isos.

- **Common proof strategies**:
  - **Uniqueness via subsingleness**: Many proofs conclude with `congr!` after `intro ⟨a⟩ ⟨b⟩`.
  - **Transfer along isos**: Use `Iso.map`, `postcomposeHomEquiv`, `mapConeEquiv`, `whiskerEquivalence`.
  - **Universe shrinking**: Reduce to smaller universe via `preservesLimitsOfSize_of_univLE` + `Shrink.equivalence`.
  - **Composition**: Chain preservation via `isLimitOfPreserves G (isLimitOfPreserves F hc)`.
  - **Identity**: Directly construct lift/fac/uniq maps using the identity functor’s action.

- **Induction**: Not used — this is purely categorical reasoning (no structural induction on diagrams).

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.HasLimits
  ```
  - Provides foundational notions: `Cone`, `Cocone`, `IsLimit`, `IsColimit`, `HasLimit`, `HasColimit`, `limit`, `colimit`, `mapCone`, `mapCocone`, `whiskerEquivalence`, etc.

- **Implicit dependencies** (via `CategoryTheory`):
  - `Mathlib.CategoryTheory.Category.Basic` (categories, functors, natural transformations)
  - `Mathlib.CategoryTheory.Iso` (isos, `Iso.refl`, `Iso.symm`, etc.)
  - `Mathlib.CategoryTheory.Functor` (composition, identity functor `𝟭 C`)
  - `Mathlib.CategoryTheory.NaturalIsomorphism` (`F ≅ G`)
  - `Mathlib.CategoryTheory.Equivalence` (`J ≌ J'`)
  - `Mathlib.CategoryTheory.Limits.Shapes` (diagram shapes, cones/cocones)
  - `Mathlib.Logic.Subsingleton` (`Subsingleton` instances)
  - `Mathlib.SetTheory.Cardinal.UnivLE` (`UnivLE`, universe bounding)

---

### Summary

This module formalizes the *preservation* and *reflection* of (co)limits in category theory, with careful attention to:
- **Universe polymorphism** (via `OfSize` classes),
- **Invariance under isomorphism** (of diagrams, functors, shapes),
- **Typeclass-friendly design** (subsingleton instances, `instance`-based lemmas),
- **Modularity** (shape-specific, size-specific, and global notions).

It serves as a foundational layer for higher-level limit/colimit preservation results (e.g., continuity of Hom-functors, left exactness of left adjoints), and is consistent with modern Mathlib conventions.