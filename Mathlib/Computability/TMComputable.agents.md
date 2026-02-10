Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Computable Functions on Encoded Types via Turing Machines**

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `FinTM2` | `structure` | Bundled TM2 machine with finite stacks, states, and function labels; includes input/output stack indices (`k₀`, `k₁`), stack alphabet family `Γ`, function labels `Λ`, main function `main`, and program `m`. |
| `initList` | `tm.Cfg` | Constructs initial configuration from input list over input alphabet `Γ k₀`. |
| `haltList` | `tm.Cfg` | Constructs final (halt) configuration from output list over output alphabet `Γ k₁`. |
| `EvalsTo` | `structure` | Proof that repeated application of `f : σ → Option σ` on `a` yields `b` in `steps` steps. |
| `EvalsToInTime` | `structure` | Refinement of `EvalsTo` with an upper bound `m` on steps (`steps ≤ m`). |
| `TM2Outputs` | `Prop` | Says `tm` outputs `l'` on input `l` iff `step* (initList l) = haltList <$> l'`. |
| `TM2OutputsInTime` | `Prop` | Same as `TM2Outputs`, but with explicit time bound `m`. |
| `TM2ComputableAux` | `structure` | Bundled TM2 with input/output alphabet equivalences `tm.Γ k₀ ≃ Γ₀`, `tm.Γ k₁ ≃ Γ₁`. |
| `TM2Computable` | `structure` | `f : α → β` is computable if there exists a `FinTM2` that, on encoding of `a`, outputs encoding of `f a`. |
| `TM2ComputableInTime` | `structure` | Same as `TM2Computable`, but with a time function `ℕ → ℕ` bounding runtime by `time (encode a).length`. |
| `TM2ComputableInPolyTime` | `structure` | Same as `TM2ComputableInTime`, but time function is a polynomial (`Polynomial ℕ`). |
| `idComputableInPolyTime` | `def` | Identity on `α` is computable in *linear* (degree 1) polynomial time via `idComputer`. |
| `idComputableInTime` | `def` | Identity is computable in some (not necessarily polynomial) time. |
| `idComputable` | `def` | Identity is computable (no time bound). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `has_`: Not used here.
  - `inhabited_`: For `Inhabited` instances (e.g., `inhabitedFinTM2`, `inhabitedStmt`).
  - `idComputer`, `idComputable*`: For identity-related constructions.
- **Suffixes**:
  - `InTime`, `InPolyTime`: Indicate time-bounded versions.
  - `Aux`: For auxiliary structures (e.g., `TM2ComputableAux`).
  - `Outputs`, `OutputsInTime`: For output correctness predicates.
- **Other patterns**:
  - `init*`, `halt*`: For initial/halt configurations.
  - `EvalsTo*`: For step-counting execution proofs.
  - `cast rfl`: Used for type equality via `Equiv.cast`.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, ` rfl`: For rewriting and simplification (e.g., `by rw [h₁.evals_in_steps, h₂.evals_in_steps]`).
- `simp only [...]`: For precise simplification (e.g., in `idComputableInPolyTime`).
- `le_refl`, `add_le_add`: For time-bound inequalities.
- `inferInstanceAs`: To construct `Inhabited` instances where `deriving` fails.
- `by aesop` or `by tauto` not present — proofs are mostly algebraic/inductive.

#### **4. Proof Logic**

- **Inductive/iterative reasoning**: Execution is modeled via `Function.iterate` and `bind`, with proofs by unfolding iteration and using `EvalsTo.trans`/`refl`.
- **Time bounds**: Proofs of polynomial time often reduce to verifying `steps = 1` and `1 ≤ 1`, using `Polynomial.eval_one`.
- **Structure extension**: Many definitions extend simpler ones (`TM2ComputableInTime` extends `TM2ComputableAux`), and forgetful maps (`toTM2Outputs`, `toTM2Computable`, etc.) are defined explicitly.
- **Canonical examples**: Identity function is handled uniformly across all variants (`idComputableInPolyTime`, etc.), using a minimal machine `idComputer` with trivial state/stack structure.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Polynomial.Eval.Defs`: For polynomial evaluation.
  - `Mathlib.Computability.Encoding`: For `FinEncoding` (finite encodings of types).
  - `Mathlib.Computability.TuringMachine`: For `TM2` (unbundled Turing machine model).
- **Scope**: Formalization of *time-bounded computability* over *finitely encoded types*, with emphasis on:
  - Bundled machines (`FinTM2`)
  - Execution semantics (`EvalsTo`, `TM2Outputs`)
  - Complexity classes (polytime, general time, unbounded)
- **Notable design choices**:
  - Time measured in *number of `step` applications*, not low-level operations (justified as constant-factor equivalent).
  - Uses `Option` for halting behavior (`Option.none` = halt).
  - Encodings via `FinEncoding` (finite types with `Γ : Type`, `encode/decode`, etc.).

---

This file serves as a foundational module for complexity theory in Lean, enabling formal reasoning about *which functions between encoded types are computable in polynomial time*, with the identity function as the canonical example.