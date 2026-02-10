### Technical Brief: `Poincare.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `curveIntegral_add_curveIntegral_eq_of_hasFDerivWithinAt_off_countable_real` | `theorem` | Equality of curve integrals along homotopic paths for closed 1-forms, assuming differentiability off a countable set. Core technical lemma for homotopy invariance. |
| `curveIntegral_add_curveIntegral_eq_of_hasFDerivWithinAt_off_countable` | `theorem` | Same as above, but for general `𝕜 ∈ {ℝ, ℂ}` via scalar restriction. |
| `curveIntegral_add_curveIntegral_eq_of_hasFDerivWithinAt` | `theorem` | Homotopy invariance of integrals of closed 1-forms under `C²` homotopy, no exceptional set. |
| `curveIntegral_add_curveIntegral_eq_of_diffContOnCl` | `theorem` | Homotopy invariance under `DiffContOnCl` regularity (i.e., continuously differentiable up to closure). |
| `curveIntegral_segment_add_eq_of_hasFDerivWithinAt_symmetric` | `theorem` | Additivity of integrals over concatenated segments in convex sets, key for constructing primitives. |
| `hasFDerivWithinAt_curveIntegral_segment_of_hasFDerivWithinAt_symmetric` | `theorem` | Shows that $F(b) = \int_{[a,b]} \omega$ has derivative $\omega(b)$ in convex domains. |
| `exists_forall_hasFDerivWithinAt_of_hasFDerivWithinAt_symmetric` | `theorem` | **Poincaré Lemma (convex case)**: Closed 1-forms on convex sets are exact (admit primitives). |
| `exists_forall_hasFDerivWithinAt_of_fderivWithin_symmetric` | `theorem` | Variant using `fderivWithin` (Fréchet derivative within set). |
| `exists_forall_hasFDerivAt_of_fderiv_symmetric` | `theorem` | Stronger version for open convex sets: primitive has *full* Fréchet derivative equal to $\omega$. |
| `exists_forall_hasDerivWithinAt` | `theorem` | Scalar-valued version: differentiable functions on convex sets admit primitives. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `curveIntegral_...`: All theorems about curve integrals of 1-forms.
  - `hasFDerivWithinAt_...`: Theorems about existence of derivatives within a set.
  - `exists_forall_hasFDerivWithinAt_...`: Existence of primitives under symmetry assumptions.
- **Suffixes**:
  - `_of_hasFDerivWithinAt_symmetric`: Assumes symmetry of $d\omega$ (i.e., closedness).
  - `_of_fderivWithin_symmetric`: Uses `fderivWithin` instead of `HasFDerivWithinAt`.
  - `_of_fderiv_symmetric`: Full Fréchet derivative symmetry (open domain).
  - `_off_countable`: Handles exceptional countable sets (measure-zero-like).
- **Other**:
  - `segment`: Refers to linear path `Path.segment`.
  - `extend`, `extendAt`: Refers to extension of homotopy from `I × I` to `ℝ × ℝ`.

---

#### **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `simp` / `simp only` | Very High | Simplify definitions (e.g., `curveIntegral`, `Path.extend`, `η`, `f`, `g`). |
| `rw` | High | Rewrite using equalities (e.g., `hfi`, `hψφ`, `hU`, `hclosure`). |
| `have`, `suffices`, `convert` | High | Introduce intermediate claims and reduce goals. |
| `exact`, `apply`, `refine` | High | Apply known theorems (e.g., `hasFDerivWithinAt`, `differentiableOn`). |
| `fun_prop` | Medium | Propagate continuity/differentiability facts. |
| `linear_combination` | Medium | Combine integrals with coefficients (e.g., to show boundary integral = 0). |
| `grw` | Medium | Rewrite using `gcongr`-style lemmas (e.g., `mem_range_self`). |
| `filter_upwards`, `ae_restrict_mem` | Medium | Handle almost-everywhere statements (e.g., divergence = 0 a.e.). |
| `aesop` | Low | Not used here — this file is highly structured and manual. |
| `ring` / `abel` | Low | Used only in `linear_combination` for algebraic simplification. |

---

#### **4. Proof Logic**

The proofs follow a **geometric-analytic strategy**:

