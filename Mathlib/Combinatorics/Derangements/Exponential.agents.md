### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
- **`numDerangements`**: A function `ℕ → ℕ` (imported from `Mathlib.Combinatorics.Derangements.Finite`) counting the number of derangements (permutations with no fixed points) on `n` elements.
- **`numDerangements_tendsto_inv_e`** *(main theorem)*:  
  Type: `Tendsto (fun n => (numDerangements n : ℝ) / n.factorial) atTop (𝓝 (Real.exp (-1)))`  
  Purpose: Proves that the probability that a random permutation of `n` elements is a derangement converges to `1/e` as `n → ∞`.

- **`s : ℕ → ℝ`** *(auxiliary definition)*:  
  `s n = ∑ k ∈ Finset.range n, (-1 : ℝ)^k / k.factorial`  
  Purpose: Represents the `n`-th partial sum of the Taylor series for `exp(-1)`; used to relate derangement probabilities to the exponential series.

- **`expSeries_div_hasSum_exp`**:  
  A lemma from `Mathlib.Analysis.SpecialFunctions.Exponential` stating that the power series `∑ x^k / k!` has sum `exp(x)` in any real-closed normed field (here applied to `x = -1`).

- **`Real.exp_eq_exp_ℝ`**: Identifies `Real.exp` with the abstract `exp` on `ℝ` (used to apply general series convergence results).

#### 2. **Naming Conventions**
- **Prefixes**:
  - `numDerangements_`: for lemmas about the *count* of derangements.
  - `expSeries_`: for results about the exponential power series.
- **Suffixes**:
  - `_tendsto_`: for convergence statements (e.g., `numDerangements_tendsto_inv_e`).
  - `_hasSum_`: for summability claims (e.g., `expSeries_div_hasSum_exp`).
- **Pattern**: `is_`, `mul_`, `dist_` are *not* used here; focus is on *computational* and *asymptotic* properties (`num_`, `tendsto_`, `hasSum_`).

#### 3. **Tactic Stack**
- **Core tactics**: `intro`, `rw`, `simp_rw`, `refine`, `apply`, `push_cast`, `field_simp`, `ring`, `exact`.
- **Filter/analysis-specific**:
  - `tendsto_add_atTop_iff_nat`: to shift sequences for convergence.
  - `HasSum.tendsto_sum_nat`: to upgrade summability to convergence of partial sums.
- **Finite sums**:
  - `Finset.sum_congr`, `Finset.sum_div`: for termwise manipulation of sums.
  - `Finset.mem_range_succ_iff.mp`: to extract bounds from membership in `Finset.range (n+1)`.

#### 4. **Proof Logic**
- **High-level strategy**:
  1. Define partial sums `s n` of the series for `exp(-1)`.
  2. Prove an *exact equality*:  
     `numDerangements n / n! = s (n + 1)`  
     (via combinatorial identity `numDerangements_sum`, algebraic simplifications using factorial divisibility).
  3. Use this to reduce the limit to convergence of `s (n+1)` → `exp(-1)`.
  4. Apply `HasSum.tendsto_sum_nat` + `expSeries_div_hasSum_exp` + `Real.exp_eq_exp_ℝ`.
- **Key logical steps**:
  - Induction-free: relies on *algebraic manipulation* of finite sums and known series convergence.
  - Critical use of `Nat.ascFactorial_eq_div` and factorial divisibility (`Nat.factorial_dvd_factorial`) to connect combinatorial formulas with factorial terms.

#### 5. **Imports**
- **`Mathlib.Analysis.SpecialFunctions.Exponential`**: Provides `Real.exp`, `expSeries_div_hasSum_exp`, and series convergence tools.
- **`Mathlib.Combinatorics.Derangements.Finite`**: Supplies `numDerangements`, `numDerangements_sum` (explicit formula), and factorial divisibility facts.
- **`Mathlib.Order.Filter.Tendsto`**: Supplies filter-theoretic convergence machinery (`Tendsto`, `atTop`, `𝓝`).
- **`NormedSpace`** (open): Enables use of normed space analysis (though minimal here; likely for generality of `expSeries_div_hasSum_exp`).

---

**Summary**: This proof bridges combinatorics (derangements) and analysis (exponential series) by showing the derangement probability sequence equals shifted partial sums of `exp(-1)`, then leveraging known convergence. The formalization emphasizes *exact algebraic correspondence* followed by *analytic convergence*, with minimal tactic overhead beyond `rw`, `simp`, and `ring`.