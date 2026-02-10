Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isLimitMapConeBinaryFanOfPreservesKernels` | `{X Y Z : C} → (π₁ : Z ⟶ X) (π₂ : Z ⟶ Y) → PreservesLimit (parallelPair π₂ 0) F → IsLimit (BinaryFan.mk π₁ π₂) → IsLimit (F.mapCone (BinaryFan.mk π₁ π₂))` | Shows that a kernel-preserving functor maps a limiting binary fan to a limiting binary fan. |
| `preservesBinaryProduct_of_preservesKernels` | `[∀ {X Y} (f : X ⟶ Y), PreservesLimit (parallelPair f 0) F] → {X Y : C} → PreservesLimit (pair X Y) F` | Proves preservation of binary products under kernel preservation. |
| `preservesBinaryProducts_of_preservesKernels` | `[∀ {X Y} (f : X ⟶ Y), PreservesLimit (parallelPair f 0) F] → PreservesLimitsOfShape (Discrete WalkingPair) F` | Extends previous result to all binary product diagrams. |
| `preservesEqualizer_of_preservesKernels` | `[∀ {X Y} (f : X ⟶ Y), PreservesLimit (parallelPair f 0) F] → {X Y : C} → (f g : X ⟶ Y) → PreservesLimit (parallelPair f g) F` | Shows preservation of equalizers using kernel preservation and additive structure. |
| `preservesEqualizers_of_preservesKernels` | `[∀ {X Y} (f : X ⟶ Y), PreservesLimit (parallelPair f 0) F] → PreservesLimitsOfShape WalkingParallelPair F` | Generalizes equalizer preservation to all parallel pairs. |
| `preservesFiniteLimits_of_preservesKernels` | `[HasFiniteProducts C] [HasEqualizers C] [HasZeroObject C] [HasZeroObject D] → [∀ {X Y}, PreservesLimit (parallelPair f 0) F] → PreservesFiniteLimits F` | Main theorem: kernel preservation implies preservation of all finite limits. |
| `isColimitMapCoconeBinaryCofanOfPreservesCokernels` | Dual of `isLimitMapConeBinaryFanOfPreservesKernels` for colimits. | Shows cokernel-preserving functors preserve limiting binary cofans. |
| `preservesCoproduct_of_preservesCokernels`, `preservesBinaryCoproducts_of_preservesCokernels` | Duals of product-preserving lemmas. | Establish preservation of binary coproducts under cokernel preservation. |
| `preservesCoequalizer_of_preservesCokernels`, `preservesCoequalizers_of_preservesCokernels` | Duals of equalizer lemmas. | Show preservation of coequalizers under cokernel preservation. |
| `preservesFiniteColimits_of_preservesCokernels` | Dual of `preservesFiniteLimits_of_preservesKernels`. | Main colimit version: cokernel preservation ⇒ finite colimit preservation. |

---

### 🔹 **Naming Conventions**

- **Prefixes:**
  - `preserves..._of_preserves...`: Indicates implication between preservation properties (e.g., `preservesEqualizers_of_preservesKernels`).
  - `isLimit...`, `isColimit...`: Constructing limits/colimits from assumptions.
- **Suffixes:**
  - `_of_preservesKernels`, `_of_preservesCokernels`: Specifies the assumed preservation property.
  - `_binary`, `_finite`: Indicates scope (binary vs finite).
  - `_of_iso_diagram`: Used when reindexing diagrams via isomorphism.
- **Helper names:**
  - `mapCone`, `mapCocone`, `mapConeFork`, `mapCoconeCofork`: Mapping cones/cocones under `F`.
  - `kernelForkOfFork`, `cokernelCoforkOfCofork`: Converting forks/coforks to kernel/cokernel forms.
  - `parallelPair f c`: Represents diagram `X ⇉ Y` with difference `f - c·id`.

---

### 🔹 **Tactic Stack**

Frequent tactics used in proofs:
- `intro`, `constructor`, `apply`, `exact`, `refine`: Basic proof construction.
- `let`, `have`, `set`: Introducing intermediate definitions/lemmas.
- `simpa`, `simp`, `dsimp`: Simplification using assumptions or definitions.
- `convert`, `apply IsLimit.ofIsoLimit`, `apply IsColimit.ofIsoColimit`: Leveraging isomorphism-invariance of (co)limits.
- `iso...Mk`, `iso...symm`: Constructing and manipulating isomorphisms.
- `ring`, `abmonoid`, `add_comm_group`: Reasoning in preadditive categories (abelian group structure on homs).
- `aesop`: For automated reasoning in preadditive contexts (especially for morphism equalities).
- `ext`: Extensionality for morphisms (e.g., `Fork.ext`, `Cofork.ext`, `BinaryFan.ext`).

---

### 🔹 **Proof Logic**

The logical flow follows a standard pattern in homological algebra:

1. **Reduction to simpler diagrams**:
   - Start with binary products (via binary fans and kernels).
   - Then move to equalizers (via kernel of `f - g`).
2. **Use of additive structure**:
   - Leverage `Preadditive C`, `PreservesZeroMorphisms F`, and derived facts like `additive_of_preservesBinaryBiproducts`.
   - Use subtraction (`f - g`) to encode equalizers/coequalizers via kernels/cokernels.
3. **Diagram isomorphisms**:
   - Use `diagramIsoPair`, `diagramIsoParallelPair`, etc., to reindex diagrams.
4. **Inductive composition**:
   - Build up finite limits from terminal object, binary products, and equalizers.
   - Similarly for finite colimits using initial object, binary coproducts, and coequalizers.
5. **Duality**:
   - Colimit results are proven analogously, often by dualizing the argument or reusing symmetric lemmas.

---

### 🔹 **Imports & Dependencies**

Core imports defining the scope:
- `Mathlib.CategoryTheory.Limits.Constructions.FiniteProductsOfBinaryProducts`: For finite product constructions.
- `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Kernels`: Kernel preservation and related lemmas.
- `Mathlib.CategoryTheory.Limits.Constructions.LimitsOfProductsAndEqualizers`: General finite limit construction.
- `Mathlib.CategoryTheory.Preadditive.AdditiveFunctor`: Additivity consequences of preserving biproducts.

Key underlying assumptions:
- `Preadditive C`, `Preadditive D`: Hom-sets are abelian groups, composition is bilinear.
- `PreservesZeroMorphisms F`: Ensures `F` respects zero morphisms (needed for additivity).
- `HasBinaryBiproducts C`: Ensures biproducts exist (used to derive additivity of `F`).
- `HasFiniteProducts C`, `HasEqualizers C`, `HasZeroObject C`, etc.: Structural assumptions on source/target categories.

---

Let me know if you'd like this exported as JSON or YAML for ingestion into an AI agent schema.