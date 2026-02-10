### Technical Brief: `ProductMeasure.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isProjectiveMeasureFamily_pi` | `IsProjectiveMeasureFamily (fun I ↦ Measure.pi (μ ∘ subtypeVal I))` | Shows finite product measures form a projective system. |
| `piContent` | `AddContent ℝ≥0∞ (measurableCylinders X)` | Additive content on measurable cylinders defined via projective family. |
| `piContent_cylinder` | `piContent μ (cylinder I S) = Measure.pi (μ ∘ subtypeVal I) S` | Evaluates `piContent` on cylinders. |
| `piContent_eq_measure_pi` | `[Fintype ι] ⇒ piContent μ s = Measure.pi μ s` | For finite index types, `piContent` coincides with finite product measure. |
| `infinitePiNat` | `Measure (Π n, X n)` | Product measure over `ℕ`, constructed via Ionescu-Tulcea kernel `traj`. |
| `isProjectiveLimit_infinitePiNat` | `IsProjectiveLimit (infinitePiNat μ) (fun I ↦ Measure.pi (μ ∘ subtypeVal I))` | `infinitePiNat` is the projective limit of finite products. |
| `piContent_tendsto_zero` | `Antitone A → ⋂ n, A n = ∅ ⇒ piContent μ (A n) → 0` | Key lemma for σ-subadditivity and Carathéodory extension. |
| `infinitePi` | `Measure (Π i, X i)` | Infinite product measure defined via Carathéodory extension of `piContent`. |
| `isProjectiveLimit_infinitePi` | `IsProjectiveLimit (infinitePi μ) (fun I ↦ Measure.pi (μ ∘ subtypeVal I))` | `infinitePi` is the projective limit of finite products. |
| `eq_infinitePi` | `(∀ s t, ν (pi s t) = ∏ i ∈ s, μ i (t i)) ⇒ ν = infinitePi μ` | Uniqueness: any measure agreeing on measurable rectangles is the product measure. |
| `infinitePi_pi` | `infinitePi μ (pi s t) = ∏ i ∈ s, μ i (t i)` | Product measure of a measurable rectangle equals product of measures. |
| `infinitePi_cylinder` | `infinitePi μ (cylinder s S) = Measure.pi (μ ∘ subtypeVal s) S` | Cylinder sets have measure given by finite product. |
| `infinitePi_map_piCongrLeft` | `(infinitePi (μ ∘ e)).map (piCongrLeft X e) = infinitePi μ` | Invariance under reindexing equivalence. |
| `infinitePi_map_restrict'` | `(infinitePi μ).map I.restrict = infinitePi (μ ∘ subtypeVal I)` | Restriction to subset `I` yields product over `I`. |
| `infinitePi_pi_of_countable` | `Countable s ⇒ infinitePi μ (pi s t) = ∏' i ∈ s, μ i (t i)` | Extends `infinitePi_pi` to countable products. |
| `infinitePi_singleton` | `[Countable ι] ⇒ infinitePi μ {f} = ∏' i, μ i {f i}` | Point masses have product measure equal to product of point masses. |
| `infinitePi_dirac` | `infinitePi (fun i ↦ dirac (f i)) = dirac f` | Product of Dirac measures is Dirac at the product point. |
| `measurePreserving_eval_infinitePi` | `MeasurePreserving (eval i) (infinitePi μ) (μ i)` | Evaluation maps are measure-preserving. |
| `infinitePi_map_eval` | `(infinitePi μ).map (fun x ↦ x i) = μ i` | Pushforward along coordinate projection gives marginal. |
| `infinitePi_map_pi` | `(infinitePi μ).map (fun x i ↦ f i (x i)) = infinitePi (fun i ↦ (μ i).map (f i))` | Product measure commutes with measurable coordinatewise maps. |
| `infinitePi_map_piCurry` / `infinitePi_map_curry` | Currying isomorphism for double products | Fubini-type theorem for iterated vs joint product. |
| `integral_restrict_infinitePi` | Equality of integrals w.r.t. restricted vs full product measure | Integration over cylinder sets reduces to finite product. |
| `integral_infinitePi_of_piFinset` | Integral depends only on finitely many coordinates | Generalized Fubini / disintegration. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `piContent_`: properties of the additive content on cylinders.
  - `infinitePi_`: properties of the full infinite product measure.
  - `infinitePiNat_`: properties of the auxiliary `ℕ`-indexed product.
  - `measurePreserving_`: measure-preserving maps.
  - `integral_`, `lintegral_`: integration lemmas.

- **Suffixes:**
  - `_cylinder`: behavior on cylinder sets.
  - `_pi`: behavior on Cartesian products (`pi s t`).
  - `_map`: pushforward behavior.
  - `_restrict`: restriction to finite subsets.
  - `_of_piFinset`: dependence on finitely many coordinates.

- **Other:**
  - `eq_`: uniqueness statements.
  - `tendsto_zero`: convergence to zero (used in Carathéodory extension).
  - `curry` / `piCurry`: structural isomorphisms for product types.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Purpose |
