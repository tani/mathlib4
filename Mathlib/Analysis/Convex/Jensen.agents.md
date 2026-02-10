Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConvexOn.map_centerMass_le` | `ConvexOn 𝕜 s f → (∀ i ∈ t, 0 ≤ w i) → 0 < ∑ w → (∀ i ∈ t, p i ∈ s) → f (centerMass w p) ≤ centerMass w (f ∘ p)` | Convex Jensen inequality in terms of `centerMass`. |
| `ConvexOn.map_sum_le` | `ConvexOn 𝕜 s f → (∀ i ∈ t, 0 ≤ w i) → ∑ w = 1 → (∀ i ∈ t, p i ∈ s) → f (∑ w • p) ≤ ∑ w • f (p)` | Convex Jensen inequality in terms of weighted sum (probabilistic weights). |
| `ConcaveOn.le_map_centerMass` | Dual of `map_centerMass_le` | Concave Jensen inequality (reversed inequality). |
| `ConcaveOn.le_map_sum` | Dual of `map_sum_le` | Concave Jensen inequality (reversed inequality). |
| `ConvexOn.map_add_sum_le` | Extension of `map_sum_le` for an extra distinguished point | Handles convex combinations with one distinguished point. |
| `StrictConvexOn.map_sum_lt` | `StrictConvexOn 𝕜 s f → (∀ i ∈ t, 0 < w i) → ∑ w = 1 → (∃ j k, p j ≠ p k) → f (∑ w • p) < ∑ w • f (p)` | Strict Jensen inequality for strictly convex functions. |
| `StrictConcaveOn.lt_map_sum` | Dual of `map_sum_lt` | Strict Jensen inequality for strictly concave functions. |
| `StrictConvexOn.eq_of_le_map_sum` | Equality case: if equality holds, all `p i` are equal | Used to derive equality cases. |
| `StrictConvexOn.map_sum_eq_iff` | `f (∑ w • p) = ∑ w • f (p) ↔ ∀ i ∈ t, p i = ∑ w • p` | Canonical equality case: equality iff all points equal to their weighted average. |
| `StrictConvexOn.map_sum_eq_iff'` | Same as above but for nonnegative weights: equality iff all *nonzero-weighted* points equal | Refinement for non-strict positivity. |
| `ConvexOn.exists_ge_of_mem_convexHull` | `x ∈ convexHull t → ∃ y ∈ t, f x ≤ f y` | Maximum principle: convex function attains max on convex hull at boundary. |
| `ConcaveOn.exists_le_of_mem_convexHull` | Dual of above | Minimum principle for concave functions. |
| `ConvexOn.le_max_of_mem_segment` | `z ∈ [x, y] → f z ≤ max (f x, f y)` | Maximum principle on a segment. |
| `ConvexOn.le_max_of_mem_Icc` | Same as above for intervals in `𝕜`. | Special case for real intervals. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `ConvexOn.` / `ConcaveOn.` / `StrictConvexOn.` / `StrictConcaveOn.` — indicate the function class.
  - `map_` — image under `f`.
  - `le_` / `lt_` — direction of inequality (≤ or <).
  - `exists_` — existence of extremal point.
  - `eq_of_` / `eq_iff` — equality cases.

- **Suffixes**:
  - `_le` / `_lt` — inequality direction.
  - `_iff` / `_iff'` — equivalence / refined equivalence.
  - `_centerMass` / `_sum` — formulation used (center of mass vs. sum).
  - `_of_mem_convexHull` / `_of_centerMass` / `_of_segment` / `_of_Icc` — domain context.

- **Duals**:
  - Concave versions often use `.dual` (e.g., `hf.dual.map_sum_lt`) to reduce to convex case via order dual (`βᵒᵈ`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify expressions, especially sums, `centerMass`, `smul`, `comp`. |
| `field_simp` | Simplify field expressions (e.g., `w j / (w j + w k)`). |
| `match_scalars` | Normalize scalar expressions (e.g., `c • (a • x) = (c * a) • x`). |
| `gcongr` | Apply monotonicity (e.g., `a < b → c • a < c • b` for `c > 0`). |
| `abel_nf` | Normalize abelian group expressions (e.g., sums of scalars/vectors). |
| `aesop` | Automated reasoning for basic arithmetic/inequalities. |
| `by_contra!` | Contradiction proofs (used in equality cases). |
| `convert` + `simp` | Prove equalities by converting to known terms. |
| `obtain` / `rcases` / `cases` | Extract witnesses (e.g., from `mem_convexHull`). |
| `rw [← ...]` | Rewrite using definitions (e.g., `convexHull_eq`, `segment_eq_Icc`). |

---

### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-step pattern**:
    1. Reduce to known inequality (e.g., `map_sum_le`) via `simp`/`convert`.
    2. Apply strict convexity/concavity to get strict inequality or equality condition.
  - **Equality cases** use contradiction: assume points differ → strict inequality contradicts equality assumption.
  - **Maximum principle** proofs:
    - Use representation of `x ∈ convexHull t` as `centerMass w p`.
    - Apply `exists_ge_of_centerMass` to get a point `p i` with `f(x) ≤ f(p i)`.
  - **Segment/interval cases** reduce to convex hull of two points (`convexHull {x, y}`).

- **Induction/Case Analysis**:
  - Rarely explicit induction; instead, case analysis on `t.eq_empty_or_nonempty`, `t.erase`, or `filter`.
  - Use of `insertNone`/`cons` to handle edge cases (e.g., 1 or 2 points).

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Convex.Combination` | Defines `centerMass`, `convexHull`, combinations. |
| `Mathlib.Analysis.Convex.Function` | Defines `ConvexOn`, `ConcaveOn`, `StrictConvexOn`, etc. |
| `Mathlib.Tactic.FieldSimp` | Simplifies field arithmetic (used in scalar normalization). |

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Convex analysis on ordered modules over linearly ordered fields.
- **Key abstractions**: `centerMass`, `convexHull`, epigraphs, dual order (`βᵒᵈ`).
- **Common proof patterns**:
  - Reduce concave case to convex via duality.
  - Use equality case lemmas to deduce constancy of points.
  - Reduce to finite convex combinations via `mem_convexHull`.
- **Critical lemmas for automation**:
  - `map_sum_le`, `map_sum_lt`, `map_sum_eq_iff`, `exists_ge_of_mem_convexHull`.
  - `le_max_of_mem_Icc`, `min_le_of_mem_Icc` for 1D cases.

Let me know if you'd like a dependency graph or tactic coverage analysis.