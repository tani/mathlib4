### Technical Brief: Minkowski Functional (`gauge`) in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `gauge` | `gauge (s : Set E) (x : E) : ℝ` | Defines the Minkowski functional (gauge) of a set `s` at point `x`: the infimum of scalars `r > 0` such that `x ∈ r • s`. |
| `gauge_def` | `gauge s x = sInf { r ∈ Set.Ioi 0 | x ∈ r • s }` | Explicit definition of `gauge` as an infimum over positive scalars. |
| `gauge_def'` | `gauge s x = sInf { r ∈ Set.Ioi 0 | r⁻¹ • x ∈ s }` | Equivalent formulation using scalar multiplication on `x` instead of `s`. |
| `gauge_zero` | `gauge s 0 = 0` | Gauge at zero is always zero (even if `0 ∉ s`, due to Lean’s convention for `sInf ∅ = 0`). |
| `gauge_nonneg` | `0 ≤ gauge s x` | Gauge is always nonnegative. |
| `gauge_neg` | `symmetric s → gauge s (-x) = gauge s x` | Gauge is symmetric if `s` is symmetric. |
| `gauge_le_of_mem` | `0 ≤ a → x ∈ a • s → gauge s x ≤ a` | Membership in a scaled set bounds the gauge above. |
| `gauge_add_le` | `Convex s → Absorbent s → gauge s (x + y) ≤ gauge s x + gauge s y` | Subadditivity of gauge under convexity and absorbency. |
| `gauge_smul` | `Balanced s → gauge s (r • x) = ‖r‖ * gauge s x` | Homogeneity of gauge under balancedness (in `RCLike` setting). |
| `gaugeSeminorm` | `gaugeSeminorm hs₀ hs₁ hs₂ : Seminorm 𝕜 E` | Constructs a seminorm from `gauge s` when `s` is balanced, convex, and absorbent. |
| `Seminorm.gauge_ball` | `gauge (p.ball 0 1) = p` | Every seminorm arises as the gauge of its unit ball. |
| `gauge_unit_ball` | `gauge (ball 0 1) x = ‖x‖` | Gauge of the unit ball is the norm. |
| `gauge_ball` | `0 ≤ r → gauge (ball 0 r) x = ‖x‖ / r` | Gauge of a ball of radius `r` is scaled norm. |
| `continuousAt_gauge` | `Convex s → s ∈ 𝓝 0 → ContinuousAt (gauge s) x` | Continuity of gauge at any point when `s` is convex and a neighborhood of 0. |
| `gauge_lt_one_eq_interior` | `Convex s → s ∈ 𝓝 0 → {x | gauge s x < 1} = interior s` | Interior of `s` is the sublevel set `{gauge s < 1}` under convexity and neighborhood condition. |
| `gauge_le_one_iff_mem_closure` | `Convex s → s ∈ 𝓝 0 → gauge s x ≤ 1 ↔ x ∈ closure s` | Closure of `s` corresponds to `{gauge s ≤ 1}`. |
| `gauge_eq_zero` | `Absorbent s → IsVonNBounded s → gauge s x = 0 ↔ x = 0` | Gauge vanishes only at 0 under boundedness and absorbency. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `gauge_`: Core properties of the Minkowski functional (`gauge_zero`, `gauge_add_le`, `gauge_smul`, etc.).
  - `gaugeSeminorm_`: Properties of the seminorm derived from gauge (`gaugeSeminorm_lt_one_of_isOpen`, `gaugeSeminorm_ball`).
  - `le_`, `lt_`, `eq_`, `mem_`, `closure_`, `frontier_`, `interior_`: Standard Mathlib conventions for set membership and topology.

- **Suffixes**:
  - `_of_`: Conditions or assumptions (`gauge_le_of_mem`, `gauge_smul_of_nonneg`, `gauge_zero'`).
  - `_iff_`: Equivalences (`gauge_eq_zero`, `gauge_lt_one_iff_mem_interior`, `gauge_le_one_iff_mem_closure`).
  - `_set`: Refers to set-theoretic operations (`gauge_neg_set_neg`, `gauge_neg_set_eq_gauge_neg`).
  - `_ball`, `_unit_ball`, `_closedBall`: Specific to metric balls.

