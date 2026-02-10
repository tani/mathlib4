### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Set.innerDualCone` | `Set H → ConvexCone ℝ H` | Defines the *inner dual cone* of a set `s ⊆ H` as `{ y | ∀ x ∈ s, 0 ≤ ⟪x, y⟫ }`. |
| `mem_innerDualCone` | `y ∈ s.innerDualCone ↔ ∀ x ∈ s, 0 ≤ ⟪x, y⟫` | Characterizes membership in the inner dual cone. |
| `innerDualCone_empty` | `∅.innerDualCone = ⊤` | Dual cone of the empty set is the whole space. |
| `innerDualCone_zero` | `(0 : Set H).innerDualCone = ⊤` | Dual cone of `{0}` is the whole space. |
| `innerDualCone_univ` | `(univ : Set H).innerDualCone = 0` | Dual cone of the total space is `{0}`. |
| `innerDualCone_singleton` | `({x}).innerDualCone = (ConvexCone.positive ℝ ℝ).comap (innerₛₗ ℝ x)` | Dual cone of a singleton is the preimage of `[0, ∞)` under the linear functional `y ↦ ⟪x, y⟫`. |
| `innerDualCone_union` | `(s ∪ t).innerDualCone = s.innerDualCone ⊓ t.innerDualCone` | Dual cone distributes over union as intersection. |
| `innerDualCone_iUnion` | `(⋃ i, f i).innerDualCone = ⨅ i, (f i).innerDualCone` | Dual cone commutes with arbitrary unions (via infimum over cones). |
| `isClosed_innerDualCone` | `IsClosed (s.innerDualCone : Set H)` | The inner dual cone is always closed. |
| `ConvexCone.pointed_of_nonempty_of_isClosed` | `(K : ConvexCone ℝ H) → (K.Nonempty) → IsClosed K → K.Pointed` | A nonempty, closed convex cone in a real inner product space contains `0`. |
| `ConvexCone.hyperplane_separation_of_nonempty_of_isClosed_of_nmem` | `b ∉ K ⇒ ∃ y, (∀ x ∈ K, 0 ≤ ⟪x, y⟫) ∧ ⟪y, b⟫ < 0` | Geometric Hahn–Banach separation for closed convex cones (Farkas’ lemma). |
| `ConvexCone.innerDualCone_of_innerDualCone_eq_self` | `((K : Set H).innerDualCone).innerDualCone = K` | Double dual cone recovers the original cone (under nonemptiness and closedness). |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `innerDualCone_`: for lemmas about the inner dual cone.
  - `pointed_`: for properties related to pointedness (containment of `0`).
  - `hyperplane_separation_`: for separation theorems.
- **Suffixes**:
  - `_eq_self`: for double-dual or involution-like results.
  - `_of_...`: for theorems with hypotheses (e.g., `of_nonempty_of_isClosed_of_nmem`).
- **Structure**:
  - `Set.innerDualCone` (function on sets)
  - `ConvexCone.innerDualCone_of_innerDualCone_eq_self` (theorem on convex cones)

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `rwa`: rewriting using definitions and simplifications.
- `exact`, `intro`, `cases`, `contrapose!`: basic proof structure.
- `simp_rw`: for rewriting under binders (e.g., in `innerDualCone_sUnion`).
- `apply`, `have`, `suffices`: for intermediate claims.
- `calc`: for chaining inequalities/equalities (especially in separation proofs).
- `ext`: extensionality for set equality.
- `isClosed_iInter`, `preimage`, `continuousWithinAt`: analysis/topology automation.
- `aesop` is *not* used — proofs are largely manual and calculation-heavy.

---

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *constructive-analytic* pattern:
    - Use geometric properties (e.g., projection onto closed convex sets).
    - Derive inequalities via inner product identities.
    - Use continuity and closedness to pass to limits or closures.
- **Typical flow**:
  1. Introduce a candidate (e.g., `z - b` in separation).
  2. Use variational inequality (e.g., `⟪b - z, w - z⟫ ≤ 0` for all `w ∈ K`).
  3. Simplify inner products using algebraic identities (`real_inner_comm`, `inner_add_right`, etc.).
  4. Conclude via order-theoretic reasoning (`neg_nonneg`, `lt_of_not_le`, etc.).
- **Induction** is not used; proofs rely on:
  - Set-theoretic manipulations (unions, intersections, preimages).
  - Properties of inner products and norms.
  - Topological facts (continuity, closedness, completeness).

---

#### 5. **Imports**

- `Mathlib.Analysis.Convex.Cone.Basic`: foundational theory of convex cones.
- `Mathlib.Analysis.InnerProductSpace.Projection`: projection theorem and related results (used in separation proof).

> **Domain scope**: Real inner product spaces, convex geometry, functional analysis (especially separation theorems and duality of cones).  
> **Key assumptions**: completeness of the space (for projection/separation), closedness and nonemptiness of the cone.

--- 

Let me know if you'd like a diagram of dependencies or a formalization roadmap.