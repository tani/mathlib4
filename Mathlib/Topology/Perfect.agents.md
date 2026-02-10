### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AccPt.nhds_inter` | `AccPt x (𝓟 C) → U ∈ 𝓝 x → AccPt x (𝓟 (U ∩ C))` | Shows that accumulation points are preserved under intersection with neighborhoods. |
| `Preperfect` | `Set α → Prop` | A predicate for sets where every point is an accumulation point of the set (without requiring closedness). |
| `Perfect` | `Set α → Prop` | A set is perfect if it is closed and preperfect. |
| `PerfectSpace` | `Class` | A topological space is perfect if its universe is a perfect set (i.e., every point is a non-isolated point). |
| `preperfect_iff_nhds` | `Preperfect C ↔ ∀ x ∈ C, ∀ U ∈ 𝓝 x, ∃ y ∈ U ∩ C, y ≠ x` | Equivalence between the filter-based definition of preperfect and a neighborhood-based pointwise condition. |
| `preperfect_iff_perfect_closure` | `[T1Space α] → Preperfect C ↔ Perfect (closure C)` | In T1 spaces, preperfectness is equivalent to having a perfect closure. |
| `Preperfect.perfect_closure` | `Preperfect C → Perfect (closure C)` | Closure of a preperfect set is perfect. |
| `Preperfect.open_inter` | `Preperfect C → IsOpen U → Preperfect (U ∩ C)` | Intersection of a preperfect set with an open set remains preperfect. |
| `Perfect.closure_nhds_inter` | `Perfect C → x ∈ C → x ∈ U → IsOpen U → Perfect (closure (U ∩ C)) ∧ Nonempty (closure (U ∩ C))` | Local refinement: closure of intersection of open neighborhood with perfect set is perfect and nonempty. |
| `Perfect.splitting` | `[T25Space α] → Perfect C → C.Nonempty → ∃ C₀ C₁, ... Disjoint C₀ C₁` | Key inductive step for Cantor-Bendixson analysis: any nonempty perfect set splits into two disjoint nonempty perfect subsets. |
| `IsPreconnected.preperfect_of_nontrivial` | `[T1Space α] → U.Nontrivial → IsPreconnected U → Preperfect U` | Nontrivial preconnected subsets in T1 spaces are preperfect. |
| `exists_countable_union_perfect_of_isClosed` | `[SecondCountableTopology α] → IsClosed C → ∃ V D, V.Countable ∧ Perfect D ∧ C = V ∪ D` | **Cantor-Bendixson Theorem**: closed sets decompose into countable + perfect parts. |
| `exists_perfect_nonempty_of_isClosed_of_not_countable` | `[SecondCountableTopology α] → IsClosed C → ¬C.Countable → ∃ D, Perfect D ∧ D.Nonempty ∧ D ⊆ C` | Uncountable closed sets contain nonempty perfect subsets. |
| `perfectSpace_iff_forall_not_isolated` | `PerfectSpace X ↔ ∀ x, NeBot (𝓝[≠] x)` | Characterization of perfect spaces via non-isolated points. |

---

#### 2. **Naming Conventions**

- **Predicates**:  
  - `Preperfect`, `Perfect`, `PerfectSpace` — capitalized, descriptive.
  - `perfect_def`, `perfectSpace_def` — `mk_iff`-generated lemmas for ↔-equivalent definitions.
- **Properties of sets**:  
  - `open_inter`, `perfect_closure`, `closure_nhds_inter`, `splitting`, `preperfect_of_nontrivial` — verb-object or adjective-noun patterns.
- **Theorems about existence**:  
  - `exists_countable_union_perfect_of_isClosed`, `exists_perfect_nonempty_of_isClosed_of_not_countable` — long descriptive names with conditions in suffix.
- **Helper lemmas**:  
  - `AccPt.nhds_inter`, `preperfect_iff_nhds`, `perfectSpace_iff_forall_not_isolated` — often use `_iff` or `of_` suffixes for equivalences or implications from assumptions.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `simp` / `simp_rw` — for rewriting definitions and simplifying goals.
- `intro`, `rintro`, `rcases`, `cases'` — for destructuring hypotheses and goals.
- `exact`, `apply`, `refine` — for constructing proofs stepwise.
- `by_cases`, `by_contra!` — for case analysis and contradiction arguments.
- `trans`, `apply Set.union_subset_union_right`, `apply closure_mono` — set-theoretic reasoning.
- `countable`-related tactics: `Countable.mono`, `Countable.biUnion`, `Countable.union`.
- `filter`-based reasoning: `rw [AccPt, nhdsWithin, inf_assoc, ...]`, `rw [closure_eq_cluster_pts]`, `rw [frequently_nhdsWithin_iff]`.
- `aesop` is *not* used — proofs are mostly manual and rely on precise filter/set reasoning.

---

#### 4. **Proof Logic**

- **Inductive decomposition**:  
  - `Perfect.splitting` uses T2.5 separation to find disjoint neighborhoods around two distinct points in a perfect set, then takes closures of intersections with the set.
- **Decomposition via basis**:  
  - `exists_countable_union_perfect_of_isClosed` constructs a maximal countable union of basis elements intersected with `C`, then defines the perfect kernel as the complement.
- **Contrapositive + countability arguments**:  
  - Many proofs (e.g., `exists_countable_union_perfect_of_isClosed`) use contradiction to show that if a neighborhood intersected with `C` were countable, it would be included in the countable part — hence the complement must be preperfect.
- **T1/T2.5 assumptions**:  
  - T1 is used to relate preperfectness and perfect closure (`preperfect_iff_perfect_closure`), while T2.5 (Urysohn) is used for splitting via disjoint neighborhoods.

---

#### 5. **Imports**

- `Mathlib.Topology.Separation.Regular` — provides separation axioms (T1, T2.5) and related lemmas.
- `TopologicalSpace`, `Set`, `Filter`, `Topology` — core topology infrastructure.
- Implicitly relies on:
  - `Mathlib.Topology.Basis` (for `SecondCountableTopology`, `IsTopologicalBasis`)
  - `Mathlib.MeasureTheory.Measure.Countable` (for `Countable` typeclass and operations)
  - `Mathlib.Topology.Basic` (for `closure`, `nhds`, `accPt`, etc.)

No metric-specific imports — this file is purely topological. Metric-specific perfect set theory is deferred to `Mathlib.Topology.MetricSpace.Perfect`.

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific theorem.