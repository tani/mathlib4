### Technical Brief: Double Cosets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `doset (a : α) (s t : Set α)` | `Set α` | Defines the double coset subset `s * {a} * t` of `α`. |
| `mem_doset` | `b ∈ doset a s t ↔ ∃ x ∈ s, ∃ y ∈ t, b = x * a * y` | Characterizes membership in a double coset. |
| `mem_doset_self` | `a ∈ doset a H K` | Shows that `a` lies in its own double coset. |
| `doset_eq_of_mem` | `b ∈ doset a H K ⇒ doset b H K = doset a H K` | Double cosets are equal if one contains an element of the other. |
| `mem_doset_of_not_disjoint` | `¬Disjoint (doset a H K) (doset b H K) ⇒ b ∈ doset a H K` | Non-disjointness implies containment (hence equality). |
| `eq_of_not_disjoint` | `¬Disjoint (doset a H K) (doset b H K) ⇒ doset a H K = doset b H K` | Non-disjoint double cosets are equal. |
| `setoid (H K : Set G)` | `Setoid G` | Defines the equivalence relation induced by double cosets: `x ~ y ⇔ doset x H K = doset y H K`. |
| `Quotient (H K : Set G)` | `Type _` | The quotient type `H \ G / K`, i.e., equivalence classes under `setoid H K`. |
| `rel_iff` | `x ~ y ↔ ∃ h ∈ H, ∃ k ∈ K, y = h * x * k` | Explicit description of the equivalence relation. |
| `bot_rel_eq_leftRel`, `rel_bot_eq_right_group_rel` | Equality of setoids | Shows that when one subgroup is trivial (`⊥`), double cosets reduce to left/right cosets. |
| `quotToDoset` | `Quotient H K → Set G` | Maps a double coset class to its representative set. |
| `mk (H K : Subgroup G)` | `G → Quotient H K` | Canonical projection map sending `a ↦ [a]`. |
| `eq` | `mk a = mk b ↔ ∃ h ∈ H, ∃ k ∈ K, b = h * a * k` | Equality in the quotient corresponds to double coset membership. |
| `union_quotToDoset` | `⋃ q, quotToDoset q = Set.univ` | `G` is the disjoint union of double cosets. |
| `doset_union_rightCoset`, `doset_union_leftCoset` | Union over right/left cosets equals double coset | Decomposes double cosets as unions of right/left cosets. |
| `left_bot_eq_left_quot`, `right_bot_eq_right_quot` | Type equalities | Identifies `Quotient ⊥ H` and `Quotient H ⊥` with standard left/right quotients. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `doset_`: for properties of the double coset set.
  - `rel_`: for properties of the equivalence relation (`rel_iff`, `bot_rel_eq_leftRel`, etc.).
  - `quotToDoset`, `mk`, `out_eq'`: for quotient-related constructions.
  - `union_`, `disjoint_`: for union/disjointness properties.

- **Suffixes**:
  - `_eq`: for equalities (e.g., `doset_eq_of_mem`, `eq_of_not_disjoint`).
  - `_mem`: for membership lemmas (e.g., `mem_doset`, `mem_doset_self`).
  - `_left`, `_right`: for left/right coset special cases (e.g., `left_bot_eq_left_quot`, `doset_union_leftCoset`).

- **Notable patterns**:
  - `H K` used as subgroups in most definitions.
  - `op` used in `doset_union_rightCoset` to handle multiplication in opposite monoid (for right action).
  - `•` used for left multiplication action on cosets.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with definitional equalities (e.g., `Set.image2_mul`, `Set.singleton_mul_singleton`). |
| `simp only [...]` | Simplifying goals using precise lemmas (especially for membership, unions, and set equalities). |
| `rw` | Rewriting using equivalences like `rel_iff`, `eq`, or `doset_eq_of_mem`. |
| `obtain ⟨...⟩` / `rcases` | Extracting witnesses from existential hypotheses (e.g., from `mem_doset`). |
| `refine` / `rwa` | Constructing proofs step-by-step, often with `rwa` to rewrite after `refine`. |
| `congr` | Proving type equalities (e.g., in `left_bot_eq_left_quot`). |
| `ext` | Extensionality for set equality or setoid equality. |
| `contrapose!` | Turning negated assumptions into positive ones (e.g., in `disjoint_out`). |
| `aesop` (not present here) | Not used — proofs are mostly manual and set-theoretic. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Membership lemmas**: Use `simp only [mem_doset]` to reduce to existential statements, then construct witnesses.
  - **Equality of double cosets**: Prove mutual inclusion via `doset_eq_of_mem` and `eq_of_not_disjoint`.
  - **Quotient properties**: Use `Quotient.eq''` and `rel_iff` to translate equality in the quotient to group-theoretic conditions.
  - **Union/disjointness**: Use `Set.ext` + `mem_iUnion` + `mem_doset` to show covering and disjointness.
  - **Special cases (`H = ⊥` or `K = ⊥`)**: Reduce to known coset relations using `bot_rel_eq_leftRel` / `rel_bot_eq_right_group_rel`.

- **Inductive/recursive structure**: Not used — all proofs are direct and constructive.

- **Key logical flow**:
  1. Define `doset` and prove basic membership.
  2. Show `doset a H K = doset b H K ⇔ a ~ b`.
  3. Prove `~` is an equivalence relation (via `setoid`).
  4. Construct quotient and projection map `mk`.
  5. Prove union/disjointness and special cases.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Subgroup.Pointwise` | Provides `*` notation for set multiplication and `Pointwise` scoped operations. |
| `Mathlib.GroupTheory.Coset.Basic` | Supplies left/right coset definitions (`leftRel`, `rightRel`, `QuotientGroup`), used to relate double cosets to standard quotients. |

- **No `Mathlib.Tactic.Group`** (explicitly commented out in porting note).
- **Core dependencies**: Group theory, setoids, quotient types, and pointwise set operations.

---

### Summary

This file formalizes **double cosets** `H \ G / K` in a group-theoretic setting, establishing:
- The equivalence relation `x ~ y ⇔ ∃ h ∈ H, k ∈ K, y = h x k`,
- The quotient type `Quotient H K`,
- Its relationship to standard left/right coset quotients when one subgroup is trivial,
- Decomposition of `G` into disjoint double cosets.

The formalization is clean, constructive, and leverages Mathlib’s setoid/quotient infrastructure and group-theoretic lemmas.