### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `whiskerVertical` | `(α : L ⟶ L') → (β : R' ⟶ R) → TwoSquare T L' R' B` | Constructs a new 2-square from an existing one by pre- and post-composing with natural transformations. |
| `whiskerVertical_iff` | `(α : L ≅ L') → (β : R ≅ R') → ((w.whiskerVertical α.hom β.inv).GuitartExact ↔ w.GuitartExact)` | Shows that Guitart exactness is preserved under isomorphic replacement of left/right functors. |
| `whiskerVertical` (instance) | `[IsIso α] → [IsIso β] → (w.whiskerVertical α β).GuitartExact` | Instantiates Guitart exactness for whiskering along isomorphisms. |
| `vComp` | `TwoSquare H₁ L₁ R₁ H₂ → TwoSquare H₂ L₂ R₂ H₃ → TwoSquare H₁ (L₁ ⋙ L₂) (R₁ ⋙ R₂) H₃` | Vertical composition of two 2-squares (via associators and whiskering). |
| `structuredArrowDownwardsComp` | `w.structuredArrowDownwards Y₁ ⋙ w'.structuredArrowDownwards (R₁.obj Y₁) ≅ (w.vComp w').structuredArrowDownwards Y₁` | Canonical isomorphism between structured arrow categories induced by vertical composition. |
| `vComp'` | `(eL : L₁ ⋙ L₂ ≅ L₁₂) → (eR : R₁ ⋙ R₂ ≅ R₁₂) → TwoSquare H₁ L₁₂ R₁₂ H₃` | Variant of vertical composition allowing replacement of composites by isomorphic functors. |
| `vComp` (instance) | `[w.GuitartExact] → [w'.GuitartExact] → (w.vComp w').GuitartExact` | Proves vertical composition preserves Guitart exactness. |
| `vComp'` (instance) | `[GuitartExact w] → [GuitartExact w'] → (w.vComp' w' eL eR).GuitartExact` | Same as above, for the variant `vComp'`. |
| `vComp_iff_of_equivalences` | `(eL : C₂ ≌ C₃) → (eR : D₂ ≌ D₃) → (w' : H₂ ⋙ eR.functor ≅ eL.functor ⋙ H₃) → ((w.vComp w'.hom).GuitartExact ↔ w.GuitartExact)` | Shows that vertical composition with an equivalence-induced square preserves/exchanges Guitart exactness. |
| `vComp'_iff_of_equivalences` | Variant of previous with `vComp'`. | Same as above, for `vComp'`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `whiskerVertical`: indicates whiskering (horizontal composition in 2-category sense) along vertical arrows (natural transformations).
  - `vComp`, `vComp'`: vertical composition; `'` variant allows isomorphisms on composites.
- **Suffixes**:
  - `_iff`: equivalence (↔) statements.
  - `_iff_of_equivalences`: equivalence under categorical equivalences.
- **Suffixes for isomorphisms**:
  - `α.hom`, `β.inv`: standard notation for components of an isomorphism.
  - `asIso α`: constructs an isomorphism from an isomorphism witness.
- **Structured arrow constructions**:
  - `structuredArrowDownwards`, `structuredArrowDownwardsComp`: refer to functors from base objects to comma/structured arrow categories.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting using equalities/isomorphisms (especially naturality, associativity, unit/counit laws). |
| `simp only [...]` | Simplification with precise lemmas (e.g., `Functor.comp_obj`, ` whiskerLeft_app`, `Iso.hom_inv_id_app`, etc.). |
| `erw` | Rewriting with definitional equality (used for subtle naturality adjustments). |
| `ext` | Extensionality for natural transformations or functors. |
| `dsimp` | Definitional simplification (often before `simp`). |
| `infer_instance` | Solving typeclass goals (e.g., `GuitartExact`, `IsIso`). |
| `rw [NatTrans.naturality_assoc]` | Naturality up to associators. |
| `simp?` | Suggests simplifier lemmas (commented in proof). |
| `letI` | Introduces instances (e.g., `CatCommSq`) for later use. |

---

#### 4. **Proof Logic**

- **General Strategy**:
  - Prove properties of `TwoSquare` by reducing to properties of structured arrow categories.
  - Use `guitartExact_iff_initial` to reduce Guitart exactness to initiality of a certain functor.
  - Show equivalence of structured arrow functors via natural isomorphisms (`NatIso.ofComponents`), often using component-wise isomorphisms (`StructuredArrow.isoMk`).
  - Leverage categorical identities: associators, unitors, whiskering laws, naturality, and triangle identities for adjunctions/equivalences.

- **Typical Flow**:
  1. Unfold definitions (`vComp`, `whiskerVertical`, etc.).
  2. Construct natural isomorphisms between structured arrow functors.
  3. Use `Functor.initial_natIso_iff` to transfer initiality across isomorphisms.
  4. For `↔` statements, prove both directions using the inverse direction of the isomorphism or whiskering.

- **Special Cases**:
  - When using equivalences (`eL : C₂ ≌ C₃`, `eR : D₂ ≌ D₃`), the proof constructs auxiliary squares (`w''`) and uses unit/counit modifications to relate composites back to original functors.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.CatCommSq` | Provides `CatCommSq` and related constructions (commutative squares, their inverses, equivalences). Used in `vComp_iff_of_equivalences`. |
| `Mathlib.CategoryTheory.GuitartExact.Basic` | Defines `TwoSquare`, `GuitartExact`, and basic properties (e.g., `guitartExact_iff_initial`). Core module for the formalization. |

---

### Summary

This file formalizes stability of **Guitart exactness** under **vertical composition** and **whiskering** in the 2-categorical setting of categories and functors. It leverages:
- Natural isomorphisms between structured arrow functors,
- Isomorphism-invariance of initiality,
- Categorical equivalences and their unit/counit data.

The proofs are highly structured, relying on `simp`-friendly definitions (`[simps!]`), and heavily use the interplay between whiskering, associators, and isomorphisms.