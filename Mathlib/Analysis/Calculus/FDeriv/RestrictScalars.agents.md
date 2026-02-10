Here is a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasStrictFDerivAt.restrictScalars` | `HasStrictFDerivAt f f' x → HasStrictFDerivAt f (f'.restrictScalars 𝕜) x` | Shows that if `f` has a strict Fréchet derivative over `𝕜'`, then it also has one over `𝕜`, via scalar restriction of the derivative. |
| `HasFDerivAtFilter.restrictScalars` | `HasFDerivAtFilter f f' x L → HasFDerivAtFilter f (f'.restrictScalars 𝕜) x L` | Analogous for filtered Fréchet derivatives. |
| `HasFDerivAt.restrictScalars` | `HasFDerivAt f f' x → HasFDerivAt f (f'.restrictScalars 𝕜) x` | Standard Fréchet derivative case. |
| `HasFDerivWithinAt.restrictScalars` | `HasFDerivWithinAt f f' s x → HasFDerivWithinAt f (f'.restrictScalars 𝕜) s x` | Within-set derivative case. |
| `DifferentiableAt.restrictScalars` | `DifferentiableAt 𝕜' f x → DifferentiableAt 𝕜 f x` | Differentiability over `𝕜'` implies differentiability over `𝕜`. |
| `DifferentiableWithinAt.restrictScalars` | `DifferentiableWithinAt 𝕜' f s x → DifferentiableWithinAt 𝕜 f s x` | Same for within-set differentiability. |
| `DifferentiableOn.restrictScalars` | `DifferentiableOn 𝕜' f s → DifferentiableOn 𝕜 f s` | Global-on-set differentiability. |
| `Differentiable.restrictScalars` | `Differentiable 𝕜' f → Differentiable 𝕜 f` | Fully global differentiability. |
| `HasFDerivWithinAt.of_restrictScalars` | `HasFDerivWithinAt f g' s x → f'.restrictScalars 𝕜 = g' → HasFDerivWithinAt f f' s x` | Converse direction: if the `𝕜`-derivative extends to a `𝕜'`-linear map, then that map is the `𝕜'`-derivative. |
| `hasFDerivAt_of_restrictScalars` | Analogous to above for `HasFDerivAt`. |
| `DifferentiableAt.fderiv_restrictScalars` | `fderiv 𝕜 f x = (fderiv 𝕜' f x).restrictScalars 𝕜` | Identifies the `𝕜`-derivative as the scalar restriction of the `𝕜'`-derivative. |
| `differentiableWithinAt_iff_restrictScalars` | Equivalence between differentiability over `𝕜'` and existence of a `𝕜'`-linear extension of the `𝕜`-derivative (under unique differentiability). |
| `differentiableAt_iff_restrictScalars` | Special case of the above for `differentiableAt`, using `uniqueDiffWithinAt_univ`. |

> **Note**: All theorems assume `𝕜'` is a *normed algebra* over `𝕜`, and all spaces are normed modules over both fields with compatible scalar multiplication (`IsScalarTower`).

---

### **2. Naming Conventions**

- **Prefixes**:
  - `restrictScalars`: Indicates scalar restriction of derivative or differentiability.
  - `of_`: Used for converse implications (e.g., `of_restrictScalars`).
  - `has_`, `differentiable_`, `fderiv_`: Standard Fréchet derivative-related naming.

- **Suffixes**:
  - `At`, `WithinAt`, `On`, (no suffix for global): Standard for Fréchet derivative variants.

- **Variable naming**:
  - `𝕜`, `𝕜'`: Base and extended scalar fields.
  - `E`, `F`: Normed spaces.
  - `f`, `f'`, `g'`: Function and its derivatives.
  - `s`: Set for local/within-set analysis.
  - `x`: Point of interest.

---

### **3. Tactic Stack**

- **`aesop`**: Used implicitly via `by aesop` or similar in `of_isLittleO` applications (not explicit here, but `of_isLittleO` is a constructor that likely uses `aesop` internally).
- **`simp_rw`**: Not used directly, but `rw` is used in proofs like `by rw [← H] at h`.
- **`rw`**: Used to rewrite equalities involving `restrictScalars`.
- **`exact` / `intro` / `apply`**: Standard intro/apply patterns in short proofs.
- **`constructor`**: Used in iff proofs to split into two directions.
- **`rintro` / `rintro ⟨...⟩`**: For destructuring existential quantifiers.

> The proofs are mostly *one-liners* relying on the `of_isLittleO` constructor, which itself is built on deeper lemmas about little-o behavior under scalar restriction.

---

### **4. Proof Logic**

- **Core idea**: Scalar restriction of the derivative preserves the little-o condition defining Fréchet differentiability.
- **Proof pattern**:
  1. Assume differentiability over `𝕜'` (i.e., `f` satisfies the little-o condition with `f'`).
  2. Use that scalar restriction of a bounded linear map preserves the norm inequality (up to constants).
  3. Conclude the same little-o condition holds for `f'.restrictScalars 𝕜`.
  4. Apply `of_isLittleO` to lift back to derivative statements.
- **Converses** (`of_restrictScalars`, `hasFDerivAt_of_restrictScalars`) use equality to rewrite and then apply the forward direction.
- **Equivalences** (`differentiableAt_iff_restrictScalars`, etc.) combine forward/backward directions, using uniqueness of derivatives under `UniqueDiffWithinAt`.

---

### **5. Imports**

- `Mathlib.Analysis.Calculus.FDeriv.Basic`: Core definitions of Fréchet derivatives (`HasFDerivAt`, `fderiv`, `differentiableAt`, etc.).
- Standard libraries via `open`:
  - `Filter`, `Asymptotics`, `ContinuousLinearMap`, `Set`, `Metric`, `Topology`, `NNReal`, `ENNReal`

> The file is part of the `Mathlib` library and focuses on *scalar restriction* in the context of *normed algebras*, especially relevant for complex-to-real differentiability.

--- 

Let me know if you'd like a diagram of the logical dependencies or a formalized summary in another format (e.g., for a domain-specific AI agent).