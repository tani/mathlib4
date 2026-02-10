### Technical Brief: Morphism Property Stability and Limits in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsStableUnderBaseChange` | `class (P : MorphismProperty C) : Prop` | Captures that `P` is preserved under pullbacks: if the right leg of a pullback square satisfies `P`, then so does the left leg. |
| `IsStableUnderCobaseChange` | `class (P : MorphismProperty C) : Prop` | Dually: `P` preserved under pushouts — if the left leg satisfies `P`, then so does the right. |
| `universally P` | `MorphismProperty C` | `P` holds *universally* for `f : X → Y` if for **all** base changes `X' → Y'` of `f`, `P` holds on the new map. |
| `diagonal P` | `MorphismProperty C` | `P.diagonal f` iff `P` holds on the diagonal map `X → X ×_Y X`. Used to encode properties like monomorphisms (`diagonal isomorphisms = monomorphisms`). |
| `IsStableUnderLimitsOfShape J` | `Prop` | `P` stable under limits of shape `J`: if `X₁, X₂ : J → C` have limits and `f : X₁ ⇒ X₂` satisfies `P` pointwise, then `lim f` satisfies `P`. |
| `IsStableUnderProductsOfShape J` | `abbrev` | Special case of `IsStableUnderLimitsOfShape` for discrete diagrams (i.e., products over `J`). |
| `IsStableUnderFiniteProducts` | `class` | `P` stable under finite products (i.e., products over finite index types). |
| `HasOfPostcompProperty Q P` | *Not defined here, but used* | `P` has the *of-postcomp property* w.r.t. `Q`: if `g` is a base change of `f` and `Q(g)` holds, then `P(f)` holds. |
| `pullback_fst`, `pullback_snd` | `theorem` | Special cases of base change stability: pullback projections inherit `P` from the other leg. |
| `pushout_inl`, `pushout_inr` | `theorem` | Dually for pushouts. |
| `diagonal_isomorphisms` | `lemma` | `(isomorphisms C).diagonal = monomorphisms C`. |
| `universally_eq_iff` | `theorem` | `P.universally = P ↔ P.IsStableUnderBaseChange`. So `P` is stable under base change iff it equals its universal closure. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isStableUnder...`: e.g., `IsStableUnderBaseChange`, `IsStableUnderComposition`, `IsStableUnderProductsOfShape`.
  - `universally`: for universal closure (e.g., `P.universally`).
  - `diagonal`: for diagonal-based refinements (e.g., `P.diagonal`).
- **Suffixes**:
  - `_of_shape`: e.g., `IsStableUnderLimitsOfShape`, `IsStableUnderProductsOfShape`.
  - `_finite`: e.g., `IsStableUnderFiniteProducts`.
- **Helper lemmas**:
  - `pullback_*`, `pushout_*`, `baseChange_*`, `lim_*`, `colim_*`: denote derived stability results for specific constructions.
  - `mk'`: alternative constructors (often assuming `RespectsIso`).
- **Instance names**:
  - `isomorphisms`, `monomorphisms`, `epimorphisms`: standard morphism classes are stable under base/cobase change.
  - `op`, `unop`: relate base/cobase stability via opposite categories.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp` / `simp_rw`: for simplifying hom equations, especially using `Category.assoc`, `pullback.condition`, etc.
- `rw [← ...]`: to rewrite using isomorphism inverses or naturality.
- `ext`: for extensionality in pullback/pushout cones (e.g., `PullbackCone.IsLimit.hom_ext`, `PushoutCocone.IsColimit.hom_ext`).
- `dsimp`, `simp only [...]`: for careful simplification in nested hom expressions.
- `apply ... <;> ...`: chaining tactics (e.g., `apply P.comp_mem <;> rw [...]`).
- `have / suffices`: intermediate lemmas (e.g., constructing isomorphisms between composite maps).
- `exact`, `refine`: for constructing morphisms via universal properties (e.g., `lim.map`, `pullback.lift`).
- `isoMk`, `arrow_mk_iso_iff`: for proving isomorphisms in arrow categories.

No heavy automation (e.g., `aesop`, `linarith`) is used — proofs are mostly structural and diagrammatic.

---

#### **4. Proof Logic**

- **Base/cobase change stability**:
  - Proven via universal properties: given a pullback/pushout square, use the defining property (`of_isPullback`, `of_isPushout`) to lift `P` along the square.
  - For standard classes (`isomorphisms`, `monomorphisms`, `epimorphisms`), proofs use cancellation laws (`cancel_mono`, `cancel_epi`) and uniqueness of mediating arrows.
- **Diagonal properties**:
  - Use `diagonal_iff` to reduce to `P(pullback.diagonal f)`.
  - Stability under composition/base change for `P.diagonal` uses naturality of diagonals and stability of `P`.
- **Universal closure**:
  - `universally P` is defined as a *universal quantification* over all base changes.
  - Proofs often involve pasting pullbacks (`paste_horiz`, `paste_vert`) and using `IsPullback.of_horiz_isIso`.
  - Key equivalence: `P.universally = P ↔ P.IsStableUnderBaseChange`.
- **Limits/colimits stability**:
  - Prove via lifting/descending maps: e.g., `lim.map f` is shown to satisfy `P` using `hW` and `W.functorCategory`.
  - For products/coproducts, reduce to discrete diagrams and use `Pi.map`, `Sigma.map`.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback.CommSq`: pullback squares and commutative diagrams.
  - `Mathlib.CategoryTheory.Limits.Shapes.Diagonal`: diagonal morphisms and their properties.
  - `Mathlib.CategoryTheory.MorphismProperty.Composition`: composition-closed morphism properties.

- **Scope**:
  - Works in a general category `C` (locally small, universe-polymorphic).
  - Assumes `HasPullbacks`, `HasPushouts`, `HasLimitsOfShape`, etc., when needed.
  - Focuses on *morphism properties* (predicates on arrows), not objects.

- **Key abstractions**:
  - `MorphismProperty C`: type of properties of morphisms in `C`.
  - `RespectsIso P`: `P` is invariant under isomorphisms.
  - `functorCategory J C`: used for stability under limits/colimits of diagrams.

---

This file formalizes foundational stability properties of morphism classes in category theory, especially relevant for descent theory, factorization systems, and homotopical algebra. It provides a reusable framework for verifying that properties like monomorphisms, isomorphisms, or fibrations behave well under limits/colimits and base change.