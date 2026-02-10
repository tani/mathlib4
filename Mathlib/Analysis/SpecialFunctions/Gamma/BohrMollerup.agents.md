Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `f` | `ℝ → ℝ` | Generic function satisfying functional equation and convexity in Bohr–Mollerup context |
| `logGammaSeq x n` | `ℝ → ℕ → ℝ` | Sequence approximating `log Γ(x)`: `x log n + log n! − ∑_{m=0}^n log(x + m)` |
| `doublingGamma s` | `ℝ → ℝ` | Auxiliary function: `Γ(s/2) Γ(s/2 + 1/2) 2^{s−1} / √π` |
| `Gamma_mul_add_mul_le_rpow_Gamma_mul_rpow_Gamma` | `∀ s t a b > 0, a + b = 1 ⇒ Γ(a s + b t) ≤ Γ(s)^a Γ(t)^b` | Multiplicative log-convexity of `Γ` via Hölder inequality |
| `convexOn_log_Gamma` | `ConvexOn ℝ (Ioi 0) (log ∘ Gamma)` | Log-convexity of `Γ` on `ℝ_{>0}` |
| `convexOn_Gamma` | `ConvexOn ℝ (Ioi 0) Gamma` | Convexity of `Γ` on `ℝ_{>0}` |
| `BohrMollerup.tendsto_logGammaSeq` | `Tendsto (logGammaSeq x) atTop (𝓝 (f x − f 1))` | Convergence of `logGammaSeq x` to `f(x) − f(1)` for any `f` satisfying hypotheses |
| `BohrMollerup.tendsto_log_gamma` | `Tendsto (logGammaSeq x) atTop (𝓝 (log Γ x))` | Special case: convergence to `log Γ(x)` |
| `eq_Gamma_of_log_convex` | Uniqueness: `f` log-convex, positive, `f(1)=1`, `f(x+1)=x f(x)` ⇒ `f = Γ` on `Ioi 0` | **Bohr–Mollerup theorem** |
| `doublingGamma_add_one` | `doublingGamma(s+1) = s · doublingGamma(s)` | Functional equation for `doublingGamma` |
| `doublingGamma_one` | `doublingGamma(1) = 1` | Normalization at `1` |
| `doublingGamma_log_convex_Ioi` | `ConvexOn ℝ (Ioi 0) (log ∘ doublingGamma)` | Log-convexity of `doublingGamma` |
| `doublingGamma_eq_Gamma` | `0 < s ⇒ doublingGamma s = Γ s` | Equality of `doublingGamma` and `Γ` on `ℝ_{>0}` |
| `Gamma_mul_Gamma_add_half_of_pos` | `0 < s ⇒ Γ(s) Γ(s + 1/2) = Γ(2s) 2^{1−2s} √π` | **Legendre’s doubling formula** for `Γ` on `ℝ_{>0}` |
| `Gamma_three_div_two_lt_one` | `Γ(3/2) < 1` | Strict inequality used in monotonicity proof |
| `Gamma_strictMonoOn_Ici` | `StrictMonoOn Gamma (Ici 2)` | Strict monotonicity of `Γ` on `[2, ∞)` |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `convexOn_`: Convexity statements (`convexOn_log_Gamma`, `convexOn_Gamma`)
  - `BohrMollerup.`: Lemmas in the Bohr–Mollerup namespace (e.g., `BohrMollerup.tendsto_logGammaSeq`)
  - `log_`: Logarithmic variants (`logGammaSeq`, `log_doublingGamma_eq`)
  - `doublingGamma_`: Properties of the auxiliary doubling function
  - `Gamma_`: Core Gamma function identities (`Gamma_mul_add_mul_le_...`, `Gamma_two`, `Gamma_three_div_two_lt_one`, `Gamma_strictMonoOn_Ici`, `Gamma_mul_Gamma_add_half_of_pos`)

