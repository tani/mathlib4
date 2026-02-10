### Technical Brief: `Basic.lean` — Height Functions in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AdmissibleAbsValues K` | `class` | Captures a field `K` equipped with a multiset of archimedean absolute values and a set of non-archimedean ones, satisfying finiteness and the product formula. |
| `archAbsVal`, `nonarchAbsVal` | `Multiset`, `Set` | Components of `AdmissibleAbsValues`: archimedean and non-archimedean absolute values. |
| `totalWeight` | `ℕ` | Sum of multiplicities of archimedean places: `archAbsVal.card`. |
| `mulHeight₁ x` | `x : K ↦ ℝ` | Multiplicative height of a field element: product over `max(|x|_v, 1)` for all `v`. |
| `logHeight₁ x` | `x : K ↦ ℝ` | Logarithmic height: `log (mulHeight₁ x)`. |
| `mulHeight x` | `x : ι → K` (with `Finite ι`) ↦ ℝ | Multiplicative height of a tuple (projective height); junk value `1` at zero tuple. |
| `logHeight x` | `x : ι → K` ↦ ℝ | `log (mulHeight x)`. |
| `Finsupp.mulHeight x` | `x : α →₀ K` ↦ ℝ | Height of a finitely supported function: height of restriction to support. |
| `mulHeight₁_zero`, `mulHeight₁_one` | `mulHeight₁ 0 = 1`, `mulHeight₁ 1 = 1` | Normalization at 0 and 1. |
| `one_le_mulHeight₁`, `one_le_mulHeight` | `1 ≤ mulHeight₁ x`, `1 ≤ mulHeight x` | Positivity lower bound. |
| `mulHeight_smul_eq_mulHeight` | `c ≠ 0 ⇒ mulHeight (c • x) = mulHeight x` | Invariance under nonzero scaling (projective). |
| `mulHeight₁_eq_mulHeight` | `mulHeight₁ x = mulHeight ![x, 1]` | Embedding of affine height into projective height. |
| `mulHeight₁_div_eq_mulHeight` | `mulHeight₁ (x / y) = mulHeight ![x, y]` | Compatibility with projective coordinates. |
| `mulHeight_pow`, `logHeight_pow` | `mulHeight (x ^ n) = mulHeight x ^ n`, `logHeight (x ^ n) = n • logHeight x` | Homogeneity under coordinate-wise powering. |
| `mulHeight₁_inv`, `logHeight₁_inv` | `mulHeight₁ (x⁻¹) = mulHeight₁ x`, etc. | Invariance under inversion. |
| `mulHeight₁_zpow`, `logHeight₁_zpow` | Extend powering to `ℤ` using `natAbs`. | Handles negative exponents. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mulHeight` / `logHeight`: multiplicative vs logarithmic height.
  - `mulHeight₁` / `logHeight₁`: *affine* (1-dimensional) height (field elements).
  - `mulHeight` / `logHeight`: *projective* height (tuples / finitely supported maps).
- **Suffixes**:
  - `_eq`: definitional equality lemmas (e.g., `mulHeight₁_eq`).
  - `_zero`, `_one`: normalization at 0/1.
  - `_pos`, `_ne_zero`, `_nonneg`: positivity/nonzero/nonnegativity facts.
  - `_inv`, `_pow`, `_zpow`: behavior under inversion, natural/integer powers.
  - `_smul_eq`: scaling invariance.
  - `_div_eq`: rational function / projective coordinate behavior.
- **Meta extensions**:
  - `evalMulHeight₁`, `evalLogHeight₁`, etc.: positivity tactic extensions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using definitions, `mulHeight₁_eq`, `logHeight_eq`, etc. |
| `rcases eq_or_ne x 0` | Case split on whether a tuple is zero (to handle junk value). |
| `fin_cases i` | Case analysis on `Fin n` indices (e.g., `Fin 2`). |
| `convert` / `congr` | Align expressions for equality proofs (e.g., `max = iSup`). |
| `rw [product_formula]` | Apply the product formula for nonzero elements. |
| `exact`, `apply`, `refine` | Standard proof construction. |
| ` positivity` (via extensions) | Automatic positivity/nonnegativity discharge. |
| `norm_cast`, `pow_left_mono`, `ciSup_le_iff` | Analysis-level reasoning (suprema, powers, monotonicity). |
| `multiset.prod_map_mul`, `finprod_mul_distrib` | Algebraic manipulation of products over absolute values. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **case split on zero vs nonzero** (via `eq_or_ne`).
  - For nonzero tuples, reduce to properties of suprema (`⨆ i, v (x i)`) and finitely supported products (`∏ᶠ`).
  - Use the **product formula** to simplify global products (especially in scaling invariance proofs).
  - Leverage **embedding lemmas** (`mulHeight₁_eq_mulHeight`, `mulHeight₁_div_eq_mulHeight`) to reduce affine statements to projective ones.
  - For powering results, use continuity of power maps and monotonicity of suprema (`pow_left_mono`, `ciSup_le_iff`).
  - For integer powers, reduce to natural case via `natAbs` and inversion lemmas.

- **Induction**: Not used directly; instead, algebraic properties (e.g., `pow_left_mono`, `map_pow`) and case analysis suffice.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Log.Basic` | `Real.log`, basic properties. |
| `Mathlib.Algebra.Order.Group.Indicator` | For `Indicator`-style reasoning (used in `mulSupport_finite`, finiteness lemmas). |
| `Mathlib.Data.Fintype.Order` | `Finite ι`, `Fintype` reasoning for indexing types. |
| `Mathlib.RingTheory.Nilpotent.Defs` | Possibly for `mulSupport` and finiteness lemmas (though not directly nilpotent-related here). |
| `Lean.Meta.Positivity` | Custom tactic extensions for `positivity` automation. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  Basic --> Mathlib.Analysis.SpecialFunctions.Log.Basic
  Basic --> Mathlib.Algebra.Order.Group.Indicator
  Basic --> Mathlib.Data.Fintype.Order
  Basic --> Mathlib.RingTheory.Nilpotent.Defs
  Basic --> Lean.Meta.Positivity

  subgraph Theory
    AdmissibleAbsValues
    mulHeight₁
    logHeight₁
    mulHeight
    logHeight
    Finsupp.mulHeight
  end

  Basic --> Theory
