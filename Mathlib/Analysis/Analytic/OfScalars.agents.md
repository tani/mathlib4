Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Scalar Formal Power Series in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ofScalars` | `def ofScalars (c : ℕ → 𝕜) : FormalMultilinearSeries 𝕜 E E` | Constructs a formal multilinear series from scalar coefficients `c : ℕ → 𝕜`, where each coefficient is scaled into the `n`-ary continuous multilinear map space via `smul`. |
| `ofScalarsSum` | `noncomputable def ofScalarsSum := (ofScalars E c).sum` | Defines the analytic function `x ↦ ∑' n, c n • x ^ n`, returning `0` outside the radius of convergence. |
| `ofScalars_apply_eq` | `ofScalars E c n (fun _ ↦ x) = c n • x ^ n` | Evaluates the `n`-th term of the series at `x ∈ E`. |
| `ofScalars_sum_eq` | `ofScalarsSum c x = ∑' n, c n • x ^ n` | Equates the sum function with the tsum of scalar powers. |
| `ofScalars_norm_eq_mul` | `‖ofScalars E c n‖ = ‖c n‖ * ‖mkPiAlgebraFin n E‖` | Norm of the `n`-th term as product of scalar norm and multilinear map norm. |
| `ofScalars_radius_ge_inv_of_tendsto` | `r ≠ 0 → Tendsto (‖c n.succ‖ / ‖c n‖) → radius ≥ r⁻¹` | Lower bound on radius via ratio test. |
| `ofScalars_radius_eq_inv_of_tendsto` | `[NormOneClass E] → r ≠ 0 → Tendsto (‖c n.succ‖ / ‖c n‖) → radius = r⁻¹` | Exact radius via ratio test under norm-one assumption. |
| `ofScalars_radius_eq_of_tendsto` | `[NormOneClass E] → r ≠ 0 → Tendsto (‖c n‖ / ‖c n.succ‖) → radius = r` | Convenience reformulation using inverse ratio. |
| `ofScalars_radius_eq_top_of_tendsto` | `∀ᶠ n, c n ≠ 0 → Tendsto (‖c n.succ‖ / ‖c n‖) = 0 → radius = ⊤` | Infinite radius when ratio tends to zero (coefficients eventually nonzero). |
| `ofScalars_radius_eq_zero_of_tendsto` | `[NormOneClass E] → Tendsto (‖c n.succ‖ / ‖c n‖) = ⊤ → radius = 0` | Zero radius when ratio diverges to infinity. |
| `ofScalars_radius_eq_inv_of_tendsto_ENNReal` | `Tendsto (ENNReal.ofReal ‖c n.succ‖ / ENNReal.ofReal ‖c n‖) → radius = r⁻¹` | Generalized ratio test using `ENNReal`, removing need for eventual nonvanishing of coefficients. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `ofScalars_`: All definitions and lemmas related to scalar-derived series.
  - `norm_`, `radius_`, `sum_`: Functional properties (norms, convergence radius, sums).
- **Suffixes**:
  - `_eq`: Equality lemmas (e.g., `ofScalars_apply_eq`).
  - `_le`, `_ge`: Inequality lemmas (e.g., `ofScalars_radius_ge_inv_of_tendsto`).
  - `_of_tendsto`: Ratio-test-style convergence radius results.
  - `_of_scalar_zero`, `_of_subsingleton`: Edge cases (zero coefficients or trivial spaces).
  - `_inv`, `_top`, `_zero`: Special cases for radius values.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification with many `@[simp]` lemmas.
- `aesop`: Automated reasoning for inequalities and logical structure.
- `gcongr`: For monotonicity in inequalities involving norms and powers.
- `tendsto_*` lemmas: `tendsto_mul`, `tendsto_div`, `tendsto_const_nhds`, `tendsto_toReal`, etc.
- `filter_upwards`, `Eventually.*`: Handling cofinite filters and eventually properties.
- `convert`, `congrArg`, `funext`: Equality reasoning, especially for functions.
- `nontriviality`, `subsingleton_cases`: Handling special type classes (`Subsingleton`, `Nontrivial`).
- `rw [← ...]`: Rewriting with reversed equalities (e.g., for `MulOpposite`).

#### **4. Proof Logic & Strategy**

- **Inductive/structural reasoning** on `n : ℕ` (e.g., `cases n` in `ofScalars_apply_zero`).
- **Ratio test-based radius analysis**:
  - Use `summable_of_ratio_test_tendsto_lt_one` / `not_summable_of_ratio_test_tendsto_gt_one`.
  - Prove `radius ≥ r⁻¹` and `radius ≤ r⁻¹` separately for equality.
- **Case analysis on radius value**:
  - In `ofScalars_radius_eq_inv_of_tendsto_ENNReal`, split on `r = 0`, `r = ∞`, or `0 < r < ∞`.
- **Handling edge cases**:
  - `Subsingleton E`: All multilinear maps vanish → series is zero.
  - `Nontrivial E`: Enables injectivity and extensionality arguments.
- **Use of `ENNReal`** to unify all cases (including division by zero/infinity) in final theorem.

#### **5. Imports & Dependencies**

- **Core dependency**: `Mathlib.Analysis.Analytic.Basic`
- **Key algebraic structures**:
  - `Field`, `Ring`, `Algebra`, `TopologicalSpace`, `TopologicalRing`
  - `NormedField`, `NormedRing`, `NormedAlgebra`, `NontriviallyNormedField`
  - `NormOneClass`, `BoundedSMul` (implicit)
- **Topological & measure-theoretic tools**:
  - `Filter`, `ENNReal`, `NNReal`, `Topology`, `MetricSpace` (via `NormedSpace`)
- **Multilinear maps**:
  - `ContinuousMultilinearMap`, especially `mkPiAlgebraFin` for tensor-like structure.

---

This module formalizes scalar-coefficient analytic functions as formal multilinear series, with a robust API for convergence radius computation via ratio tests — including a fully general `ENNReal`-based version. It leverages Lean’s typeclass infrastructure and advanced analysis libraries to handle edge cases and infinite radii uniformly.