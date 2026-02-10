### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Scheme.IsGermInjectiveAt` | `class` | States that at a point `x : X`, there exists an affine open neighborhood `U ∋ x` such that the germ map `Γ(X, U) → 𝒪_{X,x}` is injective. |
| `Scheme.IsGermInjective` | `abbrev` | Global version: `∀ x : X, X.IsGermInjectiveAt x`. |
| `injective_germ_basicOpen` | `lemma` | Shows injectivity of germs descends to basic opens under affine assumptions. |
| `Scheme.exists_germ_injective` | `lemma` | Extracts the witness from `IsGermInjectiveAt`. |
| `Scheme.exists_le_and_germ_injective` | `lemma` | Refines an affine open neighborhood to lie inside a given open and retain injective germ. |
| `spread_out_unique_of_isGermInjective` | `lemma` | *Uniqueness*: If two morphisms agree on stalks and `X` is germ-injective at `x`, they agree on some neighborhood of `x`. |
| `spread_out_unique_of_isGermInjective'` | `lemma` | Variant using equality of morphisms `X.fromSpecStalk x ≫ f = ...`. |
| `exists_lift_of_germInjective_aux` | `lemma` | Technical lifting lemma: under finite type condition, lifts a ring map `A → 𝒪_{X,x}` to some `Γ(X, V)`. |
| `exists_lift_of_germInjective` | `lemma` | Refined lifting: gives `V ≤ U`, `φ' : A → Γ(X, V)`, and compatibility conditions. |
| `spread_out_of_isGermInjective` | `lemma` | *Existence*: Spreads out a morphism `Spec 𝒪_{X,x} → Spec 𝒪_{Y,y}` to an open neighborhood `U ⊆ X`, assuming `Y` locally of finite type over `S` and `X` germ-injective at `x`. |
| `spread_out_of_isGermInjective'` | `lemma` | Variant for a global morphism `Spec 𝒪_{X,x} → Y`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isGermInjectiveAt`: for properties at a point.
  - `spread_out_`: for results about extending morphisms from stalks.
  - `exists_lift_`: for lifting ring maps to sections.
- **Suffixes**:
  - `'` (prime): variant of previous lemma (e.g., `spread_out_unique_of_isGermInjective'`).
  - `_aux`: auxiliary lemmas used in proofs of main results.
- **Structure**:
  - `X.presheaf.germ U x hx`: germ at `x` along open `U`.
  - `X.fromSpecStalk x`: canonical morphism `Spec 𝒪_{X,x} → X`.
  - `X.stalkMap x`: induced map on stalks from a morphism `X → Y`.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw`: rewriting using equalities/definitions (especially `Scheme.Hom.appLE`, `germ_res_apply`, `stalkMap_germ`).
- `simp` / `simp only`: simplifying goals using structure sheaf and morphism properties.
- `obtain` / `cases`: destructing existential hypotheses.
- `refine`: constructing proofs with holes filled later.
- `ext`: extensionality for ring/alg homomorphisms.
- `apply`, `exact`, `swap`: control proof flow.
- `aesop`: for automated reasoning in algebraic geometry contexts (e.g., verifying membership, injectivity).
- `ring`: for commutative ring algebraic manipulations.
- `convert`: when goals are definitionally equal up to structure.

#### 4. **Proof Logic**

- **Inductive/constructive pattern**:
  - Start with stalk-level data (e.g., `φ : A → 𝒪_{X,x}`).
  - Use finite type assumptions to reduce to affine case.
  - Apply localization properties (e.g., `IsLocalization.mk'_surjective`, `mk'_eq_mul_mk'_one`).
  - Use germ injectivity to lift or compare morphisms.
  - Refine open neighborhoods via `exists_le_and_germ_injective`.
  - Use universal properties of stalks and sheaves (e.g., `germ_res_apply`, `stalkMap_germ`).
- **Common subproof structure**:
  - Reduce to affine opens.
  - Work in terms of rings/sections.
  - Use algebraic facts (e.g., finite type ⇒ finite presentation locally, annihilator arguments in Noetherian case).
  - Conclude via sheaf axioms or uniqueness of extensions.

#### 5. **Imports**

- `Mathlib.AlgebraicGeometry.Morphisms.FiniteType`: defines `LocallyOfFiniteType`, used in `spread_out_of_isGermInjective`.
- `Mathlib.AlgebraicGeometry.Noetherian`: used for `IsLocallyNoetherian` instance.
- `Mathlib.AlgebraicGeometry.Stalk`: stalks, germ maps, `fromSpecStalk`, `stalkMap`.
- `Mathlib.AlgebraicGeometry.Properties`: basic scheme properties, opens, affineness, etc.

---

This metadata reflects a formalization focused on *spreading out* morphisms from stalks to neighborhoods, leveraging germ injectivity and finite type conditions. The proofs rely heavily on localization theory, sheaf properties, and categorical reasoning in `Scheme`.