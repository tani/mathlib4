Here is a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Polar Coordinates in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `polarCoord` (Real) | `PartialHomeomorph (ℝ × ℝ) (ℝ × ℝ)` — maps a point `(x, y) ∈ ℝ² \ (-∞, 0]` to polar coordinates `(r, θ)` with `r > 0`, `θ ∈ (-π, π)`. |
| `polarCoord.symm` | `(r, θ) ↦ (r cos θ, r sin θ)` — inverse of `polarCoord`, defined on `(0, ∞) × (-π, π)`. |
| `hasFDerivAt_polarCoord_symm` | `HasFDerivAt polarCoord.symm (Jacobian matrix) p` — gives the Fréchet derivative of the inverse polar coordinate map at `p`. |
| `det_fderiv_polarCoord_symm` | `det(jacobian) = p.1` — determinant of the Jacobian of `polarCoord.symm` equals the radial component `r`. |
| `polarCoord_source_ae_eq_univ` | `polarCoord.source =ᵐ[volume] univ` — the source of `polarCoord` differs from the full space only on a measure-zero set (the non-positive real axis). |
| `integral_comp_polarCoord_symm` | Change-of-variables formula: `∫ p in target, r • f(polarCoord.symm p) = ∫ p, f p`. |
| `lintegral_comp_polarCoord_symm` | Analogous formula for non-negative extended-real-valued functions (`∫⁻`). |
| `Complex.polarCoord` | `PartialHomeomorph ℂ (ℝ × ℝ)` — polar coordinates on the complex plane, via identification `ℂ ≃ ℝ²`. |
| `Complex.polarCoord_apply` | `polarCoord a = (|a|, arg a)` — explicit formula for `polarCoord` on `ℂ`. |
| `Complex.polarCoord_symm_apply` | `polarCoord.symm (r, θ) = r * (cos θ + i sin θ)` — inverse map in complex form. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `polarCoord_`: for definitions and properties of the polar coordinate map.
  - `hasFDerivAt_`, `det_fderiv_`: for derivative-related lemmas.
  - `integral_comp_`, `lintegral_comp_`: for change-of-variables integrals.
  - `measurableEquivRealProd_`: for compatibility with `ℂ ≃ ℝ²`.

- **Suffixes**:
  - `_symm`: for inverse map properties.
  - `_apply`: for evaluation formulas.
  - `_source`, `_target`: for domain/codomain specifications.

- **General patterns**:
  - `is_`, `mul_`, `dist_` not used here.
  - `ofReal`, `ENNReal.ofReal`: for lifting reals to extended non-negative reals.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using definitional equalities and lemmas (e.g., `sqrt_sq`, `sin_sq_add_cos_sq`, `Complex.arg_mul_cos_add_sin_mul_I`). |
| `ring` | Algebraic simplification in real/linear algebra contexts. |
| `conv_rhs => rw [...]` | Right-hand side rewriting in congruence proofs. |
| `convert ... using n` | Matching goals up to `n` subgoals (used in derivative proofs). |
| `filter_upwards` | For almost-everywhere arguments in measure theory. |
| `apply setIntegral_congr_*` | Measure-theoretic integral equalities via a.e. equality. |
| `rw [← ...]` | Rewriting using inverse equivalences (e.g., `equivRealProdCLM`). |
| `exacts [...]` | Supplying multiple `exact` goals at once. |
| `aesop` not used — relies on manual `simp`/`linarith`/`ring` tactics.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Partial homeomorphism verification**: Prove `toFun`, `invFun`, `source`, `target`, then verify `map_source'`, `map_target'`, `left_inv'`, `right_inv'`, openness, and continuity.
  - **Derivative lemmas**: Use `HasFDerivAt.prod`, chain rule (`comp_hasFDerivAt`), and matrix determinant simplifications.
  - **Measure-theoretic lemmas**:
    - Show source is co-null (`polarCoord_source_ae_eq_univ`) via inclusion in a measure-zero subspace (`LinearMap.ker snd`).
    - Apply change-of-variables theorems (`integral_target_eq_integral_abs_det_fderiv_smul`, `lintegral_image_eq_lintegral_abs_det_fderiv_mul`) using computed Jacobian determinant.
    - Simplify `|p.1|` to `p.1` using positivity on the target (`hx.1 : 0 < p.1`).
  - **Complex case**: Lift real results via `equivRealProdCLM`, using `volume_preserving_equiv_real_prod` to transfer integrals.

- **Induction**: Not used — proofs are direct and rely on calculus and measure-theoretic lemmas.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.MeasureTheory.Function.Jacobian` | Change-of-variables and Jacobian determinant machinery. |
| `Mathlib.MeasureTheory.Measure.Lebesgue.Complex` | Lebesgue measure on `ℂ`, identification with `ℝ²`. |
| `Mathlib.Analysis.SpecialFunctions.Trigonometric.Deriv` | Derivatives of `sin`, `cos`, and related lemmas. |

Additional scope imports:
- `ENNReal`, `Real`, `Topological` — for extended reals, topology, and real analysis.

---

### **Summary**

This file formalizes polar coordinates as a partial homeomorphism in both `ℝ²` and `ℂ`, proves smoothness (via Fréchet derivative), computes the Jacobian determinant (`= r`), and establishes the change-of-variables formula for integrals. It leverages Lean’s measure theory library extensively, especially for handling null sets and applying the Jacobian change-of-variables theorem. The proofs are constructive and rely on careful simplification and application of existing analysis and measure theory lemmas.

--- 

Let me know if you'd like a dependency graph or a summary of how this integrates with other coordinate systems (e.g., spherical).