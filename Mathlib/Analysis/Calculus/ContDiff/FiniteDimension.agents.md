Here's a structured technical metadata extraction from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `contDiffOn_clm_apply` | `ContDiffOn 𝕜 n f s ↔ ∀ y, ContDiffOn 𝕜 n (fun x => f x y)`<br>Characterizes `Cⁿ`-ness of a family of continuous linear maps by pointwise evaluation. Requires finite-dimensionality of the domain space `E`. |
| `contDiff_clm_apply_iff` | `ContDiff 𝕜 n f ↔ ∀ y, ContDiff 𝕜 n (fun x => f x y)`<br>Global version of `contDiffOn_clm_apply`. |
| `contDiff_succ_iff_fderiv_apply` | `ContDiff 𝕜 (n + 1) f ↔ Differentiable 𝕜 f ∧ (n = ω → AnalyticOnNhd 𝕜 f Set.univ) ∧ ∀ y, ContDiff 𝕜 n (fun x => fderiv 𝕜 f x y)`<br>Characterizes `C^(n+1)`-ness via Fréchet derivative applied to arbitrary vectors `y`. Avoids universe issues by keeping domain/codomain fixed. Requires finite-dimensionality of `D`. |
| `contDiffOn_succ_of_fderiv_apply` | Sufficient condition for `ContDiffOn 𝕜 (n + 1) f s`: differentiability, analyticity in the infinite case, and `Cⁿ`-ness of directional derivatives. |
| `contDiffOn_succ_iff_fderiv_apply` | Equivalence version of the above for `ContDiffOn`, assuming `UniqueDiffOn s`. |

---

### **2. Naming Conventions**

- **`contDiffOn_` / `contDiff_`**: Prefix for theorems about `ContDiffOn` / `ContDiff`.
- **`_clm_apply`**: Refers to application of a continuous linear map (CLM) — used when reasoning about families of CLMs.
- **`_succ_iff_fderiv_apply`**: Indicates a characterization of `C^(n+1)` via the derivative applied to arguments.
- **`_on` suffix**: Used for local versions (`ContDiffOn`), as opposed to global (`ContDiff`).
- **`_iff` suffix**: Indicates an equivalence (↔), not just an implication.

---

### **3. Tactic Stack**

- **`simp_rw`**: Used to rewrite using `contDiffOn_univ` and `contDiffOn_clm_apply`.
- **`rw`**: Rewriting with lemmas like `contDiff_succ_iff_fderiv`, `contDiff_clm_apply_iff`, etc.
- **`refine`**: To construct proofs with holes (`?_`) to be filled later.
- **`let` + `have`**: Local definitions and intermediate facts (e.g., `d := finrank 𝕜 E`, `hd : d = finrank 𝕜 (Fin d → 𝕜)`).
- **`trans`**: For chaining equivalences or equalities (e.g., `e₂.symm_comp_self`).
- **`contDiff.comp_contDiffOn`**, **`contDiffOn_pi.mpr`**, **`clm_apply`**: Specific lemmas invoked via dot-notation from `ContDiff` infrastructure.

---

### **4. Proof Logic**

- **Inductive-style reasoning on differentiability order `n`**: Especially in `contDiff_succ_iff_fderiv_apply`, where `n+1` is reduced to `n`.
- **Reduction to pointwise properties**: Use of finite-dimensionality to reduce vector-valued differentiability to scalar (or finite-dimensional) component-wise differentiability.
- **Equivalence-based reasoning**: Many proofs proceed by rewriting using equivalences (e.g., `ContinuousLinearEquiv`) to transport structure.
- **Use of `ContinuousLinearEquiv.ofFinrankEq` and `piRing`**: To identify `E` with `Fin d → 𝕜`, enabling product-space arguments.
- **Case analysis on `n = ω`**: To handle the analytic case separately in infinite-order differentiability.

---

### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.ContDiff.Basic`: Provides `ContDiff`, `ContDiffOn`, `fderiv`, `fderivWithin`, etc.
  - `Mathlib.Analysis.Normed.Module.FiniteDimension`: Provides finite-dimensional normed space tools (`finrank`, `ContinuousLinearEquiv.ofFinrankEq`, etc.).

- **Assumptions**:
  - `𝕜`: Nontrivially normed field.
  - `D`, `E`, `F`: Normed additive commutative groups, normed spaces over `𝕜`.
  - `n : WithTop ℕ∞`: Allows `n = ∞` (denoted `ω`).
  - `CompleteSpace 𝕜`: Required for some analysis results (e.g., equivalence of norms in finite dimensions).
  - `FiniteDimensional 𝕜 D` / `E`: Key hypothesis for finite-dimensional reductions.

- **Scoped notation**:
  - `open scoped ContDiff`: Enables `C^n`-style notation and localizes `ContDiff`-related lemmas.

---

Let me know if you'd like a diagram of the logical dependencies or a summary of how this fits into the broader `Mathlib` calculus hierarchy.