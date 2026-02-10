### Technical Brief: `mk_iff_of_inductive_prop` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `select m n goal` | `MVarId → MetaM MVarId`<br>Executes a sequence of `left`/`right` intro steps to select the `m`-th disjunct among `n+1` disjuncts. Used in `toCases`. |
| `compactRelation bs as_ps` | `List Expr → List (Expr × Expr) → List (Option Expr) × List (Expr × Expr) × (Expr → Expr)`<br>Optimizes existential quantifiers by eliminating variables that appear directly as equalities (e.g., `a = b` removes `b`). Returns compacted variables, remaining equations, and substitution. |
| `updateLambdaBinderInfoD! e` | `Expr → Expr`<br>Ensures lambda binder info is `.default`. Used in `mkExistsList`. |
| `mkExistsList args inner` | `List Expr → Expr → MetaM Expr`<br>Constructs `∃ x, P` or simplifies to `P[x := true]` if `x` is propositional and unused. Handles `p ∧ True → p`. |
| `mkOpList op empty` | `Expr → Expr → List Expr → Expr`<br>Right-associative folding: `op x1 (op x2 ...)`; returns `empty` on empty list. Used for `mkAndList`/`mkOrList`. |
| `mkAndList`, `mkOrList` | `List Expr → Expr`<br>Constructs conjunctions/disjunctions; `True`/`False` for empty lists. |
| `List.init` | `List α → List α`<br>Removes last element of a list. Used to drop unused existential variable when simplifying `p ∧ True`. |
| `structure Shape` | Stores metadata per constructor:<br>• `variablesKept : List Bool` — which bound vars survive `compactRelation`<br>• `neqs : Option Nat` — number of equalities (or `none` if simplified away). |
| `constrToProp univs params idxs c` | `List Level → List Expr → List Expr → Name → MetaM (Shape × Expr)`<br>Converts constructor `c` into a proposition of the form `∃ bs, ⋀ eqs`, with shape metadata. |
| `splitThenConstructor mvar n` | `MVarId → Nat → MetaM Unit`<br>Splits goal `n` times via `refine ⟨?_,?_⟩`, then applies `constructor` to each branch. Used in `toCases`. |
| `toCases mvar shape` | `MVarId → List Shape → MetaM Unit`<br>Proves `LHS → RHS` direction: decomposes hypothesis (via `intro` + `cases`), then constructs witness for each disjunct using `select`, `existsi`, and assignment. |
| `nCasesSum n mvar h`, `nCasesProd n mvar h` | `Nat → MVarId → FVarId → MetaM ...`<br>Repeatedly apply `cases` to binary sum/product hypotheses to extract components. Used in `toInductive`. |
| `listBoolMerge bs xs` | `List Bool → List α → List (Option α)`<br>Merges boolean mask with list, inserting `none` where `false`. Used to reconstruct arguments with eliminated variables. |
| `toInductive mvar cs gs s h` | `MVarId → List Name → List Expr → List Shape → FVarId → MetaM Unit`<br>Proves `RHS → LHS`: decomposes disjunction, then for each constructor, builds witness and applies constructor. Handles `HEq` via careful `revert`/`intro`/`subst`. |
| `mkIffOfInductivePropImpl ind rel relStx` | `Name → Name → Syntax → MetaM Unit`<br>Core implementation: generates `iff` theorem for inductive `Prop` `ind`, naming it `rel`. Builds type, splits goal, proves both directions, and registers declaration. |
| `@[mk_iff]` attribute | User attribute to auto-generate `iff` theorems for inductive props. |
| `mk_iff_of_inductive_prop i r` command | User command to explicitly generate `iff` theorem for inductive `i`, naming it `r`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mk*`: Construction functions (`mkExistsList`, `mkAndList`, `mkOrList`, `mkOpList`)
  - `to*`: Proof-direction functions (`toCases`, `toInductive`)
  - `n*`: Iterated case analysis (`nCasesSum`, `nCasesProd`)
  - `compact*`, `select`, `listBoolMerge`: Utility functions with domain-specific names

- **Suffixes**:
  - `!`: Panic on failure (`updateLambdaBinderInfoD!`)
  - `D`: Possibly destructive or internal (`updateLambdaBinderInfoD!`)
  - `Impl`: Internal implementation (`mkIffOfInductivePropImpl`)
  - `List`: Operates on lists (`mkAndList`, `mkOrList`, `listBoolMerge`)

- **Structure fields**:
  - `variablesKept`, `neqs`: Descriptive, boolean/optional semantics

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `intro`, `cases`, `refine ⟨?_,?_⟩`, `constructor`, `existsi`, `assign`, `revert`, `subst`
- `isDefEq` (for unification and metavariable instantiation)
- `mkFreshExprMVar`, `inferType`, `getType`, `replaceFVar`, `instantiateMVars`

Tactic combinators:
- `Term.TermElabM.run`, `Tactic.run`, `MetaM.run'`
- `withContext`, `tryClear`, `foldlM`, `mapM`

