Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `expSeries 𝕂 𝔸` | Power series defining the exponential in a Banach algebra over `𝕂`; used to define radius of convergence. |
| `exp 𝕂 : 𝔸 → 𝔸` | Exponential map defined via the power series `expSeries`. |
| `hasStrictFDerivAt_exp_zero_of_radius_pos` | If the exponential series has positive radius, then `exp 𝕂` has strict Fréchet derivative `1 : 𝔸 →L[𝕂] 𝔸` at `0`. |
| `hasStrictFDerivAt_exp_of_mem_ball` | In a *commutative* Banach algebra over a characteristic-zero field, `exp 𝕂` has strict Fréchet derivative `exp 𝕂 x • (1 : 𝔸 →L[𝕂] 𝔸)` at any `x` in the disk of convergence. |
| `hasStrictFDerivAt_exp_smul_const_of_mem_ball` | For a commutative intermediate algebra `𝕊`, the map `u ↦ exp 𝕂 (u • x)` has strict Fréchet derivative `exp 𝕂 (t • x) • (1 : 𝕊 →L[𝕂] 𝕊).smulRight x` at `t`, even if `𝔸` is non-commutative. |
| `hasStrictFDerivAt_exp_zero` | Specialization to `𝕂 = ℝ` or `𝕂 = ℂ`: `exp 𝕂` has strict Fréchet derivative `1` at `0`. |
| `hasStrictFDerivAt_exp` | Specialization to `𝕂 = ℝ` or `𝕂 = ℂ` in a *commutative* algebra: derivative at any `x` is `exp 𝕂 x • 1`. |
| `hasStrictFDerivAt_exp_smul_const` | Specialization of `hasStrictFDerivAt_exp_smul_const_of_mem_ball` to `𝕂 = ℝ` or `𝕂 = ℂ`, where radius is infinite. |
| `Complex.exp_eq_exp_ℂ`, `Real.exp_eq_exp_ℝ` | Identification of standard complex/real exponential with `NormedSpace.exp`. |
| `hasFDerivAt_exp_smul_const_of_mem_ball'`, `hasStrictFDerivAt_exp_smul_const_of_mem_ball'` | Alternative derivative expressions using `smulRight` associativity; rely on commutativity of `exp` with scalar multiples. |
| `HasSum.exp` | If `f` sums to `a`, then `exp ∘ f` products to `exp a`, in a commutative Banach algebra over `RCLike` field. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `hasStrictFDerivAt_`, `hasFDerivAt_`, `hasStrictDerivAt_`, `hasDerivAt_`: indicate existence of (strict) Fréchet/derivative.
  - `exp_`: core exponential-related results.
  - `exp_smul_const_`: derivative of `u ↦ exp(u • x)`.
  - `of_radius_pos`, `of_mem_ball`, `of_mem_ball'`: conditions on domain (radius positivity vs. membership in ball).
  - `RCLike_`: results specialized to `𝕂 = ℝ` or `ℂ`.

- **Suffixes**:
  - `_zero`: at `0`.
  - `_smul_const`: derivative of scalar multiplication composed with `exp`.
  - `_of_mem_ball'`: variant using `smulRight` associativity.

- **Operators**:
  - `•` (scalar multiplication), `• (1 : …).smulRight x`: used to express linear maps of the form `v ↦ v • x`.
  - `• (1 : …).smulRight (exp …)` for right-multiplication variants.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `convert` | To align target with known lemmas (e.g., via `hasFPowerSeriesAt_exp_zero`). |
| `rw [hasFDerivAt_iff_isLittleO_nhds_zero]` | To reduce derivative proofs to `isLittleO` estimates. |
| `filter_upwards` | To restrict to neighborhoods where arguments lie in convergence ball. |
| `simp [expSeries_apply_eq, Nat.factorial]` | Simplify power series coefficients. |
| `ring` | Simplify algebraic expressions in commutative settings. |
| `exact`, `refine`, `apply` | Standard proof construction. |
| `congr'`, `EventuallyEq.refl` | For equality up to filter neighborhoods. |
| `hasFDerivAt.unique` | Uniqueness of derivative to equate candidates. |
| `comp` | Chain rule for Fréchet derivatives. |
| `mod_cast` | Cast between `ℝ` and `ℂ` embeddings. |
| `tendsto_nhds_unique` | Uniqueness of limits in Hausdorff spaces. |

---

### **4. Proof Logic**

- **General Strategy**:
  - Use power series expansion (`expSeries`) and radius of convergence.
  - For strict Fréchet differentiability, often reduce to known results about power series (`hasFPowerSeriesAt_exp_zero`, `analyticAt_exp_of_mem_ball`).
  - For non-zero points, use `exp_add_of_mem_ball` and `exp_add_of_commute_of_mem_ball` to handle addition in the argument.
  - In commutative cases, exploit `exp(x + h) = exp x * exp h` and linear approximations.
  - For `u ↦ exp(u • x)`, reduce to chain rule: derivative of `u ↦ u • x` (linear) composed with `exp`.

- **Inductive/Case Structure**:
  - Not inductive; mostly direct analysis using:
    - Neighborhood filters (`𝓝 0`, `𝓝 x`)
    - `isLittleO` characterizations
    - Continuity and algebraic properties (`Commute`, `smul`, `smulRight`)
  - When radius is infinite (`RCLike` case), use `edist_lt_top _ _` to trivialize membership in ball.

- **Key Lemmas Used**:
  - `exp_add_of_mem_ball`, `exp_add_of_commute_of_mem_ball`
  - `hasFPowerSeriesAt_exp_zero_of_radius_pos`
  - `analyticAt_exp_of_mem_ball`
  - `hasFDerivAt.comp`, `hasStrictFDerivAt.comp`

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Normed.Algebra.Exponential` | Core exponential definitions and basic properties. |
| `Mathlib.Analysis.Calculus.FDeriv.Analytic` | Tools for Fréchet derivatives and analytic functions. |
| `Mathlib.Topology.MetricSpace.CauSeqFilter` | For convergence and completeness arguments (e.g., `tendsto_nhds_unique`). |

---

### **Domain-Specific AI Agent Notes**

- **Focus Area**: Calculus in Banach algebras, especially exponential map differentiability.
- **Key Concepts**: Fréchet derivative, strict derivative, power series convergence, scalar multiplication, commutativity assumptions.
- **Common Patterns**:
  - Distinguish between general `𝕂`, characteristic-zero `𝕂`, and `RCLike` (`ℝ`/`ℂ`) cases.
  - Use `smulRight` to encode directional derivatives in non-scalar algebras.
  - Leverage `Commute` for additive decomposition of exponentials.
- **Open Tasks (per TODOs)**:
  - Derive results via `Algebra.elementalAlgebra` for cleaner abstraction.
  - Prove non-commutative integral formula:  
    `d/dt e^{x(t)} = ∫₀¹ e^{s x(t)} x'(t) e^{(1−s) x(t)} ds`.

--- 

Let me know if you'd like this exported as JSON or YAML for ingestion into a formalization assistant.