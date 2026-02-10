### Technical Metadata Brief: `addRelatedDecl` in `Mathlib.Tactic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `addRelatedDecl` | `Name → String → Syntax → Option (Syntax.TSepArray ...) → (Expr → Expr → List Name → MetaM (Expr × List Name)) → MetaM Unit` | Constructs a new declaration (def/theorem) derived from an existing one, by modifying its type/value and copying metadata (e.g., `protected`, attributes). Used by `reassoc` and `elementwise`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `add*`: Indicates declaration *addition* to the environment (e.g., `addAndCompile`, `addDeclarationRangesFromSyntax`).
  - `*Info`: Refers to metadata about constants (`ConstantInfo.thmInfo`, `ConstantInfo.defnInfo`).
  - `*M`: Indicates monadic actions in the `MetaM` or `TermElabM` monad.
  - `tgt`, `src`: Standard abbreviations for *target* and *source* declaration names.
  - `newValue`, `newType`, `newLevels`: Derived values/types/universe levels for the new declaration.

- **Pattern**: Functional composition with `←` for monadic binding; use of `match` for destructuring `ConstantInfo`.

---

#### **3. Tactic Stack**

- **Core Tactics / Operations Used**:
  - `getConstInfo`: Retrieve declaration info.
  - `instantiateMVars`: Resolve metavariables.
  - `inferType`: Compute type of an expression.
  - `addAndCompile`: Add and compile new declaration.
  - `isProtected`, `addProtected`, `setEnv`: Environment manipulation.
  - `elabAttrs`, `Term.applyAttributes`: Attribute elaboration and application.
  - `isProp`: Check if a type is propositional (to decide `def` vs `theorem`).
  - `throwError`: Error reporting.

- **Monads**: `MetaM`, `Term.TermElabM.run'`.

- **No high-level tactics** like `simp`, `rw`, or `aesop` appear directly — this is a *metaprogramming utility*, not a tactic.

---

#### **4. Proof Logic / Implementation Flow**

1. **Name Construction**: Append `suffix` to `src` to form `tgt`.
2. **Range Tracking**: Call `addDeclarationRangesFromSyntax` for IDE support (jump-to-def).
3. **Declaration Retrieval**: Get `ConstantInfo` for `src`.
4. **Value/Type Construction**:
   - Call `construct` with original `type`, `value`, and `levelParams`.
   - Instantiate metavariables in result.
5. **Declaration Kind Selection**:
   - If original is a `thmInfo`, produce `thmDecl`.
   - If `defnInfo`, decide between `thmDecl`/`defnDecl` based on `isProp newType`.
6. **Environment Updates**:
   - Add new declaration.
   - Copy `protected` status if present.
   - Apply attributes (from `attrs?`) to both `src` and `tgt`.

> **Pattern**: *Read → Transform → Write*, with careful handling of Lean’s declaration environment and metadata.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization (e.g., `Name`, `Meta`, `Elab`). |
| `Lean.Elab.DeclarationRange` | Provides `addDeclarationRangesFromSyntax`. |
| `Lean.Elab.Term` | Provides `elabAttrs`, `Term.applyAttributes`, `Term.TermElabM`. |

> **Scope**: This module is part of `Mathlib.Tactic`, a namespace for metaprogramming utilities in Mathlib. It does *not* depend on specific mathematical content — it’s infrastructure for declaration manipulation.

---

### Summary

`addRelatedDecl` is a **metaprogramming helper** for generating derived declarations (defs/theorems) from existing ones, preserving metadata and enabling attribute propagation. It plays a foundational role in tools like `reassoc` and `elementwise`, and exemplifies Lean’s support for *declarative metaprogramming* via the `MetaM` monad.