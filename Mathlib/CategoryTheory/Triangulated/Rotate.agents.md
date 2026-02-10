Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Triangle.rotate` | `Triangle C → Triangle C` — Rotates a triangle forward: `(X → Y → Z → X[1]) ↦ (Y → Z → X[1] → Y[1])`, with the last map negated and shifted. |
| `Triangle.invRotate` | `Triangle C → Triangle C` — Inverse rotation: `(X → Y → Z → X[1]) ↦ (Z[-1] → X → Y → Z)`, using unit/counit isos of the shift equivalence to adjust domain/codomain. |
| `rotate : Triangle C ⥤ Triangle C` | Endofunctor on triangle category — acts on objects via `Triangle.rotate`, on morphisms by shifting components cyclically and applying `[1]` to the third component. |
| `invRotate : Triangle C ⥤ Triangle C` | Endofunctor — acts on objects via `Triangle.invRotate`, on morphisms by shifting components cyclically in the opposite direction, using `[-1]` on the first component. |
| `rotCompInvRot : 𝟭 ⥲ rotate ⋙ invRotate` | Unit isomorphism of the auto-equivalence — shows that rotating then inversely rotating is naturally isomorphic to identity. |
| `invRotCompRot : invRotate ⋙ rotate ⥲ 𝟭` | Counit isomorphism — shows inverse rotation then rotation is naturally isomorphic to identity. |
| `triangleRotation : Equivalence (Triangle C) (Triangle C)` | Auto-equivalence of the triangle category — encapsulates that rotation is an equivalence with inverse given by `invRotate`. |
| `instance : (rotate C).IsEquivalence` | Proves `rotate C` is an equivalence of categories (via `triangleRotation`). |
| `instance : (invRotate C).IsEquivalence` | Similarly proves `invRotate C` is an equivalence. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `rotate` / `invRotate`: for forward and inverse triangle rotation functors.
  - `Triangle.mk`: standard constructor for triangles.
  - `Triangle.isoMk`: constructor for triangle isomorphisms.
- **Suffixes**:
  - `comp`: for composition of functors (e.g., `rotCompInvRot`, `invRotCompRot`).
  - `Iso`: for isomorphisms (e.g., `unitIso`, `counitIso`).
- **Notation**:
  - `⟦n⟧'`: denotes the shift functor applied to a morphism or object (e.g., `f⟦1⟧'`, `X⟦1⟧`).
  - `shiftFunctor C n`: the shift functor for integer `n`.
  - `shiftEquiv C n`: the equivalence of shift by `n`, with unit/counit isos.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using explicit lemmas (e.g., `neg_comp`, `comp_neg`, `Functor.map_comp`, `assoc`, etc.). |
| `rw [...]` | Rewrite using naturality or triangle commutativity conditions. |
| `erw [...]` | Rewrite with definitional equality hints (e.g., `erw [← reassoc_of% f.comm₂]`). |
| `rfl` | Prove definitional equalities (e.g., naturality of natural transformations). |
| `dsimp` | Simplify definitions before `simp`. |
| `change [...]` | Change goal to definitionally equal form (e.g., to apply instance lemmas). |
| `infer_instance` | Automatically infer class instances (e.g., `IsEquivalence`). |

---

### **4. Proof Logic**

- **Structure**:
  - Define `rotate` and `invRotate` on objects and morphisms explicitly.
  - Prove triangle commutativity for morphism maps (e.g., `comm₃` for `rotate.map`, `comm₁`/`comm₃` for `invRotate.map`) using:
    - Functoriality (`Functor.map_comp`, `Functor.map_comp_assoc`)
    - Additivity (`comp_neg`, `neg_comp`, `neg_inj`)
    - Naturality of unit/counit isos (`NatTrans.naturality`)
    - Shift properties (`shift_shift_neg'`, `shift_neg_shift'`, etc.)
- **Equivalence proof**:
  - Construct natural isomorphisms `rotCompInvRot` and `invRotCompRot` using `NatIso.ofComponents`.
  - Use `Triangle.isoMk` to build triangle isomorphisms from component isos.
  - Leverage `shiftEquiv C 1`’s unit/counit isos to adjust for non-strictness of `Z[-1][1] ≅ Z`.
- **Instances**:
  - Derive `IsEquivalence` for `rotate` and `invRotate` by appealing to `triangleRotation`.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Preadditive.AdditiveFunctor` | Provides `Functor.Additive`, used to ensure shift functors are additive (needed for `shiftFunctor C n` to be well-behaved in preadditive settings). |
| `Mathlib.CategoryTheory.Triangulated.Basic` | Defines `Triangle`, `Pretriangulated`, `HasShift`, `shiftEquiv`, `shiftFunctor`, and related structures. |

---

Let me know if you'd like a diagrammatic visualization of the rotation or a formalization of the triangle category’s hom-object structure.