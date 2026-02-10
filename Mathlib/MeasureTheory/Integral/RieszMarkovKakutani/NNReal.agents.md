**Technical Brief: `NNReal.lean` — Riesz–Markov–Kakutani Representation Theorem for `ℝ≥0`**

---

### 1. Key Definitions & Theorems

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Λ` | `C_c(X, ℝ≥0) →ₗ[ℝ≥0] ℝ≥0` | A positive (i.e., `ℝ≥0`-linear and nonnegative on nonnegative functions) linear functional on compactly supported continuous `ℝ≥0`-valued functions. |
| `toRealLinear Λ` | `C_c(X, ℝ) →ₗ[ℝ] ℝ` | The unique `ℝ`-linear extension of `Λ` to real-valued compactly supported continuous functions, defined via `f ↦ Λ(f⁺) - Λ(f⁻)`. |
| `rieszMeasure Λ` | `Measure X` | The measure constructed from `Λ` via the `ℝ`-version of the Riesz–Markov–Kakutani theorem, applied to `toRealLinear Λ`. |
| `integralLinearMap μ` | `C_c(X, ℝ≥0) →ₗ[ℝ≥0] ℝ≥0` | The `ℝ≥0`-linear functional induced by a regular Borel measure `μ`, defined as `f ↦ ∫ f ∂μ` (interpreted as an `ℝ≥0`-valued integral). |
| `integral_rieszMeasure` | `∀ f, ∫ (x : X), (f x : ℝ) ∂(rieszMeasure Λ) = Λ f` | Main representation theorem: the real-valued integral w.r.t. `rieszMeasure Λ` recovers `Λ`. |
| `lintegral_rieszMeasure` | `∀ f, ∫⁻ (x : X), f x ∂(rieszMeasure Λ) = Λ f` | Same as above, but for the lower (extended nonnegative) Lebesgue integral. |
| `rieszMeasure_regular` | `instance` | Shows `rieszMeasure Λ` is regular (i.e., inner regular on open sets, outer regular on all measurable sets). |
| `Measure.ext_of_integral_eq_on_compactlySupported_nnreal` | `∀ μ ν, (∀ f, ∫ f ∂μ = ∫ f ∂ν) → μ = ν` | Uniqueness of regular measures via agreement on integrals over `C_c(X, ℝ≥0)`. |
| `integralLinearMap_inj` | `integralLinearMap μ = integralLinearMap ν ↔ μ = ν` | Injectivity of `integralLinearMap` on regular measures. |
| `rieszMeasure_integralLinearMap` | `rieszMeasure (integralLinearMap μ) = μ` | Surjectivity of `rieszMeasure` onto regular measures. |
| `integralLinearMap_rieszMeasure` | `integralLinearMap (rieszMeasure Λ) = Λ` | Left-inverse property: `integralLinearMap ∘ rieszMeasure = id`. |

---

### 2. Naming Conventions

- **Prefixes**:
  - `rieszMeasure_`: constructs a measure from a functional.
  - `integralLinearMap_`: constructs a functional from a measure.
  - `toRealLinear`: passage from `ℝ≥0`-linear to `ℝ`-linear.
  - `nnrealPart`, `toReal`: operations on `ℝ≥0`-valued functions to relate them to real-valued ones.

- **Suffixes**:
  - `_regular`: regularity property of a measure.
  - `_inj`, `_surj`: injectivity/surjectivity statements (though not explicitly named here, implied by `inj`, `rieszMeasure_integralLinearMap`).
  - `_eq_on_compactlySupported_nnreal`: uniqueness criterion for measures via integrals over `C_c(X, ℝ≥0)`.

- **Module-level**:
  - `NNRealRMK`: namespace for the `ℝ≥0`-version of the Riesz–Markov–Kakutani theorem.

---

### 3. Tactic Stack

- `rw`: rewriting using lemmas and definitions (especially `←`, `→`).
- `simp`: simplification using `@[simp]` lemmas and definitional equalities.
- `ext`: extensionality (e.g., for measures or functions).
- `congr`: congruence reasoning.
- `erw`: e-rewriting (allows rewriting under binders).
- `intro`, `repeat`, `apply`, `exact`: basic proof scripting.
- `fun_prop`: for proving properties of functions (e.g., continuity, integrability).
- `rw [lintegral_coe_eq_integral]`, `ENNReal.ofNNReal_toNNReal`, etc.: specialized rewrites for measure-theoretic conversions.

---

### 4. Proof Logic

The logical flow is **reduction-based**:

1. **Lift** the `ℝ≥0`-linear functional `Λ` to an `ℝ`-linear functional `toRealLinear Λ`.
2. **Apply** the known `ℝ`-version of the Riesz–Markov–Kakutani theorem (`RealRMK.integral_rieszMeasure`) to `toRealLinear Λ`.
3. **Translate** back to the `ℝ≥0`-setting using:
   - `eq_toRealPositiveLinear_toReal`: identification of `Λ` with the restriction of `toRealLinear Λ`.
   - `toReal`: coercion from `ℝ≥0` to `ℝ`.
4. **Verify regularity** of `rieszMeasure Λ` via `rieszContent Λ`.
5. **Show bijectivity** of the correspondence:
   - Injectivity: use `Measure.ext_of_integral_eq_on_compactlySupported_nnreal`.
   - Surjectivity: use `rieszMeasure_integralLinearMap`.
   - Inverses: `integralLinearMap_rieszMeasure` and `rieszMeasure_integralLinearMap`.

Induction or case analysis is *not* used; the proof is structural and relies on categorical equivalence between functionals and measures.

---

### 5. Imports

- `Mathlib.MeasureTheory.Integral.RieszMarkovKakutani.Real`: the `ℝ`-valued version of the theorem (used as a black box).
- Standard measure theory infrastructure:
  - `MeasureTheory.Integral`
  - `MeasureTheory.Measure.Regular`
  - `MeasureTheory.Measure.BorelSpace`
- `CompactlySupported` and `CompactlySupportedContinuousMap`: for `C_c(X, ℝ≥0)`.
- `NNReal`-scoped notation (`open scoped NNReal`).

---

### 6. Mermaid Diagrams

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[Topological Space X] --> B[Locally Compact, T2, Measurable, Borel]
  B --> C[C_c(X, ℝ≥0)]
  C --> D[Linear Functional Λ : C_c →ₗ[ℝ≥0] ℝ≥0]
  D --> E[toRealLinear Λ : C_c(X, ℝ) →ₗ[ℝ] ℝ]
  E --> F[RealRMK.rieszMeasure]
  F --> G[rieszMeasure Λ]
  G --> H[Regular Measure]
  H --> I[integralLinearMap]
  I --> D
  D <-->|bijection| H
```

