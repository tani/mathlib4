### Technical Metadata Brief: Convexity in Vector Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Convex 𝕜 s` | `Prop` | Set `s : Set E` is convex if every point lies in a star-convex neighborhood within `s`. |
| `stdSimplex 𝕜 ι` | `Set (ι → 𝕜)` | Standard simplex: functions `f : ι → 𝕜` with `∀ x, 0 ≤ f x` and `∑ f = 1`. |
| `Convex.starConvex` | `Convex 𝕜 s → x ∈ s → StarConvex 𝕜 x s` | From convexity to star-convexity at any point in `s`. |
| `convex_iff_segment_subset` | `Convex 𝕜 s ↔ ∀ x y ∈ s, [x -[𝕜] y] ⊆ s` | Equivalence between convexity and segment inclusion. |
| `convex_iff_pointwise_add_subset` | `Convex 𝕜 s ↔ ∀ a b ≥ 0, a + b = 1 → a • s + b • s ⊆ s` | Convexity via pointwise linear combinations. |
| `convex_empty`, `convex_univ` | `Convex 𝕜 ∅`, `Convex 𝕜 univ` | Trivial convex sets. |
| `Convex.inter`, `convex_sInter`, `convex_iInter` | `Convex s → Convex t → Convex (s ∩ t)` etc. | Closure under intersections. |
| `Convex.prod`, `convex_pi` | `Convex s → Convex t → Convex (s × t)` etc. | Closure under products. |
| `convex_segment` | `Convex 𝕜 [x -[𝕜] y]` | Segment between two points is convex. |
| `Convex.linear_image`, `Convex.linear_preimage` | `Convex s → Convex (f '' s)` / `Convex s → Convex (f ⁻¹' s)` | Convexity preserved under linear maps. |
| `Convex.affine_image`, `Convex.affine_preimage` | Same for affine maps. | Affine invariance of convexity. |
| `AffineSubspace.convex` | `AffineSubspace 𝕜 E → Convex 𝕜 Q` | Affine subspaces are convex. |
| `convex_Iic`, `convex_Ici`, `convex_Icc`, etc. | Convexity of intervals in ordered modules. | Real/ordered-space convexity examples. |
| `convex_halfSpace_le`, `convex_hyperplane` | Convexity of sublevel sets and hyperplanes. | Convexity of basic semialgebraic sets. |
| `convex_stdSimplex` | `Convex 𝕜 (stdSimplex 𝕜 ι)` | Standard simplex is convex. |
| `stdSimplexEquivIcc` | `stdSimplex 𝕜 (Fin 2) ≃ Icc 0 1` | 1D simplex ≅ unit interval. |
| `Submodule.convex` | `Submodule 𝕜 E → Convex 𝕜 K` | Submodules (subspaces) are convex. |
| `convex_iff_ordConnected` | `Convex 𝕜 s ↔ s.OrdConnected` (over linearly ordered fields) | Convexity ↔ order-connectedness in 1D. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `convex_`: properties of convex sets (`convex_empty`, `convex_singleton`, `convex_segment`, `convex_Iic`, etc.)
  - `Convex.`: methods on convex sets (`Convex.inter`, `Convex.linear_image`, `Convex.neg`, etc.)
  - `stdSimplex_`: properties of standard simplex (`stdSimplex_eq_inter`, `stdSimplex_unique`, `stdSimplex_fin_two`, etc.)
  - `starConvex_`: star-convexity-related lemmas (`starConvex_iff_segment_subset`, `starConvex_iff_openSegment_subset`, etc.)

- **Suffixes**:
  - `_iff_`: equivalence characterizations (`convex_iff_segment_subset`, `convex_iff_pointwise_add_subset`, `convex_iff_div`, etc.)
  - `_mem_`: membership criteria (`add_smul_mem`, `smul_mem_of_zero_mem`, `lineMap_mem`, etc.)
  - `_image`, `_preimage`: behavior under maps (`linear_image`, `affine_preimage`, etc.)
  - `_subset_`: subset relations (`segment_subset`, `openSegment_subset`, `segment_single_subset_stdSimplex`, etc.)

- **Special**:
  - `vadd`, `translate`, `affinity`: operations involving vector addition/scaling.
  - `halfSpace_`, `hyperplane`: geometric objects defined by linear functionals.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `intro` / `rintro` | Introduce hypotheses and decompose conjunctions/universals. |
| `rw` / `erw` | Rewrite using equivalences or definitional equalities. |
| `simp` / `simp_rw` | Simplify goals using lemmas and definitions (e.g., `simp only [Pi.smul_apply]`). |
| `match_scalars` | Normalize scalar expressions (e.g., `a • x + b • x = (a + b) • x`). |
| `noncomm_ring` | Prove equalities in noncommutative rings (e.g., scalar arithmetic). |
| `field_simp` | Simplify field expressions, especially divisions. |
| `linear_combination` | Prove inequalities or equalities by linear combination (with `norm := noncomm_ring`). |
| ` positivity` | Prove positivity of expressions (used in `convex_openSegment`). |
| `aesop` / `tauto` | Not heavily used here; proofs are mostly constructive and manual. |
| `exact`, `refine`, `apply` | Direct proof construction. |
| `cases` / `obtain` | Case analysis or existential extraction. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **definition → equivalence → closure property** pattern.
  - Prove equivalences first (e.g., `convex_iff_segment_subset`, `convex_iff_pointwise_add_subset`).
  - Then derive closure properties (intersections, products, images/preimages).
  - Use `starConvex` as the core primitive; many definitions reduce to it.

- **Common Proof Patterns**:
  - **Segment-based**: Show `[x -[𝕜] y] ⊆ s` using convex combination formulas.
  - **Pointwise**: Use `a • s + b • s ⊆ s` for `a + b = 1`, `a, b ≥ 0`.
  - **Linear/affine invariance**: Reduce to linear case via `IsLinearMap.mk'` or `AffineMap`.
  - **Ordered structures**: Use monotonicity, `smul_le_smul`, and `add_le_add`.
  - **Induction/finite sums**: For `stdSimplex`, use `Finset.sum_add_distrib`, `Finset.smul_sum`.

- **Special Cases**:
  - Subsingleton sets: Use `subsingleton_singleton.convex`.
  - Zero element: Use `smul_mem_of_zero_mem` or `add_smul_mem`.
  - Linearly ordered fields: Use `convex_iff_ordConnected` to reduce to order theory.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Order.BigOperators.Ring.Finset`: Finite sums, distributivity.
- `Mathlib.Algebra.Order.Module.OrderedSMul`: Ordered module structure.
- `Mathlib.Analysis.Convex.Star`: Star-convexity definitions.
- `Mathlib.LinearAlgebra.AffineSpace.AffineSubspace`: Affine geometry.
- `Mathlib.Tactic.FieldSimp`, `Mathlib.Tactic.NoncommRing`: Tactical support.

**Scope**:
- `Convex`, `Pointwise`, `SMul`, `LinearMap`, `Set` scopes opened.
- Variables: `𝕜` (semiring/field), `E`, `F` (modules), `β` (ordered module codomain).
- Assumes `OrderedSemiring`, `Module`, `OrderedSMul`, etc., depending on section.

---

### Summary

This file formalizes foundational convex geometry over modules over ordered semirings/fields. It defines convexity via star-convexity, provides multiple equivalent characterizations, proves closure under standard set-theoretic and algebraic operations, and applies this to intervals, half-spaces, simplices, and submodules. The formalization is highly structured, leveraging Lean’s typeclass system and tactic infrastructure for ordered algebra and finite sums.