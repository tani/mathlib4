### Technical Metadata Brief: `simp_intro` Tactic (Lean 4 / Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `simpIntroCore` | `MVarId → Simp.Context → Simp.SimprocsArray → Option Simp.Discharge → Bool → List (TSyntax ``binderIdent) → TermElabM (Option MVarId)` | Core recursive loop of `simp_intro`: simplifies goal while introducing binders (local variables), extending the simp context with local hypotheses as they are introduced. Handles `let`, `forall`, and fails on unsupported binders unless `more` is enabled. |
| `simp_intro` (elaborator) | Elaborator command (`tactic`) | User-facing tactic entry point. Parses configuration, discharger, identifiers, and `..`/`only` modifiers; builds a `simp`-style tactic syntax and delegates to `simpIntroCore`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `simpIntroCore`: `simpIntro` + `Core` → indicates internal/recursive implementation.
  - `simpTargetCore`, `simpLocalDecl`: follow same pattern — core simplification helpers.
- **Suffixes**:
  - `?` in `discharge?`, `g?`: optional return value (e.g., `Option MVarId`).
  - `'` in `getType'`: often denotes a variant (e.g., with caching or extended behavior).
- **Variables**:
  - `ids`, `ids'`: list of binder identifiers (current / remaining).
  - `fvar`: `FVarId` — formal variable introduced by `intro`.
  - `var`: syntax tree node for the user-given binder name (e.g., `x`, `h`).
  - `transp`: transparency setting (`.default`, `.reducible`, etc.).

---

#### **3. Tactic Stack / Tactics Used**

- **`simpTargetCore`**: simplifies the *goal* using current simp context.
- **`simpLocalDecl`**: simplifies a *local hypothesis* (after `intro`) using current context.
- **`intro`**: standard tactic to introduce a binder (used via `g.intro n`).
- **`withTransparency`**: sets transparency level for type inspection.
- **`Term.addLocalVarInfo`**: attaches local variable info for error reporting / elaboration.
- **`TermElabM` monad stack**: includes `getRef`, `withMainContext`, `checkNotAssigned`, `replaceMainGoal`.
- **`mkSimpContext`**: builds a full simp context from parsed options (`config`, `discharger`, `only`, args).
- **`eraseLocal := false`**: ensures local variables remain in context (critical for `simp_intro`’s behavior).

No heavy use of `aesop`, `ring`, or `linarith`; focused on *simp*-based simplification and *intro*-style binding.

---

#### **4. Proof Logic / Control Flow**

1. **Parse input** (`ids`, `more`, `discharger`, `only`, args).
2. **Build simp context** (`mkSimpContext`) with local variables *not* erased.
3. **Loop in `simpIntroCore`**:
   - If `ids` is empty:
     - If `more = true`, try to simplify & auto-intro `_` binders.
     - Else, simplify goal only (`done`).
   - Else, take next identifier `v` from `ids`.
4. **Inspect goal type `t`**:
   - **`letE`**: use `intro` to bind `let`-bound variable, extend context, recurse.
   - **`forallE`**:
     - If body has loose bvars → bind with `intro`, extend context, recurse.
     - Else → try to simplify the *hypothesis* using `simpLocalDecl`; if successful, recurse; else abort branch.
   - **Other**: fail unless `more ∧ ids.isEmpty`.
5. **Return updated goal(s)**: either single remaining goal or empty list (if fully solved).

> **Key insight**: Unlike `simp`, `simp_intro` *extends* the simp context *as it introduces* variables — local hypotheses become available for later simplifications.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Lean.Elab.Tactic.Simp` | Provides `mkSimpContext`, `simpTargetCore`, `simpLocalDecl`, `Simp.*` types. |
| `Mathlib.Init` | Base utilities (e.g., `Option`, `List`, monad infrastructure). |

**Scope**:  
- Part of `Mathlib.Tactic` namespace.  
- Designed for interactive theorem proving in Lean 4 (Mathlib 4).  
- Extends `simp` functionality with *intro*-style binder handling — useful for simplifying dependent types, hypotheses, and goals simultaneously.

---

### Summary

`simp_intro` is a *hybrid simplification/introduction tactic* that intelligently simplifies local hypotheses and the goal *during* variable introduction. Its core logic (`simpIntroCore`) is recursive and context-aware, leveraging `simp` infrastructure while preserving local variables for later use. It follows Lean’s standard tactic elaboration patterns and is tightly integrated with Mathlib’s simplifier framework.