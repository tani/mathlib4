### Technical Brief: Orthonormal Sets in Inner Product Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Orthonormal` | `Orthonormal (v : ι → E) : Prop` | Predicate asserting that `v` is an orthonormal family: all vectors have norm 1 and are pairwise orthogonal. |
| `orthonormal_iff_ite` | `Orthonormal 𝕜 v ↔ ∀ i j, ⟪v i, v j⟫ = if i = j then 1 else 0` | Equivalence between orthonormality and inner products matching Kronecker delta. |
| `orthonormal_subtype_iff_ite` | `Orthonormal 𝕜 (Subtype.val : s → E) ↔ ∀ v ∈ s, ∀ w ∈ s, ⟪v, w⟫ = if v = w then 1 else 0` | Orthonormality for subsets (via subtype). |
| `Orthonormal.inner_right_finsupp` | `⟪v i, linearCombination 𝕜 v l⟫ = l i` | Coefficient extraction via inner product with orthonormal family. |
| `Orthonormal.inner_left_finsupp` | `⟪linearCombination 𝕜 v l, v i⟫ = conj (l i)` | Conjugate coefficient extraction from left argument. |
| `Orthonormal.inner_sum` | `⟪∑ i ∈ s, l₁ i • v i, ∑ i ∈ s, l₂ i • v i⟫ = ∑ i ∈ s, conj (l₁ i) * l₂ i` | Inner product of finite linear combinations over orthonormal set simplifies to dot product of coefficients. |
| `Orthonormal.linearIndependent` | `Orthonormal 𝕜 v → LinearIndependent 𝕜 v` | Orthonormal families are linearly independent. |
| `exists_maximal_orthonormal` | `Orthonormal 𝕜 (Subtype.val : s → E) → ∃ w ⊇ s, ...` | Zorn’s Lemma-based existence of a maximal orthonormal superset. |
| `Orthonormal.sum_inner_products_le` | `∑ i ∈ s, ‖⟪v i, x⟫‖ ^ 2 ≤ ‖x‖ ^ 2` | **Finite Bessel’s inequality**. |
| `Orthonormal.tsum_inner_products_le` | `∑' i, ‖⟪v i, x⟫‖ ^ 2 ≤ ‖x‖ ^ 2` | **Infinite Bessel’s inequality** (via `tsum`). |
| `Orthonormal.inner_products_summable` | `Summable fun i => ‖⟪v i, x⟫‖ ^ 2` | Convergence of the Bessel sum. |
| `basisOfOrthonormalOfCardEqFinrank` | `Orthonormal 𝕜 v → Fintype.card ι = finrank 𝕜 E → Basis ι 𝕜 E` | Orthonormal family of correct cardinality is a basis. |
| `LinearMap.isometryOfOrthonormal` | `Orthonormal 𝕜 v → Orthonormal 𝕜 (f ∘ v) → E →ₗᵢ[𝕜] E'` | Construct a linear isometry from a linear map preserving orthonormality of a basis. |
| `Orthonormal.equiv` | `Orthonormal 𝕜 v → Orthonormal 𝕜 v' → ι ≃ ι' → E ≃ₗᵢ[𝕜] E'` | Isometric equivalence between Hilbert spaces induced by bijection of orthonormal bases. |

---

#### **2. Naming Conventions**

- **Predicates**: `Orthonormal`, `orthonormal_*` — prefix `orthonormal_` for lemmas about orthonormality.
- **Coefficient extraction**: `inner_right_*`, `inner_left_*` — indicates which argument of `inner` is fixed (right/left).
- **Summation variants**: `*_finsupp`, `*_sum`, `*_fintype` — distinguish proofs for `Finsupp`, finite sums, and finite types.
- **Structural properties**: `linearIndependent`, `comp`, `toSubtypeRange`, `orthonormal_of_forall_eq_or_eq_neg`.
- **Isometry-related**: `orthonormal_comp_iff`, `comp_linearIsometry`, `isometryOfOrthonormal`, `equiv`.
- **Inequality results**: `sum_inner_products_le`, `tsum_inner_products_le`, `inner_products_summable`.

