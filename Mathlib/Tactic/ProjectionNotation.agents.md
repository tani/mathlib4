### Technical Metadata Brief: `Mathlib.ProjectionNotation`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mkExtendedFieldNotationUnexpander` | `Name → CommandElabM Unit`<br>Generates an `app_unexpander` for a given function `f` to enable pretty-printing using dot notation (e.g., `x.f y` instead of `C.f x y`). Handles both structure projections and generalized projections. |
| `pp_dot` attribute | Syntax `pp_dot : attr`<br>Binds the `mkExtendedFieldNotationUnexpander` logic to a user-declared function via the `@[pp_dot]` attribute. Registers a builtin attribute with deprecation warning and command elaboration. |
| `add` handler (of `registerBuiltinAttribute`) | `AttributeM Unit`<br>Callback invoked when `@[pp_dot]` is applied. Logs deprecation warning, enforces global-only usage, and triggers unexpander generation. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `mk*`: Factory functions (`mkExtendedFieldNotationUnexpander`)
  - `*unexpander`: Generated auxiliary definitions for pretty-printing (e.g., `f.unexpander`)
  - `to*`: Coercion projections (e.g., `toA`, `toB`) — used internally for structure projection collapsing
  - `pp_*`: Attribute and printer-related names (`pp_dot`, `ppDotAttr`)
- **Structure naming pattern**:
  - `Name.str .anonymous ("to" ++ A')` → e.g., `toA`, `toFoo`, `toBar`
- **Generated names**:
  - `Name.str f "unexpander"` → e.g., `foo.unexpander`

---

#### **3. Tactic Stack**

| Tactic / Elaborator | Usage |
|---------------------|-------|
| `elabCommand` | Embeds generated Lean code (e.g., `@[app_unexpander ...] aux_def ...`) into the command elaboration pipeline. |
| `withRef` | Wraps command elaboration with source location for error reporting. |
| `set_option hygiene false` | Used inside generated patterns to allow variable capture (e.g., reusing `x` in output). |
| `throwError`, `throwUnsupportedSyntax`, `logWarning` | Error handling and deprecation messaging. |
| `getStructureInfo?` | Checks whether the type is a structure (to decide whether to add `.toA` collapsing rule). |

---

#### **4. Proof Logic / Elaboration Flow**

1. **Attribute application** (`@[pp_dot f]`) triggers `add` callback.
2. **Validation**:
   - Ensures `f` ends in a string component (e.g., `A.foo`, not `A.foo.`).
   - Enforces global-only usage.
3. **Branching logic**:
   - If `f` is for a structure (`getStructureInfo?` returns `some _`):
     - Constructs `toA` name (e.g., `toFoo`).
     - Generates an `aux_def` with two patterns:
       - `($$_ $$(x).toA)` → rewrites to `x.f`
       - `($$_ $$x)` → rewrites to `x.f`
   - Else (non-structure):
     - Generates simpler `aux_def` with one pattern: `($$_ $$x)` → `x.f`
4. **Generated unexpander**:
   - Uses `app_unexpander` to override default pretty-printing.
   - Employs `set_option hygiene false` to avoid unnecessary parentheses and allow variable reuse.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Lean.Elab.AuxDef` | Provides `aux_def` and command elaboration utilities for generating auxiliary definitions. |
| `Mathlib.Init` | Core utilities (likely for `Name`, `CommandElabM`, etc.). |
| `Lean PrettyPrinter.Delaborator`, `SubExpr` | Provides delaboration infrastructure (`SubExpr`, `Unexpander`, etc.). |
| `Lean.Elab.Command` | Enables `elabCommand`, `withRef`, and command-level elaboration. |

---

### Summary

This module implements a **deprecated** mechanism (`pp_dot`) to enable dot-notation pretty-printing for generalized projections in Lean 4 < v4.8.0. It works by generating `app_unexpander`s that rewrite terms like `C.f c x` into `c.f x`, and for structures, also collapses chains like `x.toB.toA.f y` into `x.f y`. The implementation is syntactic and relies on core delaborator cooperation. Since Lean 4.8.0, this is superseded by `pp.fieldNotation.generalized`.

> ⚠️ **Deprecation Note**: Use of `@[pp_dot]` now emits a warning and is discouraged.