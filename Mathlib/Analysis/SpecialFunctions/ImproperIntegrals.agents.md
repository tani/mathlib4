Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Evaluation of Specific Improper Integrals**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `integrableOn_exp_Iic` | `exp` is integrable on `Iic c` (i.e., `(-∞, c]`) — used to justify improper integral existence. |
| `integral_exp_Iic` | `∫ x in Iic c, exp x = exp c` — evaluation of the improper integral of `exp` over a left-closed ray. |
| `integral_exp_Iic_zero` | Special case: `∫ x in Iic 0, exp x = 1`. |
| `integral_exp_neg_Ioi` | `∫ x in Ioi c, exp (-x) = exp (-c)` — integral of decaying exponential over `(c, ∞)`. |
| `integral_exp_neg_Ioi_zero` | Special case: `∫ x in Ioi 0, exp (-x) = 1`. |
| `integrableOn_Ioi_rpow_of_lt` | If `a < -1` and `c > 0`, then `t ↦ t^a` is integrable on `(c, ∞)`. |
| `integrableOn_Ioi_rpow_iff` | Characterization: `t ↦ t^s` integrable on `(t, ∞)` (with `t > 0`) **iff** `s < -1`. |
| `not_integrableOn_Ioi_rpow` | `t ↦ t^s` is **never** integrable on `(0, ∞)` for any real `s`. |
| `setIntegral_Ioi_zero_rpow` | Integral undefined (hence zero by convention) when non-integrable: `∫ x in Ioi 0, x^s = 0`. |
| `integral_Ioi_rpow_of_lt` | Explicit evaluation: `∫ t in Ioi c, t^a = -c^(a+1)/(a+1)` for `a < -1`, `c > 0`. |
| `integrableOn_Ioi_cpow_of_lt` | Complex power `(t : ℂ)^a` integrable on `(c, ∞)` iff `a.re < -1` and `c > 0`. |
| `integrableOn_Ioi_cpow_iff` | Complex version of real characterization: integrability ⇔ real part < -1. |
| `not_integrableOn_Ioi_cpow` | Complex power not integrable on `(0, ∞)` for any complex exponent. |
| `setIntegral_Ioi_zero_cpow` | Undefined integral → 0: `∫ x in Ioi 0, (x : ℂ)^s = 0`. |
| `integral_Ioi_cpow_of_lt` | Complex evaluation: `∫ t in Ioi c, (t : ℂ)^a = -c^(a+1)/(a+1)` (complex power). |
| `integrable_inv_one_add_sq` | `x ↦ (1 + x²)⁻¹` is integrable over all `ℝ`. |
| `integral_Iic_inv_one_add_sq` | `∫ x in Iic i, (1 + x²)⁻¹ = arctan i + π/2`. |
| `integral_Ioi_inv_one_add_sq` | `∫ x in Ioi i, (1 + x²)⁻¹ = π/2 - arctan i`. |
| `integral_univ_inv_one_add_sq` | Full-line integral: `∫ x, (1 + x²)⁻¹ = π`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `integrableOn_...`: asserts integrability on a set.
  - `integral_...`: evaluates an integral over a specific set.
  - `setIntegral_...`: value of an *undefined* (non-integrable) integral (conventionally 0).
  - `not_integrableOn_...`: proof of non-integrability.

- **Suffixes**:
  - `_Iic`: over `(-∞, c]`
  - `_Ioi`: over `(c, ∞)`
  - `_Iio`, `_Ici`, `_Ioo`: (implied by context; not used here but standard in Mathlib).
  - `_zero`: special case `c = 0`.
  - `_neg`: for integrands involving `exp (-x)`.

- **Other patterns**:
  - `_rpow`: real power function `x ^ a`.
  - `_cpow`: complex power `(x : ℂ) ^ a`.
  - `_inv_one_add_sq`: integrand `(1 + x²)⁻¹`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `refine`, `convert`, `exact`, `simpa`, `simp_rw`, `rw`
- `have`, `suffices`, `contrapose!`, `intro`, `rcases`, `cases`
- `linarith`, `field_simp`, `norm_num`
- `tendsto_*` lemmas (`tendsto_id`, `tendsto_exp_atBot`, `tendsto_rpow_neg_atTop`, etc.)
- `integrableOn_*` and `integral_*` lemmas for structural decomposition
- `aesop` (likely used implicitly via `intervalIntegral_tendsto_integral_*` lemmas)

---

#### **4. Proof Logic**

- **Structure**:
  1. **Integrability first**: Prove integrability using comparison tests (e.g., bounding by `rpow` with exponent `< -1`), derivative-based criteria (`integrableOn_Ioi_deriv_of_nonneg'`), or norm estimates (`integrable_norm_iff` for complex cases).
  2. **Evaluation via Fundamental Theorem of Calculus**:
     - Identify an antiderivative `F` (e.g., `t^(a+1)/(a+1)` for `t^a`, `arctan` for `(1+x²)⁻¹`).
     - Show `F` tends to a limit at the infinite endpoint (e.g., `tendsto_rpow_neg_atTop`).
     - Apply `integral_Ioi_of_hasDerivAt_of_tendsto'` or `integral_Iic_of_hasDerivAt_of_tendsto'`.
  3. **Non-integrability proofs**:
     - Use contrapositive: assume integrability, restrict to a subinterval where behavior is known (e.g., near 0 or ∞), derive contradiction with known non-integrability (e.g., `x⁻¹` on `(1, ∞)`).
  4. **Complex case**:
     - Reduce to real case via norm estimates (`Complex.abs_cpow_eq_rpow_re_of_pos`) and real part conditions.

- **Induction/Case splits**:
  - Rarely induction; mostly case analysis on `s ≤ -1` vs `s > -1` (real or complex), or `c > 0` vs `c ≤ 0`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Analysis.SpecialFunctions.JapaneseBracket` — integrability of `(1 + ‖x‖)^(-r)`
- `Mathlib.Analysis.SpecialFunctions.Integrals` — finite-interval integrals
- `Mathlib.Analysis.SpecialFunctions.Gaussian` — Gaussian integral (`exp (-x²)`)
- `Mathlib.MeasureTheory.Group.Integral` — group-invariant integrals (used for translation-invariance)
- `Mathlib.MeasureTheory.Integral.IntegralEqImproper` — equivalence of Bochner and improper Riemann integrals
- `Mathlib.MeasureTheory.Measure.Lebesgue.Integral` — Lebesgue integral basics

**Domain**:  
Real and complex improper integrals over half-infinite intervals (`Iic`, `Ioi`) and `ℝ`, with focus on:
- Exponential decay (`exp`, `exp (-x)`)
- Power functions (`x^a`, complex powers)
- Rational functions (`(1 + x²)⁻¹`)

**Mathlib Module Scope**:  
Analysis → Measure Theory → Improper Integrals → Special Functions.

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific theorem.