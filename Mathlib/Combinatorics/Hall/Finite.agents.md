### Technical Metadata Brief: Hall’s Marriage Theorem for Finite Index Types (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hall_cond_of_erase` | `∀ x a, (∀ s ≠ ∅, s ≠ univ → #s < #s.biUnion t) → #s' ≤ #s'.biUnion (t x' ∖ {a})` | Shows Hall’s condition holds after removing an element `a` from all sets, used in inductive step A. |
| `hall_hard_inductive_step_A` | `Fintype.card ι = n + 1 → (∀ s, #s ≤ #s.biUnion t) → (∀ ι', card ι' ≤ n → Hall holds) → (∀ s ≠ ∅, s ≠ univ → #s < #s.biUnion t) → ∃ injective choice function` | First inductive case: strict inequality in Hall condition ⇒ construct injective function via restriction and extension. |
| `hall_cond_of_restrict` | `∀ s', #s' ≤ #s'.biUnion t` | Hall condition preserved under restriction to a subset `s ⊆ ι`. |
| `hall_cond_of_compl` | `#s = #s.biUnion t → (∀ s, #s ≤ #s.biUnion t) → #s' ≤ #s'.biUnion (t x' \ s.biUnion t)` | Hall condition for complement domain/codomain when equality holds on a subset. |
| `hall_hard_inductive_step_B` | Same premises as A, but assumes *equality* for some proper nonempty subset `s` ⇒ construct injective function by combining solutions on `s` and `sᶜ`. | Second inductive case: equality in Hall condition for some `s` ⇒ split domain and codomain. |
| `hall_hard_inductive` | `Finite ι → (∀ s, #s ≤ #s.biUnion t) → ∃ injective choice function` | Full strong induction proof of the hard direction of Hall’s theorem for finite `ι`. |
| `Finset.all_card_le_biUnion_card_iff_existsInjective'` | `Finite ι → [(∀ s, #s ≤ #s.biUnion t) ↔ ∃ injective f with f x ∈ t x]` | Main theorem: equivalence of Hall’s condition and existence of injective choice function for finite `ι`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hall_`: Core Hall’s theorem-related lemmas.
  - `hall_cond_of_`: Lemmas showing Hall condition is preserved under operations (`erase`, `restrict`, `compl`).
  - `hall_hard_inductive_step_`: Substeps of the main inductive proof (`A`, `B`).
- **Suffixes**:
  - `_iff_existsInjective'`: Final equivalence statement for finite index types (`'` distinguishes from generalized version).
- **Variables**:
  - `ι`, `α`: Index and base types.
  - `t : ι → Finset α`: Indexed family of finite sets.
  - `s`, `s'`, `s''`: Finite subsets of `ι`.
  - `x`, `y`, `x'`, `x''`: Elements of `ι` or `α`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting using equalities/definitions (e.g., `card_image_of_injective`, `biUnion`, `erase`).
- `simp` / `simp only`: Simplifying goals using lemmas about `Finset`, `card`, `image`, `biUnion`, `erase`.
- `convert`: Matching goals up to definitional equality.
- `exact`, `apply`, `intro`, `cases`, `split_ifs`: Standard proof structure.
- `push_neg`: To negate universal quantifiers (e.g., `¬∀ s, P s` ⇒ `∃ s, ¬P s`).
- `choose`: Axiom of choice for selecting witnesses from nonempty sets.
- `calc`: Chain of equalities/inequalities (e.g., in `tx_ne` proof).
- `ext`: Extensionality for sets/functions.
- `exact?` / `aesop`: Not heavily used here; proofs are mostly manual and structured.

---

#### **4. Proof Logic**

- **Overall Strategy**: Strong induction on `Fintype.card ι`.
  - Base case: `ι = ∅` ⇒ trivial (empty function).
  - Inductive step: Assume theorem holds for all smaller finite index types.
    - **Case A**: If *strict* Hall inequality holds for all proper nonempty subsets (`#s < #s.biUnion t`), pick arbitrary `x ∈ ι`, `y ∈ t x`, restrict to `ι' = ι \ {x}`, apply IH, extend function.
    - **Case B**: If equality holds for some proper nonempty `s ⊆ ι`, solve separately on `s` and `sᶜ`, then combine using disjointness of images.
- **Key Logical Flow**:
  - Use `nonempty_fintype` to get `Fintype ι`.
  - Apply `Nat.strong_induction_on`.
  - Distinguish between strict and equality cases via `by_cases` / `push_neg`.
  - Use `ih` (inductive hypothesis) on smaller types (`ι'`, `s`, `sᶜ`).
  - Construct final function piecewise using `if ... then ... else ...`.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Data.Fintype.Basic`: Finite types, cardinality.
  - `Mathlib.Data.Fintype.Powerset`: Powersets and finite subsets.
  - `Mathlib.Data.Set.Finite.Basic`: Finite sets, cardinality lemmas.
- **Logical Prerequisites**:
  - `DecidableEq α`: Needed for `Finset` operations.
  - Classical logic (`Classical.decEq`, `Classical.arbitrary`).
- **Scope**:
  - Proves Hall’s Marriage Theorem for *finite* index types (`[Fintype ι]` or `[Finite ι]`).
  - Does *not* require topology or category theory (unlike the generalized version in `Combinatorics.Hall.Basic`).
  - Serves as a foundational step for the compactness-based generalization.

---

This module is a canonical formalization of the finite case of Hall’s Marriage Theorem, emphasizing structural clarity and minimal dependencies.