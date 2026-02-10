Here is a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `Gammaℝ` | `ℂ → ℂ`, `Gammaℝ s := π ^ (-s / 2) * Gamma (s / 2)` | Deligne’s archimedean Gamma factor for real places |
| `Gammaℂ` | `ℂ → ℂ`, `Gammaℂ s := 2 * (2 * π) ^ (-s) * Gamma s` | Deligne’s archimedean Gamma factor for complex places |
| `Gammaℝ_def`, `Gammaℂ_def` | definitional equalities | Simplify rewriting of definitions |
| `Gammaℝ_add_two` | `Gammaℝ (s + 2) = Gammaℝ s * s / 2 / π` (for `s ≠ 0`) | Functional recurrence for `Gammaℝ` |
| `Gammaℂ_add_one` | `Gammaℂ (s + 1) = Gammaℂ s * s / 2 / π` (for `s ≠ 0`) | Functional recurrence for `Gammaℂ` |
| `Gammaℝ_ne_zero_of_re_pos` | `0 < re s → Gammaℝ s ≠ 0` | Non-vanishing in right half-plane |
| `Gammaℝ_eq_zero_iff` | `Gammaℝ s = 0 ↔ ∃ n : ℕ, s = -(2 * n)` | Full zero set characterization |
| `Gammaℝ_one`, `Gammaℂ_one` | `Gammaℝ 1 = 1`, `Gammaℂ 1 = 1 / π` | Normalization at `s = 1` |
| `differentiable_Gammaℝ_inv` | `Differentiable ℂ (fun s ↦ (Gammaℝ s)⁻¹)` | Analyticity of reciprocal |
| `Gammaℝ_residue_zero` | `Tendsto (s * Gammaℝ s) (𝓝[≠] 0) (𝓝 2)` | Residue at pole `s = 0` |
| `Gammaℝ_mul_Gammaℝ_add_one` | `Gammaℝ s * Gammaℝ (s + 1) = Gammaℂ s` | Doubles formula reformulated |
| `Gammaℝ_one_sub_mul_Gammaℝ_one_add` | `Gammaℝ (1 - s) * Gammaℝ (1 + s) = (cos (π * s / 2))⁻¹` | Reflection formula (even symmetry) |
| `Gammaℝ_div_Gammaℝ_one_sub` | `Gammaℝ s / Gammaℝ (1 - s) = Gammaℂ s * cos (π * s / 2)` (under non-vanishing) | Ratio form of reflection |
| `inv_Gammaℝ_one_sub` | `(Gammaℝ (1 - s))⁻¹ = Gammaℂ s * cos (π * s / 2) * (Gammaℝ s)⁻¹` | Tailored for *even* Dirichlet L-functions |
| `inv_Gammaℝ_two_sub` | `(Gammaℝ (2 - s))⁻¹ = Gammaℂ s * sin (π * s / 2) * (Gammaℝ (s + 1))⁻¹` | Tailored for *odd* Dirichlet L-functions |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `Gammaℝ_`, `Gammaℂ_`: for properties of Deligne’s Gamma factors.
  - `differentiable_`, `analyticity_`: for regularity properties.
  - `inv_`, `div_`, `mul_`: for algebraic manipulations (e.g., `inv_Gammaℝ_one_sub`, `div_Gammaℝ_one_sub`).
- **Suffixes**:
  - `_def`: definitional lemmas.
  - `_of_re_pos`: conditions on real part.
  - `_eq_zero_iff`: zero-characterization lemmas.
  - `_one`, `_two`: special values at `1` or `2`.
  - `_add_one`, `_add_two`: recurrence lemmas.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: for rewriting definitions and simplifying expressions.
- `field_simp`: for simplifying field expressions (especially with `pi_ne_zero`, `two_ne_zero`).
- `ring`, `ring_nf`: for algebraic simplification in ℂ.
- `exact`, `convert`, `apply`, `refine`: for constructing proofs.
- `tendsto_*`, `continuousAt_*`, `differentiable_*`: for analytic arguments.
- `cases'`, `intro`, `have`, `by_cases`: for logical decomposition.
- `mul_one`, `div_self`, `inv_inv`, `inv_mul_cancel`: algebraic simplifications.

---

### **4. Proof Logic**

- **Structure**: Proofs follow a standard pattern:
  1. **Unfold definitions** (`rw [Gammaℝ_def]`, etc.).
  2. **Apply known identities** (e.g., `Gamma_mul_Gamma_add_half`, `Gamma_mul_Gamma_one_sub`, `cpow_add`, `sin_pi_div_two_sub`).
  3. **Simplify algebraically** (`ring`, `field_simp`).
  4. **Use analytic facts** (e.g., differentiability, continuity, residue behavior).
- **Induction/Recurrence**: Proofs of `Gammaℝ_add_two`, `Gammaℂ_add_one` rely on `Gamma_add_one` and properties of complex exponentiation.
- **Reflection**: Proofs of reflection-type lemmas use:
  - `Gamma_mul_Gamma_one_sub` (Euler reflection),
  - trigonometric identities (`sin_pi_div_two_sub`, `cos_sub_pi_div_two`),
  - algebraic rearrangements to isolate `cos` or `sin` terms.
- **Analyticity**: Proofs of differentiability/residue use composition rules (`Differentiable.comp`, `tendsto_mul`, etc.) and known behavior of `Gamma`.

---

### **5. Imports**

- `Mathlib.Analysis.SpecialFunctions.Gamma.Beta`: Provides core properties of `Complex.Gamma`, including:
  - `Gamma_eq_zero_iff`, `Gamma_ne_zero_of_re_pos`, `Gamma_mul_Gamma_add_half`, `Gamma_mul_Gamma_one_sub`, `Gamma_one`, `Gamma_one_half_eq`.
- Standard imports via `open`:
  - `Filter`, `Topology`, `Asymptotics`, `Real`, `Set`, `MeasureTheory`
  - `Complex hiding abs_of_nonneg`: for complex analysis tools.

---

### **Domain-Specific Notes**

- **Mathematical Context**: This formalization supports the theory of **functional equations of L-functions**, especially Dirichlet L-functions and Dedekind zeta functions.
- **Notation**: Uses `π` for `Real.pi` coerced to `ℂ`, and `^` for complex exponentiation (`cpow`).
- **Key Insight**: Deligne’s Gamma factors unify real and complex places via analytic continuation and functional equations; this file formalizes their algebraic and analytic foundations.

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader L-function formalization project.