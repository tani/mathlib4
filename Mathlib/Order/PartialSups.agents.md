### Technical Brief: `partialSups` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `partialSups` | `(f : ℕ → α) → ℕ →o α` | Defines the monotone sequence of *partial suprema*: `f 0`, `f 0 ⊔ f 1`, `f 0 ⊔ f 1 ⊔ f 2`, ... |
| `partialSups_zero` | `partialSups f 0 = f 0` | Base case of the inductive definition. |
| `partialSups_succ` | `partialSups f (n + 1) = partialSups f n ⊔ f (n + 1)` | Recursive step: extends the supremum by one more term. |
| `partialSups_le_iff` | `partialSups f n ≤ a ↔ ∀ k ≤ n, f k ≤ a` | Characterizes when a partial supremum is bounded above — crucial for reasoning about bounds. |
| `le_partialSups_of_le` | `m ≤ n ⇒ f m ≤ partialSups f n` | Each term of `f` is bounded by the corresponding partial supremum. |
| `le_partialSups` | `f ≤ partialSups f` | Pointwise inequality: `f` is dominated by its partial suprema sequence. |
| `upperBounds_range_partialSups` | `upperBounds (range (partialSups f)) = upperBounds (range f)` | The sets of upper bounds of `f` and its partial suprema coincide. |
| `bddAbove_range_partialSups` | `BddAbove (range (partialSups f)) ↔ BddAbove (range f)` | Boundedness above is preserved. |
| `Monotone.partialSups_eq` | `Monotone f ⇒ partialSups f = f` | If `f` is monotone, then `partialSups f` doesn’t change it. |
| `partialSups_mono` | `Monotone (partialSups : (ℕ → α) → ℕ →o α)` | `partialSups` is monotone w.r.t. pointwise order on functions. |
| `partialSups.gi` | `GaloisInsertion (partialSups) (↑)` | `partialSups` forms a Galois insertion into monotone functions. |
| `partialSups_eq_sup'_range` | `partialSups f n = (Finset.range (n + 1)).sup' ... f` | Equivalence with `Finset.sup'` (avoids nonemptiness proofs). |
| `partialSups_apply` | `partialSups f n i = partialSups (f · i) n` | Compatibility with dependent functions / product types. |
| `partialSups_eq_sup_range` | `partialSups f n = (Finset.range (n + 1)).sup f` | Equivalence with `Finset.sup` (requires `OrderBot`). |
| `disjoint_partialSups_left/right` | `Disjoint (partialSups f n) x ↔ ∀ k ≤ n, Disjoint (f k) x` | Disjointness distributes over partial suprema (requires `DistribLattice`, `OrderBot`). |
| `partialSups_disjoint_of_disjoint` | `Pairwise (Disjoint on f) ∧ m < n ⇒ Disjoint (partialSups f m) (f n)` | Ensures disjointness propagates forward in the sequence. |
| `partialSups_eq_ciSup_Iic` | `partialSups f n = ⨆ i ∈ Iic n, f i` | Equivalence with indexed supremum over `Iic n` (in `ConditionallyCompleteLattice`). |
| `ciSup_partialSups_eq` | `BddAbove (range f) ⇒ ⨆ n, partialSups f n = ⨆ n, f n` | Supremum over the whole sequence is unchanged. |
| `partialSups_eq_biSup` | `partialSups f n = ⨆ i ≤ n, f i` | Equivalence with `iSup` over bounded indices (in `CompleteLattice`). |
| `partialSups_eq_sUnion_image`, `partialSups_eq_biUnion_range` | `partialSups s n = ⋃₀ (range (n+1) : Finset) image s` | For sequences of sets, matches union over finite range. |
| `iSup_partialSups_eq` | `⨆ n, partialSups f n = ⨆ n, f n` | Global supremum unchanged (in `CompleteLattice`). |
| `iSup_le_iSup_of_partialSups_le_partialSups`, `iSup_eq_iSup_of_partialSups_eq_partialSups` | Monotonicity & equality preservation of global suprema under `partialSups`. | Enables reasoning about suprema via `partialSups`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `partialSups_`: All lemmas/theorems about `partialSups`.
  - `le_`, `bddAbove_`, `upperBounds_`: Properties about order-theoretic bounds.
  - `disjoint_`: Properties about disjointness.
