### Technical Brief: `Real.lean` — Riesz–Markov–Kakutani Representation Theorem for Real-Linear Functionals

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `RealRMK.rieszMeasure` | `Λ : C_c(X, ℝ) →ₚ[ℝ] ℝ → Measure X` | Constructs a measure from a real-linear positive functional Λ via `rieszContent` on `NNReal`. |
| `RealRMK.integral_rieszMeasure` | `∀ f : C_c(X, ℝ), ∫ f ∂(rieszMeasure Λ) = Λ f` | Main representation theorem: Λ is represented by integration against `rieszMeasure Λ`. |
| `RealRMK.rieszMeasure_integralPositiveLinearMap` | `μ : Measure X [μ.Regular] → rieszMeasure (integralPositiveLinearMap μ) = μ` | Surjectivity: every regular measure arises as `rieszMeasure` of its induced functional. |
| `RealRMK.integralPositiveLinearMap_rieszMeasure` | `Λ : C_c(X, ℝ) →ₚ[ℝ] ℝ → integralPositiveLinearMap (rieszMeasure Λ) = Λ` | Injectivity: the correspondence is invertible. |
| `RealRMK.le_rieszMeasure_tsupport_subset` | `∀ f, (0 ≤ f ∧ f ≤ 1) ∧ tsupport f ⊆ V ⇒ Λ f ≤ μ V` | Upper bound of Λ on bump functions by measure of open sets. |
| `RealRMK.rieszMeasure_le_of_eq_one` | `∀ f, 0 ≤ f ∧ f = 1 on K ⇒ μ K ≤ Λ f` | Lower bound of μ on compacts via Λ. |
| `RealRMK.range_cut_partition` | `range f ⊆ Ioo a (a + N * ε) ⇒ ∃ partition E n of tsupport f` | Technical partition of support via range slicing. |
| `RealRMK.exists_open_approx` | Approximation of measurable sets by open sets with controlled measure. | Used in constructing partitions of unity and estimating integrals. |
| `RealRMK.integral_riesz_aux` | `Λ f ≤ ∫ f ∂μ` | Key inequality in the proof of the representation theorem. |
| `RealRMK.measure_le_of_isCompact_of_integral` | `∀ f, ∫ f dμ ≤ ∫ f dν ⇒ μ K ≤ ν K` | Comparison of measures via integrals over `C_c`. |
| `RealRMK.ext_of_integral_eq_on_compactlySupported` | `∀ f, ∫ f dμ = ∫ f dν ⇒ μ = ν` | Uniqueness of measures with same integrals on `C_c`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Not used here.
  - `le_`, `rieszMeasure_`, `integral_`: Standard for inequalities and constructions.
  - `exists_`: For existence lemmas (e.g., `exists_open_approx`, `exists_nat_large`).
  - `range_`, `tsupport_`: For support/range-related properties.
- **Suffixes**:
  - `_aux`: Auxiliary lemmas used in main proofs (`integral_riesz_aux`).
  - `_of_`: For conditions or restrictions (`le_rieszMeasure_tsupport_subset`, `measure_le_of_isCompact_of_integral`).
  - `_inj`, `_surj`: Implicit in bijection lemmas (`integralPositiveLinearMap_inj`, `rieszMeasure_integralPositiveLinearMap`).
- **Namespace**: All definitions/lemmas live in `RealRMK`, distinguishing them from `NNReal`-linear versions.

---

#### **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `simp` / `simp_rw` | Very high | Simplification of definitions, set operations, integrals, measures. |
| `linarith` / `lia` | High | Linear arithmetic for inequalities involving real numbers. |
| `gcongr` | Medium | Goal-congruence for monotonicity of sums/products. |
| `apply`, `exact`, `refine` | High | Proof construction, especially in inequality chains. |
| `rw`, `convert` | Medium | Rewriting using lemmas, converting equalities. |
| `cases`, `rcases`, `obtain` | Medium | Decomposing existential hypotheses. |
| `finset.sum_*` tactics (`sum_add_distrib`, `mul_sum`, etc.) | Medium | Manipulating finite sums over `Fin N`. |
| `finiteness` | Low | Custom tactic (likely user-defined) for verifying finiteness conditions. |
| `fun_prop` | Low | Propagation of functorial properties (e.g., continuity, measurability). |

---

#### **4. Proof Logic**

The core proof of `integral_rieszMeasure` follows a **standard approximation strategy**:

1. **Reduction to inequality**:
   - Show $ \Lambda f \le \int f \, d\mu $ for all $ f \in C_c(X, \mathbb{R}) $.
   - Use symmetry: apply the inequality to $ f $ and $ -f $ to get equality.

