### Technical Brief: Dense Embeddings in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `IsDenseInducing i` | `structure` | A map `i : α → β` that is *inducing* (i.e., induces the topology on its domain) **and** has *dense range*. |
| `IsDenseEmbedding e` | `structure` | A map `e : α → β` that is a *dense embedding*: i.e., `IsDenseInducing e` **and** `Function.Injective e`. |
| `extend di f b` | `def` | For `di : IsDenseInducing i`, defines a candidate extension `β → γ` of `f : α → γ` using limits along `comap i (𝓝 b)`. |
| `continuous_extend` | `theorem` | Gives sufficient condition (for `γ` a **T₃ space**) for `extend di f` to be continuous: if every `b ∈ β` has a limit of `f` along `comap i (𝓝 b)`. |
| `extend_eq_at` | `theorem` | If `f` is continuous at `a`, then `extend di f (i a) = f a`. |
| `extend_unique` | `theorem` | Uniqueness of continuous extensions: if `g` is continuous and agrees with `f` on `range i`, then `g = extend di f`. |
| `dense_image` | `theorem` | For `IsDenseInducing i`, `i '' s` is dense iff `s` is dense. |
| `separableSpace` | `theorem` | If `α` is separable and `i : α → β` is dense inducing/embedding, then `β` is separable. |
| `isClosed_property`, `isClosed_property2`, `isClosed_property3` | `theorem`s | Extend properties defined on `range e` (dense) to all of `β`, assuming the defining set is closed. |
| `DenseRange.induction_on`, `induction_on₂`, `induction_on₃` | `theorem`s | Elimination principles for dense ranges: prove a property holds everywhere by verifying it on a dense range and closedness. |
| `hasBasis_of_isDenseInducing` | `theorem` | If `𝓝 x` has a basis `{s i}`, then `𝓝 (f x)` has basis `{closure (f '' s i)}` for `f` dense inducing into a **T₃** space. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isDenseInducing`, `isDenseEmbedding`: predicate structures.
  - `dense_`: e.g., `dense_range`, `dense_image`, `denseEmbedding_val`.
  - `extend_`: e.g., `extend_eq`, `extend_unique`, `continuous_extend`.
- **Suffixes**:
  - `_eq`: equality lemmas (e.g., `extend_eq`, `nhds_eq_comap`).
  - `_mem_nhds`: membership in neighborhoods (e.g., `closure_image_mem_nhds`).
  - `_neBot`: non-emptiness of filters (e.g., `nhdsWithin_neBot`, `comap_nhds_neBot`).
  - `_property`, `_property2`, `_property3`: generalized extension of predicates over 1/2/3 arguments.
- **Structure fields**:
  - `dense`, `injective`, `toIsInducing`, `toIsDenseInducing`: standard projections.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions (e.g., `nhds_eq_comap`, `closure_range`). |
| `rcases` / `obtain` / `cases` | Decomposing existential/universal hypotheses. |
| `filter_upwards` | Working with filters (e.g., proving eventual containment). |
| `exact` / `assumption` | Closing simple goals. |
| `apply` / `refine` | Applying lemmas with holes (e.g., `refine mem_of_superset _ ?_`). |
| `calc` / `trans` | Chaining inclusions/equalities (e.g., closure monotonicity). |
| `tauto` / `aesop` | Automated reasoning for set/filter logic. |
| `ext` / `funext` | Extensionality for sets/functions. |
| `simpa` | Simplifying with a lemma and closing trivial goals. |
| `have` / `suffices` | Introducing intermediate claims. |

---

#### **4. Proof Logic & Strategy**

- **Inductive/limit-based reasoning**: Many proofs rely on filter-theoretic characterizations (e.g., continuity, closure, density) via neighborhoods and limits.
- **Two-step extension proofs**:
  1. Define `extend` using limits (`limUnder`).
  2. Prove continuity using T₃ separation (via closed neighborhoods).
- **Uniqueness via Hausdorffness**: In T₂ spaces, limits are unique ⇒ extensions are unique.
- **Closed-set extension principle**:
  - Prove a property holds on `range e` (dense).
  - Show the set where it holds is closed.
  - Conclude it holds everywhere (via `isClosed_property` or `DenseRange.induction_on`).
- **Product preservation**: `prodMap` lemmas use stability of inducing/density under products.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Topology.Bases
  import Mathlib.Topology.Separation.Regular
  ```
- **Topological context**:
  - Uses `TopologicalSpace`, `Filter`, `Set`.
  - Relies on separation axioms: **T₂ (Hausdorff)**, **T₃ (regular Hausdorff)**.
  - Uses `PreconnectedSpace`, `SeparableSpace`, `IsCompact`, `IsClosed`.
- **Filter machinery**:
  - `comap`, `map`, `tendsto`, `limUnder`, `nhds`, `nhdsWithin`.
- **Embedding theory**:
  - Builds on `IsInducing`, `IsEmbedding`, `DenseRange`.

---

### Summary

This module formalizes **dense embeddings** and **dense inducing maps**, emphasizing their role in **continuous extension** of functions. It provides:
- Structural definitions (`IsDenseInducing`, `IsDenseEmbedding`),
- Extension operator `extend` with continuity criteria (`continuous_extend`),
- Uniqueness and extension-by-closedness principles (`extend_unique`, `isClosed_property`),
- Preservation properties (products, separability),
- Filter-theoretic characterizations (bases, neighborhoods).

It is foundational for analysis and topology in Mathlib, especially where approximation by dense subsets is used (e.g., extending functions from ℚ to ℝ).