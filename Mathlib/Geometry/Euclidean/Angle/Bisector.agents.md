**Technical Brief: `Bisector.lean` — Angle Bisectors in Euclidean Geometry**

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `dist_orthogonalProjection_eq_iff_angle_eq_aux₁` | `lemma` | Handles degenerate case where `p ∈ s₁` (and `p' ∈ s₁ ∩ s₂`) to relate equal distances to equal *unoriented* angles. |
| `dist_orthogonalProjection_eq_iff_angle_eq_aux` | `lemma` | Extends `aux₁` to the case `p ∈ s₁ ∨ p ∈ s₂`. |
| `dist_orthogonalProjection_eq_iff_angle_eq` | `lemma` | Main equivalence: for any `p`, `p' ∈ s₁ ∩ s₂`,<br>$$\operatorname{dist}(p, \pi_{s_1}(p)) = \operatorname{dist}(p, \pi_{s_2}(p)) \iff \angle p p' \pi_{s_1}(p) = \angle p p' \pi_{s_2}(p)$$ |
| `dist_orthogonalProjection_eq_of_oangle_eq` | `lemma` | In 2D oriented setting: equal *oriented* angles ⇒ equal distances (requires projections ≠ `p'`). |
| `oangle_eq_of_dist_orthogonalProjection_eq` | `lemma` | Converse: equal distances ⇒ equal oriented angles (requires projections ≠ each other). |
| `dist_orthogonalProjection_eq_iff_oangle_eq` | `lemma` | Full equivalence in 2D oriented case under non-degeneracy assumptions (projections distinct and ≠ `p'`). |

Notation:  
- $\pi_s(p)$ = `orthogonalProjection s p`  
- $\angle abc$ = unoriented angle at `b` between `a` and `c`  
- $\angle\!\!\!\angle abc$ = oriented angle (`oangle`)  
- `s₁ ⊓ s₂` = intersection of affine subspaces  

---

### **2. Naming Conventions**

- **Prefixes**:
  - `dist_orthogonalProjection_...`: Relates distance to orthogonal projection.
  - `oangle_...`: Oriented-angle-specific lemmas.
  - `angle_...`: Unoriented-angle lemmas (e.g., `angle_eq_arcsin_of_angle_eq_pi_div_two`).
- **Suffixes**:
  - `_aux`, `_aux₁`: Internal auxiliary lemmas.
  - `_eq_iff_...`: Equivalence statements.
  - `_of_...`: One-direction implication (e.g., `eq_of_dist_...`).
- **Variable naming**:
  - `p`, `p'`: Points (often `p' ∈ s₁ ∩ s₂`)
  - `s₁`, `s₂`: Affine subspaces (typically lines in applications)
  - `hp'`: Hypothesis `p' ∈ s₁ ∩ s₂`

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities/definitions (e.g., `orthogonalProjection_eq_self_iff`, `dist_comm`) |
| `simp` / `simp only` | Simplifying goals using known lemmas (e.g., `dist_self`, `orthogonalProjection_eq_self_iff`) |
| `by_cases` | Splitting on decidables (e.g., `p = p'`, `p ∈ s₁ ∨ p ∈ s₂`) |
| `subst` | Substituting equalities after `by_cases` |
| `by_contra` / `contradiction` | Proving by contradiction (e.g., to eliminate degenerate cases) |
| `exact` / `intro` | Direct proof steps |
| `grind` | Custom tactic (likely from Mathlib’s `tactic.grind`) for solving trivial equalities in affine/Euclidean settings |
| `rwa` | `rw` + `assumption` (used after `have` or `intro`) |
| `norm_num`, ` positivity` | Arithmetic normalization and positivity checks (e.g., for `dist_pos`) |
| `rcases` / `cases` | Decomposing disjunctions/conjunctions (e.g., `h' : p ∈ s₁ ∨ p ∈ s₂`) |
| `have`, `haveI` | Introducing intermediate facts, often with typeclass instances |

---

### **4. Proof Logic**

**General proof strategy**:

1. **Nonemptiness setup**: From `p' ∈ s₁ ∩ s₂`, infer `Nonempty s₁`, `Nonempty s₂` via `haveI`.
2. **Case split on degeneracy**:
   - If `p ∈ s₁ ∨ p ∈ s₂`, use `dist_orthogonalProjection_eq_iff_angle_eq_aux`.
   - Else (`p ∉ s₁ ∧ p ∉ s₂`), reduce to arcsin-based angle formulas.
