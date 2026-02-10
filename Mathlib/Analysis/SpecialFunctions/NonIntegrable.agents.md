### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `not_integrableOn_of_tendsto_norm_atTop_of_deriv_isBigO_filter_aux` | `[CompleteSpace E] → ... → ¬IntegrableOn g k` | Auxiliary lemma: if `f → ∞` and `f' = O(g)` along a filter `l`, then `g` is not integrable on sets in `l`. Assumes completeness of `E`. |
| `not_integrableOn_of_tendsto_norm_atTop_of_deriv_isBigO_filter` | `... → ¬IntegrableOn g k` | Main lemma: same as above, but removes completeness assumption via embedding into completion. |
| `not_intervalIntegrable_of_tendsto_norm_atTop_of_deriv_isBigO_filter` | `... → ¬IntervalIntegrable g volume a b` | Application to interval integrability: if `f → ∞` near `c ∈ [a,b]` and `f' = O(g)`, then `g` is not interval integrable on `a..b`. |
| `not_intervalIntegrable_of_tendsto_norm_atTop_of_deriv_isBigO_within_diff_singleton` | `... → ¬IntervalIntegrable g volume a b` | One-sided version: differentiability and growth only on `[a,b] \ {c}`. |
| `not_intervalIntegrable_of_tendsto_norm_atTop_of_deriv_isBigO_punctured` | `... → ¬IntervalIntegrable g volume a b` | Punctured-neighborhood version: `f → ∞` as `x → c, x ≠ c`, and `f' = O(g)`. |
| `not_intervalIntegrable_of_sub_inv_isBigO_punctured` | `... → ¬IntervalIntegrable f volume a b` | Specific application: if `1/(x - c) = O(f)` near `c`, then `f` is not integrable on intervals containing `c`. |
| `intervalIntegrable_sub_inv_iff` | `IntervalIntegrable (fun x => (x - c)⁻¹) ↔ a = b ∨ c ∉ [[a, b]]` | Full characterization of integrability of `(x - c)⁻¹`. |
| `intervalIntegrable_inv_iff` | `IntervalIntegrable (fun x => x⁻¹) ↔ a = b ∨ 0 ∉ [[a, b]]` | Special case of above for `c = 0`. |
| `not_IntegrableOn_Ici_inv`, `not_IntegrableOn_Ioi_inv` | `¬IntegrableOn (·⁻¹) (Ici a)`, `¬IntegrableOn (·⁻¹) (Ioi a)` | Non-integrability of `x⁻¹` on unbounded intervals. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `not_..._of_...`: Indicates a *negated integrability* statement derived from growth/differentiability conditions.
  - `intervalIntegrable_..._iff`: Characterization theorems for integrability (↔).
- **Suffixes:**
  - `_punctured`: Refers to behavior in the punctured neighborhood filter `𝓝[≠] c`.
  - `_within_diff_singleton`: Behavior on `[a,b] \ {c}`.
  - `_filter`, `_aux`: Distinguishes general filter-based versions (`_filter`) from auxiliary or technical variants (`_aux`).
- **Function names:**
  - `deriv f =O[l] g`: Asymptotic dominance of derivative by `g`.
  - `Tendsto (fun x => ‖f x‖) l atTop`: `f` tends to infinity along filter `l`.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `filter_upwards`: To simplify/filter filter-based hypotheses.
- `simp only`, `simp`: For simplification with specific lemmas (e.g., `hasDerivAt_log`, `norm_integral_le_integral_norm`).
- `rw`, `congr_arg`: Rewriting and congruence closure.
- `exact`, `refine`, `apply`: Goal-directed proof construction.
- `mono`, `mono_set`, `mono_left`: Monotonicity reasoning for sets/filters/integrals.
- `aesop`: Used implicitly (via `aesop`-style automation in `rcases`, `obtain`, etc.).
- `intervalIntegral`-specific lemmas: `integral_deriv_eq_sub`, `norm_integral_le_integral_norm`, `setIntegral_mono_set`, `ae_restrict_mem`.

---

#### 4. **Proof Logic**

- **Structure of main arguments:**
  1. **Reduction to auxiliary lemma** (e.g., via embedding into completion to drop `CompleteSpace` assumption).
  2. **Extraction of constants and sets** from `IsBigO` hypothesis (`hfg : deriv f =O[l] g`) using `exists_nonneg`.
  3. **Construction of interval `[c, d]`** where `‖f d‖ - ‖f c‖` exceeds integral bound.
  4. **Chain of inequalities** bounding `‖f d - f c‖` via fundamental theorem of calculus and `‖deriv f‖ ≤ C·‖g‖`.
  5. **Contradiction** with `‖f d‖ - ‖f c‖ > ∫ C·‖g‖`, violating the assumption of integrability.

- **Common pattern:**
  - Use `tendsto_norm_atTop` to get `‖f d‖` large.
  - Use `intervalIntegral` calculus (`integral_deriv_eq_sub`) to relate `f(d) - f(c)` to `∫ deriv f`.
  - Bound `∫ deriv f` by `C·∫ g`, contradicting growth.

- **Special cases (e.g., `x⁻¹`)**:
  - Use `Real.log` as antiderivative on punctured neighborhoods.
  - Show `log → ±∞` near singularity → apply general lemma.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Log.Deriv` | Derivative of `log`, `x⁻¹`, etc. |
| `Mathlib.MeasureTheory.Integral.FundThmCalculus` | Fundamental theorem of calculus for interval integrals (`integral_deriv_eq_sub`, etc.) |

**Key external dependencies:**
- `MeasureTheory.IntervalIntegral`
- `Asymptotics` (`IsBigO`, `tendsto`, filters)
- `Topology.NhdsWithin`, `Filter.Basic`
- `NormedSpace`, `CompleteSpace`, `ContinuousLinearMap`

---

### Summary

This file formalizes a *general principle*: if a function blows up at a point and its derivative is asymptotically dominated by another function `g`, then `g` cannot be integrable over intervals containing that point. It culminates in a clean characterization of when `(x - c)⁻¹` or `x⁻¹` is integrable — precisely when the singularity is avoided or the interval is degenerate. The proofs rely heavily on filter-theoretic asymptotics, the fundamental theorem of calculus for interval integrals, and careful estimation via norm inequalities.