Here's a structured technical metadata summary extracted from the provided Lean 4 file on **separated morphisms** in algebraic geometry:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsSeparated f` | `Prop` — class stating that the diagonal morphism `pullback.diagonal f` is a **closed immersion**. |
| `Scheme.IsSeparated X` | `Prop` — `X` is separated if the structure morphism `X ⟶ ⊤_ Scheme` is separated. |
| `diagonal_isClosedImmersion` | Instance field of `IsSeparated f`: witness that `pullback.diagonal f` is a closed immersion. |
| `isSeparated_eq_diagonal_isClosedImmersion` | Equality `@IsSeparated = MorphismProperty.diagonal @IsClosedImmersion`. |
| `isSeparated_of_injective` | If `f.base` is injective, then `f` is separated. |
| `IsSeparated.of_comp` | If `f ≫ g` is separated and `g` is separated, then `f` is separated. |
| `IsSeparated.comp_iff` | Under `IsSeparated g`, `IsSeparated (f ≫ g) ↔ IsSeparated f`. |
| `ext_of_isDominant_of_isSeparated` | Uniqueness of morphisms: if `X` reduced, `Y → Z` separated, and `f,g : X → Y` agree after precomposition with a dominant `ι : W → X`, then `f = g`. |
| `Scheme.ext_of_isDominant` | Special case of above for `Z = ⊤`. |
| `isClosedImmersion_equalizer_ι_left` | If `Y → S` is separated, then the left component of the equalizer of `f,g : X → Y` is a closed immersion. |
| `isSeparated_iff_isClosedImmersion_prod_lift` | `X` is separated iff `prod.lift (𝟙 X) (𝟙 X)` is a closed immersion. |
| `IsSeparated.hasAffineProperty` | `IsSeparated` has the affine property: `f` is separated iff pullbacks of affine opens are separated schemes. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isSeparated_...`: for properties/instances of `IsSeparated`.
  - `diagonal_...`: for constructions involving the diagonal morphism.
  - `ext_of_isDominant_...`: uniqueness lemmas using dominant morphisms.
  - `isClosedImmersion_...`: for closed immersion-related lemmas.

- **Suffixes**:
  - `_of_...`: e.g., `of_injective`, `of_comp`, `of_isDominant` — indicate derivation from a hypothesis.
  - `_iff_...`: e.g., `comp_iff`, `isSeparated_iff_isClosedImmersion_prod_lift` — equivalence statements.
  - `_restrict_...`: for restrictions of morphisms to open subsets.

- **Pattern**:
  - `morphismProperty_...`: e.g., `stableUnderComposition`, `isStableUnderBaseChange`, `isMultiplicative` — categorical stability properties.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (e.g., `isSeparated_iff`, `diagonal_isClosedImmersion`). |
| `simp` / `simp_rw` | Simplifying using definitional equalities and lemmas (e.g., `pullback.condition`, `terminal.comp_from`). |
| `infer_instance` | Synthesizing typeclass instances (e.g., `IsSeparated`, `IsClosedImmersion`). |
| `ext` | Extensionality for morphisms (especially in `Scheme`/`TopologicalSpace`). |
| `convert` | Matching goals up to definitional equality, often with `using 1`. |
| `wlog` | Without loss of generality (used in `of_isAffineHom`). |
| `dsimp`, `congr`, `apply pullback.hom_ext` | Homotopy-level reasoning in pullbacks. |
| `apply ... using ...` | Fine-grained control over proof search (e.g., `IsDominant.of_comp`). |
| `rwa` | Rewrite + assume goal is solvable (e.g., in `of_comp`). |

---

### **4. Proof Logic**

- **General Strategy**:
  - Most proofs reduce to verifying that a certain morphism is a **closed immersion**, often via:
    - Showing it's isomorphic to a known closed immersion.
    - Using stability properties (base change, composition).
    - Localizing on affine opens (`IsLocalAtTarget`, `hasAffineProperty`).
  - Injectivity of the underlying continuous map (`f.base`) is used to cover the diagonal with affine opens where the diagonal is affine (→ closed immersion).
  - Uniqueness lemmas (`ext_of_...`) use:
    - Equalizers in over-categories.
    - Dominant + closed immersion ⇒ isomorphism.
    - Reducedness to force equality from agreement on a dense open.

- **Inductive/Case Structure**:
  - Proofs often proceed by:
    1. Reducing to affine case (via `hasAffineProperty` or `of_isAffineHom`).
    2. Using concrete algebraic descriptions (e.g., `diagonal_Spec_map`).
    3. Applying categorical lemmas (e.g., `MorphismProperty.*` lemmas).
    4. Leveraging topological facts (e.g., dense image + closed range ⇒ surjective).

---

### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.AlgebraicGeometry.Morphisms.ClosedImmersion`
- `Mathlib.AlgebraicGeometry.PullbackCarrier`
- `Mathlib.CategoryTheory.Limits.Constructions.Over.Basic`
- `Mathlib.CategoryTheory.Limits.Constructions.Over.Products`
- `Mathlib.CategoryTheory.Limits.Shapes.Pullback.Equalizer`

**Scope**:
- Works in the category `Scheme.{u}` of schemes over a universe `u`.
- Uses `Over S` for relative schemes.
- Leverages `MorphismProperty` infrastructure for stability properties (base change, composition, etc.).
- Integrates with `OpenCover`, `affineCover`, and topological notions like `IsDominant`, `IsReduced`.

---

Let me know if you'd like a diagrammatic summary or a formalized "cheat sheet" of lemmas for automated reasoning.