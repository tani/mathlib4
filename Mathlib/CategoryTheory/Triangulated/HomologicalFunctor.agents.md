Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsHomological` | `class IsHomological extends F.PreservesZeroMorphisms : Prop` | Defines when a functor `F : C ⥤ A` (from pretriangulated to abelian category) sends distinguished triangles to exact sequences. |
| `homologicalKernel` | `def homologicalKernel [F.IsHomological] : Triangulated.Subcategory C` | The strictly full triangulated subcategory of objects `X` such that `(F.shift n).obj X ≅ 0` for all `n : ℤ`. |
| `homologySequenceδ` | `noncomputable def homologySequenceδ (T : Triangle C) (n₀ n₁ : ℤ) (h : n₀ + 1 = n₁)` | Connecting homomorphism in the long exact sequence in homology induced by a distinguished triangle `T`. |
| `homologySequence_exact₁`, `exact₂`, `exact₃` | `lemma ...` | Prove exactness at the three consecutive terms in the long exact sequence: `im(f) = ker(δ)`, `im(δ) = ker(g)`, `im(g) = ker(δ')`. |
| `mem_homologicalKernel_W_iff` | `lemma ...` | Characterizes morphisms `f` in the kernel’s wide subcategory `W` as those mapped to isomorphisms by all `(F.shift n)`. |
| `homologySequenceComposableArrows₅_exact` | `lemma ...` | Encodes the 5-term exact sequence (6 objects) induced by a distinguished triangle under a homological functor. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `homologicalKernel_`: for definitions/lemmas about the kernel subcategory.
  - `homologySequence_`: for components of the long exact sequence (e.g., `exact₁`, `δ`, `ComposableArrows₅`).
  - `isHomological_`: for properties/instances related to `IsHomological`.
- **Suffixes**:
  - `_iff`: for biconditional characterizations (e.g., `mem_homologicalKernel_iff`, `mem_homologicalKernel_W_iff`).
  - `_exact`: for lemmas asserting exactness of a complex.
  - `_comp`, `_naturality`: for composition/naturality identities.
- **Pattern**:
  - `F.shiftMap`, `F.isoShift`, `F.shiftIso`: derived from `F.ShiftSequence ℤ`.
  - `distTriang`: for distinguished triangles (`Triangle C`).
  - `mor₁`, `mor₂`, `mor₃`: standard triangle morphisms.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `dsimp`: for rewriting and simplification (especially with `shiftMap`, `isoShift`, `homologySequenceδ`).
- `exact_of_δ₀`: specialized tactic for building exactness of `ComposableArrows`.
- `obtain ⟨...⟩`, `cases`, `intro`: standard intro/elimination.
- `apply`, `refine`, `have`, `suffices`: for proof construction.
- `infer_instance`: to discharge typeclass goals.
- `omega`: for integer arithmetic (e.g., `n + 1 = m`).
- `simp only [...]`: for precise simplification with custom lemmas.
- `isoMk`, `iso_of_iso`, `isIso_of_mono_of_epi`: for constructing/using isomorphisms.

---

### **4. Proof Logic**

- **Inductive/structural reasoning** on triangles and their shifts.
- **Reduction via isomorphisms**: many exactness proofs use `ShortComplex.exact_of_iso` to reduce to known exact complexes (e.g., mapping a shifted triangle to a distinguished one).
- **Use of connecting morphism properties**:
  - `comp_homologySequenceδ`, `homologySequenceδ_comp`: show that `δ` factors through zero via adjacent maps.
  - Exactness lemmas (`exact₁`, `exact₂`, `exact₃`) are proven by reducing to `F.map_distinguished_exact` on shifted triangles.
- **Characterization of kernel morphisms**:
  - Uses the long exact sequence to relate `ker(F(shift n)(f))` and `coker(F(shift n)(f))` to vanishing of homology.
  - `isIso_of_mono_of_epi` appears in proving that `f ∈ W` iff all `(F.shift n).map f` are iso.

---

### **5. Imports**

Core dependencies defining the scope:

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Homology.ShortComplex.Exact` | Exactness of short complexes, used to model 3-term sequences. |
| `Mathlib.CategoryTheory.Shift.ShiftSequence` | Formalism of shift functors and shift sequences (needed for graded functors like cohomology). |
| `Mathlib.CategoryTheory.Triangulated.Functor` | Functors between triangulated categories, preservation of triangles, etc. |
| `Mathlib.CategoryTheory.Triangulated.Subcategory` | Triangulated subcategories, including strictly full ones. |
| `Mathlib.Algebra.Homology.ExactSequence` | General tools for exact sequences in homological algebra. |

---

Let me know if you'd like a diagrammatic summary of the long exact sequence or a formalization sketch of the `homologicalKernel` subcategory.