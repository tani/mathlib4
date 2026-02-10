### Technical Metadata Brief: Locally Finite Families of Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LocallyFinite` | `ι → Set X → Prop` | Defines a family of sets as *locally finite*: every point has a neighborhood intersecting only finitely many sets. |
| `locallyFinite_of_finite` | `[Finite ι] → LocallyFinite f` | Any family indexed by a finite type is locally finite. |
| `point_finite` | `LocallyFinite f → { b | x ∈ f b }.Finite` | At each point `x`, only finitely many sets in the family contain `x`. |
| `subset` | `LocallyFinite f → (∀ i, g i ⊆ f i) → LocallyFinite g` | Subfamilies of a locally finite family are locally finite. |
| `comp_injOn`, `comp_injective` | `LocallyFinite f → InjOn/Injective g → LocallyFinite (f ∘ g)` | Pullback along injective (or injective-on-support) maps preserves local finiteness. |
| `locallyFinite_iff_smallSets` | `LocallyFinite f ↔ ∀ x, ∀ᶠ s in (𝓝 x).smallSets, ...` | Equivalence with filter-theoretic formulation using small sets. |
| `nhdsWithin_iUnion` | `hf.nhdsWithin_iUnion : 𝓝[⋃ i, f i] a = ⨆ i, 𝓝[f i] a` | Neighborhood filter of a union of locally finite closed sets splits as supremum. |
| `continuousOn_iUnion'`, `continuousOn_iUnion` | Conditions on `g` ⇒ `ContinuousOn g (⋃ i, f i)` | Gluing lemma: continuity on each closed set + local finiteness ⇒ continuity on union. |
| `closure`, `closure_iUnion`, `isClosed_iUnion` | `LocallyFinite f → ...` | Closure distributes over union for locally finite families of closed sets. |
| `iInter_compl_mem_nhds` | `LocallyFinite f → (∀ i, IsClosed (f i)) → x ∉ f i ⇒ ⋂_{x ∉ f i} (f i)ᶜ ∈ 𝓝 x` | Complement intersection of sets not containing `x` is a neighborhood of `x`. |
| `exists_forall_eventually_eq_prod`, `exists_forall_eventually_atTop_eventually_eq'`, `exists_forall_eventually_atTop_eventuallyEq` | Convergence of function sequences with locally finite support of differences | Generalized “eventual constancy” result for sequences of functions with locally finite support of changes. |
| `preimage_continuous`, `prod_left`, `prod_right` | Stability under pullback and product | Locally finite families are preserved under continuous preimages and products. |
| `Equiv.locallyFinite_comp_iff` | `LocallyFinite (f ∘ e) ↔ LocallyFinite f` | Invariance under equivalence of index types. |
| `locallyFinite_sum`, `LocallyFinite.sum_elim`, `locallyFinite_option`, `LocallyFinite.option_elim'` | Disjoint union and option extensions | Locally finite families behave well under sum/option indexing. |
| `LocallyFinite.eventually_subset` | `∀ᶠ y ∈ 𝓝 x, {i | y ∈ s i} ⊆ {i | x ∈ s i}` | For closed locally finite families, membership in sets is upper-semicontinuous. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `locallyFinite_`: standalone theorems (e.g., `locallyFinite_of_finite`, `locallyFinite_sum`)
  - `isClosed_`, `continuous_`, `closure_`: properties preserved under local finiteness
- **Suffixes**:
  - `_iff`: characterizations (e.g., `locallyFinite_iff_smallSets`)
  - `_eventually`: asymptotic behavior (e.g., `exists_forall_eventually_eq_prod`)
  - `_iUnion`, `_iInter`: union/intersection over index families
- **Internal naming**:
  - `hf`, `hg`, `h_cont`, `h_cl`, `h_cov`: standard hypothesis naming
  - `hUx`, `hN`, `hn`, `hy`: local hypothesis variables in proofs

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rcases`, `rintro`, `obtain`: destructuring existential/universal hypotheses
- `rw`, `simp`, `simp only`: rewriting using definitions and lemmas
- `exact`, `refine`, `apply`: constructing terms
- `filter_upwards`: for filter-based arguments (especially with `eventually`)
- `le_antisymm`, `ext`, `simp only [...]`: equality proofs in topology/order
- `calc`: chaining inequalities/equalities
- `by_contra`, `by_cases`: classical reasoning
- `eventually_and`, `eventually_mono`, `prod_mem_prod`: filter manipulation
- `iSup₂_le_iSup`, `iSup_mono`, `Monotone.le_map_iSup`: supremum reasoning

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a standard pattern:
  1. **Unfold definition**: use `LocallyFinite` definition to get neighborhood `U` with finite intersection.
  2. **Refine neighborhood**: construct or adjust neighborhood (e.g., `interior U`, `g ⁻¹' U`, `U ×ˢ V`) to suit new context.
  3. **Preserve finiteness**: use `finite.subset`, `finite.preimage`, or `finite_of_subset_finite`.
  4. **Apply topology lemmas**: e.g., `nhdsWithin_iUnion`, `closure_iUnion`, `continuousOn_iUnion`.
- **Induction/Recursion**: Not common; most arguments are direct or use filter convergence.
- **Filter-based reasoning**: Heavy use of `eventually`, `smallSets`, `tendsto`, and `nhdsWithin`.
- **Gluing arguments**: Prove local continuity on each `f i`, then extend to union using `continuousOn_iUnion`.

---

#### **5. Imports**

- `Mathlib.Topology.ContinuousOn`: continuity on subsets, `ContinuousOn`, `ContinuousWithinAt`
- `Mathlib.Order.Filter.SmallSets`: theory of small sets in filters, essential for `locallyFinite_iff_smallSets`

> **Scope**: This module formalizes foundational properties of *locally finite families* in topological spaces, with emphasis on:
> - Stability under set-theoretic operations (subsets, unions, closures, products)
> - Interaction with continuity and closure
> - Applications to convergence of function sequences (via “locally finite support of differences”)

--- 

Let me know if you'd like a dependency graph or a summary of how this module integrates with other Mathlib topology files (e.g., partitions of unity, paracompactness).