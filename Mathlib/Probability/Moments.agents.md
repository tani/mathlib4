Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Moments and Moment Generating Functions in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `moment X p μ` | `Ω → ℝ → ℕ → Measure Ω → ℝ` | Computes the `p`-th raw moment: `μ[X^p]` |
| `centralMoment X p μ` | `Ω → ℝ → ℕ → Measure Ω → ℝ` | Computes the `p`-th central moment: `μ[(X - μ[X])^p]` |
| `mgf X μ t` | `Ω → ℝ → Measure Ω → ℝ → ℝ` | Moment generating function: `μ[exp(t * X)]` |
| `cgf X μ t` | `Ω → ℝ → Measure Ω → ℝ → ℝ` | Cumulant generating function: `log(mgf X μ t)` |
| `IndepFun.mgf_add` | `IndepFun X Y μ → … → mgf (X + Y) μ t = mgf X μ t * mgf Y μ t` | MGF of sum of independent RVs is product of MGFs |
| `IndepFun.cgf_add` | `IndepFun X Y μ → … → cgf (X + Y) μ t = cgf X μ t + cgf Y μ t` | CGF of sum of independent RVs is sum of CGFs |
| `measure_ge_le_exp_cgf` | `[IsFiniteMeasure μ] → ε : ℝ → 0 ≤ t → Integrable (exp (t * X)) → μ(X ≥ ε) ≤ exp(-tε + cgf X μ t)` | Upper-tail Chernoff bound via CGF |
| `measure_le_le_exp_cgf` | `[IsFiniteMeasure μ] → ε : ℝ → t ≤ 0 → Integrable (exp (t * X)) → μ(X ≤ ε) ≤ exp(-tε + cgf X μ t)` | Lower-tail Chernoff bound via CGF |
| `mgf_congr_of_identDistrib` | `IdentDistrib X X' μ μ' → mgf X μ t = mgf X' μ' t` | MGFs are invariant under distributional equivalence |
| `iIndepFun.mgf_sum` | `iIndepFun X μ → Measurable X i → mgf (∑_{i∈s} X i) μ t = ∏_{i∈s} mgf (X i) μ t` | MGF of finite sum of *independent* RVs is product of MGFs |
| `iIndepFun.cgf_sum` | `iIndepFun X μ → Integrable exp(t * X i) → cgf (∑_{i∈s} X i) μ t = ∑_{i∈s} cgf (X i) μ t` | CGF of finite sum of *independent* RVs is sum of CGFs |

#### **2. Naming Conventions**
- **Prefixes**:
  - `is_`: Typeclass predicates (e.g., `IsFiniteMeasure`, `IsProbabilityMeasure`)
  - `aestronglyMeasurable`, `AEMeasurable`: Almost-everywhere measurable functions
  - `IndepFun`, `iIndepFun`: (independent) families of random variables
- **Suffixes**:
  - `_fun`: For constant functions (e.g., `mgf_zero_fun`, `mgf_const'`)
  - `_measure`: For zero measure (e.g., `mgf_zero_measure`)
  - `_add`, `_mul`, `_sum`, `_neg`, `_smul`: For algebraic operations on arguments (e.g., `mgf_add_const`, `mgf_smul_left`)
  - `_eq`: For equalities with known expressions (e.g., `centralMoment_two_eq_variance`)
- **Prime (`'`)**: Often denotes a version for finite (non-probability) measures (e.g., `mgf_const'`, `cgf_const'`), while unprimed versions assume probability measures.

#### **3. Tactic Stack**
- **Core simplification & rewriting**:
  - `simp only`, `rw`, `simp_rw`
- **Algebraic manipulation**:
  - `ring`, `linarith`, `gcongr`, `exact`, `refine`
- **Measure-theoretic reasoning**:
  - `filter_upwards`, `aestronglyMeasurable`, `integrable_of_mem_Icc`, `integral_map`, `integral_dirac`
- **Logical & case analysis**:
  - `rcases`, `by_cases`, `induction'`, `ext1`, `ext`
- **Specialized lemmas**:
  - `exp_le_exp`, `exp_pos`, `log_mul`, `log_exp`, `mul_meas_ge_le_integral_of_nonneg`

#### **4. Proof Logic**
- **Structure**:
  - Most proofs follow a pattern of:
    1. Unfolding definitions (`mgf`, `cgf`, `centralMoment`, etc.)
    2. Applying measure-theoretic lemmas (e.g., `integral_map`, `integral_mul`, `integral_const`)
    3. Using independence assumptions (`IndepFun`, `iIndepFun`) to factor integrals/products
    4. Applying inequalities (e.g., `exp_le_exp`, `mul_meas_ge_le_integral_of_nonneg`) for tail bounds
    5. Simplifying using `simp` with specialized lemmas (e.g., `log_exp`, `exp_add`)
- **Induction**:
  - Used for finite sums (`Finset.induction_on`) over independent families.
- **Case analysis**:
  - On measure type (`IsZeroOrProbabilityMeasure`, `eq_zero_or_isProbabilityMeasure`)
  - On sign of `t` (`ht.eq_or_lt`, `ht_zero_eq | ht_pos`)
- **Equational reasoning**:
  - Chain of equalities/inequalities (`calc`, `trans`, `le_of_mul_le_mul_left`)

#### **5. Imports & Scope**
- **Imports**:
  - `Mathlib.Probability.IdentDistrib`: Distributional equivalence (`IdentDistrib`)
  - `Mathlib.Probability.Variance`: Variance and related properties
- **Scopes & Open Namespaces**:
  - `MeasureTheory`, `ProbabilityTheory`, `ENNReal`, `NNReal`, `Real`
- **Assumptions**:
  - Measurability (`AEMeasurable`, `AEStronglyMeasurable`)
  - Integrability (`Integrable`)
  - Measure properties (`IsFiniteMeasure`, `IsProbabilityMeasure`, `IsZeroOrProbabilityMeasure`)
  - Independence (`IndepFun`, `iIndepFun`)

---

This summary captures the formalization’s core structure, naming discipline, and proof methodology—ideal for building a domain-specific AI agent for probabilistic reasoning in Lean 4.