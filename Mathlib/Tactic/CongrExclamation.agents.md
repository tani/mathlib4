### Technical Brief: `congr!` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Congr!.Config` | `Structure` | Configuration for the `congr!` tactic, controlling behavior like transparency, argument limits, preference for LHS/RHS, etc. |
| `Congr!.Config.unfoldSameFun` | `def` | A predefined config variant that mimics `congr`'s aggressive unfolding and same-function behavior. |
| `Congr!.Config.numArgsOk` | `def` | Checks if a given number of arguments is within the `maxArgs` limit. |
| `Congr!.Config.maxArgsFor` | `def` | Computes how many of `numArgs` should be considered, respecting `maxArgs`. |
| `applyCongrThm?` | `private def` | Asserts a congruence theorem as a hypothesis and applies it, returning new goals. |
| `Congr!.plausiblyEqualTypes` | `def` | Heuristic to decide whether two types *might* be equal (e.g., `Fin n = Fin m`, but not `ℕ = ℤ`). |
| `Lean.MVarId.smartHCongr?` | `partial def` | Advanced congruence generator: tries both sides, uses `mkRichHCongr`, supports HEq, and handles dependencies. |
| `Lean.MVarId.congrSimp?` | `def` | Uses `mkCongrSimpNArgs` to generate congruence lemmas like the `congr` tactic, with config support. |
| `Lean.MVarId.userCongr?` | `def` | Tries user-provided congruence lemmas (from `simp` congruence theorems database). |
| `Lean.MVarId.congrPi?` | `def` | Applies `pi_congr` for function space equalities. |
| `Lean.MVarId.obviousFunext?` | `def` | Applies `funext` only if at least one side is a lambda. |
| `Lean.MVarId.obviousHfunext?` | `def` | Applies `hfunext` for heterogeneous equality of lambdas. |
| `Lean.MVarId.congrImplies?'` | `def` | Applies `implies_congr'`, a non-dependent version of `pi_congr`. |
| `Lean.MVarId.subsingletonHelim?` | `def` | Uses `FastSubsingleton.helim` to reduce `HEq` goals to equality of types. |
| `Lean.MVarId.beqInst?` | `def` | Applies `lawful_beq_subsingleton` to prove `BEq` instance equalities. |
| `Lean.MVarId.introsClean` | `partial def` | Introduces hypotheses, cleans trivial ones (`x = x`, `HEq x x`, etc.), and respects `rcases` patterns. |
| `Lean.MVarId.preCongr!` | `def` | Preprocessing step: converts `HEq`/`Iff` to `Eq`, tries closing goals via `assumption`, `rfl`, or subsingleton reasoning. |
| `Lean.MVarId.congrCore!` | `def` | Main entry point: runs a sequence of congruence strategies (`congrPasses!`) in order. |
| `Lean.MVarId.congrPasses!` | `def` | Ordered list of strategies: user congruence, `smartHCongr`, `congrSimp`, subsingleton, `BEq`, `funext`, etc. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `congr!` — main tactic name (e.g., `congrCore!`, `congrPasses!`, `Congr!.Config`)
  - `smartH`, `congrSimp`, `userCongr`, `obviousFunext`, `subsingletonHelim`, `beqInst` — strategy names
  - `plausiblyEqualTypes`, `numArgsOk`, `maxArgsFor` — helper functions
- **Suffixes**:
  - `?` — returns `Option (List MVarId)` (e.g., `smartHCongr?`, `userCongr?`)
  - `!` — main tactic entry point or destructive action (e.g., `congrCore!`, `preCongr!`, `introsClean`)
  - `'` — variant of a theorem/tactic (e.g., `implies_congr'`)
- **Internal Helpers**:
  - `forSide`, `loop`, `heqImpOfEqImp`, `eqImpOfIffImp`, `isTrivialType` — internal helpers in `introsClean`, `smartHCongr?`, etc.

---

#### **3. Tactic Stack**

Frequently used tactics & metaprogramming utilities:

| Tactic / Utility | Usage |
|------------------|-------|
| `withTransparency`, `withReducible`, `withNewMCtxDepth` | Control transparency in unification and type inference. |
| `observe?`, `commitWhenSome?` | Try a computation and backtrack if it fails; used in `congr!` strategy loops. |
| `mkFreshUserName`, `mvarId.assert`, `intro1P`, `apply` | Hypothesis introduction and application. |
| `mkRichHCongr`, `mkCongrSimpCore?`, `mkCongrSimpNArgs` | Generate congruence theorems from function info. |
| `assumptionCore`, `refl`, `proofIrrelHeq`, `fastSubsingletonElim` | Goal-closing tactics used in `preCongr!`. |
| `rintro`, `rcasesPat` | Pattern-based introduction in `introsClean`. |
| `mkAppM`, `mkConst`, `instantiateMVars`, `cleanupAnnotations` | Low-level expression manipulation. |

---

#### **4. Proof Logic / Strategy Flow**

The `congr!` tactic follows a **multi-pass, backtracking strategy**:

1. **Preprocessing** (`preCongr!`):
   - Converts `HEq` → `Eq`, `Iff` → `Eq`.
   - Tries to close goal via `assumption`, `rfl`, or subsingleton reasoning.

2. **Main Loop** (`congrCore!`):
   - Runs strategies in order from `congrPasses!` until one succeeds:
     - **User-provided lemmas** (`userCongr?`)
     - **High-level `hcongr`** (`smartHCongr?`) — uses both sides, respects dependencies, `plausiblyEqualTypes`
     - **`congr`-style lemmas** (`congrSimp?`) — if `useCongrSimp = true`
     - **Subsingleton reasoning** (`subsingletonHelim?`)
     - **`BEq` handling** (`beqInst?`)
     - **Function extensionality** (`obviousFunext?`, `obviousHfunext?`)
     - **Implication/forall congruence** (`congrImplies?'`, `congrPi?`)

3. **Postprocessing**:
   - If no congruence applies, tries closing remaining goals via `assumption`, `rfl`, etc. (`closePost` config).
   - If `etaExpand = true`, applies eta expansion as a final pass.

4. **Heuristics**:
   - `plausiblyEqualTypes`: prevents spurious type equalities (e.g., `ℕ = ℤ`).
   - `maxArgs`, `partialApp`, `sameFun`: control how many arguments to decompose and whether to allow different functions.
   - `typeEqs`: whether to allow congruence on type arguments that aren’t obviously equal.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Lean.Elab.Tactic.Config` | Tactic configuration infrastructure. |
| `Lean.Elab.Tactic.RCases` | Pattern-based introduction (`rintro`). |
| `Lean.Meta.Tactic.Assumption`, `Lean.Meta.Tactic.Rfl` | Goal-closing tactics (`assumption`, `rfl`). |
| `Mathlib.Lean.Meta.CongrTheorems` | Congruence theorem generation (`mkRichHCongr`, `mkCongrSimpCore?`). |
| `Mathlib.Logic.Basic` | Basic logic utilities (e.g., `funext`, `propext`, `HEq` lemmas). |

> **Note**: `congr!` is used internally by `convert` and `convert_to`, and is more powerful than the legacy `congr` tactic.

--- 

Let me know if you'd like a visual flowchart or a formalized summary in Lean syntax.