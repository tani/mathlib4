### Technical Metadata Brief: `Mathlib.Order.Unbundled`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsRefl`, `IsIrrefl`, `IsSymm`, `IsTrans`, `IsAntisymm`, `IsAsymm`, `IsTotal`, `IsTrichotomous`, `IsPreorder`, `IsStrictOrder`, `IsPartialOrder`, `IsLinearOrder`, `IsWellFounded`, `IsWellOrder`, `IsOrderConnected`, `IsNonstrictStrictOrder` | Classes (`Prop`) | Unbundled relation classes: encode relational properties without requiring `LE`/`LT` typeclass instances. |
| `swap` | `α → α → Prop → α → α → Prop` | Swaps arguments of a binary relation: `swap r a b := r b a`. |
| `antisymm_of`, `antisymm_of'`, `comm_of` | `r : α → α → Prop → …` | Explicit-`r` versions of standard lemmas, matching core Lean `Init.Algebra.Classes`. |
| `partialOrderOfSO`, `linearOrderOfSTO` | `IsStrictOrder → PartialOrder`, `IsStrictTotalOrder → LinearOrder` | Construct bundled order structures from unbundled strict ones. |
| `IsWellFounded.wf`, `IsWellOrder` | `WellFounded r`, extends `IsTrichotomous`, `IsTrans`, `IsWellFounded` | Well-founded and well-order relations. |
| `IsOrderConnected.conn` | `lt a c → lt a b ∨ lt b c` | Intuitionistic substitute for totality (used in constructive reals). |
| `IsNonstrictStrictOrder.right_iff_left_not_left` | `s a b ↔ r a b ∧ ¬r b a` | Connects strict (`s`) and nonstrict (`r`) orders (e.g., `⊂` ↔ `⊆ ∧ ¬⊇`). |
| `subset_antisymm`, `ssubset_irrefl`, `ssubset_trans`, `ssubset_asymm`, `ssubset_iff_subset_not_subset`, `subset_iff_ssubset_or_eq`, etc. | Lemmas for `⊆`, `⊂` | Bridge between set-theoretic operations and relational properties. |
| `WellFounded.prod_lex`, `WellFounded.psigma_lex`, `WellFounded.psigma_revLex` | Well-foundedness of lexicographic constructions | Key for termination proofs (e.g., on `Prod`, `PSigma`). |
| `Subsingleton.isWellOrder` | `[Subsingleton α] → [IsIrrefl α r] → IsWellOrder α r` | Any irreflexive relation on a subsingleton is a well order. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: for unbundled relation classes (`IsRefl`, `IsTrans`, `IsWellFounded`, etc.).
  - `of_`: explicit-`r` versions of lemmas (`antisymm_of`, `comm_of`, `right_iff_left_not_left_of`).
  - `of_` also used in `of_eq`, `of_subsingleton`, `of_trichotomous`.
- **Suffixes**:
  - `'` (prime): alternate form, often with reversed conclusion (`antisymm'`, `antisymm_of'`).
  - `swap`: for properties preserved under argument swap (`IsRefl.swap`, `IsTrans.swap`, etc.).
  - `of`: for explicit-`r` variants (`partialOrderOfSO`, `linearOrderOfSTO`).
- **`to_`**: for constructing bundled structures from unbundled ones (`toWellFoundedRelation`, `linearOrder`, `toHasWellFounded`).
- **`inst_`**: for instance constructors (`instIsRefl`, `instIsTrans` in `Order.Preimage`).
- **`wf`**: well-foundedness (`wf`, `wf.transGen`, `wf.prod_lex`, `wf.induction`).
- **`lex` / `revLex` / `skipLeft`**: lexicographic order variants.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rcases`, `cases` | Case analysis on `trichotomous`, `Or`, `Prod`, `PSigma`. |
| `simp`, `simp_rw`, `simp only` | Simplify using `@[simp]` lemmas (e.g., `empty_relation_apply`, `not_bounded_iff`). |
| `exacts [...]` | Solve multiple goals in sequence (common in `trans_trichotomous_*`). |
| `intro`, `intro h`, `rintro rfl` | Standard intro-style reasoning. |
| `rw`, `rwa`, `rfl` | Rewriting using definitions and equalities. |
| `aesop`, `tauto` | Automated reasoning for propositional logic (less frequent here). |
| `apply`, `exact`, `assumption` | Direct proof steps. |
| `ext`, `funext`, `funext₂` | Extensionality for relations/sets. |
| `convert`, `change`, `have h := ...` | Intermediate lemma introduction. |
| `termination_by` | For well-founded recursion (e.g., `WellFoundedRelation.asymmetric`). |

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**: Many proofs proceed by case analysis on `trichotomous_of r a b`, especially for strict orders.
- **Explicit-`r` lemmas**: Often proved by unfolding definitions and applying bundled counterparts (e.g., `antisymm_of r := antisymm`).
- **Instance construction**: Many instances are built using `{ ... with }` syntax to combine subproperties (e.g., `IsPreorder.swap`, `IsPartialOrder.swap`).
- **Well-founded induction**: Central to `IsWellFounded.induction`, `fix`, `wf.induction`, etc.
- **Subsingleton reasoning**: Leverages `Subsingleton.elim` and `isEmptyElim` for trivial cases.
- **Duality via `ᵒᵈ`**: Dual orders (`αᵒᵈ`) used to derive `WellFoundedGT` from `WellFoundedLT` and vice versa.
- **Classical reasoning**: Used in `IsWellOrder.linearOrder` (noncomputable definition).

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Logic.IsEmpty` | For `IsEmpty`, `isEmptyElim`. |
| `Mathlib.Order.Basic` | Core order theory (definitions, basic lemmas). |
| `Mathlib.Tactic.MkIffOfInductiveProp` | For `mk_iff` attribute (e.g., `@[mk_iff] class IsWellFounded`). |
| `Batteries.WF` | Well-founded relations, `WellFoundedRelation`, `measure`, `InvImage`, `Lex`, `RevLex`, `SkipLeft`. |

---

### Summary

This file formalizes **unbundled relational classes**—a foundational layer for order theory in Lean, decoupling relational properties from bundled typeclasses like `Preorder`, `LinearOrder`. It provides:
- Explicit-`r` versions of standard lemmas,
- Constructions between bundled/unbundled forms,
- Well-foundedness and trichotomy properties,
- Detailed reasoning about `⊆`/`⊂` via `IsNonstrictStrictOrder`,
- Lexicographic well-foundedness for termination.

It serves as a low-level infrastructure for higher-order order theory (e.g., in `Mathlib.Order.WellOrdering`, `Mathlib.Order.Interval`, `Mathlib.Topology.Order`).