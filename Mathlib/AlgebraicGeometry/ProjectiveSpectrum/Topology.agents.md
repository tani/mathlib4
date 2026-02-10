### Technical Metadata Brief: `ProjectiveSpectrum` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ProjectiveSpectrum 𝒜` | `Type u` (subtype of `HomogeneousIdeal 𝒜`) | Represents *relevant homogeneous prime ideals* — homogeneous prime ideals not containing the irrelevant ideal `𝒜 ≥ 1`. |
| `zeroLocus 𝒜 s` | `Set A → Set (ProjectiveSpectrum 𝒜)` | Maps a subset `s ⊆ A` to the set of points (prime ideals) containing `s`. Closed sets in Zariski topology. |
| `vanishingIdeal t` | `Set (ProjectiveSpectrum 𝒜) → HomogeneousIdeal 𝒜` | Maps a subset of points to the ideal of functions vanishing on all points. |
| `zariskiTopology` | `TopologicalSpace (ProjectiveSpectrum 𝒜)` | Defines the Zariski topology via closed sets = zero loci. |
| `basicOpen r` | `A → TopologicalSpace.Opens (ProjectiveSpectrum 𝒜)` | Principal open subset where `r ≠ 0` (i.e., `r ∉ 𝔭`). Forms a basis. |
| `gc_ideal`, `gc_set`, `gc_homogeneousIdeal` | `GaloisConnection` | `zeroLocus` and `vanishingIdeal` form contravariant Galois connections between ideals/sets and subsets of `Proj`. |
| `zeroLocus_vanishingIdeal_eq_closure` | `t : Set (ProjectiveSpectrum 𝒜) → zeroLocus (vanishingIdeal t) = closure t` | Closure of a set is the zero locus of its vanishing ideal — key topological property. |
| `le_iff_mem_closure` | `x ≤ y ↔ y ∈ closure ({x})` | Specialization order on `Proj` is defined by inclusion of ideals (dual to inclusion of points in closures). |
| `isTopologicalBasis_basic_opens` | `IsTopologicalBasis (range basicOpen)` | Principal opens form a basis for the Zariski topology. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `zeroLocus_`: operations mapping subsets of `A` → subsets of `Proj`.
  - `vanishingIdeal_`: operations mapping subsets of `Proj` → homogeneous ideals.
  - `basicOpen_`: principal open subsets.
  - `gc_`: Galois connection lemmas.
  - `subset_..._iff_...`: characterizations of inclusion relations.
  - `mem_...`: membership equivalences (often `@[simp]`).
- **Suffixes**:
  - `_singleton`, `_union`, `_mul`, `_sup`, `_iSup`, `_iUnion`: indicate behavior under set/ideal operations.
  - `_anti_mono`: monotonicity in reverse direction (contravariance).
  - `_eq_closure`, `_le_vanishingIdeal_zeroLocus`: closure/adjunction identities.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying membership, `zeroLocus`, `vanishingIdeal`, Galois connections. |
| `rw` / `ext` | Extensionality for sets/ideals; rewriting definitions. |
| `exact`, `solve_by_elim` | Closing goals via known facts or instance search. |
| `convert` + `using n` | Matching up to definitional equality (e.g., in `vanishingIdeal_iUnion`). |
| `intro`, `apply`, `have`, `obtain` | Standard natural-deduction style. |
| `erw` | Rewriting with definitional equality (e.g., in `vanishingIdeal_closure`). |
| `classical` | When using classical logic (e.g., in `zeroLocus_empty_of_one_mem`). |
| `TopologicalSpace.Opens.ext` | Proving equality of open sets. |
| `HomogeneousIdeal.toIdeal_injective` | Injectivity used to lift equalities from underlying ideals. |

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *Galois connection + set-theoretic reasoning* pattern:
  1. **Unfold definitions** (`zeroLocus`, `vanishingIdeal`, `mem`, `subset`).
  2. **Apply Galois connection** (`gc_ideal`, `gc_set`, `gc_homogeneousIdeal`) to reduce to ideal/set inclusions.
  3. **Use properties of prime ideals** (e.g., `mul_mem_iff_mem_or_mem`, `pow_mem_iff_mem`, `inf_le`).
  4. **Leverage homogeneous ideal structure** (via `GradedAlgebra`, `DirectSum`, `proj`).
  5. **Topological arguments**: closure = zero locus of vanishing ideal; basis = principal opens.

- **Induction**: Not heavily used; most arguments are *algebraic* and *order-theoretic*.
- **Case analysis**: On membership/non-membership (e.g., `1 ∈ s` ⇒ empty zero locus).
- **Extensionality**: Central for set/ideal equality (`ext`, `HomogeneousIdeal.toIdeal_injective`).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.RingTheory.GradedAlgebra.HomogeneousIdeal` | Core: homogeneous ideals, irrelevant ideal, grading. |
| `Mathlib.Topology.Category.TopCat.Basic` | Topological spaces as a category (`TopCat`). |
| `Mathlib.Topology.Sets.Opens` | Open sets, topology construction. |
| `Mathlib.Data.Set.Subsingleton` | Used for uniqueness of certain constructions (e.g., `HomogeneousIdeal`). |

**Domain**:  
- **Algebraic geometry** over graded rings.  
- **Projective schemes**: `Proj A` for a graded ring `A`.  
- **Zariski topology**, specialization order, sheaf-theoretic foundations (though sheaves not yet defined here).  
- **Homogeneous algebra**: emphasis on grading, homogeneous components (`GradedAlgebra.proj`), irrelevant ideal.

--- 

Let me know if you'd like a diagram of the Galois connection or a summary of how `basicOpen` relates to localization.