### Technical Metadata Brief: Shrinking Lemma in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PartialRefinement u s p` | `Structure` | Represents a *partial refinement* of an open cover `u : ι → Set X` over a set `s`, with a predicate `p` on sets (e.g., compactness of closure). Includes: <br>• `toFun`: candidate refinement <br>• `carrier`: indices where refinement is already "shrunk" <br>• `isOpen`, `subset_iUnion`, `closure_subset`, `pred_of_mem`, `apply_eq` conditions |
| `PartialRefinement.le` | `PartialOrder` | Defined by inclusion of carriers and agreement on the smaller carrier; used for Zorn’s lemma application |
| `chainSup` | `PartialRefinement u s p` | Upper bound of a nonempty chain of partial refinements; constructed pointwise via `find` |
| `find` | `PartialRefinement u s p` | Choice function selecting a member of the chain containing a given index `i` in its carrier |
| `PartialRefinement.exists_gt` | `∃ v' > v` | In a **normal space**, if `i ∉ v.carrier`, then there exists a strictly larger partial refinement |
| `PartialRefinement.exists_gt_t2space` | `∃ v' > v ∧ IsCompact (closure (v' i))` | Same as above, but for **locally compact Hausdorff spaces**, ensuring compactness of closures in the refinement |
| `exists_subset_iUnion_closure_subset` | `∃ v, s ⊆ ⋃ v ∧ (∀ i, IsOpen (v i)) ∧ ∀ i, closure (v i) ⊆ u i` | **Main shrinking lemma**: for a closed set `s` in a normal space, a point-finite open cover can be shrunk so closures lie inside original sets |
| `exists_iUnion_eq_closure_subset` | `∃ v, ⋃ v = univ ∧ (∀ i, IsOpen (v i)) ∧ ∀ i, closure (v i) ⊆ u i` | Global version: shrinking a point-finite open cover of the whole space |
| `exists_subset_iUnion_closure_subset_t2space` | Same as above, but with added `∀ i, IsCompact (closure (v i))` | Shrinking lemma in locally compact Hausdorff spaces, preserving compactness of closures |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `PartialRefinement.*`: internal auxiliary constructions (e.g., `chainSup`, `find`, `apply_eq_of_chain`)
  - `exists_*`: existence theorems (e.g., `exists_gt`, `exists_subset_iUnion_closure_subset`)
- **Suffixes**:
  - `_t2space`: variants for `T2` + `LocallyCompact` spaces
  - `_closed_subset`: versions where the refined sets are *closed* (via `closure`)
- **Predicates**:
  - `p : Set X → Prop` parameter in `PartialRefinement` allows flexibility (e.g., `p = fun w => IsCompact (closure w)`)
- **Variables**:
  - `u`: original open cover
  - `v`: refinement (often `toFun` of a `PartialRefinement`)
  - `s`: target set being covered (closed or compact)
  - `carrier`: subset of indices where refinement is "active"

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `obtain` | Destruct existential/universal hypotheses (e.g., `rcases em (...) with ...`) |
| `simp only` / `simp_rw` | Simplify goals using precise rewrites (e.g., `update`, `mem_iUnion`, `closure_subset`) |
| `exact` / `refine` | Construct witnesses (e.g., `refine ⟨..., ⟨...⟩, ...⟩`) |
| `by_contra` | Proof by contradiction (e.g., to show `i ∈ v.carrier`) |
| `aesop` / `tauto` | Not used heavily here; logic is mostly explicit |
| `rw`, `rwa`, `rfl` | Rewriting equalities and assumptions |
| `push_neg`, `not_and`, `not_imp_not` | Negation manipulation (e.g., in `subset_iUnion` proofs) |
| `interval_cases`, `cases` | For `eq_or_ne j i`, `em (j = i)` |
| `zorn_le_nonempty` | Core proof engine: Zorn’s lemma for maximal element in poset of partial refinements |

---

#### **4. Proof Logic**

- **High-level strategy**:
  1. **Define a poset** of *partial refinements* with order based on inclusion of `carrier`.
  2. **Show every chain has an upper bound** using `chainSup`, defined pointwise via `find`.
     - Requires point-finiteness (`uf`) to handle maximality in index selection.
  3. **Apply Zorn’s lemma** to get a maximal element `v`.
  4. **Show `carrier = univ`** by contradiction:
     - If some `i ∉ carrier`, construct `v' > v` using separation axioms (`normal_exists_closure_subset` or `exists_open_between_and_isCompact_closure`).
     - Contradicts maximality.
- **Key lemmas**:
  - `exists_gt` / `exists_gt_t2space`: Construct strict extensions when `i ∉ carrier`.
  - `find_apply_of_mem` / `mem_find_carrier_iff`: Ensure consistency of refinements across chains.
- **Case splits**:
  - `em (j = i)` for index equality
  - `em (∃ j ≠ i, x ∈ v j)` for covering arguments
- **Closure arguments**:
  - Use `closure_subset` and `subset_closure` to relate refined and original sets.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Topology.Separation.Regular` | Provides `normal_exists_closure_subset`, used in `exists_gt` |
| `TopologicalSpace` | Basic topology infrastructure |
| `Classical` | Used for `em`, ` Classical.choice`, and `zorn_le_nonempty` |
| `Set`, `Function` | Set operations, functions, `iUnion`, `biInter`, etc. |

**Core logical assumptions**:
- `[TopologicalSpace X]`
- `[NormalSpace X]` (for main lemma)
- `[T2Space X] [LocallyCompactSpace X]` (for compact-closure version)
- `∀ x ∈ s, { i | x ∈ u i }.Finite` (point-finiteness)

---

### Summary

This formalization of the **shrinking lemma** in Lean 4 is a sophisticated application of:
- **Zorn’s lemma** to a carefully designed poset of *partial refinements*,
- **Separation axioms** (`NormalSpace`, `T2 + LocallyCompact`) to extend partial refinements,
- **Point-finiteness** to ensure chain completeness.

It supports both **local** (closed subset) and **global** (whole space) versions, and variants preserving **compactness of closures** in locally compact Hausdorff spaces. The structure is modular, with reusable auxiliary definitions (`PartialRefinement`, `find`, `chainSup`) enabling clean proof composition.