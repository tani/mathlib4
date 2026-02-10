### Technical Brief: Lifting Properties in Category Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasLiftingProperty` | `class HasLiftingProperty (i : A ⟶ B) (p : X ⟶ Y) : Prop` | Defines that `i` has the *left lifting property* w.r.t. `p`, i.e., every commutative square built from `i` and `p` admits a lift. |
| `sq_hasLift` | `∀ {f : A ⟶ X} {g : B ⟶ Y}, CommSq f i p g → sq.HasLift` | The unique field of `HasLiftingProperty`: existence of lifts for all such squares. |
| `op` | `HasLiftingProperty i p → HasLiftingProperty p.op i.op` | Relates lifting in `C` to lifting in `Cᵒᵖ` via opposite morphisms. |
| `unop` | `HasLiftingProperty i p → HasLiftingProperty p.unop i.unop` | Dual of `op`, for morphisms in `Cᵒᵖ`. |
| `iff_op` / `iff_unop` | `↔` versions of `op` and `unop` | Establish equivalence of lifting property under op/unop. |
| `of_left_iso` | `[IsIso i] → HasLiftingProperty i p` | Any isomorphism on the left has the left lifting property w.r.t. any `p`. |
| `of_right_iso` | `[IsIso p] → HasLiftingProperty i p` | Any isomorphism on the right has the right lifting property w.r.t. any `i`. |
| `of_comp_left` | `[HasLiftingProperty i p] → [HasLiftingProperty i' p] → HasLiftingProperty (i ≫ i') p` | Closure under composition in the left argument. |
| `of_comp_right` | `[HasLiftingProperty i p] → [HasLiftingProperty i p'] → HasLiftingProperty i (p ≫ p')` | Closure under composition in the right argument. |
| `of_arrow_iso_left` / `of_arrow_iso_right` | Based on `Arrow.mk i ≅ Arrow.mk i'` | Lifting property is invariant under isomorphism of arrows (i.e., commutative squares with invertible components). |
| `iff_of_arrow_iso_left` / `iff_of_arrow_iso_right` | `↔` versions of above | Equivalence under arrow isomorphism. |
| `RetractArrow.leftLiftingProperty` | `RetractArrow g' g → HasLiftingProperty g f → HasLiftingProperty g' f` | If `g'` is a retract of `g`, then `g'` inherits left lifting w.r.t. `f`. |
| `RetractArrow.rightLiftingProperty` | `RetractArrow f' f → HasLiftingProperty g f → HasLiftingProperty g f'` | If `f'` is a retract of `f`, then `f'` inherits right lifting w.r.t. `g`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: Indicates an *instance* or *inference* rule (e.g., `of_left_iso`, `of_comp_left`).
  - `iff_`: States an equivalence (`↔`) version of a property.
  - `sq_`: Pertains to squares or square-related constructions (e.g., `sq_hasLift`).
- **Suffixes**:
  - `_left` / `_right`: Indicates which argument (left or right of the lifting pair) the property concerns.
  - `_op` / `_unop`: Relates to opposite/unop (dual) constructions.
  - `_assoc`: Used in simplification lemmas involving associativity of composition.
- **Pattern**: `of_*` for instances, `*_iso_*` for invariance under isomorphism, `*_retract_*` for retract-based propagation.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplifies using specific lemmas (especially hom-category identities, `assoc`, `inv_hom_id`, etc.). |
| `rw [...]` | Rewrites using equations (e.g., `assoc`, `sq.w`, `RetractArrow.i_w`). |
| `infer_instance` | Automatically applies instances (e.g., `sq_hasLift_of_hasLiftingProperty`). |
| `exact` / `exacts [...]` | Provides explicit proof terms or sequences of proofs. |
| `constructor` | Used for `↔` proofs (splits into two directions). |
| `have ... := ...` | Introduces intermediate facts (e.g., `have fac := sq.w`). |
| `rw [← assoc]` | Rewrites associativity in reverse to align terms. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs follow a *constructive* pattern: given a commutative square, construct a lift using existing lifts (from assumptions) and categorical identities.
  - **Inductive/Recursive structure**: For composition (`of_comp_left`, `of_comp_right`), the proof uses the assumption twice (once per factor), constructing intermediate squares and applying lifts sequentially.
  - **Iso/retract cases**: Use structural properties (e.g., inverses for isos, retraction diagrams for retracts) to reduce to known cases.
  - **Opposite/unop**: Leverage `op`/`unop` functors and `CommSq.HasLift.iff_unop`/`iff_op` to transfer properties across dual categories.

- **Typical Flow**:
  1. Extract the commutativity condition (`sq.w`) from the square.
  2. Use assumptions (`[HasLiftingProperty ...]`) to get a lift for a related square.
  3. Compose with retraction/isomorphism components to get the desired lift.
  4. Verify factorization conditions using `simp only [...]` with known identities.

---

#### **5. Imports & Scope**

- **Core Imports**:
  - `Mathlib.CategoryTheory.CommSq`: Defines commutative squares and their lifts.
  - `Mathlib.CategoryTheory.Retract`: Defines retracts of arrows (`RetractArrow`), used in final lemmas.

- **Scope**:
  - Works in a general category `C` (no assumptions like completeness/cocompleteness).
  - Universe `v` for hom-sets.
  - Focuses on *purely categorical* lifting properties, not model structures or homotopy theory (though closely related).

- **Future Work (TODO)**:
  - Direct/inverse image functors for lifting properties.
  - Connections to adjunctions (e.g., lifting properties preserved under adjoints).

--- 

This file formalizes foundational aspects of lifting properties in category theory, with emphasis on stability under isomorphism, composition, and retracts — essential for homotopical algebra and model category theory.