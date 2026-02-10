### Technical Brief: Lasker Ring Formalization in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsLasker` | `CommSemiring R → Prop` | Defines a *Lasker ring*: every ideal admits a finite decomposition into primary ideals. |
| `Ideal.decomposition_erase_inf` | `{I : Ideal R} → {s : Finset (Ideal R)} → s.inf id = I → ∃ t ⊆ s, t.inf id = I ∧ ∀ J ∈ t, ¬(t.erase J).inf id ≤ J` | Removes redundant components from a decomposition, ensuring minimality in the sense that removing any component strictly increases the intersection. |
| `Ideal.isPrimary_decomposition_pairwise_ne_radical` | `{I : Ideal R} → s.inf id = I → (∀ J ∈ s, J.IsPrimary) → ∃ t, t.inf id = I ∧ (∀ J ∈ t, J.IsPrimary) ∧ Pairwise (≠) on radicals` | Refines a primary decomposition to one where radicals are pairwise distinct (i.e., no two components share the same radical). |
| `Ideal.exists_minimal_isPrimary_decomposition_of_isPrimary_decomposition` | `{I : Ideal R} → s.inf id = I → (∀ J ∈ s, J.IsPrimary) → ∃ t, t.inf id = I ∧ (∀ J ∈ t, J.IsPrimary) ∧ Pairwise (≠) on radicals ∧ minimal (erase condition)` | Combines the above two lemmas to produce a *minimal* primary decomposition: pairwise distinct radicals and no redundant components. |
| `IsLasker.minimal` | `IsLasker R → I : Ideal R → ∃ t, ...` | Instantiates the minimal decomposition for any ideal in a Lasker ring. |
| `Ideal.InfIrred.isPrimary` | `InfIrred I → I.IsPrimary` | Shows that an *infinitely irreducible* ideal in a Noetherian ring is primary. Crucial for reducing the Lasker–Noether theorem to existence of inf-irreducible decompositions. |
| `Ideal.isLasker` | `[CommRing R] [IsNoetherianRing R] → IsLasker R` | **Main theorem**: Every Noetherian commutative ring is a Lasker ring. Proven via existence of inf-irreducible decompositions and the previous lemma. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isPrimary_`: Lemmas about properties of primary ideals or decompositions.
  - `decomposition_`: Lemmas about constructing or manipulating decompositions.
  - `exists_`: Existential lemmas producing decompositions.
  - `InfIrred.`: Properties of infinitely irreducible ideals.

- **Suffixes**:
  - `_pairwise_ne_radical`: Ensures radicals are pairwise distinct.
  - `_erase_inf`: Refers to removal of redundant components via `Finset.erase`.
  - `_minimal`: Final minimal decomposition (both radical-distinct and erase-minimal).
  - `_of_`: Derives a decomposition from an existing one (e.g., `of_isPrimary_decomposition`).

- **Other patterns**:
  - `onFun`, `comp_eq`, `id_eq`: Used in `simp`-friendly rewriting.
  - `mem_finset_inf`, `mem_colon_singleton`, `mem_span_singleton_sup`: Standard ideal membership rewrites.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp` / `simp_rw`: Extensive use of `simp` with custom lemmas (e.g., `Finset.inf_image`, `Submodule.mem_finset_inf`, `radical_finset_inf`).
- `intro`, `refine`, `exact`: Standard intro/refinement style.
- `rcases`, `obtain`: For destructuring existential or conjunction hypotheses.
- `contrapose!`: Used to flip implications and derive contradictions.
- `rw`, `apply`, `assumption`: Basic rewriting and application.
- `have`, `suffices`: Intermediate claims and goal rephrasing.
- `Finset.strongInductionOn`: Induction on finite sets for minimality arguments.
- `le_antisymm`: To prove equality of ideals via mutual inclusion.
- `ring` / `linarith`: Not explicitly used here, but `simp` handles module/ideal arithmetic.

---

#### **4. Proof Logic**

- **Structure of `decomposition_erase_inf`**:
  - Strong induction on finite sets.
  - If no component is redundant, done.
  - Otherwise, remove a redundant component and recurse.

- **Structure of `isPrimary_decomposition_pairwise_ne_radical`**:
  - Groups components by equal radicals.
  - Replaces each group with the intersection of its members (still primary).
  - Ensures resulting radicals are pairwise distinct.

- **Structure of `exists_minimal_isPrimary_decomposition_of_isPrimary_decomposition`**:
  - First apply `isPrimary_decomposition_pairwise_ne_radical`.
  - Then apply `decomposition_erase_inf` to remove redundancy.

- **Structure of `isLasker` (Lasker–Noether)**:
  - Use `exists_infIrred_decomposition` (from Noetherian assumption).
  - Show each inf-irreducible component is primary (`InfIrred.isPrimary`).
  - Conclude via `isPrimary_decomposition_pairwise_ne_radical` + `exists_minimal...`.

- **Key logical flow**:
  > Noetherian ⇒ every ideal has an inf-irreducible decomposition  
  ⇒ each inf-irreducible ideal is primary  
  ⇒ every ideal has a primary decomposition  
  ⇒ (via refinement) every ideal has a *minimal* primary decomposition  
  ⇒ ring is Lasker.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Order.Irreducible` | Defines `InfIrred`, used to link irreducibility and primarity in Noetherian settings. |
| `Mathlib.RingTheory.Ideal.Colon` | Provides `I.colon J`, used in proof of `InfIrred.isPrimary`. |
| `Mathlib.RingTheory.Ideal.IsPrimary` | Defines `IsPrimary`, key property of components in Lasker decomposition. |
| `Mathlib.RingTheory.Noetherian.Defs` | Provides `IsNoetherianRing`, used to prove stabilization of colon ideals and existence of inf-irreducible decompositions. |

---

#### **6. Notes & Future Work (per comments)**

- **Submodule generalization**: The current formalization is for ideals; extending to submodules would require:
  - `IsPrimary` for submodules,
  - `colon` for submodules,
  - `InfIrred` for submodules.
- **Independence of radicals**: The theorem shows existence of a minimal decomposition, but *uniqueness* of the radicals (up to permutation) remains to be formalized.

--- 

Let me know if you'd like a diagram of the proof dependencies or a tactic-level trace of `isLasker`.