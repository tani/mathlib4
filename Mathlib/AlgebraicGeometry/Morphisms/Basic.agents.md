### Technical Brief: Properties of Morphisms Between Schemes in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `MorphismProperty Scheme` | `Scheme → Scheme → Prop` | Predicate on morphisms between schemes. |
| `IsLocalAtTarget P` | `Class` | `P` is *local at the target*: respects isomorphisms and holds for `f` iff it holds for all pullbacks along an open cover of the target. |
| `IsLocalAtSource P` | `Class` | `P` is *local at the source*: respects isomorphisms and holds for `f` iff it holds for all precompositions with open immersions from a cover of the source. |
| `AffineTargetMorphismProperty` | `∀ {X Y}, X ⟶ Y → [IsAffine Y] → Prop` | A predicate on morphisms *with affine target*. |
| `AffineTargetMorphismProperty.IsLocal P` | `Class` | `P` satisfies the affine communication lemma: respects isos, stable under basic open restrictions, and descends from spanning sets of global sections. |
| `targetAffineLocally P` | `MorphismProperty Scheme` | Extends `P` (on affine targets) to all morphisms: `P` holds on all affine opens of the target. |
| `HasAffineProperty P Q` | `Class` | `P` is local at the target and agrees with `Q` on affine targets: `P f ↔ ∀ U : Y.affineOpens, Q (f ∣_ U)`. |

**Key API Lemmas:**

| Lemma | Statement | Use |
|-------|-----------|-----|
| `IsLocalAtTarget.iff_of_openCover` | `P f ↔ ∀ i, P (𝒰.pullbackHom f i)` | Reduces verification of `P f` to an open cover of `Y`. |
| `IsLocalAtSource.iff_of_openCover` | `P f ↔ ∀ i, P (𝒰.map i ≫ f)` | Reduces verification of `P f` to an open cover of `X`. |
| `HasAffineProperty.iff_of_openCover` | `P f ↔ ∀ i, Q (𝒰.pullbackHom f i)` (for affine `𝒰`) | Links `P` and `Q` via affine open covers. |
| `HasAffineProperty.iff_of_isAffine` | `[IsAffine Y] → P f ↔ Q f` | On affine targets, `P` and `Q` coincide. |
| `HasAffineProperty.isStableUnderBaseChange` | If `Q` stable under affine base change ⇒ `P` stable under arbitrary base change | Enables descent of properties like properness, finiteness. |
| `IsLocalAtTarget.restrict` | `P f → P (f ∣_ U)` | Restriction to open subsets preserves `P`. |
| `IsLocalAtTarget.of_isPullback` | `P f → P f'` for pullback along open immersion | Stability under pullback (key for descent). |
| `IsLocalAtSource.comp` | `P f → P (i ≫ f)` for open immersion `i` | Precomposition with open immersions preserves `P`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes:**
  - `isLocalAtTarget`, `isLocalAtSource`: Class names for locality conditions.
  - `of_`, `restrict`, `comp`, `iff_of_`, `of_openCover`, `of_iSup_eq_top`: Standard API lemma naming.
  - `to_basicOpen`, `of_basicOpenCover`: For `AffineTargetMorphismProperty.IsLocal`.
  - `targetAffineLocally`: Extends affine-target property to all schemes.
  - `HasAffineProperty`: Relates global property `P` to affine-target `Q`.
  - `respectsIso`, `respectsLeft_isOpenImmersion`, `respectsRight`: For isomorphism stability.
  - `pullback_fst_of_right`, `isStableUnderBaseChange`: For base change stability.

- **Suffixes:**
  - `'` (e.g., `mk'`, `eq_targetAffineLocally'`): Variant or internal version.
  - `'_` (e.g., `of_isPullback'`): Often used for internal lemmas or variants.

---

#### **3. Tactic Stack**

- **Core Tactics:**
  - `rw`: Rewriting using equivalences, definitions, and lemmas (e.g., `iff_of_openCover`, `cancel_left_of_respectsIso`).
  - `simp` / `simp_rw`: Simplification with `Opens`, `affineCover`, `pullback`, `morphismRestrict`.
  - `exact`, `apply`: For direct proof steps.
  - `intro`, `introv`, `rintro`: Intro + destructuring.
  - `convert`, `congr_arg`: For equality chaining.
  - `ext`: Extensionality for functions/relations.
  - `induction ... using ...`: Structural induction (e.g., `of_affine_open_cover`).
  - `dsimp`, `unfold`: Unfolding definitions (e.g., `affineCover`, `pullbackHom`).
  - `infer_instance`: For typeclass resolution.
  - `obtain ⟨_, _, rfl⟩`: Destructuring existential/uniqueness.

- **Domain-Specific Tactics:**
  - `of_hasPullback`: Constructs pullbacks for open immersions.
  - `isPullback_morphismRestrict`: For pullback squares from restriction.
  - `morphismRestrictOpensRange`, `morphismRestrictRestrict`: For manipulating restrictions.

---

#### **4. Proof Logic**

- **Induction on affine open covers**:
  - Many proofs use `of_affine_open_cover` to reduce to three cases:
    1. `basicOpen`: Use `to_basicOpen`.
    2. `openCover`: Use `of_basicOpenCover`.
    3. `hU`: Use hypothesis directly.

- **Descent via open covers**:
  - `iff_of_openCover` / `iff_of_iSup_eq_top` are central: reduce global property to local checks.

- **Pullback stability**:
  - Prove `P f'` by factoring through a pullback square and using `of_isPullback` + `restrict`.

- **Equivalence chaining**:
  - Use `HasAffineProperty.iff` to switch between `P` and `Q`, especially when `Y` is affine.

- **Isomorphism cancellation**:
  - Repeated use of `cancel_left_of_respectsIso`, `cancel_right_of_respectsIso`, `arrow_mk_iso_iff`.

- **Cover refinement**:
  - Use `affineRefinement`, `pullbackCover`, `coverOfIsIso` to construct convenient affine covers.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.AffineScheme` | Affine schemes, global sections, basic opens. |
| `Mathlib.AlgebraicGeometry.Pullbacks` | Pullbacks of schemes, open immersions, fiber products. |
| `Mathlib.CategoryTheory.MorphismProperty.Limits` | Morphism properties, stability under limits/colimits, isomorphism respect. |
| `Mathlib.Data.List.TFAE` | Used for finite open covers / TFAE-style reasoning (e.g., spanning sets). |

---

### Summary

This file formalizes a **calculus of local properties of scheme morphisms**, with a focus on **descent along open covers** and **affine communication**. The core abstraction is `HasAffineProperty`, which connects a global property `P` to a simpler affine-target version `Q`. This enables powerful lemmas like stability under base change and local-to-global principles, foundational for moduli theory and stack-like reasoning in algebraic geometry.

The structure is highly modular: locality at source/target, affine properties, and base change stability are cleanly separated and composed via typeclasses. The naming and tactic stack reflect Lean’s emphasis on *reusability* and *modular proof engineering*.