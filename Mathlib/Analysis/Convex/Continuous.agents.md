### Technical Metadata Brief

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConvexOn.lipschitzOnWith_of_abs_le` | `ConvexOn ℝ (ball x₀ r) f → 0 < ε → (∀ a, dist a x₀ < r → |f a| ≤ M) → LipschitzOnWith (2 * M / ε).toNNReal f (ball x₀ (r - ε))` | Shows convex functions on a ball are locally Lipschitz if bounded in absolute value. |
| `ConcaveOn.lipschitzOnWith_of_abs_le` | Analogous to above for concave functions | Derived via negation: `hf.neg.lipschitzOnWith_of_abs_le`. |
| `ConvexOn.exists_lipschitzOnWith_of_isBounded` | `ConvexOn ℝ (ball x₀ r) f → r' < r → IsBounded (f '' ball x₀ r) → ∃ K, LipschitzOnWith K f (ball x₀ r')` | Extends local Lipschitzness from bounded image on a ball to any smaller ball. |
| `ConvexOn.isBoundedUnder_abs` | `ConvexOn ℝ C f → C ∈ 𝓝 x₀ → (𝓝 x₀).IsBoundedUnder (· ≤ ·) |f| ↔ (𝓝 x₀).IsBoundedUnder (· ≤ ·) f` | Equivalence of boundedness of `f` and `|f|` near a point in the interior of a convex domain. |
| `ConvexOn.continuousOn_tfae` | `IsOpen C → C.Nonempty → ConvexOn ℝ C f → TFAE [...]` | Central equivalence chain: local Lipschitz ⇔ continuous ⇔ continuity at a point ⇔ boundedness conditions. |
| `ConvexOn.locallyLipschitzOn` | `[FiniteDimensional ℝ E] → IsOpen C → ConvexOn ℝ C f → LocallyLipschitzOn C f` | Main result: convex functions on open convex subsets of finite-dimensional normed spaces are locally Lipschitz. |
| `ConvexOn.continuousOn` | `IsOpen C → ConvexOn ℝ C f → ContinuousOn f C` | Immediate corollary: convex functions on open sets are continuous. |
| `ConvexOn.locallyLipschitzOn_interior` / `continuousOn_interior` | `ConvexOn ℝ C f → LocallyLipschitzOn (interior C) f` / `ContinuousOn f (interior C)` | Extends regularity to the interior of the domain, even if not open. |
| `ConvexOn.locallyLipschitz` | `ConvexOn ℝ univ f → LocallyLipschitz f` | Global version on the whole space. |

Similar lemmas exist for **concave** functions, often via reduction to convex via negation (`hf.neg`).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ConvexOn.` / `ConcaveOn.`: Module prefixes for lemmas about convex/concave functions.
  - `lipschitzOnWith_`: For Lipschitz continuity lemmas.
  - `isBoundedUnder_`: For boundedness under filters.
  - `continuousOn_`: For continuity results.
  - `locallyLipschitzOn_`: For local Lipschitz regularity.

- **Suffixes**:
  - `_of_abs_le`: When boundedness is given in terms of `|f| ≤ M`.
  - `_of_isBounded`: When boundedness of the image set is assumed.
  - `_tfae`: For “together the following are equivalent” lemmas.
  - `_iff_`: For biconditional characterizations.

- **Variables**:
  - `x₀`, `r`, `ε`, `M`, `K`: Standard analysis notation.
  - `C`: Convex domain.
  - `f`: Function under study.
  - `E`: Normed space.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp_rw`, `field_simp`, `ring`, `abel`, `norm_num`
  - `gcongr`, `linarith`, ` positivity`, `exact`, `refine`, `convert`
  - `tfae_have`, `tfae_finish`: For TFAE proofs.
  - `filter_upwards`, `eventually_mem`, `mem_nhds_iff`, `Metric.eventually_nhds_iff`
  - `rw [← ...]`, `rwa`, `cancel_denoms`, `simp only`

- **Advanced/Domain-specific**:
  - `convexHull`, `affineBasis`, `finite_range`, `bddAbove`, `interior`, `intrinsicInterior` (commented)
  - `tendsto_nhds_nhds`, `Filter.eventually_map`, `BddAbove.isBoundedUnder`

---

#### **4. Proof Logic**

- **Structure**:
  - **Induction/Case analysis** on equality (`eq_or_ne x y`) or emptiness (`eq_empty_or_nonempty`).
  - **Geometric constructions**: e.g., defining `z = x + (ε / ‖x - y‖) • (x - y)` to extend a segment beyond `x`.
  - **Convex combinations**: Using `a = ε / (ε + ‖x - y‖)`, `b = ‖x - y‖ / (ε + ‖x - y‖)` to express `x` as a convex combo of `y, z`.
  - **Filter-based reasoning**: Boundedness under neighborhoods, TFAE chains, and continuity via local Lipschitz.
  - **Reduction via symmetry/negation**: Concave results often follow from convex ones by applying `hf.neg`.

- **Key logical flow**:
  1. **Boundedness ⇒ Lipschitz** on smaller balls (`lipschitzOnWith_of_abs_le`).
  2. **Bounded image ⇒ boundedness condition** (`exists_lipschitzOnWith_of_isBounded`).
  3. **Boundedness ⇒ continuity** via TFAE chain (`continuousOn_tfae`).
  4. **Finite-dimensional case**: Use existence of interior points via `exists_mem_interior_convexHull_affineBasis` to bootstrap global regularity.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.Analysis.Convex.Normed
  ```
  - Provides foundational definitions: `ConvexOn`, `ConcaveOn`, `LipschitzOnWith`, `Ball`, `dist`, `norm`, etc.

- **Open scopes & locals**:
  - `open FiniteDimensional Metric Set List Bornology`
  - `open scoped Topology`
  - Indicates heavy use of topology, metric space, and bornology structures.

- **Implicit assumptions**:
  - `[NormedAddCommGroup E] [NormedSpace ℝ E]`: `E` is a real normed space.
  - `[FiniteDimensional ℝ E]`: For the main continuity result (finite-dimensional case).

---

### Summary

This file formalizes the classical result that **convex (and concave) functions on open convex subsets of finite-dimensional real normed spaces are locally Lipschitz, hence continuous**. The proof leverages geometric convexity arguments, filter-theoretic boundedness, and a rich tactic stack to bridge regularity conditions (Lipschitz, continuous, bounded). The structure is modular, with many lemmas reusable for related results (e.g., on interiors, intrinsic interiors — partially commented out).