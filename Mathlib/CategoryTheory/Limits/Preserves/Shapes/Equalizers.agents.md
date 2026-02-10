### Technical Brief: Preservation and Reflection of (Co)equalizers in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isLimitMapConeForkEquiv` | `IsLimit (G.mapCone (Fork.ofι h w)) ≃ IsLimit (Fork.ofι (G.map h) ...)` | Equivalence between limit status of a mapped cone and the cone of mapped morphisms. Enables commuting `Fork.ofι` with `Functor.mapCone`. |
| `isLimitForkMapOfIsLimit` | `[PreservesLimit (parallelPair f g) G] → IsLimit (Fork.ofι h w) → IsLimit (Fork.ofι (G.map h) ...)` | Shows that if `G` preserves equalizers, then the image of a limiting fork is limiting. |
| `isLimitOfIsLimitForkMap` | `[ReflectsLimit (parallelPair f g) G] → IsLimit (G.map fork) → IsLimit (original fork)` | Dual: if `G` reflects limits, then a limiting image implies the original is limiting. |
| `isLimitOfHasEqualizerOfPreservesLimit` | `[PreservesLimit (parallelPair f g) G] [HasEqualizer f g] → IsLimit (Fork.ofι (G.map (equalizer.ι f g)) ...)` | If `G` preserves equalizers and they exist, then the image of the equalizer fork is limiting. |
| `PreservesEqualizer.of_iso_comparison` | `IsIso (equalizerComparison f g G) → PreservesLimit (parallelPair f g) G` | If the comparison map is an iso, then `G` preserves the equalizer. |
| `PreservesEqualizer.iso` | `G.obj (equalizer f g) ≅ equalizer (G.map f) (G.map g)` | Constructed iso when `G` preserves equalizers; its hom is the comparison map. |
| `PreservesEqualizer.iso_hom` | `(PreservesEqualizer.iso G f g).hom = equalizerComparison f g G` | Identifies the iso’s hom as the comparison map. |
| `PreservesEqualizer.iso_inv_ι` | `(iso.inv) ≫ G.map (equalizer.ι f g) = equalizer.ι (G.map f) (G.map g)` | Commutativity of the iso with the equalizer legs. |
| `isColimitMapCoconeCoforkEquiv` | `IsColimit (G.mapCocone ...) ≃ IsColimit (Cofork.ofπ (G.map h) ...)` | Dual of `isLimitMapConeForkEquiv` for coequalizers. |
| `isColimitCoforkMapOfIsColimit` | `[PreservesColimit (parallelPair f g) G] → IsColimit (Cofork.ofπ h w) → IsColimit (Cofork.ofπ (G.map h) ...)` | Preservation of coequalizers via coforks. |
| `of_iso_comparison` | `IsIso (coequalizerComparison f g G) → PreservesColimit (parallelPair f g) G` | Dual of `PreservesEqualizer.of_iso_comparison`. |
| `PreservesCoequalizer.iso` | `coequalizer (G.map f) (G.map g) ≅ G.obj (coequalizer f g)` | Iso when `G` preserves coequalizers; hom is coequalizer comparison. |
| `PreservesCoequalizer.iso_hom` | `(PreservesCoequalizer.iso G f g).hom = coequalizerComparison f g G` | Hom of iso is comparison map. |
| `map_π_epi` | `Epi (G.map (coequalizer.π f g))` | `G` preserves epimorphic coequalizer legs. |
| `map_π_preserves_coequalizer_inv` | `G.map (coequalizer.π f g) ≫ iso.inv = coequalizer.ι (G.map f) (G.map g)` | Commutativity of coequalizer leg with iso inverse. |
| `preservesSplitCoequalizers` | `[HasSplitCoequalizer f g] → PreservesColimit (parallelPair f g) G` | Any functor preserves split coequalizers. |
| `preservesSplitEqualizers` | `[HasSplitEqualizer f g] → PreservesLimit (parallelPair f g) G` | Any functor preserves split equalizers. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLimit*`, `isColimit*`: Properties of (co)cones being (co)limits.
  - `Preserves*`, `Reflects*`: Functors preserving/reflectiong (co)limits.
  - `equalizerComparison`, `coequalizerComparison`: Standard comparison maps from universal property.
  - `map_*`: Morphisms induced by applying `G` to structure (e.g., `map_π`, `map_π_epi`).
  - `of_*`: Construction of (co)forks from data (e.g., `ofι`, `ofπ`).

- **Suffixes**:
  - `_equiv`: Equivalences (often between `IsLimit`/`IsColimit` types).
  - `_iso`: Isomorphisms constructed under preservation assumptions.
  - `_hom`, `_inv`: Hom/inv components of isos.
  - `_desc`, `_colimMap`: Universal properties (e.g., `equalizer.desc`, `colimMap`).

- **Pattern**:  
  `G.map (structure.ι/π) ≫ iso.inv = structure.ι/π (G.map f, G.map g)`  
  This pattern appears repeatedly for both equalizers and coequalizers.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp only [...]`, `simp [Fork.ι]`, `dsimp`: Simplification using definitional equalities and lemmas.
  - `rw [...]`: Rewriting using equalities (especially `Iso.hom_inv_id`, `Category.assoc`, `comp_id`).
  - `apply ...`: Applying lemmas or instances (e.g., `preservesLimit_of_preserves_limit_cone`).
  - `infer_instance`: Inferring `IsIso` or other typeclass instances.
  - `slice_lhs`: Advanced rewriting in subterms (used in `map_π_preserves_coequalizer_inv_colimMap_desc`).
  - `cancel_epi`, `epi_comp`: Tactics for epimorphism reasoning.

