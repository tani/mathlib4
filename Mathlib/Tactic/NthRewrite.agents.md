### Technical Metadata Brief: `nth_rewrite` / `nth_rw` Tactic

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `nth_rewrite` | A tactic variant of `rewrite` that performs *only the `n₁, ..., nₖ`-th occurrence(s)* of specified rewrites, in order of precedence. Accepts multiple occurrence indices and rewrite rules. |
| `nth_rw` | A macro wrapper around `nth_rewrite` that additionally attempts to close the goal via `rfl` after rewriting (like `rw`). |
| `evalNthRewriteSeq` | Implementation function for `nth_rewrite`, parsing occurrence numbers and rewrite rules, constructing an `Occurrences.pos` filter, and delegating to `rewriteLocalDecl` / `rewriteTarget`. |
| `Occurrences.pos` | Internal representation of *positive* occurrence indices (1-based), used to restrict rewrite targets to specific positions. |

> **Note**: No theorems are proven in this file — it is purely a *tactic implementation*.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `nth_` — indicates *n-th occurrence* semantics (e.g., `nth_rewrite`, `nth_rw`).
- **Suffixes**:
  - `Seq` — used for sequence-based syntax (e.g., `nthRewriteSeq`, `nthRwSeq`), indicating support for multiple occurrence numbers and rewrite rules.
- **Internal naming**:
  - `evalNthRewriteSeq` — follows Lean’s `eval*` convention for tactic implementations.
  - `nthRwSeq`, `nthRewriteSeq` — macro/syntax names follow Lean’s `*Seq` pattern for multi-element tactic syntax.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities in this file:

| Tactic / Utility | Role |
|------------------|------|
| `withRWRulesSeq` | Core helper for sequencing rewrite rules (from `Lean.Elab.Tactic.Rewrite`). |
| `withLocation` | Applies rewrite to local context (`rewriteLocalDecl`) or goal (`rewriteTarget`) based on `location`. |
| `rewriteLocalDecl`, `rewriteTarget` | Low-level rewrite functions used internally. |
| `expandOptLocation`, `mkOptionalNode` | Helper utilities for parsing optional `at *` / `at [h₁, h₂]` location specifiers. |
| `elabRewriteConfig` | Elaborates rewrite configuration (e.g., `only`, `as`, `eqns`, etc.). |
| `with_annotate_state`, `try`, `rfl` | Used in `nth_rw` macro to annotate state and attempt closure. |
| `throwTacticEx`, `throwUnsupportedSyntax` | Error handling. |

---

#### **4. Proof Logic / Execution Flow**

The tactic follows this logical flow:

1. **Syntax Parsing**:
   - Extracts optional config (`cfg`), one or more occurrence numbers (`n*`), rewrite rules (`rules`), and optional location (`loc`).
2. **Occurrence Encoding**:
   - Converts occurrence numbers (`n₁, ..., nₖ`) into a list of positive integers.
   - Wraps them in `Occurrences.pos` to restrict rewrite targets.
3. **Rule Sequencing**:
   - Uses `withRWRulesSeq` to apply each rewrite rule in order.
   - For each rule, applies rewrite only to the specified occurrence(s), respecting precedence order.
4. **Location Handling**:
   - Applies rewrite to local hypotheses (`at h`) or goal (`at *`) depending on `location`.
5. **Failure Handling**:
   - Throws error if no matching occurrence is found.
6. **`nth_rw` Extension**:
   - After `nth_rewrite`, attempts `rfl` to close the goal (if reflexive equality remains).

> **Key behavior**: Occurrences are counted *left-to-right in precedence order*, and newly introduced terms *do* count as new occurrences for subsequent rewrites in the same sequence.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean + Mathlib initialization (e.g., basic types, monads, meta-programming utilities). |
| `Lean.Elab.Tactic.Rewrite` | Provides core rewrite infrastructure: `withRWRulesSeq`, `rewriteLocalDecl`, `rewriteTarget`, `elabRewriteConfig`, etc. |

> **Note**: No external Mathlib theorems or definitions are imported — this is a *pure tactic implementation*.

--- 

Let me know if you'd like a formalized specification of `nth_rewrite` semantics or a test suite summary.