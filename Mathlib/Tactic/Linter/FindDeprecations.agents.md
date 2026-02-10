### Technical Brief: `FindDeprecations.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `repos` | `NameSet` | Set of top-level module prefixes (`Mathlib`, `Archive`, `Counterexamples`) to restrict deprecation scanning. |
| `DeprecationInfo` | `structure` | Encapsulates metadata about a deprecated declaration: `module`, `decl`, `rgStart`, `rgStop`, `since`. |
| `getPosAfterImports` | `String → CommandElabM String.Pos.Raw` | Returns the position *after* all imports (and trailing whitespace/comments) in a Lean file. |
| `addAfterImports` | `String → String → CommandElabM String` | Inserts a string (e.g., imports/options) after the imports section of a file. |
| `getDeprecatedInfo` | `Name → Bool → CommandElabM (Option DeprecationInfo)` | Retrieves `DeprecationInfo` for a given declaration name if it has a `@[deprecated]` attribute with a `since` field. |
| `deprecatedHashMap` | `String → String → CommandElabM (Std.HashMap (Name × String) (Array (Name × Range)))` | Builds a map from `(module, filename)` to arrays of `(declName, range)` for deprecations in a given date range. |
| `removeRanges` | `String → Array Range → String` | Removes substrings corresponding to given ranges from a file string (assumes sorted ranges). |
| `removeDeprecations` | `String → Array Range → IO String` | Reads a file and removes given ranges (wraps `removeRanges`). |
| `parseLine` | `String → Option (List String.Pos.Raw)` | Parses output lines of the form `info: File.lean:12:0: [p₁, p₂, p₃]` into list of positions. |
| `rewriteOneFile` | `String → Array (Name × Range) → CommandElabM (String × String)` | Modifies a file (adds imports/options), runs `lake build`, parses command ranges, and removes deprecation *commands* (not just attributes). |
| `importLT` | `Environment → Name → Name → Bool` | Returns `true` if `f₂` imports `f₁`, via `findRedundantImports`. |
| `#clear_deprecations` | `elab` command | Main command: finds deprecated declarations in a date range, removes their *commands*, and optionally writes back to file if `really` is present. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `get*`: Functions that retrieve or compute data (`getDeprecatedInfo`, `getPosAfterImports`).
  - `remove*`: Functions that delete content (`removeRanges`, `removeDeprecations`).
  - `add*`: Functions that prepend/append content (`addAfterImports`).
  - `parse*`: Parsing functions (`parseLine`).
  - `rewrite*`: File transformation functions (`rewriteOneFile`).
- **Suffixes**:
  - `Info`: For data structures holding metadata (`DeprecationInfo`).
  - `?`: Boolean flags (`verbose?`, `really?`).
- **Constants**:
  - `repos`: Set of module roots to scan.
  - `option`: Hardcoded string for temporary file modification.

---

#### **3. Tactic Stack**

- **Core tactics & utilities**:
  - `do`-notation (monadic `CommandElabM`)
  - `match` / `if let some ...`
  - `for ... in ... do`
  - `return`, `logInfo`, `IO.FS.*`
- **Lean-specific**:
  - `getEnv`, `getSrcSearchPath`, `findDeclarationRanges?`, `findModuleOf?`
  - `parseImports`, `FileMap.ofString`, `toRawSubstring`
  - `Std.HashMap`, `Array`, `HashSet`, `qsort`, `binInsert`
- **No heavy tactic use**: This is a *meta-level* automation script, not a proof tactic.

---

#### **4. Proof Logic / Execution Flow**

The core logic is **data-driven and procedural**, not inductive or constructive:

1. **Input parsing**: Parse date range from command arguments.
2. **Filtering**:
   - Iterate over all constants in the environment.
   - For each, check if it has `@[deprecated]` with `since` in range.
   - Filter by `repos`.
3. **Range extraction**:
   - For qualifying declarations, compute their `Range` and map to `(module, filename)`.
4. **File rewriting**:
   - For each file:
     - Create temp file with `import Mathlib.Tactic.Linter.CommandRanges` + `set_option linter.commandRanges true`.
     - Run `lake build` to capture command ranges.
     - Parse output lines to extract command positions.
     - Match each deprecation range to the *smallest containing command range*.
     - Remove those command ranges from the original file.
5. **Output**:
   - Log collapsible diffs.
   - If `really`, overwrite original file.

**No induction or case analysis on structure** — it’s a pipeline of transformations over AST and file content.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean + Mathlib initialization. |
| `Lean.Elab.Import` | For `elab` command definition and import parsing. |
| `Lean` (via `open Lean`) | Syntax, Position, Range, FileMap, etc. |
| `Lean.Elab.Command` | For `CommandElabM`, `getEnv`, `logInfo`, etc. |
| Implicit: `Mathlib.Tactic.Linter.CommandRanges` | Added *dynamically* to temp files to extract command ranges. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[FindDeprecations.lean] --> B[Mathlib.Init]
  A --> C[Lean.Elab.Import]
  A --> D[Mathlib.Tactic.Linter.CommandRanges]  %% dynamically imported
  A --> E[Lean]
  A --> F[Lean.Elab.Command]
```

##### **Data Flow Overview**

```mermaid
flowchart LR
  Input[Date Range] -->|deprecatedHashMap| A[Filter Deprecations]
  A -->|Map (mod, file) → [(decl, range)]| B[rewriteOneFile per file]
  B -->|Add imports, build| C[Parse command ranges]
  C -->|Match & remove| D[File w/o deprecation commands]
  D -->|Write back?| E[Original file (if really)]
  D -->|Log| F[User]
```

##### **`rewriteOneFile` Subflow**

```mermaid
flowchart TD
  fname -->|addAfterImports| tempFile[fname_with_option.lean]
  tempFile -->|lake build| stdout[stdout]
  stdout -->|parseLine| cmdRanges[Command ranges]
  declRanges[decl ranges] -->|containment check| cmdRanges
  cmdRanges -->|remove| cleanFile[File w/o commands]
  return (tempFile, cleanFile)
```

---

#### **7. Notes on Design & Assumptions**

- **Assumes sorted ranges** in `removeRanges` and `removeDeprecations`.
- **Date format**: Strictly `"YYYY-MM-DD"` (lexicographic comparison).
- **Module path construction**: Manual string concatenation (`mod.components.foldl ...`) — fragile if Lean’s module path semantics change.
- **CI compatibility**: Avoids `findLean` due to `unknown module prefix` errors; uses manual `.lean` suffix construction.
- **Safety**: Temp files are created and cleaned up; original files only overwritten if `really` is present.
- **Idempotency**: Not guaranteed — repeated runs may remove already-removed commands (but `getDeprecatedInfo` filters by `since`, so safe if `since` is stable).

---

#### **8. Theory Context**

This file belongs to the **Mathlib Linter & Maintenance Infrastructure**, specifically the **deprecation lifecycle automation**. It complements:

- `Mathlib.Linter.CommandRanges`: Provides the `commandRanges` option to extract command positions.
- `remove_deprecations` script (external): Orchestrates `#clear_deprecations` across the repo.

It sits at the intersection of:
- **Metaprogramming** (elab commands, environment introspection),
- **File I/O & text processing** (Lean’s `String.Pos`, `FileMap`),
- **Tooling for repository hygiene** (automated cleanup of deprecated code).

It does *not* depend on core theorem proving — it’s a **development-time utility**.

--- 

✅ *End of Technical Brief*
