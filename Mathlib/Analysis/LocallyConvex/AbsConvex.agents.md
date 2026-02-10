### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AbsConvex` | `def AbsConvex (s : Set E) : Prop := Balanced 𝕜 s ∧ Convex ℝ s` | Defines a set as *absolutely convex* (i.e., balanced over `𝕜` and convex over `ℝ`). |
| `absConvexHull` | `def absConvexHull : ClosureOperator (Set E)` | The *absolutely convex hull* — smallest absolutely convex superset of a given set. |
| `closedAbsConvexHull` | `def closedAbsConvexHull : ClosureOperator (Set E)` | The *closed absolutely convex hull* — smallest *closed* absolutely convex superset. |
| `gaugeSeminormFamily` | `def gaugeSeminormFamily : SeminormFamily 𝕜 E (AbsConvexOpenSets 𝕜 E)` | Family of seminorms induced by gauges of open absolutely convex neighborhoods of 0. |
| `absConvexHull_eq_convexHull_balancedHull` | `theorem` | `absConvexHull 𝕜 s = convexHull ℝ (balancedHull 𝕜 s)` | Relates absolutely convex hull to convex hull of balanced hull. |
| `convexHull_union_neg_eq_absConvexHull` | `theorem` | `convexHull ℝ (s ∪ -s) = absConvexHull ℝ s` | Shows absolutely convex hull equals convex hull of `s ∪ -s`. |
| `closedAbsConvexHull_closure_eq_closedAbsConvexHull` | `theorem` | `closedAbsConvexHull 𝕜 (closure s) = closedAbsConvexHull 𝕜 s` | Closed absolutely convex hull is insensitive to taking closure of input set. |
| `with_gaugeSeminormFamily` | `theorem` | `WithSeminorms (gaugeSeminormFamily 𝕜 E)` | Topology of a locally convex space is induced by `gaugeSeminormFamily`. |
| `totallyBounded_absConvexHull` | `theorem` | `TotallyBounded s → TotallyBounded (absConvexHull ℝ s)` | Absolutely convex hull preserves total boundedness. |
| `AbsConvexOpenSets` | `def AbsConvexOpenSets := { s : Set E // (0 : E) ∈ s ∧ IsOpen s ∧ AbsConvex 𝕜 s }` | Type of open absolutely convex sets containing 0. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `absConvexHull_`, `closedAbsConvexHull_`: for hull operators.
  - `balanced_`, `convex_`: for properties or constructions related to balanced/convex sets.
  - `gaugeSeminorm_`: for seminorms derived from gauges.
- **Suffixes**:
  - `_eq_`: equality theorems (e.g., `absConvexHull_eq_convexHull_balancedHull`).
  - `_subset_`, `_mono`: monotonicity or inclusion lemmas.
  - `_iff_`: characterizations via membership or equivalence.
  - `_nhds`, `_basis`: neighborhood basis-related results.
- **Predicates**:
  - `AbsConvex`, `Balanced`, `Convex`: capitalized, unary predicates.
  - `isClosed`, `isOpen`, `absorbent`: boolean-valued properties.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp`, `simp_rw`: simplification and rewriting (especially with `mem_iInter`, `subset_absConvexHull`, etc.)
- `aesop`: automated reasoning for basic logic and arithmetic.
- `ring`, `ring_nf`: algebraic simplification in scalar actions.
- `exact`, `refine`, `apply`: for direct proof construction.
- `rw [← ...]`, `convert`, `subset_antisymm`: for equality proofs via double inclusion.
- `mono`, `gcongr`: for monotonicity goals.
- `nontriviality`, ` positivity`: arithmetic reasoning for scalars.
- `rw [gaugeSeminormFamily_ball]`, `rw [Seminorm.ball_zero_eq]`: specialized rewrites for seminorm/gauge properties.

---

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *closure operator* pattern: define operator via `ofCompletePred`, then prove properties via `closure_*` lemmas.
  - Equality proofs typically use `le_antisymm` with two inclusions.
  - Inclusion proofs often use `*_min` lemmas (e.g., `absConvexHull_min`, `convexHull_min`) to reduce to verifying that a candidate set is absolutely convex (or closed & absolutely convex).
- **Common Patterns**:
  - *Balanced + Convex ⇒ AbsConvex*: split into two parts.
  - *Closure preserves AbsConvex*: use `Balanced.closure`, `Convex.closure`.
  - *Neighborhood basis*: construct basis from absolutely convex neighborhoods using `LocallyConvexSpace.convex_basis_zero`.
  - *Seminorm topology*: show basis of neighborhoods matches those from `gaugeSeminormFamily`.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.LocallyConvex.BalancedCoreHull` | Tools for balanced cores/hulls. |
| `Mathlib.Analysis.LocallyConvex.WithSeminorms` | Framework for seminorm-induced topologies. |
| `Mathlib.Analysis.Convex.Gauge` | Gauge function and its properties (e.g., `gaugeSeminorm`). |
| `Mathlib.Analysis.Convex.TotallyBounded` | Total boundedness results for convex hulls. |

**Key typeclass assumptions**:
- `SeminormedRing 𝕜`, `SMul 𝕜 E`, `SMul ℝ E`, `AddCommMonoid E`
- `NontriviallyNormedField 𝕜`, `LocallyConvexSpace ℝ E`, `ContinuousSMul 𝕜 E`
- `SMulCommClass ℝ 𝕜 E`, `IsScalarTower ℝ 𝕜 E` (for compatibility of scalar actions)

---

### Summary

This file formalizes the theory of *absolutely convex* (a.k.a. *disked*) sets in topological vector spaces, emphasizing their role in locally convex topology. It introduces hull operators, relates them to convex/balanced hulls, and shows how the topology of a locally convex space can be recovered from the family of seminorms induced by gauges of absolutely convex neighborhoods of zero. The formalization carefully handles the mismatch between `OrderedSemiring` (for convexity) and `SeminormedRing` (for balancedness) by working over `ℝ` and `𝕜` separately with compatibility assumptions.