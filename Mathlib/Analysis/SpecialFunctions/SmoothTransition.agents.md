### Technical Metadata Brief: Smooth Transition Function in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `expNegInvGlue` | `ℝ → ℝ` | A smooth "gluing" function: `x ↦ 0` for `x ≤ 0`, `x ↦ exp(-1/x)` for `x > 0`. Used to build smooth bump functions and partitions of unity. |
| `Real.smoothTransition` | `ℝ → ℝ` | A smooth transition function: `0` for `x ≤ 0`, `1` for `x ≥ 1`, strictly increasing on `(0,1)`. Constructed as `expNegInvGlue x / (expNegInvGlue x + expNegInvGlue (1 - x))`. |
| `zero_of_nonpos` | `x ≤ 0 → expNegInvGlue x = 0` | Shows vanishing on nonpositive reals. |
| `pos_of_pos` | `0 < x → 0 < expNegInvGlue x` | Positivity on positive reals. |
| `zero_iff_nonpos` | `expNegInvGlue x = 0 ↔ x ≤ 0` | Characterization of the zero set. |
| `tendsto_polynomial_inv_mul_zero` | `∀ p : ℝ[X], tendsto (p(x⁻¹) * expNegInvGlue x) (𝓝 0) 0` | Key technical lemma: decay faster than any rational function near 0. |
| `hasDerivAt_polynomial_eval_inv_mul` | `HasDerivAt (p(x⁻¹) * f x) ((x²·(p - p'))(x⁻¹) * f x) x` | Derivative formula for polynomial-weighted `expNegInvGlue`. |
| `contDiff_polynomial_eval_inv_mul` | `ContDiff ℝ n (p(x⁻¹) * expNegInvGlue x)` | Smoothness of polynomial-weighted version (inductive proof). |
| `contDiff` (for `expNegInvGlue`) | `ContDiff ℝ n expNegInvGlue` | Main smoothness result for the base function. |
| `smoothTransition.zero_iff_nonpos` | `smoothTransition x = 0 ↔ x ≤ 0` | Zero set of the transition function. |
| `smoothTransition.one_of_one_le` | `1 ≤ x → smoothTransition x = 1` | Constant 1 on `[1, ∞)`. |
| `smoothTransition.contDiff` | `ContDiff ℝ n smoothTransition` | Smoothness of the transition function. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `zero_`, `pos_`, `nonneg_`, `one_`: describe value behavior (e.g., `zero_of_nonpos`, `pos_of_pos`).
  - `hasDerivAt_`, `differentiable_`, `continuous_`, `contDiff_`: regularity properties.
  - `tendsto_`: limit behavior (e.g., `tendsto_polynomial_inv_mul_zero`).
- **Suffixes**:
  - `_of_nonpos`, `_of_pos`, `_of_lt_one`: conditional behavior based on argument.
  - `_inv_mul`: indicates presence of `x⁻¹` in expression.
  - `_eval`: evaluation of polynomial at `x⁻¹`.
- **Structure**:
  - `theorem` names follow `property_of_condition` or `condition_property` pattern.
  - `protected` theorems (e.g., `protected theorem zero`) are accessible via dot-notation (`expNegInvGlue.zero`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using definitions and lemmas (e.g., `zero_of_nonpos`, `exp_neg`). |
| `rw` | Rewrite using equalities (e.g., `div_eq_one_iff_eq`, `zero_of_nonpos`). |
| `cases` / `rcases` | Case analysis on trichotomy (`lt_trichotomy`) or `le_or_gt`. |
| `convert` + `congr_of_eventuallyEq` | Prove equality of derivatives by local equivalence. |
| `filter_upwards` | Handle filter-based arguments (e.g., neighborhoods). |
| `ring` | Simplify polynomial expressions (e.g., in derivative computation). |
| `induction` | Inductive proofs (e.g., on `n` for `ContDiff`). |
| `exact`, `apply`, `refine` | Construct proofs stepwise. |
| `nonrec` | Define `@[simp]` lemmas without recursion (e.g., `zero`, `one`). |

---

#### **4. Proof Logic**

- **Smoothness of `expNegInvGlue`**:
  1. **Step 1**: Prove `g_p(x) = p(x⁻¹)·f(x) → 0` as `x → 0` (`tendsto_polynomial_inv_mul_zero`), using comparison with `exp(x⁻¹)`.
  2. **Step 2**: Compute derivative of `g_p` via chain rule and product rule (`hasDerivAt_polynomial_eval_inv_mul`), yielding `g_{x²(p - p')}`.
  3. **Step 3**: Show differentiability and continuity of `g_p`.
  4. **Step 4**: Induct on `n` to prove `ContDiff ℝ n g_p`.
  5. **Step 5**: Set `p = 1` to get `ContDiff ℝ n f`.

- **Smoothness of `smoothTransition`**:
  - Use closure properties of `ContDiff`: sum, product, quotient (denominator nonzero).
  - Denominator positivity shown via case analysis on `x ≤ 0`, `0 < x < 1`, `x ≥ 1`.
  - Endpoint values (`0`, `1`) follow from `zero_of_nonpos`, `one_of_one_le`.

- **General Strategy**:
  - Reduce global smoothness to local analysis near critical points (`0`, `1`).
  - Leverage polynomial approximations and decay estimates near singularities (`x = 0`).
  - Use `filter_upwards` and neighborhood arguments to handle piecewise definitions.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Inv` | Derivative of inverse function, chain rule, `hasDerivAt_inv`. |
| `Mathlib.Analysis.Calculus.Deriv.Polynomial` | Derivatives of polynomials, `derivative`, `hasDerivAt` for polynomials. |
| `Mathlib.Analysis.SpecialFunctions.ExpDeriv` | Derivative of `exp`, `exp_pos`, `exp_neg`. |
| `Mathlib.Analysis.SpecialFunctions.PolynomialExp` | Growth comparison: `p(x)/exp(x) → 0` as `x → ∞`. |

> **Note**: The file builds on standard analysis infrastructure in Mathlib: filters, continuity, differentiability (`ContDiff`), and polynomial evaluation.

--- 

This metadata captures the core structure, methodology, and dependencies of the formalization, suitable for domain-specific AI agent training or codebase navigation.