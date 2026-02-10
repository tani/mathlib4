Here's a structured technical metadata extraction from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LinearMap.toSpanSingleton_homothety` | `∀ x c, ‖LinearMap.toSpanSingleton x c‖ = ‖x‖ * ‖c‖` | Computes the operator norm of the scalar multiplication map into the span of `x`. |
| `LinearEquiv.toSpanNonzeroSingleton_homothety` | `∀ x h c, ‖LinearEquiv.toSpanNonzeroSingleton x h c‖ = ‖x‖ * ‖c‖` | Extends the homothety norm formula to the linear equivalence version (for `x ≠ 0`). |
| `ContinuousLinearEquiv.toSpanNonzeroSingleton` | `x ≠ 0 ⇒ 𝕜 ≃L[𝕜] 𝕜 ∙ x` | Constructs a continuous linear equivalence between the base field and the span of a nonzero vector `x`. |
| `ContinuousLinearEquiv.coord` | `x ≠ 0 ⇒ (𝕜 ∙ x) →L[𝕜] 𝕜` | The continuous linear coordinate map (inverse of `toSpanNonzeroSingleton`). |
| `LinearIsometryEquiv.toSpanUnitSingleton` | `‖x‖ = 1 ⇒ 𝕜 ≃ₗᵢ[𝕜] 𝕜 ∙ x` | Constructs a linear isometry equivalence when `x` is a unit vector. |
| `toSpanUnitSingleton_apply` | `r ↦ ⟨r • x, ...⟩` | Explicit action of the isometry equivalence. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `toSpan*`: Indicates constructions involving the span of a singleton set (`𝕜 ∙ x`).
  - `coord`: Denotes coordinate functionals (dual-like maps extracting scalars from spans).
- **Suffixes**:
  - `*Singleton`: Used for constructions tied to a single vector.
  - `*Nonzero*`, `*Unit*`: Distinguish cases based on vector properties (`x ≠ 0` vs `‖x‖ = 1`).
- **Pattern**:
  - `toSpanNonzeroSingleton` / `toSpanUnitSingleton`: From field to span.
  - `coord`: From span to field (inverse direction).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting using definitions and lemmas (e.g., `norm_smul`, `hx`, `one_mul`).
- `aesop`: For automated solving of simple goals (e.g., proving `x ≠ 0` from `‖x‖ = 1`).
- `exact`: Supplying known lemmas (e.g., `norm_pos_iff.mpr h`).
- `rfl`: For definitional equalities (e.g., `symm_apply_apply`, `apply_symm_apply`).
- `intro`: In `norm_map'` proof to introduce arbitrary input.

---

### **4. Proof Logic**

- **Main proof strategy**:
  - Leverage existing `LinearMap.toSpanSingleton_homothety` and lift it to `LinearEquiv` and `ContinuousLinearEquiv` via `ofHomothety`.
  - For isometry case (`toSpanUnitSingleton`), reduce to the homothety norm formula and simplify using `‖x‖ = 1`.
- **Inductive/structural reasoning**:
  - No induction used; proofs rely on algebraic properties of norms, scalar multiplication, and module structure.
  - Key step: verifying the homothety condition (`norm_map'`) for `ofHomothety`, using the earlier homothety theorem.

---

### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.Analysis.Normed.Operator.LinearIsometry`
- `Mathlib.Analysis.Normed.Operator.ContinuousLinearMap`
- `Mathlib.Analysis.Normed.Module.Basic`
- `Mathlib.LinearAlgebra.Basis.VectorSpace`

**Domain scope**:
- Normed vector spaces over a normed division ring/field.
- Focus on 1-dimensional subspaces (spans of single vectors).
- Emphasis on continuity, linearity, and isometry preservation.

--- 

Let me know if you'd like a diagram of the relationships between these maps or a formalized summary in Lean style.