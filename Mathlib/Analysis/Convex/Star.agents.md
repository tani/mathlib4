### Technical Brief: Star-Convex Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `StarConvex 𝕜 x s` | `Prop` | Defines that set `s` is *star-convex at point `x`* over scalar semiring `𝕜`: all convex combinations `a • x + b • y` (with `a,b ≥ 0`, `a + b = 1`, `y ∈ s`) lie in `s`. |
| `starConvex_iff_segment_subset` | `StarConvex 𝕜 x s ↔ ∀ y ∈ s, [x -[𝕜] y] ⊆ s` | Equivalence between standard definition and segment containment. |
| `starConvex_iff_pointwise_add_subset` | `StarConvex 𝕜 x s ↔ ∀ a,b ≥ 0, a + b = 1 → a • {x} + b • s ⊆ s` | Reformulation using pointwise set operations (`+`, `•`). |
| `starConvex_empty`, `starConvex_univ` | `StarConvex 𝕜 x ∅`, `StarConvex 𝕜 x univ` | Trivial examples: empty set and universal set are star-convex at any point. |
| `StarConvex.inter`, `StarConvex.union`, `starConvex_iInter`, `starConvex_iUnion`, `starConvex_sInter`, `starConvex_sUnion` | Closure under finite/infinitary intersections and unions | Shows stability under standard set-theoretic operations. |
| `StarConvex.prod`, `starConvex_pi` | Product and pi-type preservation | Extends star-convexity to product spaces. |
| `StarConvex.linear_image`, `StarConvex.linear_preimage` | Stability under linear maps | Image/preimage of star-convex sets under linear maps remain star-convex. |
| `StarConvex.add`, `StarConvex.add_left`, `StarConvex.add_right` | Stability under Minkowski sum and translations | Key for geometric constructions. |
| `StarConvex.smul`, `StarConvex.preimage_smul`, `StarConvex.affinity` | Stability under scalar multiplication and affine maps | Generalizes linear case. |
| `StarConvex.neg`, `StarConvex.sub` | Stability under negation and subtraction | Useful in additive group contexts. |
| `StarConvex.affine_image`, `StarConvex.affine_preimage` | Affine stability | Extends linear results to affine maps. |
| `starConvex_zero_iff` | `StarConvex 𝕜 0 s ↔ ∀ x ∈ s, 0 ≤ a ≤ 1 → a • x ∈ s` | Simplified characterization when center is `0`. |
| `StarConvex.add_smul_mem`, `StarConvex.smul_mem`, `StarConvex.add_smul_sub_mem` | Membership lemmas for combinations like `x + t • y` | Practical tools for verifying inclusion. |
| `starConvex_compl_Iic`, `starConvex_compl_Ici` | Complements of closed intervals are star-convex away from the endpoint | Nontrivial non-convex star-convex sets. |
| `starConvex_iff_div` | Alternative using division: `(a/(a+b)) • x + (b/(a+b)) • y ∈ s` | Useful over fields where division is available. |
| `Set.OrdConnected.starConvex` | Order-connected + comparability ⇒ star-convex | Connects order-theoretic and metric notions. |
| `starConvex_iff_ordConnected` | Over linearly ordered fields, star-convex ⇔ order-connected (when center ∈ set) | Deep link between convexity, order, and star-convexity. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `starConvex_`: for lemmas about `StarConvex` (e.g., `starConvex_empty`, `starConvex_iff_segment_subset`).
  - `StarConvex.`: for theorems stated as methods on a `StarConvex` hypothesis (e.g., `StarConvex.segment_subset`, `StarConvex.linear_image`).
- **Suffixes**:
  - `_iff_*`: characterizations (equivalences).
  - `_mem`: membership lemmas (e.g., `add_smul_mem`, `smul_mem`).
  - `_subset`: subset containment lemmas (e.g., `segment_subset`, `openSegment_subset`).
  - `_image`, `_preimage`: behavior under maps.
  - `_left`, `_right`: asymmetry in binary operations (e.g., `add_left`, `preimage_add_right`).
  - `sInter`, `iInter`, `sUnion`, `iUnion`: infinitary versions (`s` = set-of-sets, `i` = indexed family).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `rintro`, `obtain`, `rw`, `refine`, `convert`, `match_scalars`
