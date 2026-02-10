### Technical Metadata Brief: Kőnig’s Infinity Lemma in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exists_seq_covby_of_forall_covby_finite` | `(hfin : ∀ a, {x | a ⋖ x}.Finite) → (hb : (Ici b).Infinite) → ∃ f : ℕ → α, f 0 = b ∧ ∀ i, f i ⋖ f (i+1)` | Main form of Kőnig’s lemma for strongly atomic partial orders: constructs an infinite chain starting at `b`. |
| `exists_orderEmbedding_covby_of_forall_covby_finite` | Same hypotheses as above → `∃ f : ℕ ↪o α, f 0 = b ∧ ∀ i, f i ⋖ f (i+1)` | Refines the previous result by ensuring the sequence is an *order embedding*, i.e., strictly increasing and order-preserving. |
| `exists_orderEmbedding_covby_of_forall_covby_finite_of_bot` | `[OrderBot α] [Infinite α] → (∀ a, {x | a ⋖ x}.Finite) → ∃ f : ℕ ↪o α, f 0 = ⊥ ∧ ∀ i, f i ⋖ f (i+1)` | Special case where the sequence starts at the bottom element of an infinite strongly atomic order. |
| `GradeMinOrder.exists_nat_orderEmbedding_of_forall_covby_finite` | `[GradeMinOrder ℕ α] [OrderBot α] [Infinite α] → (∀ a, {x | a ⋖ x}.Finite) → ∃ f : ℕ ↪o α, f 0 = ⊥ ∧ (∀ i, f i ⋖ f (i+1)) ∧ ∀ i, grade(f i) = i` | Adds grading compatibility: the sequence respects the grading function (`grade`). |
| `exists_seq_forall_proj_of_forall_finite` | `{α : ℕ → Type*} [Finite (α 0)] [∀ i, Nonempty (α i)] → (π : i ≤ j → α j → α i) → ... → ∃ f : (i : ℕ) → α i, ∀ i ≤ j, π hij (f j) = f i` | Kőnig’s lemma for inverse systems (graded types with projections); constructs a compatible sequence across the system. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exists_..._of_...`: Existential statements derived from finiteness/infinite assumptions.
  - `of_...`: Indicates the source or context of the lemma (e.g., `of_forall_covby_finite`, `of_bot`).
- **Suffixes**:
  - `_covby`: Indicates the relation used is *cover* (`⋖`).
  - `_orderEmbedding`: Output is an `OrderEmbedding`.
  - `_seq`: Output is a sequence (function `ℕ → α`).
- **Other**:
  - `GradeMinOrder.*`: Lemmas specific to graded orders with minimal element.
  - `proj`: Pertains to projection maps in inverse systems.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `obtain ⟨...⟩ := ...` | Destructuring existential or conjunction results. |
| `refine ⟨...⟩` | Constructing structured objects (e.g., order embeddings, sequences). |
| `induction' i with i ih` | Induction on natural numbers. |
| `simp [*, ...]` / `simp_rw [...]` | Simplification using definitions, especially for `Ici`, `covBy`, `GradeMinOrder`. |
| `apply_fun` | Applying a function to both sides of an equality (e.g., to project components). |
| `rw [...]` / `rwa [...]` | Rewriting using equalities or assumptions. |
| `exact`, `convert`, `congr_arg` | Finishing or aligning goals. |
| `aesop` (not present here) — *absent*, but could be used for routine reasoning. |
| `ring` (not present) — *absent*, though arithmetic reasoning is handled via `simp` and `rw`. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Step 1**: Define a suitable partial order on a sigma-type (e.g., `αs = Σ i, α i`) to encode the inverse system structure.
  - **Step 2**: Characterize the cover relation (`⋖`) in terms of the grading (e.g., `a ⋖ b ↔ a ≤ b ∧ a.1 + 1 = b.1`).
  - **Step 3**: Show the constructed order is *strongly atomic*.
  - **Step 4**: Apply the core lemma `exists_orderEmbedding_covby_of_forall_covby_finite`, which itself uses:
    - A recursive construction (`Nat.rec`) picking covers of infinite upper sets.
    - The `exists_covby_infinite_Ici_of_infinite_Ici` helper (from `Mathlib.Order.Grade`).
  - **Step 5**: For graded versions, verify compatibility with grading via `CovBy.grade`.

- **Inductive/Recursive Core**:
  - The main proof uses `Nat.rec` to build a sequence `ks : ℕ → {a // (Ici a).Infinite}`.
  - Each step picks a cover of the current element that still has infinitely many elements above it (guaranteed by finiteness of covers and infiniteness of `Ici`).

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Order.Atoms.Finite` | Provides tools for reasoning about atoms and finite sets in orders (e.g., `exists_covby_infinite_Ici_of_infinite_Ici`). |
| `Mathlib.Order.Grade` | Defines graded orders, `grade`, and properties like `CovBy.grade`. |
| `Mathlib.Tactic.ApplyFun` | Enables applying functions to equalities (used in `hcovby` proof). |

---

#### **Summary**

This module formalizes Kőnig’s infinity lemma in multiple forms, emphasizing the *strongly atomic order* perspective. It avoids heavy categorical machinery (unlike the more general `nonempty_sections_of_finite_cofiltered_system`) and instead uses elementary order-theoretic constructions and induction. The proofs are constructive in nature (via recursion), and the results are tailored for applications in combinatorics, logic, and type theory (e.g., infinite paths in trees, inverse limits of types).