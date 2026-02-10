### Technical Brief: Derivative of the Absolute Value in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `contDiffAt_abs` | `x ≠ 0 → ContDiffAt ℝ n (|·|) x` | Absolute value is `n`-times continuously differentiable at nonzero points. |
| `ContDiffAt.abs` | `ContDiffAt ℝ n f x → f x ≠ 0 → ContDiffAt ℝ n (|f ·|) x` | Chain rule for absolute value: composition with a `ContDiffAt` function nonzero at `x`. |
| `hasStrictDerivAt_abs` | `x ≠ 0 → HasStrictDerivAt (|·|) (sign x) x` | Strict derivative of `|·|` at nonzero `x` is `sign(x)`. |
| `hasDerivAt_abs` | `x ≠ 0 → HasDerivAt (|·|) (sign x) x` | Derivative of `|·|` at nonzero `x` is `sign(x)`. |
| `HasStrictFDerivAt.abs` | `HasStrictFDerivAt f f' x → f x ≠ 0 → HasStrictFDerivAt (|f ·|) (sign(f x) • f') x` | Chain rule for strict Fréchet derivative of `|f(x)|`. |
| `HasFDerivAt.abs` | `HasFDerivAt f f' x → f x ≠ 0 → HasFDerivAt (|f ·|) (sign(f x) • f') x` | Chain rule for Fréchet derivative. |
| `not_differentiableAt_abs_zero` | `¬ DifferentiableAt ℝ abs 0` | Absolute value is *not* differentiable at 0. |
| `deriv_abs` | `deriv (|·|) x = sign x` | Explicit formula for derivative of absolute value (including at 0, where it's defined as 0). |

**Notation**:  
- `|·|` is the absolute value function `abs : ℝ → ℝ`.  
- `SignType.sign x` is `1` if `x > 0`, `-1` if `x < 0`, and `0` if `x = 0`.  
- `•` is scalar multiplication in the target space (`ℝ`-linear maps).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `contDiffAt_`, `ContDiffAt_`: for pointwise `n`-times continuously differentiable.
  - `hasStrictDerivAt_`, `hasDerivAt_`, `hasDerivWithinAt_`: for existence of (strict) derivatives.
  - `differentiableAt_`, `DifferentiableAt_`: for differentiability at a point.
  - `abs_of_pos`, `abs_of_neg`: lemmas about explicit form of `abs` on positive/negative reals (used internally).
- **Suffixes**:
  - `_neg`, `_pos`: case analysis on sign of argument.
  - `_abs`: applied to `abs` itself (e.g., `hasDerivAt_abs`).
  - `.abs`: applied to a function `f` (e.g., `hf.abs h₀`).
- **Pattern**:  
  `Has/FD/StrictFDerivAt.abs_of_{neg,pos}` → `Has/FD/StrictFDerivAt.abs` (general case using `sign`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `convert ... using 1`: to apply chain rule lemmas via derivative uniqueness.
  - `ext y`: extensionality for functions (to show two maps agree).
  - `simp`, `simp_rw`, `simp [mul_comm]`: simplification using algebraic properties and sign definitions.
  - `obtain hx | hx := hx.lt_or_lt`: case split on `x < 0` or `0 < x`.
  - `linarith`: for contradiction in `not_differentiableAt_abs_zero`.
  - `mem_Iio`, `mem_Ioi`, `Iio_mem_nhds`, `Ioi_mem_nhds`: neighborhood/filter reasoning.
  - `congr_of_eventuallyEq`, `EqOn.eventuallyEq_of_mem`: to show functions agree near a point.

---

#### **4. Proof Logic**

- **Structure**:
  1. **Case analysis** on sign of argument (`x < 0`, `0 < x`, or `x = 0`).
  2. For nonzero points: reduce to known derivative of identity or negation via `congr_of_eventuallyEq` and `abs_of_pos`/`abs_of_neg`.
  3. For chain rules (`abs` of `f`): use composition lemmas (`comp`, `comp_hasFDerivWithinAt`, etc.) with the base derivative of `abs`.
  4. At `0`: prove non-differentiability via contradiction using uniqueness of derivative on half-lines (`uniqueDiffOn_Ici`, `uniqueDiffOn_Iic`).
  5. Derivative formula at `0` is defined via `deriv_zero_of_not_differentiableAt`.

- **Inductive/Recursive structure**: None — all proofs are direct case analysis + composition.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Add` | Basic derivative properties (e.g., `deriv_zero_of_not_differentiableAt`, `hasDerivAt_id`, `hasDerivAt_neg`). |
| `Mathlib.Analysis.InnerProductSpace.Calculus` | General calculus framework (norms, Fréchet derivatives, chain rules, `ContDiffAt`, `HasFDerivAt`, etc.). This file mirrors its structure for `abs` (a 1D norm). |

**Domain**: Real analysis in finite-dimensional (specifically 1D) normed spaces; leverages `NormedSpace ℝ E` for generality but focuses on `E = ℝ` or scalar-valued functions.

---

### Summary

This file formalizes the calculus of the absolute value function in Lean 4, mirroring the structure of inner-product-space calculus but specialized to `ℝ`. It establishes differentiability, chain rules, and derivative formulas everywhere except at `0`, where it proves non-differentiability and defines the derivative as `0` (consistent with `sign(0) = 0`). The naming and proof patterns follow Mathlib’s conventions for smoothness and differentiation, with heavy use of case analysis and composition lemmas.