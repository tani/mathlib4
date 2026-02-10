### Technical Metadata Brief: `Mathlib.Tactic.Find`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `matchHyps` | `List Expr → List Expr → List Expr → MetaM Bool` | Checks whether a list of pattern expressions unifies with a list of hypothesis expressions, preserving order and matching types via `isDefEq`. Used to validate lemma application against local hypotheses. |
| `isBlackListed` | `DeclName → MetaM Bool` | Determines if a declaration should be excluded from `#find` results (e.g., internal, recursive, aux recursor, noconfusion, matcher). Prevents noise from low-level or internal definitions. |
| `findDeclsPerHead` | `DeclCache (Std.HashMap HeadIndex (Array Name))` | A cached index mapping *head symbols* (e.g., `+`, `→`, `Nat`) to lists of declaration names whose type head matches. Enables fast lookup during pattern search. Initialized at module load time. |
| `findType` | `Expr → TermElabM Unit` | Core search function: given a pattern expression `t`, it extracts its head symbol, queries `findDeclsPerHead`, and for each candidate declaration, checks if its type matches `t` up to definitional equality and hypothesis matching. Logs up to 20 matches. |
| `elab "#find "` | `term : command` | Command elaborator for `#find <expr>`, used in top-level Lean files. Elaborates the term, synthesizes metavariables, and invokes `findType`. |
| `elab "find"` | `: tactic` | Tactic elaborator for `find`, used inside tactic proofs. Searches for lemmas matching the *current goal type* (via `getMainTarget`). |
| `elab "#find "` | `term : tactic` | Tactic variant of `#find`, allowing pattern-based search *within* proofs (e.g., `by #find ?n + _ = _ + ?n`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate functions (`isBlackListed`, `isDefEq`).
  - `match_`: Matching logic (`matchHyps`).
  - `find_`: Search-related functions (`findType`, `findDeclsPerHead`).
- **Suffixes**:
  - `PerHead`: Indicates indexing by head symbol (`findDeclsPerHead`).
  - `M`: Monadic functions (`MetaM`, `TermElabM`).
- **Constants**:
  - `pat`, `cTy`, `cParams`, `t`, `pt`, `h`: Standard metavariable/term naming in tactic code.
  - `numFound`: Counter for result limiting.

---

#### **3. Tactic Stack**

Frequent tactics & utilities used in this module:

| Tactic / Utility | Role |
|------------------|------|
| `isDefEq` | Core unification step for type matching. |
| `forallMetaTelescopeReducing`, `lambdaMetaTelescope`, `forallTelescopeReducing` | Unfold binders (e.g., `∀`, `→`, `Π`) to expose structure for matching. |
| `instantiateMVars`, `mkFreshLevelMVars` | Resolve metavariables and level metavariables to normalize types. |
| `abstractMVars` | Replace metavariables with fresh constants for pattern matching. |
| `liftTermElabM` | Lift term elaboration into command/tactic context. |
| `logInfo` | Output search results to Lean infoview/log. |
| `getEnv`, `env.find?` | Access global environment for declaration info. |
| `Term.synthesizeSyntheticMVars` | Force resolution of implicit arguments before search. |

---

#### **4. Proof Logic / Search Strategy**

1. **Pattern Parsing**:
   - Elaborate input term `t` (e.g., `_ + _ = _ + _`) to an `Expr`.
   - Normalize via `instantiateMVars` and `abstractMVars` to obtain a canonical pattern.

2. **Head-Based Indexing**:
   - Extract `HeadIndex` from the pattern’s type (e.g., `+` for `Nat → Nat → Nat`).
   - Use `findDeclsPerHead` to get candidate declarations sharing the same head symbol.

3. **Candidate Matching**:
   - For each candidate declaration `c`:
     - Instantiate its type with fresh level metavariables.
     - Open binders (`forallTelescopeReducing`) to get parameters and body.
     - Align pattern and candidate types via `isDefEq`.
     - Validate hypothesis alignment using `matchHyps`.

4. **Result Reporting**:
   - Log up to 20 matches (with declaration name and type).
   - Early termination if limit exceeded.

5. **Tactic vs Command**:
   - `#find <expr>`: User-specified pattern.
   - `find`: Uses current goal type as pattern.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean + Mathlib initialization (e.g., `Meta`, `Std`). |
| `Batteries.Util.Cache` | Provides `DeclCache`, used for `findDeclsPerHead`. |
| `Lean.HeadIndex` | Defines `HeadIndex`, used to index declarations by top-level symbol. |
| `Lean.Elab.Command`, `Lean.Elab.Tactic` | Elaboration infrastructure for `#find` (command) and `find` (tactic). |
| `Batteries.Tactic` | Possibly provides shared tactic utilities (e.g., `liftTermElabM`). |

---

#### **Key Design Notes**

- **Performance**: Uses caching (`DeclCache`) and head-based indexing to avoid linear scan of the entire environment.
- **Safety**: Blacklisting prevents internal/auxiliary definitions from cluttering results.
- **Flexibility**: Supports both *type-pattern matching* (`#find`) and *goal-directed apply search* (`find`).
- **Limitations**: Max 20 results; uses `forallMetaTelescopeReducing` (not `forallTelescopeReducing`) — may leak metavariables (see TODO comment).

--- 

Let me know if you'd like a formalized spec or a diagram of the search pipeline.