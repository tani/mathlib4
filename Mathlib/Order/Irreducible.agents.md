### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `SupIrred a` | `Prop` | Defines *sup-irreducibility*: `a ≠ ⊥` and `a = b ⊔ c → a = b ∨ a = c`. |
| `InfIrred a` | `Prop` | Defines *inf-irreducibility*: `a ≠ ⊤` and `a = b ⊓ c → a = b ∨ a = c`. |
| `SupPrime a` | `Prop` | Defines *sup-primality*: `a ≠ ⊥` and `a ≤ b ⊔ c → a ≤ b ∨ a ≤ c`. |
| `InfPrime a` | `Prop` | Defines *inf-primality*: `a ≠ ⊤` and `b ⊓ c ≤ a → b ≤ a ∨ c ≤ a`. |
| `SupPrime.supIrred` | `SupPrime a → SupIrred a` | Primality implies irreducibility in any lattice. |
| `InfPrime.infIrred` | `InfPrime a → InfIrred a` | Dual of above. |
| `supPrime_iff_supIrred` | `SupPrime a ↔ SupIrred a` | In *distributive lattices*, primality and irreducibility coincide. |
| `infPrime_iff_infIrred` | `InfPrime a ↔ InfIrred a` | Dual of above. |
| `supIrred_iff_not_isMin` | `SupIrred a ↔ ¬IsMin a` | In *linear orders*, sup-irreducibility is equivalent to not being minimal. |
| `infIrred_iff_not_isMax` | `InfIrred a ↔ ¬IsMax a` | Dual of above. |
| `exists_supIrred_decomposition` | `∃ s, s.sup id = a ∧ ∀ b ∈ s, SupIrred b` | In a *well-founded* semilattice, every element decomposes into finitely many sup-irreducibles. |
| `exists_infIrred_decomposition` | Dual decomposition for inf-irreducibles in *cowell-founded* lattices. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `sup` / `inf`: Denote lattice-theoretic operations (`⊔`, `⊔`).
  - `isMin` / `isMax`: Minimal/maximal element predicates.
  - `not_`: Negated properties (e.g., `not_supIrred`, `not_supPrime`).
- **Suffixes**:
  - `irred`: Short for *irreducible*.
  - `prime`: Short for *prime*.
  - `toDual` / `ofDual`: Duality across order duals.
- **Aliases**:
  - `⟨_, SupIrred.dual⟩`, `⟨_, InfPrime.ofDual⟩`, etc., indicate dual equivalences.

#### 3. **Tactic Stack**

- `simp`: Extensive use of `simp`, especially with `@eq_comm`, `exists₂_congr`, `ih`, and `sup_union`.
- `rw`: Rewriting using definitions and equivalences (e.g., `rw [SupIrred, not_and_or]`).
- `induction' ... using Finset.induction`: Structural induction on finite sets.
- `push_neg`: To push negations inward (e.g., in `not_supIrred` proof).
- `exact`, `intro`, `rintro`, `obtain`: Standard intro/elimination tactics.
- `simp_rw`: Simplification with rewriting (e.g., in `supPrime_iff_supIrred`).
- `aesop` not used; relies on manual simplification and case analysis.

#### 4. **Proof Logic**

- **Inductive structure**: Proofs often proceed by:
  1. **Case analysis** on whether an element is minimal/maximal or irreducible/prime.
  2. **Well-founded induction** for decomposition theorems (`exists_supIrred_decomposition`, `exists_infIrred_decomposition`).
  3. **Finite set induction** for lemmas about `Finset.sup`/`Finset.inf`.
- **Duality**: Many results are proven for sup-versions and then dualized (e.g., via `OrderDual`).
- **Logical flow**:
  - Show equivalence of negated properties (`not_supIrred`, `not_supPrime`) via `push_neg`.
  - Prove implications between primality and irreducibility.
  - Use distributivity or linearity to strengthen equivalences.
  - For decomposition: if `a` is irreducible, done; else decompose into smaller `b, c`, apply IH.

#### 5. **Imports**

- `Mathlib.Data.Finset.Lattice.Fold`: Provides `Finset.sup`, `Finset.inf`, and related lemmas (e.g., `sup_union`, `sup_insert`, `inf_union`, etc.).
- Core dependencies implied:
  - `OrderTheory.Lattice` (semilattices, lattices, distributive lattices, linear orders).
  - `OrderTheory.WellFounded` (for `WellFoundedLT`, `WellFoundedGT`).
  - `OrderTheory.OrderDual` (for duality via `OrderDual`, `toDual`, `ofDual`).
  - `OrderTheory.BotTop` (for `OrderBot`, `OrderTop`, `isMin_bot`, `isMax_top`).

---

This module formalizes a foundational part of order theory, drawing parallels between lattice theory and arithmetic (e.g., prime factorization ↔ decomposition into irreducibles), with emphasis on well-foundedness, distributivity, and linearity as key structural conditions.