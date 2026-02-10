### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsStableUnderRetracts` | `class IsStableUnderRetracts (P : MorphismProperty C) : Prop` | Defines that a morphism property `P` is closed under retracts: if `g` has `P` and `f` is a retract of `g`, then `f` has `P`. |
| `of_retract` | `lemma of_retract {P} [IsStableUnderRetracts P] {f g} (h : RetractArrow f g) (hg : P g) : P f` | Eliminator for the class: extracts `P f` from a retract witness and `P g`. |
| `IsStableUnderRetracts.monomorphisms` | `instance` | Shows that monomorphisms are stable under retracts. |
| `IsStableUnderRetracts.epimorphisms` | `instance` | Shows that epimorphisms are stable under retracts. |
| `IsStableUnderRetracts.isomorphisms` | `instance` | Shows that isomorphisms are stable under retracts. |

#### 2. **Naming Conventions**

- **Class name**: `IsStableUnderRetracts` — follows Lean/CategoryTheory convention: `Is<Property>` for properties, with descriptive suffix `UnderRetracts`.
- **Instance names**: `IsStableUnderRetracts.<property>` — e.g., `monomorphisms`, `epimorphisms`, `isomorphisms`.
- **Lemma name**: `of_retract` — action-oriented, derived from the class name (`of_` + `retract`), consistent with Lean’s “constructor/eliminator” naming (`of_`, `intro`, `elim`, etc.).
- **Variable naming**: `f`, `g` for morphisms; `X`, `Y`, `Z`, `W` for objects; `h` for retract witness (`RetractArrow f g`).

#### 3. **Tactic Stack**

- **Core tactics used**:
  - `rw` — for rewriting along equalities (especially categorical identities like associativity, retract diagrams).
  - `Category.assoc`, `Category.assoc_assoc`, `assoc_of%`, `assoc_assoc%` — lemmas for associativity.
  - `cancel_mono`, `cancel_epi`, `IsIso.hom_inv_id_assoc`, `IsIso.inv_hom_id_assoc` — cancellation and inverse lemmas.
  - `reassoc_of%`, `w` — for reassociating compositions in diagrams.
  - `refine` — to construct morphisms for isomorphism proofs (e.g., `⟨h.i.right ≫ inv g ≫ h.r.left, ?_, ?_⟩`).
  - `assumption` (implicit via `?_`) — for trivial subgoals.

#### 4. **Proof Logic**

- **General proof pattern**:
  - For each property (`Mono`, `Epi`, `Iso`), prove stability by:
    1. Taking a retract `h : RetractArrow f g`.
    2. Assuming `P g` (e.g., `hg : Mono g`).
    3. Constructing the required witness for `P f` (e.g., a left inverse for `Mono`, or an inverse for `Iso`).
    4. Using diagrammatic equalities (retract axioms: `h.i_w`, `h.r_w`, `h.retract_left`, `h.retract_right`) and categorical identities to verify the witness satisfies the property.
- **Mono/Epi proofs**:
  - Use cancellation lemmas (`cancel_mono`, `cancel_epi`) to reduce to known properties of `g`.
  - Leverage `rw [← cancel_mono h.i.left, ...]` to push diagrams through the retract structure.
- **Iso proof**:
  - Explicitly constructs an inverse: `h.i.right ≫ g⁻¹ ≫ h.r.left`.
  - Verifies both sides of the inverse law using retract equations and `IsIso` lemmas.

#### 5. **Imports**

- `Mathlib.CategoryTheory.Retract` — provides `RetractArrow`, retract diagrams, and basic retract theory.
- `Mathlib.CategoryTheory.MorphismProperty.Basic` — defines `MorphismProperty`, the typeclass `IsStableUnderRetracts`, and foundational morphism properties (`Mono`, `Epi`, `IsIso`).

---

This file formalizes a foundational stability property in category theory: that certain classes of morphisms (monos, epis, isos) are closed under retracts. It uses Lean’s typeclass mechanism to abstract over stability, and leverages categorical diagrammatic reasoning with precise rewriting.