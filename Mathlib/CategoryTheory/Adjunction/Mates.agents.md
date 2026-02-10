### Technical Metadata Brief: Mate of Natural Transformations (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mateEquiv` | `(G ⋙ L₂ ⟶ L₁ ⋙ H) ≃ (R₁ ⋙ G ⟶ H ⋙ R₂)` | Core bijection (mates correspondence) between natural transformations across a square of adjunctions. |
| `mateEquiv_counit` | `L₂.map ((mateEquiv α).app _) ≫ adj₂.counit.app _ = α.app _ ≫ H.map (adj₁.counit.app _)` | Component-wise naturality condition for `mateEquiv` using counits. |
| `mateEquiv_counit_symm` | `L₂.map (α.app _) ≫ adj₂.counit.app _ = ((mateEquiv).symm α).app _ ≫ H.map (adj₁.counit.app _)` | Component-wise condition for inverse `mateEquiv`. |
| `unit_mateEquiv` | `G.map (adj₁.unit.app c) ≫ (mateEquiv α).app _ = adj₂.unit.app _ ≫ R₂.map (α.app _)` | Component-wise condition for `mateEquiv` using units. |
| `unit_mateEquiv_symm` | `G.map (adj₁.unit.app c) ≫ α.app _ = adj₂.unit.app _ ≫ R₂.map (((mateEquiv).symm α).app _)` | Component-wise condition for inverse `mateEquiv` using units. |
| `conjugateEquiv` | `(L₂ ⟶ L₁) ≃ (R₁ ⟶ R₂)` | Special case of `mateEquiv` where vertical functors are identities (up to unitors); used for comparing adjoints of same domain/codomain. |
| `conjugateEquiv_counit` / `conjugateEquiv_counit_symm` | Analogues of `mateEquiv_counit` for `conjugateEquiv`. | Component-wise naturality for conjugation. |
| `conjugateEquiv_id` | `conjugateEquiv adj₁ adj₁ (𝟙 _) = 𝟙 _` | Identity preservation under conjugation. |
| `conjugateEquiv_comp` | `conjugateEquiv α ≫ conjugateEquiv β = conjugateEquiv (β ≫ α)` | Contravariant functoriality of conjugation. |
| `conjugateEquiv_iso` / `conjugateEquiv_symm_iso` | Instances showing `IsIso α ⇒ IsIso (conjugateEquiv α)` | Isomorphism preservation/reflection in conjugation. |
| `conjugateIsoEquiv` | `(L₂ ≅ L₁) ≃ (R₁ ≅ R₂)` | Bijection on isomorphism classes of adjoints; proves uniqueness of adjoints up to iso. |
| `iterated_mateEquiv_conjugateEquiv` | `mateEquiv (mateEquiv α) = conjugateEquiv α` | When all 4 functors are left adjoints, double mate = conjugate; explains Beck–Chevalley isos. |
| `leftAdjointSquare.vcomp` / `rightAdjointSquare.vcomp` | Vertical pasting of squares (left/right). | Composition operation for 2-cells in double category of adjunctions. |
| `mateEquiv_vcomp` | `mateEquiv (α ⊙ β) = mateEquiv α ⊙ mateEquiv β` | `mateEquiv` commutes with vertical composition. |
| `leftAdjointSquare.hcomp` / `rightAdjointSquare.hcomp` | Horizontal pasting of squares. | Horizontal composition of 2-cells. |
| `mateEquiv_hcomp` | `mateEquiv (α ⨝ β) = mateEquiv α ⨝ mateEquiv β` | `mateEquiv` commutes with horizontal composition. |
| `mateEquiv_square` | Compatibility of `mateEquiv` with 2D composition (`comp`). | Basis for isomorphism of double categories. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mateEquiv_*`: General mate correspondence.
  - `conjugateEquiv_*`: Special case where vertical functors are identities.
  - `leftAdjointSquare.*`, `rightAdjointSquare.*`: Operations on squares involving left/right adjoints.
  - `leftAdjointConjugateSquare.*`, `rightAdjointSquareConjugate.*`: Mixed compositions with conjugate squares.

- **Suffixes**:
  - `_comp`: Composition laws.
  - `_symm`: Inverse direction (e.g., `mateEquiv_counit_symm`).
  - `_vhcomp`, `_hvcomp`: Vertical/horizontal composition compatibility.
  - `_iso`, `_isoEquiv`: Isomorphism-related results.

- **Pattern**: `noun_verb_noun` (e.g., `mateEquiv_vcomp`, `conjugateEquiv_comp`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `ext` | Extensionality for natural transformations (pointwise equality). |
| `simp only [...]` | Simplification using explicit lemmas (e.g., `comp_app`, `map_comp`, `assoc`, triangle identities). |
| `rw [...]` | Rewriting using naturality, triangle identities (`left_triangle_components`, `right_triangle_components`, `unit_naturality`, `counit_naturality`). |
| `unfold ...` | Unfolding definitions (`mateEquiv`, `whiskerLeft`, `whiskerRight`, `conjugateEquiv`, etc.). |
| `slice_lhs / slice_rhs ... => rw [...]` | Focused rewriting on subterms (e.g., `slice_rhs 2 4 => rw [...]`). |
| `aesop_cat` | Automated category-theoretic reasoning (used in `conjugateIsoEquiv` proofs). |
| `conv_lhs => rw [...]` | Convolution tactic for lhs rewriting (e.g., in inverse direction proofs). |
| `infer_instance` | Typeclass inference for `IsIso`. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Prove bijection via explicit `toFun`/`invFun` definitions using **whiskering**, **unit**, and **counit**.
  - Verify inverses via **triangle identities** and **naturality**.
  - Use `ext` + `simp` + `rw` to reduce to component-wise diagrams.
  - For composition laws (`vcomp`, `hcomp`), apply **naturality of unit/counit**, **functoriality**, and **associativity**.

- **Inductive/Iterated Cases**:
  - `iterated_mateEquiv_conjugateEquiv`: Uses `mateEquiv` twice and simplifies using `conjugateEquiv` definition.
  - `mateEquiv_square`: Combines `mateEquiv_vcomp` and `mateEquiv_hcomp` to show compatibility with 2D composition.

- **Isomorphism Preservation**:
  - Construct inverse explicitly using `conjugateEquiv` of inverse.
  - Use `conjugateEquiv_comm` to verify composites are identities.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Adjunction.Basic` | Core adjunction theory: units, counits, triangle laws. |
| `Mathlib.CategoryTheory.HomCongr` | Hom-congruence (`homCongr`, `Iso.homCongr`). |
| `Mathlib.Tactic.ApplyFun` | Tactics for applying functors to morphisms (used in `simp`-based simplifications). |

---

#### **Domain-Specific AI Agent Notes**

- **Focus Areas**:
  - Automating whiskering simplifications (`whiskerLeft`, `whiskerRight`).
  - Recognizing patterns for mate/conjugate transformations.
  - Inferring when `mateEquiv` reduces to `conjugateEquiv` (identity vertical functors).
  - Proving isomorphism preservation via `conjugateIsoEquiv`.

- **Common Proof Patterns**:
  - `ext c; simp only [comp_app, map_comp, assoc]; rw [naturality, triangle]`
  - `have := mateEquiv_vcomp ...; simp at this; exact this`

- **Key Lemmas to Cache**:
  - `mateEquiv_counit`, `unit_mateEquiv`, `conjugateEquiv_counit`, `conjugateEquiv_comp`
  - `mateEquiv_vcomp`, `mateEquiv_hcomp`, `mateEquiv_square`

--- 

Let me know if you'd like a ** tactic cheat sheet ** or **proof automation template** for mate/conjugate reasoning.