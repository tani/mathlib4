Here's a structured technical metadata summary of the provided Lean 4 file on **Stirling’s formula**, extracted for use in building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `stirlingSeq` | `ℕ → ℝ`, defined as `n ! / (√(2 * n) * (n / exp 1) ^ n)` — the normalized factorial sequence whose limit is `√π`. |
| `stirlingSeq_zero` | `stirlingSeq 0 = 0` — base case simplification. |
| `stirlingSeq_one` | `stirlingSeq 1 = exp 1 / √2` — first nontrivial value. |
| `log_stirlingSeq_formula` | Logarithmic expansion of `log (stirlingSeq n)` in terms of `log n!`, `log n`, and `log (n / e)`. |
| `log_stirlingSeq_diff_hasSum` | Series expansion for the difference `log (stirlingSeq (m+1)) - log (stirlingSeq (m+2))`, using `log(1 + x)` series. |
| `log_stirlingSeq'_antitone` | Monotonicity: `log ∘ stirlingSeq ∘ succ` is antitone (decreasing). |
| `log_stirlingSeq_diff_le_geo_sum` | Upper bound on successive differences via geometric series. |
| `log_stirlingSeq_sub_log_stirlingSeq_succ` | Simplified bound: `≤ 1 / (4 * (n+1)^2)`. |
| `log_stirlingSeq_bounded_aux` | Shows `log (stirlingSeq 1) - log (stirlingSeq (n+1))` is bounded above by `1/4 * ∑ 1/k²`. |
| `log_stirlingSeq_bounded_by_constant` | `log (stirlingSeq (n+1))` is bounded below for `n ≥ 0`. |
| `stirlingSeq'_pos` | Positivity: `stirlingSeq (n+1) > 0`. |
| `stirlingSeq'_bounded_by_pos_constant` | Existence of a positive lower bound for `stirlingSeq (n+1)`. |
| `stirlingSeq'_antitone` | `stirlingSeq ∘ succ` is antitone (decreasing). |
| `stirlingSeq_has_pos_limit_a` | Convergence: `stirlingSeq` tends to some `a > 0`. |
| `tendsto_self_div_two_mul_self_add_one` | `n / (2n + 1) → 1/2`. |
| `stirlingSeq_pow_four_div_stirlingSeq_pow_two_eq` | Identity linking `stirlingSeq` to Wallis’ product:  
  `stirlingSeq n⁴ / stirlingSeq (2n)² * (n / (2n + 1)) = Wallis.W n`. |
| `second_wallis_limit` | If `stirlingSeq n → a ≠ 0`, then `Wallis.W n → a² / 2`. |
| `tendsto_stirlingSeq_sqrt_pi` | **Main theorem**: `stirlingSeq n → √π`. |
| `factorial_isEquivalent_stirling` | Asymptotic equivalence: `n! ~ √(2πn) (n/e)^n`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `stirlingSeq_`: for properties of the normalized factorial sequence.
  - `log_stirlingSeq_`: for logarithmic variants (e.g., bounds, expansions).
  - `tendsto_`: for convergence statements.
  - `hasSum_`: for series convergence (e.g., `log_stirlingSeq_diff_hasSum`).
- **Suffixes**:
  - `_antitone`: monotonicity (decreasing).
  - `_bounded_by_constant`: existence of bounds.
  - `_pos`: positivity.
  - `_le_geo_sum`, `_sub_log_stirlingSeq_succ`: inequality bounds.
- **Function names**:
  - `stirlingSeq`, `Wallis.W`: capitalized or PascalCase for named objects.
  - `tendsto_`, `hasSum_`, `log_`, `stirlingSeq_`: lowercase with underscores.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting definitions, simplifying expressions. |
| `simp` / `simp_rw` | Simplification with lemmas (e.g., `log_div`, `factorial_succ`). |
| `field_simp` | Simplifying field expressions, especially with division. |
| `ring` / `ring_nf` | Algebraic simplification of polynomial/rational expressions. |
| `norm_cast` | Normalizing casts between `ℕ`, `ℤ`, `ℝ`. |
| ` positivity` | Proving nonnegativity/positivity of expressions. |
| `convert` / `exact` | Matching goals to known theorems. |
| `gcongr` | For monotonicity in inequalities (e.g., `≤` under multiplication). |
| `have`, `obtain`, `cases'` | Introducing intermediate results or decomposing hypotheses. |
| `tendsto_*` tactics (`div`, `mul`, `pow`, `congr'`) | Asymptotic reasoning (convergence). |
| `eventually_atTop.mpr` | Working with filters and eventually-true statements. |
| `tendsto_nhds_unique` | Uniqueness of limits in Hausdorff spaces. |

---

### **4. Proof Logic Flow**

- **Part 1 (Convergence to some `a > 0`)**:
  1. Define `stirlingSeq n`.
  2. Take logs to convert products/quotients into sums/differences.
  3. Expand `log(stirlingSeq (n+1)) - log(stirlingSeq (n+2))` using series for `log(1+x)`.
  4. Show the log-sequence is decreasing and bounded below ⇒ converges.
  5. Exponentiate to get convergence of `stirlingSeq` to some `a > 0`.

- **Part 2 (Identify `a = √π`)**:
  1. Relate `stirlingSeq` to Wallis’ product `W n` via algebraic identity.
  2. Use known limit `W n → π/2`.
  3. Show that if `stirlingSeq n → a`, then `W n → a² / 2`.
  4. Conclude `a² / 2 = π / 2 ⇒ a = √π`.

- **Final step**: Translate convergence of `stirlingSeq n` into asymptotic equivalence `n! ~ √(2πn)(n/e)^n`.

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.PSeries` | Series convergence, especially `∑ 1/k²`. |
| `Mathlib.Data.Real.Pi.Wallis` | Wallis’ product and its convergence to `π/2`. |
| `Mathlib.Tactic.AdaptationNote` | Utility for tactic adaptation (likely for legacy compatibility). |

**Core libraries used implicitly**:
- `Real`, `Filter`, `Asymptotics`, `Topology`, `Nat`, `Finset`.
- `Real.log`, `Real.sqrt`, `exp`, `factorial`, `tendsto`, `HasSum`, `Antitone`, `summable`.

---

Let me know if you'd like a visual dependency graph or a formalized "proof sketch" in natural language for training an AI agent.