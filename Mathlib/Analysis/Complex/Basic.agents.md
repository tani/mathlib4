### Technical Metadata Brief: `Mathlib.Analysis.NormedSpace.Complex`

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `norm_eq_abs` | `∀ z : ℂ, ‖z‖ = abs z` | Identifies the norm on `ℂ` with the complex absolute value. |
| `instNormedAddCommGroup` | `NormedAddCommGroup ℂ` | Registers `ℂ` as a normed additive commutative group via `abs`. |
| `instNormedField` | `NormedField ℂ` | Registers `ℂ` as a normed field (uses multiplicativity of `abs`). |
| `equivRealProdCLM` | `ℂ ≃L[ℝ] ℝ × ℝ` | Continuous linear equivalence between `ℂ` and `ℝ²`, fundamental for identifying `ℂ` with `ℝ²` as a real Banach space. |
| `reCLM`, `imCLM` | `ℂ →L[ℝ] ℝ` | Real and imaginary part as continuous linear maps. |
| `ofRealCLM`, `ofRealLI` | `ℝ →L[ℝ] ℂ`, `ℝ →ₗᵢ[ℝ] ℂ` | Canonical embedding of `ℝ` into `ℂ` as a continuous linear map / linear isometry. |
| `conjCLE`, `conjLIE` | `ℂ ≃L[ℝ] ℂ`, `ℂ ≃ₗᵢ[ℝ] ℂ` | Complex conjugation as a continuous linear equivalence / linear isometry equivalence. |
| `RCLike ℂ` instance | `RCLike ℂ` | Registers `ℂ` as an `RCLike` field (a structure abstracting `ℝ`-like behavior of `ℂ`, e.g., real/imag parts, conjugation, norm-sq = re² + im²). |
| `equivRealProd_apply_le`, `lipschitz_equivRealProd`, `antilipschitz_equivRealProd` | Bounds on `equivRealProd` | Used to prove completeness, properness, and uniform embedding properties. |
| `completeSpace ℂ` | `CompleteSpace ℂ` | `ℂ` is complete as a normed space (via equivalence with `ℝ²`). |
| `ringHom_eq_id_or_conj_of_continuous` | `∀ f : ℂ →+* ℂ, Continuous f → f = id ∨ f = conj` | Classification of continuous ring endomorphisms of `ℂ`. |
| `tsum` lemmas (`hasSum_conj`, `hasSum_re`, `hasSum_iff`, etc.) | Convergence & summability criteria | Allows reduction of complex series convergence to real/imag parts. |
| `slitPlane` | `Set ℂ` | `ℂ \ ℝ≤0`, used for defining branches of log/sqrt; open, contains `ball 1 1`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `reCLM`, `imCLM`, `ofRealCLM`: `CLM` = *ContinuousLinearMap*.
  - `conjCLE`: `CLE` = *ContinuousLinearEquiv*.
  - `conjLIE`, `ofRealLI`: `LI`/`LIE` = *LinearIsometry* / *LinearIsometryEquiv*.
  - `equivRealProd`: product map `z ↦ (z.re, z.im)`.
  - `norm_*`, `nnnorm_*`, `dist_*`, `nndist_*`, `edist_*`: variants for norm, extended metric, etc.
  - `tsum_*`, `hasSum_*`, `summable_*`: infinite sum lemmas.

- **Suffixes**:
  - `_apply`: action on elements (e.g., `reCLM_apply z = z.re`).
  - `_symm`: inverse action (e.g., `equivRealProdCLM_symm_apply`).
  - `_coe`: coercion to underlying map (e.g., `reCLM_coe`).
  - `_ofReal`, `_intCast`, `_natCast`: for canonical embeddings of subtypes.

- **`norm_cast` / `norm_cast 1100`**: for simplification lemmas that allow casting norms of reals/nats/integers/rats into `ℂ`.

---

#### **3. Tactic Stack**

- **Core simplifiers & rewriters**:
  - `simp`, `simp_rw`, `simp only`, `simp [norm_eq_abs]`, `simp [abs_ofReal]`
  - `rw`, `rwa`, `convert`, `congr_arg`
- **Algebraic reasoning**:
  - `ring`, `ring_nf`, `linarith`, `norm_num`
- **Analysis-specific**:
  - ` continuity`, `fun_prop`, `apply_congr`, `ext`, `ext1`
  - `apply _, apply _` for product/sum types
  - `exact`, `exact?`, `assumption`, `intro`, `cases`
- **Metric/topology**:
  - `exact dist_eq`, `rw [dist_eq_re_im]`, `rw [Real.dist_eq]`
  - `apply isometry_*`, `apply lipschitz_*`, `apply antilipschitz_*`
- **Order & topology**:
  - `isClosed_*`, `isOpen_*`, `tendsto_*`, `uniformContinuous_*`
- **Specialized**:
  - `norm_cast`, `nnnorm`, `abs_of_nonneg`, `abs_of_pos`, `sqrt_sq_eq_abs`

---

#### **4. Proof Logic & Strategy**

- **Normed structure proofs**:
  - Use `abs` properties (`map_mul`, `map_neg`, `eq_zero_of_map_eq_zero`) to instantiate `NormedField`, `NormedAddCommGroup`.
  - For `NormedAlgebra`, reduce to `norm_smul_le` via algebra map and `norm_mul`.

- **Equivalence with `ℝ²`**:
  - Prove two-sided bounds on `equivRealProd` (`equivRealProd_apply_le`, `abs_le_sqrt_two_mul_max`).
  - Use `mkContinuous`, `toContinuousLinearEquivOfBounds` to lift linear equivalence to continuous linear equivalence.

- **Completeness & topology**:
  - Use `completeSpace_congr` + `isUniformEmbedding_equivRealProd` + `completeSpace ℝ × ℝ`.
  - Properness via Lipschitz equivalence to `ℝ²`.

- **Series & convergence**:
  - Reduce to real/imag parts using `hasSum_iff`, `re_tsum`, `im_tsum`.
  - Use `RCLike` API to avoid duplication across `𝕜 : RCLike`.

- **Conjugation & isometries**:
  - Define `conjLIE` via `abs_conj`; lift to `conjCLE`.
  - Prove `isometry_conj`, `dist_conj_conj`, `continuous_conj`, `continuous_star`.

- **Order & topology compatibility**:
  - Prove `orderClosedTopology` by showing `≤` is closed in product topology.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Data.Complex.Module`, `Order`, `Exponential`
  - `Mathlib.Analysis.RCLike.Basic`
  - `Mathlib.Topology.Algebra.InfiniteSum.*`
  - `Mathlib.Topology.Instances.RealVectorSpace`

- **Scope**:
  - Analytic properties of `ℂ` as a normed field and real Banach space.
  - Interactions between algebraic structure (`conj`, `re`, `im`, `ofReal`), topology (metric, uniform, continuity), and order (via `RCLike` and `ComplexOrder`).
  - API for infinite sums, products, and continuity of standard functions.

- **Notable abstractions**:
  - `RCLike` framework abstracts `ℂ`-like fields; many lemmas are duplicated for `𝕜 : RCLike` and then specialized to `ℂ`.
  - `equivRealProdCLM` is the central tool for transferring properties between `ℂ` and `ℝ²`.

--- 

Let me know if you'd like a dependency graph, a list of lemmas by usage frequency, or a mapping to standard analysis textbooks.