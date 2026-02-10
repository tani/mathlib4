Here's a structured **technical metadata brief** extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AffineTargetMorphismProperty.diagonal` | `AffineTargetMorphismProperty → AffineTargetMorphismProperty` | Constructs a new affine-target morphism property by requiring the property to hold on all pullbacks along pairs of affine open immersions into the target. |
| `topologically` | `(∀ {α β} [TopologicalSpace α] [TopologicalSpace β] (f : α → β), Prop) → MorphismProperty Scheme` | Lifts a topological space map property to a scheme morphism property via the underlying continuous map. |
| `stalkwise` | `(∀ {R S} [CommRing R] [CommRing S] (f : R →+* S), Prop) → MorphismProperty Scheme` | Lifts a ring homomorphism property to a scheme morphism property via stalk maps. |
| `universally` | `MorphismProperty Scheme → MorphismProperty Scheme` | (Not defined in this snippet, but referenced; likely universal closure under base change.) |
| `HasAffineProperty.diagonal_of_openCover` | Theorem | Gives a criterion for `P.diagonal f` using an open cover of the target and pullbacks. |
| `HasAffineProperty.diagonal_iff` | Theorem | Equivalence between `Q.diagonal f` and `P.diagonal f` when `Y` is affine and `P, Q` are related via `HasAffineProperty`. |
| `topologically_isLocalAtTarget` | Lemma | Sufficient conditions for `topologically P` to be local at the target, in terms of `P` on topological spaces. |
| `stalkwise_respectsIso` | Lemma | If `P` respects ring isomorphisms, then `stalkwise P` respects scheme isomorphisms. |
| `stalkwiseIsLocalAtTarget_of_respectsIso` | Lemma | If `P` respects isomorphisms, then `stalkwise P` is local at the target. |
| `stalkwise_isLocalAtSource_of_respectsIso` | Lemma | If `P` respects isomorphisms, then `stalkwise P` is local at the source. |
| `stalkwise_Spec_map_iff` | Lemma | Characterizes `stalkwise P` for `Spec.map φ` in terms of localizations at prime ideals. |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `diagonal_`: Relates to diagonal properties (e.g., `diagonal`, `diagonal_of_openCover`, `diagonal_iff`).
  - `topologically_`: Pertains to topological lifting (e.g., `topologically`, `topologically_isStableUnderComposition`).
  - `stalkwise_`: Pertains to stalk-level lifting (e.g., `stalkwise`, `stalkwise_respectsIso`).
  - `universally_`: Pertains to universal properties (e.g., `universally_isLocalAtTarget`).
  - `of_`: Restriction or derivation (e.g., `of_isPullback`, `of_targetAffineLocally_of_isPullback`).
  - `cancel_left/right_of_respectsIso`: API for using isomorphism cancellation.
  - `arrow_mk_iso_iff`: Characterization of when a morphism satisfies a property via isomorphisms of arrow objects.

- **Suffixes**:
  - `_mk`: Construction of instances (e.g., `respectsIso_mk`).
  - `_iff`: Logical equivalences.
  - `_of_`: Implication or derivation from another property.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplification of morphism compositions, pullback diagrams, stalk maps. |
| `rw` | Rewriting using lemmas, definitions, or equivalences. |
| `convert` | Matching goals up to definitional equality or isomorphisms. |
| `ext1` / `ext` | Extensionality for functions/morphisms. |
| `infer_instance` | Automatically infers typeclass instances (e.g., `IsAffine`, `IsOpenImmersion`). |
| `dsimp` | Simplifies definitional equalities (e.g., in `𝒰`, `𝒱`). |
| `apply` / `exact` | Applying lemmas or hypotheses. |
| `have` / `obtain` | Introducing intermediate facts or witnesses. |
| `refine` / `refine'` | Partial proof construction with holes. |
| `convert` + `using 1` | Matching goals with specific arguments. |
| `rw [← ...]` | Rewriting backwards using isomorphisms or equivalences. |

---

### **4. Proof Logic**

- **Common proof patterns**:
  - **Induction / Cover-based arguments**: Proving properties over schemes by reducing to open covers (especially affine ones), e.g., `diagonal_of_openCover`, `topologically_isLocalAtTarget`.
  - **Pullback-based reduction**: Using universal properties of pullbacks to reduce to simpler cases (e.g., `diagonal_of_diagonal_of_isPullback`, `stalkwiseIsLocalAtTarget_of_respectsIso`).
  - **Isomorphism cancellation**: Leveraging `RespectsIso` to cancel isomorphisms in diagrams.
  - **Equivalence chaining**: Using `↔`-lemmas (e.g., `diagonal_iff`, `stalkwise_Spec_map_iff`) to switch between global and local conditions.
  - **Instance inference**: Heavy use of typeclass inference (`infer_instance`) to discharge `IsAffine`, `IsOpenImmersion`, etc.

- **Structure of typical proofs**:
  1. Introduce open covers or pullback diagrams.
  2. Use `simp` and `rw` to simplify morphism compositions.
  3. Apply isomorphism-based lemmas (`arrow_mk_iso_iff`, `cancel_left/right_of_respectsIso`).
  4. Use `convert` to match against hypotheses.
  5. Conclude via `apply`, `exact`, or `refine`.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.Basic` | Core definitions of scheme morphisms, open immersions, pullbacks, stalks. |
| `Mathlib.RingTheory.RingHomProperties` | Properties of ring homomorphisms, including `RespectsIso`, used for stalkwise properties. |

---

Let me know if you'd like a **dependency graph**, **proof automation summary**, or **formalization strategy guide** for extending this file.