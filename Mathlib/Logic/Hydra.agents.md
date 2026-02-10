### Technical Metadata Brief: Termination of a Hydra Game (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CutExpand r s' s` | `α → α → Prop → Multiset α → Multiset α → Prop` | Models a valid move in the hydra game: `s'` is obtained from `s` by removing one head `a` and adding a finite multiset `t` of smaller heads (w.r.t. `r`). |
| `cutExpand_le_invImage_lex` | `CutExpand r ≤ InvImage (Finsupp.Lex ...) toFinsupp` | Embeds `CutExpand r` into a lexicographic order on finite support functions, enabling well-foundedness proofs via known results. |
| `cutExpand_singleton` | `(∀ x' ∈ s, r x' x) → CutExpand r s {x}` | Allows adding a multiset `s` of smaller heads to a singleton `{x}`. |
| `cutExpand_singleton_singleton` | `r x' x → CutExpand r {x'} {x}` | Special case: single head replacement. |
| `cutExpand_iff` | `[DecidableEq α] [IsIrrefl α r] ⇒ CutExpand r s' s ↔ ...` | Equivalence between the abstract definition and a more concrete one using `erase`. |
| `cutExpand_fibration` | `Fibration (GameAdd ...) (CutExpand r) fun s ↦ s.1 + s.2` | Shows multiset addition is a fibration for game sum → single copy, key for induction on multisets. |
| `cutExpand_closed` | `[IsIrrefl α r] ⇒ (∀ a' a, r a' a → p a → p a') ⇒ CutExpand r s' s → (∀ a ∈ s, p a) → ∀ a ∈ s', p a` | Preservation of downward-closed properties under `CutExpand`. |
| `acc_of_singleton` | `[IsIrrefl α r] ⇒ (∀ a ∈ s, Acc (CutExpand r) {a}) → Acc (CutExpand r) s` | Accessibility of a multiset follows from accessibility of all its singletons. |
| `Acc.cutExpand` | `[IsIrrefl α r] ⇒ Acc r a → Acc (CutExpand r) {a}` | Accessibility lifts from `r` to `CutExpand r` on singletons. |
| `WellFounded.cutExpand` | `WellFounded r → WellFounded (CutExpand r)` | Main theorem: if `r` is well-founded, then so is `CutExpand r`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cutExpand_`: all lemmas/theorems about the `CutExpand` relation.
  - `acc_`: lemmas about accessibility (`Acc`).
  - `isIrrefl`, `wellFounded`: properties of the base relation `r`.
- **Suffixes**:
  - `_left`, `_right`: indicate which argument (in multiset sum) is varied.
  - `_singleton`, `_double`, `_pair`: indicate number of heads involved.
  - `_iff`: equivalence characterizations.
  - `_closed`: preservation of a predicate under the relation.
- **Helper patterns**:
  - `fun a' ↦ ...` used in quantifier manipulations.
  - `he ▸ ...` for substitution in equalities.
  - `apply_fun count b at he` for counting arguments.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with simplification, especially for `count`, `mem`, `add`, `singleton`. |
| `rw` / `apply` | Standard rewriting and application of lemmas. |
| `cases` / `obtain` / `rcases` | Decomposing existential hypotheses (`⟨t, a, ...⟩`). |
| `exact` / `refine` | Finishing proofs or constructing witnesses. |
| `tauto` | Automated propositional reasoning (e.g., in `cutExpand_double`). |
| `apply_fun` | Applying a function to both sides of an equality (e.g., `count b`). |
| `convert` / `use` | Constructing witnesses for existential goals. |
| `induction` / `induction'` | Structural induction on multisets or accessibility. |
| `dsimp` / `simp` | Simplification of definitions (e.g., `dsimp at he ⊢`). |
| `exact?` / `aesop` | Not heavily used here — proof is mostly manual and structured. |

---

#### **4. Proof Logic**

- **High-level strategy**: Prove well-foundedness of `CutExpand r` by:
  1. Showing accessibility lifts from `r` to singletons (`Acc.cutExpand`).
  2. Showing accessibility lifts from singletons to arbitrary multisets (`acc_of_singleton`).
  3. Combining with `WellFounded.cutExpand`.

- **Induction pattern**:
  - **Multiset induction** (`Multiset.induction`) for `acc_of_singleton`.
  - **Accessibility induction** (`induction' hacc with a h ih`) for `Acc.cutExpand`.
  - **Fibration lemma** (`cutExpand_fibration`) used to lift accessibility from components to sums.

- **Key logical steps**:
  - Use `cutExpand_iff` to switch between abstract and concrete forms.
  - Use `count`-based reasoning to extract membership and cardinality info.
  - Use `erase_add_left_pos`, `erase_singleton`, etc., to manipulate multiset equations.
  - Use `GameAdd.fst`, `GameAdd.snd` to decompose game sum moves.

- **Critical assumptions**:
  - `DecidableEq α` for `cutExpand_iff`, `cutExpand_le_invImage_lex`.
  - `IsIrrefl α r` for many lemmas (e.g., `not_cutExpand_zero`, `cutExpand_iff`, `acc_of_singleton`).
  - `WellFounded r` for final theorem.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Finsupp.Lex` | Lexicographic order on finite support functions; used in embedding `CutExpand r`. |
| `Mathlib.Data.Finsupp.Multiset` | Connection between multisets and finitely supported functions (`toFinsupp`). |
| `Mathlib.Order.GameAdd` | Game sum of relations (`GameAdd`), used in fibration lemma. |

---

#### **Summary**

This file formalizes a classic result in combinatorics and logic: the termination of a simple hydra game, where cutting a head labeled `a` spawns only smaller heads (w.r.t. a well-founded relation `r`). The proof leverages multiset theory, accessibility, and fibration arguments to lift well-foundedness from `r` to `CutExpand r`. The formalization is clean, modular, and uses Lean’s powerful multiset and order-theoretic libraries effectively.

Let me know if you'd like a diagram of the proof structure or a summary of the `Fibration` usage.