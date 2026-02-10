### Technical Metadata Brief: `Mathlib.Logic.IsEmpty`

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `IsEmpty` | `class IsEmpty (α : Sort*) : Prop` | Typeclass expressing that a type `α` has no elements; defined via `false : α → False`. |
| `isEmptyElim` | `[IsEmpty α] → (a : α) → p a` | Elimination principle for `IsEmpty`: from `a : α` and `IsEmpty α`, derive any `p a`. |
| `elim`, `elim'` | `IsEmpty α → α → p a` / `IsEmpty α → α → β` | Projection-based and non-dependent elimination tactics for `IsEmpty`. |
| `isEmpty_iff` | `IsEmpty α ↔ α → False` | Equivalence between `IsEmpty α` and the existence of a function `α → False`. |
| `not_nonempty_iff` | `¬Nonempty α ↔ IsEmpty α` | Duality between non-emptiness and emptiness. |
| `Function.isEmpty` | `[IsEmpty β] → (f : α → β) → IsEmpty α` | If codomain is empty, domain must be empty (contrapositive of function extensionality). |
| `Function.Surjective.isEmpty` | `[IsEmpty α] → f.Surjective → IsEmpty β` | Surjective image of empty domain is empty. |
| `Subtype.isEmpty_of_false` | `(∀ a, ¬p a) → IsEmpty (Subtype p)` | Subtype over an always-false predicate is empty. |
| `isEmpty_prod`, `isEmpty_sum`, etc. | `IsEmpty (α × β) ↔ IsEmpty α ∨ IsEmpty β`, etc. | Characterizations of emptiness for product, sum, sigma, subtype, function types. |
| `wellFounded_of_isEmpty` | `[IsEmpty α] → WellFounded r` | Any relation on an empty type is well-founded. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isEmpty_`: for theorems about emptiness of constructions (`isEmpty_prod`, `isEmpty_sigma`, `isEmpty_fun`, etc.)
  - `is_`: in `IsEmpty` itself (typeclass name), and `is_empty` in some lemmas (e.g., `isEmpty_Prop`)
  - `leftTotal_empty`, `rightTotal_empty`, `biTotal_empty`: properties of relations over empty domains/codomains.

- **Suffixes**:
  - `_empty`: for instances or theorems involving emptiness (`instIsEmptySum`, `isEmpty_Prop`, `isEmpty_subtype`)
  - `_elim`, `_elim'`: elimination principles.

- **Pattern**:
  - `isEmpty_` + *construction* (e.g., `isEmpty_pi`, `isEmpty_fun`, `isEmpty_sum`)
  - `instIsEmpty_` + *construction* (e.g., `instIsEmptySum`, `Prod.isEmpty_left`)
  - `isEmptyElim`, `elim`, `elim'`: elimination terms.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs in this file:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplifying `IsEmpty`-related goals using lemmas like `isEmpty_iff`, `not_nonempty_iff`, `isEmpty_prod`, etc. |
| `rw` | Rewriting using equivalences (e.g., `rw [isEmpty_iff]`, `rw [← not_nonempty_iff]`) |
| `exact`, `intro`, `cases` | Basic proof construction (e.g., `intro x`, `cases h` for `IsEmpty α`) |
| `infer_instance` | Automatically inferring `IsEmpty` instances (e.g., in `example [h : Nonempty α] [IsEmpty β] : IsEmpty (α → β) := by infer_instance`) |
| `funext` | Proving function extensionality (e.g., in `Function.extend_of_isEmpty`) |
| `apply`, `refine` | Constructing proofs via application of known lemmas (e.g., `apply IsEmpty.false`, `refine ⟨fun x ↦ ...⟩`) |
| `aesop` | Not explicitly used here, but `simp` + `rw` + `exact` suffice for most proofs. |

---

#### **4. Proof Logic**

- **Induction/Case Analysis**:
  - Most proofs are *direct* or *by cases* on `IsEmpty α` or `Nonempty α`.
  - For subtype/product/sum/sigma constructions, proofs often use:
    - `Subtype.elim`, `Prod.rec`, `Sum.rec`, `Sigma.rec`, `PSigma.rec`, etc.
    - Or `IsEmpty.false` to derive contradiction.

- **Equivalence Proofs**:
  - Many theorems are bidirectional (`↔`), proven via:
    - `iff.intro` (or `iff.iff_of_iff`), or
    - `simp only [← not_nonempty_iff, ...]` leveraging duality with `Nonempty`.

- **Instance Proofs**:
  - Often use `⟨...⟩` to construct class instances (e.g., `⟨fun x ↦ IsEmpty.false x⟩`).
  - Use `Function.isEmpty`, `Function.Surjective.isEmpty`, or `isEmptyElim` to reduce to known emptiness.

- **Well-foundedness**:
  - `wellFounded_of_isEmpty` uses `⟨isEmptyElim⟩`, leveraging that no infinite descent is possible on an empty set.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Logic.Function.Basic` | Provides basic function theory (e.g., `Function.extend`, `Surjective`, `Nonempty`, etc.) |
| `Mathlib.Logic.Relator` | Provides relational properties like `LeftTotal`, `RightTotal`, `BiTotal`, used in `leftTotal_empty`, etc. |

> **Note**: This file is foundational in logic — it defines and develops the `IsEmpty` typeclass, which is used pervasively in Mathlib to reason about empty types and their consequences (e.g., vacuous truth, contradiction, uniqueness).

--- 

Let me know if you'd like a dependency graph or a list of files that *use* `IsEmpty`.