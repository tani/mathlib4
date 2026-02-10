Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Removable Singularity Theorems in Complex Analysis**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `analyticAt_of_differentiable_on_punctured_nhds_of_continuousAt` | `{f : ℂ → E} → {c : ℂ} → (∀ᶠ z ∈ 𝓝[≠] c, DifferentiableAt ℂ f z) → ContinuousAt f c → AnalyticAt ℂ f c` | Weak removable singularity: if `f` is complex differentiable near `c` (except possibly at `c`) and continuous at `c`, then `f` is analytic at `c`. |
| `differentiableOn_compl_singleton_and_continuousAt_iff` | `{f : ℂ → E} → {s : Set ℂ} → {c : ℂ} → s ∈ 𝓝 c → (DifferentiableOn ℂ f (s \ {c}) ∧ ContinuousAt f c) ↔ DifferentiableOn ℂ f s` | Equivalence between differentiability on `s` and on `s \ {c}` plus continuity at `c`. |
| `differentiableOn_dslope` | `{f : ℂ → E} → {s : Set ℂ} → {c : ℂ} → s ∈ 𝓝 c → DifferentiableOn ℂ (dslope f c) s ↔ DifferentiableOn ℂ f s` | Relates differentiability of `f` to that of its slope function `dslope f c`. |
| `differentiableOn_update_limUnder_of_isLittleO` | `{f : ℂ → E} → {s : Set ℂ} → {c : ℂ} → s ∈ 𝓝 c → DifferentiableOn ℂ f (s \ {c}) → (f - f c) =o[𝓝[≠] c] (· - c)⁻¹ → DifferentiableOn ℂ (update f c (limUnder (𝓝[≠] c) f)) s` | Main removable singularity theorem: under a little-o growth condition, extending `f` by its limit at `c` yields differentiability on all of `s`. |
| `differentiableOn_update_limUnder_insert_of_isLittleO` | Same as above but for `insert c s` (i.e., `s` is a punctured neighborhood). | Variant for when `s` is already a punctured neighborhood. |
| `differentiableOn_update_limUnder_of_bddAbove` | Same premises but with `BddAbove (norm ∘ f '' (s \ {c}))` instead of little-o. | Removable singularity under boundedness assumption (classical Riemann version). |
| `tendsto_limUnder_of_differentiable_on_punctured_nhds_of_isLittleO` | `(∀ᶠ z ∈ 𝓝[≠] c, DifferentiableAt ℂ f z) → (f - f c) =o[𝓝[≠] c] (· - c)⁻¹ → Tendsto f (𝓝[≠] c) (𝓝 (limUnder (𝓝[≠] c) f))` | Shows `f` has a limit at `c` under differentiability + little-o condition. |
| `tendsto_limUnder_of_differentiable_on_punctured_nhds_of_bounded_under` | Same as above but with boundedness instead of little-o. | Classical removable singularity: bounded + differentiable ⇒ limit exists. |
| `two_pi_I_inv_smul_circleIntegral_sub_sq_inv_smul_of_differentiable` | Cauchy derivative formula: under differentiability on an open set containing `closedBall c R`, and `w₀ ∈ ball c R`, the contour integral gives `deriv f w₀`. | Application of removable singularity + Cauchy integral formula to derive derivative via contour integral. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `differentiableOn_`, `differentiableAt_`: denote differentiability on sets or at points.
  - `analyticAt_`: analyticity at a point.
  - `tendsto_limUnder_`: existence of limits via `limUnder`.
  - `update_`: refers to modifying a function at a point (here, defining value at singularity).
- **Suffixes**:
  - `_of_isLittleO`: condition involves little-o asymptotics.
  - `_of_bddAbove`: condition involves boundedness.
  - `_of_differentiable_on_punctured_nhds`: differentiability on a punctured neighborhood.
  - `_of_continuousAt`: continuity at the singular point.
- **Function names**:
  - `dslope f c`: slope function `(f z - f c) / (z - c)` (used for derivative extension).
  - `update f c y`: function equal to `f` except at `c`, where it equals `y`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rcases`, `rfl`, `eq_or_ne`: case analysis on equality.
- `refine`, `exact`, `simpa`, `rw`: proof construction and rewriting.
- `eventually_nhdsWithin_iff`, `mem_nhdsWithin_iff_exists_mem_nhds_inter`: filter manipulation.
- `ring`, `simp`, `simp_rw`: simplification and algebraic manipulation.
- `aesop`: automated reasoning for first-order logic + arithmetic.
- `lift R to ℝ≥0`: type coercion management.
- `circleIntegral.integral_congr`, `circleIntegrable.*`: integral reasoning.
- `continuousAt_update_same`, `differentiableAt.differentiableWithinAt`: standard lemmas for extension.

---

#### **4. Proof Logic**

- **General pattern**:
  1. Reduce to case where `f` is differentiable on `s \ {c}` and has a limit at `c`.
  2. Define auxiliary function `F z = (z - c) • f z` to handle singularity.
  3. Show `F` is differentiable on `s \ {c}` and continuous at `c`.
  4. Apply `differentiableOn_compl_singleton_and_continuousAt_iff` to lift differentiability to `s`.
  5. Use `dslope` to relate back to `f`.
- **Little-o case**:
  - Use `ho : (f - f c) =o[𝓝[≠] c] (z - c)⁻¹` to deduce `F z → 0` as `z → c`, i.e., `F` continuous at `c`.
- **Bounded case**:
  - Use `BddAbove` to get `f(z) - f(c) = O(1)`, hence `(f(z) - f(c)) * (z - c) → 0`, i.e., little-o condition holds.
- **Cauchy formula proof**:
  - Apply removable singularity to `dslope f w₀`, then use Cauchy integral formula for `dslope f w₀`, and simplify using algebraic identities.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.FDeriv.Analytic`: analyticity and power series.
  - `Mathlib.Analysis.Asymptotics.SpecificAsymptotics`: big-O, little-o, boundedness.
  - `Mathlib.Analysis.Complex.CauchyIntegral`: contour integrals, Cauchy formula.

- **Domain**: Complex analysis in infinite-dimensional normed spaces over `ℂ` (Banach space-valued functions).
- **Key structures**:
  - `NormedAddCommGroup E`, `NormedSpace ℂ E`, `CompleteSpace E`: ensures completeness and complex linearity.
  - Filter-based neighborhoods: `𝓝`, `𝓝[≠]`, `ball`, `closedBall`, `sphere`.

---

Let me know if you'd like a diagram of dependencies or a summary of how these theorems fit into a larger development (e.g., in the context of complex manifolds or sheaf theory).