- `simp`, `simp_rw`, `gcongr`, ` positivity`, ` linarith`
- `exact`, `assumption`, `apply`, `apply_fun`
- `rwa`, `rfl`, `symm`, `trans`
- `cases` (on equalities or inequalities)
- `aesop` (implicit in some proofs, though not explicitly named — likely used in `match_scalars` or `gcongr` contexts)
- `conv` (for scalar manipulations, e.g., `match_scalars` is a `conv`-based tactic)

> **Note**: The file heavily uses `gcongr` for monotonicity arguments in ordered structures, and `match_scalars` (from `Mathlib.Tactic.Module`) for simplifying scalar algebra.

---

#### **4. Proof Logic & Strategy**

- **Standard pattern**:  
  Prove equivalence (`↔`) by splitting into `→` and `←`, often using:
  - `starConvex_iff_segment_subset` to switch between algebraic and geometric definitions.
  - `segment_eq_uIcc` or `segment_eq_image'` to reduce segment containment to interval membership.
- **Induction**: Not used directly (star-convexity is defined pointwise, not inductively).
- **Case analysis**:
  - On `a = 0` or `b = 0` (e.g., in `starConvex_iff_forall_pos`).
  - On `x = y` (e.g., in `starConvex_iff_forall_ne_pos`).
  - On order comparisons (`x ≤ y ∨ y ≤ x`) in `OrdConnected.starConvex`.
- **Monotonicity**: `gcongr` is heavily used in ordered settings to propagate inequalities through scalar multiplication and addition.
- **Set-theoretic closure proofs**:
  - Use `intro y hy`, then case split on `hy : y ∈ s ∩ t` (→ `hy.left`, `hy.right`) or `hy : y ∈ s ∪ t` (→ `Or.inl`, `Or.inr`).
  - For infinitary ops, use `rw [mem_iInter]`, `rw [mem_iUnion]`, then apply hypothesis per index.
- **Map-based proofs**:
  - For images: `intro y ⟨y', hy', rfl⟩`, then construct preimage witness.
  - For preimages: `intro y hy`, apply hypothesis to `f y`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Module.LinearMap.Prod` | Product of linear maps, used in `StarConvex.prod` and `StarConvex.pi`. |
| `Mathlib.Algebra.Order.Module.Synonym` | Ordered module infrastructure (`OrderedSMul`, etc.). |
| `Mathlib.Algebra.Order.Group.Instances` | Ordered additive groups, intervals (`Iic`, `Ici`), etc. |
| `Mathlib.Analysis.Convex.Segment` | Segment definitions (`segment`, `openSegment`, `uIcc`), key for geometric reformulations. |
| `Mathlib.Tactic.GCongr` | For monotonicity proofs (`gcongr`). |
| `Mathlib.Tactic.Module` | Tactics for module/linear algebra (`match_scalars`, `smul_mem`, etc.). |

**Domain**:  
- **Algebraic**: Ordered semirings/rings/fields, modules, additive groups.  
- **Order-theoretic**: Ordered modules, order-connected sets, intervals.  
- **Geometric**: Convexity, segments, star-convexity, affine/linear images/preimages.  
- **Topological hints**: Mention of closure, contractibility, diffeomorphism (in `TODO`), though not formalized here.

---

### Summary

This file formalizes **star-convexity** — a weakening of convexity where all segments from a fixed point `x` to points in `s` lie in `s`. It establishes foundational properties (closure under set ops, linear/affine maps, products), provides multiple equivalent definitions (segment-based, pointwise, division-based), and connects to order theory (`OrdConnected`). The formalization is highly modular, leveraging Lean’s typeclass infrastructure (`OrderedSemiring`, `Module`, `OrderedSMul`) and tactic support for ordered algebra.