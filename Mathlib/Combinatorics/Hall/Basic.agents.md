### Technical Metadata Brief: Hall’s Marriage Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hallMatchingsOn` | `t : ι → Finset α → ι' : Finset ι → Type _`<br>`{ f : ι' → α | Function.Injective f ∧ ∀ x, f x ∈ t x }` | Defines the set of *matchings* (injective choice functions) over a finite subfamily `ι'` of the indexed family `t`. |
| `hallMatchingsOn.restrict` | `(h : ι' ⊆ ι'') → hallMatchingsOn t ι'' → hallMatchingsOn t ι'` | Restricts a matching on a larger index set to a smaller one; used to define the inverse system. |
| `hallMatchingsOn.nonempty` | `(h : ∀ s, #s ≤ #s.biUnion t) → Nonempty (hallMatchingsOn t ι')` | Proves nonemptiness of matchings on finite `ι'` using the finite Hall condition (`Finset.all_card_le_biUnion_card_iff_existsInjective'`). |
| `hallMatchingsFunctor` | `(Finset ι)ᵒᵖ ⥤ Type _` | Constructs an inverse system (functor from opposite of finite subsets of `ι`) whose objects are matchings and maps are restrictions. |
| `hallMatchingsOn.finite` | `Finite (hallMatchingsOn t ι')` | Shows each matching set is finite (crucial for compactness argument). |
| `Finset.all_card_le_biUnion_card_iff_exists_injective` | `∀ s, #s ≤ #s.biUnion t ↔ ∃ f, Injective f ∧ ∀ x, f x ∈ t x` | Main theorem: Hall’s condition is equivalent to existence of a global matching. Bootstraps from finite case via compactness. |
| `Fintype.all_card_le_rel_image_card_iff_exists_injective` | `∀ A, #A ≤ card (Rel.image r A) ↔ ∃ f, Injective f ∧ ∀ x, r x (f x)` | Hall’s theorem for relations with finite images of singletons. Uses `Rel.image`. |
| `Fintype.all_card_le_filter_rel_iff_exists_injective` | `∀ A, #A ≤ #{b | ∃ a ∈ A, r a b} ↔ ∃ f, Injective f ∧ ∀ x, r x (f x)` | Variant using `Finset.filter`; convenient when `β` is finite and `r` has decidable fibers. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hallMatchingsOn`: Core definition for matchings over finite index subsets.
  - `hallMatchingsFunctor`: Encodes the inverse system.
- **Suffixes**:
  - `nonempty`, `finite`: Indicate properties being established.
  - `restrict`: Denotes a restriction operation.
- **Relational variants**:
  - `rel_image`: Uses `Rel.image`.
  - `filter_rel`: Uses `Finset.filter` over a relation.
- **General pattern**:
  - `all_card_le_*_iff_exists_injective`: Hall condition (`#A ≤ #union`) ↔ existence of injective selector.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `exact`, `refine`, `cases'`: Basic proof structure.
- `simp only`, `simp_rw`, `ext`: Simplification and extensionality reasoning (especially for set equality and function extensionality).
- `convert`: For equational reasoning with convertible terms (e.g., cardinalities).
- `rw [← hu ...]`, `apply hu ...`: Use of section compatibility (`hu`) in inverse limit argument.
- `infer_instance`: To trigger typeclass resolution (e.g., `Finite`, `Fintype`).
- `Classical.indefiniteDescription`: To extract a witness from a nonempty existence proof.
- `apply Finset.card_le_card`, `apply Finset.card_image_of_injective`: Cardinality arguments.
- `aesop`, `ring` (not explicitly seen here, but implied in background arithmetic).

---

#### **4. Proof Logic**

- **Finite case** (`Finset.all_card_le_biUnion_card_iff_existsInjective'`):  
  Standard combinatorial proof — used as a black box via `hallMatchingsOn.nonempty`.

- **Infinite case** (`Finset.all_card_le_biUnion_card_iff_exists_injective`):
  1. **Compactness via inverse limits**:
     - Build inverse system `hallMatchingsFunctor` over finite subsets of `ι`.
     - Show each component is nonempty (via finite Hall ⇒ `hallMatchingsOn.nonempty`) and finite (`hallMatchingsOn.finite`).
     - Apply `nonempty_sections_of_finite_inverse_system` (requires Tychonoff / compactness).
  2. **Section → global matching**:
     - Extract function `f i := u (op {i}).val ⟨i, mem_singleton⟩`.
     - Prove injectivity using compatibility on pairs `{i, i'}`.
     - Prove `f i ∈ t i` from membership in matching on `{i}`.

- **Relational versions**:
  - Reduce to the indexed-family version via:
    - Defining `r' a := Rel.image r {a}.toFinset` or `{b | r a b}`.
    - Showing `Rel.image r A = A.biUnion r'`.
    - Rewriting Hall condition and selector condition using `r'`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.Hall.Finite` | Contains finite Hall theorem (`all_card_le_biUnion_card_iff_existsInjective'`). |
| `Mathlib.CategoryTheory.CofilteredSystem` | Provides `nonempty_sections_of_finite_inverse_system` (compactness for finite inverse systems). |
| `Mathlib.Data.Rel` | Defines `Rel.image`, used in relational formulations. |

**Core infrastructure used**:
- `Finset`, `Function`, `CategoryTheory`, `Finite`, `Fintype`, `DecidableEq`.
- Classical logic (`Classical.indefiniteDescription`, `Classical.decEq`).
- Type universes (`u`, `v`) for generality.

---

### Summary

This module formalizes Hall’s Marriage Theorem in three increasingly general relational forms, leveraging:
- A **finite combinatorial core** (from `Hall.Finite`),
- A **compactness argument** via inverse limits of finite sets (category-theoretic),
- And **typeclass-driven abstraction** over relations and finite types.

The structure exemplifies Lean’s strength in combining constructive combinatorics, category theory, and classical logic for deep mathematical results.