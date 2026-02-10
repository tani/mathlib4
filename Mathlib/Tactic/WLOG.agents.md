### Technical Brief: `wlog` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `WLOGResult` | Structure representing the result of applying `wlog`. Contains: <br> • `reductionGoal`: goal requiring proof that `¬P` reduces to `P` (has assumptions `h : ¬P` and `H : P → goal`). <br> • `reductionFVarIds`: pair `(H, h)` of `FVarId`s for the reduction goal. <br> • `hypothesisGoal`: original goal extended with `h : P`. <br> • `hypothesisFVarId`: `FVarId` of `h`. <br> • `revertedFVarIds`: array of `FVarId`s reverted to form `H`. |
| `wlog` (function) | `MVarId → Option Name → Expr → Option (TSyntaxArray `ident`) → Option Name → TacticM WLOGResult` <br> Core implementation of the *without loss of generality* transformation. Constructs two goals: one assuming `P`, and one requiring reduction of `¬P` to `P`. |
| `wlog` (syntax rule) | Syntax definition for the tactic: `wlog h : P [generalizing x y*] [with H]`. Parses user input and calls the core `wlog` function. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `reduction*`: refers to the side goal where `¬P` is assumed and reduction is to be shown.
  - `hypothesis*`: refers to the main branch where `P` is assumed.
  - `FVarId`: used consistently for *free variable IDs* (i.e., hypothesis identifiers).
  - `H`: default name for the “sufficiency” claim (`P → goal`), overridable via `with H`.
  - `h`: default name for the new hypothesis (`P` or `¬P`), overridable via `wlog h : P`.
  - `inaccessible`: used when `h` is omitted — hypotheses are made inaccessible (no user-facing names).

- **Pattern**:
  - `*Goal`: goal identifiers.
  - `*FVarId`: hypothesis identifiers.
  - `revertedFVarIds`: tracks which hypotheses were reverted to generalize the claim.

---

#### **3. Tactic Stack**

The `wlog` tactic uses the following **core tactics and utilities**:

| Tactic / Utility | Role |
|------------------|------|
| `withMainContext` | Ensures tactic runs in the main context. |
| `getMainGoal`, `getFVarIdsAt`, `intro1`, `intro1P`, `introNP`, `byCases`, `assign`, `clear`, `assertHypotheses` | Standard Lean metaprogramming tactics for goal manipulation. |
| `mkAppN`, `mkFreshExprSyntheticOpaqueMVar`, `mkAuxMVarType` | Low-level expression construction for building `H` and applying it. |
| `collectForwardDeps`, `filterOutImplementationDetails` | Dependency analysis to determine which hypotheses to revert. |
| `ensureHasNoMVars` | Ensures no metavariables remain after assignment. |
| `withFreshCache`, `liftMkBindingM` | Manages metavariable creation and caching. |

No high-level automation (e.g., `aesop`, `ring`, `simp`) is used — `wlog` is a *structural* tactic, not a solver.

---

#### **4. Proof Logic / Execution Flow**

The `wlog` transformation follows this logical pattern:

1. **Input Parsing**: Parse `h`, `P`, optional `xs` (for `generalizing`), and optional `H`.
2. **Compute sufficiency claim `H`**:
   - Build type `H : (∀ xs, P → goal)` (or `P → goal` if no `xs`).
   - Revert relevant hypotheses (`xs` or all if none given) to generalize `H`.
3. **Construct two goals**:
   - **`hypothesisGoal`**: original goal + assumption `h : P`.
   - **`reductionGoal`**: original goal generalized over `xs`, plus:
     - `h : ¬P`
     - `H : P → goal`
4. **Split `reductionGoal`** via `byCases P`:
   - One branch (`easyGoal`) has `h : P`, solved by applying `H` to `h` and reverted hypotheses.
   - The other branch (`reductionGoal`) keeps `h : ¬P`, to be handled by user (e.g., via symmetry).
5. **Return goals** in order `[reductionGoal, hypothesisGoal]` so the user sees the reduction goal first.

**Typical usage pattern**:
- User proves `P` case directly.
- For `¬P` case, uses symmetry (e.g., `symm at *`, `rw [symm_apply_eq]`) to reduce to `P` case.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Tactic.Core` | Core tactics and utilities (e.g., `getMainGoal`, `intro1`, `byCases`). |
| `Lean.Meta.Tactic.Cases` | Provides `byCases`, used to split on `P`. |
| `Lean.Meta.Tactic.*` (via `open`) | Tactics like `introNP`, `clear`, `assertHypotheses`, `assign`. |
| `Lean.MetavarContext.MkBinding` | For `mkAuxMVarType`, `mkFreshExprSyntheticOpaqueMVar`, and metavariable handling. |

**Scope**: This is a *low-level metaprogramming* tactic in **Mathlib**, not a standalone library. It assumes a full Lean 4 environment with metavariable and tactic state support.

---

### Summary

The `wlog` tactic implements the *without loss of generality* proof technique by splitting a goal into two branches: one assuming `P`, and one requiring reduction of `¬P` to `P`. It is highly structured, uses precise metavariable and hypothesis management, and is designed for symmetry-based arguments (e.g., ordering, symmetry of relations). Its design prioritizes correctness and flexibility over automation — the user must still supply the reduction step in the `¬P` branch.