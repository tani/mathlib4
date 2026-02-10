### Technical Brief: Affine Subspace Sides in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `WSameSide s x y` | `Prop` | Points `x`, `y` are *weakly* on the same side of affine subspace `s`: ∃ `p₁, p₂ ∈ s` s.t. `SameRay (x -ᵥ p₁) (y -ᵥ p₂)` |
| `SSameSide s x y` | `Prop` | *Strictly* same side: `WSameSide ∧ x ∉ s ∧ y ∉ s` |
| `WOppSide s x y` | `Prop` | *Weakly* opposite sides: ∃ `p₁, p₂ ∈ s` s.t. `SameRay (x -ᵥ p₁) (p₂ -ᵥ y)` |
| `SOppSide s x y` | `Prop` | *Strictly* opposite sides: `WOppSide ∧ x ∉ s ∧ y ∉ s` |

**Key Theorems:**

| Name | Statement | Significance |
|------|-----------|--------------|
| `wSameSide_comm` | `s.WSameSide x y ↔ s.WSameSide y x` | Symmetry of weak same-side relation |
| `wOppSide_comm` | `s.WOppSide x y ↔ s.WOppSide y x` | Symmetry of weak opposite-side relation |
| `wSameSide_self_iff` | `s.WSameSide x x ↔ s.Nonempty` | A point is weakly on same side of `s` with itself iff `s` is nonempty |
| `wOppSide_self_iff` | `s.WOppSide x x ↔ x ∈ s` | A point is weakly on opposite side of `s` with itself iff it lies *in* `s` |
| `wOppSide_iff_exists_wbtw` | `s.WOppSide x y ↔ ∃ p ∈ s, Wbtw R x p y` | Opposite sides ⇔ there exists a point in `s` between them |
| `SOppSide.exists_sbtw` | `s.SOppSide x y → ∃ p ∈ s, Sbtw R x p y` | Strict opposite sides ⇒ strict betweenness point in `s` |
| `wSameSide_and_wOppSide_iff` | `s.WSameSide x y ∧ s.WOppSide x y ↔ x ∈ s ∨ y ∈ s` | Simultaneous same/opposite sides ⇔ at least one point lies in `s` |
| `SSameSide.trans` | `s.SSameSide x y → s.SSameSide y z → s.SSameSide x z` | Transitivity of strict same-side (requires strictness) |
| `WOppSide.trans` | `s.WOppSide x y → s.WOppSide y z → s.WSameSide x z` | Composition of opposite sides yields same side (if middle point not in `s`) |
| `wSameSide.map` / `WOppSide.map` | Preserved under affine maps | Compatibility with affine geometry transformations |
| `wSameSide_vadd_left_iff`, `wSameSide_smul_vsub_vadd_left`, etc. | Invariance under direction translations/scalings | Reflects linear structure of direction submodule |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `wSameSide`, `sSameSide`, `wOppSide`, `sOppSide`: `w` = weak, `s` = strict.
- **Suffixes:**
  - `_comm`: symmetry proofs.
  - `_self_iff`: self-relations.
  - `_iff_exists_*`: characterizations via existence of points.
  - `_map_iff`, `_map`: behavior under affine maps.
  - `_vadd_*`, `_smul_*`, `_lineMap_*`: behavior under vector addition/scaling/line interpolation.
- **Helper lemmas:**
  - `left_not_mem`, `right_not_mem`: projections from strict definitions.
  - `trans_*`, `not_*`: logical composition and negation.

---

#### **3. Tactic Stack**

