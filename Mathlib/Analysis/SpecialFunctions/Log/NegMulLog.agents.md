### Technical Metadata Brief: `Mathlib.Analysis.SpecialFunctions.Log.NegMulLog`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `continuous_mul_log` | `Continuous (fun x ↦ x * log x)` | Proves continuity of `x ↦ x * log x` on `ℝ`, including at `0`. |
| `deriv_mul_log` | `x ≠ 0 ⇒ deriv (x ↦ x * log x) x = log x + 1` | Computes derivative of `x * log x` away from `0`. |
| `hasDerivAt_mul_log` | `x ≠ 0 ⇒ HasDerivAt (x ↦ x * log x) (log x + 1) x` | Refines derivative existence using `HasDerivAt`. |
| `not_DifferentiableAt_log_mul_zero` | `¬ DifferentiableAt ℝ (x ↦ x * log x) 0` | Shows non-differentiability at `0`, despite continuity. |
| `deriv2_mul_log` | `deriv^[2] (x ↦ x * log x) x = x⁻¹` | Second derivative (for `x ≠ 0`; at `0`, junk value `0`). |
| `strictConvexOn_mul_log` | `StrictConvexOn ℝ (Set.Ici 0) (x ↦ x * log x)` | Proves strict convexity on `[0, ∞)`. |
| `negMulLog` | `def negMulLog (x : ℝ) : ℝ := - x * log x` | Main object: the function `x ↦ -x log x`, used in entropy theory. |
| `deriv_negMulLog` | `x ≠ 0 ⇒ deriv negMulLog x = -log x - 1` | Derivative of `negMulLog` away from `0`. |
| `deriv2_negMulLog` | `deriv^[2] negMulLog x = -x⁻¹` | Second derivative of `negMulLog`. |
| `strictConcaveOn_negMulLog` | `StrictConcaveOn ℝ (Set.Ici 0) negMulLog` | Strict concavity of `negMulLog` on `[0, ∞)`. |
| `negMulLog_mul` | `negMulLog (x * y) = y * negMulLog x + x * negMulLog y` | Leibniz-type product rule for `negMulLog`. |
| `negMulLog_nonneg` | `0 ≤ x ∧ x ≤ 1 ⇒ 0 ≤ negMulLog x` | Positivity of `negMulLog` on `[0,1]`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mul_log`: for properties of `x * log x`.
  - `negMulLog`: for properties of `-x * log x`.
  - `deriv`, `deriv2`: for first/second derivatives.
  - `differentiable`, `continuous`, `convex/concave`: for regularity and curvature.

- **Suffixes**:
  - `_iff`: characterizations (e.g., `differentiableAt_negMulLog_iff`).
  - `_zero`: behavior at `0` (e.g., `deriv_mul_log_zero`, `negMulLog_zero`).
  - `_nonneg`, `_nonpos`: sign lemmas.

- **Pattern**:  
  `op_arg_condition` or `op_arg_property`, where `op` is `mul_log`, `negMulLog`, `deriv`, etc.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions, lemmas, and simplifying expressions. |
| `simp` | Simplifying goals using `@[simp]` lemmas (e.g., `negMulLog_zero`). |
| `have`, `suffices`, `refine` | Structuring intermediate claims and proof steps. |
| `convert`, `exact` | Matching goals to known lemmas. |
| `filter_upwards`, `eventuallyEq_nhdsWithin_of_eqOn` | Handling filter-based arguments (e.g., near `0`). |
| ` positivity` | Proving positivity of expressions (e.g., in convexity proofs). |
| `aesop` (implicit via `simp` + `linarith`) | Likely used in ring-theoretic simplifications (e.g., `ring` in `negMulLog_mul`). |
| `ring` | Algebraic simplifications (e.g., in `negMulLog_mul`). |
| `intro`, `cases`, `by_cases` | Case analysis (e.g., `by_cases hx : x = 0`). |

---

#### **4. Proof Logic**

- **Structure**:
  - **Continuity**: Proven via `continuous_iff_continuousAt`, splitting into cases (`x ≠ 0` vs `x = 0`) and using filter decompositions (`nhdsWithin_union`).
  - **Differentiability**:
    - Away from `0`: via standard calculus rules (`deriv_mul`, `deriv_log`).
    - At `0`: shown *not* differentiable using divergence of derivative near `0` (`tendsto_deriv_mul_log_nhdsWithin_zero`).
  - **Convexity/Concavity**:
    - For `x * log x`: via `strictConvexOn_of_deriv2_pos`, using positivity of second derivative (`deriv2_mul_log`).
    - For `-x log x`: via negation of convexity (`neg` lemma).
  - **Product rule for `negMulLog`**: proven by expanding `log_mul` and simplifying with `ring`.

- **Common Flow**:
  1. Reduce to case analysis (`x = 0` vs `x ≠ 0`).
  2. Use known lemmas (`deriv_mul_log`, `deriv_log`, etc.).
  3. Apply filter convergence arguments for behavior near `0`.
  4. Use curvature criteria (`deriv2` sign) for convex/concave results.

---

#### **5. Imports & Scope**

- **Primary Dependencies**:
  - `Mathlib.Analysis.SpecialFunctions.Log.Deriv`: Derivatives of `log`, `x^a`, etc.
  - `Mathlib.Analysis.SpecialFunctions.Pow.Asymptotics`: Asymptotic behavior near `0`, e.g., `tendsto_log_mul_rpow_nhds_zero`.
  - `Mathlib.Analysis.Convex.Deriv`: Convexity criteria via derivatives (`strictConvexOn_of_deriv2_pos`, etc.).

- **Scope**:
  - Focuses on **real analysis** of `x log x` and `-x log x`.
  - Central to **information theory** (Shannon entropy), where `negMulLog` appears as the entropy density.
  - Emphasizes **regularity** (continuity, differentiability), **curvature** (convexity/concavity), and **sign properties**.

--- 

Let me know if you'd like a diagram of the logical dependencies or a summary of how this file fits into the broader entropy theory in Mathlib.