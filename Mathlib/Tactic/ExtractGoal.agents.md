Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `extract_goal` Tactic**

#### **1. Key Definitions & Theorems**
| Name | Type / Purpose |
|------|----------------|
| `extractGoal` | Syntax rule (`tactic`) implementing the `extract_goal` tactic. |
| `config` | Syntax type: `star` (`*`) or list of identifiers (`ident*`). Controls which local context variables to preserve. |
| `star` | Syntax constant: `"*"` — indicates *include all* local context. |
| `extracted_*` (e.g., `extracted_1`) | Auto-generated `axiomDecl` (via `Declaration.axiomDecl`) representing the extracted goal as a theorem/definition. |

**Purpose of `extract_goal`**:  
Formats the current tactic goal as a standalone, copy-pasteable theorem/definition, optionally cleaning the local context to include only *relevant* variables (those occurring in the goal or its dependencies), unless `*` is used.

---

#### **2. Naming Conventions**
- **Prefixes / Suffixes**:
  - `extracted_` + number (e.g., `extracted_1`, `extracted_2`) — auto-generated names for extracted theorems/definitions.
  - `is_` / `mul_` / `dist_` — *not used* in this file; naming is domain-agnostic and auto-generated.
- **Syntax identifiers**:
  - `config`, `star`, `extractGoal` — internal syntax constructors.
  - `cfg`, `name`, `fvars`, `ty`, `g`, `msg` — local variables in tactic implementation.

---

#### **3. Tactic Stack**
The tactic uses the following Lean metaprogramming utilities (not tactics per se, but core components):
| Component | Role |
|----------|------|
| `getMainGoal`, `getDecl`, `getFVarIds`, `getType`, `instantiateMVars`, `renameInaccessibleFVars`, `revert`, `levelMVarToParam`, `collectLevelParams`, `getLevelNames` | Core `Meta`/`Tactic`/`Term` API for goal introspection and transformation. |
| `withoutModifyingEnv`, `withoutModifyingState` | Ensures idempotent execution. |
| `addAndCompile`, `MessageData.signature`, `logInfo` | Output generation and compilation. |
| `throwUnsupportedSyntax`, `throwError` | Error handling. |
| `consumeMData`, `isConstOf` | Used to detect `False` targets. |

**No standard tactics** (e.g., `simp`, `rw`, `aesop`) are used — this is a *meta-level* pretty-printing and declaration-generation utility.

---

#### **4. Proof Logic / Execution Flow**
1. **Parse configuration** (`cfg`, optional `name`).
2. **Generate or use provided name** for extracted theorem.
3. **Process goal**:
   - If `*`: keep full context.
   - Else if empty: clean context (`cleanup`) *unless* goal is `False` (preserve all).
   - Else: clean context w.r.t. given variables (`cleanup (toPreserve := …)`).
4. **Normalize goal**:
   - Rename inaccessible variables (`renameInaccessibleFVars`).
   - Revert all remaining local constants (`revert` with `clearAuxDeclsInsteadOfRevert := true`).
   - Instantiate metavariables; error if any remain.
   - Convert level metavariables to parameters (`levelMVarToParam`).
5. **Extract level parameters** used in the goal.
6. **Declare a new axiom/axiomDecl** (as `theorem` if proposition, `def` otherwise).
7. **Pretty-print and log** the resulting theorem signature.

**Key logic**:  
- *Relevance* is defined via dependency analysis (used in `cleanup`).
- *Context cleanup* avoids over-constraining extracted goals (e.g., irrelevant hypotheses).
- *Metavariables* are disallowed — extracted goals must be fully closed.

---

#### **5. Imports & Scope**
| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization. |
| `Lean.Elab.Tactic.ElabTerm` | Syntax elaboration for tactic terms. |
| `Lean.Meta.Tactic.Cleanup` | Provides `cleanup` for context pruning. |
| `Lean.PrettyPrinter` | Used for pretty-printing declarations (via `MessageData.signature`). |
| `Batteries.Lean.Meta.Inaccessible` | For `renameInaccessibleFVars`. |

**Scope**:  
- Part of `Mathlib.Tactic.ExtractGoal`.
- Designed for *interactive* use in tactic blocks (e.g., debugging, MWE generation).
- Not intended for formal proof use — only for *external* reproducibility.

---

### **Caveats (from docstring)**
- Output depends on **imports** and **pretty-printing options** (`pp.*`).
- May produce non-type-checking or ambiguous statements (e.g., uninterpreted functions, missing typeclass instances).
- `set_option pp.all true in extract_goal` often improves fidelity.
- Not robust for *all* goals — especially those involving implicit coercions, metavariables, or high-level abstractions (e.g., polynomials with implicit coefficients).

--- 

Let me know if you'd like a formalized spec or a minimal test suite for this tactic.