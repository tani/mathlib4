### Technical Metadata Brief: Closed Immersions of Schemes in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsClosedImmersion` | `class IsClosedImmersion (f : X ⟶ Y) : Prop` | Defines a scheme morphism `f` as a **closed immersion**: `f.base` is a closed embedding and all stalk maps `f.stalkMap x` are surjective. |
| `isClosedImmersion_iff` | `@IsClosedImmersion = topologically IsClosedEmbedding ⊓ stalkwise Surjective` | Characterizes `IsClosedImmersion` as the conjunction of topological and stalkwise conditions. |
| `iff_isPreimmersion` | `IsClosedImmersion f ↔ IsPreimmersion f ∧ IsClosed (range f.base)` | Equivalence between closed immersions and preimmersions with closed image. |
| `spec_of_surjective` | `∀ {R S} (f : R ⟶ S), Function.Surjective f → IsClosedImmersion (Spec.map f)` | Pullback of a surjective ring map induces a closed immersion on spectra. |
| `of_surjective_of_isAffine` | `∀ {X Y} [IsAffine X] [IsAffine Y] (f : X ⟶ Y), Function.Surjective (f.appTop) → IsClosedImmersion f` | Affine morphism surjective on global sections is a closed immersion. |
| `isAffine_surjective_of_isAffine` | `IsClosedImmersion f → IsAffine X ∧ Function.Surjective (f.appTop)` | For `f : X → Y` with `Y` affine and `f` a closed immersion, `X` is affine and `f` is surjective on global sections. |
| `isIso_of_injective_of_isAffine` | `IsClosedImmersion f → Function.Injective (f.appTop) → IsIso f` | Closed immersion with injective global sections map (and affine target) is an isomorphism. |
| `isIso_of_isClosedImmersion_of_surjective` | `[IsClosedImmersion f] → [Surjective f] → [IsReduced Y] → IsIso f` | Surjective closed immersion into a reduced scheme is an isomorphism. |
| `IsClosedImmersion.isStableUnderBaseChange` | `MorphismProperty.IsStableUnderBaseChange @IsClosedImmersion` | Closed immersions are stable under base change. |
| `IsClosedImmersion.isLocalAtTarget` | `IsLocalAtTarget @IsClosedImmersion` | Being a closed immersion is local on the target. |
| `HasAffineProperty` instance | `HasAffineProperty @IsClosedImmersion (fun X _ f ↦ IsAffine X ∧ Surjective (f.appTop))` | On morphisms with affine target, closed immersions are exactly those with affine source and surjective global sections. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate classes (e.g., `isClosedImmersion`, `isAffine`, `isIso`).
  - `of_`: Implication lemmas (e.g., `of_surjective_of_isAffine`, `of_comp_isClosedImmersion`).
  - `spec_of_`: Results about `Spec` constructions (e.g., `spec_of_surjective`, `spec_of_quotient_mk`).
  - `stalkMap_`: Stalk-level properties (e.g., `stalkMap_surjective`, `stalkMap_injective_of_...`).
  - `appTop`: Global sections map (`f.appTop : Γ(Y, ⊤) ⟶ Γ(X, ⊤)`).

- **Suffixes**:
  - `_iff`: Logical equivalences.
  - `_mem`: Membership in a property class (e.g., `comp_mem`, `id_mem`).
  - `_respectsIso`, `_stableUnder...`: Stability properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw [isClosedImmersion_iff]` | Rewriting definition. |
| `simp only [...]` | Simplifying with structured rewrites (e.g., `Scheme.comp_coeBase`, `RingHom.ker_eq_bot_iff_eq_zero`). |
| `exact`, `apply`, `intro` | Basic proof construction. |
| `have`, `suffices`, `obtain` | Intermediate claims and existential unpacking. |
| `convert`, `ext`, `rfl` | Equality reasoning and extensionality. |
| `aesop`, `tauto` | Automated reasoning for propositional logic and simple goals. |
| `ring`, `simp` | Commutative ring algebra simplifications. |
| `erw` | Eager rewriting (e.g., for germs or stalks). |
| `wlog` | Without loss of generality reductions (e.g., to affine target). |
| `infer_instance`, `infer_instance?` | Typeclass resolution. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-part strategy**: handle the topological condition (`base_closed`) and the algebraic condition (`surj_on_stalks`) separately.
  - **Affine reductions**: Many results reduce to the affine case via:
    - `IsLocalAtTarget.iff_of_iSup_eq_top` (locality on target),
    - `HasAffineProperty.iff_of_isAffine`,
    - `wlog hY : IsAffine Y` + covering by affine opens.
  - **Stalk-level arguments** often use:
    - `Scheme.stalkMap_comp`,
    - `RingHom.surjective_localRingHom_of_surjective`,
    - `ConcreteCategory.isIso_iff_bijective`.
  - **Surjectivity/injectivity** of global sections ↔ stalks ↔ isomorphism is a recurring theme.

- **Induction/Case Analysis**:
  - Rarely explicit induction; instead, structural decomposition via:
    - Open covers (`𝒰 : X.OpenCover`),
    - Finite subcovers (quasi-compactness),
    - Basic opens (`basicOpen s`).

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.AlgebraicGeometry.Morphisms.Affine`
- `Mathlib.AlgebraicGeometry.Morphisms.RingHomProperties`
- `Mathlib.AlgebraicGeometry.Morphisms.FiniteType`
- `Mathlib.AlgebraicGeometry.Morphisms.IsIso`
- `Mathlib.AlgebraicGeometry.ResidueField`
- `Mathlib.AlgebraicGeometry.Properties`

**Scope**:
- Formalizes **closed immersions** of schemes in the context of:
  - Morphism properties (`MorphismProperty`),
  - Locally ringed spaces (via `RingedSpace`/`LocallyRingedSpace`),
  - Affine schemes and global sections (`Γ`/`appTop`),
  - Stalks and residue fields.

**Notable Absences**:
- No direct reference to *locally ringed space* closed immersions (see TODO: `tag 01HJ` in Stacks Project).
- No explicit treatment of *ideal sheaves* or *quasi-coherent ideals* (future work).

--- 

Let me know if you'd like a diagram of the main implications or a summary of the `MorphismProperty` infrastructure used.