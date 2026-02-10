### Technical Metadata Brief: Variance of Random Variables in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `evariance` | `evariance {Ω} {m} (X : Ω → ℝ) (μ : Measure Ω) : ℝ≥0∞` | Extended non-negative real-valued variance: `∫⁻ (X - E[X])² dμ` |
| `variance` | `variance X μ : ℝ` | Real-valued variance: `evariance X μ`.toReal |
| `variance_le_expectation_sq` | `Var[X] ≤ 𝔼[X²]` | Basic inequality bounding variance by second moment |
| `meas_ge_le_variance_div_sq` | `ℙ(|X - E[X]| ≥ c) ≤ ENNReal.ofReal(Var[X]/c²)` | Chebyshev’s inequality (real-valued variance, L² assumption) |
| `meas_ge_le_evariance_div_sq` | `μ({ω | c ≤ |X ω - E[X]|}) ≤ eVar[X] / c²` | Chebyshev’s inequality for `evariance`, no L² requirement |
| `IndepFun.variance_add` | `IndepFun X Y μ ⇒ Var[X+Y] = Var[X] + Var[Y]` | Variance of sum of independent RVs |
| `IndepFun.variance_sum` | `PairwiseIndep ⇒ Var[∑_{i∈s} X i] = ∑_{i∈s} Var[X i]` | Variance of finite sum of pairwise independent RVs |
| `variance_le_sub_mul_sub` | `a ≤ X ≤ b a.e. ⇒ Var[X] ≤ (b - E[X])(E[X] - a)` | Bhatia–Davis inequality |
| `variance_le_sq_of_bounded` | `a ≤ X ≤ b a.e. ⇒ Var[X] ≤ ((b - a)/2)²` | Popoviciu’s inequality (tighter bound than Bhatia–Davis) |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `evariance`: Extended non-negative real-valued variance (`ℝ≥0∞`).
  - `variance`: Real-valued variance.
  - `Memℒp`: Membership in ℒᵖ space (integrable p-th power).
  - `aestronglyMeasurable`, `AEMeasurable`: Almost everywhere measurable.
  - `IndepFun`: Independence of functions (random variables).
  - `meas_ge_le_*`: Probability bounds on deviation events (`{ω | c ≤ |…|}`).

- **Suffixes**:
  - `_eq_zero_iff`: Characterization of when variance is zero.
  - `_le_*`: Inequalities bounding variance or related quantities.
  - `_mul`, `_smul`: Behavior under scalar multiplication.
  - `_def'`: Alternative definitions (often under additional assumptions like `Memℒp` or `IsProbabilityMeasure`).

- **Notation**:
  - `eVar[X]`: Scoped notation for `evariance X volume`.
  - `Var[X]`: Scoped notation for `variance X volume`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification (e.g., `sub_zero`, `pow_two`, `mul_sum`). |
| `rw` | Rewriting using definitions (`variance_def'`, `evariance`, `integral_add'`, etc.). |
| `congr` | Congruence reasoning (e.g., equality of integrands). |
| `ring` | Algebraic simplification (especially in variance expansions like `variance_def'`). |
| `linarith` | Linear arithmetic over inequalities (e.g., in `variance_le_sub_mul_sub`). |
| `convert` | Proof by conversion (e.g., matching target with known inequality). |
| `filter_upwards` | Handling almost-everywhere statements. |
| `aesop` / `meson` | Not present — leaner reliance on manual simplification. |
| `exact`, `apply`, `intro` | Standard natural deduction. |
| `have`, `suffices` | Intermediate lemma construction. |
| `induction'` | Structural induction (e.g., `Finset.induction_on`). |
| `convert ... using 1` | Proof by congruence with specific argument. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **case analysis** on integrability (`Memℒp X 2 μ`) or finiteness of `evariance`.
  - **Induction** on finite index sets for `variance_sum`.
  - **Algebraic expansion** of `(X ± Y)²`, `∫ (X ± Y)²`, and simplification via `ring`.
  - **Measure-theoretic lemmas** like `lintegral_eq_zero_iff'`, `integral_congr_ae`, `integral_mul_left`, `integral_mul_right`.
  - **Chebyshev proofs** use `meas_ge_le_mul_pow_eLpNorm` and relate `evariance` to `eLpNorm`.
  - **Bounded variance inequalities** (`Bhatia–Davis`, `Popoviciu`) rely on:
    - Non-negativity of `(b - X)(X - a)` a.e.
    - Integral preservation under a.e. equality.
    - Algebraic manipulation of `(b - μ[X])(μ[X] - a)`.

- **Common Patterns**:
  - Reduce to integrable case via `Memℒp` assumptions.
  - Use `evariance_lt_top_iff_memℒp` to switch between extended and real variance.
  - Use `variance_def'` to rewrite variance as `𝔼[X²] - (𝔼[X])²` when `Memℒp X 2`.
  - Use `aestronglyMeasurable` and `AEMeasurable` to justify integrals and applications of Fubini-type lemmas.

---

#### **5. Imports & Scope**

- **Core Imports**:
  ```lean
  import Mathlib.Probability.Notation
  import Mathlib.Probability.Integration
  import Mathlib.MeasureTheory.Function.L2Space
  ```

- **Key Libraries Used**:
  - `MeasureTheory`: Integration, `lintegral`, `Memℒp`, `aestronglyMeasurable`.
  - `ProbabilityTheory`: Definitions of expectation (`μ[X]`), variance, independence.
  - `ENNReal`, `NNReal`, `Real`: Extended non-negative reals, non-negative reals, and real arithmetic.
  - `Finset`, `Set`: Finite sums, pairwise independence, measurable sets.

- **Locale & Notation**:
  - `noncomputable section`
  - `open scoped MeasureTheory ProbabilityTheory ENNReal NNReal`
  - Custom notations: `eVar[X]`, `Var[X]`

---

### Summary

This module formalizes foundational probability theory around variance in Lean 4, with precise handling of integrability, extended reals, and measure-theoretic subtleties (e.g., a.e. equality, independence). It includes both classical inequalities (Chebyshev, Bhatia–Davis, Popoviciu) and structural properties (additivity under independence), with proofs leveraging Lean’s measure theory infrastructure and algebraic simplification. The design distinguishes between `evariance` (extended, always defined) and `variance` (real, defined when finite), enabling robust reasoning without domain restrictions.