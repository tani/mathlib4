### Technical Metadata Brief: Polynomial Bounds for Trigonometric Functions (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sin_lt` | `0 < x → sin x < x` | Upper bound for `sin x` by identity function for positive `x`. |
| `sin_gt_sub_cube` | `0 < x → x ≤ 1 → x - x^3 / 4 < sin x` | Lower polynomial bound for `sin x` (cubic correction), nontrivial near `x = 1`. |
| `lt_tan` | `0 < x → x < π/2 → x < tan x` | Strict lower bound for `tan x` by identity on `(0, π/2)`. |
| `cos_le_one_div_sqrt_sq_add_one` | `-(3π/2) ≤ x ≤ 3π/2 → cos x ≤ 1 / sqrt(x² + 1)` | Global (on bounded interval) upper bound for `cos x` by rational function. |
| `cos_lt_one_div_sqrt_sq_add_one` | Same premises + `x ≠ 0 → cos x < 1 / sqrt(x² + 1)` | Strict version of above. |
| `mul_le_sin`, `sin_le_mul`, `mul_abs_le_abs_sin` | Linear lower/upper bounds for `sin x` on `[0, π/2]` and symmetrically — Jordan’s inequality variants. |
| `one_sub_mul_le_cos`, `one_add_mul_le_cos` | Linear lower bounds for `cos x` on `[0, π/2]` and `[-π/2, 0]`. |
| `cos_le_one_sub_mul_cos_sq` | `|x| ≤ π → cos x ≤ 1 - 2/π² · x²` | Quadratic upper bound for `cos x`. |
| `deriv_tan_sub_id` | `cos x ≠ 0 → deriv (tan - id) x = 1/cos²x - 1` | Derivative of `tan x - x`, used in monotonicity argument. |
| `sin_sq_lt_sq`, `abs_sin_lt_abs` | `x ≠ 0 → sin²x < x²`, `|sin x| < |x|` | Strict quadratic bound for `sin`. |
| `one_sub_sq_div_two_lt_cos` | `x ≠ 0 → 1 - x²/2 < cos x` | Second-order Taylor lower bound for `cos`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sin_`, `cos_`, `tan_`: indicate the trigonometric function involved.
  - `mul_`, `abs_`, `sq_`, `cube_`: indicate polynomial structure (linear, absolute value, square, cube).
  - `le_`, `lt_`, `ge_`, `gt_`: indicate inequality direction (non-strict vs strict).
  - `one_`, `two_`, `pi_`: constants used in bounds (e.g., `1 - x²/2`, `2/π`, `π²`).
- **Suffixes**:
  - `_le`, `_lt`: denote non-strict vs strict inequality.
  - `_sq`, `_cube`: denote quadratic/cubic bounds.
  - `_mul`: often used for scaling by constants like `2/π`.
  - `_abs`: for bounds involving absolute values.
- **Special patterns**:
  - `*_div_*`: rational coefficients (e.g., `two_div_pi_mul_le_sin` — deprecated alias).
  - `*_sub_*`: subtraction in polynomial (e.g., `sin_gt_sub_cube`).
  - `*_le_*`: Jordan-type linear bounds.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `rwa` | Rewriting using equalities, often with assumptions (`a ≠ 0`, `0 < x`, etc.). |
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `sin_zero`, `tan_zero`). |
| `linarith` | Solving linear inequalities (e.g., bounding `x` in intervals, handling `π > 0`). |
| `norm_num` | Normalizing numeric expressions (e.g., `1/4 - 1/6 = 1/12`). |
| `apply`, `exact`, `refine` | Proof construction, especially for implications and inequalities. |
| `wlog` | “Without loss of generality” for symmetry arguments (e.g., reducing to `x ≥ 0`). |
| `rcases` / `obtain` | Case analysis on `eq_or_ne`, `lt_or_le`, `le_or_lt`. |
| `convert` | Matching goals up to definitional equality (e.g., using symmetry of `cos(-x) = cos x`). |
| `have`, `suffices` | Introducing intermediate claims or reformulating goals. |
| `pow_le_pow_of_le_one`, `pow_lt_pow_left₀` | Handling monotonicity of powers on `[0,1]`. |
| `mul_lt_mul'`, `mul_le_mul'` | Multiplying inequalities (with positivity assumptions). |
| `div_lt_div_iff₀`, `lt_inv_comm₀` | Manipulating rational inequalities. |
| `conv` / `congr` | Structural rewriting in subterms (e.g., inside `sqrt`, `sin`, `cos`). |

---

#### **4. Proof Logic**

- **Inductive/Case-based structure**:
  - Most proofs split on sign (`0 < x`, `x = 0`, `x < 0`) or magnitude (`x ≤ 1`, `x > 1`, `x ≤ π/2`, etc.).
  - `wlog` used to reduce symmetric cases (e.g., for `|x|`, `cos x`, `sin x`).
- **Monotonicity arguments**:
  - For `lt_tan`, the core idea is:  
    - Define `f(x) = tan x - x`, show `f(0) = 0`,  
    - Show `f' > 0` on `(0, π/2)` using `cos²x < 1`,  
    - Conclude `f(x) > 0` via `strictMonoOn_of_deriv_pos`.
- **Taylor remainder style bounds**:
  - Bounds like `sin x > x - x³/4` use `sin_bound` (a known inequality: `|sin x| ≤ |x|`) and algebraic manipulation.
  - `one_sub_sq_div_two_lt_cos` derives from `sin²x < x²` and identity `cos x = 1 - 2 sin²(x/2)`.
- **Quadratic bounds**:
  - `cos x ≤ 1 - 2/π² x²` uses `sin(x/2) ≥ x/π` (from Jordan’s inequality) and squaring.
- **Rational bounds for `cos x`**:
  - `cos x ≤ 1 / sqrt(x² + 1)` splits into two regimes:
    - Near 0 (`x < π/2`): relate to `tan x > x` via trig identities (`1 + tan² = 1/cos²`).
    - Far from 0 (`x ≥ π/2`): use `cos x ≤ 0 < 1/sqrt(x²+1)`.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Analysis.Convex.SpecificFunctions.Deriv
  import Mathlib.Analysis.SpecialFunctions.Trigonometric.ArctanDeriv
  ```
- **Domain scope**:
  - Real analysis on `ℝ`.
  - Focus on **inequalities** for elementary trigonometric functions (`sin`, `cos`, `tan`).
  - Leverages:
    - Convexity/concavity (`strictConcaveOn_sin_Icc`)
    - Derivative calculus (`deriv_tan_sub_id`, `HasDerivAt.tan`)
    - Basic properties of `abs`, `sqrt`, `pow`, `pi`
- **Notable dependencies**:
  - `Mathlib.Analysis.Convex.*`: for monotonicity via derivatives.
  - `Mathlib.Analysis.SpecialFunctions.Trigonometric.*`: foundational trig lemmas (e.g., `sin_sq_eq_half_sub`, `cos_pos_of_mem_Ioo`, `tan_zero`).
  - `Mathlib.Data.Real.Basic`: for order, `abs`, `pi`, positivity.

---

#### **Summary**

This file formalizes a suite of **polynomial and rational bounds** for trigonometric functions on real intervals, with emphasis on:
- Tightness near 0 (Taylor-like bounds),
- Global behavior on bounded intervals (e.g., `[-3π/2, 3π/2]`),
- Symmetry and monotonicity arguments (Jordan’s inequality, `tan x > x`).

The proofs combine **algebraic manipulation**, **case analysis**, and **calculus-based monotonicity**, using Lean’s robust analysis library.