### Technical Metadata Brief: Inverse Function Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `approximates_deriv_on_nhds` | `HasStrictFDerivAt f f' a → c > 0 → ∃ s ∈ 𝓝 a, ApproximatesLinearOn f f' s c` | Shows that a function with a strict derivative approximates its derivative on some neighborhood. |
| `map_nhds_eq_of_surj` | `[CompleteSpace E] [CompleteSpace F] → HasStrictFDerivAt f f' a → LinearMap.range f' = ⊤ → map f (𝓝 a) = 𝓝 (f a)` | Proves that `f` maps neighborhoods of `a` to neighborhoods of `f a` under surjectivity of the derivative. |
| `approximates_deriv_on_open_nhds` | `HasStrictFDerivAt f f' a → ∃ s ∋ a, IsOpen s ∧ ApproximatesLinearOn f f' s c` (with `c = ‖f'.symm‖⁻¹ / 2`) | Constructs an *open* neighborhood where `f` approximates `f'` with a specific constant. |
| `toPartialHomeomorph` | `HasStrictFDerivAt f f' a → PartialHomeomorph E F` | Repacks `f` with its strict derivative into a `PartialHomeomorph`, with `toFun = f`. |
| `localInverse` | `HasStrictFDerivAt f f' a → F → E` | Defines the local inverse as the inverse of `toPartialHomeomorph`. |
| `to_localInverse` | `HasStrictFDerivAt f f' a → HasStrictFDerivAt (localInverse f f' a) f'.symm (f a)` | Main inverse function theorem: the local inverse has derivative `f'.symm`. |
| `to_local_left_inverse` | `HasStrictFDerivAt f f' a → (∀ᶠ x in 𝓝 a, g (f x) = x) → HasStrictFDerivAt g f'.symm (f a)` | If `g` is a local left inverse of `f`, then `g` has derivative `f'.symm`. |
| `isOpenMap_of_hasStrictFDerivAt_equiv` | `∀ x, HasStrictFDerivAt f (f' x) x → IsOpenMap f` | If `f` has invertible strict derivative everywhere, then `f` is an open map. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `approximates_...`: Relates to `ApproximatesLinearOn`.
  - `to_...`: Constructs objects (e.g., `toPartialHomeomorph`, `to_localInverse`).
  - `localInverse`: Local inverse function.
  - `eventually_...`: Properties holding in a neighborhood (e.g., `eventually_left_inverse`).
- **Suffixes**:
  - `_def`: Definition lemmas (e.g., `localInverse_def`).
  - `_spec`: Projection of choice-based constructions (e.g., ` Classical.choose_spec`).
  - `_of_...`: Implication-based theorems (e.g., `map_nhds_eq_of_equiv`, `isOpenMap_of_hasStrictFDerivAt_equiv`).
- **Variables**:
  - `f`, `f'`, `a`: Standard function, derivative, point.
  - `hf`: Hypothesis `HasStrictFDerivAt f f' a`.
  - `hg`: Hypothesis for left inverse condition.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rcases` / `obtain` | Extracting witnesses from existential quantifiers (e.g., neighborhoods). |
| `simp` / `simp_rw` | Simplifying using definitions (`localInverse_def`, `toPartialHomeomorph_coe`). |
| `rw` | Rewriting using lemmas like `eventually_left_inverse`, `map_nhds_eq_of_equiv`. |
| `exact` / `assumption` | Closing goals with direct hypotheses. |
| `have` / `set` | Introducing intermediate definitions (e.g., `c := f'symm.nnnorm⁻¹ / 2`). |
| `apply` | Applying theorems like `hs.map_nhds_eq`, `hf.to_localInverse.congr_of_eventuallyEq`. |
| `aesop` / `norm_num` | Not heavily used here; mostly manual simplification. |
| `classical` | Used implicitly via `Classical.choose` for choice-based constructions. |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Approximation Step**: Use `approximates_deriv_on_nhds` to get a neighborhood where `f` approximates `f'`.
  2. **Open Neighborhood Refinement**: Extract an *open* neighborhood via `approximates_deriv_on_open_nhds`, choosing a specific constant (`‖f'.symm‖⁻¹ / 2`) to ensure invertibility conditions.
  3. **Construct Partial Homeomorph**: Use `ApproximatesLinearOn.toPartialHomeomorph` to build a local homeomorphism.
  4. **Extract Inverse**: Define `localInverse` as the inverse of this `PartialHomeomorph`.
  5. **Derivative of Inverse**: Apply `hasStrictFDerivAt_symm` to get derivative of inverse.
  6. **Uniqueness & Congruence**: Use `localInverse_unique` and `congr_of_eventuallyEq` to extend results to arbitrary local inverses.

- **Induction/Case Analysis**: Minimal; mostly direct construction and application of lemmas.
- **Key Logical Flow**:
  > `HasStrictFDerivAt` ⇒ `ApproximatesLinearOn` on open set ⇒ `PartialHomeomorph` ⇒ `localInverse` ⇒ derivative of inverse = `f'.symm`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.FDeriv.Equiv` | Provides `PartialHomeomorph` and `HasStrictFDerivAt.symm`-related lemmas. |
| `Mathlib.Analysis.Calculus.InverseFunctionTheorem.ApproximatesLinearOn` | Core infrastructure for `ApproximatesLinearOn`, used to construct `toPartialHomeomorph`. |

**Additional Dependencies (via imports)**:
- `Mathlib.Analysis.NormedSpace.Basic` (via `NormedSpace`, `ContinuousLinearMap`)
- `Mathlib.Topology.Basic`, `Filter`, `Metric` (for neighborhood filters, openness, continuity)
- `Mathlib.Algebra.Module.Basic` (for `E`, `F` as `𝕜`-modules)
- `Mathlib.Topology.Basic` (for `PartialHomeomorph`, `ContinuousAt`, `Tendsto`, etc.)

---

#### **6. Domain-Specific AI Agent Notes**

- **Focus Areas**:
  - Local invertibility from strict differentiability.
  - Construction of `PartialHomeomorph` from analytic conditions.
  - Derivative propagation through inverses and left inverses.
- **Common Proof Patterns**:
  - Use of `eventually` quantifiers to handle local behavior.
  - Choice-based constructions (`Classical.choose`) for open neighborhoods.
  - Norm estimates involving `f'.symm` and its operator norm.
- **Key Lemmas to Recall**:
  - `to_localInverse`: Core inverse function theorem.
  - `eventually_left_inverse`, `eventually_right_inverse`: Local inverse properties.
  - `localInverse_unique`: Uniqueness of local inverse up to eventual equality.

--- 

Let me know if you'd like a diagram of the logical dependencies or a tactic-level proof sketch.