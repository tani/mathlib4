### Technical Brief: Comonoids in a Monoidal Category (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Comon_Class (X : C)` | `Class` | A *property* of an object `X : C` endowing it with comonoid structure (counit `ε`, comultiplication `Δ`, satisfying coassociativity and counit axioms). |
| `Comon_ C` | `Structure` | The *category* of comonoid objects in `C`. Objects are tuples `(X, ε, Δ, axioms)`, morphisms are `f : X ⟶ Y` preserving `ε` and `Δ`. |
| `Hom (M N : Comon_ C)` | `Structure` | Morphisms of comonoids: underlying map `f.hom` satisfying `f ≫ ε = ε` and `f ≫ Δ = Δ ≫ (f ⊗ f)`. |
| `trivial : Comon_ C` | `Def` | The trivial comonoid on the unit object `𝟙_ C`, with `ε = 𝟙`, `Δ = λ⁻¹`. Terminal in `Comon_ C`. |
| `forget : Comon_ C ⥤ C` | `Def` | Forgetful functor sending a comonoid to its underlying object and a comonoid morphism to its underlying morphism. |
| `Comon_ToMon_OpOp : Comon_ C ⥤ (Mon_ (Cᵒᵖ))ᵒᵖ` | `Def` | Contravariant equivalence sending a comonoid to a monoid in the opposite category (via op/op). |
| `Mon_OpOpToComon_ : (Mon_ (Cᵒᵖ))ᵒᵖ ⥤ Comon_ C` | `Def` | Inverse equivalence to `Comon_ToMon_OpOp`. |
| `Comon_EquivMon_OpOp : Comon_ C ≌ (Mon_ (Cᵒᵖ))ᵒᵖ` | `Thm` | Contravariant equivalence: comonoids in `C` ↔ monoids in `Cᵒᵖ`. |
| `monoidal [BraidedCategory C] : MonoidalCategory (Comon_ C)` | `Instance` | Constructs monoidal structure on `Comon_ C` via transport along the equivalence (requires braiding). |
| `tensorObj_X`, `tensorObj_counit`, `tensorObj_comul` | `Thms` | Explicit formulas for tensor product of comonoids: object, counit, comultiplication. |
| `mapComon (F : C ⥤ D) [F.OplaxMonoidal] : Comon_ C ⥤ Comon_ D` | `Def` | Induced functor on comonoids from an oplax monoidal functor `F`. |

**Notation & Shorthands**  
- `Δ := Comon_Class.comul`, `ε := Comon_Class.counit`  
- Scoped notations: `Δ[M]`, `ε[M]` for explicit `X = M`.  
- `IsComon_Hom f` is a *prop* asserting `f` is a comonoid morphism.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Comon_`: Category of comonoids (e.g., `Comon_ C`, `Comon_Class`, `Comon_ToMon_OpOp`).
  - `is_`: Property classes (e.g., `IsComon_Hom`).
  - `forget`, `trivial`, `id`, `comp`: Standard categorical constructions.
- **Suffixes**:
  - `'` (prime): Primed versions of axioms (e.g., `counit_comul'`) used internally; non-primed versions (`counit_comul`) are `simp`-normalized.
  - `Hom`: For morphism classes (`IsComon_Hom`).
  - `Obj`: For object-level constructions (e.g., `Comon_ToMon_OpOp_obj'`).
- **`unop`/`op`**: Used for moving between `C` and `Cᵒᵖ`, especially in equivalence constructions.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used heavily in `by aesop_cat` goals — combines `aesop` with category-theoretic simplification (e.g., naturality, unitors, associators).
- **`monoidal_coherence`**: For proving coherence diagrams in monoidal categories (e.g., in `trivial` definition).
- **`simp` / `rw`**: For rewriting using `simp`-lemmas (`counit_comul`, `comul_assoc`, etc.).
- **`slice_rhs`**: Used in `tensorObj_comul` to manipulate diagrammatic equations.
- **`ext` / `ext f`**: To prove equality of morphisms by extensionality (`Hom.ext`).
- **`congr` / `apply Quiver.Hom.unop_inj`**: For proving equality of morphisms after applying `op`/`unop`.
- **`dsimp`, `simp_rw`**: For simplifying with definitional equalities, especially in `mapComon`.

---

#### **4. Proof Logic**

- **Structure & Equivalence Proofs**:
  - Use `op`/`unop` to translate between `C` and `Cᵒᵖ`.
  - Prove equivalences by constructing functors `Comon_ToMon_OpOp` and `Mon_OpOpToComon_`, then show they are inverses via `NatIso.ofComponents`.
- **Monoidal Structure**:
  - Constructed via `Monoidal.transport` along the equivalence `Comon_EquivMon_OpOp`.
  - Requires `BraidedCategory C` to define the braiding-induced tensor on `Comon_ C`.
- **Explicit Computations**:
  - Lemmas like `tensorObj_comul` derive the comultiplication formula by unfolding definitions and applying naturality/unitors.
  - Use `simp` with `reassoc` attributes to normalize whiskering and associator expressions.
- ** Functoriality**:
  - `mapComon` verifies that oplax monoidal structure (`δ`, `η`) preserves comonoid laws via naturality and coherence.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Monoidal.Mon_` | Monoid objects in monoidal categories. |
| `Mathlib.CategoryTheory.Monoidal.Braided.Opposite` | Opposite of braided monoidal categories. |
| `Mathlib.CategoryTheory.Monoidal.Transport` | Transport monoidal structure along equivalences. |
| `Mathlib.CategoryTheory.Monoidal.CoherenceLemmas` | Coherence tools (unitors, associators, naturality). |
| `Mathlib.CategoryTheory.Limits.Shapes.Terminal` | Terminal objects (used to show `trivial` is terminal). |

---

### Summary

This file formalizes the theory of **comonoid objects** in a monoidal category `C`, establishing:
- A categorical structure `Comon_ C` with forgetful functor to `C`.
- A contravariant equivalence with monoids in `Cᵒᵖ`.
- A monoidal structure on `Comon_ C` when `C` is braided.
- Functoriality under oplax monoidal functors.

The development relies heavily on:
- **Opposite category machinery** (`op`, `unop`, `Cᵒᵖ`).
- **Transport of structure** along equivalences.
- **Simp-normalized axioms** with `reassoc` attributes for automated rewriting.
- **Category-theoretic automation** (`aesop_cat`, `monoidal_coherence`).

This is foundational for higher-categorical and coalgebraic constructions in Lean.