### Technical Metadata Brief: `choose` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mk_sometimes` | `Level → Expr → Expr → Expr → List Expr → Expr × Expr → MetaM (Expr × Expr)` | Abstracts over propositional free variables in a chosen witness using `Function.sometimes` and `Function.sometimes_spec`. Ensures the resulting function does not depend on propositional inputs. |
| `ElimStatus` | `inductive` with constructors `success` and `failure (ts : List Expr)` | Tracks whether nonemptiness instances were successfully synthesized during `choose!`. Used to enforce correctness of `choose!` (must succeed at least once). |
| `ElimStatus.merge` | `ElimStatus → ElimStatus → ElimStatus` | Combines two `ElimStatus` values: `success` dominates; failures are concatenated. |
| `mkFreshNameFrom` | `Name → Name → CoreM Name` | Generates a fresh name if the original is `_`, otherwise returns the original. Used to preserve user-given names. |
| `choose1` | `MVarId → Bool → Option Expr → Name → MetaM (ElimStatus × Expr × MVarId)` | Core logic: transforms a goal with `∀xs, ∃a, p a` or `∀xs, p ∧ q` into a goal with a new function `d : ∀xs, a` and a proof `s : ∀xs, p (d xs)` (and similarly for conjunction). Handles propositional dependency elimination when `nondep = true`. |
| `choose1WithInfo` | `MVarId → Bool → Option Expr → TSyntax ``binderIdent → MetaM (ElimStatus × MVarId)` | Wrapper around `choose1` that parses binder identifiers and attaches local variable info. |
| `elabChoose` | `Bool → Option Expr → List (TSyntax ``binderIdent) → ElimStatus → MVarId → MetaM MVarId` | Main loop: iteratively applies `choose1` to multiple identifiers, merges statuses, and handles error reporting for `choose!`. |
| `elab_rules : tactic` | Syntax rule for `"choose" "!"? (ppSpace colGt binderIdent)+ (" using " term)?` | Elaborates the `choose` and `choose!` tactic syntax. |
| `macro_rules` | `choose!` → `choose !` | Syntactic sugar macro to support `choose!` as shorthand. |

**Key Theorems Used (via `Expr.const`):**
- `Classical.choose : ∀ {α : Sort u} {p : α → Prop}, (∃ x, p x) → α`
- `Classical.choose_spec : ∀ {α : Sort u} {p : α → Prop} (h : ∃ x, p x), p (Classical.choose h)`
- `Function.sometimes : {α : Sort u} → Nonempty α → (α → Prop) → α`
- `Function.sometimes_spec : {α : Sort u} → (p : α → Prop) → (nonemp : Nonempty α) → (val : α → α) → p (sometimes p nonemp val)`

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `mk_`: Construction functions (`mk_sometimes`, `mkFreshNameFrom`, `mkFreshExprMVar`)
  - `choose`: Core tactic logic (`choose1`, `elabChoose`)
  - `elim`: Related to dependency elimination (`ElimStatus`, `nondep`)
- **Suffixes:**
  - `_val`, `_ty`: Data and type components (`dataVal`, `specVal`, `dataTy`)
  - `_fvar`: Free variable references (`fvar`)
  - `_P`, `_p`, `_q`: Propositional components in quantified formulas
- **Identifier patterns:**
  - `h`, `h'`: Hypothesis names (user-given or auto-generated)
  - `data`, `spec`: Data and specification components of a Skolem function

---

#### **3. Tactic Stack**

Frequently used tactics and utilities:
- `withMainContext`, `withLocalDeclD`, `intro`, `intro1`, `intro1P`, `intros`
- `assert`, `clear`, `assign`, `mvarId!`, `getType`, `inferType`, `whnf`, `headBeta`
- `mkLambdaFVars`, `mkForallFVars`, `mkAppN`, `mkApp`, `mkApp2`, `mkApp3`, `mkApp4`, `mkApp7`
- `isProp`, `isProof`, `filterM`, `synthInstance?`, `replaceFVar`, `replaceFVar`
- `withTransparency .all`
- `mkFreshName`, `mkFreshUserName`, `mkFreshExprMVar`, `mkFreshExprSyntheticOpaqueMVar`
- `addLocalVarInfoForBinderIdent`
- `guard_hyp`, `guard_hyp` (used in docstring examples, not in implementation)

---

#### **4. Proof Logic / Strategy**

- **Skolemization via `Classical.choose`:**
  - Given `h : ∀ xs, ∃ a, p a`, extract a function `f : ∀ xs, a` such that `∀ xs, p (f xs)`.
  - Uses `Classical.choose` to define the function and `Classical.choose_spec` for the witness property.

- **Dependency Elimination (`choose!`):**
  - When `nondep = true`, attempts to remove dependence on propositional assumptions:
    - For each propositional assumption `y : Y` in `xs`, tries to synthesize `Nonempty Y`.
    - If successful, abstracts over `y` using `Function.sometimes` (via `mk_sometimes`).
    - Produces a function `f : ∀ (non-propositional xs), a` instead of `∀ (all xs), a`.

- **Conjunction Handling:**
  - For `h : ∀ xs, p ∧ q`, splits into two hypotheses: `h₁ : ∀ xs, p` and `h₂ : ∀ xs, q`.

- **Error Handling (`choose!`):**
  - If `nondep = true` and no `Nonempty` instances are found, accumulates failed types in `ElimStatus.failure`.
  - Throws a descriptive error if `choose!` fails to synthesize *any* nonempty instance.

- **Iterative Application:**
  - `elabChoose` loops over a list of identifiers, applying `choose1` repeatedly.
  - Merges `ElimStatus` values to ensure `choose!` succeeds at least once.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Util.Tactic` | Provides utilities for tactic writing (e.g., `withMainContext`, `mkFreshName`, `addLocalVarInfoForBinderIdent`) |
| `Mathlib.Logic.Function.Basic` | Provides `Function.sometimes`, `Function.sometimes_spec`, and related lemmas |

**No direct imports of `Classical` or `Prop`** — these are assumed via Lean’s core and Mathlib’s implicit use of classical logic (e.g., via `Classical.choose`).

---

### Summary

The `choose` tactic implements **Skolemization** for universal-existential and universal-conjunction hypotheses, supporting both standard and *dependency-eliminating* (`choose!`) variants. It leverages classical choice (`Classical.choose`) and `Function.sometimes` to construct Skolem functions while optionally removing propositional dependencies. The implementation is modular, with clear separation between parsing (`elabChoose`, `choose1WithInfo`), core logic (`choose1`), and helper utilities (`mk_sometimes`, `ElimStatus`).