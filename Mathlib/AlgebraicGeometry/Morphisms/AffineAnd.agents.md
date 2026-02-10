Here's a structured **technical metadata brief** extracted from the provided Lean 4 file:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `affineAnd Q` | `AffineTargetMorphismProperty` — defines a morphism property where the source is affine and the induced ring map on global sections satisfies `Q`. |
| `affineAnd_apply` | `affineAnd Q f ↔ IsAffine X ∧ Q (f.appTop).hom` — simplification lemma for the definition. |
| `affineAnd_respectsIso` | If `Q` respects isomorphisms, then `affineAnd Q` respects isomorphisms. |
| `affineAnd_isLocal` | If `Q` is local (w.r.t. localization), then `affineAnd Q` is local at the target. Requires `Q` to respect isos, preserve localization, and satisfy the "of localization span" condition. |
| `affineAnd_isStableUnderBaseChange` | Stability under base change of `affineAnd Q` follows from stability of `Q`. |
| `targetAffineLocally_affineAnd_iff` | Characterization of `targetAffineLocally (affineAnd Q)` in terms of openness and `Q` on all opens. |
| `targetAffineLocally_affineAnd_iff'` | Bundled version using `IsAffineHom`. |
| `targetAffineLocally_affineAnd_iff_affineLocally` | Equivalence between `targetAffineLocally (affineAnd Q)` and `IsAffineHom ∧ affineLocally Q`, assuming `Q` is local. |
| `targetAffineLocally_affineAnd_eq_affineLocally` | Equality of morphism properties: `targetAffineLocally (affineAnd Q) = IsAffineHom ⊓ affineLocally Q`, under locality of `Q`. |
| `targetAffineLocally_affineAnd_le` | Monotonicity: if `Q ≤ W`, then `targetAffineLocally (affineAnd Q) ≤ targetAffineLocally (affineAnd W)`. |
| `HasAffineProperty.affineAnd_isStableUnderComposition` | Stability under composition for properties affine-locally defined by `affineAnd Q`, assuming `Q` is stable under composition. |
| `HasAffineProperty.affineAnd_isStableUnderBaseChange` | Stability under base change for such properties. |
| `HasAffineProperty.affineAnd_containsIdentities` | Identities are included if `Q` contains identities and respects isos. |
| `HasAffineProperty.affineAnd_iff` | Universal property: `P` is affine-locally `affineAnd Q` iff `P f ↔ IsAffineHom f ∧ ∀ U, IsAffineOpen U → Q (f.app U).hom`. |
| `HasAffineProperty.affineAnd_le_isAffineHom` | Any property affine-locally defined by `affineAnd Q` is ≤ `IsAffineHom`. |
| `HasAffineProperty.affineAnd_eq_of_propertyIsLocal` | If `P` is affine-locally `affineAnd Q` and `P'` has ring hom property `Q`, then `P = IsAffineHom ⊓ P'`. |
| `HasAffineProperty.affineAnd_le_affineAnd` | Monotonicity across different `Q`s: if `Q ≤ Q'`, then `P ≤ P'`. |

---

### 📝 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `affineAnd_`: prefix for definitions/lemmas about the `affineAnd` construction.
  - `targetAffineLocally_`: prefix for lemmas about the `targetAffineLocally` operator applied to `affineAnd`.
  - `HasAffineProperty.affineAnd_`: prefix for lemmas about properties *affine-locally defined* via `affineAnd`.
  - `isAffine`, `IsAffine`, `IsAffineOpen`, `IsAffineHom`: standard naming for affine-related notions.
  - `RingHom.RespectsIso`, `LocalizationPreserves`, `OfLocalizationSpan`, `StableUnderComposition`, etc.: standard `RingHom`-property naming.

---

### 🛠️ **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: for simplifying definitions and rewriting using lemmas like `affineAnd_apply`, `morphismRestrict_appTop`, etc.
- `rw`: rewriting using ring hom properties and localization lemmas.
- `aesop`: for automated reasoning in simple goals (e.g., `aesop` in `targetAffineLocally_affineAnd_iff'`).
- `intro`, `exact`, `apply`, `constructor`: standard intro/apply patterns.
- `haveI`, `have`: for introducing instances or intermediate facts.
- `dsimp`, `show`: for simplifying or fixing motive issues in rewriting.
- `wlog`: "without loss of generality" for reducing to the affine case.
- `ext`: extensionality for proving equality of morphism properties.

---

### 🧠 **Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a **case split on affineness of the target** (`wlog hY : IsAffine Y`), reducing to the affine case where computations are explicit.
  - In the affine case, proofs reduce to ring-theoretic properties of `Q` (e.g., localization, stability under pullback).
  - Use of `targetAffineLocally` and `HasAffineProperty` often involves unfolding definitions and applying localization lemmas.
  - For localization-based properties (`affineAnd_isLocal`), proofs rely on:
    - `isLocalization_basicOpen`
    - `hQl` (localization preservation)
    - `hQs` (span condition)
  - Stability under composition/base change uses pullback/pushforward compatibility of global sections.

---

### 📦 **Imports & Scope**

- **Core imports**:
  - `Mathlib.AlgebraicGeometry.Morphisms.Affine`
  - `Mathlib.AlgebraicGeometry.Morphisms.RingHomProperties`

- **Domain scope**:
  - Algebraic geometry over schemes.
  - Morphism properties defined via ring homomorphism properties.
  - Focus on *affine morphisms*, *finite morphisms*, *closed immersions* as examples.

- **Universe polymorphism**:
  - Uses `universe v u` for type universes.
  - All constructions are universe-polymorphic.

---

Let me know if you'd like a **diagrammatic summary** or a **Lean tactic cheat sheet** for this file.