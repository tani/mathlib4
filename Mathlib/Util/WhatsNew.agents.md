### Technical Metadata Brief: `Mathlib.WhatsNew`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `throwUnknownId` | `Name → CommandElabM Unit` | Throws an error for unknown identifiers. |
| `levelParamsToMessageData` | `List Name → MessageData` | Converts a list of level parameters to a formatted string (e.g., `.{u, v}`). |
| `mkHeader` | `String → Name → List Name → Expr → DefinitionSafety → CoreM MessageData` | Constructs a formatted header string for declarations (e.g., `def`, `theorem`, `axiom`), incorporating safety, protection, and privacy info. |
| `mkHeader'` | `String → Name → List Name → Expr → Bool → CoreM MessageData` | Convenience wrapper for `mkHeader`, treating `Bool` as `DefinitionSafety`. |
| `printDefLike` | `String → Name → List Name → Expr → Expr → DefinitionSafety → CoreM MessageData` | Formats definitions/declarations with a value (e.g., `def x := ...`). |
| `printInduct` | `Name → List Name → Nat → Nat → Expr → List Name → Bool → CoreM MessageData` | Formats inductive types with their constructors. |
| `printIdCore` | `Name → ConstantInfo → CoreM MessageData` | Pattern-matching dispatcher over `ConstantInfo` variants to produce formatted output for any declaration. |
| `diffExtension` | `Environment → Environment → PersistentEnvExtension … → CoreM (Option MessageData)` | Computes and formats the difference in entries added to a persistent environment extension. |
| `whatsNew` | `Environment → Environment → CoreM MessageData` | Compares two environments and returns a formatted message listing all newly added constants and extension entries. |
| `whatsnew ... in ...` | Elaborator (`elab`) command | Command syntax wrapper: executes a command, then prints newly added declarations. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mk*`: Construction functions (`mkHeader`, `mkHeader'`)
  - `print*`: Formatting functions for output (`printDefLike`, `printInduct`, `printIdCore`)
  - `diff*`: Difference computation (`diffExtension`)
  - `throw*`: Error reporting (`throwUnknownId`)
- **Suffixes**:
  - `'` (prime): Variant of a function with simplified arguments (`mkHeader'` vs `mkHeader`)
  - `?`: Optional-returning or partial functions (`privateToUserName?`, though not defined here, is used)
- **Style**:
  - Descriptive, domain-specific naming (`levelParamsToMessageData`, `ConstantInfo.axiomInfo`, etc.)
  - Use of `CoreM`, `CommandElabM`, `MessageData` reflects Lean 4’s monadic architecture.

---

#### **3. Tactic Stack**

- **No tactics used** in this file — it is entirely in the *elaborator* and *core* monads (`CoreM`, `CommandElabM`).
- **Core operations**:
  - `do`-notation for monadic composition
  - Pattern matching on `ConstantInfo`
  - `←` for monadic binding
  - `pure`, `return`, `throwError`, `logInfo`
  - `ptrAddrUnsafe` for fast pointer equality check (performance optimization)
  - `getConstInfo`, `getEnv`, `persistentEnvExtensionsRef.get`, `exportEntriesFn`, etc.

---

#### **4. Proof Logic / Execution Flow**

- **Not proof logic**, but *command execution logic*:
  1. Capture the environment before command execution (`oldEnv ← getEnv`)
  2. Execute the user-provided command (`elabCommand cmd`)
  3. Capture the environment after execution (`newEnv ← getEnv`)
  4. Compare environments:
     - Iterate over new constants; if not in old env, format with `printIdCore`
     - Iterate over persistent extensions; compute diff via `diffExtension`
  5. Join all diffs with `"\n\n"` separator; if none, return `"no new constants"`
  6. Log the result via `logInfo`

- **No induction or case analysis on proofs** — purely *environment introspection*.

---

#### **5. Imports**

- `import Mathlib.Init`  
  → Indicates this is part of the **Mathlib** ecosystem, built on Lean 4’s core + Mathlib’s initialization layer.

- **Key dependencies (via imports & usage)**:
  - `Lean`: Core elaborator infrastructure (`Lean`, `Elab`, `Command`, `Core`)
  - `Lean.Environment`: For `Environment`, `ConstantInfo`, `PersistentEnvExtension`
  - `Lean.Message`: For `MessageData`, `toMessageData`, `m!"..."` (string interpolation)
  - `Lean.Elab.Command`: For `elabCommand`, `CommandElabM`
  - `Lean.Elab.Term`: Indirectly via `Expr`, `getConstInfo`, etc.

---

### Summary

This module provides a **diagnostic tool** for Lean 4 developers: `whatsnew in` lets users see *exactly what declarations* a command introduces into the environment. It leverages Lean’s introspection capabilities (`Environment`, `ConstantInfo`, `PersistentEnvExtension`) and is written in the low-level elaborator monad, with no reliance on tactics. Its design reflects Lean 4’s emphasis on extensibility and metaprogramming.

Let me know if you'd like a formal spec or a test suite sketch.