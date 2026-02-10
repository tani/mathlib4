Here is a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `GammaIntegral` | `ℂ → ℂ` | The integral definition of the Gamma function: `Γ(s) = ∫ t > 0, t^(s-1) * exp(-t) dt` |
| `mellin` | `(ℝ→ℂ) → ℂ → ℂ` | Mellin transform: `(mellin f)(s) = ∫ t > 0, t^(s-1) * f t dt` |
| `GammaIntegral_eq_mellin` | `GammaIntegral = mellin fun x => exp(-x)` | Shows Gamma integral is a Mellin transform of `exp(-x)` |
| `hasDerivAt_GammaIntegral` | `0 < s.re → HasDerivAt GammaIntegral (∫ t > 0, t^(s-1) * log t * exp(-t)) s` | Computes derivative of Gamma integral via Mellin transform of `log t · exp(-t)` |
| `GammaAux n` | `ℂ → ℂ` | Auxiliary function used to extend differentiability past `Re(s) > 0` via functional equation `Γ(s) = Γ(s+1)/s` |
| `differentiableAt_GammaAux` | `1 - Re(s) < n ∧ ∀ m, s ≠ -m → DifferentiableAt ℂ (GammaAux n) s` | Proves differentiability of `GammaAux n` by induction on `n` |
| `differentiableAt_Gamma` | `∀ m, s ≠ -m → DifferentiableAt ℂ Gamma s` | Main result: `Γ` is complex-differentiable away from non-positive integers |
| `tendsto_self_mul_Gamma_nhds_zero` | `Tendsto (λ z, z * Γ z) (𝓝[≠] 0) (𝓝 1)` | Shows `z·Γ(z) → 1` as `z → 0`, i.e., `Γ` has a simple pole at `0` with residue `1` |
| `differentiableAt_Gamma` (Real) | `∀ m, s ≠ -m → DifferentiableAt ℝ Gamma s` | Real counterpart: `Γ` is real-differentiable away from non-positive integers |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `GammaIntegral_`: Relates to the integral definition of `Γ`.
  - `hasDerivAt_`: States existence of derivative at a point.
  - `differentiableAt_`: States differentiability at a point.
  - `tendsto_`: Asymptotic behavior (limits).
- **Suffixes**:
  - `_eq_`: Equality of two expressions (e.g., `GammaIntegral_eq_mellin`).
  - `_aux`: Auxiliary constructions (e.g., `GammaAux`).
- **Functional notation**:
  - `ofReal_`, `Complex.ofReal_`: Embedding `ℝ → ℂ`.
  - `re`, `im`: Real/imaginary part projections.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions and simplifying with rewrite rules |
| `simp only [...]` | Simplification with explicit lemmas |
| `convert` | Matching goals up to definitional equality |
| `induction'` | Induction on natural numbers (with generalizing) |
| `refine` / `exact` | Constructing proofs term-by-term |
| `contrapose!` | Logical contrapositive + simplification |
| `linarith` | Linear arithmetic over reals (e.g., inequalities on `re s`) |
| `eventuallyEq_of_mem`, `mem_nhds_iff`, `isOpen_preimage` | Neighborhood/filter reasoning |
| `differentiableAt.comp`, `differentiableAt.div`, `differentiableAt_id` | Differentiability closure properties |
| `hasDerivAt_GammaIntegral ... .differentiableAt` | Derivative ⇒ differentiability |
| `continuous_re`, `continuous_id`, `continuous_add`, etc. | Continuity reasoning |

---

### **4. Proof Logic**

- **Structure**:
  1. **Reduction to Mellin transform**: Show `Γ` integral = Mellin transform of `exp(-x)`.
  2. **Differentiability for `Re(s) > 0`**: Use `mellin_hasDerivAt_of_isBigO_rpow`, requiring:
     - Integrability of `exp(-t)`
     - Asymptotic control (`isBigO`, `isLittleO`) of `t^(s-1) * log t * exp(-t)`
  3. **Extension to all `s ∉ -ℕ`**:
     - Define `GammaAux n` recursively using `Γ(s) = Γ(s+1)/s`.
     - Prove `GammaAux n` differentiable via induction on `n`, using:
       - `hasDerivAt_GammaIntegral` for base case (`n = 0`, i.e., `Re(s) > 0`)
       - Closure properties (`div`, `comp`) for inductive step.
     - Show `Γ = GammaAux n` near any `s ∉ -ℕ` (using neighborhood condition `1 - Re(t) < n`).
  4. **Real case**: Deduce from complex case via `hasDerivAt.real_of_complex`.

- **Key ideas**:
  - Use of **analytic continuation** via functional equation.
  - **Filter-theoretic** arguments to compare functions locally.
  - **Asymptotic analysis** (`isBigO`, `isLittleO`) for integral differentiability.

---

### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.MellinTransform` | Provides `mellin`, `mellin_hasDerivAt_of_isBigO_rpow`, asymptotic tools |
| `Mathlib.Analysis.SpecialFunctions.Gamma.Basic` | Defines `Gamma`, `GammaIntegral`, basic properties |

**Domain**: Complex and real analysis, specifically:
- Differentiability of special functions
- Mellin transforms
- Asymptotic analysis (`isBigO`, `isLittleO`, `tendsto`)
- Neighborhood/filter reasoning in topology

**Mathlib version**: Likely ≥ 3.40 (based on `induction'`, `simp_rw`, `ofReal_natCast`, etc.)

--- 

Let me know if you'd like a diagram of the proof structure or a formalized dependency graph.