#### Overview of `NNReal.lean`

```mermaid
flowchart LR
  subgraph Theory
    A[Locally Compact T2 Space X] --> B[C_c(X, ℝ≥0)]
    B --> C[Positive Linear Functionals Λ]
    C --> D[rieszMeasure Λ]
    D --> E[Regular Measures]
    E --> F[integralLinearMap μ]
    F --> C
  end

  subgraph Tools
    RealRMK[Real-valued Riesz–Markov–Kakutani]
    toRealLinear[Extension to ℝ-linear]
    MeasureExt[Uniqueness via integrals]
  end

  C -->|reduction| RealRMK
  D -->|regularity| MeasureExt
```

---

### 7. Summary

This file establishes a **bijection** between:
- Positive `ℝ≥0`-linear functionals on `C_c(X, ℝ≥0)`, and
- Regular Borel measures on a locally compact Hausdorff space `X`.

It achieves this by **reducing to the known `ℝ`-linear case**, leveraging the absence of negation in `ℝ≥0` via extension to real-valued functions. The key insight is that although `C_c(X, ℝ≥0)` lacks additive inverses, any `ℝ≥0`-linear functional extends uniquely to an `ℝ`-linear one, enabling reuse of the classical Riesz–Markov–Kakutani theorem.

This formalization is essential for building measure theory over nonnegative reals in contexts such as integration, probability, and functional analysis where `ℝ≥0`-valued functionals arise naturally (e.g., capacities, sublinear expectations).
