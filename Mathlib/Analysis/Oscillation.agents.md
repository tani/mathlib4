### Technical Brief: Oscillation in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `oscillation` | `[TopologicalSpace E] → (E → F) → E → ENNReal` | Defines the oscillation of `f` at `x` as the infimum of diameters of images of neighborhoods of `x`. |
| `oscillationWithin` | `[TopologicalSpace E] → (E → F) → Set E → E → ENNReal` | Oscillation of `f` at `x` *within* a subset `D`, using neighborhoods relative to `D`. |
| `oscillationWithin_nhd_eq_oscillation` | `(D ∈ 𝓝 x) → oscillationWithin f D x = oscillation f x` | Shows that if `D` is a neighborhood of `x`, then oscillation within `D` equals full oscillation. |
| `oscillationWithin_univ_eq_oscillation` | `oscillationWithin f univ x = oscillation f x` | Special case of above with `D = univ`. |
| `ContinuousWithinAt.oscillationWithin_eq_zero` | `ContinuousWithinAt f D x → oscillationWithin f D x = 0` | Oscillation vanishes at points where `f` is continuous *within* `D`. |
| `ContinuousAt.oscillation_eq_zero` | `ContinuousAt f x → oscillation f x = 0` | Oscillation vanishes at points where `f` is continuous. |
| `OscillationWithin.eq_zero_iff_continuousWithinAt` | `(x ∈ D) → oscillationWithin f D x = 0 ↔ ContinuousWithinAt f D x` | Characterizes continuity within a set via vanishing oscillation. |
| `Oscillation.eq_zero_iff_continuousAt` | `oscillation f x = 0 ↔ ContinuousAt f x` | Core equivalence: continuity ⇔ zero oscillation. |
| `IsCompact.uniform_oscillationWithin` | `IsCompact K → (∀ x ∈ K, oscillationWithin f D x < ε) → ∃ δ > 0, ∀ x ∈ K, diam(f '' (ball x δ ∩ D)) ≤ ε` | Uniform control of oscillation on compact sets ⇒ uniform δ for all points in `K`. |
| `IsCompact.uniform_oscillation` | `IsCompact K → (∀ x ∈ K, oscillation f x < ε) → ∃ δ > 0, ∀ x ∈ K, diam(f '' (ball x δ)) ≤ ε` | Special case of above for full oscillation (i.e., `D = univ`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `oscillation` / `oscillationWithin`: core definitions.
  - `uniform_`: for uniform versions over compact sets.
- **Suffixes**:
  - `_eq_zero`: theorems stating oscillation is zero under continuity assumptions.
  - `eq_zero_iff_`: characterizations of continuity via oscillation = 0.
  - `_nhd_eq_oscillation`: equivalence when restricting to a neighborhood.
- **Structure**:
  - `ContinuousWithinAt`, `ContinuousAt`, `OscillationWithin`, `Oscillation`, `IsCompact`: namespaces grouping related lemmas.
  - `mem_nhdsWithin_iff`, `ball_mem_nhds`, `edist_le_diam_of_mem`: helper lemmas using standard Mathlib patterns.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp_rw`: rewriting definitions and equivalences.
- `exact`, `refine`, `apply`: constructing proofs via lemmas.
- `le_antisymm`: proving equality of ENNReals via double inequality.
- `biInf_le`, `iInf_lt_iff`: manipulating infima over filters.
- `mem_of_superset`, `subset_trans`: set-theoretic reasoning.
- `diam_mono`, `image_mono`: monotonicity of diameter and image.
- `edist_triangle`, `lt_of_le_of_lt`, `lt_of_lt_of_eq`: basic ENNReal/EMetric reasoning.
- `ofReal_toReal_le`, `coe_le_coe`, `Real.toNNReal_mono`: conversions between `ℝ` and `ENNReal`.
- `isOpen_iff.mpr`, `mem_iUnion`, `exists_prop`: topology/filter manipulations.
- `by_cases`, `convert`, `exact inter_univ _`: case splits and simplifications.

---

#### **4. Proof Logic**

- **Continuity ⇔ Zero Oscillation**:
  - One direction uses continuity to find a ball where `f` stays within `ε/2`, bounding the diameter.
  - The other direction uses the definition of oscillation = 0 to extract a neighborhood where the image has small diameter, then applies EMetric characterization of continuity (`EMetric.tendsto_nhds`).
- **Uniform Oscillation over Compact Sets**:
  - Constructs an open cover `S r` where each point has a ball of radius `r` with oscillation ≤ `ε`.
  - Uses compactness to extract a finite subcover.
  - Takes minimal radius from finite set (via `isWF.min`) to get uniform `δ`.
- **General Strategy**:
  - Reduce to known lemmas (e.g., `continuousWithinAt_univ`, `oscillationWithin_univ_eq_oscillation`).
  - Use filter-based definitions (`nhds`, `nhdsWithin`, `map`, `iInf`) to reason about local behavior.
  - Leverage EMetric space structure (`edist`, `ball`, `diam`) for quantitative control.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Data.ENNReal.Real`: extended non-negative reals and their relation to `ℝ`.
  - `Mathlib.Order.WellFoundedSet`: used for minimal element extraction in compactness arguments (`isWF.min`).
  - `Mathlib.Topology.EMetricSpace.Diam`: diameter in pseudo-EMetric spaces.

- **Domain Scope**:
  - Topological spaces (`TopologicalSpace E`)
  - Pseudo-EMetric spaces (`PseudoEMetricSpace F`)
  - Subsets, neighborhoods, continuity (within/at), compactness.

- **Notable Features**:
  - Noncomputable definitions (oscillation is defined via infimum over possibly infinite sets).
  - Use of `ENNReal` to handle infinite oscillation (e.g., discontinuities).
  - Full equivalence between analytic (ε-δ) and topological (filter-based) continuity.

--- 

Let me know if you'd like a diagram of the logical dependencies or a formalization roadmap for extending this module.