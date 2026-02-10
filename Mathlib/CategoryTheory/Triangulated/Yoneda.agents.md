Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `preadditiveCoyoneda.obj A` | For `A : Cᵒᵖ`, a functor `C ⥤ AddCommGrp`; the *preadditive co-Yoneda functor*. |
| `preadditiveYoneda.obj B` | For `B : C`, a functor `Cᵒᵖ ⥤ AddCommGrp`; the *preadditive Yoneda functor*. |
| `IsHomological` | A property of a functor `F : C ⥤ AddCommGrp` (or `Cᵒᵖ ⥤ AddCommGrp`) asserting that it sends distinguished triangles to long exact sequences in `AddCommGrp`. |
| `instance (A : Cᵒᵖ) : (preadditiveCoyoneda.obj A).IsHomological` | Theorem: co-Yoneda functor is homological. Proof uses `coyoneda_exact₂` on short complexes. |
| `instance (B : C) : (preadditiveYoneda.obj B).IsHomological` | Theorem: Yoneda functor is homological. Proof uses `yoneda_exact₂` on triangles. |
| `preadditiveYoneda_map_distinguished` | Lemma: For a distinguished triangle `T`, the image under `preadditiveYoneda.obj B` of its opposite short complex is exact. |
| `preadditiveCoyoneda.homologySequenceδ` | The connecting morphism in the homology long exact sequence induced by a triangle, for the co-Yoneda functor. |
| `preadditiveYoneda.homologySequenceδ` | Same for the Yoneda functor; expressed via shifted homs and `shiftFunctorAdd'`. |
| `preadditiveYoneda_shiftMap_apply` | Explicit description of the shift map in the shifted sequence structure for Yoneda. |
| `preadditiveYoneda.ShiftSequence` | Instance constructing a `ShiftSequence ℤ` structure on `preadditiveYoneda.obj B`, using shifted homs and `ShiftedHom.opEquiv'`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `preadditiveYoneda` / `preadditiveCoyoneda`: denote the preadditive enhancements of Yoneda/co-Yoneda (i.e., valued in `AddCommGrp`, not just `Ab`).
  - `homologySequenceδ`: connecting morphism in homology sequences.
  - `shiftMap`, `shiftIso`, `isoZero`: components of a `ShiftSequence` structure.
  - `exact`, `map_distinguished_op_exact`: properties of exactness for images of distinguished triangles.

- **Suffixes**:
  - `_apply`: gives an explicit formula for a morphism or action on elements.
  - `_symm`: inverse of an equivalence/isomorphism (e.g., `opEquiv'_symm_add`).
  - `_add`, `_zero`: indicate behavior under addition or zero shifts.

- **Notable patterns**:
  - `op`, `unop`: used to switch between `C` and `Cᵒᵖ`.
  - `⟦n⟧`: notation for shift by integer `n`.
  - `'` (e.g., `T.mor₃⟦n₀⟧'`): often denotes the shifted morphism in a shifted object.

---

### **3. Tactic Stack**

- `rw [ShortComplex.ab_exact_iff]`: rewrites exactness criterion in `AddCommGrp`.
- `intro ...`: standard intro for universal properties.
- `obtain ⟨x₁, hx₁⟩ := ...`: destructures existential quantifiers.
- `symm`: reverses equality (used to match target of `exact`).
- `ext`: extensionality for morphisms or functions (e.g., in `ShiftedHom`).
- `apply Category.assoc`: uses associativity of composition.
- `congr 2`: congruence for function application (used to reduce to subgoals).
- `apply (ShiftedHom.opEquiv _).injective`: injectivity of equivalence to reduce proofs.
- `rfl`, `omega`: for trivial equalities and arithmetic goals.
- `simp only [...]`: simplifies using specific lemmas.

---

### **4. Proof Logic**

- **Structure**:
  - Prove `IsHomological` by verifying the exactness condition in `AddCommGrp` using known exactness lemmas (`coyoneda_exact₂`, `yoneda_exact₂`).
  - For Yoneda, reduce to the triangle-level exactness via `unop_distinguished` and `Triangle.yoneda_exact₂`.
  - For connecting maps (`δ`), compute explicitly using definitions of `homologySequenceδ`, `shiftMap`, and `ShiftedHom.opEquiv'`.
  - Use `ShiftedHom` machinery (e.g., `opEquiv'`, `comp`, `add`, `zero`) to manipulate homs in shifted objects.

- **Common pattern**:
  - Start with an element in a kernel (e.g., `x₂ ≫ T.mor₂ = 0`).
  - Apply a known exactness lemma to lift to a preimage.
  - Use `symm` to match the required equality.
  - For shift compatibility, reduce to properties of `ShiftedHom.opEquiv'` (e.g., `opEquiv'_symm_add`, `opEquiv'_zero_add_symm`).

---

### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Homology.ShortComplex.Ab`: short complexes over `Ab ≃ AddCommGrp`.
  - `Mathlib.CategoryTheory.Preadditive.Yoneda.Basic`: preadditive Yoneda embedding.
  - `Mathlib.CategoryTheory.Shift.ShiftedHomOpposite`: shifted homs and `ShiftedHom` machinery.
  - `Mathlib.CategoryTheory.Triangulated.HomologicalFunctor`: definition of homological functors.
  - `Mathlib.CategoryTheory.Triangulated.Opposite.Pretriangulated`: opposite of pretriangulated categories.

- **Scope**:
  - Works in a *pretriangulated* category `C` with:
    - A zero object,
    - Additive shift functors `shiftFunctor C n` for all `n : ℤ`.
  - Targets `AddCommGrp` (equivalent to `Ab`), making homology groups naturally abelian groups.

---

Let me know if you'd like a diagrammatic summary or a formalization of the homological functor axioms in this context.