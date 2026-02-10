### Technical Brief: Effective Epimorphic Sieves in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Sieve.EffectiveEpimorphic` | `Sieve X → Prop` | A sieve `S` is effective epimorphic iff the cocone over its diagram is a colimit. |
| `Presieve.EffectiveEpimorphic` | `Presieve X → Prop` | A presieve `S` is effective epimorphic iff the sieve it generates is effective epimorphic. |
| `Sieve.generateSingleton` | `Y ⟶ X → Sieve X` | Sieve of arrows factoring through a single morphism `f : Y → X`. Definitional convenience over `Sieve.generate (Presieve.singleton f)`. |
| `Sieve.generateSingleton_eq` | `Sieve.generate (Presieve.singleton f) = Sieve.generateSingleton f` | Equivalence of two constructions of the singleton-generated sieve. |
| `isColimitOfEffectiveEpiStruct` | `EffectiveEpiStruct f → IsColimit (Sieve.generateSingleton f).cocone` | Constructs a colimit cocone from an effective epi structure on `f`. |
| `effectiveEpiStructOfIsColimit` | `IsColimit (Sieve.generateSingleton f).cocone → EffectiveEpiStruct f` | Constructs an effective epi structure from a colimit cocone on the singleton sieve. |
| `Sieve.effectiveEpimorphic_singleton` | `(Presieve.singleton f).EffectiveEpimorphic ↔ EffectiveEpi f` | Core equivalence: `f` is an effective epi iff the sieve it generates is effective epimorphic. |
| `Sieve.generateFamily` | `(α → C) → ((a : α) → X a ⟶ B) → Sieve B` | Sieve of arrows factoring through a family of morphisms `(π a : X a → B)`. |
| `Sieve.generateFamily_eq` | `Sieve.generate (Presieve.ofArrows X π) = Sieve.generateFamily X π` | Equivalence of two constructions of the family-generated sieve. |
| `isColimitOfEffectiveEpiFamilyStruct` | `EffectiveEpiFamilyStruct X π → IsColimit (Sieve.generateFamily X π).cocone` | From effective epi family structure to colimit cocone. |
| `effectiveEpiFamilyStructOfIsColimit` | `IsColimit (Sieve.generateFamily X π).cocone → EffectiveEpiFamilyStruct X π` | From colimit cocone to effective epi family structure. |
| `Sieve.effectiveEpimorphic_family` | `(Presieve.ofArrows X π).EffectiveEpimorphic ↔ EffectiveEpiFamily X π` | Core equivalence: a family is effective epi iff its generated sieve is effective epimorphic. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `effectiveEpiStructOfIsColimit`, `isColimitOfEffectiveEpiStruct`: bidirectional constructions between effective epi structures and colimit data.
  - `generateSingleton`, `generateFamily`: sieve constructions parameterized by morphisms/families.
  - `effectiveEpimorphic`: predicate for sieves/presieves.

- **Suffixes**:
  - `_eq`: proofs of definitional equality between constructions.
  - `_struct`: constructions involving structures (`EffectiveEpiStruct`, `EffectiveEpiFamilyStruct`).
  - `_family`, `_singleton`: distinguish family vs singleton cases.

- **Helper variables**:
  - `hT`, `hA`, `hB`, `h1`, `h2`, etc.: proof terms for membership or equality in sieves/families.
  - `h`, `h'`, `h''`: hypotheses about commutativity or factorization.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `intro`, `intro h`, `intro ⟨...⟩` | Hypothesis introduction and destructuring. |
| `dsimp`, `simp`, `simp only [...]` | Simplification, especially of cocone components and morphism compositions. |
| `rw [...]` | Rewriting using equalities (e.g., `hT`, `hA.choose_spec`, associativity). |
| `apply`, `apply h` | Applying lemmas or hypotheses. |
| `change`, `nth_rewrite` | Target manipulation for precise rewriting. |
| `generalize_proofs` | Introducing fresh proof variables to avoid name clashes. |
| `rfl` | Reflexivity for definitional equalities. |
| `ext` | Extensionality for sieve equality (pointwise on arrows). |
| `constructor` | Splitting iff goals or structure fields. |
| `apply Nonempty.map (...)` | Moving between `Nonempty` types via constructions. |
| `rw [Category.assoc, Category.id_comp]` | Rewriting categorical identities. |

---

#### **4. Proof Logic**

- **High-level strategy**:
  - Prove equivalences via `constructor`, building maps in both directions.
  - Use `Nonempty.map` to lift constructions between `Nonempty` and `↔`.
  - For `↔` proofs:
    - **Left-to-right**: From colimit data → effective epi structure via `effectiveEpiStructOfIsColimit`.
    - **Right-to-left**: From effective epi structure → colimit data via `isColimitOfEffectiveEpiStruct`.

- **Cocone construction**:
  - Define `aux` cocones parameterized by test objects and compatible families.
  - Use `Hf.desc`, `Hf.fac`, `Hf.uniq` to extract required properties.

- **Diagram handling**:
  - Work in the full subcategory of `Over B` cut out by the sieve.
  - Use `Over.mk`, `Over.homMk`, and `Over.w` to construct morphisms in over-categories.

- **Factorization & downward closure**:
  - Use `choose`/`choose_spec` to extract witnesses from existential quantifiers in sieve definitions.
  - `downward_closed` proofs use composition with the downward arrow.

- **Uniqueness & factorization**:
  - Prove uniqueness/factorization by reducing to the corresponding property of the effective epi structure via naturality and cocone laws.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.CategoryTheory.Sites.Sieves
  import Mathlib.CategoryTheory.EffectiveEpi.Basic
  ```

- **Scope**:
  - Category-theoretic context: `variable {C : Type*} [Category C]`
  - Uses `Limits` (via `open Limits`) for colimits, cocones, diagrams.
  - Relies on `Over` category, `FullSubcategory`, `Presieve`, `Sieve`, and `EffectiveEpi` infrastructure.

- **Domain**:
  - Formalization of **effective epimorphisms** and **effective epimorphic families** via sieves.
  - Bridges **site-theoretic** (sieves) and **categorical** (effective epis) notions.

--- 

This module provides foundational API for relating sieve-theoretic and morphism-theoretic notions of effective epimorphism, crucial for descent theory and topos theory in Lean.