Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Relation Embeddings from ℕ**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `natLT` | `(f : ℕ → α) → (∀ n, r (f n) (f (n + 1))) → ((· < ·) : ℕ → ℕ → Prop) ↪r r` | Constructs an order embedding from a strictly `r`-increasing sequence. |
| `natGT` | `(f : ℕ → α) → (∀ n, r (f (n + 1)) (f n)) → ((· > ·) : ℕ → ℕ → Prop) ↪r r` | Constructs an order embedding from a strictly `r`-decreasing sequence (via `natLT` + `RelEmbedding.swap`). |
| `acc_iff_no_decreasing_seq` | `Acc r x ↔ IsEmpty { f : ((· > ·) ↪r r) // x ∈ Set.range f }` | Characterizes accessibility via non-existence of decreasing sequences hitting `x`. |
| `wellFounded_iff_no_descending_seq` | `WellFounded r ↔ IsEmpty (((· > ·) ↪r r))` | Fundamental equivalence: well-foundedness ⇔ no infinite decreasing sequences. |
| `orderEmbeddingOfSet` | `[DecidablePred (· ∈ s)] → ℕ ↪o ℕ` | Embeds `ℕ` into an infinite subset `s ⊆ ℕ` via `Nat.Subtype.ofNat`. |
| `Subtype.orderIsoOfNat` | `ℕ ≃o s` | Order isomorphism between `ℕ` and an infinite subset `s ⊆ ℕ`. |
| `exists_subseq_of_forall_mem_union` | `(e : ℕ → α) → (∀ n, e n ∈ s ∪ t) → ∃ g : ℕ ↪o ℕ, (∀ n, e (g n) ∈ s) ∨ ∀ n, e (g n) ∈ t` | Infinite pigeonhole principle for subsequences. |
| `exists_increasing_or_nonincreasing_subseq'` | `∃ g : ℕ ↪o ℕ, (∀ n, r (f (g n)) (f (g (n + 1)))) ∨ ∀ m < n, ¬r (f (g m)) (f (g n))` | Weak Erdős–Szekeres: any sequence has a monotone or antitone subsequence (w.r.t. `r`). |
| `exists_increasing_or_nonincreasing_subseq` | Same as above, but for transitive `r`, yields full monotonicity: `m < n → r(f(g m), f(g n))`. | Stronger version used in Bolzano–Weierstrass proofs. |
| `monotone_chain_condition'` | `WellFounded ((· > ·)) ↔ ∀ a : ℕ →o α, ∃ n, ∀ m ≥ n, ¬a n < a m` | Equivalent formulation of well-foundedness for preorders. |
| `monotone_chain_condition` | `WellFounded ((· > ·)) ↔ ∀ a : ℕ →o α, ∃ n, ∀ m ≥ n, a n = a m` | For partial orders: eventually constant monotone sequences. |
| `monotonicSequenceLimitIndex` | `ℕ` ( junk if not eventually constant ) | Least index where an eventually-constant monotone sequence stabilizes. |
| `monotonicSequenceLimit` | `α` | Value of the sequence at `monotonicSequenceLimitIndex`. |
| `WellFounded.iSup_eq_monotonicSequenceLimit` | Under well-foundedness, `iSup a = monotonicSequenceLimit a` for monotone `a`. | Connects supremum of monotone sequence with its eventual constant value. |
| `exists_covBy_seq_of_wellFoundedLT_wellFoundedGT` | `∃ a : ℕ → α, IsMin (a 0) ∧ ∃ n, IsMax (a n) ∧ ∀ i < n, a i ⋖ a (i + 1)` | Existence of a finite “covering chain” from min to max under both well-founded `<` and `>`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `natLT`, `natGT`: indicate construction from natural-number-indexed sequences, with direction (`LT`/`GT`).
  - `orderEmbeddingOfSet`, `Subtype.orderIsoOfNat`: indicate embeddings/isomorphisms derived from sets.
  - `monotonicSequenceLimit`, `monotonicSequenceLimitIndex`: indicate limit-related constructions for monotone sequences.

- **Suffixes**:
  - `_of_`: e.g., `ofSet`, `ofNat`, `of_wellFoundedLT_wellFoundedGT` — indicates derivation from a structure.
  - `_iff_`: e.g., `acc_iff_no_decreasing_seq`, `wellFounded_iff_no_descending_seq` — logical equivalences.
  - `'_` suffix: e.g., `monotone_chain_condition'`, `exists_increasing_or_nonincreasing_subseq'` — variants or weaker forms.

- **Relational notation**:
  - `((· < ·))`, `((· > ·))`: used to denote strict order embeddings.
  - `r`, `r'`, `r''`: generic binary relations; often `r` is assumed a strict order (`IsStrictOrder`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp only`: for rewriting and simplification (especially with `@[simp]` lemmas like `coe_natLT`).
- `exact`, `refine`, `intro`, `cases'`: core proof construction.
- `by_contradiction`, `contrapose!`: for negation-based arguments (e.g., in `acc_iff_no_decreasing_seq`).
- `convert`, `congr!`: for congruence-based equality proofs.
- `omega`: for arithmetic reasoning (e.g., in `exists_increasing_or_nonincreasing_subseq'`).
- `classical`: for classical reasoning (e.g., in `exists_subseq_of_forall_mem_union`).
- `have`, `obtain`, `choose`: for intermediate claims and choice functions.
- `apply`, `apply hnext`, `apply h`: for applying lemmas or hypotheses.

---

#### **4. Proof Logic Patterns**

- **Inductive/Recursive Construction**:
  - `natLT`, `natGT`: define embeddings from recursive properties (`r (f n) (f (n+1))`).
  - `orderEmbeddingOfSet`: builds embedding via composition of `natLT` and subtype inclusion.

- **Contrapositive & Minimality Arguments**:
  - `acc_iff_no_decreasing_seq`, `wellFounded_iff_no_descending_seq`: use minimal counterexamples or minimal elements to derive contradictions.

- **Choice & Subsequence Extraction**:
  - `exists_subseq_of_forall_mem_union`, `exists_increasing_or_nonincreasing_subseq'`: use infinite pigeonhole principle + choice to extract subsequences.

- **Transfinite/Inductive Reasoning on ℕ**:
  - `monotone_chain_condition`: leverages well-foundedness to bound monotone sequences.
  - `exists_covBy_seq_of_wellFoundedLT_wellFoundedGT`: constructs finite chains using recursion and minimality/maximality.

- **Equational Reasoning with `antisymm`**:
  - `iSup_eq_monotonicSequenceLimit`: proves equality by bounding above and below.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Data.Nat.Lattice`: lattice structure on `ℕ`.
- `Mathlib.Logic.Denumerable`: countability and enumerability.
- `Mathlib.Logic.Function.Iterate`: iteration of functions (used in `natGT` proof).
- `Mathlib.Order.Hom.Basic`: order homomorphisms, embeddings, isomorphisms.
- `Mathlib.Data.Set.Subsingleton`: properties of subsets with at most one element.

**Domain Scope**:
- **Order theory**: strict orders, well-foundedness, accessibility, embeddings.
- **Combinatorics**: Erdős–Szekeres theorem, infinite pigeonhole principle.
- **Topology/Analysis**: Bolzano–Weierstrass lemma (via `exists_increasing_or_nonincreasing_subseq`).
- **Lattice theory**: supremum of monotone sequences, completeness.

---

Let me know if you'd like a diagram of dependencies or a formalized summary for a specific theorem.