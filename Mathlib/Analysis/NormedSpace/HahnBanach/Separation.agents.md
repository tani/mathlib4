### Technical Metadata Brief: Separation Hahn-Banach Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `separate_convex_open_set` | `∀ s, 0 ∈ s → Convex ℝ s → IsOpen s → x₀ ∉ s → ∃ f : E →L[ℝ] ℝ, f x₀ = 1 ∧ ∀ x ∈ s, f x < 1` | Core separation lemma: separates a point from an open convex neighborhood of 0. |
| `geometric_hahn_banach_open` | `Convex ℝ s → IsOpen s → Convex ℝ t → Disjoint s t → ∃ f, u, (∀ a ∈ s, f a < u) ∧ ∀ b ∈ t, u ≤ f b` | Weak separation of two disjoint convex sets, one open. |
| `geometric_hahn_banach_open_point` | `Convex ℝ s → IsOpen s → x ∉ s → ∃ f, ∀ a ∈ s, f a < f x` | Weak separation of point and open convex set. |
| `geometric_hahn_banach_point_open` | `Convex ℝ t → IsOpen t → x ∉ t → ∃ f, ∀ b ∈ t, f x < f b` | Weak separation of open convex set and point (dual version). |
| `geometric_hahn_banach_open_open` | `Convex ℝ s → IsOpen s → Convex ℝ t → IsOpen t → Disjoint s t → ∃ f, u, (∀ a ∈ s, f a < u) ∧ ∀ b ∈ t, u < f b` | Semistrict separation: strict inequality on both sides for disjoint open convex sets. |
| `geometric_hahn_banach_compact_closed` | `Convex ℝ s → IsCompact s → Convex ℝ t → IsClosed t → Disjoint s t → ∃ f, u, v, (∀ a ∈ s, f a < u) ∧ u < v ∧ ∀ b ∈ t, v < f b` | Strict separation of compact convex and closed convex disjoint sets. |
| `geometric_hahn_banach_closed_compact` | Dual of above (swap compact/closed). | |
| `geometric_hahn_banach_point_closed` | `Convex ℝ t → IsClosed t → x ∉ t → ∃ f, u, f x < u ∧ ∀ b ∈ t, u < f b` | Strict separation of point and closed convex set. |
| `geometric_hahn_banach_closed_point` | `Convex ℝ s → IsClosed s → x ∉ s → ∃ f, u, (∀ a ∈ s, f a < u) ∧ u < f x` | Strict separation of closed convex set and point. |
| `geometric_hahn_banach_point_point` | `x ≠ y → ∃ f, f x < f y` | Separates two distinct points (uses `T1Space`). |
| `iInter_halfSpaces_eq` | `Convex ℝ s → IsClosed s → ⋂ l, {x | ∃ y ∈ s, l x ≤ l y} = s` | Closed convex sets are intersections of supporting half-spaces. |
| `extendTo𝕜'ₗ` | `(E →L[ℝ] ℝ) →ₗ[ℝ] (E →L[𝕜] 𝕜)` | Extension of real-linear continuous functionals to complex/SC-algebra-valued ones. |
| `re_extendTo𝕜'ₗ` | `re ((extendTo𝕜'ₗ g) x) = g x` | Real part recovers original real-linear functional. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `geometric_hahn_banach_*`: All main separation theorems.
  - `separate_convex_*`: Core lemmas for separating a point from a convex set.
  - `iInter_halfSpaces_eq`: Set-theoretic characterization.

- **Suffixes**:
  - `_open`, `_point`, `_closed`, `_compact`: Indicate assumptions on the sets involved.
  - `_open_open`, `_compact_closed`, `_point_point`: Combinations of assumptions.
  - `_point_closed` vs `_closed_point`: Order matters (point vs set, or set vs point).

- **Other patterns**:
  - `isCompact`, `IsClosed`, `IsOpen`, `Convex ℝ`: Explicit typeclass assumptions.
  - `disj : Disjoint s t`, `disj : x ∉ s`: Standard naming for disjointness/non-membership.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `obtain ⟨...⟩` / `rcases` | Extracting witnesses from existential quantifiers (e.g., from `separate_convex_open_set`). |
