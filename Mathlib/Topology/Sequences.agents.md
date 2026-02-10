### Technical Brief: Sequential Closure, Continuity, and Compactness in Topological & Uniform Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `seqClosure s` | `Set X` | Set of limits of sequences in `s`; i.e., points `x` such that ∃ `u : ℕ → X`, `∀ n, u n ∈ s`, and `Tendsto u atTop (𝓝 x)`. |
| `IsSeqClosed s` | `Set X → Prop` | `seqClosure s ⊆ s`; i.e., `s` contains all limits of convergent sequences from `s`. |
| `SeqContinuous f` | `(X → Y) → Prop` | For all `u : ℕ → X`, `Tendsto u atTop (𝓝 x) ⇒ Tendsto (f ∘ u) atTop (𝓝 (f x))`. |
| `IsSeqCompact s` | `Set X → Prop` | Every sequence in `s` has a subsequence converging to a point in `s`. |
| `FrechetUrysohnSpace X` | `Type u → Prop` | `seqClosure s = closure s` for all `s ⊆ X`. |
| `SequentialSpace X` | `Type u → Prop` | Every sequentially closed set is closed (`IsSeqClosed s → IsClosed s`). |
| `SeqCompactSpace X` | `Type u → Prop` | `IsSeqCompact (univ : Set X)`. |

**Main Theorems:**

| Theorem | Statement | Significance |
|---------|-----------|--------------|
| `seqClosure_subset_closure` | `seqClosure s ⊆ closure s` | Sequential closure is always contained in topological closure. |
| `IsSeqClosed.seqClosure_eq` | `IsSeqClosed s ⇒ seqClosure s = s` | Sequentially closed sets equal their sequential closure. |
| `tendsto_nhds_iff_seq_tendsto` | `[FrechetUrysohnSpace X] ⇒ Tendsto f (𝓝 a) (𝓝 b) ↔ ∀ u, Tendsto u (𝓝 a) ⇒ Tendsto (f ∘ u) (𝓝 b)` | In Fréchet–Urysohn spaces, continuity ⇔ sequential continuity. |
| `FrechetUrysohnSpace.of_seq_tendsto_imp_tendsto` | If sequential convergence ⇒ convergence, then space is Fréchet–Urysohn. | Alternative characterization of Fréchet–Urysohn spaces. |
| `FirstCountableTopology.frechetUrysohnSpace` | `[FirstCountableTopology X] ⇒ FrechetUrysohnSpace X` | First-countable ⇒ Fréchet–Urysohn. |
| `FrechetUrysohnSpace.to_sequentialSpace` | `[FrechetUrysohnSpace X] ⇒ SequentialSpace X` | Fréchet–Urysohn ⇒ sequential. |
| `IsSeqCompact.isCompact` | `[UniformSpace X] [IsCountablyGenerated (𝓤 X)] ⇒ IsSeqCompact s ⇒ IsCompact s` | In countably generated uniform spaces, sequential compactness ⇒ compactness. |
| `UniformSpace.isCompact_iff_isSeqCompact` | `[UniformSpace X] [IsCountablyGenerated (𝓤 X)] ⇒ IsCompact s ↔ IsSeqCompact s` | Compactness ⇔ sequential compactness in such spaces (Bolzano–Weierstrass). |

---

#### **2. Naming Conventions**

- **Predicates**:  
  - `isSeqClosed`, `seqContinuous`, `seqCompactSpace`, `isSeqCompact`, `isSeqClosed` — prefix `is_` or `seq_`.
- **Operations**:  
  - `seqClosure` — noun, no prefix/suffix beyond `seq_`.
- **Instances & Classes**:  
  - `FrechetUrysohnSpace`, `SequentialSpace`, `SeqCompactSpace` — capitalized, no `is_`.
