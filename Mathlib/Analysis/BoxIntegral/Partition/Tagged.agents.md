### Technical Brief: `BoxIntegral.TaggedPrepartition` Module

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `TaggedPrepartition I` | `structure` extending `Prepartition I` | Enriches a prepartition with a *tagged point* for each box, total over all boxes in `ι → ℝ`, constrained to lie in `I`. |
| `tag : Box ι → ι → ℝ` | Function field of `TaggedPrepartition` | Assigns a tag (point in `ι → ℝ`) to each box; only used on boxes in the partition. |
| `tag_mem_Icc : ∀ J, tag J ∈ Box.Icc I` | Proof field | Ensures all tags lie in the ambient box `I`. |
| `IsPartition π` | `Prop` | `π` covers the whole box `I` iff `π.iUnion = I`. |
| `IsHenstock π` | `Prop` | `∀ J ∈ π, π.tag J ∈ Box.Icc J` — tags lie *inside* their respective boxes (used for Henstock integral). |
| `IsSubordinate π r` | `Prop` | `∀ J ∈ π, Box.Icc J ⊆ closedBall (π.tag J) (r (π.tag J))` — boxes are controlled by a radius function `r`. |
| `filter p π` | `TaggedPrepartition I` | Restricts `π` to boxes satisfying predicate `p`, preserving tags. |
| `biUnionTagged π πi` | `TaggedPrepartition I` | Refines `π` by replacing each `J ∈ π` with a *tagged* partition `πi J`. Tags come from the refined partitions. |
| `biUnionPrepartition π πi` | `TaggedPrepartition I` | Refines `π` using *non-tagged* partitions `πi J`; tags inherited from `π`. |
| `infPrepartition π π'` | `TaggedPrepartition I` | Meet of `π` (tagged) and `π'` (prepartition); tags from `π`. |
| `single I J hJ x h` | `TaggedPrepartition I` | Single-box tagged partition with box `J ≤ I`, tag `x ∈ I`. |
| `disjUnion π₁ π₂ h` | `TaggedPrepartition I` | Union of disjointly-supported tagged partitions. |
| `embedBox I J h` | `TaggedPrepartition I ↪ TaggedPrepartition J` | Embedding when `I ≤ J`. |
| `distortion π` | `ℝ≥0` | Maximum box distortion in `π`. |
| `IsHenstock.card_filter_tag_eq_le` | `#{J ∈ π | tag J = x} ≤ 2^dim` | In Henstock partitions, each tag appears in at most `2^dim` boxes. |
| `IsSubordinate.diam_le` | `diam (Box.Icc J) ≤ 2 * r (tag J)` | Diameter bound for subordinate partitions. |

**Key Theorems (Proof Utilities):**
- `forall_biUnionTagged`: Universal quantification over `biUnionTagged` reduces to quantification over components.
- `isHenstock_biUnionTagged`: `biUnionTagged` is Henstock iff all refined partitions are.
- `isSubordinate_biUnionTagged`, `biUnionPrepartition`, `infPrepartition`, `disjUnion`: Stability of `IsSubordinate` and `IsHenstock` under constructions.
- `distortion_biUnionTagged`, `distortion_biUnionPrepartition`, `distortion_disjUnion`: Computation of distortion under refinements/unions.

---

#### **2. Naming Conventions**

| Pattern | Examples | Meaning |
|--------|----------|---------|
| `is_*` | `isPartition`, `isHenstock`, `isSubordinate` | Predicate properties (Prop-valued). |
| `*_mem_*` | `tag_mem_Icc`, `mem_iUnion`, `mem_filter`, `mem_biUnionTagged` | Membership or containment proofs/properties. |
| `*_def` | `iUnion_def` | Definitional equalities (often `rfl`). |
| `*_iff` | `isPartition_iff_iUnion_eq`, `isHenstock_single_iff` | Characterizations via equivalences. |
| `*_single` | `mem_single`, `iUnion_single`, `distortion_single` | Special-case lemmas for `single`. |
| `*_biUnion*` | `biUnionTagged`, `biUnionPrepartition`, `mem_biUnionTagged`, `distortion_biUnionTagged` | Behavior under refinement/unions. |
| `*_disjUnion` | `mem_disjUnion`, `iUnion_disjUnion`, `disjUnion_tag_*` | Disjoint union properties. |
| `*_embedBox` | `embedBox` | Box embedding. |
| `*_inf*` | `infPrepartition`, `infPrepartition_toPrepartition` | Meet with non-tagged partition. |

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only` — for rewriting definitions (`mem_*`, `iUnion_*`, `tag_*`).
- `rw` — especially with `←` to unfold definitions or apply lemmas.
- `convert`, `exact`, `refine` — for structured proof construction.
- `cases` / `split_ifs` — for `piecewise` definitions (`disjUnion`).
- `Finset.card_le_card`, `Finset.mem_union`, `Finset.mem_filter` — set-theoretic reasoning.
- `sup_*` lemmas (`sup_le_iff`, `sup_congr`, `sup_mono`) — for distortion arguments.
- `subset.trans`, `diam_mono`, `closedBall_subset_closedBall` — metric/geometry reasoning.
- `classical` — used for classical reasoning (e.g., in `disjUnion`, `card_filter_tag_eq_le`).
- `aesop` / `linarith` — likely used in background (not explicit here, but standard in Mathlib).

---

#### **4. Proof Logic**

Typical proof patterns:
- **Induction/Case analysis on membership**: e.g., `mem_disjUnion` → `mem_union.elim`.
- **Refinement lemmas**: Prove properties for `biUnionTagged`/`biUnionPrepartition` by reducing to component partitions via `forall_biUnionTagged`.
- **Inheritance of structure**: Show `IsHenstock`/`IsSubordinate` preserved under `filter`, `disjUnion`, `infPrepartition`, `biUnion*` by unfolding definitions and applying hypotheses per component.
- **Bounding arguments**: Use `distortion_le_of_mem`, `sup_le_iff`, `card_filter_tag_eq_le` with `Finset` lemmas.
- **Embedding**: Prove `embedBox` injective by extensionality (`simpa using H`).
- **Equational reasoning**: Many `@[simp]` lemmas are definitional (`rfl`), others use `sup_*` or `iUnion_*` lemmas.

---

#### **5. Imports & Scope**

- **Primary import**: `Mathlib.Analysis.BoxIntegral.Partition.Basic`
- **Scope**: `noncomputable section`, `namespace BoxIntegral`
- **Open scopes**: `Classical`, `Finset`, `Function`, `ENNReal`, `NNReal`, `Set`, `Metric`
- **Assumptions**:
  - `[Fintype ι]` — for dimension-dependent bounds (`2 ^ Fintype.card ι`), distortion, and `IsSubordinate`.
  - `ι : Type*` — index type for Euclidean space `ι → ℝ`.

---

### Summary

This module formalizes **tagged prepartitions** — a foundational structure for generalized Riemann integration (Henstock, McShane). It supports:
- Tagged refinements (`biUnionTagged`, `biUnionPrepartition`)
- Filtering, disjoint union, meet with non-tagged partitions
-Henstock and subordinate conditions
- Distortion analysis (maximal box distortion)

The design prioritizes **modularity** and **reusability**, with many properties proven once and reused via `@[simp]` and lemmas like `forall_biUnionTagged`. The separation between *tagged* and *non-tagged* refinements enables precise control over tag behavior — crucial for integrals where tag placement matters (e.g., Henstock) vs. where it doesn’t (e.g., McShane).