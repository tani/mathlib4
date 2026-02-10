**Technical Brief: RadonNikodym.lean**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rnDeriv μ ν` | `Measure α` | **Radon–Nikodym derivative**: measurable function $f : \alpha \to \mathbb{R}_{\geq 0}^\infty$ such that $\mu = f \cdot \nu$ when $\mu \ll \nu$ and `HaveLebesgueDecomposition μ ν`. Noncomputable. |
| `absolutelyContinuous_iff_withDensity_rnDeriv_eq` | `μ ≪ ν ↔ ν.withDensity (rnDeriv μ ν) = μ` | **Radon–Nikodym theorem** for measures: absolute continuity iff $\mu$ is representable as a density w.r.t. $\nu$. |
| `SignedMeasure.absolutelyContinuous_iff_withDensityᵥ_rnDeriv_eq` | `SignedMeasure` version | Extension to signed measures. |
| `rnDeriv_withDensity_left` | `(μ.withDensity f).rnDeriv ν =ᵐ[ν] f * μ.rnDeriv ν` | Chain rule: derivative of $\mu$ with density $f$ w.r.t. $\nu$. |
| `rnDeriv_withDensity_right` | `μ.rnDeriv (ν.withDensity f) =ᵐ[ν] f⁻¹ * μ.rnDeriv ν` | Chain rule: derivative w.r.t. a density-transformed base. |
| `inv_rnDeriv` | `(μ.rnDeriv ν)⁻¹ =ᵐ[μ] ν.rnDeriv μ` | Symmetry: reciprocal of RN derivative is the reverse RN derivative a.e. |
| `setLIntegral_rnDeriv` | `∫⁻ x in s, μ.rnDeriv ν x ∂ν = μ s` (if $\mu \ll \nu$) | Fundamental theorem: integral of RN derivative recovers $\mu$. |
| `lintegral_rnDeriv_mul` | `∫⁻ x, μ.rnDeriv ν x * f x ∂ν = ∫⁻ x, f x ∂μ` | Change-of-measure for nonnegative functions. |
| `setIntegral_rnDeriv_smul` | `∫ x in s, (μ.rnDeriv ν x).toReal • f x ∂ν = ∫ x in s, f x ∂μ` | Change-of-measure for Bochner integrable functions. |
| `rnDeriv_mconv` | `(ν₁ ∗ₘ ν₂).rnDeriv μ =ᵐ[μ] ν₁.rnDeriv μ ⋆ₘₗ[μ] ν₂.rnDeriv μ` | RN derivative of multiplicative convolution equals convolution of RN derivatives. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `rnDeriv_`: properties of Radon–Nikodym derivative.
  - `withDensity_`: behavior of densities under transformation.
  - `absolutelyContinuous_`: statements involving $\mu \ll \nu$.
  - `mutuallySingular_`: properties involving $\mu \perp \nu$.
  - `setLIntegral_`, `lintegral_`, `setIntegral_`: integral variants (nonnegative, Bochner).
- **Suffixes**:
  - `_left`, `_right`: asymmetry in chain rule (density on left/right).
  - `_aux`, `_aux'`: auxiliary lemmas (often intermediate steps).
  - `_of_absolutelyContinuous`, `_of_mutuallySingular`: hypotheses in lemmas.
  - `_eq_zero`, `_pos`, `_lt_top`: sign/topness properties.
  - `_map`, `_restrict`: behavior under pushforward/restriction.
- **Special**:
  - `inv_rnDeriv`, `rnDeriv_mul_rnDeriv`: algebraic identities.
  - `rnDeriv_self`: $\mu.rnDeriv \mu = 1$ a.e.

---

### 3. TACTIC STACK

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `conv_rhs => rw [...]` | Rewriting in right-hand side of equality. |
| `filter_upwards [...] with x hx ...` | Proving almost-everywhere statements by lifting pointwise facts. |
| `rw [← withDensity_rnDeriv_eq ...]` | Substituting $\mu = \nu.withDensity (\mu.rnDeriv \nu)$ when $\mu \ll \nu$. |
| `exact ...` / `refine ...` | Direct proof steps, often using `ae_eq_of_forall_setLIntegral_eq_of_sigmaFinite`. |
| `simp only [...]` | Simplifying with precise lemmas (e.g., `Pi.mul_apply`, `rnDeriv_zero`). |
| `gcongr`, `congr`, `ext1` | Equality proofs (extensionality, inequalities). |
| `aesop`, `linarith`, `ring` | Arithmetic and linear reasoning (less frequent, mostly in auxiliary lemmas). |
| `have h := ...; refine ...` | Intermediate lemma introduction. |
| `rw [Measure.withDensity_rnDeriv_eq _ _ hμν]` | Core pattern: replace $\mu$ by its density representation. |

---

### 4. PROOF LOGIC

**General proof strategy**:

