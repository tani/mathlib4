Here's a structured technical metadata summary of the provided Lean 4 file, focusing on definitions, theorems, naming conventions, tactics, proof logic, and imports:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `fermatNumber` | `ℕ → ℕ`, `fermatNumber n := 2 ^ (2 ^ n) + 1` | Defines the *n*-th Fermat number. |
| `fermatNumber_zero`, `fermatNumber_one`, `fermatNumber_two` | `fermatNumber 0 = 3`, `= 5`, `= 17` | Base cases for Fermat numbers. |
| `fermatNumber_strictMono` | `StrictMono fermatNumber` | Fermat numbers are strictly increasing. |
| `prod_fermatNumber` | `∏ k ∈ range n, fermatNumber k = fermatNumber n - 2` | Product formula for Fermat numbers (Goldbach’s identity). |
| `coprime_fermatNumber_fermatNumber` | `m ≠ n → Coprime (fermatNumber m) (fermatNumber n)` | Distinct Fermat numbers are coprime (Goldbach’s theorem). |
| `pepin_primality` | `3 ^ (2 ^ (2 ^ n - 1)) ≡ -1 [MOD Fₙ] → Fₙ prime` | Pépin’s test for primality of Fermat numbers. |
| `pepin_primality'` | `3 ^ ((Fₙ - 1)/2) ≡ -1 [MOD Fₙ] → Fₙ prime` | Equivalent formulation of Pépin’s test using `(Fₙ - 1)/2`. |
| `pow_pow_add_primeFactors_one_lt` | `p ∣ a^(2^n) + 1`, `p ≠ 2`, `p` prime ⇒ `p = k·2^(n+1) + 1` | Structure of prime divisors of generalized Fermat numbers. |
| `fermat_primeFactors_one_lt` | `1 < n`, `p ∣ Fₙ`, `p` prime ⇒ `p = k·2^(n+2) + 1` | Prime divisors of Fermat numbers `Fₙ` (for `n > 1`) have this specific form. |
| `pow_of_pow_add_prime` | `a^n + 1` prime, `a > 1`, `n > 0` ⇒ `n = 2^m` | If `a^n + 1` is prime, then `n` must be a power of two. |
| `prime_of_pow_sub_one_prime` | `a^n - 1` prime, `n ≠ 1` ⇒ `a = 2` and `n` prime | Characterization of prime Mersenne numbers. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `fermatNumber_`: for lemmas about Fermat numbers (e.g., `fermatNumber_zero`, `fermatNumber_succ`).
  - `prod_`: for product-related identities (`prod_fermatNumber`).
  - `coprime_`: for coprimality results (`coprime_fermatNumber_fermatNumber`).
  - `pepin_`: for Pépin’s primality test variants (`pepin_primality`, `pepin_primality'`).
  - `pow_pow_add_primeFactors_`: for structure of prime factors of numbers of the form `a^(2^n) + 1`.
  - `fermat_primeFactors_`: for prime factor structure of Fermat numbers.

- **Suffixes**:
  - `_zero`, `_one`, `_two`: for base-case simplifications.
  - `_mono`, `_injective`: for monotonicity/injectivity properties.
  - `_le`, `_lt`: for inequality lemmas.
  - `_sq`, `_mul`: for algebraic rewritings involving squares or multiplication.

- **Aliases**:
  - Deprecated aliases like `strictMono_fermatNumber`, `fermatNumber_product` are marked with `@[deprecated]`.

---

### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions and lemmas (e.g., `fermatNumber`, `gcd_dvd_right`, `pow_mul`). |
| `simp` / `simp only` | Simplifying goals using `@[simp]` lemmas and local hypotheses. |
| `ring` / `ring_nf` | Proving polynomial identities (e.g., in `prod_fermatNumber`, `fermatNumber_succ`). |
| `omega` | Solving linear arithmetic goals (e.g., inequalities involving `2^n`). |
| `have`, `suffices`, `exact`, `refine` | Structuring proofs with intermediate claims. |
| `wlog` | Without loss of generality (used in `coprime_fermatNumber_fermatNumber`). |
| `mod_cast` | Casting between `ℕ` and `ZMod`. |
| `rwa` | `rw` + `assumption` (used in `fermat_primeFactors_one_lt`). |
| `norm_num` | Normalizing numeric expressions (e.g., modulo computations). |
| `apply`, `intro`, `intro h` | Standard natural deduction. |
| `contrapose!` | Contrapositive reasoning (e.g., in `prime_of_pow_sub_one_prime`). |

---

### **4. Proof Logic**

- **Inductive / Recursive Structure**:
  - `prod_fermatNumber` uses induction on `n`.
  - `fermatNumber_succ` and related lemmas rely on algebraic manipulation of exponentials.

- **Coprime Proof Strategy**:
  - Uses `wlog` to assume `m < n`, then leverages the product identity to show any common divisor divides `2`, but Fermat numbers are odd ⇒ gcd = 1.

- **Primality Proofs**:
  - `pepin_primality` applies `lucas_primality` (from `Mathlib.NumberTheory.LucasPrimality`) with `a = 3`, verifying the required congruence and order conditions.

- **Prime Factor Structure**:
  - Uses properties of the multiplicative group modulo `p`, especially `orderOf` and Lagrange’s theorem (`orderOf_dvd_card_sub_one`).
  - For Fermat numbers, leverages that `2` is a quadratic residue mod `p` (via `exists_sq_eq_two_iff`) to reduce to the generalized case.

- **Mersenne Primality**:
  - Uses factorization `a^n - 1 = (a^d - 1)(...)` for `d ∣ n`, and injectivity of `x ↦ 2^x - 1`.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.NumberTheory.LegendreSymbol.QuadraticReciprocity` | Provides tools for quadratic residues, Legendre symbol, and related number-theoretic facts (e.g., `exists_sq_eq_two_iff`). |
| `Mathlib.NumberTheory.LucasPrimality` | Supplies `lucas_primality` used in Pépin’s test. |

---

### **Summary**

This file formalizes foundational properties of **Fermat numbers**, including:
- Basic arithmetic and monotonicity,
- Coprimality (Goldbach’s theorem),
- Primality testing (Pépin’s test),
- Structure of prime divisors,
- Related results on generalized Fermat numbers and Mersenne numbers.

The proofs combine elementary number theory (divisibility, orders modulo `p`, quadratic residues), algebraic manipulation (exponent laws), and Lean’s `ZMod` arithmetic. The style is typical of modern Mathlib: modular, reusable, and heavily reliant on existing infrastructure (e.g., `lucas_primality`, `orderOf` lemmas).

Let me know if you'd like a dependency graph or a classification of lemmas by difficulty or usage.