Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `Rand` Monad and `Random` Class Library**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `RandGT g` | `Type → Type u → Type u` | Monadic transformer for random computations using generator type `g`; defined as `StateT (ULift g)`. |
| `RandG g` | `Type → Type u` | Special case of `RandGT` over the identity monad: `RandGT g Id`. |
| `RandT` | `Type → Type u → Type u` | Instantiation of `RandGT` with `StdGen`: `RandGT StdGen`. |
| `Rand` | `Type → Type u` | Instantiation of `RandG` with `StdGen`: `RandG StdGen`. |
| `Random m α` | `Class` | Typeclass for types `α` that can be randomly generated in monad `m`. Provides `random : RandGT g m α`. |
| `BoundedRandom m α` | `Class` | Typeclass for preordered types `α` with bounded random generation. Provides `randomR : lo ≤ hi → RandGT g m {a // lo ≤ a ∧ a ≤ hi}`. |
| `Rand.next` | `RandGT g m Nat` | Extracts next random `Nat` from generator state. |
| `Rand.split` | `RandGT g m g` | Splits current generator into two; returns second part, updates state with first. |
| `Rand.range` | `RandGT g m (Nat × Nat)` | Returns the range of `Nat` values producible by the generator. |
| `Random.rand` | `RandGT g m α` | Generic random generator for `α` using `Random m α`. |
| `Random.randBound` | `RandGT g m {a // lo ≤ a ∧ a ≤ hi}` | Generates random `α` within bounds `lo ≤ hi`. |
| `Random.randFin` | `RandGT g m (Fin n.succ)` | Generates a random `Fin n.succ`. |
| `Random.randBool` | `RandGT g m Bool` | Generates a random `Bool` via `rand (Fin 2)`. |
| `Random.randR [BoundedRandom m Nat]` | `lo ≤ hi → RandGT g m {a // lo ≤ a ∧ a ≤ hi}` | Implements bounded random `Nat` via `Fin (hi - lo + 1)`. |
| `Random.randR [BoundedRandom m Int]` | `lo ≤ hi → RandGT g m {a // lo ≤ a ∧ a ≤ hi}` | Implements bounded random `Int` using `natAbs` and offset. |
| `Random.randR [BoundedRandom m (Fin n)]` | `lo ≤ hi → RandGT g m {a // lo ≤ a ∧ a ≤ hi}` | Implements bounded random `Fin n`. |
| `IO.runRand` | `RandT m α → m α` | Runs a `RandT` computation using global `stdGenRef`. |
| `IO.runRandWith` | `Nat → RandT m α → m α` | Runs a `RandT` computation with a given seed. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `rand`: for functions generating random values (`rand`, `randBound`, `randFin`, `randBool`).
  - `randomR`: for bounded random generation (from `BoundedRandom`).
  - `next`, `split`, `range`: low-level generator operations.
- **Suffixes**:
  - `T`: monad transformer (e.g., `RandGT`, `RandT`).
  - No suffix for base monads (e.g., `RandG`, `Rand`).
- **Typeclass names**:
  - `Random`, `BoundedRandom`: follow Lean’s convention for typeclasses with descriptive names.

#### **3. Tactic Stack**

Frequent tactics used in proofs/definitions (inferred from structure and style):
- `do`-notation (monadic sequencing)
- `let`/`match` for destructuring
- `pure`, `return`, `set`, `←` for state manipulation
- `map`, `ULiftable.up`, `ULiftable.down` for lifting/unlifting
- `Fin.ofNat'`, `Int.ofNat_le`, `Nat.le_of_succ_le_succ`, etc., for arithmetic reasoning (not tactics per se, but core lemmas)

No explicit use of `simp`, `rw`, `aesop`, or `linarith` is visible in the code, suggesting heavy reliance on definitional equality and direct construction.

#### **4. Proof Logic / Construction Style**

- **Constructive & stateful**: All definitions are *executable* and rely on `StateT` to thread RNG state.
- **No inductive proofs**: The file avoids inductive proofs; instead, it defines operations directly and relies on typeclass instances to connect interfaces.
- **Instance synthesis**: Typeclass instances are defined explicitly for common types (`Nat`, `Int`, `Fin`, `Bool`, `ULift`), often by reducing to simpler cases (e.g., `Fin n` via `Nat`).
- **Lifting**: Uses `ULiftable` to lift random generators across monad layers (e.g., `ST RealWorld` ↔ `IO`).
- **Bounded generation**: For `BoundedRandom`, bounds are enforced via dependent pairs `{a // lo ≤ a ∧ a ≤ hi}` and verified via arithmetic lemmas.

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Control.ULiftable` | Enables lifting computations across monad towers (e.g., `ST` ↔ `IO`). |
| `Mathlib.Order.Fin.Basic` | Provides basic facts about `Fin`, including ordering and bounds. |

No other external dependencies are used — the library is self-contained within Mathlib’s control and order infrastructure.

---

This module serves as a foundational random monad library for Lean, designed for integration with `IO` and `ST`, and supports both unbounded and bounded random generation via typeclasses. It mirrors Haskell’s `MonadRandom` while adapting to Lean’s dependent type theory and monad stack conventions.