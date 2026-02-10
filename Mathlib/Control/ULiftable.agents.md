### Technical Brief: `ULiftable` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ULiftable` | `class ULiftable (f : outParam (Type u₀ → Type u₁)) (g : Type v₀ → Type v₁) where congr {α β} : α ≃ β → f α ≃ g β` | A typeclass for *universe-lifting equivalences* between two universe-polymorphic type constructors `f` and `g`. Enables transport of structures across universes via equivalences. |
| `ULiftable.symm` | `ULiftable f g → ULiftable g f` | Symmetry of universe lifting: invert the direction of lifting. |
| `ULiftable.refl` | `[Functor f] [LawfulFunctor f] → ULiftable f f` | Reflexivity: identity lifting for a single functor. |
| `ULiftable.up` | `f α → g (ULift.{v} α)` | Lifts a value in `f α` to `g (ULift α)` using the equivalence induced by `Equiv.ulift`. |
| `ULiftable.down` | `g (ULift α) → f α` | Lowers a value in `g (ULift α)` back to `f α`. |
| `ULiftable.adaptUp` | `F α → (α → G β) → G β` | Combinator to use `up` with monadic bind, hiding `ULift` manipulation. |
| `ULiftable.adaptDown` | `F α → (α → G β) → G β` | Dual of `adaptUp`, for `down`. |
| `ULiftable.upMap` | `(α → β) → F α → G β` | Map function that lifts the domain universe. |
| `ULiftable.downMap` | `(α → β) → F α → G β` | Map function that lowers the codomain universe. |
| `up_down`, `down_up` | `up (down x) = x`, `down (up x) = x` | Prove `up` and `down` are inverses. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `up_`, `down_`: for operations moving *up* or *down* in universes (e.g., `up`, `down`, `upMap`, `downMap`, `adaptUp`, `adaptDown`).
  - `instULiftable*`: for instances of `ULiftable` (e.g., `instULiftableId`, `Option.instULiftable`).
  - `*_uliftable'`: helper lemmas for constructing `ULiftable` instances for monad transformers (e.g., `StateT.uliftable'`, `ReaderT.uliftable'`).
- **Suffixes**:
  - `ULiftULift`: for instances where both source and target types are `ULift`-adjusted (e.g., `StateT.instULiftableULiftULift`).
- **Pattern**:
  - `monadT.uliftable' (F : s ≃ s')` → constructs `ULiftable (monadT s m) (monadT s' m')`.
  - `monadT.instULiftableULift` → specialized case where `s' = ULift s`.

---

#### **3. Tactic Stack**

- **Core proof automation**:
  - `simp`, `simp [ctor]`: for simplifying `ULift`, `Equiv`, `map`, `Except.map`, `Option.map`.
  - `cases f`: for destructing `Except`, `Option`, or `WriterT`/`StateT`/`ReaderT`/`ContT` constructors.
  - `congr`: to apply equivalence congruence (e.g., `Equiv.piCongr`, `Equiv.prodCongr`).
- **Equivalence reasoning**:
  - `Equiv.ulift`, `Equiv.ulift.symm`, `Equiv.trans`
  - `Functor.mapEquiv`, `ReaderT.equiv`, `StateT.equiv`, `WriterT.equiv`, `ContT.equiv`, `Except.map`
- **Monadic combinators**:
  - `>>=`, `∘`, `up`, `down`, `adaptUp`, `adaptDown`
- **Lawful functor assumptions**:
  - `Functor`, `LawfulFunctor` used in `refl` instance.

---

#### **4. Proof Logic**

- **Instance construction**:
  - Use `Equiv.piCongr` + `Equiv.prodCongr` + `ULiftable.congr` to lift parameter equivalences (e.g., `s ≃ s'`) to transformer equivalences.
  - For `ReaderT`, `WriterT`, `StateT`, `ContT`, the `congr` field is built by composing transformer-specific `equiv` constructors with `ULiftable.congr`.
- **Inverse proofs (`up_down`, `down_up`)**:
  - Rely on `left_inv` / `right_inv` of the underlying `ULiftable.congr` equivalence (i.e., `Equiv.ulift.symm`).
- **Monadic combinators**:
  - Proofs (often implicit) rely on monad laws and `up_down`/`down_up` to ensure correctness after `ULift`-hiding.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Control.Monad.Basic` | Core monad infrastructure (`Functor`, `Monad`, bind, etc.) |
| `Mathlib.Control.Monad.Cont` | Continuation-passing monad (`ContT`) |
| `Mathlib.Control.Monad.Writer` | Writer monad (`WriterT`) |
| `Mathlib.Logic.Equiv.Basic` | Equivalences (`Equiv`, `symm`, `trans`, `ulift`) |
| `Mathlib.Logic.Equiv.Functor` | Functorial action on equivalences (`mapEquiv`) |
| `Mathlib.Control.Lawful` | Lawful functor/monad axioms (used in `refl` instance) |

---

### Summary

This module formalizes *universe-lifting* for polymorphic type constructors (especially monads and monad transformers) in Lean 4. It provides a uniform interface (`ULiftable`) to move between different universe instantiations of the same structure, using `ULift` and equivalences. The design emphasizes composability and automation, with helper lemmas (`uliftable'`) and standard instances for common functors (`Option`, `Except`, `StateT`, `ReaderT`, `WriterT`, `ContT`). The proof style is largely equational, leveraging `simp` and equivalence properties.