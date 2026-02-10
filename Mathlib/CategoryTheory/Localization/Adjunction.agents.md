Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Localization of Adjunctions in Category Theory**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `ε` (`Localization.ε`) | `ε : 𝟭 D₁ ⟶ G' ⋙ F'` — *Auxiliary unit* for the induced adjunction on localized categories. Constructed via `liftNatTrans` using the original unit and commutativity isomorphisms. |
| `η` (`Localization.η`) | `η : F' ⋙ G' ⟶ 𝟭 D₂` — *Auxiliary counit* for the induced adjunction. Analogous construction using the original counit and commutativity isomorphisms. |
| `localization` | `G' ⊣ F'` — *Main theorem*: under the stated hypotheses (existence of localization functors and 2-commutative squares), the original adjunction `G ⊣ F` induces an adjunction `G' ⊣ F'` on the localized categories. Constructed via `Adjunction.mkOfUnitCounit`, verifying triangle identities using naturality and properties of localization. |
| `localization_unit_app`, `localization_counit_app` | Simplification lemmas for the unit and counit of `localization`, expressed in terms of the original unit/counit and the commutativity isomorphisms. |
| `isLocalization` | Lemma showing that if `F` is fully faithful, then `G` is a localization with respect to the pullback of isomorphisms along `G`. Uses equivalence of categories and localization universal property. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `ε`, `η`: Standard categorical notation for unit/counit of an adjunction.
  - `localization_`: Prefix for constructions/lemmas about the induced adjunction.
  - `isLocalization`: Predicate-style naming for localization properties.
- **Suffixes**:
  - `_app`: For components of natural transformations at objects.
  - `_hom`, `_inv`: For components of isomorphisms (e.g., `iso.hom`, `iso.inv`).
- **Functor/Transformation Names**:
  - `G`, `F`: Original functors.
  - `G'`, `F'`: Induced functors on localized categories.
  - `L₁`, `L₂`: Localization functors.
  - `W₁`, `W₂`: Morphism properties inverted by localization.

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `apply natTrans_ext`: To prove equality of natural transformations in a localization (using extensionality modulo `W`-equivalence).
- `rw`, `erw`: Rewriting with naturality, associators, and isomorphism laws.
- `simp only [...]`: Simplification with explicit lemmas (e.g., `ε_app`, `η_app`, `CatCommSq.iso...`).
- `dsimp`, `change`, `infer_instance`: For typeclass resolution and simplification.
- `apply iso.hom_inv_id_app`, `apply iso.inv_hom_id_app`: To reduce compositions involving inverses.
- `rw [assoc, id_comp, comp_id]`: Structural rewriting in categories.

#### **4. Proof Logic**

- **Structure of `localization` proof**:
  1. Define unit `ε` and counit `η` using localization lifting (via `liftNatTrans`).
  2. Prove triangle identities using:
     - Naturality of `ε`, `η`.
     - Triangle identities of original adjunction `adj`.
     - Properties of commutative squares (`CatCommSq.iso`).
     - Universal properties of localization (e.g., `Localization.fac`, `liftNatTrans_naturality`).
  3. Use `natTrans_ext` to reduce to object-level verification.
  4. Simplify using `ε_app`, `η_app`, and categorical identities.

- **Structure of `isLocalization` proof**:
  1. Define `W := G⁻¹(isos)` (pullback of isomorphisms).
  2. Show `G` inverts `W` trivially.
  3. Use full faithfulness of `F` to show unit is inverted by localization.
  4. Construct equivalence `W.Localization ≌ C₂` using `Localization.lift`.
  5. Apply `Functor.IsLocalization.of_equivalence_target`.

#### **5. Imports & Dependencies**

- **Core imports**:
  - `Mathlib.CategoryTheory.CatCommSq`: For 2-commutative squares and their isomorphisms.
  - `Mathlib.CategoryTheory.Localization.Predicate`: For localization with respect to morphism properties (`IsLocalization`, `liftNatTrans`, etc.).
  - `Mathlib.CategoryTheory.Adjunction.FullyFaithful`: For properties of fully faithful functors and adjunctions.

- **Key abstractions used**:
  - `Localization`: Universal construction inverting a class of morphisms.
  - `CatCommSq`: Commutative squares of functors with specified 2-isomorphism.
  - `Lifting`: Used to lift natural transformations through localization.
  - `Functor.IsLocalization`: Characterization of localization functors.

---

This file formalizes a foundational result in categorical localization theory: *adjunctions descend along localization under suitable commutativity conditions*. It demonstrates Lean’s capacity for high-level categorical reasoning with careful handling of coherence and universal properties.