### Technical Metadata Brief: Bertrand’s Postulate in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `real_main_inequality` | `{x : ℝ} → 512 ≤ x → x * (2 * x) ^ √(2 * x) * 4 ^ (2 * x / 3) ≤ 4 ^ x` | Real-analytic inequality used to bound expressions involving logarithms and exponentials; key for asymptotic analysis. |
| `bertrand_main_inequality` | `{n : ℕ} → 512 ≤ n → n * (2 * n) ^ √(2 * n) * 4 ^ (2 * n / 3) ≤ 4 ^ n` | Natural-number version of `real_main_inequality`, cast to `ℝ` and used in contradiction argument. |
| `centralBinom_factorization_small` | `(n : ℕ) → 2 < n → (¬∃ p, p.Prime ∧ n < p ∧ p ≤ 2 * n) → centralBinom n = ∏ p ∈ Finset.range (2 * n / 3 + 1), p ^ (centralBinom n).factorization p` | Shows that if no prime lies in `(n, 2n]`, then all prime factors of `centralBinom n` are ≤ `2n/3 + 1`. |
| `centralBinom_le_of_no_bertrand_prime` | `(n : ℕ) → 2 < n → (¬∃ p, p.Prime ∧ n < p ∧ p ≤ 2 * n) → centralBinom n ≤ (2 * n) ^ √(2 * n) * 4 ^ (2 * n / 3)` | Upper bound on `centralBinom n` under assumption of no prime in `(n, 2n]`. Splits prime contributions by size ranges. |
| `exists_prime_lt_and_le_two_mul_eventually` | `(n : ℕ) → 512 ≤ n → ∃ p, p.Prime ∧ n < p ∧ p ≤ 2 * n` | Proves Bertrand’s postulate for all `n ≥ 512` via contradiction using the above inequalities. |
| `exists_prime_lt_and_le_two_mul` | `(n : ℕ) → n ≠ 0 → ∃ p, p.Prime ∧ n < p ∧ p ≤ 2 * n` | Full statement of **Bertrand’s Postulate** for all positive naturals. |
| `bertrand` | alias for `exists_prime_lt_and_le_two_mul` | Convenience alias. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `real_`: Real-analytic lemmas (e.g., `real_main_inequality`)
  - `bertrand_`: Core lemmas in the proof of Bertrand’s postulate (e.g., `bertrand_main_inequality`)
  - `centralBinom_`: Lemmas about central binomial coefficients and their factorizations
  - `exists_prime_lt_and_le_two_mul`: Main existential claim; reused with modifiers (`eventually`, `succ`)
- **Suffixes**:
  - `_small`: Indicates restriction to small primes (≤ `2n/3 + 1`)
  - `_le`: Upper bound lemmas (`centralBinom_le_of_no_bertrand_prime`)
  - `_factorization`: Relates to prime factorization structure
- **Other patterns**:
  - `no_prime`: Hypothesis naming for negated existence of primes in interval `(n, 2n]`
  - `n_large`: Assumption that `n` is large enough (≥ 512 or ≥ 2)

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `norm_num1` | Simplifies numeric expressions, especially with `√`, `rpow`, and inequalities over `ℝ` |
| `rw` / `conv` | Rewriting and focusing on subterms for transformation (e.g., `rpow_natCast`, `log_div`, `mul_div`) |
| `have` / `suffices` / `obtain` | Introducing intermediate claims or decomposing existential hypotheses |
| `apply`, `exact`, `refine` | Goal-directed proof construction, especially for inequalities and divisibility |
| `gcongr` | Congruence reasoning for inequalities involving monotone functions (e.g., `rpow`, `sqrt`) |
| `convert` / `ext` | Proving equality of functions or structures by extensionality |
| ` positivity` | Proving strict positivity of expressions (e.g., denominators, bases of powers) |
| `Finset.prod_filter_mul_prod_filter_not`, `Finset.prod_subset` | Structural manipulation of finite products over filtered sets (primes in ranges) |
| `run_tac` + `evalTactic` + `for ... do` | Metaprogramming tactic for small-case verification via explicit prime list |

---

#### **4. Proof Logic**

The proof follows a **divide-and-conquer strategy**:

1. **Asymptotic case (`n ≥ 512`)**:
   - Assume *no* prime in `(n, 2n]`.
   - Derive an upper bound on `centralBinom n` using factorization analysis:
     - Primes ≤ √(2n): each contributes ≤ `2n`
     - Primes in `(√(2n), 2n/3]`: total contribution ≤ `4^(2n/3)`
     - Larger primes: ruled out by assumption or known lemmas
   - Combine with known lower bound `4^n < n * centralBinom n` (`four_pow_lt_mul_centralBinom`)
   - Contradiction via `bertrand_main_inequality`, which shows `n * (2n)^√(2n) * 4^(2n/3) ≤ 4^n` fails for large `n`.

2. **Small case (`n < 512`)**:
   - Use a *finite covering list* of primes: `[317, 163, ..., 2]`
   - For each `n < 512`, find a prime `p` in the list such that `n < p ≤ 2n`
   - Implemented via a tactic loop (`run_tac` + `for ... do`) that applies `exists_prime_lt_and_le_two_mul_succ` repeatedly.

3. **Structure of key lemmas**:
   - Often proceed by:
     - Introducing hypothesis `no_prime : ¬∃ p, ...`
     - Using `centralBinom_factorization_small` to restrict factorization support
     - Bounding via `centralBinom_le_of_no_bertrand_prime`
     - Contradicting exponential lower bound

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Nat.Choose.Factorization` | Prime factorization of binomial coefficients (e.g., `factorization_centralBinom_of_two_mul_self_lt_three_mul`) |
| `Mathlib.NumberTheory.Primorial` | Bounds on primorials (`primorial_le_4_pow`) used in bounding product over primes |
| `Mathlib.Analysis.Convex.SpecificFunctions.Basic`, `.Deriv` | Convexity/concavity properties of `log`, `sqrt`, and `rpow` used in `real_main_inequality` proof |
| `Mathlib.Tactic.Normnum.Prime` | Efficient prime decidability and normalization for small numerals (used in tactic loop) |

**Scope**: This module formalizes a classical proof of **Bertrand’s Postulate** using:
- Analytic inequalities over `ℝ`
- Arithmetic properties of binomial coefficients
- Finite verification for small cases

It is a canonical example of *hybrid* (analytic + combinatorial + computational) formalization in Mathlib.

--- 

Let me know if you'd like a dependency graph or a breakdown of the `centralBinom_le_of_no_bertrand_prime` proof into sublemmas.