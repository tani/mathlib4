### Technical Metadata Brief: `Mathlib.Algebra.Order.Sub`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `OrderedSub α` | `class OrderedSub (α : Type*) [LE α] [Add α] [Sub α] : Prop` | A mixin type-class encoding the universal property of subtraction: `a - b ≤ c ↔ a ≤ c + b`. Enables reasoning about both group subtraction and truncated subtraction (e.g., on `ℕ`, `ENNReal`). |
| `tsub_le_iff_right` | `a - b ≤ c ↔ a ≤ c + b` | Core equivalence defining `OrderedSub`; used repeatedly to translate between subtraction and addition inequalities. |
| `add_tsub_cancel_right` | `a + b - b = a` (under `AddLECancellable b`) | Cancellation law for subtraction on the right; holds when `b` is left-cancellable for ≤. |
| `add_tsub_cancel_left` | `a + b - a = b` (under `AddLECancellable a`) | Cancellation law for subtraction on the left. |
| `tsub_tsub` | `b - a - c = b - (a + c)` (in `PartialOrder`) | Associativity of truncated subtraction over addition. |
| `tsub_eq_of_eq_add` | `a = c + b ⇒ a - b = c` (under `AddLECancellable b`) | Invertibility of subtraction when the summand is cancellable. |
| `lt_tsub_iff_right` | `a < b - c ↔ a + c < b` (in `LinearOrder`) | Strict inequality version of `tsub_le_iff_right`. |
| `add_tsub_add_eq_tsub_right` | `a + c - (b + c) = a - b` (in `AddLeftMono + AddLeftReflectLE`) | Cancellation of common summands in subtraction under stronger order-theoretic assumptions. |

---

#### **2. Naming Conventions**

- **Prefix `tsub_`**: Used for all lemmas involving `OrderedSub`-based subtraction (short for *truncated subtraction*), to distinguish from group-theoretic `sub_` lemmas.
- **`_right` / `_left` suffixes**: Indicate which side of the inequality or equality the variable appears on (e.g., `tsub_le_tsub_right`, `add_tsub_cancel_left`).
- **`_assoc` suffix**: For associativity-like properties (e.g., `add_tsub_le_assoc`, `tsub_tsub`).
- **`_swap` suffix**: For symmetry or swapping arguments (e.g., `le_add_tsub_swap`, `tsub_right_comm`).
- **`_of_le` / `_of_lt` suffixes**: For implications assuming an inequality or strict inequality as hypothesis.
- **`AddLECancellable.*` namespace**: Lemmas assuming a specific element is left-cancellable for ≤.
- **`Contravariant.*` / `Contra` section**: Lemmas assuming `AddLeftReflectLE α`, i.e., `a + c ≤ b + c ⇒ a ≤ b`.

---

#### **3. Tactic Stack**

- **`rw` / `rwa`**: Extensively used to rewrite using `tsub_le_iff_right`, `add_comm`, `add_assoc`, etc.
- **`simp_rw` / `simp`**: For simplification with `@[simp]` lemmas like `add_tsub_cancel_right`.
- **`apply` / `exact`**: For applying implications (e.g., `tsub_le_iff_right.mpr`, `.mp`).
- **`refine` / `exact`**: For constructing proofs with intermediate goals (e.g., `refine ⟨h.le, ?_⟩`).
- **`calc`**: For chaining inequalities (e.g., in `tsub_tsub_le_tsub_add`).
- **`antisymm`**: To prove equalities by double inequality (e.g., in `tsub_tsub`, `add_tsub_add_eq_tsub_right`).
- **`lt_iff_le_and_ne` / `lt_of_ne_of_le`**: For handling strict inequalities via non-strict ones.
- **`gcongr`**: Used as an attribute on monotonicity lemmas (e.g., `tsub_le_tsub_right`).

---

#### **4. Proof Logic**

- **Induction is not used** — proofs are mostly *algebraic* and *order-theoretic*, relying on:
  - Rewriting with `tsub_le_iff_right` to move between `a - b ≤ c` and `a ≤ c + b`.
  - Applying monotonicity (`gcongr`) and cancellativity assumptions.
  - Using `antisymm` to prove equalities in partial orders.
  - Leveraging `AddLECancellable` or `AddLeftReflectLE` to upgrade inequalities to equalities.
- **Common pattern**:
  1. Apply `tsub_le_iff_right` or `tsub_le_iff_left` to convert subtraction inequality to addition inequality.
  2. Use `add_le_add_left/right`, `le_trans`, `le_rfl`.
  3. If equality is needed, apply `antisymm` and use cancellativity or order-reflecting properties.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Group.Basic` | Provides basic group/monoid theory (e.g., `add_zero`, `add_comm`). |
| `Mathlib.Algebra.Order.Monoid.Unbundled.Basic` | Defines ordered monoids without bundling (e.g., `Preorder`, `AddLeftMono`, `AddLeftReflectLE`). |
| `Mathlib.Order.Lattice` | Provides lattice-theoretic infrastructure (e.g., `Antitone`, `LE`, `Preorder`, `PartialOrder`, `LinearOrder`). |

> **Note**: The file avoids assuming `CanonicallyOrderedAddCommMonoid` directly, instead using the more flexible `OrderedSub` mixin class. This allows reuse in contexts like `ℕ` (truncated subtraction) and additive groups (full subtraction).

--- 

Let me know if you'd like a dependency graph or a mapping to similar lemmas in `Mathlib.Algebra.Order.Group`.