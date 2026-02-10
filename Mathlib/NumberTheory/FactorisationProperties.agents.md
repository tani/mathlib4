### Technical Metadata Brief: `Nat` Factorisation Properties (Abundant, Deficient, Pseudoperfect, Weird Numbers)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Abundant n` | `Prop` | `n < ∑_{d ∈ properDivisors n} d` |
| `Deficient n` | `Prop` | `∑_{d ∈ properDivisors n} d < n` |
| `Pseudoperfect n` | `Prop` | `0 < n ∧ ∃ s ⊆ properDivisors n, ∑ s = n` |
| `Weird n` | `Prop` | `Abundant n ∧ ¬Pseudoperfect n` |
| `deficient_or_perfect_or_abundant` | `0 ≠ n → Deficient n ∨ Abundant n ∨ Perfect n` | Trichotomy of classification for positive naturals |
| `Prime.deficient` | `Prime n → Deficient n` | All primes are deficient |
| `Prime.deficient_pow` | `Prime n → Deficient (n ^ m)` | Prime powers are deficient |
| `infinite_deficient` | `{n | Deficient n}.Infinite` | Infinitely many deficient numbers |
| `infinite_even_deficient`, `infinite_odd_deficient` | `{n | Even n ∧ Deficient n}.Infinite`, `{n | Odd n ∧ Deficient n}.Infinite` | Infinite subclasses of deficient numbers |
| `not_pseudoperfect_iff_forall` | `¬Pseudoperfect n ↔ n = 0 ∨ ∀ s ⊆ properDivisors n, ∑ s ≠ n` | Logical equivalence for negation of pseudoperfectness |
| `deficient_iff_not_abundant_and_not_perfect` | `n ≠ 0 → (Deficient n ↔ ¬Abundant n ∧ ¬Perfect n)` | Characterization of deficiency via exclusivity |
| `Perfect.pseudoperfect` | `Perfect n → Pseudoperfect n` | Perfect numbers are pseudoperfect (via full set of proper divisors) |
| `Prime.not_abundant`, `Prime.not_weird`, `Prime.not_pseudoperfect`, `Prime.not_perfect` | Various negations | Primes cannot be abundant, weird, pseudoperfect, or perfect |

---

#### **2. Naming Conventions**

- **Predicate naming**:  
  - Prefix `is_` is *not* used; instead, direct adjectives: `Abundant`, `Deficient`, `Pseudoperfect`, `Weird`, `Perfect`.
  - `Prime` and `IsPrimePow` are imported from `Mathlib.Algebra.IsPrimePow`.

- **Helper lemmas**:  
  - `not_*`: e.g., `not_pseudoperfect_iff_forall`, `not_abundant`, `not_weird`, `not_perfect`, `not_pseudoperfect`.
  - `*_iff_*`: e.g., `deficient_iff_not_abundant_and_not_perfect`, `perfect_iff_not_abundant_and_not_deficient`, `abundant_iff_not_perfect_and_not_deficient`.
  - `infinite_*`: e.g., `infinite_deficient`, `infinite_even_deficient`, `infinite_odd_deficient`.

- **Structure**:  
  - Theorems often follow pattern: `Type.property` (e.g., `Prime.deficient_pow`, `IsPrimePow.deficient`).

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|-----------------|---------|
| `rw` | High | Rewriting definitions (`Abundant`, `properDivisors`, `sum_image`, `geomSum_eq`) |
| `norm_num` | Medium | Simplifying numeric sums and comparisons (e.g., `abundant_twelve`, `weird_seventy`) |
| `fin_cases` | Medium | Exhaustive case analysis on finite sets (e.g., subsets of `{1,2,5,7,10,14,35}`) |
| `decide` | Medium | Solving decidable propositions after case analysis (e.g., verifying no subset sums to 70) |
| `simp only` / `simp_rw` | High | Simplifying with precise lemmas (e.g., `sum_empty`, `sum_singleton`, `mem_powerset`) |
| `omega` | High | Solving linear arithmetic goals over `ℕ` (e.g., trichotomy, inequalities) |
| `apply`, `intro`, `exact`, `constructor` | Medium | Standard proof structure |
| `apply_subset_antisymm` | Low | Proving set equality via double inclusion (e.g., `properDivisors (n^m) = image (n^·) (range m)`) |
| `linarith` | Medium | Linear arithmetic after simplifications (e.g., `Prime.not_pseudoperfect`) |

---

#### **4. Proof Logic & Strategy**

- **Classification trichotomy**:  
  Uses `omega` on linear inequalities involving `∑ properDivisors n`, `n`, and `2 * n` (via `Perfect` definition).

- **Prime-related results**:  
  - Leverages `sum_properDivisors_eq_one_iff_prime` to show primes have sum of proper divisors = 1 ⇒ deficient.
  - For `Prime.deficient_pow`, key steps:
    1. Identify `properDivisors (n^m) = {n^i | i < m}`.
    2. Use geometric sum formula: `∑_{i=0}^{m-1} n^i = (n^m - 1)/(n - 1)`.
    3. Bound this sum above by `n^m - 1 < n^m`.

- **Weirdness of 70**:  
  - Explicitly computes `properDivisors 70`.
  - Uses `fin_cases` on powerset (128 subsets) + `decide` to verify no subset sums to 70.
  - Confirms abundance via direct sum.

- **Infinite families**:  
  - Uses `exists_infinite_primes` to construct arbitrarily large primes ⇒ deficient.
  - For even/odd infinite subclasses: powers of 2 (even) and large odd primes (odd).

- **Logical equivalences**:  
  - `omega`-based reasoning after unfolding definitions (e.g., `Deficient n ↔ ∑ < n`, `Abundant n ↔ n < ∑`, `Perfect n ↔ ∑ = n`).

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.GeomSum` | Geometric sum identity (`geomSum_eq`) for bounding prime power divisor sums |
| `Mathlib.Algebra.IsPrimePow` | `IsPrimePow` typeclass for generalizing prime power results |
| `Mathlib.NumberTheory.Divisors` | `properDivisors`, `divisors`, `sum_properDivisors_eq_one_iff_prime`, set operations on divisors |
| `Mathlib.Tactic.FinCases` | Finite case analysis on subsets (powerset membership) |
| `Mathlib.Tactic.NormNum.Prime` | Decision procedure for primality (used implicitly in `norm_num`-based proofs) |

---

#### **6. Notable Idioms & Patterns**

- **Proper divisor sums**: Central to all definitions; often rewritten via `mem_properDivisors` and `sum_image`.
- **Exclusivity via `omega`**: After unfolding, `Deficient`, `Abundant`, `Perfect` partition `n ≠ 0` via linear inequalities.
- **Set-theoretic reasoning**: Powerset, subset relations (`⊆`, `mem_powerset`), and finite sums over subsets.
- **Case analysis on small sets**: `fin_cases` + `decide` for concrete verification (e.g., `weird_seventy`).
- **Geometric series bounding**: Key for prime power deficiency proofs.

--- 

This metadata captures the formalization’s structure, strategy, and dependencies for downstream AI agent training or module integration.