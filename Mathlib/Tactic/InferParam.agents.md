**Technical Metadata Brief: `Mathlib.Tactic.inferOptParam`**

---

### 1. **Key Definitions & Theorems**

- **`inferOptParam`**  
  - **Type**: `tactic` (Lean 4 elaborator tactic)  
  - **Purpose**: Closes a goal of the form `optParam α a` or `autoParam α stx` by substituting the default value `a` (for `optParam`) or executing the embedded tactic syntax (for `autoParam`).  
  - **Mechanism**: Uses `getOptParamDefault?` and `getAutoParamTactic?` to introspect the target type; if successful, assigns the default value or evaluates the stored tactic.

---

### 2. **Naming Conventions**

- **Prefix**: `infer_` — indicates *inference* of a missing/optional argument.  
- **Suffix**: `Param` — reflects that the tactic operates on `optParam`/`autoParam` *parameters*.  
- **Elaborator name**: `(name := inferOptParam)` — follows Lean’s convention of using camelCase for tactic names in `elab` declarations.

---

### 3. **Tactic Stack**

- **Core tactics used**:
  - `getMainTarget` — retrieves current goal.
  - `getOptParamDefault?`, `getAutoParamTactic?` — introspect `optParam`/`autoParam` structure.
  - `liftMetaTactic`, `liftMetaTactic1` — embeds meta-level tactics into the tactic monad.
  - `assign`, `replaceTargetDefEq`, `consumeTypeAnnotations` — low-level metavariable/tactic manipulation.
  - `evalTactic`, `evalSyntaxConstant` — executes tactic syntax retrieved from `autoParam`.
  - `throwError` — error reporting.

- **No high-level tactics** (e.g., `simp`, `rw`, `induction`) are used — this is a *low-level* inference tactic.

---

### 4. **Proof Logic / Execution Flow**

1. **Extract target** → `getMainTarget`.
2. **Check for `optParam`**:
   - If `tgt.getOptParamDefault?` yields `some val`, assign `val` to the goal (`goal.assign val`).
3. **Else, check for `autoParam`**:
   - If `tgt.getAutoParamTactic?` yields `some (.const tacticDecl ..)`:
     - Evaluate `tacticDecl` to tactic syntax via `evalSyntaxConstant`.
     - On success, replace target with its type (stripping annotations), then `evalTactic` the stored tactic.
4. **Fallback**: Throw error if neither pattern matches.

→ *Deterministic, pattern-matching-driven control flow*; no backtracking or case analysis beyond structural inspection.

---

### 5. **Imports**

- **`Mathlib.Init`** — foundational definitions (likely for `optParam`, `autoParam`).
- **`Lean.Elab.Tactic.Basic`** — elaborator infrastructure (`elab`, `tactic` monad).
- **`Lean.Meta.Tactic.Replace`** — for `replaceTargetDefEq` and related metavariable operations.

→ Minimal, focused imports; no heavy dependencies (e.g., no `Mathlib.Data.*` or `Mathlib.Algebra.*`).

---

### Summary

This is a **specialized, low-level tactic** for *automatically resolving optional/auto parameters* in Lean 4 goals. It plays a supporting role in typeclass inference or default-value resolution, and is not intended for general-purpose proving. Its design reflects Lean 4’s metaprogramming style: explicit pattern matching on term structure, minimal abstraction, and tight integration with the metavariable engine.