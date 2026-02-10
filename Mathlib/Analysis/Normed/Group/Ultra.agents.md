### Technical Metadata Brief: Ultrametric Norms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `norm_mul_le_max` | `∀ x y, ‖x * y‖ ≤ max ‖x‖ ‖y‖` | Fundamental inequality for multiplicative norms in ultrametric groups. |
| `isUltrametricDist_of_forall_norm_mul_le_max_norm` | `(∀ x y, ‖x * y‖ ≤ max ‖x‖ ‖y‖) → IsUltrametricDist` | Constructs ultrametric from multiplicative norm inequality. |
| `isUltrametricDist_of_isNonarchimedean_norm` | `IsNonarchimedean norm → IsUltrametricDist` | Links nonarchimedean additive norm to ultrametric distance. |
| `isNonarchimedean_norm` | `IsUltrametricDist → IsNonarchimedean norm` | Converse direction: ultrametric ⇒ nonarchimedean norm. |
| `isUltrametricDist_iff_isNonarchimedean_norm` | `IsUltrametricDist ↔ IsNonarchimedean norm` | Equivalence between ultrametric structure and nonarchimedean norm. |
| `norm_mul_eq_max_of_norm_ne_norm` | `‖x‖ ≠ ‖y‖ → ‖x * y‖ = max ‖x‖ ‖y‖` | Strong form: equality holds when norms differ (isosceles triangles). |
| `norm_eq_of_mul_norm_lt_max` | `‖x * y‖ < max ‖x‖ ‖y‖ → ‖x‖ = ‖y‖` | Converse of above: strict inequality implies equal norms. |
| `ball_openSubgroup` | `0 < r → OpenSubgroup S` | Open ball around identity is an open subgroup in ultrametric groups. |
| `closedBall_openSubgroup` | `0 < r → OpenSubgroup S` | Closed ball around identity is also an open subgroup. |
| `nonarchimedeanGroup` | `[SeminormedCommGroup M] [IsUltrametricDist M] → NonarchimedeanGroup M` | Instance: ultrametric commutative seminormed group is nonarchimedean as topological group. |
| `Finset.nnnorm_prod_le_sup_nnnorm` | `‖∏ f i‖₊ ≤ sup ‖f i‖₊` | Nonarchimedean product inequality over finite sets (NNReal version). |
| `norm_prod_le_of_forall_le` | `(∀ i ∈ s, ‖f i‖ ≤ C) → ‖∏ f i‖ ≤ C` | Generalized ultrametric triangle inequality for finite products. |
| `exists_norm_finset_prod_le_of_nonempty` | `∃ i ∈ t, ‖∏ f i‖ ≤ ‖f i‖` | Existence of a term dominating the product norm. |
| `norm_tprod_le` | `‖∏' i, f i‖ ≤ ⨆ i, ‖f i‖` | Infinite product norm bounded by sup of norms (tprod = topological product). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `norm_`: basic norm inequalities (e.g., `norm_mul_le_max`)
  - `nnnorm_`: same but for `nnnorm : X → ℝ≥0` (e.g., `nnnorm_mul_le_max`)
  - `isUltrametricDist_`: constructions/properties of `IsUltrametricDist`
  - `isNonarchimedean_`: properties of nonarchimedean functions
- **Suffixes**:
  - `_le_max`: inequality with `max`
  - `_eq_max_of_…`: equality case under condition (e.g., `norm_mul_eq_max_of_norm_ne_norm`)
  - `_of_…`: implication from hypothesis (e.g., `isUltrametricDist_of_isNonarchimedean_norm`)
  - `_iff_…`: equivalence statements
- **Special**:
  - `ball_openSubgroup`, `closedBall_openSubgroup`: constructions of open subgroups from balls.
  - `nonarchimedeanGroup`: instance name for topological group property.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplification using definitions (`dist_eq_norm_div`, `norm_inv'`, etc.) |
| `convert` | Adjusting goals using definitional equality (e.g., `dist_triangle_max 0 x (x + y)`) |
| `congr` | Congruence closure for equalities under function applications |
| `rw` / `simpa` | Rewriting using lemmas (e.g., `div_mul_div_cancel`, `norm_inv'`) |
| `exact` / `apply` | Direct proof steps, especially for inequalities |
| `induction` | Structural induction on `ℕ`, `ℤ`, `Finset`, `Multiset` |
| `cases` | Case analysis on integers (`z`) or finite set emptiness (`eq_empty_or_nonempty`) |
| `lift` | Lifting real numbers to `NNReal` when nonnegative |
| `aesop` / `linarith` | Not heavily used here — proofs are mostly algebraic/simp-based |
| `tactic.intros`, `tactic.existsi`, `tactic.refine` | Used in existential constructions |

---

#### **4. Proof Logic**

- **Core Strategy**: Reduce ultrametric properties to norm inequalities via `dist x y = ‖x / y‖`.
- **Equivalence proofs** (`↔`) are typically done by splitting into two implications:
  - `→`: use `dist_triangle_max` to derive `norm_add_le_max` or `norm_mul_le_max`.
  - `←`: assume norm inequality for all pairs, then apply `isUltrametricDist_of_forall_*`.
- **Isosceles triangle lemmas**:
  - Use `dist_eq_max_of_dist_ne_dist` + `dist_triangle_max` to get equality when distances differ.
  - Rely on `not_ne_iff` to convert strict inequality to equality of norms.
- **Open subgroup constructions**:
  - Use `Metric.mem_ball` / `mem_closedBall` to translate membership into norm inequalities.
  - Apply `norm_mul_le_max` to verify closure under multiplication.
- **Finite/infinite product inequalities**:
  - Induction on `Finset.Nonempty` or `Multiset`.
  - Use `norm_mul_le_max` repeatedly to propagate bounds.
  - For infinite products (`tprod`), use convergence criteria (`hasProd`, `tendsto_cofinite_one`) and boundedness of range.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Group.Uniform` | Uniform structure on normed groups; foundational for topological group properties. |
| `Mathlib.Topology.Algebra.Nonarchimedean.Basic` | Definitions and basic facts about nonarchimedean topological groups. |
| `Mathlib.Topology.MetricSpace.Ultra.Basic` | Ultrametric spaces: triangle inequality, balls, etc. |
| `Mathlib.Topology.Algebra.InfiniteSum.Group` | Infinite sums/products in topological groups (used for `tprod`). |
| `Mathlib.Topology.Algebra.Order.LiminfLimsup` | Limsup/liminf for real-valued functions (used in convergence arguments). |

---

### Summary

This file formalizes the equivalence between **ultrametric distances** and **nonarchimedean norms** in (semi)normed groups, emphasizing:
- Structural properties (e.g., all triangles are isosceles),
- Topological consequences (open subgroups from balls),
- Product inequalities (finite and infinite),
- Applications to nonarchimedean topological groups.

It leverages Lean’s typeclass infrastructure (`SeminormedGroup`, `IsUltrametricDist`, `NonarchimedeanGroup`) and uses a mix of algebraic manipulation and metric-space reasoning.