### Technical Brief: `Mathlib.Tactic.TFAE`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `getTFAEList (t : Expr)` | Extracts the list of propositions `[P₁, P₂, ...]` from a `TFAE [...]` goal expression. Returns `(Q(List Prop), List Q(Prop))`. |
| `dfs (i j : ℕ) (P P' : Q(Prop)) (hP : Q($P))` | Depth-first search over implication/iff edges to construct a proof path from `Pᵢ` to `Pⱼ`. Uses state monad to track visited nodes. |
| `proveImpl (i j : ℕ) (P P' : Q(Prop))` | Constructs a proof of `Pᵢ → Pⱼ` using `dfs`, introducing a local hypothesis for `Pᵢ`. |
| `proveChain (i : ℕ) (is : List ℕ) (P : Q(Prop)) (l : Q(List Prop))` | Builds a proof of `Chain (· → ·) P l`, i.e., a chain of implications `P → P₂ → ... → Pₙ`. |
| `proveGetLastDImpl (i i' : ℕ) (is : List ℕ) (P P' : Q(Prop)) (l : Q(List Prop))` | Constructs a proof of `getLastD l P' → P`, used in the cycle argument for `TFAE`. |
| `proveTFAE (is : List ℕ) (l : Q(List Prop))` | Main proof constructor for `TFAE [P₁, ..., Pₙ]`, combining `proveChain` and `proveGetLastDImpl`. |
| `mkTFAEId (tfaeType)` | Generates a canonical hypothesis name like `tfae_1_to_3`, `tfae_2_from_1`, or `tfae_1_iff_2`. |
| `elabIndex (i : TSyntax `num`) (maxIndex : ℕ)` | Validates and converts a syntax number to a 1-based index within bounds `[1, maxIndex]`. |
| `elabTFAEType (tfaeList : List Q(Prop))` | Given indices `i`, `j`, and arrow `arr`, constructs the target proposition type `Pᵢ arr Pⱼ`. |
| `tfae_have` tactic | Introduces a hypothesis of the form `Pᵢ → Pⱼ`, `Pᵢ ← Pⱼ`, or `Pᵢ ↔ Pⱼ`, with full `have`-style syntax support. |
| `tfae_finish` tactic | Closes a `TFAE [...]` goal by constructing a cycle using available hypotheses via `proveTFAE`. |

---

#### **2. Naming Conventions**

- **Hypothesis names**: `tfae_<i>_<arrow>_<j>`  
  - `<arrow>` = `"to"`, `"from"`, or `"iff"` depending on `→`, `←`, `↔`.
  - Example: `tfae_1_to_3`, `tfae_2_iff_3`.

- **Syntax elements**:
  - `tfaeType`, `tfaeHaveDecl`, `tfaeHaveIdLhs`, `tfaeHavePatDecl`, `tfaeHaveEqnsDecl`: follow Lean’s `have`-style naming but specialized for TFAE.
  - `impTo`, `impFrom`, `impIff`, `impArrow`: internal arrow parsers.

- **Internal functions**:
  - `prove*`, `get*`, `elab*`, `mk*`: standard Lean naming for elaboration, extraction, and proof construction.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities in this module:

| Tactic / Utility | Usage |
|------------------|-------|
| `withLocalDeclD` | Introduce local hypothesis for implication proofs. |
| `mkLambdaFVars` | Build lambda abstractions for implications. |
| `whnfR`, `instantiateMVars`, `inferType` | Normalize and inspect expressions. |
| `AtomM.run` | Manage atomization of propositions for indexing. |
| `Term.addTermInfo'` | Attach hover info for IDE support. |
| `logWarning` | Emit deprecation warnings for old syntax. |
| `MacroM`, `TermElabM`, `MetaM` | Monadic contexts for macro expansion, elaboration, and metaprogramming. |
| `StateT (Std.HashSet ℕ)` | Track visited nodes in DFS. |
| `getLocalHyps`, `getMainGoal`, `replaceMainGoal` | Standard tactic introspection/modification. |

---

#### **4. Proof Logic**

The core proof strategy for `TFAE [P₁, ..., Pₙ]`:

1. **Input**: A list of propositions `[P₁, ..., Pₙ]` and a set of hypotheses of the form `Pᵢ → Pⱼ` or `Pᵢ ↔ Pⱼ`.
2. **Atomization**: Each proposition is assigned a unique atom (via `AtomM.addAtom`) to enable indexing.
3. **Graph Construction**: Hypotheses are stored as edges `(i, j, h)` where `h : Pᵢ → Pⱼ` (or `Pᵢ ↔ Pⱼ` → two edges).
4. **Cycle Construction**:
   - `proveChain`: Builds a chain `P₁ → P₂ → ... → Pₙ`.
   - `proveGetLastDImpl`: Builds `Pₙ → P₁` (or uses `getLastD` fallback).
5. **Final Proof**: Combine chain and closing edge via `tfae_of_cycle` to conclude `TFAE [...]`.

The logic relies on the equivalence:
> `TFAE [P₁, ..., Pₙ] ↔ Chain (· → ·) P₁ [P₂, ..., Pₙ] ∧ getLastD [...] → P₁`

This is formalized in `Mathlib.Data.List.TFAE`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Qq` | Quasi-quotation for metaprogramming (used for `q(...)`, `~q(...)`, etc.). |
| `Mathlib.Data.Nat.Notation` | Natural number syntax and notation. |
| `Mathlib.Util.AtomM` | Manages atomization of propositions for indexing. |
| `Mathlib.Data.List.TFAE` | Core mathematical content: definition of `TFAE`, lemmas like `tfae_of_cycle`. |
| `Mathlib.Tactic.ExtendDoc` | Documentation extension support. |

---

### Summary

This module implements a **domain-specific tactic** for proving *“the following are equivalent”* statements in Lean 4. It combines **syntax parsing**, **metaprogramming**, and **graph-based proof search** (DFS) to automate the construction of equivalence cycles. The design mirrors Lean’s `have` tactic for ergonomics, while enforcing correctness via index bounds and structural constraints on the `TFAE` goal. The deprecated “goal-style” syntax is preserved for backward compatibility but emits warnings unless explicitly enabled.