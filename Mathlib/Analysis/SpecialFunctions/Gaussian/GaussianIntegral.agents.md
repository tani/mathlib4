Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Gaussian Integral Formalization in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `exp_neg_mul_rpow_isLittleO_exp_neg` | Shows `exp(-b * x^p) = o(exp(-x))` at `atTop` for `p > 1`, `b > 0`. Used for decay estimates. |
| `exp_neg_mul_sq_isLittleO_exp_neg` | Special case of above for `p = 2`. |
| `rpow_mul_exp_neg_mul_rpow_isLittleO_exp_neg` | Shows `x^s * exp(-b * x^p) = o(exp(-x/2))` at `atTop`. Crucial for integrability bounds. |
| `integrableOn_rpow_mul_exp_neg_rpow` | Integrability of `x^s * exp(-x^p)` on `Ioi 0` under `s > -1`, `p ≥ 1`. |
| `integrableOn_rpow_mul_exp_neg_mul_rpow` | Generalized integrability for `x^s * exp(-b * x^p)` with `b > 0`. |
| `integrableOn_rpow_mul_exp_neg_mul_sq` | Special case for `p = 2`. |
| `integrable_rpow_mul_exp_neg_mul_sq` | Full-line integrability (over `ℝ`) of `x^s * exp(-b * x^2)`. |
| `integrable_exp_neg_mul_sq` | Integrability of `exp(-b * x^2)` (i.e., `s = 0`). |
| `norm_cexp_neg_mul_sq` | Norm of complex Gaussian: `‖exp(-b x²)‖ = exp(-re(b) x²)`. |
| `integrable_cexp_neg_mul_sq` | Integrability of complex Gaussian when `re(b) > 0`. |
| `integral_mul_cexp_neg_mul_sq` | Computes `∫_{x > 0} x * exp(-b x²) dx = 1/(2b)` via fundamental theorem of calculus. |
| `integral_gaussian_sq_complex` | Core identity: `(∫ exp(-b x²) dx)² = π / b` for `re(b) > 0`, proved via polar coordinates. |
| `integral_gaussian` | Real Gaussian integral: `∫ exp(-b x²) dx = √(π / b)` for `b > 0`. |
| `integral_gaussian_complex` | Complex Gaussian integral: `∫ exp(-b x²) dx = (π / b)^(1/2)` for `re(b) > 0`. |
| `integral_gaussian_Ioi`, `integral_gaussian_complex_Ioi` | Half-line versions: integrals over `Ioi 0` give half the full-line value. |
| `Real.Gamma_one_half_eq`, `Complex.Gamma_one_half_eq` | `Γ(1/2) = √π` (real/complex), equivalent to Gaussian integral. |
| `Real.Gamma_nat_add_half`, `Real.Gamma_nat_add_one_add_half` | Closed forms for `Γ(k + 1/2)` and `Γ(k + 1 + 1/2)` in terms of double factorial. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `integrableOn_...`: Integrability over a set (e.g., `Ioi 0`, `Icc a b`).
  - `integrable_...`: Full-space integrability (`ℝ`).
  - `integral_...`: Exact evaluation of an integral.
  - `exp_neg_...`, `rpow_mul_exp_neg_...`: Decay estimates using little-o.
  - `norm_cexp_...`, `cexp_...`: Complex exponential variants.
- **Suffixes**:
  - `_sq`: Squared version of an identity (e.g., `integral_gaussian_sq_complex`).
  - `_Ioi`: Integral over `Ioi 0` (i.e., `(0, ∞)`).
  - `_complex`: Complex parameter version.
- **Other patterns**:
  - `hasDerivAt`, `tendsto`, `continuousAt`, `measurableSet`: Standard analysis/measure theory terms.
  - `ofReal_...`, `coe_algebraMap`: Embedding from `ℝ` to `ℂ`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: Rewriting and simplification (especially for algebraic identities, `rpow`, `exp`, integrals).
- `convert`: To match goals up to definitional equality (e.g., real vs complex embeddings).
- `field_simp`, `ring`, `norm_num`: Algebraic simplification and normalization.
- `apply`, `exact`, `refine`: Proof construction.
- `have`, `suffices`: Intermediate lemma introduction.
- `convert ... using n`: Flexible unification with backtracking.
- `filter_upwards`, `ae_of_all`, `aestronglyMeasurable`: Measure-theoretic reasoning (a.e. properties).
- `tendsto_*`, `isLittleO.*`, `isBigO.*`: Asymptotic analysis.
- `intervalIntegral_tendsto_integral_Ioi`, `intervalIntegral_tendsto_integral_Iic`: Convergence of interval integrals.
- `conv_lhs => rw [...]`: Convolution-style rewriting (left-hand side only).
- `rcases le_or_lt`: Case analysis on order (`≤` vs `<`), common in real analysis.

---

#### **4. Proof Logic & Strategy**

- **Decay estimates** (`isLittleO` lemmas):
  - Reduce to known limits (e.g., `x^p exp(-x) → 0`) via algebraic manipulation and `Tendsto` lemmas.
  - Use `rpow_sub_one`, `rpow_mul`, `inv_mul_cancel` for exponent arithmetic.

- **Integrability**:
  - Split domain (`Ioi 0 = Ioc 0 1 ∪ Ioi 1`) to handle near-zero and tail behavior separately.
  - Near zero: Use `intervalIntegrable` + continuity on compact intervals.
  - Tail: Dominated by `exp(-c x)` via `isLittleO` ⇒ `isBigO` ⇒ integrable.

- **Gaussian integral evaluation**:
  - **Step 1**: Square the integral → 2D integral.
  - **Step 2**: Change to polar coordinates (`polarCoord`).
  - **Step 3**: Separate radial and angular parts.
  - **Step 4**: Compute radial part using `integral_mul_cexp_neg_mul_sq` (primitive exists).
  - **Step 5**: Conclude via uniqueness of positive square roots.

- **Complex case**:
  - Use continuity + identity theorem on connected domain (`convex_halfSpace_re_gt 0`).
  - Prove equality at a point (e.g., `b = 1`) and show both sides are continuous and non-vanishing.

- **Gamma function identities**:
  - Reduce to Gaussian integral via substitution (`x = t²`).
  - Use recurrence `Γ(z+1) = z Γ(z)` for half-integers.
  - Express results via `doubleFactorial`.

---

#### **5. Imports & Scope**

**Core Dependencies**:
- `Mathlib.Analysis.SpecialFunctions.Gamma.Basic`: Gamma function definitions and properties.
- `Mathlib.Analysis.SpecialFunctions.PolarCoord`: Polar coordinate change of variables (for 2D integrals).
- `Mathlib.Analysis.Complex.Convex`: Convexity in `ℂ`, used for identity theorem.
- `Mathlib.Data.Nat.Factorial.DoubleFactorial`: Double factorial for half-integer Gamma values.

**Scopes & Openings**:
- `noncomputable section`: Allows noncomputable definitions (e.g., `sqrt`, `rpow`).
- `open Real Set MeasureTheory Filter Asymptotics`: Core analysis/measure theory namespaces.
- `open scoped Real Topology`: Real topology and order.
- `open Complex hiding exp abs_of_nonneg`: Complex analysis, with some exports hidden.

---

Let me know if you'd like a dependency graph, proof outline visualization, or a summary of how this fits into Mathlib’s broader analysis library.