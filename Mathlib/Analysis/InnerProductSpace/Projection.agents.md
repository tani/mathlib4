### Technical Brief: Orthogonal Projection in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `orthogonalProjectionFn` | `E → E` | Unbundled function returning the minimizing point in `K` for each `v ∈ E`. Used internally before bundling. |
| `orthogonalProjection` | `E →L[𝕜] K` | Bounded linear map (continuous linear map) from `E` to `K`, the *orthogonal projection* onto a complete subspace `K`. |
| `orthogonalProjection_inner_eq_zero` | `∀ w ∈ K, ⟪v - orthogonalProjection K v, w⟫ = 0` | Characterization: the residual `v - proj_K(v)` is orthogonal to `K`. |
| `orthogonalProjection_minimal` | `‖y - orthogonalProjection U y‖ = ⨅ x : U, ‖y - x‖` | The orthogonal projection minimizes distance to the subspace. |
| `orthogonalProjection_eq_self_iff` | `(orthogonalProjection K v = v) ↔ v ∈ K` | Fixed points of the projection are exactly elements of `K`. |
| `ker_orthogonalProjection` | `ker(orthogonalProjection K) = Kᗮ` | Kernel of the projection is the orthogonal complement. |
| `orthogonalProjection_orthogonal_val` | `(orthogonalProjection Kᗮ u : E) = u - orthogonalProjection K u` | Projection onto orthogonal complement gives the residual. |
| `orthogonalProjection_singleton` | `(orthogonalProjection (𝕜 ∙ v) w : E) = (⟪v, w⟫ / ‖v‖²) • v` | Explicit formula for projection onto a 1D subspace spanned by `v`. |
| `orthogonalProjection_map_apply` | `orthogonalProjection (p.map f) x = f (orthogonalProjection p (f.symm x))` | Compatibility of projection with linear isometries. |
| `smul_orthogonalProjection_singleton` | `‖v‖² • proj_{𝕜·v}(w) = ⟪v, w⟫ • v` | Scaling version of the 1D projection formula. |

**Key auxiliary lemmas:**
- `exists_norm_eq_iInf_of_complete_convex`: Existence of minimizer for convex, complete sets.
- `norm_eq_iInf_iff_inner_eq_zero`: Characterization of minimizers via orthogonality.
- `HasOrthogonalProjection`: Class encoding existence of orthogonal projection for a submodule.
- `orthogonalProjectionFn_mem`, `orthogonalProjectionFn_inner_eq_zero`: Properties of the unbundled version.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `orthogonalProjectionFn_`: unbundled helper lemmas (e.g., `orthogonalProjectionFn_mem`, `orthogonalProjectionFn_inner_eq_zero`)
  - `orthogonalProjection_`: bundled map lemmas (e.g., `orthogonalProjection_inner_eq_zero`, `orthogonalProjection_minimal`)
  - `eq_orthogonalProjection_`: uniqueness characterizations (e.g., `eq_orthogonalProjection_of_mem_of_inner_eq_zero`)
  - `hasOrthogonalProjection_`: class instance lemmas (e.g., `HasOrthogonalProjection.ofCompleteSpace`)
- **Suffixes:**
  - `_fn`: unbundled function/lemma
  - `_val`: value-level equality (e.g., `orthogonalProjection_orthogonal_val`)
  - `_iff`: biconditional characterizations (e.g., `orthogonalProjection_eq_self_iff`)
