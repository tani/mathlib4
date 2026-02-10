Here is a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Real.fourierCoeff_tsum_comp_add` | `{f : C(ℝ, ℂ)} → (∀ K : Compacts ℝ, Summable fun n => ‖(f ∘ addRight n).restrict K‖) → (m : ℤ) → fourierCoeff (Periodic.lift (f.periodic_tsum_comp_add_zsmul 1)) m = 𝓕 f m` | Identifies the `m`-th Fourier coefficient of the periodization of `f` as the Fourier transform of `f` at `m`. Core technical lemma for Poisson summation. |
| `Real.tsum_eq_tsum_fourierIntegral` | `{f : C(ℝ, ℂ)} → (∀ K, Summable fun n => ‖(f ∘ addRight n).restrict K‖) → Summable (𝓕 f) → (x : ℝ) → ∑' n, f (x + n) = ∑' n, 𝓕 f n * fourier n x` | General form of Poisson summation formula: equality of sum over lattice and sum over Fourier coefficients (evaluated at lattice points). |
| `Real.tsum_eq_tsum_fourierIntegral_of_rpow_decay_of_summable` | `{f : ℝ → ℂ} → Continuous f → 1 < b → f =O[cocompact] |·| ^ (-b) → Summable (𝓕 f) → ∑' n, f(x + n) = ∑' n, 𝓕 f n * fourier n x` | A more user-friendly version assuming polynomial decay of `f` and summability of its Fourier transform. |
| `Real.tsum_eq_tsum_fourierIntegral_of_rpow_decay` | `{f : ℝ → ℂ} → Continuous f → 1 < b → f =O[cocompact] |·| ^ (-b) ∧ 𝓕 f =O[cocompact] |·| ^ (-b) → ∑' n, f(x + n) = ∑' n, 𝓕 f n * fourier n x` | Stronger version assuming polynomial decay of both `f` and `𝓕 f`; cited as Corollary VII.2.6 of Stein–Weiss. |
| `SchwartzMap.tsum_eq_tsum_fourierIntegral` | `(f : SchwartzMap ℝ ℂ) → (x : ℝ) → ∑' n, f(x + n) = ∑' n, fourierTransformCLM ℝ f n * fourier n x` | Poisson summation for Schwartz functions — immediate corollary of the previous result using rapid decay of Schwartz functions. |
| `isBigO_norm_Icc_restrict_atTop`, `isBigO_norm_Icc_restrict_atBot`, `isBigO_norm_restrict_cocompact` | Various `O`-bounds for restrictions of continuous functions to translates of compact intervals | Technical lemmas to propagate decay estimates (e.g., `|x|^{-b}`) through operations needed for summability conditions. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isBigO_`: for big-O asymptotic lemmas (e.g., `isBigO_norm_Icc_restrict_atTop`)
  - `summable_of_`: constructing summability from stronger decay assumptions (e.g., `summable_of_isBigO`)
  - `tsum_eq_tsum_`: statements of Poisson summation (e.g., `tsum_eq_tsum_fourierIntegral`)
  - `fourierCoeff_`: Fourier coefficient computations (e.g., `fourierCoeff_tsum_comp_add`)
- **Suffixes**:
  - `_of_rpow_decay`: assumptions about power-law decay
  - `_of_summable`: assumptions about summability of Fourier transform
  - `_atTop`, `_atBot`, `_cocompact`: filter-specific asymptotic behavior
- **Other patterns**:
  - `Periodic.lift`, `periodic_tsum_comp_add_zsmul`: constructions for periodic functions
  - `restrict`, `comp`, `addRight`: standard function operations
  - `norm_norm`, `norm_le`, `norm_of_nonneg`: norm-related simplifications

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: extensive use for rewriting definitions and simplifying expressions (especially with `coe_mk`, `comp_apply`, `smul_eq_mul`, etc.)
- `convert`: for matching goals up to definitional equality or summability
- `have`, `obtain`, `refine`: local lemma introduction and construction
- `rw [← ...]`, `congr`, `push_cast`: algebraic and type-theoretic manipulations
- `linarith`, ` positivity`: arithmetic and positivity reasoning
- `exact`, `apply`, `intro`: standard proof steps
- `convert ... using 1`: for flexible proof transfer
- `funext`: extensionality for functions
- `intervalIntegral.tsum_intervalIntegral_eq_of_summable_norm`: specialized for swapping sums and integrals

---

### **4. Proof Logic**

- **Structure of main proofs**:
  - **Step 1**: Define the periodization `F(x) = ∑ₙ f(x + n)` as a continuous periodic function.
  - **Step 2**: Compute Fourier coefficients of `F` using `fourierCoeff_tsum_comp_add`, reducing to `𝓕 f(n)`.
  - **Step 3**: Use Fourier series convergence (via `has_pointwise_sum_fourier_series_of_summable`) to express `F(x)` as `∑ₙ fourierCoeff F n * fourier n x`.
  - **Step 4**: Combine steps to get `∑ₙ f(x + n) = ∑ₙ 𝓕 f(n) * fourier n x`.

- **Decay assumptions**:
  - For `rpow_decay` versions, reduce to verifying summability via `summable_of_isBigO` and `Real.summable_abs_int_rpow`.
  - For Schwartz functions, use that they decay faster than any polynomial (`isBigO_cocompact_rpow`), so pick `b = 2` (or any `> 1`) to satisfy hypotheses.

- **Key logical flow**:
  - *Indirect summability*: Show `∑ₙ f(x + n)` converges uniformly on compacts via decay estimates.
  - *Swap sum/integral*: Justified by `intervalIntegral.tsum_intervalIntegral_eq_of_summable_norm`.
  - *Asymptotic propagation*: Use lemmas like `isBigO_norm_restrict_cocompact` to lift decay from `f` to translated restrictions.

---

### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Fourier.AddCircle` | Fourier analysis on the circle (`UnitAddCircle`), Fourier coefficients, `fourier` characters |
| `Mathlib.Analysis.Fourier.FourierTransform` | Definition of Fourier transform `𝓕 f`, basic properties |
| `Mathlib.Analysis.PSeries` | Summability of `∑ |n|⁻ᵇ` for `b > 1` (`Real.summable_abs_int_rpow`) |
| `Mathlib.Analysis.Distribution.FourierSchwartz` | Fourier transform on Schwartz space, `fourierTransformCLM` |
| `Mathlib.MeasureTheory.Measure.Lebesgue.Integral` | Integration theory, especially `intervalIntegral`, `Integrable`, `hasSum_intervalIntegral_comp_add_int` |
| `Mathlib.Topology.ContinuousMap.Periodic` | Periodic functions, lifting to the circle, `Periodic.lift`, `periodic_tsum_comp_add_zsmul` |

---

Let me know if you'd like a diagram of dependencies or a proof outline in natural language.