1. **Decomposition**: Use `haveLebesgueDecomposition_add μ ν` to split $\mu = \mu_s + \mu_{ac}$, where $\mu_s \perp \nu$, $\mu_{ac} \ll \nu$.
2. **Reduction to absolutely continuous part**: Show singular part contributes zero (e.g., via `rnDeriv_eq_zero_of_mutuallySingular`).
3. **Density substitution**: Replace $\mu$ with $\nu.withDensity (\mu.rnDeriv \nu)$ using `withDensity_rnDeriv_eq`.
4. **Change of measure**: Apply lemmas like `lintegral_withDensity_eq_lintegral_mul₀`, `setLIntegral_withDensity_eq_setLIntegral_mul_non_measurable₀`.
5. **Almost-everywhere reasoning**: Prove pointwise equalities a.e. using `filter_upwards`, `ae_of_all`, `ae_restrict_of_ae`.
6. **Sigma-finiteness management**: Ensure `SigmaFinite` instances for `withDensity`, `map`, `restrict`, etc., via `SigmaFinite.withDensity_of_ne_top`, `hf.sigmaFinite_map`.
7. **Symmetry & inversion**: Use `inv_rnDeriv_aux` and `inv_rnDeriv` to relate $\mu.rnDeriv \nu$ and $\nu.rnDeriv \mu$.

**Typical flow** for chain rules (e.g., `rnDeriv_withDensity_left`):
- Introduce auxiliary measure $\mu' = \nu.withDensity (\mu.rnDeriv \nu)$.
- Apply known formula for $\mu' \ll \nu$ (trivially true).
- Use auxiliary lemmas (`rnDeriv_withDensity_withDensity_rnDeriv_left`) to relate $(\mu.withDensity f).rnDeriv \nu$ and $(\mu'.withDensity f).rnDeriv \nu$.
- Combine via `Filter.EventuallyEq.trans`.

---

### 5. IMPORTS

| Import | Purpose |
|--------|---------|
| `Mathlib.MeasureTheory.Integral.Bochner.ContinuousLinearMap` | Bochner integral machinery (used in `setIntegral_rnDeriv_smul`). |
| `Mathlib.MeasureTheory.Measure.Decomposition.Lebesgue` | Lebesgue decomposition, singular part, `HaveLebesgueDecomposition`, `singularPart`. |

---

### 6. DEPENDENCY & THEORY OVERVIEW

#### Mermaid Diagram: Theory Dependencies

```mermaid
graph TD
  A[RadonNikodym.lean] --> B[Mathlib.MeasureTheory.Integral.Bochner.ContinuousLinearMap]
  A --> C[Mathlib.MeasureTheory.Measure.Decomposition.Lebesgue]
  C --> D[Lebesgue decomposition]
  C --> E[HaveLebesgueDecomposition class]
  C --> F[singularPart μ ν]
  B --> G[Bochner integral]
  B --> H[integrable_smul_iff]
  A --> I[MeasureTheory.Function.ConditionalExpectation] (used, but not imported here)
  A --> J[Probability Theory (via RN theorem)]
```

#### Mermaid Diagram: File Overview

```mermaid
flowchart LR
  subgraph Core
    RN[Radon–Nikodym Theorem]
    RN_def[rnDeriv definition]
  end

  subgraph Properties
    chainL[Chain rule (left)]
    chainR[Chain rule (right)]
    inv[Reciprocal identity]
    mul[Product rule]
  end

  subgraph Integration
    lint[lintegral change-of-measure]
    setlint[setLIntegral version]
    setint[Bochner integral version]
  end

  subgraph Advanced
    map[Behavior under measurable embeddings]
    conv[Multiplicative convolution]
    sing[Singular part behavior]
  end

  RN --> RN_def
  RN_def --> chainL
  RN_def --> chainR
  RN_def --> inv
  RN_def --> mul
  chainL --> lint
  chainR --> lint
  lint --> setlint
  lint --> setint
  map --> RN
  conv --> RN
  sing --> RN
```

#### Theory Scope

- **Primary theory**: Radon–Nikodym theorem and its consequences in measure theory.
- **Key structures**: Measures, absolute continuity, singularity, Lebesgue decomposition, `withDensity`, `rnDeriv`.
- **Applications**:
  - Change-of-measure formulas (probability, statistics).
  - Bochner integration under density transforms.
  - Convolution of measures on topological groups.
  - Measurable embeddings (e.g., for pushforwards).
- **Excluded**:
  - Vector measures (`assert_not_exists VectorMeasure`).
  - Inner product spaces (`assert_not_exists InnerProductSpace`).

---

### 7. SUMMARY

This file formalizes the **Radon–Nikodym theorem** in Lean 4, including its equivalence formulation, chain rules, symmetry properties, and integral identities. It leverages the Lebesgue decomposition framework and sigma-finiteness assumptions to handle technical subtleties (e.g., infinite values, measurability). The development supports both nonnegative and Bochner integrals, and extends to multiplicative convolution on groups. The naming and proof patterns follow Lean’s MeasureTheory library conventions, emphasizing modularity and reuse of decomposition lemmas.
