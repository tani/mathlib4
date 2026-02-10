### Technical Brief: Filtered and Cofiltered Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsFilteredOrEmpty` | `class Prop` | Weaker notion: every pair of objects has a cocone (no nonemptiness required). |
| `IsFiltered` | `class extends IsFilteredOrEmpty` | Full notion: `IsFilteredOrEmpty` + `Nonempty C`. |
| `IsCofilteredOrEmpty` | `class Prop` | Dual: every pair of objects has a cone (no nonemptiness required). |
| `IsCofiltered` | `class extends IsCofilteredOrEmpty` | Dual: `IsCofilteredOrEmpty` + `Nonempty C`. |
| `max`, `leftToMax`, `rightToMax` | `noncomputable def` | Choice of cocone apex and legs for two objects. |
| `coeq`, `coeqHom`, `coeq_condition` | `noncomputable def/theorem` | Choice of coequalizer-like apex and leg for parallel morphisms. |
| `sup_exists` | `theorem` | For any finite objects `O` and morphisms `H`, ∃ `S` with maps from all `X ∈ O`, commuting over `H`. |
| `sup`, `toSup`, `toSup_commutes` | `noncomputable def/theorem` | Concrete choices from `sup_exists`. |
| `cocone_nonempty` | `theorem` | Every functor `F : J ⥤ C` (with `FinCategory J`) admits a cocone in filtered `C`. |
| `cocone` | `noncomputable def` | Choice of cocone from `cocone_nonempty`. |
| `of_cocone_nonempty` | `theorem` | Converse: if all finite diagrams have cocones, then `C` is filtered. |
| `span`, `bowtie`, `tulip` | `theorem` | Special diagram lemmas for algebraic forgetful functors (bowtie/tulip shapes). |
| `min`, `minToLeft`, `minToRight`, `eq`, `eqHom`, `eq_condition` | Duals of above | For cofiltered categories (cones instead of cocones). |
| `inf_exists`, `inf_objs_exists` | Duals of `sup_*` | For cofiltered categories. |
| `of_right_adjoint`, `of_equivalence` | `theorem` | Stability of (co)filtered under adjoints & equivalences. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cocone_*`: for cocones (filtered case).
  - `cone_*`: for cones (cofiltered case).
  - `max`, `min`: for “right/left” joins/meets in (co)filtered categories.
  - `coeq`, `eq`: for coequalizer/equalizer-like constructions.
  - `sup`, `inf`: for suprema/infima over finite sets.
  - `toSup`, `toInf` (implicit): maps *into* (cofiltered) or *out of* (filtered) the sup/inf.

- **Suffixes**:
  - `_exists`: existence of a witness (e.g., `sup_exists`, `inf_exists`).
  - `_nonempty`: existence of a *nonempty* type (e.g., `cocone_nonempty`).
  - `_condition`: proof that a diagram commutes (e.g., `coeq_condition`, `eq_condition`).
  - `_hom`: morphism part of a construction (e.g., `coeqHom`, `eqHom`).
  - `_to*`, `*To_`: directionality (e.g., `leftToMax`, `minToLeft`).

- **Arity suffixes**:
  - `₃` suffix for ternary versions (e.g., `max₃`, `coeq₃`, `firstToMax₃`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `classical` | To choose witnesses from existential hypotheses. |
| `obtain ⟨...⟩ := ...` | Extracting structured data from `sup_exists`, `cocone_nonempty`, etc. |
| `simp only [...]` | Simplifying using definitional equalities and lemmas like `coeq_condition`. |
| `rw [← Category.assoc]` | Reassociating compositions to apply naturality or conditions. |
| `slice_lhs`, `slice_rhs` | Local rewriting in subterms (e.g., in `coeq₃_condition₂`). |
| `subst`, `exfalso`, `contrapose!` | Standard logic/proof automation. |
| `infer_instance` | For automatic class resolution (e.g., `SemilatticeSup → IsFiltered`). |
| `apply Finset.mem_of_mem_insert_of_ne` | Handling membership in finite sets during induction. |
| `dsimp`, `simp_rw` | Deep simplification and rewriting with `Category.assoc`. |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs of `sup_exists`, `inf_exists`, `cocone_nonempty` use **induction on finite sets** (`Finset.induction`).
  - Base case: handle empty set using `Classical.choice` on `Nonempty C`.
  - Inductive step: extend by one object/morphism using `max`/`min`, `coeq`/`eq`, and associativity.

- **Diagrammatic reasoning**:
  - Diagrams are encoded as finite sets of objects and morphisms (`Finset C`, `Finset (Σ' ...)`).
  - Commutativity is enforced via `coeq_condition`, `eq_condition`, or `span`, `bowtie`, `tulip` lemmas.

- **Adjointness & equivalence**:
  - `of_right_adjoint`, `of_equivalence` use adjunction hom-equiv to transport (co)cones.
  - Dually for `of_left_adjoint` in cofiltered case.

- **Converse direction** (`of_cocone_nonempty`):
  - Verifies the three filtered axioms by embedding small diagram shapes (`pair`, `parallelPair`) into `J ⥤ C`.
  - Uses `Functor.empty`, `ULiftHom`, and `pair`/`parallelPair` from `CategoryTheory.Limits.Shapes`.

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.FiniteLimits
  ```
  - Provides finite limits, shape categories (`pair`, `parallelPair`, `WalkingPair`, etc.), and `FinCategory`.

- **Key dependencies**:
  - `CategoryTheory.Category` (universe management, morphism composition).
  - `CategoryTheory.Limits` (cocones, limits, colimits).
  - `CategoryTheory.Functor` (functor categories, natural transformations).
  - `CategoryTheory.Adjunction` (adjoints, equivalence).
  - `CategoryTheory.Limits.Types` (properties of filtered colimits in `Type`).

- **Universe polymorphism**:
  - Uses `w v v₁ v₂ u u₁ u₂` for careful universe management (e.g., `SmallCategory`, `FinCategory`).

---

#### **6. Notable Patterns & Idioms**

- **Noncomputable choice**:
  - `max`, `coeq`, `sup`, etc., are `noncomputable` — rely on `Classical.choice`.
- **Implicit indexing**:
  - Morphisms in `sup_exists` are indexed by `Σ' (X Y : C) (_ : X ∈ O) (_ : Y ∈ O), X ⟶ Y`.
- **Triangle & square lemmas**:
  - `span`, `bowtie`, `tulip` encode common diagrams in algebra (e.g., for proving forgetful functors preserve filtered colimits).
- **Duality**:
  - Cofiltered section mirrors filtered, with arrows reversed and `max` ↔ `min`, `coeq` ↔ `eq`, `sup` ↔ `inf`.

---

This summary captures the core structure, idioms, and logical flow of the filtered/cofiltered category API in Mathlib, suitable for building domain-specific reasoning agents in category theory.