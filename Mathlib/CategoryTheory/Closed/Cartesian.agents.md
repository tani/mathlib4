### Technical Metadata Brief: Cartesian Closed Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Exponentiable X` | `Closed X` | An object `X` is exponentiable if `(X × -)` is a left adjoint (i.e., has a right adjoint `(-)^X`). |
| `Exponentiable.mk` | `(exp : C ⥤ C) → tensorLeft X ⊣ exp → Exponentiable X` | Constructor for exponentiability via explicit adjunction. |
| `binaryProductExponentiable` | `Exponentiable X → Exponentiable Y → Exponentiable (X ⊗ Y)` | Product of exponentiable objects is exponentiable. |
| `terminalExponentiable` | `Exponentiable (𝟙_ C)` | Terminal object is always exponentiable. |
| `CartesianClosed C` | `MonoidalClosed C` | Category `C` is cartesian closed iff all objects are exponentiable (w.r.t. cartesian monoidal structure). |
| `CartesianClosed.mk` | `(∀ X, Exponentiable X) → CartesianClosed C` | Constructor for cartesian closedness. |
| `exp A` | `C ⥤ C` | The exponential functor `(-)^A`, defined as `ihom A`. |
| `ev A`, `coev A` | `exp A ⋙ tensorLeft A ⟶ 𝟭 C`, `𝟭 C ⟶ tensorLeft A ⋙ exp A` | Evaluation and coevaluation natural transformations (unit/counit of adjunction). |
| `curry`, `uncurry` | `(A ⊗ Y ⟶ X) ↔ (Y ⟶ A ⟹ X)` | Currying/uncurrying isomorphism (hom-set bijection from adjunction). |
| `pre f` | `exp A ⟶ exp B` (for `f : B ⟶ A`) | Pre-composition internal hom morphism (contravariant action on exponent). |
| `internalHom` | `Cᵒᵖ ⥤ C ⥤ C` | The internal hom bifunctor in a cartesian closed category. |
| `zeroMul`, `mulZero`, `powZero` | Isomorphisms involving initial object | Structural properties of CCCs with initial object (e.g., `A × 0 ≅ 0`, `0^B ≅ 1`). |
| `prodCoprodDistrib` | `(Z × X) + (Z × Y) ≅ Z × (X + Y)` | Distributivity of product over coproduct in CCCs with binary coproducts. |
| `strict_initial` | `(f : A ⟶ I) [IsInitial I] → IsIso f` | Any map into an initial object from an exponentiable object is an iso. |
| `cartesianClosedOfEquiv` | `C ≌ D → CartesianClosed C → CartesianClosed D` | Cartesian closedness transports across categorical equivalence. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `exp_`: for exponential-related constructions (`exp`, `expUnitIsoSelf`, `expUnitNatIso`).
  - `curry_`, `uncurry_`: for currying/uncurrying operations and naturality lemmas.
  - `pre_`: for pre-composition in internal hom (`pre f`).
  - `homEquiv_`: for properties of the hom-set equivalence from the adjunction.
  - `ev_`, `coev_`: for evaluation/coevaluation morphisms and their compositions.
  - `zero_`, `mulZero`, `powZero`: for initial-object-related isomorphisms.
  - `prodCoprodDistrib`: compound naming for distributivity of × over +.

- **Notation**:
  - `A ⟹ B`: notation for `(exp A).obj B` (internal hom).
  - `B ^^ A`: alternative notation for `(exp A).obj B`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop_cat`: for category-theoretic reasoning (e.g., `pre_id`).
- `simp` + `rw` + `apply`: standard simplification and rewriting.
- `ext`: extensionality for morphisms (especially with `IsInitial`).
- `apply t.hom_ext`: for uniqueness of maps from initial objects.
- `rw [← curry_eq_iff]`, `rw [uncurry_eq]`: manipulating currying/uncurrying.
- `cases'`, `exact`, `refine`: for constructing morphisms and isomorphisms.
- `monad_prover` / `monad_fail`: not used here; lean category theory relies heavily on `aesop_cat`, `simp`, and manual rewriting.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs rely on the **adjunction** `tensorLeft A ⊣ exp A`, and use:
    - `homEquiv_naturality_*` lemmas (naturality of the hom-isomorphism).
    - `curry_eq`, `uncurry_eq`, `curry_uncurry`, `uncurry_curry` to reduce to identities.
  - For isomorphisms (e.g., `zeroMul`, `powZero`), proofs typically:
    - Define `hom` and `inv`.
    - Prove `hom ∘ inv = 1` and `inv ∘ hom = 1` using properties of initial objects (`t.hom_ext`) and adjunctions.
  - For functoriality (e.g., `pre_map`, `pre_id`), use:
    - `conjugateEquiv_*` lemmas (from monoidal closed structure).
    - `simp` + `aesop_cat` for trivial compositions.
  - For transport across equivalences (`cartesianClosedOfEquiv`), use:
    - `MonoidalClosed.ofEquiv`, leveraging coherence of finite products under equivalence.

- **Induction / recursion**: Not used — this is purely categorical reasoning, not inductive.

---

#### **5. Imports**

Core dependencies defining the module’s scope:

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.EpiMono` | Monos, epis, isomorphisms. |
| `Mathlib.CategoryTheory.Limits.Shapes.FiniteProducts` | Finite products (including terminal, binary products). |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.BinaryProducts` | Preservation of binary products by functors. |
| `Mathlib.CategoryTheory.ChosenFiniteProducts` | Chosen finite products (required for monoidal structure). |
| `Mathlib.CategoryTheory.Adjunction.Limits` | Adjunctions preserve/create limits/colimits. |
| `Mathlib.CategoryTheory.Adjunction.Mates` | Mates and conjugate equivalences (used in `pre`). |
| `Mathlib.CategoryTheory.Closed.Monoidal` | Closed monoidal categories (basis for `Exponentiable`, `exp`, etc.). |

---

#### **6. Notable Design Decisions**

- **Chosen finite products required**: All definitions assume `[ChosenFiniteProducts C]`, not just `hasFiniteProducts`. Users must promote via `ofFiniteProducts`.
- **No typeclass instances for exponentiability**: Explicit `Exponentiable X` arguments used instead of instances (e.g., `terminalExponentiable` is a def, not an instance).
- **Internal hom as bifunctor**: `internalHom : Cᵒᵖ ⥤ C ⥤ C` encodes contravariance in the exponent.
- **Notation via delaborators**: Custom notation `A ⟹ B`, `B ^^ A` supported via `app_delab`.
- **SimpNF warnings**: Some lemmas marked `nolint simpNF` due to suboptimal simplifier behavior (post-#2644).

---

This metadata captures the formalization’s structure, conventions, and reasoning patterns for downstream AI agent training or porting efforts.