### Technical Metadata Brief: `CategoryTheory.Bicategory.Strict`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Bicategory.Strict` | `class Prop` | Defines a *strict bicategory* as one where unitors and associators are *equalities* (via `eqToIso`). |
| `id_comp` | `∀ {a b : B} (f : a ⟶ b), 𝟙 a ≫ f = f` | Left identity law for composition (as equality). |
| `comp_id` | `∀ {a b : B} (f : a ⟶ b), f ≫ 𝟙 b = f` | Right identity law for composition (as equality). |
| `assoc` | `∀ {a b c d : B} (f g h), (f ≫ g) ≫ h = f ≫ g ≫ h` | Associativity of composition (as equality). |
| `leftUnitor_eqToIso` | `λ_ f = eqToIso (id_comp f)` | Left unitor is the isomorphism induced by `id_comp`. |
| `rightUnitor_eqToIso` | `ρ_ f = eqToIso (comp_id f)` | Right unitor is the isomorphism induced by `comp_id`. |
| `associator_eqToIso` | `α_ f g h = eqToIso (assoc f g h)` | Associator is the isomorphism induced by `assoc`. |
| `StrictBicategory.category` | `instance [Bicategory.Strict B] : Category B` | Equips a strict bicategory with a category structure using the equality-based laws. |
| `whiskerLeft_eqToHom` | `f ◁ eqToHom η = eqToHom (congr_arg₂ (· ≫ ·) rfl η)` | Interaction of left whiskering with `eqToHom`. |
| `eqToHom_whiskerRight` | `eqToHom η ▷ h = eqToHom (congr_arg₂ (· ≫ ·) η rfl)` | Interaction of right whiskering with `eqToHom`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `id_`, `comp_`, `assoc_`: Reflect categorical laws (identity, composition, associativity).
  - `leftUnitor_`, `rightUnitor_`, `associator_`: Standard bicategorical coherence data.
  - `eqToIso`, `eqToHom`: From `Mathlib.CategoryTheory.EqToHom`, used to convert equalities to isomorphisms/morphisms.
- **Suffixes**:
  - `_eqToIso`: Indicates that a coherence isomorphism is defined via `eqToIso`.
  - `_eqToHom`: Indicates that a morphism is defined via `eqToHom`.
- **Class name**: `Bicategory.Strict` — follows Lean’s convention for properties (`Prop`-valued classes).

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in all field definitions of `Bicategory.Strict`. This tactic (from `Mathlib.Tactic.AesopCat`) solves categorical identities using category-theoretic simplification rules and rewrite databases.
- **`simp only [...]`**: In proofs of `whiskerLeft_eqToHom` and `eqToHom_whiskerRight`, used to reduce to base cases after `cases η`.
- **`cases η`**: Eliminates equality hypotheses (Leibniz equality) by case analysis on reflexivity.

---

#### **4. Proof Logic**

- **Class definition**: All proofs are delegated to `aesop_cat`, indicating that the laws are *definitional* or easily derivable from the axioms of a bicategory *plus* the equality assumptions.
- **`whiskerLeft_eqToHom` / `eqToHom_whiskerRight`**:
  - Use *equality elimination* (`cases η`) to reduce to the reflexive case.
  - Then simplify using:
    - `whiskerLeft_id`, `id_whiskerRight`: Identity whiskering laws.
    - `eqToHom_refl`: `eqToHom rfl = id`.
  - This reflects a standard technique for reasoning about transport along equalities in dependent type theory.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.EqToHom` | Provides `eqToHom`, `eqToIso`, and their basic properties (e.g., `eqToHom_refl`, `eqToIso_refl`). Essential for encoding equalities as isomorphisms/morphisms. |
| `Mathlib.CategoryTheory.Bicategory.Basic` | Provides the foundational bicategory interface: 1- and 2-morphisms, composition (`≫`), identities (`𝟙`), and coherence isomorphisms (`λ_`, `ρ_`, `α_`). |

---

### Summary

This file formalizes **strict bicategories** (a.k.a. strict 2-categories) in Lean, where coherence isomorphisms are *definitional* up to `eqToIso`. It leverages `eqToHom`/`eqToIso` to bridge equality and isomorphism, avoiding the need for strict identity 2-morphisms (which would be ill-typed due to dependent types). The proofs are largely automated via `aesop_cat`, and the whiskering lemmas follow standard equality-transport patterns. This is foundational for higher categorical reasoning in Mathlib.