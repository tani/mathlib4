Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Factorization Axiom in Category Theory (Lean 4)**

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `MapFactorizationData f` | `Structure` | Packages a factorization of a morphism `f : X ⟶ Y` as `i ≫ p` with `W₁ i`, `W₂ p`, and a proof `i ≫ p = f`. |
| `FactorizationData` | `Abbrev` | A function assigning a `MapFactorizationData` to every morphism — i.e., a *global choice* of factorizations. |
| `HasFactorization` | `Class Prop` | Asserts that *every* morphism admits *some* factorization in `W₁` followed by `W₂` (nonempty `MapFactorizationData`). |
| `comp W₁ W₂` | `MorphismProperty C` | The class of morphisms that factor as `i ≫ p` with `W₁ i` and `W₂ p`. |
| `comp_eq_top_iff` | `Lemma` | `W₁.comp W₂ = ⊤ ↔ HasFactorization W₁ W₂`. Connects pointwise factorizability with the top property. |
| `FunctorialFactorizationData` | `Structure` | A *functorial* version: intermediate object is a functor `Arrow C ⥤ C`, and `i`, `p` are natural transformations satisfying naturality and `W₁`, `W₂` membership. |
| `factorizationData` (from `FunctorialFactorizationData`) | `Def` | Extracts a (non-functorial) `FactorizationData` from a functorial one. |
| `ofLE` | `Def` | If `W₁ ≤ W₁'` and `W₂ ≤ W₂'`, then a functorial factorization for `W₁, W₂` yields one for `W₁', W₂'`. |
| `functorCategory.Z`, `functorCategory` | `Def` | Extends a functorial factorization on `C` to the functor category `J ⥤ C`, for any small `J`. |
| `HasFunctorialFactorization` | `Class Prop` | Asserts existence of a *functorial* factorization (nonempty `FunctorialFactorizationData`). |
| `functorialFactorizationData` | `Def` | A canonical choice of functorial factorization when `HasFunctorialFactorization` holds. |
| `instance [HasFunctorialFactorization] : HasFactorization` | `Instance` | Functorial ⇒ non-functorial factorization. |
| `instance [HasFunctorialFactorization] : HasFunctorialFactorization (W₁.functorCategory J) (W₂.functorCategory J)` | `Instance` | Functorial factorization descends to functor categories. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `MapFactorizationData` — data for *a single* morphism.
  - `FactorizationData` — global choice (forall morphisms).
  - `FunctorialFactorizationData` — functorial version (natural, functor-valued).
  - `comp` — composition-like closure: `W₁ ∘ W₂`.
  - `ofLE` — “of ≤”: upgrade along monotone extension of properties.
  - `fac`, `fac_app` — proofs that the factorization composes to the original morphism.
  - `hi`, `hp` — membership in `W₁`, `W₂`.
  - `mapZ` — functoriality of the intermediate object under arrow morphisms.

- **Suffixes**:
  - `-Data` — data structure (non-unique, possibly non-functorial).
  - `-Factorization` — class asserting existence of such data.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Simplifies categorical equalities (e.g., `fac : i ≫ p = f`). |
| `simp` / `simp_rw` | Rewriting using `reassoc`, `fac`, `fac_app`, naturality lemmas. |
| `rw` | Rewriting using naturality, functor laws, `fac`. |
| `congr` + `ext` + `simp` | Proving equality of natural transformations / functors. |
| `dsimp` | Simplifying definitions (e.g., in `functorCategory.Z.map_id`). |
| `exact`, `refine`, `intro` | Standard proof scripting. |
| `noncomputable def` | For classical choice (e.g., `factorizationData`, `functorialFactorizationData`). |

---

#### **4. Proof Logic & Strategy**

- **Core logical flow**:
  - **Existence ⇒ top property**: Show `W₁.comp W₂ f` holds for all `f` iff `HasFactorization` holds.
    - Use `Nonempty.some` to extract a factorization from `HasFactorization`.
    - Conversely, use `top_apply` to get `Nonempty (MapFactorizationData f)`.

- **Functoriality**:
  - Define `Z : Arrow C ⥤ C` as a functor.
  - Prove naturality of `i`, `p` using `naturality`.
  - Verify `W₁`, `W₂` membership on all arrows.
  - For functor categories: define `Z` pointwise using `factorizationData`, and `mapZ` for morphisms; check functoriality via `mapZ_id`, `mapZ_comp`.

- **Upgrade lemmas**:
  - `ofLE`: straightforward lifting of membership via `≤`.
  - `functorCategory`: pointwise construction + naturality checks.

---

#### **5. Imports & Dependencies**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.MorphismProperty.Basic
  ```
  - Provides foundational definitions: `MorphismProperty`, `Arrow`, `functorCategory`, `top`, `≤`, etc.

- **Implicit dependencies** (via `CategoryTheory` namespace and `Arrow`):
  - `CategoryTheory.Category`
  - `CategoryTheory.Arrow`
  - `CategoryTheory.NaturalTransformation`
  - `CategoryTheory.Functor`
  - `CategoryTheory.MorphismProperty.Basic` (includes `MorphismProperty`, `top`, `≤`, etc.)

- **Relevant to future use**:
  - Model category formalization (CM5 axiom: factorization as cofibration → trivial fibration).
  - Cylinder objects, path objects, homotopy theory — where functoriality matters.

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for model categories using this module.