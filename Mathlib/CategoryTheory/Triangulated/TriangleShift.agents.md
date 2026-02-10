### Technical Brief: Shift on the Category of Triangles in a Preadditive Category with ℤ-Shift

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Triangle.shiftFunctor` | `Triangle.shiftFunctor (n : ℤ) : Triangle C ⥤ Triangle C` | Defines the shift functor on triangles: shifts each object by `n` in `C`, and scales each morphism by `(-1)^n`. |
| `Triangle.shiftFunctorZero` | `Triangle.shiftFunctor C 0 ≅ 𝟭 (Triangle C)` | Canonical isomorphism showing that shifting by `0` is naturally isomorphic to the identity functor on triangles. |
| `Triangle.shiftFunctorAdd'` | `a + b = n ⇒ Triangle.shiftFunctor C n ≅ Triangle.shiftFunctor C a ⋙ Triangle.shiftFunctor C b` | Canonical isomorphism expressing compatibility of shift functors with addition of integers. |
| `rotateRotateRotateIso` | `rotate C ⋙ rotate C ⋙ rotate C ≅ Triangle.shiftFunctor C 1` | Shows that rotating a triangle three times is naturally isomorphic to shifting by `+1`. |
| `invRotateInvRotateInvRotateIso` | `invRotate C ⋙ invRotate C ⋙ invRotate C ≅ Triangle.shiftFunctor C (-1)` | Shows that rotating thrice in the inverse direction corresponds to shifting by `-1`. |
| `invRotateIsoRotateRotateShiftFunctorNegOne` | `invRotate C ≅ rotate C ⋙ rotate C ⋙ Triangle.shiftFunctor C (-1)` | Expresses inverse rotation in terms of double rotation and a shift by `-1`. |
| `Triangle.shiftFunctor_eq`, `shiftFunctorZero_eq`, etc. | Equalities between shift structures on `Triangle C` and those defined via `Triangle.shiftFunctor` | Ensures coherence of the induced `HasShift` structure on `Triangle C`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `shiftFunctor`: for functors implementing shifts (e.g., `Triangle.shiftFunctor`, `CategoryTheory.shiftFunctor`).
  - `shiftFunctorZero`, `shiftFunctorAdd'`, `shiftFunctorAdd_eq`: for structural isomorphisms encoding unit and additive laws.
  - `rotate`, `invRotate`: standard rotation functors on triangles.
  - `iso`: suffix for natural isomorphisms (e.g., `rotateRotateRotateIso`, `invRotateIsoRotateRotateShiftFunctorNegOne`).
- **Suffixes**:
  - `'` (prime): often used for auxiliary or refined versions (e.g., `shiftFunctorAdd'` vs `shiftFunctorAdd`).
  - `_eq`: for lemmas stating equality of structures (e.g., `shiftFunctorZero_eq`).
- **Notation**:
  - `⟦n⟧'`: denotes the `n`-th shift applied to an object/morphism in `C`.
  - `n.negOnePow`: shorthand for `(-1 : ℤ)^n`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `dsimp` | Simplifying expressions involving `shiftFunctor`, `smul`, `comp`, naturality, and `negOnePow`. |
| `rw` / `erw` | Rewriting using naturality, associativity, and known lemmas like `shiftFunctorComm_hom_app_comp_shift_shiftFunctorAdd_hom_app`. |
| `aesop_cat` | Automated category-theoretic reasoning (e.g., verifying commutativity of diagrams, iso properties). |
| `ext` | Extensionality for natural transformations or functors. |
| `rfl` | Reflexivity for definitional equalities (e.g., in `shiftFunctor_eq`). |
| `smul_smul`, `Int.negOnePow_add`, `mul_comm` | Algebraic simplifications involving integer powers of `-1`. |
| `Functor.map_comp`, `Functor.map_id`, `assoc`, `comp_id` | Basic functorial and categorical identities. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs construct natural isomorphisms using `NatIso.ofComponents`, defining components at each triangle `T` and verifying naturality.
  - Components are built using `Triangle.isoMk`, requiring three component isos (for `obj₁`, `obj₂`, `obj₃`) and three commutativity conditions (`comm₁`, `comm₂`, `comm₃`).
  - Commutativity conditions are typically proven by:
    - Simplifying using `simp only [...]` with lemmas about `Linear.units_smul_comp`, `Linear.comp_units_smul`, and `Functor.map_comp`.
    - Applying naturality of shift functors (e.g., `(shiftFunctorComm C 1 n).hom.naturality`).
    - Using algebraic properties of `(-1)^n` (e.g., `Int.negOnePow_add`).
- **Inductive or structural reasoning**:
  - No explicit induction; instead, proofs rely on structural properties of the shift functors and naturality.
  - The key insight is that rotating three times introduces a sign change equivalent to shifting by `+1`, due to the `(-1)^n` scaling.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.CategoryTheory.Linear.LinearFunctor`: for linear structure and scalar multiplication by units (e.g., `(-1)^n`).
- `Mathlib.CategoryTheory.Triangulated.Rotate`: for rotation functors and triangle structure.
- `Mathlib.Algebra.Ring.NegOnePow`: for properties of `(-1 : ℤ)^n`.

**Scope**:
- Works in a **preadditive category `C` with a ℤ-shift**, where each shift functor is assumed additive.
- Constructs a **shift structure on `Triangle C`**, making it a pretriangulated category if `C` is.
- Central to formalizing derived categories and triangulated structures in homological algebra.

--- 

Let me know if you'd like a diagrammatic summary or a formalization checklist for downstream use (e.g., in derived categories or t-structures).