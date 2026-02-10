### Technical Brief: `Fiber.lean` — Scheme-Theoretic Fiber in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Scheme.Hom.fiber` | `f : X ⟶ Y → Y → Scheme` | Constructs the **scheme-theoretic fiber** of `f` at `y` as a pullback: $X \times_Y \operatorname{Spec} \kappa(y)$. |
| `Scheme.Hom.fiberι` | `f.fiber y ⟶ X` | The structural morphism (embedding) of the fiber into `X`. |
| `Scheme.Hom.fiberToSpecResidueField` | `f.fiber y ⟶ Spec (Y.residueField y)` | The structure morphism of the fiber over the residue field $\kappa(y)$. |
| `Scheme.Hom.fiberOverSpecResidueField` | `(f.fiber y).Over (Spec (Y.residueField y))` | Packages the fiber as a $\kappa(y)$-scheme. |
| `Scheme.Hom.fiberHomeo` | `f.fiber y ≃ₜ f ⁻¹' {y}` | Shows the **topological homeomorphism** between the scheme-theoretic fiber and the topological preimage. |
| `Scheme.Hom.asFiber` | `x : X ↦ f.fiber (f x)` | Interprets a point $x \in X$ as a point in the fiber over $f(x)$. |
| `Scheme.Hom.asFiberHom` | `Spec (X.residueField x) ⟶ f.fiber (f x)` | The canonical $\kappa(x)$-point of the fiber over $f(x)$. |
| `Scheme.Hom.finite_preimage` *(not shown in snippet but referenced)* | — | *Finite morphisms have finite fibers.* (Implied by `finite` property preserved under pullback + `fiberHomeo`.) |
| `Scheme.Hom.discrete_fiber` *(not shown in snippet but referenced)* | — | *Finite morphisms have discrete fibers.* (Follows from finite + locally of finite type ⇒ discrete spectrum.) |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `fiber`: Core fiber-related constructions (`fiber`, `fiberι`, `fiberToSpecResidueField`, `fiberHomeo`, `asFiber`, `asFiberHom`).
  - `range_`: Used for set-theoretic image lemmas (`range_fiberι`, `range_asFiberHom`).
- **Suffixes**:
  - `_ι`: Canonical inclusion/embedding morphism (e.g., `fiberι`).
  - `_to_`: Morphism *to* a standard object (e.g., `fiberToSpecResidueField`).
  - `_Hom`: Morphism from a residue field spectrum (e.g., `asFiberHom`).
- **`asFiber` vs `asFiberHom`**:
  - `asFiber`: Point-level (element of fiber).
  - `asFiberHom`: Scheme-level morphism $\operatorname{Spec} \kappa(x) \to \text{fiber}$.

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Role |
|--------|-----------------|------|
| `simp` | Very High | Simplifying definitions (e.g., `range_fiberι`, `asFiberHom_apply`). |
| `aesop` | Medium | Automated reasoning for set-theoretic equalities (`range_asFiberHom`). |
| `congr` | Low | Proving equality of morphisms via component-wise equality (`fiberι_fiberHomeo_symm`). |
| `pullback.lift_*` | High | Reasoning about universal properties of pullbacks (`asFiberHom_fiberι`, `asFiberHom_fiberToSpecResidueField`). |
| `Subsingleton.elim` | Low | Proving equality in `PrimeSpectrum` (a subsingleton type). |
| `isAffine_of_isAffineHom`, `jacobsonSpace`, `QuasiCompact.iff_of_isAffine` | Medium | Applying structural properties (affineness, Jacobson, quasi-compactness) via morphism properties. |

---

#### **4. Proof Logic**

- **Core Strategy**: Leverage **pullback universal property** and **morphism properties stable under base change**.
  - Most lemmas follow from:
    1. Unfolding definitions (`fiber`, `fiberι`, etc.).
    2. Applying pullback properties (`pullback.lift_fst`, `pullback.lift_snd`, `range_fst`).
    3. Using stability of properties (e.g., `isPreimmersion`, `QuasiCompact`, `IsAffineHom`, `LocallyOfFiniteType`) under pullback.
- **Typical Flow**:
  - *Topological part*: Show `range_fiberι = f ⁻¹' {y}` via `Scheme.Pullback.range_fst` and `Scheme.range_fromSpecResidueField`, then use `fiberHomeo` to get homeomorphism.
  - *Scheme-theoretic part*: Use `pullback.lift` to define morphisms from residue fields; verify commutativity via `simp`.
  - *Property propagation*: Use `MorphismProperty.pullback_*` lemmas to inherit properties (e.g., finite type ⇒ fiber has Jacobson space).

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.PullbackCarrier` | Provides `pullback`, `fst`, `snd`, `lift`, and their scheme-theoretic variants. |
| `Mathlib.AlgebraicGeometry.Morphisms.Finite` | Defines finite morphisms and their properties (used in `finite_preimage`, `discrete_fiber`). |
| `Mathlib.RingTheory.Spectrum.Prime.Jacobson` | Supplies `JacobsonSpace` and results like `LocallyOfFiniteType.jacobsonSpace`. |

> **Note**: The module builds on `Scheme.Pullback`, `MorphismProperty`, and `ResidueField` infrastructure from `Mathlib.AlgebraicGeometry`.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Core Concepts)**

```mermaid
graph TD
  A[Scheme.Hom] --> B[fiber f y]
  A --> C[fiberι f y]
  A --> D[fiberToSpecResidueField f y]
  B --> E[pullback f (Y.fromSpecResidueField y)]
  C --> E
  D --> E
  E --> F[PullbackCarrier]
  F --> G[Scheme.Pullback]
  G --> H[MorphismProperty.Stable]
  H --> I[Finite / QuasiCompact / IsAffine]
```

##### **Overview of Fiber Construction**

```mermaid
graph LR
  X[X] -->|f| Y[Y]
  Y -->|y: 1 → Y| Spec κ(y)[Spec (Y.residueField y)]
  X ×_Y Spec κ(y)[fiber f y] -->|fiberι| X
  fiber f y -->|fiberToSpecResidueField| Spec κ(y)
  X ×_Y Spec κ(y) <-->|fiberHomeo| f ⁻¹'{y}
  x:X -->|asFiber| fiber f x
  Spec κ(x) -->|asFiberHom| fiber f x
```

##### **Property Propagation Chain**

```mermaid
graph LR
  f[Finite / QuasiCompact / IsAffine / LocallyOfFiniteType f] 
  -->[pullback stability] fiberToSpecResidueField
  -->[fiber = pullback] fiber f y
  -->[fiberHomeo] f ⁻¹'{y}
  -->[topological consequences] Compact / Discrete / Jacobson
```

---

#### **7. Summary**

This file formalizes the **scheme-theoretic fiber** in algebraic geometry, establishing:
- Its construction as a pullback over the residue field.
- Its topological identification with the classical preimage $f^{-1}(\{y\})$.
- Preservation of key morphism properties (quasi-compactness, affineness, Jacobson, finite type) under base change to fibers.
- Canonical points and morphisms from residue fields of points in $X$.

It serves as foundational infrastructure for deeper results (e.g., dimension theory, flatness criteria, finiteness theorems), especially where scheme-theoretic fibers differ from set-theoretic ones (e.g., non-reduced structures, embedded components).