2. **Approximation of $ f $**:
   - Partition the range $ \text{range}(f) \subseteq (a, b) $ into $ N $ intervals.
   - Pull back to a partition $ (E_n)_{n < N} $ of $ \text{tsupport}(f) $.
   - Approximate each $ E_n $ by open sets $ V_n $ with controlled measure.

3. **Partition of unity**:
   - Construct $ (g_n) \subseteq C_c(X, \mathbb{R}) $ subordinate to $ (V_n) $, with $ \sum g_n = 1 $ on $ \text{tsupport}(f) $.

4. **Chain of inequalities**:
   - Expand $ \Lambda f = \Lambda(\sum g_n f) = \sum \Lambda(g_n f) $.
   - Bound each $ \Lambda(g_n f) \le (y_n + \varepsilon') \Lambda(g_n) $.
   - Relate $ \Lambda(g_n) $ to $ \mu(E_n) $ via `le_rieszMeasure_tsupport_subset`.
   - Use $ \mu(K) \le \Lambda(\sum g_n) $ to control error terms.
   - Combine to get $ \Lambda f \le \int f \, d\mu + \varepsilon $.

5. **Uniqueness & bijection**:
   - Use `measure_le_of_isCompact_of_integral` and `ext_of_integral_eq_on_compactlySupported` to show injectivity/surjectivity.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.MeasureTheory.Integral.Bochner.Set` | Bochner integral over sets, measurability. |
| `Mathlib.MeasureTheory.Integral.CompactlySupported` | Integration theory for compactly supported functions. |
| `Mathlib.MeasureTheory.Integral.RieszMarkovKakutani.Basic` | Base theory for NNReal-linear Riesz–Markov–Kakutani. |
| `Mathlib.MeasureTheory.Measure.Regular` | Regular measures, inner/outer regularity. |
| `Mathlib.Order.Interval.Set.Union` | Interval arithmetic and unions. |

**Topological assumptions**:
- `LocallyCompactSpace X`, `T2Space X`, `MeasurableSpace X`, `BorelSpace X`.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[LocallyCompactSpace X] --> B[rieszMeasure Λ]
  C[T2Space X] --> B
  D[MeasurableSpace X] --> B
  E[BorelSpace X] --> B

  B --> F[integral_rieszMeasure]
  B --> G[regular_rieszMeasure]
  F --> H[integralPositiveLinearMap_inj]
  G --> H

  H --> I[Measure.ext_of_integral_eq_on_compactlySupported]
  I --> J[rieszMeasure_integralPositiveLinearMap]
  J --> K[Bijection between Λ and regular μ]

  L[CompactSpace X] --> M[IsFiniteMeasure (rieszMeasure Λ)]
  L --> N[exists_regular_eq_of_compactSpace]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Construction
    A1[Construction of rieszMeasure] --> A2[le_rieszMeasure_tsupport_subset]
    A2 --> A3[rieszMeasure_le_of_eq_one]
    A3 --> A4[range_cut_partition]
    A4 --> A5[exists_open_approx]
    A5 --> A6[integral_riesz_aux]
    A6 --> A7[integral_rieszMeasure]
    A7 --> A8[regular_rieszMeasure]
  end

  subgraph integralPositiveLinearMap
    B1[integralPositiveLinearMap] --> B2[measure_le_of_isCompact_of_integral]
    B2 --> B3[ext_of_integral_eq_on_compactlySupported]
    B3 --> B4[integralPositiveLinearMap_inj]
    B4 --> B5[rieszMeasure_integralPositiveLinearMap]
    B5 --> B6[integralPositiveLinearMap_rieszMeasure]
  end

  subgraph Compact
    C1[CompactSpace X] --> C2[IsFiniteMeasure (rieszMeasure Λ)]
    C1 --> C3[exists_regular_eq_of_compactSpace]
    C1 --> C4[exists_innerRegular_eq_of_isCompact]
  end

  Construction --> integralPositiveLinearMap
  integralPositiveLinearMap --> Compact
```

---

#### **7. Summary**

This file formalizes the **Riesz–Markov–Kakutani representation theorem** for real-linear positive functionals on $ C_c(X, \mathbb{R}) $, where $ X $ is a locally compact Hausdorff space. It constructs a regular Borel measure $ \mu_\Lambda $ such that $ \Lambda f = \int f \, d\mu_\Lambda $, and proves that this correspondence is a bijection between such functionals and regular measures. The proof is highly technical, relying on careful partitioning, approximation by open sets, and partitions of unity. The formalization distinguishes the real case from the $ \mathbb{R}_{\ge 0} $-linear case via `toNNRealLinear`, and includes important corollaries for compact and finite-measure settings.
