### Technical Metadata Brief: Segments in Vector Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `segment` | `def segment (x y : E) : Set E` | Closed segment between `x` and `y` as set of convex combinations: `{ z | ∃ a b ≥ 0, a + b = 1, a • x + b • y = z }` |
| `openSegment` | `def openSegment (x y : E) : Set E` | Open segment: same as `segment`, but with `0 < a, 0 < b` |
| `segment_symm` | `[x -[𝕜] y] = [y -[𝕜] x]` | Symmetry of closed segment |
| `openSegment_symm` | `openSegment 𝕜 x y = openSegment 𝕜 y x` | Symmetry of open segment |
| `segment_eq_image₂` | `[x -[𝕜] y] = (p ↦ p.1 • x + p.2 • y) '' {p | 0 ≤ p.1 ∧ 0 ≤ p.2 ∧ p.1 + p.2 = 1}` | Parametrization via product image |
| `segment_eq_image` | `[x -[𝕜] y] = (θ ↦ (1 - θ) • x + θ • y) '' Icc 0 1` | Parametrization via interval `Icc` |
| `openSegment_eq_image'` | `[x -[𝕜] y] = (θ ↦ x + θ • (y - x)) '' Icc 0 1` | Affine parametrization from `x` toward `y` |
| `segment_eq_image_lineMap` | `[x -[𝕜] y] = lineMap x y '' Icc 0 1` | In terms of affine `lineMap` |
| `image_segment` | `f '' [a -[𝕜] b] = [f a -[𝕜] f b]` for affine maps `f` | Affine maps preserve segments |
| `mem_segment_iff_sameRay` | `x ∈ [y -[𝕜] z] ↔ SameRay (x - y) (z - x)` (in linear ordered field) | Characterization via rays (geometric intuition) |
| `segment_inter_eq_endpoint_of_linearIndependent_sub` | `[c -[𝕜] x] ∩ [c -[𝕜] y] = {c}` under linear independence | Intersection of segments sharing endpoint is just that endpoint |
| `segment_eq_Icc` | `[x -[𝕜] y] = Icc x y` when `x ≤ y` (in linear ordered field) | Identifies segments with standard intervals in `𝕜` |
| `openSegment_eq_Ioo` | `openSegment 𝕜 x y = Ioo x y` when `x < y` | Open segment = open interval in `𝕜` |
| `mem_Icc`, `mem_Ioo`, `mem_Ioc`, `mem_Ico` | Convex combination characterizations of standard intervals | Connects interval membership to convex combinations |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `segment_`, `openSegment_`: for segment-related lemmas.
  - `left_mem_`, `right_mem_`: membership of endpoints.
  - `image_`, `vadd_`, `translate_`: behavior under maps/actions.
  - `mem_`, `subset_`: membership/subset characterizations.
- **Suffixes**:
  - `_symm`: symmetry properties.
  - `_eq_image[_]`: parametrization as image.
  - `_iff`: biconditional characterizations.
  - `_subset[_]`: inclusion lemmas.
- **Notation**:
  - `[x -[𝕜] y]` scoped under `Convex`, defined as `segment 𝕜 x y`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification with definitional equalities and lemmas.
- `rw`: rewriting using equalities (especially `segment_eq_image`, `add_comm`, etc.).
- `exact`, `refine`, `convert`: constructing proofs with control.
- `cases'`: case analysis on existential or inequality hypotheses.
- `gcongr`: for monotonicity arguments in ordered structures.
- `abel` / `abel_nf`: simplifying additive expressions (especially with `smul`, `sub`, etc.).
- ` positivity`: discharge positivity goals.
- `set_ext`, `funext`: extensionality for sets/functions.
- `aesop`: for routine automation (not explicitly used here, but likely applicable).
- `apply`, `intro`, `rintro`, `rcases`: standard proof structure.

---

#### **4. Proof Logic & Strategy**

- **Parametrization-based reasoning**: Most proofs reduce to showing equivalence of sets via `Set.ext` and manipulating the defining existential condition.
- **Case analysis on scalars**: Many arguments split on whether scalars are zero, positive, or equal (e.g., `ha.eq_or_lt`, `hb.eq_or_gt`).
- **Linear algebra + order interplay**: In ordered settings (e.g., `LinearOrderedField`), proofs combine:
  - Convex combination algebra (`add_smul`, `smul_eq_mul`, etc.)
  - Order properties (`div_nonneg`, `sub_pos`, etc.)
  - Set-theoretic reasoning (`Icc_subset_segment`, `segment_subset_Icc`)
- **Symmetry & translation invariance**: Proofs often use `segment_symm`, `vadd_segment`, `mem_segment_translate` to reduce to canonical cases (e.g., `x = 0`).
- **Inductive/constructive characterizations**: E.g., `insert_endpoints_openSegment` shows open segment + endpoints = closed segment.
- **Use of `lineMap` and `homothety`**: For geometric intuition and parametrization.

---

#### **5. Imports & Scope**

**Core imports**:
- `Mathlib.Algebra.Order.Invertible`: for invertibility of `2`, used in midpoint lemmas.
- `Mathlib.Algebra.Order.Module.OrderedSMul`: ordered module structure.
- `Mathlib.LinearAlgebra.AffineSpace.Midpoint`: midpoint definition.
- `Mathlib.LinearAlgebra.Ray`: `SameRay` and related concepts.
- `Mathlib.Tactic.GCongr`: for monotonicity in ordered structures.

**Scope**:
- General vector spaces over `OrderedSemiring`, `OrderedRing`, `LinearOrderedRing`, `LinearOrderedField`, `LinearOrderedSemifield`.
- Extends to products (`Prod`) and dependent products (`Pi`) via `segment_subset`, `image_mk_segment_left`, etc.
- Connects to standard interval notation (`Icc`, `Ioo`, `Ioc`, `Ico`, `uIcc`) in linearly ordered fields.

---

Let me know if you'd like a **dependency graph**, **proof automation suggestions**, or a **formalization roadmap** for generalizing to affine spaces (as mentioned in the TODO).