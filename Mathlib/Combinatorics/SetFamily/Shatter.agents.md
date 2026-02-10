### Technical Metadata Brief: Shattering Families & VC-Dimension in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Shatters` | `𝒜.Shatters s := ∀ t ⊆ s, ∃ u ∈ 𝒜, s ∩ u = t` | Defines when a set family `𝒜` *shatters* a set `s`: all subsets of `s` are obtained as intersections with elements of `𝒜`. |
| `shatterer` | `𝒜.shatterer := {s ∈ ⋃ (p ∈ powerset) s, 𝒜.Shatters s}` | The set of all sets shattered by `𝒜`. |
| `vcDim` | `𝒜.vcDim := 𝒜.shatterer.sup card` | The *VC-dimension* of `𝒜`: the maximum cardinality of a shattered set. |
| `Shatters.exists_inter_eq_singleton` | `a ∈ s → ∃ t ∈ 𝒜, s ∩ t = {a}` | If `𝒜` shatters `s`, then singletons in `s` are traced. |
| `Shatters.mono_left/right` | Monotonicity of shattering w.r.t. `𝒜` and `s`. | |
| `shatters_iff` | `𝒜.Shatters s ↔ 𝒜.image (s ∩ ·) = s.powerset` | Equivalence between shattering and surjectivity of intersection map onto powerset. |
| `card_le_card_shatterer` | `#𝒜 ≤ #𝒜.shatterer` | **Pajor’s variant of Sauer–Shelah**: size of family ≤ size of its shatterer. |
| `Shatters.of_compression` | `(𝓓 a 𝒜).Shatters s → 𝒜.Shatters s` | Shattering is preserved under down-compression. |
| `shatterer_compress_subset_shatterer` | `(𝓓 a 𝒜).shatterer ⊆ 𝒜.shatterer` | Down-compression shrinks (or preserves) the shatterer. |
| `vcDim_compress_le` | `(𝓓 a 𝒜).vcDim ≤ 𝒜.vcDim` | VC-dimension does not increase under compression. |
| `card_shatterer_le_sum_vcDim` | `#𝒜.shatterer ≤ ∑_{k ≤ vcDim 𝒜} (n choose k)` | **Sauer–Shelah Lemma**: size of shatterer bounded by sum of binomial coefficients up to VC-dimension. |

---

#### **2. Naming Conventions**

- **Predicates**:  
  - `Shatters` (capitalized, noun-like predicate).  
  - `shatterer`, `vcDim` (lowercase, noun-like functions).  
- **Properties/lemmas**:  
  - `Shatters.*`: properties of the `Shatters` relation (e.g., `mono_left`, `nonempty`, `subset_iff`).  
  - `shatterer_*`: properties of the `shatterer` operator (e.g., `mono`, `idem`, `eq`, `isLowerSet`).  
  - `vcDim_*`: properties of VC-dimension (e.g., `mono`, `card_le`, `compress_le`).  
- **Logical structure**:  
  - `aux`, `hs`, `h𝒜`, `ht`, `hu`, `ha`: standard proof variable naming.  
  - `mem_*`, `subset_*`, `inter_*`, `insert_*`, `erase_*`: standard set-theoretic lemmas.  
- **Suffixes**:  
  - `_left`, `_right`: monotonicity direction.  
  - `_eq`, `_idem`, `_mono`: algebraic/poset properties.  
  - `_le`, `_ge`: inequality lemmas (especially for `vcDim`).  

---

#### **3. Tactic Stack**

- **Core automation**:  
  - `simp`, `simp_rw`, `rw`, `refine`, `exact`, `intro`, `cases`, `by_cases`, `obtain`, `set`.  
- **Set-theoretic reasoning**:  
  - `ext`, `mem_image`, `mem_powerset`, `inter_eq_*`, `insert_erase`, `erase_insert`, `subset_iff`.  
- **Cardinality reasoning**:  
  - `card_image_of_injOn`, `card_mono`, `card_union_add_card_inter`, `card_biUnion_le`.  
- **Induction**:  
  - `memberFamily_induction_on` (custom induction on finite families).  
- **Order reasoning**:  
  - `isLowerSet`, `IsLowerSet`, `Subset.antisymm`, `sup_mono`.  
- **Decision procedures**:  
  - `decidableForallOfDecidableSubsets`, `decidableEq` context.  

---

#### **4. Proof Logic & Strategy**

- **Inductive structure**:  
  - Proofs often proceed by *member-family induction* (`memberFamily_induction_on`), splitting on whether a distinguished element `a` belongs to sets in `𝒜`.  
- **Compression-based arguments**:  
  - Use of *down-compression* (`𝓓 a 𝒜`) to reduce to simpler cases, leveraging monotonicity and inclusion lemmas (`shatterer_compress_subset_shatterer`, `vcDim_compress_le`).  
- **Equational reasoning**:  
  - Heavy use of `shatters_iff`, `subset_iff`, and `mem_shatterer` to translate between shattering and set-theoretic conditions.  
- **Cardinality bounds**:  
  - Combine combinatorial lemmas (`card_mono`, `card_biUnion_le`) with set-theoretic inclusions (e.g., `ℬ ⊆ ...`) to derive Sauer–Shelah bounds.  
- **Case analysis**:  
  - Frequent `by_cases ha : a ∈ s` or `a ∈ t` to split arguments about insertion/erasure.  

---

#### **5. Imports & Scope**

- **Core dependencies**:  
  - `Mathlib.Algebra.BigOperators.Group.Finset`: for summation over finite sets (`∑`, `card`).  
  - `Mathlib.Combinatorics.SetFamily.Compression.Down`: defines *down-compression* (`𝓓 a 𝒜`).  
  - `Mathlib.Data.Fintype.Powerset`: finite type powerset machinery (`powerset`, `Fintype.card`, `choose`).  
  - `Mathlib.Order.Interval.Finset.Nat`: interval finite sets (`Iic`, `Ici`, etc.).  
- **Scoping**:  
  - `open scoped FinsetFamily`: custom notation for set families (e.g., implicit `𝒜.Shatters s`).  
- **Domain**:  
  - *Combinatorics of set families*, *VC theory*, *extremal set theory*.  
  - Focus on *finite* sets (`DecidableEq α`, `Fintype α`), with no measure-theoretic or topological assumptions.  

--- 

This metadata captures the formalization’s structure, style, and mathematical content for use in domain-specific AI agent training or library analysis.