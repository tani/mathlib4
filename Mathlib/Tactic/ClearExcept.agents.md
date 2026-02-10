Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `clear*` Tactic (`clearExcept`)**

#### **1. Key Definitions & Theorems**
- **`clearExcept` syntax**:  
  ```lean
  syntax (name := clearExcept) "clear " "*" " -" (ppSpace colGt ident)* : tactic
  ```  
  *Purpose*: Defines a custom tactic syntax allowing `clear * - h₁ h₂`, i.e., clear all hypotheses *except* those listed after ` -`.

- **`elab_rules` for `clearExcept`**:  
  ```lean
  elab_rules : tactic
    | `(tactic| clear * - $hs:ident*) => do
      let fvarIds ← getFVarIds hs
      liftMetaTactic1 fun goal ↦ do
        let mut toClear : Array FVarId := #[]
        for decl in ← getLCtx do
          unless fvarIds.contains decl.fvarId do
            if let none ← isClass? decl.type then
              toClear := toClear.push decl.fvarId
        goal.tryClearMany toClear
  ```  
  *Purpose*: Implements the tactic logic:  
  - Extracts the identifiers `hs` (hypotheses to *keep*).  
  - Collects all local context declarations (`getLCtx`).  
  - Filters out hypotheses in `hs` and *non-class* hypotheses (i.e., non-typeclass instances) for clearing.  
  - Uses `tryClearMany` to safely clear the selected hypotheses.

#### **2. Naming Conventions**
- **Prefix/Suffix patterns**:
  - `clear*` → variant of `clear`, with `*` indicating "all except".
  - `clearExcept` → explicit naming for the syntax rule (`name := clearExcept`).
  - `isClass?` → Lean’s convention for optional/class-checking predicates (`?` suffix for `Option`-returning functions).
  - `fvarId` → standard Lean term for *free variable IDs* (hypothesis identifiers).
  - `toClear` → descriptive mutable variable name (camelCase, verb-noun).

#### **3. Tactic Stack**
- **Core tactics/macros used**:
  - `getFVarIds` — extracts `FVarId`s from syntax identifiers.
  - `getLCtx` — retrieves the local context.
  - `isClass?` — checks if a type is a typeclass instance.
  - `tryClearMany` — attempts to clear multiple hypotheses safely (ignores failures).
  - `liftMetaTactic1` — lifts a `MetaM` tactic into the tactic monad.
  - `unless`, `do`, `←` — standard Lean monadic syntax.

#### **4. Proof Logic / Execution Flow**
1. Parse input: extract list of hypotheses to *preserve* (`hs`).
2. Convert `hs` to `fvarIds` (set of IDs to exclude from clearing).
3. Iterate over local context (`getLCtx`):
   - Skip hypotheses whose `fvarId` is in `fvarIds`.
   - *Also skip* hypotheses whose type is a typeclass instance (`isClass?` returns `some _`).
   - Otherwise, add to `toClear`.
4. Apply `tryClearMany toClear` to the goal.

> **Note**: The tactic avoids clearing typeclass instances (to preserve implicit arguments/instances), aligning with Lean’s design philosophy.

#### **5. Imports & Dependencies**
- **Primary imports**:
  - `Mathlib.Init` — provides foundational definitions (including `Lean.Meta`).
  - `Lean.Elab.Tactic.ElabTerm` — enables tactic elaboration and term elaboration utilities.
- **Key modules used**:
  - `Lean.Meta` — for `getLCtx`, `isClass?`, `tryClearMany`, `liftMetaTactic1`.
  - Implicit reliance on `Lean.Elab.Tactic` namespace for tactic infrastructure.

---

This metadata reflects a *targeted, safe variant* of `clear`, prioritizing robustness (via `tryClearMany`) and typeclass awareness (via `isClass?`). It exemplifies Lean’s meta-programming style: declarative iteration over context, with clear separation of concerns.