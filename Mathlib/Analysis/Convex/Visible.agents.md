Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsVisible` | `IsVisible (s : Set P) (x y : P) : Prop` | Defines visibility: `x` sees `y` through `s` iff no point of `s` lies *strictly between* `x` and `y`. |
| `IsVisible.rfl` | `IsVisible 𝕜 s x x` | Reflexivity: every point sees itself. |
| `isVisible_comm` | `IsVisible 𝕜 s x y ↔ IsVisible 𝕜 s y x` | Symmetry of visibility. |
| `IsVisible.mono` | `s ⊆ t → IsVisible 𝕜 t x y → IsVisible 𝕜 s x y` | Monotonicity: if `x` sees `y` through a larger set, it does so through any subset. |
| `isVisible_iff_lineMap` | `x ≠ y → (IsVisible 𝕜 s x y ↔ ∀ δ ∈ (0,1), lineMap x y δ ∉ s)` | Characterizes visibility via line segments: no point of `s` lies on the open segment between `x` and `y`. |
| `IsVisible.of_convexHull_of_pos` | Hypotheses include convex combination, positivity of weight, and visibility through `convexHull s` | If `x` sees a convex combination through `convexHull s`, and the weight is positive, then `x` sees the corresponding term. |
| `IsVisible.eq_of_mem_interior` | `IsVisible 𝕜 s x y → y ∈ interior s → x = y` | A point cannot see an interior point of `s` unless it coincides with it. |
| `IsOpen.eq_of_isVisible_of_left_mem` | `IsOpen s → IsVisible 𝕜 s x y → y ∈ s → x = y` | A point in an open set cannot be seen from a distinct point. |
| `IsVisible.mem_convexHull_isVisible` | `x ∉ convexHull s → y ∈ convexHull s → IsVisible (convexHull s) x y → y ∈ convexHull {z ∈ s | IsVisible (convexHull s) x z}` | Points of `convexHull s` visible from `x` lie in the convex hull of visible points *in* `s`. |
| `IsClosed.exists_wbtw_isVisible` | `IsClosed s → y ∈ s → ∃ z ∈ s, Wbtw x z y ∧ IsVisible s x z` | For closed `s`, any point `y ∈ s` has a "first" visible point `z` on the segment from `x` to `y`. |
| `IsClosed.convexHull_subset_affineSpan_isVisible` | `IsClosed (convexHull s) → x ∉ convexHull s → convexHull s ⊆ affineSpan ({x} ∪ {y ∈ s | IsVisible (convexHull s) x y})` | Closed convex hull lies in the affine span of `x` and visible points of `s`. |
| `rank_le_card_isVisible` | `IsClosed (convexHull s) → x ∉ convexHull s → Module.rank ℝ (span (-x +ᵥ s)) ≤ #{y ∈ s | IsVisible (convexHull s) x y}` | Main quantitative result: a point outside a closed convex hull sees at least `dim(convexHull s)` points of `s`. |

---

### **2. Naming Conventions**

- **Predicates & relations**:
  - `IsVisible`: main predicate; prefix `is_` is *not* used (uncommon in Mathlib for binary relations).
  - `isVisible_comm`, `isVisible_iff_lineMap`: use `isVisible_` (lowercase `i`) for lemmas about `IsVisible`.
- **Properties & implications**:
  - `rfl`, `symm`, `mono`: standard Mathlib suffixes for reflexivity, symmetry, monotonicity.
  - `of_convexHull_of_pos`: encodes logical flow: *if* convex hull + positive weight *then* visibility of component.
- **Quantitative results**:
  - `rank_le_card_isVisible`: uses `rank_le_card_...` pattern for dimension ≤ cardinality bounds.
- **Topological conditions**:
  - `eq_of_mem_interior`, `eq_of_isVisible_of_left_mem`: encodes *if* point in interior/left in open set *then* equality.
- **Set operations**:
  - `mem_convexHull_isVisible`: `mem_..._isVisible` pattern for membership in convex hull of visible points.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop` | Automated reasoning for basic logic, set membership, inequalities. |
| `simp` / `simp_rw` | Simplification, especially with `lineMap`, `Sbtw`, `Wbtw`, and set operations. |
| `field_simp`, `ring`, `match_scalars` | Algebraic manipulation of real/field expressions, especially in convex combinations. |
| `gcongr` | Congruence for inequalities (e.g., monotonicity of addition/multiplication). |
| `filter_upwards` | Filter-based reasoning (e.g., neighborhoods, eventually). |
| `csInf_le`, `csInf_mem` | Properties of infimum in `ℝ`. |
| `rw [← ...]`, `convert`, `refine` | Goal rewriting and partial proof construction. |
| `linarith`, ` positivity` | Linear arithmetic and positivity checks. |
| `push_cast`, `rank_span_le`, `Submodule.rank_mono` | Module/rank-specific lemmas. |

---

### **4. Proof Logic**

- **Structure of key proofs**:
  - **Visibility ↔ line segment disjoint from `s`**: via `sbtw_iff_mem_image_Ioo_and_ne`.
  - **Convex combination visibility**: uses decomposition of convex combinations, positivity of weights, and continuity of `lineMap`.
  - **Interior/open set visibility**: contradiction via neighborhoods and continuity of `lineMap`.
  - **Closed set first visible point**: constructs `t = {δ ≥ 0 | lineMap x y δ ∈ s}`, takes infimum, uses closedness to ensure attainment.
  - **Dimension bound (`rank_le_card_isVisible`)**:
    1. Use `convexHull_subset_affineSpan_isVisible` to embed convex hull in affine span.
    2. Translate via `(-x +ᵥ ·)` to pass to vector space.
    3. Use `span` monotonicity and `rank_span_le`.
    4. Use cardinality invariance under translation.

- **Induction/Case analysis**: Not prominent; proofs rely on:
  - Convex geometry lemmas (`convex_convexHull`, `mem_convexHull_iff_exists_fintype`)
  - Topological properties (closedness, interior, continuity)
  - Order-theoretic arguments in `ℝ` (infima, intervals)

---

### **5. Imports & Scope**

**Core dependencies**:
- `Mathlib.Algebra.Group.Pointwise.Set.Card`: cardinal arithmetic for sets, translations.
- `Mathlib.Analysis.Convex.*`: convex combinations, convex hulls, line maps.
- `Mathlib.Topology.Algebra.Affine`: affine maps, `lineMap`, `Sbtw`, `Wbtw`.
- `Mathlib.Topology.MetricSpace.Pseudo.Lemmas`: topology of metric/pseudo-metric spaces (used for continuity).
- `Mathlib.Topology.Order.Monotone`: order topology, monotone functions.

**Mathematical domain**:
- Affine spaces over linearly ordered fields (`𝕜`), especially `ℝ`.
- Convex geometry in topological vector spaces.
- Cardinality bounds tied to module rank.

**Intended application**:
- Art gallery problem formalization (see TODO): `∀ a ∈ A, ∃ g ∈ G, IsVisible ℝ (sᶜ) a g`.

---

Let me know if you'd like a diagram of dependencies or a formalization roadmap for the art gallery problem.