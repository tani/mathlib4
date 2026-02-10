### Technical Metadata Brief: `lift` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CanLift` | `class CanLift (α β : Sort*) (coe : β → α) (cond : α → Prop)` | A typeclass encoding that elements of `α` satisfying `cond` lie in the range of `coe : β → α`. Enables lifting from `α` to `β`. |
| `CanLift.prf` | `∀ x : α, cond x → ∃ y : β, coe y = x` | Witness that `coe` is surjective onto the `cond`-satisfying elements of `α`. Core proof obligation for `CanLift`. |
| `Int.canLift` | `instance : CanLift Int Nat (fun n : Nat ↦ n) (0 ≤ ·)` | Lifting integers ≥ 0 to naturals via `natAbs`. |
| `Pi.canLift` | `instance [∀ i, CanLift (α i) (β i) (coe i) (P i)] : CanLift (∀ i, α i) (∀ i, β i) ...` | Enables pointwise lifting of dependent functions. |
| `PiSubtype.canLift` | `instance [∀ i, Nonempty (α i)] : CanLift (∀ i : Subtype p, α i) (∀ i, α i) ...` | Lifting functions on a subtype to full domain (requires choice). |
| `Subtype.canLift` | `instance : CanLift α { x // p x } Subtype.val p` | Lifting an element `a` satisfying `p a` to the subtype `{x // p x}`. |
| `Subtype.exists_pi_extension` | `∃ g : ∀ i, α i, (fun i : Subtype p => g i) = f` | Used to construct extensions of functions defined on a subtype. |
| `Lift.getInst` | `Expr × Expr × Expr` | Synthesizes `CanLift` instance and extracts `coe`, `cond`, and instance. |
| `Lift.main` | Core tactic logic | Implements the `lift` tactic: elaborates terms, synthesizes instance, applies `rcases`, rewrites, clears hypotheses. |

---

#### **2. Naming Conventions**

- **Typeclass & instance names**:  
  - `CanLift` (class), `Pi.canLift`, `PiSubtype.canLift`, `Subtype.canLift`, `Int.canLift`  
  - Suffix `.canLift` for instances of `CanLift`.

- **Proof terms & helpers**:  
  - `prf` (e.g., `CanLift.prf`) — standard for proof obligations.  
  - `coe` — for the coercion map `β → α`.  
  - `cond` — for the predicate on `α` defining the domain of liftability.

- **Tactic syntax identifiers**:  
  - `lift` (syntax name), `lift` (tactic name).  
  - Internal helpers: `getInst`, `main`.

- **Variable naming in tactic**:  
  - `newVarName`, `newEqName`, `newPrfName` — for user-specified names.  
  - `tmpVar` — temporary name for fresh variables.

---

#### **3. Tactic Stack**

Frequently used tactics in `Lift.main` and related code:

| Tactic | Usage |
|--------|-------|
| `rcases` | To destruct the `CanLift.prf` proof: `∃ y, coe y = x` → introduce `newVar` and equality `newEq`. |
| `simp` (with `← newEqIdent`) | To rewrite old occurrences of `e` using the equality `↑newVar = e`. |
| `clear` | To remove old variable/hypothesis (e.g., `hUsing`, temporary `tmpVar`). |
| `getUnusedUserName` | To generate fresh variable names (e.g., `tmpVar`). |
| `elabTerm`, `inferType`, `synthInstance` | Meta-level elaboration and type inference. |
| `mkAppM`, `mkAppOptM`, `mkFreshExprMVar` | Building expressions at the meta level. |
| `setGoals`, `replaceMainGoal` | Goal management (e.g., splitting when `using` is omitted). |
| `getLCtx`, `for decl in ← getLCtx` | Iterate over local context to rewrite. |

---

#### **4. Proof Logic / Tactic Flow**

The `lift` tactic follows this logical structure:

1. **Elaborate input**:  
   - Parse `e` (expression to lift), `t` (target type), optional `hUsing`, and names (`newVarName`, `newEqName`, `newPrfName`).

2. **Validate context**:  
   - Ensure target is a proposition.  
   - Require new variable name if `e` is not a free variable.

3. **Synthesize `CanLift` instance**:  
   - Use `Lift.getInst` to infer `coe`, `cond`, and `inst : CanLift _ _ coe cond`.

4. **Prove condition**:  
   - If `hUsing` is given, elaborate it as a proof of `cond e`.  
   - Otherwise, introduce a new goal `cond e`.

5. **Destruct existence proof**:  
   - Apply `rcases` on `CanLift.prf e cond_e` to get `newVar : β` and `newEq : coe newVar = e`.

6. **Rewrite & clean up**:  
   - If `isNewVar`, rewrite all occurrences of `e` to `↑newVar` via `simp only [← newEq]`.  
   - Clear temporary hypotheses (`tmpVar`, original `hUsing` if `keepUsing = false`).  
   - If `hUsing` was omitted, add the subgoal `cond e` to the goal list.

7. **Handle special cases**:  
   - If `newPrfName = hUsing`, keep `hUsing` in context (`keepUsing = true`).  
   - Support for lifting expressions (not just variables) via equality `↑k = e`.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Tactic.Basic` | Core tactic infrastructure (e.g., `rcases`, `simp`, goal management). |
| `Batteries.Lean.Expr` | Utilities for expression manipulation (e.g., `isFVar`, `userName`). |
| `Batteries.Lean.Meta.UnusedNames` | For generating fresh names (`getUnusedUserName`). |
| `Mathlib.Tactic` (namespace) | Where `lift` tactic is defined. |

**Key dependencies**:  
- `Lean.Elab.Tactic.RCases` — for destructing existential proofs.  
- `Meta` — for `synthInstance`, `inferType`, `mkFreshExprMVar`, etc.  
- `Classical` — used implicitly via `Classical.choice`/`Classical.propDecidable` in `PiSubtype.canLift`.

---

### Summary

The `lift` tactic is a **generalized subtype lifting mechanism**, built around the `CanLift` typeclass. It supports:
- Lifting integers ≥ 0 to naturals,
- Automatic lifting of dependent functions,
- Flexible naming and hypothesis management,
- Rewriting and cleanup of old variables.

It is dual to `zify` (which lifts propositions *down* to integers), and is foundational for working with subtypes and coercions in Mathlib.