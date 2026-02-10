### Technical Brief: Lean 4 Export Module (`Lean.Export`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Entry` | `inductive Entry` | Represents core entities in the export format: names, levels, expressions, and definitions. |
| `Alloc α` | `structure Alloc (α) [BEq α] [Hashable α]` | Manages allocation of unique integer IDs for values of type `α` (e.g., `Name`, `Level`, `Expr`). |
| `State` | `structure State` | Global state for the export process: tracks allocations for names, levels, expressions; set of exported definitions; and a stack for intermediate values. |
| `OfState α` | `class OfState (α : Type)` | Typeclass interface to access and modify allocation maps in `State`. |
| `alloc {α}` | `def alloc {α} [BEq α] [Hashable α] [OfState α] (a : α) : ExportM Nat` | Assigns a fresh integer ID to `a`, updating the allocation map. |
| `exportName` | `def exportName (n : Name) : ExportM Nat` | Recursively assigns IDs to `Name`s and prints their structure (e.g., `#NI`, `#NS`). |
| `exportLevel` | `def exportLevel (L : Level) : ExportM Nat` | Recursively assigns IDs to `Level`s and prints their structure (e.g., `#US`, `#UM`, `#UP`). |
| `exportExpr` | `partial def exportExpr (E : Expr) : ExportM Nat` | Recursively assigns IDs to `Expr`s and prints their structure (e.g., `#EC`, `#EA`, `#EL`). |
| `exportDef` | `partial def exportDef (n : Name) : ExportM Unit` | Exports a definition/axiom/inductive type and its dependencies (via `getConstInfo`, `getConstInfoInduct`, etc.). |
| `biStr` | `def biStr : BinderInfo → String` | Maps binder info to export format strings (`#BD`, `#BI`, `#BS`, `#BC`). |
| `runExportM` | `def runExportM {α} (m : ExportM α) : CoreM α` | Runs an `ExportM` computation in the `CoreM` monad. |

**No theorems** are proven in this file — it is a *procedural* export utility, not a verification library.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `export*`: Functions that emit serialized output and assign IDs (e.g., `exportName`, `exportLevel`, `exportExpr`, `exportDef`).
  - `biStr`: Short for *Binder Info String*.
  - `ind`, `indbody`, `defn`, `axdef`: Internal helpers for exporting inductive/definition/axiom forms.
- **Suffixes**:
  - `Info`: Used in `ConstantInfo` (e.g., `axiomInfo`, `defnInfo`, `inductInfo`) — part of Lean’s reflection API.
- **Tagged Output Format**:
  - All serialized entries begin with a `#`-prefixed tag:
    - `#EV`, `#ES`, `#EC`, `#EA`, `#EL`, `#EP`, `#EN`, `#ET`, `#EJ`: expression tags.
    - `#NS`, `#NI`: name tags (string/numeric).
    - `#US`, `#UM`, `#UIM`, `#UP`: level tags.
    - `#AX`, `#DEF`, `#THM`, `#CN`, `#IND`, `#MUT`, `#QUOT`: definition/inductive tags.

---

#### **3. Tactic Stack**

This file does **not use tactics** — it is a *purely functional* (monadic) module in `CoreM`.  
However, it uses the following **Lean 4 runtime utilities**:

| Utility | Role |
|---------|------|
| `do`-notation | For sequencing monadic actions (`StateT`, `CoreM`). |
| `match` + `←` | For destructuring and binding monadic results. |
| `modify`, `get`, `put` | State manipulation via `StateT`. |
| `IO.println` | Side-effecting output to stdout (the export stream). |
| `Std.HashMap.insert`, `.map[?` | Efficient map lookup/insertion for allocation tracking. |
| `Std.HashSet.insert`, `.contains` | Tracking already-exported definitions. |

No `simp`, `ring`, `aesop`, or `conv` tactics appear — this is low-level kernel serialization.

---

#### **4. Proof Logic / Execution Flow**

- **No proofs** — this is *not* a verification module.
- **Execution flow** (for `exportDef n`):
  1. Check if `n` is already exported (via `defs` set).
  2. Recursively export all constants used in `n`’s definition (`getUsedConstants`).
  3. Match on `ConstantInfo` (axiom/def/thm/opaque/quot/induct/ctor/rec).
  4. Dispatch to specialized exporters:
     - `axdef` / `defn` / `thm` / `opaque`: print type/value + level params.
     - `quotInfo`: hardcode `#QUOT` + core quot primitives.
     - `inductInfo` / `ctorInfo` / `recInfo`: print mutual inductive data via `ind`.
  5. `ind` handles:
     - Mutual inductives (`#MUT`) or single (`#IND`).
     - Prints number of parameters, inductives, constructors, and types.
     - Uses `indbody` to build constructor type strings.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Lean 4 core prelude (not strictly needed, but included for compatibility). |
| `Lean.CoreM` | Main monad for kernel operations (e.g., `getConstInfo`, `getConstInfoInduct`). |
| `Lean.Util.FoldConsts` | Provides `getUsedConstants` (used in `exportDef`). |
| `Std.HashMap`, `Std.HashSet` | Efficient hash-based collections for allocation tracking. |

**Scope**: This module is part of Lean 4’s *export infrastructure*, designed to serialize kernel-level entities (names, levels, expressions, definitions) into a flat, ID-referenced format for external tools (e.g., proof assistants, theorem provers, or formal verification pipelines).

---

### Summary

This file defines a **serialization engine** for Lean 4’s kernel-level ASTs. It uses a stateful monad (`ExportM`) to assign unique IDs to syntactic entities and emit a line-based, tag-based export format. It is foundational for tools that need to consume Lean proofs externally (e.g., for verification, translation, or analysis), but contains no mathematical content — only infrastructure.