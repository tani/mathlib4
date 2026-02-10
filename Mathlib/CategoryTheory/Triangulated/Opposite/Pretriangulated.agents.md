### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `distinguishedTriangles` | `def`: A set of triangles in `Cᵒᵖ`, defined via pullback along `triangleOpEquivalence C` to match distinguished triangles in `C`. |
| `mem_distinguishedTriangles_iff` | `lemma`: Equivalence between membership in `distinguishedTriangles C` and the image under `triangleOpEquivalence.inverse` being distinguished in `C`. |
| `mem_distinguishedTriangles_iff'` | `lemma`: Alternative characterization using existence of a distinguished triangle `T'` in `C` and an isomorphism to the image under `triangleOpEquivalence.functor`. |
| `isomorphic_distinguished` | `lemma`: Distinguishedness is preserved under isomorphism of triangles in `Cᵒᵖ`. |
| `contractibleTriangleIso` | `noncomputable def`: Isomorphism between the contractible triangle in `Cᵒᵖ` and the image under `triangleOpEquivalence` of the rotated contractible triangle in `C`. |
| `contractible_distinguished` | `lemma`: Contractible triangles in `Cᵒᵖ` are distinguished. |
| `rotateTriangleOpEquivalenceInverseObjRotateUnopIso` | `noncomputable def`: Compatibility isomorphism between rotation and `triangleOpEquivalence`. |
| `rotate_distinguished_triangle` | `lemma`: Distinguishedness is preserved under rotation in `Cᵒᵖ`. |
| `distinguished_cocone_triangle` | `lemma`: For any morphism `f : X → Y` in `Cᵒᵖ`, there exists a distinguished triangle extending it. |
| `complete_distinguished_triangle_morphism` | `lemma`: Morphism extension property for distinguished triangles in `Cᵒᵖ`. |
| `Pretriangulated.Opposite.scoped instance` | `scoped instance`: Constructs the pretriangulated structure on `Cᵒᵖ`, using all previous lemmas. |
| `mem_distTriang_op_iff` / `mem_distTriang_op_iff'` | `lemma`: Restate `distinguishedTriangles` definition in terms of `distTriang Cᵒᵖ`. |
| `op_distinguished` / `unop_distinguished` | `lemma`: Direct correspondence between distinguished triangles in `C` and `Cᵒᵖ` via `triangleOpEquivalence`. |
| `map_distinguished_op_exact` | `lemma`: Exactness of the complex induced by a distinguished triangle in `C`, mapped via a homological functor `Cᵒᵖ ⥤ A`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `distinguished_`: Relates to defining or characterizing distinguished triangles.
  - `rotate_`: Pertains to rotation of triangles and compatibility with shift.
  - `contractible_`: Relates to contractible triangles and their properties.
  - `op_` / `unop_`: Indicates operations involving the opposite category (`op`, `unop`).
  - `triangleOpEquivalence_`: Refers to the equivalence `(Triangle C)ᵒᵖ ≌ Triangle Cᵒᵖ`.

- **Suffixes**:
  - `_iso`: For isomorphisms or isomorphism constructions.
  - `_iff` / `_iff'`: Logical equivalences (↔), often with a primary and secondary version.
  - `_distinguished`: Properties or constructions involving distinguished triangles.
  - `_exact`: Related to exactness in homological functors.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rfl`: For definitional equalities.
- `rw`: Rewriting using equivalences or lemmas.
- `simp only [...]`: Simplification with explicit lemmas.
- `aesop_cat`: Automated reasoning in categories (e.g., diagram chasing, associativity).
- `exact`, `refine`, `apply`: For constructing proofs term-by-term.
- `dsimp`, `change`, `convert`: For simplifying or transforming goals.
- `Iso.unop`, `Iso.mapIso`, `Iso.refl`: For manipulating isomorphisms in opposite categories.
- `Quiver.Hom.op_inj`, `Quiver.Hom.unop_inj`: Injectivity lemmas for morphism opposites.

---

#### 4. **Proof Logic**

- **Structure**: Proofs follow a pattern of:
  1. **Reduction** to known facts in `C` via `triangleOpEquivalence`.
  2. **Isomorphism handling**: Use of `Iso.refl`, `Iso.mapIso`, `Iso.unop`, and naturality to transport structure.
  3. **Rotation compatibility**: Explicit isomorphisms (`rotateTriangleOpEquivalenceInverseObjRotateUnopIso`) to relate rotated triangles in `Cᵒᵖ` to those in `C`.
  4. **Extension properties**: Leveraging `Pretriangulated` axioms in `C` (e.g., `distinguished_cocone_triangle₁`, `complete_distinguished_triangle_morphism₁`) and translating them via `op`/`unop`.
  5. **Functorial compatibility**: For homological functors, using `map_distinguished_exact` and `op_distinguished`.

- **Induction/Case Analysis**: Not prominent; proofs are mostly *constructive* and *isomorphism-based*, relying on categorical equivalences.

---

#### 5. **Imports**

- `Mathlib.CategoryTheory.Triangulated.Opposite.Triangle`: Provides `triangleOpEquivalence`, the key equivalence between `(Triangle C)ᵒᵖ` and `Triangle Cᵒᵖ`.
- `Mathlib.CategoryTheory.Triangulated.HomologicalFunctor`: Used for `map_distinguished_op_exact`, linking to homological algebra.

**Scope**: This file formalizes the *pretriangulated structure* on the opposite category of a pretriangulated category, aligning with Verdier’s definition (no signs introduced in the rotated triangle). It does **not** assume or construct a *triangulated* structure (i.e., it stops at `Pretriangulated`, not `Triangulated`).

--- 

Let me know if you'd like a diagrammatic summary or a formalization checklist.