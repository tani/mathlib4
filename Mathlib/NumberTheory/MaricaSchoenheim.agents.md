### Technical Metadata Brief: Marica–Schönheim Special Case of Graham’s Conjecture (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `GrahamConjecture` | `def GrahamConjecture (n : ℕ) (f : ℕ → ℕ) : Prop` | Formalizes Graham’s conjecture: for strictly increasing positive sequence `f` on `Iio n`, there exist `i, j < n` such that `gcd (f i) (f j) * n ≤ f i`. |
| `grahamConjecture_of_squarefree` | `lemma` | Proves Graham’s conjecture under the assumption that all `f k` (for `k < n`) are squarefree. |
| `𝒜` (local definition) | `𝒜 := (Iio n).image fun n ↦ primeFactors (f n)` | Set of sets of prime factors of `f i` for `i < n`; used in the combinatorial argument. |
| `hf''` | `∀ i < n, ∀ j, Squarefree (f i / (f i).gcd (f j))` | Intermediate lemma ensuring quotients by gcd remain squarefree (used to apply `prod_primeFactors_of_squarefree`). |

---

#### **2. Naming Conventions**

- **Predicates on structure**:  
  - `GrahamConjecture` — predicate naming convention (capitalized, no prefix/suffix).
- **Lemmas with assumptions**:  
  - `grahamConjecture_of_squarefree` — `_<name>_of_<condition>` pattern.
- **Local variables**:  
  - `𝒜` — calligraphic capital letter for families of sets (standard in combinatorics).
- **Mathlib-style helpers**:  
  - `hf`, `hf'`, `hf''` — standard naming for hypotheses in order of use.
  - `hn`, `hi`, `hj`, `hc`, `hd`, `ha`, `hd` — standard for indices and membership hypotheses.

---

#### **3. Tactic Stack**

The proof uses a mix of high-level automation and low-level algebraic reasoning:

| Tactic | Usage |
|--------|-------|
| `by_contra!` | Negates goal and introduces contradiction hypothesis. |
| `refine lt_irrefl n ?_` | Sets up contradiction via strict inequality chain. |
| `calc` | Chains inequalities/equalities to derive `n < n`. |
| `rw [...]` | Rewrites using lemmas like `card_image_of_injOn`, `card_Iio`, `card_Ioo`, `tsub_zero`, etc. |
| `simp only [...]` | Simplifies goals using local definitions and lemmas (e.g., `𝒜`, `prod_primeFactors_of_squarefree`, `primeFactors_div_gcd`). |
| `exact ...` / `intro ...` | Used in subgoals to discharge quantifiers or apply lemmas. |
| `simpa using ...` | Simplifies using a given proof (e.g., `prod_primeFactors_invOn_squarefree.2.injOn.comp hf.injOn hf'`). |

No heavy automation like `aesop` or `linarith` is used — the proof is mostly algebraic/combinatorial.

---

#### **4. Proof Logic**

The proof follows a **combinatorial contradiction argument**:

1. **Assume negation** of Graham’s conjecture:  
   `¬ ∃ i < n, ∃ j < n, gcd (f i) (f j) * n ≤ f i`.

2. **Define family of sets** `𝒜 = { primeFactors (f i) | i < n }`.

3. **Chain inequalities** to derive `n < n`, contradiction:
   - `n = #𝒜` (via injectivity of `primeFactors` on squarefree numbers).
   - `#𝒜 ≤ #(𝒜 \\ 𝒜)` (Marica–Schönheim inequality: `𝒜 \\ 𝒜` is the set of differences; used via `card_le_card_diffs`).
   - `#(𝒜 \\ 𝒜) ≤ #(Ioo 0 n)` (via injectivity of product over prime sets, using squarefreeness).
   - `#(Ioo 0 n) = n - 1` (finite interval cardinality).
   - `n - 1 < n` (trivial arithmetic).

4. **Key lemmas used**:
   - `prod_primeFactors_of_squarefree`: product of primes uniquely determines squarefree number.
   - `primeFactors_div_gcd`: simplifies prime factorization of `a / gcd(a, b)`.
   - `card_le_card_of_injOn`: injectivity of product map over prime sets.

The core idea: squarefreeness ensures injectivity of `S ↦ ∏ p ∈ S p`, enabling reduction to set-theoretic cardinality bounds.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.SetFamily.FourFunctions` | Provides `card_le_card_diffs` (Marica–Schönheim inequality). |
| `Mathlib.Data.Nat.Squarefree` | Provides `Squarefree`, `squarefree_of_dvd`, `prod_primeFactors_of_squarefree`, `prod_primeFactors_invOn_squarefree`, `primeFactors_div_gcd`. |

No other external libraries are used — the proof is self-contained in Mathlib’s combinatorics and number theory modules.

---

#### **Summary**

This formalization proves a special case of Graham’s conjecture using:
- **Squarefreeness** to ensure uniqueness of prime factor products,
- **Set-family cardinality bounds** (Marica–Schönheim inequality),
- A **contradiction chain** `n = #𝒜 ≤ n - 1 < n`.

It exemplifies Lean’s strength in formalizing nontrivial combinatorial number theory with precise algebraic reasoning.