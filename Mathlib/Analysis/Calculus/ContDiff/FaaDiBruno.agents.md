### Technical Metadata Brief: Faa di Bruno Formula in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `OrderedFinpartition n` | A structure encoding a partition of `Fin n` into ordered, disjoint, nonempty subsets, with explicit embeddings `emb m : Fin (partSize m) → Fin n`. Tailored for Faa di Bruno; ordering by max element ensures correctness for non-symmetric differentials. |
| `atomic n` | The partition of `Fin n` into singletons (`length = n`, each `partSize = 1`). Serves as default/initial element. |
| `extendLeft c` | Extends `c : OrderedFinpartition n` by adding a new singleton part `{0}` at the leftmost position (increasing `length` by 1). |
| `extendMiddle c k` | Extends `c` by inserting `0` into the `k`-th part (keeping `length` fixed, increasing `partSize k` by 1). |
| `extend c i` | Unified extension: `extendLeft` if `i = none`, else `extendMiddle i`. |
| `eraseLeft c hc` | Removes the leftmost singleton part `{0}` (requires `range (emb 0) = {0}`), decreasing `length` by 1. |
| `eraseMiddle c hc` | Removes `0` from its part (requires `range (emb 0) ≠ {0}`), decreasing `partSize (index 0)` by 1. |
| `equivSigma` | Equivalence `((i : Fin c.length) × Fin (c.partSize i)) ≃ Fin n`, induced by `emb`. Central to reindexing sums. |
| `compAlongOrderedFinpartition q p c` | Multilinear map: `(v₁, …, vₙ) ↦ qₖ (p_{i₁}(v_{I₁}), …, p_{iₖ}(v_{Iₖ}))`, where `k = c.length`, `iₘ = c.partSize m`, and `v_{Iₘ} = v ∘ emb m`. Implements the Faa di Bruno summand for partition `c`. |
| `q.taylorComp p` | Formal multilinear series with `n`-th term `∑_{c : OrderedFinpartition n}, compAlongOrderedFinpartition q p c`. Represents the Taylor series of `g ∘ f` when `q`, `p` are Taylor series of `g`, `f`. |
| `HasFTaylorSeriesUptoOn.comp` | Main theorem: If `g` and `f` have Taylor series up to order `n` on sets `t`, `s` (resp.), given by `q`, `p`, then `g ∘ f` has Taylor series `q.taylorComp p` on `f⁻¹(t) ∩ s`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `extend*`: Operations adding a new element (`0`) to a partition.
  - `erase*`: Inverse operations removing `0`.
  - `emb*`: Related to embeddings of parts into `Fin n`.
  - `index*`, `invEmbedding*`: Extraction of part index and preimage under embedding.
- **Suffixes**:
  - `*Left`, `*Middle`: Distinguish how `0` is added/removed (new atom vs. extension).
  - `*Sigma`: Refers to sigma-type encodings or equivalences.
- **Structure fields**:
  - `length`, `partSize`, `emb`, `disjoint`, `cover`: Explicitly encode partition data.
  - `parts_strictMono`: Encodes ordering by max element.

---

#### **3. Tactic Stack**

- **Core proof automation**:
  - `simp`, `simp only`, `simp_all`: Extensive use for simplifying embeddings, `Fin` arithmetic, and structure fields.
  - `rw`, `congr`, `congr 1`: Rewriting and congruence closure for equality proofs.
  - `induction ... using Fin.induction`: Structural induction on `Fin n` and `Fin l`.
  - `rcases`, `obtain`, `cases'`: Case analysis on existential/dependent hypotheses (e.g., `range (emb 0) = {0}` vs `≠ {0}`).
- **Order & monotonicity**:
  - `strictMono`, `monotone`, `lt_iff_val_lt_val`, `pred_lt_pred_iff`: For reasoning about embeddings and part ordering.
- **Set-theoretic reasoning**:
  - `disjoint_iff_forall_ne`, `mem_range`, `mem_iUnion`, `insert_subset`: Handling disjointness and coverage.
- **Arithmetic & finiteness**:
  - `Nat.sub_add_cancel`, `Nat.card_range_of_injective`, `Fintype.card_le_of_injective`: For bounding sizes and proving finiteness.
- **Specialized**:
  - `cast`, `cast_mk`, `cast_injective`: For transporting along definitional equalities in `Fin`.
  - `Fin.mk.injEq`, `Fin.ext`: Injectivity of `Fin` constructors.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs proceed by induction on `n`, leveraging the equivalence:
    ```
    OrderedFinpartition (n + 1) ≃ (c : OrderedFinpartition n) × Option (Fin c.length)
    ```
    via `extend` / `eraseLeft` / `eraseMiddle`.
  - Base case `n = 0`: Uses `Unique (OrderedFinpartition 0)`.
- **Key logical flow**:
  1. **Extension step**: Show that differentiating the `n`-th term of `q.taylorComp p` yields a sum over `OrderedFinpartition (n+1)`.
  2. **Partition correspondence**: Use `extend` and `erase*` to establish bijection between:
     - Derivatives of summands (either differentiate `q` → new atom, or differentiate `p_{iₘ}` → extend part).
     - Elements of `(c, Option (Fin c.length))`.
  3. **Summation identity**: Use `prod_sigma_eq_prod` and `equivSigma` to reindex sums over partitions ↔ sums over `Fin n`.
- **Critical lemmas**:
  - `one_lt_partSize_index_zero`: Ensures `eraseMiddle` is well-defined (no division by zero).
  - `emb_injective`, `emb_ne_emb_of_ne`: Guarantee disjointness and correctness of embeddings.
  - `range_extendLeft_zero`, `range_emb_extendMiddle_ne_singleton_zero`: Distinguish atomic vs non-atomic leftmost parts.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Analytic.Within` | Analyticity within subsets; foundational for local behavior. |
| `Mathlib.Analysis.Calculus.FDeriv.Analytic` | Fréchet differentiability and analyticity; used for `D^k g`, `D^k f`. |
| `Mathlib.Analysis.Calculus.ContDiff.FTaylorSeries` | Formal Taylor series and `HasFTaylorSeriesUptoOn`; target of the main theorem. |

> **Note**: The formalization is self-contained *within* analysis and calculus libraries, with combinatorial machinery (`OrderedFinpartition`) implemented locally due to its highly specialized nature.

--- 

This metadata reflects the precise, implementation-aware structure required for formalizing the Faa di Bruno formula in Lean 4, emphasizing the interplay between combinatorics (partitions) and analysis (Taylor series).