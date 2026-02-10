### Technical Brief: Mellin Inversion Formula in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rexp` | `ℝ → ℂ`, defined as `λ x ↦ Complex.exp (-x)` | Exponential function extended to complex values; used to relate real exponentials with complex exponentials. |
| `mellin` | `mellin f s = ∫ (u : ℝ), Complex.exp (-s * u) • f (Real.exp (-u))` | Mellin transform of a function `f : ℝ → E`, expressed via change of variables from the standard integral definition. |
| `mellinInv` | `mellinInv σ f x = x^(-σ) • ∫ (y : ℝ), Complex.exp (2π * y * (-Real.log x) * I) • f (σ + 2π * y * I)` | Inverse Mellin transform, parameterized by vertical line `σ ∈ ℝ`. |
| `mellin_eq_fourierIntegral` | `mellin f s = 𝓕 (u ↦ Real.exp (-s.re * u) • f (Real.exp (-u))) (s.im / (2π))` | Relates Mellin transform to Fourier transform via substitution `u = -log x`. |
| `mellinInv_eq_fourierIntegralInv` | `mellinInv σ f x = x^(-σ) • 𝓕⁻ (y ↦ f (σ + 2π * y * I)) (-Real.log x)` | Relates inverse Mellin transform to inverse Fourier transform. |
| `mellin_inversion` | `mellinInv σ (mellin f) x = f x` under convergence/continuity assumptions | Main result: Mellin inversion formula — recovering `f(x)` from its Mellin transform. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `rexp_`: Real exponential-related auxiliary lemmas (e.g., `rexp_neg_deriv_aux`, `rexp_cexp_aux`)
  - `mellin_`: Core Mellin transform definitions and properties (`mellin_eq_fourierIntegral`, `mellinInv_eq_fourierIntegralInv`)
  - `hasDerivWithinAt`, `InjOn`, `mapsTo`: Measure-theoretic regularity conditions.

- **Suffixes:**
  - `_aux`: Technical lemmas used in proofs (e.g., `rexp_neg_deriv_aux`)
  - `_image_aux`, `_injOn_aux`: Set-theoretic properties needed for change-of-variables integrals.

- **Variable naming:**
  - `σ`: Real part of complex parameter `s = σ + it`
  - `s`: General complex variable in Mellin domain
  - `x`, `u`, `y`: Real variables in time/space and transformed domains
  - `g`: Intermediate function used in proof (`g u = exp(-σ u) • f(exp(-u))`)

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplifying expressions involving `rexp`, `cexp`, `cpow`, `smul`, integrals |
| `rw` | Rewriting using lemmas like `rexp_cexp_aux`, `mellin_eq_fourierIntegral`, etc. |
| `conv` | Localized rewriting in subexpressions (e.g., `conv in cexp _ * _ => lhs; rw [...]`) |
| `field_simp` | Simplifying field expressions (especially with `π ≠ 0`) |
| `norm_cast`, `push_cast` | Moving between real and complex scalars |
| `ring_nf`, `norm_num` | Normalizing arithmetic expressions |
| `fun_prop` | Proving measurability/continuity of compositions |
| `have / replace` | Introducing intermediate facts for later use |
| `calc` | Structured chain of equalities (used heavily in main theorem proof) |

---

#### **4. Proof Logic**

The proof follows a structured chain of reductions:

1. **Change of Variables Setup**  
   - Use substitution `x = exp(-u)` to rewrite Mellin integral as Fourier-type integral.
   - Justify via `integral_image_eq_integral_abs_deriv_smul`, requiring:
     - Differentiability (`rexp_neg_deriv_aux`)
     - Injectivity (`rexp_neg_injOn_aux`)
     - Image characterization (`rexp_neg_image_aux`)

2. **Relate Mellin to Fourier Transform**  
   - Show `mellin f s = 𝓕 g (t)` where `g(u) = exp(-σ u) • f(exp(-u))` and `t = s.im / (2π)`.

3. **Relate Inverse Mellin to Inverse Fourier**  
   - Derive `mellinInv σ f x` in terms of `𝓕⁻` using logarithmic substitution.

4. **Apply Fourier Inversion**  
   - Under assumptions:
     - `MellinConvergent f σ` ⇒ `g` integrable
     - `VerticalIntegrable (mellin f) σ` ⇒ `𝓕 g` integrable
     - `ContinuousAt f x` ⇒ `ContinuousAt g (-log x)`
   - Apply `fourier_inversion` to get `𝓕⁻ (𝓕 g) (-log x) = g(-log x)`

5. **Simplify Back to Original Function**  
   - Use identities:
     - `exp(log x) = x`
     - `x^(-σ) • exp(σ log x) = 1`
     - `rpow_def_of_pos`, `Real.exp_log`, `Complex.ofReal_cpow`

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Fourier.Inversion` | Provides `fourier_inversion`, `fourierIntegral`, `𝓕`, etc. |
| `Mathlib.Analysis.MellinTransform` | Defines `mellin`, `mellinInv`, `MellinConvergent`, `VerticalIntegrable` |

**Scope & Context:**
- Works in a general Banach space `E` over `ℂ` (`[NormedAddCommGroup E] [NormedSpace ℂ E]`)
- Uses `MeasureTheory` for integration and change-of-variables
- `FourierTransform` scope is opened globally (`open scoped FourierTransform`)
- Assumes `CompleteSpace E` for Fourier inversion to apply

---

### Summary

This formalization demonstrates a clean derivation of the **Mellin inversion formula** from the **Fourier inversion theorem**, leveraging:
- Change-of-variables in Lebesgue integration,
- Analytic continuation of exponentials (`rexp`, `cexp`, `cpow`),
- Functional-analytic properties (integrability, continuity),
- And careful handling of complex powers and logarithms.

The structure is highly modular, with auxiliary lemmas isolating key analytic facts (e.g., injectivity, derivative, image), enabling a clean main proof via `calc`.