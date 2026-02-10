### Technical Brief: `itauto` Intuitionistic Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AndKind` | `inductive AndKind | and | iff | eq` | Encodes variants of conjunction: `∧`, `↔`, `=`. Used to distinguish proof reconstruction behavior. |
| `IProp` | `inductive IProp` | Reified syntax for intuitionistic propositional logic: atoms (`var`), `⊤`, `⊥`, `∧`, `∨`, `→`, plus derived forms (`iff`, `eq`, `not`, `xor`). |
| `Proof` | `inductive Proof` | Reified proof terms for intuitionistic propositional logic. Supports reconstruction of natural deduction-style proofs. |
| `Context` | `def Context := Lean.RBMap IProp Proof IProp.cmp` | A context (hypothesis map) during proof search, ordered by `IProp.cmp`. |
| `Context.add` | `IProp → Proof → Context → Except (IProp → Proof) Context` | Adds a hypothesis to the context, applying *level 1* simplifications (e.g., eliminating `⊤`, splitting `∧`, currying implications). |
| `prove` | `Context → IProp → StateM Nat (Bool × Proof)` | Main proof search function: applies *level 1* and *level 2* rules (validity-preserving). |
| `search` | `Context → IProp → StateM Nat (Bool × Proof)` | Handles *level 3* rules (non–validity-preserving), e.g., `∨`-intro, double-implication splitting. Backtracks if needed. |
| `reify` | `Q(Prop) → AtomM IProp` | Converts a Lean `Prop` expression into `IProp`, introducing fresh atoms for non-propositional or higher-order constructs. |
| `applyProof` | `MVarId → NameMap Expr → Proof → MetaM Unit` | Reconstructs a Lean proof term from a `Proof` object and assigns it to the goal. |
| `itautoCore` | `MVarId → Bool → Bool → Array Expr → MetaM Unit` | Main tactic entry point: handles decidable assumptions, classical case splits, and runs `prove`/`search`. |

**Notable Derived Constructors**:
- `IProp.not A := A.imp .false`
- `IProp.xor A B := (A ∧ ¬B) ∨ (B ∧ ¬A)`
- `IProp.iff A B := .and' .iff A B`
- `IProp.eq A B := .and' .eq A B`

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Not used here.
  - `and`, `or`, `imp`, `true`, `false`: Directly mirror logical connectives.
  - `curry`, `curry₂`: For currying/uncurrying implications over conjunctions.
  - `intro`, `elim`, `left`, `right`: Standard natural deduction naming (`intro`, `orElim`, `andLeft`, `andRight`).
  - `em`: Excluded middle (`em false` = decidable LEM, `em true` = classical LEM).
  - `hyp`: Hypothesis reference.
  - `app`, `app'`: Application of implication.
- **Suffixes**:
  - `'` (prime): Often denotes a “raw” or “unoptimized” version (e.g., `app'`, `orElim'`).
  - `₂`: Binary variant (e.g., `curry₂`).
- **`AndKind` variants**:
  - `.and`, `.iff`, `.eq`: Used in constructors like `andIntro`, `andLeft`, `curry`, etc., to select correct theorem (e.g., `And.intro`, `Iff.intro`, `propext`).

---

#### **3. Tactic Stack**

Frequent tactics used in proof reconstruction and simplification:

| Tactic | Usage |
|--------|-------|
| `aesop` | Not used directly in core logic, but `itauto` may be used *after* preprocessing with `aesop`. |
| `simp` / `simp_rw` | Not used in core; simplifications are *built into* `Context.add`. |
| `ring` | Not used. |
| `exact` | Implicit in `hyp` and `triv`. |
| `apply`, `intro`, `cases`, `induction` | Emulated via `Proof` constructors and `applyProof`. |
| `liftOption`, `trySynthInstance`, `isDefEq`, `mkFreshExprMVarQ` | Used in `applyProof` and `itautoCore` for metavariable management and type checking. |
| `foldlM`, `fold`, `match` | Used in `prove`, `search`, `Context.add`, and `itautoCore` for context traversal. |

**Key pattern**: Heavy use of `StateM Nat` (for name generation) and `Except` (for early failure on `⊥`).

---

#### **4. Proof Logic**

The proof search follows the **G4ip** sequent calculus (Dyckhoff, 1992), structured in three phases:

1. **Level 1 (Validity-preserving, no splitting)**:
   - *Left rules* in `Context.add`: Simplify hypotheses (e.g., drop `⊤`, split `∧`, curry `∧ →`, rewrite `∨ →`).
   - *Right rules* in `prove`: Introduce `→`, `∧`, `⊤`.
   - *Search rules* in `search`: Atomic assumptions (`P ⊢ P`), modus ponens (`P, P → A ⊢ B`).

2. **Level 2 (Validity-preserving, splitting)**:
   - `prove` handles `∧`-intro (split goal), `∨`-elim (split context).

3. **Level 3 (Non–validity-preserving, backtracking)**:
   - `search` handles `∨`-intro (try left/right), double-implication splitting (`(A₁ → A₂) → C ⊢ B`).
   - Uses `fold` over context to try all applicable implications.

**Backtracking strategy**:
- `prove` tries level 1/2 first.
- If stuck, delegates to `search`, which:
  - Tries to resolve via existing hypotheses.
  - If `B = A₁ ∨ A₂`, tries `prove Γ A₁`; if fails, tries `prove Γ A₂`.
  - For double implications, explores all possible `A → B` in context.

**Failure handling**:
- `Context.add` returns `Except (IProp → Proof)` to short-circuit on `⊥`, producing an `exfalso` proof for any goal.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Batteries.Tactic.Exact`, `Batteries.Tactic.Init` | Utility tactics and initialization. |
| `Mathlib.Logic.Basic` | Core logic utilities (e.g., `Decidable`, `propext`). |
| `Mathlib.Tactic.DeriveToExpr` | Deriving `ToExpr` instances for reified types. |
| `Mathlib.Util.AtomM` | State monad for generating fresh propositional atoms during `reify`. |
| `Qq` | Quasi-quotation for `Expr`/`Q(Prop)` syntax. |

**Scope**: This module is self-contained within `Mathlib.Tactic.ITauto`, with no external dependencies beyond core Lean and Mathlib utilities.

---

### Summary

The `itauto` tactic implements a **complete decision procedure for intuitionistic propositional logic** using a contraction-free sequent calculus (G4ip). It reifies goals into an internal `IProp` syntax, performs context-aware simplifications, and reconstructs natural deduction proofs via a `Proof` term. It supports `True`, `False`, `And`, `Or`, `→`, `Not`, `Iff`, `Eq`, `Xor'`, and `Ne`, but *not* quantifiers or definitions (must be unfolded first). The `itauto!` variant enables classical case splits on demand.