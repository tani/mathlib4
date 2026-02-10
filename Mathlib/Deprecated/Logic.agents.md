### Technical Metadata Brief: Deprecated Lean 4 File `Mathlib.Init.Deprecated`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Commutative` | `∀ a b, a * b = b * c` | Deprecated alias for `Std.Commutative`; expresses commutativity of binary op `*`. |
| `Associative` | `∀ a b c, (a * b) * c = a * (b * c)` | Deprecated alias for `Std.Associative`; expresses associativity of `*`. |
| `LeftIdentity`, `RightIdentity` | `∀ a, one * a = a`, `∀ a, a * one = a` | Deprecated; express left/right identity w.r.t. `one`. |
| `LeftInverse`, `RightInverse` | `∀ a, a⁻¹ * a = one`, `∀ a, a * a⁻¹ = one` | Deprecated; express left/right inverses (note: file defines `RightInverse`, not `LeftInverse`). |
| `LeftCancelative`, `RightCancelative` | `∀ a b c, a * b = a * c → b = c`, etc. | Deprecated; express left/right cancellation. |
| `LeftDistributive`, `RightDistributive` | `∀ a b c, a * (b + c) = a * b + a * c`, etc. | Deprecated; express left/right distributivity of `*` over `+`. |
| `heq_of_eq_rec_left`, `heq_of_eq_rec_right` | `a = a' → Eq.rec ... = ... → HEq ...` | Deprecated lemmas about equality reflection and heterogeneous equality. |
| `eq_rec_compose` | `Eq.rec p₁ (Eq.rec p₂ a) = Eq.rec (Eq.trans p₂ p₁) a` | Deprecated; composition law for `eq_rec`. |
| `decide_True'`, `decide_False'` | `Decidable True → decide True = true`, etc. | Deprecated; evaluation of `decide` on `True`/`False`. |
| `Decidable.recOn_true`, `Decidable.recOn_false` | Case analysis on `Decidable` proofs | Deprecated; constructors for `Decidable.recOn`. |
| `IsDecEq`, `IsDecRefl` | `∀ x y, p x y = true → x = y`, `∀ x, p x x = true` | Deprecated; properties of boolean predicates implying decidability. |
| `decidableEq_of_bool_pred` | `IsDecEq p → IsDecRefl p → DecidableEq α` | Deprecated; constructs decidable equality from boolean predicate. |
| `AsTrue`, `AsFalse` | `if c then True else False`, `if c then False else True` | Deprecated; wrappers for `c` as a proposition. |
| `if_congr_prop`, `if_ctx_congr_prop`, etc. | `b ↔ c → (c → x ↔ u) → (¬c → y ↔ v) → ite b x y ↔ ite c u v` | Deprecated congruence lemmas for `if-then-else`. |
| `let_*` lemmas (`let_value_eq`, `let_body_eq`, etc.) | Equality/HEq for `let` expressions | Deprecated; reasoning principles for `let`-bindings. |

> **Note**: All definitions and theorems are marked `@[deprecated]`, with most marked as unused in Mathlib.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_` (e.g., `IsDecEq`, `IsDecRefl`) — for properties of boolean predicates.
  - `decidable` (e.g., `decidableEq_of_bool_pred`) — for constructions involving `Decidable`.
  - `heq_`, `eq_rec_` — for heterogeneous equality and equality reflection.
  - `if_`, `dif_`, `let_` — for reasoning about conditionals and `let`-bindings.

- **Suffixes**:
  - `_iff` — for biconditional equivalences (e.g., `and_true_iff`).
  - `_prop` — for propositions (e.g., `if_congr_prop`).
  - `_left`, `_right` — for left/right variants (e.g., `LeftIdentity`, `RightDistributive`).

- **Infix/Postfix Notation**:
  - `*` (high priority) for binary op `f`.
  - `⁻¹` for unary op `inv`.
  - `+` (medium priority) for binary op `g`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rfl`, `refl` — for reflexivity proofs.
  - `cast`, `congrArg`, `congr` — for equality reasoning.
  - `match` — for case analysis on `Decidable` and `HEq`.
  - `simp`, `rw`, `rwa` — for simplification and rewriting.
  - `by_cases`, `by_contradiction` — deprecated aliases for `byCases`, `byContradiction`.

- **No heavy automation** (e.g., `aesop`, `linarith`, `ring`) — proofs are mostly manual or rely on basic equality reasoning.

---

#### **4. Proof Logic**

- **Pattern**:
  - Most proofs are **short and structural**, using:
    - `match` on `Decidable` cases (`isTrue`, `isFalse`).
    - `rfl` for definitional equalities (e.g., `cast rfl a = a`).
    - Substitution (`cast`, `congrArg`, `heq_of_eq_rec_*`) for heterogeneous equality.
    - `if_pos`, `if_neg`, `if_congr_*` for conditional reasoning.
  - **Induction is rare** — mostly propositional reasoning and equality reflection.
  - **Dependent elimination** via `Eq.rec`, `Decidable.recOn`, `dite`.

- **Example flow**:
  ```lean
  match h with
  | isTrue h_c => ... -- use h_c
  | isFalse h_c => ... -- derive contradiction
  ```

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Batteries.Tactic.Alias` | Provides deprecated tactic aliases (e.g., `by_cases`). |
| `Mathlib.Init` | Core Lean 4 initialization; includes `HEq`, `Eq.rec`, `Decidable`, `ite`, `dite`, etc. |

> **Scope**: This file is a **legacy compatibility layer**, consolidating deprecated definitions and theorems from early Mathlib/Lean 3. It is **not intended for new development**.

---

### Summary

This file is a **deprecated compatibility shim**, preserving old names and utilities from early Lean 3/4 development. All content is marked `@[deprecated]`, and most is unused in modern Mathlib. It serves only to avoid breaking existing test files or external code that may still reference these deprecated symbols. New code should use the modern equivalents (e.g., `Std.Commutative`, `instDecidableOr`, `and_true`, etc.).