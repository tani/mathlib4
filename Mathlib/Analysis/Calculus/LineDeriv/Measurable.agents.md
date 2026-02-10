### Technical Brief: Measurability of the Line Derivative in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LineDifferentiableAt 𝕜 f x v` | Predicate | States that `f` is differentiable along the line `t ↦ f(x + t • v)` at `t = 0`. |
| `lineDeriv 𝕜 f x v` | `F` | The derivative of `f` at `x` in direction `v`, i.e., `d/dt|_{t=0} f(x + t • v)`. |
| `measurableSet_lineDifferentiableAt` | `Continuous f → MeasurableSet {x | LineDifferentiableAt 𝕜 f x v}` | Shows the set of points where `f` is line-differentiable in direction `v` is measurable. |
| `measurable_lineDeriv` | `Continuous f → Measurable (x ↦ lineDeriv 𝕜 f x v)` | Proves the line derivative (fixed direction `v`) is a measurable function. |
| `stronglyMeasurable_lineDeriv` | `Continuous f → StronglyMeasurable (x ↦ lineDeriv 𝕜 f x v)` | Under `SecondCountableTopologyEither`, the line derivative is strongly measurable. |
| `aemeasurable_lineDeriv` | `Continuous f → AEMeasurable (x ↦ lineDeriv 𝕜 f x v) μ` | Line derivative is almost everywhere measurable w.r.t. any measure `μ`. |
| `aestrengthenlyMeasurable_lineDeriv` | `Continuous f → AEStronglyMeasurable (x ↦ lineDeriv 𝕜 f x v) μ` | Almost everywhere strongly measurable version. |
| `measurableSet_lineDifferentiableAt_uncurry` | `Continuous f → MeasurableSet {(x, v) | LineDifferentiableAt 𝕜 f x v}` | Extends measurability to the *uncurried* case (both `x` and `v` vary). Requires `SecondCountableTopology E`. |
| `measurable_lineDeriv_uncurry` | `Continuous f → Measurable ((x, v) ↦ lineDeriv 𝕜 f x v)` | Measurability of the full line derivative map `(x, v) ↦ lineDeriv 𝕜 f x v`. |
| `stronglyMeasurable_lineDeriv_uncurry` | `Continuous f → StronglyMeasurable ((x, v) ↦ lineDeriv 𝕜 f x v)` | Strong measurability in the uncurried setting. |
| `aemeasurable_lineDeriv_uncurry`, `aestrengthenlyMeasurable_lineDeriv_uncurry` | Analogous AE versions for the uncurried map. | |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `measurableSet_`: asserts a set is measurable.
  - `measurable_`, `stronglyMeasurable_`, `aemeasurable_`, `aestrengthenlyMeasurable_`: assert various notions of measurability for functions.
  - `_uncurry`: indicates the theorem applies to the *uncurried* version `(x, v) ↦ …`, i.e., both arguments vary.
- **Suffixes**:
  - `_at`: often used in `LineDifferentiableAt` to denote pointwise differentiability along a line.
  - `_with_param`: used in lemmas like `measurableSet_of_differentiableAt_with_param`, indicating parameter-dependent differentiability.

---

#### **3. Tactic Stack**

The proofs rely heavily on:
- `borelize`: converts target spaces to Borel spaces (e.g., `𝕜`, `F`) to enable measurability arguments.
- `fun_prop`: propagates continuity assumptions (e.g., for `g.uncurry`).
- `measurable_prod_mk_right`: used to lift measurability through product structures (e.g., `x ↦ (x, v)`).
- `comp`, `comp_measurable`: composition of measurable/strongly measurable functions.
- `aemeasurable`, `aestronglyMeasurable`: conversion lemmas from (strong) measurability to almost-everywhere versions.

No heavy automation (e.g., `aesop`, `ring`, `simp`) appears—proofs are mostly structural, leveraging existing lemmas from `Mathlib.Analysis.Calculus.*`.

---

#### **4. Proof Logic**

- **Core idea**: Reduce the problem to measurability of the derivative of a parameter-dependent function.
  - Define `g(x, t) = f(x + t • v)` (or `g(p, t) = f(p.1 + t • p.2)` in uncurried case).
  - Use continuity of `f` to get continuity of `g.uncurry`.
  - Apply known lemmas:
    - `measurableSet_of_differentiableAt_with_param`
    - `measurable_deriv_with_param`
    - `stronglyMeasurable_deriv_with_param`
  - Compose with measurable maps like `x ↦ (x, v)` (via `measurable_prod_mk_right`).
- **Induction or case analysis**: Not used—proofs are direct applications of lemmas about parameter-dependent differentiability and measurability.
- **Key assumptions**:
  - `Continuous f`: essential (as noted in comment).
  - `SecondCountableTopology E`: needed for uncurried versions to ensure `E × E` is standard Borel.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.Calculus.LineDeriv.Basic`: defines `lineDeriv`, `LineDifferentiableAt`.
  - `Mathlib.Analysis.Calculus.FDeriv.Measurable`: provides lemmas like `measurable_deriv_with_param`, `stronglyMeasurable_deriv_with_param`.
- **Domain scope**:
  - Functional analysis over normed spaces over a nontrivially normed field `𝕜` (e.g., `ℝ`, `ℂ`).
  - Measurability theory in general measurable spaces with Borel structure.
  - Emphasis on *line* (1D) differentiability, not full Fréchet differentiability.

---

#### **Summary**

This file formalizes foundational measurability results for the *line derivative*—a directional derivative along lines in normed spaces. It shows that under continuity of `f`, both the pointwise differentiability set and the derivative function are measurable (and even strongly measurable under mild topological assumptions). The uncurried version requires second countability to control the product σ-algebra. The proofs are clean and modular, leveraging parameter-dependent calculus lemmas from Mathlib.