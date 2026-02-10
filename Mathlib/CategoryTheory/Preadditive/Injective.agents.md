### Technical Metadata Brief: Injective Objects in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Injective (J : C)` | `class Injective (J : C) : Prop` | Defines injectivity: every morphism into `J` factors through any monomorphism. |
| `Injective.factors` | `∀ {X Y} (g : X ⟶ J) (f : X ⟶ Y) [Mono f], ∃ h, f ≫ h = g` | Core property of injective objects. |
| `InjectivePresentation (X : C)` | `structure` | A monomorphism `X ↪ J` where `J` is injective. |
| `EnoughInjectives` | `class EnoughInjectives : Prop` | Asserts every object has an injective presentation. |
| `factorThru` | `factorThru g f : Y ⟶ J` | The factorization morphism guaranteed by injectivity. |
| `comp_factorThru` | `f ≫ factorThru g f = g` | Commutativity of the factorization triangle. |
| `of_iso` / `iso_iff` | `Injective P → (P ≅ Q) → Injective Q` | Injectivity is preserved under isomorphism. |
| `zero_injective` | `[HasZeroObject C] → Injective (0 : C)` | The zero object is injective. |
| `injective_iff_projective_op` | `Injective J ↔ Projective (op J)` | Duality between injective and projective objects via opposite category. |
| `injective_iff_preservesEpimorphisms_yoneda_obj` | `Injective J ↔ (yoneda.obj J).PreservesEpimorphisms` | Characterization via Yoneda embedding preserving epis. |
| `injective_of_adjoint` | `L ⊣ R`, `L` preserves monos, `Injective J ⇒ Injective (R.obj J)` | Right adjoints preserve injectives if left adjoint preserves monos. |
| `map_injective` / `injective_of_map_injective` | Under adjunctions, relate injectivity of `I` and `G.obj I`. | Used to transfer injectivity along adjoints. |
| `mapInjectivePresentation` | `InjectivePresentation X ⇒ InjectivePresentation (G.obj X)` | Push forward injective presentations along right adjoints. |
| `injectivePresentationOfMap` | `InjectivePresentation (F.obj X) ⇒ InjectivePresentation X` | Pull back injective presentations along left adjoints (with faithfulness/reflectiveness). |
| `EnoughInjectives.of_adjunction` | `L ⊣ R`, `L` reflects & preserves monos, `EnoughInjectives D ⇒ EnoughInjectives C` | Transfer "enough injectives" along adjunctions. |
| `enoughInjectives_iff` | `C ≌ D ⇒ EnoughInjectives C ↔ EnoughInjectives D` | Equivalence of categories preserves/enough injectives. |
| `syzygies f` | `under (cokernel f)` | Arbitrary choice of injective object over cokernel of `f`. |
| `d f` | `cokernel.π f ≫ ι (cokernel f)` | The connecting morphism to the syzygy object. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `injective_`: e.g., `injective_under`, `injective_iff_...`, `injectivePresentationOfMap`.
  - `factorThru`: for factorization through monos.
  - `ι` (`ι X`): canonical monomorphism `X ↪ J` from injective presentation.
  - `under X`: the chosen injective object in a presentation of `X`.
  - `d f`, `syzygies f`: syzygy-related constructions.

- **Suffixes**:
  - `_iff_`: logical equivalences (e.g., `injective_iff_projective_op`).
  - `_of_`: implications (e.g., `injective_of_adjoint`, `enoughInjectives_of_enoughProjectives_op`).
  - `map_`: functors preserving structure (e.g., `map_injective`, `mapInjectivePresentation`).

- **Category-theoretic terms**:
  - `mono`, `epi`, `proj`, `inj`, `preserves`, `reflects`, `adj`, `yoneda`, `cokernel`, `biproduct`, `prod`, `Pi`, `limit`, `colimit`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using specific lemmas (e.g., `comp_factorThru`, `prod.lift_fst`, `biprod.lift_fst`). |
| `rw [...]` | Rewrite using equations (e.g., `h_eq`, `Category.assoc`, `Iso.inv_hom_id`). |
| `ext` | Extensionality for products, biproducts, limits, etc. |
| `obtain ⟨h, h_eq⟩ := ...` | Extract witness and property from existential quantifier. |
| `refine ⟨..., ?_⟩` | Construct witnesses for structure/proof goals. |
| `aesop` / `tauto` / `intro` | Basic logical reasoning (not heavily used here; more structural). |
| `classical` | For classical choice in `Type`-valued injectivity instance. |
| `split_ifs` | Handle `if ... then ... else ...` cases. |
| `change ... = ...` | Preprocess goal to match known lemmas. |
| `haveI : ... := ...` | Introduce instance assumptions for typeclass inference. |
| `infer_instance` | Automatically infer typeclass instances (e.g., `Injective J`, `Mono f`). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a **constructive pattern**: given data (e.g., `g : X ⟶ J`, `f : X ⟶ Y` mono), use `Injective.factors` to get `∃ h, f ≫ h = g`, then extract `h` via `choose`.
  - **Isomorphism invariance**: Prove `Injective P → P ≅ Q → Injective Q` by transporting morphisms along iso.
  - **Duality**: Many results (e.g., `injective_iff_projective_op`) are proven via opposite category and known projective duals.
  - **Adjunction-based transfer**: Use hom-adjointness (`homEquiv`) to move morphisms between categories; verify naturality/mono/epi conditions.
  - **Enough injectives**: Use `EnoughInjectives.presentation X` to get a `Nonempty (InjectivePresentation X)`, then `some` to pick a representative.

- **Common proof patterns**:
  - **Induction on structure**: Not used here (no inductive types).
  - **Case analysis on `h : z ∈ Set.range f`**: In `Type` injectivity instance.
  - **Universal property exploitation**: For products, biproducts, limits — use universal property + `simp` to verify factorization.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Preadditive.Projective` | Provides dual notions (projective objects, factorization), used for duality lemmas. |
| `CategoryTheory` (open) | Core category theory infrastructure: morphisms, limits, colimits, adjunctions, yoneda. |
| `Limits` (open) | Products, biproducts, limits, colimits, cokernels. |
| `Opposite` (open) | For `op`, `unop`, and duality constructions. |
| `ZeroObject` (via `open ZeroObject`) | For zero object and zero morphisms. |

**Scope**:  
This file formalizes **injective objects**, **injective presentations**, and the property **"enough injectives"** in a general category `C`. It establishes:
- Basic properties (isomorphism invariance, zero object injectivity).
- Closure under limits (products, biproducts, arbitrary products/biproducts).
- Duality with projectives via opposite category.
- Preservation under adjunctions (especially right adjoints).
- Transfer of "enough injectives" across equivalences and adjunctions.
- Construction of syzygies in categories with cokernels and enough injectives.

It serves as the **dual foundation** to projective object theory, enabling homological algebra in general abelian or preadditive categories.

--- 

Let me know if you'd like a diagrammatic summary or a dependency graph of the key lemmas.