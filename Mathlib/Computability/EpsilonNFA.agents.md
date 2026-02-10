### Technical Metadata Brief: `Mathlib.Computability.EpsilonNFA`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `εNFA` | `structure εNFA (α : Type u) (σ : Type v)` | Defines an ε-NFA with states `σ`, alphabet `α`, transition function `step : σ → Option α → Set σ`, start set `start : Set σ`, and accept set `accept : Set σ`. Allows ε-transitions via `none` input. |
| `εClosure S` | `inductive εClosure (S : Set σ) : Set σ` | Inductively defines the set of states reachable from `S` via any finite number of ε-transitions (`step s none`). |
| `stepSet S a` | `def stepSet (S : Set σ) (a : α) : Set σ` | Computes all states reachable from `S` on input `a`, followed by ε-closure: `⋃ s ∈ S, εClosure (step s a)`. |
| `evalFrom start x` | `def evalFrom (start : Set σ) : List α → Set σ` | Evaluates all possible paths of the automaton starting from `start` on input list `x`, using `stepSet` and ε-closure. |
| `eval x` | `def eval := evalFrom start` | Specialization of `evalFrom` to start from `M.start`. |
| `accepts` | `def accepts : Language α` | Language accepted by `M`: all strings `x` where some accept state is in `eval x`. |
| `toNFA` | `def toNFA : NFA α σ` | Converts an ε-NFA to an equivalent NFA by folding ε-closure into transitions and start states. |
| `toεNFA` | `def toεNFA (M : NFA α σ) : εNFA α σ` | Embeds an NFA into ε-NFAs by ignoring ε-transitions (`step s a` maps to `∅` on `none`). |
| `pumping_lemma` | `theorem pumping_lemma [Fintype σ] ...` | Derives the pumping lemma for ε-NFAs via reduction to NFA pumping lemma. |
| `Zero`, `One` instances | `instance : Zero / One (εNFA α σ)` | Defines zero automaton (no transitions, no start/accept), and one automaton (no transitions, all states start/accept). |

**Key lemmas:**
- `subset_εClosure`: `S ⊆ εClosure S`
- `εClosure_empty`: `εClosure ∅ = ∅`
- `mem_stepSet_iff`: Characterizes membership in `stepSet`.
- `evalFrom_nil`, `evalFrom_append_singleton`: Structural recursion on lists.
- `toNFA_correct`, `toεNFA_correct`: Semantic equivalence of conversions.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `εClosure`: Indicates ε-closure computation.
  - `stepSet`: Union of transitions over a set, possibly with ε-closure.
  - `evalFrom`, `eval`: Evaluation semantics.
  - `toNFA`, `toεNFA`: Conversion functions.

- **Suffixes:**
  - `_match`: Indicates definitional equality with a related structure (e.g., `toNFA_evalFrom_match`).
  - `_correct`: Semantic equivalence (e.g., `toNFA_correct`).
  - `_empty`, `_univ`, `_singleton`: For special cases (empty set, universal set, singleton list).

- **Structure fields:**
  - `step`, `start`, `accept`: Standard automaton components.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp_rw`: Rewriting with simplification lemmas (e.g., `mem_stepSet_iff`).
- `induction' ... using List.reverseRecOn`: Structural induction on lists.
- `ext`: Extensionality for set equality.
- `aesop`: Automated reasoning for simple goals (e.g., in `εClosure_empty`).
- `rw`, ` rfl`, `exact`, `assumption`: Basic proof automation.
- `intro`, `cases`: For inductive definitions (`εClosure`).

---

#### **4. Proof Logic**

- **Inductive definitions** (`εClosure`) are handled via induction on the inductive type.
- **Set equalities** are proven by double inclusion (`ext` + `intro` + `cases`).
- **List-based semantics** (`evalFrom`) are proven by induction on lists, often using `List.reverseRecOn` or `List.induction_on`.
- **Conversion correctness** (`toNFA_correct`, `toεNFA_correct`) rely on definitional equality of `evalFrom` and `accepts`, after simplifying auxiliary definitions (e.g., `εClosure`, `stepSet`).
- **Pumping lemma** reduces to the NFA case via `toNFA_correct` and existing NFA pumping lemma.

---

#### **5. Imports & Dependencies**

- **Primary import:** `Mathlib.Computability.NFA`  
  → Provides the `NFA` type and its semantics (used for conversion and pumping lemma).
- **Uses:**
  - `Set` (via `open Set`)
  - `Computability` (via `open Computability`)
  - `Fintype` (for pumping lemma)
  - `List` (implicit via `List.foldl`, `List.reverseRecOn`, etc.)

---

#### **Domain-Specific AI Agent Notes**

- **Focus area:** Formalization of automata theory, especially handling ε-transitions and equivalence with NFAs.
- **Key reasoning patterns:**
  - Inductive definitions over sets/states.
  - Semantic preservation via definitional equalities.
  - Reductions between automata models (εNFA ↔ NFA).
- **Common proof obligations:**
  - Proving set equalities (via extensionality).
  - Reasoning about reachability via transitions + ε-closure.
  - Induction on input strings (lists).
- **Critical lemmas for automation:**
  - `mem_stepSet_iff`, `evalFrom_nil`, `evalFrom_append_singleton`, `toNFA_evalFrom_match`, `toεNFA_εClosure`.

--- 

Let me know if you'd like a visualization of the data flow or a tactic recommendation engine for this module.