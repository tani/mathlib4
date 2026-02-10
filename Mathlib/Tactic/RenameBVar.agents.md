### Technical Metadata Brief: `rename_bvar` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `renameBVarHyp` | `MVarId → FVarId → Name → Name → MetaM Unit` | Renames a bound variable (`old` → `new`) in the type of a specific local hypothesis (`fvarId`) within a goal (`mvarId`). Uses `modifyLocalDecl` and `renameBVar` on the hypothesis type. |
| `renameBVarTarget` | `MVarId → Name → Name → MetaM Unit` | Renames a bound variable (`old` → `new`) in the *target* (goal) of a goal (`mvarId`). Uses `modifyTarget` and `renameBVar`. |
| `rename_bvar` (tactic) | Elaborated syntax: `"rename_bvar " ident " → " ident loc?` | User-facing tactic to rename bound variables either in the target or in specified hypotheses (via `at h`). |

> **Note**: `renameBVar` is a method on `Expr` (imported via `Mathlib.Lean.Expr.Basic`) that performs α-renaming of bound variables by name.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `renameBVar*`: Indicates operations on *bound variables* (`BVar`) in expressions.
- **Suffixes**:
  - `Hyp` / `Target`: Distinguishes whether the operation targets a hypothesis or the goal.
- **Tactic syntax**:
  - Uses `old → new` notation (inspired by functional programming and mathematical substitution).
  - `at h` follows standard Lean tactic location syntax (`location?`).

---

#### **3. Tactic Stack / Key Tactics Used**

- `getMainGoal`: Retrieves current goal.
- `modifyLocalDecl`, `modifyTarget`: Core metavariable state modifiers.
- `expandLocation`, `withLocation`: From `Lean.Elab.Tactic.Location`, used to interpret `at h` syntax.
- `getId`: Converts `Parser.Pos.Ident` (from `ident`) to `Name`.
- `throwError`: For error handling on invalid location syntax.

> *No high-level automation tactics (e.g., `aesop`, `simp`, `ring`) are used* — this is a low-level, precise renaming utility.

---

#### **4. Proof Logic / Execution Flow**

1. Parse input: `old` and `new` identifiers, and optional location (`at h`, `at *`, etc.).
2. Get current goal (`mvarId`).
3. If no location:
   - Apply `renameBVarTarget` to rename in the goal’s conclusion.
4. If location specified:
   - Use `withLocation` to handle:
     - `at h`: Apply `renameBVarHyp` to hypothesis `h`.
     - `at *`: Apply to *all* hypotheses (via `expandLocation`).
     - Invalid syntax → error.
5. Internally, `renameBVar` on `Expr` performs α-conversion: replaces all occurrences of bound variable named `old` with `new`, respecting scoping.

> **No induction or case analysis** — purely syntactic substitution on bound variables.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Lean.Elab.Tactic.Location` | Provides location parsing (`expandLocation`, `withLocation`). |
| `Mathlib.Util.Tactic` | Likely contains shared tactic utilities (though not directly used here — may be for consistency). |
| `Mathlib.Lean.Expr.Basic` | Provides `Expr.renameBVar`, the core renaming primitive. |

> **Scope**: Part of `Mathlib.Tactic`, a library of Lean 4 tactics for mathematical reasoning.  
> **Purpose**: Enables robust, safe renaming of bound variables (e.g., avoiding name capture, improving readability in proofs involving quantifiers).

---

### Summary

The `rename_bvar` tactic is a **lightweight, precise, and safe** tool for α-renaming bound variables in Lean goals and hypotheses. It leverages Lean’s internal `Expr.renameBVar`, integrates with standard location syntax, and avoids complex automation — making it ideal for manual proof refinement and pedagogical clarity.