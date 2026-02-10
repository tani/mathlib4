Here is a structured technical brief extracted from `IntegrableExpMul.lean`, focusing on formal metadata for building a domain-specific AI agent.

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `integrableExpSet` | `def integrableExpSet (X : Ω → ℝ) (μ : Measure Ω) : Set ℝ := {t | Integrable (fun ω ↦ exp (t * X ω)) μ}` | Defines the *moment-generating domain*: the set of real $ t $ where $ \omega \mapsto \exp(t X(\omega)) $ is $ \mu $-integrable. |
| `integrable_exp_mul_of_le_of_le` | `lemma integrable_exp_mul_of_le_of_le {a b t} ... Integrable (exp (a • X)) μ → Integrable (exp (b • X)) μ → a ≤ t → t ≤ b → Integrable (exp (t • X)) μ` | Shows integrability on the closed interval $[a,b]$ if endpoints are integrable. Core to convexity. |
| `convex_integrableExpSet` | `lemma convex_integrableExpSet : Convex ℝ (integrableExpSet X μ)` | Proves the domain is convex (hence an interval). |
| `integrable_exp_mul_abs` | `lemma integrable_exp_mul_abs ... Integrable (exp (t • X)) μ → Integrable (exp (-t • X)) μ → Integrable (fun ω ↦ exp (t * |X ω|)) μ` | Extends integrability to $ \exp(t |X|) $ using symmetry. |
| `integrable_rpow_abs_mul_exp_of_mem_interior` | `lemma integrable_rpow_abs_mul_exp_of_mem_interior_integrableExpSet (v ∈ interior(integrableExpSet X μ)) (p ≥ 0) → Integrable (|X|^p * exp(v • X)) μ` | Key regularity result: powers of $|X|$ times exponential are integrable in the interior. |
| `memLp_of_mem_interior_integrableExpSet` | `lemma memLp_of_mem_interior_integrableExpSet (0 ∈ interior(integrableExpSet X μ)) (p : ℝ≥0) → MemLp X p μ` | If 0 is interior, then $ X \in L^p $ for all finite $ p $. |
| `integrable_cexp_mul_of_re_mem_interior_integrableExpSet` | `lemma integrable_cexp_mul_of_re_mem_interior_integrableExpSet (z.re ∈ interior(...)) → Integrable (cexp (z • X)) μ` | Complex extension: integrability of $ \exp(z X) $ for complex $ z $ depends only on $ \Re(z) $. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `integrable_exp_mul_...`: for integrability of $ \exp(t X) $ or variants.
  - `integrable_rpow_abs_mul_exp_...`: for $ |X|^p \exp(v X) $.
  - `integrable_pow_abs_mul_exp_...`: same with $ n \in \mathbb{N} $.
  - `integrable_rpow_mul_exp_...`: for $ X^p \exp(v X) $ (no absolute value).
- **Suffixes**:
  - `_of_le_of_le`, `_of_nonneg_of_le`, `_of_nonpos_of_ge`: indicate endpoint conditions.
  - `_of_mem_interior`: interior-point assumptions.
  - `_of_integrable_exp_mul`: assumes integrability at two symmetric points.
  - `_abs`, `_abs_abs`: for variants involving $|X|$ or $|t|$.
- **Variables**:
  - $ t, u, v $: real parameters (often $ t $ is the variable of interest).
  - $ a, b $: endpoints of intervals.
  - $ x $: used in auxiliary lemmas (e.g., $|X|^p \exp(v X + x |X|)$).
  - $ z $: complex parameter (only in `Complex` section).

---

### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `conv`, `gcongr`, `convert`, `exact`, `refine`, `by_cases`, `rcases`, `left/right`, `abel`, `ring`, `linarith`.
- **Measure-theoretic**:
  - `Integrable.mono`, `Integrable.const_mul`, `Integrable.add`, `aemeasurable_of_aemeasurable_exp_mul`, `aestronglyMeasurable`, `ae_of_all`, `fun_prop`, `memLp_of_mem_interior_integrableExpSet`.
- **Real analysis**:
  - `exp_le_exp`, `mul_le_mul_of_nonneg/right`, `abs_of_nonneg/pos`, `rpow_le_rpow`, `le_add_iff_nonneg/right/left`, `sub_le_iff_le_add`.
