**Technical Metadata Brief: `Mathlib.Meta.EvalExpr`**

---

### **1. Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|---------------|---------|
| `eval%` | Syntax rule `(name := eval_expr) "eval% " term : term` | Introduces a term syntax for compile-time evaluation and injection of expressions. |
| `elabEvalExpr` | `Lean.Elab.Term.TermElab` | Elaborator for `eval% x`: elaborates `x`, synthesizes its type, constructs a `Lean.toExpr` application, and uses `Meta.evalExpr` to evaluate `x` at compile time in the interpreter. |
| `Lean.toExpr` | `[ToExpr α] → α → Expr` | Typeclass-based converter from a value to an `Expr`, required for interpolation. |
| `Meta.evalExpr` | `Expr → Expr → Expr → MetaM Expr` | Evaluates a term in the Lean interpreter (here specialized to `q(Expr)`), with safety mode `.unsafe`. |

---

### **2. Naming Conventions**

- **Prefix `eval%`**: Indicates compile-time evaluation and interpolation.
- **Syntax name `eval_expr`**: Matches the syntax token and function name pattern (`elabEvalExpr`).
- **Suffix `_expr`**: Used for syntax/elaborator pairs dealing with expression-level operations (`eval_expr`, `elabEvalExpr`).
- **`stx`**: Standard variable name for syntax input in elaborators.

---

### **3. Tactic / Elaborator Stack**

- **Core elaboration tactics**:
  - `Lean.Elab.Term.elabTermAndSynthesize`
  - `instantiateMVars`
  - `Meta.mkAppM` (to build `Lean.toExpr e`)
  - `Meta.evalExpr` (with `safety := .unsafe`)
- **Error handling**:
  - `Elab.throwUnsupportedSyntax` for unsupported syntax forms.

*Note:* No high-level tactics (`simp`, `rw`, `aesop`, etc.) are used—this is a low-level term elaborator.

---

### **4. Proof Logic / Elaboration Flow**

1. Parse syntax `eval% $stx`.
2. Elaborate `$stx` to a term `e` with type synthesis.
3. Instantiate metavariables in `e`.
4. Construct the application `Lean.toExpr e` via `mkAppM`.
5. Use `Meta.evalExpr` to evaluate `e` at compile time (unsafe mode).
6. Return the resulting `Expr`, which becomes the interpolated value in the source.

*No proof obligations or tactic mode involved*—this is purely a compile-time term transformation.

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Provides foundational definitions and utilities (likely for `Meta`, `Elab`, `Expr`, etc.). |
| `Qq.Macro` | Enables quasiquotation (`q(...)`) used in `q(Expr)` for type-level quoting. |

**Domain scope**: Meta-programming / compile-time evaluation in Lean 4, specifically for embedding runtime-evaluated expressions into type-correct terms.

--- 

Let me know if you'd like a formalized spec or a test suite sketch for this elaborator.