### Technical Metadata Brief: `Mathlib.Data.FiniteLists.ZFA`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Lists'.{u} (α : Type u) : Bool → Type u` | Inductive type | Helper type for ZFA prelists: `Lists' α false` = atoms (copy of `α`), `Lists' α true` = proper ZFA prelists (inductively built from `nil` and `cons'`). |
| `Lists α` | `Σb, Lists' α b` | ZFA lists: sum of atoms (`b = false`) and proper ZFA lists (`b = true`). |
| `Lists'.atom` | `α → Lists' α false` | Embeds elements of `α` as atoms. |
| `Lists'.nil` | `Lists' α true` | Empty proper ZFA prelist. |
| `Lists'.cons'` | `Lists' α b → Lists' α true → Lists' α true` | Appends any ZFA prelist to a proper one. |
| `Lists.cons` | `Lists α → Lists' α true → Lists' α true` | Appends a ZFA list to a proper ZFA prelist. |
| `Lists'.toList` | `∀ {b}, Lists' α b → List (Lists α)` | Converts ZFA prelists to lists of ZFA lists (atoms map to `[]`). |
| `Lists'.ofList` | `List (Lists α) → Lists' α true` | Converts a list of ZFA lists to a proper ZFA prelist. |
| `Lists.Equiv` | `Lists α → Lists α → Prop` | Inductive extensional equivalence of ZFA lists (refl + antisymm via `Subset`). |
| `Lists'.Subset` | `Lists' α true → Lists' α true → Prop` | Inductive subset relation for proper ZFA prelists. |
| `Lists.mem` | `Lists α → Lists α → Prop` | Membership: `a ∈ l` iff `a` is equivalent to some element in `toList l`. |
| `Lists.atom` | `α → Lists α` | Embeds `α` into `Lists α` as atoms. |
| `Lists.of'` | `Lists' α true → Lists α` | Embeds proper ZFA prelists into `Lists α`. |
| `Lists.IsList` | `Lists α → Prop` | Predicate: `IsList l` iff `l.1 = true`. |
| `Lists.inductionMut` | Recursion principle | Mutual induction on `Lists α` and `Lists' α true`. |
| `Lists.Equiv.antisymm_iff` | `of' l₁ ~ of' l₂ ↔ l₁ ⊆ l₂ ∧ l₂ ⊆ l₁` | Equivalence of proper ZFA lists ↔ mutual subset. |
| `Lists.Equiv.symm`, `Lists.Equiv.trans` | Symmetry & transitivity of `~` | Proven using mutual induction and subset properties. |
| `Lists.instSetoidLists` | `Setoid (Lists α)` | `~` is an equivalence relation (refl, symm, trans). |
| `Finsets α` | `Quotient (@Lists.instSetoidLists α)` | ZFA sets: equivalence classes of ZFA lists under `~`. |
| `Lists'.Subset.refl`, `Subset.trans` | Reflexivity & transitivity of `⊆` | Basic order-theoretic properties. |
| `Lists'.mem_cons` | `a ∈ cons b l ↔ a ~ b ∨ a ∈ l` | Membership in cons. |
| `Lists'.cons_subset` | `cons a l₁ ⊆ l₂ ↔ a ∈ l₂ ∧ l₁ ⊆ l₂` | Subset characterization of cons. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Lists'.*`: Definitions/operations on prelists (`Lists'`).
  - `Lists.*`: Definitions/operations on full ZFA lists (`Lists`).
  - `atom`: Embedding of base type elements.
  - `of'`, `ofList`: Constructions from prelists/lists to ZFA structures.
  - `to*`: Conversions *to* standard structures (e.g., `toList`, `to_ofList`).
- **Suffixes**:
  - `'` (prime): Often used for prelist versions (e.g., `cons'`, `atom'`).
  - `decidable`: Instances for decidable relations (e.g., `Equiv.decidable`, `Subset.decidable`).
- **Infix**:
  - `~` for `Lists.Equiv`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `induction'` / `induction` | Structural induction on `Lists'`, `toList`, `ofList`, etc. |
| `simp [*]`, `simp only [...]` | Simplification using `@[simp]` lemmas (e.g., `toList_cons`, `mem_cons`). |
| `rfl` | Reflexivity for definitional equalities. |
| `cases'` | Case analysis on inductive types or hypotheses (e.g., `Equiv`, `Subset`). |
| `exact`, `apply` | Direct proof steps, especially for subset/equivalence goals. |
| `rw [...]` | Rewriting using lemmas like `equiv_atom`, `cons_subset`, `of_toList`. |
| `decreasing_tactic` | Well-founded recursion termination proofs (used in decidability proofs). |
| `decidable_of_iff'` | Proving decidability via equivalence with decidable propositions. |
| `intro`, `rintro`, `rcases` | Intro/elimination for quantifiers and existentials. |
| `constructor` | Splitting conjunctions or bi-implications. |
| `ext` / `funext` | Extensionality (used implicitly via `subset_def`). |

---

#### **4. Proof Logic**

- **Inductive Structure**: Proofs heavily rely on *mutual induction* on `Lists α` and `Lists' α true`, especially for:
  - Equivalence (`Equiv.trans`, `Equiv.symm`)
  - Decidability of `~` and `⊆`
  - Recursion principles (`inductionMut`)

- **Subset Logic**:
  - `Subset` is defined inductively with `nil` and `cons` rules.
  - Key lemmas: `cons_subset`, `subset_def`, `Subset.trans`, `Subset.refl`.
  - Subset proofs often reduce to element-wise membership via `subset_def`.

- **Equivalence Logic**:
  - `Equiv` is defined via `refl` and `antisymm` (mutual subset).
  - `equiv_atom` simplifies atom equivalence to equality.
  - Transitivity uses mutual induction on list structure and membership chains.

- **Decidability**:
  - Proven via well-founded recursion on `sizeOf`.
  - Termination is justified using `decreasing_tactic` and `sizeof_pos`.

- **Quotient Construction**:
  - `Finsets` defined as `Quotient` of `Lists` by `~`.
  - Decidable equality on `Finsets` follows from decidability of `~`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Data.Sigma.Basic` | For `Σ` (dependent sum) and basic sigma calculus. |
| `Mathlib.Algebra.Order.Ring.Nat` | For `SizeOf`, `DecidableEq`, and ordering on `ℕ` (used in well-founded recursion and decidability). |

---

### Summary

This file formalizes a **computable model of Zermelo–Fraenkel set theory with Atoms (ZFA)** without the Axiom of Infinity, using *hereditarily finite lists*. It distinguishes atoms (from `α`) from proper lists (finite trees of lists), defines extensional equivalence (`~`) and subset (`⊆`) inductively, and constructs ZFA sets as equivalence classes (`Finsets`). The formalization emphasizes **computability**, with decidability results and explicit recursion principles. The design uses a two-layer approach (`Lists'` → `Lists`) to avoid type mismatches while preserving append consistency.