- **Core tactics:** `rcases`, `rw`, `simp_rw`, `refine`, `exact`, `contradiction`, `linarith`, `field_simp`, `ring`, `linear_combination`, `match_scalars`, `div_le_one_of_le₀`, `left_add_pos`, `sub_pos.2`, `ne_of_lt`, `div_ne_zero`, `smul_mem_iff`, `vadd_mem_iff_mem_of_mem_direction`, `vsub_right_mem_direction_iff_mem`, `vsub_self`, `vsub_eq_zero_iff_eq`, `vadd_vsub_assoc`, `vsub_vadd_eq_vsub_sub`, `neg_vsub_eq_vsub_rev`, `neg_smul`, `smul_neg`, `add_comm`, `sub_neg_eq_add`, `mul_div_cancel₀`, `vsub_sub_vsub_cancel_right`, `vadd_sub_vsub_cancel_left`, `lineMap_apply`, `wbtw_self_left`, `wbtw_self_right`, `Sbtw`, `Wbtw`, `SameRay.rfl`, `SameRay.zero_left`, `SameRay.zero_right`, `SameRay.sameRay_nonneg_smul_left`, `SameRay.sameRay_comm`, `SameRay.trans`, `SameRay.neg_iff`, `SameRay.neg_left_iff`, `SameRay.neg_right_iff`, `SameRay.rfl`, `SameRay.symm`, `SameRay.trans`, `SameRay.of_nonneg_smul_left`, `SameRay.of_nonpos_smul_left`, `SameRay.of_nonneg_smul_right`, `SameRay.of_nonpos_smul_right`.

- **Domain-specific automation:**
  - `field_simp` + `ring` for rational expressions.
  - `linear_combination` for vector space identities.
  - `match_scalars` for scalar field simplifications.
  - `div_le_one_of_le₀`, `Left.add_pos`, etc., for ordered field reasoning.

---

#### **4. Proof Logic**

- **Inductive/constructive style:** Proofs often proceed by:
  1. Unfolding definitions (`rw [WSameSide]`, `rw [SSameSide]`).
  2. `rcases` existential quantifiers to extract witness points.
  3. Using `vsub`/`vadd` algebraic identities to rewrite expressions.
  4. Applying `SameRay` properties (e.g., symmetry, transitivity, scaling behavior).
  5. Leveraging ordered field properties (`0 ≤ t`, `t < 0`) to determine ray direction.
  6. Using `lineMap` and `Wbtw`/`Sbtw` for geometric intuition (e.g., betweenness implies opposite sides).
- **Common patterns:**
  - *Symmetry*: swap witnesses and use `SameRay.symm`.
  - *Transitivity*: combine rays via `SameRay.trans`, often requiring non-membership to avoid degeneracy.
  - *Mapping*: use injectivity of affine maps to lift/retract relations via `mem_map_iff_mem_of_injective`.
  - *Characterization*: reduce to existence of a point in `s` satisfying geometric condition (e.g., `wOppSide_iff_exists_wbtw`).
  - *Contradiction*: assume both same and opposite sides, derive membership in `s`, contradict strictness.

---

#### **5. Imports & Scope**

- **Primary dependencies:**
  - `Mathlib.Analysis.Convex.Between`: defines `Wbtw`, `Sbtw`, `lineMap`.
  - `Mathlib.Analysis.Convex.Normed`: provides convexity and normed space context (though not directly used here).
  - `Mathlib.Analysis.Normed.Group.AddTorsor`: foundational theory of torsors over additive groups (used for `vsub`, `vadd`, `AffineSubspace`).

- **Mathematical scope:**
  - Affine geometry over *strictly ordered commutative rings* and *linearly ordered fields*.
  - Focus on *affine subspaces* and their *sides* relative to points.
  - No explicit norm or topology used—purely affine and order-theoretic.

---

#### **Summary**

This file formalizes a clean, symmetric, and logically robust theory of “sides” of affine subspaces, grounded in ordered field arithmetic and affine torsor structure. It emphasizes:
- **Geometric intuition** (betweenness, rays, line maps),
- **Algebraic precision** (vsub, direction submodule, scalar multiplication),
- **Proof structure** (symmetry, transitivity, mapping, contradiction),
- **Modularity** (lemmas for `w`/`s`, `SameSide`/`OppSide`, and their interactions).

It serves as a foundational module for more advanced convex-geometric reasoning in Mathlib.