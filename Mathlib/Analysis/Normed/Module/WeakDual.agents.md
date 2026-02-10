### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `NormedSpace.Dual.toWeakDual` | `Dual 𝕜 E ≃ₗ[𝕜] WeakDual 𝕜 E` — canonical linear equivalence (identity map) between dual with operator norm and weak-* dual. |
| `NormedSpace.Dual.continuousLinearMapToWeakDual` | `Dual 𝕜 E →L[𝕜] WeakDual 𝕜 E` — same as `toWeakDual`, but as a *continuous* linear map. |
| `WeakDual.toNormedDual` | `WeakDual 𝕜 E ≃ₗ[𝕜] Dual 𝕜 E` — inverse of `toWeakDual`. |
| `dual_norm_topology_le_weak_dual_topology` | `TopologicalSpace (Dual 𝕜 E) ≤ TopologicalSpace (WeakDual 𝕜 E)` — weak-* topology is coarser than dual norm topology. |
| `WeakDual.polar` | `Set E → Set (WeakDual 𝕜 E)` — polar set of `s ⊆ E`, viewed in weak-* dual via pullback along `toNormedDual`. |
| `WeakDual.isClosed_polar` | `IsClosed (polar 𝕜 s)` — polar sets are closed in weak-* topology. |
| `WeakDual.isCompact_polar` | `IsCompact (polar 𝕜 s)` under `ProperSpace 𝕜` and `s ∈ 𝓝(0)` — Banach–Alaoglu (general polar version). |
| `WeakDual.isCompact_closedBall` | `IsCompact (toNormedDual ⁻¹' closedBall x' r)` — Banach–Alaoglu for closed balls in dual. |
| `WeakDual.isClosed_image_coe_of_bounded_of_closed` | Image of bounded closed set under coercion `↑ : WeakDual 𝕜 E → E → 𝕜` is closed. |
| `WeakDual.isCompact_of_bounded_of_closed` | Bounded + closed ⇒ compact in `WeakDual 𝕜 E`, assuming `ProperSpace 𝕜`. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `toWeakDual`, `toNormedDual`: canonical “identity” maps between type synonyms.
  - `continuousLinearMapToWeakDual`: bundled continuous linear map version.
  - `isClosed_`, `isCompact_`: standard predicates for topological properties.
  - `polar_`: polar sets (set-theoretic constructions).
- **Suffixes**:
  - `_def`, `_inj`, `_continuous`: auxiliary lemmas about definitions.
  - `_image_coe`, `_image_polar`: images under coercion or polar maps.
- **Pattern**: `isCompact_of_bounded_of_closed` — implication-based naming for compactness criteria.

#### 3. **Tactic Stack**
- `simp only [...]` — for rewriting definitions (e.g., `polar_def`).
- `exact`, `convert`, `rfl`, `rfl`-based simplifications — for definitional equalities.
- `isClosed_biInter`, `preimage`, `norm` — for closure arguments using continuity.
- `isCompact_iff.mpr` / `.mpr` — compactness proofs via homeomorphic embeddings or continuous images.
- `induced_id.symm`, `induced_iff`, `isClosed_induced_iff'` — topology manipulation via induced topologies.
- `DFunLike.coe_injective.isEmbedding_induced` — advanced topology reasoning for embeddings.

#### 4. **Proof Logic**
- **Structure**:
  - Prove continuity of identity map (`toWeakDual_continuous`) via `WeakBilin.continuous_of_continuous_eval`.
  - Derive topological comparison (`dual_norm_topology_le_weak_dual_topology`) via `le_induced`.
  - For Banach–Alaoglu:
    - Show polar sets are bounded and closed.
    - Use `isCompact_of_bounded_of_closed`, which reduces to compactness of image under coercion.
    - Prove image is closed using `isClosed_image_coe_of_bounded_of_closed`.
- **Common pattern**: Reduce compactness in `WeakDual` to compactness in function space `E → 𝕜` (with product topology), leveraging:
  - Embedding via coercion `↑ : WeakDual 𝕜 E → E → 𝕜`.
  - Tychonoff / properness of base field (`ProperSpace 𝕜`).

#### 5. **Imports**
- `Mathlib.Analysis.Normed.Module.Dual` — dual space and operator norm.
- `Mathlib.Analysis.NormedSpace.OperatorNorm.Completeness` — completeness of dual space.
- `Mathlib.Topology.Algebra.Module.WeakDual` — weak-* topology definition and basic properties.

---

This module formalizes foundational functional-analytic results about weak-* topology on duals of normed spaces, with emphasis on continuity of canonical maps and compactness (Banach–Alaoglu). It leverages Lean’s type-synonym pattern (`Dual` vs `WeakDual`) to distinguish topologies while sharing underlying type.