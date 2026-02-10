### Technical Brief: Triangulated Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Octahedron` | `structure` | Encodes the data required by the octahedron axiom (TR4): morphisms `m₁ : Z₁₂ ⟶ Z₁₃`, `m₃ : Z₁₃ ⟶ Z₂₃`, and commutativity conditions linking distinguished triangles. |
| `triangle` | `def` | Constructs the distinguished triangle `Z₁₂ ⟶ Z₁₃ ⟶ Z₂₃ ⟶ Z₁₂⟦1⟧` from an octahedron. |
| `triangleMorphism₁` | `def` | The first morphism of triangles: from `Triangle.mk u₁₂ v₁₂ w₁₂` to `Triangle.mk u₁₃ v₁₃ w₁₃`. |
| `triangleMorphism₂` | `def` | The second morphism of triangles: from `Triangle.mk u₁₃ v₁₃ w₁₃` to `Triangle.mk u₂₃ v₂₃ w₂₃`. |
| `ofIso` | `def` | Transport of octahedra along isomorphisms of diagrams; ensures octahedra are stable under isomorphism. |
| `IsTriangulated` | `class` | A pretriangulated category satisfying the octahedron axiom: for any composable morphisms with distinguished triangles, an octahedron exists. |
| `octahedron_axiom` | `axiom` (in `IsTriangulated`) | Asserts existence of an octahedron for any such triple of distinguished triangles. |
| `someOctahedron'`, `someOctahedron` | `def` | Choice functions (using `some`) returning an octahedron guaranteed by `octahedron_axiom`. |
| `IsTriangulated.mk'` | `lemma` | A useful constructor: it suffices to construct octahedra for isomorphic diagrams where the composition condition is `rfl`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isomorphic_distinguished`, `isTriangulated` (class name).
  - `some_`: e.g., `someOctahedron`, `someOctahedron'` — choice from existence.
  - `triangle_`: e.g., `triangleMorphism₁`, `triangleMorphism₂`, `triangle`.
  - `comm_`: e.g., `comm₁`, `comm₂`, `comm₃`, `comm₄` — commutativity conditions in `Octahedron`.
  - `mem`: e.g., `h.mem` — membership in the distinguished triangles `distTriang C`.

- **Suffixes**:
  - `_₁`, `_₂`, `_₃`: indices for objects/morphisms in diagrams (e.g., `Z₁₂`, `Z₂₃`, `Z₁₃`, `m₁`, `m₃`).
  - `_hom₃`: third component of a triangle morphism (e.g., `iso₁₂.hom.hom₃`).
  - `_assoc`, `_reassoc`: used in `attribute [reassoc]` for associativity rewriting.

- **Notable patterns**:
  - `u₁₂`, `u₂₃`, `u₁₃`: composable morphisms with `u₁₂ ≫ u₂₃ = u₁₃`.
  - `v_ij`, `w_ij`: structure maps of distinguished triangles.
  - `e₁`, `e₂`, `e₃`: isomorphisms between objects in diagram comparisons.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp` / `dsimp` | Rewriting definitions, simplifying components (e.g., `id_comp`, `comp_id`, `Functor.map_id`). |
| `assumption` / `exact` | Closing simple goals from hypotheses. |
| `cancel_mono` | Cancelling monomorphisms in commutative diagrams. |
| `reassoc_of%`, `reassoc` | Rewriting associativity using known equalities (custom lemma application). |
| `iso₁₂.hom.hom₃`, `iso₁₃.inv_hom_id_triangle_hom₃` | Leveraging triangle isomorphism structure. |
| `refine` / `existsi` | Constructing witnesses (e.g., in `someOctahedron'`, `mk'`). |
| `simp only [...]` | Fine-grained simplification (e.g., `simp only [Functor.map_id, comp_id]`). |
| `apply Subsingleton.elim` | Closing goals where type is a subsingleton (e.g., uniqueness of morphisms in contractible triangles). |
| `all_goals` | Applying same tactic to all goals (e.g., `apply Subsingleton.elim`). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Inductive construction**: Octahedra are built by specifying components (`m₁`, `m₃`) and verifying commutativity (`comm₁`–`comm₄`) and distinguishedness (`mem`).
  - **Isomorphism transport**: `ofIso` uses triangle isomorphisms (`isoTriangleOfIso₁₂`) to transfer octahedra across diagram isomorphisms.
  - **Uniqueness arguments**: Many goals are solved by `Subsingleton.elim`, especially for contractible or zero objects.
  - **Diagram chasing**: Proofs rely heavily on manipulating triangle morphism commutativity conditions, often using `assoc`, `reassoc_of%`, and `Functor.map_comp`.
  - **Choice via `some`**: Existence is abstracted via `someOctahedron`, avoiding explicit choice in proofs.

- **Typical proof flow**:
  1. Introduce data (e.g., `refine ⟨⟨m₁, m₃, ?_, ?_, ?_, ?_, ?_⟩⟩`).
  2. Use `rw`, `simp`, `cancel_mono`, and known equalities to verify commutativity.
  3. For `mem`, apply `isomorphic_distinguished` + `Triangle.isoMk`.
  4. In `mk'`, reduce to a simpler case via isomorphism, then apply `ofIso`.

---

#### **5. Imports & Scope**

- **Primary imports**:
  ```lean
  import Mathlib.CategoryTheory.Triangulated.Pretriangulated
  ```
  - Provides foundational notions: `Pretriangulated`, `distTriang`, `shiftFunctor`, `Triangle`, etc.

- **Key open namespaces**:
  - `Limits`, `Category`, `Preadditive`, `Pretriangulated`, `ZeroObject`

- **Assumptions on `C`**:
  - `Category C`, `Preadditive C`, `HasZeroObject C`, `HasShift C ℤ`
  - `∀ n : ℤ, Functor.Additive (shiftFunctor C n)`
  - `Pretriangulated C`

- **Scope**: Formalization of *triangulated categories* in homological algebra, specifically the axiomatic framework (TR1–TR4), with focus on TR4 (octahedron axiom). Used as a foundation for derived categories and t-structures.

---

### Summary

This file formalizes the **octahedron axiom** for triangulated categories in Lean 4, building on `Pretriangulated` categories. It introduces the `Octahedron` structure, constructs canonical morphisms of triangles from it, and defines the `IsTriangulated` class. The proofs rely heavily on diagrammatic reasoning, isomorphism transport, and subsingleton uniqueness. The design reflects modern Mathlib conventions: explicit data, reusable morphisms, and tactic-heavy verification.