- **Notation:**
  - `⟪x, y⟫` for inner product (`@inner 𝕜 _ _ x y`)
  - `Kᗮ` for orthogonal complement (`orthogonal K`)
  - `‖·‖` for norm

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: Simplification with inner product and norm identities.
- `ring`: Algebraic simplification of expressions involving `+`, `*`, `smul`.
- `linarith`: Linear arithmetic over inequalities (e.g., in `norm_eq_iInf_iff_real_inner_le_zero`).
- `gcongr`: For monotonicity of `≤` under multiplication/square root.
- `rw [sq]`, `rw [norm_sub_sq]`: Rewriting squared norms.
- `apply mul_self_le_mul_self`, `nonneg_le_nonneg_of_sq_le_sq`: Norm comparison via squares.
- `tendsto_*` tactics (`tendsto_of_tendsto_of_tendsto_of_le_of_le`, `comp`, `tendsto_const_nhds`): Convergence arguments in analysis.
- `cauchySeq_iff_le_tendsto_0`, `cauchySeq_tendsto_of_isComplete`: Completeness-based Cauchy convergence.
- `abel`: Abelian group simplifications (e.g., `u - v - (w - v) = u - w`).
- `cases'`, `rcases`, `obtain`: Existential unpacking (e.g., from `HasOrthogonalProjection.exists_orthogonal`).
- `fun_prop`, ` continuity` (implicit via `Continuous.tendsto'`): Continuity arguments.

---

#### **4. Proof Logic**

The logical flow of the core development follows this pattern:

1. **Existence of minimizers**  
   - For convex, complete subsets: construct minimizing sequence via infimum approximation, prove it’s Cauchy using parallelogram law, then use completeness to get limit.

2. **Characterization of minimizers**  
   - Use convexity to consider points `v + θ(w − v)` and expand norm squared.
   - Derive inequality `⟪u − v, w − v⟫ ≤ 0`, then strengthen to equality for subspaces (by testing both `w` and `−w`).

3. **Bundling into linear map**  
   - Define `orthogonalProjectionFn` using choice (from `HasOrthogonalProjection`).
   - Prove linearity and continuity (norm ≤ 1) using orthogonality and parallelogram law.
   - Use `LinearMap.mkContinuous` to get `E →L[𝕜] K`.

4. **Orthogonal decomposition**  
   - Show `v = proj_K(v) + (v − proj_K(v))` with components in `K` and `Kᗮ`.
   - Prove uniqueness via orthogonality condition.
   - Derive `K ⊔ Kᗮ = ⊤` (via `orthogonalProjection_orthogonal_val` and `eq_orthogonalProjection_of_mem_orthogonal'`).

5. **Stability under isometries & maps**  
   - Use `f(orthogonalProjection_K(x)) = orthogonalProjection_{f(K)}(f(x))` via uniqueness.

6. **1D case**  
   - Reduce to span `{v}`, use orthogonality condition to solve for coefficient → derive `⟪v,w⟫/‖v‖²`.

---

#### **5. Imports**

Core dependencies defining the module’s scope:

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Convex.Basic` | Convex sets, properties used in minimizer existence. |
| `Mathlib.Analysis.InnerProductSpace.Orthogonal` | Definition of orthogonal complement `Kᗮ`, basic lemmas. |
| `Mathlib.Analysis.InnerProductSpace.Symmetric` | Symmetry of inner product, parallelogram law. |
| `Mathlib.Analysis.NormedSpace.RCLike` | `RCLike 𝕜` (real/complex-like fields), needed for `inner` and `norm`. |
| `Mathlib.Analysis.RCLike.Lemmas` | Technical lemmas for `RCLike`, e.g., `re`, `im`, `I`. |
| `Mathlib.Algebra.DirectSum.Decomposition` | Used implicitly for decomposition arguments (`K ⊔ Kᗮ = ⊤`). |

---

#### **Summary**

This file formalizes the **orthogonal projection theorem** in complete inner product spaces: every vector decomposes uniquely as `k + kᗮ`, with `k ∈ K`, `kᗮ ∈ Kᗮ`, and `proj_K` is a contractive linear retraction onto `K`. The development is highly structured, separating unbundled (`Fn`) and bundled (`orthogonalProjection`) versions, and carefully proves existence, uniqueness, linearity, continuity, and stability under isometries. The proofs rely heavily on convex analysis, Cauchy sequences, and inner product identities (parallelogram law, polarization).