### Technical Brief: Pullback and Pushout Preservation in Lean 4 (Category Theory Library)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PullbackCone.map` | `PullbackCone f g → PullbackCone (G.map f) (G.map g)` | Maps a pullback cone under a functor `G`. |
| `PullbackCone.isLimitMapConeEquiv` | `IsLimit (mapCone G c) ≃ IsLimit (c.map G)` | Equivalence between limitness of the mapped cone and the mapped pullback cone. |
| `isLimitPullbackConeMapOfIsLimit` | `[PreservesLimit (cospan f g) G] → IsLimit (PullbackCone.mk h k comm) → IsLimit (PullbackCone.mk (G.map h) (G.map k) _)` | Shows that if `G` preserves limits of cospan diagrams, then it maps limit pullback cones to limit pullback cones. |
| `isLimitOfIsLimitPullbackConeMap` | `[ReflectsLimit (cospan f g) G] → IsLimit (PullbackCone.mk (G.map h) (G.map k) _) → IsLimit (PullbackCone.mk h k comm)` | Dual: reflects limit pullback cones. |
| `PreservesPullback.iso` | `G.obj (pullback f g) ≅ pullback (G.map f) (G.map g)` | Isomorphism between image of pullback and pullback of images, assuming `G` preserves pullbacks. |
| `PreservesPullback.iso_hom` | `(PreservesPullback.iso G f g).hom = pullbackComparison G f g` | Identifies the comparison map as the isomorphism hom. |
| `PreservesPullback.iso_hom_fst/snd`, `iso_inv_fst/snd` | `hom ≫ fst = G.map fst`, etc. | Naturality squares for the comparison isomorphism. |
| `PreservesPullback.of_iso_comparison` | `IsIso (pullbackComparison G f g) → PreservesLimit (cospan f g) G` | **Key equivalence**: `G` preserves pullback of `(f,g)` iff `pullbackComparison G f g` is an iso. |
| `PreservesPushout.iso` | `pushout (G.map f) (G.map g) ≅ G.obj (pushout f g)` | Dual to `PreservesPullback.iso`. |
| `PreservesPushout.of_iso_comparison` | `IsIso (pushoutComparison G f g) → PreservesColimit (span f g) G` | Dual key equivalence for pushouts. |
| `PullbackCone.isLimitCoyonedaEquiv` | `IsLimit c ≃ ∀ X, IsLimit (c.map (coyoneda.obj X))` | Detects limit pullback cones via coyoneda embeddings. |
| `PushoutCocone.isColimitYonedaEquiv` | `IsColimit c ≃ ∀ X, IsLimit (c.op.map (yoneda.obj X))` | Detects colimit pushout cocones via yoneda embeddings. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLimit*`, `isColimit*`: Properties of (co)cones being (co)limit.
  - `PreservesPullback.*`, `PreservesPushout.*`: Properties of functors preserving (co)limits.
  - `has*`: Existence of (co)limits (e.g., `HasPullback`, `HasPushout`).
  - `map*`, `mapCone*`, `mapCocone*`: Functorial action on (co)cones.
  - `comparison*`: Comparison maps (e.g., `pullbackComparison`, `pushoutComparison`).

- **Suffixes**:
  - `Equiv`: Logical equivalences (`≃`).
  - `Iso`: Isomorphisms (`≅`).
  - `of_*`: Constructing properties from assumptions (e.g., `of_iso_comparison`, `of_hasPullbackOfPreservesLimit`).
  - `symmetry`: Symmetry lemmas (e.g., `preservesPullback_symmetry`, `preservesPushout_symmetry`).

- **Pattern**: `noun_verb_object` (e.g., `isLimitMapConePullbackConeEquiv`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `dsimp`, `rw`: Simplification and rewriting using definitional equalities and lemmas.
  - `infer_instance`: Typeclass resolution.
  - `refine`, `exact`: Goal-directed construction.
  - `cases`, `intro`, `rintro`: Proof term introduction and destructuring.
  - `delta`: Unfolding definitions (used in `@[reassoc]` lemmas).
  - `ext`: Extensionality for (co)cones and morphisms.

- **Category-theory-specific**:
  - `simp only [← G.map_comp, comm]`: Rewriting using functoriality and commutativity.
  - `apply IsLimit.ofIsoLimit`, `apply IsColimit.ofPointIso`: Leveraging universal properties.
  - `apply (IsLimit.postcomposeHomEquiv ...)`: Using equivalence of limit cones under diagram isomorphisms.
  - `infer_instance` + `apply`: For TC-heavy constructions (e.g., `preservesLimit_of_preserves_limit_cone`).

- **Notable absence**: No heavy use of `ring`, `linarith`, or `aesop`; focus is on categorical reasoning.

---

#### **4. Proof Logic**

- **General flow**:
  1. **Unfold definitions** (e.g., `map`, `pullbackComparison`, `isLimit`).
  2. **Use universal properties**:
     - `IsLimit.conePointUniqueUpToIso`, `IsColimit.coconePointUniqueUpToIso`.
     - `IsLimit.ofIsoLimit`, `IsColimit.ofPointIso`.
  3. **Leverage diagram isomorphisms**:
     - `diagramIsoCospan`, `diagramIsoSpan`, `isoWhiskerRight`.
     - `pullbackIsPullback`, `pushoutIsPushout`.
  4. **Apply equivalences**:
     - `isLimitMapConeEquiv`, `isColimitMapCoconeEquiv`, `isLimitCoyonedaEquiv`.
  5. **Symmetry arguments**:
     - Flip diagrams (`flip`, `isoMk`) and use symmetry of limits/colimits.

- **Key equivalence proof pattern**:
  ```lean
  -- To show: PreservesLimit (cospan f g) G ↔ IsIso (pullbackComparison G f g)
  -- (→): Use `PreservesPullback.iso_hom` + `infer_instance`.
  -- (←): Use `PreservesPullback.of_iso_comparison` with `IsLimit.ofPointIso`.
  ```

- **Induction**: Not used — all proofs are diagrammatic/universal property-based.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback` | Defines `HasPullback`, `pullback`, `pullback.fst/snd`, `pullbackComparison`. |
| `Mathlib.CategoryTheory.Limits.Preserves.Basic` | Defines `PreservesLimit`, `ReflectsLimit`, and basic preservation lemmas. |
| `Mathlib.CategoryTheory.Limits.Opposites` | Provides diagram opposites (`cospanOp`, `spanOp`) and duality tools. |
| `Mathlib.CategoryTheory.Limits.Yoneda` | Supplies `yoneda`, `coyoneda`, and their limit/colimit behavior. |

- **No external dependencies**: All logic is internal to `Mathlib.CategoryTheory`.

---

### Summary

This file formalizes the **equivalence between preservation of pullbacks/pushouts and the isomorphism property of comparison maps**, a foundational result in categorical limit theory. It uses:
- **Diagrammatic reasoning** (via cones/cocones),
- **Universal properties** (via `IsLimit`/`IsColimit`),
- **Duality** (via opposites and symmetry lemmas),
- **Yoneda/coYoneda embeddings** for detection lemmas.

The structure is highly modular, with symmetric treatments for pullbacks and pushouts, and leverages Lean’s typeclass inference for concise, reusable proofs.