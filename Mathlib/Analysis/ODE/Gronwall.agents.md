### Technical Brief: Grönwall’s Inequality in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `gronwallBound` | `δ K ε x : ℝ ↦ ℝ` | Upper bound function used in Grönwall-type inequalities; piecewise definition depending on whether `K = 0`. |
| `gronwallBound_K0` | `gronwallBound δ 0 ε = fun x ↦ δ + ε * x` | Simplifies `gronwallBound` when `K = 0`. |
| `gronwallBound_of_K_ne_0` | `K ≠ 0 ⇒ gronwallBound δ K ε = fun x ↦ δ * exp(K * x) + ε / K * (exp(K * x) - 1)` | Closed-form expression for `K ≠ 0`. |
| `hasDerivAt_gronwallBound` | `HasDerivAt (gronwallBound δ K ε) (K * gronwallBound δ K ε + ε)` | Derivative of `gronwallBound` satisfies ODE: `y' = K y + ε`. |
| `hasDerivAt_gronwallBound_shift` | Derivative of shifted `gronwallBound δ K ε (y - a)` | Used for time-shifted inequalities. |
| `gronwallBound_x0` | `gronwallBound δ K ε 0 = δ` | Initial condition matches `δ`. |
| `gronwallBound_ε0` | `gronwallBound δ K 0 x = δ * exp(K * x)` | Homogeneous case (`ε = 0`). |
| `gronwallBound_ε0_δ0` | `gronwallBound 0 K 0 x = 0` | Trivial case (`δ = ε = 0`). |
| `gronwallBound_continuous_ε` | `ε ↦ gronwallBound δ K ε x` is continuous | Ensures continuity in perturbation parameter `ε`. |
| `le_gronwallBound_of_liminf_deriv_right_le` | `f : ℝ → ℝ`, `liminf_{z→x+} (f(z)-f(x))/(z-x) ≤ K f(x) + ε` ⇒ `f(x) ≤ gronwallBound δ K ε (x-a)` | Scalar Grönwall inequality via liminf slope condition. |
| `norm_le_gronwallBound_of_norm_deriv_right_le` | `f : ℝ → E`, `‖f'(x)‖ ≤ K ‖f(x)‖ + ε`, `‖f(a)‖ ≤ δ` ⇒ `‖f(x)‖ ≤ gronwallBound δ K ε (x-a)` | Vector-valued Grönwall inequality (main technical result). |
| `dist_le_of_approx_trajectories_ODE_of_mem` | Distance between two approximate ODE trajectories ≤ `gronwallBound δ K (εf + εg)` | Perturbation stability of approximate solutions. |
| `dist_le_of_approx_trajectories_ODE` | Same as above, but on whole space (`s t = univ`). | Simpler corollary of previous. |
| `dist_le_of_trajectories_ODE_of_mem` | Distance between *exact* solutions ≤ `δ * exp(K (t-a))` | Exponential growth bound for exact solutions. |
| `dist_le_of_trajectories_ODE` | Same, on whole space. | Simpler version. |
| `ODE_solution_unique_of_mem_Icc_right` | Uniqueness of ODE solutions on `[a, b]` with initial time `a`. | Consequence of exponential distance bound. |
| `ODE_solution_unique_of_mem_Icc_left` | Time-reversed uniqueness on `[a, b]` with terminal time `b`. | Uses negation trick to reduce to right version. |
| `ODE_solution_unique_of_mem_Icc` | Uniqueness on `[a, b]` with initial time `t₀ ∈ (a, b)`. | Glues left/right uniqueness. |
| `ODE_solution_unique_of_mem_Ioo` | Local uniqueness on open interval `(a, b)`. | Uses local versions of uniqueness. |
| `ODE_solution_unique_of_eventually` | Local uniqueness up to neighborhood (`eventually` in filter sense). | Most general local uniqueness. |
| `ODE_solution_unique` | Global uniqueness on `[a, b]` under global Lipschitz assumption. | Standard Picard–Lindelöf uniqueness corollary. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `gronwallBound_*`: Properties of the bound function.
  - `le_*` / `norm_le_*` / `dist_le_*`: Upper bounds on functions/distances.
  - `ODE_solution_unique_*`: Uniqueness results for ODEs.
