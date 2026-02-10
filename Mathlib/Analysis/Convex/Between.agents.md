Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on formal metadata relevant for building a domain-specific AI agent in the Lean/proof assistant ecosystem:

---

### 📌 **Technical Brief: Betweenness in Affine Spaces (Lean 4)**

#### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `affineSegment R x y` | `Set P` | Set of points *weakly between* `x` and `y`, defined as `lineMap x y '' Set.Icc 0 1`. |
| `Wbtw R x y z` | `Prop` | `y` is *weakly between* `x` and `z`: `y ∈ affineSegment R x y`. |
| `Sbtw R x y z` | `Prop` | `y` is *strictly between* `x` and `z`: `Wbtw R x y z ∧ y ≠ x ∧ y ≠ z`. |
| `affineSegment_eq_segment` | `affineSegment R x y = segment R x y` | Equivalence with `segment` when points are in a vector space. |
| `affineSegment_comm` | `affineSegment R x y = affineSegment R y x` | Symmetry of segment. |
| `wbtw_comm` | `Wbtw R x y z ↔ Wbtw R z y x` | Symmetry of weak betweenness. |
| `sbtw_comm` | `Sbtw R x y z ↔ Sbtw R z y x` | Symmetry of strict betweenness. |
| `wbtw_lineMap_iff` | `Wbtw R x (lineMap x y r) y ↔ x = y ∨ r ∈ [0,1]` | Characterization of betweenness for points on a line map. |
| `sbtw_lineMap_iff` | `Sbtw R x (lineMap x y r) y ↔ x ≠ y ∧ r ∈ (0,1)` | Strict version of above. |
| `Wbtw.trans_left`, `Wbtw.trans_right` | Transitivity of weak betweenness. |
| `Sbtw.trans_left`, `Sbtw.trans_right` | Transitivity of strict betweenness (under `NoZeroSMulDivisors`). |
| `sbtw_iff_mem_image_Ioo_and_ne` | `Sbtw R x y z ↔ y ∈ lineMap x z '' Ioo 0 1 ∧ x ≠ z` | Strict betweenness iff interior of segment + distinct endpoints. |
| `wbtw_swap_left_iff`, `wbtw_swap_right_iff`, `wbtw_rotate_iff` | Characterizations of when swapping arguments preserves betweenness (implies equality). |
| `sbtw_of_sbtw_of_sbtw_of_mem_affineSpan_pair` | Triangle interior point lemma (Ceva-like). | Used in convex geometry / affine combinations. |

---

#### 🧠 **Naming Conventions**

- **Prefixes**:
  - `affineSegment_`: for segment-related lemmas.
  - `wbtw_`, `sbtw_`: for weak/strict betweenness lemmas.
  - `mem_`, `image_`, `const_vadd_`, `vadd_const_`, `const_vsub_`, `vsub_const_`: for action-based transformations.
- **Suffixes**:
  - `_iff`: biconditional characterizations.
  - `_map_iff`: behavior under affine maps/equivalences.
  - `_left`, `_right`, `_swap`, `_rotate`: positional reasoning.
  - `_ne`, `_self`: edge cases (equality or inequality).
- **Pattern**:
  - `wbtw_*_iff` and `sbtw_*_iff` are used for *characterizations*.
  - `*_image` lemmas describe how affine maps or translations act on segments.

---

#### ⚙️ **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp_rw`, `simp`: rewriting and simplification (especially with `affineSegment`, `lineMap`, `vsub`, `vadd`).
- `rcases`, `obtain`, `cases'`: destructuring existential or conjunction hypotheses.
- `exact`, `apply`, `refine`: proof construction (note: `apply` is preferred over `exact`/`refine` for speed).
- `intro`, `intro h`, `rintro ⟨…⟩`: hypothesis introduction.
- `by_cases`, `by_contra`, `exfalso`: case analysis and contradiction.
- `ring`, `linarith`, `omega`: arithmetic reasoning (especially in `LinearOrderedRing`/`Field` sections).
- `field_simp`, `simp_rw […]`: field simplification and rewriting.
- `set_ext`, `ext`, `funext`: extensionality for sets/functions.

---

#### 🧩 **Proof Logic & Strategy**

- **Inductive/constructive reasoning** on the parameter `t ∈ [0,1]` (or `t ∈ (0,1)` for strict).
- **Case analysis** on `t = 0`, `t = 1`, or `t ∈ (0,1)` (via `Set.eq_endpoints_or_mem_Ioo_of_mem_Icc`).
- **Equational reasoning** with `lineMap`, `vadd`, `vsub`, and `smul`.
- **Affine equivalence invariance**: many lemmas reduce to invariance under affine maps or translations.
- **Use of injectivity**: e.g., `AddAction.injective v`, `vadd_right_injective`, `vsub_left_injective`.
- **Cancellation lemmas** (e.g., `vsub_eq_zero_iff_eq`, `smul_eq_zero`) to reduce to scalar equations.
- **Order-theoretic reasoning** (especially in `LinearOrderedRing`/`Field`): use of `le_of_lt`, `lt_of_le_of_lt`, `inv_le_one`, etc.

---

#### 📦 **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.CharP.Invertible` | For invertibility assumptions (e.g., `NoZeroSMulDivisors`). |
| `Mathlib.Algebra.Order.Interval.Set.Group` | Interval arithmetic and order-theoretic set operations. |
| `Mathlib.Analysis.Convex.Basic`, `segment` | Convexity and segment definitions. |
| `Mathlib.Analysis.Convex.Segment` | Segment-related lemmas. |
| `Mathlib.LinearAlgebra.AffineSpace.FiniteDimensional` | Affine combinations, affine span, independence. |
| `Mathlib.Tactic.FieldSimp` | Field simplification (used in `LinearOrderedField` section). |

---

#### 📌 **Domain-Specific Notes**

- **Core idea**: Betweenness is defined *via* affine combinations (`lineMap`) and intervals in the base ring.
- **Key assumptions**:
  - `OrderedRing`, `StrictOrderedCommRing`, `LinearOrderedRing`, `LinearOrderedField` — for order-theoretic behavior.
  - `NoZeroSMulDivisors R V`, `NoZeroDivisors R` — for cancellation and invertibility in betweenness characterizations.
- **Affine invariance**: Betweenness is preserved under affine maps and equivalences — central to geometric reasoning.
- **Segment vs. line**: `affineSegment` is a *bounded* segment; `lineMap` extends to full affine line.

---

Let me know if you'd like a **graph of dependencies**, **proof automation suggestions**, or a **Lean 4 tactic hint database** for this module.