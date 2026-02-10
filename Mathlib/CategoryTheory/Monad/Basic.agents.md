### Technical Brief: Monads and Comonads in Lean 4 (CategoryTheory.Monad)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Monad` | `structure extends C ⥤ C` | Encodes a monad on a category `C`: an endofunctor `T`, unit `η : 1 ⇒ T`, multiplication `μ : T² ⇒ T`, satisfying associativity, left/right unit laws. |
| `Comonad` | `structure extends C ⥤ C` | Dual to monad: counit `ε : G ⇒ 1`, comultiplication `δ : G ⇒ G²`, satisfying coassociativity, left/right counit laws. |
| `MonadHom` | `structure extends NatTrans` | Morphism of monads: natural transformation `f : T ⇒ U` commuting with `η` and `μ`. |
| `ComonadHom` | `structure extends NatTrans` | Morphism of comonads: natural transformation commuting with `ε` and `δ`. |
| `monadToFunctor` | `Monad C ⥤ C ⥤ C` | Forgetful functor sending a monad to its underlying endofunctor. |
| `comonadToFunctor` | `Comonad C ⥤ C ⥤ C` | Forgetful functor for comonads. |
| `MonadIso.mk` | `M ≅ N` (in `Monad C`) | Constructs monad isomorphism from underlying functor iso satisfying compatibility with `η`, `μ`. |
| `ComonadIso.mk` | `M ≅ N` (in `Comonad C`) | Dual construction for comonads. |
| `transport` (for `Monad`) | `(T : Monad C) → (i : T ≅ F) → Monad C` | Transports monad structure along a functor isomorphism. |
| `transport` (for `Comonad`) | `(T : Comonad C) → (i : T ≅ F) → Comonad C` | Dual for comonads. |
| `id : Monad C` | Identity monad on `C` | Unit and multiplication are identity natural transformations. |
| `id : Comonad C` | Identity comonad on `C` | Counit and comultiplication are identity natural transformations. |
| `map_unit_app` | `T.map (η_X) = η_{TX}` | Under `μ` iso, `T` preserves unit components. |
| `isSplitMono_iff_isIso_unit` | `IsSplitMono η_X ↔ IsIso η_X` | Unit is split mono iff iso, assuming `μ` iso. |
| `map_counit_app` | `T.map (ε_X) = ε_{TX}` | Dual to `map_unit_app`. |
| `isSplitEpi_iff_isIso_counit` | `IsSplitEpi ε_X ↔ IsIso ε_X` | Dual to `isSplitMono_iff_isIso_unit`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isSplitMono`, `isIso` — properties of morphisms.
  - `app_`: e.g., `app_η`, `app_μ`, `app_ε`, `app_δ` — compatibility conditions for morphisms.
  - `map_`: e.g., `map_unit_app`, `map_counit_app` — behavior of functor on unit/counit.
  - `transport`: structure transport along isomorphism.

- **Suffixes**:
  - `_hom`, `_iso`: for morphisms and isomorphisms in algebraic categories (`MonadHom`, `ComonadIso`).
  - `_unit`, `_counit`: for unit/counit components.
  - `_assoc`: for associativity/coassociativity laws.

- **Category-theoretic shorthands**:
  - `η`, `μ`, `ε`, `δ`: standard notation for monad/comonad structure maps.
  - `T`, `G`, `M`, `N`: typical names for monads/comonads.
  - `toFunctor`: underlying functor projection.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in `by aesop_cat` proofs — a custom tactic for category-theoretic reasoning (likely a variant of `aesop` with category-specific lemmas).
- **`simp` / `simp only`**: Extensively used for simplification, especially with `@[simps!]` attributes.
- **`rw` / `erw`**: Rewriting using equations and definitional equalities.
- **`slice_lhs` / `slice_rhs`**: For targeted rewriting in subexpressions.
- **`congr`**: To reduce equality of morphisms to equality of components.
- **`ext` / `funext`**: Extensionality for natural transformations and morphisms.
- **`refine`**: For constructing proofs with holes (e.g., `refine ⟨..., ?_⟩`).
- **`reassoc`**: Custom attribute for reassociation lemmas (e.g., `attribute [reassoc (attr := simp)] ...`).
- **`cancel_mono`, `cancel_epi`**: Cancellation lemmas for monos/epis.

---

#### **4. Proof Logic**

- **Structure definitions** are accompanied by *proof obligations* solved automatically via `aesop_cat`.
- **Morphism definitions** (`MonadHom`, `ComonadHom`) use `@[ext]` to enable extensionality lemmas (`ext`, `ext'`).
- **Category instances** (`Category (Monad C)`, etc.) are constructed by:
  - Defining identity and composition at the level of underlying natural transformations.
  - Proving category laws using `funext` + `simp` (often with `NatTrans` lemmas).
- **Isomorphism constructions** (`MonadIso.mk`, `ComonadIso.mk`) rely on:
  - Cancelling isomorphisms (`cancel_natIso_hom_right`, `cancel_natIso_inv_left`).
  - Using naturality and unit/counit laws.
- **Transport lemmas** (`transport`) use:
  - Naturality of `η`, `μ`, `ε`, `δ`.
  - Functoriality (`map_comp`, `map_id`).
  - Isomorphism properties (`hom_inv_id`, `assoc`).
- **Properties of unit/counit** (e.g., `map_unit_app`) use:
  - Cancellation lemmas (`cancel_mono`, `cancel_epi`).
  - Naturality and monad/comonad laws.
  - `simp` with `map_comp`, `η.naturality`, etc.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Functor.Category` | Defines the category of functors `[C ⥤ D]`. |
| `Mathlib.CategoryTheory.Functor.FullyFaithful` | Used for faithfulness/fully-faithful properties (e.g., `monadToFunctor.Faithful`). |
| `Mathlib.CategoryTheory.Functor.ReflectsIso` | Provides `ReflectsIsomorphisms` typeclass and tools (e.g., `reflects` in `monadToFunctor`). |

---

### Summary

This file formalizes the foundational theory of **monads and comonads** in a 1-categorical setting, including:
- Their categorical structures (`Monad C`, `Comonad C` as categories),
- Forgetful functors to endofunctors (`monadToFunctor`, `comonadToFunctor`),
- Morphisms and isomorphisms,
- Transport of structure along functor isomorphisms,
- Key lemmas about unit/counit behavior under isomorphism assumptions.

It leverages Lean 4’s `@[simps!]`, `@[ext]`, and custom tactics (`aesop_cat`, `reassoc`) to automate routine proofs, while maintaining high expressiveness for categorical reasoning.