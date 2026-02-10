### Technical Brief: Covering Maps in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsEvenlyCovered f x I` | `Prop` | Point `x ∈ X` is *evenly covered* by `f : E → X` with fiber `I` iff `I` is discrete and there exists a trivialization of `f` at `x` with fiber `I`. |
| `IsCoveringMapOn f s` | `Prop` | `f` is a *covering map on* `s ⊆ X` if every `x ∈ s` is evenly covered with fiber `f⁻¹' {x}` (i.e., the fiber over `x`). |
| `IsCoveringMap f` | `Prop` | `f` is a *covering map* if it's a covering map on all of `X` (`Set.univ`). |
| `toTrivialization h` | `Trivialization (f ⁻¹' {x}) f` | Given `h : IsEvenlyCovered f x I`, constructs a trivialization over the *actual* fiber `f⁻¹' {x}` (using `Classical.choose`). |
| `mem_toTrivialization_baseSet h` | `x ∈ h.toTrivialization.baseSet` | Ensures `x` lies in the base set of the constructed trivialization. |
| `continuousAt` | `ContinuousAt f x` | Follows from existence of a trivialization at `x`. |
| `isLocalHomeomorphOn` | `IsLocalHomeomorphOn f (f⁻¹' s)` | A covering map on `s` is a local homeomorphism on its domain over `s`. |
| `continuous`, `isOpenMap`, `isQuotientMap` | `Continuous f`, `IsOpenMap f`, `IsQuotientMap f` (if surjective) | Standard properties of covering maps. |
| `isSeparatedMap` | `IsSeparatedMap f` | Covering maps are separated (diagonal is closed); used for uniqueness of lifts. |
| `eq_of_comp_eq`, `const_of_comp`, `eqOn_of_comp_eqOn`, `constOn_of_comp` | Lift uniqueness / constancy lemmas | Under preconnectedness, maps into the total space are determined by their composition with `f`. |
| `isCoveringMap_iff_isCoveringMapOn_univ` | `IsCoveringMap f ↔ IsCoveringMapOn f Set.univ` | Equivalence between global and “on all of `X`” definitions. |
| `IsFiberBundle.isCoveringMap`, `FiberBundle.isCoveringMap` | `IsCoveringMap f` | Fiber bundles with discrete fiber are covering maps. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate definitions (`IsEvenlyCovered`, `IsCoveringMap`, `IsCoveringMapOn`, `IsLocalHomeomorphOn`, `IsSeparatedMap`, `isOpenMap`, `isQuotientMap`).
  - `to_`: Construction functions (`toTrivialization`).
  - `mem_`: Membership lemmas (`mem_toTrivialization_baseSet`).
  - `continuous_`, `open_`, `quotient_`, `eq_`, `const_`: Property-based naming.

- **Suffixes**:
  - `_on`: Relative version (`IsCoveringMapOn`, `IsLocalHomeomorphOn`).
  - `_at`: Local property at a point (`ContinuousAt`).
  - `_map`: Map-level properties (`isOpenMap`, `isQuotientMap`, `isSeparatedMap`).

- **Fiber-related**:
  - `preimageSingletonHomeomorph`, `fiberHomeomorph`, `Trivialization I f`: Trivializations with fiber `I`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `Classical.choose`, `Classical.choose_spec`: To extract data from existential hypotheses.
- `simp_rw`, `rw`, `rwa`: Rewriting using homogeneity of fibers and trivializations.
- `exact`, `refine`, `intro`, `cases`: Standard proof structure.
- `prod.ext`, `subtype.ext`: Extensionality for products and subtypes.
- `disjoint_left.mpr`, `Set.disjoint_left`: For separation arguments.
- `continuous_fst`, `continuous_snd`, `continuous_id'`, `continuous_const`: Continuity lemmas.
- `isOpen_preimage`, `isOpen_inter`, `isOpen_discrete`: Openness arguments.
- `isLocalHomeomorphOn.mk`, `isCoveringMap.mk`, `IsCoveringMapOn.mk`: Intro rules for definitions.

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Definitions are built from `Trivialization`, `DiscreteTopology`, and `Classical.choice`.
- **Local-to-global reasoning**:
  - Prove local properties (e.g., `ContinuousAt`, `IsLocalHomeomorphOn`) using trivializations.
  - Lift global properties (e.g., `Continuous`, `isOpenMap`) via covering lemmas (`continuous_on_univ`, `isOpenMap_of_isLocalHomeomorph`).
- **Uniqueness via separation**:
  - Use `isSeparatedMap` + `isLocallyInjective` to deduce equality of lifts under preconnectedness.
- **Fiber handling**:
  - Use `preimageSingletonHomeomorph` to relate arbitrary fiber `I` to actual fiber `f⁻¹' {x}`.
  - Discreteness of fibers is essential for openness of singletons and trivialization structure.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Topology.IsLocalHomeomorph
  import Mathlib.Topology.FiberBundle.Basic
  ```
- **Scope**:
  - Topological spaces (`TopologicalSpace`).
  - Trivializations (`Bundle.Trivialization`).
  - Fiber bundles and their total spaces.
  - Discrete topology and continuity properties.
- **Domain**: Algebraic topology / covering space theory in the context of general topology and fiber bundles.

--- 

This module formalizes the foundational theory of covering maps in Lean 4, emphasizing the interplay between local triviality, discrete fibers, and topological structure. It supports both abstract categorical reasoning (via `IsLocalHomeomorph`, `IsSeparatedMap`) and concrete applications (e.g., lift uniqueness, fiber bundle examples).