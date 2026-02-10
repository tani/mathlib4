### Technical Brief: `LinearOrderedAddCommGroupWithTop` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LinearOrderedAddCommMonoidWithTop` | `class` extending `LinearOrderedAddCommMonoid α`, `OrderTop α` | Captures linearly ordered commutative additive monoids with a top element `⊤` that is *additively absorbing* (`⊤ + x = ⊤`). |
| `LinearOrderedAddCommGroupWithTop` | `class` extending `LinearOrderedAddCommMonoidWithTop α`, `SubNegMonoid α`, `Nontrivial α` | Extends the above to groups: includes negation, ensures `-(⊤) = ⊤`, and that `a + -a = 0` when `a ≠ ⊤`. |
| `WithTop.linearOrderedAddCommMonoidWithTop` | `instance` | Shows that `WithTop α` (i.e., `α ∪ {⊤}`) inherits the structure when `α` is a `LinearOrderedAddCommMonoid`. |
| `WithTop.LinearOrderedAddCommGroup.sub` | `def` | Defines subtraction on `WithTop α` by: `x - ⊤ = ⊤`, `⊤ - x = ⊤`, and `a - b = a - b` for `a, b : α`. |
| `top_add`, `add_top` | `@[simp]` lemmas | `⊤ + a = ⊤`, `a + ⊤ = ⊤`. |
| `neg_top`, `top_sub`, `sub_top` | `@[simp]` lemmas | `-(⊤) = ⊤`, `⊤ - a = ⊤`, `a - ⊤ = ⊤`. |
| `sub_eq_top_iff` | `@[simp]` lemma | `a - b = ⊤ ↔ a = ⊤ ∨ b = ⊤`. |
| `add_eq_top` | `@[simp]` lemma | `a + b = ⊤ ↔ a = ⊤ ∨ b = ⊤`. |
| `top_ne_zero` | `@[simp]` lemma | `⊤ ≠ 0`. |
| `neg_eq_top` | `@[simp]` lemma | `-a = ⊤ ↔ a = ⊤`. |
| `add_neg_cancel_of_ne_top` | `lemma` | If `a ≠ ⊤`, then `a + -a = 0`. |
| `injective_add_left_of_ne_top`, `injective_add_right_of_ne_top` | `lemma` | Addition by a non-`⊤` element is injective. |
| `strictMono_add_left_of_ne_top`, `strictMono_add_right_of_ne_top` | `lemma` | Addition by a non-`⊤` element is strictly monotone. |
| `sub_pos` | `lemma` | `0 < a - b ↔ b < a ∨ b = ⊤`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `top_`: properties involving `⊤` on the left (e.g., `top_add`, `top_sub`).
  - `sub_`: properties involving subtraction (e.g., `sub_top`, `sub_eq_top_iff`, `sub_pos`).
  - `neg_`: properties involving negation (e.g., `neg_top`, `neg_eq_top`).
  - `add_`: general additive properties (e.g., `add_top`, `add_eq_top`, `add_neg_cancel`).
  - `injective_`, `strictMono_`: functional properties of addition maps.

- **Suffixes**:
  - `_of_ne_top`: conditions or results that require the argument to be *not* `⊤`.
  - `_iff`: characterizations as biconditionals (e.g., `add_eq_top`, `sub_eq_top_iff`).

- **Class names**:
  - `LinearOrderedAddCommMonoidWithTop`, `LinearOrderedAddCommGroupWithTop`: follow Lean’s bundled/unbundled hierarchy and naming for ordered algebraic structures.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `cases` | Structural case analysis on `WithTop α` elements (`a | a`), or on `a = ⊤ ∨ b = ⊤`. |
| `simp` | Simplification using `@[simp]` lemmas (e.g., `top_add`, `neg_top`, `sub_top`). |
| `rw` | Rewriting using equalities (e.g., `add_assoc`, `add_comm`, `add_neg_cancel`). |
| `congrArg` | Applying functions to both sides of an equality (e.g., `congrArg (-a + ·)`). |
| `by_contra` / `by_contradiction` | Proof by contradiction (e.g., in `add_eq_top`). |
| `exact`, `apply`, `convert` | Goal-directed proof construction. |
| `dsimp`, `simp only` | Focused simplification (e.g., to avoid unfolding unnecessary definitions). |
| `lt_of_le_of_ne` | To prove strict inequality from non-strict + inequality of terms. |
| `Function.Injective`, `StrictMono` | Reasoning about monotonicity/injectivity of maps. |

---

#### **4. Proof Logic**

- **Inductive/Case-based reasoning** dominates, especially over `WithTop α` (via `cases a <;> cases b`).
- **Absorption properties** (`⊤ + a = ⊤`, `a + ⊤ = ⊤`) are used to reduce goals involving `⊤`.
- **Cancellation lemmas** (`add_neg_cancel_of_ne_top`) are central: they allow reduction of expressions like `a + -a` to `0` when `a ≠ ⊤`.
- **Biconditional proofs** (`↔`) are typically split into `mp` (→) and `mpr` (←) directions, often using:
  - Contrapositive reasoning (`by_contra`, `not_or` at `not_or`).
  - Injectivity/strict monotonicity of addition (via `injective_add_left_of_ne_top`, `strictMono_add_left_of_ne_top`).
- **Subtraction and negation** are handled via:
  - Reduction to `α` (via `coe_sub`, `coe_neg`) when arguments are finite.
  - Direct simplification (`rfl`) when `⊤` is involved.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Order.Group.Defs`: foundational ordered groups.
- `Mathlib.Algebra.Order.Monoid.WithTop`: `WithTop` construction and its algebraic structure.
- `Mathlib.Algebra.Group.Hom.Defs`: homomorphism basics (used implicitly).
- `Mathlib.Algebra.CharZero.Defs`: ensures `0 ≠ 1`, relevant for `top_ne_zero`.
- `Mathlib.Algebra.Order.Monoid.Unbundled.OrderDual`: dual order reasoning (used in `strictMono` proofs).
- `Mathlib.Algebra.Order.Monoid.Canonical.Defs`: canonical order constructions.

**Domain Scope**:
- Formalization of **extended value semigroups/monoids/groups** used in valuation theory (e.g., `ℝ≥0 ∪ {∞}`, `ℕ∞`, `ENNReal`).
- Designed to support **generalized valuations** where infinite values are allowed and behave as absorbing elements.

---

Let me know if you'd like a diagram of the class hierarchy or a summary of how `ENNReal` fits into this framework.