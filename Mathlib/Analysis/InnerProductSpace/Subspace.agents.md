### Technical Brief: Subspaces and Orthogonal Families in Inner Product Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Submodule.innerProductSpace` | `Submodule 𝕜 E → InnerProductSpace 𝕜 W` | Induces an inner product structure on a submodule `W ≤ E`, using the ambient inner product. |
| `Submodule.coe_inner` | `⟪x, y⟫ = ⟪(x : E), (y : E)⟫` | Confirms that the inner product on a submodule coincides with that of the ambient space. |
| `Orthonormal.codRestrict` | `Orthonormal v → (∀ i, v i ∈ s) → Orthonormal (codRestrict v s hvs)` | Pulls back an orthonormal family into a subspace via codomain restriction. |
| `orthonormal_span` | `Orthonormal v → Orthonormal (i ↦ ⟨v i, subset_span _⟩)` | Shows that the span of an orthonormal set inherits an orthonormal basis indexed by the original set. |
| `OrthogonalFamily` | `(G : ι → Type*) → (V : ∀ i, G i →ₗᵢ[𝕜] E) → Prop` | Defines a family of subspaces (via isometric embeddings `V i`) as mutually orthogonal: `⟪V i v, V j w⟫ = 0` for `i ≠ j`. |
| `OrthogonalFamily.eq_ite` | `⟪V i v, V j w⟫ = ite (i = j) ⟪V i v, V j w⟫ 0` | Encodes orthogonality via conditional equality (decidable equality on index). |
| `OrthogonalFamily.inner_right_dfinsupp` | `⟪V i v, l.sum V⟫ = ⟪v, l i⟫` | Inner product of a component with a finite sum collapses to the inner product in that component. |
| `OrthogonalFamily.inner_sum` | `⟪∑_{i∈s} V i (l₁ i), ∑_{j∈s} V j (l₂ j)⟫ = ∑_{i∈s} ⟪l₁ i, l₂ i⟫` | General Pythagorean identity for finite sums over orthogonal families. |
| `OrthogonalFamily.norm_sum` | `‖∑_{i∈s} V i (l i)‖² = ∑_{i∈s} ‖l i‖²` | Norm-squared of sum equals sum of norm-squared (Parseval-type identity). |
| `OrthogonalFamily.summable_iff_norm_sq_summable` | `Summable (V i (f i)) ↔ Summable (‖f i‖²)` | In a complete space, orthogonal series converges iff the series of squared norms converges. |
| `OrthogonalFamily.independent` | `OrthogonalFamily … → iSupIndep V` | Orthogonal families are linearly independent (in the sense of independent submodules). |
| `DirectSum.IsInternal.collectedBasis_orthonormal` | Under orthonormal bases for each orthogonal summand, the collected basis is orthonormal. | Constructs an orthonormal basis for a direct sum of orthogonal subspaces. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `orthogonal_`: e.g., `orthogonalFamily`, `orthonormal_span`, `orthonormal_sigma_orthonormal`.
  - `norm_`: e.g., `norm_sum`, `norm_sq_diff_sum`.
  - `inner_`: e.g., `inner_right_dfinsupp`, `inner_sum`, `inner_right_fintype`.
  - `codRestrict`, `subtypeₗᵢ`: standard Lean categorical notation for restriction and inclusion maps.

- **Suffixes**:
  - `_iff`: for equivalences (`summable_iff_norm_sq_summable`).
  - `_sum`: for results about sums over finite sets.
  - `_dfinsupp`, `_fintype`: distinguishes versions for `Σ`-types vs. `Finset`/`Fintype`.

- **Notation**:
  - `⟪x, y⟫` for inner product (locally scoped).
  - `↑x`, `(x : E)` for coercion from submodule to ambient space.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `simp only [...]` — heavily used for rewriting inner product properties, `ite`, `Finset.sum_ite_*`.
  - `rw [...]` — for applying lemmas like `inner_sum`, `sum_inner`, `sub_eq_add_neg`.
  - `congr` / `congr'` — for functional extensionality and equality of sums.
  - `split_ifs` — to handle `ite` cases.
  - `linarith` — for norm/real inequalities (especially in `summable_iff_norm_sq_summable`).
  - `convert ... using n` — for flexible proof refinement with matching up to definitional equality.
  - `have h : ..., this` — local auxiliary lemmas, especially in `norm_sq_diff_sum`.

- **Advanced reasoning**:
  - `classical` — used when invoking classical choice (e.g., in summability proofs).
  - `subst`, `cases`, `by_cases` — for case analysis on equality or membership.
  - `exact`, `refine`, `apply` — for direct proof steps.

---

#### **4. Proof Logic & Strategy**

- **Inductive/structural reasoning**:
  - Proofs often proceed by expanding definitions (`inner_sum`, `norm_sum`) and applying orthogonality (`hV`).
  - Use of `Finset.sum_ite_*` lemmas to isolate diagonal terms (`i = j`) and kill off-diagonal ones.

- **Pythagorean-style arguments**:
  - Many results (e.g., `norm_sum`, `norm_sq_diff_sum`) rely on reducing to sums over disjoint supports.
  - `disjoint_sdiff_sdiff`, `Finset.sum_union`, and `Finset.sum_sdiff` are key for partitioning sums.

- **Cauchy sequence arguments**:
  - In `summable_iff_norm_sq_summable`, the proof uses equivalence of Cauchy criterion and convergence in `ℝ`, with `√ε` to match squared norms.

- **Basis construction**:
  - `orthonormal_sigma_orthonormal` constructs orthonormal families over dependent sums (`Σ`), using orthonormality per fiber and orthogonality across fibers.

- **Independence**:
  - `independent` uses `iSupIndep_of_dfinsupp_lsum_injective`, reducing to kernel triviality via inner product with components.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.InnerProductSpace.Orthonormal` — foundational orthonormality theory.
  - `Mathlib.Algebra.DirectSum` — for `DirectSum`, `iSupIndep`, `IsInternal`.
  - `Mathlib.LinearAlgebra.BilinForm` — via `open LinearMap (BilinForm)`.

- **Key typeclass assumptions**:
  - `[RCLike 𝕜]`: base field (ℝ or ℂ).
  - `[SeminormedAddCommGroup E]`, `[InnerProductSpace 𝕜 E]`: ambient space structure.
  - `[NormedAddCommGroup E]`, `[CompleteSpace E]`: for convergence results.

- **Domain scope**:
  - Functional analysis / Hilbert space theory.
  - Focused on *submodule* and *direct sum* structures induced by orthogonal families.
  - Bridges linear algebra (orthonormal bases), topology (completeness, convergence), and category theory (direct sums, independence).

--- 

This module serves as a foundational toolkit for working with orthogonal decompositions in inner product spaces, especially in preparation for Hilbert space direct sums (`PiLp V 2`) and spectral theory.