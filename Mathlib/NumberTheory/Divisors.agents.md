### Technical Metadata Brief: `Nat.divisors` Module (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `divisors n` | `Finset ℕ` | Set of positive divisors of `n`, defined as `{d ∈ Ico 1 (n+1) | d ∣ n}`; `divisors 0 = ∅`. |
| `properDivisors n` | `Finset ℕ` | Divisors of `n` excluding `n` itself: `{d ∈ Ico 1 n | d ∣ n}`; `properDivisors 0 = ∅`. |
| `divisorsAntidiagonal n` | `Finset (ℕ × ℕ)` | Pairs `(x, y)` with `x * y = n`; `divisorsAntidiagonal 0 = ∅`. |
| `Perfect n` | `Prop` | `n` is perfect iff `∑_{d ∈ properDivisors n} d = n ∧ 0 < n`. |
| `mem_divisors` | `n ∈ divisors m ↔ n ∣ m ∧ m ≠ 0` | Membership characterization for `divisors`. |
| `mem_properDivisors` | `n ∈ properDivisors m ↔ n ∣ m ∧ n < m` | Membership characterization for `properDivisors`. |
| `mem_divisorsAntidiagonal` | `x ∈ divisorsAntidiagonal n ↔ x.fst * x.snd = n ∧ n ≠ 0` | Membership for antidiagonal pairs. |
| `sum_divisors_eq_sum_properDivisors_add_self` | `∑_{d ∈ divisors n} d = ∑_{d ∈ properDivisors n} d + n` | Relates full and proper divisor sums. |
| `perfect_iff_sum_divisors_eq_two_mul` | `Perfect n ↔ ∑_{d ∈ divisors n} d = 2 * n` (for `n > 0`) | Equivalent condition for perfection. |
| `divisors_prime_pow` | `divisors (p^k) = range (k+1).map (p^·)` | Structure of divisors of prime powers. |
| `Prime.divisors` | `divisors p = {1, p}` for prime `p` | Divisors of a prime. |
| `Prime.properDivisors` | `properDivisors p = {1}` for prime `p` | Proper divisors of a prime. |
| `divisors_injective` | `Function.Injective divisors` | Injectivity of `divisors`. |
| `prod_divisorsAntidiagonal` | `∏_{(x,y) ∈ antidiag n} f x y = ∏_{d ∣ n} f d (n/d)` | Product over antidiagonal ↔ product over divisors. |
| `primeFactors_eq_to_filter_divisors_prime` | `n.primeFactors = {p ∈ divisors n | p.Prime}` | Prime factors as filtered divisors. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `divisors_`, `properDivisors_`, `divisorsAntidiagonal_`: Module-specific prefixes.
  - `mem_`: For membership lemmas (`mem_divisors`, `mem_properDivisors`, etc.).
  - `prod_`, `sum_`: For product/sum over sets (`prod_divisors`, `sum_properDivisors`).
  - `filter_`: For lemmas involving filtering (`filter_dvd_eq_divisors`, `divisors_filter_dvd_of_dvd`).
  - `image_`, `map_`: For image/map lemmas (`image_fst_divisorsAntidiagonal`, `map_div_right_divisors`).
  - `swap_`: For symmetry under `Prod.swap` (`swap_mem_divisorsAntidiagonal`).

- **Suffixes**:
  - `_eq_empty`: For characterizations of emptiness (`divisors_eq_empty`, `properDivisors_eq_empty`).
  - `_iff_`: For biconditional characterizations (`mem_divisors`, `nonempty_divisors`, `perfect_iff_sum_properDivisors`).
  - `_of_mem_`: For consequences of membership (`dvd_of_mem_divisors`, `ne_zero_of_mem_divisorsAntidiagonal`).
  - `_subset_`: For subset relations (`divisors_subset_of_dvd`, `properDivisors_subset_divisors`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Dominant tactic; simplifies goals using lemmas like `mem_filter`, `mem_Ico`, `mem_range`, `dvd_refl`, etc. |
| `rw` | Rewriting with definitions and lemmas (e.g., `mem_divisors`, `divisors`, `properDivisors`). |
| `ext` | Extensionality for set equality (e.g., proving `A = B` by `ext x; ...`). |
| `rcases` / `cases'` | Case analysis on `eq_or_ne n 0`, `Decidable.eq_or_ne`, existential quantifiers. |
| `exact` / `apply` | Direct proof steps, especially for `dvd_trans`, `lt_of_le_of_lt`, etc. |
| `constructor` | Splitting biconditionals or conjunctions. |
| `rwa` | Rewrite + assumption (e.g., `rwa [mul_comm]`). |
| `convert` / `congr_arg` | For proving equality of structured terms (e.g., pairs). |
| `aesop` | Not used here — this file is heavily manual and definition-driven. |
| `ring` | Not used — arithmetic is handled via `Nat`-specific lemmas. |

---

#### **4. Proof Logic**

- **Structure**:
  - **Case analysis on `n = 0` or `n ≠ 0`** is pervasive (e.g., `rcases eq_or_ne n 0`).
  - **Membership lemmas** are proven via `ext; simp only [...]`.
  - **Subset proofs** use `Finset.subset_iff.2` + `intro x hx; ...`.
  - **Injectivity/surjectivity** proofs rely on `Finset.map_injective`, `left_inverse`, etc.
  - **Induction** is *not* used — proofs are mostly algebraic and set-theoretic.
  - **Symmetry arguments** (e.g., for `divisorsAntidiagonal`) use `swap_mem_divisorsAntidiagonal` and `Equiv.prodComm`.

- **Typical Flow**:
  1. Unfold definitions (`divisors`, `properDivisors`, etc.).
  2. Simplify membership conditions using `mem_filter`, `mem_Ico`, `mem_range`.
  3. Apply `dvd_trans`, `lt_of_le_of_lt`, `mul_ne_zero_iff`, etc.
  4. Use `Finset` lemmas (`sum_cons`, `prod_map`, `card_Ico`, etc.).
  5. Conclude via `apply`, `exact`, or `rw` with biconditional lemmas.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.BigOperators.Group.Finset` | Provides `sum`, `prod`, `Finset` big operator theory. |
| `Mathlib.Algebra.Order.Ring.Nat` | `Nat`-specific order and ring properties (e.g., `dvd`, `lt`, `le`). |
| `Mathlib.Data.Nat.PrimeFin` | Prime numbers and related lemmas (`prime_def`, `dvd_prime`, etc.). |
| `Mathlib.Order.Interval.Finset.Nat` | Interval notation (`Ico`, `range`, `Finset.Ico`). |

> **Scope**: This module formalizes elementary number theory over `ℕ`, especially divisor structure, perfect numbers, and Dirichlet convolution groundwork. It avoids analysis or topology — purely algebraic/combinatorial.

--- 

Let me know if you'd like a dependency graph or a summary of how this module integrates with Dirichlet convolution (`DirichletConvolution`).