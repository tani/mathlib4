### Technical Brief: Betweenness in Strictly Convex Affine Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Sbtw` | `Sbtw ℝ p₁ p₂ p₃` | *Strict betweenness*: `p₂` lies strictly on the open segment `(p₁, p₃)`. |
| `Wbtw` | `Wbtw ℝ p₁ p₂ p₃` | *Weak betweenness*: `p₂` lies on the closed segment `[p₁, p₃]`. |
| `dist_lt_max_dist` | `Sbtw ℝ p₁ p₂ p₃ → dist p₂ p < max (dist p₁ p) (dist p₃ p)` | In a strictly convex space, the distance from an intermediate point to any `p` is *strictly* less than the max of endpoints’ distances. |
| `dist_le_max_dist` | `Wbtw ℝ p₁ p₂ p₃ → dist p₂ p ≤ max (dist p₁ p) (dist p₃ p)` | Weak version of above; equality may hold if `p₂` coincides with an endpoint. |
| `Collinear.wbtw_of_dist_eq_of_dist_le` | `Collinear {p₁, p₂, p₃} → dist p₁ p = r → dist p₂ p ≤ r → dist p₃ p = r → p₁ ≠ p₃ → Wbtw p₁ p₂ p₃` | Characterizes weak betweenness via distances to a reference point `p`. |
| `Collinear.sbtw_of_dist_eq_of_dist_lt` | Same premises as above, but `dist p₂ p < r → Sbtw p₁ p₂ p₃` | Strict version: if the middle point is *strictly* closer, it lies strictly between. |
| `dist_add_dist_eq_iff` | `dist a b + dist b c = dist a c ↔ Wbtw a b c` | In strictly convex spaces, equality in triangle inequality ⇔ `b` lies on segment `[a, c]`. |
| `eq_lineMap_of_dist_eq_mul_of_dist_eq_mul` | `dist x y = r * dist x z ∧ dist y z = (1 - r) * dist x z → y = lineMap x z r` | Characterizes points on a segment by proportional distances. |
| `eq_midpoint_of_dist_eq_half` | `dist x y = dist x z / 2 ∧ dist y z = dist x z / 2 → y = midpoint x z` | Special case for `r = 1/2`. |
| `affineIsometryOfStrictConvexSpace` | `Isometry f → PF →ᵃⁱ[ℝ] PE` | Any isometry between torsors over strictly convex spaces is automatically affine (no surjectivity needed). |

---

#### **2. Naming Conventions**

- **`Sbtw` / `Wbtw`**: Prefixes for *strict* and *weak* betweenness.
- **`dist_`**: Functions/lemmas about distances (e.g., `dist_lt_max_dist`, `dist_add_dist_eq_iff`).
- **`eq_`**: Lemmas characterizing equality via metric conditions (`eq_lineMap_`, `eq_midpoint_`).
- **`of_`**: Construction lemmas (e.g., `wbtw_of_dist_eq_`, `sbtw_of_dist_eq_`, `affineIsometryOfStrictConvexSpace`).
- **`_iff_`**: Biconditional characterizations (`dist_add_dist_eq_iff`).
- **`_or_`**: Disjunctive cases in `rcases` (e.g., `wbtw_or_wbtw_or_wbtw`).
- **`_le_`, `_lt_`**: Inequality directions in lemmas (e.g., `dist_le_max_dist`, `dist_lt_max_dist`).

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Role |
|--------|-----------------|------|
| `simp` / `simp_rw` | Very High | Simplify distances (`dist_eq_norm_vsub`), segments, and equalities. |
| `rw` | Very High | Rewrite using definitions (`vsub_left_cancel_iff`, `mem_segment_iff_wbtw`, etc.). |
| `rcases` / `cases` | High | Handle disjunctions (`wbtw_or_wbtw_or_wbtw`) and existential quantifiers (`mem_image`, `mem_segment`). |
| `by_cases` | Medium | Split on equality (`p₂ = p₁`, `p₃ = p₂`, etc.) to reduce to simpler cases. |
| `exact` / `assumption` | Medium | Finalize proofs using hypotheses. |
| `norm` / `abel` | Low-Medium | Simplify norm expressions and linear arithmetic (e.g., `sub_pos.2 hr1`, `abel`). |
| `aesop` | Not present | Not used — proofs are highly manual and metric-specific. |
| `rwa` | Medium | Rewrite and apply in `↔`-based arguments (`dist_add_dist_eq_iff`). |

---

#### **4. Proof Logic**

- **Induction-free**: Proofs rely on *metric geometry* and *strict convexity*, not structural induction.
- **Case analysis**: Central strategy — split on equality (`p₂ = p₁`, `p₃ = p₂`) or betweenness variants (`Sbtw` vs `Wbtw`).
- **Contrapositive reasoning**: Used to derive contradictions (e.g., `hp₂.not_lt hs'`).
- **Segment membership ↔ betweenness**: Key equivalence used repeatedly (`mem_segment_iff_wbtw`, `dist_add_dist_eq_iff`).
- **Norm-based arguments**: Leverage strict convexity via `norm_combo_lt_of_ne`, `sameRay_iff_norm_add`.
- **Affine reduction**: Translate affine statements to vector space via `vsub`, prove there, then lift back (e.g., `dist_vsub_cancel_right`, `vsub_left_injective`).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Between` | Core definitions of `Sbtw`, `Wbtw`, `Collinear`. |
| `Mathlib.Analysis.Convex.StrictConvexSpace` | Defines strict convexity (unit ball strictly convex), needed for uniqueness of segment representations. |
| `Mathlib.Analysis.Normed.Affine.Isometry` | Provides `Isometry`, `AffineMap`, `affineIsometry`, and tools for torsor-isometry correspondence. |

**Domain**: Real normed affine spaces with strictly convex normed vector space of translations.  
**Focus**: Metric-characterization of betweenness, segment geometry, and rigidity of isometries.

--- 

This module formalizes foundational metric-geometric properties of strictly convex spaces, emphasizing how *distance equalities* enforce *affine configuration* (e.g., betweenness, midpoint, linearity of isometries).