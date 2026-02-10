Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsMinOn.of_isLocalMinOn_of_convexOn_Icc` | `{f : ℝ → β} → {a b : ℝ} → a < b → IsLocalMinOn f (Icc a b) a → ConvexOn ℝ (Icc a b) f → IsMinOn f (Icc a b) a` | Shows that a local minimum of a convex function on a closed interval `Icc a b` is a global minimum on that interval. |
| `IsMinOn.of_isLocalMinOn_of_convexOn` | `{f : E → β} → {a : E} → a ∈ s → IsLocalMinOn f s a → ConvexOn ℝ s f → IsMinOn f s a` | Generalizes the above: a local minimum of a convex function on a convex set `s` is a global minimum on `s`. Uses `lineMap` to reduce to the 1D case. |
| `IsMaxOn.of_isLocalMaxOn_of_concaveOn` | `{f : E → β} → {a : E} → a ∈ s → IsLocalMaxOn f s a → ConcaveOn ℝ s f → IsMaxOn f s a` | Concave version of the previous theorem; uses duality via `βᵒᵈ` (opposite ordered module). |
| `IsMinOn.of_isLocalMin_of_convex_univ` | `{f : E → β} → IsLocalMin f a → ConvexOn ℝ univ f → ∀ x, f a ≤ f x` | Global version: local minimum of a convex function on the whole space is a global minimum. |
| `IsMaxOn.of_isLocalMax_of_convex_univ` | `{f : E → β} → IsLocalMax f a → ConcaveOn ℝ univ f → ∀ x, f x ≤ f a` | Global version for concave functions. |

> **Note**: All theorems rely on the fundamental property that convex functions cannot have “strict” local minima unless they are global — a key idea in convex analysis.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `of_isLocalMinOn_of_...`: Indicates a theorem that *derives* a global property (`IsMinOn`) from a local one (`IsLocalMinOn`) under a convexity assumption.
  - `convex_univ`: Denotes the special case where the domain is the entire space (`univ`).
- **Suffixes**:
  - `_Icc`: Refers to the 1D case on a closed interval `Icc a b`.
  - `_on`: Indicates restriction to a subset (`s`).
- **Helper variables**:
  - `a_in_s`, `h_localmin`, `h_conv`: Standard naming for hypotheses in Lean’s `mathlib` style.

---

### **3. Tactic Stack**

The proofs use a combination of:
- `intro`, `rcases`, `rw`, `dsimp`, `simp only`, `exact`, `refine`, `calc`
- `filter_mono`, `nhdsWithin_mono`, `Ioc_mem_nhdsGT`, `left_mem_Icc`, `right_mem_Icc`, `zero_le_one`
- `convex_Icc`, `segment_eq_image_lineMap`, `mapsTo'`, `comp_continuousOn`, `continuousOn`, `AffineMap.lineMap_apply_*`
- `smul_le_smul_iff_of_pos_left`, `add_smul`, `one_smul`, `le_of_add_le_add_left`

> **Dominant tactics**: `rw`, `rcases`, `refine`, `calc`, `simp only`, `filter_mono`.

---

### **4. Proof Logic**

- **Strategy**:
  1. **Reduction to 1D**: For the general case, define an affine line `g : ℝ →ᵃ[ℝ] E` from `a` to `x`, and compose `f` with `g`.
  2. **Transfer local extremum**: Show that the composition `f ∘ g` has a local minimum at `0` on `Icc 0 1`.
  3. **Apply 1D lemma**: Use `IsMinOn.of_isLocalMinOn_of_convexOn_Icc` to get global minimality on `Icc 0 1`.
  4. **Conclude**: Evaluate at `1` to get `f(a) ≤ f(x)`.

- **Induction / Cases**: Not used; instead, the proofs rely on:
  - **Affine geometry** (`lineMap`, `segment_eq_image_lineMap`)
  - **Filter-based local analysis** (`nhdsWithin`, `Ioi_subset_Ici_self`)
  - **Ordered module properties** (`smul_le_smul_iff_of_pos_left`, `ConcaveOn` via `βᵒᵈ`)

---

### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Function` | Core definitions: `ConvexOn`, `ConcaveOn`, convex sets/functions. |
| `Mathlib.Topology.Algebra.Affine` | Affine maps, `lineMap`, continuity, segment properties. |
| `Mathlib.Topology.Order.LocalExtr` | Local extrema (`IsLocalMinOn`, `IsLocalMaxOn`), neighborhoods, filters. |
| `Mathlib.Topology.MetricSpace.Pseudo.Lemmas` | Technical lemmas on neighborhoods, e.g., `Ioc_mem_nhdsGT`, `nhdsWithin_Icc_eq_nhdsGE`. |

> **Domain**: Convex analysis in topological vector spaces over `ℝ`, with values in an ordered module (e.g., `ℝ`, `ENNReal`, etc.).

---

Let me know if you'd like a diagram of the proof structure or a formalization of related results (e.g., strict convexity ⇒ uniqueness of minima).