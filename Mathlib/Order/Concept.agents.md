### Technical Metadata Brief: Formal Concept Analysis in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `intentClosure r s` | `Set α → Set β` | Given a relation `r : α → β → Prop`, maps a subset `s ⊆ α` to the set of all `b ∈ β` related to *every* element of `s`. |
| `extentClosure r t` | `Set β → Set α` | Maps `t ⊆ β` to the set of all `a ∈ α` related to *every* element of `t`. |
| `subset_intentClosure_iff_subset_extentClosure` | `t ⊆ intentClosure r s ↔ s ⊆ extentClosure r t` | Core adjunction property: characterizes the Galois connection between intent/extent closures. |
| `gc_intentClosure_extentClosure` | `GaloisConnection (toDual ∘ intentClosure r) (extentClosure r ∘ ofDual)` | Establishes that `(intentClosure r, extentClosure r)` form a Galois connection (contravariant). |
| `Concept α β r` | `Structure` | A *formal concept* is a pair `(s, t)` such that `s = extentClosure r t` and `t = intentClosure r s`. Encodes closed pairs under the closure operators. |
| `fst_injective`, `snd_injective` | `Injective` | Proves that the first/second components uniquely determine a concept. |
| `instSupConcept`, `instInfConcept` | `Max`, `Min` instances | Define meet (`⊔`) and join (`⊔`) on concepts via intersection and closure: <br> `c ⊔ d = (extentClosure(c.snd ∩ d.snd), c.snd ∩ d.snd)` <br> `c ⊓ d = (c.fst ∩ d.fst, intentClosure(c.fst ∩ d.fst))` |
| `instCompleteLatticeConcept` | `CompleteLattice (Concept α β r)` | Proves the concept lattice is *complete*: arbitrary suprema and infima exist, computed via intersections of components and closures. |
| `swap` | `Concept α β r → Concept β α (swap r)` | Duality: swaps the two components of a concept to get a concept over the dual relation. |
| `swapEquiv` | `(Concept α β r)ᵒᵈ ≃o Concept β α (swap r)` | Order-isomorphism between the dual of the concept lattice and the concept lattice of the swapped relation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `intentClosure`, `extentClosure`: standard terms from formal concept analysis.
  - `closure_fst`, `closure_snd`: axiomatic properties of `Concept`.
- **Suffixes**:
  - `_anti`, `_mono`: indicate monotonicity/antitonicity (`intentClosure_anti`, `extentClosure_anti`).
  - `_iff`: equivalence lemmas (`subset_intentClosure_iff_subset_extentClosure`, `fst_subset_fst_iff`).
  - `_swap`: duality-related (`intentClosure_swap`, `extentClosure_swap`, `swap`, `swapEquiv`).
- **Structure projections**:
  - `fst`, `snd`: used for the two components of a concept (first = extent, second = intent).
- **Simp-normal forms**:
  - `sup_fst`, `sup_snd`, `inf_fst`, `inf_snd`, `sSup_fst`, `sInf_snd`, etc.: describe how lattice operations act on components.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rfl`, `ext`, `substs`, `dsimp`: structural reasoning and extensionality.
- `rw`, `simp_rw`: rewriting using simplification lemmas (especially `← closure_fst`, `← closure_snd`, closure idempotence).
- `exact`, `apply`, `intro`, `cases`: basic proof scripting.
- `subset_univ`, `subset_inter`, `inter_subset_left`, `inter_subset_right`: set-theoretic reasoning.
- `biInter_subset_of_mem`, `subset_iInter₂`: reasoning about indexed intersections/unions.
- `gc_intentClosure_extentClosure` is repeatedly used via lemmas like:
  - `le_u_l`, `u_l_u_eq_u`, `l_iSup`, `l_iSup₂`, `monotone_l`, etc., from `GaloisConnection`.

No heavy automation (e.g., `aesop`, `linarith`) is used—proofs are mostly algebraic and rely on structural properties of Galois connections.

---

#### **4. Proof Logic**

- **Galois connection foundation**: All key properties derive from the adjunction `t ⊆ intentClosure r s ↔ s ⊆ extentClosure r t`.
- **Closure properties**:
  - Idempotence: `intentClosure_extentClosure_intentClosure`, `extentClosure_intentClosure_extentClosure`.
  - Extensivity/intensionality: `s ⊆ extentClosure_intentClosure s`, `t ⊆ intentClosure_extentClosure t`.
  - Antitonicity: `intentClosure_anti`, `extentClosure_anti`.
- **Concept structure**:
  - Prove injectivity of `fst`/`snd` to reduce equality of concepts to equality of components.
  - Define lattice operations via closure of intersections; verify closure axioms using idempotence and swap lemmas.
- **Completeness**:
  - Arbitrary sup/inf defined via intersections of components and closure.
  - Verified using `iSup`/`iInf` lemmas for Galois connections (`l_iSup`, `l_iSup₂`).
- **Duality**:
  - `swap` flips components and uses symmetry of the definition.
  - `swapEquiv` leverages `swap_le_swap_iff` to show order-isomorphism with dual.

Induction is *not* used—proofs are mostly equational and rely on algebraic properties of closures and set operations.

---

#### **5. Imports**

- `Mathlib.Data.Set.Lattice`: Provides lattice-theoretic infrastructure for sets (e.g., `biInter`, `iSup`, `CompleteLattice` on `Set β`).
- Implicit imports via `Mathlib`:
  - `Function` (for `swap`, `toDual`, `ofDual`, `StrictMono`, `Antitone`, etc.)
  - `Order.Filter` (via `GaloisConnection`, `CompleteLattice`, `BoundedOrder`)
  - `Data.Set.Basic` (via `Set`, `univ`, `subset`, `inter`, `union`, `iUnion`, etc.)

No external libraries—entirely built on core `Mathlib`.

---

### Summary

This file formalizes the foundational theory of **formal concept analysis** in Lean 4, constructing the **concept lattice** of a binary relation as a *complete lattice* of closed pairs `(extent, intent)`. It leverages **Galois connections** to derive closure properties, defines lattice operations via intersections and closures, and establishes duality via `swap`. The formalization is clean, algebraic, and highly structured, with extensive use of `simp`-lemmas and Galois connection lemmas from `Mathlib`.