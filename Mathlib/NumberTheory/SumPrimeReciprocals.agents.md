### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `roughNumbersUpTo` | `ℕ → ℕ → Finset ℕ` | Set of *k*-rough numbers ≤ *N* (numbers with no prime factors < *k*) |
| `smoothNumbersUpTo` | `ℕ → ℕ → Finset ℕ` | Set of *k*-smooth numbers ≤ *N* (numbers with all prime factors ≤ *k*) |
| `primesBelow` | `ℕ → Finset ℕ` | Finite set of primes < *n* |
| `one_half_le_sum_primes_ge_one_div` | `∀ k : ℕ, 1 / 2 ≤ ∑ p ∈ (4 ^ (k.primesBelow.card + 1)).succ.primesBelow \ k.primesBelow, (1 / p : ℝ)` | Lower bound on partial sums over reciprocals of primes in a dyadic range |
| `not_summable_one_div_on_primes` | `¬ Summable (indicator {p | p.Prime} (fun n ↦ (1 / n : ℝ)))` | Divergence of ∑_{p prime} 1/p (as sub-sum of harmonic series) |
| `Nat.Primes.not_summable_one_div` | `¬ Summable (fun p : Nat.Primes ↦ (1 / p : ℝ))` | Divergence of ∑_{p ∈ Nat.Primes} 1/p (sum over type-theoretic primes) |
| `Nat.Primes.summable_rpow` | `Summable (fun p : Nat.Primes ↦ (p : ℝ) ^ r) ↔ r < -1` | Convergence criterion for ∑_{p prime} pʳ: converges iff *r* < −1 |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `roughNumbersUpTo`, `smoothNumbersUpTo`: denote finite sets of numbers with bounded prime factors.
  - `primesBelow`: primes less than a bound.
  - `indicator`: used for embedding predicates into functions (e.g., filtering by primality).
- **Suffixes**:
  - `_card_le`: cardinality upper bounds.
  - `_le`: inequality lemmas (often with numeric constants like `one_half`).
  - `_div`: reciprocals (e.g., `one_div`, `cast_div_le`).
- **Logical structure**:
  - `not_summable_*`: divergence results.
  - `summable_*`: convergence results (often with `iff` statements).
  - `*_subtype`: relate sums over subtype (e.g., `Nat.Primes`) to indicator functions.

#### 3. **Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with definitional equalities (e.g., casting, indicator simplifications) |
| `exact_mod_cast` | Handles coercion between `ℕ` and `ℝ` in inequalities |
| `convert` | Aligns goals modulo definitional equality or coercions |
| `ring` | Simplifies polynomial expressions over `ℝ` |
| `norm_num` | Normalizes numeric literals (e.g., `4 = 2 ^ 2`) |
| ` positivity` | Proves positivity of expressions (e.g., denominators, powers) |
| `rw [← mul_assoc, ← pow_right_comm]` | Algebraic reorganization of products and powers |
| `Finset.sum_le_sum` | Compares finite sums termwise |
| `mem_primesBelow`, `prime_of_mem_primesBelow` | Extract primality from membership in `primesBelow` |

#### 4. **Proof Logic**

- **Structure**:
  - **Indirect proof by contradiction** for divergence (`not_summable_*`): assume summability, derive a contradiction via lower bounds on partial sums.
  - **Key lemma**: `one_half_le_sum_primes_ge_one_div` provides a uniform lower bound on sums over blocks of primes (dyadic in nature), used to contradict the vanishing tail condition of summable series.
  - **Cardinality estimates**:
    - Decompose `{1, ..., N}` into *k*-smooth and *k*-rough numbers.
    - Bound smooth numbers using known estimates (`smoothNumbersUpTo_card_le`).
    - Bound rough numbers using `roughNumbersUpTo_card_le'`, which introduces the sum over `1/p`.
  - **Reduction to known results**:
    - `Nat.Primes.summable_rpow` reduces to `Real.summable_nat_rpow` for *r* < −1.
    - For *r* ≥ −1, compares `pʳ ≥ 1/p` (since *p* ≥ 2), reducing to divergence of ∑ 1/p.

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.NumberTheory.SmoothNumbers` | Core definitions: `smoothNumbersUpTo`, `roughNumbersUpTo`, cardinality lemmas |
| `Mathlib.Analysis.PSeries` | Convergence of ∑ 1/nʳ and ∑ nʳ; used in `Real.summable_nat_rpow` for `r < -1` |
| `Mathlib.Analysis.RCLike.Basic` | Implicitly via `cast_div_le`, used for real-closed field arithmetic and coercions |

---

This module formalizes a classical analytic number theory result (Erdős’s proof of divergence of ∑ 1/p) using finite combinatorial estimates and real analysis, with heavy reliance on coercions between `ℕ` and `ℝ`, and careful bookkeeping of finite sums over primes.