- **Suffixes**:
  - `_le_`, `_ge_`, `_lt_`, `_gt_`: Inequality directions
  - `_of_pos`: Hypothesis that argument is positive (`Gamma_mul_Gamma_add_half_of_pos`)
  - `_eq`: Equality statements (`doublingGamma_one`, `Gamma_two`)
  - `_congr`, `_congr'`: Congruence lemmas (used in `tendsto` arguments)

- **Functional equation pattern**:
  - `hf_feq : ∀ {y}, 0 < y → f (y + 1) = y * f y` or `f y + log y` depending on context (log vs. multiplicative form)

---

### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `simp_rw`, `simp only`, `simp` | Rewriting with definitions, especially `log`, `Gamma`, `Finset.sum`, `Finset.range`, `Function.comp`, `rpow`, etc. |
| `ring` | Algebraic simplification of arithmetic expressions (especially in functional equations) |
| `linarith` | Linear arithmetic over reals (e.g., positivity, bounds) |
| `gcongr` | For proving inequalities under `log`, `exp`, `rpow`, etc. |
| `convert` | Matching goals up to definitional equality (often with `using n`) |
| `rw [← ...]` | Rewriting backwards to align terms |
| `filter_upwards` | In filter/tendsto arguments |
| `tendsto_of_tendsto_of_tendsto_of_le_of_le'` | Sandwich argument for limits |
| `conv_rhs => rw [...]` | Focused rewriting on right-hand side |
| `nth_rw` / `nth_rw_rhs` | Positional rewriting (used in older-style porting notes) |
| `abel` | Simplifying additive expressions over `ℕ`/`ℝ` |
| `field_simp`, `ring_nf` | Field simplification and normalization |
| ` positivity` | Proving positivity of expressions |
| `aesop` (not explicitly used here, but `linarith`/`ring` dominate) | — |

---

### **4. Proof Logic**

- **Structure of Bohr–Mollerup proof**:
  1. Define `logGammaSeq x n` as a candidate sequence converging to `log Γ(x)`.
  2. Prove upper/lower bounds for `f(x + n)` using convexity and functional equation:
     - `f_add_nat_le`: upper bound via convexity on `[n, n+1]`
     - `f_add_nat_ge`: lower bound via slope monotonicity
  3. Show `logGammaSeq x n` is squeezed between `f(x) − f(1) − o(1)` and `f(x) − f(1)`, hence converges to `f(x) − f(1)`.
  4. Show `logGammaSeq x n → log Γ(x)` using known convergence (via `BohrMollerup.tendsto_log_gamma`).
  5. Conclude uniqueness: any such `f` must agree with `Γ` on `Ioi 0`.

- **Doubling formula proof**:
  1. Define `doublingGamma(s)` and verify:
     - It satisfies the Gamma functional equation (`doublingGamma_add_one`)
     - It is log-convex (`doublingGamma_log_convex_Ioi`)
     - It normalizes at `1` (`doublingGamma_one`)
  2. Apply `eq_Gamma_of_log_convex` to deduce `doublingGamma = Γ`.
  3. Rearrange definition to obtain Legendre’s doubling formula.

- **Monotonicity proof**:
  - Uses strict monotonicity criterion for convex functions: if `f(a) < f(b)` for `a < b`, then `f` is strictly increasing on `[b, ∞)`.
  - Prove `Γ(3/2) < 1 = Γ(2)` using log-convexity and known values.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.Gamma.Deriv` | Derivative properties of `Γ`, continuity, differentiability |
| `Mathlib.Analysis.SpecialFunctions.Gaussian.GaussianIntegral` | Evaluation of `Γ(1/2) = √π`, used in `doublingGamma_one` |

> **Note**: The file avoids importing heavy machinery (e.g., full complex analysis) by using real-analytic tools (Hölder inequality, convexity, integral convergence) and self-contained arguments.

---

Let me know if you'd like a dependency graph, a proof outline diagram, or a mapping to standard mathematical references (e.g., Bohr–Mollerup original paper, Legendre’s work).