1. **Pullback to the unit square**:
   - Homotopy $\varphi : I \times I \to E$ pulls back the 1-form $\omega$ to a 1-form $\eta$ on $I \times I$.
   - Define $\eta = \omega \circ \psi \circ d\psi$, where $\psi$ is an extension of $\varphi$ to $\mathbb{R}^2$.

2. **Show $\eta$ is closed**:
   - Compute derivative $d\eta$ and prove symmetry using:
     - Symmetry of $d\omega$ (closedness of $\omega$),
     - Symmetry of second derivative $d^2\psi$ (from $C^2$ regularity),
     - Chain rule for bilinear compositions.

3. **Apply divergence theorem**:
   - Show $\operatorname{div}(f, g) = 0$ a.e., where $f = \eta(\cdot, (0,1))$, $g = -\eta(\cdot, (1,0))$.
   - Use `integral_divergence_prod_Icc_of_hasFDerivAt_off_countable` to conclude boundary integral = 0.

4. **Translate back to paths**:
   - Boundary integrals correspond to integrals over $\gamma_1$, $\gamma_2$, and constant paths $\varphi(0,\cdot)$, $\varphi(1,\cdot)$.

5. **For convex sets**:
   - Use affine homotopy between segments: $\varphi(s,t) = (1-t)\cdot \text{segment}(a,b) + t\cdot \text{segment}(a,c)$.
   - Apply homotopy invariance to get additivity over segments.
   - Define primitive $F(b) = \int_{[a,b]} \omega$, show $dF = \omega$ via differentiation under the integral sign.

6. **Generalization**:
   - Replace `HasFDerivWithinAt` with `fderivWithin` or `fderiv` using regularity assumptions (`DifferentiableOn`, `DiffContOnCl`).
   - Use `CompleteSpace` for scalar-valued case to lift to `NormedSpace ℝ`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Calculus.Deriv.Prod` | Product rule for derivatives. |
| `Mathlib.Analysis.Calculus.DiffContOnCl` | Regularity (`DiffContOnCl`) and its consequences. |
| `Mathlib.Analysis.Calculus.FDeriv.Symmetric` | Symmetry of second derivatives (`isSymmSndFDerivWithinAt`). |
| `Mathlib.Analysis.Calculus.TangentCone.Prod` | Tangent cones in product spaces. |
| `Mathlib.MeasureTheory.Integral.CurveIntegral.Basic` | Definition and basic properties of curve integrals. |
| `Mathlib.MeasureTheory.Integral.DivergenceTheorem` | Divergence theorem for rectangles (key for homotopy invariance). |
| `Mathlib.Topology.Homotopy.Affine` | Affine homotopies and path extensions. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Path & Homotopy Theory] --> B[Curve Integrals]
  C[Tangent Cones & FDeriv] --> D[Symmetry of dω]
  D --> E[Closed 1-forms]
  B --> F[Homotopy Invariance]
  E --> F
  F --> G[Additivity over Segments]
  G --> H[Existence of Primitive]
  H --> I[Poincaré Lemma (Convex)]
  C --> J[Divergence Theorem]
  J --> F
```

##### **File Overview**

```mermaid
flowchart LR
  subgraph "Homotopy Invariance"
    T1[Off-countable real]
    T2[Off-countable complex]
    T3[No exceptional set]
    T4[DiffContOnCl]
    T1 --> T2
    T1 --> T3
    T3 --> T4
  end

  subgraph "Convex Case"
    T5[Segment additivity]
    T6[Primitive exists (FDerivWithin)]
    T7[Primitive exists (fderivWithin)]
    T8[Primitive exists (fderiv)]
    T5 --> T6
    T6 --> T7
    T7 --> T8
  end

  T5 -->|Affine homotopy| T1
  T6 -->|Define F(b) = ∫_[a,b] ω| T5
```

---

#### **7. Summary**

This file formalizes the **Poincaré lemma for 1-forms on convex sets** in Lean 4, using:
- **Geometric insight**: Pullback to the unit square and apply divergence theorem.
- **Analytic control**: Careful handling of differentiability, tangent cones, and symmetry.
- **Modular design**: Multiple variants for different regularity assumptions (`HasFDerivWithinAt`, `fderivWithin`, `fderiv`, `DiffContOnCl`).

It serves as a foundational step toward the full Poincaré lemma for simply connected domains, via homotopy invariance of integrals.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.lean` file dependencies), or a proof sketch in natural language for a specific theorem.
