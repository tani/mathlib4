**Technical Metadata Brief: `Mathlib.Core.Lemma` (Lean 4)**

---

### 1. **Key Definitions & Theorems**
- **`lemma` syntax**:  
  - *Type*: `Syntax` (command-level syntax rule)  
  - *Purpose*: Defines a syntactic sugar for `lemma`, allowing users to declare definitions/propositions with the same semantics as `theorem`, but with a stylistic distinction (typically for auxiliary results).  
  - *Priority*: `default + 1` — ensures it overrides any lower-priority `lemma` syntax (e.g., from Batteries).

- **`expandLemma` macro**:  
  - *Type*: `Macro` (a function transforming syntax at compile time)  
  - *Purpose*: Implements `lemma` by rewriting the syntax tree of a `lemma` command into that of a `theorem` command, preserving all modifiers, identifiers, signatures, and values. Ensures forward compatibility with changes to `theorem`.

---

### 2. **Naming Conventions**
- **Prefixes/Suffixes**:  
  - `expand_` — standard for macro expansion functions in Lean 4 (e.g., `expandLemma`, `expandDef`, etc.).  
  - `«lemma»` — internal macro name (quoted identifier), matching the command name for parser-macro binding.  
  - `declModifiers`, `declId`, `declSig`, `declVal` — Lean’s internal naming for declaration components (modifiers, identifier, signature, value), reused from `theorem` syntax.

---

### 3. **Tactic Stack**
- **No tactics used** — this is a *syntax-level* and *macro-level* module, not a proof-tactic file.  
- **Key utilities used**:  
  - `Macro`, `Syntax`, `mkAtomFrom`, `modifyArg`, `setKind` — Lean 4 metaprogramming primitives.

---

### 4. **Proof Logic**
- **Not applicable** — this file contains no proofs. It defines a *syntactic alias* (`lemma`) for `theorem`, implemented via macro expansion.  
- **Implementation logic**:  
  - Parse a `lemma` command.  
  - Transform its AST to replace `"lemma"` with `"theorem"` and adjust the kind to `Parser.Command.theorem`.  
  - Return a declaration-kind syntax node.

---

### 5. **Imports**
- **`Mathlib.Init`** — provides core Lean infrastructure (including metaprogramming utilities like `Macro`, `Syntax`, `mkAtomFrom`).  
- **`Lean.Parser.Command`** — supplies parser combinators and command syntax definitions (e.g., `declModifiers`, `declId`, etc.).

---

### Summary
This is a **metaprogramming utility** for syntactic convenience: `lemma` is a lightweight, high-priority alias for `theorem`, implemented via AST rewriting rather than semantic duplication. It ensures consistency with `theorem`’s evolution and supports Lean’s modular command extensibility.