- **Theorems**:  
  - `isSeqClosed_iff`, `seqClosure_eq_closure`, `tendsto_nhds_iff_seq_tendsto`, `isSeqCompact.isCompact` — descriptive, often using `iff`, `eq`, `tendsto`, `is_` + predicate.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` / `rw` | Rewriting definitions (`seqClosure`, `IsSeqClosed`, `tendsto`, etc.). |
| `aesop` / `tauto` / `intro` / `cases` | Structural reasoning, especially in equivalence proofs (`isSeqClosed_iff`, `continuous_iff_seqContinuous`). |
| `exact`, `refine`, `apply` | Constructing witnesses (e.g., sequences, subsequence indices). |
| `rcases` / `obtain` / `choose` | Extracting sequences, subsequence indices, or elements from existential hypotheses. |
| `mono` / `apply_fun` / `congr'` | Handling monotonicity, composition, and equality of functions/sequences. |
| `filter_upwards` / `eventually_of_forall` | Working with filters (`atTop`, `𝓝 x`). |
| `cauchySeq` / `tendsto_nhds_of_cauchySeq_of_subseq` | Cauchy sequence arguments in uniform spaces. |
| `antisymm` | Proving equality of sets via double inclusion. |
| `rw [← closure_eq_iff_isClosed]`, `rw [← seqClosure_eq_closure]` | Leveraging known equivalences. |

---

#### **4. Proof Logic & Strategy**

- **Equivalence proofs** (`↔`):  
  - Split into `→` and `←`, often using `intro`, `rcases`, and `rw` with definitions.
  - Example: `isSeqClosed_iff`, `continuous_iff_seqContinuous`, `isCompact_iff_isSeqCompact`.

- **Inclusion proofs** (`⊆`):  
  - Use `fun p hp => ⟨...⟩` to construct witnesses (e.g., constant sequence for `subset_seqClosure`).
  - Use `mem_closure_of_tendsto` or `mem_of_tendsto` for closure-related inclusions.

- **Inductive/constructive extraction**:  
  - `rcases hx with ⟨u, hus, hu⟩` to unpack `seqClosure` membership.
  - `obtain ⟨φ, hφ, h⟩ := extraction_of_frequently_atTop hx` to extract subsequences.

- **Uniform space arguments**:  
  - Use `cauchySeq`, `tendsto_nhds_of_cauchySeq_of_subseq`, and basis lemmas (`nhds_basis_uniformity'`) to upgrade subsequence convergence to full convergence.

- **Typeclass reasoning**:  
  - Leverage instances (`FirstCountableTopology.frechetUrysohnSpace`, `SeqCompactSpace.of_compactSpace`) to infer properties automatically.

---

#### **5. Imports & Scope**

**Core Imports**:
```lean
import Mathlib.Topology.Defs.Sequences
import Mathlib.Topology.UniformSpace.Cauchy
```

**Key Dependencies**:
- `Topology.Defs.Sequences`: Definitions of `seqClosure`, `IsSeqClosed`, `SeqContinuous`, `IsSeqCompact`.
- `Topology.UniformSpace.Cauchy`: Cauchy sequences, uniform continuity, completeness.
- `Mathlib.Topology.Bornology`: Used for `TotallyBounded`, `IsComplete`.
- `Mathlib.Topology.UniformSpace.Basic`: Uniform spaces, entourages, countable generation.
- `Mathlib.Topology.ContinuousFunction`: For `Continuous`, `ContinuousAt`, `tendsto`.
- `Mathlib.Topology.Bases`: Filter bases, especially `nhds_basis_closeds`, `nhds_basis_uniformity'`.
- `Mathlib.Topology.Space.Product`, `Sum`, `Quotient`: For product/sum/quotient space properties.

**Scopes & Open Locals**:
- `open Bornology Filter Function Set TopologicalSpace Topology`
- `open scoped Uniformity`
- `variable {X Y : Type*}` — generic topological/uniform spaces.

---

### Summary

This file formalizes the interplay between sequential and topological notions in general and uniform spaces. It establishes foundational equivalences (e.g., Fréchet–Urysohn ⇔ sequential convergence characterizes continuity), proves preservation properties (e.g., sequential compactness under images), and culminates in the Bolzano–Weierstrass theorem for uniform spaces with countably generated uniformity. The proofs rely heavily on filter/subsequence extraction, typeclass inference, and uniform space structure.