Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SuperpolynomialDecay` | `def SuperpolynomialDecay {α β} [...] (l : Filter α) (k : α → β) (f : α → β) := ∀ n : ℕ, Tendsto (fun a ↦ k a ^ n * f a) l (𝓝 0)` | Core definition: `f` decays superpolynomially in parameter `k` along filter `l` if `kⁿ·f → 0` for all `n ∈ ℕ`. |
| `superpolynomialDecay_iff_abs_tendsto_zero` | `↔ ∀ n, Tendsto (|kⁿ * f|) l (𝓝 0)` | Equivalence with absolute value version. |
| `superpolynomialDecay_iff_zpow_tendsto_zero` | `↔ ∀ z : ℤ, Tendsto (k ^ z * f) l (𝓝 0)` | Equivalence with integer powers (requires `k → ∞` along `l`). |
| `superpolynomialDecay_iff_isBigO` | `↔ ∀ z : ℤ, f =O[l] k ^ z` | Equivalence with big-O bounds against all integer powers of `k`. |
| `superpolynomialDecay_iff_isLittleO` | `↔ ∀ z : ℤ, f =o[l] k ^ z` | Equivalence with little-o bounds (requires `k → ∞`). |
| `superpolynomialDecay_iff_norm_tendsto_zero` | `↔ ∀ n, Tendsto (‖kⁿ * f‖) l (𝓝 0)` | Norm-based version (for normed fields). |
| `superpolynomialDecay_iff_superpolynomialDecay_abs` | `↔ SuperpolynomialDecay l (|k|) |f|` | Reduction to absolute values. |
| `superpolynomialDecay_iff_superpolynomialDecay_norm` | `↔ SuperpolynomialDecay l (‖k‖) ‖f‖` | Reduction to norms. |
| `superpolynomialDecay_iff_abs_isBoundedUnder` | `↔ ∀ n, IsBoundedUnder (≤) l (|kⁿ * f|)` | Boundedness characterization (requires `k → ∞`). |
| `SuperpolynomialDecay.polynomial_mul` | `SuperpolynomialDecay l k f → SuperpolynomialDecay l k (p.eval k * f)` | Multiplying by a polynomial preserves superpolynomial decay. |
| `SuperpolynomialDecay.mul_polynomial` | `SuperpolynomialDecay l k f → SuperpolynomialDecay l k (f * p.eval k)` | Right-multiplication version. |
| `superpolynomialDecay_param_mul_iff` | `SuperpolynomialDecay l k (k * f) ↔ SuperpolynomialDecay l k f` | Multiplication by `k` is invertible w.r.t. decay (if `k → ∞`). |
| `superpolynomialDecay_mul_param_iff` | `SuperpolynomialDecay l k (f * k) ↔ SuperpolynomialDecay l k f` | Same for right multiplication. |
| `superpolynomialDecay_param_pow_mul_iff` | `SuperpolynomialDecay l k (kⁿ * f) ↔ SuperpolynomialDecay l k f` | Multiplication by `kⁿ` is invertible. |
| `superpolynomialDecay_mul_param_pow_iff` | `SuperpolynomialDecay l k (f * kⁿ) ↔ SuperpolynomialDecay l k f` | Right version. |
| `superpolynomialDecay_mul_const_iff`, `superpolynomialDecay_const_mul_iff` | Multiplication by nonzero constant preserves/reflects decay. | |

---

### **2. Naming Conventions**

- **Predicate prefix**: `SuperpolynomialDecay` — capitalized, noun phrase.
- **Equivalence theorems**: `superpolynomialDecay_iff_*` — lowercase, `_iff_` suffix.
- **Parameterized properties**:
  - `*_param_*`: involving multiplication by `k` or its powers.
  - `*_zpow_*`: involving integer powers (`z : ℤ`).
  - `*_abs_*`, `*_norm_*`: involving absolute value or norm.
- **Multiplication variants**:
  - `param_mul`, `mul_param`: left/right multiplication by `k`.
  - `param_pow_mul`, `mul_param_pow`: left/right multiplication by `kⁿ`.
  - `param_zpow_mul`, `mul_param_zpow`: left/right multiplication by `kᶻ`.
- **Constants**:
  - `mul_const`, `const_mul`: multiplication by constant on right/left.
- **Convenience lemmas**:
  - `congr`, `congr'`: up-to-filter-equality variants.
  - `trans_*`: transitivity-like lemmas (e.g., `trans_eventuallyLE`, `trans_abs_le`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplifying definitions, especially `mul_assoc`, `pow_succ`, `zpow_natCast`, `abs_mul`, `norm_mul`. |
| `rw` / `apply` | Rewriting using equivalences (`_iff_*` lemmas), definitions. |
| `induction` | Induction on `n : ℕ` for `kⁿ`-based properties. |
| `exact`, `refine`, `apply` | Constructing proofs using known lemmas. |
| `congr`, `congr'` | Proving filter-equality of functions. |
| `eventually_of_forall`, `eventually.mp`, `eventually.mono` | Handling `≤ᶠ[l]`, `=ᶠ[l]` conditions. |
| `tendsto_of_tendsto_of_tendsto_of_le_of_le'` | Sandwich arguments for convergence. |
| `calc` | Chain of inequalities (especially in `isBoundedUnder`, `isBigO` proofs). |
| `lift` | Lifting integers to naturals when nonnegative. |
| `by_cases` | Splitting on `0 ≤ z` or `z ≥ 0`. |
| `norm_num`, `ring`, `linarith` | Arithmetic simplifications (implicit in `simp`-based proofs). |
| `simpa` | Simplifying with assumptions and discharging goals. |

---

### **4. Proof Logic & Strategy**

- **Core strategy**: Prove equivalences by reducing to the base definition (`∀ n, kⁿ·f → 0`) and using:
  - **Absolute value / norm**: `tendsto_zero_iff_abs_tendsto_zero`, `tendsto_zero_iff_norm_tendsto_zero`.
  - **Integer powers**: via `zpow` and inversion (`k⁻¹`), using `hk : Tendsto k l atTop` to ensure invertibility eventually.
  - **Big-O / little-o**: via `isBigO_of_div_tendsto_nhds`, `isLittleO_of_tendsto'`, and algebraic manipulation of powers.
- **Induction**: Used for polynomial multiplication (`Polynomial.induction_on'`) and `kⁿ`-based lemmas.
- **Filter-based reasoning**: Heavy use of `Eventually`, `Tendsto`, and monotonicity (`mono`, `set_of_superset`).
- **Order-theoretic arguments**: In ordered settings, bounding via `mul_le_mul_of_nonneg_left`, `isBoundedUnder`, etc.
- **Reduction principles**: Many theorems reduce to simpler cases (e.g., `abs`, `norm`, `k⁻¹`, constants) via `congr`, `congr'`, or equivalence chains.

---

### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Polynomial.Eval.Defs` | Polynomial evaluation (`p.eval`), used in `polynomial_mul`. |
| `Mathlib.Analysis.Asymptotics.Asymptotics` | Core asymptotic notation (`=O[l]`, `=o[l]`, `Tendsto`, `atTop`, etc.). |
| `Mathlib.Analysis.Normed.Order.Basic` | Normed ordered structures (e.g., `NormedLinearOrderedField`). |
| `Mathlib.Topology.Algebra.Order.LiminfLimsup` | Order topology, convergence, liminf/limsup tools (used in `isBoundedUnder`, `Tendsto` lemmas). |

**Domain scope**:  
- Generalizes *negligible functions* (when `k n = n : ℕ → ℝ`)  
- Captures *rapidly decreasing functions* (when `k(r₁,…,rₙ) = r₁·…·rₙ : ℝⁿ → ℝ`)  
- Applies in ordered/linearly ordered semirings, rings, fields, and normed variants.

---

Let me know if you'd like a diagram of the equivalence chain or a proof sketch for a specific theorem.