Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: ω-Limits in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `omegaLimit` | `[TopologicalSpace β] → Filter τ → (τ → α → β) → Set α → Set β` | Defines the ω-limit of a set `s` under a flow-like map `ϕ` w.r.t. filter `f`: `⋂ u ∈ f, closure (image2 ϕ u s)` |
| `ω`, `ω⁺`, `ω⁻` | Notation scopes for `omegaLimit`, `omegaLimit Filter.atTop`, `omegaLimit Filter.atBot` | Localized notations for ω-limit w.r.t. general, forward, and backward filters |
| `mem_omegaLimit_iff_frequently` | `y ∈ ω f ϕ s ↔ ∀ n ∈ 𝓝 y, ∃ᶠ t in f, (s ∩ ϕ t ⁻¹' n).Nonempty` | Characterizes membership in ω-limit via frequent preimage intersections with neighborhoods |
| `mem_omegaLimit_iff_frequently₂` | `y ∈ ω f ϕ s ↔ ∀ n ∈ 𝓝 y, ∃ᶠ t in f, (ϕ t '' s ∩ n).Nonempty` | Equivalent formulation using forward images intersecting neighborhoods |
| `mem_omegaLimit_singleton_iff_map_cluster_point` | `y ∈ ω f ϕ {x} ↔ MapClusterPt y f (t ↦ ϕ t x)` | Connects ω-limit of a point to cluster points of its orbit |
| `isClosed_omegaLimit` | `IsClosed (ω f ϕ s)` | ω-limit is always a closed set |
| `omegaLimit_mono_left/right` | Monotonicity in filter and set arguments | `f₁ ≤ f₂ ⇒ ω f₁ ϕ s ⊆ ω f₂ ϕ s`, `s₁ ⊆ s₂ ⇒ ω f ϕ s₁ ⊆ ω f ϕ s₂` |
| `omegaLimit_union` | `ω f ϕ (s₁ ∪ s₂) = ω f ϕ s₁ ∪ ω f ϕ s₂` | ω-limit distributes over finite unions |
| `omegaLimit_inter` / `iInter` | Subset versions for intersections | `ω f ϕ (s₁ ∩ s₂) ⊆ ω f ϕ s₁ ∩ ω f ϕ s₂`, etc. |
| `mapsTo_omegaLimit` | `MapsTo ga s s' ⇒ (∀ t x, gb(ϕ t x) = ϕ' t(ga x)) ⇒ Continuous gb ⇒ MapsTo gb (ω f ϕ s) (ω f ϕ' s')` | Functoriality of ω-limit under continuous conjugacies |
| `nonempty_omegaLimit` | `[CompactSpace β] [NeBot f] → s.Nonempty → (ω f ϕ s).Nonempty` | Nonemptiness of ω-limit under compactness and nontrivial filter |
| `isInvariant_omegaLimit` | `∀ t, Tendsto (t + ·) f f ⇒ IsInvariant ϕ (ω f ϕ s)` | ω-limit is invariant under the flow when the flow preserves the filter |
| `omegaLimit_image_eq` (group case) | `∀ t, Tendsto (· + t) f f ⇒ ω f ϕ (ϕ t '' s) = ω f ϕ s` | In group flows, ω-limit is invariant under forward images |
| `omegaLimit_omegaLimit` | `∀ t, Tendsto (t + ·) f f ⇒ ω f ϕ (ω f ϕ s) ⊆ ω f ϕ s` | ω-limit of the ω-limit is contained in the original ω-limit (idempotent-like behavior) |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `omegaLimit_`: Main definitions and properties (e.g., `omegaLimit_def`, `omegaLimit_mono_left`)
  - `mem_omegaLimit_`: Membership characterizations (e.g., `mem_omegaLimit_iff_frequently`)
  - `isInvariant_`, `isClosed_`, `nonempty_`: Properties of sets (e.g., `isClosed_omegaLimit`)
  - `mapsTo_`: Maps-to / functoriality lemmas (e.g., `mapsTo_omegaLimit`)
  - `eventually_`: Asymptotic behavior under compactness assumptions (e.g., `eventually_closure_subset_of_isOpen_of_omegaLimit_subset`)

- **Suffixes**:
  - `_def`: Definition lemmas (`rfl`-based)
  - `_iff`: Logical equivalences (↔)
  - `_mono`: Monotonicity lemmas
  - `_subset`: Subset inclusions
  - `_eq`: Equality lemmas
  - `_image`, `_preimage`: Behavior under image/preimage operations
  - `_invariant`, `_cluster_point`: Dynamical-system-specific properties

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: Rewriting with simplification (especially for `frequently`, `mem_closure`, `nhds`)
- `intro`, `exact`, `refine`, `apply`: Basic proof construction
- `mono`: Monotonicity reasoning (e.g., for closure, image, preimage)
- `rw [← ...]`, `rwa`: Rewriting with reversals or assumptions
- `rcases`, `cases'`: Case analysis on existential/universal hypotheses
- `ext`: Extensionality for set equality
- `apply funext`, `funext`: For function extensionality
- `filter_upwards`, `mem_of_superset`: Filter-specific reasoning
- `isClosed_closure`, `isClosed_iInter`, `isCompact.univ`: Library lemmas for topology
- `Subset.antisymm`: Proving set equality via double inclusion
- `tactic.monotonicity` (imported): For monotonicity goals (e.g., `mono` tactic)

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a **two-step pattern**:  
    1. Reduce to a simpler form using `simp_rw` or definitions (e.g., `omegaLimit_def`, `frequently_iff`, `mem_closure_iff_nhds`)  
    2. Apply topological/dynamical properties (e.g., continuity, compactness, filter monotonicity)
  - **Membership proofs** (`mem_omegaLimit_iff_*`) often use:
    - `frequently_iff` ↔ `nhds` ↔ `closure` equivalences
    - Interchange of quantifiers and intersections/unions
  - **Invariance proofs** use:
    - `Tendsto`-based change-of-variables (`omegaLimit_subset_of_tendsto`)
    - Conjugacy conditions (`mapsTo_omegaLimit`)
  - **Compactness arguments** (e.g., `eventually_closure_subset_*`) use:
    - Finite subcover extraction (`elim_finite_subcover_image`)
    - Open/closed complement reasoning (`diff_compl`, `compl_subset_compl`)
  - **Idempotence-like properties** (`omegaLimit_omegaLimit`) use:
    - Cluster point definitions
    - Neighborhood refinement and intersection arguments

---

#### **5. Imports & Dependencies**

- **Core imports**:
  - `Mathlib.Dynamics.Flow`: Provides `Flow` typeclass and related dynamics infrastructure
  - `Mathlib.Tactic.Monotonicity`: Supplies `mono` tactic and monotonicity lemmas

- **Key underlying libraries used**:
  - `Set`, `Function`, `Filter`, `Topology`: Basic set/filter/topology infrastructure
  - `TopologicalSpace`, `Continuous`, `Closure`, `Neighborhood`, `CompactSpace`, `T2Space`: Topological properties
  - `AddMonoid`, `AddCommGroup`, `TopologicalAddGroup`, `ContinuousAdd`: Algebraic + topological structure on time domain `τ`

- **Assumptions**:
  - `β` is a topological space (often compact, Hausdorff)
  - `τ` is a time domain with additive structure (monoid, group, topological)
  - `ϕ` behaves like a flow (e.g., `Flow τ α`, `ContinuousAdd`, `map_add`)

---

Let me know if you'd like a dependency graph, usage examples, or a summary of how this fits into the broader `Mathlib` dynamics library.