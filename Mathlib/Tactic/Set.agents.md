### Technical Metadata Brief: `set` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `setTactic` | Syntax rule: `"set" "!"? setArgsRest : tactic` | Defines the syntax for the `set` and `set!` tactics. |
| `setArgsRest` | Syntax: `ppSpace ident (" : " term)? " := " term (" with " "← "? ident)?` | Parses arguments for `set`/`set!`, including optional type annotation, value, and hypothesis name (with optional reversal `←`). |
| `set!` | Macro: `macro "set!" rest:setArgsRest : tactic => `(tactic| set ! $rest)` | Syntactic sugar for `set ! ...`, disabling replacement of terms. |
| `elab_rules : tactic` | Elaborator for `set` tactic | Implements semantics: introduces a new local constant `a`, adds equality hypothesis `h : a = t` or `h : t = a`, and optionally rewrites `t` to `a` in the goal and hypotheses. |

No named theorems are introduced — this is a *tactic*, not a proof term.

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `setTactic`: Disambiguates from `Mathlib.Tactic.MonadStateOf.set`.
  - `set!`: Exclamation mark indicates variant behavior (no rewriting).
  - `h`, `h2`, etc.: Standard hypothesis names used in examples.
  - `← h`: Reverse equality hypothesis naming convention (`h : t = a` instead of `a = t`).
- **Internal identifiers**:
  - `a`: bound variable name (user-given or auto-generated).
  - `ty`, `vale`: internal variables for type and value elaboration.
  - `fvar`: fresh `FVarId` for the introduced local constant.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities in the elaborator:

| Tactic / Utility | Role |
|------------------|------|
| `Term.elabType`, `elabTermEnsuringType`, `inferType` | Type-checking and elaboration of terms. |
| `liftMetaTacticAux`, `goal.define`, `.intro1P` | Meta-level tactic execution to define a new local constant. |
| `Term.addTermInfo'` | Attaches term info for IDE support (e.g., hover, goto). |
| `evalTactic` | Executes generated tactic syntax. |
| `rewrite [...] at *` | Rewrites using `rfl`-proven equalities (only when `!` is *not* present). |
| `have%$tk` | Introduces a new hypothesis with given name and equality. |
| `rfl` | Proof term used for reflexivity of equality. |
| `try` | Softens failure of rewrite (non-fatal if no occurrences). |

---

#### **4. Proof Logic / Execution Flow**

1. **Parse input**:
   - Extract identifier `a`, optional type `ty`, value `t`, and optional hypothesis name `h` (with optional `←`).
2. **Elaborate term and type**:
   - If `ty` is given, elaborate `val` to that type.
   - Else, infer type of `val` and elaborate `val`.
3. **Introduce local constant**:
   - Use `goal.define` to create a new local constant `a : ty` with value `t`.
   - Intro one binder to get `fvar` (the `a` in context).
4. **Register term info**:
   - Attach `a` to the `fvar` for IDE support.
5. **Rewrite (unless `!`)**:
   - Rewrite all occurrences of `t` to `a` using `rfl`-equality.
6. **Add equality hypothesis**:
   - If `h` is given:
     - With `← h`: add `h : t = a` via `have h : t = a := rfl`.
     - Without `← h`: add `h : a = t` via `have h : a = t := rfl`.
   - Else: do nothing.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean infrastructure (e.g., `Meta`, `Term`, `Elab`). |
| `Lean.Elab.Tactic.ElabTerm` | Term elaboration utilities used in tactic implementation (`elabTerm`, `inferType`, etc.). |

> **Note**: No external dependencies beyond Lean’s elaborator infrastructure — this is a *core tactic* in Mathlib.

---

### Summary

The `set` tactic is a *local definition + equality introduction* tool, extending `let` with automatic rewriting and explicit equality hypotheses. It is implemented via a custom elaborator that leverages Lean’s meta-programming API to manipulate the local context and rewrite goals. Its design reflects Lean’s emphasis on *explicit equality reasoning* and *tactic extensibility*.