---

#### **3. Tactic Stack**

- **Core simplification & rewriting**:
  - `simp`, `simp only`, `simp_rw`
  - `rw`, `convert`, `ext`
- **Case analysis & decision procedures**:
  - `split_ifs`, `cases'`, `rcases`
- **Algebraic simplification**:
  - `ring`, `norm_num`, `norm_cast`
- **Set-theoretic reasoning**:
  - `exact`, `obtain`, `rw [Set.sUnion_eq_iUnion]`, `apply`, `refine`
- **Order-theoretic / Zorn’s Lemma**:
  - `zorn_subset_nonempty`, `directedOn`, `ciSup`
- **Linear algebra**:
  - `linearIndependent_iff`, `Finsupp.sum_inner`, `inner_sum`, `inner_smul_right`, `inner_conj_symm`
- **Topological / analytic**:
  - `tsum_le_of_sum_le'`, `hasSum_of_isLUB_of_nonneg`, `isLUB_ciSup`

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Proofs often proceed by unfolding `Orthonormal` into its two components (norm-1 and pairwise orthogonality), then applying `orthonormal_iff_ite` to reduce to Kronecker delta behavior.
- **Coefficient extraction**:
  - Uses `inner_sum`, `inner_smul_right`, and `orthonormal_iff_ite` to collapse sums to single terms.
- **Linear independence**:
  - Assume linear combination = 0, apply inner product with `v i`, use coefficient extraction to deduce all coefficients = 0.
- **Maximality via Zorn**:
  - Apply `zorn_subset_nonempty` to the directed set of orthonormal subsets ordered by inclusion; closure under unions of chains uses `orthonormal_sUnion_of_directed`.
- **Bessel’s inequality**:
  - Expand `‖x - ∑ ⟪v i, x⟫ • v i‖²`, use orthonormality to diagonalize cross terms, simplify to `‖x‖² − ∑ ‖⟪v i, x⟫‖² ≥ 0`.
- **Isometry construction**:
  - Show `f` preserves inner products using coefficient expansions w.r.t. orthonormal bases, then apply `isometryOfInner`.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.InnerProductSpace.LinearMap` — core inner product space theory, linear maps, isometries.
- **Key modules used**:
  - `RCLike`, `Real`, `Filter`, `Topology`, `ComplexConjugate`, `Finsupp`
  - `LinearMap.BilinForm`
- **Typeclass assumptions**:
  - `[RCLike 𝕜]`: Base field (ℝ or ℂ).
  - `[SeminormedAddCommGroup E]`, `[InnerProductSpace 𝕜 E]`: Normed, complete inner product space (Hilbert space not required yet).
  - `[Fintype ι]`, `[DecidableEq ι]`: For finite-indexed versions.

---

#### **6. Domain-Specific AI Agent Notes**

- **Focus area**: Functional analysis / operator theory / quantum mechanics formalization.
- **Common tasks**:
  - Verifying orthonormality of candidate families.
  - Applying Bessel’s inequality or Parseval identities (not in this file, but likely in `projection.lean`).
  - Constructing isometries/equivalences between Hilbert spaces via basis mapping.
- **Key lemmas to surface**:
  - `orthonormal_iff_ite`, `inner_right_finsupp`, `sum_inner_products_le`, `exists_maximal_orthonormal`, `isometryOfOrthonormal`.
- **Anti-patterns to avoid**:
  - Confusing `Orthonormal` (family) with orthonormal *basis* (requires spanning).
  - Forgetting conjugate symmetry in inner product manipulations (`inner_conj_symm`).
  - Overlooking `DecidableEq` requirements for `orthonormal_iff_ite`.

--- 

Let me know if you'd like a visualization of the dependency graph or a tactic-level proof sketch for a specific theorem.