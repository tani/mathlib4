### Technical Metadata Brief: Effective Epimorphisms in Lean 4 (Category Theory Library)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `EffectiveEpiStruct` | `structure` | Encodes the universal property of an effective epimorphism: a morphism `f : Y ⟶ X` is a joint coequalizer of all pairs it coequalizes. Contains `desc`, `fac`, and `uniq` components. |
| `EffectiveEpi` | `class Prop` | Predicate asserting that a morphism `f` is an effective epimorphism (i.e., admits an `EffectiveEpiStruct`). |
| `EffectiveEpi.getStruct` | `def` | Chooses a witness `EffectiveEpiStruct f` for a proof of `EffectiveEpi f`. Noncomputable. |
| `EffectiveEpi.desc` | `def` | The mediating morphism `X ⟶ W` induced by a morphism `e : Y ⟶ W` coequalizing the same pairs as `f`. |
| `EffectiveEpi.fac` | `lemma` | States that `f ≫ desc e h = e`. Used for factorization. |
| `EffectiveEpi.uniq` | `lemma` | Uniqueness of the mediating morphism: any `m` with `f ≫ m = e` equals `desc e h`. |
| `epiOfEffectiveEpi` | `instance` | Every effective epimorphism is an epimorphism. |
| `EffectiveEpiFamilyStruct` | `structure` | Generalizes `EffectiveEpiStruct` to families of morphisms with common codomain. Coequalizes *all* pairs coequalized by the family (across possibly different sources). |
| `EffectiveEpiFamily` | `class Prop` | Predicate for effective epimorphic families. |
| `EffectiveEpiFamily.desc`, `fac`, `uniq` | `def`, `lemma`, `lemma` | Analogous to the single-morphism case, for families. |
| `EffectiveEpiFamily.hom_ext` | `lemma` | Hom-extension property: if two morphisms agree post-composed with all `π a`, they are equal. |
| `effectiveEpiFamilyStructSingletonOfEffectiveEpi` | `def` | Converts a single effective epi into a singleton effective epi family. |
| `effectiveEpiStructOfEffectiveEpiFamilySingleton` | `def` | Converts a singleton effective epi family back to an effective epi. |
| `effectiveEpi_iff_effectiveEpiFamily` | `theorem` | Equivalence: `f` is effective epi ⇔ the singleton family `(f)` is effective epi family. |
| `effectiveEpiFamilyStructOfIsIsoDesc` | `def` | If the coproduct map `Σ X a ⟶ B` is an iso, then the family `(π a)` is effective epi family. |
| `effectiveEpiStructOfIsIso` | `def` | Every isomorphism is an effective epimorphism. |
| `EffectiveEpiFamily.reindex` | `lemma` | Reindexing invariance: effective epi families are stable under equivalence of indexing types. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `effectiveEpi...`: for single morphism definitions (`EffectiveEpi`, `EffectiveEpiStruct`, `desc`, `fac`, `uniq`, etc.)
  - `effectiveEpiFamily...`: for families (`EffectiveEpiFamily`, `EffectiveEpiFamilyStruct`, `desc`, `fac`, `uniq`, `hom_ext`, `reindex`)
- **Suffixes**:
  - `Struct`: data structure (witness of existence before quotienting by proof irrelevance).
  - `iff`: biconditional theorems (`effectiveEpi_iff_effectiveEpiFamily`).
  - `Of...`: constructions from other structures (`ofIsIso`, `singletonOf...`, `reindex`).
- **Quantifier patterns**:
  - `∀ {Z} g₁ g₂, g₁ ≫ f = g₂ ≫ f → g₁ ≫ e = g₂ ≫ e`: coequalization condition.
  - `π a ≫ m = e a`: factorization condition for families.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification with associativity, identity, and structure field projections (e.g., `Category.assoc`, `asIso_hom`, `colimit.ι_desc`, `Cofan.mk_ι_app`). |
| `rw [...]` | Rewrite using lemmas like `fac`, `uniq`, or definitions. |
| `apply ...` | Apply `uniq`, `fac`, or constructor lemmas. |
| `intro`, `exact`, ` rfl` | Basic proof scripting. |
| `ext a` | Extensionality for functions/families (e.g., in `uniq` for families). |
| `obtain ⟨a, rfl⟩ := e.surjective a` | Use equivalence surjectivity for reindexing. |
| `simp` (without `only`) | Occasionally used for more aggressive simplification (e.g., `asIso_inv`, `IsIso.hom_inv_id_assoc`). |
| `inferInstance` | Implicitly construct instances (e.g., in `effectiveEpi_iff_effectiveEpiFamily`). |

No heavy automation (e.g., `aesop`, `linarith`, `ring`) — proofs are mostly structural and rely on definitional equalities and categorical identities.

---

#### **4. Proof Logic**

- **Existential witness handling**:  
  Proofs often proceed by:
  1. Extracting a witness (`getStruct`) from the `Nonempty` assumption.
  2. Defining the mediating morphism via `desc`.
  3. Verifying factorization (`fac`) and uniqueness (`uniq`) using definitional properties.

- **Singleton ↔ single morphism**:  
  The equivalence `effectiveEpi_iff_effectiveEpiFamily` is proven via two-way `inferInstance`, leveraging the `reindex` and `singletonOf...` constructions.

- **Coproduct-based criterion**:  
  The `effectiveEpiFamilyStructOfIsIsoDesc` proof uses:
  - Universal property of coproducts (`Sigma.desc`).
  - Isomorphism inversion to define `desc`.
  - Simplification using `colimit.ι_desc` and `Cofan.mk_*` lemmas (coproduct cocone data).

- **Hom-extension**:  
  `hom_ext` uses `uniq` with `e a := π a ≫ m₂`, showing uniqueness of extensions.

- **Reindexing**:  
  `reindex` constructs a new structure by precomposing with the equivalence; surjectivity ensures coverage.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.Products
  ```
  - Provides `Limits` (used via `open Limits`), including coproducts (`Sigma.desc`, `ι`, `colimit`), products, and related cocones.

- **Implicit dependencies** (via `CategoryTheory` namespace and usage):
  - `Mathlib.CategoryTheory.Category` (for `⟦⟧`, `𝟙`, `≫`, `assoc`)
  - `Mathlib.CategoryTheory.Limits.Basic` (for `HasCoproduct`, `IsIso`, `Epi`)
  - `Mathlib.CategoryTheory.EpiMono` (for `Epi` class)
  - `Mathlib.CategoryTheory.Iso` (for `IsIso`, `inv`, `asIso`)
  - `Mathlib.CategoryTheory.Limits.Constructions.Coproducts` (for `Sigma.desc`, `ι`, `colimit` infrastructure)

> **Note**: The file avoids assuming pullbacks (as stated in the docstring), making the definitions applicable in more general contexts (e.g., pretoposes without pullbacks).

--- 

This module serves as a foundational layer for descent theory and effective epimorphism calculus in category theory, with careful attention to constructivity and minimal assumptions.