### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ClosedUnderIsomorphisms` | `class ClosedUnderIsomorphisms : Prop` | Type class asserting that a predicate `P : C → Prop` is preserved under isomorphism: if `P X` and `X ≅ Y`, then `P Y`. |
| `mem_of_iso` | `{X Y : C} → X ≅ Y → P X → P Y` | Direct consequence of the class: applying closure under isomorphism. |
| `mem_iff_of_iso` | `{X Y : C} → X ≅ Y → (P X ↔ P Y)` | Strengthening: closure under isomorphism implies *equivalence* of `P` on isomorphic objects. |
| `mem_of_isIso` | `{X Y : C} → (f : X ⟶ Y) → IsIso f → P X → P Y` | Special case of `mem_of_iso` using the isomorphism induced by an invertible morphism. |
| `mem_iff_of_isIso` | `{X Y : C} → (f : X ⟶ Y) → IsIso f → (P X ↔ P Y)` | Equivalence version for isomorphisms. |
| `isoClosure` | `C → Prop` | Definition: `isoClosure P X := ∃ Y, P Y × Nonempty (X ≅ Y)` — the *smallest* predicate extending `P` and closed under isomorphisms. |
| `mem_isoClosure_iff` | `isoClosure P X ↔ ∃ Y, P Y × Nonempty (X ≅ Y)` | Unfolding definition (by `rfl`). |
| `mem_isoClosure` | `P X → IsIso (e : X ⟶ Y) → isoClosure P Y` | If `P X` holds and `X → Y` is iso, then `Y` is in the closure. |
| `le_isoClosure` | `P ≤ isoClosure P` | `P` is pointwise ≤ its closure. |
| `monotone_isoClosure` | `P ≤ Q ⇒ isoClosure P ≤ isoClosure Q` | `isoClosure` is monotone w.r.t. pointwise order on predicates. |
| `isoClosure_eq_self` | `[ClosedUnderIsomorphisms P] ⇒ isoClosure P = P` | A predicate closed under isomorphisms equals its own closure. |
| `isoClosure_le_iff` | `[ClosedUnderIsomorphisms Q] ⇒ isoClosure P ≤ Q ↔ P ≤ Q` | Universal property: `isoClosure P` is the least `Q` closed under isomorphisms extending `P`. |
| `instance isoClosure_closed` | `ClosedUnderIsomorphisms (isoClosure P)` | The closure is always closed under isomorphisms. |

---

#### 2. **Naming Conventions**

- **Predicates & properties**:
  - `ClosedUnderIsomorphisms` — class name; follows Lean’s `is_`/`ClosedUnder_` pattern.
  - `isoClosure` — compound noun: `iso` (isomorphism) + `Closure`.
- **Membership lemmas**:
  - `mem_*` prefix for lemmas about membership in a predicate (e.g., `mem_of_iso`, `mem_isoClosure`).
- **Equivalence lemmas**:
  - `mem_iff_*` for biconditional statements (`↔`).
- **Order-theoretic lemmas**:
  - `le_*` for ≤ (e.g., `le_isoClosure`).
  - `monotone_*` for monotonicity.
- **Equality lemmas**:
  - `*_eq_self` when a construction equals the original object under assumptions (e.g., `isoClosure_eq_self`).

---

#### 3. **Tactic Stack**

- **`intro` / `rintro`**: For introducing hypotheses and destructuring existentials/products.
- **`rfl`**: Used in `mem_isoClosure_iff` to unfold definitionally.
- **`apply` / `exact`**: For applying lemmas or class instances.
- **`rw`**: Rewriting using equalities (e.g., `rw [isoClosure_eq_self]`).
- **`apply le_antisymm`**: Standard for proving equality of predicates via pointwise ≤.
- **`intro X ⟨Y, hY, ⟨e⟩⟩`**: Pattern-matching on existentials and products.
- **`exact` / `refine`**: Implicit in many proofs (e.g., constructing witnesses for `Nonempty` or `Iso`).

No heavy automation (e.g., `aesop`, `linarith`, `ring`) is used — proofs are mostly *constructive* and *manual*.

---

#### 4. **Proof Logic**

- **Inductive/constructive style**: Proofs build witnesses explicitly (e.g., for `Nonempty (X ≅ Y)` or `Iso`).
- **Common pattern**:
  1. **Unfold definitions** (e.g., `isoClosure`, `ClosedUnderIsomorphisms`).
  2. **Use isomorphism calculus**: compose/symmetrize isos (`e.symm.trans f`).
  3. **Apply closure assumption** (`mem_of_iso`, `mem_of_isIso`) when needed.
  4. **Use order-theoretic reasoning** (`le_antisymm`, `monotone_*`) for equality/inequality of predicates.
- **Key logical flow**:
  - To show `isoClosure P = P` under closure: prove `isoClosure P ≤ P` (using closure) and `P ≤ isoClosure P` (trivial).
  - To show `isoClosure P ≤ Q` iff `P ≤ Q` (when `Q` is closed): reduce to monotonicity + equality.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Iso` | Provides `Iso`, `≅`, `IsIso`, `asIso`, `Iso.refl`, `Iso.symm`, `Iso.trans`. |
| `Mathlib.Order.Basic` | Provides order-theoretic infrastructure: `≤`, `le_antisymm`, `monotone`, etc. |

No other dependencies are used — the file is self-contained within basic category theory and order theory.

--- 

Let me know if you'd like a formalized summary in Lean or a diagrammatic view of the logical dependencies.