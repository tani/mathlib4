### Technical Brief: Strictly Convex Spaces in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `StrictConvexSpace` | `class StrictConvexSpace (𝕜 E : Type*) [...] : Prop` | Typeclass asserting that *some* (hence all) closed balls of positive radius are strictly convex. Defined via strict convexity of `closedBall (0 : E) r` for `r > 0`. |
| `strictConvex_closedBall` | `[StrictConvexSpace 𝕜 E] → x : E → r : ℝ → StrictConvex 𝕜 (closedBall x r)` | Extends strict convexity from centered balls to arbitrary closed balls. |
| `combo_mem_ball_of_ne` | `x ∈ closedBall z r → y ∈ closedBall z r → x ≠ y → 0 < a → 0 < b → a + b = 1 → a • x + b • y ∈ ball z r` | Nontrivial convex combinations of distinct points in a closed ball lie in the *open* ball. |
| `norm_combo_lt_of_ne` | `‖x‖ ≤ r → ‖y‖ ≤ r → x ≠ y → 0 < a → 0 < b → a + b = 1 → ‖a • x + b • y‖ < r` | Norm of nontrivial convex combination is strictly less than `r`. |
| `norm_add_lt_of_not_sameRay` | `¬SameRay ℝ x y → ‖x + y‖ < ‖x‖ + ‖y‖` | Triangle inequality is *strict* unless vectors lie on the same ray. |
| `sameRay_iff_norm_add` | `SameRay ℝ x y ↔ ‖x + y‖ = ‖x‖ + ‖y‖` | Equality in triangle inequality ⇔ same ray (characterization of strict convexity). |
| `eq_of_norm_eq_of_norm_add_eq` | `‖x‖ = ‖y‖ → ‖x + y‖ = ‖x‖ + ‖y‖ → x = y` | In strictly convex space, equal-norm vectors achieving equality in triangle inequality must be equal. |
| `sameRay_iff_norm_sub` | `SameRay ℝ x y ↔ ‖x - y‖ = |‖x‖ - ‖y‖|` | Analogous characterization for difference. |
| `norm_midpoint_lt_iff` | `‖x‖ = ‖y‖ → ‖midpoint ℝ x y‖ < ‖x‖ ↔ x ≠ y` | Midpoint norm is strictly less than endpoint norm iff points differ. |
| `StrictConvexSpace.of_strictConvex_unitClosedBall` | `(closedBall 0 1).StrictConvex → StrictConvexSpace 𝕜 E` | Alternative constructor: unit closed ball strictly convex ⇒ strictly convex space. |
| `StrictConvexSpace.of_norm_add` | `(∀ x y, ‖x‖ = 1 → ‖y‖ = 1 → ‖x + y‖ = 2 → SameRay ℝ x y) → StrictConvexSpace ℝ E` | If equality in triangle inequality for unit vectors implies same ray, then space is strictly convex. |
| `StrictConvexSpace.of_norm_add_ne_two`, `of_norm_combo_ne_one`, `of_norm_combo_lt_one`, `of_pairwise_sphere_norm_ne_two` | Various equivalent sufficient conditions for strict convexity | Useful for proving strict convexity in concrete spaces (e.g., `ℓ^p` for `1 < p < ∞`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `strictConvex_`: properties of strictly convex sets/balls.
  - `combo_`: convex combinations.
  - `norm_`: norm-based inequalities/equalities.
  - `sameRay_`: characterizations involving the `SameRay` relation.
  - `of_`: alternative constructors for `StrictConvexSpace`.

- **Suffixes**:
  - `_of_ne`: assumptions involve inequality (`x ≠ y`).
  - `_of_not_sameRay`: assumptions involve `¬SameRay`.
  - `_iff_`: biconditional characterizations.
  - `_lt_`, `_le_`, `_eq_`: inequality direction in conclusion.

- **Special**:
  - `midpoint`, `lineMap`, `openSegment`, `closedBall`, `ball`, `sphere`: geometric terminology.
  - `vadd`, `smul`: action of scalar multiplication / vector addition.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `cases` | Case analysis on `le_or_lt`, `eq_or_ne`, existential quantifiers. |
| `rw` / `rwa` | Rewriting using definitions (`closedBall`, `ball`, `SameRay`, `norm`) and lemmas (`sameRay_iff_norm_add`, etc.). |
| `simp only [...]` | Simplification with precise lemmas (e.g., `mem_ball_zero_iff`, `norm_smul`, `div_eq_inv_mul`). |
| `exact`, `assumption`, `linarith` | Closing simple goals. |
| `refine` / `apply` | Constructing proofs via intermediate lemmas (e.g., `StrictConvexSpace.of_strictConvex_unitClosedBall`). |
| `rwa`, `rw [...] at ⊢` | Rewriting in hypotheses and goal simultaneously. |
| `nth_rw` | Nth-position rewriting (e.g., to rewrite `x` as `x - y + y`). |
| `div_lt_iff₀`, `sub_lt_iff_lt_add`, `abs_sub_lt_iff` | Arithmetic rewrites for inequalities involving division/subtraction/absolute value. |
| `smul_inv_smul₀`, `mul_smul`, `smul_add` | Simplifying scalar multiplication expressions. |

---

#### **4. Proof Logic**

- **Inductive/structural pattern**:
  - Most proofs follow a *case split* on `r = 0` or `r > 0`, then reduce to the unit ball case via homogeneity (`smul`, `vadd`).
  - For equivalence proofs (`↔`), split into `→` and `←`, often using `classical logic` (`Classical.not_not`) to convert negations.
  - For alternative constructors (`of_*`), reduce to `StrictConvexSpace.of_strictConvex_unitClosedBall`, then verify strict convexity condition on the unit ball using:
    - `convex_closedBall` (convexity of closed balls),
    - `strictConvex'` (strict convexity criterion: for `x ≠ y` in the set, some convex combination lies in the interior),
    - `mem_sphere_zero_iff_norm` to characterize boundary points.

- **Core logical flow**:
  1. Reduce to unit ball case via scaling/translation.
  2. Use strict convexity criterion: for `x ≠ y` on boundary (`‖x‖ = ‖y‖ = 1`), find `a, b > 0, a + b = 1` with `‖a • x + b • y‖ < 1`.
  3. Translate this into norm inequalities (`norm_add_lt`, `norm_combo_lt`, etc.).
  4. Derive consequences: triangle inequality characterizations, midpoint behavior, isometry rigidity.

- **Key insight**: Strict convexity is *local* (unit ball suffices) and *homogeneous* (scaling preserves strict convexity), enabling reduction to unit sphere analysis.

---

#### **5. Imports & Scope**

- **Primary imports**:
  ```lean
  import Mathlib.Analysis.Convex.Normed
  import Mathlib.Analysis.Normed.Module.Ray
  ```
- **Scope**:
  - Focuses on *normed vector spaces* over *normed linearly ordered fields* (mainly `ℝ`, occasionally `ℚ`).
  - Assumes `NormedAddCommGroup`, `NormedSpace`, and often `LinearMap.CompatibleSMul`.
  - Uses `Convex`, `Pointwise`, `Set`, `Metric` namespaces for geometric operations.
  - Heavily relies on `SameRay`, `openSegment`, `closedBall`, `ball`, `sphere`, `midpoint`.

- **Domain**: Functional analysis / convex geometry in normed spaces; especially relevant for `L^p`-spaces (`1 < p < ∞`) and uniqueness of geodesics.

--- 

This module formalizes foundational properties of strictly convex normed spaces, emphasizing *equivalent characterizations* and *geometric consequences* of strict convexity (e.g., uniqueness of midpoints, rigidity of isometries). It is a cornerstone for deeper results in metric geometry and optimization in Banach spaces.