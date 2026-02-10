### Technical Brief: `generalize_proofs` Tactic (Lean 4 / Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Config` | `structure` | Configuration for `generalize_proofs`: `maxDepth`, `abstract`, `debug`. |
| `GState` | `structure` | Global state: `propToFVar : ExprMap Expr` mapping propositions to their generalized fvars. |
| `MGen` | `abbrev` = `ReaderT Config (StateRefT GState MetaM)` | Monadic stack for generalizing proofs: carries config + global state. |
| `AContext` | `structure` | Context for abstraction: bound fvars, `propToFVar`, recursion `depth`, `initLCtx`, `config`. |
| `AState` | `structure` | Local state for abstraction: `generalizations : Array (Expr × Expr)`, `propToProof : ExprMap Expr`. |
| `MAbs` | `abbrev` = `ReaderT AContext (MonadCacheT _ (StateRefT AState MetaM))` | Monadic stack for abstracting proofs: caching, context, state. |
| `abstractProofs` | `e : Expr → ty? : Option Expr → MAbs Expr` | Recursively abstracts proofs in an expression, propagating expected types. |
| `visit`, `visitProof` | `visit : Expr → Option Expr → MAbs Expr`<br>`visitProof : Expr → Option Expr → MAbs Expr` | Core recursive helpers in `abstractProofs`. |
| `withGeneralizedProofs` | `e : Expr → ty? → (Array Expr × Array Expr × Expr → MGen α) → MGen α` | Applies abstraction, then introduces generalized propositions as new fvars and runs continuation. |
| `generalizeProofsCore` | `g : MVarId → fvars rfvars : Array FVarId → target : Bool → MGen (Array Expr × MVarId)` | Main loop: reverts `fvars`, generalizes proofs in reverted hypotheses and/or target. |
| `_root_.Lean.MVarId.generalizeProofs` | `g : MVarId → fvars : Array FVarId → target : Bool → config → MetaM (Array Expr × MVarId)` | Public entry point: reverts, then calls `generalizeProofsCore`. |
| `elabConfig` | `declare_config_elab` | Elaborates tactic config syntax (e.g., `(config := { maxDepth := 2 })`). |
| `elab` (`generalizeProofsElab`) | `tactic` | Syntax elaborator for `generalize_proofs` tactic. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_` (e.g., `isProp`, `isAtomic`, `isDefEq`) — type/property checks.
  - `mk_` (e.g., `mkLambdaFVars`, `mkFreshExprSyntheticOpaqueMVar`) — construction.
  - `with_` (e.g., `withLocalDecl`, `withGeneralizedProofs`) — scoped context manipulation.
  - `visit`, `visitProof` — recursive traversal functions.
  - `generalize`, `abstract`, `initialPropToFVar`, `runMAbs`, `insertFVar`, `findProof?` — action-oriented.

- **Suffixes**:
  - `?` — optional return (e.g., `findProof?`, `get?`).
  - `'` — primed variant (e.g., `tgt'`, `g'`, `fvar'`) — updated or intermediate value.
  - `UsedOnly`, `ExpectedTypes`, `Abstracted`, `Generalized` — descriptive modifiers.

---

#### **3. Tactic Stack**

Frequently used tactics & utilities:

| Tactic / Utility | Role |
|------------------|------|
| `withLocalDecl`, `withLetDecl`, `withLocalInstances` | Introduce new fvars/let-bindings safely. |
| `mkLambdaFVars`, `mkForallFVars`, `mkLetFVars` | Build lambda/forall/let expressions. |
| `mkLambdaFVarsUsedOnly` | Lambda abstraction over *used* fvars only (prevents leakage). |
| `abstractProofs`, `visit`, `visitProof` | Core abstraction logic (recursive, type-propagating). |
| `appArgExpectedTypes` | Infer expected argument types for function applications (propagates expected types). |
| `isDefEq`, `inferType`, `whnfD`, `isProp`, `isAtomic`, `isProof` | Type-theoretic checks and reductions. |
| `replace`, `instantiateMVars`, `cleanupAnnotations` | Substitution and normalization. |
| `withNewLocalInstances`, `withLCtx`, `withReader`, `modify`, `get`, `run`, `run'` | Monadic control (state, reader, cache). |
| `trace[Tactic.generalize_proofs]` | Debug tracing (conditional on trace class). |
| `Elab.pushInfoLeaf`, `ofFVarAliasInfo` | Info tree / user-facing feedback. |

---

#### **4. Proof Logic / Recurring Flow**

The tactic follows this high-level logic:

1. **Revert** selected hypotheses (`fvars`) using `revert`, preserving well-formedness.
2. **Initialize** global state (`propToFVar`) from existing propositions in the local context.
3. **Abstract proofs** in the goal/target and/or reverted hypotheses:
   - Recursively traverse expression (`abstractProofs` → `visit` → `visitProof`).
   - For each proof term `p`:
     - Check if it’s already *abstracted* (`f a b ...` with `f` atomic, args bound).
     - If not, abstract over bound variables using `mkLambdaFVarsUsedOnly`.
     - Normalize its type (`abstractProofs` recursively on type).
     - Cache or reuse existing proof for same proposition (`findProof?`, `insertProof`).
   - Propagate expected types via `appArgExpectedTypes` to avoid over-specialization (e.g., `1 < [1,2].length` instead of `1 < 2`).
4. **Introduce generalized propositions** as new local hypotheses:
   - For each abstracted proof `(prop, pf)`, add `prop` as a new `fvar`.
   - Update `propToFVar` to map `prop` → `fvar`.
   - Substitute proofs in goal/hypotheses via `replace`.
5. **Handle special cases**:
   - If `abstract := false`, skip abstraction over bound vars.
   - If `maxDepth = 0`, disable recursion into types of generalized proofs.
   - If a proposition already exists in context, reuse it (via `propToFVar`).
   - For `let`-bindings that are propositions, clear the value (using proof irrelevance).
6. **Rename** generalized proofs using user-provided names (`hs`), and update info tree.

**Inductive structure**: recursion on expression depth (`depth` counter in `AContext`), with caching to avoid redundant work.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Lean.Elab.Tactic.Config`, `Location` | Tactic config parsing & location (`at *`, `at h₁ h₂`) handling. |
| `Mathlib.Lean.Expr.Basic`, `Batteries.Lean.Expr` | Extended expression utilities (e.g., `cleanupAnnotations`, `beta`, `withApp'`). |
| `Lean.Expr` (via `Mathlib`) | Core expression representation, metavariables, local contexts. |

**Key dependencies**:
- `MetaM`, `LocalContext`, `Expr`, `MVarId` — core Lean metaprogramming.
- `MonadCacheT`, `StateRefT`, `ReaderT` — monad transformers.
- `Elab.Tactic`, `Parser.Tactic` — tactic elaboration infrastructure.

---

### Summary

`generalize_proofs` is a sophisticated metaprogram that **abstracts and generalizes proof terms** in goals/hypotheses, turning opaque proof arguments into named local hypotheses. It supports:
- **Type propagation** (to avoid over-specialization),
- **Caching & reuse** of generalized proofs,
- **Binder abstraction** (via `mkLambdaFVarsUsedOnly`),
- **Configurable recursion depth** and abstraction behavior,
- **Integration with Lean’s local context & metavariable system**.

It is especially useful for:
- Working with `Classical.choose`, `Classical.axiom_of_choice`, or other choice-dependent data,
- Simplifying dependent type goals by eliminating proof terms,
- Making proofs more modular and easier to reference.

--- 

Let me know if you'd like a formalized specification or a diagram of the monad stack.