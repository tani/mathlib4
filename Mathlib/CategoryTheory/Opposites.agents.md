### Technical Metadata Brief: Opposite Categories in Lean 4 (Category Theory Library)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Category.opposite` | `Category.{v₁} Cᵒᵖ` | Defines the opposite category structure on `Cᵒᵖ`, with morphisms reversed. |
| `op` (on morphisms) | `f.op : Opposite.op Y ⟶ Opposite.op X` | Converts a morphism `f : X ⟶ Y` in `C` to a morphism in `Cᵒᵖ`. |
| `unop` (on morphisms) | `f.unop : unop Y ⟶ unop X` | Converts a morphism `f : X ⟶ Y` in `Cᵒᵖ` back to `C`. |
| `op_comp`, `unop_comp` | `(f ≫ g).op = g.op ≫ f.op` etc. | Express composition reversal in opposite categories. |
| `op_id`, `unop_id` | `(𝟙 X).op = 𝟙 (op X)` etc. | Identity preservation under `op`/`unop`. |
| `unopUnop`, `opOp` | Functors `Cᵒᵖᵒᵖ ⥤ C`, `C ⥤ Cᵒᵖᵒᵖ` | Double-opposite functors. |
| `opOpEquivalence` | `Cᵒᵖᵒᵖ ≌ C` | Equivalence between double opposite and original category. |
| `isIso_op`, `isIso_of_op`, `isIso_op_iff` | `IsIso f ↔ IsIso f.op` | Isomorphism reflection/preservation under `op`. |
| `op_inv`, `unop_inv` | `(inv f).op = inv f.op` etc. | Compatibility of inverses with `op`/`unop`. |
| `Functor.op`, `Functor.unop`, `Functor.leftOp`, `Functor.rightOp` | Functors between functor categories | Various “opposite” constructions on functors. |
| `NatTrans.op`, `NatTrans.unop`, `removeOp`, `removeUnop`, `leftOp`, `rightOp`, etc. | Natural transformations between opposite functors | Opposite constructions on natural transformations. |
| `Iso.op`, `Iso.unop` | Isomorphisms in opposite categories | Opposite isomorphisms. |
| `NatIso.op`, `NatIso.unop`, `removeOp` | Natural isomorphisms between opposite functors | Opposite natural isomorphisms. |
| `Equivalence.op`, `Equivalence.unop` | Equivalences between opposite categories | Opposite equivalences. |
| `opEquiv`, `isoOpEquiv` | `(A ⟶ B) ≃ (B.unop ⟶ A.unop)` etc. | Equivalences of hom-sets and isomorphism sets. |
| `opUnopEquiv`, `leftOpRightOpEquiv` | Equivalences of functor categories | Equivalences `(C ⥤ D)ᵒᵖ ≌ Cᵒᵖ ⥤ Dᵒᵖ`, etc. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `op_`: Applies `op` to morphisms/functors/natural transformations.
  - `unop_`: Applies `unop` (inverse of `op`).
  - `remove_`: Constructs original object from opposite (e.g., `removeOp`, `removeUnop`).
  - `leftOp`, `rightOp`: Specialized opposite constructions for mixed variance functors (`C ⥤ Dᵒᵖ`, `Cᵒᵖ ⥤ D`).
- **Suffixes**:
  - `_op`, `_unop`: Applied to objects (e.g., `X.op`, `X.unop`).
  - `_Iso`, `_equivalence`: For isomorphisms/equivalences between constructions.
- **Pattern**:
  - `op`, `unop`, `leftOp`, `rightOp`, `removeOp`, `removeUnop` follow a consistent naming scheme for dualizing constructions.
  - `opUnopIso`, `leftOpRightOpIso`, etc., denote canonical isomorphisms between dualized constructions.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used for category-theoretic reasoning (e.g., verifying naturality, triangle identities).
- **`simp` / `dsimp`**: Extensively used to simplify using `@[simp]` lemmas (e.g., `op_comp`, `unop_id`).
- **`ext`**: Extensionality for natural transformations, isomorphisms, and morphisms.
- **`congr_arg`**: Proves injectivity of `op`/`unop` on morphisms.
- **`rfl`**: For definitional equalities (e.g., `op_unop`, `unop_mk`).
- **`rw`**: Rewriting using lemmas like `inv_hom_id`, `op_comp`, etc.
- **`cases`**: Used in proofs like `rightOp_leftOp_eq`.

---

#### **4. Proof Logic**

- **Inductive/Definitional Reasoning**: Most proofs are short and rely on definitional properties of `op`/`unop`.
- **Component-wise Arguments**: For natural transformations and isomorphisms, proofs often reduce to component-wise verification (e.g., `by ext; dsimp; ...`).
- **Injectivity + Simplification**: Many proofs use `Quiver.Hom.op_inj` / `unop_inj` to reduce to `C`, then simplify.
- **Equivalence Construction**: For equivalences (e.g., `opOpEquivalence`, `opUnopEquiv`), the unit/counit isomorphisms are typically `Iso.refl` or derived via `NatIso.ofComponents`.
- **Functoriality Checks**: Verified by simplifying definitions and applying `aesop_cat` for naturality/triangle identities.

---

#### **5. Imports**

- **`Mathlib.CategoryTheory.Equivalence`**: Provides the core equivalence machinery (`Equivalence`, `NatIso`, etc.).
- **`Opposite`** (from `Mathlib.Data.Opposite`): Defines the `op`/`unop` type family and basic operations.

---

### Summary

This file formalizes the theory of **opposite categories**, including:
- Morphism reversal (`op`, `unop`)
- Functor and natural transformation duals (`op`, `unop`, `leftOp`, `rightOp`)
- Isomorphism and equivalence preservation
- Equivalences between functor categories (`opUnopEquiv`, `leftOpRightOpEquiv`)
- Hom-set and isomorphism equivalences (`opEquiv`, `isoOpEquiv`)

It emphasizes **definitional clarity** and **mechanical verification**, with heavy use of `@[simp]`, `@[simps]`, and `@[reassoc]` attributes to support automation and rewriting. The library avoids definitional equalities like `op (op X) = X`, instead using canonical isomorphisms and equivalences to manage coherence.