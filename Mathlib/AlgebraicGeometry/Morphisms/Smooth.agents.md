Here is the **technical metadata extraction** for the provided Lean 4 file on *smooth morphisms of schemes*, formatted as a structured technical brief:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSmooth` | `class IsSmooth : Prop` | Defines a scheme morphism `f : X ⟶ Y` as *smooth* if locally (in affine neighborhoods) the induced ring map is `IsStandardSmooth.{0,0}`. |
| `IsSmoothOfRelativeDimension` | `class IsSmoothOfRelativeDimension : Prop` | Refines `IsSmooth` by fixing a *relative dimension* `n`; requires the local ring maps to be `IsStandardSmoothOfRelativeDimension n`. |
| `isSmooth_iff`, `isSmoothOfRelativeDimension_iff` | `@[mk_iff]` | Equivalence lemmas enabling rewriting between the scheme-theoretic property and its ring-theoretic local condition. |
| `instance HasRingHomProperty` | `HasRingHomProperty @IsSmooth (Locally IsStandardSmooth.{0, 0})` | Connects the scheme-level property `IsSmooth` to the ring-level property `Locally IsStandardSmooth.{0,0}`. |
| `instance MorphismProperty.IsStableUnderComposition` | `IsSmooth` stable under composition | Proves composition of smooth morphisms is smooth. |
| `instance isSmooth_comp` | `IsSmooth f → IsSmooth g → IsSmooth (f ≫ g)` | Explicit instance for composition stability. |
| `lemma isSmooth_isStableUnderBaseChange` | `MorphismProperty.IsStableUnderBaseChange @IsSmooth` | Smoothness is stable under base change. |
| `lemma IsSmoothOfRelativeDimension.isSmooth` | `IsSmoothOfRelativeDimension n f → IsSmooth f` | Forgets the relative dimension. |
| `instance isSmoothOfRelativeDimension_comp` | `IsSmoothOfRelativeDimension n f → IsSmoothOfRelativeDimension m g → IsSmoothOfRelativeDimension (n + m) (f ≫ g)` | Relative dimension adds under composition. |
| `instance [IsOpenImmersion f] : IsSmoothOfRelativeDimension 0 f` | Open immersions are smooth of relative dimension 0. |
| `instance [IsOpenImmersion f] : IsSmooth f` | Open immersions are smooth. |
| `instance [hf : IsSmooth f] : LocallyOfFinitePresentation f` | Smooth morphisms are locally of finite presentation. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `isSmooth_`, `isSmoothOfRelativeDimension_`: for lemmas/instances about smoothness.
  - `locally_`, `affineLocally_`: for properties defined via localizations or affine covers.
  - `stability_` or `isStableUnder_`: for closure properties (e.g., `isStableUnderBaseChange`, `stableUnderComposition`).

- **Suffixes**:
  - `_iff`: for equivalence lemmas (`mk_iff`-generated).
  - `_of_`: for implications or forgetful functors (e.g., `isSmoothOfRelativeDimension.isSmooth`).
  - `_comp`: for composition-related lemmas/instances.
  - `_localizationPreserves`, `_stableUnderCompositionWithLocalizationAway`: technical lemmas about behavior under localization.

- **Property naming**:
  - `IsStandardSmooth`, `IsStandardSmoothOfRelativeDimension`: ring-level properties.
  - `Locally IsStandardSmooth`: sheaf-theoretic localization of ring-level properties.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw [mk_iff]` | Rewriting definitions via `@[mk_iff]` lemmas. |
| `apply HasRingHomProperty.*` | Leveraging the `HasRingHomProperty` interface to reduce scheme-level proofs to ring-level ones. |
| `obtain ⟨…⟩ := …` | Destructuring existential quantifiers from local conditions. |
| `algebraize [f]` | Converting algebraic data over rings to scheme-level maps (used in `LocallyOfFinitePresentation` proof). |
| `le_trans`, `le_of_eq ▸ ?_` | Handling inclusions of open subsets and transport along equalities. |
| `exact`, `refine`, `apply` | Standard proof construction. |
| `ring`, `simp`, `aesop` | Likely used implicitly in ring-theoretic subgoals (not explicit here but standard in Mathlib). |
| `haveI : … := …` | Introducing instances (e.g., `Algebra.IsStandardSmooth`) for typeclass inference. |

---

### 🔹 **Proof Logic**

- **General Strategy**:
  - Reduce scheme-level properties to *affine-local* ring-theoretic ones via `HasRingHomProperty`.
  - Use `Locally P` to handle sheaf-like behavior (e.g., existence of affine neighborhoods).
  - Prove closure properties (composition, base change) by:
    1. Unfolding definitions to get local affine neighborhoods.
    2. Applying ring-level stability lemmas (e.g., `isStandardSmooth_stableUnderComposition`).
    3. Reassembling open subsets using `basicOpen`, `preimage_le_preimage`, and `appLE` morphism compatibility.

- **Inductive/Constructive Pattern**:
  - For `IsSmoothOfRelativeDimension_comp`, the proof constructs:
    - Intermediate opens `Y.basicOpen r`, `X.basicOpen s`.
    - Uses `exists_basicOpen_le_appLE_of_appLE_of_isAffine` to refine neighborhoods.
    - Applies ring-level composition stability (`isStandardSmoothOfRelativeDimension_stableUnderCompositionWithLocalizationAway`) twice.

- **Key Lemmas Used**:
  - `isStandardSmooth_localizationPreserves`, `isStandardSmooth_isStableUnderBaseChange`
  - `locally_*` lemmas for transferring stability to sheafifications.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.RingHomProperties` | Core interface for `HasRingHomProperty`, `MorphismProperty`, and ring-scheme translation. |
| `Mathlib.AlgebraicGeometry.Morphisms.FinitePresentation` | Defines `LocallyOfFinitePresentation`, used in final lemma. |
| `Mathlib.RingTheory.RingHom.StandardSmooth` | Defines `IsStandardSmooth`, `IsStandardSmoothOfRelativeDimension`, and their ring-level stability properties. |

---

### 🔹 **Notes on Design Choices**

- **Universe levels**: Both `IsStandardSmooth.{0,0}` and `IsStandardSmoothOfRelativeDimension.{0,0}` fix generator/relation universe levels to `0` to avoid technical overhead in scheme morphisms.
- **Why `IsStandardSmooth` over `Algebra.IsSmooth`?**  
  The file notes that `Algebra.IsSmooth`’s locality (`RingHom.PropertyIsLocal`) is not yet formalized, so `IsStandardSmooth` is used as a more tractable proxy.
- **Modularity**: The `HasRingHomProperty` interface allows uniform treatment of scheme properties induced by ring properties.

---

Let me know if you'd like a **diagrammatic summary** of the stability properties or a **proof sketch** of `isSmoothOfRelativeDimension_comp`.