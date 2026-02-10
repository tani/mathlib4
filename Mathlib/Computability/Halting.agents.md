### Technical Metadata Brief: Computability Theory in Lean 4 (`Mathlib.Computability.Partrec`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Partrec` | `α →. β → Prop` | Predicate for *partial recursive functions* (i.e., computable partial functions). |
| `Partrec₂` | `α → β →. γ → Prop` | Binary partial recursive functions (curried via `Partrec (α × β) →. γ`). |
| `ComputablePred` | `(α → Prop) → Prop` | Predicate for *computable predicates* (decidable with computable indicator). |
| `RePred` | `(α → Prop) → Prop` | *Recursively enumerable* predicates: domains of partial recursive functions. |
| `merge'` | `Partrec f → Partrec g → ∃ k, Partrec k ∧ ...` | Merges two partial functions into one whose graph is union of graphs, domain is union of domains. |
| `merge` | `Partrec f → Partrec g → (∀ a x y, x ∈ f a → y ∈ g a → x = y) → ∃ k, ...` | Disjoint merge: if outputs agree where both defined, merge into single function. |
| `cond` | `Computable c → Partrec f → Partrec g → Partrec (λ a ↦ if c a then f a else g a)` | Conditional construction using a computable Boolean guard. |
| `rice` | `(C : Set (ℕ →. ℕ)) → ComputablePred (eval ∈ C) → f ∈ C → g ∈ C` | **Rice’s Theorem**: nontrivial semantic properties of partial recursive functions are undecidable. |
| `rice₂` | `(C : Set Code) → (∀ cf cg, eval cf = eval cg → (cf ∈ C ↔ cg ∈ C)) → ...` | Syntactic version of Rice’s theorem for sets of *codes*. |
| `halting_problem_re` | `RePred (λ c ↦ (eval c n).Dom)` | The halting set is r.e. |
| `halting_problem` | `¬ComputablePred (λ c ↦ (eval c n).Dom)` | The halting problem is not decidable. |
| `computable_iff_re_compl_re` | `ComputablePred p ↔ RePred p ∧ RePred (¬p)` | **Post’s Theorem**: a decidable predicate is computable iff both it and its complement are r.e. |
| `Partrec'` | `Vector ℕ n →. ℕ → Prop` | Simplified inductive basis for partial recursive functions (used for formalization convenience). |
| `part_iff` | `Partrec' f ↔ Partrec f` | Equivalence of simplified and standard definitions of partial recursiveness. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Not used here; instead, predicates like `ComputablePred`, `RePred` are used directly.
  - `part_`, `partrec_`: e.g., `part_iff`, `part_iff₁`, `part_iff₂`, `part_iff₂`.
  - `merge_`, `cond`, `rice`, `halting_problem`: descriptive function names.
- **Suffixes**:
  - `'` (prime): e.g., `merge'`, `Partrec'`, `prim'`, `of_eq'` — often indicates a refined or auxiliary version.
  - `_re`, `_re_compl_re`: suffixes indicating relationship to r.e. sets.
- **Quantifier/Structure Indicators**:
  - `₂`, `₁`: indicate arity (binary/unary), e.g., `Partrec₂`, `part_iff₁`, `part_iff₂`.
  - `of_eq`, `of_eq'`: indicate proof of equivalence under extensionality.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `obtain` / `cases'` | Extract witnesses or decompose existential/universal hypotheses. |
| `simp` / `simp only` | Simplify goals using definitional equalities and lemmas (e.g., `Part.mem_def`, `dom_iff_mem`). |
| `rw` / `rwa` | Rewrite using equalities or equivalences (often with `←`, `symm`). |
| `refine` | Construct proofs with holes to be filled later (common in `obtain` chains). |
| `convert` | Match goal to a known theorem up to definitional equality. |
| `aesop` | Not present — Lean 4 version likely avoids heavy automation in core computability. |
| `ring` / `linarith` | Not used — arithmetic reasoning is mostly symbolic (e.g., `tsub_eq_zero_iff_le`). |
| `induction` | Used in `of_part` proof for `Partrec'`. |
| `funext`, `propext` | Extensionality for functions and propositions. |
| `dsimp`, `unfold`, `change` | Manual simplification of definitions (e.g., `RePred`, `Part.dom_iff_mem`). |
| `apply Decidable.em` | Classical reasoning (LEM) for decidability. |

---

#### **4. Proof Logic & Strategy**

- **Inductive Structure**: Proofs often proceed by induction on the *code* of a partial recursive function (via `Code.exists_code`), or on the `Partrec'` inductive definition.
- **Extensionality & Uniqueness**: Many proofs use `funext`, `propext`, and `mem_unique` to identify functions/predicates up to extensional equality.
- **Domain Analysis**: Key lemmas like `merge'`, `cond`, `rice` rely on reasoning about domains (`Dom`) and membership (`mem`), often via `dom_iff_mem`, `Part.mem_map_iff`, etc.
- **Reduction & Encoding**: Heavy use of encodings (`encode`, `decode`, `encodek`) to reduce to `ℕ`-valued functions.
- **Diagonalization / Fixed Points**: `fixed_point₂` used in `rice` to construct self-referential programs.
- **Equivalence Chains**: Many theorems are proven via `↔`-chains (e.g., `computable_iff_re_compl_re`), often using `classical` to handle LEM/Markov.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Computability.PartrecCode`: Provides `Code`, `eval`, `evaln`, `Partrec`, `Primrec`, etc.
  - `Mathlib.Data.Set.Subsingleton`: Used for uniqueness reasoning in sets (e.g., domains of partial functions).
- **Open Namespaces**:
  - `List.Vector`, `Encodable`, `Denumerable`: For encoding/decoding and vector operations.
  - `Computable`, `Part`, `Nat.Partrec`, `Nat.Partrec.Code`: Core computability infrastructure.
- **Scope**:
  - Formalization of *classical* computability theory over `ℕ`.
  - Covers: partial recursive functions, Rice’s theorem, halting problem, Post’s theorem, r.e. sets, decidability.
  - Does *not* assume Markov’s principle or constructivity — uses classical logic (`classical` tactic).

---

### Summary

This module formalizes foundational results in computability theory in Lean 4, with a focus on *partial recursive functions* and their logical properties. It uses a combination of inductive definitions (`Partrec'`), encoding techniques, and classical reasoning to prove major theorems like Rice’s and the undecidability of the halting problem. The naming and structure reflect Lean’s emphasis on modularity, extensionality, and definitional clarity.