Here's a structured **technical metadata brief** extracted from the provided Lean 4 file on *reflective functors*:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Reflective (R : D ⥤ C)` | `class` extending `R.Full`, `R.Faithful` | Defines a *reflective functor*: fully faithful right adjoint. Includes `L : C ⥤ D` and `adj : L ⊣ R`. |
| `reflector [Reflective i]` | `C ⥤ D` | The left adjoint (reflector) to a reflective functor `i`. |
| `reflectorAdjunction [Reflective i]` | `reflector i ⊣ i` | The adjunction witnessing reflectivity. |
| `unit_obj_eq_map_unit [Reflective i]` | `η_{iLX} = i(map(η_X))` | Describes how the unit interacts with the reflector on objects in the image of `i`. |
| `Functor.essImage.unit_isIso [Reflective i]` | `A ∈ i.essImage ⇒ η_A : iso` | Unit is iso at objects essentially in the image of `i`. |
| `mem_essImage_of_unit_isSplitMono [Reflective i]` | `split mono η_A ⇒ A ∈ i.essImage` | Characterizes essential image via split monic unit. |
| `unitCompPartialBijective [Reflective i]` | `(A ⟶ B) ≃ (iL A ⟶ B)` for `B ∈ i.essImage` | Natural bijection showing `A` and `iL A` have same morphisms into essential image objects. |
| `equivEssImageOfReflective [Reflective i]` | `D ≌ i.EssImageSubcategory` | Equivalence between domain and essential image subcategory, via reflector. |
| `Coreflective (L : C ⥤ D)` | `class` extending `L.Full`, `L.Faithful` | Dual notion: fully faithful *left* adjoint. |
| `coreflector [Coreflective j]`, `coreflectorAdjunction` | Duals of reflector/adjunction | Right adjoint (coreflector) and its adjunction. |
| `Functor.essImage.counit_isIso`, `mem_essImage_of_counit_isSplitEpi` | Duals of unit iso & split mono results | Counit iso on essential image; split epi counit ⇒ essential image. |

---

### 📝 **Naming Conventions**

- **Prefixes**:
  - `reflective_`, `reflector_`, `reflectorAdjunction_`: for reflective data.
  - `coreflective_`, `coreflector_`, `coreflectorAdjunction_`: for coreflective duals.
  - `unit_`, `counit_`: for unit/counit components.
  - `essImage_`: for properties about essential image.
- **Suffixes**:
  - `_obj`: for object-level components (e.g., `unit_obj_eq_map_unit`).
  - `_naturality`, `_natural`: for naturality statements.
  - `_symm_apply`: for inverse of equivalences/bijections.
- **Adjectives**:
  - `FullyFaithfulOfReflective`, `EssentialImage`: descriptive compound names.
  - `comp`: for composition instances (e.g., `Reflective.comp`, `Coreflective.comp`).

---

### 🛠️ **Tactic Stack**

Frequently used tactics in proofs:
- `rw` (rewrite), especially with naturality and adjunction laws.
- `simp` (simplification), often with custom lemmas like `unitCompPartialBijectiveAux_symm_apply`.
- `exact`, `refine`, `apply`, `intro` for direct proof construction.
- `rwa` (rewrite + assumption) for quick rewrites using definitional equalities.
- `convert`, `congr`, `ext` for extensionality and equality of morphisms/natural transformations.
- `aesop` not used here — proofs are mostly manual and adjunction-heavy.
- `calc` for chaining equalities (e.g., in `unitCompPartialBijective`).

---

### 🧠 **Proof Logic & Strategy**

- **Induction not used** — proofs rely on categorical properties (adjunctions, fully faithfulness, naturality).
- **Standard pattern**:
  1. Use `adjunction.naturality`, `homEquiv_naturality`, or `unit_naturality`.
  2. Apply fully faithfulness to reduce to morphism-level reasoning.
  3. Use `isIso_of_epi_of_isSplitMono` / `isIso_of_mono_of_isSplitEpi` to prove isomorphisms.
  4. Leverage `essImage` characterizations (e.g., `mem_essImage_of_unit_isIso`).
- **Equivalence constructions** (`equivEssImageOfReflective`) use:
  - `NatIso.ofComponents` for natural isomorphisms.
  - `asIso` to upgrade natural transformations to isomorphisms.
  - `fullyFaithfulCancelRight` for verifying unit/counit iso conditions.

---

### 📦 **Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.Adjunction.FullyFaithful`
- `Mathlib.CategoryTheory.Functor.EpiMono`
- `Mathlib.CategoryTheory.HomCongr`

**Scope**:
- General category theory in `Type u`, with universe polymorphism (`v₁`, `v₂`, `v₃`, `u₁`, `u₂`, `u₃`).
- Focus on **essential image**, **unit/counit behavior**, and **equivalence with subcategory**.
- Related limit/colimit properties deferred to `Mathlib.CategoryTheory.Monad.Limits`.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch of key theorems**, or **comparison with coreflective duality**.