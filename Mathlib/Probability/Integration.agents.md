### Technical Brief: Integration in Probability Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type Signature (simplified) | Purpose |
|------|-----------------------------|---------|
| `lintegral_mul_indicator_eq_lintegral_mul_lintegral_indicator` | `{f : Ω → ℝ≥0∞} → Measurable f → IndepSets {s | MeasurableSet[Mf] s} {T} μ → ∫⁻ f * T.indicator c = (∫⁻ f) * (∫⁻ T.indicator c)` | Relates integral of product with indicator of independent event to product of integrals; foundational for later results. |
| `lintegral_mul_eq_lintegral_mul_lintegral_of_independent_measurableSpace` | `{f g : Ω → ℝ≥0∞} → Indep Mf Mg μ → Measurable[Mf] f → Measurable[Mg] g → ∫⁻ f * g = (∫⁻ f) * (∫⁻ g)` | Core result: expectation of product equals product of expectations for independent *measurable spaces*, not just functions. |
| `lintegral_mul_eq_lintegral_mul_lintegral_of_indepFun` | `{f g : Ω → ℝ≥0∞} → IndepFun f g μ → ∫⁻ f * g = (∫⁻ f) * (∫⁻ g)` | Standard version for independent *functions* (via pullback σ-algebras). |
| `lintegral_mul_eq_lintegral_mul_lintegral_of_indepFun'` | `{f g : Ω → ℝ≥0∞} → AEMeasurable f → AEMeasurable g → IndepFun f g → ∫⁻ f * g = (∫⁻ f) * (∫⁻ g)` | Extends previous to *almost everywhere measurable* functions. |
| `IndepFun.integrable_mul` | `{X Y : Ω → β} → IndepFun X Y → Integrable X → Integrable Y → Integrable (X * Y)` | Product of independent integrable real-valued RVs is integrable. |
| `IndepFun.integrable_left_of_integrable_mul` | `{X Y : Ω → β} → IndepFun X Y → Integrable (X * Y) → AEStronglyMeasurable X Y → ¬Y =ᵐ[μ] 0 → Integrable X` | If product integrable and second factor nonzero a.e., then first is integrable. Symmetric for right factor. |
| `IndepFun.integral_mul_of_nonneg` | `{X Y : Ω → ℝ} → IndepFun X Y → 0 ≤ X → 0 ≤ Y → AEMeasurable X → AEMeasurable Y → ∫ (X * Y) = ∫ X * ∫ Y` | Bochner integral version for nonnegative independent RVs. |
| `IndepFun.integral_mul_of_integrable` | `{X Y : Ω → ℝ} → IndepFun X Y → Integrable X → Integrable Y → ∫ (X * Y) = ∫ X * ∫ Y` | Full Bochner integral version via decomposition into positive/negative parts. |
| `IndepFun.integral_mul` | `{X Y : Ω → ℝ} → IndepFun X Y → AEStronglyMeasurable X → AEStronglyMeasurable Y → ∫ (X * Y) = ∫ X * ∫ Y` | General Bochner integral product rule (handles zero cases and undefined integrals). |
| `indepFun_iff_integral_comp_mul` | `{f g : Ω → β} → IndepFun f g ↔ ∀ φ ψ measurable/integrable, ∫ (φ∘f)*(ψ∘g) = ∫ (φ∘f) * ∫ (ψ∘g)` | Characterization of independence via test functions (dual to definition). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lintegral_`: for extended nonnegative real-valued integrals (`∫⁻`).
  - `integral_`: for Bochner/real-valued integrals (`∫`).
  - `indepFun_`: properties of independent *functions* (`IndepFun`).
  - `indep_`: properties of independent *measurable spaces/events* (`Indep`, `IndepSets`).
  - `aemeasurable_`, `ae_`: almost everywhere variants.
  - `mul_`: multiplicative properties.

- **Suffixes**:
  - `_of_indepFun`, `_of_indepFun'`, `_of_indepFun''`: increasing generality (measurable → a.e. measurable → full generality).
  - `_of_nonneg`, `_of_integrable`: assumptions on sign/integrability.
  - `_left_of_`, `_right_of_`: directional implications (e.g., integrability of left factor from product).

- **Helper variables**:
  - `f, g`: often `ℝ≥0∞`-valued.
  - `X, Y`: often `ℝ`-valued (random variables).
  - `Mf, Mg`: measurable spaces for domains of `f`, `g`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp_rw`: heavy use for rewriting under integrals and simplifying compositions.
  - `rw`: standard rewriting, especially with lemmas like `lintegral_indicator`, `integral_indicator_one`.
  - `intro`, `apply`, `exact`: standard proof structure.
  - `cases'`, `by_cases`: for case analysis on equality a.e. (`X =ᵐ[μ] 0`) or integrability.
  - `filter_upwards`: for almost-everywhere reasoning (e.g., proving `X * Y =ᵐ[μ] 0`).
  - `congr`: congruence for equality of integrals after simplification.
  - `ring`: algebraic simplification after applying integral product rule.

- **Specialized lemmas**:
  - `lintegral_congr_ae`, `integral_congr_ae`: for a.e.-equality.
  - `ae_of_all`, `ae_stronglyMeasurable`: handling a.e. properties.
  - `ENNReal.*` lemmas: e.g., `ENNReal.mul_iSup`, `ENNReal.toReal_mul`, `ENNReal.top_mul`.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Many proofs use `Measurable.ennreal_induction` (for `ℝ≥0∞`-valued functions), with cases for:
    1. Simple functions (indicators),
    2. Sums,
    3. Suprema of increasing sequences.
  - For real-valued integrals, decomposition into positive/negative parts (`X = X⁺ − X⁻`) and application of nonnegative case four times.

- **Independence handling**:
  - `IndepFun` → `Indep` (via `measurable_iff_comap_le`) or `IndepSets`.
  - Use of `IndepFun.comp` to lift independence through measurable maps (e.g., `nnnorm`, `ofReal`).
  - `IndepSets_iff` for set-based independence.

- **Zero-case handling**:
  - Explicit `by_cases` on whether `X =ᵐ[μ] 0` or `Y =ᵐ[μ] 0`, simplifying integrals to zero.
  - Contrapositive arguments for integrability (e.g., if product integrable and one factor nonzero a.e., then the other must be integrable).

- **Measure-theoretic plumbing**:
  - Frequent use of `integral_eq_lintegral_of_nonneg_ae`, `hasFiniteIntegral_iff_nnnorm`, `ENNReal.coe_mul`, `nnnorm_mul`.
  - Conversion between Bochner and extended nonnegative integrals via `ENNReal.ofReal`, `ENNReal.toReal`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.MeasureTheory.Integral.SetIntegral` | Defines `setIntegral`, `indicator`, `lintegral_indicator`, etc. |
| `Mathlib.Probability.Independence.Basic` | Core independence notions: `Indep`, `IndepSets`, `IndepFun`, `AEMeasurable`, `Integrable`. |

**Scope**: This module formalizes foundational results in probability theory concerning expectations of products of independent random variables, covering:
- Extended nonnegative reals (`ℝ≥0∞`) via `lintegral`,
- Real-valued random variables via Bochner integral,
- Almost-everywhere measurability and integrability,
- Independence via σ-algebras and functions.

It serves as a basis for deeper probabilistic reasoning (e.g., law of large numbers, Fubini-type results) in Lean’s `Mathlib`.

--- 

Let me know if you'd like a dependency graph or a summary of proof automation patterns.