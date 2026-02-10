### Technical Brief: Carathéodory’s Convexity Theorem in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mem_convexHull_erase` | `{t : Finset E} → ¬AffineIndependent 𝕜 ((↑) : t → E) → x ∈ convexHull 𝕜 (↑t) → ∃ y ∈ t, x ∈ convexHull 𝕜 (↑(t.erase y))` | If `x` lies in the convex hull of a *non*-affine-independent finite set `t`, then `x` already lies in the convex hull of a *strict subset* of `t`. Core step in minimizing support. |
| `minCardFinsetOfMemConvexHull` | `x ∈ convexHull 𝕜 s → Finset E` | Selects a finite subset of `s` of *minimal cardinality* whose convex hull contains `x`. Defined via `argminOn` using well-founded relation on `ℕ`. |
| `affineIndependent_minCardFinsetOfMemConvexHull` | `AffineIndependent 𝕜 ((↑) : minCardFinsetOfMemConvexHull hx → E)` | Proves the minimal-support subset is *affine-independent*. Key consequence of minimality + `mem_convexHull_erase`. |
| `convexHull_eq_union` | `convexHull 𝕜 s = ⋃ (t : Finset E) (_ : ↑t ⊆ s) (_ : AffineIndependent 𝕜 ((↑) : t → E)), convexHull 𝕜 ↑t` | **Carathéodory’s convexity theorem**: convex hull equals union of convex hulls over all *affine-independent* finite subsets of `s`. |
| `eq_pos_convex_span_of_mem_convexHull` | `x ∈ convexHull 𝕜 s → ∃ ι, z : ι → E, w : ι → 𝕜, ...` | Explicit barycentric-coordinate version: any `x` in convex hull has a representation as a *strictly positive* convex combination of an *affine-independent* family lying in `s`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `minCardFinsetOfMemConvexHull`: encodes *definition* (minimizing cardinality under membership condition).
  - `mem_`, `subset`, `nonempty`, `card_le_card`: standard properties of constructed object.
  - `affineIndependent_`: asserts structural property of the minimal set.
- **Suffixes**:
  - `_of_mem`, `_of_sum_1`, `_of_ne`: indicate conditions or constraints used in definition/proof.
- **Variables**:
  - `t`, `s`: finite sets / arbitrary sets.
  - `x`, `y`: points in `E`.
  - `f`, `g`, `w`, `k`: coefficient functions (often sums to 1, positive).
  - `i₀`, `i`, `e`: indices/elements.

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Role |
|--------|-----------------|------|
| `simp only` | Very High | Simplifies goals using definitional lemmas (e.g., `convexHull_eq`, `centerMass_eq`, `sum_sub_distrib`). |
| `field_simp` | Medium | Eliminates divisions (e.g., `f i₀ / g i₀`) using nonzero assumptions. |
| `conv_rhs => rw [...]` | Medium | Rewrites only the right-hand side of an equation (e.g., inserting/erasing elements). |
| `convert` | Medium | Matches goal to known theorem up to definitional equality. |
| `by_cases`, `by_contra` | Medium | Case analysis / contradiction for negated hypotheses. |
| `exact`, `apply`, `rw` | High | Basic proof steps for applying lemmas and rewriting. |
| `calc` | Medium | Chain of equalities (especially in `ksum` proof). |
| `iterate` | Low | Used once in `convexHull_eq_union` to apply `Set.iUnion_subset`. |

---

#### **4. Proof Logic**

- **Structure of `mem_convexHull_erase`**:
  1. Unfold convex hull: get coefficient function `f : t → 𝕜_{>0}` with `∑ f = 1`.
  2. Use lack of affine independence to get nontrivial relation `g` with `∑ g = 0`, some `g i > 0`.
  3. Define `s = {z ∈ t | g z > 0}`, pick `i₀ ∈ s` minimizing `f i / g i`.
  4. Define new coefficients `k = f - (f i₀ / g i₀) · g`, which vanish at `i₀`, stay nonnegative, and sum to 1.
  5. Conclude `x` lies in convex hull of `t \ {i₀}`.

- **Structure of `affineIndependent_minCardFinsetOfMemConvexHull`**:
  1. Assume minimal `t` is *not* affine-independent.
  2. Apply `mem_convexHull_erase` to get smaller `t' ⊂ t` still containing `x`.
  3. Contradict minimality: `#t' < #t` yet `t'` satisfies the defining conditions.

- **Structure of `convexHull_eq_union`**:
  - **⊆**: For `x ∈ convexHull s`, take `t = minCardFinsetOfMemConvexHull hx`, use `affineIndependent_` and `mem_`.
  - **⊇**: Each `convexHull ↑t` ⊆ `convexHull s` (since `↑t ⊆ s`), so union ⊆ convex hull.

- **Structure of `eq_pos_convex_span_of_mem_convexHull`**:
  1. From `convexHull_eq_union`, get `t` affine-independent with `x ∈ convexHull ↑t`.
  2. Unfold convex hull: get `w : t → 𝕜_{>0}` with `∑ w = 1`, `∑ w • z = x`.
  3. Restrict to support `t' = {i ∈ t | w i ≠ 0}` (strictly positive).
  4. Show `t'` remains affine-independent (via `AffineIndependent.comp_embedding`).
  5. Verify all required properties on `t'`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Combination` | Defines convex combinations, `convexHull`, `centerMass`, positivity conditions. |
| `Mathlib.LinearAlgebra.AffineSpace.Independent` | Defines `AffineIndependent`, relations to affine span, barycentric coordinates. |
| `Mathlib.Tactic.FieldSimp` | Simplifies field expressions (especially divisions with nonzero denominators). |

**Domain**: Convex geometry over linearly ordered fields (`𝕜`), in modules (`E`) — i.e., real/ordered-vector-space setting.  
**Notable features**: Use of finite subsets, well-founded minimization, and constructive extraction of minimal support.

--- 

This formalization exemplifies *Lean-style geometric reasoning*: combining minimality arguments, affine independence, and barycentric coordinates to refine classical theorems into usable constructive data.