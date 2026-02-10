Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `apply at` Tactic Implementation**

#### **1. Key Definitions & Theorems**
- **`apply t at i`**  
  - **Type**: Elaborated tactic command (`elab "apply" t:term "at" i:ident : tactic => ...`)  
  - **Purpose**: Performs *forward reasoning* by applying a function `t` to a hypothesis `i`. If `t` has type `α₁ → ⋯ → αᵢ → ⋯ → αₙ` and `i : αᵢ`, the tactic replaces `i`’s type with `αᵢ₊₁ → ⋯ → αₙ`, generating new goals for missing arguments `α₁, …, αᵢ₋₁`.

#### **2. Naming Conventions**
- **Prefixes/Suffixes**:
  - `is_`, `mul_`, `dist_`, etc., are *not* present — this is a *tactic* definition, not a theorem/lemma.
  - The tactic name itself follows Lean’s standard command syntax: `"apply" ... "at" ...`.
  - Internal identifiers use camelCase (`ldecl`, `mvs`, `bis`, `tp`, `mainGoal`, `fvarId`, `userName`), typical for Lean tactic implementations.

#### **3. Tactic Stack**
- **Core tactics used**:
  - `withSynthesize`: Ensures instance synthesis is attempted.
  - `withMainContext`: Runs tactic in the main context.
  - `elabTermForApply`: Elaborates the term `t` for use in `apply`.
  - `getLCtx`, `findFromUserName?`: Look up hypothesis by name.
  - `forallMetaTelescopeReducingUntilDefEq`: Computes telescope and reduces to unify types.
  - `inferInstance`: Attempts to fill implicit arguments via typeclass inference.
  - `assert`, `intro1P`, `replaceMainGoal`, `mkAppOptM'`, `tryClear`, `mvarId!`, `zip`, `push`, `toList`, `map`, `mvarId!`, `isAssigned`, `isInstImplicit`.
- **Pattern**: Heavy use of `Meta` and `Tactic` monad operations; goal manipulation via metavariables.

#### **4. Proof Logic / Execution Flow**
1. Elaborate `t` as a term for application.
2. Retrieve hypothesis `i` from the local context; error if missing.
3. Compute telescope of `t`’s type relative to `i`’s type using `forallMetaTelescopeReducingUntilDefEq`.
4. Clear original hypothesis `i` from the main goal.
5. For each metavariable in the telescope:
   - If it’s an implicit instance and not yet assigned, try to infer it.
6. Assert a new hypothesis with the remaining function type (`αᵢ₊₁ → ⋯ → αₙ`), applying `t` and the original `i`.
7. Introduce the new hypothesis (turn it into a goal).
8. Replace the main goal with:
   - The new goal (from the introduced hypothesis),
   - Plus the remaining metavariable goals (for missing arguments).

#### **5. Imports**
- `Lean.Elab.Tactic.ElabTerm`: For term elaboration in tactic context (`elabTermForApply`, etc.).
- `Mathlib.Lean.Meta.Basic`: Provides core `Meta` utilities (`inferType`, `mkAppOptM'`, `forallMetaTelescopeReducingUntilDefEq`, etc.).

---

This file implements a *forward reasoning* tactic (`apply at`) that generalizes `apply` to work directly on hypotheses, rather than the goal. It is foundational for interactive theorem proving workflows where hypotheses need to be refined via function application.