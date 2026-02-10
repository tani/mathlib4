### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasSum_taylorSeries_on_ball` | `HasSum (fun n ↦ (n ! : ℂ)⁻¹ • (z - c) ^ n • iteratedDeriv n f c) (f z)` | Shows that the Taylor series of `f` at `c` converges to `f(z)` for `z` in the open metric ball where `f` is differentiable. |
| `taylorSeries_eq_on_ball` | `∑' n, (n ! : ℂ)⁻¹ • (z - c) ^ n • iteratedDeriv n f c = f z` | Equality form of the above, using `tsum`. |
| `taylorSeries_eq_on_ball'` | `∑' n, (n ! : ℂ)⁻¹ * iteratedDeriv n f c * (z - c) ^ n = f z` | Variant for scalar-valued functions (`f : ℂ → ℂ`), using multiplication instead of `•`. |
| `hasSum_taylorSeries_on_emetric_ball` | Same as `hasSum_taylorSeries_on_ball`, but for `EMetric.ball` (allowing infinite radius). | Generalizes convergence to extended metric balls (including entire ℂ). |
| `taylorSeries_eq_on_emetric_ball` | Equality version for `EMetric.ball`. | Same as `taylorSeries_eq_on_ball`, extended. |
| `taylorSeries_eq_on_emetric_ball'` | Scalar-valued variant for `EMetric.ball`. | Same as `taylorSeries_eq_on_ball'`, extended. |
| `hasSum_taylorSeries_of_entire` | `HasSum (fun n ↦ (n ! : ℂ)⁻¹ • (z - c) ^ n • iteratedDeriv n f c) (f z)` | Convergence of Taylor series for *entire* functions (`Differentiable ℂ f`) on all of ℂ. |
| `taylorSeries_eq_of_entire` | `∑' n, ... = f z` | Equality version for entire functions. |
| `taylorSeries_eq_of_entire'` | Scalar-valued equality version for entire functions. | Same as above, simplified for `ℂ → ℂ`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasSum_...`: asserts convergence (via `HasSum`) of the Taylor series to `f z`.
  - `taylorSeries_eq_...`: asserts equality via `tsum`.
  - `..._on_ball`, `..._on_emetric_ball`, `..._of_entire`: distinguishes domain of differentiability (ball, extended ball, or all ℂ).
  - `..._on_ball'`, `..._on_emetric_ball'`, `..._of_entire'`: scalar-valued variants (`f : ℂ → ℂ`), using `*` instead of `•`.

- **Suffixes**:
  - `_on_ball`: metric ball (finite radius).
  - `_on_emetric_ball`: extended metric ball (`ENNReal` radius, possibly ∞).
  - `_of_entire`: global differentiability (`Differentiable ℂ f`).

- **Core terms**:
  - `iteratedDeriv n f c`: `n`-th complex derivative at `c`.
  - `(n ! : ℂ)⁻¹`: reciprocal of factorial, as complex scalar.
  - `(z - c) ^ n`: power term.
  - `•`: scalar multiplication in normed space `E`.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `obtain ⟨...⟩`: existential decomposition (e.g., picking `r' < r`).
  - `lift ... to NNReal`: coercion from `ℝ` to `NNReal` with positivity.
  - `rw [...]`: rewriting using lemmas like `EMetric.mem_ball'`, `Metric.emetric_ball_nnreal`.
  - `convert ... using n`: flexible unification with `n`-ary matching.
  - `simpa [...] using ...`: simplification + application of a lemma.
  - `exact`, `refine`, `apply`: standard proof construction.
  - `simp only [...]`: targeted simplification with explicit lemmas (e.g., `iteratedDeriv_eq_iteratedFDeriv`, `smul_eq_mul`, `Finset.prod_const`).
  - `ring`, `linarith`, `aesop`: likely used implicitly in background (not explicit here, but standard in analysis files).

#### 4. **Proof Logic**

- **General pattern**:
  1. **Localize**: For a point `z` in a ball, shrink the radius to get a *closed* ball inside the domain of differentiability (using `exists_between` or `EMetric.exists_between`).
  2. **Apply known result**: Use `hasFPowerSeriesOnBall` (from `CauchyIntegral`) to get convergence of the *Fréchet* Taylor series.
  3. **Translate**: Convert from Fréchet derivatives (`iteratedFDeriv`) to complex derivatives (`iteratedDeriv`) using `iteratedDeriv_eq_iteratedFDeriv`.
  4. **Simplify**: Use algebraic simplifications (`smul_eq_mul`, `mul_one`, etc.) to match the desired Taylor series form.
  5. **Scalar case**: For `f : ℂ → ℂ`, rewrite `•` as `*` using `smul_eq_mul` and commutativity.

- **Inductive/structural flow**:
  - *Case split* on domain type (`ball` vs `emetric_ball` vs `entire`).
  - *Reduction* of `EMetric.ball` to `Metric.ball` via `NNReal` coercion.
  - *Monotonicity* of differentiability on smaller sets (`hf.mono`).
  - *Equality chaining* via `convert` + `rw`.

#### 5. **Imports**

- **Primary dependency**:
  - `Mathlib.Analysis.Complex.CauchyIntegral`: Provides foundational results on complex differentiability, power series, and Cauchy integral formula — especially `hasFPowerSeriesOnBall`, which is the key input for Taylor convergence.

- **Implicit dependencies** (via `CauchyIntegral` and `NormedSpace`):
  - `Mathlib.Analysis.NormedSpace.Basic` (for `NormedAddCommGroup`, `NormedSpace`, `CompleteSpace`)
  - `Mathlib.Analysis.MetricSpace.Basic` (for `Metric.ball`, `EMetric.ball`)
  - `Mathlib.Data.Complex.Basic`, `Mathlib.Data.ENNReal.Basic`
  - `Mathlib.Tactic` (for `simpa`, `convert`, `lift`, etc.)

---

This file formalizes the **complex analyticity** of holomorphic functions: differentiability on a domain implies representability by its Taylor series on that domain — a cornerstone of complex analysis. The structure reflects Lean’s emphasis on *localization* and *extension* (via `EMetric.ball`) to unify finite and infinite-radius cases.