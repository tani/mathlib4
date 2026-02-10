### Technical Metadata Brief: `Mathlib.Explode`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `explodeCore` | `(e : Expr) → depth : Nat → entries : Entries → start : Bool → MetaM (Option Entry × Entries)` | Core recursive algorithm that traverses a proof term (`Expr`) and builds a dependency table (`Entries`) of subexpressions, tracking depth, status (e.g., intro/elim), and dependencies. |
| `explode` | `(e : Expr) → filterProofs : Bool → MetaM Entries` | Top-level wrapper around `explodeCore`; filters expressions based on whether they are proofs (`Meta.isProof`) and returns the final `Entries`. |
| `consDep` | `(entry? : Option Entry) → deps : List (Option Nat) → List (Option Nat)` | Helper to conditionally prepend a dependency line number to the dependency list, respecting `useAsDep` flag and `includeAllDeps`. |
| `entriesToMessageData` | *(imported from `Mathlib.Tactic.Explode.Pretty`)* | Converts internal `Entries` into a human-readable Fitch-style table (`MessageData`). |
| `#explode` command | `elab "#explode " stx:term : command` | Lean syntax extension that accepts a term (theorem name or expression), elaborates it, and displays its decomposition via `explode`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `explodeCore`: Core algorithmic logic (`Core` suffix).
  - `consDep`: "Cons dependency" — functional-style prepend to dependency list.
  - `useAsDep`: Boolean field in `Entry` indicating whether the entry should be included as a dependency.
  - `status`: Field in `Entry` with variants like `Status.intro`, `Status.lam`, `Status.reg`, `Status.sintro`.
  - `thm`: Field storing the rule name (e.g., `"∀I"`, `"∀E"`, or actual constant name).
  - `depth`: Tracks nesting level (e.g., lambda abstraction depth).
  - `start`: Boolean flag indicating top-level entry (affects lambda handling).

- **Status variants**:
  - `intro`, `sintro`, `cintro`, `lam`, `reg`: Represent different expression constructors and their roles in proof structure.

---

#### **3. Tactic Stack**

- **Core Tactics & Utilities Used**:
  - `Meta.lambdaTelescope`: For decomposing lambda expressions.
  - `Meta.withLocalDeclD`: Introduces local constants for lambda/let bodies.
  - `Meta.inferType`: Type inference for expressions.
  - `Meta.isProof`: Predicate to filter proof terms.
  - `Term.elabTerm`, `Term.synthesizeSyntheticMVarsNoPostponing`, `Term.levelMVarToParam`, `instantiateMVars`: For elaborating and normalizing user input.
  - `getConstInfo`, `realizeGlobalConstNoOverloadWithInfo`: For resolving theorem names.
  - `addMessageContext`, `logInfo`, `addCompletionInfo`: For user-facing messaging and IDE integration.
  - `trace[explode]`: Debug tracing (conditional on `set_option trace.explode true`).

- **No heavy tactic automation** (e.g., no `simp`, `ring`, `aesop`) — this is a *purely structural* analysis tool.

---

#### **4. Proof Logic / Algorithm Flow**

- **Recursive traversal** of the expression (`Expr`) tree:
  1. **Memoization**: Check if expression already processed (`entries.find?`).
  2. **Filtering**: Apply user-defined `select` predicate (e.g., `filterProofs`).
  3. **Case analysis** on expression constructor:
     - `.lam`: Use `lambdaTelescope`, recursively process arguments and body, track intro steps (`intro`, `sintro`, `cintro`), and wrap with `∀I`.
     - `.app`: Decompose into function + args; if function is a constant, omit its entry; otherwise recurse; wrap with `∀E` or constant name.
     - `.letE`: Process value first, then instantiate body with substituted variable.
     - **Default case** (constants, variables, literals, etc.): Add as leaf nodes with `status := reg`.
  4. **Dependency tracking** via `consDep`, respecting `useAsDep` and `includeAllDeps`.
  5. **Result**: A structured `Entries` table mapping each subexpression to metadata (type, depth, rule, dependencies).

- **Top-level flow**:
  - Elaborate input term → normalize → run `explode` → pretty-print via `entriesToMessageData`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Lean.Elab.Command` | For defining the `#explode` command syntax extension (`elab`). |
| `Lean.PrettyPrinter` | Likely used indirectly for message formatting (via `MessageData`). |
| `Mathlib.Tactic.Explode.Datatypes` | Defines core data structures: `Entry`, `Entries`, `Status`, `line`, `type`, `thm`, `deps`, `useAsDep`. |
| `Mathlib.Tactic.Explode.Pretty` | Provides `entriesToMessageData` for rendering the Fitch-style table. |

---

### Summary

The `Mathlib.Explode` module implements a **proof-term deconstructor** that visualizes Lean proof terms as step-by-step Fitch-style proofs. It emphasizes **structural decomposition**, **dependency tracking**, and **user-friendly formatting**, with no reliance on automation tactics. Its design is modular: core logic (`explodeCore`) is separated from command syntax (`#explode`) and pretty-printing (`Pretty`), enabling reuse and extension.