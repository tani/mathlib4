### Technical Brief: `apply_fun` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `applyFunHyp` | `Term → Option Term → FVarId → MVarId → TacticM (List MVarId)`<br>Applies a function `f` to a local hypothesis `h` of type `a = b`, `a ≤ b`, `a < b`, or `a ≠ b`, producing a new hypothesis `f a ⋯ f b` and possibly new goals (e.g., `Monotone f`, `StrictMono f`, `Injective f`). |
| `applyFunTarget` | `Term → Option Term → MVarId → TacticM (List MVarId)`<br>Applies `f` to the main goal, handling equality, inequality, and negated equality. For `a = b`, creates a subsidiary `Injective f` goal; for order relations, uses `ApplyFun.le_of_le`, `lt_of_lt`, etc. |
| `maybeProveInjective` | `Expr → Option Expr → MetaM Bool`<br>Attempts to solve an `Injective f` metavariable using: (a) `using` clause, (b) assumptions, or (c) `Equiv.injective`. Returns `true` on success. |
| `ApplyFun.le_of_le`, `ApplyFun.lt_of_lt` | Theorems used for order-preserving applications: <br>`OrderIso.le_iff_le` and `OrderIso.lt_iff_lt` (forward directions aliased). Used when `f` is an `OrderIso`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `applyFun*`: All internal functions start with `applyFun`, e.g., `applyFunHyp`, `applyFunTarget`, `applyFunTargetFailure`.
- **Suffixes**:
  - `_of_*`: Theorems like `le_of_le`, `lt_of_lt`, `ne_of_apply_ne` follow pattern `conclusion_of_source`.
  - `*Injective`, `*Monotone`, `*StrictMono`: Goal types for subsidiary obligations.
- **Internal metavariable naming**:
  - `ginj`, `g'`, `gDefer`: Standard metavariable names for injectivity, transformed goal, deferred goal respectively.
- **Tag suffixes**:
  - `` `apply_fun ``, `` `inj ``: Used in `withCollectingNewGoalsFrom` to tag generated subgoals.

---

#### **3. Tactic Stack**

Frequently used tactics and elaboration utilities:

| Tactic / Utility | Role |
|------------------|------|
| `elabTerm`, `Term.elabTerm`, `Term.elabAppArgs` | Term elaboration for function `f` and its application to terms. |
| `whnfR`, `instantiateMVars`, `isDefEq` | Normalization and type-checking (e.g., to detect `Eq`, `LE.le`, etc.). |
| `mkEq`, `mkAppM'`, `mkFreshExprMVar` | Goal construction and proof term generation. |
| `congrN!`, `assign`, `mkFreshTypeMVar` | Congruence closure and metavariable assignment. |
| `assumptionCore`, `apply`, `observe?` | Goal solving: assumptions, applying lemmas, and observation-based backtracking. |
| `withCollectingNewGoalsFrom`, `withoutRecover`, `runTermElab` | Goal management and error handling during term elaboration. |
| `maybeProveInjective`, `maybeProveMonotone` (implicit) | Custom proof search for subsidiary goals (currently only `Injective` is implemented). |

---

#### **4. Proof Logic / Strategy**

The tactic follows a **case analysis on the hypothesis or goal type**, then:

1. **Pattern match** on the head symbol (`Eq`, `Not`, `LE.le`, `LT.lt`, etc.).
2. **Elaborate `f`** and construct `f lhs`, `f rhs`.
3. **Check well-typedness** of resulting terms (e.g., via `isDefEq` on types).
4. **Generate new goal(s)** depending on the relation:
   - `=` → `Injective f`
   - `≤` → `Monotone f`
   - `<` → `StrictMono f`
   - `≠` → `Injective f`
5. **Attempt to discharge subsidiary goals**:
   - Use `using P` if provided.
   - Try `assumptionCore`.
   - Try `Equiv.injective` (for `Injective` only).
   - *TODO*: Use `mono` when ported (commented in code).
6. **Replace hypothesis or goal** with the transformed statement.

**Inductive structure**:
- No explicit induction — relies on **type-directed case analysis** and metavariable resolution.
- Uses **deferred goal assignment** (`gDefer`) to collect all generated subgoals before final assignment.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Lean.Expr.Basic` | Core expression manipulation (e.g., `getAppFnArgs`, `headBeta`). |
| `Mathlib.Order.Monotone.Basic` | Definitions of `Monotone`, `StrictMono`, and related lemmas. |
| `Mathlib.Order.Hom.Basic` | Order-preserving maps and isomorphisms (`OrderIso`). |

**Domain scope**:  
The tactic operates in contexts involving:
- Equality (`Eq`)
- Inequality (`LE.le`, `LT.lt`)
- Negated equality (`Not (Eq _)`)
- Order-theoretic properties (`Monotone`, `StrictMono`, `Injective`, `OrderIso`)

**Notable dependencies**:
- `Function.Injective`, `StrictMono`, `Monotone`
- `OrderIso.le_iff_le`, `OrderIso.lt_iff_lt` (aliased as `ApplyFun.le_of_le`, etc.)

---

### Summary

The `apply_fun` tactic is a **type-driven, goal-sensitive** tool for applying functions to equalities and inequalities, with automatic generation of monotonicity/injectivity obligations. It leverages Lean’s metavariable system and elaboration infrastructure to support flexible usage (e.g., `using`, placeholders), and is designed to integrate with future automation like `mono`. Its implementation is modular, with clear separation between hypothesis and target handling, and is tightly coupled to order-theoretic and functional reasoning in Mathlib.