### Technical Metadata Brief: Directed Families and Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Directed r f` | `(f : ι → α) → Prop` | States that for any two indices `x y`, there exists `z` such that `r (f x) (f z)` and `r (f y) (f z)`. Captures *pairwise upper bounds* in the image of `f`. |
| `DirectedOn r s` | `(s : Set α) → Prop` | Same as `Directed`, but for subsets: for any `x, y ∈ s`, ∃ `z ∈ s` with `r x z` and `r y z`. |
| `IsDirected α r` | `Class` | A mixin stating the *entire type* `α` is `r`-directed: ∀ `a b : α`, ∃ `c` with `r a c ∧ r b c`. Analogous to `IsTotal`. |
| `directedOn_iff_directed` | `DirectedOn r s ↔ Directed r (Subtype.val : s → α)` | Equivalence between directedness of a set and of its inclusion map. |
| `directedOn_range` | `Directed r f ↔ DirectedOn r (Set.range f)` | Links directedness of a function to the directedness of its range. |
| `directedOn_image` | `DirectedOn r (f '' s) ↔ DirectedOn (f ⁻¹'o r) s` | Pulls back directedness along a function via preimage relation. |
| `directedOn_of_sup_mem` | `[SemilatticeSup α] → (∀ i j ∈ S, i ⊔ j ∈ S) → DirectedOn (· ≤ ·) S` | Any sup-closed subset is ≤-directed. |
| `directedOn_of_inf_mem` | `[SemilatticeInf α] → (∀ i j ∈ S, i ⊓ j ∈ S) → DirectedOn (· ≥ ·) S` | Inf-closed subsets are ≥-directed. |
| `IsTotal.directed` | `[IsTotal α r] → Directed r f` | Total orders imply directedness of any family. |
| `directed_of` | `[IsDirected α r] → ∀ a b, ∃ c, r a c ∧ r b c` | Instantiation of `IsDirected` for pairs. |
| `directed_of₃` | `[IsTrans α r] → ∀ a b c, ∃ d, r a d ∧ r b d ∧ r c d` | Extends pairwise upper bound to triple using transitivity. |
| `directed_id` | `[IsDirected α r] → Directed r id` | Identity function is directed iff `α` is `r`-directed. |
| `directedOn_univ` | `[IsDirected α r] → DirectedOn r Set.univ` | Whole type is directed as a set. |
| `directed_of_isDirected_le` | `[IsDirected α (· ≤ ·)] → (∀ i ≤ j, r (f i) (f j)) → Directed r f` | Monotone functions on upward-directed types are directed. |
| `constant_of_monotone_antitone` | `[IsDirected α (· ≤ ·)] → Monotone f → Antitone f → ∀ a b, f a = f b` | A function monotone and antitone on a directed poset is constant. |
| `SemilatticeSup.to_isDirected_le` | Instance | Every semilattice sup is ≤-directed via `⊔`. |
| `SemilatticeInf.to_isDirected_ge` | Instance | Every semilattice inf is ≥-directed via `⊓`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `directedOn_`: Relates to *sets* (`DirectedOn`).
  - `directed_`: Relates to *families/functions* (`Directed`).
  - `isDirected_`: Relates to *type-class* `IsDirected`.
  - `mono`, `mono'`: Monotonicity-based lifting lemmas.
  - `extend_`, `extend_bot`: For extending functions with bottom element.

- **Suffixes**:
  - `_iff`: Characterization equivalences (e.g., `directedOn_iff_directed`).
  - `_comp`: Composition lemmas (e.g., `directed_comp`, `directedOn_monom_comp`).
  - `_of_`: Construction lemmas (e.g., `directedOn_of_sup_mem`, `directed_of_isDirected_le`).
  - `_pair`, `_singleton`, `_insert`: Set-theoretic operations.

- **Notation**:
  - `≼` for `r` (local infix `:50`).
  - `≼₁`, `≼₂` for product component relations.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification with definitional equivalences (especially for `Set.mem_image`, `Set.forall_mem_range`, etc.).
- `intro`, `intro!`, `rintro`: For introducing quantifiers and destructuring.
- `rcases`, `obtain`: Pattern-matching existential/and hypotheses.
- `exact`, `assumption`, `apply`: Direct proof steps.
- `cases'`: For case analysis on `em` (excluded middle) or `Or`.
- `aesop`: Used implicitly in many `by aesop`-style goals (though not explicit here, inferred from structure).
- `ring`, `linarith`: Not prominent here (more order-theoretic than arithmetic).
- `convert`, `congr'`: For equational reasoning in extensionality proofs.
- `rw [*, ...]`: Rewriting with multiple lemmas.

---

#### **4. Proof Logic & Strategy**

- **Inductive/constructive style**: Proofs often construct witnesses explicitly (e.g., `a ⊔ b`, `e k`, `⟨r₁, r₂⟩`).
- **Case analysis on membership**: Especially in `insert`, `pair`, `singleton`, and `pi`/`prod` lemmas.
- **Use of preimage relations**: To transfer directedness across maps (`directedOn_image`, `directed_comp`).
- **Monotonicity lifting**: Many lemmas lift `r`-directedness to `r'`-directedness via monotonicity assumptions (`mono`, `mono'`, `mono_comp`).
- **Duality via `OrderDual`**: Many results are mirrored for dual orders (e.g., `isBot_or_exists_lt`, `isTop_or_exists_gt`, `isMin.isBot`).
- **Transitivity + pairwise bounds → higher bounds**: `directed_of₃` uses transitivity to lift from 2 to 3 elements.
- **Constantness via antisymmetry**: `constant_of_monotone_antitone` uses `le_antisymm` on monotone/antitone bounds.

---

#### **5. Imports & Scope**

- **Core import**: `Mathlib.Data.Set.Image`
- **Assumed background**:
  - `Function`, `Set`, `Order`, `Order.Directed`, `Order.Bounded`, `Order.Dual`, `Order.Preorder`, `Order.Lattice`, `Order.Semilattice`, `Order.IsTotal`, `Order.IsDirected`, `Order.IsMin`, `Order.IsMax`, `Order.Bot`, `Order.Top`, `Order.PartialOrder`, `Order.Nontrivial`, `Order.Extend`, `Order.Pi`, `Order.Prod`.

- **Key algebraic/order-theoretic structures used**:
  - `Preorder`, `PartialOrder`, `LE`, `Lattice`, `SemilatticeSup`, `SemilatticeInf`, `OrderTop`, `OrderBot`, `Nontrivial`, `IsTotal`, `IsDirected`, `IsMin`, `IsMax`, `IsBot`, `IsTop`.

- **Domain**: Order theory, especially *directed completeness* and *directed colimits* in posets/lattices.

---

### Summary

This file formalizes the foundational theory of *directed families* and *directed sets* in order theory, with strong emphasis on:
- Equivalence between set- and function-based directedness,
- Preservation under images, preimages, products, and Π-types,
- Interaction with lattice operations (`⊔`, `⊓`),
- Duality via `OrderDual`,
- Applications to monotone/antitone functions and constancy results.

It serves as a foundational module for later developments in domain theory, continuous lattices, and directed-complete partial orders (dcpo), as suggested by the reference to *A Compendium of Continuous Lattices*.