### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `birkhoffAverage` | `𝕜 → (E →ₗ[𝕜] E) → (E → E) → ℕ → E → E` | Computes the Birkhoff average: `(N : 𝕜)⁻¹ • ∑ n ∈ range N, f^[n] (g x)`; used to average iterates of a map `f` along a function `g`. |
| `birkhoffSum` | (implicit in definition of `birkhoffAverage`) | Partial sum of orbit: `∑ n ∈ range N, f^[n] x`. |
| `LinearMap.tendsto_birkhoffAverage_of_ker_subset_closure` | `∀ f hf g hg_proj hg_ker x, Tendsto (birkhoffAverage 𝕜 f id · x) atTop (𝓝 (g x))` | General ergodic theorem for normed spaces: convergence of Birkhoff averages to a projection `g`, assuming density of `range(f − id)` in `ker(g)`. |
| `orthogonalProjection` | `Submodule → E → E` | Orthogonal projection onto a closed submodule (here, fixed points of `f`). |
| `ContinuousLinearMap.tendsto_birkhoffAverage_orthogonalProjection` | `∀ f hf x, Tendsto (birkhoffAverage 𝕜 f id · x) atTop (𝓝 (orthogonalProjection (eqLocus f 1) x))` | **Von Neumann Mean Ergodic Theorem** in Hilbert spaces: Birkhoff averages converge to orthogonal projection onto fixed-point subspace. |
| `eqLocus f c` | `Submodule 𝕜 E` | Submodule of fixed points of `f` at scalar `c`, i.e., `{x | f x = c • x}`; here `c = 1`. |
| `IsFixedPt f x` | `Prop` | Predicate that `f x = x`. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `tendsto_`: indicates convergence to a limit (e.g., `tendsto_birkhoffAverage_...`)
  - `birkhoffAverage`, `birkhoffSum`: standard ergodic theory terms.
  - `orthogonalProjection`: standard geometric term.
  - `eqLocus`: standard algebraic term for solution set of `f x = c x`.
  - `isFixedPt`, `IsFixedPt`: standard dynamical systems notation.

- **Suffixes:**
  - `_of_...`: indicates assumptions or hypotheses used (e.g., `of_ker_subset_closure`).
  - `_apply_...`: sometimes used for lemmas about application of maps (e.g., `tendsto_birkhoffAverage_apply_sub_birkhoffAverage`).
  - `_mem_subspace_eq_self`: indicates membership in fixed-point subspace.

- **Notation:**
  - `⟪x, y⟫` for inner product (local notation).
  - `f^[n]` for `n`-th iterate of `f`.
  - `•` for scalar multiplication.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `obtain ⟨...⟩` | Decompose existential statements (e.g., decomposition of `x = y + z`). |
| `have / suffices / refine` | Modular proof structuring, especially for reductions. |
| `simp [hg_proj, hy, hz, ...]` | Simplify using hypotheses and definitions (e.g., `hg_proj`, `hy : g y = 0`). |
| `rw [...]` | Rewrite using equalities (e.g., kernel/closure relations). |
| `exact / apply` | Apply lemmas or hypotheses directly. |
| `simpa [...] using ...` | Simplify and discharge goal using a given proof. |
| `isClosed_setOf_tendsto_birkhoffAverage`, `isBounded_iff_forall_norm_le` | Apply library lemmas for topological properties. |
| `norm_sq_eq_inner`, `inner_sub_left`, `sub_eq_zero` | Inner product simplifications. |
| `closure_minimal` | Use minimality of closure under closed supersets. |
| `orthogonalProjection_mem_subspace_eq_self` | Property of orthogonal projection. |
| `Submodule.orthogonal_orthogonal_eq_closure` | Closure of range via orthogonal complement. |

---

#### 4. **Proof Logic**

- **High-level structure:**
  1. **Decomposition**: Any vector `x` splits as `y + z`, where `y ∈ ker(g)` and `z` is a fixed point.
  2. **Reduction**: Prove convergence for `y ∈ ker(g)`; fixed-point part is trivial.
  3. **Density argument**: Use continuity + density of `range(f − id)` in `ker(g)` to reduce to `y = f x − x`.
  4. **Cancellation trick**: For `y = f x − x`, the Birkhoff average simplifies via telescoping sum.
  5. **Hilbert space case**: Reduce to previous theorem by verifying density condition via orthogonal complement:
     - Show `ker(orthogonalProjection) = (range(f − id))⁻̄` by proving:
       - If `x ⟂ range(f − id)`, then `f x = x`.
       - Use `‖f x‖ ≤ ‖x‖` and `⟨f x, x⟩ = ‖x‖²` ⇒ `f x = x`.

- **Inductive/iterative reasoning**: Used implicitly via `iterate_map_zero`, `iterate_map_sub`, and properties of `f^[n]`.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.InnerProductSpace.Projection` | Provides `orthogonalProjection`, inner product properties, orthogonal complements. |
| `Mathlib.Dynamics.BirkhoffSum.NormedSpace` | Defines `birkhoffAverage`, `birkhoffSum`, basic convergence lemmas, and properties of iterates in normed spaces. |

Other key ambient assumptions:
- `[RCLike 𝕜]`: Scalar field behaves like `ℝ` or `ℂ`.
- `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]`: Topological vector space structure.
- `[InnerProductSpace 𝕜 E] [CompleteSpace E]`: Hilbert space structure for final theorem.

--- 

Let me know if you'd like a diagrammatic proof sketch or a tactic-level trace.