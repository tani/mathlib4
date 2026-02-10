### Technical Metadata Brief: `Mathlib.AssertNotExist` Module (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `#check_assertions` | **Command** — Reports status (`✓`/`×`) of all previously asserted declarations/modules (via `assert_exists`/`assert_not_imported`) currently in scope. Logs info if all exist; warns otherwise. Variant `#check_assertions!` only reports missing items. |
| `assert_exists n` | **Command** — Asserts that declaration `n` *exists* in the current environment. Fails with error if `n` is ambiguous or absent. |
| `assert_not_exists n` | **Command** — Asserts that declaration `n` *does not exist* in the current import scope. If `n` *does* exist, throws a detailed error explaining the forbidden import chain. Used to enforce modularity. |
| `assert_not_imported m₁ … mₙ` | **Command** — Asserts that none of the modules `m₁ … mₙ` are (transitively) imported into the current file. Logs warnings if any are found. |
| `Mathlib.AssertNotExist.addDeclEntry` | **Internal function** — Records an assertion (existence or non-existence) into the environment’s `AssertExists` metadata. Signature: `Bool × Name × Name → MetaM Unit`. |
| `env.getSortedAssertExists` | **Accessor** — Retrieves all recorded assertions (from current + imported files), sorted for deterministic output. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `assert_` — Commands asserting existence/non-existence (`assert_exists`, `assert_not_exists`, `assert_not_imported`).
  - `is_` — Not used here, but `isDecl` field in `AssertExistsEntry` indicates whether entry is a declaration (`true`) or module (`false`).
- **Suffixes**:
  - `_exists` — Positive existence assertions.
  - `_not_exists` / `_not_imported` — Negative assertions.
- **Internal**:
  - `addDeclEntry` — Encodes both declaration and module entries uniformly.
  - `givenName`, `modName`, `isDecl` — Fields in the `AssertExistsEntry` structure (inferred from usage).

---

#### **3. Tactic & Proof Automation Stack**

- **No proof tactics used** — This is a *command* module (elaborator-level), not a proof script.
- **Core elaborator tactics**:
  - `liftCoreM` — For safe monadic lifting of core operations.
  - `try … catch _ =>` — Error handling in `assert_not_exists`.
  - `pure`, `do`, `←`, `let mut` — Standard Lean 4 elaborator syntax.
- **No `simp`, `ring`, `aesop`, etc.** — Purely syntactic/ambient environment checks.

---

#### **4. Proof Logic / Command Semantics**

- **Assertion recording**:
  - `assert_exists n`: Attempts to resolve `n`; if successful, no entry is added (existence is implicit). *But* if `n` is ambiguous/missing, it errors — effectively *asserting* existence by requiring it.
  - `assert_not_exists n`: If `n` resolves successfully, it *throws an error* with a trace of the import chain violating the invariant. If resolution fails, it *records* a negative assertion (`addDeclEntry true n mod`).
  - `assert_not_imported m₁ …`: Checks transitive imports; records negative assertions for modules *not* found (via `addDeclEntry false …`), warns if found.

- **Verification logic (`#check_assertions`)**:
  - Collects all recorded assertions (`getSortedAssertExists`).
  - For each entry:
    - If `isDecl = true`: check `env.contains givenName`.
    - If `isDecl = false`: check `allImportedModuleNames.contains givenName`.
  - Aggregates results; logs info/warning based on `tk` (bang flag) and `allExist?`.

- **Invariant enforcement**:
  - `assert_not_exists` and `assert_not_imported` enforce *modularity constraints* (e.g., preventing “simple” files from depending on “complicated” ones).
  - Errors guide refactoring (e.g., “create new files, don’t add imports”).

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization. |
| `Lean.Elab.Command` | Elaborator infrastructure for custom commands. |
| `Mathlib.Util.AssertExistsExt` | Extends `AssertExists` metadata with module-level entries (likely defines `AssertExistsEntry`, `addDeclEntry`, and environment hooks). |

> **Note**: The module is self-contained beyond `AssertExistsExt`, which provides the underlying storage mechanism for assertions.

---

### Summary

This module implements **declarative dependency enforcement** for Mathlib:  
- **Positive assertions** (`assert_exists`) ensure required declarations exist.  
- **Negative assertions** (`assert_not_exists`, `assert_not_imported`) prevent unwanted dependencies.  
- **Verification** (`#check_assertions`) audits compliance across the entire build.  
It is a *static analysis tool* for architectural integrity, not a proof assistant in the traditional sense.