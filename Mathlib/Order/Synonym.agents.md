### Technical Metadata Brief: `Mathlib.Order.Dual.Lex`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `OrderDual α` | `Type u → Type u` | Type synonym for `α`, equipped with the **dual order**: `a ≤ b` in `αᵒᵈ` iff `b ≤ a` in `α`. |
| `Lex α` | `Type u → Type u` | Type synonym for `α`, intended to carry a **lexicographic order** (definition deferred to other files; this file only sets up the synonym and equivalences). |
| `toDual : α ≃ αᵒᵈ` | `Equiv α αᵒᵈ` | Identity equivalence from `α` to its dual. |
| `ofDual : αᵒᵈ ≃ α` | `Equiv αᵒᵈ α` | Inverse of `toDual`. |
| `toLex : α ≃ Lex α` | `Equiv α (Lex α)` | Identity equivalence to the lexicographic variant. |
| `ofLex : Lex α ≃ α` | `Equiv (Lex α) α` | Inverse of `toLex`. |
| `toDual_le_toDual` | `[LE α] → (toDual a ≤ toDual b) ↔ b ≤ a` | Core property of dual order: reverses inequalities. |
| `ofDual_le_ofDual` | `[LE α] → (ofDual a ≤ ofDual b) ↔ b ≤ a` | Dual version of the above, for elements in `αᵒᵈ`. |
| `toDual_lt_toDual`, `ofDual_lt_ofDual` | Similar to above, for strict `<`. |
| `Lex.forall`, `Lex.exists` | `∀ a, p a ↔ ∀ a, p (toLex a)` | Quantifier migration lemmas for `Lex`. |
| `OrderDual.forall`, `OrderDual.exists` | Same as above for `OrderDual`. |
| `Lex.rec`, `OrderDual.rec` | Recursors for eliminating out of `Lex α` / `αᵒᵈ`. | Enables induction/cases reasoning. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toDual`, `ofDual`: for coercions *to* and *from* the dual.
  - `toLex`, `ofLex`: for coercions *to* and *from* the lexicographic variant.
- **Suffixes**:
  - `dual` in `toDual`, `ofDual`, `dual` lemmas (`toDual_le_toDual`, etc.).
  - `Lex` in `toLex`, `ofLex`, `Lex.forall`, `Lex.exists`.
- **Notation**:
  - `αᵒᵈ` is notation for `OrderDual α`.
  - `Lex α` is used directly (no extra notation beyond the type constructor).
- **Pattern**:
  - `toX_ofX` / `ofX_toX` lemmas: identity compositions.
  - `X_inj`: injectivity of `toX`/`ofX`.
  - `X_le_X` / `X_lt_X`: order-reversing behavior.

---

#### **3. Tactic Stack**

- **`rfl`**: Dominant tactic — many lemmas are definitional (`Iff.rfl`, `rfl` proofs).
- **`simp only [...]`**: Used in porting notes to justify removal of `@[simp]`.
- **`inferInstanceAs`**: For inheriting instances (e.g., `BEq`, `DecidableEq`) from `α` to `Lex α`.
- **`Iff.rfl`**: Standard for iff-lemmas that are definitional.
- **No heavy automation** (e.g., `aesop`, `linarith`, `ring`) — this is a low-level infrastructure file.

---

#### **4. Proof Logic**

- **Definitional reasoning**: Almost all proofs are `rfl` or `Iff.rfl`, reflecting that `OrderDual` and `Lex` are *type synonyms* (i.e., definitionally equal to `α`).
- **Equivalence symmetry**: `toDual_symm_eq`, `ofDual_symm_eq`, etc., follow by `rfl` due to `Equiv.refl`.
- **Order reversal**: `toDual_le_toDual` etc. are *definitional* consequences of how the dual order is defined.
- **Quantifier lemmas**: Follow from bi-implication of quantifiers under equivalence (`∀ a, p a ↔ ∀ a, p (equiv a)`).
- **No induction or case analysis beyond `rec`**: The recursor `Lex.rec`/`OrderDual.rec` is used for elimination, but proofs themselves are trivial.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Logic.Equiv.Defs` | Provides `Equiv`, `Equiv.refl`, and basic equivalence machinery. |
| `Mathlib.Logic.Nontrivial.Defs` | Used in `nontrivial` instance for `αᵒᵈ`. |
| `Mathlib.Order.Basic` | Provides `LE`, `LT`, `Nontrivial`, and basic order-theoretic infrastructure. |

> **Note**: This file is foundational — it sets up the *type-theoretic scaffolding* for dual and lexicographic orders, but does *not* define the actual order instances (e.g., `LE (αᵒᵈ)`, `LT (Lex α)`). Those are deferred to other files (e.g., `Mathlib.Order.Dual.Basic`, `Mathlib.Order.Lex.Basic`).

--- 

Let me know if you'd like the corresponding `LE`/`LT` instance definitions or a comparison with `Algebra.Group.TypeTags`.