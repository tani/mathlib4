### Technical Metadata Brief: `use` and `use!` Tactics in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `applyTheConstructor` | `MVarId → MetaM (List MVarId × List MVarId × List MVarId)` | Applies the unique constructor of a single-constructor inductive type to the current goal, returning explicit, implicit, and instance metavariables. |
| `useLoop` | `Bool → List MVarId → List Term → List MVarId → List MVarId → TermElabM (List MVarId × List MVarId × List MVarId)` | Recursively refines goals using supplied terms; optionally applies constructors (depending on `eager` mode). |
| `runUse` | `Bool → TacticM Unit → List Term → TacticM Unit` | Runs `useLoop` on the main goal, synthesizes instance metavariables, discharges remaining `Prop` goals via a discharger tactic. |
| `use_discharger` | Syntax `tactic` | Default discharger tactic for closing remaining `Prop` goals; defined via macro rules using `rfl`, `assumption`, `True.intro`, etc. |
| `mkUseDischarger` | `Option (TSyntax ``Parser.Tactic.discharger) → TacticM (TacticM Unit)` | Constructs a discharger tactic from user-provided syntax or defaults to `try with_reducible use_discharger`. |
| `useSyntax`, `use!Syntax` | Elaborator macros | Entry points for `use` and `use!` tactics, calling `runUse` with `eager := false` or `true`, respectively. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `use_`: Core logic (`useLoop`, `runUse`, `mkUseDischarger`)
  - `applyThe`: Constructor application logic (`applyTheConstructor`)
- **Suffixes**:
  - `?`: Optional argument (e.g., `discharger?`)
  - `!`: “Exuberant” variant (`use!` → `eager := true`)
- **Descriptive patterns**:
  - `expl`, `impl`, `insts`: Explicit, implicit, and instance metavariable lists.
  - `acc`: Accumulator for goals generated via `refine`.
  - `eager`: Boolean flag controlling constructor application strategy.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities:
- `refine`: Core refinement mechanism.
- `apply`: Used internally via `applyTheConstructor`.
- `rfl`, `assumption`, `True.intro`, `And.intro`, `exists_prop.mpr`: In `use_discharger`.
- `synthInstance`: For instance metavariable resolution.
- `isDefEq`, `isProp`, `isAssigned`: Meta-level checks.
- `withoutRecover`, `observing?`: For error-handling and backtracking.
- `setGoals`, `pruneSolvedGoals`: Goal management.

---

#### **4. Proof Logic / Execution Flow**

1. **Goal Analysis**:
   - Goal must be an inductive type with **exactly one constructor** for `applyTheConstructor` to succeed.
2. **Argument Processing**:
   - For each supplied term `arg`:
     - If goal is already assigned: check definitional equality.
     - Else:
       - In **eager mode** (`use!`): Try `refine arg` first; if fails, try constructor.
       - In **non-eager mode** (`use`): Try constructor only if `arg` is last argument.
3. **Constructor Application**:
   - If applicable, `applyTheConstructor` splits goal into subgoals (explicit/implicit/instance).
4. **Instance Synthesis**:
   - After main loop, attempt to synthesize remaining instance metavariables.
5. **Prop Discharge**:
   - Remaining goals that are propositions are closed using the discharger (default: `use_discharger`).

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization. |
| `Lean.Meta.Tactic.Util` | Utilities for metavariable and tactic manipulation. |
| `Lean.Elab.Tactic.Basic` | Elaboration infrastructure for tactics (e.g., `evalTactic`, `run`). |

---

### Summary

The `use` and `use!` tactics provide flexible instantiation of inductive types (especially existential quantifiers and product-like structures), with `use` being conservative (constructor only at last argument) and `use!` being aggressive (constructor anywhere, flattening nested structures). The implementation leverages metavariable management, constructor introspection, and configurable goal discharge—making it a powerful tool for constructive existence proofs in Lean 4.