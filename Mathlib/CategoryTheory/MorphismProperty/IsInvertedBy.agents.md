### Technical Brief: `MorphismProperty.IsInvertedBy` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsInvertedBy` | `P.IsInvertedBy F := ∀ ⦃X Y⦄ (f : X ⟶ Y), P f → IsIso (F.map f)` | Predicate stating that all morphisms in a morphism property `P` are mapped by functor `F` to isomorphisms. |
| `FunctorsInverting` | `W.FunctorsInverting D := FullSubcategory (fun F => W.IsInvertedBy F)` | Full subcategory of `C ⥤ D` consisting of functors that invert morphisms in `W`. |
| `of_le` | `P ≤ Q → Q.IsInvertedBy F → P.IsInvertedBy F` | Monotonicity: if `Q` is inverted, so is any subproperty `P ⊆ Q`. |
| `of_comp` | `W.IsInvertedBy F → W.IsInvertedBy (F ⋙ G)` | If `F` inverts `W`, then so does any composite `G ∘ F`. |
| `op`, `rightOp`, `leftOp`, `unop` | Various variants for op/right-op functors | Transfer inversion across functorial op constructions (e.g., `F.op`, `F.rightOp`). |
| `prod`, `pi` | Product / dependent product of inverted properties | Inversion preserved under product functors and π-type functors. |
| `IsInvertedBy.iff_of_iso` | `F₁ ≅ F₂ ⇒ W.IsInvertedBy F₁ ↔ W.IsInvertedBy F₂` | Inversion is invariant under natural isomorphism of functors. |
| `IsInvertedBy.isoClosure_iff` | `W.isoClosure.IsInvertedBy F ↔ W.IsInvertedBy F` | Inversion depends only on the iso-closure of `W`. |
| `IsInvertedBy.iff_comp` *(with `[G.ReflectsIsomorphisms]`)* | `W.IsInvertedBy (F ⋙ G) ↔ W.IsInvertedBy F` | If `G` reflects isomorphisms, then `F` inverts `W` iff `G ∘ F` does. |
| `IsInvertedBy.iff_le_inverseImage_isomorphisms` | `W.IsInvertedBy F ↔ W ≤ F⁻¹(isomorphisms D)` | Inversion ⇔ `W` factors through the inverse image of isomorphisms along `F`. |
| `IsInvertedBy.iff_map_le_isomorphisms` | `W.IsInvertedBy F ↔ W.map F ≤ isomorphisms D` | Inversion ⇔ image of `W` under `F` lies in isomorphisms. |
| `IsInvertedBy.map_iff` | `(W.map F).IsInvertedBy G ↔ W.IsInvertedBy (F ⋙ G)` | Relates mapping and composition for inversion. |

---

#### **2. Naming Conventions**

- **Predicate prefix**: `isIso_`, `isInvertedBy` — e.g., `IsInvertedBy`, `isIso`.
- **Property modifiers**:
  - `op`, `rightOp`, `leftOp`, `unop`: for operations on functors involving opposite categories.
  - `prod`, `pi`: for product/dependent product constructions.
- **Logical operations**:
  - `of_le`, `of_comp`: indicate derivation from a hypothesis (`le` for subproperty, `comp` for composition).
  - `iff_*`: equivalence lemmas (↔).
- **Category-theoretic operations**:
  - `inverseImage`, `map`: standard categorical operations on morphism properties.
  - `isoClosure`: closure under isomorphism.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `intro` / `intro h` | Introduce hypotheses and variables. |
| `haveI := ...` / `infer_instance` | Use typeclass inference to prove `IsIso` goals. |
| `dsimp` | Simplify definitions (especially for `F.map`, `op`, `unop`, etc.). |
| `rw [isIso_prod_iff]`, `rw [isIso_pi_iff]` | Rewrite using characterizations of isomorphisms in product/π categories. |
| `simp only [...]` | Simplify using lemmas like `NatIso.isIso_map_iff`, `Arrow.iso_w'`, etc. |
| `cases` / `subst` | For extensionality lemmas (`ext`, `hom_ext`). |
| `exact`, `infer_instance` | Final steps to close goals where `IsIso` is already available. |

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a standard pattern:
  1. **Unfold definition**: `dsimp [IsInvertedBy]` or `intro X Y f hf`.
  2. **Apply hypothesis**: Use `hF f hf` to get `IsIso (F.map f)`.
  3. **Transport via structure**: Use `infer_instance`, `isIso_of_reflects_iso`, or `isIso_prod_iff` to conclude.
- **Common patterns**:
  - **Induction on structure**: For `pi`, `prod`, `isoClosure`, proofs proceed by unpacking the structure (e.g., `hf.1`, `hf.2`, `hf j`).
  - **Equivalence via reflection**: For `iff_comp`, use `[G.ReflectsIsomorphisms]` to go back and forth between `F` and `G ∘ F`.
  - **Extensionality**: `ext` and `hom_ext` lemmas rely on extensionality of functors/natural transformations.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.CategoryTheory.Functor.ReflectsIso`: for `ReflectsIsomorphisms` typeclass.
  - `Mathlib.CategoryTheory.MorphismProperty.Basic`: defines `MorphismProperty`, `map`, `inverseImage`, `isoClosure`, etc.
- **Domain**: Localizations of categories (see `CategoryTheory.Localization` folder).
- **Universe polymorphism**: Uses `w v v' u u'` for universe levels (typical for category theory in Lean).

---

#### **6. Role in Larger Context**

- **Purpose**: Provides the foundational language to express *inversion of morphisms* by functors — essential for constructing **localizations** (e.g., derived categories, homotopy categories).
- **Key abstraction**: `FunctorsInverting W D` is the universal target category where `W` becomes invertible.
- **Future use**: This module feeds into:
  - Construction of localization functors.
  - Universal properties of localized categories.
  - Compatibility with limits/colimits, exactness, etc.

--- 

Let me know if you'd like a diagrammatic summary or a formalized "cheat sheet" for common lemmas.