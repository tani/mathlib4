### Technical Metadata Brief: `Mathlib.Tactic.Check`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `elabCheckTactic` | `Syntax → Bool → Term → TacticM Unit` | Core elaboration function: elaborates a term `term` in the main context (without modifying tactic state), infers its type, and logs an info message `e : type`. Handles identifiers specially to show signatures. |
| `#check` tactic | Elaboration rule: `elab tk:"#check " colGt term:term : tactic => elabCheckTactic tk true term` | Public-facing tactic syntax for `#check t`. Invokes `elabCheckTactic` with `ignoreStuckTC := true`, allowing stuck typeclass metavariables to appear in output. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `elabCheckTactic`: follows `elab*` convention for elaborator functions (e.g., `elabTerm`, `elabCheck`).
- **Suffixes**:
  - `Tactic`: suffix for tactic-level variants of command-level functions (`elabCheck` → `elabCheckTactic`).
- **Pattern**:
  - `ignoreStuckTC`: boolean flag naming reflects its purpose (ignore stuck typeclass resolution).
  - `tk`: standard Lean 4 convention for *token* (source location for error/info messages).

---

#### **3. Tactic Stack / Key Tactics Used**

- `withoutModifyingStateWithInfoAndMessages`: preserves tactic state while allowing info messages.
- `withMainContext`: ensures elaboration happens in the main (not tactic) context.
- `Term.elabTerm`: term elaboration.
- `Term.synthesizeSyntheticMVarsNoPostponing`: forces resolution of synthetic metavariables (but not stuck TC).
- `Term.levelMVarToParam`: converts level metavariables to parameters (for cleaner output).
- `instantiateMVars`: resolves remaining metavariables where possible.
- `inferType`: computes type of elaborated term.
- `logInfoAt`: emits user-facing info message at given source location (`tk`).
- `realizeGlobalConstWithInfos`, `addCompletionInfo`, `MessageData.signature`: for identifier-specific pretty-printing of global constants.

*Note*: No high-level tactics (`simp`, `rw`, `induction`, etc.) are used—this is a low-level elaborator.

---

#### **4. Proof Logic / Elaboration Flow**

1. **Pattern match on term**:
   - If term is an identifier (`$(x : ident)`), attempt to:
     - Realize as global constant(s) via `realizeGlobalConstWithInfos`.
     - For each constant, emit signature via `logInfoAt`.
   - Fall back to general term elaboration if identifier fails or is not a constant.

2. **General term path**:
   - Elaborate term with `Term.elabTerm`.
   - Force-synthesize synthetic metavariables (`synthesizeSyntheticMVarsNoPostponing`).
   - Instantiate remaining metavariables (`instantiateMVars`), then convert level metavariables to parameters (`levelMVarToParam`).
   - Infer type via `inferType`.
   - Skip output if term is `sorry` (`isSyntheticSorry`).
   - Log `e : type` message.

3. **Error handling**:
   - Identifier path wrapped in `try ... catch _ => pure ()` to avoid crashing on non-constants.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Base definitions (likely for compatibility with older Lean versions or Mathlib conventions). |
| `Lean.Elab.Tactic.Basic` | Provides `TacticM`, `elab` syntax, and tactic elaboration infrastructure. |
| `Lean.PrettyPrinter` | Used for pretty-printing (e.g., `MessageData.signature`). |
| `Lean.Elab.SyntheticMVars` | Provides `synthesizeSyntheticMVarsNoPostponing`. |

**Module scope**: `Mathlib.Tactic` namespace.  
**Target use case**: Interactive tactic-mode proofs where users want to inspect term types *without* committing them (e.g., `have := t` would add a hypothesis; `#check t` does not).

--- 

Let me know if you'd like a formalized specification or a comparison with `have := t`.