- **Suffixes**:
  - `_of_mem`: Solutions constrained to time-dependent sets `s t`.
  - `_of_approx_trajectories`: Approximate solutions (with error terms `εf`, `εg`).
  - `_of_trajectories`: Exact solutions (error = 0).
  - `_right` / `_left`: Initial/terminal time at right/left endpoint.
  - `_Icc` / `_Ioo` / `_Ioc` / `_Ico`: Interval type in domain.
  - `_eventually`: Filter-theoretic local uniqueness.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `by_cases hK : K = 0` | Case split on parameter `K`, critical for handling piecewise definition. |
| `simp only [...]` | Simplify using lemmas like `gronwallBound_K0`, `exp_zero`, etc. |
| `convert ... using 1` | Match derivative goals via chain rule / sum rule. |
| `rw [← dist_eq_norm]` | Translate between metric and norm expressions. |
| `exact ...` / `refine ...` | Apply known lemmas or construct proofs stepwise. |
| `linarith`, `ring`, `field_simp` | Arithmetic simplifications, especially in bounding chains. |
| `mem_Ioi.1 hε'` | Extract inequality from membership in interval filter. |
| `continuousWithinAt.closure_le` | Extend inequality from dense subset (e.g., `Ioi ε`) to closure (`Ici ε`). |
| `hasDerivAt_gronwallBound.comp ...` | Chain rule for derivatives of composite functions. |
| `sub`, `add`, `mul`, `const_mul`, `const_add` | Derivative calculus helpers. |

---

#### **4. Proof Logic**

- **Structure of main inequality (`norm_le_gronwallBound_of_norm_deriv_right_le`)**:
  1. Reduce to scalar case via `continuous_norm`.
  2. Apply `le_gronwallBound_of_liminf_deriv_right_le`, which uses:
     - `image_le_of_liminf_slope_right_lt_deriv_boundary`: A comparison principle for functions with controlled liminf slopes.
     - `gronwallBound_x0` for boundary condition at `x = a`.
     - `hasDerivAt_gronwallBound_shift` to verify that `gronwallBound` serves as a supersolution.
     - `gronwallBound_continuous_ε` to pass from strict inequalities (`ε' > ε`) to equality.

- **Uniqueness proofs**:
  - All rely on bounding `dist(f, g)` using Grönwall inequality.
  - For exact solutions, set `εf = εg = 0`, yielding exponential bound `δ * exp(K (t-a))`.
  - If `δ = 0` (i.e., `f(a) = g(a)`), then `dist(f, g) = 0` ⇒ `f = g`.

- **Time-reversal trick** (`ODE_solution_unique_of_mem_Icc_left`):
  - Compose with negation map `t ↦ -t` to flip interval orientation.
  - Use Lipschitz property preserved under composition with `Neg.neg`.

- **Local uniqueness**:
  - Use `eventually` filters to restrict to small neighborhoods.
  - Reduce to global uniqueness on small intervals via `ODE_solution_unique_of_mem_Icc`.

---

#### **5. Imports**

- `Mathlib.Analysis.SpecialFunctions.ExpDeriv`: Provides derivative of `exp`, chain rule, etc., essential for `gronwallBound` derivative calculations.
- Core imports implied by context:
  - `Mathlib.MeasureTheory.MeasurableSpace.Basic` (via `Metric`, `Asymptotics`, `Filter`)
  - `Mathlib.Topology.Basic` (via `TopologicalSpace`, `Metric`)
  - `Mathlib.LinearAlgebra.NormedSpace.Basic` (via `NormedAddCommGroup`, `NormedSpace ℝ E`)
  - `Mathlib.Calculus.FundamentalTheoremOfCalculus` (not yet imported, but mentioned in TODO for future generalizations)

---

#### **6. Notes & Future Work**

- **TODO**: Extend to variable coefficient `K(x)` or integral form (FTC needed).
- **Philosophy**: Emphasizes *quantitative* stability (bounds) over mere existence/uniqueness.
- **Modularity**: Separates scalar inequality, vector-valued extension, and ODE corollaries cleanly.

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific theorem.