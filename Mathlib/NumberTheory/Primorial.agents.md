### Technical Metadata Brief: Primorial Function in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `primorial` | `def primorial (n : ℕ) : ℕ := ∏ p ∈ range (n + 1) with p.Prime, p` | Defines the primorial of `n` as the product of all primes ≤ `n`. |
| `primorial_pos` | `∀ n, 0 < n#` | Proves primorial is strictly positive. |
| `primorial_succ` | `∀ n, n ≠ 1 → Odd n → (n + 1)# = n#` | Shows that if `n` is odd and ≠ 1, then `(n+1)# = n#` (i.e., `n+1` is not prime). |
| `primorial_add` | `∀ m n, (m + n)# = m# * ∏ p ∈ Ico (m+1)^(m+n+1) with p.Prime, p` | Decomposes primorial over addition: product up to `m+n` = product up to `m` × product over `(m, m+n]`. |
| `primorial_add_dvd` | `∀ m n, n ≤ m → (m + n)# ∣ m# * choose (m + n) m` | Key divisibility lemma used in bounding primorial via binomial coefficients. |
| `primorial_add_le` | `∀ m n, n ≤ m → (m + n)# ≤ m# * choose (m + n) m` | Immediate corollary of `primorial_add_dvd` using positivity. |
| `primorial_le_4_pow` | `∀ n, n# ≤ 4 ^ n` | Main theorem: primorial grows at most exponentially with base 4. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `primorial_`: All definitions and lemmas related to primorial start with this prefix.
  - `prod_`, `mem_`, `filter_`, `Ico_`, `choose_`: Standard Mathlib naming for operations on finsets/products/binomial coefficients.

- **Suffixes**:
  - `_pos`: Positivity of a quantity.
  - `_succ`: Behavior under successor.
  - `_add`: Behavior under addition.
  - `_dvd`: Divisibility statement.
  - `_le`: Inequality (≤) version of a divisibility or equality.

- **Notation**:
  - `n#` is defined as local notation for `primorial n`.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (e.g., `primorial`, `range_succ`, `filter_insert`) and algebraic identities (e.g., `two_mul`, `choose_symm_add`). |
| `refine` / `exact` | Structuring proofs, especially with `prod_congr`, `mul_dvd_mul_left`, etc. |
| `cases'` | Case analysis on `n.even_or_odd`, `m.eq_zero_or_pos`, `Decidable.eq_or_ne`. |
| `induction' ... using Nat.strong_induction_on` | Strong induction for `primorial_le_4_pow`. |
| `calc` | Chain of equalities/inequalities in proofs like `primorial_succ`, `primorial_le_4_pow`. |
| `simp_rw` (implicit via `rw`) | Simplifying with rewrite rules (e.g., `mem_filter`, `mem_Ico`). |
| `exact fun h ↦ ...` | Constructing functions/proofs by lambda abstraction. |
| `decide` | Solving trivial arithmetic goals (e.g., base cases `n = 0`, `n = 1`). |
| `mul_le_mul'`, `pow_le_pow_of_le_right`, `le_of_dvd` | Ordered arithmetic reasoning. |

---

#### **4. Proof Logic**

- **Inductive Strategy**:
  - For `primorial_le_4_pow`, uses **strong induction** on `n`.
  - Splits into cases based on parity of `n` (`even_or_odd`), then further refines:
    - Even case: writes `n = 2m`, rewrites as `(2m+1)#`, applies `primorial_add_le`, then inductive hypothesis and known bound `choose (2m+1) m ≤ 4^m`.
    - Odd case: uses `primorial_succ` to reduce to `n# ≤ 4^n`, then applies inductive hypothesis and monotonicity of exponentiation.

- **Key Logical Flow**:
  - Decompose primorial via `primorial_add`.
  - Bound the “tail” product using binomial coefficient divisibility (`primorial_add_dvd`).
  - Use known inequality `choose (2m+1, m) ≤ 4^m`.
  - Combine with induction hypothesis and exponent laws.

- **Structural Pattern**:
  - `induction → case split → apply lemmas → combine bounds`.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Associated` | Provides tools for products over filtered sets (e.g., `prod_filter`, `prod_congr`). |
| `Mathlib.Algebra.Order.BigOperators.Ring.Finset` | Enables reasoning about products/sums in ordered semirings (e.g., `prod_pos`, `mul_le_mul'`). |
| `Mathlib.Algebra.Order.Ring.Abs` | For absolute value properties (not directly used here, but part of the ordered ring infrastructure). |
| `Mathlib.Data.Nat.Choose.Sum` | Contains binomial coefficient identities (e.g., `choose_symm_add`, `two_mul`). |
| `Mathlib.Data.Nat.Choose.Dvd` | Contains divisibility lemmas for binomial coefficients (e.g., `dvd_choose_add`). |
| `Mathlib.Data.Nat.Prime.Basic` | Basic prime theory: `Prime`, `mem_filter`, `prime.pos`, etc. |

---

### Summary

This file formalizes the **primorial function** and proves a classical upper bound:  
> **Theorem**: For all `n ∈ ℕ`, `n# ≤ 4ⁿ`.

It leverages:
- Filtered products over primes (`∏ p ∈ range (n+1) with p.Prime, p`)
- Structural properties of primes (parity, primality)
- Binomial coefficient divisibility and growth bounds
- Strong induction with case analysis on parity

The formalization is clean, modular, and follows Lean/Mathlib conventions closely.