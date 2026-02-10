**Technical Metadata Brief: `type_check` Tactic (Lean 4)**

---

### **1. Key Definitions & Theorems**
- **`type_check`**  
  - **Type**: `Tactic` (elaborator command, `elab` syntax)  
  - **Purpose**: Elaborates and type-checks a given term `e`, synthesizes any missing metavariables, and logs (traces) the inferred type of `e` at the tactic’s token position `tk`.  
  - **Implementation**: Uses `Term.elabTermAndSynthesize`, `inferType`, and `Lean.logInfoAt` to emit the type to the info message channel.

---

### **2. Naming Conventions**
- **Prefixes/Suffixes**:
  - `tk:` — standard in Lean 4 elaborators for *token* (source position metadata).
  - `e:term` — standard syntax for a term argument in `elab` commands.
  - `type_check` — descriptive, imperative verb phrase, consistent with Lean tactic naming (e.g., `simp`, `rw`, `exact`).
- **No special suffixes** (e.g., `_def`, `_thm`, `_prop`) — this is a *tactic elaborator*, not a theorem or definition.

---

### **3. Tactic Stack / Tactics Used**
- **Core tactics/macros**:
  - `Tactic.withMainContext` — ensures elaboration occurs in the main goal context.
  - `Term.elabTermAndSynthesize` — elaborates term and synthesizes metavariables.
  - `check` — (internal) validates term well-formedness (used here for side-effect of type-checking).
  - `inferType` — computes the type of a term.
  - `Lean.logInfoAt` — logs a message at a given source position (`tk`).
  - `Lean.instantiateMVars` — fully instantiates metavariables before logging (ensures concrete type output).

> *Note*: No high-level tactics (`aesop`, `ring`, `simp`, etc.) are used — this is a low-level elaborator.

---

### **4. Proof Logic / Execution Flow**
1. **Context preservation**: Wraps elaboration in `withMainContext`.
2. **Term elaboration**: Elaborates input term `e` with metavariable synthesis.
3. **Well-formedness check**: Invokes `check` (implicit type-checking).
4. **Type inference**: Computes the type of the elaborated term.
5. **Message logging**: Instantiates remaining metavariables in the type and logs it at the original token location.

> *No induction, cases, or classical reasoning* — purely a *metaprogramming* utility for debugging/inspection.

---

### **5. Imports**
- **`Mathlib.Init`** — provides foundational Lean infrastructure (including `Lean.*` modules).
- **`Lean.Elab.Tactic.Basic`** — defines tactic elaboration infrastructure (`elab`, `Tactic.*`).
- **`Lean.Elab.SyntheticMVars`** — supports metavariable synthesis (used in `elabTermAndSynthesize`).

> **Scope**: This module is a *metaprogramming utility* for interactive theorem proving, likely intended for development/debugging of tactics or terms in Lean 4 (not part of core mathlib logic).

--- 

Let me know if you'd like a formal specification or a test suite sketch for `type_check`.