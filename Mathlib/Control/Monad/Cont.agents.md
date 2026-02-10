### Technical Metadata Brief: Continuation Monad (`ContT`, `MonadCont`) in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MonadCont.Label α m β` | `structure` | Represents a *labelled continuation*: a function `α → m β` used to model jumps/returns in continuation-passing style. |
| `goto` | `Label α m β → α → m β` | Applies a label to a value — the core operation for "jumping" to a continuation. |
| `callCC` | `(Label α m β → m α) → m α` | The central operation of `MonadCont`: captures the current continuation and passes it to a function, enabling non-local control flow. |
| `ContT r m α` | `(α → m r) → m r` | The continuation monad transformer: wraps computations in CPS (continuation-passing style) with result type `r`. |
| `Cont r α` | `ContT r id α` | The plain continuation monad (no transformer stack). |
| `run` | `ContT r m α → (α → m r) → m r` | Unwraps a `ContT` computation by applying it to a continuation. |
| `map` / `withContT` | `ContT` utilities | Modify the final continuation or the input continuation of a `ContT` computation. |
| `monadLift` | `m α → ContT r m α` | Lifts a computation from the base monad `m` into `ContT`. |
| `ExceptT.mkLabel`, `OptionT.mkLabel`, `WriterT.mkLabel`, `StateT.mkLabel`, `ReaderT.mkLabel` | Label constructors for transformer stacks | Translate labels between the base monad and a transformer stack (e.g., `ExceptT`, `OptionT`). |
| `ExceptT.callCC`, `OptionT.callCC`, `WriterT.callCC`, `StateT.callCC`, `ReaderT.callCC` | `callCC` implementations for transformers | Define `callCC` for each transformer by delegating to the underlying `callCC` in `m`. |
| `LawfulMonadCont` | `class` | Axiomatizes *lawful* behavior of `callCC`, ensuring coherence with `>>=` and `pure`. |
| `callCC_bind_right`, `callCC_bind_left`, `callCC_dummy` | Axioms of `LawfulMonadCont` | Ensure `callCC` interacts correctly with sequencing and identity. |
| `ContT.equiv` | `ContT r₁ m₁ α₁ ≃ ContT r₂ m₂ α₂` | Equivalence between continuation monads induced by equivalences of underlying types/monads. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mkLabel`: Constructs a label for a transformer stack from a label in the base monad.
  - `goto`: Applies a label (i.e., jumps to a continuation).
  - `callCC`: Captures the current continuation.
  - `run`: Executes a continuation computation.
  - `withContT`, `map`: Modify continuations.
  - `monadLift`: Lifts computations into the transformer.

- **Suffixes**:
  - `Label`: Refers to the label structure.
  - `mkLabel`, `goto_mkLabel`: Theorems about label construction and `goto`.
  - `callCC_*`: Theorems about `callCC` behavior (e.g., `callCC_bind_right`, `callCC_dummy`).
  - `run_*`: Theorems about `run` and interaction with other operations.

- **Transformer-specific**:
  - `ExceptT`, `OptionT`, `WriterT`, `StateT`, `ReaderT` all follow consistent naming: `X.mkLabel`, `X.goto_mkLabel`, `X.callCC`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality (especially for function equality in CPS). |
| `rfl` | Reflexivity for definitional equalities (e.g., `run (map f x) = f ∘ run x`). |
| `simp only [...]` | Simplification with explicit lemmas (e.g., `callCC`, `run_bind`, `goto_mkLabel`). |
| `dsimp` | Definitional simplification (often before `congr`). |
| `congr with ⟨⟩` | Congruence for structure equality (used in `ExceptT`/`OptionT` proofs). |
| `simp [ExceptT.bindCont, @callCC_dummy m _]` | Targeted simplification using transformer-specific lemmas. |
| `funext` | Function extensionality (e.g., in `ContT.equiv` proofs). |
| `cases x` | Case analysis on structure fields (common in label theorems). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Definitional equalities** (e.g., `run (map f x) = f ∘ run x`) are proven by `rfl`.
  - **Lawful monad transformer instances** (e.g., `LawfulMonadCont (ContT r m)`) are proven by:
    - Extending with `ext` (function extensionality),
    - Simplifying using `simp only [...]` with definitions (`callCC`, `run`, `bind`),
    - Reducing to `rfl` or known axioms (`callCC_dummy`, `callCC_bind_left`, etc.).
  - **Transformer instances** (e.g., `MonadCont (ExceptT ε m)`) are proven by:
    - Defining `callCC` in terms of the base `callCC`,
    - Proving laws by unfolding definitions and using `simp` + `congr` + `ext`.
  - **Equivalence proofs** (e.g., `ContT.equiv`) use:
    - `funext` + `simp` to show inverses.

- **Common pattern**:
  > *Unfold definitions → Simplify with `simp only` → Apply extensionality (`ext`) → Reduce to `rfl` or axioms.*

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Control.Monad.Basic`
  - `Mathlib.Control.Monad.Writer`
  - `Mathlib.Control.Lawful`
  - `Batteries.Tactic.Congr`
  - `Batteries.Lean.Except`

- **Scope**:
  - Formalization of **continuation monads** (`ContT`, `Cont`) and their **transformer stack behavior**.
  - Support for `ExceptT`, `OptionT`, `WriterT`, `StateT`, `ReaderT` over `ContT`.
  - Emphasis on **lawful semantics** (`LawfulMonadCont`) and **equational reasoning**.
  - Lean 4–specific adaptations (e.g., `EmptyCollection`/`Monoid` for `WriterT`).

---

### Summary

This file formalizes the **continuation monad transformer** (`ContT`) and its interaction with other monad transformers in Lean 4. It defines `MonadCont` (a class for monads supporting `callCC`) and proves that `ContT`, `ExceptT`, `OptionT`, `WriterT`, `StateT`, and `ReaderT` all inherit `MonadCont` and `LawfulMonadCont` instances. The proofs rely heavily on extensionality, definitional simplification, and careful handling of labels and continuations. The naming and structure follow Lean 4’s standard library conventions, with transformer-specific variants derived uniformly.