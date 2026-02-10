### Technical Metadata Brief: Japanese Bracket Integrability in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sqrt_one_add_norm_sq_le` | `∀ x, √(1 + ‖x‖²) ≤ 1 + ‖x‖` | Upper bound for the Japanese bracket via triangle inequality in ℝ |
| `one_add_norm_le_sqrt_two_mul_sqrt` | `∀ x, 1 + ‖x‖ ≤ √2 · √(1 + ‖x‖²)` | Lower bound for $1 + \|x\|$ in terms of the Japanese bracket |
| `rpow_neg_one_add_norm_sq_le` | `∀ x, (1 + ‖x‖²)^(-r/2) ≤ 2^(r/2) · (1 + ‖x‖)^(-r)` | Compares decay rates of Japanese bracket and linear norm powers |
| `le_rpow_one_add_norm_iff_norm_le` | `t ≤ (1 + ‖x‖)^(-r) ↔ ‖x‖ ≤ t^(-1/r) - 1` | Equivalence used to rewrite level sets for layer-cake representation |
| `closedBall_rpow_sub_one_eq_empty_aux` | `Metric.closedBall 0 (t^(-1/r) - 1) = ∅` under conditions | Shows that for large $t$, the closed ball is empty (used in tail estimate) |
| `finite_integral_rpow_sub_one_pow_aux` | Integrability of $(x^{-1/r} - 1)^n$ over $(0,1]$ | Key auxiliary estimate for the layer-cake integral near 0 |
| `finite_integral_one_add_norm` | $\int (1 + \|x\|)^{-r} d\mu < \infty$ if $r > \dim E$ | Main integrability result for linear decay |
| `integrable_one_add_norm` | $(1 + \|x\|)^{-r} \in L^1(\mu)$ under same condition | Concludes integrability (not just finite integral) |
| `integrable_rpow_neg_one_add_norm_sq` | $(1 + \|x\|^2)^{-r/2} \in L^1(\mu)$ under same condition | Integrability of Japanese bracket decay via comparison |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `finite_...`: asserts finiteness of an integral (often w.r.t. `ENNReal.ofReal`)
  - `integrable_...`: asserts membership in $L^1$
  - `le_...`, `..._le`: inequalities (upper/lower bounds)
  - `..._aux`: auxiliary lemmas used in main proofs
- **Suffixes:**
  - `_eq_empty`: proves a set is empty
  - `_iff_...`: characterizes membership or inequality via equivalence
  - `_mul_const`, `_const_mul`: used when factoring out constants in integrals
  - `_mono'`: monotonicity-based integrability comparison
- **Function names:**
  - `rpow_...`: powers with real exponents (`rpow` = real power)
  - `lintegral_...`: lower Lebesgue integral (ENNReal-valued)
  - `setLIntegral_...`: integral over a set (often via layer cake)

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `rw` / `simp` | Rewriting definitions (e.g., `rpow_div_two_eq_sqrt`, `mul_rpow`) |
| `gcongr` | Monotonicity for inequalities involving powers and products |
| `linarith` | Linear arithmetic over reals (e.g., from `sq_nonneg`) |
| ` positivity` | Proves positivity of expressions (used heavily in assumptions) |
| `exact` / `apply` | Direct proof steps (e.g., applying lemmas like `mul_inv_cancel_left₀`) |
| `congr 1` / `ext` | Extensionality for set equality (e.g., level sets) |
| `setLIntegral_congr_fun` / `lintegral_congr` | Replace integrands on almost-everywhere equal sets |
| `lintegral_mono_set` / `lintegral_union_le` | Monotonicity and subadditivity of integral |
| `intervalIntegral.intervalIntegrable_rpow'` | Integrability of power functions on intervals |
| `aesop` / `simp_rw` (implied) | Not explicitly used, but `simp` + `rw` cover most simplifications |
| `have h := ...` + `calc` | Structured calculation chains (e.g., in `rpow_neg_one_add_norm_sq_le`) |

---

#### **4. Proof Logic Flow**

- **Structure of main proofs:**
  - **Layer-cake representation**: Use `lintegral_eq_lintegral_meas_le` to rewrite integral as $\int_0^\infty \mu\{x : t \le f(x)\} dt$
  - **Split domain**: Decompose $\int_{(0,\infty)} = \int_{(0,1]} + \int_{(1,\infty)}$
    - Near 0: Estimate measure of level sets using `le_rpow_one_add_norm_iff_norm_le`, then reduce to `finite_integral_rpow_sub_one_pow_aux`
    - Near ∞: Show level sets become empty ⇒ integral vanishes
  - **Comparison lemmas**: Use `rpow_neg_one_add_norm_sq_le` to transfer integrability from $(1 + \|x\|)^{-r}$ to $(1 + \|x\|^2)^{-r/2}$
  - **Finite-dimensional structure**: Crucial for Haar measure scaling (via `addHaar_closedBall`) and dimension comparison (`finrank ℝ E < r`)

- **Induction**: Not used directly; instead, rely on dimension-based estimates (`finrank ℝ E` as exponent in power terms)

- **Measure-theoretic tools**:
  - `MeasurableSpace`, `BorelSpace`, `IsAddHaarMeasure` assumptions ensure standard Lebesgue-like integration
  - `aemeasurable`, `ae_of_all`, `aestronglyMeasurable` for almost-everywhere arguments

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.Integrals` | Basic integral theory, interval integrals, `intervalIntegrable` |
| `Mathlib.MeasureTheory.Measure.Lebesgue.EqHaar` | Equivalence of Lebesgue and Haar measure on ℝⁿ (via `IsAddHaarMeasure`) |
| `Mathlib.MeasureTheory.Integral.Layercake` | Layer-cake representation (`lintegral_eq_lintegral_meas_le`) |

**Domain scope**:  
- Normed vector spaces over ℝ, finite-dimensional (via `FiniteDimensional ℝ E`)  
- Borel measurable spaces with Haar measure (i.e., Lebesgue measure up to scaling)  
- Real-valued functions with power-law decay  
- Applications: Sobolev spaces, weighted $L^p$ spaces, PDE decay estimates

---

Let me know if you'd like a diagram of the proof dependencies or a formalized summary for use in a domain-specific AI agent.