### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `printNameHashMap` | `Std.HashMap Name (Array Name) → IO Unit` | Helper to pretty-print a map from module names to lists of `Name`s, grouped by module. |
| `#long_names` | `elab` command (optional `num` argument) | Lists all declarations in Mathlib whose name length exceeds a threshold (default 50), grouped by module. |
| `#long_instances` | `elab` command (`num` argument optional, default 50) | Lists all *instances* (names starting with `"inst"`) in Mathlib whose name length exceeds threshold, grouped by module. |

> Note: Neither is a theorem in the logical sense — these are **Lean metaprogramming commands** for introspection.

#### 2. **Naming Conventions**
- **Prefixes / Suffixes**:
  - `printNameHashMap`: descriptive, functional style (`print_` + `NameHashMap`)
  - `#long_names`, `#long_instances`: user-facing command names, prefixed with `#` (standard for Lean commands), descriptive.
  - Internal predicate functions use `fun n => ...` style; no explicit naming pattern beyond that.
- **Component-based filtering**:
  - Uses `n.lastComponentAsString` to isolate the final segment of a `Name`.
  - Uses `n.toString.length` for full name length.
  - Uses `m.getRoot.toString = "Mathlib"` to filter to Mathlib module tree.

#### 3. **Tactic / Elaborator Stack**
- **Core Elaborator Tactic Stack**:
  - `Command.runTermElabM`: entry point for command elaboration.
  - `allNamesByModule`: from `Lean.Meta` (imported via `Mathlib.Lean.Expr.Basic` or `Lean.Elab.Command`) — returns `Std.HashMap Name (Array Name)`.
  - `filter`, `toList`, `for ... in ... do`: standard `Std.HashMap` / `Array` iteration.
  - `IO.println`, `IO.println ∘ toString`: I/O printing.
- **No proof tactics** (`simp`, `ring`, `aesop`, etc.) — purely metaprogramming / introspection.

#### 4. **Proof Logic / Execution Flow**
- **Command elaboration**:
  1. Parse optional numeric argument `N`.
  2. Compute default `N = 50` if absent.
  3. Call `allNamesByModule` with a predicate:
     - For `#long_names`: `n.toString.length > N`
     - For `#long_instances`: `n.lastComponentAsString.startsWith "inst" ∧ n.lastComponentAsString.length > N`
  4. Filter results to only modules whose root is `"Mathlib"`.
  5. Print using `printNameHashMap`.

- **No induction, case analysis, or logical reasoning** — purely data collection and formatting.

#### 5. **Imports**
| Module | Role |
|--------|------|
| `Mathlib.Lean.Name` | Provides utilities for working with `Name`, including `lastComponentAsString`, `getRoot`, etc. |
| `Mathlib.Lean.Expr.Basic` | Likely re-exports `Lean.Meta` and `allNamesByModule` (or re-exports from `Lean.Elab.Command`). |
| `Lean.Elab.Command` | Provides `elab`, `Command.runTermElabM`, and command infrastructure. |

> **Scope**: This is a **Lean 4 metaprogramming utility** for codebase hygiene — specifically for detecting overly long declaration/instance names in the Mathlib codebase.

--- 

Let me know if you'd like a formalized specification (e.g., in Lean) or a refactoring suggestion.