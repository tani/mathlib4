**Technical Metadata Brief: `assert_no_sorry` Command (Lean 4)**

---

### 1. **Key Definitions & Theorems**

- **`assert_no_sorry`**  
  - **Type**: `Elab.Command.CommandElabM Unit` (via `elab` macro)  
  - **Purpose**: A command that checks whether a given global constant (e.g., theorem/definition name) depends on `sorryAx`; if so, it raises a compile-time error with the message `"{name} contains sorry"`.

- **`Lean.collectAxioms`**  
  - **Type**: `Name → MetaM (HashSet Name)`  
  - **Purpose**: Collects all axioms (including `sorryAx`) transitively used by the given global constant.

- **`sorryAx`**  
  - **Type**: `Name` (a constant in Lean’s kernel representing the `sorry` axiom)  
  - **Purpose**: Internal representation of the `sorry` proof term; used to detect incomplete proofs.

---

### 2. **Naming Conventions**

- **Command prefix**: `assert_` — indicates a *sanity-check* or *validation* command (similar to `assert` in programming languages).
- **Identifier suffix**: `no_sorry` — explicitly states the property being enforced (absence of `sorry`).
- **Variable naming**: `n` (short for "name"), `axioms` (plural, indicating a collection), `name` (resolved `Name` value).
- **Kernel constant naming**: Uses backtick-quoted identifiers (e.g., `` ``sorryAx ``) — standard Lean convention for referring to kernel-level constants.

---

### 3. **Tactic / Elaborator Stack**

- **`liftCoreM`**: Lifts a `MetaM` computation into the command elaboration monad (`Elab.Command.CommandElabM`).
- **`Lean.Elab.realizeGlobalConstNoOverloadWithInfo`**: Resolves a user-provided identifier to a global constant name (fails if ambiguous).
- **`Lean.collectAxioms`**: Core utility for dependency analysis of definitions/theorems.
- **`HashSet.contains`**: Set membership check (efficient lookup).
- **`throwError`**: Standard error-reporting function in elaborator monad.
- **No tactics used** — this is a *command elaborator*, not a tactic script.

---

### 4. **Proof Logic / Execution Flow**

1. Parse the identifier `n` from the input syntax.
2. Resolve `n` to a global constant name (`name`) using `realizeGlobalConstNoOverloadWithInfo`.
3. Compute the set of axioms used by `name` via `collectAxioms`.
4. Check if `sorryAx` is in that set.
5. If yes → throw an error; if no → succeed silently.

> **Note**: This is *not* a proof procedure but a *static analysis tool* for enforcing code quality (e.g., in formal verification pipelines where `sorry` is disallowed).

---

### 5. **Imports & Dependencies**

- **`Mathlib.Init`**: Provides foundational Lean infrastructure (including `Meta`, `Elab`, etc.).
- **`Lean.Util.CollectAxioms`**: Core utility module defining `collectAxioms`.
- **`Lean.Elab.Command`**: Supplies elaboration infrastructure (`elab`, `throwError`, `CommandElabM`, etc.).

> **Scope**: This module is self-contained and does not depend on Mathlib beyond minimal core utilities. It is suitable for embedding in any Lean project (including Mathlib itself) to enforce `sorry`-free code.

--- 

Let me know if you'd like a formal specification (e.g., in Lean’s logic) or a test suite sketch.