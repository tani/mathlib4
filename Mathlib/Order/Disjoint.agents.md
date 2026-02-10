### Technical Metadata Brief: Disjointness, Complements, and Complemented Lattices in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Disjoint a b` | `Prop` | Two elements are disjoint if every lower bound of both is ≤ ⊥ (i.e., `∀ x, x ≤ a → x ≤ b → x ≤ ⊥`). |
| `Codisjoint a b` | `Prop` | Two elements are codisjoint if every upper bound of both is ≥ ⊤ (i.e., `∀ x, a ≤ x → b ≤ x → ⊤ ≤ x`). |
| `IsCompl x y` | `Prop` | Predicate: `x` and `y` are complements iff `Disjoint x y ∧ Codisjoint x y`. |
| `ComplementedLattice α` | `Class` | Every element in a bounded lattice has *some* complement (not necessarily unique). |
| `IsComplemented a` | `Prop` | `∃ b, IsCompl a b` — element `a` has at least one complement. |
| `Complementeds α` | `Type*` | Subtype of complemented elements: `{a // IsComplemented a}`. |
| `disjoint_iff` | `Disjoint a b ↔ a ⊓ b = ⊥` | In a semilattice with ⊥, disjointness is equivalent to inf being bottom. |
| `codisjoint_iff` | `Codisjoint a b ↔ a ⊔ b = ⊤` | Dually, codisjointness is equivalent to sup being top. |
| `isCompl_iff` | `IsCompl a b ↔ Disjoint a b ∧ Codisjoint a b` | Characterization of complements. |
| `isCompl_bot_top`, `isCompl_top_bot` | `IsCompl ⊥ ⊤`, `IsCompl ⊤ ⊥` | Bottom and top are complements. |
| `right_unique`, `left_unique` | Uniqueness of complements under distributivity | If `x` has two complements `y`, `z`, then `y = z` in a distributive lattice. |
| `sup_inf`, `inf_sup` | `IsCompl (x ⊔ x') (y ⊓ y')`, `IsCompl (x ⊓ x') (y ⊔ y')` | Sup/inf of complements yield complements of inf/sup. |
| `disjoint_coe`, `codisjoint_coe`, `isCompl_coe` | Lift properties to `Complementeds α` | Coercion preserves disjointness/codisjointness/complementarity. |
| `Complementeds.instComplementedLattice` | `ComplementedLattice (Complementeds α)` | The subtype of complemented elements forms a complemented lattice. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `disjoint_`, `codisjoint_`, `isCompl_`, `isComplemented_`, `complementeds_`, `coe_`, `mk_`
- **Suffixes**:
  - `_left`, `_right`: indicate which argument is fixed or varied (e.g., `disjoint_sup_left`, `codisjoint_inf_right`)
  - `_comm`: symmetry or commutativity (e.g., `disjoint_comm`, `codisjoint_comm`)
  - `_iff`: equivalence characterizations (e.g., `disjoint_iff`, `isCompl_iff`)
  - `_mono`, `_mono_left`, `_mono_right`: monotonicity lemmas
  - `_of_`: implication from assumptions (e.g., `disjoint_of_le_iff_left_eq_bot`, `isCompl_of_eq`)
  - `_eq_bot`, `_eq_top`: conclusions about equality with ⊥/⊤
  - `_ne`, `_ne_iff`: inequality consequences
- **Dual variants**:
  - `dual`, `ofDual`, `toDual`: relate `Disjoint` ↔ `Codisjoint` via order dual.
  - `disjoint_toDual_iff`, `codisjoint_ofDual_iff`, etc., use `Iff.rfl` for definitional equality.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: for rewriting using `simp` lemmas (`disjoint_iff`, `codisjoint_iff`, etc.)
- `aesop`: for automated reasoning (e.g., `lemma Disjoint.eq_iff`, `Codisjoint.ne_iff`)
- `rw`: for rewriting with equalities/iff lemmas
- `exact`, `intro`, `cases`, `refine`: basic proof construction
- `calc`: for chaining inequalities (e.g., `inf_left_le_of_le_sup_right`)
- `apply`, `assumption`, `contradiction`: for goal-directed reasoning
- `convert`, `congr'`: for congruence-based simplification
- `ext`: extensionality (used implicitly via `Subtype.coe_injective`, etc.)
- `rwa`, `rw [← ...]`: reverse rewriting with context

---

#### **4. Proof Logic Patterns**

- **Inductive/structural reasoning**:
  - Many proofs follow the pattern:  
    `rw [disjoint_iff] → apply bot_unique / le_antisymm → use inf/sup properties`
- **Duality via `OrderDual`**:
  - Prove for `Disjoint`, then dualize to get `Codisjoint` (e.g., `codisjoint_iff_le_sup := @disjoint_iff_inf_le αᵒᵈ ...`)
- **Equivalence-based reasoning**:
  - Use `⟨h1, h2⟩` / `⟨h1.1, h1.2⟩` to decompose/construct conjunctions (e.g., `isCompl_iff`)
- **Subtype reasoning**:
  - Prove properties on `Complementeds α` by lifting to `α` via `coe_injective`, `coe_inj`, `coe_le_coe`
- **Distributivity exploitation**:
  - In distributive lattices: use `inf_sup_right`, `sup_inf_left`, `sup_eq_bot_iff`, `inf_eq_top_iff` to break down expressions
- **Uniqueness via antisymmetry**:
  - `right_unique`/`left_unique`: use `Antitone` + `le_antisymm`

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Aesop`: for automated reasoning
  - `Mathlib.Order.BoundedOrder.Lattice`: foundational lattice theory with bounds
- **Key dependencies**:
  - `PartialOrder`, `BoundedOrder`, `SemilatticeInf`, `SemilatticeSup`, `DistribLattice`
  - `OrderDual`, `Subtype`, `Prod`
- **Domain scope**:
  - Lattice theory with bounded order structure
  - Focus on *complementarity* and *disjointness* in posets/lattices
  - Applications to Boolean algebras, ortholattices, and logic (though not explicitly stated here)

---

This metadata reflects a mature, well-structured formalization of lattice-theoretic complementation, emphasizing symmetry, duality, and modularity via typeclasses and subtypes.