```

##### **Overview of Theory Structure**

```mermaid
graph TD
  Height[Height Module] --> AdmissibleAbsValues[AdmissibleAbsValues K]
  Height --> mulHeight₁[mulHeight₁ : K → ℝ]
  Height --> logHeight₁[logHeight₁ : K → ℝ]
  Height --> mulHeight[mulHeight : ι → K → ℝ]
  Height --> logHeight[logHeight : ι → K → ℝ]
  Height --> Finsupp.mulHeight[Finsupp.mulHeight : α →₀ K → ℝ]
  Height --> Finsupp.logHeight[Finsupp.logHeight]

  mulHeight₁ --> mulHeight₁_eq[mulHeight₁_eq]
  mulHeight₁ --> one_le_mulHeight₁
  mulHeight₁ --> mulHeight₁_zero
  mulHeight₁ --> mulHeight₁_one

  mulHeight --> mulHeight_smul_eq_mulHeight
  mulHeight --> mulHeight_pow
  mulHeight --> mulHeight_comp_equiv

  mulHeight₁ --> mulHeight₁_eq_mulHeight
  mulHeight₁ --> mulHeight₁_div_eq_mulHeight

  mulHeight₁ --> mulHeight₁_inv
  mulHeight₁ --> mulHeight₁_pow
  mulHeight₁ --> mulHeight₁_zpow

  logHeight₁ --> logHeight₁_eq_log_mulHeight₁
  logHeight₁ --> zero_le_logHeight₁

  logHeight --> logHeight_eq_log_mulHeight
  logHeight --> logHeight_pow
  logHeight --> logHeight_smul_eq_logHeight

  subgraph PositivityExtensions
    evalMulHeight₁
    evalLogHeight₁
    evalMulHeight
    evalLogHeight
  end

  Height --> PositivityExtensions
```

---

#### **7. Summary**

This file formalizes the foundational theory of **height functions** in a general setting (fields with admissible absolute values), supporting both **affine** (`mulHeight₁`, `logHeight₁`) and **projective** (`mulHeight`, `logHeight`) variants. It includes:

- A robust class `AdmissibleAbsValues` capturing the product formula and finiteness conditions.
- Key invariance properties (scaling, inversion, powering).
- Embeddings linking affine and projective heights.
- Automation support via `positivity` tactic extensions.

The design prioritizes **generality** (applicable to number fields, function fields) and **practicality** (junk values, projective normalization), while maintaining clean algebraic structure and proof modularity.

--- 

Let me know if you'd like a formal dependency graph (e.g., `leanpkg` or `lake`-level), or a visualization of the `AdmissibleAbsValues` class hierarchy.
