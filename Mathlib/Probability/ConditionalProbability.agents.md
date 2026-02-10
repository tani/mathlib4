### Technical Metadata Brief: Conditional Probability in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cond` | `cond (s : Set Ω) : Measure Ω` | Defines the conditional measure: `(μ s)⁻¹ • μ.restrict s`. |
| `cond_isProbabilityMeasure_of_finite` | `(hcs : μ s ≠ 0) (hs : μ s ≠ ∞) → IsProbabilityMeasure μ[|s]` | Ensures `μ[|s]` is a probability measure when `μ s` is finite and nonzero. |
| `cond_isProbabilityMeasure` | `[IsFiniteMeasure μ] → (hcs : μ s ≠ 0) → IsProbabilityMeasure μ[|s]` | Special case for finite measures. |
| `cond_apply` / `cond_apply'` | `(hms : MeasurableSet s) → μ[t|s] = (μ s)⁻¹ * μ (s ∩ t)` | Axiomatic definition of conditional probability derived from measure-theoretic definition. |
| `cond_cond_eq_cond_inter` | `(hms : MeasurableSet s) (hmt : MeasurableSet t) [IsFiniteMeasure μ] → μ[|s][|t] = μ[|s ∩ t]` | Iterated conditioning reduces to conditioning on intersection. |
| `cond_eq_inv_mul_cond_mul` (**Bayes’ Theorem**) | `(hms : MeasurableSet s) (hmt : MeasurableSet t) [IsFiniteMeasure μ] → μ[t|s] = (μ s)⁻¹ * μ[s|t] * μ t` | Formal statement of Bayes’ rule in this setting. |
| `cond_mul_eq_inter` | `(hms : MeasurableSet s) [IsFiniteMeasure μ] → μ[t|s] * μ s = μ (s ∩ t)` | Rearranged form of conditional probability definition. |
| `sum_meas_smul_cond_fiber` | `[Fintype α] [MeasurableSpace α] [DiscreteMeasurableSpace α] → (hX : Measurable X) [IsFiniteMeasure μ] → ∑ x, μ (X ⁻¹' {x}) • μ[|X ← x] = μ` | Law of total probability for discrete random variables. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cond_`: for conditional measure-related lemmas (`cond_apply`, `cond_cond_eq_cond_inter`, etc.)
  - `isProbabilityMeasure`: for properties of measures being probability measures.
  - `absolutelyContinuous_`: for absolute continuity lemmas (`cond_absolutelyContinuous`, `absolutelyContinuous_cond_univ`).
- **Suffixes**:
  - `_of_`: for variants with explicit assumptions (e.g., `cond_isProbabilityMeasure_of_finite`).
  - `_eq_zero`, `_ne_zero`, `_pos`: for zero/nonzero/positivity conditions.
  - `_inter`, `_compl`, `_fiber`: for structural properties (intersection, complement, fibers).
- **Abbreviations**:
  - `hci`: hypothesis for *conditionable* intersection (e.g., `hci : μ (s ∩ t) ≠ 0`).
  - `hms`, `hmt`: measurability of sets `s`, `t`.
  - `hcs`, `hcs'`: conditionability of `μ s` (nonzero, finite).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: for simplifying definitions (`cond`, `restrict`, `smul`, etc.).
- `rw`: rewriting using lemmas like `cond_apply`, `cond_mul_eq_inter`.
- `obtain h | h := eq_or_ne ...`: case analysis on equality with zero or top.
- `exact`, `convert`, `refine`: for constructing proofs step-by-step.
- `aesop`: used in `sum_meas_smul_cond_fiber` for automated reasoning.
- `ext`: extensionality for measures (proving two measures equal by evaluating on all measurable sets).
- `all_goals first | ...`: tactic combinators for branching proof strategies.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern: unfold `cond`, apply `Measure.smul_apply`, `Measure.restrict_apply'`, simplify using `ENNReal` arithmetic.
  - Many proofs involve case analysis on whether `μ s = 0` or `μ s = ∞`, using `eq_or_ne`.
  - For Bayes’ theorem and iterated conditioning, proofs rely on algebraic manipulation of ENNReal multiplication/inversion and associativity/commutativity.
  - Discrete law of total probability uses:
    - `sum_meas_smul_cond_fiber`: expands sum over fibers of `X`,
    - `cond_mul_eq_inter` to rewrite terms,
    - `measure_biUnion_finset` to combine disjoint unions,
    - `aesop` to handle measure-theoretic simplifications.

---

#### **5. Imports**

- `Mathlib.MeasureTheory.Measure.Typeclasses`: provides foundational measure theory infrastructure (e.g., `IsFiniteMeasure`, `IsProbabilityMeasure`, `Measure.restrict`, `Measure.smul`).
- `MeasureTheory.Measure`: core measure theory utilities.
- `MeasurableSpace`, `Set`: for measurable sets, intersections, complements, preimages.
- `ENNReal`: extended nonnegative reals for handling infinite measures.

---

### Summary

This file formalizes conditional probability in full measure-theoretic generality, with support for:
- Conditional measures (`μ[|s]`),
- Conditional probabilities (`μ[t|s]`),
- Bayes’ theorem,
- Law of total probability (general and discrete),
- Iterated conditioning.

It uses a clean, scalable design with scoped notations and leverages `ENNReal` arithmetic for robustness. The naming and structure follow Lean/Mathlib conventions, prioritizing clarity and reuse.