| `simp_rw`, `simp only`, `simp` | Simplifying goals using lemmas like `map_add`, `map_neg`, `mem_singleton`, `vadd_eq_add`. |
| `linarith` | Solving linear inequalities (ubiquitous in separation arguments). |
| `rw [← ...]` | Rewriting using equalities like `hf₁ : f x₀ = 1`. |
| `exact`, `refine`, `apply` | Constructing proofs stepwise (e.g., `refine ⟨f, ...⟩`). |
| `intro`, `intro h`, `rintro rfl` | Introducing hypotheses and destructing equalities. |
| `norm_num`, `norm_num at *` | Simplifying numeric goals (e.g., `0 < 1`, `-1 < 0`). |
| `ext` | Extensionality for functions/linear maps. |
| `fun_prop` | Proving continuity of function constructions (e.g., in `extendTo𝕜'ₗ`). |
| `ring`, `field_simp`, `ring_nf` | Algebraic simplifications (especially in `extendTo𝕜'ₗ` proofs). |
| `interior_maximal`, `interior_Iic`, `interior_Ici` | Used in proving strict separation via interior containment. |
| `csInf_le`, `image_subset_iff`, `forall_mem_image` | Handling infima and image-based quantifiers. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Step 1**: Reduce to `separate_convex_open_set` by translating sets (e.g., `C := x₀ +ᵥ (s - t)`).
  - **Step 2**: Apply `separate_convex_open_set` to get a functional `f` with `f(x₀) = 1` and `f < 1` on `C`.
  - **Step 3**: Translate back to bounds on `s` and `t` using algebraic identities (`f(b₀) = f(a₀) + 1`, etc.).
  - **Step 4**: Derive separation constants (`u = sInf(f '' t)`, etc.) and verify inequalities via continuity, openness/compactness, and convexity.

- **Induction/Case Analysis**:
  - `eq_empty_or_nonempty` used repeatedly to handle empty sets.
  - `le_or_lt` used in `separate_convex_open_set` proof for sign analysis in gauge.

- **Key Logical Flow**:
  - **Weak separation** (`open` + `convex`): Use `separate_convex_open_set` + infimum argument.
  - **Semistrict separation** (`open` + `open`): Strengthen using `isOpenMap` to get strict inequality on both sides.
  - **Strict separation** (`compact` + `closed`): Use local convexity + finite subcover (via `exists_open_convexes`) + extreme value theorem (`isMaxOn`).
  - **Point separation**: Reduce to singleton cases and apply strict separation.

- **Extension to `𝕜`-linear maps**:
  - Use `extendTo𝕜'ₗ` and `re_extendTo𝕜'ₗ` to lift real results to complex/SC-algebra setting.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Cone.Extension` | Convex cone extension tools (used in `gauge` theory). |
| `Mathlib.Analysis.Convex.Gauge` | Gauge function definitions and properties (key for `separate_convex_open_set`). |
| `Mathlib.Topology.Algebra.Module.FiniteDimension` | Finite-dimensional module topology (not directly used here, but part of broader context). |
| `Mathlib.Topology.Algebra.Module.LocallyConvex` | Locally convex spaces (required for `geometric_hahn_banach_compact_closed`). |
| `Mathlib.Topology.Algebra.MulAction` | For `vadd`, `sub`, and set translations. |
| `Mathlib.Analysis.RCLike.Basic` | `RCLike` typeclass (complex, quaternions, etc., over `ℝ`). |
| `Mathlib.Analysis.NormedSpace.Extend` | Linear map extension tools (used in `extendTo𝕜'ₗ`). |

**Domain**: Functional analysis in topological vector spaces, especially over `ℝ` and `𝕜` (`ℂ`, `ℍ`, etc.).  
**Focus**: Geometric Hahn-Banach theorems — separation of convex sets via continuous linear functionals.

--- 

Let me know if you'd like a dependency graph or a tactic trace for a specific theorem.