### Technical Brief: Idempotent Complete Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsIdempotentComplete` | `class IsIdempotentComplete : Prop` | Defines that all idempotent endomorphisms `p : X ⟶ X` split: `p = e ≫ i` with `i ≫ e = 𝟙`. |
| `idempotents_split` | `∀ (X : C) (p : X ⟶ X), p ≫ p = p → ∃ (Y, i, e), i ≫ e = 𝟙 Y ∧ e ≫ i = p` | Core witness for idempotent completeness. |
| `isIdempotentComplete_iff_hasEqualizer_of_id_and_idempotent` | `IsIdempotentComplete C ↔ ∀ X p, p² = p → HasEqualizer (𝟙 X) p` | Equivalence between splitting and existence of equalizers of `id` and `p`. |
| `idem_of_id_sub_idem` | `[Preadditive C] → p² = p → (1 - p)² = 1 - p` | Shows `1 - p` is idempotent in preadditive categories. |
| `isIdempotentComplete_iff_idempotents_have_kernels` | `[Preadditive C] → IsIdempotentComplete C ↔ ∀ X p, p² = p → HasKernel p` | In preadditive categories, idempotent completeness ⇔ all idempotents have kernels. |
| `isIdempotentComplete_of_abelian` | `[Abelian D] → IsIdempotentComplete D` | Abelian categories are idempotent complete (via kernels). |
| `split_imp_of_iso` / `split_iff_of_iso` | `φ : X ≅ X'`, `p ≫ φ.hom = φ.hom ≫ p'` ⇒ splitting transfers along iso | Shows splitting is invariant under isomorphism of objects and conjugation of idempotents. |
| `Equivalence.isIdempotentComplete` | `C ≌ D`, `IsIdempotentComplete C` ⇒ `IsIdempotentComplete D` | Idempotent completeness is preserved under categorical equivalence. |
| `isIdempotentComplete_iff_of_equivalence` | `C ≌ D` ⇒ `IsIdempotentComplete C ↔ IsIdempotentComplete D` | Full equivalence characterization. |
| `isIdempotentComplete_of_isIdempotentComplete_opposite` | `IsIdempotentComplete Cᵒᵖ` ⇒ `IsIdempotentComplete C` | Opposite category inherits idempotent completeness. |
| `isIdempotentComplete_iff_opposite` | `IsIdempotentComplete Cᵒᵖ ↔ IsIdempotentComplete C` | Bidirectional equivalence with opposite category. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isIdempotentComplete_`: predicates or constructions related to idempotent completeness.
  - `split_`: statements about splitting of idempotents.
  - `idem_of_`: properties of idempotents (e.g., `idem_of_id_sub_idem`).
- **Suffixes**:
  - `_iff_`: logical equivalences (↔).
  - `_of_`: implications or constructions from assumptions (e.g., `of_abelian`, `of_equivalence`).
  - `_imp`: one-directional implication (e.g., `split_imp_of_iso`).
- **Other patterns**:
  - `op`, `unop`: for operations in opposite category.
  - `equalizer.lift`, `equalizer.ι`, `equalizer.condition`: standard limit notation.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `rintro` | Destruct existential/universal hypotheses. |
| `rw` / `erw` | Rewrite using equalities or definitional equalities. |
| `simp only [...]` | Simplify using explicit lemmas; avoids over-simplification. |
| `ext` | Extensionality for morphisms (in concrete categories). |
| `slice_lhs` / `slice_rhs` | Focus rewriting on subterms (e.g., `slice_lhs 2 3 => rw [...]`). |
| `convert` | Match goal up to definitional equality (used with `hasKernel_of_hasEqualizer`). |
| `rwa` | Rewrite + apply instance (e.g., `rwa [opposite_iff]`). |
| `infer_instance` | Automatically infer typeclass instances (e.g., `Abelian D` ⇒ `HasKernel`). |
| `aesop` (not present here, but likely in related files) | Not used in this file; proofs are mostly manual. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Equivalences (`↔`)**: Proven via `constructor`, then two separate implications.
  - **Existential witnesses**: Constructed explicitly (e.g., `use Y, i ≫ φ.hom, φ.inv ≫ e`).
  - **Opposite category arguments**: Use `op`/`unop` to translate between `C` and `Cᵒᵖ`.
  - **Equivalence of categories**: Leverage `ε.functor.map`, `ε.inverse.obj`, and `counitIso` to transport structure.
- **Common proof patterns**:
  - *Splitting ⇒ Equalizer*: Use splitting to build a fork and show it’s universal.
  - *Equalizer ⇒ Splitting*: Use equalizer cone to define `i`, `e`, and verify splitting equations.
  - *Preadditive case*: Reduce to kernels via `1 - p` and use `hasKernel_of_hasEqualizer`.
  - *Abelian case*: Immediate from `isIdempotentComplete_iff_idempotents_have_kernels` + `Abelian` ⇒ `HasKernel`.

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.Abelian.Basic
  ```
  - Provides `Abelian`, `HasKernel`, `HasEqualizer`, and related lemmas.

- **Open scopes**:
  ```lean
  open CategoryTheory
  open CategoryTheory.Category
  open CategoryTheory.Limits
  open CategoryTheory.Preadditive
  open Opposite
  ```
  - Enables notation like `X ⟶ X`, `𝟙 X`, `op X`, `equalizer.ι`, `HasKernel`, etc.

- **Module scope**:
  - Defined in `CategoryTheory.Idempotents` namespace.
  - Main class: `IsIdempotentComplete`.
  - Key lemmas live in `Idempotents` namespace.

---

### Summary

This file formalizes the theory of **idempotent complete (Karoubian) categories** in Lean 4, with emphasis on:
- Equivalences between splitting, equalizers, and kernels (in preadditive/abelian contexts),
- Stability under equivalence of categories and passage to opposites,
- Proof that **abelian ⇒ idempotent complete**.

The formalization is highly structured, leveraging category-theoretic limits (equalizers, kernels), preadditive structure, and categorical equivalences. The naming and tactic usage reflect Lean 4’s Mathlib conventions and the author’s focus on precise, reusable categorical reasoning.