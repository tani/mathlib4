### Technical Metadata Brief: `linear_combination` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Expanded` | Inductive type representing the result of expanding a linear combination expression: either a proof of an (in)equality (`proof`) or a constant value (`const`). |
| `rescale` | Function implementing uniform handling of multiplication/division of (in)equalities by a constant `c`, using positivity/nonnegativity proofs from `Meta.Positivity`. Takes a parameter `lems : Ineq.WithStrictness → Name` specifying lemmas for the four cases (eq, le, lt, lt with non-strict fallback). |
| `expandLinearCombo` | Partial recursive macro-expansion function that parses and expands expressions like `2 * h1 - h2 / 3` into a normalized `Expanded` form, handling `+`, `-`, `*`, `/`, `•`, and constants. Enforces nonnegativity of coefficients for inequalities. |
| `elabLinearCombination` | Core elaborator function implementing the `linear_combination` tactic: builds a linear combination of hypotheses, matches its (in)equality type to the goal, applies a reduction lemma (e.g., `add_left_cancel`), refines the goal, optionally rearranges to zero-normal form, and runs a normalization tactic. |
| `Ineq.addRelRelData`, `Ineq.relImpRelData`, `mulRelConstData`, `smulRelConstData`, etc. | Name-generating utilities (via `Ineq` module) that map combinations of relation types (`eq`, `le`, `lt`) to appropriate lemma names (e.g., `add_eq_add`, `mul_le_mul_of_nonneg_right`). |
| `Ineq.rearrangeData` | Data used to convert goals like `t1 = t2` into `t1 - t2 = 0`, improving error messages and normalization behavior. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `rel` (e.g., `mulRelConstData`, `addRelRelData`): indicates data tied to relation types (`eq`, `le`, `lt`).
  - `Const` (e.g., `mulRelConstData`, `smulConstRelData`): indicates multiplication/division by a constant on one side of the (in)equality.
  - `proof` (e.g., `.proof eq p`): used in `Expanded` to denote a proof term.
  - `const` (e.g., `.const c`): used in `Expanded` to denote a constant value.
  - `expand`, `rescale`, `elab`: standard metaprogramming naming for macro expansion, scaling, and elaboration.

- **Relation-related**:
  - `Ineq` module provides structured handling of `eq`, `le`, `lt`, and their combinations.
  - `WithStrictness` distinguishes strict vs non-strict variants (e.g., `.lt true` vs `.lt false`).

---

#### **3. Tactic Stack**

Frequently used tactics and metaprogramming utilities:

| Tactic / Utility | Role |
|------------------|------|
| `Meta.Positivity.proveNonneg`, `Meta.Positivity.bestResult` | Prove nonnegativity/positivity of coefficients for inequality scaling. |
| `Term.elabTerm`, `withSynthesize`, `withSynthesizeLight` | Type-checking and type inference during term elaboration. |
| `Tactic.refineCore`, `Tactic.liftMetaTactic`, `Tactic.liftMetaFinishingTactic` | Core refinement and tactic lifting utilities. |
| `Ring.proveEq`, `Ring.proveLE`, `Ring.proveLT` | Default normalization tactics for equalities/inequalities in rings. |
| `AtomM.run .instances` | Used for ring normalization with `.instances` transparency (more robust than `ring1`). |
| `Tactic.evalTactic` | Evaluation of user-provided normalization tactic (e.g., `abel`, `field_simp`). |
| `logWarningAt`, `throwErrorAt`, `throwError` | Diagnostic and error reporting. |

---

#### **4. Proof Logic / Execution Flow**

The `linear_combination` tactic follows this logical flow:

1. **Parse Goal & Hypotheses**:
   - Extract the goal relation (`goalRel`) and expected type (`ty`) via `ineq?`.
   - If no input expression is given, default to `Eq.refl 0`.

2. **Expand Linear Combination**:
   - Recursively parse input expression `e` using `expandLinearCombo`.
   - Enforce nonnegativity of coefficients for inequalities; reject invalid combinations (e.g., negative coefficients on strict inequalities).

3. **Match Goal & Combination Types**:
   - Use `Ineq.relImpRelData` to find a reduction lemma (e.g., `add_left_cancel`) that allows deriving the goal from the combination.
   - Fail if goal is equality but only inequality hypotheses are provided.

4. **Refine Goal**:
   - Apply the reduction lemma via `refine`, leaving a subgoal equating the normalized LHS of the combination to 0 (or similar zero-normal form).

5. **Optional Rearrangement**:
   - Apply `newGoalRel.rearrangeData` (e.g., `t1 - t2 = 0`) for better diagnostics.

6. **Normalize**:
   - Run user-specified or default normalization tactic (`ring`, `abel`, `skip`, etc.).
   - For equalities: default is `Ring.proveEq` with `.instances` transparency.
   - For `≤`/`<`: use `Ring.proveLE`/`Ring.proveLT`.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Tactic.LinearCombination.Lemmas`: Lemmas for combining (in)equalities.
- `Mathlib.Tactic.Positivity.Core`: Positivity proving infrastructure.
- `Mathlib.Tactic.Ring`: Ring normalization and comparison.
- `Mathlib.Tactic.Ring.Compare`: Comparison utilities for ring expressions.

**Scope**:
- Works over `CommRing` (or semirings with enveloping ring).
- Supports inequalities in `LinearOrderedCommRing` (and related ordered structures).
- Extensible to other algebraic structures via custom normalization tactics (`abel`, `field_simp`, etc.).

**Key Type-Theoretic Assumptions**:
- `α` must support addition, multiplication, and (for inequalities) ordering.
- For inequalities: coefficients must be nonnegative (provable via `positivity`).
- For division: denominator must be nonzero (handled implicitly via `positivity` or user proof).

---

### Summary

The `linear_combination` tactic is a powerful, extensible metaprogram for proving (in)equalities by constructing linear combinations of hypotheses, with automatic handling of scaling, sign constraints, and normalization. Its design reflects deep integration with Lean’s type class resolution (`positivity`, `ring`), and its modularity allows adaptation to diverse algebraic settings (groups, modules, fields).