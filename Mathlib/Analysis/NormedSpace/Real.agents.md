### Technical Brief: Real (Semi)normed Space Geometry in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `Real.punctured_nhds_module_neBot` | `NeBot (𝓝[≠] x)` | Shows no isolated points in nontrivial real topological modules. |
| `inv_norm_smul_mem_unitClosedBall` | `‖x‖⁻¹ • x ∈ closedBall 0 1` | Normalizes any nonzero vector to lie in the closed unit ball. |
| `norm_smul_of_nonneg` | `0 ≤ t ⇒ ‖t • x‖ = t * ‖x‖` | Norm scales linearly with nonnegative real scalars. |
| `dist_smul_add_one_sub_smul_le` | `r ∈ [0,1] ⇒ dist(r•x + (1−r)•y, x) ≤ dist(y,x)` | Convex combinations are nonexpansive toward `x`. |
| `closure_ball` | `r ≠ 0 ⇒ closure (ball x r) = closedBall x r` | Closure of open ball = closed ball in real seminormed space (nonzero radius). |
| `frontier_ball` | `r ≠ 0 ⇒ frontier (ball x r) = sphere x r` | Boundary of open ball = sphere. |
| `interior_closedBall` | `r ≠ 0 ⇒ interior (closedBall x r) = ball x r` | Interior of closed ball = open ball (nonzero radius). |
| `frontier_closedBall` | `r ≠ 0 ⇒ frontier (closedBall x r) = sphere x r` | Boundary of closed ball = sphere. |
| `interior_sphere` | `r ≠ 0 ⇒ interior (sphere x r) = ∅` | Sphere has empty interior (nowhere dense). |
| `frontier_sphere` | `r ≠ 0 ⇒ frontier (sphere x r) = sphere x r` | Sphere is closed and equal to its own boundary. |
| `exists_norm_eq` | `0 ≤ c ⇒ ∃ x, ‖x‖ = c` | Surjectivity of norm onto nonnegative reals in nontrivial normed space. |
| `range_norm` | `range norm = Ici 0` | Full description of norm’s image. |
| `nnnorm_surjective` | `Surjective nnnorm` | Nonnegative norm is surjective onto `ℝ≥0`. |
| `interior_closedBall'` | `interior (closedBall x r) = ball x r` | Same as `interior_closedBall`, but *without* assuming `r ≠ 0`; handles `r = 0` separately. |
| `frontier_closedBall'`, `interior_sphere'`, `frontier_sphere'` | Analogous refinements for all `r : ℝ` | Extend geometric lemmas to all radii, including zero, using case analysis. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `mem_`, `range_`, `frontier_`, `closure_`, `interior_`, `norm_`, `dist_`, `inv_`, `smul_`
- **Suffixes**:
  - `_ball`, `_closedBall`, `_sphere`, `_unitClosedBall`, `_closed_unit_ball` (deprecated alias)
  - `_nonneg`, `_neBot`, `_surjective`, `_eq`, `_le`, `_eq_empty`
- **Style**:
  - `X'` variants (e.g., `interior_closedBall'`) denote generalizations that remove side conditions (e.g., `r ≠ 0`) by case analysis.
  - `isClosed_`, `isOpen_` used for properties of sets (e.g., `isClosed_sphere`).
  - `mem_` for membership lemmas; `dist_`, `norm_` for metric/norm behavior.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp_rw` | Simplify with rewrite rules (e.g., `dist_eq_norm'`, `norm_smul`) |
| `rw` | Rewrite using equalities (e.g., `dist_eq_norm`, `Real.norm_eq_abs`) |
| `cases'` | Split on `eq_or_ne`, `lt_or_le`, `lt_or_eq` |
| `rcases` | Destruct existential or conjunctions (e.g., `⟨x, hx⟩`) |
| `convert` + `mem_closure` | Prove membership in closures via continuity |
| `gcongr` | Solve inequalities by congruence (e.g., monotonicity of multiplication) |
| `aesop` | Not present — this file uses explicit, structured reasoning |
| `exact`, `assumption`, `apply` | Basic proof steps |
| `set f := ...` | Introduce function definitions mid-proof (e.g., for convex paths) |
| `intro`, `rintro`, `have`, `suffices` | Standard natural-deduction style |

---

#### **4. Proof Logic & Strategy**

- **Induction is absent** — proofs rely on:
  - **Continuity arguments** (e.g., `ContinuousWithinAt`, `mem_closure`)
  - **Case analysis on radius** (`r = 0` vs `r ≠ 0`, or `r < 0` vs `r ≥ 0`)
  - **Convex path constructions**: `f(c) = c • (y - x) + x` to connect points via line segments
  - **Set-theoretic identities**: `frontier = closure ∩ closure(complement)`, `interior = complement(closure(complement))`
  - **Norm properties**: homogeneity, triangle inequality, positivity
- **Key logical flow**:
  1. Reduce to scalar inequalities using `dist_eq_norm`, `norm_smul`, `Real.norm_eq_abs`
  2. Use order properties of `ℝ` (e.g., `abs_of_nonneg`, `mul_lt_mul'`)
  3. Leverage continuity to lift pointwise behavior to topological operations (closure, interior)
  4. Handle edge cases (`r = 0`) separately via `rcases eq_or_ne`

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Normed.Module.Basic` | Seminormed/normed spaces, continuity of scalar mult, basic norm properties |
| `Mathlib.LinearAlgebra.Basis.VectorSpace` | Used implicitly via `Nontrivial E`, `Module ℝ E`, `NormedSpace ℝ E` |
| `Metric`, `Set`, `Function`, `Filter` | Core topology/metric space infrastructure |
| `NNReal`, `Topology` | For `ℝ≥0`, filters, neighborhoods, interiors, closures |
| `open scoped NNReal Topology` | Enables `Icc`, `Ico`, `Ici`, `dist`, `ball`, `closedBall`, `sphere` notation |

**Domain Scope**:  
Real (semi)normed vector spaces — geometric topology of metric balls and spheres, emphasizing:
- Convex structure (via linear combinations)
- Separation (nontriviality, Hausdorff via `NormedSpace`)
- Interaction of algebraic operations (scalar mult, addition) with topology

---

Let me know if you'd like a diagram of the logical dependencies or a formalized summary of the "ball geometry" lemmas as a reusable module.