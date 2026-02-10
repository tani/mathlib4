### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `commShiftOpInt` | Instance: If `F : C ⥤ D` commutes with shifts (`F.CommShift ℤ`), then so does `F.op`. |
| `op_commShiftIso_hom_app`, `op_commShiftIso_inv_app` | Lemmas describing how the shift isomorphisms behave under op; used to relate `(F.op.commShiftIso n)` to `F.commShiftIso`. |
| `shift_map_op`, `map_shift_unop` | Naturality and compatibility lemmas for the shift functor applied to morphisms and their opposites. |
| `map_opShiftFunctorEquivalence_*_app_unop` (4 lemmas) | Explicit formulas for how `F` interacts with the unit/counit isomorphisms of the shift equivalence `opShiftFunctorEquivalence`. Crucial for proving compatibility of `F.mapTriangle` with `triangleOpEquivalence`. |
| `mapTriangleOpCompTriangleOpEquivalenceFunctorApp` | Isomorphism expressing compatibility of `F.mapTriangle` with `triangleOpEquivalence` on both sides. |
| `mapTriangleOpCompTriangleOpEquivalenceFunctor` | Natural isomorphism of functors: `F.mapTriangle.op ⋙ triangleOpEquivalence D ≅ triangleOpEquivalence C ⋙ F.op.mapTriangle`. |
| `CatCommSq` instances | Encode 2-commutativity of the square involving `F.mapTriangle`, `F.op.mapTriangle`, and `triangleOpEquivalence`. |
| `isTriangulated_op`, `isTriangulated_of_op` | Main results: `F` is triangulated ⇔ `F.op` is triangulated. |
| `op_isTriangulated_iff` | Biconditional statement summarizing the equivalence. |

---

#### 2. **Naming Conventions**

- **Prefixes / Suffixes:**
  - `op_`: Relates to the opposite functor or opposite objects (e.g., `op_commShiftIso`, `opMapTriangleCompTriangleOpEquivalenceInverse`).
  - `map_`: Pertains to the action of `F` on morphisms or triangles (e.g., `mapTriangleOpCompTriangleOpEquivalenceFunctorApp`).
  - `triangleOpEquivalence_*`: Refers to the equivalence `Triangle Cᵒᵖ ≃ Triangle C` and its components (unit/counit, inverse/functor).
  - `commShiftIso_*`: Refers to the natural isomorphism witnessing that `F` commutes with the shift functor.
  - `unop`, `op`: Used to move between `C` and `Cᵒᵖ`, especially in app/hom components.

- **Suffixes:**
  - `_app`: For component-wise definitions/lemmas at an object.
  - `_hom`, `_inv`: For parts of isomorphisms.
  - `_assoc`: For associativity variants in proofs (often used with `assoc`, `comp_id`, etc.).

---

#### 3. **Tactic Stack**

- **Core tactics used repeatedly:**
  - `simp` / `simp only`: To simplify using lemmas like `map_comp`, `op_comp`, `unop_comp`, `Iso.hom_inv_id_app`, etc.
  - `rw`: Rewriting with naturality, isomorphism laws, and definitions.
  - `dsimp`: To unfold definitions (e.g., `opShiftFunctorEquivalence`, `mapTriangle`).
  - `obtain rfl : m = -n := by omega`: Arithmetic simplification in ℤ.
  - `apply Quiver.Hom.op_inj`: To reduce equality of morphisms in `D` to equality in `Dᵒᵖ`.
  - `cancel_epi`, `cancel_mono`: Cancellation lemmas for monos/epis in preadditive categories.
  - `congr 3`: To reduce equality of natural transformations to equality of components.
  - `ext`: Extensionality for natural transformations or isomorphisms.

- **Proof style:** Heavy use of `reassoc`-style lemmas to manage associativity and unit laws in enriched categorical settings.

---

#### 4. **Proof Logic**

- **High-level strategy:**
  1. **Shift compatibility:** Show that `F.op` inherits a `CommShift` structure from `F`, via `commShiftOpInt`.
  2. **Explicit naturality:** Derive formulas for how `F` interacts with the shift isomorphisms and the `opShiftFunctorEquivalence` unit/counit.
  3. **Triangle compatibility:** Construct the natural isomorphism `F.mapTriangle.op ⋙ triangleOpEquivalence D ≅ triangleOpEquivalence C ⋙ F.op.mapTriangle`.
  4. **Distinguished triangles:** Use the above isomorphism and properties of `triangleOpEquivalence` to relate distinguished triangles in `C` and `D` under `F` and `F.op`.
  5. **Triangulated equivalence:** Prove both directions (`isTriangulated_op`, `isTriangulated_of_op`) using:
     - `mem_distTriang_op_iff`
     - `distinguished_iff_of_iso`
     - Unit/counit isomorphisms of `triangleOpEquivalence`

- **Induction / recursion:** Not used — all arguments are structural and rely on categorical properties (e.g., naturality, isomorphism closure).

---

#### 5. **Imports**

- `Mathlib.CategoryTheory.Triangulated.Opposite.Pretriangulated`: Core module for opposites of pretriangulated categories and shift functors.
  - Defines:
    - `OppositeShift`
    - `shiftFunctorOpIso`
    - `opShiftFunctorEquivalence`
    - `triangleOpEquivalence`
    - `mapTriangle`
    - `IsTriangulated`
    - `CommShift`

- **Implicit dependencies (via `Pretriangulated` and `HasShift`):**
  - `CategoryTheory.Pretriangulated.Basic`
  - `CategoryTheory.Shift`
  - `CategoryTheory.Opposite.Basic`
  - `CategoryTheory.NatIso`
  - `CategoryTheory.Limits.Preserves`

---

### Summary

This file formalizes a foundational result in triangulated category theory: **a functor between pretriangulated categories is triangulated iff its opposite is**. The proof is highly structured, leveraging:
- Explicit computations with shift isomorphisms,
- Compatibility with the triangle equivalence `triangleOpEquivalence`,
- Categorical properties (naturality, isomorphism closure, cancellation).

The naming and proof style reflect Lean’s emphasis on explicit, reusable isomorphisms and naturality squares, with heavy use of `simp`-based automation guided by `reassoc` lemmas.