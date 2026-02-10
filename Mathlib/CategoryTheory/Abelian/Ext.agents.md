Here's a structured technical metadata extraction from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Ext` | `ℕ → Cᵒᵖ ⥤ C ⥤ ModuleCat R` | Defines the *Ext* bifunctor by deriving the bifunctor `(X, Y) ↦ ModuleCat.of R (unop X ⟶ Y)` in the first argument (i.e., contravariant in `X`). |
| `ChainComplex.linearYonedaObj` | `X : ChainComplex C α → A → C → CochainComplex (ModuleCat A) α` | For a chain complex `X` and object `Y`, produces the cochain complex of morphisms `Xᵢ ⟶ Y`, viewed as modules over `A`. |
| `ProjectiveResolution.isoExt` | `P : ProjectiveResolution X → n : ℕ → Y : C → ((Ext R C n).obj (Opposite.op X)).obj Y ≅ (P.complex.linearYonedaObj R Y).homology n` | Shows that `Extⁿ(X, Y)` can be computed as the `n`-th homology of the cochain complex derived from a projective resolution of `X`. |
| `isZero_Ext_succ_of_projective` | `X Y : C → [Projective X] → n : ℕ → IsZero (((Ext R C (n + 1)).obj (Opposite.op X)).obj Y)` | If `X` is projective, then `Extⁿ⁺¹(X, Y) = 0` for all `Y`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isZero_`: Used for lemmas asserting that an object is zero (i.e., isomorphic to the zero object).
  - `linearYoneda`: Refers to the linear version of the Yoneda embedding into module categories.
  - `isoExt`: Indicates an isomorphism involving `Ext`.
- **Suffixes**:
  - `_obj`: For definitions or lemmas about the object part of a functor or complex.
  - `_map`: For the morphism part (though not used here due to linter issues).
  - `_homology`: For homology groups of chain/cochain complexes.
- **Structure**:
  - `Opposite.op X`: Used to turn a covariant argument into a contravariant one via `Cᵒᵖ`.
  - `rightOp`, `leftOp`, `leftDerived`: Standard operations for deriving functors in abelian categories.

---

### **3. Tactic Stack**

- **`aesop_cat`**: Used for discharging categorical identities (`map_id`, `map_comp`) efficiently.
- **`simp_rw` / `rw`**: Rewriting with isomorphisms and definitions (e.g., `isoExt`, `homologyUnop`).
- **`refine` / `exact`**: For constructing proofs by reducing to subgoals.
- **`dsimp`**: Simplifying definitional equalities.
- **`ext`**: Extensionality for morphisms (e.g., showing a morphism is zero by extensionality).
- **`IsZero.of_iso`**: To prove an object is zero by showing it’s isomorphic to a known zero object.
- **`HomologicalComplex.exactAt_iff_isZero_homology`**: Bridge between exactness and vanishing homology.

---

### **4. Proof Logic**

- **Structure of proofs**:
  - **Isomorphism-based computation**: Proofs often reduce statements about `Ext` to statements about homology of a complex built from a projective resolution (via `isoExt`).
  - **Vanishing results**: For projective objects, use the fact that the projective resolution is concentrated in degree 0, so higher homology vanishes.
  - **Homological algebra lemmas**: Use equivalences like `exactAt_iff_isZero_homology` and `HomologicalComplex.isZero_single_obj_X` to reduce to module-theoretic properties (e.g., zero morphisms).
- **Inductive or structural?** Not inductive; relies on properties of derived functors and projective resolutions.

---

### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Category.ModuleCat.Abelian`: Ensures `ModuleCat R` is abelian.
- `Mathlib.Algebra.Homology.Opposite`: For handling opposite categories in homological algebra.
- `Mathlib.CategoryTheory.Abelian.*`: Core abelian category theory (left derived functors, opposites, projective resolutions).
- `Mathlib.CategoryTheory.Linear.Yoneda`: Linear Yoneda embedding into module categories.

**Scope**:
- Works in a general **$R$-linear abelian category $C$ with enough projectives**.
- `Ext` is defined as a bifunctor `Cᵒᵖ ⥤ C ⥤ ModuleCat R`, i.e., contravariant in the first argument, covariant in the second.
- Noncomputable (as is standard for derived functors in homological algebra).

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for extending this to derived categories.