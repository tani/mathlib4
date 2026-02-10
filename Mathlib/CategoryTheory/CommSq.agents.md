### Technical Metadata Brief: `CategoryTheory.Comma.Arrow.CommSq`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CommSq` | `structure CommSq (f : W ⟶ X) (g : W ⟶ Y) (h : X ⟶ Z) (i : Y ⟶ Z) : Prop` | Predicate asserting that the square with edges `f, g, h, i` commutes (i.e., `f ≫ h = g ≫ i`). |
| `CommSq.w` | `f ≫ h = g ≫ i` | The witness of commutativity; marked with `@[reassoc]`. |
| `CommSq.flip` | `CommSq f g h i → CommSq g f i h` | Swaps horizontal and vertical edges (transpose of square). |
| `CommSq.of_arrow` | `f ⟶ g : Arrow C → CommSq f.hom left.right g.hom` | Extracts a commutative square from a morphism between arrows. |
| `CommSq.op` / `CommSq.unop` | `CommSq f g h i → CommSq i.op h.op g.op f.op` (and converse) | Correspondence between squares in `C` and `Cᵒᵖ`. |
| `CommSq.vert_inv` / `CommSq.horiz_inv` | `Iso`-based transformations of squares | Adjusts squares under isomorphisms on vertical/horizontal edges. |
| `CommSq.horiz_comp` | `CommSq f g h i → CommSq f' h h' i' → CommSq (f ≫ f') g h' (i ≫ i')` | Horizontal composition of commuting squares. |
| `CommSq.vert_comp` | `CommSq f g h i → CommSq i g' h' i' → CommSq f (g ≫ g') (h ≫ h') i'` | Vertical composition of commuting squares. |
| `CommSq.eq_of_mono` / `CommSq.eq_of_epi` | `[Mono i] → CommSq f g i i → f = g` (and dual) | Cancellation lemmas for equal squares with mono/epi sides. |
| `Functor.map_commSq` (alias `CommSq.map`) | `CommSq f g h i → CommSq (F.map f) (F.map g) (F.map h) (F.map i)` | Functoriality of commutative squares. |
| `LiftStruct` | `structure LiftStruct (sq : CommSq f i p g)` | Data of a *lift* (diagonal morphism `l : B ⟶ X`) making both triangles commute. |
| `LiftStruct.l`, `LiftStruct.fac_left`, `LiftStruct.fac_right` | Projections of `LiftStruct` | Witness, left triangle commutes (`i ≫ l = f`), right triangle commutes (`l ≫ p = g`). |
| `LiftStruct.op` / `LiftStruct.unop` | Equivalence of lifts in `C` and `Cᵒᵖ`. | |
| `LiftStruct.opEquiv` / `LiftStruct.unopEquiv` | `LiftStruct sq ≃ LiftStruct sq.op` | Explicit equivalence of lift structures under opposites. |
| `HasLift` | `class HasLift (sq : CommSq f i p g) : Prop` | Asserts existence of a lift (`Nonempty (LiftStruct sq)`). |
| `CommSq.lift` | `[HasLift sq] → B ⟶ X` | Noncomputable choice of a lift. |
| `fac_left`, `fac_right` | `[HasLift sq]` | Triangle commutativity for `lift`. |
| `Subsingleton_liftStruct_of_epi` / `Subsingleton_liftStruct_of_mono` | `[Epi i]` or `[Mono p] ⇒ `Subsingleton (LiftStruct sq)` | Uniqueness of lift under epi/mono conditions. |

---

#### **2. Naming Conventions**

- **Predicates & structures**:
  - `CommSq`: short for *commutative square*.
  - `LiftStruct`: *structure of a lift*.
  - `HasLift`: *existence of a lift* (class).
- **Operations**:
  - `flip`: transpose (swap horizontal/vertical).
  - `op` / `unop`: passage to/from opposite category.
  - `vert_*`, `horiz_*`: vertical/horizontal variants (e.g., `vert_inv`, `horiz_comp`).
  - `fac_left`, `fac_right`: *factorization* conditions for lift.
- **Lemmas**:
  - `eq_of_*`: cancellation lemmas using mono/epi.
  - `map_*`: functorial action.
  - `mk'`, `iff_*`, `exists_lift`: construction and equivalence lemmas for `HasLift`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop_cat`: for category-theoretic simplification (especially triangle identities, associativity).
- `rw`, `simp only`, `simp`: rewriting using `w`, `fac_left`, `fac_right`, and categorical laws.
- `ext`: extensionality for morphisms (especially in uniqueness proofs).
- `rw [← op_comp]`, `rw [← unop_comp]`: handling opposites.
- `cancel_mono`, `cancel_epi`: cancellation lemmas for mono/epi.
- `congr` (via `Nonempty.congr`): for equivalence of existence statements.

---

#### **4. Proof Logic**

- **Structure-based reasoning**: proofs often proceed by destructuring `CommSq` into its witness `w : f ≫ h = g ≫ i`, then applying categorical identities (`assoc`, `comp_id`, etc.).
- **Symmetry & duality**: many lemmas come in dual pairs (`flip`, `op`/`unop`, `vert_*`/`horiz_*`), with proofs mirroring via symmetry or `flip`.
- **Uniqueness via subsingleton**: proofs of `Subsingleton` use `cancel_mono`/`cancel_epi` and `ext`.
- **Equivalence constructions**: `opEquiv`, `unopEquiv` use `ext` and `simp` to verify inverse properties.
- **Functoriality**: `map_commSq` uses `congr_arg` on `F.map` applied to the equality `w`.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Comma.Arrow`: provides `Arrow C` and morphisms between arrows (used in `of_arrow`).
- Implicit dependencies (via `Category C`):
  - `CategoryTheory.Category.Basic`
  - `CategoryTheory.Functor.Basic`
  - `CategoryTheory.MonoEpi.Basic`
  - `CategoryTheory.Iso.Basic`
  - `CategoryTheory.Limits.Shapes.Pullback` (indirectly via future work notes)

> **Note**: This file is foundational for higher-level constructions like `IsPullback`/`IsPushout` (see `CategoryTheory.Shapes.Limits.CommSq`), and lifting properties (future work: refactor `LiftStruct` for general lifting lemmas).

--- 

Let me know if you'd like a diagrammatic summary or a formalization roadmap for lifting properties.