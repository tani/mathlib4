### Technical Brief: `lift_lets` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Lean.Expr.LiftLetsConfig` | `Structure` | Configuration for controlling behavior of `liftLets`: <br>• `proofs : Bool` — whether to lift lets inside proofs (default: `false`) <br>• `merge : Bool` — whether to merge identical let-bindings syntactically (default: `true`) |
| `Lean.Expr.liftLetsAux` | `Expr → Array Expr → (Array Expr → Expr → MetaM Expr) → MetaM Expr` | Core recursive helper for traversing and lifting `let` expressions. Handles `let`, `app`, `proj`, `lam`, `forall`, `mdata`, and base cases. Implements merging logic when `config.merge = true`. |
| `Lean.Expr.liftLets` | `Expr → (Array Expr → Expr → MetaM Expr) → LiftLetsConfig → MetaM Expr` | Top-level function to lift all `let`s in an expression outward. Calls `liftLetsAux` with empty `fvars`. Typically used with `mkLetFVars` to reconstruct expression with lifted lets. |
| `Mathlib.Tactic.lift_lets` | `tactic` | User-facing tactic that applies `liftLets` to the type of a local hypothesis (`atLocal`) or to the goal type (`atTarget`). Enables `intro` on embedded `let`s. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `lift_`: Indicates transformation that moves constructs *upward* (e.g., `liftLets`, `lift_lets`).
  - `is_`: Used in `Expr.isLet` (predicate for `let` expressions).
  - `fvar`: Refers to free variables (local constants) — e.g., `fvars`, `fvar?`, `fvar'`.
  - `mkLetFVars`, `mkLambdaFVars`, `mkForallFVars`: Constructors for binding constructs using arrays of `fvar`s.
  - `insideLets`, `liftLetsAux`: Internal helper naming pattern (`Aux`, `inside*`).
  - `config`, `cfg`: Standard for configuration objects.

- **Style**: Lean’s standard functional/meta-programming style — pure functions (`liftLetsAux`) + monadic tactics (`lift_lets`).

---

#### **3. Tactic Stack**

Frequent tactics & combinators used in implementation:

| Tactic / Utility | Role |
|------------------|------|
| `withLetDecl`, `withLocalDecl` | Introduce local constants/definitions safely (with context management). |
| `instantiateMVars` | Resolve metavariables before processing types. |
| `collectForwardDeps` | Compute dependencies of local constants to determine which lets *cannot* be lifted out (e.g., due to forward references). |
| `partition` | Split `fvars` into movable vs. non-movable based on dependency analysis. |
| `findM?`, `forM?`, `match` | Pattern matching and monadic search over arrays. |
| `mkLetFVars`, `mkLambdaFVars`, `mkForallFVars` | Reconstruct expressions with new binders from arrays of `fvar`s. |
| `changeLocalDecl`, `change` | Modify local hypotheses or goal type in the metavariable context. |
| `withLocation`, `atLocal`, `atTarget`, `failed` | Tactic composition helpers for applying transformations at specific locations. |

---

#### **4. Proof Logic / Algorithm Flow**

The core algorithm follows this structure:

1. **Early exit**: If no `let` in expression (`e.find? Expr.isLet`).isNone, skip recursion.
2. **Proof filtering**: If `!config.proofs` and `e` is a proof (via `Meta.isProof`), skip lifting.
3. **Case analysis on `e`**:
   - **`letE` case**:
     - Recursively process type `t`, value `v`, body `b`.
     - If `config.merge = true`, check if an existing `let` with same type & value exists in `fvars`; if so, reuse it (avoid duplication).
     - Otherwise, introduce new `let`-binding via `withLetDecl`.
   - **`app`, `proj`, `mdata`**: Recurse into subterms.
   - **`lam` / `forallE`**:
     - Enter binding → recurse into body.
     - Compute dependencies (`collectForwardDeps`) of introduced `fvar`.
     - Partition `fvars` into movable (`fvars2`) and non-movable (`fvars2'`) based on dependencies.
     - Rebuild with `mkLetFVars`/`mkLambdaFVars`/`mkForallFVars` to preserve scoping.
     - Use `insideLets` to re-enter any newly created lets (to keep context clean).
   - **Base case**: Return `f fvars e`.

4. **Tactic-level**:
   - Parse config (`optConfig`).
   - Apply `liftLets` to:
     - hypothesis type (`atLocal`) or
     - goal type (`atTarget`)
   - Use `changeLocalDecl` / `change` to update the metavariable state.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.Basic` | Provides foundational tactic utilities (`withLocation`, `elabConfig`, etc.). |
| `Lean Elab Parser Meta Tactic` | Core Lean metaprogramming modules: syntax parsing (`elab_rules`), expression manipulation (`Expr`, `Meta`), tactic combinators (`Tactic`). |

**Key dependencies**:
- `Lean.Expr` — expression representation.
- `Meta` — metavariable context, local declarations, `withLocalDecl`, `instantiateMVars`.
- `Tactic` — tactic infrastructure (`tactic`, `elab_rules`, `liftMetaTactic1`).
- `Parser` — syntax elaboration (`elabConfig`, `location`, `optConfig`).

---

### Summary

The `lift_lets` tactic is a **structural transformation tool** that rewrites expressions to expose embedded `let` bindings at the top level, enabling more flexible `intro` usage and simplifying reasoning about let-bound terms. Its correctness relies on careful handling of scoping, dependencies, and syntactic equality for merging. The implementation showcases advanced Lean metaprogramming: recursive expression traversal, context-sensitive binding management, and integration with the tactic framework.