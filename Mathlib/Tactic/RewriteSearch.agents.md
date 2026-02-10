### Technical Metadata Brief: `rw_search` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `splitDelimiters` | `String → List String` | Tokenizes a string by splitting on delimiters `(`, `)`, `[`, `]`, `,`. |
| `tokenize` | `Expr → MetaM (List String)` | Pretty-prints an expression, splits on whitespace, then applies `splitDelimiters`. |
| `SearchNode` | `Structure` | Encapsulates state of a rewrite search step: history, metavariable context, goal, pretty goal, tokenized LHS/RHS, `rfl?`, `dist?`. |
| `SearchNode.mk` | `Array (Nat × Expr × Bool) → MVarId → MetaM (Option SearchNode)` | Constructs a `SearchNode` from a goal, extracting LHS/RHS and tokenizing them. |
| `SearchNode.init` | `MVarId → MetaM (Option SearchNode)` | Initializes a `SearchNode` for a given goal. |
| `SearchNode.push` | `SearchNode → Expr → Bool → Nat → MVarId → MetaM (Option SearchNode)` | Extends a `SearchNode` with a new rewrite step. |
| `SearchNode.compute_rfl?` | `SearchNode → MetaM SearchNode` | Checks if goal is solvable by `rfl`, updates `rfl?`. |
| `SearchNode.compute_dist?` | `SearchNode → SearchNode` | Computes Levenshtein edit distance between tokenized LHS and RHS, updates `dist?`. |
| `SearchNode.penalty` | `SearchNode → Nat` | Heuristic penalty: `lastIdx.log2 + ppGoal.length.log2`. |
| `SearchNode.prio` | `SearchNode → Thunk Nat` | Priority function: `penalty + levenshtein editCost lhs rhs`. |
| `SearchNode.estimator` | `SearchNode → Type` | Type of lower bounds for edit distance + penalty (via `Estimator.trivial`). |
| `SearchNode.rewrites` | `Array (Expr × Bool × Nat) → ModuleDiscrTreeRef _ → NameSet → SearchNode → MLList MetaM SearchNode` | Generates successor nodes via rewriting using lemmas and local hypotheses. |
| `SearchNode.search` | `SearchNode → … → MLList MetaM SearchNode` | Performs best-first search over rewrite sequences, stopping at `rfl` or `dist = 0`. |
| `rw_search` tactic | `tactic` | Main tactic entrypoint: runs `search`, selects best node, updates goal, adds suggestion. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `compute_`, `estimator`, `penalty`, `prio`, `tokenize`, `splitDelimiters`, `rewrites`, `rewrite`, `init`, `push`, `mk`, `lastIdx`, `ppGoal`, `lhs`, `rhs`, `rfl?`, `dist?`.
- **Suffixes**:
  - `?` for optional fields (`rfl?`, `dist?`).
  - `?` in tactic names (`rw?`, `rw_search`).
- **Structure fields**:
  - `history`, `mctx`, `goal`, `type`, `ppGoal`, `lhs`, `rhs`, `rfl?`, `dist?`.
- **Boolean flags**:
  - `symm` (symmetry of rewrite), `stopAtRfl`, `stopAtDistZero`.

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `rw?`, `rw`, `applyRfl`, `refl`, `whnfR`, `instantiateMVars`, `replaceTargetEq`.
- **Meta-level utilities**:
  - `withMCtx`, `withoutModifyingState`, `getMCtx`, `setMCtx`, `replaceMainGoal`, `addRewriteSuggestion`.
- **Search & control**:
  - `bestFirstSearchCore`, `MLList`, `takeUpToFirst`, `enum`, `filterMapM`, `whileAtLeastHeartbeatsPercent`.
- **Simplification & pretty-printing**:
  - `ppExpr`, `pretty`, `splitOn`, `extract`, `get`, `next`, `prev`, `endPos`.

---

#### **4. Proof Logic / Search Strategy**

- **Goal**: Solve `⊢ t = u` by repeated rewriting.
- **Search space**: Nodes = sequences of rewrites; edges = applying a rewrite lemma.
- **Heuristic**: Minimize `penalty + Levenshtein distance(tokenize t, tokenize u)`.
- **Tokenization**:
  - Pretty-print expression → split on whitespace → split delimiters.
- **Search algorithm**:
  - Best-first search (`bestFirstSearchCore`) over rewrite sequences.
  - Uses `estimator` for pruning (lower bounds on distance).
  - Stops early if:
    - `rfl? = some true` (goal solved by reflexivity), or
    - `dist? = some 0` (exact match).
- **Backtracking**:
  - Carries `mctx` in each node to safely backtrack.
- **Local hypotheses**:
  - Included in `rewriteCandidates` via `localHypotheses`.
  - **Limitation**: Cannot discharge side conditions using local hypotheses (requires `rw?` changes).

---

#### **5. Imports & Dependencies**

| Module | Purpose |
|--------|---------|
| `Lean.Meta.Tactic.Rewrites` | Core rewrite infrastructure (`rw?`, `RewriteResult`, `rewriteCandidates`, etc.). |
| `Mathlib.Algebra.Order.Group.Nat` | Possibly for `nat`-based utilities (e.g., `log2`, ordering). |
| `Mathlib.Data.List.EditDistance.Estimator` | Provides `Levenshtein`, `Estimator`, `levenshtein`, `defaultCost`. |
| `Mathlib.Data.MLList.BestFirst` | Best-first search over monadic lists (`bestFirstSearchCore`, `prio`, `estimator`). |
| `Mathlib.Order.Interval.Finset.Nat` | Possibly for finite interval reasoning (used in `rw?` or `editDistance`). |
| `Batteries.Data.MLList.Heartbeats` | Enables `whileAtLeastHeartbeatsPercent` for bounded search. |

---

### Summary

`rw_search` is a **heuristic-based automated tactic** for solving equality goals via repeated rewriting. It uses **best-first search** guided by a **Levenshtein edit distance heuristic** on tokenized expressions, augmented with a **penalty function** to avoid overly long or late-lemma-heavy paths. It integrates deeply with Lean’s `rw?` infrastructure and supports backtracking via metavariable context management. The implementation is optimized for performance (via tokenization, lower-bound estimation, and heartbeat-based termination), but currently cannot use local hypotheses to discharge side conditions.

Let me know if you'd like a formalized specification or a diagram of the search graph.