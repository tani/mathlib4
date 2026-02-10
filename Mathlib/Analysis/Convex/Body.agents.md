### Technical Metadata Brief: `Mathlib.Analysis.Convex.ConvexBody`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConvexBody V` | `structure` | Defines a convex body as a subset of a real topological vector space `V` that is convex, compact, and nonempty. |
| `carrier` | `K.carrier : Set V` | Underlying set of a convex body `K`. |
| `convex'`, `isCompact'`, `nonempty'` | `K.convex' : Convex ℝ carrier`, etc. | Structural properties of the carrier set. |
| `SetLike (ConvexBody V) V` | `instance` | Enables coercion `↑K : Set V`. |
| `ext` | `{K L : ConvexBody V} → (↑K = ↑L) → K = L` | Extensionality: equal carrier sets imply equal bodies. |
| `zero` | `0 : ConvexBody V` | Zero element: singleton `{0}`. |
| `add` | `K + L : ConvexBody V` | Minkowski sum of convex bodies. |
| `smul` | `c • K : ConvexBody V` | Scalar multiplication by `c : ℝ` (or `ℝ≥0`). |
| `AddMonoid`, `AddCommMonoid`, `Module ℝ≥0` | `instance` | Algebraic structure on `ConvexBody V`. |
| `PseudoMetricSpace (ConvexBody V)` | `instance` | Pseudo-metric structure via Hausdorff distance (requires seminormed space). |
| `MetricSpace (ConvexBody V)` | `instance` | Metric space structure when `V` is normed (Hausdorff distance separates points). |
| `hausdorffDist_coe` | `dist K L = hausdorffDist (↑K) ↑L` | Relates `dist` on `ConvexBody V` to ambient Hausdorff distance. |
| `iInter_smul_eq_self` | `⋂ n, (1 + u n) • K = K` | Intersection of shrinking dilations of `K` (with `0 ∈ K`) equals `K`. |

---

#### **2. Naming Conventions**

- **Structure fields**: `'` suffix (e.g., `convex'`, `isCompact'`, `nonempty'`) — standard in Lean for structure projections.
- **Properties**: `is_`, `convex`, `nonempty`, `isBounded`, `isClosed`, `isCompact`.
- **Coercion lemmas**: `coe_` prefix (e.g., `coe_zero`, `coe_add`, `coe_smul`, `coe_nsmul`) — relate coercion to operations.
- **Simp lemmas**: Often marked `@[simp]` and named `coe_*`, `hausdorffDist_coe`, `hausdorffEdist_coe`.
- **Algebraic instances**: `AddMonoid`, `AddCommMonoid`, `DistribMulAction`, `Module`.
- **Metric properties**: `PseudoMetricSpace`, `MetricSpace`, `dist`, `edist`, `hausdorffDist`, `hausdorffEdist`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and instance constructions:

| Tactic | Usage |
|--------|-------|
| `rfl` | Reflexivity for definitional equalities (e.g., `coe_mk`, `coe_zero`). |
| `simp` / `simp_rw` | Simplification of coercions, set operations, and scalar actions. |
| `ext` / `ext x` | Extensionality for sets or functions. |
| `cases` | Destructuring of structures (e.g., `cases K`, `cases L`). |
| `congr` | Congruence for equality of structures. |
| `field_simp`, `ring`, `linarith` | Arithmetic simplifications (e.g., in `zero_mem_of_symmetric`). |
| `apply_rules` | Rule application for existence proofs (e.g., `hausdorffEdist_ne_top`). |
| `rw [← SetLike.coe_subset_coe]` | Coercion-based subset reasoning. |
| `exact`, `refine`, `intro`, `obtain`, `have`, `specialize` | Standard proof scripting. |
| ` positivity` | For verifying positivity of expressions. |

---

#### **4. Proof Logic & Strategy**

- **Structure proofs**: Use `ext` + `SetLike.ext'` to reduce equality of convex bodies to equality of carrier sets.
- **Algebraic structure proofs**: Leverage `SetLike.coe_injective.*` to lift algebraic instances from sets to convex bodies (e.g., `AddMonoid`, `Module`).
- **Metric properties**: Use known results about Hausdorff distance (`Metric.hausdorDist_*`) and lift them via ` hausdorffDist_coe`.
- **Compactness arguments**: Use `isCompact` → `isClosed`, `isBounded`, and properties like `hausdorffDist_zero_iff_eq`.
- **Dilation intersection proofs**: Combine:
  - `closure_eq` (for closed sets),
  - characterization of closure via nets/sequences,
  - boundedness to control norms,
  - continuity of scalar multiplication.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Analysis.Convex.Basic`
- `Mathlib.Analysis.Normed.Module.Basic`
- `Mathlib.Topology.MetricSpace.HausdorffDistance`

**Key Scope Extensions**:
- `open scoped Pointwise Topology NNReal`
  - Enables notation like `a • K`, `K + L`, `0`, `n • K`, and coercion from `ℝ≥0`.

**Assumptions per Section**:
- `TVS`: `TopologicalSpace V`, `AddCommGroup V`, `Module ℝ V`, `ContinuousAdd`, `ContinuousSMul ℝ V`
- `SeminormedAddCommGroup`: `SeminormedAddCommGroup V`, `NormedSpace ℝ V`
- `NormedAddCommGroup`: `NormedAddCommGroup V`, `NormedSpace ℝ V`

---

### Summary

This file formalizes **convex bodies** in a real topological vector space as a structured type with:
- **Algebraic structure** over `ℕ`, `ℝ`, and `ℝ≥0`,
- **Metric structure** (pseudo- or full metric) via Hausdorff distance,
- **Topological properties** (compactness, closedness, boundedness),
- **Interaction lemmas** between scalar multiplication, addition, and distance.

It serves as a foundational module for further work in convex geometry, especially in contexts involving geometric analysis and functional analysis.