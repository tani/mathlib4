Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `ext_inner` | `{A B : E →WOT[𝕜] F} → (∀ x y, ⟪y, A x⟫ = ⟪y, B x⟫) → A = B` | Extensionality principle for weak operator topology (WOT) continuous linear maps: equality follows from agreement on all inner products. |
| `tendsto_iff_forall_inner_apply_tendsto` | `Tendsto f l (𝓝 A) ↔ ∀ x y, Tendsto (fun a ↦ ⟪y, (f a) x⟫) l (𝓝 ⟪y, A x⟫)` | Characterizes convergence in the WOT via convergence of all matrix coefficients (i.e., inner products with fixed vectors). Requires `CompleteSpace F`. |
| `le_nhds_iff_forall_inner_apply_le_nhds` | `l ≤ 𝓝 A ↔ ∀ x y, l.map (fun T ↦ ⟪y, T x⟫) ≤ 𝓝 (⟪y, A x⟫)` | Filter-based formulation of neighborhood containment in WOT, equivalent to convergence of all inner product evaluations. Also requires `CompleteSpace F`. |

> **Note**: `E →WOT[𝕜] F` denotes the space of continuous linear maps from `E` to `F` equipped with the **weak operator topology**, i.e., the coarsest topology making all maps `T ↦ ⟪y, T x⟫` continuous for `x ∈ E`, `y ∈ F`.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `ext_`: extensionality lemmas (`ext_inner`)
  - `tendsto_iff_...`: characterizations of convergence in terms of filters
  - `le_nhds_iff_...`: neighborhood filter inclusion criteria

- **Suffixes**:
  - `_inner`: indicates use of inner product structure (as opposed to general dual pairing)
  - `_apply`: refers to application of a functional (here, via Riesz representation)

- **Notation**:
  - `⟪y, x⟫_𝕜`: inner product in `F` (or `E`) over scalar field `𝕜`
  - `→WOT[𝕜]`: type synonym for continuous linear maps with WOT topology

---

### **3. Tactic Stack**

- `rw [ext_iff]`: used to expand extensionality definition
- `simp_rw [...]`: simplification + rewriting with equivalence lemmas
- `exact fun x => ...`: constructive extensionality proof
- `forall_congr'`, `Equiv.forall_congr`: quantifier manipulation with equivalences
- `Iff.rfl`: trivial equivalence introduction
- `.symm`: symmetry of logical equivalence (used to flip `↔`)

> The proofs rely heavily on `simp_rw` and `forall_congr'` to reduce WOT convergence to pointwise inner product convergence, leveraging the Riesz representation theorem implicitly via `InnerProductSpace.toDual_apply`.

---

### **4. Proof Logic**

- **Strategy**: Reduce topological notions (convergence, neighborhood filters) in the WOT to statements about scalar-valued functions via the Riesz representation.
- **Key steps**:
  1. Use `tendsto_iff_forall_dual_apply_tendsto` (a general fact about weak* topologies).
  2. Replace dual pairings `⟨f, x⟩` with inner products `⟪y, x⟫` using `InnerProductSpace.toDual_apply`.
  3. Apply congruence reasoning (`forall_congr`, `Equiv.forall_congr`) to preserve logical equivalence.
  4. For extensionality, apply `ext_inner_left` — a lemma stating that if all dual functionals agree on two vectors, the vectors are equal.

- **Assumptions**:
  - `CompleteSpace F` is required for the Riesz representation theorem to hold (ensuring `toDual` is surjective).
  - `RCLike 𝕜` ensures `𝕜` is either `ℝ` or `ℂ`, needed for inner product space structure.

---

### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.InnerProductSpace.Dual`: provides Riesz representation (`toDual`, `ofDual`, etc.)
  - `Mathlib.Analysis.LocallyConvex.WeakOperatorTopology`: defines the WOT in general locally convex settings

- **Scope**:
  - Focused on **Hilbert space-specific** properties of the WOT.
  - Uses `InnerProductSpace` and `RCLike` to exploit the inner product structure.
  - Targets `ContinuousLinearMap` with WOT topology (`→WOT`).

---

Let me know if you'd like a formalized summary in a specific format (e.g., for a domain model or AI agent training).