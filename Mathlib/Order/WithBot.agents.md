### Technical Brief: `WithBot` and `WithTop` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `WithBot α` | `Option α` equipped with order where `none` is the **bottom** (`⊥`). |
| `WithTop α` | `Option α` equipped with order where `none` is the **top** (`⊤`). |
| `coe : α → WithBot α` | Embedding of `α` into `WithBot α` as `some`. |
| `bot : WithBot α` | Bottom element: `none`. |
| `top : WithTop α` | Top element: `none`. |
| `map f` | Lift of `f : α → β` to `WithBot α → WithBot β` (via `Option.map`). |
| `map₂ f` | Lift of binary `f : α → β → γ` to `WithBot α × WithBot β → WithBot γ`. |
| `unbot x hx` | Extract underlying value from `x : WithBot α` given `hx : x ≠ ⊥`. |
| `unbot' d x` | Total version of `unbot`, returning default `d` on `⊥`. |
| `Equiv.withBotSubtypeNe` | Equivalence `{x // x ≠ ⊥} ≃ α`. |
| `coe_injective`, `coe_inj` | Injectivity and injective equivalence of embedding. |
| `bot_lt_coe`, `not_lt_bot` | Strict order facts: `⊥ < a` for all `a : α`, and nothing `< ⊥`. |
| `le_bot_iff`, `top_le_iff` | Characterizations: `a ≤ ⊥ ↔ a = ⊥`, `⊤ ≤ a ↔ a = ⊤`. |
| `instance preorder`, `partialOrder`, `lattice`, `distribLattice`, `linearOrder` | Order structures lifted from `α` to `WithBot α` / `WithTop α`. |
| `instance wellFoundedLT`, `denselyOrdered`, `noTopOrder`, `noMaxOrder` | Additional properties preserved under `WithBot`/`WithTop`. |
| `toDual : WithTop α ≃ WithBot αᵒᵈ` | Equivalence between `WithTop α` and dual of `WithBot α`. |
| `untop`, `untop'` | Duals of `unbot`, `unbot'` for `WithTop`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coe_`: Embedding-related lemmas (`coe_inj`, `coe_le_coe`, `coe_lt_coe`, `coe_top`, `coe_bot`).
  - `map_`: Function lifting (`map_coe`, `map_bot`, `map₂_coe_coe`, `map_eq_bot_iff`).
  - `unbot_`, `untop_`: Deconstruction functions (`unbot_coe`, `unbot'_eq_iff`, `untop'_top`).
  - `bot_`, `top_`: Bottom/top behavior (`bot_lt_coe`, `top_le_iff`, `bot_ne_coe`, `top_ne_coe`).
  - `coe_eq_`, `eq_coe`: Equality lemmas involving embedding.

- **Suffixes**:
  - `_iff`: Logical equivalences (`coe_le_coe`, `bot_lt_iff_ne_bot`, `lt_iff_exists_coe`).
  - `_mono`, `_strictMono`: Monotonicity/strict monotonicity (`coe_mono`, `strictMono_map_iff`).
  - `_ne_`, `_ne_bot`, `_ne_top`: Inequality facts (`coe_ne_bot`, `top_ne_coe`).

- **`inst_` / `instance`**: Typeclass instances (`instTop`, `instBoundedOrder`, `instWellFoundedLT`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `induction` | Structural induction on `WithBot α` / `WithTop α` (via `Option`). |
| `simp` / `simp only` | Simplify using `@[simp]` lemmas (e.g., `map_bot`, `coe_le_coe`). |
| `cases` | Case analysis on `x : WithBot α` (`bot`, `coe a`). |
| `rfl` | Reflexivity for definitional equalities (e.g., `map_bot`, `unbot'_bot`). |
| `exact` / `intro` | Direct proof steps for implications. |
| `apply` | Apply lemmas like `bot_le`, `le_top`. |
| `rw` / `rwa` | Rewrite using equivalences (`coe_le_coe`, `bot_lt_iff_ne_bot`). |
| `aesop` / `tauto` | Rare, but used for propositional logic. |
| `lift` | Used in `canLift` instance proofs. |
| `contrapose` | For negated goals (e.g., `not_coe_le_bot`). |

---

#### **4. Proof Logic**

- **Structure**: Proofs typically follow a **case analysis** on whether the argument is `⊥`/`⊤` or a `coe a`.
- **Induction**: Used for properties over all `x : WithBot α` (e.g., `le_trans`, `wellFoundedLT`).
- **Equational reasoning**: Heavy use of `simp` + `rw` with `@[simp]` lemmas.
- **Order-theoretic reasoning**:
  - `le_trans`, `le_antisymm`, `lt_iff_le_not_le` are verified case-by-case.
  - Lattice operations (`sup`, `inf`) defined pointwise on `coe` and `⊥`/`⊤`.
- **Equivalence proofs** (`Equiv.withBotSubtypeNe`, `toDual`, `ofDual`) use `simp` + `rfl` + `cases`.
- **Well-foundedness / denseness**: Proven via recursion on `α` and lifting via `coe_lt_coe`.

---

#### **5. Imports**

Core dependencies defining scope:

| Module | Purpose |
|--------|---------|
| `Mathlib.Logic.Nontrivial.Basic` | `Nontrivial` typeclass. |
| `Mathlib.Order.TypeTags` | `Type*` universe polymorphism. |
| `Mathlib.Data.Option.NAry` | `Option.map`, `Option.map₂`, etc. |
| `Mathlib.Tactic.Contrapose`, `Lift` | Tactics for negation and lifting. |
| `Mathlib.Data.Option.Basic` | Core `Option` API (`some`, `none`, `ne_none_iff_exists`, etc.). |
| `Mathlib.Order.Lattice`, `BoundedOrder.Basic` | Lattice, bounded order, and order-theoretic infrastructure. |

---

### Summary

This module formalizes the standard construction of adding a least (`WithBot`) or greatest (`WithTop`) element to a type equipped with an order. It leverages `Option α` as the underlying type and defines orders, lattices, and additional properties (e.g., well-foundedness, denseness) by case analysis on the new extremal element. The API is highly uniform, with `coe`, `map`, `map₂`, `unbot`, and `untop` forming the core interface. Proofs rely heavily on `simp`-based automation and structural induction.