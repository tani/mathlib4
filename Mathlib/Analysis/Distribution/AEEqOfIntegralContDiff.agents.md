### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ae_eq_zero_of_integral_smooth_smul_eq_zero` | `{M : Type*} [TopologicalSpace M] [ChartedSpace H M] [SmoothManifoldWithCorners I M] [MeasurableSpace M] [BorelSpace M] [T2Space M] [SigmaCompactSpace M] → LocallyIntegrable f μ → (∀ g, ContMDiff I 𝓘ℝ ⊤ g → HasCompactSupport g → ∫ x, g x • f x ∂μ = 0) → ∀ᵐ x ∂μ, f x = 0` | Shows that if a locally integrable function integrates to zero against all smooth compactly supported functions on a σ-compact finite-dimensional real manifold, then it vanishes a.e. |
| `ae_eq_of_integral_smooth_smul_eq` | Same manifold assumptions as above → LocallyIntegrable f μ → LocallyIntegrable f' μ → (∀ g, ContMDiff I 𝓘ℝ ⊤ g → HasCompactSupport g → ∫ g • f = ∫ g • f') → ∀ᵐ x, f x = f' x | Uniqueness of locally integrable functions up to a.e. equality from equality of integrals against all smooth compactly supported test functions. |
| `IsOpen.ae_eq_zero_of_integral_smooth_smul_eq_zero'` | For open `U ⊆ M`, under σ-compactness of `U`, shows `f = 0` a.e. on `U` under same integral condition but with test functions supported in `U`. | Local version of the main theorem for open subsets. |
| `IsOpen.ae_eq_zero_of_integral_smooth_smul_eq_zero` | Specialization of the above without explicit `hSig` assumption, using `SigmaCompactSpace M`. | Practical corollary for open subsets in σ-compact manifolds. |
| `ae_eq_zero_of_integral_contDiff_smul_eq_zero` | Special case on finite-dimensional real vector space `E`, replacing `ContMDiff` with `ContDiff ℝ ∞`. | Vector-space version of the main theorem (often used in analysis on `ℝⁿ`). |
| `ae_eq_of_integral_contDiff_smul_eq` | Vector-space version of uniqueness result. | Analogous to `ae_eq_of_integral_smooth_smul_eq`, but for `ContDiff`. |
| `IsOpen.ae_eq_zero_of_integral_contDiff_smul_eq_zero` | Vector-space version for open subsets `U ⊆ E`. | Local version for vector spaces. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `ae_eq_`: Indicates conclusion is "almost everywhere equal".
  - `integral_..._smul_eq_zero`: Emphasizes vanishing of integrals against smooth functions multiplied (`•`) with `f`.
  - `smooth_`: Refers to smoothness in the sense of `ContMDiff` (manifold smoothness).
  - `contDiff_`: Refers to `ContDiff ℝ ∞` (global smoothness on vector spaces).
  - `IsOpen.`: Methods specialized to open subsets.

- **Suffixes**:
  - `_zero`: Function vanishes a.e.
  - `_eq`: Two functions are equal a.e.
  - `'` (prime): Variant with extra assumptions (e.g., `ae_eq_zero_of_integral_smooth_smul_eq_zero'` is a more general version with explicit `hSig`).

- **Other patterns**:
  - `tsupport`: Used for *topological support* (vs. `support`, which is set-theoretic).
  - `extend`, `subtype`, `indicator`: Used in reductions to subspaces/open subsets.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `rw`, `simp_rw`, `simp` | Rewriting definitions, simplifying expressions (e.g., `integral_sub`, `smul_sub`, `indicator`). |
| `filter_upwards` | Proving statements hold almost everywhere by filtering along filters. |
| `tendsto_*` (e.g., `tendsto_integral_of_dominated_convergence`) | Applying convergence theorems (dominated convergence is central here). |
| `obtain`, `rcases`, `choose` | Constructing sequences or functions (e.g., mollifiers `gₙ`). |
| `apply`, `exact`, `refine` | Applying lemmas or constructing proof terms. |
| `aesop`, `ring` | Not heavily used here — this is analysis-heavy, not algebraic. |
| `have`, `set`, `let` | Introducing auxiliary constructions (e.g., `bound`, `v n`, `K`). |
| `contrapose!`, `simpa`, `rw [← ...]` | Logical manipulations and simplifications. |

#### 4. **Proof Logic**

- **High-level strategy**:
  1. Reduce to showing `∫ₛ f = 0` for all compact `s` (via `ae_eq_zero_of_forall_setIntegral_isCompact_eq_zero'`).
  2. Approximate the indicator of `s` by a sequence of smooth functions `gₙ`:
     - `gₙ = 1` on `s`, `supp(gₙ) ⊆ thickening_{uₙ}(s)`, `0 ≤ gₙ ≤ 1`.
     - Use smooth Urysohn lemma (`exists_msmooth_support_eq_eq_one_iff`) to construct `gₙ`.
  3. Apply **dominated convergence**:
     - Dominating function: `K.indicator (‖f‖)` for a compact `K ⊇ ⋃ₙ supp(gₙ)`.
     - Pointwise convergence: `gₙ(x) → 1ₛ(x)` a.e.
  4. Since `∫ gₙ f = 0` by assumption, conclude `∫ₛ f = 0`.
  5. Apply known criterion to deduce `f = 0` a.e.

- **Subtleties**:
  - Use of `tsupport` (topological support) vs. `support`.
  - Handling open subsets via restriction and pullback along inclusion map (`integral_subtype_comap`, `setIntegral_eq_integral_of_forall_compl_eq_zero`).
  - Reduction from manifold to vector space via standard smooth structure `𝓘(ℝ, E)`.

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Geometry.Manifold.PartitionOfUnity` | Provides smooth bump functions and partitions of unity (used in constructing `gₙ`). |
| `Mathlib.Geometry.Manifold.Metrizable` | Ensures metrizability of manifolds (needed for metric thickening, Urysohn, etc.). |
| `Mathlib.MeasureTheory.Function.AEEqOfIntegral` | Contains foundational lemmas like `ae_eq_zero_of_forall_setIntegral_isCompact_eq_zero'`, `integral_sub`, `integral_indicator`, etc. |

---

This module formalizes a foundational result in distribution theory: **the injectivity of the embedding of locally integrable functions into distributions**, via integration against smooth compactly supported test functions. It is a key step toward identifying distributions with generalized functions and underpins the Riesz representation perspective in analysis on manifolds.