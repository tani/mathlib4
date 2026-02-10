Here's a structured technical metadata summary extracted from the provided Lean 4 file on **monoidal opposites**:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `MonoidalOpposite C` | `Type u₁ → Type u₁` — a structure representing objects of the monoidal opposite category; `mop : C → Cᴹᵒᵖ` and `unmop : Cᴹᵒᵖ → C` are the forward/backward projections. |
| `Cᴹᵒᵖ` | Notation for `MonoidalOpposite C`. |
| `MonoidalOpposite.mop_injective`, `unmop_injective` | `Function.Injective` lemmas for `mop` and `unmop`. |
| `MonoidalOpposite.mop_inj_iff`, `unmop_inj_iff` | Equivalence of equality under `mop`/`unmop`. |
| `MonoidalOpposite.mop_unmop`, `unmop_mop` | Identity laws: `mop (unmop X) = X`, `unmop (mop X) = X`. |
| `MonoidalOpposite.monoidalOppositeCategory` | Instance: `Category Cᴹᵒᵖ`, with `Hom X Y := (unmop X ⟶ unmop Y)ᵒᵖ`. |
| `Quiver.Hom.mop`, `Quiver.Hom.unmop` | Morphism-level opposites: `f : X ⟶ Y ↦ mop f : mop X ⟶ mop Y`, and vice versa. |
| `mopFunctor`, `unmopFunctor` | Identity functors `C ⥤ Cᴹᵒᵖ` and `Cᴹᵒᵖ ⥤ C`. |
| `Iso.mop`, `Iso.unmop` | Isomorphism-level opposites. |
| `IsIso.mop`, `IsIso.unmop` | Instances showing `IsIso` is preserved under `mop`/`unmop`. |
| `MonoidalOpposite.monoidalCategoryMop` | Instance: `MonoidalCategory Cᴹᵒᵖ`, with reversed tensor: `tensorObj X Y := mop (unmop Y ⊗ unmop X)`. |
| `MonoidalOpposite.mopEquiv`, `unmopEquiv` | Equivalences `C ≌ Cᴹᵒᵖ` and `Cᴹᵒᵖ ≌ C`. |
| `MonoidalOpposite.mopMopEquivalence` | Equivalence `Cᴹᵒᵖᴹᵒᵖ ≌ C`. |
| `MonoidalOpposite.tensorIso`, `tensorLeftIso`, `tensorRightIso`, etc. | Natural isomorphisms identifying tensor structures between `C` and `Cᴹᵒᵖ`. |

---

### 🔹 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `mop_` / `unmop_`: for operations on objects/morphisms/functors between `C` and `Cᴹᵒᵖ`.
  - `_mop`, `_unmop`: for morphism-level operations (e.g., `f.mop`, `f.unmop`).
  - `_Iso`, `_equivalence`: for isomorphisms and equivalences.
  - `tensor*Iso`: for natural isomorphisms relating tensor structures.
- **Notation**:
  - `Cᴹᵒᵖ` for `MonoidalOpposite C`.
  - `mop X`, `unmop X` for object-level maps.
  - `f.mop`, `f.unmop` for morphism-level maps.

---

### 🔹 **Tactic Stack**

- **Core tactics**:
  - `rfl`, `congrArg`, `simp`, `dsimp`
- **Category theory-specific**:
  - `monoidal_coherence` (used in proofs of triangle/pentagon axioms)
  - `Quiver.Hom.*_inj` lemmas (e.g., `unmop_inj`, `op_inj`) to reduce equality of morphisms in opposite categories.
- **Simplification & automation**:
  - `simp` heavily used for `@[simp]` lemmas (e.g., `mop_comp`, `mop_id`, `unmop_tensorObj`, etc.)
  - `by simp` / `by dsimp; monoidal_coherence` for coherence proofs.

---

### 🔹 **Proof Logic**

- **Structure**:
  - **Inductive definitions** for `MonoidalOpposite` as a structure.
  - **Instance proofs** for `Category`, `MonoidalCategory` via explicit construction of components (`tensorObj`, `whiskerLeft`, `associator`, etc.).
  - **Verification of axioms** (naturality, triangle, pentagon) via:
    - Reduction using `simp` and `dsimp`
    - Application of `monoidal_coherence` (which internally uses purity/coherence theorems for monoidal categories)
    - Use of injectivity lemmas (`unmop_inj`, `op_inj`) to lift equalities from the base category.
- **Symmetry**:
  - Many lemmas come in dual pairs (`mop_*` and `unmop_*`), reflecting the bidirectional nature of the equivalence.

---

### 🔹 **Imports**

- `Mathlib.Tactic.CategoryTheory.Monoidal.PureCoherence`: Provides `monoidal_coherence` tactic for proving monoidal diagram commutativity.

---

### 🔹 **Summary**

This file formalizes the **monoidal opposite category** `Cᴹᵒᵖ`, where:
- Objects are the same as `C`, but denoted `mop X`.
- Morphisms are reversed in composition (via `op` on homs).
- Tensor product is reversed: `X ⊗_{Cᴹᵒᵖ} Y = mop (unmop Y ⊗_C unmop X)`.

It establishes:
- A categorical equivalence `C ≌ Cᴹᵒᵖ`
- A monoidal structure on `Cᴹᵒᵖ`
- Natural isomorphisms relating tensor functors on `C` and `Cᴹᵒᵖ`

The formalization is highly symmetric and relies on `simp`-friendly definitions and injectivity lemmas to manage the dualities.

--- 

Let me know if you'd like a diagrammatic summary or a list of lemmas grouped by purpose (e.g., "tensor compatibility", "unit/coherence", "equivalence properties").