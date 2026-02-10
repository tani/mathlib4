Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Frames, Completely Distributive Lattices, and Complete Boolean Algebras in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Order.Frame.MinimalAxioms` | `CompleteLattice α → Prop` | Minimal axioms for a frame: only requires `a ⊓ sSup s ≤ ⨆ b ∈ s, a ⊓ b`. Used internally to construct full `Frame`. |
| `Order.Coframe.MinimalAxioms` | `CompleteLattice α → Prop` | Dual of `Frame.MinimalAxioms`: requires `⨅ b ∈ s, a ⊔ b ≤ a ⊔ sInf s`. |
| `Order.Frame` | `CompleteLattice α → HeytingAlgebra α → Prop` | A *frame* (a complete Heyting algebra): `⊓` distributes over `⨆`. |
| `Order.Coframe` | `CompleteLattice α → CoheytingAlgebra α → Prop` | A *coframe* (a complete co-Heyting algebra): `⊔` distributes over `⨅`. |
| `CompleteDistribLattice` | `Frame α → Coframe α → BiheytingAlgebra α → Prop` | A *complete distributive lattice*: both `⊓` over `⨆` and `⊔` over `⨅` distribute. |
| `CompletelyDistribLattice` | `CompleteLattice α → BiheytingAlgebra α → Prop` | A *completely distributive lattice*: satisfies `iInf_iSup_eq`, i.e., `(⨅ i, ⨆ j, f i j) = ⨆ g, ⨅ i, f i (g i)`. |
| `CompleteBooleanAlgebra` | `CompleteLattice α → BooleanAlgebra α → Prop` | A *complete Boolean algebra*: Boolean algebra + complete distributivity (`⊓` over `⨆`, `⊔` over `⨅`). |
| `CompleteAtomicBooleanAlgebra` | `CompleteLattice α → BooleanAlgebra α → Prop` | A *complete atomic Boolean algebra*: Boolean algebra + `iInf_iSup_eq`. Implies atomic/coatomic. |
| `inf_iSup_eq` | `a ⊓ ⨆ i, f i = ⨆ i, a ⊓ f i` | Finite meet distributes over arbitrary join (frame property). |
| `iInf_iSup_eq` | `(⨅ i, ⨆ j, f i j) = ⨆ g, ⨅ i, f i (g i)` | Strongest distributivity law: infinite meet over infinite join. |
| `compl_iInf` | `(iInf f)ᶜ = ⨆ i, (f i)ᶜ` | Complement of an infimum is the supremum of complements (in a complete Boolean algebra). |
| `compl_iSup` | `(iSup f)ᶜ = ⨅ i, (f i)ᶜ` | De Morgan law for suprema. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `inf_`, `sup_`: binary meet/join.
  - `iInf_`, `iSup_`: indexed inf/sup (over ι → α).
  - `sInf_`, `sSup_`: set-based inf/sup (over Set α).
  - `biInf_`, `biSup_`: binary indexed inf/sup (over ι × ι').
  - `₂`: for 2-indexed families (`f : ∀ i, κ i → α`).
- **Suffixes**:
  - `_eq`: equality version of distributivity (e.g., `inf_iSup_eq`).
  - `_le`: inequality version (e.g., `inf_sSup_le_iSup_inf`).
  - `_eq'`: derived equality (often via `antisymm`).
- **`MinimalAxioms`**: internal structures for minimal required axioms to derive full typeclass instances.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification with definitional equalities and lemmas.
- `rw`: rewriting using equalities (e.g., `inf_comm`, `iSup_range`).
- `antisymm`: proving equality via mutual inequality.
- `exact`, `refine`, `le_of_lt`, `lt_irrefl`: basic proof construction.
- `push_neg`, `not_lt.2`, `of_not_not`: classical logic reasoning.
- `choose`, ` Classical.choose_spec`: using choice/axiom of choice.
- `ext`: extensionality for functions/sets.
- `calc`: chaining inequalities.
- `iSup_le`, `le_iInf`, `le_iSup`, `iInf_le`: standard lattice order lemmas.
- `simp_rw`: combination of `simp` + `rw`, especially for dependent types.

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most distributivity proofs follow a pattern:  
    `≤` direction via `inf_sSup_le_iSup_inf` (or dual),  
    `≥` direction via `iSup_inf_le_inf_sSup` (or dual),  
    then `antisymm`.
  - For *complete* distributivity (`iInf_iSup_eq`), proofs use:
    - `le_iInf_iSup` (always true in any complete lattice).
    - `iInf_iSup_eq'` (from `CompletelyDistribLattice.MinimalAxioms`) to get the reverse inequality.
    - Often rely on classical logic (`Classical.skolem`, `of_not_not`) to construct choice functions `g : ∀ i, κ i`.
- **Induction/Case analysis**:
  - Rarely explicit induction; instead, rely on lattice-theoretic properties and set-theoretic encodings (e.g., `sSup = iSup ∘ range`).
  - For `CompleteLinearOrder → CompletelyDistribLattice`, uses case analysis on existence of intermediate elements.

#### **5. Imports**

- `Mathlib.Order.CompleteLattice`: foundational complete lattices.
- `Mathlib.Order.Directed`: directed sets and filters.
- `Mathlib.Logic.Equiv.Set`: set equivalences (used for `sSup_image`, `sInf_image`, etc.).

---

This file formalizes a rich hierarchy of ordered algebraic structures, emphasizing *distributivity* at various levels (finite/infinite, meet/join, one-sided/two-sided), and provides a clean API for constructing and reasoning about frames, coframes, and their stronger variants. The design reflects Lean’s emphasis on modularity and minimal axioms via `MinimalAxioms` structures and `ofMinimalAxioms` constructors.