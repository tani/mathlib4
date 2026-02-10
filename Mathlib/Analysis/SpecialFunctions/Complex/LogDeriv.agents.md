### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isOpenMap_exp` | `IsOpenMap exp` | Proves the complex exponential map is an open map, using strict differentiability and non-vanishing derivative. |
| `expPartialHomeomorph` | `PartialHomeomorph ℂ ℂ` | Constructs a partial homeomorphism between the strip `{z | -π < im z < π}` and the slit plane `slitPlane = {z | z ≠ 0 ∧ -π < arg z ≤ π}`, with `exp` and `log` as mutual inverses. Used to transfer differentiability properties of `exp` to `log`. |
| `hasStrictDerivAt_log` | `x ∈ slitPlane → HasStrictDerivAt log x⁻¹ x` | Establishes strict differentiability of `log` on the slit plane, with derivative `x⁻¹`. |
| `hasDerivAt_log` | `x ∈ slitPlane → HasDerivAt log x⁻¹ x` | Derives the standard Fréchet derivative (i.e., complex derivative) of `log` from strict differentiability. |
| `differentiableAt_log` | `x ∈ slitPlane → DifferentiableAt ℂ log x` | Concludes complex differentiability of `log` on the slit plane. |
| `hasStrictFDerivAt_log_real` | `x ∈ slitPlane → HasStrictFDerivAt log (x⁻¹ • (1 : ℂ →L[ℝ] ℂ)) x` | Gives the real Fréchet derivative of `log` (viewed as a map between real Banach spaces). |
| `contDiffAt_log` | `x ∈ slitPlane → ContDiffAt ℂ n log x` | Shows `log` is smooth (`Cⁿ`) at points in the slit plane, for any `n : WithTop ℕ∞`. |
| `HasStrictFDerivAt.clog`, `HasStrictDerivAt.clog`, etc. | Chain rule lemmas for `log ∘ f` under various derivative notions (strict, non-strict, real/complex, within sets). | Enables differentiation of composite functions involving `log`, using the chain rule and the derivative of `log`. |
| `deriv_log_comp_eq_logDeriv` | `deriv (log ∘ f) x = logDeriv f x` | Identifies the derivative of `log ∘ f` with the *logarithmic derivative* `f' / f`, under differentiability and slit-plane conditions. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `has*DerivAt_`: Indicates a derivative existence statement (strict/non-strict, complex/real).
  - `differentiableAt_`, `differentiableOn_`, `differentiable_`: Differentiability (pointwise, on a set, globally).
  - `contDiffAt_`, `contDiffOn_`, `contDiff_`: Smoothness (`Cⁿ`).
  - `isOpenMap_`, `hasStrictDerivAt_exp`: Property-based naming (e.g., `isOpenMap_exp`).
  - `clog_`: Stands for *complex log* chain rule (e.g., `clog`, `clog_real`).
  - `logDeriv`: Refers to the *logarithmic derivative* operator.

- **Suffixes**:
  - `_real`: For results involving real domain/codomain or real-linear structure.
  - `_within`: For derivative notions restricted to subsets (e.g., `HasDerivWithinAt`).
  - `_comp`: For composition lemmas (e.g., `deriv_log_comp_eq_logDeriv`).

- **Special terms**:
  - `slitPlane`: The domain where `log` is well-defined and differentiable: `{z : ℂ | z ≠ 0 ∧ -π < arg z ≤ π}`.
  - `PartialHomeomorph.ofContinuousOpen`: A constructor for partial homeomorphisms via continuous open maps.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification using definitions (e.g., `log_im`, `exp_log`, `mem_Ioo`).
- `rw`: Rewriting using equalities (e.g., `div_eq_inv_mul`, `← deriv`, `Function.comp_def`).
- `exact`: Direct proof application.
- `by` + `intro`/`rintro`: For structured proof blocks.
- `simpa`: Simplify and apply target goal (e.g., `simpa using ...`).
- `obtain rfl : ...`: Equality reasoning via `rfl`.
- `have h : ... := ...`: Intermediate lemma introduction.
- `convert`, `apply`, `refine`: Goal-directed proof construction.
- `continuous_exp.continuousOn`, `isOpenMap_exp`: Use of previously proven facts.

No heavy automation (e.g., `aesop`, `linarith`, `ring`) — proofs are mostly structural and rely on analysis lemmas.

---

#### 4. **Proof Logic**

- **Structure**:
  1. **Construct `expPartialHomeomorph`**:
     - Define `toFun`, `invFun`, `source`, `target`.
     - Prove mutual inverses (`left_inv'`, `right_inv'`) using `log_exp`, `exp_log`.
     - Show mapping properties (`map_source'`, `map_target'`) using properties of `arg`, `im`, and positivity of `exp`.
     - Apply `PartialHomeomorph.ofContinuousOpen`, using continuity of `exp`, openness of `exp`, and openness of the source set.

  2. **Derivative of `log`**:
     - Use `hasStrictDerivAt_symm` on `expPartialHomeomorph`, leveraging `hasStrictDerivAt_exp` and `exp_ne_zero`.
     - Derive weaker forms (`hasDerivAt_log`, `differentiableAt_log`) via implications.

  3. **Chain rules**:
     - Apply `HasStrictDerivAt.comp_hasStrictFDerivAt`, `HasDerivAt.comp`, etc., using `hasStrictDerivAt_log` as the outer derivative.
     - Simplify using algebraic identities (`div_eq_inv_mul`).

  4. **Smoothness**:
     - Use `contDiffAt_symm_deriv` from `expPartialHomeomorph`, relying on `contDiff_exp`.

  5. **Logarithmic derivative identification**:
     - Combine `HasDerivAt.clog` with `deriv` and simplify using `logDeriv` definition.

- **Induction**: Not used.
- **Cases**: Rare; mostly algebraic or topological reasoning.
- **Key principle**: Transfer regularity of `exp` to `log` via inverse function theorem / partial homeomorphism.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.InverseFunctionTheorem.Deriv` | Provides inverse function theorems for strict derivatives (e.g., `hasStrictDerivAt_symm`, `contDiffAt_symm_deriv`). |
| `Mathlib.Analysis.Calculus.LogDeriv` | Defines `logDeriv` and basic properties (used in `deriv_log_comp_eq_logDeriv`). |
| `Mathlib.Analysis.SpecialFunctions.Complex.Log` | Defines `log`, `slitPlane`, `arg`, and basic topology/analysis of complex log. |
| `Mathlib.Analysis.SpecialFunctions.ExpDeriv` | Provides derivative facts for `exp`, e.g., `hasStrictDerivAt_exp`, `exp_ne_zero`, `contDiff_exp`. |

**Domain scope**: Complex analysis, specifically differentiability and smoothness of `log` on its natural domain (slit plane), with chain rules and logarithmic derivatives.

--- 

Let me know if you'd like a diagram of the logical dependencies or a summary of how `slitPlane` is used.