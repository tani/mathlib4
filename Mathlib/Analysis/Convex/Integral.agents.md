Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on formalization metadata relevant for building a domain-specific AI agent (e.g., for theorem proving assistance or formal verification):

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Convex.integral_mem` | `Convex ℝ s → IsClosed s → (∀ᵐ x ∂μ, f x ∈ s) → Integrable f μ → ∫ x, f x ∂μ ∈ s` | Non-strict Jensen: integral of a.e.-`s`-valued function lies in `s` if `s` is convex & closed. |
| `Convex.average_mem` | `Convex ℝ s → IsClosed s → (∀ᵐ x ∂μ, f x ∈ s) → Integrable f μ → ⨍ x, f x ∂μ ∈ s` | Same as above but for *average* (i.e., normalized integral). |
| `Convex.set_average_mem` | `Convex ℝ s → IsClosed s → μ t ≠ 0 → μ t ≠ ∞ → (∀ᵐ x ∂μ.restrict t, f x ∈ s) → IntegrableOn f t μ → ⨍ x in t, f x ∂μ ∈ s` | Average over a measurable set `t`. |
| `ConvexOn.map_average_le` | `ConvexOn ℝ s g → ContinuousOn g s → IsClosed s → ... → g (⨍ x, f x ∂μ) ≤ ⨍ x, g (f x) ∂μ` | **Jensen’s inequality** for convex functions: `g(avg f) ≤ avg(g ∘ f)`. |
| `StrictConvex.ae_eq_const_or_average_mem_interior` | `StrictConvex ℝ s → IsClosed s → ... → f =ᵐ[μ] const ∨ avg f ∈ interior s` | Strict convexity ⇒ average lies in interior unless `f` is a.e. constant. |
| `StrictConvexOn.ae_eq_const_or_map_average_lt` | `StrictConvexOn ℝ s g → ... → f =ᵐ[μ] const ∨ g(avg f) < avg(g ∘ f)` | **Strict Jensen**: inequality is strict unless `f` is a.e. constant. |
| `ae_eq_const_or_norm_average_lt_of_norm_le_const` | `StrictConvexSpace ℝ E → (∀ᵐ x, ‖f x‖ ≤ C) → f =ᵐ[μ] const ∨ ‖avg f‖ < C` | Norm version of strict Jensen in strictly convex normed spaces. |
| `ae_eq_const_or_norm_integral_lt_of_norm_le_const` | Same as above, but for *integral* instead of average. | Used to bound norm of integral by `μ(univ) * C`. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `Convex.` / `ConvexOn.` / `ConcaveOn.` / `StrictConvex.` / `StrictConvexOn.` — indicate the geometric/functional property.
  - `set_` — refers to averages/integrals over a measurable subset `t`.
  - `average_` / `integral_` — distinguishes between normalized and unnormalized versions.
  - `mem_` / `map_` — membership in sets vs. function application.
  - `epigraph` / `hypograph` — used for convex/concave function characterizations via epigraph/hypograph membership.

- **Suffixes**:
  - `_le` / `_lt` — non-strict vs. strict inequality.
  - `_mem` — membership in a set.
  - `_closure` — closure of a set.
  - `_interior` — interior of a set.

- **Pattern**:
  - `ConvexOn.map_average_le` = `ConvexOn` + `map` (apply `g`) + `average` + `le` (≤)
  - `ae_eq_const_or_...` = dichotomy: either `f` is a.e. constant or some strict inequality holds.

---

### 🔹 **Tactic Stack**

- **Core tactics**:
  - `borelize` — convert to Borel measurable space.
  - `rcases` / `obtain` — destruct existential/universal hypotheses.
  - `rw [← ...]` / `simp only [...]` — rewrite using definitions or simplifications.
  - `filter_upwards` — for almost-everywhere statements.
  - `tendsto_*` lemmas (e.g., `tendsto_integral_approxOn_of_measurable`) — convergence arguments.
  - `exact` / `refine` / `apply` — proof construction.
  - `push_neg` — push negations inward.
  - `calc` — chain inequalities.

- **Domain-specific automation**:
  - `separableSpace` instances via `hgm.isSeparable_range.mono`.
  - `average_pair` — lemma about pairing integrals.
  - `openSegment_*` lemmas — used in strict convexity arguments.

---

### 🔹 **Proof Logic / Strategy**

- **Induction-free**: proofs rely on:
  - Approximation of measurable functions by simple functions (`SimpleFunc.approxOn`).
  - Closure/interior properties of convex sets.
  - Almost-everywhere reasoning via `ae_mono`, `ae_restrict_of_ae`, `ae_eq_of_forall_setIntegral_eq`.
  - Dichotomy arguments: `or_iff_not_imp_right`, `ae_eq_const_or_exists_average_ne_compl`.
  - Reduction to known lemmas (e.g., `average_eq_integral`, `set_average_mem_closure`).
  - Use of `StrictConvexSpace` assumptions to get strict inequalities.

- **Common pattern**:
  1. Reduce to simple function approximation.
  2. Show membership/inequality holds for approximants (via finite sums).
  3. Pass to limit using continuity/closedness/convexity.
  4. For strict versions: use strict convexity + dichotomy to rule out equality unless constant.

---

### 🔹 **Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Function` | Convex/concave functions, epigraphs, Jensen inequalities. |
| `Mathlib.Analysis.Convex.StrictConvexSpace` | Strict convexity of normed spaces, balls, etc. |
| `Mathlib.MeasureTheory.Function.AEEqOfIntegral` | Characterization of a.e. equality via integrals. |
| `Mathlib.MeasureTheory.Integral.Average` | Definitions and basic properties of averages and set averages. |

- **Core typeclass assumptions**:
  - `[NormedAddCommGroup E]`, `[NormedSpace ℝ E]`, `[CompleteSpace E]`
  - `[IsFiniteMeasure μ]`, `[NeZero μ]`, `[IsProbabilityMeasure μ]`
  - `[StrictConvexSpace ℝ E]` (for strict versions)

---

### 🔹 **Tags & Keywords**

- `convex`, `integral`, `center mass`, `average value`, `Jensen's inequality`
- `strict convexity`, `epigraph`, `interior`, `closure`, `normed space`

---

Let me know if you'd like this exported as JSON/YAML or adapted for a specific AI agent schema (e.g., for retrieval, synthesis, or verification).