- **Set-theoretic**:
  - `interior_subset`, `Set.Ioo`, `inf_le_left/right`, `half_lt_self`, `sub_half_inf_sub_mem_Ioo`, `add_half_inf_sub_mem_Ioo`.

---

### **4. Proof Logic**

- **Inductive structure**:
  - Most proofs follow a *two-step pattern*:
    1. **Measurability / AEMeasurability**: via `aemeasurable_of_aemeasurable_exp_mul` or `fun_prop`.
    2. **Norm bound**: use inequalities (e.g., $ \exp(t x) \le \exp(a x) + \exp(b x) $) to dominate the integrand.
- **Common proof shapes**:
  - **Convexity**: WLOG assume $ t_1 \le t_2 $, then show convex combination lies in interval using monotonicity of exponential.
  - **Interior regularity**: Extract an open interval $ (l, u) \ni v $, define $ t = \min(v - l, u - v)/2 > 0 $, then apply endpoint integrability at $ v \pm t $.
  - **Power bounds**: Use inequality $ |x|^p \le (p/t)^p \max(\exp(t x), \exp(-t x)) \le (p/t)^p \exp(t |x|) $, then dominate by integrable function.
- **Symmetry trick**: For $ \exp(t X) $ integrable at $ \pm t $, deduce integrability of $ \exp(t |X|) $, enabling control over both tails.

---

### **5. Imports & Dependencies**

- **Core libraries**:
  - `Mathlib.MeasureTheory.Function.L1Space.Integrable`: for `Integrable`, `MemLp`, `norm_eq_abs`, etc.
  - `Mathlib.MeasureTheory.Order.Group.Lattice`: for lattice and order-theoretic tools (e.g., `le_add_iff_nonneg_left`).
- **Scoped namespaces**:
  - `MeasureTheory`, `ProbabilityTheory`, `ENNReal`, `NNReal`, `Real`, `Topology`, `Filter`, `Finset`.
- **Key external lemmas used**:
  - `exp_le_exp`, `abs_exp`, `rpow_le_rpow`, `le_inv_mul_exp`, `convex_Ioo`, `interior_Ioo`, `memLp_zero_iff_aestronglyMeasurable`.

---

### **6. Mermaid Diagrams**

#### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[MeasureTheory.Function.L1Space.Integrable] --> B[IntegrableExpMul]
  C[MeasureTheory.Order.Group.Lattice] --> B
  B --> D[Convexity of integrableExpSet]
  B --> E[Interior regularity: |X|^p exp(vX)]
  B --> F[Finite moments: X ∈ ℒ^p]
  B --> G[Complex extension: cexp(zX)]
  D --> E
  E --> F
  E --> G
```

#### **Overview of Theory Flow**

```mermaid
flowchart LR
  A[exp(tX) integrable at a,b] --> B[exp(tX) integrable on [a,b]]
  B --> C[convex_integrableExpSet]
  C --> D[interior nonempty ⇒ AEMeasurable X]
  D --> E[integrable_rpow_abs_mul_exp_of_mem_interior]
  E --> F[integrable_pow_abs_mul_exp_of_mem_interior]
  F --> G[memLp_of_mem_interior_integrableExpSet]
  G --> H[X ∈ ℒ^p for all p < ∞]
  E --> I[integrable_cexp_mul_of_re_mem_interior]
```

---

### **7. Domain-Specific Insights for AI Agent**

- **Goal**: Prove integrability of exponential moments and derive moment bounds.
- **Key strategy**: Reduce to endpoint integrability, then use convexity or symmetry.
- **Critical lemmas**:
  - `integrable_exp_mul_of_le_of_le`: the workhorse for interval inclusion.
  - `integrable_rpow_abs_mul_exp_of_mem_interior`: enables moment bounds in the interior.
  - `memLp_of_mem_interior_integrableExpSet`: bridges MGF domain to $ L^p $ spaces.
- **Pattern to recognize**: If a lemma has `_of_mem_interior`, it assumes $ v \in \mathrm{int}(\mathrm{dom}(MGF)) $, and yields strong regularity (powers, complex exponentials).
- **Complex extension**: The `Complex` section shows that analyticity of MGF follows from real interior nonemptyness.

--- 

Let me know if you'd like a ** tactic recommendation engine ** or ** lemma retrieval schema ** based on this metadata.
