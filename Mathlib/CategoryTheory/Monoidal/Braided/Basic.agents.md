### Technical Brief: Braided and Symmetric Monoidal Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `BraidedCategory` | `class` | Adds a natural isomorphism `β_ X Y : X ⊗ Y ≅ Y ⊗ X` satisfying naturality and hexagon identities. |
| `braiding` | `∀ X Y, X ⊗ Y ≅ Y ⊗ X` | The braiding natural isomorphism. |
| `braiding_naturality_left/right` | `f ▷ Z ≫ β_Y Z = β_X Z ≫ Z ◁ f` (and dual) | Naturality of braiding in each argument. |
| `hexagon_forward/reverse` | Equations involving associators `α_` and `β_` | coherence conditions ensuring braiding interacts well with associativity. |
| `symmetry` | `β_X Y.hom ≫ β_Y X.hom = 𝟙 (X ⊗ Y)` | Defines symmetric monoidal categories (extends `BraidedCategory`). |
| `Functor.LaxBraided` | `class` | Lax monoidal functors preserving braiding: `μ ≫ F(β) = β ≫ μ.flip`. |
| `Functor.Braided` | `class` | Monoidal functors preserving braiding (extends `LaxBraided`). |
| `tensorμ`, `tensorδ` | `C × C × C × C → C` | Natural isomorphisms used to make the tensor product functor `⊗ : C × C → C` monoidal. |
| `tensorMonoidal` | `instance` | Proves `⊗` is a monoidal functor under braiding + coherence. |
| `braiding_leftUnitor/rightUnitor` | `β_X 𝟙 ≫ λ_X = ρ_X`, `β_𝟙 X ≫ ρ_X = λ_X` | Braiding interacts with unitors. |
| `braiding_tensorUnit_left/right` | `β_𝟙 X = λ_X ≫ ρ_X⁻¹`, `β_X 𝟙 = ρ_X ≫ λ_X⁻¹` | Explicit formulas for braiding with unit. |
| `yang_baxter` | Equation in `C` | The Yang–Baxter equation for braiding, derived from hexagon identities. |
| `symmetricCategoryOfFaithful` | `def` | If a faithful braided functor lands in a symmetric category, source is symmetric. |
| `braidedCategoryOfFaithful/fullyFaithful` | `def` | Pull back braiding along (fully) faithful monoidal functors. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `braiding_`: properties of the braiding natural isomorphism.
  - `hexagon_`: consequences of hexagon identities.
  - `tensor_`: constructions related to making `⊗` monoidal (`tensorμ`, `tensorδ`).
  - `leftUnitor`, `rightUnitor`: unitors `λ`, `ρ`.
  - `yang_baxter`: coherence for triple braiding.
- **Suffixes**:
  - `_left`, `_right`: argument position in naturality or tensor.
  - `_aux₁`, `_aux₂`: intermediate lemmas in proofs.
  - `_iso`: iso-form versions of equations (e.g., `hexagon_forward_iso`).
  - `_inv`: for inverses of braiding or related maps.
- **Notation**:
  - `β_` → `BraidedCategory.braiding`
  - `μ`, `ε`, `α_`, `λ_`, `ρ_`: standard monoidal structure.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `aesop_cat`: used extensively for naturality and coherence proofs.
  - `simp_rw`, `simp`: for rewriting with `β_`, unitors, associators.
  - `monoidal`: simplifies monoidal expressions using associator/unitors.
  - `cancel_mono`, `cancel_epi`: to cancel monos/epis in diagrams.
  - `rw [assoc]`, `assoc`, `reassoc`: manage associativity.
  - `slice_lhs/rhs`: isolate subterms for targeted rewriting.
  - `convert ... using 1`: for equational reasoning with `monoidal`.
  - `Iso.ext`, `Iso.inv_ext`, `Iso.inv_ext'`: prove iso equality via hom/inv.
  - `Quiver.Hom.unop_inj`, `unmop_inj`: injectivity for opposite categories.

---

#### **4. Proof Logic**

- **Inductive/structural pattern**:
  - Most proofs proceed by:
    1. Expanding definitions (`dsimp`/`simp`).
    2. Applying naturality of `β_`, `α_`, `μ`, etc.
    3. Using hexagon identities to rewrite composites.
    4. Canceling invertible morphisms (`cancel_mono`, `cancel_epi`).
    5. Applying `monoidal` to normalize tensor expressions.
- **Key reasoning steps**:
  - **Hexagon → Yang–Baxter**: `yang_baxter` is derived by composing hexagon identities and applying naturality.
  - **Unitors ↔ Braiding**: Lemmas like `braiding_leftUnitor` use triangle identity + hexagon + naturality.
  - **Opposite categories**: Braiding on `Cᵒᵖ` or `Cᴹᵒᵖ` is defined via `β_Y X.op` (swap arguments + op/unop).
  - **Faithful pullback**: To lift braiding along `F : C → D`, define `β^C := F⁻¹(β^D)` and verify axioms using faithfulness.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  ```lean
  import Mathlib.CategoryTheory.Monoidal.Discrete
  import Mathlib.CategoryTheory.Monoidal.NaturalTransformation
  import Mathlib.CategoryTheory.Monoidal.Opposite
  import Mathlib.Tactic.CategoryTheory.Monoidal.Basic
  import Mathlib.CategoryTheory.CommSq
  ```
- **Scope**:
  - Formalizes braided/symmetric monoidal categories, functors, and natural transformations.
  - Includes coherence results (Yang–Baxter, unitors), constructions on opposites, and discrete examples (`CommMonoid` → `Discrete M`).
  - Lays groundwork for future work: Drinfeld center, pseudo-natural transformations.

--- 

This module is a foundational reference for higher categorical structures involving symmetry, with heavy reliance on diagrammatic reasoning and monoidal coherence.