### Technical Metadata Brief: `Mathlib.PPWithUniv`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Kind | Purpose |
|------|-------------|---------|
| `delabWithUniv` | `Delab` | A delaborator that pretty-prints universe parameters for the head symbol of an application, *if* `pp.universes` is not explicitly set to `false`. It wraps `delabApp` and modifies the expression to enable universe pretty-printing on the function head. |
| `ppWithUnivAttr` | Syntax rule (`attr`) | A Lean attribute syntax `pp_with_univ` that can be attached to declarations (e.g., `@[pp_with_univ] Ordinal`) to register the `delabWithUniv` delaborator for that declaration. |
| `registerBuiltinAttribute` block | Initialization code | Registers the `pp_with_univ` attribute at compile time, linking it to the `delabWithUniv` delaborator via attribute application logic. |

> **Note**: No theorems are proven here—this is a *pretty-printing infrastructure* module.

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `delabWithUniv`: Combines `delab` (delaborator) + `WithUniv` (with universes).
  - `ppWithUnivAttr`: Combines `pp` (pretty-print) + `WithUniv` + `Attr` (attribute).
  - `mkIdent <| `app ++ src`: Uses backtick-quoted identifiers (`app`, `src`) and string concatenation for internal naming.
- **Style**: Descriptive, camelCase, with explicit reference to purpose (`pp`, `univ`, `delab`, `attr`).

---

#### **3. Tactic / Elaboration Stack**

| Tactic / Elaborator | Role |
|---------------------|------|
| `whenPPOption` | Conditional execution based on a pretty-printer option (`pp.universes`). |
| `withTheReader` | Reader-monad style context manipulation (here, modifying `SubExpr` for delaboration). |
| `liftCommandElabM`, `liftTermElabM` | Monad lifting for command/term elaboration contexts. |
| `Elab.elabAttr`, `Term.applyAttributes` | Attribute elaboration and application. |
| `get`, `setOption`, `mkAppN`, `getAppFn`, `getAppArgs` | Expression manipulation utilities (Lean’s delaborator API). |

> **No proof tactics** (e.g., `intro`, `rw`, `induction`) are used—this is purely *metaprogramming*.

---

#### **4. Proof Logic / Execution Flow**

- **Not proof logic**, but *attribute registration & delaborator wiring*:
  1. User writes `@[pp_with_univ] Ordinal`.
  2. The `registerBuiltinAttribute` handler intercepts the attribute application.
  3. It constructs an identifier `` `appOrdinal `` (via `` `app ++ src ``).
  4. It elaborates a `delab` attribute instance pointing to that identifier.
  5. It applies the `delab` attribute to the built-in `delabWithUniv` delaborator.
  6. During pretty-printing, `delabWithUniv` checks `pp.universes`; if true, it enables universe printing on the head symbol.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Provides core Lean infrastructure (including `Lean.*` modules for delaboration, syntax, attributes). |
| `open Lean Parser PrettyPrinter Delaborator SubExpr Elab Command` | Brings key modules into scope for metaprogramming (syntax, delaboration, attribute handling). |

> **Scope**: This module is part of **Mathlib**, targeting Lean 4’s pretty-printing and metaprogramming infrastructure. It does *not* depend on advanced mathlib theories—only low-level Lean internals.

---

### Summary

This module implements a **pretty-printing attribute** (`pp_with_univ`) that ensures universe parameters (e.g., `.{u}`) are printed for declarations like `Ordinal`, which are universe-polymorphic and where levels are not inferable from arguments. It leverages Lean’s delaborator system and attribute mechanism—no mathematical content, but critical for usability in formalizations involving universes.