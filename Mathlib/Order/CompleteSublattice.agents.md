### Technical Brief: `CompleteSublattice` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CompleteSublattice α` | `Structure extending Sublattice α` | Subset of a complete lattice closed under arbitrary suprema (`sSup`) and infima (`sInf`). |
| `CompleteSublattice.mk'` | `carrier → (∀ s, s ⊆ carrier → sSup s ∈ carrier) → (∀ s, s ⊆ carrier → sInf s ∈ carrier) → CompleteSublattice α` | Constructor requiring only closure under arbitrary sup/inf (binary sup/inf follow). |
| `CompleteSublattice.instCompleteLattice` | `CompleteLattice L` | Any complete sublattice `L` inherits a complete lattice structure. |
| `CompleteSublattice.subtype` | `CompleteLatticeHom L α` | Natural inclusion map from sublattice to ambient lattice. |
| `CompleteSublattice.map` | `CompleteSublattice α → CompleteLatticeHom α β → CompleteSublattice β` | Pushforward of a complete sublattice along a complete lattice homomorphism. |
| `CompleteSublattice.comap` | `CompleteSublattice β → CompleteLatticeHom α β → CompleteSublattice α` | Pullback (preimage) of a complete sublattice along a complete lattice homomorphism. |
| `CompleteLatticeHom.range` | `CompleteSublattice β` | Range of a complete lattice homomorphism `f : α → β`, equipped as a complete sublattice. |
| `CompleteLatticeHom.toOrderIsoRangeOfInjective` | `Injective f → α ≃o f.range` | If `f` is injective, it's an order isomorphism onto its range. |
| `CompleteSublattice.disjoint_iff`, `codisjoint_iff`, `isCompl_iff` | `↔`-equivalences | Disjointness, codisjointness, and complementarity in `L` reflect those in `α`. |
| `CompleteSublattice.isComplemented_iff` | `ComplementedLattice L ↔ ∀ a ∈ L, ∃ b ∈ L, IsCompl a b` | Characterizes when a complete sublattice is complemented. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coe_`: coercion-related lemmas (e.g., `coe_bot`, `coe_sSup`, `coe_subtype`).
  - `mem_`: membership in carrier set (e.g., `mem_map`, `mem_comap`).
  - `is_`: properties of elements or structures (e.g., `isCompl_iff`, `isComplemented_iff`).
  - `disjoint_`, `codisjoint_`: lattice-theoretic relations.

- **Suffixes**:
  - `_closed`: closure under operations (e.g., `sSupClosed'`, `supClosed'`).
  - `_image`, `_preimage`: used in proofs involving `map`/`comap`.
  - `_copy`: for definitional equality fixes (e.g., `copy`, `coe_copy`, `copy_eq`).

- **Structure fields**:
  - `carrier`: underlying set.
  - `sSupClosed'`, `sInfClosed'`: closure under arbitrary sup/inf.
  - `supClosed'`, `infClosed'`: inherited from `Sublattice`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop` | Automated reasoning for set membership, subset relations, and simple algebraic facts. |
| `simp` / `simp_rw` | Simplification using `@[simp]` lemmas (e.g., `coe_sSup`, `mem_map`). |
| `rw` | Rewriting using definitions and lemmas (e.g., `← map_sSup`, `image_univ.symm`). |
| `exact` / `apply` | Direct proof steps, especially after `suffices` or `obtain`. |
| `obtain ⟨t, ht, rfl⟩ := ...` | Eliminating existential quantifiers (e.g., in `map`/`comap` proofs). |
| `congr` | Proving equality of structures via `SetLike.coe_injective'`. |
| `cases` | Destructuring inductive types (e.g., `cases L; cases M`). |
| `refine` / `exact` | Constructing instances (e.g., `instCompleteLattice`). |

---

#### **4. Proof Logic**

- **Structure proofs**:
  - Use `mk'` to avoid redundant binary closure checks.
  - Prove binary closure (`supClosed'`, `infClosed'`) via reduction to `sSup`/`sInf` over singleton sets.

- **Lattice structure on `L`**:
  - Derived via `Subtype.coe_injective.completeLattice _`, using:
    - `Sublattice.coe_sup`, `Sublattice.coe_inf` for binary ops.
    - `coe_sSup'`, `coe_sInf'` for arbitrary sup/inf.
    - `coe_top`, `coe_bot` for top/bottom.

- **`map`/`comap` proofs**:
  - Use `subset_image_iff` / `mem_preimage` to reduce to properties in domain/codomain.
  - Apply `map_sSup`, `map_sInf` to commute homomorphism with sup/inf.
  - Use `sSupClosed` / `sInfClosed` in target/sublattice.

- **Equivalence proofs** (`disjoint_iff`, etc.):
  - Expand definitions (`disjoint_iff`, `codisjoint_iff`, `isCompl_iff`).
  - Use `← Sublattice.coe_inf`, `coe_bot`, `subtype.coe_injective.eq_iff` to lift equivalences.

- **Complemented lattice characterization**:
  - Use `isCompl_iff` to reduce to ambient lattice.
  - Construct witnesses via choice or given hypothesis.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Data.Set.Functor` | Provides `image`, `preimage`, `range`, `Set.image`, etc. |
| `Mathlib.Order.Sublattice` | Defines `Sublattice`, foundational for `CompleteSublattice`. |
| `Mathlib.Order.Hom.CompleteLattice` | Defines `CompleteLatticeHom`, `map_sSup`, `map_sInf`, etc. |

**Scope**: This module formalizes the theory of *complete* sublattices — subsets closed under *arbitrary* suprema and infima — within the context of complete lattices and their homomorphisms. It builds on `Sublattice` and `CompleteLatticeHom`, and is foundational for module-theoretic applications (e.g., invariant submodules).

--- 

Let me know if you'd like a diagram of the `map`/`comap` adjunction or a summary of how `range` interacts with `comap`/`map`.