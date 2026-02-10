### Technical Brief: Order Theory in Lean 4 (`Mathlib.Order.Basic`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `OrderDual α` | `Type u → Type u` | Type synonym reversing order: `x ≤ y` in `αᵒᵈ` iff `y ≤ x` in `α`. |
| `Order.Preimage f s` | `(f : α → β) → (β → β → Prop) → α → α → Prop` | Pullback order along `f`: `x ≤ y ↔ f x ≤ f y`. |
| `Preorder.lift`, `PartialOrder.lift`, `LinearOrder.lift` | Functions lifting orders via injective maps | Transfer order structure from `β` to `α` using `f : α → β`. |
| `DenselyOrdered` | `Class` | No gaps: `a < b → ∃ c, a < c < b`. |
| `lt_self_iff_false` | `x < x ↔ False` | Irreflexivity of `<`. |
| `le_antisymm` / `ge_antisymm` | `a ≤ b → b ≤ a → a = b` | Antisymmetry of `≤`. |
| `lt_of_le_of_lt`, `lt_of_lt_of_le` | Mixed `≤`/`<` transitivity | Derive `<` from combinations of `≤` and `<`. |
| `lt_iff_not_le` (in `LinearOrder`) | `x < y ↔ ¬ y ≤ x` | Characterization of `<` in linear orders. |
| `eq_of_forall_le_iff` | `(∀ c, c ≤ a ↔ c ≤ b) → a = b` | Extensionality via lower sets. |
| `ltByCases`, `ltTrichotomy` | Case analysis on `x < y`, `x = y`, `y < x` | Structural case splits in linear orders. |
| `min_def'`, `max_def'` | `min a b = if b ≤ a then b else a` | Alternate definitions of `min`/`max` useful for rewriting. |
| `Preorder.ext`, `PartialOrder.ext`, `LinearOrder.ext` | Extensionality principles for order instances | Prove equality of order structures by pointwise equivalence of `≤`. |
| `compl_lt`, `compl_le`, etc. | Complement of `<` is `≥`, etc. | Relate `<`, `≤` with their logical complements. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `le_`, `lt_`: Basic order lemmas (`le_trans`, `lt_irrefl`).
  - `ge_`, `gt_`: Dual versions (e.g., `ge_antisymm`).
  - `trans_`, `antisymm`, `irrefl`: Structural properties.
  - `of_`: Implication introduction (`lt_of_le_of_lt`, `eq_of_le_of_not_lt`).
  - `not_`: Negation-based lemmas (`not_lt_of_lt`, `not_le_of_lt`).
  - `eq_`: Equality-characterizing lemmas (`eq_or_lt_of_le`, `eq_iff_not_lt_of_le`).
  - `forall_`: Universal quantifier characterizations (`forall_lt_iff_le`).
  - `decidable_`: When decidability is required (`Decidable.le_iff_eq_or_lt`).

- **Suffixes**:
  - `'`: Variant version (often flipped or dual), e.g., `le_trans'`, `lt_of_le_of_lt'`.
  - `''`: Rare; sometimes used for further variants.
  - `'_dec`: When decidability is assumed classically (`eq_or_lt_dec`).

- **Dot notation aliases**:
  - `LE.le.trans`, `LT.lt.trans_lt`, `Eq.le`, etc., enable syntax like `hab.trans hbc`.
  - Aliases are declared via `alias` commands (e.g., `alias LE.le.trans := le_trans`).

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions and lemmas (e.g., `min_def`, `lt_iff_le_not_le`). |
| `simp` / `simp_rw` | Simplification with `@[simp]` lemmas and rewrite rules. |
| `rcases` / `cases` | Case analysis on `lt_trichotomy`, `le_total`, `lt_or_ge`, etc. |
| `exact` / `assumption` | Direct proof steps. |
| `funext` | Extensionality for functions (e.g., in `Preorder.toLE_injective`). |
| `congr` / `congr'` | Congruence for equality of structures. |
| `apply` / `intro` | Intro + apply pattern matching. |
| `have`, `suffices`, `by_cases` | Intermediate lemma introduction and case splits. |
| `ext` | Extensionality for relations/orders. |
| `convert` | Flexible equality proof (e.g., in `Preorder.ext`). |
| `aesop` / `linarith` | Not heavily used here — mostly manual order reasoning. |
| ` rfl` | Reflexivity for definitional equalities. |

---

#### **4. Proof Logic & Strategy**

- **Induction / Case Analysis**:
  - Heavy use of *trichotomy* (`lt_trichotomy`, `lt_or_ge`, `le_total`) in linear orders.
  - `ltByCases`/`ltTrichotomy` provide structured case splits on ordering.

- **Extensionality**:
  - Orders are proven equal by showing pointwise equivalence of `≤` or `<`.
  - `Preorder.ext`, `PartialOrder.ext_lt`, `LinearOrder.ext_lt` are key.

- **Duality**:
  - Dual orders (`αᵒᵈ`) are used to avoid duplication: many dual lemmas are derived via `OrderDual`.
  - `dual_dual` lemmas confirm double dual returns original structure.

- **Transfer**:
  - Orders are transferred via `Preimage`, `lift`, and `Preimage.decidable`.
  - Injectivity of `f` is crucial for `PartialOrder.lift`/`LinearOrder.lift`.

- **Equational Reasoning**:
  - Antisymmetry (`le_antisymm`) is used to prove equalities from mutual `≤`.
  - `commutative_of_le`, `associative_of_commutative_of_le` show how to reduce equality proofs to `≤`.

- **Negation & Classical Reasoning**:
  - `lt_iff_not_le`, `eq_of_forall_lt`, etc., rely on classical logic (e.g., `Classical.dec`).
  - `not_le_of_lt`, `lt_of_not_le` bridge positive and negative statements.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
```lean
import Mathlib.Algebra.Group.ZeroOne
import Mathlib.Data.Subtype
import Mathlib.Order.Defs.LinearOrder
import Mathlib.Order.Notation
import Mathlib.Tactic.GCongr.Core
import Mathlib.Tactic.Spread
import Mathlib.Tactic.Convert
import Mathlib.Tactic.Inhabit
import Mathlib.Tactic.SimpRw
```

**Scope**:
- Core order theory: preorders, partial orders, linear orders.
- Dot notation for `≤`/`<`.
- Order duals, lifting, and transfer.
- Decidability and extensionality principles.
- Function space orders (`Π i, π i`).
- Complement relations (`HasCompl`), especially for `Prop` and `Π`.

**Notable Exclusions**:
- No lattice operations (`⊔`, `⊓`) defined here (only `min`, `max` in linear orders).
- No topology or metric aspects.
- No category-theoretic perspective (e.g., monotone maps, embeddings).

---

### Summary

This file provides the foundational infrastructure for order theory in Mathlib: definitions, aliases, extensionality, duality, and case analysis tools. It emphasizes **uniform use of `≤`/`<`** (avoiding `≥`/`>`), **dot notation**, and **dual constructions** to minimize duplication. Proofs rely on classical reasoning, trichotomy, and antisymmetry, with heavy use of `simp`, `rw`, and case analysis.