### Technical Brief: Real Differentiability of Complex-Differentiable Functions (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasStrictDerivAt.real_of_complex` | `HasStrictDerivAt e e' z → HasStrictDerivAt (fun x ↦ (e x).re) e'.re z` | Shows that if a complex function is strictly differentiable at a real point, then its real part (as a real function) is strictly differentiable with derivative equal to the real part of the complex derivative. |
| `HasDerivAt.real_of_complex` | `HasDerivAt e e' z → HasDerivAt (fun x ↦ (e x).re) e'.re z` | Same as above, but for Fréchet (not necessarily strict) differentiability. |
| `ContDiffAt.real_of_complex` | `ContDiffAt ℂ n e z → ContDiffAt ℝ n (fun x ↦ (e x).re) z` | Propagates smoothness (`n`-times continuously differentiable) from complex to real setting for the real part. |
| `ContDiff.real_of_complex` | `ContDiff ℂ n e → ContDiff ℝ n (fun x ↦ (e x).re)` | Global version: if a complex function is `n`-times continuously differentiable over `ℂ`, then its real part is so over `ℝ`. |
| `HasStrictDerivAt.complexToReal_fderiv'` | `HasStrictDerivAt f f' x → HasStrictFDerivAt f (reCLM.smulRight f' + I • imCLM.smulRight f') x` | Describes the real Fréchet derivative of a complex-differentiable function `f : ℂ → E` (into a complex normed space `E`) as a real-linear map. |
| `HasDerivAt.complexToReal_fderiv'` | `HasDerivAt f f' x → HasFDerivAt f (reCLM.smulRight f' + I • imCLM.smulRight f') x` | Same as above, for non-strict derivative. |
| `HasStrictDerivAt.complexToReal_fderiv` | `HasStrictDerivAt f f' x → HasStrictFDerivAt f (f' • (1 : ℂ →L[ℝ] ℂ)) x` | Special case when `E = ℂ`, expressing the real derivative as multiplication by `f'` over `ℝ`. |
| `HasDerivAt.comp_ofReal` | `HasDerivAt e e' ↑z → HasDerivAt (fun y ↦ e ↑y) e' z` | If `e` is differentiable at `↑z`, then its composition with `ofRealCLM : ℝ → ℂ` is differentiable at `z` with same derivative. |
| `HasDerivAt.ofReal_comp` | `HasDerivAt f u z → HasDerivAt (fun y ↦ ↑(f y)) u z` | If a real-valued function is differentiable, then its inclusion into `ℂ` is also differentiable. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `real_of_complex`: Indicates passage from complex differentiability to real differentiability.
  - `complexToReal_fderiv`: Indicates conversion of complex derivative to real Fréchet derivative.
- **Suffixes**:
  - `real_of_complex`: Standard suffix for “restriction to reals” lemmas.
  - `comp_ofReal`: For composition with `ofRealCLM`.
  - `ofReal_comp`: For precomposition with `ofRealCLM`.
- **Functional forms**:
  - `(fun x ↦ (e x).re)` — real part of a complex function.
  - `(fun y ↦ e ↑y)` — pullback along `ofRealCLM`.
  - `(fun y ↦ ↑(f y))` — inclusion of real-valued function into complex.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `convert`: Used to match target up to definitional equality (especially after chain of `comp`).
  - `rw [ContinuousLinearMap.comp_apply, ...]`: To unfold compositions of linear maps.
  - `simp`: To simplify using properties of `ofRealCLM`, `reCLM`, `smulRight`, etc.
  - `simpa using ...`: To discharge goals using a hypothesis and simplification.
- **辅助 tactics**:
  - `have`: To introduce intermediate facts about differentiability of component maps (`ofRealCLM`, `reCLM`, etc.).
  - `exact` / `assumption`: Implicitly used via `simpa`.

---

#### **4. Proof Logic**

- **General pattern**:
  1. **Decompose** the function into a composition of simpler maps:
     - `ℝ --ofRealCLM--> ℂ --e--> ℂ --re--> ℝ`
     - Or for `f : ℝ → ℝ`, `ℝ --f--> ℝ --ofRealCLM--> ℂ`
  2. **Lift** differentiability of each component using known lemmas:
     - `ofRealCLM.hasDerivAt`, `reCLM.hasDerivAt`, etc.
  3. **Chain rule**: Apply `comp`-based lemmas (`hasDerivAt.comp`, `hasFDerivAt.comp`, etc.).
  4. **Simplify** the resulting derivative expression using algebraic properties of `re`, `im`, and scalar multiplication over `ℝ`.

- **Inductive/structural reasoning**:
  - Not induction-based; relies on **chain rule** and **closure properties** of differentiable maps under composition and restriction of scalars.
  - For `ContDiff`, uses `contDiff_iff_contDiffAt` to reduce to pointwise case.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.ContDiff.Basic`: For `ContDiff`, `ContDiffAt`.
  - `Mathlib.Analysis.Calculus.Deriv.Linear`: For `HasDerivAt`, `HasFDerivAt`, chain rule, linear maps.
  - `Mathlib.Analysis.Complex.Basic`: For `ℂ`, `re`, `im`, `ofRealCLM`, `reCLM`, `smulRight`, etc.

- **Domain scope**:
  - Complex analysis over `ℂ`, with emphasis on real differentiability of complex-differentiable functions.
  - Works in both scalar (`ℂ → ℂ`) and vector (`ℂ → E`) cases.
  - Uses `ℝ`-linear and `ℂ`-linear structures, and their interaction via restriction of scalars.

---

#### **6. Notable Design Choices**

- **`restrictScalars ℝ`**: Used to view complex-linear maps as real-linear ones.
- **`smulRight`**: Encodes multiplication by a complex number as a linear map; key for expressing real derivative.
- **`reCLM`, `imCLM`**: Continuous linear maps for real/imaginary parts; used to decompose complex derivatives.
- **Avoidance of `simp` for `ContinuousLinearMap.comp_apply`**: Porting note indicates a known limitation; workaround via `convert`.

--- 

Let me know if you'd like a diagram of the composition chains or a formalized summary of the derivative conversion lemmas.