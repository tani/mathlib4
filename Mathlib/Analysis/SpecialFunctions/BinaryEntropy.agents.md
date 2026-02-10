### Technical Metadata Brief: Shannon Entropy Functions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `binEntropy` | `ℝ → ℝ` | Binary Shannon entropy: `p ↦ -p log p - (1-p) log(1-p)` (via `log p⁻¹` form) |
| `qaryEntropy` | `ℕ → ℝ → ℝ` | `q`-ary entropy: `p ↦ p log(q-1) + binEntropy p` |
| `binEntropy_zero`, `binEntropy_one` | `binEntropy 0 = 0`, `binEntropy 1 = 0` | Boundary values vanish |
| `binEntropy_two_inv` | `binEntropy (1/2) = log 2` | Maximum of binary entropy |
| `binEntropy_eq_negMulLog_add_negMulLog_one_sub` | `binEntropy p = negMulLog p + negMulLog (1-p)` | Decomposition via `negMulLog` |
| `binEntropy_pos`, `binEntropy_nonneg` | Positivity on `(0,1)` and `[0,1]` | Entropy is nonnegative on probability domain |
| `binEntropy_neg_of_neg`, `binEntropy_neg_of_one_lt` | `< 0` outside `[0,1]` | Due to `log x = log |x|` extension |
| `binEntropy_eq_zero` | `binEntropy p = 0 ↔ p = 0 ∨ p = 1` | Characterization of zeros |
| `binEntropy_lt_log_two` | `binEntropy p < log 2 ↔ p ≠ 1/2` | Strict maximum at `p = 1/2` |
| `deriv_binEntropy` | `deriv binEntropy p = log(1-p) - log p` | Derivative holds *everywhere* (junk values align) |
| `hasDerivAt_binEntropy`, `hasDerivAt_qaryEntropy` | Local differentiability with explicit derivative | Used for monotonicity/concavity proofs |
| `deriv2_qaryEntropy`, `deriv2_binEntropy` | `deriv^[2] = -1 / (p * (1-p))` | Second derivative (negative on `(0,1)`) |
| `qaryEntropy_strictMonoOn`, `qaryEntropy_strictAntiOn` | Strict monotonicity on `[0, 1-1/q]` and `[1-1/q, 1]` | Unimodal shape |
| `binEntropy_strictMonoOn`, `binEntropy_strictAntiOn` | Strict monotonicity on `[0, 1/2]` and `[1/2, 1]` | Special case `q=2` |
| `strictConcaveOn_qaryEntropy`, `strictConcave_binEntropy` | Strict concavity on `[0,1]` | Key property for information-theoretic inequalities |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `binEntropy_`, `qaryEntropy_`: Module-specific prefixes.
  - `deriv_`, `hasDerivAt_`, `deriv2_`: Derivative-related lemmas.
  - `strictMonoOn_`, `strictAntiOn_`, `strictConcaveOn_`: Monotonicity/concavity lemmas.
  - `continuous`, `differentiableAt`: Regularity properties.
- **Suffixes**:
  - `_zero`, `_one`, `_two_inv`: Special point evaluations.
  - `_pos`, `_nonneg`, `_neg`, `_nonpos`: Sign properties.
  - `_eq_zero`, `_eq_log_two`, `_eq_iff`: Equality characterizations.
  - `_of_neg`, `_of_one_lt`, `_of_nonpos`: Conditional sign lemmas.
- **Logical patterns**:
  - `ne_zero`, `ne_one`, `ne_zero_one`: Used in differentiability conditions.
  - `tendsto_..._atTop`, `tendsto_..._atBot`: Asymptotic behavior of derivative near boundaries.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify definitions (`binEntropy`, `qaryEntropy`, `log_inv`, etc.) |
| `ring` / `field_simp` | Algebraic simplifications, especially rational expressions and inverses |
| `norm_num` | Normalize numeric expressions (e.g., `1/2`, `2⁻¹`) |
| `linarith` | Linear arithmetic over ordered fields (e.g., bounding `p < 1 - 1/q`) |
| `gcongr` / `convert` | Goal-congruence and structured rewriting for inequalities |
| `fun_prop` | Propagate continuity/differentiability (e.g., `Continuous binEntropy`) |
| `have` / `suffices` / `by_cases` | Intermediate lemma construction and case splits |
| `push_neg` (with `use_distrib`) | Push negations inward for cleaner hypotheses |
| `rw [← ...]` / `ext` | Rewriting via symmetry or extensionality |
| `exact` / `apply` | Direct proof steps, especially for `HasDerivAt`, `deriv_` lemmas |
| `filter_upwards`, `mem_Ioo`, `mem_Icc` | Filter-based reasoning for neighborhoods and intervals |

---

#### **4. Proof Logic**

- **Structure**:
  - **Decomposition**: Definitions rewritten in terms of `negMulLog` to reuse existing lemmas.
  - **Case analysis**: On `p = 0`, `p = 1`, `p < 0`, `p > 1`, `p ∈ (0,1)` for sign/regularity lemmas.
  - **Differentiability**: Proven via `differentiableAt_binEntropy_iff_ne_zero_one`, leveraging `fun_prop`.
  - **Derivative formulas**: Derived using `deriv_add`, `deriv_comp_const_sub`, `deriv_negMulLog`.
  - **Monotonicity**: Proven via `strictMonoOn_of_deriv_pos` / `strictAntiOn_of_deriv_neg`, requiring:
    - Continuity on closed interval (`qaryEntropy_continuous.continuousOn`)
    - Positivity/negativity of derivative on interior (via `field_simp`, `log_mul`, `strictMonoOn_log`)
  - **Concavity**: Proven via `strictConcaveOn_of_deriv2_neg`, using `deriv2_qaryEntropy` and sign of `-1/(p(1-p))`.
  - **Boundary behavior**: Asymptotics of derivative near `0`/`1` handled via `tendsto_atTop`, `tendsto_atBot`, and `not_continuousAt_deriv_...` to justify non-extendability.

- **Key insight**: Despite non-differentiability at `0` and `1`, `deriv binEntropy p = log(1-p) - log p` holds *everywhere* due to junk values of `log` and `deriv` coinciding at those points.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.Log.NegMulLog` | Core definitions and lemmas for `negMulLog x = -x log x`, used to define entropy |
| `Mathlib.Analysis.Convex.SpecificFunctions.Basic` | Tools for convexity/concavity (e.g., `strictConcaveOn_of_deriv2_neg`, `convex_Icc`) |

> **Note**: The file assumes entropy is measured in **nats** (natural logarithm). All results extend to other bases via change-of-base, though not explicitly formalized here.

--- 

Let me know if you'd like a dependency graph or a summary of how this file integrates with other entropy-related developments in Mathlib.