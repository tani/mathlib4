Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsCompatibleWithTriangulation` | `class` | States that a class of morphisms `W` is compatible with the triangulated structure: given maps between distinguished triangles that commute on the first two legs and are in `W`, there exists a lift on the third leg also in `W`. |
| `essImageDistTriang` | `Set (Triangle D)` | The set of triangles in `D` isomorphic to the image under `L` of distinguished triangles in `C`. Used to define the candidate distinguished triangles on the localization. |
| `rotate_essImageDistTriang` | `lemma` | Shows that the essential image of distinguished triangles is closed under rotation. |
| `complete_distinguished_essImageDistTriang_morphism` | `lemma` | Under a certain surjectivity condition on morphisms between essential images, gives the third component of a triangle morphism. A technical stepping stone. |
| `distinguished_cocone_triangle` | `lemma` | For any morphism `f : X → Y` in `D`, constructs a distinguished triangle `X → Y → Z → X[1]` in the essential image of `L`. Key for constructing cocones. |
| `complete_distinguished_triangle_morphism` | `lemma` | Main extension lemma: given two triangles in the essential image and maps between their first two objects commuting with the structure map, there exists a third map completing the triangle morphism — assuming `W` is compatible with triangulation. |
| `pretriangulated` | `def` | Defines the pretriangulated structure on `D` (or `W.Localization`) by taking `essImageDistTriang` as the distinguished triangles. |
| `isTriangulated_functor` | `instance` | Shows that `L` is a triangulated functor when `D` is equipped with the pretriangulated structure. |
| `isTriangulated` | `lemma` | If `C` is triangulated and `L` is triangulated, then so is `D`. |
| `distTriang_iff` | `lemma` | Under additional assumptions (e.g., `L` is triangulated and essentially surjective on arrows), a triangle in `D` is distinguished iff it lies in the essential image of `L` of a distinguished triangle in `C`. |

---

### 🔹 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `essImage_`: Essential image constructions (`essImageDistTriang`).
  - `compatible_with_`: Compatibility conditions (`compatible_with_triangulation`, `compatible_with_shift`).
  - `rotate_`, `invRotate`: Rotation-related operations.
  - `complete_distinguished_triangle_morphism`: Extension of morphisms between triangles.
  - `distinguished_cocone_triangle`: Construction of distinguished triangles from morphisms.
  - `mapTriangle`, `mapArrow`: Functors induced by `L` on triangles/arrows.
  - `commShiftIso`, `commShift`: Commutativity of `L` with shift functors.
  - `isIso_of_isIsos`: Criterion for triangle morphisms to be isomorphisms.

- **Suffixes**:
  - `_mem_`: Membership lemmas (e.g., `essImageDistTriang_mem_of_iso`).
  - `_iff_`: Equivalence lemmas (e.g., `distTriang_iff`).
  - `_of_`: Construction from data (e.g., `isTriangulated_of_essSurj_mapComposableArrows_two`).
  - `_assoc`, `_reassoc`: Rewriting associativity.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `obtain ⟨…⟩`: To destruct existential or product types.
- `rw [...]`: Rewriting using lemmas, definitions, or isomorphism properties.
- `simp only [...]`: Simplification with precise lemmas.
- `dsimp`: Definitional simplification (often before `simp`).
- `exact`, `refine`: To construct terms with holes.
- `apply`, `apply_fun`: For applying functors or morphisms.
- `cancel_mono`, `cancel_epi`: Cancellation lemmas in preadditive categories.
- `iso_inv_id`, `hom_inv_id`, `inv_hom_id`: Isomorphism identities.
- `assoc`, `reassoc_of%`, `Functor.map_comp`, `Functor.map_comp_assoc`: Category-theoretic rewrites.
- `aesop`, `ring`: Likely used in auxiliary simplifications (not explicit here, but standard in Mathlib).

---

### 🔹 **Proof Logic**

- **High-level strategy**:
  1. **Lift data to `C`** using essential surjectivity and left calculus of fractions (e.g., `exists_leftFraction`, `essSurj_mapArrow`).
  2. **Use triangulated structure of `C`** to construct objects/morphisms (e.g., `distinguished_cocone_triangle`, `compatible_with_triangulation`).
  3. **Descend back to `D`** via `L`, using invertibility of fractions (`inverts L W`) and compatibility with shifts (`commShiftIso`).
  4. **Verify triangle axioms** (rotation, morphism extension, contractibility) using lemmas like `rotate_essImageDistTriang`, `complete_distinguished_triangle_morphism`.
  5. **Show equivalence of distinguished triangles** in `D` and essential image (via `distTriang_iff`), often relying on `L` being triangulated and essentially surjective on arrows.

- **Inductive/structural pattern**:
  - Most proofs follow a *“localize → construct in `C` → push forward”* pattern.
  - Compatibility with triangulation is used to solve the “third leg” problem.
  - Isomorphism arguments (e.g., `isIso_of_isIsos`) are used to show that constructed morphisms are isomorphisms.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Localization.CalculusOfFractions.ComposableArrows` | Provides tools for working with left calculus of fractions, especially composable arrows and localization. |
| `Mathlib.CategoryTheory.Localization.CalculusOfFractions.Preadditive` | Ensures localization of a preadditive category remains preadditive. |
| `Mathlib.CategoryTheory.Triangulated.Functor` | Defines triangulated functors and related properties. |
| `Mathlib.CategoryTheory.Shift.Localization` | Handles compatibility of localization with shift functors. |

**Core background theories used**:
- Localization of categories (Calculus of Fractions)
- Pretriangulated / triangulated categories
- Shift functors and their compatibility
- Essential surjectivity, full faithfulness, and triangulatedness

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch of `complete_distinguished_triangle_morphism`**, or a **Lean tactic trace** for a specific lemma.