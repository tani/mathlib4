### Technical Metadata Brief: Minimal Group Actions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AddAction.IsMinimal` | `class` | Defines *additive minimal action*: every orbit under an additive monoid is dense. |
| `MulAction.IsMinimal` | `class` | Defines *multiplicative minimal action*: every orbit under a monoid is dense. |
| `MulAction.dense_orbit` | `∀ x, Dense (orbit M x)` | Extracts density of orbit from `IsMinimal` instance. |
| `denseRange_smul` | `DenseRange (c ↦ c • x)` | Reformulates orbit density as density of the range of the action map. |
| `MulAction.isMinimal_of_pretransitive` | `instance` | Shows that pretransitive actions are minimal. |
| `IsOpen.exists_smul_mem` | `∃ c, c • x ∈ U` | From minimality + openness/nonemptiness of `U`, finds a group element moving `x` into `U`. |
| `IsOpen.iUnion_preimage_smul` | `⋃ c, (c • ·)⁻¹' U = univ` | Characterizes minimality via covering the space by preimages of open sets under translations. |
| `IsOpen.iUnion_smul` | `⋃ g, g • U = univ` | For *group* actions: the union of all translates of a nonempty open set is the whole space. |
| `IsCompact.exists_finite_cover_smul` | `∃ I : Finset G, K ⊆ ⋃ g ∈ I, g • U` | Compact sets can be covered by finitely many translates of a nonempty open set (uses continuity of scalar multiplication). |
| `dense_of_nonempty_smul_invariant` | `Dense s` | A nonempty, `M`-invariant subset under a minimal action is dense. |
| `eq_empty_or_univ_of_smul_invariant_closed` | `s = ∅ ∨ s = univ` | Closed, invariant subsets under minimal action are trivial. |
| `isMinimal_iff_isClosed_smul_invariant` | `↔` | Equivalence: action is minimal iff all closed invariant subsets are trivial (requires continuity of scalar multiplication). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `dense_`: properties about dense orbits/ranges (e.g., `dense_orbit`, `denseRange_smul`)
  - `isMinimal_`: characterizations or consequences of minimality (e.g., `isMinimal_iff_isClosed_smul_invariant`)
  - `smul_`: actions involving scalar multiplication (e.g., `smul_invariant`, `smul_closure_orbit_subset`)
  - `exists_`: existential consequences (e.g., `exists_smul_mem`, `exists_finite_cover_smul`)
- **Suffixes**:
  - `_invariant`: subsets stable under the action
  - `_closed`: closed subsets involved in characterizations
  - `_pretransitive`: relation to transitivity-like properties

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop`: for automated reasoning with hypotheses and constructors.
- `simp_rw`: for rewriting using definitional equalities and simp lemmas.
- `rw`, `exact`, `refine`, `intro`, `cases`: standard proof scripting.
- `iUnion_eq_univ_iff.2`: to prove unions cover the space.
- `elim_finite_subcover`: for compactness arguments.
- `closure_eq`, `closure_subset_iff`, `dense_iff_closure_eq`: for density arguments.
- `mono`: monotonicity of closure/density.
- `smul_*` lemmas: e.g., `inv_smul_smul`, `smul_closure_orbit_subset`.

---

#### **4. Proof Logic Pattern**

- **Induction/Case Analysis**: Rarely needed; most proofs are direct applications of definitions and lemmas.
- **Standard Flow**:
  1. Use `IsMinimal.dense_orbit` to get density of orbit.
  2. Apply topological lemmas (e.g., `denseRange_smul`, `dense_iff_closure_eq`).
  3. Use invariance (`hsmul`) to relate sets to orbits.
  4. For group actions, exploit invertibility (`g⁻¹`) to convert preimage covers to image covers.
  5. For compactness: combine finite subcover extraction with open cover by translates.
- **Key Logical Step**:  
  `dense_of_nonempty_smul_invariant` → `eq_empty_or_univ_of_smul_invariant_closed` → `isMinimal_iff_isClosed_smul_invariant`  
  forms a chain of equivalent characterizations of minimality.

---

#### **5. Imports**

- `Mathlib.Topology.Algebra.ConstMulAction`: Provides foundational results about continuous scalar multiplication and related structures.
- `Pointwise`: Used for set-theoretic operations like `smul`, `orbit`, and `range`.

**Scope**: This module lies at the intersection of:
- Topological dynamics (minimal actions),
- Group/monoid actions on topological spaces,
- General topology (density, closure, compactness).

It serves as a foundational layer for further study of minimal sets, ergodic theory, and topological transitivity.

--- 

Let me know if you'd like a dependency graph or a formalization roadmap for extending this file (e.g., defining minimal sets or proving unique ergodicity under minimality + uniqueness of invariant measure).