No external automation (e.g., `aesop`, `ring`, `simp`) — fully explicit proof construction.

---

#### **4. Proof Logic**

**Overall flow for `mk_iff_of_inductive_prop`**:

1. **Type Generation**:
   - Extract inductive type info (`inductVal`), parameters, indices, constructors.
   - For each constructor, compute proposition via `constrToProp`.
   - Assemble full `iff` type: `∀ params indices, i as ↔ ⋁_j ∃ cs, eqs`.

2. **Goal Splitting**:
   - Introduce all variables.
   - Apply `Iff.intro` → two subgoals: `LHS → RHS` (`mp`) and `RHS → LHS` (`mpr`).

3. **Left-to-Right (`mp`)**:
   - `intro` hypothesis `h : i as`.
   - `cases h` → one subgoal per constructor.
   - For each subgoal:
     - Use `select` to pick correct disjunct.
     - Build witness using `existsi` (with `List.init` if `neqs = none`).
     - Assign witness to goal using `assign`.

4. **Right-to-Left (`mpr`)**:
   - `intro h : ⋁_j ...`.
   - `nCasesSum` to decompose disjunction into `n` cases.
   - For each constructor case:
     - `nCasesProd` to decompose existential & conjunction.
     - Handle `HEq` via `revert`/`intro`/`subst` to avoid name capture.
     - Construct constructor application with missing args as fresh metavars.
     - Unify types via `isDefEq`, then `assign`.

5. **Declaration Registration**:
   - `addDecl` + `addDeclarationRangesFromSyntax` + `addConstInfo`.

**Inductive reasoning pattern**:
- **Case analysis** on inductive hypothesis (LHS → RHS).
- **Construction** via constructor application (RHS → LHS).
- **Optimization** via `compactRelation` to avoid redundant quantifiers.

---

#### **5. Imports & Scope**

**Core Imports**:
- `Lean.Elab.DeclarationRange`
- `Lean.Meta.Tactic.Cases`
- `Mathlib.Lean.Meta`
- `Mathlib.Lean.Name`
- `Mathlib.Tactic.TypeStar`

**Scope**:
- Part of `Mathlib.Tactic.MkIff` namespace.
- Targets **inductive `Prop`-valued declarations** (e.g., `List.Chain`, custom inductive predicates).
- Generates **`iff` theorems** of the form:
  ```
  ∀ ps is, i as ↔ ⋁_j ∃ cs, is = cs
  ```
  where `cs` are constructor args, and equalities are simplified when possible.

**Use Cases**:
- Automated reasoning about inductive definitions (e.g., `List.Chain`, `Acc`, `Transitive`).
- Eliminates manual case analysis by encoding constructor structure as logical equivalence.

--- 

This file is a **highly specialized metaprogramming utility** for formalizing inductive definitions in Lean, with careful handling of dependent types, metavariables, and propositional simplifications.