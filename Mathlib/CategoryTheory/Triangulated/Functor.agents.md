Here's a structured **technical metadata brief** extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mapTriangle` | `Triangle C ⥤ Triangle D` — induced functor on triangle categories from a shift-commuting functor `F : C ⥤ D`. |
| `mapTriangleCommShiftIso` | `Triangle.shiftFunctor C n ⋙ F.mapTriangle ≅ F.mapTriangle ⋙ Triangle.shiftFunctor D n` — shows `F.mapTriangle` commutes with shift functors (for `n : ℤ`). |
| `mapTriangleRotateIso` | `F.mapTriangle ⋙ rotate D ≅ rotate C ⋙ F.mapTriangle` — `F.mapTriangle` commutes with triangle rotation. |
| `mapTriangleInvRotateIso` | `F.mapTriangle ⋙ invRotate D ≅ invRotate C ⋙ F.mapTriangle` — commutes with inverse rotation (requires `F.Additive`). |
| `mapTriangleIdIso` | `(𝟭 C).mapTriangle ≅ 𝟭 (Triangle C)` — identity functor induces identity on triangles. |
| `mapTriangleCompIso` | `(F ⋙ G).mapTriangle ≅ F.mapTriangle ⋙ G.mapTriangle` — compatibility with composition. |
| `mapTriangleIso` | `F₁ ≅ F₂` (shift-compatible) ⇒ `F₁.mapTriangle ≅ F₂.mapTriangle` — functoriality up to iso. |
| `IsTriangulated` | Typeclass: `F` sends distinguished triangles to distinguished triangles. |
| `map_distinguished` | Instance of `IsTriangulated`: preserves distinguished triangles. |
| `PreservesZeroMorphisms F` | Consequence of `F.IsTriangulated` (via `map_zero`). |
| `PreservesLimitsOfShape (Discrete WalkingPair) F` | `F` preserves binary products (hence finite limits), under `IsTriangulated`. |
| `F.Additive` | Consequence of `F.IsTriangulated` (via preservation of binary products in preadditive setting). |
| `mapTriangle_essImage_of_distinguished` | If `F` is triangulated and essentially surjective on arrows, then every distinguished triangle in `D` is in the essential image of `F.mapTriangle` on distinguished triangles. |
| `isTriangulated_of_precomp` | If `F ⋙ G` and `F` are triangulated and `F` is essentially surjective on arrows, then `G` is triangulated. |
| `Octahedron.map` | Image of an octahedron under a triangulated functor. |
| `isTriangulated_of_essSurj_mapComposableArrows_two` | If `F` is triangulated, essentially surjective on composable arrows of length 2, and `C` is triangulated, then `D` is triangulated. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `mapTriangle_…`: constructions related to the induced functor on triangles.
  - `commShiftIso_…`: natural isomorphisms expressing compatibility with shift.
  - `rotate`, `invRotate`: rotation and inverse rotation of triangles.
  - `isTriangulated_…`: properties and closure results for triangulated functors.

- **Suffixes**:
  - `_iso`: natural isomorphisms (e.g., `mapTriangleIdIso`, `mapTriangleCompIso`).
  - `_comm`: naturality or compatibility conditions (e.g., `commShiftIso_hom_naturality`).
  - `_distinguished`: properties involving distinguished triangles.

- **Morphisms**:
  - `hom₁`, `hom₂`, `hom₃`: components of triangle morphisms.
  - `comm₁`, `comm₂`, `comm₃`: commutativity conditions for triangle morphisms.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated category-theoretic reasoning (commutativity, iso properties). |
| `simp only [...]` | Simplification with precise control over rewrite rules. |
| `dsimp` | Definitional simplification (e.g., unfolding `Functor.map`, `Triangle.mk`). |
| `rw [...]` | Rewriting using naturality, associativity, iso properties. |
| `congr_arg` | Equality of morphisms via equality of components. |
| `ext` | Extensionality for morphisms (e.g., triangle morphisms). |
| `apply ...` / `exact ...` | Direct proof steps, especially for typeclass instances. |
| `infer_instance` | Automatic typeclass resolution (e.g., `PreservesZeroMorphisms`, `Additive`). |
| `simpa using ...` | Simplify goal using a hypothesis. |
| `cancel_mono` | Cancellation of monomorphisms in diagrams. |

---

### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction / case analysis** is rare; most proofs are *constructive* and *diagrammatic*.
  - **Iso-based reasoning**: many results are proven by constructing natural isomorphisms and using `isoTriangleOfIso₁₂`, `isomorphic_distinguished`, etc.
  - **Component-wise verification**: triangle morphism commutativity is checked component-by-component (`hom₁`, `hom₂`, `hom₃`), often using `simp` and `aesop_cat`.
  - **Lifting properties**: essential surjectivity and full faithfulness are used to lift structures (triangles, octahedra) from `D` to `C`.
  - **Closure under composition/iso**: `IsTriangulated` is shown to be closed under composition, isomorphism, and precomposition (with essential surjectivity).

- **Common proof patterns**:
  - Construct a morphism or iso component-wise.
  - Prove commutativity of each square using naturality and shift compatibility.
  - Use `isomorphic_distinguished` to transport distinguishedness along isomorphisms.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.Triangulated.Triangulated`: core triangulated category theory.
- `Mathlib.CategoryTheory.ComposableArrows`: composable arrows and their functors.
- `Mathlib.CategoryTheory.Shift.CommShift`: shift functors and commutation with functors.

**Scope**:
- Works in the context of **pretriangulated** and **triangulated** categories with `ℤ`-shifts.
- Assumes **preadditivity**, **zero objects**, and **additivity of shift functors** for many results.
- Focuses on **functorial behavior** of triangulated structures: induced functors on triangles, preservation of distinguished triangles, and closure properties.

---

Let me know if you'd like a **dependency graph**, **signature summary**, or **Lean 4 AST metadata** for this file.