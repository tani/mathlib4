**Technical Metadata Brief: Comonoid Objects in Cartesian Monoidal Categories (Lean 4)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cartesianComon_` | `C ⥤ Comon_ C` | Constructs the canonical comonoid structure on any object via diagonal map `diag X` and terminal morphism `terminal.from X`. |
| `counit_eq_from` | `A.counit = terminal.from A.X` | Simplifies the counit of a comonoid in a cartesian monoidal category to the unique map into the terminal object. |
| `comul_eq_diag` | `A.comul = diag A.X` | Shows that the comultiplication in any comonoid object must be the diagonal map (uniqueness due to universal property of products). |
| `iso_cartesianComon_` | `A ≅ (cartesianComon_ C).obj A.X` | Demonstrates that every comonoid is isomorphic to the canonical one on its underlying object (via identity morphism). |
| `comonEquiv` | `Comon_ C ≌ C` | Establishes the equivalence of categories between `Comon_ C` and `C`, witnessed by the forgetful functor and `cartesianComon_`. |

---

### 2. **Naming Conventions**

- **Prefixes:**
  - `cartesianComon_`: Indicates construction specific to cartesian monoidal structure.
  - `iso_`: Used for isomorphisms (e.g., `iso_cartesianComon_`).
- **Suffixes:**
  - `_eq_from`: Indicates equality with a canonical construction involving `from` (e.g., `counit_eq_from`).
  - `_eq_diag`: Indicates equality with the diagonal map.
- **General pattern:** `noun_verb_object` or `verb_noun`, with `_eq_` used for simplification lemmas about canonical forms.

---

### 3. **Tactic Stack**

- **`ext`**: Used repeatedly to extend morphisms by universal properties (e.g., product uniqueness).
- **`simpa`**: Used to simplify goals using hypotheses (e.g., `simpa using ...`).
- **`by ext`**: Standard for proving equality of morphisms in categories with products/terminal objects.
- **`[local instance]`, `[local simp]`**: Used to locally register instances and simp lemmas for `monoidalOfHasFiniteProducts`, `associator_hom`, `associator_inv`.

No heavy automation (e.g., `aesop`, `ring`, `tauto`) is used—proofs rely on categorical universal properties and `ext`-style reasoning.

---

### 4. **Proof Logic**

- **Structure:**  
  - First, define the functor `cartesianComon_` that sends an object to its canonical comonoid structure.
  - Prove that *any* comonoid structure on an object must coincide with this canonical one (`comul_eq_diag`, `counit_eq_from`).
  - Use these to construct an isomorphism `iso_cartesianComon_` between any comonoid and its image under `cartesianComon_`.
  - Assemble this into a natural isomorphism to show the equivalence `comonEquiv`.

- **Core reasoning pattern:**  
  - *Uniqueness* of comonoid structure in cartesian setting → *Isomorphism* of all comonoids with canonical ones → *Equivalence of categories*.

- **Induction or case analysis:** Not used; relies on categorical universal properties (product, terminal object).

---

### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Monoidal.Comon_` | Defines the category of comonoids in a monoidal category. |
| `Mathlib.CategoryTheory.Monoidal.OfHasFiniteProducts` | Provides the cartesian monoidal structure from finite products (terminal + binary products). |

These imports fix the ambient context: a category `C` with finite products, equipped with its canonical monoidal structure.

---

**Domain Summary:**  
This formalization demonstrates that in a cartesian monoidal category, comonoid structures are *unique up to canonical isomorphism*, and hence the category of comonoids is equivalent to the base category. This is a foundational result in categorical logic and semantics (e.g., modeling of duplication/contraction in linear logic).