- **Suffixes**:
  - `_iff`: Logical equivalences (↔).
  - `_range`: Involving `Finset.range`.
  - `_Iic`: Involving `Iic n = {i | i ≤ n}`.
  - `_left` / `_right`: For symmetric properties (e.g., `disjoint_partialSups_left/right`).
- **Function names**:
  - `partialSups` (noun, not verb): The *sequence* itself.
  - `partialSups.gi`: A structure field (Galois insertion).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`, `refl`: For definitional equalities.
- `simp` / `simp_rw`: Simplification using lemmas like `partialSups_zero`, `partialSups_succ`, `partialSups_le_iff`.
- `induction' ... with ...`: Structural induction on `ℕ`.
- `ext`: Extensionality (for functions, sets, relations).
- `convert`: To reuse existing equalities up to definitional equality.
- `exact`, `assumption`: For straightforward goals.
- `rw [← ...]`: Rewriting with reversed equations (e.g., to introduce `partialSups`).
- `apply`, `exact`: For applying lemmas.
- `aesop`: Not used here — this file is mostly `simp`/`rw`/`induction`-heavy.
- `congr_arg`, `congr_fun`: For functional extensionality and congruence.

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs about `partialSups` proceed by induction on `n : ℕ`, leveraging:
  - `partialSups_zero` and `partialSups_succ` as base/step.
- **Equivalence proofs** (`partialSups_eq_*`):
  - Use `eq_of_forall_ge_iff` + `partialSups_le_iff` to reduce to universal quantification over `k ≤ n`.
  - Often rely on `Nat.lt_succ_iff` to relate `k ≤ n` and `k < n+1`.
- **Order-theoretic reasoning**:
  - Use `partialSups_le_iff` to translate between bounds on `partialSups f n` and bounds on `f k` for `k ≤ n`.
  - Antisymmetry (`antisymm`) used to prove equality of functions or suprema.
- **Galois insertion**:
  - Constructed via `GaloisInsertion.mk` with explicit `choice`, `gc`, `le_l_u`, `choice_eq`.
  - `gc` proof uses `partialSups_mono` and `partialSups_eq` for monotone functions.
- **Disjointness & distributivity**:
  - Require `DistribLattice` + `OrderBot`.
  - Use `partialSups_iff_forall` with predicate `Disjoint · x` or `Disjoint x ·`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Data.Finset.Lattice.Fold`: For `Finset.sup`, `Finset.sup'`, lattice operations on finite sets.
- `Mathlib.Data.Set.Finite.Lattice`: For `bddAbove`, `upperBounds`, finite suprema.
- `Mathlib.Order.ConditionallyCompleteLattice.Indexed`: For `ciSup`, `Iic`, conditional completeness.
- `Mathlib.Order.Hom.Basic`: For `Monotone`, `ℕ →o α`, order homomorphisms.

**Domain scope**:
- `SemilatticeSup α`: Lattice with binary supremum (`⊔`).
- `OrderBot α`: Adds bottom element `⊥` (used in `sup_range`, `disjoint_*` lemmas).
- `DistribLattice α`: Needed for disjointness lemmas (distributivity of `⊔` over `⊥`).
- `ConditionallyCompleteLattice α`: For `ciSup` over arbitrary index sets (e.g., `Iic n`).
- `CompleteLattice α`: For `iSup` over bounded indices (`i ≤ n`) and global suprema.

**Generalization potential**:
- As noted in TODO: Could generalize `partialSups` to any *locally finite* preorder domain (not just `ℕ`), especially for `Order.disjointed`.

--- 

Let me know if you'd like a diagram of the Galois insertion or a summary of how `partialSups` simplifies reasoning about suprema in `ConditionallyCompleteLattice`s.