3. **Arcsin reduction** (non-degenerate case):
   - Use `angle_eq_arcsin_of_angle_eq_pi_div_two` to rewrite angles as `arcsin(dist / dist(p, p'))`.
   - Apply injectivity of `arcsin` on `[-1, 1]` to reduce angle equality to distance equality.
   - Use `dist_orthogonalProjection_eq_infDist` to relate to infimum distance.
4. **Oriented case (2D)**:
   - Use `angle_eq_iff_oangle_eq_or_wbtw` to relate unoriented and oriented angles.
   - Prove non-collinearity (`¬ Collinear ...`) to eliminate the `wbtw` (between) case.
   - Use geometric properties of projections and intersections to derive contradictions if collinearity holds.

**Inductive/structural pattern**:
- Most proofs are *case analysis* + *algebraic manipulation* + *geometric reasoning*.
- No explicit induction; relies on Euclidean geometry lemmas (e.g., Pythagorean theorem in `dist_sq_eq_dist_orthogonalProjection_sq_add_...`).

---

### **5. Imports & Dependencies**

**Primary imports** (define scope and tools):

```lean
Mathlib.Geometry.Euclidean.Angle.Oriented.Affine
Mathlib.Geometry.Euclidean.Angle.Unoriented.Projection
Mathlib.Geometry.Euclidean.Angle.Unoriented.RightAngle
Mathlib.Geometry.Euclidean.Projection
```

**Key underlying theories**:
- Euclidean geometry over `ℝ`-vector spaces (`InnerProductSpace ℝ V`)
- Affine spaces (`MetricSpace P`, `NormedAddTorsor V P`)
- Orthogonal projections (`HasOrthogonalProjection`)
- Angle theory (both unoriented `∠` and oriented `∡`)
- Affine subspaces (`AffineSubspace ℝ P`)
- Finite-dimensional structure (`finrank ℝ V = 2`, `Oriented ℝ V (Fin 2)`)

---

### **6. Mermaid Diagrams**

#### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[Bisector.lean] --> B[Mathlib.Geometry.Euclidean.Angle.Oriented.Affine]
  A --> C[Mathlib.Geometry.Euclidean.Angle.Unoriented.Projection]
  A --> D[Mathlib.Geometry.Euclidean.Angle.Unoriented.RightAngle]
  A --> E[Mathlib.Geometry.Euclidean.Projection]

  B --> F[Angle Theory (Oriented)]
  C --> G[Angle Theory (Unoriented)]
  D --> G
  E --> H[Orthogonal Projection Theory]
  G --> H
  F --> I[2D Oriented Geometry]
  H --> I
```

#### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Setup
    V[Type V: NormedAddCommGroup]
    P[Type P: MetricSpace]
    T[NormedAddTorsor V P]
  end

  subgraph Main Equivalence (Unoriented)
    L1[dist_orthogonalProjection_eq_iff_angle_eq_aux₁]
    L2[dist_orthogonalProjection_eq_iff_angle_eq_aux]
    L3[dist_orthogonalProjection_eq_iff_angle_eq]
    L1 --> L2 --> L3
  end

  subgraph Oriented Case (2D)
    O1[dist_orthogonalProjection_eq_of_oangle_eq]
    O2[oangle_eq_of_dist_orthogonalProjection_eq]
    O3[dist_orthogonalProjection_eq_iff_oangle_eq]
    O1 --> O3
    O2 --> O3
  end

  L3 --> O3
```

---

### **7. Summary**

This file formalizes the geometric fact that **a point is equidistant to two affine subspaces iff the angles (unoriented or oriented) from a common intersection point to its projections are equal**. It carefully handles degenerate cases (e.g., when the point lies on one subspace) and leverages 2D orientation to obtain a *biconditional* with oriented angles. The proofs combine case analysis, algebraic simplification, and geometric reasoning about projections and angles, using Lean’s Euclidean geometry library extensively.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.dot`), or a summary of how this fits into the broader bisector theory (e.g., relation to `bisector`, `angle_bisector`, etc.).
