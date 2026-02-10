Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `bipartiteBelow r s b` | `Finset α` | Elements of `s` related to `b` via `r`; models "edges into `b`" from `s`. |
| `bipartiteAbove r t a` | `Finset β` | Elements of `t` related to `a` via `r`; models "edges out of `a`" to `t`. |
| `prod_prod_bipartiteAbove_eq_prod_prod_bipartiteBelow` | `∏ a ∈ s, ∏ b ∈ t.bipartiteAbove r a, f a b = ∏ b ∈ t, ∏ a ∈ s.bipartiteBelow r b, f a b` | Swaps order of summation over bipartite edges (multiplicative version). |
| `sum_card_bipartiteAbove_eq_sum_card_bipartiteBelow` | `∑ a ∈ s, #t.bipartiteAbove r a = ∑ b ∈ t, #s.bipartiteBelow r b` | Core double-counting identity: total number of edges computed from both sides. |
| `card_nsmul_le_card_nsmul` | `(∀ a ∈ s, m ≤ #t.bipartiteAbove r a) → (∀ b ∈ t, #s.bipartiteBelow r b ≤ n) → #s • m ≤ #t • n` | Lower bound on edges from `s`-side vs upper bound from `t`-side ⇒ inequality. |
| `card_nsmul_le_card_nsmul'` | Symmetric variant using `swap r`. | Upper bound on `s`-side, lower bound on `t`-side. |
| `card_nsmul_lt_card_nsmul_of_lt_of_le` | Strict inequality variant (one strict, one non-strict). | Used to derive strict inequalities via double counting. |
| `card_mul_le_card_mul` | Special case of `card_nsmul_le_card_nsmul` with `•` = `*`. | Standard multiplicative double-counting inequality. |
| `card_mul_eq_card_mul` | Equality case: if all degrees equal `m` and `n`, then `#s * m = #t * n`. | Formalizes regular bipartite graph edge count. |
| `card_le_card_of_forall_subsingleton` | If each `a ∈ s` has at least one neighbor in `t`, and each `b ∈ t` has ≤1 neighbor in `s`, then `#s ≤ #t`. | Injectivity via bipartite graph with unique preimages. |
| `Fintype.card_le_card_of_leftTotal_unique` | If `r` is left-total and left-unique, then `card α ≤ card β`. | Formalizes injection `α ↪ β` via relation `r`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `bipartiteBelow`, `bipartiteAbove`: bipartite graph terminology.
  - `card_`: cardinality-based statements.
  - `prod_prod_`, `sum_card_`: product/sum over bipartite edge sets.
- **Suffixes**:
  - `_eq_`, `_le_`, `_lt_`: equality, non-strict inequality, strict inequality.
  - `'` (prime): symmetric or swapped variant (e.g., `card_nsmul_le_card_nsmul'`).
  - `_swap`: relation swapped (i.e., `swap r b a ↔ r a b`).
- **Quantifier patterns**:
  - `forall_subsingleton`, `leftTotal`, `rightUnique`: relational properties.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp_rw`: rewriting with definitional equalities (e.g., `mem_filter`, `prod_filter`).
- `rw`: standard rewriting.
- `norm_cast`: lifting natural numbers to ordered semirings.
- `calc`: chaining inequalities/equalities.
- `sum_lt_sum_of_nonempty`, `sum_le_card_nsmul`, `card_nsmul_le_sum`: order-theoretic lemmas.
- `cases` / `intro` / `exact`: basic proof structure.
- `classical`: for classical reasoning (e.g., in `card_le_card_of_forall_subsingleton`).
- `aesop`: likely used implicitly (not explicit, but common in Mathlib for automation).

---

### **4. Proof Logic**

- **Core strategy**: Double counting via `sum_card_bipartiteAbove_eq_sum_card_bipartiteBelow`.
- **Inequality proofs**:
  - Bound one side from below (e.g., `m ≤ #edges(a)`), sum over `s`.
  - Bound the other side from above (e.g., `#edges(b) ≤ n`), sum over `t`.
  - Use the equality of total edge counts to combine bounds.
- **Strict inequalities**:
  - Use `sum_lt_sum_of_nonempty` when one bound is strict and the set is nonempty.
- **Injectivity/surjectivity lemmas**:
  - Reduce to degree constraints (`#preimage ≤ 1`, `#image ≥ 1`) and apply `card_mul_le_card_mul`.
- **Induction**: Not used directly; relies on finite set arithmetic and order-theoretic lemmas.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Ring` | Sum/product over finite sets, ring structure. |
| `Mathlib.Algebra.Order.BigOperators.Group.Finset` | Ordered additive groups, sum inequalities. |
| `Mathlib.Algebra.Order.Ring.Nat` | Natural numbers as ordered semiring, `nsmul`, `card`. |

These imports indicate the file operates in the context of **ordered semirings**, with heavy use of **finite sum/product calculus** and **cardinality arithmetic**.

--- 

Let me know if you'd like a diagrammatic explanation of the double-counting argument or a formalization sketch of a specific theorem (e.g., Hall’s marriage theorem).