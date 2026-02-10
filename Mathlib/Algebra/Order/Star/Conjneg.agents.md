**Technical Metadata Brief**

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `conjneg_nonneg` | `0 ≤ conjneg f ↔ 0 ≤ f` | Establishes that the *conjugation-negation* operator preserves non-negativity in an ordered setting. |
| `conjneg_pos` | `0 < conjneg f ↔ 0 < f` | Shows strict positivity is preserved under `conjneg`, using equivalence with `lt_iff_le_and_ne` and simplifications. |
| `conjneg_nonpos` | `conjneg f ≤ 0 ↔ f ≤ 0` | Dually, shows non-positivity is preserved, via rewriting with `neg_nonneg` and `conjneg_neg`. |
| `conjneg_neg'` | `conjneg f < 0 ↔ f < 0` | Proves strict negativity preservation, using `neg_pos` and prior lemmas. |

> **Note**: `conjneg f` is defined as `starRingEnd ∘ neg`, i.e., `conjneg f x = starRingEnd (-f x)`. It appears in `Mathlib.Algebra.Star.Conjneg`, and is used here to study order-theoretic behavior under the star operation combined with negation.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `conjneg_`: Indicates the function under discussion (`conjneg f`).
- **Suffixes**:
  - `_nonneg`, `_pos`, `_nonpos`, `_neg'`: Standard Lean order-theoretic suffixes for positivity/non-negativity/non-positivity/negativity lemmas.
  - `_neg'` (with prime) often denotes a variant of a previous lemma (`conjneg_neg` would be `conjneg ∘ neg = neg ∘ conjneg` or similar; here `conjneg_neg'` is a strict inequality version).
- **Pattern**: `conjneg_[order_property]` — consistent with Lean’s `Mathlib` style.

---

### **3. Tactic Stack**

- `simp` / `simp_rw`: Heavily used to rewrite using `lt_iff_le_and_ne`, `ne_comm`, and previously proven `conjneg_*` lemmas.
- `aesop`: Not present in this snippet, but likely used in related files (not shown).
- `rw` (via `simp_rw`): For rewriting with equivalences like `← neg_nonneg`, `← conjneg_neg`.
- `constructor` / `intro` / `apply`: Implicit in `simp`-based proofs; no explicit tactic stack beyond `simp`/`simp_rw`.

---

### **4. Proof Logic**

- **Strategy**: All proofs are *equational reasoning* via simplification and rewriting.
- **Pattern**:
  1. Use `simp_rw` to unfold definitions (`lt_iff_le_and_ne`, `ne_comm`, etc.).
  2. Apply known lemmas (`conjneg_nonneg`, `conjneg_neg`, etc.).
  3. Use algebraic equivalences (e.g., `← neg_nonneg`) to shift between `f` and `conjneg f`.
- **No induction or case analysis** appears in this file — proofs are purely algebraic/simplificational.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.Pi` | Provides order-theoretic infrastructure for function spaces (`G → R`), especially pointwise order. |
| `Mathlib.Algebra.Order.Star.Basic` | Defines `StarOrderedRing`, `starRingEnd`, and basic compatibility of star with order. |
| `Mathlib.Algebra.Star.Conjneg` | Defines `conjneg` as `starRingEnd ∘ neg`, and basic algebraic properties. |

> **Domain**: This file sits at the intersection of **ordered algebra**, **star rings**, and **function spaces** — specifically analyzing how the *conjugation-negation* map interacts with the order structure on `R^G`.

--- 

Let me know if you'd like a formalized summary or a diagram of dependencies.