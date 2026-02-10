**Technical Metadata Brief: Continuous Functional Calculus Tactics (Lean 4)**

---

### 1. **Key Definitions & Theorems**

- **`CStarAlgebra`**  
  *Type:* `RuleSet` (used via `declare_aesop_rule_sets`)  
  *Purpose:* Defines a named set of rewrite/analysis rules for use in `aesop`, specifically tailored for reasoning in `C*-algebra` contexts (e.g., continuity, algebraic structure, positivity). Though not a theorem itself, it underpins the automation in all three tactics.

- **`cfcTac`**  
  *Type:* `tactic` (custom syntax)  
  *Purpose:* Automatically discharges goals about *membership* or *predicate satisfaction* in the continuous functional calculus (e.g., verifying that a constructed function lies in the appropriate space or satisfies required algebraic properties). Uses `assumption`, `infer_instance`, and `aesop` with the `CStarAlgebra` rule set.

- **`cfcContTac`**  
  *Type:* `tactic`  
  *Purpose:* Discharges *continuity* goals for functions appearing in the continuous functional calculus. Leverages `fun_prop` (function property prover) with `aesop` as the discharge tactic, and falls back to `assumption`.

- **`cfcZeroTac`**  
  *Type:* `tactic`  
  *Purpose:* Specifically targets goals of the form `f 0 = 0`, required for the *non-unital* continuous functional calculus (where functions must vanish at 0). Uses `aesop` with `CStarAlgebra` rules or `assumption`.

---

### 2. **Naming Conventions**

- **Prefixes:**
  - `cfc_` — indicates *continuous functional calculus* domain.
  - `is_` is *not* used here; instead, the domain is encoded in the tactic name (`cfc`, `cfcCont`, `cfcZero`).
- **Suffixes:**
  - `_Tac` — standard Lean tactic naming (e.g., `cfcTac`, `cfcContTac`).
  - `_tac` — lowercase variant used in macro rules (e.g., `cfc_zero_tac`).
- **Semantic grouping:**
  - `cfcTac`: general predicate discharge.
  - `cfcContTac`: continuity-specific.
  - `cfcZeroTac`: basepoint condition (`f(0) = 0`) for non-unital case.

---

### 3. **Tactic Stack**

- **Core tactics used:**
  - `assumption` — for trivial goals provable by local hypotheses.
  - `infer_instance` — for typeclass resolution (e.g., `instCStarAlgebra`).
  - `aesop` — primary automation engine, configured with:
    - `rule_sets := [CStarAlgebra]`
    - Optional config (e.g., `warnOnNonterminal := false` in `cfcContTac`).
  - `fun_prop` — used *only* in `cfcContTac`, for proving continuity of composite functions (e.g., sums, products, compositions).
- **Fallback pattern:** All tactics use `try (first | …)` to gracefully handle failure.

---

### 4. **Proof Logic / Strategy**

- **Uniform structure across tactics:**
  1. **Attempt to solve immediately** via `assumption` (if goal is literally in the context).
  2. **Try typeclass inference** (`infer_instance`) — e.g., to prove `Continuous f` via known instances.
  3. **Apply domain-specific automation:**
     - `aesop` for algebraic/structural goals (e.g., `f * g` is continuous if `f`, `g` are).
     - `fun_prop` (for continuity) + `aesop` as discharge — handles compositionality of continuous functions.
- **No explicit induction or case analysis** is present — automation is *declarative* and *goal-directed*, relying on high-level domain knowledge encoded in `CStarAlgebra` rules and `fun_prop`.

---

### 5. **Imports**

- **`Mathlib.Tactic.Core`** — basic tactic infrastructure.
- **`Mathlib.Tactic.FunProp`** — provides `fun_prop`, essential for continuity reasoning.
- **`Aesop`** — main automation engine; enables rule-set–driven proof search.

> **Domain scope:** These tactics are designed for use in *operator algebra* contexts (specifically `C*-algebras` and *non-unital* variants), where one constructs continuous functional calculus maps (e.g., `C₀(σ(x)) → A`) and must verify continuity, algebra homomorphism, and basepoint conditions.

--- 

Let me know if you'd like a formalized signature table or integration suggestions for `continuous_functional_calculus.lean`.