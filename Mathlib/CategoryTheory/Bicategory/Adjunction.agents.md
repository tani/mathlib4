### Technical Metadata Brief: Adjunctions in Bicategories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `leftZigzag η ε` | `leftZigzag : (η : 𝟙 a ⟶ f ≫ g) → (ε : g ≫ f ⟶ 𝟙 b) → 𝟙 a ⟶ f ≫ g ≫ f ≫ g` | Composite 2-morphism representing the left triangle path in the zigzag lemma. |
| `rightZigzag η ε` | `rightZigzag : (η : 𝟙 a ⟶ f ≫ g) → (ε : g ≫ f ⟶ 𝟙 b) → 𝟙 a ⟶ f ≫ g ≫ f ≫ g` | Composite 2-morphism representing the right triangle path. |
| `Adjunction f g` | `struct` with `unit`, `counit`, `left_triangle`, `right_triangle` | Formalizes an adjunction `f ⊣ g` in a bicategory via unit/counit satisfying triangle identities. |
| `id a` | `Adjunction (𝟙 a) (𝟙 a)` | Identity adjunction on an object. |
| `comp adj₁ adj₂` | `Adjunction (f₁ ≫ f₂) (g₂ ≫ g₁)` | Composition of adjunctions (horizontal composition). |
| `Equivalence a b` | `struct` with `hom`, `inv`, `unit`, `counit`, `left_triangle` | Adjoint equivalence (i.e., adjunction where unit & counit are isos). |
| `id a` | `Equivalence a a` | Identity equivalence. |
| `mkOfAdjointifyCounit η ε` | `Equivalence a b` | Constructs an equivalence from isos `η : 𝟙 a ≅ f ≫ g`, `ε : g ≫ f ≅ 𝟙 b`, by adjusting `ε` to satisfy triangle identities. |
| `rightZigzag_idempotent_of_left_triangle` | `rightZigzag ⊗≫ rightZigzag = rightZigzag` | Key lemma: if left triangle holds, then right zigzag is idempotent. |
| `right_triangle_of_left_triangle` | `left_triangle ⇒ right_triangle` | Derives right triangle identity from left triangle + isomorphism assumption. |
| `RightAdjoint left` | `struct` with `right : b ⟶ a`, `adj : left ⊣ right` | Encodes a *chosen* right adjoint. |
| `IsLeftAdjoint left` | `class Prop` | Asserts existence of a right adjoint for `left`. |
| `LeftAdjoint right`, `IsRightAdjoint right` | Dual to above | Encodes existence of left adjoints. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `leftZigzag`, `rightZigzag`: denote canonical composites for triangle identities.
  - `compUnit`, `compCounit`: auxiliary components for composing adjunctions.
  - `adjointifyCounit`: modifies `ε` to satisfy triangle condition.
- **Suffixes**:
  - `Iso`: indicates isomorphism version (e.g., `leftZigzagIso`, `rightZigzagIso`).
  - `hom`, `inv`, `symm`: for hom-part, inverse, or symmetry of isos.
- **Operators**:
  - `⊣`: infix for `Adjunction`.
  - `≌`: infix for `Equivalence`.
- **Variables**:
  - `η`, `ε`: standard for unit/counit (also used in iso versions).
  - `f`, `g`: typical 1-morphisms in adjunction.
  - `adj₁`, `adj₂`: adjunction instances for composition.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `bicategory`: used repeatedly for coherence and diagrammatic reasoning in bicategories.
  - `aesop_cat`: for solving triangle identities automatically (via category-theoretic Aesop).
  - `simp_rw`, `simp`: for rewriting using `simp` lemmas (`left_triangle`, `right_triangle`, etc.).
  - `rw`, `calc`: for stepwise equality reasoning.
  - `ext`: for extensionality (e.g., proving `Iso.ext`).
  - `apply`, `intro`, `exact`: basic proof scripting.
- **Iso-specific**:
  - `whisker_exchange`, `bicategoricalComp`, `bicategoricalIsoComp`: for manipulating whiskering and tensor products of isos.
  - `cancel_epi`: used in idempotent-based arguments.

---

#### **4. Proof Logic**

- **Inductive/structural style**:
  - Proofs often proceed by **explicit diagrammatic manipulation**, leveraging bicategorical coherence.
  - **Induction** is not used; instead, proofs rely on:
    - **Whiskering lemmas** (`whisker_exchange`, etc.)
    - **Simplification via triangle identities** (`left_triangle`, `right_triangle`)
    - **Iso properties** (`Iso.inv_hom_id`, `Iso.ext`)
- **Common pattern**:
  1. Expand definitions (`dsimp`).
  2. Rearrange whiskerings (`rw [← whisker_exchange]`).
  3. Apply triangle identities (`simp_rw [left_triangle]`).
  4. Simplify using iso axioms (`simp [Iso.inv_hom_id]`).
- **Key logical step**:
  - `rightZigzag_idempotent_of_left_triangle` → `right_triangle_of_left_triangle`: shows that if left triangle holds and unit/counit are isos, then right triangle automatically holds.

---

#### **5. Imports**

- `Mathlib.Tactic.CategoryTheory.Bicategory.Basic`: provides foundational bicategory infrastructure (e.g., whiskering, unitors, associators, coherence tactics like `bicategory`, `bicategory_coherence`, `aesop_cat`).

---

### Summary

This file formalizes **adjunctions and adjoint equivalences in bicategories**, emphasizing:
- Diagrammatic definitions (`leftZigzag`, `rightZigzag`)
- Triangle identities as equalities (up to unitors)
- Construction of equivalences from isos via `mkOfAdjointifyCounit`
- Choice-based adjoint extraction (`IsLeftAdjoint`, `rightAdjoint`)

The style is highly **diagrammatic and coherence-driven**, with heavy use of `bicategory` and `aesop_cat` to automate routine bicategorical reasoning.