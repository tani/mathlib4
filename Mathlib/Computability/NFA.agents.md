### Technical Metadata Brief: Nondeterministic Finite Automata (NFA) in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `NFA` | `structure NFA (α : Type u) (σ : Type v)` | Defines an NFA over alphabet `α` and state space `σ`, with `step : σ → α → Set σ`, `start : Set σ`, `accept : Set σ`. |
| `stepSet` | `def stepSet (S : Set σ) (a : α) : Set σ` | Computes the set of all possible next states from a set `S` on input `a`. |
| `evalFrom` | `def evalFrom (start : Set σ) : List α → Set σ` | Evaluates all possible paths from a set of starting states on a list of inputs. |
| `eval` | `def eval : List α → Set σ` | Evaluates all possible paths from the initial start states (`M.start`). |
| `accepts` | `def accepts : Language α` | Language accepted by the NFA: strings `x` such that some accept state is reachable via `M.eval x`. |
| `toDFA` | `def toDFA : DFA α (Set σ)` | Subset construction: converts NFA to DFA with states as subsets of NFA states. |
| `toDFA_correct` | `theorem toDFA_correct : M.toDFA.accepts = M.accepts` | Proves correctness of subset construction: NFA and constructed DFA accept same language. |
| `pumping_lemma` | `theorem pumping_lemma [Fintype σ] ...` | Pumping lemma for NFAs (via reduction to DFA case). Requires finiteness of state space. |
| `toNFA` | `def toNFA (M : DFA α σ') : NFA α σ'` | Embeds a DFA as an NFA (singleton transition sets, singleton start). |
| `toNFA_evalFrom_match` | `theorem toNFA_evalFrom_match ...` | Shows evaluation in `toNFA M` corresponds to evaluation in `M`. |
| `toNFA_correct` | `theorem toNFA_correct : M.toNFA.accepts = M.accepts` | Proves that embedding a DFA into an NFA preserves accepted language. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `stepSet`: indicates set-based transition (vs. single-state `step`).
  - `evalFrom`: evaluation from a *set* of states.
  - `eval`: evaluation from the *initial* start set.
  - `toDFA` / `toNFA`: conversion functions between automata models.
- **Suffixes**:
  - `_correct`: correctness theorems for constructions/encodings.
  - `_match`: theorems showing equivalence of evaluation semantics across representations.
- **Predicates**:
  - `mem_accepts`, `mem_stepSet`: membership characterizations.
- **Variables**:
  - `S`, `start`, `S ∈ M.start`, etc., consistently used for sets of states.
  - `x`, `a`, `b`, `c`, `s`, `t` for inputs and states.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification using definitional equalities and lemmas (`evalFrom_nil`, `mem_stepSet`, etc.).
- `rw`: rewriting using equalities like `toDFA_correct`, `toNFA_correct`, `evalFrom_append_singleton`.
- `induction'`: structural induction on lists (e.g., in `toNFA_evalFrom_match`).
- `tauto`: for propositional logic reasoning (especially after `simp` or `rw`).
- `rwa`: rewrite + assumption (used in `toNFA_correct`).
- `exact`: direct proof term application.
- `ext`: extensionality to prove equality of sets/languages.

---

#### **4. Proof Logic**

- **General Strategy**:
  - Prove correctness of constructions (`toDFA`, `toNFA`) by extensionality (`ext x`) and unfolding definitions (`mem_accepts`, `DFA.mem_accepts`, etc.).
  - Use induction on input lists for evaluation lemmas (`evalFrom_append_singleton`, `toNFA_evalFrom_match`).
  - Reduce NFA properties to DFA equivalents via `toDFA_correct` (e.g., pumping lemma).
- **Inductive Patterns**:
  - List induction (`induction' s with a s ih`) is standard for reasoning about `evalFrom`.
  - Case analysis on membership (`mem_stepSet`) via `∃-elim`.
- **Set-theoretic Reasoning**:
  - Union over sets (`⋃ s ∈ S, ...`) and singleton reasoning (`Set.mem_singleton_iff`) are central.

---

#### **5. Imports**

- `Mathlib.Computability.DFA`: Provides the `DFA` definition and related lemmas (e.g., `DFA.pumping_lemma`, `DFA.mem_accepts`).
- `Mathlib.Data.Fintype.Powerset`: Supplies `Fintype (Set σ)` when `σ` is finite — crucial for `pumping_lemma`.

> **Note**: The module is self-contained for NFA/DFA equivalence and pumping lemma, but relies on Mathlib’s existing DFA infrastructure.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a diagram of the NFA/DFA conversion pipeline.