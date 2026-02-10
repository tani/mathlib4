### Technical Metadata Brief: `extend_docs` Command in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `extend_docs` | `command` syntax: `extend_docs <declName> before <prefix_string>? after <suffix_string>?` | Extends the documentation string of a declared constant/theorem by prepending (`before`) and/or appending (`after`) user-provided strings. Requires at least one of `before` or `after`. |

- **Core Logic**:  
  - Retrieves the current doc-string of `declName` via `findDocString?`.  
  - Prepends `bef ++ "\n\n"` and appends `"\n\n" ++ aft` (with empty strings if omitted).  
  - Updates the environment using `addDocString`.

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `extend_docs`: Main command name (plural, imperative).
  - `extend_doc` (singular): Used in comment header (likely shorthand or legacy).
  - `before`, `after`: Keyword arguments (lowercase, descriptive).
  - `na`, `bef`, `aft`: Internal variable names in elaborator (short, mnemonic).
  - `declName`: Standard for global constant identifiers in Lean.

- **Pattern**:  
  - Command names use imperative plural (`extend_docs`).  
  - Arguments use lowercase English keywords (`before`, `after`).  
  - Internal variables are abbreviated (`na` = name, `bef` = before, `aft` = after).

---

#### **3. Tactic / Elaborator Stack**

- **Elaborator Tactics & Utilities**:
  - `elab_rules : command`: Lean 4’s command elaboration mechanism.
  - `liftCoreM`: Lifts monadic operations to core elaboration context.
  - `Elab.realizeGlobalConstNoOverloadWithInfo`: Resolves identifier to global constant (no overload resolution).
  - `findDocString?`: Queries current doc-string from environment.
  - `addDocString`: Updates doc-string in environment.
  - `isNone`, `get!`, `getString`: Standard `Option`/`Syntax` utilities.
  - `throwError`: Error reporting.

- **No tactics used** — this is a *command elaborator*, not a tactic.

---

#### **4. Proof / Elaboration Logic Flow**

1. Parse syntax: `extend_docs <decl> [before <str>] [after <str>]`.
2. Validate: Ensure at least one of `before`/`after` is present.
3. Resolve `declName` from identifier `na`.
4. Construct `bef`/`aft` strings with `"\n\n"` separators (to ensure doc formatting).
5. Fetch existing doc-string (`oldDoc`), defaulting to `""`.
6. Concatenate: `newDoc = bef ++ oldDoc ++ aft`.
7. Update environment with `addDocString declName newDoc`.

> **Note**: No induction, case analysis, or proof automation — purely *environment manipulation*.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Base definitions (likely for compatibility or re-exports). |
| `Lean.Elab.ElabRules` | Provides `elab_rules` and syntax elaboration infrastructure. |
| `Lean.DocString` | Provides `findDocString?`, `addDocString`, and doc-string utilities. |

- **Module Scope**: `Mathlib.Tactic.ExtendDocs` (namespace).
- **Purpose**: A *development-time* tool for augmenting documentation in Mathlib, not for runtime proofs.

---

### Summary

The `extend_docs` command is a **documentation meta-programming utility** enabling incremental, non-invasive updates to Lean doc-strings. It reflects Lean 4’s extensible syntax and environment manipulation capabilities, with a clean, declarative interface. Its design prioritizes clarity, safety (via validation), and minimal interference with existing doc-strings.