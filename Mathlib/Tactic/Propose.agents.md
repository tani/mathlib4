### Technical Metadata Brief: `Mathlib.Tactic.Propose`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `proposeLemmas` | `DeclCache (DiscrTree Name)` | Global cache of lemmas indexed by discriminant tree for fast lookup by first argument type. Built during initialization. |
| `propose` | `DiscrTree Name → Expr → Array Expr → MetaM (Array (Name × Expr))` | Core search function: finds lemmas whose type unifies with `type`, using all expressions in `required` as arguments. Returns lemma names and fully applied terms. |
| `solveByElim` | `MVarId → Array MVarId → Array Expr → Array Expr → Nat → MetaM Unit` | Wrapper around `SolveByElim.solveByElim`, configured to test solutions against required expressions and enable exfalso/symm. Used to validate candidate lemma applications. |
| `have?` tactic syntax | `tactic` syntax: `"have?" "!"? ident? (" : " term)? " using " term,+` | User-facing tactic for forward reasoning: proposes lemmas using given hypotheses. Supports `have?!` variant to add results to the context. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `propose*`: Core search logic (`propose`, `proposeLemmas`)
  - `have?*`: Tactic syntax and elaboration (`have?`, `have?!`, `have!?`)
- **Suffixes**:
  - `Lemmas`: For cached lemma collections (`proposeLemmas`)
  - `Suggestion`: For adding trace/`have`-style output (`addHaveSuggestion`)
- **Pattern**:
  - `is_`, `dist_`, `mul_` etc. are *not* used here — naming is domain-specific and action-oriented (`propose`, `solveByElim`, `addHaveSuggestion`).
  - `!` suffix in `have?!`/`have!?` indicates *execution* (i.e., `have`-like behavior), while bare `have?` is *query-only*.

---

#### **3. Tactic Stack**

Frequently used tactics & utilities in this file:

| Tactic / Utility | Role |
|------------------|------|
| `withNewMCtxDepth`, `withReducible`, `preservingMCtx`, `withAssignableSyntheticOpaque` | Meta-level scoping/optimization for type inference and metavariable handling. |
| `forallMetaTelescope` | Unfold dependent function types to extract arguments. |
| `inferType`, `mkAppN`, `mkConstWithFreshMVarLevels`, `mkFreshExprMVar` | Expression construction and type inference. |
| `isDefEq` | Unification check (used to verify candidate lemma types match target). |
| `solveByElim` (custom wrapper) | Validates candidate applications against required hypotheses. |
| `trace[Tactic.propose]` | Debug tracing for lemma candidates. |
| `filterMapM`, `guard`, `try ... catch` | Control flow and error handling in monadic search. |

---

#### **4. Proof Logic / Search Strategy**

The core logic of `propose` follows this flow:

1. **Guard**: Ensure `required` is non-empty.
2. **Normalize first argument type**: Compute head-normal form of `inferType(required[0])`.
3. **Lookup candidates**: Use discriminant tree to find lemmas whose *first argument type* matches.
4. **For each candidate lemma**:
   - Introduce fresh metavariable for target type `type`.
   - Construct lemma constant with fresh level metavariables.
   - Telescopically unpack its type to get arguments.
   - Check if applying the lemma to its arguments yields a term definitional equal to `type`.
   - Filter `required` to keep only `fvar`s (local hypotheses) for use in `solveByElim`.
   - Run `solveByElim` to verify that the lemma *actually uses* all required hypotheses (via backchaining).
   - If successful, record `(lemma_name, fully applied term)`.

5. **Output**:
   - Print up to 10 suggestions as `have := f a b c`.
   - If `!` is present, actually `have`-add them to the context.

> **Key insight**: Unlike `apply?`, `propose` is *forward reasoning* — it ignores the goal and only inspects the *types* of hypotheses to find lemmas that consume them.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Lean.Meta.Tactic.TryThis`, `Lean.Meta.Tactic.SolveByElim` | For suggestion display and lemma validation. |
| `Mathlib.Lean.Expr.Basic`, `Mathlib.Lean.Meta`, `Mathlib.Lean.Meta.Basic` | Core expression and metavariable machinery. |
| `Batteries.Util.Cache` | For `DeclCache`, the global lemma cache. |
| `Mathlib.Tactic.Core` | Basic tactic infrastructure (e.g., `getLocalHyps`, `replaceMainGoal`). |
| `Lean.Parser.Tactic`, `Elab.Tactic`, `Tactic` | Syntax parsing and elaboration. |

> **Scope**: This module is part of **Mathlib’s tactic infrastructure**, specifically for *interactive lemma search* in forward style. It complements `apply?` and `solveByElim`, and is intended for *exploratory use*, not final proofs.

--- 

Let me know if you'd like a formalized spec or a diagram of the search pipeline.