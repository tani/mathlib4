### Technical Metadata Brief: `Mathlib.Tactic.Contrapose`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mtr` | `(¬ q → ¬ p) → (p → q)` | *Modus tollens reversed*: provides the logical equivalence between `p → q` and `¬q → ¬p`. Used internally by the `contrapose` tactic to transform the goal. |
| `contrapose` tactic | Syntax: `"contrapose" (ident (" with " ident)?)?` | Transforms an implication goal `P → Q` into `¬Q → ¬P`. Supports hypothesis reversion and renaming. |
| `contrapose!` tactic | Syntax: `"contrapose!" (ident (" with " ident)?)?` | Same as `contrapose`, but additionally applies `push_neg` to simplify negated expressions inside `P` and `Q`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `mtr`: Abbreviation for *modus tollens reversed* (standard logical terminology).
  - `contrapose` / `contrapose!`: Reflects the logical transformation (contrapositive) and the optional negation push (`!` suffix).
- **Tactic naming pattern**: `contrapose` + optional `!` for enhanced behavior (similar to `simp` vs `simp!`).

---

#### **3. Tactic Stack**

Frequently used tactics in this module:

| Tactic | Role |
|--------|------|
| `refine` | To construct a proof term using `mtr` as a lemma. |
| `revert` | To move a local assumption back into the context before applying `contrapose`. |
| `intro` | To reintroduce the reverted hypothesis after transformation. |
| `push_neg` | Used by `contrapose!` to push negations inward (imported from `Mathlib.Tactic.PushNeg`). |
| `try` | Applied to `push_neg` to avoid failure if no simplification is possible. |

---

#### **4. Proof Logic / Strategy**

- **Core logical principle**: `p → q` is equivalent to `¬q → ¬p`.
- **Implementation flow**:
  1. Apply `refine mtr ?_` to replace the goal `p → q` with `¬q → ¬p`.
  2. For hypothesis-aware variants (`contrapose h`), first `revert h`, apply the base `contrapose`, then `intro h`.
  3. For `contrapose!`, follow the same steps but append `try push_neg` to simplify negated subformulas.
- **No induction or case analysis** is used—purely structural tactic composition.

---

#### **5. Imports**

| Import | Reason |
|--------|--------|
| `Mathlib.Tactic.PushNeg` | Required for `push_neg`, used in `contrapose!` to simplify negations. |

---

### Summary

This module formalizes the *contrapositive transformation* as a reusable tactic in Lean 4, leveraging the `mtr` lemma for correctness. It supports both basic and enhanced (`!`) variants, with optional hypothesis handling and renaming. The implementation is minimal, declarative, and follows Lean’s tactic macro conventions.