Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Subcategory` | `structure` | A triangulated subcategory of a pretriangulated category `C`, defined by a predicate `P : C → Prop` closed under zero objects, shifts, and the `ext₂'` condition (up to isomorphism). |
| `isoClosure` | `def` | The smallest strictly full triangulated subcategory containing a given subcategory `S`, defined by closing `S.P` under isomorphisms. |
| `mk'` | `def` | Constructor for a *strictly full* triangulated subcategory (i.e., `P` closed under isomorphisms). |
| `W` | `def` | A `MorphismProperty` on `C`, where `S.W f` holds iff the cone of `f` lies in `S` (up to iso). |
| `W_iff`, `W_iff'` | `lemma` | Equivalent characterizations of `S.W f`, using different positions in a distinguished triangle. |
| `W.mk`, `W.mk'` | `lemma` | Intro rules: if the third (resp. first) object of a distinguished triangle is in `S`, then the first (resp. second) map is in `S.W`. |
| `isoClosure_W` | `lemma` | `S.isoClosure.W = S.W`: closure under iso does not change the class of morphisms. |
| `respectsIso_W` | `instance` | `S.W` is closed under pre- and post-composition with isomorphisms. |
| `ContainsIdentities` | `instance` | Identities are in `S.W`, via contractible triangles. |
| `W_of_isIso` | `lemma` | Every isomorphism lies in `S.W`. |
| `smul_mem_W_iff` | `lemma` | Scaling by a unit in `ℤˣ` preserves membership in `S.W`. |
| `W.shift`, `W.unshift` | `lemma` | Compatibility of `S.W` with shifts (forward and backward). |
| `IsCompatibleWithShift` | `instance` | `S.W` is compatible with the ℤ-action (shifts) via equivalence of conditions. |
| `IsMultiplicative` | `instance` | `S.W` is a multiplicative system (closed under composition, contains identities, satisfies Ore conditions — used for localization). |
| `HasLeftCalculusOfFractions`, `HasRightCalculusOfFractions` | `instance` | `S.W` admits left and right calculus of fractions (key for constructing localized category). |
| `IsCompatibleWithTriangulation` | `instance` | `S.W` is compatible with the triangulated structure: given compatible morphisms between distinguished triangles, one can extend to a morphism of triangles with cone in `S`. |
| `ext₁`, `ext₂`, `ext₃` | `lemma` | Closure properties: in a distinguished triangle, if two objects satisfy `S.P`, then the third does (up to iso or strictly, depending on assumptions). |
| `ext₁'`, `ext₃'` | `lemma` | Same as above, but for `isoClosure S.P`. |

---

### **2. Naming Conventions**

- **Predicates on objects**: `P`, `S.P`, `isoClosure S.P`
- **Morphism class**: `S.W`, `W`
- **Triangle-related**:
  - `distTriang C`: distinguished triangles in `C`
  - `Triangle.mk f g h`: triangle with legs `f, g, h`
  - `rot_of_distTriang`, `inv_rot_of_distTriang`: rotation of distinguished triangles
- **Triangle morphisms**: `triangleMorphism₁`, `triangleMorphism₂`, `triangleMorphism₃`
- **Octahedral constructions**:
  - `someOctahedron`: produces an octahedron from three compatible triangles
- **Calculus of fractions**:
  - `LeftFraction.mk`, `RightFraction.mk`
- **Shifts**:
  - `f⟦n⟧'`: shift of a morphism `f` by `n ∈ ℤ`
  - `shiftFunctor C n`, `shiftEquiv C n`
- **Iso-closure**:
  - `le_isoClosure`, `isoClosure_eq_self`, `mem_of_iso`

Prefixes/suffixes:
- `W_`: for properties of the morphism class
- `ext₂`, `ext₁`, `ext₃`: extension properties in triangles
- `shift`, `unshift`: shift-related lemmas
- `mk`, `mk'`: introduction lemmas for membership
- `of_`, `mem_`, `iso_`, `is_`: standard Mathlib naming for membership, isomorphisms, etc.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop_cat`: for category-theoretic simplification and rewriting up to associativity/unit laws
- `simp only [...]`: targeted simplification with specific lemmas (e.g., `Iso.cancel_iso_inv_left`, `Functor.map_comp`)
- `rw [...]`: rewriting using equivalences or definitions
- `obtain ⟨...⟩ := ...`: destructuring existential or product types
- `refine ...`: partial proof construction, especially for instances/lemmas
- `dsimp`, `simp`: simplification of definitions
- `ext`: extensionality (for morphisms, functors, natural transformations)
- `exact`, `assumption`: direct proof steps
- `rintro`: intro + destructuring in one step (e.g., for existentials)
- `convert`, `congr'`: for congruence or equality chaining

---

### **4. Proof Logic**

- **Inductive/structural reasoning** on distinguished triangles and their morphisms.
- **Octahedral axiom** is central: used to relate cones of composites (`someOctahedron`).
- **Localization setup**:
  - First verify `S.W` is a multiplicative system (`IsMultiplicative`)
  - Then prove existence of left/right fractions (`HasLeftCalculusOfFractions`, `HasRightCalculusOfFractions`)
  - Finally, compatibility with triangulation (`IsCompatibleWithTriangulation`)
- **Closure under isomorphisms** is often assumed or derived (e.g., via `isoClosure`), enabling use of `ext₂` instead of `ext₂'`.
- **Shift compatibility** is shown via unit/counit equivalences of the shift functor.
- **Exactness of Yoneda/Coyoneda** used to lift kernel/cokernel-like properties to morphism-level equalities.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.ClosedUnderIsomorphisms` | Tools for working with subcategories closed under iso (e.g., `isoClosure`, `ClosedUnderIsomorphisms` class) |
| `Mathlib.CategoryTheory.Localization.CalculusOfFractions` | General theory of localization via left/right calculus of fractions |
| `Mathlib.CategoryTheory.Localization.Triangulated` | Localization of triangulated categories; compatibility conditions |
| `Mathlib.CategoryTheory.Shift.Localization` | Localization in presence of a shift functor (ℤ-action) |

---

Let me know if you'd like a diagram of the logical dependencies or a summary of the TODO items formalized in this file.