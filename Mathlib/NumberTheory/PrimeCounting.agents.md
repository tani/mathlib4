### Technical Metadata Brief: Prime Counting Function in Lean 4 (`Mathlib.NumberTheory.PrimeCounting`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `primeCounting'` | `ℕ → ℕ` | Counts primes **strictly less than** input (`π'(n) = #{p prime | p < n}`) |
| `primeCounting` | `ℕ → ℕ` | Standard prime counting function (`π(n) = #{p prime | p ≤ n}`), defined as `π'(n+1)` |
| `π`, `π'` | Notation scopes | Standard mathematical notation for `primeCounting`, `primeCounting'` under `open scoped Nat.Prime` |
| `primeCounting_sub_one` | `π (n - 1) = π' n` | Relates `π` and `π'` via offset by 1 |
| `monotone_primeCounting'` | `Monotone π'` | `π'` is non-decreasing |
| `monotone_primeCounting` | `Monotone π` | `π` is non-decreasing (follows from monotonicity of `π'`) |
| `primeCounting'_nth_eq` | `π' (nth Prime n) = n` | `π'` inverts the `n`-th prime function |
| `add_two_le_nth_prime` | `n + 2 ≤ nth Prime n` | Lower bound on the `n`-th prime |
| `surjective_primeCounting'` | `Function.Surjective π'` | Every natural number is hit by `π'` (since infinitely many primes) |
| `surjective_primeCounting` | `Function.Surjective π` | Surjectivity of `π` (derived from `π'`) |
| `tendsto_primeCounting'` | `Tendsto π' atTop atTop` | `π'(n) → ∞` as `n → ∞` (i.e., unbounded growth) |
| `tendsto_primeCounting` | `Tendsto π atTop atTop` | Same for `π` |
| `prime_nth_prime` | `Prime (nth Prime n)` | The `n`-th prime is indeed prime |
| `primeCounting'_eq_zero_iff` | `π'(n) = 0 ↔ n ≤ 2` | Characterizes when `π'` vanishes |
| `primeCounting_eq_zero_iff` | `π(n) = 0 ↔ n ≤ 1` | Characterizes when `π` vanishes |
| `primesBelow_card_eq_primeCounting'` | `#primesBelow n = π'(n)` | Connects `primesBelow` finset cardinality to `π'` |
| `primeCounting'_add_le` | `π'(k + n) ≤ π' k + φ(a) * (n / a + 1)` | Key upper bound using Euler’s totient: only `φ(a)/a` fraction of numbers in interval can be prime |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `primeCounting'` / `primeCounting`: Core definitions; `'` variant avoids off-by-one.
  - `nth Prime n`: Standard for indexing elements of a set (`nth` from `Mathlib.Data.Nat.Prime.Nth`).
  - `primesBelow`: Finset of primes `< n`.
  - `Ico k (k + n)`: Interval `[k, k+n)` — used in `primeCounting'_add_le`.
  - `coprime`, `totient`: Number-theoretic predicates/functions from `Mathlib.NumberTheory.Totient`.

- **Notation**:
  - `π`, `π'`: Scoped notations under `Nat.Prime`, enabled via `open scoped Nat.Prime`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp` | Rewriting definitions (`primeCounting`, `primeCounting'`, `primesBelow`, `count_eq_card_filter_range`) |
| `cases` | Structural induction on `n` (e.g., `primeCounting_sub_one`) |
| `exact`, `refine`, `apply` | Direct proof steps, especially with inequalities |
| `calc` | Chain of inequalities in `primeCounting'_add_le` |
| `filter_union`, `Ico_union_Ico_eq_Ico` | Set-theoretic simplifications |
| `card_union_le`, `card_le_card`, `add_le_add_left` | Cardinality and inequality reasoning |
| `ext` | Extensionality for function equality (e.g., surjectivity proof) |
| `tendsto_atTop_atTop_of_monotone'` | Monotone → unbounded ⇒ tends to ∞ |
| `nth_mem_of_infinite`, `infinite_setOf_prime` | Leveraging infinitude of primes |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Definitional simplification**: Many lemmas (`primeCounting'_eq_zero_iff`, `primesBelow_card_eq_primeCounting'`) reduce to `count_eq_card_filter_range` and `primesBelow` definition.
  - **Monotonicity**: Follows from `count_monotone` and composition with monotone functions (`add_const`, `id`).
  - **Inversion properties** (`primeCounting'_nth_eq`, `surjective_primeCounting'`): Use `count_nth_of_infinite` and `infinite_setOf_prime`.
  - **Growth rate** (`tendsto_primeCounting'`): Combine monotonicity + surjectivity ⇒ unbounded ⇒ tends to ∞.
  - **Upper bound** (`primeCounting'_add_le`):
    1. Split interval `[0, k+n)` into `[0, k)` and `[k, k+n)`.
    2. Bound primes in `[k, k+n)` by numbers coprime to `a` (since primes > `a` must be coprime to `a`).
    3. Use `Ico_filter_coprime_le` to bound coprime count by `φ(a) * (n/a + 1)`.

- **Key insight**: Primes > `a` must be coprime to `a`, so density of primes ≤ density of coprimes = `φ(a)/a`.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Data.Nat.Prime.Nth` | Defines `nth Prime n`, infinitude of primes, `nth_mem`, `nth_strictMono` |
| `Mathlib.Data.Nat.Totient` | Euler’s totient `φ`, `coprime`, `Ico_filter_coprime_le` |
| `Mathlib.NumberTheory.SmoothNumbers` | Context for density arguments (though not directly used here) |
| `Mathlib.Order.Filter.AtTopBot` | Filter theory: `Tendsto`, `atTop`, monotone convergence lemmas |

---

### Summary

This module formalizes the **prime counting function** `π(n)` and its variant `π'(n)`, establishing foundational properties: monotonicity, surjectivity, asymptotic growth, and a **totient-based upper bound** on `π'`. The proofs rely heavily on:
- Counting functions over finite sets (`count`, `card`, `filter`)
- Properties of primes (`infinite_setOf_prime`, `nth Prime n`)
- Number-theoretic tools (`coprime`, `totient`, `Ico_filter_coprime_le`)

The formalization is clean, modular, and aligns with standard mathematical practice, using Lean’s scoped notation for readability (`π`, `π'`).