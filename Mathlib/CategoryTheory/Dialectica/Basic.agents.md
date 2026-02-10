### Technical Brief: Dialectica Category (`Dial C`) in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Dial C` | `Type (u+1)` (via `structure`) | Objects of the Dialectica category: triples `⟨U, X, α⟩`, where `U, X : C`, and `α : Subobject (U ⨯ X)` |
| `Dial.Hom X Y` | `structure` | Morphisms `⟨f, F⟩` from `X` to `Y`, where `f : X.src ⟶ Y.src`, `F : X.src ⨯ Y.tgt ⟶ X.tgt`, satisfying a subobject inclusion condition |
| `Dial.Hom.le` | `Subobject.pullback ... ⋙ X.rel ≤ Subobject.pullback ... ⋙ Y.rel` | Encodes the logical implication `{(u, y) | α(u, F(u, y))} ⊆ {(u, y) | β(f(u), y)}` via pullbacks of subobjects |
| `Dial.comp_le_lemma` | `theorem` | Verifies that the composition of morphisms respects the subobject inclusion condition |
| `Dial.instance : Category (Dial C)` | `instance` | Constructs the categorical structure on `Dial C`: identity, composition, and coherence laws |
| `Dial.isoMk` | `def` | Constructs an isomorphism in `Dial C` from isomorphisms `e₁ : X.src ≅ Y.src`, `e₂ : X.tgt ≅ Y.tgt` satisfying a compatibility condition on relations |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Dial.`: Namespace for all definitions related to the Dialectica category.
  - `Hom.`: Prefix for morphism components (`f`, `F`, `le`).
- **Suffixes**:
  - `_le`: Used for lemmas involving subobject inequalities (e.g., `comp_le_lemma`).
  - `_mk`: Standard Lean convention for constructors (e.g., `isoMk`).
- **Notation**:
  - `π₁`, `π₂`: Projections from product.
  - `π(a, b)`: Lift of arrows `a`, `b` to a product (`prod.lift`).
  - `prod.map f g`: Action of `f`, `g` on a product.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplifying identities, projections, pullbacks, and subobject operations. |
| `rw` | Rewriting using equalities (e.g., `eq`, `← Subobject.pullback_comp`). |
| `congr` | Proving equality of structured objects (e.g., `prod.lift` terms). |
| `ext` | Extensionality for products, pullbacks, or subobjects. |
| `le_trans` | Transitivity of subobject inclusion. |
| `apply le_of_eq` | Deriving inequality from equality. |
| `rfl` | Reflexivity for definitional equalities. |
| `simp only [...]` | Fine-grained simplification (e.g., in `assoc`, `id_comp`). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Verification of composition**: `comp_le_lemma` uses transitivity (`le_trans`) of subobject inclusion and simplification (`simp`) to reduce to known inclusions (`F.le`, `G.le`).
  - **Identity morphism**: `id` uses `simp` to show the inclusion holds trivially.
  - **Isomorphism construction**: `isoMk` proves both directions (`hom`, `inv`) by:
    - Rewriting using the assumed equality `eq`.
    - Applying `← Subobject.pullback_comp`.
    - Using `le_of_eq` and `congr` + `ext` + `simp` to verify the subobject condition.
  - **Categorical laws**: `id_comp`, `comp_id`, `assoc` rely on `simp`, `rfl`, and extensionality (`hom_ext`) or product/associator properties.

- **Logical flow**:
  - **Definition → Well-definedness (composition) → Categorical structure → Isomorphisms**.
  - All proofs are constructive and heavily use properties of pullbacks and subobjects in a category with finite products and pullbacks.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Subobject.Basic` | Provides `Subobject`, pullbacks of subobjects (`Subobject.pullback`), monotonicity, and ordering (`≤`) |
| `Mathlib.CategoryTheory.Limits.Shapes.FiniteProducts` | Ensures existence of binary products (`⨯`) and terminal object (used implicitly via `prod.fst`, `prod.snd`, etc.) |

**Assumptions on `C`**:
- `[Category.{v} C]`: Locally small category.
- `[HasFiniteProducts C]`: Binary products and terminal object exist.
- `[HasPullbacks C]`: Pullbacks exist (needed for `Subobject.pullback`).

---

### Summary

This file formalizes the **Dialectica category** `Dial C`, a categorical model of linear logic, where objects are relations `α ⊆ U × X` (as subobjects) and morphisms are pairs `(f, F)` satisfying a coherence condition via pullbacks. The formalization is clean, modular, and leverages Lean’s subobject calculus and product/pullback infrastructure. It serves as a foundation for further work on linear type theory semantics and polynomial constructions.