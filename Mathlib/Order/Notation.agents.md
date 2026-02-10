### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `HasCompl` | `Type u → Type u` | Typeclass for a unary complement operation (`ᶜ`) on a type; used for lattice/set complement. |
| `Sup` | `Type u → Type u` | Deprecated typeclass for `⊔` (lattice join); now superseded by `Max`. |
| `Inf` | `Type u → Type u` | Deprecated typeclass for `⊓` (lattice meet); now superseded by `Min`. |
| `Max` | `Type u → Type u` | Current canonical typeclass for `⊔` (least upper bound / join). |
| `Min` | `Type u → Type u` | Current canonical typeclass for `⊓` (greatest lower bound / meet). |
| `HImp` | `Type u → Type u` | Typeclass for Heyting implication (`⇨`). |
| `HNot` | `Type u → Type u` | Typeclass for Heyting negation (`￢`), distinct from `HasCompl` in non-Boolean Heyting/co-Heyting algebras. |
| `Top` | `Type u → Type u` | Typeclass for a top element (`⊤`). |
| `Bot` | `Type u → Type u` | Typeclass for a bottom element (`⊥`). |
| `top_nonempty`, `bot_nonempty` | Instance | Prove inhabitedness of types with `Top`/`Bot` via `⟨⊤⟩` / `⟨⊥⟩`. |

> **Note**: `Sup` and `Inf` are deprecated as of November 2024 in favor of `Max`/`Min`, with `@deprecated Max (since := "2024-11-06")`.

#### 2. **Naming Conventions**
- **Prefixes/Suffixes**:
  - `has_` prefix for typeclasses with a single operation (`HasCompl`, `HImp`, `HNot`, `Sup`, `Inf`).
  - `Top`/`Bot` (capitalized, no `has_`) for distinguished constants.
  - `compl`, `sup`, `inf`, `himp`, `hnot`, `top`, `bot` — field names follow the operation they define.
- **Notation mappings**:
  - `compl` ↔ `ᶜ`
  - `Max.max` ↔ `⊔`
  - `Min.min` ↔ `⊓`
  - `himp` ↔ `⇨`
  - `hnot` ↔ `￢`
  - `Top.top` ↔ `⊤`
  - `Bot.bot` ↔ `⊥`

#### 3. **Tactic Stack**
- **`@[notation_class]`**: Used to mark classes intended for notation syntax.
- **`@[ext]`**: Adds extensionality lemmas (e.g., for `Max`, `Min`, `Top`, `Bot`).
- **`@[inherit_doc]`**: Inherits documentation from parent classes/notations.
- **`infixl`, `infixr`, `postfix`, `prefix`**: For defining custom notations with precedence/associativity.
- **`export`**: Exports field names (e.g., `export HasCompl (compl)` makes `compl` available as a function).
- **`attribute [match_pattern]`**: Marks `Top.top`, `Bot.bot` as match patterns for pattern matching.

No heavy tactic usage in proofs (this is a *notation declaration* file), but tactics like `aesop`, `simp`, `rw`, `ext` are likely used downstream.

#### 4. **Proof Logic**
- This file contains **no proofs**, only:
  - Typeclass declarations,
  - Notation mappings,
  - Instances (`top_nonempty`, `bot_nonempty`),
  - Attribute annotations (`ext`, `match_pattern`, `inherit_doc`).
- Logical structure is purely *syntactic/declarative* — defining the *interface* for lattice and Heyting algebra notations.

#### 5. **Imports**
- `Mathlib.Tactic.TypeStar`: Provides `Type*` shorthand and related utilities.
- `Mathlib.Tactic.Simps.NotationClass`: Enables `@[notation_class]` attribute and simps-style notation handling.

> **Scope**: This module defines foundational *notation infrastructure* for lattices, Heyting algebras, and bounded lattices — foundational for later algebraic structures (e.g., `Lattice`, `Heyting`, `BooleanAlgebra`).