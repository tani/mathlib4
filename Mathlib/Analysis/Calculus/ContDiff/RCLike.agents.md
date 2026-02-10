Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Higher Differentiability over `ℝ` or `ℂ`**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `HasFTaylorSeriesUpToOn` | A predicate stating that `f` admits a formal Taylor series up to order `n` on a set `s`. Used to relate higher-order differentiability with local behavior. |
| `ContDiffAt` / `ContDiff` | Local/global `n`-times continuously differentiable functions (in the sense of Fréchet derivatives). |
| `HasStrictFDerivAt` / `HasStrictDerivAt` | Strict (Fréchet / scalar) differentiability — stronger than usual differentiability; implies the derivative is the unique strict derivative. |
| `fderiv` | The Fréchet derivative as a continuous linear map. |
| `deriv` | The scalar derivative (for functions `𝕂 → F'`). |
| `LipschitzOnWith`, `LipschitzWith` | Lipschitz continuity with constant `K`. |
| `NNNorm` (`‖·‖₊`) | Non-negative norm (used for operator norms of linear maps). |

**Key Theorems (with purpose):**

- `HasFTaylorSeriesUpToOn.hasStrictFDerivAt`:  
  If `f` has a Taylor series up to order `n ≥ 1`, then the degree-1 term gives a *strict* derivative at interior points.

- `ContDiffAt.hasStrictFDerivAt'` / `ContDiffAt.hasStrictDerivAt'`:  
  If `f` is `Cⁿ` (`n ≥ 1`) at `x` and has a derivative `f'` there, then `f'` is the *strict* derivative.

- `ContDiffAt.hasStrictFDerivAt` / `ContDiffAt.hasStrictDerivAt`:  
  For `Cⁿ` (`n ≥ 1`) functions, the actual derivative (`fderiv f x` or `deriv f x`) is a strict derivative.

- `ContDiff.locallyLipschitz`:  
  A `C¹` function is *locally Lipschitz* — key for uniqueness/extension arguments.

- `ContDiffAt.exists_lipschitzOnWith_of_nnnorm_lt`:  
  If the operator norm of the derivative at `x` is strictly less than `K`, then `f` is `K`-Lipschitz near `x`.

- `ContDiff.lipschitzWith_of_hasCompactSupport`:  
  A `Cⁿ` (`n ≥ 1`) function with compact support is *globally* Lipschitz (uses boundedness of derivative on compact support).

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `has_...`: Predicate-style (e.g., `hasStrictFDerivAt`, `hasFDerivAt`).
  - `contDiff...`: Related to `ContDiffAt`/`ContDiff`.
  - `exists_...`: Existential lemmas (e.g., `exists_lipschitzOnWith`).
  - `locally...`: Global properties derived locally (e.g., `locallyLipschitz`).

- **Suffixes:**
  - `At`: Local property at a point.
  - `WithinAt`: Local property relative to a subset.
  - `On`: Property on a set (e.g., `LipschitzOnWith`).
  - `'` (prime): Variant of a theorem (e.g., `hasStrictFDerivAt'` vs `hasStrictFDerivAt`).

- **Notation:**
  - `𝕂`: Field (`ℝ` or `ℂ`) in `RCLike`.
  - `E'`, `F'`: Normed spaces over `𝕂`.
  - `n : WithTop ℕ∞`: Extended natural numbers for differentiability order.

---

#### **3. Tactic Stack**

- **Core tactics used repeatedly:**
  - `rcases`: To destruct existential/universal hypotheses.
  - `rw`, `rwa`: Rewriting with lemmas and assumptions.
  - `simp only [...]`: Simplification with precise lemmas (e.g., `mem_univ`, `insert_eq_of_mem`).
  - `exact`, `apply`: Direct proof steps.
  - `have`, `replace`: Introduce intermediate facts.
  - `convert`: To match goals up to definitional equality.
  - `norm_num`, `linarith`: For numeric inequalities (implied in `NNReal` reasoning).
  - `aesop`: Likely used in background automation (not explicit here, but common in Mathlib).
  - `rwa [hf'.unique ...]`: Uniqueness of derivative used to identify strict derivative.

- **Domain-specific automation:**
  - `continuousMultilinearCurryFin1` lemmas for currying multilinear maps.
  - `continuousAt.comp`, `continuousWithinAt` reasoning for continuity propagation.

---

#### **4. Proof Logic**

- **Inductive/structural pattern:**
  - Most proofs follow a *decomposition* strategy:
    1. Use `ContDiffAt` definition (`rcases hf ...`) to extract a Taylor series representation.
    2. Reduce to `HasFTaylorSeriesUpToOn` setting.
    3. Apply known lemmas about Taylor series (e.g., `hasStrictFDerivAt`, `exists_lipschitzOnWith_of_nnnorm_lt`).
    4. Use continuity/differentiability assumptions to bridge back to `fderiv`/`deriv`.
    5. Apply uniqueness of derivative (`hf'.unique`) to identify strict derivative.

- **Common subproofs:**
  - Showing `fderiv f x` or `deriv f x` is a strict derivative:  
    `hf.hasStrictFDerivAt' (hf.differentiableAt hn).hasFDerivAt hn`
  - Proving Lipschitzness:  
    Use `HasStrictFDerivAt` + `exists_lipschitzOnWith_of_nnnorm_lt` or convexity + MVT.

- **Key logical flow:**
  > `Cⁿ` (`n ≥ 1`) ⇒ differentiable ⇒ derivative exists ⇒ derivative is *strict* ⇒ Lipschitz (via norm bound) ⇒ locally Lipschitz ⇒ (with compact support) globally Lipschitz.

---

#### **5. Imports & Scope**

- **Primary imports:**
  - `Mathlib.Analysis.Calculus.ContDiff.Defs`: Definitions of `ContDiffAt`, `ContDiff`, Taylor series.
  - `Mathlib.Analysis.Calculus.MeanValue`: Mean Value Theorem (MVT) and consequences.

- **Domain scope:**
  - Functions between normed spaces over `ℝ` or `ℂ` (`RCLike 𝕂`).
  - Local/global differentiability (`ContDiffAt`, `ContDiff`).
  - Taylor expansions, strict derivatives, Lipschitz continuity.
  - Convex sets, neighborhoods, interior points.

- **Key structures used:**
  - `NormedAddCommGroup`, `NormedSpace 𝕂`: For linear analysis.
  - `WithTop ℕ∞`: For extended-order differentiability degrees.
  - `FormalMultilinearSeries`: For Taylor series formalism.

---

Let me know if you'd like a diagram of the logical dependencies or a summary of how these results feed into broader calculus (e.g., inverse function theorem, flow existence).