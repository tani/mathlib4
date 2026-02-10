### Technical Brief: Maximal Chain Length in Partial Orders (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `subchain` | `Set (List α)` | Set of strictly ascending lists (w.r.t. `<`) contained in a given set `s`. |
| `chainHeight` | `ℕ∞` | Supremum (in `ℕ∞`) of lengths of all `subchain`s of `s`; i.e., maximal length of strictly ascending sequences in `s`. |
| `exists_chain_of_le_chainHeight` | `↑n ≤ s.chainHeight → ∃ l ∈ s.subchain, length l = n` | For any `n` ≤ height, there exists a chain of exact length `n`. |
| `le_chainHeight_TFAE` | `TFAE [↑n ≤ s.chainHeight, ∃ l ∈ s.subchain, length l = n, ∃ l ∈ s.subchain, n ≤ length l]` | Equivalence of three formulations of “`n` is ≤ height”. |
| `chainHeight_mono` | `s ⊆ t → s.chainHeight ≤ t.chainHeight` | Monotonicity of height under inclusion. |
| `chainHeight_image` | `f` order-embedding ⇒ `(f '' s).chainHeight = s.chainHeight` | Height preserved under order embeddings. |
| `chainHeight_insert_of_forall_gt` | `∀ b ∈ s, a < b ⇒ (insert a s).chainHeight = s.chainHeight + 1` | Inserting a new *minimal* element increases height by 1. |
| `chainHeight_insert_of_forall_lt` | `∀ b ∈ s, b < a ⇒ (insert a s).chainHeight = s.chainHeight + 1` | Inserting a new *maximal* element increases height by 1. |
| `chainHeight_union_eq` | `∀ a ∈ s, b ∈ t, a < b ⇒ (s ∪ t).chainHeight = s.chainHeight + t.chainHeight` | Height of disjoint union (with `s < t`) is additive. |
| `wellFoundedGT_of_chainHeight_ne_top` | `s.chainHeight ≠ ⊤ ⇒ WellFoundedGT s` | Finite height ⇒ `>` is well-founded on `s`. |
| `wellFoundedLT_of_chainHeight_ne_top` | `s.chainHeight ≠ ⊤ ⇒ WellFoundedLT s` | Finite height ⇒ `<` is well-founded on `s`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `chainHeight_`: properties of the height function.
  - `subchain_`: membership or properties of `subchain`.
  - `wellFounded*_of_chainHeight_ne_top`: consequences of finite height.
- **Suffixes**:
  - `_iff`: characterizations as biconditionals.
  - `_TFAE`: “The Following Are Equivalent” statements.
  - `_dual`: dual statements via order reversal (`OrderDual`).
- **Structure**:
  - `insert_of_forall_*`: behavior under insertion with universal order constraints.
  - `union_*`: behavior under union, often with separation condition.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `tfae_have`, `tfae_finish` | Structuring equivalence chains. |
| `rw [chainHeight_eq_iSup_subtype]` | Rewriting height as `iSup` over subtype. |
| `rcases`, `obtain`, `cases'` | Destructuring existential/universal hypotheses. |
| `simp only [...]` | Fine-grained simplification (e.g., list operations, `Chain'`, `mem`). |
| `apply le_antisymm` | Proving equality by bounding both ways. |
| `induction' l with x xs hx` | Induction on lists. |
| `rwa [...]` | Rewrite + assumption. |
| `convert ← ...` | Matching goals up to definitional equality. |
| `contrapose!` | Contrapositive + simplification. |
| `exacts [...]` | Supplying multiple goals at once. |

---

#### **4. Proof Logic & Strategy**

- **Inductive structure on lists** is common (e.g., proving `subchain` closure, `chainHeight_image`).
- **Supremum reasoning** via `iSup`/`sSup` in `ℕ∞` (especially `WithTop`/`ENat` lemmas).
- **Case analysis on `chainHeight = ⊤` or not**, using `WithTop.ne_top_iff_exists`.
- **Order duality** (`OrderDual`, `ofDual`) used to reduce symmetric cases (e.g., `forall_gt` ↔ `forall_lt`).
- **Filtering lists** to split chains over unions (`l.filter (· ∈ s)`, `l.filter (· ∈ t)`).
- **Well-foundedness proofs** via `no_descending_seq` criterion, using finite height to bound sequence length.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.ENat.Lattice` | `ℕ∞` arithmetic, lattice structure, `WithTop`, `ENat`. |
| `Mathlib.Order.OrderIsoNat` | Order isomorphisms with `ℕ`, used for finite chains. |
| `Mathlib.Tactic.TFAE` | “The Following Are Equivalent” infrastructure. |

**Domain**: Partial orders, with emphasis on chain structure, well-foundedness, and cardinality of maximal chains.  
**Key structures**: `Set α`, `List α`, `Preorder α`, `LT α`, `OrderDual α`.  
**Main codomain**: `ℕ∞` (extended naturals), enabling finite/infinite height uniformly.

--- 

Let me know if you'd like a diagram of dependencies or a formalized summary in a different format (e.g., Isabelle/Isar or Coq).