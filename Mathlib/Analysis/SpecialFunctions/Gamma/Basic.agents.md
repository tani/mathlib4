Here's a structured technical metadata summary of the provided Lean 4 file on the Gamma function:

---

### **1. Key Definitions & Theorems**

#### **Definitions**
| Name | Type | Purpose |
|------|------|---------|
| `Real.Gamma_integrand_isLittleO` | `ℝ → ℝ →o[atTop] ℝ` | Shows integrand `x ↦ e⁻ˣ xˢ` is little-o of `x ↦ e⁻ˣ/²` at `∞`, used for convergence. |
| `Real.GammaIntegral_convergent` | `0 < s → IntegrableOn ...` | Proves Euler integral converges for `s > 0`. |
| `Complex.GammaIntegral_convergent` | `0 < s.re → IntegrableOn ...` | Complex version of convergence (reduces to real case). |
| `Complex.GammaIntegral` | `ℂ → ℂ` | Euler integral definition: `∫ x ∈ Ioi 0, exp(-x) * x^(s-1)`. |
| `Complex.partialGamma` | `ℂ → ℝ → ℂ` | Truncated integral `∫ x ∈ [0, X], exp(-x) * x^(s-1)`. |
| `Complex.GammaAux` | `ℕ → ℂ → ℂ` | Recursive auxiliary function: `Γ(s)` for `re(s) > -n`, else junk. |
| `Complex.Gamma` | `ℂ → ℂ` | Full complex Gamma function, defined via `GammaAux ⌊1 - s.re⌋₊`. |
| `Real.Gamma` | `ℝ → ℝ` | Real Gamma function: `Γ(s) := (Complex.Gamma s).re`. |

#### **Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `Complex.GammaIntegral_add_one` | `0 < s.re → Γ(s+1) = s Γ(s)` | Recurrence for Euler integral (via integration by parts). |
| `Complex.Gamma_add_one` | `s ≠ 0 → Γ(s+1) = s Γ(s)` | Full recurrence for `Γ` on ℂ. |
| `Complex.Gamma_eq_integral` | `0 < s.re → Γ(s) = ∫ ...` | Agreement with Euler integral in domain of convergence. |
| `Complex.Gamma_one` | `Γ(1) = 1` | Base case. |
| `Complex.Gamma_nat_eq_factorial` | `Γ(n+1) = n!` | Matches factorial on positive integers. |
| `Complex.Gamma_zero` | `Γ(0) = 0` | Convention at pole. |
| `Complex.Gamma_neg_nat_eq_zero` | `Γ(-n) = 0` | Convention at negative integers. |
| `Complex.Gamma_conj` | `Γ(conj s) = conj(Γ(s))` | Compatibility with complex conjugation. |
| `Complex.integral_cpow_mul_exp_neg_mul_Ioi` | Integral formula in terms of `Γ`. | Generalized integral identity. |
| `Real.Gamma_eq_integral` | `0 < s → Γ(s) = ∫ ...` | Real version of agreement with Euler integral. |
| `Real.Gamma_add_one` | `s ≠ 0 → Γ(s+1) = s Γ(s)` | Real recurrence. |
| `Real.Gamma_pos_of_pos` | `0 < s → 0 < Γ(s)` | Positivity on positive reals. |
| `Real.Gamma_ne_zero` | `∀ m, s ≠ -m → Γ(s) ≠ 0` | Non-vanishing away from poles. |
| `Real.Gamma_eq_zero_iff` | `Γ(s) = 0 ↔ ∃ m, s = -m` | Full characterization of zeros (by convention). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `Gamma_`: Core Gamma-related results (`Gamma_eq_integral`, `Gamma_add_one`, `Gamma_nat_eq_factorial`).
  - `partialGamma_`: For truncated integrals (`partialGamma_add_one`, `tendsto_partialGamma`).
  - `GammaAux_`: For auxiliary recursive definitions (`GammaAux_recurrence1`, `GammaAux_recurrence2`).
  - `isLittleO`, `convergent`, `intervalIntegrable`: Technical convergence/regularity lemmas.

