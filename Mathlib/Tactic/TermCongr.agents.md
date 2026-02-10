### Technical Metadata Brief: `Mathlib.Tactic.TermCongr`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `cHole {α} val pf` | `α → p : Prop → α` | Wrapper for congruence holes, storing value + proof; used to annotate terms with metadata for LHS/RHS substitution. |
| `mkCHole forLhs val pf` | `Bool → Expr → Expr → MetaM Expr` | Constructs a `cHole`-wrapped expression with metadata (`congrHoleForLhsKey`, `congrHoleIndex`) to track side and age. |
| `cHole? e mvarCounterSaved?` | `Expr → Option Nat? → Option (Bool × Expr × Expr)` | Extracts `(forLhs, val, pf)` from a `cHole`, optionally filtering by age. |
| `elabCHole h forLhs expectedType?` | `Syntax → Bool → Option Expr → TermElabM Expr` | Elaborates a hole syntax (`$h`) as LHS or RHS, using expected type and proof type to propagate constraints. |
| `elabCHoleExpand` | `term_elab` | Elaborates `cHole% lhs $h` / `cHole% rhs $h` to `elabCHole h true/false`. |
| `CongrResult` | `structure` | Stores `lhs`, `rhs`, and optional generator `pf? : CongrType → MetaM Expr` for equality/HEq proof. |
| `CongrResult.mk' lhs rhs pf` | `Expr → Expr → Expr → CongrResult` | Builds a `CongrResult` from a proof term (Iff/Eq/HEq), validates sides via `ensureSidesDefeq`. |
| `CongrResult.mkDefault lhs rhs` | `Expr → Expr → MetaM CongrResult` | Auto-generates trivial (`rfl`) or subsingleton-based congruence; fails if impossible. |
| `mkCongrOf depth mvarCounterSaved lhs rhs` | `Nat → Nat → Expr → Expr → MetaM CongrResult` | Recursive congruence generator: walks expressions in parallel, handles `app`, `lam`, `forallE`, `letE`, `mdata`, `proj`. |
| `mkCongrOfCHole? mvarCounterSaved lhs rhs` | `Nat → Expr → Expr → MetaM (Option CongrResult)` | Handles congruence holes directly: unifies LHS/RHS holes and extracts underlying equality. |
| `mkEqForExpectedType expectedType?` | `Option Expr → MetaM Expr` | Ensures expected type unifies with `Eq _ _ _`; returns equality. |
| `mkHEqForExpectedType expectedType?` | `Option Expr → MetaM Expr` | Ensures expected type unifies with `HEq _ _ _ _`; returns HEq. |
| `mkIffForExpectedType expectedType?` | `Option Expr → MetaM Expr` | Ensures expected type unifies with `Iff _ _`; returns iff. |
| `CongrResult.trans res1 res2` | `CongrResult → CongrResult → CongrResult` | Composes two congruences via transitivity. |
| `CongrResult.eq / heq / iff res` | `CongrResult → MetaM Expr` | Extracts proof of `Eq`, `HEq`, or `Iff` from `CongrResult`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `mk*`: Constructors / unification helpers (`mkCHole`, `mkEqForExpectedType`, `mkCongrOf`, `mkCongrOfCHole?`).
  - `elab*`: Elaboration functions (`elabCHole`, `elabCHoleExpand`).
  - `cHole*`: Hole-related utilities (`cHole?`, `hasCHole`, `removeCHoles`).
  - `congrHole*`: Metadata keys (`congrHoleForLhsKey`, `congrHoleIndex`).
- **Suffixes:**
  - `?`: Optional-returning functions (`cHole?`, `mkCongrOfCHole?`).
  - `'` (prime): Variants with extra validation (`CongrResult.mk'`).
  - `Defeq`: Forces definitional equality (`CongrResult.defeq`).
- **Other:**
  - `isRfl`: Checks if congruence is trivial (`CongrResult.isRfl`).
  - `processAntiquot`, `elaboratePattern`: Pattern preprocessing for `congr(...)`.

