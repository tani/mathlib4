### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `BoxAdditiveMap` | `structure BoxAdditiveMap (ι M : Type*) [AddCommMonoid M] (I : WithTop (Box ι))` | Defines a function `f : Box ι → M` that is *box additive* on subboxes bounded by `I`. For any box `J ≤ I` and partition `π` of `J`, `f J = ∑_{J' ∈ π.boxes} f J'`. |
| `ι →ᵇᵃ[I₀] M` | Notation for `BoxAdditiveMap ι M I₀` | Shorthand for box-additive maps on subboxes of `I₀`; `ι →ᵇᵃ M` is the special case `I₀ = ⊤`. |
| `sum_partition_boxes` | `f.sum_partition_boxes hI hπ : ∑ J ∈ π.boxes, f J = f I` | Core property: value of `f` on a box equals sum over any partition. |
| `map_split_add` | `f.map_split_add hI i x : f (I.splitLower i x) + f (I.splitUpper i x) = f I` | Shows that splitting a box along coordinate `i` at `x` preserves additivity. |
| `restrict` | `f.restrict I hI : ι →ᵇᵃ[I] M` | Restricts a box-additive map to smaller bounding box `I ≤ I₀`. |
| `ofMapSplitAdd` | `ofMapSplitAdd f I₀ hf : ι →ᵇᵃ[I₀] M` | Constructs a box-additive map from a function additive under *binary splits* (along any coordinate). Crucial for proving full box-additivity from simpler axioms. |
| `map` | `f.map g : ι →ᵇᵃ[I₀] N` | Pushforward of a box-additive map along an additive homomorphism `g : M →+ N`. |
| `sum_boxes_congr` | `∑_{π₁} f = ∑_{π₂} f` if `π₁.iUnion = π₂.iUnion` | Independence of sum over partition boxes from the specific partition, as long as union of boxes is same. |
| `upperSubLower` | `Fin (n+1) →ᵇᵃ[I₀] G` | A key construction: given a family `f x` of box-additive maps on faces, the difference `f(J.upper i) ∘ face i - f(J.lower i) ∘ face i` is box-additive on `I₀`. Used in Fubini-type arguments. |
| `toSMul` | `f.toSMul : ι →ᵇᵃ[I₀] E →L[ℝ] E` | For `f : ι →ᵇᵃ[I₀] ℝ`, defines a box-additive map of scalar multiplication operators on a normed space `E`. |

---

#### 2. **Naming Conventions**

- **Prefixes / Suffixes**:
  - `sum_...`: Functions dealing with sums over partitions (`sum_partition_boxes`, `sum_boxes_congr`, `sum_split_boxes`).
  - `split_...`: Operations related to splitting boxes (`splitLower`, `splitUpper`, `splitMany`, `isPartitionSplit`).
  - `elim'`: Used in `elim' 0 f` — extends a function defined on subboxes of a face to the whole space by zero outside.
  - `face`: Refers to faces of a box (e.g., `J.face i`).
  - `upper`, `lower`: Refer to upper/lower coordinates of a box (e.g., `J.upper i`, `J.lower i`).
  - `of...`: Constructors defined via verification of splitting property (`ofMapSplitAdd`, `upperSubLower`).
  - `map_...`: Pushforward constructions (`map`, `toSMul`).
  - `restrict`: Restriction to smaller domain.

- **Structure fields**:
  - `toFun`: Underlying function.
  - `sum_partition_boxes'`: Proof of additivity over partitions.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with explicit lemmas (e.g., `sum_partition_boxes`, `splitMany_insert`, `isPartition_splitMany`). |
| `rw [...]` | Rewriting using definitions or lemmas (e.g., `hf`, `le_iff_Icc`, `Box.Icc_eq_pi`). |
| `induction' ... using Finset.induction_on` | Structural induction on finite sets (e.g., for `splitMany`). |
| `cases` / `rcases` | Case analysis on hypotheses or existential witnesses (`hπ.exists_splitMany_le`). |
| `abel` | Solving equalities in additive commutative monoids/groups. |
| `exact?` / `exact` | Closing goals with known lemmas. |
| `congr` | Congruence reasoning (e.g., in `coe_injective'`). |
| `simp_rw [...]` | Simplify + rewrite (e.g., in `map` definition). |
| `aesop` / `linarith` | Not heavily used here — mostly manual simplification and rewriting. |

---

#### 4. **Proof Logic**

- **Inductive structure**: Proofs often proceed by induction on finite sets (e.g., `Finset.induction_on`) to handle `splitMany`, then use properties of partitions and unions.
- **Reduction to binary splits**: The core lemma `ofMapSplitAdd` reduces full box-additivity to verifying additivity under *binary* splits (`splitLower`, `splitUpper`). This is a standard technique in measure theory (Carathéodory extension style).
- **Partition refinement**: Many proofs rely on the fact that any partition can be refined by a `splitMany` partition (`hπ.exists_splitMany_le`), enabling reduction to simpler partitions.
- **Equality of sums over congruent partitions**: `sum_boxes_congr` shows that sums over partitions depend only on the union of boxes — essential for well-definedness and independence of construction.
- **Face-based constructions**: In `upperSubLower`, proofs carefully handle coordinate embeddings (`succAbove`) and use face monotonicity (`face_mono`) to ensure bounding conditions hold.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.BoxIntegral.Partition.Split` | Provides `split`, `splitMany`, `isPartitionSplit`, `sum_split_boxes`, etc. — foundational partition theory for boxes. |
| `Mathlib.Analysis.NormedSpace.OperatorNorm.Mul` | Supplies `ContinuousLinearMap.lsmul`, used in `toSMul`. |

> **Domain scope**: This module lies at the intersection of *measure theory* (additive functions on boxes), *integration theory* (via box-additive maps modeling integrals), and *multidimensional analysis* (faces, splits, coordinates). It serves as a foundational layer for the Bochner integral and Fubini-type theorems in the `BoxIntegral` library.

--- 

Let me know if you'd like a diagram of the categorical structure (e.g., `BoxAdditiveMap` as a presheaf), or a formalization sketch of `upperSubLower`.