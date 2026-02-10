### Technical Metadata Brief: `GradedObject.single` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `single j` | `C ⥤ GradedObject J C` | Functor embedding an object `X : C` as a graded object concentrated in degree `j`. |
| `single₀` | `[Zero J] ⇒ C ⥤ GradedObject J C` | Special case of `single` at degree `0` when `J` has a zero element. |
| `singleObjApplyIsoOfEq j X i h` | `(single j).obj X i ≅ X` | Canonical isomorphism when `i = j`. |
| `singleObjApplyIso j X` | `(single j).obj X j ≅ X` | Specialization of above with `i := j` and `h := rfl`. |
| `isInitialSingleObjApply j X i h` | `IsInitial ((single j).obj X i)` | Shows that components outside degree `j` are initial. |
| `singleObjApplyIsoOfEq_inv_single_map` | `… ≫ (single j).map f i = f ≫ …` | Compatibility of the isomorphism with morphism mapping (inverse direction). |
| `single_map_singleObjApplyIsoOfEq_hom` | `(single j).map f i ≫ … = … ≫ f` | Compatibility of the isomorphism with morphism mapping (forward direction). |
| `singleObjApplyIso_inv_single_map` | `… ≫ (single j).map f j = f ≫ …` | Simplified version of previous lemma for `i = j`. |
| `single_map_singleObjApplyIso_hom` | `(single j).map f j ≫ … = … ≫ f` | Simplified version of previous lemma for `i = j`. |
| `singleCompEval j` | `single j ⋙ eval j ≅ 𝟭 C` | Natural isomorphism showing that `single j` is a section of `eval j`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `single_`: Core definitions and lemmas about the `single` functor.
  - `singleObjApplyIso`: Refers to canonical isomorphisms from the `j`-th component back to the original object.
  - `isInitial_`: Used for proofs that certain components are initial.

- **Suffixes**:
  - `_OfEq`: Indicates a hypothesis `i = j` is given (e.g., `singleObjApplyIsoOfEq`).
  - `_hom` / `_inv`: Distinguish between forward and backward directions of naturality squares.
  - `₀`: Abbreviation suffix for special case at zero (e.g., `single₀`).

- **Pattern**:
  - `singleObjApplyIsoOfEq j X i h` → `h : i = j`
  - `singleObjApplyIso j X` → `h := rfl`

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `subst`, `rw`, `dsimp`, `apply`, `exact`
- **Category-theoretic automation**:
  - `aesop_cat` (used in `singleCompEval`)
  - `aesop` (implied via `aesop_cat`)
- **Rewriting helpers**:
  - `@[reassoc (attr := simp)]`: Marks lemmas for automatic use in `simp`-based rewriting of associativity/reordering.

---

#### **4. Proof Logic**

- **Structure**:
  - Definitions are mostly *computational*: components defined via `if`-expressions.
  - Lemmas about morphisms use substitution (`subst h`) to reduce to `rfl` cases.
  - Naturality squares are verified by simplifying using `simp [single, singleObjApplyIso]`.
  - For `singleCompEval`, the proof leverages `NatIso.ofComponents`, requiring naturality (handled by previous lemmas) and component-wise isomorphism.

- **Inductive/Case-based reasoning**:
  - Heavy use of case analysis on `i = j` (via `if h : i = j then ... else ...`).
  - `if_pos h` / `if_neg h` used to simplify `if`-expressions.

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.GradedObject
  ```
- **Assumptions**:
  - `[Category C]`: Base category `C`.
  - `[HasInitial C]`: Ensures existence of initial object `⊥_ C`.
  - `[DecidableEq J]`: Needed for `if i = j then ... else ...`.

- **Scope**:
  - Part of `CategoryTheory.GradedObject`.
  - Defines a *section* of the evaluation functor at degree `j`.
  - Used to build adjunctions or decompositions involving graded objects.

---

### Summary

This file formalizes the embedding of an object into a graded object concentrated in a single degree `j`. It establishes:
- The functor `single j`,
- Its behavior on objects and morphisms,
- Canonical isomorphisms identifying the `j`-th component with the original object,
- Naturality of these isomorphisms,
- And the key fact that `single j` is a section of `eval j`.

It is foundational for working with graded objects in homological algebra or graded category theory.