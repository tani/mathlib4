Here's a structured technical metadata summary of the provided Lean 4 file on the **Open Mapping Theorem for Holomorphic Functions**, suitable for building a domain-specific AI agent in formalization or verification contexts:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DiffContOnCl.ball_subset_image_closedBall` | `DiffContOnCl ℂ f (ball z₀ r) → 0 < r → (∀ z ∈ sphere z₀ r, ε ≤ ‖f z - f z₀‖) → (∃ᶠ z in 𝓝 z₀, f z ≠ f z₀) → ball (f z₀) (ε / 2) ⊆ f '' closedBall z₀ r` | Core local estimate: if `f` is differentiable on the closed ball, bounded below on the sphere, and non-constant near `z₀`, then a disk of radius `ε/2` around `f(z₀)` lies in the image of the *closed* ball. |
| `AnalyticAt.eventually_constant_or_nhds_le_map_nhds_aux` | `AnalyticAt ℂ f z₀ → (∀ᶠ z in 𝓝 z₀, f z = f z₀) ∨ 𝓝 (f z₀) ≤ map f (𝓝 z₀)` | Local open mapping: analytic function at `z₀` is either locally constant or open at `z₀`. |
| `AnalyticAt.eventually_constant_or_nhds_le_map_nhds` | `AnalyticAt ℂ g z₀ → (∀ᶠ z in 𝓝 z₀, g z = g z₀) ∨ 𝓝 (g z₀) ≤ map g (𝓝 z₀)` | Same as above, but for `g : E → ℂ` (infinite-dimensional domain). Uses 1D reduction along rays. |
| `AnalyticOnNhd.is_constant_or_isOpen` | `AnalyticOnNhd ℂ g U → IsPreconnected U → (∃ w, ∀ z ∈ U, g z = w) ∨ ∀ s ⊆ U, IsOpen s → IsOpen (g '' s)` | Global open mapping theorem: analytic function on a preconnected open set is either constant or open (maps open subsets to open subsets). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `is_constant_or_isOpen`, `isPreconnected`, `isCompact_sphere` — often used for properties.
  - `eventually_`: e.g., `eventually_constant_or_nhds_le_map_nhds`, `eventually_eq_or_eventually_ne` — indicates behavior in a neighborhood (filter-theoretic).
  - `ball_`, `closedBall_`, `sphere_`: geometric objects in metric/normed spaces.
  - `nhds_`, `map_`, `mem_`: filter-theoretic operations.

- **Suffixes**:
  - `_aux`: auxiliary lemmas used in main proofs (e.g., `eventually_constant_or_nhds_le_map_nhds_aux`).
  - `_const`: constant function or equality to a constant.
  - `_mono`, `_subset`: monotonicity or inclusion lemmas.

- **Functional style**:
  - `gray z t := g (z₀ + t • z)` — composition with a ray.
  - `ray z t := z₀ + t • z` — parametrized line through `z₀`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `intro`, `rintro`, `obtain`, `refine`, `exact` | Proof structure and goal decomposition. |
| `have`, `replace`, `set` | Intermediate lemma introduction. |
| `simp`, `simp_rw`, `field_simp`, `ring` | Simplification of algebraic/analytic expressions. |
| `linarith`, `norm_num` | Linear arithmetic and numeric reasoning (especially for inequalities). |
| `filter_upwards`, `filter_mono`, `frequently`, `mem_of_superset` | Filter-based reasoning (neighborhoods, frequently, etc.). |
| `conv` / `congr_arg` | Equality reasoning for function compositions. |
| `eventually_of_mem`, `eventually_and`, `eventually_or` | Filter convergence arguments. |
| `isCompact_...`, `isPreconnected_...`, `convex_...` | Topological properties used in identity theorem or extremum arguments. |
| `apply`, `exact`, `rw`, `symm`, `trans` | Basic proof steps. |

---

### **4. Proof Logic & Strategy**

- **Local open mapping (`DiffContOnCl.ball_subset_image_closedBall`)**:
  - Uses **maximum modulus principle** on `z ↦ ‖f z - v‖`.
  - Shows existence of a point where this function attains a local minimum inside the ball.
  - If `v` is close to `f(z₀)`, the minimum must be zero ⇒ `v ∈ f(ball)`.

- **Local version (`AnalyticAt.eventually_constant_or_nhds_le_map_nhds_aux`)**:
  - Reduces to previous lemma via:
    - Isolated zeros: if not constant near `z₀`, then `f(z) ≠ f(z₀)` near `z₀` (except possibly at `z₀`).
    - Boundedness below on small spheres ⇒ apply `ball_subset_image_closedBall`.

- **Higher-dimensional local version (`AnalyticAt.eventually_constant_or_nhds_le_map_nhds`)**:
  - Restricts `g` to complex lines through `z₀`: `t ↦ g(z₀ + t·v)`.
  - If constant along all directions ⇒ global constancy via identity theorem.
  - If non-constant along one direction ⇒ apply 1D result.

- **Global version (`AnalyticOnNhd.is_constant_or_isOpen`)**:
  - Either there exists a point where `g` is eventually constant ⇒ constancy on all of `U` (by identity theorem on preconnected sets).
  - Else, at every point `g` is open ⇒ image of any open `s ⊆ U` is open (by local openness + openness characterization via neighborhoods).

---

### **5. Imports & Dependencies**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Analytic.IsolatedZeros` | Isolated zeros principle: non-constant analytic functions have isolated zeros. |
| `Mathlib.Analysis.Complex.CauchyIntegral` | Cauchy integral formula, differentiability, analyticity. |
| `Mathlib.Analysis.Complex.AbsMax` | Maximum modulus principle (used in `ball_subset_image_closedBall`). |
| `Mathlib.Topology.MetricSpace.ProperSpace.Lemmas` | Compactness of closed balls, spheres, and related lemmas (e.g., `isCompact_sphere`). |

---

### **6. Domain-Specific Notes for AI Agent**

- **Core concepts**: analyticity, openness, constancy, neighborhoods, filters, maximum modulus, identity theorem.
- **Key proof patterns**:
  - Reduction to 1D via restriction to lines.
  - Use of filter bases (`nhds_basis_ball`, `nhds_basis_closedBall`) for neighborhood arguments.
  - Interplay between topological properties (`IsPreconnected`, `IsOpen`, `IsCompact`) and analytic behavior.
- **Common lemmas reused**:
  - `convex_ball z₀ r`.isPreconnected
  - `closure_ball z₀ hr.ne.symm`
  - `analyticOnNhd_const`, `eqOn_of_preconnected_of_eventuallyEq`
  - `isCompact_sphere`, `sphere_nonempty`

Let me know if you'd like a visual proof dependency graph or a tactic-level trace for a specific theorem.