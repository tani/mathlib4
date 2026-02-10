### Technical Metadata Brief: `Mathlib.Algebra.Ring.Divisibility.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `map_dvd_iff` | `f : F → f a ∣ f b ↔ a ∣ b` | Divisibility is preserved under multiplicative equivalences (`MulEquivClass`). |
| `MulEquiv.decompositionMonoid` | `[DecompositionMonoid β] → DecompositionMonoid α` | Transfers the `DecompositionMonoid` structure via a multiplicative equivalence. |
| `dvd_add` | `a ∣ b → a ∣ c → a ∣ b + c` | If `a` divides both `b` and `c`, then `a` divides their sum (in left-distributive additive semigroups). |
| `min_pow_dvd_add` | `c^m ∣ a → c^n ∣ b → c^(min m n) ∣ a + b` | Generalizes `dvd_add` to powers of a common base. |
| `Dvd.dvd.linear_comb` | `d ∣ x → d ∣ y → d ∣ a*x + b*y` | Divisibility is preserved under linear combinations (in non-unital commutative semirings). |
| `dvd_neg`, `neg_dvd` | `a ∣ -b ↔ a ∣ b`, `-a ∣ b ↔ a ∣ b` | Negation does not affect divisibility (in semigroups with distributive negation). |
| `dvd_sub` | `a ∣ b → a ∣ c → a ∣ b - c` | Divisibility is preserved under subtraction (in non-unital rings). |
| `dvd_add_left`, `dvd_add_right` | `a ∣ c → (a ∣ b + c ↔ a ∣ b)` | Adjusting sums by a divisible term preserves equivalence of divisibility. |
| `dvd_sub_left`, `dvd_sub_right` | Analogous to above for subtraction. | |
| `dvd_iff_dvd_of_dvd_sub` | `a ∣ b - c → (a ∣ b ↔ a ∣ c)` | If `a` divides the difference of `b` and `c`, then `a` divides one iff it divides the other. |
| `dvd_sub_comm` | `a ∣ b - c ↔ a ∣ c - b` | Divisibility of differences is symmetric. |
| `dvd_add_self_left/right`, `dvd_sub_self_left/right` | e.g., `a ∣ a + b ↔ a ∣ b` | Simplify divisibility when adding/subtracting the same element. |
| `dvd_mul_sub_mul` | `k ∣ a - b → k ∣ x - y → k ∣ a*x - b*y` | Divisibility of differences lifts to divisibility of products of differences (non-unital commutative rings). |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `dvd_`: divisibility lemmas (e.g., `dvd_add`, `dvd_sub`, `dvd_mul_sub_mul`)
  - `neg_`: behavior of negation w.r.t. divisibility (`neg_dvd`, `dvd_neg`)
  - `map_`: behavior under maps (`map_dvd_iff`)
- **Suffixes:**
  - `_left`, `_right`: indicate which argument is fixed in binary operations (`dvd_add_left`, `dvd_sub_right`)
  - `_self_left`, `_self_right`: special cases where the same term appears in both operands (`dvd_add_self_left`, `dvd_sub_self_right`)
- **Aliases:**
  - `Dvd.dvd.add`, `Dvd.dvd.sub`, `Dvd.dvd.of_neg_left`, etc., provide convenient forward/backward reasoning.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `erw`: rewriting using equalities and equivalences.
- `simp_rw`: simplification + rewriting (especially with `eq_symm_apply`, `apply_symm_apply`).
- `exact`, `refine`, `convert`: constructing proofs term-by-term.
- `simpa`: simplifying and discharging goals using assumptions.
- `cases'` / `obtain`: destructuring existential hypotheses (`Dvd.elim`).
- `ring`, `linarith`: not used here (file avoids heavy tactic imports).
- `iterate n`: repeated application of a tactic (used in `MulEquiv.decompositionMonoid`).

---

#### **4. Proof Logic**

- **Structure:** Modular sections based on algebraic hierarchy:
  - `Semigroup`, `DistribSemigroup`, `Semiring`, `NonUnitalCommSemiring`, `NonUnitalRing`, `Ring`, `NonUnitalCommRing`.
- **Common proof patterns:**
  - Use of `Dvd.elim` to unpack divisibility hypotheses.
  - Exploitation of equivalence properties (e.g., `MulEquivClass`, `Equiv.neg`) to transfer properties.
  - Rewriting using algebraic identities (`sub_eq_add_neg`, `left_distrib`, `mul_sub_left_distrib`).
  - Symmetry arguments via `dvd_neg`, `neg_dvd`, and `dvd_sub_comm`.
  - Induction is *not* used — all proofs are direct algebraic manipulations.

---

#### **5. Imports**

- `Mathlib.Algebra.Divisibility.Hom`: foundational divisibility lemmas for homomorphisms.
- `Mathlib.Algebra.Group.Equiv.Basic`: basic theory of equivalences (used for `Equiv.neg`, `MulEquivClass`).
- `Mathlib.Algebra.Ring.Defs`: core ring-theoretic definitions (`Semiring`, `Ring`, `NonUnitalRing`, etc.).

> **Note:** This file is intentionally minimal in imports to support low-level tactic usage (e.g., `linarith`). Heavier results are deferred to `Mathlib.Algebra.Ring.Divisibility.Lemmas`.

--- 

Let me know if you'd like a dependency graph or a summary of how these lemmas compose into larger results (e.g., GCD properties, Euclidean algorithm support).