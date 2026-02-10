Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Derivatives of Complex and Real Power Functions**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `slitPlane` | The complex plane minus the non-positive real axis (branch cut for `log`). Used to ensure `log` is well-defined and analytic. |
| `cpow` | Complex power function: `x ^ y = exp(y * log x)` for `x ≠ 0`. Defined via `exp` and `log`. |
| `rpow` | Real power function: `x ^ y` defined piecewise: `exp(y * log x)` for `x > 0`, and extended for `x < 0` using `cos(π y)` and `exp(y * log |x|)`. |
| `hasStrictFDerivAt_cpow` | Strict Fréchet differentiability of `(x, y) ↦ x^y` on `slitPlane × ℂ`. Derivative: `y * x^{y-1} dx + x^y log(x) dy`. |
| `hasStrictDerivAt_const_cpow` | Strict differentiability of `y ↦ c^y` at `y`, derivative: `c^y log c`. Requires `c ≠ 0 ∨ y ≠ 0`. |
| `hasStrictFDerivAt_rpow_of_pos` | Strict Fréchet differentiability of `(x, y) ↦ x^y` for `x > 0` (real case). Same derivative form as complex case. |
| `hasStrictFDerivAt_rpow_of_neg` | Strict Fréchet differentiability for `x < 0`. Derivative includes extra term due to `cos(π y)` factor: `-exp(log|x| * y) * sin(π y) * π` in the `dy` component. |
| `hasDerivAt_ofReal_cpow` | Real derivative of `(y ↦ y^{r+1}/(r+1))` is `y^r`, even across negative reals (uses analytic continuation). |
| `contDiffAt_rpow_of_ne` | Infinite smoothness (`C^∞`) of `(x, y) ↦ x^y` away from `x = 0`. |
| `differentiableAt_rpow_const_of_ne` | Differentiability of `x ↦ x^p` at `x ≠ 0`. |
| `hasDerivAt_rpow_const` | Derivative of `x ↦ x^p` at `x`, valid if `x ≠ 0 ∨ 1 ≤ p`. |
| `deriv_rpow_const` | Explicit formula for derivative: `p * x^{p-1}` under same condition. |
| `ContDiffAt.rpow`, `ContDiff.rpow`, etc. | Closure properties: `C^n` regularity preserved under `f^g`, `f^p`, `c^f`, etc., under non-vanishing or smoothness conditions. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasStrictFDerivAt_`, `hasFDerivAt_`, `hasStrictDerivAt_`, `hasDerivAt_`, `hasDerivWithinAt_`: denote differentiability classes (strict Fréchet, Fréchet, strict Gâteaux, Gâteaux, within a set).
  - `differentiableAt_`, `differentiableWithinAt_`, `differentiableOn_`, `differentiable_`: differentiability (not just existence of derivative).
  - `contDiffAt_`, `contDiffWithinAt_`, `contDiffOn_`, `contDiff_`: `C^n` smoothness.
- **Suffixes**:
  - `_cpow`, `_rpow`: complex vs real power.
  - `_const_`: one argument constant (e.g., `const_cpow`, `const_rpow`).
  - `_rpow_const`: base variable, exponent constant.
- **Helper lemmas**:
  - `aux`: internal rewriting lemma to align Fréchet derivative output with scalar derivative form.
  - `ofReal_cpow_of_nonpos`, `rpow_def_of_pos`, `rpow_def_of_neg`: definitional lemmas for `rpow`.

#### **3. Tactic Stack**

Frequently used tactics:
- `convert`: to match target up to definitional equality (especially with `HasFDerivAt`/`HasDerivAt`).
- `simp only [...]`: targeted simplification (e.g., removing `smul`, `ContinuousLinearMap` coercions).
- `rw [...]`: rewriting using lemmas like `cpow_def_of_ne_zero`, `rpow_def_of_pos`.
- `exact`, `refine`, `apply`: for constructing proofs stepwise.
- `congr'`, `ring`: algebraic simplification (especially in derivative simplifications).
- `eventually_mem`, `mono`: for handling neighborhood-based arguments (e.g., `=ᶠ[𝓝 p]`).
- `comp`, `comp_hasFDerivAt`, `prod`, `mul`, `add`: composition, product, and chain rule applications.
- `have`, `suffices`: intermediate claims, especially in case analysis (`hx | hx`).
- `rcases em (...)`, `or_else`: case splits on decidables (e.g., `x = 0`).

#### **4. Proof Logic**

- **Structure**:
  1. **Reduction to known functions**: Express `x^y` as `exp(y * log x)` (or `exp(y * log |x|) * cos(π y)` for `x < 0`) using definitional lemmas.
  2. **Apply chain rule**: Use `HasStrictFDerivAt.cexp`, `HasStrictFDerivAt.clog`, `mul`, `add`, `smul` rules.
  3. **Conjugate with equality on neighborhoods**: Use `congr_of_eventuallyEq` to switch between definitions.
  4. **Case analysis**: Split on sign of real base (`x > 0` vs `x < 0`) or `x = 0` (often excluded via hypotheses like `x ≠ 0` or `0 < x`).
  5. **Induction**: For `ContDiff` lemmas (`contDiff_rpow_const_of_le`), induction on `n` with base case `n = 0` (continuity) and step using derivative formula.
  6. **Analytic continuation**: For real derivatives across negative reals (e.g., `hasDerivAt_ofReal_cpow`), use functional equations involving `exp(I π y)`.

- **Common patterns**:
  - Prove strict differentiability first, then deduce Fréchet/Gâteaux differentiability.
  - Use `HasFDerivAt.comp` for chain rule with `(f, g)`.
  - Separate handling of `x = 0` (often excluded or requires `1 ≤ p` to avoid singularity).

#### **5. Imports**

- `Mathlib.Analysis.SpecialFunctions.Pow.Continuity`: continuity of `rpow`, `cpow`.
- `Mathlib.Analysis.SpecialFunctions.Complex.LogDeriv`: complex log derivative.
- `Mathlib.Analysis.Calculus.FDeriv.Extend`: extension lemmas for Fréchet derivatives.
- `Mathlib.Analysis.Calculus.Deriv.Prod`: product rule for derivatives.
- `Mathlib.Analysis.SpecialFunctions.Log.Deriv`: derivative of `log`.
- `Mathlib.Analysis.SpecialFunctions.Trigonometric.Deriv`: derivatives of `sin`, `cos`, `exp` (used in real `rpow` for `x < 0`).

---

This file formalizes a comprehensive calculus of power functions over `ℂ` and `ℝ`, including strict, Fréchet, and Gâteaux derivatives, differentiability, and smoothness, with careful attention to domain restrictions (e.g., `slitPlane`, `x ≠ 0`, `x > 0`, `1 ≤ p`). The proofs rely heavily on chain rule compositions and case analysis over sign/zero conditions.