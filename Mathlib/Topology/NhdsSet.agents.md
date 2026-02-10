### Technical Brief: Neighborhoods of a Set in Lean 4 (`Mathlib.Topology.Basic`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `nhdsSet s` or `𝓝ˢ s` | `Set X → Filter X` | Filter of neighborhoods of a set `s ⊆ X`. Defined as `sSup (image 𝓝 s)`, i.e., the supremum of point neighborhoods over `s`. |
| `mem_nhdsSet_iff_forall` | `s ∈ 𝓝ˢ t ↔ ∀ x ∈ t, s ∈ 𝓝 x` | Characterizes membership in set neighborhoods via pointwise neighborhoods. |
| `subset_interior_iff_mem_nhdsSet` | `s ⊆ interior t ↔ t ∈ 𝓝ˢ s` | Links set inclusion in interior with neighborhood membership. |
| `mem_nhdsSet_iff_exists` | `s ∈ 𝓝ˢ t ↔ ∃ U, IsOpen U ∧ t ⊆ U ∧ U ⊆ s` | Neighborhoods of `t` are exactly those sets containing an open superset of `t`. |
| `hasBasis_nhdsSet s` | `(𝓝ˢ s).HasBasis (λ U ↦ IsOpen U ∧ s ⊆ U) U` | Shows `𝓝ˢ s` has a basis of open supersets of `s`. |
| `nhdsSet_mono` | `s ⊆ t → 𝓝ˢ s ≤ 𝓝ˢ t` | Monotonicity of `𝓝ˢ`. |
| `nhdsSet_union` | `𝓝ˢ (s ∪ t) = 𝓝ˢ s ⊔ 𝓝ˢ t` | Set neighborhoods distribute over finite unions. |
| `nhdsSet_iUnion` | `𝓝ˢ (⋃ i, s i) = ⨆ i, 𝓝ˢ (s i)` | Distributes over arbitrary unions. |
| `nhdsSet_singleton` | `𝓝ˢ {x} = 𝓝 x` | Neighborhood filter of a singleton equals point neighborhood filter. |
| `nhdsSet_empty` | `𝓝ˢ ∅ = ⊥` | Neighborhood filter of empty set is bottom filter. |
| `nhdsSet_univ` | `𝓝ˢ univ = ⊤` | Neighborhood filter of the whole space is top filter. |
| `nhdsSet_inter_le` | `𝓝ˢ (s ∩ t) ≤ 𝓝ˢ s ⊓ 𝓝ˢ t` | Submultiplicativity over intersections (inequality, not equality). |
| `Continuous.tendsto_nhdsSet` | `Continuous f → MapsTo f s t → Tendsto f (𝓝ˢ s) (𝓝ˢ t)` | Continuous maps preserve set neighborhoods. |
| `IsClosed.nhdsSet_le_sup` | `IsClosed t → 𝓝ˢ s ≤ 𝓝ˢ (s ∩ t) ⊔ 𝓟 (tᶜ)` | Decomposition of neighborhoods w.r.t. closed sets. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `nhdsSet_`: for lemmas about `𝓝ˢ`.
  - `eventually_nhdsSet_`: for properties of `∀ᶠ x in 𝓝ˢ s, p x`.
  - `principal_`, `disjoint_`, `interior_`, `union_`, `iUnion_`, `singleton_`, `empty_`, `univ_`: standard topological constructs.
- **Suffixes**:
  - `_iff_`: equivalence characterizations (`mem_nhdsSet_iff_forall`, `subset_interior_iff_mem_nhdsSet`).
  - `_le_`: inequality lemmas (`nhdsSet_inter_le`, `nhdsSet_iInter_le`).
  - `_mono`: monotonicity (`monotone_nhdsSet`).
  - `_self`: membership of a set in its own filter (`IsOpen.mem_nhdsSet_self`).
  - `_eventually`: properties about eventual behavior (`eventually_nhdsSet_iff_forall`, `eventually_nhdsSet_iUnion`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (`nhdsSet`, `mem_nhdsSet_iff_forall`, etc.). |
| `simp` | Simplifying using `@[simp]` lemmas (e.g., `nhdsSet_singleton`, `nhdsSet_empty`). |
| `exact` / `assumption` | Closing goals directly from hypotheses. |
| `apply` / `exact?` | Applying lemmas like `mem_nhdsSet_iff_exists`. |
| `aesop` / `tauto` | For propositional logic and simple set reasoning. |
| `rfl` | Reflexivity for definitional equalities (e.g., `nhdsSet_diagonal`). |
| `sup_le_sup_left`, `sup_le_sup_right`, `le_sup_iff` | Reasoning about supremum of filters. |
| `sSup_le_sSup`, `le_sSup`, `mem_image_of_mem` | Handling `sSup`-based definitions. |
| `preimage` / `preimage_mem_of_continuous` | For continuity-related lemmas. |
| `interior_eq`, `interior_subset`, `isOpen_interior` | Interior-specific simplifications. |

---

#### **4. Proof Logic & Strategy**

- **Characterization proofs** (e.g., `mem_nhdsSet_iff_forall`, `mem_nhdsSet_iff_exists`) typically:
  - Unfold `nhdsSet` as `sSup (image 𝓝 s)`.
  - Use `Filter.mem_sSup`, `forall_mem_image`, and set-theoretic equivalences.
  - Apply `subset_interior_iff_nhds` or `interior_iff_exists_open_subset`.

- **Monotonicity/inclusion proofs** (e.g., `nhdsSet_mono`, `nhdsSet_inter_le`):
  - Use `sSup_le_sSup`, `le_sSup`, `image_subset`, and monotonicity of `image`.
  - For intersections: exploit `inf = ⊓`, `sup = ⊔`, and distributivity over unions.

- **Basis proofs** (e.g., `hasBasis_nhdsSet`):
  - Use `HasBasis` definition: show every neighborhood contains a basis element.
  - Often rely on `mem_nhdsSet_iff_exists`.

- **Continuity arguments** (e.g., `Continuous.tendsto_nhdsSet`):
  - Use `tendsto_iff` + basis characterization.
  - Preimage of open superset of `t` is open superset of `s` due to continuity and `MapsTo`.

- **Closed set decompositions** (e.g., `IsClosed.nhdsSet_le_sup`):
  - Decompose `s = (s ∩ t) ∪ (s ∩ tᶜ)`.
  - Apply `nhdsSet_union`, then bound `𝓝ˢ (s ∩ tᶜ) ≤ 𝓟 (tᶜ)` using `isOpen_compl.nhdsSet_eq`.

---

#### **5. Imports & Scope**

- **Primary Import**: `Mathlib.Topology.Basic`
- **Dependencies**:
  - `TopologicalSpace`, `Filter`, `Set` (core topology & filter infrastructure).
  - `interior`, `closure`, `isOpen`, `IsClosed`, `disjoint`, `principal`, `sSup`, `iSup`, etc.
- **Related Files** (not imported here, but referenced):
  - `Mathlib.Topology.Separation`: contains `strict_mono_nhdsSet`, `injective_nhdsSet` for T₁ spaces.

---

This module formalizes the foundational theory of *set neighborhoods* as a filter, enabling reasoning about neighborhoods of subsets (not just points), crucial for continuity, closure, separation, and convergence in topology.