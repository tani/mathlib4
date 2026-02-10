### Technical Metadata Brief: Bifunctors in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Bifunctor` | `class Bifunctor (F : Type u₀ → Type u₁ → Type u₂) where bimap : ∀ {α α' β β'}, (α → α') → (β → β') → F α β → F α' β'` | Captures the *data* of a bifunctor: a binary type constructor equipped with a `bimap` operation. |
| `LawfulBifunctor` | `class LawfulBifunctor (F : Type u₀ → Type u₁ → Type u₂) [Bifunctor F] : Prop where id_bimap, bimap_bimap` | Asserts that `bimap` satisfies the two bifunctor laws: identity and composition. |
| `fst` | `abbrev fst {α α' β} (f : α → α') : F α β → F α' β := bimap f id` | Left component mapping (analogous to `map` on the first argument). |
| `snd` | `abbrev snd {α β β'} (f : β → β') : F α β → F α β' := bimap id f` | Right component mapping (analogous to `map` on the second argument). |
| `id_bimap` | `∀ x, bimap id id x = x` | Identity law for `bimap`. |
| `bimap_bimap` | `∀ f f' g g' x, bimap f' g' (bimap f g x) = bimap (f' ∘ f) (g' ∘ g) x` | Composition law for `bimap`. |
| `comp_fst`, `comp_snd` | `fst f' (fst f x) = fst (f' ∘ f) x`, `snd g' (snd g x) = snd (g' ∘ g) x` | Derived laws for `fst` and `snd` as functors. |
| `fst_snd`, `snd_fst` | `fst f (snd f' x) = bimap f f' x`, `snd f' (fst f x) = bimap f f' x` | Commutativity of `fst` and `snd`. |
| `Prod.bifunctor`, `Sum.bifunctor`, `Const.bifunctor` | Instances of `Bifunctor` for `Prod`, `Sum`, and `Const`. | Standard examples of bifunctors. |
| `Bifunctor.flip` | `instance Bifunctor (flip F)` | Swaps arguments of a bifunctor. |
| `Bifunctor.functor` | `instance {α} : Functor (F α)` | Fixes the first argument to yield a unary functor. |
| `bicompl.bifunctor`, `bicompr.bifunctor` | Instances for bifunctor composition (left/right). | Enables building new bifunctors from existing ones via functor composition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `bimap_`: Core bifunctor operation (e.g., `bimap_bimap`, `bimap_id_id`).
  - `fst_`, `snd_`: Operations on left/right arguments (e.g., `fst_comp_fst`, `snd_id`).
  - `comp_`: Composition-related lemmas (e.g., `comp_fst`, `comp_snd`).
- **Suffixes**:
  - `_id`: Identity laws (`id_bimap`, `fst_id`, `snd_id`).
  - `_bimap`: Laws involving `bimap` composition (`bimap_bimap`, `bimap_comp_bimap`).
- **Higher-order attributes**:
  - `@[higher_order ...]` tags indicate lemmas used by the `functor_norm` simplifier for reasoning about functors/bifunctors.

---

#### **3. Tactic Stack**

- **`simp`** (with `functor_norm`): Dominant tactic for rewriting using bifunctor laws.
- **`aesop`**: Used in `Sum.lawfulBifunctor` to discharge simple propositional reasoning.
- **`rfl`**: Used in lawful instances for `Prod`, `Const`, where definitional equality suffices.
- **`by simp [bimap, functor_norm]`**: Common pattern in `flip` and composition instances.
- **`intros` + `constructor`**: Standard for proving `LawfulBifunctor` instances (two goals: identity & composition).

---

#### **4. Proof Logic**

- **Structure**:
  1. Define *lawless* `Bifunctor` (data only).
  2. Extend with `LawfulBifunctor` (propositional constraints).
  3. Derive derived operations (`fst`, `snd`) and their properties.
  4. Prove standard examples (`Prod`, `Sum`, `Const`) are lawful.
  5. Show closure under constructions: `flip`, `bicompl`, `bicompr`.
- **Typical proof pattern**:
  - For `LawfulBifunctor`: `constructor <;> intros <;> simp [bimap, functor_norm]`.
  - For derived lemmas: `by simp [fst, bimap_bimap]` or similar, leveraging `functor_norm` to normalize nested mappings.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Control.Functor` | Provides `Functor`, `LawfulFunctor`, `map`, `map_id`, `map_comp_map`, `mapConst`, `bicompl`, `bicompr`. |
| `Mathlib.Tactic.Common` | Supplies common tactics like `aesop`, `functor_norm`, and attribute machinery (`higher_order`, `functor_norm`). |

---

#### **Domain Scope**

This module formalizes **bifunctors** in the context of *category theory in type theory*, specifically within the *functorial semantics* of dependent types. It serves as foundational infrastructure for reasoning about:
- Binary type constructors (e.g., `Prod`, `Sum`, `Const`, `bicompl`, `bicompr`)
- Composition of functors in two arguments
- Derivation of unary functors from bifunctors (via fixing one argument)

It is part of the broader *category theory* and *functional programming semantics* ecosystem in Mathlib.