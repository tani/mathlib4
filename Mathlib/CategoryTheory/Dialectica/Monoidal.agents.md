### Technical Brief: Dialectica Category Symmetric Monoidal Structure (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tensorObj` | `Dial C → Dial C → Dial C` | Defines the tensor product on objects: `(X ⊗ Y).src = X.src ⨯ Y.src`, `(X ⊗ Y).tgt = X.tgt ⨯ Y.tgt`, and `rel` as an infimum of two pullbacks. |
| `tensorHom` | `(X₁ ⟶ X₂) → (Y₁ ⟶ Y₂) → (X₁ ⊗ Y₁ ⟶ X₂ ⊗ Y₂)` | Functorial action of tensor on morphisms; uses `prod.map` on components and a pullback-lift for the relation part. |
| `tensorUnit` | `Dial C` | Unit object for tensor: top object in both src and tgt, with top relation. |
| `leftUnitor`, `rightUnitor` | `tensorObj tensorUnit X ≅ X`, `tensorObj X tensorUnit ≅ X` | Left/right unitors; constructed from product unitors and simplification of pullbacks over top. |
| `associator` | `tensorObj (tensorObj X Y) Z ≅ tensorObj X (tensorObj Y Z)` | Associativity isomorphism; induced by product associator; uses pullback and inf associativity. |
| `braiding` | `tensorObj X Y ≅ tensorObj Y X` | Symmetry isomorphism; induced by product braiding; uses pullback and inf commutativity. |
| `instance : MonoidalCategory (Dial C)` | `MonoidalCategory (Dial C)` | Proves `Dial C` is monoidal via `ofTensorHom`, verifying naturality, unit, pentagon, triangle laws. |
| `instance : SymmetricCategory (Dial C)` | `SymmetricCategory (Dial C)` | Proves symmetry of monoidal structure: braiding is invertible, satisfies hexagon identities and symmetry. |

**Theorems used in verification:**
- `tensor_id`, `tensor_comp`: Verify tensor is a bifunctor.
- `associator_naturality`, `leftUnitor_naturality`, `rightUnitor_naturality`: Naturality of structural isomorphisms.
- `pentagon`, `triangle`: Monoidal coherence laws.
- `symmetry`, `braiding_naturality_left/right`, `hexagon_forward/reverse`: Symmetric monoidal coherence.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `tensor_`: for tensor-related definitions (`tensorObj`, `tensorHom`, `tensor_id`, etc.)
  - `leftUnitor`, `rightUnitor`, `associator`, `braiding`: standard monoidal/categorical structural isomorphisms.
- **Suffixes:**
  - `_naturality`: for naturality squares of structural maps.
  - `_forward`/`_reverse`: for hexagon identities (forward/reverse direction).
- **Notation:**
  - `π₁`, `π₂`: projections from product.
  - `π(a, b)`: lift of arrows `a, b` to product.
  - `X ⊗ Y`: notation for `tensorObj X Y`.
  - `𝟙 X`: identity morphism.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used heavily for category-theoretic simplification and proof automation (e.g., naturality, coherence).
- **`simp` / `simp only [...]`**: For simplifying products, pullbacks, and `Subobject` operations.
- **`rw [...]`**: Rewriting pullback composition laws and monotonicity.
- **`convert ... using 3`**: For constructing inequalities in `Subobject` lattice (via monotonicity of pullback).
- **`ext`**: Extensionality for products and morphisms in `Dial`.
- **`congr 1` / `congr`**: For congruence closure in equality proofs.
- **`inf_le_inf` / `inf_assoc` / `inf_comm`**: Lattice-theoretic reasoning in `Subobject`.

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a standard pattern:
  1. **Define structural isomorphisms** using product isomorphisms and verify relation compatibility via lattice operations (`⊓`, pullbacks).
  2. **Verify bifunctor laws** (`tensor_id`, `tensor_comp`) by extensionality and simplification.
  3. **Prove naturality** of structural maps (`associator_naturality`, etc.) via `ext` + `simp` + `congr`.
  4. **Check coherence laws**:
     - Pentagon & triangle → monoidal structure.
     - Hexagons & symmetry → symmetric monoidal structure.
  5. **Instantiate `MonoidalCategory` / `SymmetricCategory`** via `ofTensorHom`, providing all required lemmas.

- **Key reasoning techniques**:
  - **Pullback calculus**: `Subobject.pullback_comp`, `Subobject.pullback_top`, `Subobject.inf_pullback`.
  - **Monotonicity of pullback**: used to lift inequalities between morphisms to subobject inclusions.
  - **Lattice properties**: `inf_assoc`, `inf_comm`, `inf_le_inf` for handling `rel` definitions.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.CategoryTheory.Subobject.Lattice`: For `Subobject`, pullbacks, infimum, monotonicity.
  - `Mathlib.CategoryTheory.Monoidal.Braided.Basic`: For `SymmetricCategory`, braiding, hexagons.
  - `Mathlib.CategoryTheory.Dialectica.Basic`: Defines `Dial C` (not shown here, but assumed).

- **Assumptions on `C`**:
  - `[Category.{v} C]`
  - `[HasFiniteProducts C]` (needed for `prod`, unit, associators)
  - `[HasPullbacks C]` (needed for pullbacks in `rel` definition)

- **Universe polymorphism**: `universe v u`, `variable {C : Type u}`.

---

### Summary

This file formalizes that the **Dialectica category** `Dial C` over a category `C` with finite products and pullbacks carries a **symmetric monoidal structure**, where:
- Tensor is defined via product on components and pullback/inf on relations.
- Structural isomorphisms (unitors, associator, braiding) are induced from the ambient category’s product structure.
- All coherence laws are verified using a combination of extensionality, simplification, and lattice-theoretic reasoning.

The formalization is clean, modular, and leverages Lean’s `aesop_cat` and `simp` infrastructure for automation.