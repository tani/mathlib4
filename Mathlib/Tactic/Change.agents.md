**Technical Metadata Brief: `change?` Tactic (Lean 4)**

---

### **1. Key Definitions & Theorems**

- **`change?` tactic**  
  - **Type**: `tactic` (Lean syntax rule)  
  - **Purpose**: Suggests a `change` tactic invocation with a term definitionally equal to the current goal. If no term is provided, it suggests `change <current goal>`. Used for post-hoc cleanup (e.g., after `dsimp`) or for interactive goal refinement.

- **Core operations involved**:
  - `getMainTarget`: retrieves the current goal type.
  - `elabTermEnsuringType`: elaborates user-provided term and checks it has the goal’s type.
  - `isDefEq`: checks definitional equality between the user term and the goal.
  - `instantiateMVars`: fills in metavariables in the term.
  - `delabToRefinableSyntax`: converts an `Expr` back to a syntax tree suitable for `change`.
  - `addSuggestion`: registers the suggestion for the “Try this” UI.

---

### **2. Naming Conventions**

- **Prefix**: `change?` — follows Lean’s convention of using `?` suffix for *interactive suggestion* tactics (e.g., `try?`, `aesop?`).
- **Syntax name**: `(name := change?)` — explicit naming for internal registration.
- **Tactic keyword**: `change?` — matches the syntax name.

---

### **3. Tactic Stack / Tactics Used**

- **Core tactics & utilities**:
  - `getMainTarget`
  - `elabTermEnsuringType`
  - `isDefEq`
  - `instantiateMVars`
  - `delabToRefinableSyntax`
  - `addSuggestion`
  - `withMainContext`, `withRef` — for context/ref handling.
  - `throwErrorAt` — for user-facing error reporting.

- **No high-level tactics** (e.g., `simp`, `ring`) are used — this is a low-level *meta-level* tactic.

---

### **4. Proof Logic / Execution Flow**

1. Parse input: optional term `sop`.
2. If no term: use current goal as `expr`.
3. If term provided:
   - Elaborate `sop` to `ex`, ensuring it has the goal’s type.
   - Check `ex` is definitionally equal to the goal (`isDefEq`).
   - If not defeq → throw error.
   - Instantiate metavariables in `ex`.
4. Convert resulting `expr` to syntax (`dstx`) using `delabToRefinableSyntax`.
5. Register suggestion: `"change <dstx>"` via `addSuggestion`.

→ *No inductive reasoning or case analysis* — purely a *meta-level transformation* of the goal.

---

### **5. Imports**

- `Mathlib.Init`: foundational definitions (likely for basic types, `Expr`, etc.).
- `Lean.Elab.Tactic.ElabTerm`: for term elaboration (`elabTermEnsuringType`, etc.).
- `Lean.Meta.Tactic.TryThis`: for `addSuggestion`, `Try this` UI integration.

→ **Scope**: This is a *Lean 4 metaprogramming* utility, not a mathlib-specific tactic — it lives in the core tactic infrastructure layer.

--- 

Let me know if you'd like a formalized specification (e.g., in Lean) or a comparison with similar tactics like `change`, `refine`, or `exact`.