**Technical Metadata Brief: Lean 4 Compatibility Shim for `generalize`**

---

### **1. Key Definitions & Theorems**

- **`generalize'`**  
  - **Type**: Custom tactic syntax (`elab "generalize'" h:ident " : " t:term:51 " = " x:ident : tactic => ...`)  
  - **Purpose**: A backwards-compatible variant of the `generalize` tactic that uses the *default* transparency setting (instead of `instances`, as in the updated `generalize` from PR #3575). It generalizes hypotheses over expressions while preserving older behavior for legacy code.

---

### **2. Naming Conventions**

- **Suffix `'` (prime)**: Used to denote a modified or legacy variant (`generalize'` vs `generalize`).  
- **`h`, `t`, `x`**: Standard identifiers for hypothesis name (`h`), term to generalize over (`t`), and new variable name (`x`).  
- **`hIdents`, `xIdents`, `args`**: Internal naming reflects argument structure: hypothesis identifiers, expression variable identifiers, and `GeneralizeArg` records.

---

### **3. Tactic Stack**

- **`withMainContext`**: Ensures tactic runs in the main context.
- **`elabTerm`**: Elaborates the term `t`.
- **`getMainGoal` / `mvarId.withContext`**: Manages metavariable context.
- **`generalizeHyp`**: Core meta-level tactic; called with explicit `(transparency := default)`.
- **`Term.addLocalVarInfo`**: Registers new local variables in the local context.
- **`replaceMainGoal`**: Updates the main goal after generalization.

*No heavy use of automation tactics (e.g., `aesop`, `ring`, `simp`); this is a low-level tactic wrapper.*

---

### **4. Proof Logic / Execution Flow**

1. Parse input: hypothesis name `h`, term `t`, and new variable `x`.
2. Elaborate `t` to an expression.
3. Construct a `GeneralizeArg` record with:
   - `hName? := h.getId`
   - `expr := elaborated term`
   - `xName? := x.getId`
4. Retrieve current metavariable goal.
5. In the goal’s context:
   - Apply `generalizeHyp` with `transparency := default`.
   - For each newly introduced variable, register its info with `Term.addLocalVarInfo`.
6. Replace the main goal with the updated one.

*No induction or case analysis — purely a syntactic wrapper around `generalizeHyp` with adjusted transparency.*

---

### **5. Imports**

- **`Mathlib.Init`**: Core Lean 4 initialization (likely for basic infrastructure).
- **`Lean.Elab.Binders`**: For elaborating binders and identifiers.
- **`Lean.Elab.Tactic.ElabTerm`**: Term elaboration utilities for tactics.
- **`Lean.Meta.Tactic.Generalize`**: Provides the underlying `generalizeHyp` meta function.

*No high-level mathlib imports — this is a low-level tactic shim.*

---

### **Summary**

This file is a **minimal, non-mathematical compatibility layer** for the `generalize` tactic, preserving legacy transparency behavior. It uses standard Lean 4 elaboration and meta-programming patterns, with no reliance on advanced tactic combinators or mathematical content. Intended for temporary use until all users migrate to the updated `generalize`.