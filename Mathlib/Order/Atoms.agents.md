### Technical Metadata Brief: `Mathlib.Data.Lattice.Atoms`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsAtom a` | `a ≠ ⊥ ∧ ∀ b, b < a → b = ⊥` | Defines an *atom*: minimal non-bottom element. |
| `IsCoatom a` | `a ≠ ⊤ ∧ ∀ b, a < b → b = ⊤` | Defines a *coatom*: maximal non-top element. |
| `IsAtomic α` | `∀ b, b = ⊥ ∨ ∃ a, IsAtom a ∧ a ≤ b` | Every non-bottom element lies above some atom. |
| `IsCoatomic α` | `∀ b, b = ⊤ ∨ ∃ a, IsCoatom a ∧ b ≤ a` | Every non-top element lies below some coatom. |
| `IsAtomistic α` | `∀ b, ∃ s, b = sSup s ∧ ∀ a ∈ s, IsAtom a` | Every element is the supremum of atoms ≤ it. |
| `IsCoatomistic α` | `∀ b, ∃ s, b = sInf s ∧ ∀ a ∈ s, IsCoatom a` | Every element is the infimum of coatoms ≥ it. |
| `IsStronglyAtomic α` | `∀ a < b, ∃ x, a ⋖ x ∧ x ≤ b` | Every nontrivial interval has an element covering the lower bound. |
| `IsStronglyCoatomic α` | `∀ a < b, ∃ x, a ≤ x ∧ x ⋖ b` | Every nontrivial interval has an element covered by the upper bound. |
| `IsSimpleOrder α` | `Nontrivial α ∧ ∀ a, a = ⊥ ∨ a = ⊤` | Order has exactly two elements: ⊥ and ⊤. |

**Key Theorems:**
- `isAtom_dual_iff_isCoatom`: `IsAtom (a : αᵒᵈ) ↔ IsCoatom a`
- `isCoatom_dual_iff_isAtom`: `IsCoatom (a : αᵒᵈ) ↔ IsAtom a`
- `isSimpleOrder_iff_isAtom_top`: `IsSimpleOrder α ↔ IsAtom ⊤`
- `isSimpleOrder_iff_isCoatom_bot`: `IsSimpleOrder α ↔ IsCoatom ⊥`
- `IsCompl.isAtom_iff_isCoatom`: In a modular bounded lattice, complements of atoms are coatoms and vice versa.
- `isAtomic_iff_isCoatomic`: In a modular complemented lattice, atomic ⇔ coatomic.
- `le_iff_atom_le_imp` (in Boolean algebras): Order is determined by atom membership.
- `eq_iff_atom_le_iff`: Equality in atomistic Boolean algebras is determined by atom inclusion.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `is_`: Predicate definitions (`IsAtom`, `IsCoatom`, `IsAtomic`, etc.)
  - `covBy_`: Related to covering relation (`bot_covBy_iff`, `covBy_top_iff`)
  - `atom_`, `coatom_`: Functions/theorems about atoms/coatoms (`atom_le_iSup`, `iInf_le_coatom`)
  - `strongly_`: For strong atomicity (`isStronglyAtomic`, `exists_covBy_le_of_lt`)
  - `wellFounded_`: For well-founded order implications (`of_wellFounded_lt`, `wellFounded_lt`)
  - `equivBool`, `orderIsoBool`: Canonical isomorphisms to `Bool`

- **Suffixes:**
  - `_dual`: Duality statements (`isCoatom_dual_iff_isAtom`)
  - `_iff`: Biconditional theorems (`isAtomic_iff_forall_isAtomic_Iic`)
  - `_le`, `_lt`, `_ge`, `_gt`: Order-theoretic lemmas (`le_iff_atom_le_imp`, `lt_iff`)
  - `_eq`: Equality characterizations (`Iic_eq`, `Ici_eq`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification with definitional lemmas (e.g., `bot_lt_iff_ne_bot`, `le_iff_lt_or_eq`)
- `rw`: Rewriting using equivalences and `iff`-lemmas
- `exact`, `refine`, `apply`: Proof construction
- `cases`: Case analysis on `eq_bot_or_eq_top`, `le_iff_lt_or_eq`, etc.
- `push_neg`, `nontriviality`: Handling negations and nontriviality goals
- `aesop`: Automated reasoning (especially in `IsSimpleOrder` proofs)
- `ring`, `linarith`: Rare, but used in lattice identities
- `set_tac`-like reasoning via `Set.ext`, `subtype_ext`, `ordConnected` lemmas
- `Classical` usage for choice/skolemization (`Classical.skolem`, `Classical.choice`)

---

#### **4. Proof Logic**

- **Inductive/structural reasoning** on order-theoretic properties:
  - Prove `IsAtom a` by splitting into `a ≠ ⊥` and `∀ b < a, b = ⊥`.
  - Use `lt_iff`/`le_iff` lemmas to reduce to equality cases.
- **Duality** is heavily exploited:
  - Prove one direction (e.g., `IsAtom`) and derive the dual (`IsCoatom`) via `OrderDual`.
- **Modular/lattice-theoretic arguments**:
  - In modular complemented lattices, use complement relationships to transfer atom/coatom properties.
- **Well-founded induction**:
  - For `IsStronglyAtomic`, use minimal elements in intervals.
- **Boolean/algebraic reasoning**:
  - In Boolean algebras, reduce to atom membership via `le_iff_atom_le_imp`.
- **Case analysis on bounded order structure**:
  - Especially in `IsSimpleOrder`, where all elements are ⊥ or ⊤.

---

#### **5. Imports**

Core dependencies defining scope:
- `Mathlib.Data.Set.Lattice`: Set-theoretic lattices, `sSup`, `sInf`, `Iic`, `Ici`
- `Mathlib.Order.ModularLattice`: Modular lattices, complements, `IsCompl`
- `Mathlib.Order.SuccPred.Basic`: Successor/predecessor orders, covering relation
- `Mathlib.Order.WellFounded`: Well-founded relations, minimal elements
- `Mathlib.Tactic.Nontriviality`: Tactics for nontriviality goals
- `Mathlib.Order.ConditionallyCompleteLattice.Indexed`: Indexed sup/inf in conditionally complete lattices

These imports indicate the module sits at the intersection of:
- **Order theory** (lattices, bounded orders, duality)
- **Lattice theory** (atomicity, modularity, complementation)
- **Set-theoretic lattice constructions** (subsets, intervals)
- **Classical logic & choice** (via `Classical` usage)

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the broader `Mathlib` lattice hierarchy.