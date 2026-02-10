### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `map_eq_bind_pure_comp` | `∀ (f : α → β) (x : m α), f <$> x = x >>= pure ∘ f` | Rewrites `map` (`<$>`) in terms of `bind` (`>>=`) and `pure`, enabling normalization between applicative and monadic styles under lawful monad assumptions. |
| `StateT.eval` | `StateT σ m α → σ → m α` | Evaluates a `StateT` computation by discarding the final state; extracts the result component via `Prod.fst`. |
| `StateT.equiv` | `(σ₁ → m₁ (α₁ × σ₁)) ≃ (σ₂ → m₂ (α₂ × σ₂)) → StateT σ₁ m₁ α₁ ≃ StateT σ₂ m₂ α₂` | Lifts an equivalence between function spaces to an equivalence between `StateT` monads. |
| `ReaderT.equiv` | `(ρ₁ → m₁ α₁) ≃ (ρ₂ → m₂ α₂) → ReaderT ρ₁ m₁ α₁ ≃ ReaderT ρ₂ m₂ α₂` | Lifts an equivalence between function spaces to an equivalence between `ReaderT` monads. |

> **Note**: Theorems like `map_eq_bind_pure_comp` are annotated with `@[monad_norm]`, indicating they are part of a rewrite system for monad-specific normalization.

#### 2. **Naming Conventions**

- **Prefixes / Suffixes**:
  - `is_`, `functor_`, `monad_`: Used in attributes (`monad_norm`, `functor_norm`) and theorem names (`map_eq_bind_pure_comp`).
  - `eval`: Indicates a *partial evaluation* or *projection* operation (e.g., discarding state).
  - `equiv`: Indicates a construction of an equivalence (bijection up to propositional equality) between types.
- **Structure**:
  - Theorems follow pattern: `[action]_[target]_[condition]` (e.g., `map_eq_bind_pure_comp`).
  - Definitions use descriptive names (`StateT.eval`, `ReaderT.equiv`) reflecting their semantics.

#### 3. **Tactic Stack**

- **Primary tactics used**:
  - `simp` (with custom simp sets: `functor_norm`, `monad_norm`)
  - `rw` (via `.symm` to reverse equations)
  - `ext` (for extensionality proofs — applied to `ReaderT`, `StateT`, `ExceptT`)
- **Automation**:
  - Custom `simp`-based normalization (`functor_norm`, `monad_norm`) is central to the design.
  - No explicit tactic scripts in this snippet, but theorems are structured for use with `simp` and `aesop`-style automation.

#### 4. **Proof Logic**

- **Strategy**:
  - Theorems are *equational* and *rewrite-oriented*.
  - Proofs (e.g., `map_eq_bind_pure_comp`) rely on existing lemmas (`bind_pure_comp`) and symmetry (`.symm`), avoiding case analysis or induction.
  - Equivalence constructions (`StateT.equiv`, `ReaderT.equiv`) are *definitionally trivial* — they directly reuse the given equivalence `F`, relying on type-theoretic identity of the underlying representations.
- **Design Philosophy**:
  - Emphasis on *modularity* and *rewrite compatibility* rather than deep proof search.
  - Normalization rules avoid introducing monadic syntax where applicatives suffice, preserving expressiveness.

#### 5. **Imports**

- **Core dependency**:
  - `Mathlib.Logic.Equiv.Defs`: Provides the foundational `Equiv` type and basic operations (e.g., `≃`, `F` as an equivalence).
- **Implicit dependencies** (via typeclass constraints):
  - `Mathlib.Logic.Function.Basic` (for `∘`, `pure`, `>>=`)
  - `Mathlib.Control.Monad.Basic` (for `Monad`, `LawfulMonad`, `ReaderT`, `StateT`, `ExceptT`)
  - `Mathlib.Data.Product` (for `Prod.fst`, used in `StateT.eval`)

---

### Summary

This module provides a *lightweight, rewrite-based infrastructure* for monad reasoning in Lean 4, with a focus on:
- Normalizing between applicative and monadic syntax (`map_eq_bind_pure_comp`),
- Supporting structural equivalences for `ReaderT`/`StateT` via function-space equivalences,
- Integrating with `simp`-based automation via custom attributes (`@[monad_norm]`, `@[functor_norm]`, `@[ext]`).

It reflects a *Lean 4 Mathlib* style: declarative, typeclass-driven, and optimized for symbolic manipulation over heavy proof automation.