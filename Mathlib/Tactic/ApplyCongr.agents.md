### Technical Metadata Brief: `apply_congr` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Lean.Elab.Tactic.applyCongr` | A `TacticM Unit` function implementing the core logic of `apply_congr`. It attempts to apply a user-specified or automatically inferred `@[congr]` lemma to the left-hand side of the current `conv` goal. |
| `@[congr]` attribute | A marker used on lemmas (e.g., `Finset.sum_congr`) to indicate they are suitable for congruence reasoning in `conv` mode. |
| `getSimpCongrTheorems` | A function retrieving all lemmas tagged with `@[congr]`, indexed by the head constant of their left-hand side. |
| `cleanupAnnotations` | A utility to strip annotation metadata (e.g., `@`, `@_`) from expressions before analysis. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `apply_`: Indicates application of a lemma (e.g., `applyCongr`, `apply_congr`).
  - `congr`: Used for congruence-related functionality (`applyCongr`, `getSimpCongrTheorems`).
  - `conv`: Indicates usage within *conv mode* (e.g., `getLhs`, `setLhs`, `getGoal`, etc.).
- **Syntax Name**: `(name := Lean.Parser.Tactic.applyCongr)` — follows Lean’s naming convention for tactic parsers.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities in this file:

| Tactic / Utility | Role |
|------------------|------|
| `getAppFn`, `getLhs`, `instantiateMVars`, `cleanupAnnotations` | Low-level expression introspection in `conv` mode. |
| `mkConstWithFreshMVarLevels` | Ensures lemma constants are well-typed with fresh metavariables. |
| `liftMetaTactic`, `liftM` | Bridge between `TacticM` and `MetaM` monads. |
| `intros` | Applied to new subgoals to introduce hypotheses; required for `apply_congr` to succeed. |
| `firstM`, `mapM`, `map` | Monadic iteration over lemmas or goals. |
| `throwError` | Used for error handling (e.g., no matching lemmas, invalid LHS shape). |

No high-level automation tactics like `aesop`, `ring`, or `simp` appear *in this file*, but `apply_congr` is designed to *enable* their use in subsequent steps (e.g., `simp [*]` in the example).

---

#### **4. Proof Logic / Operational Flow**

The logic of `apply_congr` follows this sequence:

1. **Parse Input**: Accept optional user-provided lemma `e`.
2. **Extract LHS Head Constant**: Ensure the left-hand side of the current `conv` goal is an application of a constant (`const lhsFun _`).
3. **Select Candidate Lemmas**:
   - If `e` is provided: use `[e]`.
   - Else: fetch all `@[congr]` lemmas whose LHS head matches `lhsFun`.
4. **Fail if Empty**: No applicable lemmas → error.
5. **Apply Each Lemma** (in order):
   - Use `mainGoal.apply congrTheoremExpr` to generate new subgoals.
   - For each new goal, run `intros` to introduce hypotheses.
   - Fail if any resulting goal is not an equation with a metavariable on the RHS (i.e., not `conv`-compatible).
6. **Success on First Valid Application**: `firstM` ensures only the first successful application is kept.

> **Key Insight**: The tactic is *not* exhaustive — it stops at the first lemma that applies and produces `conv`-compatible subgoals.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Tactic.Conv` | Provides infrastructure for `conv` mode (e.g., `getLhs`, `setLhs`, `intros`). |
| `Lean.Expr`, `Lean.Elab.Tactic`, `Lean.Meta`, `Lean.Parser.Tactic` | Core Lean internals for expression manipulation, tactic elaboration, and parsing. |

> **Domain Scope**: This module is part of **Mathlib**, specifically targeting *conv mode rewriting*, especially for structured contexts like `Finset.sum`, where hypotheses about membership (`x ∈ S`) are needed to justify rewrites.

---

### Summary

`apply_congr` is a *conv-mode* tactic that enhances rewriting by leveraging `@[congr]` lemmas — especially useful when `congr` alone yields insufficient hypotheses. It is foundational for advanced rewriting in summations, products, and other indexed constructions where context (e.g., domain membership) matters. Its design reflects Lean’s emphasis on *modular, composable tactics* for equational reasoning.