Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `restrictFullyFaithful` | `L ⊣ R` | Constructs a restricted adjunction `L ⊣ R` from an adjunction `L' ⊣ R'` along fully faithful functors `iC : C ⥤ C'`, `iD : D ⥤ D'`, assuming coherence up to natural isomorphism (`comm1`, `comm2`). |
| `map_restrictFullyFaithful_unit_app` | `iC.map (unit.app X) = …` | Describes how the unit of the restricted adjunction maps under `iC`. |
| `map_restrictFullyFaithful_counit_app` | `iD.map (counit.app X) = …` | Describes how the counit of the restricted adjunction maps under `iD`. |
| `restrictFullyFaithful_homEquiv_apply` | `homEquiv f = …` | Gives an explicit formula for the hom-isomorphism of the restricted adjunction in terms of the original adjunction and the coherence isomorphisms. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `restrictFullyFaithful_`: for lemmas about the `restrictFullyFaithful` construction.
  - `map_`: for lemmas describing behavior under application of a functor (e.g., `map_restrictFullyFaithful_unit_app`).
- **Suffixes**:
  - `_app`: for component-wise application (e.g., `unit.app X`, `counit.app X`).
  - `_homEquiv`: for properties of the hom-isomorphism in an adjunction.
- **General patterns**:
  - `homEquiv_*`: properties of the hom-set bijection.
  - `naturality_*`: naturality conditions for natural transformations or isomorphisms.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying using `@[simp]` lemmas, especially `homEquiv_unit`, `homEquiv_counit`, and definitions like `restrictFullyFaithful`. |
| `apply ..._injective` | Leveraging fully faithfulness (`hiC.map_injective`, `hiD.map_injective`) to reduce equality proofs to ones in the ambient category. |
| `congr` | To reduce equality of morphisms to equality of components (after applying `map_injective`). |
| `exact` / `symm` / `trans` | For manipulating equation chains and naturality squares. |
| `dsimp` | To unfold definitions (e.g., in `map_restrictFullyFaithful_counit_app`). |
| `assumption` / `aesop` (implied) | Not explicitly used here, but `simp`-based automation suffices. |

---

### **4. Proof Logic**

- **Structure of `restrictFullyFaithful`**:
  - Constructs the hom-isomorphism via a chain of equivalences:
    - Use fully faithfulness of `iD` to lift morphisms.
    - Use the coherence isomorphism `comm1` to relate `iD ∘ L` and `L' ∘ iC`.
    - Apply the original adjunction’s hom-isomorphism.
    - Use `comm2` to relate `iD ∘ R'` and `R ∘ iC`.
    - Use fully faithfulness of `iC` to descend back.
  - Verifies naturality of this hom-isomorphism using:
    - Naturality of `comm1`, `comm2`, and the original adjunction.
    - Injectivity of `iC`, `iD` (from fully faithfulness) to reduce to ambient category.

- **Proofs of lemmas**:
  - Mostly `simp`-based, using `@[simp]` attributes and definitions.
  - For `restrictFullyFaithful_homEquiv_apply`, a manual step is needed due to changes in `simp` behavior (see comment referencing PR #16317).

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Adjunction.Basic` | Core adjunction theory: units, counits, hom-isomorphisms, `mkOfHomEquiv`. |
| `Mathlib.CategoryTheory.HomCongr` | Tools for congruence of morphisms, especially `Iso.homCongr`, used in constructing the hom-isomorphism chain. |

---

### **Domain Summary**

This file formalizes a standard result in category theory: **adjunctions can be restricted along fully faithful functors**, provided compatibility conditions (up to natural isomorphism) hold. It is foundational for working with reflective/subreflective subcategories and localization in category theory.

Let me know if you'd like a formalized version of the proof outline or a diagrammatic explanation.