### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSymmetric` | `def IsSymmetric (T : E →ₗ[𝕜] E) : Prop := ∀ x y, ⟪T x, y⟫ = ⟪x, T y⟫` | Defines symmetric (not necessarily bounded) linear operators on an inner product space. |
| `isSymmetric_iff_sesqForm` | `T.IsSymmetric ↔ LinearMap.IsSelfAdjoint ...` | Relates symmetry to self-adjointness w.r.t. the sesquilinear form induced by the inner product (real case). |
| `conj_inner_sym` | `hT : IsSymmetric T ⇒ conj ⟪T x, y⟫ = ⟪T y, x⟫` | Conjugate symmetry of the pairing under symmetric operators. |
| `apply_clm` | `hT : IsSymmetric (T : E →ₗ[𝕜] E) ⇒ ⟪T x, y⟫ = ⟪x, T y⟫` | Extends symmetry to continuous linear maps (coercion). |
| `zero`, `id`, `add`, `sub`, `smul`, `mul_of_commute`, `pow` | Various `IsSymmetric (...)` | Closure properties of symmetric operators under algebraic operations. |
| `restrict_invariant`, `restrictScalars` | `IsSymmetric (T.restrict ...)`, `IsSymmetric (T.restrictScalars ...)` | Symmetry is preserved under restriction to invariant submodules or scalar restriction. |
| `isSymmetric_iff_inner_map_self_real` (complex case) | `IsSymmetric T ↔ ∀ v, conj ⟪T v, v⟫ = ⟪T v, v⟫` | In complex inner product spaces, symmetry ⇔ quadratic form is real-valued. |
| `inner_map_polarization` | Formula expressing `⟪T x, y⟫` via diagonal terms `⟪T z, z⟫` | Polarization identity for symmetric operators (real/complex). |
| `continuous` (Hellinger–Toeplitz) | `[CompleteSpace E] ⇒ IsSymmetric T → Continuous T` | Any symmetric operator on a complete inner product space is automatically continuous. |
| `inner_map_self_eq_zero` | `(∀ x, ⟪T x, x⟫ = 0) ↔ T = 0` | Characterization of zero symmetric operator via vanishing quadratic form (real case). |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isSymmetric_`: for theorems about `IsSymmetric` (e.g., `isSymmetric_zero`, deprecated alias).
  - `conj_`, `apply_`, `restrict_`, `mul_of_`, `pow`, `inner_map_`, `reApplyInnerSelf`: descriptive of operations or properties.
- **Suffixes**:
  - `_apply`, `_self`, `_sym`, `_real`, `_complex`: indicate application, self-pairing, symmetry, or field type.
- **Notable patterns**:
  - `IsSymmetric.[property]`: e.g., `IsSymmetric.add`, `IsSymmetric.pow`.
  - `T.restrict hV`, `T.restrictScalars ℝ`: standard restriction notation.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`inner`, `add_apply`, `sub_apply`, `smul_apply`, etc.) |
| `simp` / `simp_rw` | Simplifying using `inner_zero_left`, `inner_zero_right`, `inner_conj_symm`, `hT x y`, etc. |
| `ring` | Algebraic simplification in scalar expressions (especially in polarization identities). |
| `aesop` | Automated proof search for closure properties (`[aesop safe apply]`, `[aesop 30% apply]`). |
| `norm_num`, `ring`, `linarith` | Numerical simplifications and linear reasoning. |
| `exact`, `refine`, `intro`, `cases` | Basic proof structure. |
| `tendsto_nhds_unique`, `Filter.Tendsto.inner` | Analysis-level reasoning in Hellinger–Toeplitz proof. |
| `rcases@I_mul_I_ax` | Case analysis on whether `I² = -1` or `I = 0` (in `RCLike`). |

---

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *definition-first* approach: unfold `IsSymmetric`, then apply inner product identities.
  - Closure properties (`add`, `sub`, `smul`, `mul_of_commute`, `pow`) use:
    - `rw [apply]` to expand operator actions,
    - `inner_*` lemmas to rearrange inner products,
    - `hT x y`, `hS x y` to substitute symmetry.
  - **Polarization identities** rely on:
    - Case analysis on `I² = -1` or `I = 0` (via `rcases@I_mul_I_ax`),
    - Expansion of `inner (T (x ± y)), x ± y⟫`, `inner (T (x ± I•y)), x ± I•y⟫`,
    - Simplification using symmetry and algebraic normalization (`ring`, `norm_num`).
  - **Hellinger–Toeplitz**:
    - Uses *closed graph theorem* (`continuous_of_seq_closed_graph`),
    - Shows graph is closed by verifying `⟪T(uₖ) - T x, y - T x⟫ → 0` via symmetry and convergence assumptions.
  - **Zero characterization**:
    - Uses polarization identity + assumption `⟪T x, x⟫ = 0` to deduce `T = 0`.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.InnerProductSpace.Subspace` | Subspace structure, inner product restrictions. |
| `Mathlib.Analysis.Normed.Operator.Banach` | Banach space tools, closed graph theorem, continuity criteria. |
| `Mathlib.LinearAlgebra.SesquilinearForm` | Sesquilinear forms, `IsSelfAdjoint`, `sesqFormOfInner`. |

**Key ambient assumptions**:
- `RCLike 𝕜`: base field is ℝ or ℂ (with complex conjugation).
- `[SeminormedAddCommGroup E]`, `[NormedAddCommGroup E]`: topological structure on `E`.
- `[InnerProductSpace 𝕜 E]`: inner product structure.

--- 

Let me know if you'd like a dependency graph or a formalization roadmap for extending this file.