### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPreirreducible` | `Set X → Prop` | A set `s` is *preirreducible* if any two open sets intersecting `s` also intersect *within* `s`. |
| `IsIrreducible` | `Set X → Prop` | A set `s` is *irreducible* if it is nonempty and preirreducible. |
| `PreirreducibleSpace` | `Type* → [TopologicalSpace] → Prop` | A typeclass for spaces where the whole space (`univ`) is preirreducible. |
| `IrreducibleSpace` | `Type* → [TopologicalSpace] → Prop` | A typeclass for nonempty spaces where the whole space is irreducible. |
| `irreducibleComponents` | `Set (Set X)` | The set of *maximal* irreducible subsets of `X`. |
| `irreducibleComponent` | `X → Set X` | A maximal irreducible set containing a given point `x`. |
| `isPreirreducible_iff_closure` | `↔` | Preirreducibility of `s` is equivalent to that of `closure s`. |
| `isIrreducible_iff_closure` | `↔` | Irreducibility of `s` is equivalent to that of `closure s`. |
| `isIrreducible_iff_sInter` | `↔` | Irreducibility ⇔ finite intersections of opens intersecting `s` have nonempty intersection with `s`. |
| `isPreirreducible_iff_isClosed_union_isClosed` | `↔` | Preirreducibility ⇔ if `s ⊆ z₁ ∪ z₂` with `z₁, z₂` closed, then `s ⊆ z₁` or `s ⊆ z₂`. |
| `isIrreducible_iff_sUnion_isClosed` | `↔` | Irreducibility ⇔ if `s ⊆ ⋃ t` for finite `t` of closed sets, then `s ⊆ z` for some `z ∈ t`. |
| `IsPreirreducible.image` | `→` | Continuous image of a preirreducible set is preirreducible. |
| `IsIrreducible.image` | `→` | Continuous image of an irreducible set is irreducible. |
| `Subtype.preirreducibleSpace` / `Subtype.irreducibleSpace` | `→` | Subspace topology on a (pre)irreducible subset inherits (pre)irreducibility. |
| `irreducibleComponents_eq_singleton` | `=` | In an irreducible space, the only irreducible component is the whole space. |

#### 2. **Naming Conventions**

- **Predicates on sets**:
  - `isPreirreducible_*`, `isIrreducible_*`: e.g., `isPreirreducible_empty`, `isIrreducible_singleton`.
  - `*_iff_*`: characterizations (e.g., `isPreirreducible_iff_closure`).
- **Typeclass instances**:
  - `PreirreducibleSpace`, `IrreducibleSpace`.
- **Component-related**:
  - `irreducibleComponent`, `irreducibleComponents`.
- **Properties of sets**:
  - `isClosed_*`, `dense_*`, `subset_*`, `interior_*`, `closure_*`.
- **Subtype / embedding**:
  - `Subtype.*`, `preimage_*`, `image_*`.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`, `exact`, `refine`, `intro`, `cases`, `rcases`, `obtain`
- `apply`, `show`, `by_contra`, `convert`
- `zorn_subset_nonempty` (for Zorn’s Lemma application)
- `iterate`, `all_goals`
- `subset_closure.antisymm`, `subset_closure`, `le_trans`
- `mem_image_of_mem`, `mem_preimage`, `inter_compl_nonempty_iff`
- `Finset.induction_on`, `Finset.coe_insert`, `Finset.forall_mem_insert`
- `Equiv.finsetCongr`, `Set.ext`, `funext`

#### 4. **Proof Logic**

- **Inductive structure**:
  - Proofs often proceed by induction on finite sets (`Finset.induction_on`) or use Zorn’s Lemma for maximal extensions (`zorn_subset_nonempty`).
- **Case analysis**:
  - `or_casesOn`, `eq_empty_or_nonempty`, `subset_or_not_subset`.
- **Closure-based reasoning**:
  - Many equivalences reduce to closure properties (e.g., `closure_inter_open_nonempty_iff`).
- **Duality via complementation**:
  - `compl_surjective.forall.trans`, `isPreirreducible_iff_isClosed_union_isClosed` uses complement duality.
- **Subtype & embedding arguments**:
  - Use `subtype` structure and `IsOpenEmbedding.injective` to lift properties.
- **Maximality arguments**:
  - `Maximal.antisymm`, `isClosed_of_mem_irreducibleComponents`, `eq_irreducibleComponent`.

#### 5. **Imports**

- `Mathlib.Topology.ContinuousOn`: for `ContinuousOn`, `dense_iff_inter_open`, etc.
- `Mathlib.Order.Minimal`: for `Maximal`, minimality/maximality reasoning.
- `Mathlib.Order.Zorn`: for Zorn’s Lemma (`zorn_subset_nonempty`).

---

This module formalizes foundational concepts of *irreducibility* in topology, with emphasis on:
- Set-theoretic characterizations (via open/closed sets),
- Topological closure behavior,
- Maximality (via Zorn’s Lemma),
- Behavior under continuous maps and subspaces.

It aligns with the *“too simple to be simple”* philosophy: distinguishes `IsPreirreducible` (allows empty) from `IsIrreducible` (requires nonempty), matching standard conventions in algebraic geometry and domain theory.