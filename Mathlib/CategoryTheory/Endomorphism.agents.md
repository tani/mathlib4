### Technical Brief: Endomorphisms and Automorphisms in Category Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `End X` | `X ⟶ X` | Type of endomorphisms of object `X` in a category `C`. |
| `End.one` | `1 : End X` | Identity endomorphism: `1 = 𝟙 X`. |
| `End.mul` | `xs * ys = ys ≫ xs` | Multiplication in `End X` is *reverse* composition (`Function.comp` order). |
| `End.of` | `X ⟶ X → End X` | Embed morphism into endomorphism. |
| `End.asHom` | `End X → X ⟶ X` | Projection from endomorphism to morphism. |
| `End.monoid` | `Monoid (End X)` | `End X` forms a monoid under `*` and `1`. |
| `End.group` | `Group (End X)` | If `C` is a groupoid, then `End X` is a group. |
| `Aut X` | `X ≅ X` | Type of automorphisms (isomorphisms `X → X`). |
| `Aut.group` | `Group (Aut X)` | `Aut X` is a group under `*`, where `f * g = g.trans f`. |
| `isUnit_iff_isIso` | `IsUnit f ↔ IsIso f` | Characterizes units in `End X` as isomorphisms. |
| `Aut.unitsEndEquivAut` | `(End X)ˣ ≃* Aut X` | Equivalence of groups between units of `End X` and automorphisms. |
| `Aut.toEnd` | `Aut X →* End X` | Canonical monoid homomorphism embedding automorphisms into endomorphisms. |
| `Aut.autMulEquivOfIso` | `X ≅ Y ⇒ Aut X ≃* Aut Y` | Conjugation by an isomorphism induces a group isomorphism between automorphism groups. |
| `Functor.mapEnd` | `End X →* End (f.obj X)` | Functorial action on endomorphism monoids. |
| `Functor.mapAut` | `Aut X →* Aut (f.obj X)` | Functorial action on automorphism groups. |
| `FullyFaithful.mulEquivEnd` | `End X ≃* End (f.obj X)` | If `f` is fully faithful, endomorphism monoids are isomorphic. |
| `FullyFaithful.autMulEquivOfFullyFaithful` | `Aut X ≃* Aut (f.obj X)` | Same for automorphism groups. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `End.` / `Aut.`: Namespace for endomorphism/automorphism constructions.
  - `mapEnd`, `mapAut`: Functorial maps.
  - `autMulEquivOfIso`, `mulEquivEnd`: Equivs/isos between automorphism/endomorphism structures.
- **Suffixes:**
  - `_def`: Definitional equalities (e.g., `one_def`, `mul_def`, `Aut_mul_def`).
  - `_hom`, `_inv`, `_symm`: Hom/inv/symmetry components of isomorphisms.
  - `isUnit`, `isIso`: Properties of morphisms (units / isomorphisms).
- **Structure:**
  - `of`, `asHom`: Bidirectional coercion helpers.
  - `ext`: Extensionality lemmas (`Aut.ext`).
  - `inhabited`: Default element (e.g., identity).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`: Definitional equalities (e.g., `mul_def`, `one_def`, `Aut_mul_def`).
- `simp`: Simplification using `@[simp]` lemmas (e.g., `one_smul`, `mul_smul`).
- `aesop_cat`: Automated category reasoning (used in `autMulEquivOfIso` proofs).
- `cases`: Destructuring dependent types (e.g., `unitsEndEquivAut.map_mul'`).
- `symm`: Reversing equalities (e.g., in `mul_assoc` proof).
- `by aesop_cat`: Category-theoretic automation for diagram chasing.

---

#### **4. Proof Logic**

- **Monoid/Group structure proofs**:
  - Use `Category.comp_id`, `Category.id_comp`, and `Category.assoc` to verify monoid/group axioms.
  - For `End.group`, rely on `Groupoid.comp_inv` to show `inv_mul_cancel`.
- **Equivalence proofs**:
  - `unitsEndEquivAut`: Constructed via explicit inverse pair; verification uses `rfl` after destructuring.
  - `autMulEquivOfIso`: Conjugation by `h : X ≅ Y`, with inverses verified via `aesop_cat`.
- **Functoriality**:
  - `mapEnd`, `mapAut`: Use `f.map_comp`, `f.map_id`, `f.mapIso_trans`, etc.
  - Fully faithful case: Leverages `hf.homEquiv`, `hf.isoEquiv` (from `FullyFaithful` class).

---

#### **5. Imports**

Core dependencies defining scope:
- `Mathlib.Algebra.Group.Action.Defs`: For `MulAction` and action laws.
- `Mathlib.Algebra.Group.Equiv.Basic`: For `Equiv` and related constructions.
- `Mathlib.Algebra.Group.Units.Basic` / `Hom`: For `Units`, `Units.coeHom`.
- `Mathlib.CategoryTheory.Groupoid`: For groupoid structure (`inv`, `comp_inv`).
- `Mathlib.CategoryTheory.Opposites`: For `Cᵒᵖ`, `unop`, and opposite category reasoning.

---

#### **Summary**

This module formalizes the foundational theory of endomorphism monoids and automorphism groups in an arbitrary category, including:
- Monoid/group structures,
- Equivalence between units and automorphisms,
- Functoriality and fully-faithful behavior,
- Conjugation-induced automorphism isomorphisms.

The design reflects Lean’s preference for *reverse composition order* in `End X` to align with `Function.comp`, and leverages `@[simps!]` and `@[ext]` for ergonomic reasoning.