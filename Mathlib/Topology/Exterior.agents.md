### Technical Metadata Brief: `exterior` Operation in Lean 4 / Mathlib

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `exterior` | `exterior s = ⋂₀ {t : Set X | IsOpen t ∧ s ⊆ t}` | Defines the *exterior* of a set `s` as the intersection of all open supersets of `s`. |
| `exterior_singleton_eq_ker_nhds` | `exterior {x} = (𝓝 x).ker` | Relates exterior of a singleton to the kernel of the neighborhood filter at `x`. |
| `mem_exterior_singleton` | `x ∈ exterior {y} ↔ x ⤳ y` | Connects membership in `exterior {y}` to the *specializes* relation (`⤳`), i.e., `x` is in the closure of `{y}` under the specialization preorder. |
| `mem_exterior` | `x ∈ exterior s ↔ ∀ U, IsOpen U → s ⊆ U → x ∈ U` | Characterizes membership in `exterior s` via open neighborhoods. |
| `subset_exterior_iff` | `s ⊆ exterior t ↔ ∀ U, IsOpen U → t ⊆ U → s ⊆ U` | Reformulates subset relation into universal quantification over open supersets. |
| `subset_exterior` | `s ⊆ exterior s` | Reflexivity of `exterior`: every set is contained in its exterior. |
| `exterior_minimal` | `s ⊆ t → IsOpen t → exterior s ⊆ t` | Minimality of `exterior s`: it's the smallest open superset of `s`. |
| `IsOpen.exterior_eq` | `IsOpen s → exterior s = s` | `exterior` fixes open sets. |
| `IsOpen.exterior_subset` | `IsOpen t → exterior s ⊆ t ↔ s ⊆ t` | Characterizes inclusion into an open set via `exterior`. |
| `exterior_iUnion`, `exterior_union`, `exterior_sUnion` | `exterior (⋃ i, s i) = ⋃ i, exterior (s i)` etc. | `exterior` preserves arbitrary unions (i.e., is *cocontinuous*). |
| `mem_exterior_iff_specializes` | `x ∈ exterior s ↔ ∃ y ∈ s, x ⤳ y` | Global characterization: `x` is in `exterior s` iff it specializes to some point in `s`. |
| `exterior_mono` | `Monotone exterior` | `exterior` is monotone w.r.t. inclusion. |
| `exterior_subset_exterior_iff_nhdsSet` | `exterior s ⊆ exterior t ↔ 𝓝ˢ s ≤ 𝓝ˢ t` | Links inclusion of exteriors to inclusion of neighborhood filters of sets. |
| `exterior_eq_exterior_iff_nhdsSet` | `exterior s = exterior t ↔ 𝓝ˢ s = 𝓝ˢ t` | Equality of exteriors ↔ equality of set neighborhood filters. |
| `specializes_iff_exterior_subset` | `x ⤳ y ↔ exterior {x} ⊆ exterior {y}` | Specialization preorder is reflected by inclusion of exteriors of singletons. |
| `exterior_iInter_subset`, `exterior_inter_subset`, `exterior_sInter_subset` | `exterior (⋂ i, s i) ⊆ ⋂ i, exterior (s i)` etc. | `exterior` reverses intersections (only inclusion, not equality in general). |
| `exterior_empty`, `exterior_univ` | `exterior ∅ = ∅`, `exterior univ = univ` | Extremal cases. |
| `exterior_eq_empty` | `exterior s = ∅ ↔ s = ∅` | Exterior is empty only for empty set. |
| `nhdsSet_exterior` | `𝓝ˢ (exterior s) = 𝓝ˢ s` | Neighborhood filter of a set equals that of its exterior. |
| `exterior_exterior` | `exterior (exterior s) = exterior s` | `exterior` is idempotent (a closure-like operator, but for open sets). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exterior_`: core properties of the `exterior` operation.
  - `IsOpen.exterior_*`: properties tied to openness of the argument set.
- **Suffixes**:
  - `_eq`: equality statements (e.g., `exterior_exterior`, `exterior_empty`).
  - `_iff`: biconditional characterizations (e.g., `mem_exterior_iff_specializes`, `exterior_eq_empty`).
  - `_subset`: inclusion lemmas (e.g., `exterior_iInter_subset`, `exterior_inter_subset`).
  - `_mono`: monotonicity lemmas (`exterior_mono`).
- **Special**:
  - `exterior_singleton_eq_ker_nhds`: links to filter-theoretic kernel.
  - `mem_exterior_singleton`: connects to specialization preorder.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Dominant: simplifies using definitions (`exterior_def`, `mem_exterior`, etc.), lemmas like `exterior_singleton_eq_ker_nhds`, and filter properties. |
| `rw` | Rewriting key definitions or lemmas (e.g., `exterior_def`, `exterior_singleton_eq_ker_nhds`). |
| `exact`, `assumption` | Used in short proofs after `rw`/`simp`. |
| `antisymm` | Proving equality via double inclusion (e.g., `IsOpen.exterior_eq`, `exterior_eq_exterior_iff_nhdsSet`). |
| `mono` | Applied to monotonicity goals (`exterior_mono`). |
| `gcongr` | Used as attribute for monotonicity lemmas (`[gcongr] lemma exterior_subset_exterior`). |
| `refine` / `exact` | For constructing proofs with intermediate steps (e.g., `exterior_iInter_subset`). |
| `simp (config := {contextual := true})` | Used in advanced simplification where context matters (`exterior_subset_exterior_iff_nhdsSet`). |

---

#### **4. Proof Logic**

- **Structure**: Proofs typically follow a *definition → simplification → universal quantifier reasoning* pattern.
- **Common Flow**:
  1. Unfold `exterior` via `exterior_def` or `exterior_singleton_eq_ker_nhds`.
  2. Apply `mem_exterior` or `subset_exterior_iff` to reduce to open-set reasoning.
  3. Use `IsOpen.mem_nhdsSet`, `IsOpen.exterior_subset`, or filter basis lemmas (`hasBasis_nhdsSet`) to connect to neighborhood filters.
  4. For union/intersection lemmas: use `biInter`/`sInter` properties + `ker_iSup`/`ker_sup`/`ker_iInf`.
  5. For idempotence (`exterior_exterior`) or equality of exteriors: reduce to equality of neighborhood filters via `exterior_eq_exterior_iff_nhdsSet`.
- **Key Insight**: The exterior operator is the *largest open set contained in every open superset of `s`* — i.e., the *interior of the closure* in classical topology, but defined directly via open supersets. It behaves dually to closure: preserves unions, reverses intersections, and is idempotent.

---

#### **5. Imports & Scope**

- **Core Imports**:
  - `Mathlib.Topology.NhdsSet`: Defines neighborhood filter of a set (`𝓝ˢ s`).
  - `Mathlib.Topology.Inseparable`: Defines the specialization preorder (`⤳`) and related concepts (`ker_nhds`, `specializes`).
- **Scope & Context**:
  - `open Set Filter`: Enables set/filter notation (`⋃`, `⋂`, `𝓝`, `𝓝ˢ`, `mem_setOf`, etc.).
  - `open scoped Topology`: Enables topology-specific notation/scopes.
- **Domain**: General topology on a type `X` with a `TopologicalSpace X` instance. No separation axioms assumed.

---

### Summary

The `exterior` operator is a fundamental construction in point-set topology, defined as the intersection of all open supersets of a set. It is dual to closure in behavior (preserves unions, reverses intersections), and its properties are tightly tied to the specialization preorder and neighborhood filters of sets. This file formalizes its basic algebraic and order-theoretic properties, with heavy reliance on `simp`-based reasoning and filter-theoretic characterizations.