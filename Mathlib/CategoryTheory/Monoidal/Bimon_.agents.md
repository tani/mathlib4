### Technical Metadata Brief: Bimonoid Objects in a Braided Monoidal Category (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Bimon_Class (M : C)` | `class` extending `Mon_Class M`, `Comon_Class M` | Defines a *bimonoid object* as a simultaneous monoid and comonoid with coherence axioms. |
| `mul_comul'`, `one_comul'`, `mul_counit'`, `one_counit'` | `μ[M] ≫ Δ[M] = ...`, etc. | Core compatibility conditions between monoid and comonoid structure maps. |
| `IsBimon_Hom {f : M ⟶ N}` | `class` extending `IsMon_Hom f`, `IsComon_Hom f` | Defines morphisms between bimonoids (i.e., maps preserving both monoid and comonoid structure). |
| `Bimon_ C` | `def Bimon_ := Comon_ (Mon_ C)` | The *category* of bimonoids in `C`, defined as comonoids in the monoidal category of monoids in `C`. |
| `toMon_`, `forget`, `toComon_` | Functors `Bimon_ C ⥤ Mon_ C`, `Bimon_ C ⥤ C`, `Bimon_ C ⥤ Comon_ C` | Forgetful functors factoring through monoids/comonoids. |
| `toMon_Comon_obj`, `ofMon_Comon_obj` | Object mappings in an equivalence | Construct the equivalence `Comon_(Mon_ C) ≌ Mon_(Comon_ C)`. |
| `equivMon_Comon_` | `Bimon_ C ≌ Mon_ (Comon_ C)` | The central categorical equivalence showing symmetry between monoid-in-comonoid and comonoid-in-monoid perspectives. |
| `trivial`, `trivialTo`, `toTrivial` | `Bimon_ C`, morphisms to/from `trivial` | Initial and terminal bimonoid constructions. |
| `compatibility` | `M.comul.hom ⊗ M.comul.hom ≫ ... = M.mul ≫ M.comul.hom` | Explicit morphism-level compatibility condition in `C`, using braiding and associators. |
| `hom_comul_hom`, `hom_counit_hom` | `f ≫ N.comul = M.comul ≫ f⊗f`, `f ≫ N.counit = M.counit` | Morphism coherence laws for bimonoid homs. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mul_`, `one_`, `comul_`, `counit_`: refer to monoid/comonoid structure maps (`μ`, `η`, `Δ`, `ε`).
  - `hom_`: for morphism components (e.g., `f.hom`, `f.hom.hom`).
  - `to_`, `of_`: for functors between structured categories (e.g., `toMon_`, `ofMon_Comon_`).
  - `trivial_`: for canonical initial/terminal constructions.

- **Suffixes**:
  - `'` (prime): primed versions of axioms (e.g., `mul_comul'`) used internally; unprimed versions (`mul_comul`) are `simp`-normalized.
  - `_obj`, `_hom`: object and morphism parts of functors/natural transformations.
  - `_class`: for class-based definitions (`Bimon_Class`).

- **Pattern**: `X.Y.Z` often means `Z`-part of `Y`-structure of `X` (e.g., `M.X.mul`, `M.comul.hom`).

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Dominant tactic for category-theoretic simplification and equation solving (used in all `Bimon_Class` axioms).
- **`simp` / `simpa`**: Heavily used for rewriting using `simp`-lemmas and discharging goals via simplification.
- **`dsimp`**: Used in `toMon_Comon_obj` and `ofMon_Comon_obj` to simplify definitional equalities.
- **`congr_arg`**: To lift equalities between hom-components to equalities of structured morphisms (e.g., `congr_arg Mon_.Hom.hom`).
- **`ext`**: For extensionality proofs (e.g., `Comon_.Hom.ext`, `Mon_.Hom.ext`).
- **`rfl`**: For definitional equalities (e.g., `id_hom'`, `comp_hom'`).

---

#### **4. Proof Logic & Strategy**

- **Structure**: Definitions are layered:
  1. **Pointwise class** (`Bimon_Class`) for objects.
  2. **Category-level construction** (`Bimon_ C := Comon_ (Mon_ C)`).
  3. **Equivalence proof** (`equivMon_Comon_`) via explicit functors and natural isomorphisms.

- **Proof Style**:
  - **Definitional lifting**: Many lemmas are derived by projecting to underlying homs (`f.hom.hom`) and applying known lemmas from `Mon_`/`Comon_`.
  - **Simp-normalization**: Primed axioms are marked `[reassoc]` and later unprimed versions are marked `[simp]` for automation.
  - **Diagrammatic reasoning**: The `compatibility` theorem is proven by unfolding definitions and applying `Mon_.Hom.mul_hom` symmetry.

- **Induction/Recursion**: Not used — this is purely categorical/axiomatic reasoning.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Monoidal.Comon_` | Provides `Comon_`, `Mon_`, forgetful functors, and structure morphism lemmas. |
| `CategoryTheory`, `MonoidalCategory`, `BraidedCategory` | Core infrastructure for monoidal/braided categories. |
| `Mon_Class`, `Comon_Class` scoped namespaces | Provide notation (`μ`, `Δ`, `η`, `ε`) and typeclass interfaces. |

**Scope**: This file lives in the *internal category theory* of braided monoidal categories, building on `Mathlib`’s hierarchy of monoidal and enriched structures.

---

#### **6. Notable Design Choices**

- **Noncomputable section**: Required due to use of typeclasses and hom-sets not admitting computable elimination.
- **`[reassoc]` attributes**: Used to guide `aesop_cat`/`simp` in handling associators and unitors.
- **`simps!`**: Applied to avoid timeouts during `simps` generation for complex functors.
- **Equivalence via `NatIso.ofComponents`**: Avoids explicit verification of triangle identities by leveraging `Iso.refl`.

---

#### **7. Future Work (from TODO)**

- Construct `Modules` over bimonoids and show monoidal structure.
- Develop *Tannaka reconstruction*: internal endomorphisms of a monoidal functor form a bimonoid, representable under good conditions.

--- 

Let me know if you'd like a formalized summary (e.g., for a `leanpkg.toml` metadata block or a documentation template).