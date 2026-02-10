### Technical Metadata Brief: Krull Topology in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `finiteExts K L` | `Set (IntermediateField K L)` | Collection of intermediate fields `E` with `E/K` finite-dimensional. |
| `fixedByFinite K L` | `Set (Subgroup (L ≃ₐ[K] L))` | Image of `finiteExts` under `E ↦ Gal(L/E) = E.fixingSubgroup`. |
| `galBasis K L` | `FilterBasis (L ≃ₐ[K] L)` | Filter basis on automorphism group whose sets are `Gal(L/E)` for finite `E/K`. |
| `galGroupBasis K L` | `GroupFilterBasis (L ≃ₐ[K] L)` | Refinement of `galBasis` with group structure (closed under multiplication, inversion, conjugation). |
| `krullTopology K L` | `TopologicalSpace (L ≃ₐ[K] L)` | Topology induced by `galGroupBasis`; makes `L ≃ₐ[K] L` a topological group. |
| `krullTopology_t2` | `T2Space (L ≃ₐ[K] L)` | Hausdorffness of Krull topology for *integral* extensions `L/K`. |
| `krullTopology_totallyDisconnected` | `IsTotallyDisconnected (Set.univ)` | Total disconnectedness of Krull topology for *algebraic* extensions `L/K`. |
| `IntermediateField.fixingSubgroup.antimono` | `E1 ≤ E2 → E2.fixingSubgroup ≤ E1.fixingSubgroup` | Monotonicity reversal: larger fields → smaller fixing subgroups. |
| `IntermediateField.mem_fixingSubgroup_iff` | `σ ∈ E.fixingSubgroup ↔ ∀ x ∈ E, σ x = x` | Membership criterion for fixing subgroups. |
| `IntermediateField.fixingSubgroup_isOpen` | `FiniteDimensional K E → IsOpen (Gal(L/E))` | Openness of fixing subgroups for finite extensions. |
| `IntermediateField.fixingSubgroup_isClosed` | `FiniteDimensional K E → IsClosed (Gal(L/E))` | Closedness of fixing subgroups (via open subgroup property). |
| `krullTopology_mem_nhds_one` | Characterization of neighborhoods of identity in Krull topology | `s ∈ 𝓝 1 ↔ ∃ E, FiniteDimensional K E ∧ Gal(L/E) ⊆ s`. |
| `krullTopology_discreteTopology_of_finiteDimensional` | `[FiniteDimensional K L] → DiscreteTopology` | Krull topology is discrete when `L/K` is finite. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `fixingSubgroup`: denotes the subgroup fixing an intermediate field.
  - `finiteExts`, `fixedByFinite`: describe collections of finite extensions or their fixing subgroups.
  - `galBasis`, `galGroupBasis`: filter bases for the Krull topology.
  - `krullTopology`: main topology instance.

- **Suffixes**:
  - `_isOpen`, `_isClosed`: properties of subgroups/sets.
  - `_iff`: biconditional characterizations (e.g., membership criteria).
  - `_top`, `_bot`: special cases for top/bottom intermediate fields (`L` and `K`).
  - `mem_`, `nhds_`: neighborhood/membership lemmas.

- **Notation**:
  - `Gal(L/E)` used informally for `E.fixingSubgroup`.
  - `σ ∈ E.fixingSubgroup` ↔ `σ` fixes `E` pointwise.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `ext`: for rewriting and extensionality.
- `rcases`, `rintro`, `intro`: case analysis and hypothesis destructuring.
- `exact`, `apply`, `refine`: constructing proofs stepwise.
- `have`, `let`: introducing intermediate results or definitions.
- `convert`, `change`: for equational reasoning with definitional equality.
- `apply_fun`, `change ... at h`: manipulating hypotheses.
- `rw [← AlgEquiv.apply_symm_apply]`, `rw [mul_inv_eq_iff_eq_mul.symm]`: algebraic rewrites.
- `exact?` / `aesop`: for routine closure steps (though not heavily used here).
- `apply IntermediateField.finiteDimensional_sup` / `im_finiteDimensional`: leveraging existing lemmas.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Inductive/constructive**: definitions built via `⟨...⟩` and `refine ⟨..., ?_⟩`.
  - **Case analysis on elements**: e.g., `rcases hστ with ⟨x, hx⟩` to separate automorphisms.
  - **Use of algebraic properties**:
    - Integral/algebraic assumptions used to ensure finite-dimensionality of `adjoin K {x}`.
    - `adjoin.finiteDimensional` + `isIntegral` → finite extension.
  - **Subgroup manipulation**:
    - Open/closedness via `isOpen_of_mem_nhds`, `isClosed_of_isOpen_subgroup`.
    - Disjointness of cosets via group-theoretic reasoning (`w1 * w2⁻¹ ∈ H`).
  - **Topology**:
    - Neighborhood filters characterized via `GroupFilterBasis.nhds_one_eq`.
    - Hausdorffness via separation of points using neighborhoods `f • W`, `g • W`.
    - Total disconnectedness via clopen cosets of `Gal(L/E)`.

- **Common pattern**:
  > *Given two distinct automorphisms, find a finite subextension `E/K` such that they differ on `E`, then use `Gal(L/E)` to separate them topologically.*

---

#### **5. Imports**

Core dependencies defining the module’s scope:

| Import | Purpose |
|--------|---------|
| `Mathlib.FieldTheory.Galois.Basic` | Galois theory basics: fixing subgroups, intermediate fields, automorphism groups. |
| `Mathlib.Topology.Algebra.FilterBasis` | Filter bases and their topologies. |
| `Mathlib.Topology.Algebra.OpenSubgroup` | Open subgroups in topological groups (used for closedness of fixing subgroups). |
| `Mathlib.Tactic.ByContra` | Classical reasoning (used in some separation arguments). |

> **Note**: The formalization assumes `L/K` is an algebra (i.e., a field extension), and uses typeclass inference for algebra structures, finite-dimensionality, integrality, etc.

--- 

Let me know if you'd like a diagram of the dependency graph or a summary of how this fits into the broader Galois theory pipeline in Mathlib.