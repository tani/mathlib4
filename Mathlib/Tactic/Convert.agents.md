### Technical Metadata Brief: `convert` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Lean.MVarId.convert` | `Expr → Bool → Option Nat → Congr!.Config → List (TSyntax `rcasesPat) → MVarId → MetaM (List MVarId)` | Closes a goal `g` using `Eq.mp`/`Eq.mpr` with a metavariable `v : Eq tgt src`, then generates side goals via `congrN!` on `v`. |
| `Lean.MVarId.convertLocalDecl` | `MVarId → FVarId → Expr → Bool → Option Nat → Congr!.Config → List (TSyntax `rcasesPat) → MetaM (MVarId × List MVarId)` | Updates the type of a local declaration using equality proof obligations via `congrN!`. |
| `elabTermForConvert` | `Syntax → Option Expr → TacticM (Expr × List MVarId)` | Elaborates a term for `convert`, allowing stuck metavariables as new goals. |
| `tactic.interactive.convert` | Syntax rule for `convert ...` | Interactive entry point for `convert`, parsing config, direction (`←`), term, depth (`using n`), and patterns. |
| `tactic.interactive.convert_to` | Syntax rule for `convert_to ...` | Changes target or local hypothesis type, generating equality obligations. |
| `ac_change` | Macro: `convert_to ... <;> try ac_rfl` | Rearranges/reassociates expressions (e.g., sums) using `convert_to` + `ac_rfl`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `convert` / `convert_to`: Core tactic names.
  - `is_`: Not used here.
  - `mk_`, `elab_`, `expand_`: Standard Lean elaboration prefixes (`mkFreshExprMVar`, `elabTermForConvert`, `expandRIntroPats`).
- **Suffixes**:
  - `_LocalDecl`: For operations on local hypotheses (`convertLocalDecl`).
  - `_Config`: For configuration types (`Congr!.Config`).
  - `!`: Indicates aggressive or exhaustive behavior (`congrN!`).
- **Directional markers**:
  - `symm`: Boolean flag to reverse equality direction.
  - `←`: Syntax token for reversing goal direction.

---

#### **3. Tactic Stack**

Frequently used tactics & utilities in this file:

| Tactic / Utility | Role |
|------------------|------|
| `mkFreshExprMVar` | Introduces metavariables for equality proofs. |
| `mkAppM` | Constructs applications (e.g., `Eq`, `Eq.mp`, `Eq.mpr`, `Eq.symm`). |
| `inferType`, `getType`, `replaceLocalDecl` | Type introspection and manipulation. |
| `congrN!` | Core congruence closure engine; used to solve equality goals. |
| `withCollectingNewGoalsFrom` | Collects goals generated during elaboration. |
| `withTheReader Term.Context` | Temporarily modifies context (e.g., `ignoreTCFailures := true`). |
| `Term.synthesizeSyntheticMVars` | Forces synthesis of metavariables, allowing stuck ones as goals. |
| `liftMetaTactic` | Lifts `MetaM` actions into `TacticM`. |
| `rcasesPat` expansion | Parses `with x y z` patterns for `congr!`-style matching. |

---

#### **4. Proof Logic / Strategy**

- **Core Strategy**:
  1. Infer types of goal (`tgt`) and term (`src`).
  2. Create metavariable `v : Eq tgt src` (or `Eq src tgt` if `symm = true`).
  3. Assign goal using `Eq.mp v e` (or `Eq.mpr v e`).
  4. Solve `v` using `congrN!`, generating new goals for mismatches.
- **Depth Control**:
  - `using n` limits recursion depth in `congrN! n`.
  - `using 1` → one-step congruence (e.g., `n + n + 1 = 2 * n + 1`).
  - `using 2` → two-step (e.g., `n + n = 2 * n`).
- **Local Hypothesis Updates**:
  - `convert_to ty at h`:
    - Computes `typeOld` and `typeNew`.
    - Creates `v : Eq typeOld typeNew`.
    - Replaces `h`’s type with `typeNew` using `replaceLocalDecl`.
    - Generates side goals via `congrN!` on `v`.
- **Failure Handling**:
  - Overly eager congruence can cause failure (e.g., `convert h` on `p 0 : p 1` where `p n := True`).
  - Depth limiting (`using 1`) avoids this.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.CongrExclamation` | Provides `congrN!`, `Congr!.Config`, and pattern parsing (`rcasesPat`). |
| `Lean.Meta`, `Lean.Elab.Tactic` | Core elaboration and metavariable machinery. |
| `Lean.Elab.Tactic.RCases` | Expands `rintro`/`rcases` patterns for `with` clause. |

---

### Summary

The `convert` family of tactics (`convert`, `convert_to`, `ac_change`) provides a flexible way to adapt proof terms to slightly mismatched goals by generating equality obligations solved via `congr!`. It is especially useful when definitional equality fails but propositional equality holds, and it supports fine-grained control over congruence depth and configuration. Its design leverages Lean’s metavariable and tactic infrastructure to integrate seamlessly with existing proof state manipulation.