- **Suffixes**:
  - `_convergent`: Convergence of integrals (`GammaIntegral_convergent`).
  - `_ofReal`: Relating real/complex versions (`GammaIntegral_ofReal`, `Gamma_ofReal`).
  - `_conj`: Conjugation compatibility (`GammaIntegral_conj`, `Gamma_conj`).
  - `_neg_nat_eq_zero`: Behavior at negative integers.

- **Other patterns**:
  - `integral_*`: Integral identities (`integral_cpow_mul_exp_neg_mul_Ioi`, `integral_rpow_mul_exp_neg_mul_Ioi`).
  - `*_eq_*`: Equality theorems (`Gamma_eq_integral`, `Gamma_eq_zero_iff`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- **`simp` / `simp_rw`**: Simplification with definitional equalities and lemmas.
- **`rw`**: Rewriting using equalities (e.g., recurrence, integral definitions).
- **`field_simp`**: Simplifying field expressions (e.g., division, inverses).
- **`intervalIntegral_*`**: Tactics for interval integrals (`intervalIntegral_tendsto_integral_Ioi`, `integral_eq_sub_of_hasDerivAt_of_le`).
- **`convert` / `congr`**: For equational reasoning and congruence closure.
- **`have` / `suffices`**: Intermediate lemma introduction.
- **`filter_upwards` / `eventuallyEq_of_mem`**: Filter-based asymptotic reasoning.
- **`norm_cast` / `push_cast`**: Casting between `ℝ` and `ℂ`.
- **` positivity` / `PositivityExt`**: Custom positivity tactic for `Gamma`.
- **`induction'`**: Structural induction (especially for `GammaAux`, `Gamma_nat_eq_factorial`).
- **`contrapose!`**: Logical contrapositive + simplification.

---

### **4. Proof Logic**

- **Convergence proofs**:
  - Reduce complex case to real case via norm estimates (`norm_eq_abs`, `abs_cpow_eq_rpow_re_of_pos`).
  - Use `isLittleO`/`bigO` to compare integrand with exponentially decaying function.

- **Recurrence relation (`Γ(s+1) = sΓ(s)`)**:
  - Prove for truncated integrals (`partialGamma`) via integration by parts.
  - Use `integral_eq_sub_of_hasDerivAt_of_le` with derivative estimates.
  - Pass to limit using `tendsto_partialGamma` and asymptotic decay of boundary term (`X^s e⁻ˣ → 0`).

- **Extension to all ℂ**:
  - Define `GammaAux` recursively: `Γ₀(s) = ∫...`, `Γₙ₊₁(s) = Γₙ(s+1)/s`.
  - Show consistency: `Γₙ(s) = Γₙ₊₁(s)` when both defined.
  - Define `Γ(s) = Γₙ(s)` for `n = ⌊1 - re(s)⌋₊`, ensuring `re(s) > -n`.

- **Real case**:
  - Define as real part of complex Gamma.
  - Transfer properties via `Complex.Gamma_*` and `ofReal` lemmas.

- **Positivity/non-vanishing**:
  - Use integral positivity (`setIntegral_pos_iff_support_of_nonneg_ae`) for `s > 0`.
  - For general `s`, use recurrence and induction to reduce to `s > 0`.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.ImproperIntegrals` | General theory of improper integrals, convergence tests, interval integrals. |
| `Mathlib.MeasureTheory.Integral.ExpDecay` | Tools for integrals with exponential decay (e.g., `tendsto_rpow_mul_exp_neg_mul_atTop_nhds_zero`). |

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Special functions (Gamma), improper integrals, complex analysis.
- **Key proof patterns**:
  - Reduction to real case for complex results.
  - Asymptotic analysis (`littleO`, `bigO`, `tendsto`).
  - Recursive extension across poles via functional equation.
- **Critical lemmas for automation**:
  - `Gamma_eq_integral`, `Gamma_add_one`, `Gamma_nat_eq_factorial`.
  - `integral_cpow_mul_exp_neg_mul_Ioi`, `integral_rpow_mul_exp_neg_mul_Ioi`.
- **Custom tactics**: `positivity` extension for `Gamma` positivity reasoning.

Let me know if you'd like a formalized tactic or automation sketch for this domain!