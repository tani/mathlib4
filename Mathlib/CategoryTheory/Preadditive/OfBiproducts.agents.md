### Technical Brief: Constructing a Semiadditive Structure from Binary Biproducts in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `leftAdd` | `leftAdd (f g : X ⟶ Y) : X ⟶ Y` | Defines addition via biproduct *codiagonal*: `X → Y ⊞ Y → Y`, using `lift f g` followed by `desc (𝟙 Y) (𝟙 Y)`. |
| `rightAdd` | `rightAdd (f g : X ⟶ Y) : X ⟶ Y` | Defines addition via biproduct *diagonal*: `X → X ⊞ X → Y`, using `lift (𝟙 X) (𝟙 X)` followed by `desc f g`. |
| `isUnital_leftAdd` | `EckmannHilton.IsUnital (· +ₗ ·) 0` | Shows `+ₗ` has unit `0`, i.e., `0 +ₗ f = f = f +ₗ 0`. |
| `isUnital_rightAdd` | `EckmannHilton.IsUnital (· +ᵣ ·) 0` | Shows `+ᵣ` has unit `0`, i.e., `0 +ᵣ f = f = f +ᵣ 0`. |
| `distrib` | `(f +ᵣ g) +ₗ h +ᵣ k = (f +ₗ h) +ᵣ g +ₗ k` | Interchange law (distributivity) between `+ₗ` and `+ᵣ`, crucial for Eckmann–Hilton argument. |
| `addCommMonoidHomOfHasBinaryBiproducts` | `AddCommMonoid (X ⟶ Y)` | Constructs the commutative monoid structure on hom-sets using `+ᵣ` as addition, justified by Eckmann–Hilton. |
| `add_eq_right_addition` | `f + g = biprod.lift (𝟙 X) (𝟙 X) ≫ biprod.desc f g` | Identifies the abstract `+` with `+ᵣ`. |
| `add_eq_left_addition` | `f + g = biprod.lift f g ≫ biprod.desc (𝟙 Y) (𝟙 Y)` | Identifies `+` with `+ₗ`, via Eckmann–Hilton equivalence. |
| `add_comp` | `(f + g) ≫ h = f ≫ h + g ≫ h` | Left distributivity of composition over addition. |
| `comp_add` | `f ≫ (g + h) = f ≫ g + f ≫ h` | Right distributivity of composition over addition. |

---

#### **2. Naming Conventions**

- **Infix operators**:  
  - `+ₗ` for `leftAdd`, `+ᵣ` for `rightAdd` — reflects left/right biproduct constructions.
- **Prefixes**:
  - `isUnital_`: proves unitality of binary operations.
  - `add_`: properties of the induced addition (e.g., `add_comp`, `add_eq_*`).
- **Suffixes**:
  - `_hom`: indicates construction of an algebraic structure on hom-sets (`addCommMonoidHomOfHasBinaryBiproducts`).
  - `_assoc`, `_comm`: used in proofs of monoid properties (`mul_assoc`, `mul_comm` from `EckmannHilton`).
- **Variable naming**:
  - `f, g, h, k`: generic morphisms.
  - `X, Y, Z`: objects.
  - `diag`, `h₁`, `h₂`: intermediate morphisms in proofs.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used repeatedly in extensionality proofs (`ext`) for verifying biproduct diagram commutativity.
- **`simp`** with specialized lemmas:
  - `biprod.lift_fst`, `biprod.lift_snd`, `biprod.inl_desc`, `biprod.inr_desc`, `comp_zero`, `zero_comp`, `Category.assoc`, `Category.comp_id`.
- **`ext`**: Extensionality for morphisms (using `Category.ext` implicitly via `aesop_cat` or manual `ext`).
- **`congr`** + **`congr_fun₂`**: To apply function extensionality or congruence for equality of morphisms.
- **`rw [reassoc_of% ...]`**: Reassociation using `reassoc_of` tactic (from `CategoryTheory.Reassoc`), critical for manipulating composites in biproduct diagrams.

---

#### **4. Proof Logic**

- **Structure of main proof**:
  1. Define two candidate additions `+ₗ` and `+ᵣ`.
  2. Prove both are unital at `0` (`isUnital_leftAdd`, `isUnital_rightAdd`) using biproduct universal properties and zero morphism axioms.
  3. Prove the *interchange law* (`distrib`) by constructing a mediating morphism `diag : X ⊞ X → Y ⊞ Y` and verifying diagrammatic commutativity.
  4. Apply **Eckmann–Hilton argument** (`EckmannHilton.mul`, `mul_assoc`, `mul_comm`) to deduce:
     - `+ₗ = +ᵣ`
     - The operation is associative, commutative, and unital.
  5. Define `addCommMonoidHomOfHasBinaryBiproducts` using `+ᵣ` as the addition.
  6. Prove compatibility with composition (`add_comp`, `comp_add`) using the concrete descriptions of `+`.

- **Inductive/structural pattern**:
  - Most proofs proceed by:
    - Introducing biproduct universal properties (`lift`, `desc`, `inl`, `inr`, `fst`, `snd`).
    - Applying `ext` to reduce to component-wise equalities.
    - Simplifying with `simp` using biproduct lemmas and zero morphism axioms.
    - Using `aesop_cat` to discharge trivial diagrammatic reasoning.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.Biproducts` | Provides biproducts (`biprod.lift`, `desc`, `inl`, `inr`, `fst`, `snd`) and basic lemmas. |
| `Mathlib.GroupTheory.EckmannHilton` | Supplies the Eckmann–Hilton argument machinery (`IsUnital`, `mul`, `mul_assoc`, `mul_comm`). |
| `Mathlib.Tactic.CategoryTheory.Reassoc` | Supplies `reassoc_of` tactic for automated reassociation of composites. |

**Scope**: This file formalizes the classical result that *any category with zero morphisms and binary biproducts is enriched over commutative monoids* — i.e., it is **semiadditive**. It does *not* assume or construct additivity of functors, only the enrichment of the base category.

--- 

Let me know if you'd like a diagrammatic sketch of the `distrib` proof or automation suggestions for similar semiadditivity constructions.