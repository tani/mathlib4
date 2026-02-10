### Technical Metadata Brief: `SurjectiveOnStalks` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SurjectiveOnStalks` | `class SurjectiveOnStalks (f : X ⟶ Y) : Prop` | Defines morphisms of schemes where each stalk map `𝒪_{Y, f x} → 𝒪_{X, x}` is surjective. |
| `surj_on_stalks` | `∀ x, Function.Surjective (f.stalkMap x)` | The defining property of `SurjectiveOnStalks`. |
| `Scheme.Hom.stalkMap_surjective` | `[SurjectiveOnStalks f] → Function.Surjective (f.stalkMap x)` | Extracts surjectivity of stalk maps from the class. |
| `Spec_iff` | `SurjectiveOnStalks (Spec.map φ) ↔ RingHom.SurjectiveOnStalks φ.hom` | Relates scheme-level surjectivity on stalks to ring-level surjectivity on stalks. |
| `iff_of_isAffine` | `[IsAffine X] → [IsAffine Y] → SurjectiveOnStalks f ↔ RingHom.SurjectiveOnStalks (f.app ⊤).hom` | Affine case: reduces to ring homomorphism stalkwise surjectivity. |
| `of_comp` | `SurjectiveOnStalks (f ≫ g) → SurjectiveOnStalks f` | If a composite is surjective on stalks, so is the first map. |
| `stableUnderBaseChange` | `MorphismProperty.IsStableUnderBaseChange @SurjectiveOnStalks` | Stability under base change (pullback). |
| `isEmbedding_pullback` | `[SurjectiveOnStalks g] → IsEmbedding (L : X ×ₛ Y → X × Y)` | If `g : Y → S` is surjective on stalks, then the pullback `X ×ₛ Y` embeds into the topological product `X × Y`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `surj_on_stalks`: core property (used in `SurjectiveOnStalks.surj_on_stalks`).
  - `stalkMap`: refers to stalk maps (e.g., `f.stalkMap x`, `stalkMap_comp`).
  - `Spec_iff`: equivalence between scheme and ring-level properties.
  - `isEmbedding_...`: properties of embeddings (e.g., `isEmbedding_pullback`).
  - `stableUnder...`: stability under categorical constructions (`comp`, `baseChange`).
  - `iff_of_isAffine`: equivalence in affine case.

- **MorphismProperty instances**:
  - `IsMultiplicative`, `IsStableUnderComposition`, `IsStableUnderBaseChange`, `IsLocalAtTarget`, `IsLocalAtSource`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`stalkMap_comp`, `pullback.condition`, etc.). |
| `simp` / `simp only` | Simplifying goals using structure lemmas (e.g., `pullback.lift_fst`, `Iso.symm_hom`). |
| `exact` / `refine` | Constructing witnesses or applying lemmas (e.g., `exact (hf.surj_on_stalks x).comp ...`). |
| `convert` | Matching goals up to definitional equality (e.g., in `isEmbedding_pullback`). |
| `algebraize` | Translating between scheme and ring-level statements (used with `Spec` and `RingHom`). |
| `fun_prop` | Propagation of functorial properties (e.g., continuity, openness). |
| `ext` / `ext1` | Extensionality for functions/sets (e.g., proving equality of functions or subsets). |
| `apply ... using n` | Applying lemmas with controlled unification depth. |
| `erw` | Rewriting with definitional equality (e.g., for associativity of composition). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Reduction to affine case**: Use `Spec_iff`, `iff_of_isAffine`, and `algebraize` to reduce to ring-theoretic statements.
  - **Stability proofs**:
    - *Composition*: Use `stalkMap_comp` and composition of surjective functions.
    - *Base change*: Leverage `HasRingHomProperty` and `RingHom.IsStableUnderBaseChange`.
  - **Embedding proof (`isEmbedding_pullback`)**:
    1. Reduce to affine opens via open covers (`𝒰`, `𝒱`, `𝒲`).
    2. Prove embedding on each affine patch using `PrimeSpectrum.isEmbedding_tensorProductTo_of_surjectiveOnStalks`.
    3. Glue using `isEmbedding_of_iSup_eq_top_of_preimage_subset_range`.
    4. Use properties of pullbacks, homeomorphisms (`homeoOfIso`), and open immersions.

- **Inductive / Case Analysis**:
  - Not heavily used; instead, rely on categorical properties (e.g., universal properties of pullbacks, covers).

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.RingHomProperties` | Defines `RingHom.SurjectiveOnStalks`, `HasRingHomProperty`, stability properties. |
| `Mathlib.AlgebraicGeometry.PrimeSpectrum.TensorProduct` | Provides `PrimeSpectrum.isEmbedding_tensorProductTo_of_surjectiveOnStalks`, key for affine embedding. |
| `Mathlib.Topology.LocalAtTarget` | Supplies `stalkwiseIsLocalAtTarget_of_respectsIso`, used to show locality. |

**Core abstractions used**:
- `Scheme.Hom.stalkMap`
- `Pullback` (as a limit)
- `IsOpenImmersion`, `IsEmbedding`
- `MorphismProperty` hierarchy (`IsMultiplicative`, `IsStableUnderBaseChange`, etc.)
- `AffineOpenCover`, `openCoverOfBase`, `openCoverOfLeftRight`

---

### Summary

This file formalizes a robust class of morphisms (`SurjectiveOnStalks`) characterized by surjectivity of stalk maps, with strong categorical stability properties (composition, base change, locality). The key result is that such morphisms induce embeddings on pullbacks into topological products — a foundational fact for descent and fiber product geometry. The proofs rely heavily on reduction to affine patches, ring-theoretic analogues, and careful gluing via open covers.