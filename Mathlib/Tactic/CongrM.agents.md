### Technical Metadata Brief: `congrm` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name / Concept | Type / Role | Purpose |
|----------------|-------------|---------|
| `congrm` tactic | `tactic` | A user-facing frontend for generating congruence proofs via pattern matching; synthesizes a `congr(...)` application from a user-provided pattern with placeholders (`?_`). |
| `congr(...)` congruence quotations | Lean syntax (`congr` antiquotations) | Core mechanism: constructs a proof of equality/bi-implication/HEq by decomposing a target equality into subgoals for corresponding subterms. |
| `Term.syntheticHole` | `SyntaxKind` | Represents `?_` or named holes like `?m`; used to identify placeholders in the pattern. |
| `liftReflToEq` / `iffOfEq` | Meta-level transformations | Converts reflexive relations (`↔`, `HEq`, `Eq`) to `Eq` for uniform handling; enables `congr` to apply to non-`Eq` goals. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `congrm` — short for *congruence with matching*.
  - `congrM` — internal tactic syntax tag (used in `initialize registerTraceClass` and `syntax` declaration).
  - `isOfKind ``Parser.Term.syntheticHole`` — checks for placeholder syntax.
  - `antiquot` / `mkAntiquotNode` — used to embed placeholders into `congr(...)` antiquotation syntax (`$(?m)`).
- **Trace class**: `Tactic.congrm` — used for debugging/trace output.

---

#### **3. Tactic Stack**

Frequently used tactics & utilities in implementation:

| Tactic / Utility | Role |
|------------------|------|
| `withMainContext` | Ensures tactic runs in the main context (not nested in a `refine` subgoal). |
| `Term.exprToSyntax` | Converts the current goal expression to syntax for type annotation in `refine`. |
| `evalTactic` | Executes generated tactic syntax (e.g., `refine ...`). |
| `liftMetaTactic` | Allows meta-level transformation of the goal (e.g., converting `↔` to `Eq`). |
| `expr.raw.replaceM` | Traverses syntax tree to rewrite synthetic holes into `$(?)` antiquotations. |
| `mkAntiquotNode` | Wraps placeholder syntax into `$(...)` form for `congr`. |
| `iffOfEq`, `liftReflToEq` | Goal preprocessing to normalize reflexive relations to `Eq`. |

---

#### **4. Proof Logic / Execution Flow**

1. **Input parsing**: User provides pattern `e` (e.g., `Nat.pred (Nat.succ ?h1) * (?h2 + ?h3)`).
2. **Placeholder transformation**:
   - Traverse syntax of `e`.
   - Replace each `?_` or `?m` with `$(?m)` (antiquoted placeholder).
   - Skip `$(...)` expressions (already user-provided proofs).
3. **Goal normalization**:
   - If goal is `↔`, `HEq`, or reflexive `R`, convert to `Eq` using `iffOfEq` + `liftReflToEq`.
4. **Apply `congr(...)`**:
   - Construct `refine (congr($(⟨pattern⟩)) : $gStx)`.
   - `congr` decomposes the goal into subgoals for each placeholder.
5. **Subgoal generation**:
   - Each placeholder `?m` yields a subgoal named `m` (or `h1`, `h2`, etc.).
   - Subgoals assert equality of corresponding subterms in `lhs` and `rhs`.

> **Pattern matching semantics**: `congrm e` matches `e` against both sides of the equality *simultaneously*, generating subgoals only where placeholders appear.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Tactic.TermCongr` | Provides `congr` antiquotation infrastructure and related utilities. |
| `Lean.Parser.Tactic`, `Lean.Elab.Tactic`, `Lean.Meta.Tactic` | Core tactic elaboration and meta-programming support. |
| `Lean.Parser.Term` | For parsing `term` syntax (e.g., `?_`, `$(...)`). |

---

### Summary

The `congrm` tactic is a high-level, pattern-driven interface to Lean’s `congr` congruence mechanism. It automates the generation of subgoals for equality proofs by matching a user-specified pattern against both sides of a target equality (or related reflexive relation), enabling concise and declarative decomposition of complex equality goals. Its implementation leverages syntax traversal, antiquotation generation, and meta-tactic lifting to unify handling of `Eq`, `↔`, and `HEq`.