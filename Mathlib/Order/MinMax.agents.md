### Technical Metadata Brief: `Mathlib.Order.LinearOrder.MaxMin`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `min`, `max` | `α → α → α` | Binary operations defining least upper bound (`max`) and greatest lower bound (`min`) in a `LinearOrder`. |
| `le_min_iff` | `c ≤ min a b ↔ c ≤ a ∧ c ≤ b` | Characterizes the order relation below a minimum. |
| `le_max_iff` | `a ≤ max b c ↔ a ≤ b ∨ a ≤ c` | Characterizes the order relation below a maximum. |
| `min_le_iff` / `max_le_iff` | `min a b ≤ c ↔ a ≤ c ∨ b ≤ c` / `max a b ≤ c ↔ a ≤ c ∧ b ≤ c` | Dual characterizations for above a min/max. |
| `lt_min_iff` / `lt_max_iff` | Strict-order analogues of above. | Used for strict inequality reasoning. |
| `min_lt_max` | `min a b < max a b ↔ a ≠ b` | Connects strict inequality of min/max with inequality of arguments. |
| `min_cases` / `max_cases` | `min a b = a ∧ a ≤ b ∨ min a b = b ∧ b < a` | Case analysis on which argument achieves the min/max; useful for automation (e.g., `linarith`). |
| `min_eq_iff` / `max_eq_iff` | Characterization of when `min a b = c` or `max a b = c`. | Enables rewriting equalities involving min/max. |
| `max_min_distrib_left/right`, `min_max_distrib_left/right` | Distributivity of `max` over `min` and vice versa. | Lattice-theoretic identities lifted to linear orders. |
| `min_le_max` | `min a b ≤ max a b` | Basic inequality between min and max of same arguments. |
| `min_idem`, `max_idem` | `Std.IdempotentOp min`, `Std.IdempotentOp max` | Idempotency instances for type class inference. |
| `instCommutativeMax`, `instAssociativeMin`, etc. | Instances for `Std.Commutative`, `Std.Associative`. | Enables use of `Std`-based simplifiers and rewriters. |
| `Monotone.map_max`, `Antitone.map_min`, etc. | Behavior of monotone/antitone functions over `max`/`min`. | Enables lifting order properties through functions. |
| `min_choice`, `max_choice` | `min a b = a ∨ min a b = b` | Disjunction form of case analysis; useful for decidability/automation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `le_`, `lt_`: Relational properties (`≤`, `<`) involving `min`/`max`.
  - `min_`, `max_`: General properties of `min`/`max`.
  - `dist_`, `idem`, `comm`, `assoc`: Algebraic properties (`distrib`, `idempotent`, `commutative`, `associative`).
- **Suffixes**:
  - `_left`, `_right`: Argument position specificity (e.g., `max_le_max_left`).
  - `_iff`: Biconditional characterizations.
  - `_cases`, `_choice`: Case analysis lemmas.
  - `_distrib_left`, `_distrib_right`: Distributivity direction.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: For rewriting using definitional equalities and lemmas like `min_eq_left`, `max_comm`, etc.
- `rw`: Rewriting with associativity, commutativity, and distributivity laws.
- `rcases` / `cases`: To split on `le_total a b` (linear order trichotomy).
- `exact`, `refine`: For direct proof construction.
- `trans`: For chaining inequalities (e.g., `h.trans_le`).
- `by_cases`: To split on `a ≤ b` or `a < b`.
- `aesop`: Likely used implicitly for automation in later proofs (not explicit here, but standard in Mathlib).
- `dual`, `dual_right`, `dual_left`: For dualizing lemmas across opposite orders (`αᵒᵈ`).

---

#### **4. Proof Logic**

- **Inductive/Case-based reasoning**: Most proofs rely on `le_total a b` (linearity), splitting into `a ≤ b` or `b ≤ a`, then simplifying using `max_eq_left/right`, `min_eq_left/right`.
- **Duality**: Many theorems are proven via duality (e.g., `max_cases` via `@min_cases αᵒᵈ`), leveraging `αᵒᵈ` (opposite order).
- **Algebraic manipulation**: Distributivity and associativity proofs use lattice-theoretic lemmas (`sup_inf_left`, etc.) imported from `Mathlib.Order.Lattice`.
- **Monotonicity arguments**: For `Monotone.map_max`, proofs split on `a ≤ b` or `b ≤ a`, then apply monotonicity to simplify `f(max a b)`.

---

#### **5. Imports**

- `Mathlib.Logic.OpClass`: Provides `Std.IdempotentOp`, `Std.Commutative`, `Std.Associative`, `LeftCommutative`, etc.
- `Mathlib.Order.Lattice`: Supplies foundational lattice-theoretic lemmas (`le_inf_iff`, `sup_le_iff`, `inf_lt_sup`, etc.) used to derive max/min properties.

---

#### **Domain-Specific AI Agent Notes**

- **Scope**: This module formalizes the algebraic and order-theoretic behavior of `min`/`max` in linearly ordered types — foundational for real analysis, optimization, and discrete math.
- **Automation potential**: Lemmas like `min_cases`, `max_cases`, and `min_choice` are designed for `linarith`/`aesop` integration.
- **Pattern reuse**: Duality via `αᵒᵈ` is a recurring pattern — AI agents should recognize dualizable lemmas.
- **Type class inference**: Instances like `min_idem`, `instCommutativeMax` help Lean infer algebraic structure automatically.

Let me know if you'd like a dependency graph or a tactic coverage report for this file.