---

#### **3. Tactic Stack**

- **Core Tactics & Utilities:**
  - `isDefEq`: Type equality checks (heavily used for unification).
  - `whnf`: Weak head normal form normalization (for pattern matching on types).
  - `mkFreshExprMVar`, `mkFreshTypeMVar`: Metavariable creation.
  - `instantiateMVars`: Instantiates metavariables before processing.
  - `observing?`: Used with `mkAppM` to avoid side effects during instance search.
  - `withLocalDecl`, `withLocalDeclFVars`: Introduces binders for `lam`/`forallE`.
  - `mkAppM`, `mkAppN`: Application construction with typeclass inference.
  - `mkEqRefl`, `mkHEqRefl`, `mkEqTrans`, `mkHEqTrans`, `mkPropExt`, `funext`, `pi_congr`: Core proof-term constructors.

- **Common Patterns:**
  - `unless ← isDefEq ... do ...`: Error handling on type mismatches.
  - `discard <| ...`: Discards result but runs side-effect (e.g., unification).
  - `trace[Elab.congr]`: Debug tracing for elaboration steps.

---

#### **4. Proof Logic & Strategy**

- **High-Level Flow:**
  1. **Pattern Elaboration (Twice):**  
     - Pattern `t` is elaborated once with holes replaced by LHS (`cHole% lhs $h`) and once by RHS (`cHole% rhs $h`).
     - Hole elaboration uses expected type to propagate constraints and unify metavariables.
  2. **Unification & Hole Processing:**  
     - LHS/RHS elaborated terms are unified against expected target type (`Eq`, `HEq`, or `Iff`).
     - Congruence holes (`cHole`) are extracted and validated for compatibility.
  3. **Congruence Generation (`mkCongrOf`):**  
     - Recursively walks LHS/RHS expressions in parallel.
     - For `app`: Uses `mkHCongrWithArity'` (variant of `Lean.Meta.mkHCongrWithArity`) to generate congruence for arguments.
     - For `lam`/`forallE`: Handles binders with `funext`/`pi_congr`.
     - For `letE`: Zeta-reduces and recurses.
     - Falls back to `CongrResult.mkDefault'` on desynchronization (e.g., implicit args filled in).
  4. **Proof Generation:**  
     - `CongrResult.pf?` dynamically generates `Eq`/`HEq` proofs, handling `Iff`/`Eq`/`HEq` inputs via conversion (`eq_of_heq`, `heq_of_eq`, `propext`).
     - Trivial cases (`rfl`) are preserved; nontrivial proofs are composed via `trans`.

- **Key Design Principles:**
  - **Side-Independent Elaboration:** LHS/RHS elaborated separately to allow typeclass inference to specialize per side.
  - **Defeq First:** Trivial congruences (`rfl`) are preferred; fallback to subsingleton/proof irrelevance.
  - **Age Filtering:** `mvarCounterSaved` prevents reprocessing stale holes leaked into context.

---

#### **5. Imports & Scope**

- **Core Imports:**
  - `Mathlib.Lean.Expr.Basic`: Expression representation.
  - `Mathlib.Lean.Meta.CongrTheorems`: Congruence theorem utilities (e.g., `mkHCongrWithArity`).
  - `Mathlib.Logic.Basic`: Basic logic (e.g., `Subsingleton`, `proof_irrel_heq`).
  - `Mathlib.Tactic.CongrExclamation`: Related congruence tactics.

- **Scope & Module:**
  - `namespace Mathlib.Tactic.TermCongr`
  - Universe `u` declared.
  - Trace class `Elab.congr` registered.

- **Primary Use Case:**  
  Term elaborator for `congr(...)` quotations (e.g., `congr($hf $hx)`), enabling flexible, type-aware congruence generation beyond `congr_arg`/`congr_fun`.

--- 

Let me know if you'd like a visual dependency graph or a summary of the `mkCongrOf` recursion tree.