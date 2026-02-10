### Technical Brief: Analyticity of Continuous Linear and Bilinear Maps in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `fpowerSeries_radius` | `f : E →L[𝕜] F → x : E ↦ (f.fpowerSeries x).radius = ∞` | Shows the formal power series of a continuous linear map has infinite radius of convergence. |
| `hasFPowerSeriesOnBall` | `f : E →L[𝕜] F → x : E ↦ HasFPowerSeriesOnBall f (f.fpowerSeries x) x ∞` | Establishes that `f` has a formal power series expansion converging on the entire space (ball of radius `∞`). |
| `hasFPowerSeriesAt` | `f : E →L[𝕜] F → x : E ↦ HasFPowerSeriesAt f (f.fpowerSeries x) x` | Consequence of `hasFPowerSeriesOnBall`, asserting local analyticity via existence of a formal power series at each point. |
| `analyticAt` | `f : E →L[𝕜] F → x : E ↦ AnalyticAt 𝕜 f x` | Main result: every continuous linear map is analytic at every point. |
| `analyticOnNhd`, `analyticWithinAt`, `analyticOn` | Various analyticity predicates over sets/nbd/within | Derivatives of `analyticAt`, showing global analytic behavior on arbitrary subsets. |
| `uncurryBilinear` | `f : E →L[𝕜] F →L[𝕜] G ↦ E × F[×2]→L[𝕜] G` | Reinterprets a bilinear map as a 2-multilinear map; second term in the multilinear series of `uncurry f`. |
| `fpowerSeriesBilinear` | `f : E →L[𝕜] F →L[𝕜] G → x : E × F ↦ FormalMultilinearSeries 𝕜 (E × F) G` | Defines the formal multilinear series expansion of a bilinear map: terms at degrees 0,1,2 are nonzero; higher terms vanish. |
| `fpowerSeriesBilinear_radius` | `(f.fpowerSeriesBilinear x).radius = ∞` | Infinite radius of convergence for bilinear formal multilinear series. |
| `hasFPowerSeriesOnBall_bilinear`, `hasFPowerSeriesAt_bilinear`, `analyticAt_bilinear`, etc. | Analogous to linear case, for bilinear maps | Prove bilinear maps are analytic (on product space). |
| `analyticAt_id`, `analyticAt_fst`, `analyticAt_snd` | `AnalyticAt 𝕜 id z`, `AnalyticAt 𝕜 fst p`, `AnalyticAt 𝕜 snd p` | Special cases: identity, projections are analytic. |
| `ContinuousLinearEquiv.analyticAt`, `LinearIsometryEquiv.analyticAt` | `AnalyticAt 𝕜 f x` for equivalences | Continuous linear / linear isometry equivalences inherit analyticity from underlying maps. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `fpowerSeries`: formal power series (linear case)
  - `fpowerSeriesBilinear`: formal multilinear series (bilinear case)
  - `hasFPowerSeriesOnBall`, `hasFPowerSeriesAt`: existence of convergent series on ball / at point
  - `analyticAt`, `analyticOn`, `analyticWithinAt`, `analyticOnNhd`: standard analyticity predicates
  - `uncurryBilinear`: reinterpretation of bilinear maps as multilinear

- **Suffixes**:
  - `_bilinear`: bilinear variant of a definition/property
  - `_id`, `_fst`, `_snd`: projections and identity as special cases

- **Aliases**:
  - `analyticWithinOn` (deprecated) → `analyticOn`
  - Same for `*_id`, `*_fst`, `*_snd`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplifying sums, `Finset.sum_range`, `hasSum_zero`, definitions like `fpowerSeries`, `fpowerSeriesBilinear`, etc. |
| `rfl` | Proving definitional equalities (e.g., `uncurryBilinear_apply`, `fpowerSeriesBilinear_apply_*`) |
| `aesop` | Not explicitly used here, but `simp` + `rfl` suffice due to definitional structure |
| `hasSum_nat_add_iff'` | Used to shift summation indices (e.g., from `∑' n, ...` to `∑' n ≥ 2, ...`) |
| `rw`, `apply`, `exact`, `intro`, `cases` | Standard proof scripting |
| `ENNReal.coe_lt_top` | To prove positivity of radius (`r_pos`) in `HasFPowerSeriesOnBall` |
| `radius_eq_top_of_forall_image_add_eq_zero` | Key lemma for proving infinite radius (applied with small `n = 2` or `3`) |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - For linear maps:
    - Define `fpowerSeries` as `f a + f (x - a)` (degree 0 and 1 only).
    - Show radius = `∞` using `radius_eq_top_of_forall_image_add_eq_zero`.
    - Prove convergence using `hasSum_nat_add_iff'` to reduce to finite sums (only degrees 0 and 1 contribute).
    - Conclude analyticity via `hasFPowerSeriesAt → analyticAt`.

  - For bilinear maps:
    - Define `fpowerSeriesBilinear` with nonzero terms only at degrees 0, 1, 2.
    - Show radius = `∞` similarly.
    - Use `hasSum_nat_add_iff'` with shift by 3 (since only first 3 terms matter).
    - Derive analyticity analogously.

  - For special maps (`id`, `fst`, `snd`, equivalences):
    - Reduce to known results: e.g., `id = ContinuousLinearMap.id`, `fst = ContinuousLinearMap.fst`, etc.
    - Apply `analyticAt` lemmas for those.

- **Inductive/recursive structure**: None — all proofs are direct, leveraging finite support of formal series.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Analysis.Analytic.Basic
  ```
  This provides:
  - `AnalyticAt`, `AnalyticOn`, `HasFPowerSeriesAt`, etc.
  - `FormalMultilinearSeries`, `ContinuousMultilinearMap`, `uncurry`, etc.
  - Tools for radius computation (`radius_eq_top_of_forall_image_add_eq_zero`, `hasSum_nat_add_iff'`)

- **Implicit dependencies** (via `NormedSpace`, `NontriviallyNormedField`, etc.):
  - `Mathlib.Analysis.NormedSpace.Basic`
  - `Mathlib.Analysis.Analytic.RadiusOfConvergence`
  - `Mathlib.Algebra.ContinuousMultilinear`

---

#### **Summary**

This file establishes that **continuous linear maps** and **bilinear maps** between normed spaces over a nontrivially normed field are **analytic**, with formal power/multilinear series having **infinite radius of convergence**. The proofs rely on finite support of the series (only low-degree terms nonzero), and standard lemmas about convergence and radius computation. The structure is highly uniform: define series, bound radius, verify convergence, conclude analyticity. The results are foundational for further development of analytic functions in normed spaces (e.g., in complex analysis or infinite-dimensional Lie theory).