- **Category-theoretic automation**:
  - `aesop` is *not* used here — proofs are mostly manual and rely on explicit universal properties.
  - Heavy use of `Iso` and `Limit`/`Colimit` infrastructure from `Mathlib.CategoryTheory.Limits`.

---

#### **4. Proof Logic**

- **General Strategy**:
  1. **Reduce to (co)forks**: Use `Fork.ofι` / `Cofork.ofπ` to translate (co)equalizers into (co)forks.
  2. **Relate mapped cones**: Use `isLimitMapConeForkEquiv` / `isColimitMapCoconeCoforkEquiv` to commute `G.map` with cone/cocone construction.
  3. **Apply preservation/reflection assumptions**: Use `[PreservesLimit ...]` or `[ReflectsLimit ...]` to transfer (co)limit status.
  4. **Construct isos**: When preservation holds, use `IsLimit.conePointUniqueUpToIso` / `IsColimit.coconePointUniqueUpToIso` to get canonical isos.
  5. **Verify properties**: Prove `hom = comparison`, `inv ≫ G.map ι = ι`, etc., via `rw`, `simp`, and `Iso` lemmas.

- **Split (co)equalizers**:
  - Use `HasSplitCoequalizer.isSplitCoequalizer` to get a concrete coequalizer cone.
  - Show its image under `G` is also a coequalizer cone (via `map`), hence colimit is preserved.

- **Key logical flow**:
  ```
  PreservesLimit (parallelPair f g) G
    ⇨ IsLimit (G.map cone) ⇔ IsLimit (cone of G.map f, G.map g)
    ⇨ IsLimit (image of equalizer fork) ⇨ iso between G(obj) and equalizer(G(f), G(g))
  ```

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.SplitCoequalizer` | Provides split coequalizer data and their universal properties. |
| `Mathlib.CategoryTheory.Limits.Shapes.SplitEqualizer` | Provides split equalizer data and their universal properties. |
| `Mathlib.CategoryTheory.Limits.Preserves.Basic` | Core definitions: `PreservesLimit`, `ReflectsLimit`, `PreservesColimit`, `ReflectsColimit`. |

These imports define the foundational categorical structures used: (split) (co)equalizers, preservation/reflection, and their relation to (co)forks.

--- 

This file formalizes the equivalence between *preserving (co)equalizers* and *the comparison maps being isomorphisms*, with full coherence with universal properties. It is a key step toward understanding how functors interact with finite limits/colimits.