- **Special**:
  - `gauge_def`, `gauge_def'`: Alternate definitions.
  - `gauge_zero'`, `gauge_empty`, `gauge_closure_zero`: Edge cases (empty set, singleton zero, etc.).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (`gauge_def`, `mem_smul_set_iff_inv_smul_mem₀`, etc.). |
| `congr` / `congr'` | Proving equality of functions/sets by extensionality. |
| `ext` | Extensionality for sets/functions. |
| `exact`, `assumption`, `linarith` | Basic proof automation. |
| `csInf_le_csInf`, `le_csInf`, `le_of_forall_pos_lt_add` | Infimum reasoning (core to gauge properties). |
| `rcases`, `obtain`, `cases'` | Decomposing existential/universal hypotheses. |
| `filter_upwards` | Working with filters (e.g., neighborhoods, limits). |
| `tendsto_*`, `continuousAt_gauge`, `uniformContinuous_gauge` | Topological reasoning. |
| `apply`, `refine`, `convert` | Constructing proofs with partial goals. |
| ` positivity` / ` linarith` | Handling inequalities and positivity. |
| `ring`, `norm_num` | Arithmetic simplifications (less frequent). |

---

#### **4. Proof Logic & Strategy**

- **Infimum-based reasoning**: Most proofs rely on characterizing `gauge s x` as an infimum and applying:
  - `le_csInf` / `csInf_le` for bounds.
  - `exists_lt_of_gauge_lt` to extract a witness `r` with `x ∈ r • s` when `gauge s x < a`.
- **Convexity & absorbency**: Crucial for subadditivity (`gauge_add_le`) and homogeneity (`gauge_smul`). Proofs often:
  - Use convexity to combine scaled points (`hs.smul_mem_of_zero_mem`, `hs.add_smul`).
  - Use absorbency to ensure the infimum set is nonempty (`gauge_set_nonempty`).
- **Topological arguments**:
  - Neighborhood assumptions (`s ∈ 𝓝 0`) + convexity ⇒ continuity (`continuousAt_gauge`).
  - Balancedness + convexity + absorbency ⇒ seminorm structure (`gaugeSeminorm`).
- **Metric/normed space arguments**:
  - Identify gauge with norm via `gauge_unit_ball`, `gauge_ball`.
  - Use Lipschitz continuity (`lipschitzWith_gauge`) for uniform continuity.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
```lean
import Mathlib.Analysis.Convex.Topology
import Mathlib.Analysis.NormedSpace.Pointwise
import Mathlib.Analysis.Seminorm
import Mathlib.Analysis.LocallyConvex.Bounded
import Mathlib.Analysis.RCLike.Basic
```

**Scope & Domain**:
- **Setting**: Real/complex vector spaces (`Module ℝ E`, `Module 𝕜 E` with `RCLike 𝕜`).
- **Structure**: `AddCommGroup E`, `TopologicalSpace E`, `ContinuousSMul ℝ E`, `SeminormedAddCommGroup E`, `NormedSpace ℝ E`.
- **Key objects**: Convex, balanced, absorbent sets; seminorms; neighborhoods of 0; metric balls.
- **Main equivalence**:  
  **Balanced + Convex + Absorbent ⇔ Unit ball of a seminorm**  
  (via `gaugeSeminorm` and `Seminorm.gauge_ball`).

---

### Summary

This file formalizes the **Minkowski functional (gauge)** in the context of topological vector spaces, establishing its role as a bridge between **geometric properties of sets** (convexity, balancedness, absorbency) and **analytic structures** (seminorms, continuity, Lipschitz behavior). It culminates in the equivalence between seminorms and locally convex topologies, foundational in functional analysis. The formalization is highly structured, leveraging Mathlib’s rich libraries on convex analysis, seminorms, and topology.