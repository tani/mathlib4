**Technical Metadata Brief: `WithBot.Succ` (Algebraic Properties of Successor on `WithBot`)**

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `succ_natCast` | `succ (n : WithBot α) = n + 1` | Relates the successor function on `WithBot α` to addition by 1 for natural numbers embedded via `WithBot.coe_natCast`. |
| `succ_zero` | `succ (0 : WithBot α) = 1` | Special case of `succ_natCast` for `n = 0`. |
| `succ_one` | `succ (1 : WithBot α) = 2` | Special case of `succ_natCast` for `n = 1`, using `one_add_one_eq_two`. |
| `succ_ofNat` | `succ (OfNat.ofNat n : WithBot α) = OfNat.ofNat n + 1` (under `[n.AtLeastTwo]`) | Extends `succ_natCast` to `OfNat.ofNat n` (i.e., numerals like `2`, `3`, …), requiring `n ≥ 2` to avoid ambiguity with `0`/`1`. |

**Assumptions on `α`** (implicit in `variable`):
- `[Preorder α]`: Provides a preorder structure.
- `[OrderBot α]`: Ensures a bottom element (`⊥`) exists, enabling `WithBot α`.
- `[AddMonoidWithOne α]`: Gives an additive monoid with `0` and `1`.
- `[SuccAddOrder α]`: Ensures `succ` behaves compatibly with addition: `succ a = a + 1`.

---

### **2. Naming Conventions**

- **Prefix `succ_`**: Used for lemmas about the successor function (`succ_zero`, `succ_one`, `succ_natCast`, `succ_ofNat`).
- **`natCast` suffix**: Indicates embedding of natural numbers via `WithBot.coe_natCast`.
- **`OfNat.ofNat` / `no_index`**: Used for numeral syntax (`2`, `3`, …); `no_index` suppresses typeclass inference for `OfNat.ofNat`.
- **`[n.AtLeastTwo]`**: A typeclass constraint ensuring `n ≥ 2`, avoiding overlap with `0`/`1`.

---

### **3. Tactic Stack**

- `rw`: Rewriting using equalities (e.g., `← WithBot.coe_natCast`, `succ_coe`, `Order.succ_eq_add_one`).
- `simpa`: Simplifies using a lemma (`using succ_natCast 0`) and discharges goals via simplifier.
- `simp_rw`: Not used here, but `simpa` is preferred for targeted simplification + rewriting.
- Implicit use of `norm_num`/`ring` via `simpa` and `Order.succ_eq_add_one`.

---

### **4. Proof Logic**

- **Strategy**: Reduce to known identities about `succ` and `natCast`.
  - `succ_natCast`: Uses `← WithBot.coe_natCast` to embed `n`, then applies `succ_coe` and `Order.succ_eq_add_one`.
  - `succ_zero`/`succ_one`: Immediate specializations of `succ_natCast`.
  - `succ_ofNat`: Uses `succ_natCast n`, but requires `n ≥ 2` to ensure `OfNat.ofNat n` matches `↑n` (i.e., avoids ambiguity in `0`/`1` numeral interpretation).

- **No induction** needed — relies on algebraic properties and definitional equalities.

---

### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.Monoid.Unbundled.WithTop` | Provides `WithBot` and related order/algebra structures (via `WithTop` duals or shared infrastructure). |
| `Mathlib.Algebra.Order.SuccPred` | Defines `SuccAddOrder`, `Order.succ`, and compatibility with addition. |
| `Mathlib.Order.SuccPred.WithBot` | Supplies `WithBot`-specific order-theoretic facts (e.g., `succ_coe`, `Order.succ_eq_add_one`). |

**Domain**: Ordered algebraic structures with bottom element, focusing on successor behavior in `WithBot α`.

--- 

**Summary**: This module formalizes that on `WithBot α`, the successor of a natural number (or numeral ≥2) coincides with addition by 1, leveraging compatibility of `succ` with addition (`SuccAddOrder`). Proofs are direct, using rewriting and simplification.