|--------|---------|
| `rw` / `simp_rw` | Rewriting definitions, especially using `piContent_cylinder`, `infinitePi_map_restrict`, etc. |
| `congr` / `congr'` | Proving equality of functions/sets by extensionality. |
| `ext` / `ext1` | Extensionality for measures/functions/sets. |
| `fun_prop` | Proving measurability (e.g., of maps, preimages, products). |
| `measurability` | Automatic measurability proofs (e.g., `MeasurableSet.pi`, `Measurable.updateFinset`). |
| `simp` / `simp_all` | Simplifying using `piContent_cylinder`, `infinitePi_pi`, etc. |
| `convert` | Matching up goals modulo definitional equalities. |
| `nth_rw` | Rewriting at a specific position. |
| `induction` / `Nat.le_induction` | Induction on natural numbers or finite sets. |
| `have` / `obtain` | Introducing intermediate lemmas or constructions (e.g., `u`, `t n`, `B n`). |
| `conv` | Convolution-style rewriting (e.g., `conv in 1; ext n`). |
| `grind` / `grind'` | Goal-driven simplification (custom tactic in Mathlib). |
| `aesop` | Not used heavily here — proofs are mostly manual and measure-theoretic. |
| `ring` / `linarith` | Used sparingly (e.g., for inequalities in `piContent_tendsto_zero`). |

---

#### **4. Proof Logic**

The logical flow follows a standard measure-theoretic construction:

1. **Finite Products → Projective System**  
   Show finite product measures form a projective family (`isProjectiveMeasureFamily_pi`), enabling definition of `piContent`.

2. **Additive Content on Cylinders**  
   Define `piContent` as `projectiveFamilyContent`, and verify its behavior on cylinders (`piContent_cylinder`).

3. **Countable Case via `infinitePiNat`**  
   Construct `infinitePiNat` using Ionescu-Tulcea (`traj`), and prove it agrees with `piContent` on cylinders (`piContent_eq_infinitePiNat`).

4. **Key Lemma: `piContent_tendsto_zero`**  
   Reduce to countable case (via `u = ⋃ s n`) and apply known σ-additivity for countable products. This yields σ-subadditivity.

5. **Carathéodory Extension**  
   Use `isSigmaSubadditive_piContent` to extend `piContent` to a measure on the σ-algebra generated by cylinders (`infinitePi`).

6. **Uniqueness & Characterization**  
   Prove `infinitePi` is the unique measure satisfying the rectangle formula (`eq_infinitePi`), and derive its behavior on rectangles, cylinders, and countable products.

7. **Structural Properties**  
   Prove invariance under reindexing, Fubini-type theorems (`curry`), evaluation maps are measure-preserving, etc.

8. **Integration Theory**  
   Extend to integrals: show integrals depend only on finitely many coordinates (`integral_infinitePi_of_piFinset`), and relate restricted integrals to full ones.

---

#### **5. Imports & Dependencies**

**Primary Imports:**
```lean
Mathlib.Probability.Kernel.Composition.MeasureComp
Mathlib.Probability.Kernel.IonescuTulcea.Traj
```

**Key Dependencies:**
- `Mathlib.MeasureTheory.Measure.Pi` (finite product measures)
- `Mathlib.MeasureTheory.Measure.Caratheodory` (extension theorems)
- `Mathlib.MeasureTheory.Function.AEMeasurable`
- `Mathlib.MeasureTheory.Integral.Integral`
- `Mathlib.MeasureTheory.Measure.SpaceFilling` (for `piContent_eq_measure_pi`)
- `Mathlib.Data.Set.Cylinder` (cylinder sets)
- `Mathlib.Data.Finset.Icc`, `Ioc`, `Iic` (interval finite sets)
- `Mathlib.Data.ENNReal.Basic` (extended nonnegative reals)
- `Mathlib.Probability.Kernel.Basic` (kernels, composition, `traj`)

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Finite Product Measures] --> B[Projective System]
  B --> C[piContent on Cylinders]
  C --> D[piContent_tendsto_zero]
  D --> E[σ-Subadditivity]
  E --> F[Carathéodory Extension]
  F --> G[infinitePi]

  H[Ionescu-Tulcea traj] --> I[infinitePiNat]
  I --> J[piContent_eq_infinitePiNat]
  J --> D

  G --> K[Uniqueness (eq_infinitePi)]
  G --> L[Structural Properties (map, restrict, curry)]
  G --> M[Integration Theory]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Preliminaries
    A[Finite Products → Projective System]
    B[piContent Definition]
    C[piContent_cylinder]
    D[piContent_eq_measure_pi]
  end

  subgraph Nat
    E[infinitePiNat via traj]
    F[pi_prod_map_IocProdIoc / IicProdIoc]
    G[partialTraj_const]
    H[isProjectiveLimit_infinitePiNat]
    I[piContent_eq_infinitePiNat]
  end

  subgraph InfinitePi
    J[piContent_tendsto_zero]
    K[isSigmaSubadditive_piContent]
    L[infinitePi Definition]
    M[isProjectiveLimit_infinitePi]
    N[eq_infinitePi]
    O[infinitePi_pi / infinitePi_cylinder]
    P[infinitePi_map_*]
    Q[infinitePi_pi_of_countable]
    R[integral_infinitePi_*]
  end

  Preliminaries --> Nat
  Nat --> InfinitePi
```

---

#### **7. Summary**

This file formalizes the construction and core properties of infinite product measures in Lean 4. It proceeds from finite products to a projective system, defines an additive content on cylinders, proves a key convergence lemma (`piContent_tendsto_zero`) to enable Carathéodory extension, and then establishes uniqueness, structural invariance, and integration theory for the resulting measure. The auxiliary `infinitePiNat` handles the countable case via the Ionescu-Tulcea theorem, and the general case is built via extension and reindexing arguments. The formalization is highly modular, with clear separation between measure-theoretic and structural (e.g., currying, reindexing) properties.
