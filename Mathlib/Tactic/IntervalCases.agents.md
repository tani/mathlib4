### Technical Metadata Brief: `interval_cases` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Bound` | Inductive type representing lower/upper bounds: `.lt n` (strict, i.e., `n < x` or `x < n`) and `.le n` (non-strict, i.e., `n ≤ x` or `x ≤ n`). |
| `Bound.asLower` | Converts a bound to the *least* integer satisfying it: `n` for `.le n`, `n+1` for `.lt n`. |
| `Bound.asUpper` | Converts a bound to the *greatest* integer satisfying it: `n` for `.le n`, `n−1` for `.lt n`. |
| `parseBound` | Parses an inequality expression into `(a, b, strict, negated)` where `a ≤ b` (or `a < b`) and `negated` indicates `¬(a ≤ b)` or `¬(a < b)`. |
| `Methods` | Typeclass-like structure encapsulating type-specific operations: `initLB`, `initUB`, `proveLE`, `proveLT`, `roundUp`, `roundDown`, `eval`, `mkNumeral`. |
| `natMethods`, `intMethods` | Concrete `Methods` implementations for `ℕ` and `ℤ`. |
| `intervalCases` | Core tactic logic: extracts bounds, checks consistency, builds case tree via bisection (`bisect`), and returns subgoals. |
| `IntervalCasesSubgoal` | Record describing a subgoal: `rhs` (numeral), `value` (int), `goal` (MVarId of form `x = rhs → tgt`). |
| `Methods.getBound` | Extracts normalized bound info from a proof term (e.g., `h : 3 ≤ n`). |
| `Methods.inconsistentBounds` | Proves `False` when lower bound > upper bound. |
| `Methods.bisect` | Recursively splits the case space using `dite` on midpoint inequalities to minimize case explosion. |

**Key Theorems (used for bound manipulation):**
- `of_not_lt_left`, `of_not_lt_right`, `of_le_left`, `of_le_right`, etc.: Rewriting lemmas for inequalities under equality substitutions.
- `le_of_not_le_of_le`: Used in `inconsistentBounds` for `ℤ`/`ℕ` reasoning.
- `Int.add_one_le_of_not_le`, `Int.le_sub_one_of_not_le`: Critical for rounding up/down in `intMethods`.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `initLB`, `initUB`: Initialize lower/upper bounds.
  - `proveLE`, `proveLT`: Prove non-strict/strict inequalities.
  - `roundUp`, `roundDown`: Adjust bounds for strict inequalities (e.g., `n < 5` ⇒ `n ≤ 4`).
  - `getBound`, `parseBound`: Parse and normalize bounds.
- **Suffixes:**
  - `Methods`: Interface for type-specific behavior.
  - `Subgoal`: Subgoal structure.
- **Internal naming:**
  - `z1`, `z2`: Integer values of bounds.
  - `e`, `e'`: Scrutinee expression (original and error-reporting variant).
  - `lbs`, `ubs`: Lists of candidate lower/upper bound hypotheses.

---

#### **3. Tactic Stack**

- **Core tactics used:**
  - `mkFreshExprMVar`, `intro1`, `assign`, `mvarId!.intro1`: Metavariable and goal manipulation.
  - `mkAppM`, `mkDecideProof`: Term construction and decidability proofs.
  - `whnfR`, `isDefEq`, `inferType`: Type inference and normalization.
  - `NormNum.derive`: For numeric evaluation (e.g., `n = 3` proofs).
  - `generalizeHyp`, `substCore`: Generalization and substitution (via `interval_cases` frontend).
- **Tactics in `Methods` implementations:**
  - `mkDecideProof`: For `≤`/`<` proofs in `ℕ`/`ℤ`.
  - `q(...)`: Quasi-quotation for term construction.
  - `failure`, `panic!`: Control flow for error handling.

---

#### **4. Proof Logic**

- **High-level flow:**
  1. **Extract bounds** from context (`lbs`, `ubs`) and type-specific defaults (e.g., `0 ≤ n` for `n : ℕ`).
  2. **Normalize bounds** to `(Bound, numeral, proof)` via `getBound`/`initLB`/`initUB`.
  3. **Check consistency**: If `lower > upper`, prove `False` via `inconsistentBounds`.
  4. **Generate subgoals** for each integer in `[lower, upper]`.
  5. **Build case tree** via `bisect`:
     - Recursively split the range at midpoint.
     - Use `dite` to branch on `mid ≤ n`.
     - Base case: Assign `le_antisymm` proof combining lower/upper bounds to equate `n` with the numeral.
- **Key reasoning patterns:**
  - Strict bounds (`<`) converted to non-strict (`≤`) via arithmetic (e.g., `n < 5 ⇒ n ≤ 4`).
  - `roundUp`/`roundDown` adjust proofs for strict bounds (e.g., `¬5 ≤ n ⇒ n + 1 ≤ 5` in `ℤ`).
  - Bisection minimizes case explosion (logarithmic depth vs. linear).

---

#### **5. Imports & Scope**

- **Primary imports:**
  - `Mathlib.Tactic.NormNum`: For numeric evaluation (`NormNum.derive`).
  - `Mathlib.Tactic.FinCases`: Used in frontend to call `fin_cases` on synthesized `n ∈ Set.Ico a b`.
  - `Mathlib.Control.Basic`: For monadic control flow (e.g., `try?`, `withNewMCtxDepth`).
- **Scope:**
  - Supports `ℕ` and `ℤ` (hardcoded in `intervalCases`).
  - Extensible via `Methods` interface (TODO: generalize to other types).
  - Frontend tactic `interval_cases` supports:
    - Automatic bound discovery.
    - Explicit bounds via `using hl, hu`.
    - Hypothesis naming (`interval_cases h : n`).

---

### Summary

The `interval_cases` tactic automates case analysis for bounded integers by:
- Synthesizing tight bounds from context and type,
- Normalizing strict/non-strict inequalities,
- Proving inconsistency when bounds conflict,
- Efficiently splitting the case space via bisection.

It exemplifies Lean’s metaprogramming power: combining type inference, term construction, and recursive goal management to handle discrete reasoning tasks.