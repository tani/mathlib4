### Technical Brief: Deterministic Finite Automata in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DFA (α : Type u) (σ : Type v)` | `structure` | Defines a DFA: transition function `σ → α → σ`, start state `σ`, accept set `Set σ`. |
| `evalFrom (s : σ) : List α → σ` | `def` | Evaluates DFA from arbitrary start state `s` on input list. Defined as `List.foldl step s`. |
| `eval : List α → σ` | `def` | Evaluates DFA from start state: `eval = evalFrom start`. |
| `acceptsFrom (s : σ) : Language α` | `def` | Language of strings accepted when starting from state `s`. |
| `accepts : Language α` | `def` | Language accepted by DFA: `acceptsFrom start`. |
| `mem_acceptsFrom` | `x ∈ M.acceptsFrom s ↔ M.evalFrom s x ∈ M.accept` | Membership criterion for `acceptsFrom`. |
| `mem_accepts` | `x ∈ M.accepts ↔ M.eval x ∈ M.accept` | Membership criterion for `accepts`. |
| `evalFrom_of_append` | `M.evalFrom start (x ++ y) = M.evalFrom (M.evalFrom start x) y` | Semantics of concatenation in evaluation. |
| `evalFrom_split` | Under `Fintype σ`, long enough input has a loop decomposition | Core technical lemma for pumping lemma. |
| `evalFrom_of_pow` | If `M.evalFrom s x = s`, then `M.evalFrom s y = s` for all `y ∈ {x}*` | Behavior under Kleene star of a loop. |
| `pumping_lemma` | For long enough accepted word, exists decomposition satisfying pumping conditions | Classic pumping lemma for regular languages. |
| `comap (f : α' → α)` | `DFA α σ → DFA α' σ` | Pullback of alphabet along `f`; input transformed before processing. |
| `reindex (g : σ ≃ σ')` | `DFA α σ ≃ DFA α σ'` | Equivalence-induced isomorphism on DFAs (relabeling states). |
| `Language.IsRegular` | `Prop` | `L` is regular iff ∃ finite `σ`, ∃ DFA `M` over `σ`, `M.accepts = L`. |
| `proof_wanted Language.isRegular_iff` | `↔` | Open goal: equivalence of two forms of definition (likely for universe polymorphism). |

---

#### **2. Naming Conventions**

- **Predicates / properties**:  
  - `is_` prefix: `IsRegular`  
  - `mem_` prefix: `mem_accepts`, `mem_acceptsFrom` (membership lemmas)  
- **Evaluation**:  
  - `evalFrom`, `eval` — standard evaluation functions  
  - `evalFrom_*` lemmas (e.g., `evalFrom_nil`, `evalFrom_singleton`, `evalFrom_append_singleton`)  
- **Alphabet/state transformations**:  
  - `comap` — pullback along alphabet map  
  - `reindex` — reindexing via state equivalence  
- **Simp lemmas**:  
  - All `@[simp]` theorems follow pattern: `evalFrom_*`, `eval_*`, `accepts_*`, `comap_*`, `reindex_*`  
- **Helper lemmas**:  
  - `of_*` (e.g., `evalFrom_of_append`, `evalFrom_of_pow`) — often describe behavior under structural decomposition  
  - `split`, `pumping_lemma` — named after standard automata theory results  

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | Reflexivity for definitional equalities (e.g., `evalFrom_nil`) |
| `simp` / `simp only [...]` | Simplification using `@[simp]` lemmas; heavily used in evaluation proofs |
| `induction' ... using List.list_reverse_induction` | Structural induction on lists (reverse order for better `append` handling) |
| `rw [...]` | Rewriting using lemmas (e.g., `evalFrom_of_append`, `List.take_append_drop`) |
| `rcases` / `cases` | Decomposing existential or conjunction hypotheses |
| `substs` | Substituting equalities after `rcases` on equalities |
| `norm_num` | For numeric goals (e.g., `Fintype.card σ ≤ x.length`) |
| `conv` + `rhs` + `rw [...]` | Focused rewriting on right-hand side of equivalence |
| `apply'`, `assumption'` | In `have`/`obtain` contexts for automation |
| `exact`, `apply` | For direct proof steps (e.g., `apply ih`) |

---

#### **4. Proof Logic**

- **Inductive structure**:  
  - Most proofs about `evalFrom` use **list induction** (often `list_reverse_induction`), leveraging `List.foldl` definition.
- **Loop extraction**:  
  - `evalFrom_split` uses pigeonhole principle (`Fintype.exists_ne_map_eq_of_card_lt`) to find repeated state in short prefix → yields decomposition `a ++ b ++ c` with `b` looping.
- **Kleene star handling**:  
  - `evalFrom_of_pow` proves invariance under `*`-closure of a loop via induction on list decomposition (`Language.mem_kstar`).
- **Pumping lemma derivation**:  
  - Combines `evalFrom_split` with `evalFrom_of_pow` and closure properties (`Language.mem_mul`, `Language.mem_kstar`) to build pumped strings.
- **Equivalence & pullback reasoning**:  
  - `comap` and `reindex` proofs rely on `@[simps]` and `simp` to reduce to component-wise equalities; often use `ext` + `simp` for extensionality.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Computability.Language` | Core language theory: `Language`, `Language.mem_kstar`, `Language.mem_mul`, `Language.IsRegular` |
| `Mathlib.Data.Fintype.Card` | Finite type cardinality tools: `Fintype.card`, `Fintype.exists_ne_map_eq_of_card_lt` |
| `Mathlib.Data.List.Indexes` | List indexing and decomposition lemmas (e.g., `take`, `drop`, `append`) |
| `Mathlib.Tactic.NormNum` | Numeric normalization (e.g., for `Fintype.card σ ≤ x.length`) |

**Scope**:  
- Formalizes classical DFA theory in dependent type theory.  
- Supports infinite-state automata (no `Fintype σ` required), but pumping lemma and regularity require finiteness.  
- Designed for composability: `comap`, `reindex` enable categorical-style reasoning (pullbacks, isomorphisms).  
- `Language.IsRegular` is defined extensionally (`M.accepts = L`), matching standard automata-theoretic view.

---

Let me know if you'd like a formalized summary of the pumping lemma or a tactic guide for automata proofs in Mathlib.