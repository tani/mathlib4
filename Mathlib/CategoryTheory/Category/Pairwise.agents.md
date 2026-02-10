### Technical Metadata Brief: `Pairwise` Diagram in Lean 4 / Mathlib

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Pairwise ι` | `Type v → Type v` (inductive type) | Represents objects: either `single i` (for `i : ι`) or `pair i j` (for `i j : ι`). Used to model the indexing category for pairwise intersections. |
| `Hom` | `Pairwise ι → Pairwise ι → Type v` (inductive) | Defines morphisms: identities (`id_single`, `id_pair`) and projections (`left`, `right`). |
| `id` | `∀ o, Hom o o` | Identity morphism function. |
| `comp` | `∀ {o₁ o₂ o₃}, Hom o₁ o₂ → Hom o₂ o₃ → Hom o₁ o₃` | Composition of morphisms; simplifies using identity laws. |
| `instance : Category (Pairwise ι)` | `Category (Pairwise ι)` | Constructs the category structure on `Pairwise ι`. |
| `diagramObj U` | `Pairwise ι → α` | Object mapping: `single i ↦ U i`, `pair i j ↦ U i ⊓ U j`. |
| `diagramMap U` | `Hom o₁ o₂ → diagramObj U o₁ ⟶ diagramObj U o₂` | Morphism mapping: identities ↦ identities; `left`, `right` ↦ inf-projections (`inf_le_left`, `inf_le_right`). |
| `diagram U` | `Pairwise ι ⥤ α` | Functor induced by `U : ι → α` when `α` is a semilattice with inf. |
| `coconeιApp U` | `∀ o, diagramObj U o ⟶ iSup U` | Components of the cocone tip morphism: `single i ↦ le_iSup`, `pair i j ↦ inf_le_left ≫ le_iSup`. |
| `cocone U` | `Cocone (diagram U)` | Cocone with tip `iSup U` and structure maps `coconeιApp`. |
| `coconeIsColimit` | `IsColimit (cocone U)` | Proves that `iSup U` is the colimit of `diagram U` under `CompleteLattice α`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `diagramObj`, `diagramMap`: auxiliary definitions for constructing the diagram functor.
  - `coconeιApp`: Greek letter `ι` (iota) used for cocone apex morphism components.
  - `pairwiseCases`: tactic helper for case analysis on `Pairwise`.

- **Suffixes**:
  - `isColimit`: indicates a colimit universal property (dual for limits).
  - `isInhabited`: for `Inhabited` instances (e.g., `pairwiseInhabited`, `homInhabited`).

- **Morphism names**:
  - `left`, `right`: canonical projections from `pair i j` to `single i`, `single j`.
  - `id_single`, `id_pair`: identity morphisms for each object form.

- **Hom constructor names**:
  - All start with `id_`, `left`, `right` — matching the intended morphism role.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Automated category reasoning (via `pairwiseCases` tactic registered as safe). |
| `casesm*` | Case analysis on morphism types (used in `pairwiseCases`). |
| `simp_rw`, `simp` | Simplification using `@[simp]` lemmas (e.g., `diagramObj`, `diagramMap`, `cocone`). |
| `apply`, `exact`, `intro` | Basic proof scripting. |
| `homOfLE` | Converts `le : a ≤ b` to a morphism `a ⟶ b` in preorder categories. |
| `CompleteSemilatticeSup.sSup_le` | Used in `coconeIsColimit.desc` to prove inequality for colimit universal property. |
| `rfl`, `rintro` | For definitional equality and destructing existentials. |

---

#### **4. Proof Logic**

- **Structure of `coconeIsColimit` proof**:
  1. **Universal property**: For any other cocone `s`, construct a unique morphism `desc s : iSup U ⟶ s.pt`.
  2. **Construction**: Use `homOfLE` with inequality `iSup U ≤ s.pt`, derived via `CompleteSemilatticeSup.sSup_le`.
  3. **Verification**:
     - Show naturality: `desc s ≫ s.ι.app o = coconeιApp U o` for all `o`.
     - Uniqueness: Any other such morphism must equal `desc s`, via antisymmetry in lattices.

- **Inductive reasoning**:
  - Definitions on `Pairwise ι` use induction over its two constructors (`single`, `pair`).
  - Morphism definitions use pattern matching on `Hom` constructors.

- **Lattice-theoretic reasoning**:
  - Relies on properties of `⊓` (inf), `iSup` (supremum), and `le_iSup`, `inf_le_left`, `inf_le_right`.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Order.CompleteLattice` | Provides `CompleteLattice`, `iSup`, `le_iSup`, `sSup_le`, etc. |
| `Mathlib.CategoryTheory.Category.Preorder` | Enables viewing preorders as categories (`homOfLE`, etc.). |
| `Mathlib.CategoryTheory.Limits.IsLimit` | Provides `IsColimit`, `Cocone`, and universal property machinery. |

**Domain Scope**:  
This module formalizes a small diagram category used to encode the *sheaf condition* in terms of colimits over pairwise intersections — foundational for sheaf theory in topos theory or geometry.

--- 

Let me know if you'd like a diagrammatic sketch or a formalization of the sheaf condition using this.