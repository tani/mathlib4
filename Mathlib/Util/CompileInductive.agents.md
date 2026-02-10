### Technical Metadata Brief: `Mathlib.Util.CompileInductive`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `replaceConst` | `AssocList Name Name → Expr → Expr`<br>Replaces constants in an expression using a name substitution map. |
| `mkRecNames` | `List Name → Nat → List Name`<br>Generates recursor names for (mutual/nested) inductives using `RecursorVal.all` and `numMotives`. |
| `addAndCompile'` | `Declaration → CoreM Unit`<br>Safely adds and compiles a declaration, with error handling. |
| `compileDefn` | `DefinitionVal → MetaM Unit`<br>Compiles a definition by creating a duplicate (`_cstage2`) and registering a `csimp` lemma equating them. |
| `isCompiled` | `Environment → Name → Bool`<br>Checks if a declaration has already been compiled (via `_cstage2` or `csimp` lemma). |
| `compileStructOnly` | `InductiveVal → RecursorVal → MetaM Unit`<br>Special-case compilation for single-constructor, non-recursive inductives (e.g., structs). |
| `compileInductiveOnly` | `InductiveVal → Bool → MetaM Unit`<br>Core logic for compiling inductive recursors (excluding `sizeOf`). Handles mutual/nested cases. |
| `compileInductive` | `InductiveVal → Bool → MetaM Unit`<br>Top-level entry: compiles recursor + `sizeOf` functions. |
| `compileSizeOf` | `InductiveVal → MetaM Unit`<br>Recursively compiles `sizeOf` auxiliary functions and dependencies. |
| `compile_def%` | Syntax Elab Command<br>Lean command to compile a specific definition (e.g., `List._sizeOf_1`). |
| `compile_inductive%` | Syntax Elab Command<br>Lean command to compile the recursor for an inductive type (e.g., `List.rec`). |

**Theorems (via `addDecl`)**  
- `dv = dv✝` (for `compileDefn`)  
- `rv = rv✝` (for `compileInductiveOnly`/`compileStructOnly`)  
- Registered as `csimp` lemmas via `Compiler.CSimp.add`.

---

#### **2. Naming Conventions**

| Pattern | Usage |
|--------|-------|
| `*_cstage2` | Suffix for compiled duplicate definitions (e.g., `List.rec_cstage2`). |
| `*_eq` | Suffix for `csimp`-lemmas equating original and compiled definitions (e.g., `List.rec_eq`). |
| `mkRecName`, `mkRecOnName`, `mkBRecOnName`, `mkCasesOnName` | Standard Lean helper names for recursors, rec-on, brec-on, and cases-on. |
| `*_sizeOf_{i+1}`, `*_sizeOf_inst` | Naming pattern for `sizeOf`-related auxiliary functions. |
| `replaceConst`, `compileDefn`, `compileInductiveOnly`, `compileStructOnly` | Verbs + target (`compile`, `replace`) + scope (`Defn`, `Inductive`, `Struct`). |

---

#### **3. Tactic Stack**

| Tactic / Utility | Frequency / Role |
|------------------|------------------|
| `mkLambdaFVars`, `mkAppN`, `mkEq`, `mkEqRefl` | Core `MetaM` term construction utilities. |
| `whnfD`, `inferType`, `forallTelescope` | Used heavily in term synthesis and normalization. |
| `replaceConst` | Custom substitution helper (not a tactic, but critical for term rewriting). |
| `foldConsts` | Used in `compileSizeOf` to extract dependencies (e.g., `sizeOf`-related inductives). |
| `withRef`, `logWarning`, `throwError` | Elaborator infrastructure for diagnostics. |
| `run_cmd`, `Command.liftTermElabM` | Entry-point for command elaboration. |

No high-level tactics (`simp`, `rw`, `aesop`, etc.) — this is **low-level term/declaration manipulation**.

---

#### **4. Proof Logic / Compilation Strategy**

- **Compilation Flow**:
  1. **Check** if already compiled (`isCompiled`).
  2. **Special-case** for structs (`compileStructOnly`):  
     - Build a lambda over major index + minor premises.  
     - Use `Expr.proj` to project fields.  
     - Register `csimp` lemma.
  3. **General case** (`compileInductiveOnly`):  
     - For each recursor (`rv`), generate a new definition (`rv✝`) with:
       - `value = λ xs, rv.name xs` (but with `replaceConst` applied to minor premises).
       - For non-recursive/1-constructor cases, reuse `compileStructOnly` logic.
     - Add `mutualDefnDecl` for `rv✝`.
     - Add `csimp` lemma `rv = rv✝`.
  4. **`sizeOf` handling** (`compileSizeOf`):  
     - Extract `sizeOf`-related constants via `foldConsts`.  
     - Recursively compile dependent inductives (e.g., `List` → `Nat`).  
     - Compile `sizeOf` auxiliaries via `compileDefn`.

- **Key Insight**:  
  The compiler bug workaround avoids `rec`/`brec` in IR by replacing them with `casesOn`/`recOn`-like lambdas, but **eager evaluation** of base cases remains (hence the warning about `unreachable!`).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib bootstrapping. |
| `Lean.Elab.Command` | Command elaboration infrastructure. |
| `Lean.Compiler.CSimpAttr` | `csimp` attribute management. |
| `Lean.Util.FoldConsts` | Const dependency analysis (used in `compileSizeOf`). |
| `Lean.Data.AssocList` | For `replaceConst` (name substitution map). |
| `open Lean Meta` | Access to `MetaM`, `Expr`, `Declaration`, etc. |
| `open Elab` | Elaborator utilities (`withRef`, `logWarning`, etc.). |

**Scope**:  
- **Target**: Low-level compiler workarounds for Lean 4’s missing recursor compilation.  
- **Use Cases**:  
  - Making `rec` usable in `def` (avoiding `noncomputable`).  
  - Compiling type-class projections, `sizeOf`, and other rarely-used recursors.  
- **Limitations**:  
  - Eager evaluation in base cases (see docstring).  
  - Manual overrides needed for `Float`, `String`, `Name` due to opaque types or manual `noncomputable` impls.

---

### Summary

This module provides **low-level infrastructure** to work around Lean 4’s lack of native recursor compilation. It defines:
- A **command syntax** (`compile_inductive%`, `compile_def%`) for ad-hoc compilation.
- **Core algorithms** (`compileInductive`, `compileSizeOf`) to generate compiled definitions + `csimp` lemmas.
- **Special handling** for structs, mutual inductives, and `sizeOf` dependencies.

It is foundational for **efficient noncomputable-free code** in Mathlib, especially for large inductives like `List`, `String`, and `Float`.