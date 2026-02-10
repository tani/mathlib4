### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsExposed 𝕜 A B` | `Prop` | States that `B ⊆ A` is the set of maximizers of some continuous linear functional `l : E →L[𝕜] 𝕜` over `A`. |
| `ContinuousLinearMap.toExposed l A` | `Set E` | Constructs the set `{ x ∈ A | ∀ y ∈ A, l y ≤ l x }`, i.e., the maximizers of `l` over `A`. |
| `Set.exposedPoints A` | `Set E` | The set of points `x ∈ A` such that `{x}` is an exposed subset of `A`; equivalently, points uniquely maximizing some continuous linear functional. |
| `IsExposed.subset` | `B ⊆ A` | Any exposed subset is contained in the ambient set. |
| `IsExposed.refl` | `IsExposed 𝕜 A A` | Every set is exposed with respect to itself (via zero functional). |
| `IsExposed.antisymm` | `A = B` if both are exposed subsets of each other. |
| `IsExposed.inter` | `IsExposed 𝕜 A (B ∩ C)` if `B, C` are exposed subsets of `A` (requires `ContinuousAdd 𝕜`). |
| `IsExposed.isClosed` | `IsClosed B` if `A` is closed and `B` is exposed in `A` (requires `OrderClosedTopology 𝕜`). |
| `IsExposed.isCompact` | `IsCompact B` if `A` is compact and `B` is exposed in `A` (requires `OrderClosedTopology 𝕜`, `T2Space E`). |
| `IsExposed.convex` | `Convex 𝕜 B` if `A` is convex and `B` is exposed in `A`. |
| `IsExposed.isExtreme` | `IsExtreme 𝕜 A B` | Every exposed subset is extreme. |
| `mem_exposedPoints_iff_exposed_singleton` | `x ∈ A.exposedPoints 𝕜 ↔ IsExposed 𝕜 A {x}` | Exposed points correspond exactly to exposed singletons. |
| `exposedPoints_subset_extremePoints` | `A.exposedPoints 𝕜 ⊆ A.extremePoints 𝕜` | Every exposed point is extreme. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate definitions (`IsExposed`, `isExtreme`, `isClosed`, `isCompact`).
  - `to_`: Constructions from structures to objects (`toExposed`, likely `toLinearMap`).
  - `exposedPoints`: Set of exposed points.

- **Suffixes**:
  - `'` (prime): Variant of a theorem, often weaker or requiring extra assumptions (`eq_inter_halfSpace'`, `eq_inter_halfSpace`).
  - `mono`, `inter`, `convex`, `isExtreme`: Descriptive suffixes indicating properties or operations preserved.

- **Functional style**:
  - `l.toExposed A`: Functional `l` applied to `A`.
  - `hAB.subset`, `hAB.refl`, etc.: Method-style access to properties of `hAB : IsExposed _ _ _`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rintro` / `intro` | Introducing hypotheses and destructing conjunctions/existentials. |
| `obtain ⟨l, rfl⟩ := hAB hB` | Extracting witness from `IsExposed` definition. |
| `apply Subset.antisymm` | Proving equality of sets via double inclusion. |
| `rw [ContinuousLinearMap.zero_apply]` | Rewriting using properties of linear maps. |
| `simp`, `simp only`, `simp_rw` | Simplifying goals using definitional equalities. |
| `exact`, `refine`, `exact?` | Finishing or partially constructing proofs. |
| `contradiction`, `exfalso` | Handling contradictions and empty cases. |
| `have`, `set`, `let` | Introducing intermediate facts or definitions. |
| `add_le_add_iff_left/right`, `le_trans`, `antisymm` | Arithmetic and order reasoning. |
| `convexOn`, `concaveOn`, `convex_ge` | Convex analysis lemmas (used in `convex` proof). |

---

#### 4. **Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *constructive pattern*:  
    `intros → destruct hypothesis → extract functional witness → construct/set up equality via subset antisymmetry → verify maximality condition`.
  - **Case analysis** on `B.eq_empty_or_nonempty` is common (e.g., in `eq_inter_halfSpace'`, `eq_inter_halfSpace`, `convex`, `isClosed`).
  - **Induction** used for finite intersections (`Finset.induction` in `sInter`).
  - **Leveraging existing lemmas**:
    - `convexOn`, `concaveOn`, `isClosed_le`, `of_isClosed_subset`, etc., from analysis/topology libraries.
    - `mem_exposedPoints_iff_exposed_singleton` bridges point-level and set-level definitions.

- **Key logical flow**:
  1. Assume nonemptiness (or handle emptiness separately).
  2. Extract functional `l` from `IsExposed` hypothesis.
  3. Show inclusion both ways using maximality condition.
  4. Use continuity, linearity, and order properties of `l` and `𝕜`.

---

#### 5. **Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Extreme` | Defines extreme sets/points; used for comparison (`isExtreme`). |
| `Mathlib.Analysis.Convex.Function` | Convex/concave function theory (e.g., `convexOn`, `concaveOn`). |
| `Mathlib.Topology.Algebra.Module.LinearMap` | Continuous linear maps (`→L[𝕜]`), topology on module. |
| `Mathlib.Topology.Order.OrderClosed` | `OrderClosedTopology` assumption for closedness/compactness results. |

- **Scope**:
  - Real vector spaces (via `OrderedRing`, `LinearOrderedRing`, `Module 𝕜 E`).
  - Topological vector spaces (via `TopologicalSpace E`, `ContinuousAdd`, `T2Space`).
  - Convex geometry in topological vector spaces.

- **Assumptions**:
  - `𝕜` is a topological semiring/ring with preorder/order.
  - `E` is a topological module over `𝕜`.
  - For compactness/closedness: `OrderClosedTopology 𝕜`, `T2Space E`.
  - For finite intersections: `ContinuousAdd 𝕜`.

--- 

Let me know if you'd like a diagram of the relationships (e.g., exposed ⊂ extreme ⊂ ...), or a summary of how this fits into the broader convex geometry library.