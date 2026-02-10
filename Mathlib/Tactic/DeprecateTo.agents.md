### Technical Metadata Brief: `deprecate to` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mkDeprecationStx` | `ident × Name × Option String → CommandElabM command`<br>Generates a `@[deprecated (since := "...")] alias n := id` syntax tree. Uses `date -I` if no date provided. |
| `newNames` | `Environment × Environment → Array Name`<br>Computes declarations newly added to the environment (i.e., not present in `oldEnv`) and sorts them alphabetically. |
| `renameTheorem` | `command → declId × command`<br>Attempts to rename the top-level declaration (`theorem`/`lemma`) to a new name (`newName`). Returns `(old_id, new_cmd)` or `(default, cmd)` if not a theorem/lemma. |
| `elabCommand` (used internally) | Elaborates the input command (e.g., `theorem ...`) to register it in the environment. |
| `resolveGlobalName` | `Name → MetaM (List (Name × Declaration))`<br>Resolves a name to its declaration(s); used to extract the actual generated name(s) from the environment. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `mk*`: Construction functions (`mkDeprecationStx`)
  - `new*`, `old*`: Environment comparison (`newNames`, `oldEnv`, `oldId`)
  - `skip`, `fil`, `pairs`: Intermediate filtering/sorting logic
- **Identifier Style**:
  - `id`: Input identifier(s) from user (`id:ident*`)
  - `n`: Fully qualified `Name` of new declaration
  - `dat`: Optional date string (for reproducibility in tests)
  - `stxs`: List of syntax trees to suggest

---

#### **3. Tactic Stack**

| Tactic / Utility | Frequency / Role |
|------------------|------------------|
| `Unhygienic.run` | Used in `renameTheorem` to avoid hygiene issues when constructing new syntax. |
| `IO.Process.run` | Used in `mkDeprecationStx` to fetch current date. |
| `filterM`, `filter`, `qsort` | For filtering blacklisted names and sorting new declarations. |
| `resolveGlobalName` | To match user-given name with actual generated declaration(s). |
| `logError`, `logWarning`, `addSuggestion` | Core for user feedback and Try This integration. |
| `liftTermElabM` | Lifts term elaboration to command level for syntax generation. |
| `SuggestionText.prettyExtra` | Formats generated syntax for Try This display. |

---

#### **4. Proof Logic / Execution Flow**

1. **Capture environment state** before and after `elabCommand cmd`.
2. **Compute new declarations** (`newNames`) and filter out blacklisted ones.
3. **Validate pairing** between user-provided identifiers (`id`) and new declarations:
   - Warn if too few / too many identifiers.
   - Prefer matching the first user identifier to the main generated declaration (by suffix match).
4. **Rename the original command** to use the first identifier (`newName`).
5. **Generate deprecation aliases** for each `(old_id, new_name)` pair.
6. **Format output**:
   - Main command (renamed)
   - Deprecation aliases
   - Warnings / pairings summary
7. **Suggest via Try This** using `addSuggestion`.

> **Note**: The logic assumes that the first user identifier corresponds to the *primary* new declaration (e.g., the renamed theorem), and remaining identifiers map to auxiliary declarations (e.g., `@[export]`-generated names). Alphabetical sorting ensures deterministic pairing when only one new name is generated.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Lean.Meta.Tactic.TryThis` | Enables `addSuggestion` and Try This integration. |
| `Mathlib.Lean.Expr.Basic` | Provides low-level expression utilities (e.g., `mkIdent`, `mkNode`). |
| `Mathlib.Tactic.Lemma` | Likely for lemma-related syntax parsing (though not directly used here). |
| `Lean.Elab.Command` | For `elabCommand`, environment access (`getEnv`), and command elaboration. |
| `Lean.Parser.Command` | For parsing `command`, `declId`, `declSig`, etc. |

**Module Scope**: `Mathlib.Tactic.DeprecateTo`

**Namespace**: `Mathlib.Tactic.DeprecateTo`

---

### Summary

This is a **command-line macro** (not a tactic in the strict sense) that automates the migration of declarations by:
- Renaming a `theorem`/`lemma` to a new name,
- Generating `@[deprecated]` aliases for all newly created declarations (including auto-generated ones),
- Providing a *Try This* suggestion with the full migration script.

It is designed for **library maintenance**, especially for large-scale refactoring where backward compatibility must be preserved via deprecation aliases.

--- 

Let me know if you'd like a formal spec or a test suite sketch!