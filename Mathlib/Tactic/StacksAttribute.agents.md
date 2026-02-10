### Technical Metadata Brief: `Mathlib.StacksTag` Module (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Database` | `inductive` — Represents the source database (`kerodon` or `stacks`). |
| `Tag` | `structure` — Encapsulates a declaration name, database, tag string, and optional comment. |
| `tagExt` | `SimplePersistentEnvExtension Tag (Std.HashSet Tag)` — Environment extension storing a set of `Tag`s globally. |
| `addTagEntry` | `m Unit` — Adds a `Tag` to the environment extension. |
| `stacksTagFn` | `ParserFn` — Parses a 4-character Stacks/Kerodon tag (digits + uppercase letters). |
| `stacksTagKind` | `SyntaxNodeKind` — Node kind for parsed tag syntax. |
| `stacksTagDB` | `syntax_cat` — Syntax category for database identifiers (`stacks` / `kerodon`). |
| `stacksTag` attribute | `attr` — User-facing attribute syntax: `@[stacks TAG "comment"]` or `@[kerodon TAG "comment"]`. |
| `Lean.registerBuiltinAttribute` (for `stacksTag`) | Registers the attribute with parsing, docstring injection, and environment extension update. |
| `getSortedStackProjectTags` | `Array Tag` — Returns all `Tag`s sorted lexicographically by `tag`. |
| `getSortedStackProjectDeclNames` | `Array Name` — Returns all declaration names associated with a given tag. |
| `traceStacksTags` | `CommandElabM Unit` — Prints all tags (and optionally theorem types) for a given database. |
| `#stacks_tags`, `#kerodon_tags` | `command` — Tactic-like commands to list tagged declarations. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes:**
  - `stacksTag*` — Core syntax, parser, and attribute naming.
  - `getSortedStackProject*` — Query functions for environment data.
  - `traceStacksTags` — Debug / introspection command.
  - `addTagEntry` — Mutation function for environment extension.
  - `databaseURL` — Helper for URL construction.
- **Suffixes:**
  - `Fn`, `Parser`, `NoAntiquot` — Standard Lean parser naming.
  - `Kind` — For syntax node kinds.
  - `DB` — For syntax categories representing database identifiers.

---

#### **3. Tactic Stack**

- **Tactics used in attribute registration & parsing:**
  - `do`, `←`, `match`, `throwError`, `getD`, `map`, `filter`, `push`, `joinSep`
  - `logInfo`, `modifyEnv`, `addDocString`, `addTagEntry`
- **Key Lean/Elab utilities:**
  - `Syntax.isLit?`, `getStacksTag`, `takeWhileFn`, `isAlphanum`, `isDigit`, `isUpper`
  - `mkNodeToken`, `ParserState.mkError`, `withAntiquot`, `mkAtomicInfo`
- **No heavy automation tactics** (e.g., `aesop`, `ring`, `simp`) — this is a *meta-level* module for metadata management.

---

#### **4. Proof Logic / Implementation Flow**

- **Attribute parsing & registration:**
  1. Parse `stacks` or `kerodon` keyword + tag + optional comment.
  2. Validate tag format (4 chars, alphanumeric uppercase/digits).
  3. Construct URL and docstring snippet.
  4. Update declaration’s docstring and environment extension.
- **Query logic (`traceStacksTags`, `#stacks_tags`):**
  1. Retrieve all `Tag`s from `tagExt`.
  2. Filter by database (`stacks` or `kerodon`).
  3. Sort by tag string.
  4. Pretty-print with optional theorem type if `verbose`.
- **No inductive proofs or theorem proving logic** — purely *environment introspection and manipulation*.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Lean.Elab.Command` | For command elaboration (`elab`, `command`, `logInfo`, etc.). |
| `Mathlib.Init` | Provides foundational utilities (e.g., `Std.HashSet`, `Substring`, `Name`, `CoreM`, etc.). |

- **No external mathlib dependencies** — this is a *self-contained* infrastructure module.
- **No `Mathlib.*` imports beyond `Init`**, indicating it’s a low-level utility.

---

### Summary

This module provides a **metadata tagging system** for Lean developments, enabling linking of declarations to external mathematical databases (Stacks Project, Kerodon). It defines:
- A syntax for tagging declarations (`@[stacks]`, `@[kerodon]`),
- A persistent environment extension to store tag–declaration mappings,
- Commands to inspect and display tagged results.

It is **meta-level infrastructure**, not used in formalized mathematics directly, but critical for documentation, cross-referencing, and tooling in large-scale projects like `mathlib`.