### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LocallyBoundedVariationOn` | Class/property of functions on sets | Captures functions with *locally bounded variation* on a set `s`. Used as the main hypothesis for differentiability a.e. |
| `ae_differentiableWithinAt_of_mem_real` | `LocallyBoundedVariationOn f s → ∀ᵐ x, x ∈ s → DifferentiableWithinAt ℝ f s x` | Proves a.e. differentiability for real-valued BV functions on a set. Uses decomposition into monotone functions. |
| `ae_differentiableWithinAt_of_mem_pi` | `LocallyBoundedVariationOn f s → ∀ᵐ x, x ∈ s → DifferentiableWithinAt ℝ f s x` | Extends result to finite product spaces (`ι → ℝ`), using pointwise application and `differentiableWithinAt_pi`. |
| `ae_differentiableWithinAt_of_mem` | `LocallyBoundedVariationOn f s → ∀ᵐ x, x ∈ s → DifferentiableWithinAt ℝ f s x` | Main theorem for finite-dimensional target spaces `V`. Uses linear equivalence with `ℝⁿ` via `Basis.ofVectorSpace`. |
| `ae_differentiableWithinAt` | `LocallyBoundedVariationOn f s → MeasurableSet s → ∀ᵐ x ∂volume.restrict s, DifferentiableWithinAt ℝ f s x` | Restates previous result in terms of restriction of volume measure. |
| `ae_differentiableAt` | `LocallyBoundedVariationOn f univ → ∀ᵐ x, DifferentiableAt ℝ f x` | Global version: BV functions on all ℝ are a.e. differentiable. |
| `LipschitzOnWith.ae_differentiableWithinAt_of_mem_real` | `LipschitzOnWith C f s → ∀ᵐ x, x ∈ s → DifferentiableWithinAt ℝ f s x` | Immediate corollary: Lipschitz ⇒ BV ⇒ a.e. differentiable. |
| `LipschitzOnWith.ae_differentiableWithinAt_real` | `LipschitzOnWith C f s → MeasurableSet s → ∀ᵐ x ∂volume.restrict s, DifferentiableWithinAt ℝ f s x` | Measure-theoretic version for Lipschitz functions. |
| `LipschitzWith.ae_differentiableAt_real` | `LipschitzWith C f → ∀ᵐ x, DifferentiableAt ℝ f x` | Global a.e. differentiability for globally Lipschitz functions. |

> **Note**: Several theorems are marked as *superseded* by `ae_differentiableWithinAt_of_mem`, indicating a more general/unified approach.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `ae_`: Indicates *almost everywhere* differentiability statements.
  - `locallyBoundedVariationOn`: Used in hypotheses and lemmas referencing the `LocallyBoundedVariationOn` class.
  - `differentiableWithinAt`, `differentiableAt`: Standard Lean/analysis naming for local differentiability (within a set vs. globally).
- **Suffixes**:
  - `_real`: For results specialized to `ℝ` or `ℝ → ℝ`.
  - `_pi`: For finite product targets (`ι → ℝ`).
  - `_of_mem`: Emphasizes that the conclusion holds *for almost all `x ∈ s`* (i.e., `x ∈ s → ...`).
- **Other patterns**:
  - `comp_locallyBoundedVariationOn`: Composition with a Lipschitz function preserves local BV.
  - `lipschitz.comp_...`: Composition lemmas for Lipschitz functions.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `obtain ⟨p, q, hp, hq, rfl⟩` | Extract monotone decomposition of BV functions (via `exists_monotoneOn_sub_monotoneOn`). |
| `filter_upwards [...] with x hx xs` | Standard pattern for proving `∀ᵐ x, P x → Q x` using measure-theoretic filters. |
| `ae_all_iff.2` | Convert pointwise a.e. statements to joint a.e. over finite index sets. |
| `simp only [...]` | Simplify using definitional equalities (e.g., `symm_comp_self`, `id_comp`). |
| `exact ...` | Final step applying known differentiability results (e.g., `hx xs`). |
| `rw [...] at hx` | Rewrite assumptions using equivalences (e.g., `differentiableWithinAt_univ`). |
| `apply ...` | Apply lemmas (e.g., `hp.ae_differentiableWithinAt_of_mem`). |

> **No heavy automation** like `aesop`, `linarith`, or `ring` — proofs are mostly structural and rely on pre-existing analysis lemmas.

---

#### 4. **Proof Logic**

- **High-level strategy**:
  1. **Decompose** BV functions into difference of monotone functions (`h.exists_monotoneOn_sub_monotoneOn`).
  2. **Use known result**: Monotone functions on ℝ are a.e. differentiable (`MonotoneOn.ae_differentiableWithinAt_of_mem`).
  3. **Lift** to products (`differentiableWithinAt_pi`) and finite-dimensional spaces via linear equivalence (`Basis.ofVectorSpace`).
  4. **Transfer** differentiability back through the equivalence using chain rule (`differentiableWithinAt.comp`).
- **Induction/Recursion**: Not used — relies on structural decomposition and finite-dimensional reduction.
- **Measure-theoretic reasoning**: Central role of `∀ᵐ x`, `ae_restrict_iff'`, and `filter_upwards`.

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Calculus.FDeriv.Add` | Linear algebra of `FDeriv` (additivity, etc.). |
| `Mathlib.Analysis.Calculus.FDeriv.Equiv` | Chain rule and differentiability under linear equivalences. |
| `Mathlib.Analysis.Calculus.FDeriv.Prod` | Differentiability in product spaces (`differentiableWithinAt_pi`). |
| `Mathlib.Analysis.Calculus.Monotone` | Monotone functions are a.e. differentiable. |
| `Mathlib.Topology.EMetricSpace.BoundedVariation` | Definitions and basic properties of bounded variation (e.g., `LocallyBoundedVariationOn`). |

> **Core dependencies**: Measure theory (`MeasureTheory`), topology (`Topology`, `PseudoEMetricSpace`), and calculus (`FDeriv`, `Monotone`).  
> **No `Mathlib.Analysis.Calculus.Rademacher`** — this file *proves* the 1D Rademacher theorem.

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader Rademacher theorem development in Mathlib.