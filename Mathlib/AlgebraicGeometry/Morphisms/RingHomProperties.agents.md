Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Properties of Scheme Morphisms Induced by Ring Homomorphism Properties**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `sourceAffineLocally P` | `AffineTargetMorphismProperty`: `P` holds on all `f.appLE ⊤ U le_top` for affine opens `U ⊆ X`. |
| `affineLocally P` | `MorphismProperty Scheme`: `P` holds on all `f.appLE U V e` for affine opens `U ⊆ Y`, `V ⊆ X`, `V ⊆ f⁻¹ᵁ U`. |
| `HasRingHomProperty P Q` | Type class asserting: <br>• `Q` is a *local ring hom property* (`RingHom.PropertyIsLocal Q`) <br>• `P = affineLocally Q` |
| `appLE` | `P f → Q (f.appLE U V e).hom`: If `P f`, then `Q` holds on all local ring maps between affines. |
| `appTop` | `P f → Q f.appTop.hom`: If `X`, `Y` affine, then `P f ↔ Q (f.appTop.hom)`. |
| `iff_appLE` | `P f ↔ ∀ U V e, Q (f.appLE U V e).hom`: Core equivalence for `HasRingHomProperty`. |
| `Spec_iff` | `P (Spec.map φ) ↔ Q φ`: Reduces `P` on affine schemes to `Q` on ring maps. |
| `of_source_openCover` | If `Y` affine and `𝒰` affine open cover of `X`, then `P f ↔ ∀ i, Q ((𝒰.map i ≫ f).appTop.hom)`. |
| `stableUnderComposition` | If `Q` stable under composition, then `P` is stable under composition. |
| `isStableUnderBaseChange` | If `Q` stable under base change, then `P` is stable under base change. |
| `respects_isOpenImmersion` | If `Q` stable under composition with localization away from source, then `P` respects open immersions (postcomposition). |
| `stalkwise` | `HasRingHomProperty (stalkwise P) (λ φ, ∀ p, P (localRingHom _ p φ))` under `RespectsIso P`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLocal_`, `isStableUnder_`, `containsIdentities`, `respectsIso`: Properties of ring homs (`RingHom.*`).
  - `affineLocally_`, `sourceAffineLocally_`, `targetAffineLocally_`: Scheme-level constructions.
  - `appLE`, `appTop`: Scheme morphism interface for ring maps on affines.
- **Suffixes**:
  - `_appTop`, `_appLE`: For morphism restrictions to affine opens.
  - `_of_`, `_iff_of_`: Implication or equivalence under assumptions (e.g., `of_isOpenImmersion`, `iff_of_isAffine`).
  - `_aux`: Internal lemmas (e.g., `respects_isOpenImmersion_aux`).
- **Pattern**:
  - `P` = scheme morphism property.
  - `Q` = ring hom property.
  - `H`, `hf`, `hg`, `hP`, `hQ`: Hypotheses on `P`, `Q`, or morphisms.

#### **3. Tactic Stack**

Frequently used tactics:
- `rw`, `erw`: Rewriting with equalities (especially `Scheme.appLE`, `CommRingCat.hom_comp`).
- `simp only`, `simp_rw`: Simplification with structured lemmas (e.g., `affineLocally_iff_affineOpens_le`).
- `exact`, `apply`, `refine`: Proof construction.
- `intro`, `introv`, `rintro`: Introduction of variables/hypotheses.
- `cases`, `induction`: Structural induction (e.g., on open covers).
- `convert`: For flexible unification (e.g., in `HasRingHomProperty.copy`).
- `wlog`: Without loss of generality (common for reducing to affine cases).
- `aesop`, `ring`: Not explicitly used here—lean on algebraic geometry-specific simplifiers.

#### **4. Proof Logic**

- **Reduction to Affine Case**:
  - Most proofs reduce to affine schemes via:
    - `IsLocalAtTarget` / `IsLocalAtSource` properties.
    - Open covers (`iSup_eq_top`, `affineOpenCover`, `openCoverOfISupEqTop`).
    - `iff_of_isAffine`, `iff_of_source_openCover`, `iff_of_iSup_eq_top`.
- **Inductive/Local-to-Global**:
  - Use `ofLocalizationSpan`, `localizationAwayPreserves`, `StableUnderCompositionWithLocalizationAwayTarget` to glue local data.
  - Basic opens (`basicOpen r`) used to refine covers and localize.
- **Equivalence Chains**:
  - Prove `P f ↔ Q (f.appLE U V e).hom` via `affineLocally_iff_affineOpens_le`.
  - Use `Spec_iff` to bridge scheme and ring hom levels.
- **Stability Properties**:
  - Base change stability via `pullback_fst_appTop`.
  - Composition stability via `stableUnderComposition` (uses `wlog` + localizations).
- **Open Immersion Handling**:
  - Use `respectsIso.cancel_right_isIso`, `isoOfRangeEq`, and localization iso lemmas.

#### **5. Imports & Scope**

- **Core Imports**:
  - `Mathlib.AlgebraicGeometry.Morphisms.Constructors`: Basic morphism constructions.
  - `Mathlib.RingTheory.LocalProperties.Basic`: Local properties of rings/ring maps.
  - `Mathlib.RingTheory.RingHom.Locally`: Local behavior of ring homs (e.g., `LocalizationAwayPreserves`, `OfLocalizationSpan`).
- **Scope**:
  - Focuses on *scheme morphism properties* induced by *ring hom properties*.
  - Central framework: `HasRingHomProperty P Q`.
  - Applications: Stability under base change, composition, open immersions; local criteria; stalkwise criteria.

---

This brief captures the formal structure, naming discipline, and proof methodology of the file—ideal for training a domain-specific Lean 4 AI agent in algebraic geometry.