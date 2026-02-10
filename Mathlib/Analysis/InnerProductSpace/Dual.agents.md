Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `toDualMap` | `E →ₗᵢ⋆[𝕜] NormedSpace.Dual 𝕜 E` | Conjugate-linear isometric embedding of `E` into its dual, mapping `x ↦ (y ↦ ⟪x, y⟫)`. |
| `toDualMap_apply` | `∀ x y, toDualMap 𝕜 E x y = ⟪x, y⟫` | Characterizes the action of `toDualMap`. |
| `nullSubmodule_le_ker_toDualMap_right` | `nullSubmodule ≤ ker (toDualMap x)` | Kernel of `⟪x, ⬝⟫` contains the null space. |
| `nullSubmodule_le_ker_toDualMap_left` | `nullSubmodule ≤ ker (toDualMap)` | Kernel of the map `x ↦ ⟪x, ⬝⟫` contains the null space. |
| `innerSL_norm` | `‖innerSL‖ = 1` | Norm of the canonical sesquilinear form is 1 (in nontrivial space). |
| `ext_inner_left_basis` / `ext_inner_right_basis` | `∀ i, ⟪b i, x⟫ = ⟪b i, y⟫ → x = y` | Uniqueness of vectors determined by inner products with a basis. |
| `toDual` | `E ≃ₗᵢ⋆[𝕜] NormedSpace.Dual 𝕜 E` | **Fréchet–Riesz representation**: for Hilbert spaces, `toDualMap` is a surjective conjugate-linear isometric equivalence. |
| `toDual_apply` | `toDual x y = ⟪x, y⟫` | Action of the equivalence `toDual`. |
| `toDual_symm_apply` | `⟪(toDual x)⁻¹ y, x⟫ = y x` | Inverse of `toDual` recovers the representing vector via inner product. |
| `continuousLinearMapOfBilin` | `E →L⋆[𝕜] E →L[𝕜] 𝕜 → E →L[𝕜] E` | Maps a bounded sesquilinear form `B` to the unique `f` such that `⟪f v, w⟫ = B v w`. |
| `continuousLinearMapOfBilin_apply` | `⟪B♯ v, w⟫ = B v w` | Characterization of `continuousLinearMapOfBilin`. |
| `unique_continuousLinearMapOfBilin` | Uniqueness of `f` satisfying `⟪f, w⟫ = B v w` | Ensures the representation is unique. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `toDual*`: Indicates constructions related to the Riesz representation map.
  - `nullSubmodule_*`: Pertains to the null space (radical) of the inner product.
  - `inner_*`: Relates to properties of the inner product (e.g., `innerSL`, `inner_eq_zero_*`).
  - `continuousLinearMapOfBilin` / `♯`: Operator for converting bilinear forms to linear operators.

- **Suffixes**:
  - `_apply`: Applies a definition to arguments (e.g., `toDualMap_apply`).
  - `_left` / `_right`: Indicates which argument of a binary operation is fixed (e.g., `ker_toDualMap_left`, `inner_smul_left`).
  - `_basis`: Used when a property is shown using a basis (e.g., `ext_inner_right_basis`).

- **Notation**:
  - `⟪x, y⟫`: Inner product.
  - `x†`: Star ring endomorphism (complex conjugation).
  - `B♯`: Short for `continuousLinearMapOfBilin B`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `conv_rhs => rw [...]` | Rewriting using definitions and symmetries (e.g., `inner_conj_symm`). |
| `simp` / `simp only [...]` | Simplification with lemmas like `toDual_apply`, `inner_smul_*`. |
| `field_simp` | Simplifying field expressions (e.g., division by nonzero inner products). |
| `exact`, `apply`, `refine` | Goal-directed proof construction. |
| `have`, `obtain` | Introducing intermediate lemmas or witnesses. |
| `ext` / `ContinuousLinearMap.ext` | Extensionality for functions/linear maps. |
| `linarith`, `ring`, `aesop` | Not explicitly visible here, but `field_simp` and `rw` dominate. |
| `by_cases`, `by_contra` | Case analysis (e.g., trivial vs nontrivial kernel). |

---

### **4. Proof Logic**

- **Structure of `toDual` proof**:
  1. **Case split** on whether the kernel of `ℓ ∈ E*` is the whole space (`ℓ = 0`) or not.
  2. If nontrivial, use orthogonal complement: pick `z ∈ (ker ℓ)ᗮ`, `z ≠ 0`.
  3. Construct candidate vector: `x = (ℓ z)† / ⟪z, z⟫ • z`.
  4. Show `ℓ = toDual x` by verifying equality on all `w ∈ E`, using:
     - Orthogonality: `⟪z, ℓ z • x - ℓ x • z⟫ = 0`
     - Algebraic manipulation of inner products and scalars.
     - Field simplification to cancel `⟪z, z⟫`.

- **General proof style**:
  - Heavy use of **inner product properties** (conjugate symmetry, linearity, positivity).
  - Exploitation of **completeness** (via orthogonal decomposition in Hilbert spaces).
  - Reliance on **module theory** (null submodule, orthogonal complement, basis extension).

---

### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.InnerProductSpace.Projection` | Projection theorems, orthogonal complements, Hilbert space geometry. |
| `Mathlib.Analysis.Normed.Module.Dual` | Dual space of normed modules, continuous linear functionals. |
| `Mathlib.Analysis.Normed.Group.NullSubmodule` | Null submodule (radical) of a seminormed module. |

**Key underlying theories**:
- **Inner product spaces** over `ℝ` or `ℂ` (`RCLike 𝕜`).
- **Normed and complete normed (Banach/Hilbert) spaces**.
- **Sesquilinear forms**, continuous linear maps, dual spaces.
- **Module theory over `RCLike` fields**, including star ring endomorphisms.

---

Let me know if you'd like a **diagrammatic summary** of the relationships between `toDualMap`, `toDual`, and `continuousLinearMapOfBilin`, or a **proof sketch generator** for this file.