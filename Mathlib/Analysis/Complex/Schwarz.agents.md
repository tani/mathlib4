### Technical Metadata Brief: Schwarz Lemma in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type Signature (simplified) | Purpose |
|------|-----------------------------|---------|
| `schwarz_aux` | `DifferentiableOn f (ball c R₁) → MapsTo f (ball c R₁) (ball (f c) R₂) → z ∈ ball c R₁ → ‖dslope f c z‖ ≤ R₂ / R₁` | Auxiliary lemma for main derivative bound; uses maximum modulus principle on frontier of smaller closed ball. |
| `norm_dslope_le_div_of_mapsTo_ball` | Same conclusion as above | Main derivative bound for `dslope` (difference slope) in normed space setting; uses Hahn–Banach to reduce to scalar case. |
| `affine_of_mapsTo_ball_of_exists_norm_dslope_eq_div` | Under same hypotheses, if equality holds at one point, then `f` is affine on the ball | Equality case: rigidity result — extremal maps are affine. |
| `affine_of_mapsTo_ball_of_exists_norm_dslope_eq_div'` | Same as above, but with existential quantifier on the equality point | Corollary: existence of extremal point implies global affine form. |
| `norm_deriv_le_div_of_mapsTo_ball` | `DifferentiableOn f (ball c R₁) → MapsTo f (ball c R₁) (ball (f c) R₂) → 0 < R₁ → ‖deriv f c‖ ≤ R₂ / R₁` | Classical derivative bound at center (first version of Schwarz lemma). |
| `dist_le_div_mul_dist_of_mapsTo_ball` | Same setup → `dist (f z) (f c) ≤ (R₂ / R₁) * dist z c` | Lipschitz-type contraction bound for all points in the disk. |
| `abs_deriv_le_div_of_mapsTo_ball` | Same as `norm_deriv_le_div_of_mapsTo_ball`, but `f : ℂ → ℂ` | Scalar version of derivative bound (uses `abs = norm` on `ℂ`). |
| `abs_deriv_le_one_of_mapsTo_ball` | `f : ℂ → ℂ`, `f c = c`, `f` maps `ball c R` into itself → `|f'(c)| ≤ 1` | Standard Schwarz lemma at fixed point. |
| `dist_le_dist_of_mapsTo_ball_self` | Same setup → `dist (f z, c) ≤ dist (z, c)` | Non-expansiveness at all points when fixing center. |
| `abs_le_abs_of_mapsTo_ball_self` | `f(0) = 0`, `f` maps `ball 0 R` into itself → `|f z| ≤ |z|` | Pointwise contraction for self-maps fixing 0. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `norm_`, `abs_`: distinguish vector-valued vs complex-valued versions.
  - `dslope`: short for *difference slope* (i.e., `(f z - f c) / (z - c)`).
  - `mapsTo_ball`: indicates hypothesis that `f` maps one ball into another.
  - `self`: used when codomain ball is same as domain ball (e.g., `mapsTo_ball_self`).
- **Suffixes**:
  - `_le_div`: inequality involves ratio `R₂ / R₁`.
  - `_mul_dist`: inequality involves product `(R₂ / R₁) * dist z c`.
  - `_of_mapsTo_ball`: indicates main hypothesis `f` maps a ball into a ball.
  - `_of_exists_norm_dslope_eq_div`: equality case (extremal derivative).
- **Other**:
  - `schwarz_aux`: auxiliary helper lemma.
  - `dist_zero_right`, `div_self`, `one_mul`: used in simplifications for special cases (`c = 0`, `R ≠ 0`, etc.).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `rwa` | Rewriting definitions (`dslope`, `dist`, `norm`, `div`, etc.) and applying assumptions. |
| `simp` / `simp only` | Simplifying goals using known lemmas (e.g., `dist_self`, `norm_zero`, `div_self`). |
| `exact` / `refine` | Constructing proofs step-by-step; often with holes filled via `?_`. |
| `have`, `suffices` | Introducing intermediate claims or reformulating goals. |
| `filter_upwards` | Working with filters (e.g., `𝓝[<] R₁` for limits from below). |
| `intro`, `cases`, `rcases` | Logical decomposition (e.g., `eq_or_ne`, `exists_dual_vector`). |
| `apply`, `exact` | Applying lemmas (e.g., `ge_of_tendsto`, `isMaxOn_iff.mpr`). |
| `norm_num`, `linarith` | Arithmetic reasoning (less frequent here due to analysis focus). |
| `aesop` | Not used — this is heavy analysis; manual control preferred. |
| `ring`, `field_simp` | Used implicitly via `simp` for algebraic simplifications. |

---

#### **4. Proof Logic**

- **General Strategy**:
  1. **Reduction to scalar case** (for `norm_dslope_le_div_of_mapsTo_ball`): Use Hahn–Banach to find a functional `g` with `‖g‖ = 1` and `g(dslope f c z) = ‖dslope f c z‖`. Then apply scalar Schwarz lemma to `g ∘ f`.
  2. **Maximum modulus principle** (for `schwarz_aux`): Bound `‖dslope f c z‖` on the frontier of a smaller closed ball, then extend to interior via maximum modulus.
  3. **Equality case**: Show that if `‖dslope f c z₀‖ = R₂ / R₁` at some interior point, then `‖g‖` attains its maximum inside the domain ⇒ `g` constant ⇒ `f` affine.
  4. **Specialization to `ℂ`**: Use `abs = norm` and `dist = |· - ·|` to derive classical forms.

- **Induction**: Not used — relies on complex analysis tools (differentiability, maximum modulus, Hahn–Banach).
- **Cases**: On `z = c` or `dslope = 0` to handle division-by-zero or trivial cases.
- **Filter arguments**: Used in `schwarz_aux` to pass from bounds on smaller radii to limit at `R₁`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Complex.AbsMax` | Maximum modulus principle for holomorphic functions on disks. |
| `Mathlib.Analysis.Complex.RemovableSingularity` | Removable singularity theorem (used implicitly via differentiability assumptions). |
| `Mathlib.Topology.Basic` (via `TopologicalSpace`, `Filter`, `Metric`) | General topology, filters, metric space structure. |
| `Mathlib.Algebra.Module.Normed` (via `NormedAddCommGroup`, `NormedSpace ℂ E`) | Normed vector space structure over `ℂ`. |
| `Mathlib.Analysis.NormedSpace.Dual` (via `exists_dual_vector`) | Hahn–Banach separation / existence of norming functionals. |
| `Mathlib.Analysis.Convex.StrictConvexSpace` | For equality case (strict convexity ensures uniqueness of maximizer). |

---

#### **6. Domain-Specific AI Agent Notes**

- **Focus**: Complex analysis, especially geometric function theory and rigidity of holomorphic maps.
- **Typical Goals**: Prove derivative bounds, Lipschitz properties, or classify extremal functions under mapping constraints.
- **Common Patterns**:
  - Use `dslope` to avoid division by zero at `z = c`.
  - Reduce vector-valued problems to scalar via dual pairing.
  - Use `ball_mem_nhds`, `isOpen_ball`, `convex_ball` for local analysis.
- **Key Lemmas to Recall**:
  - `differentiableOn_dslope`, `diffContOnCl_dslope`
  - `isBounded_ball`, `frontier_ball`, `closure_ball`
  - `norm_le_of_forall_mem_frontier_norm_le` (maximum modulus)

--- 

Let me know if you'd like a diagram of the proof dependencies or a tactic-level trace of `norm_dslope_le_div_of_mapsTo_ball`.