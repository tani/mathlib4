Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CPolynomialOn.contDiffOn` | `CPolynomialOn 𝕜 f s → ContDiffOn 𝕜 n f s` | Proves that a function continuously polynomial on a set `s` is `n`-times continuously differentiable on `s`, for any `n : WithTop ℕ∞`. |
| `CPolynomialAt.contDiffAt` | `CPolynomialAt 𝕜 f x → ContDiffAt 𝕜 n f x` | Shows that if `f` is continuously polynomial at a point `x`, then it is `n`-times continuously differentiable at `x`. |
| `ContinuousMultilinearMap.contDiffAt` | `ContDiffAt 𝕜 n f x` | Establishes infinite differentiability (at any order `n`) of a continuous multilinear map at any point. |
| `ContinuousMultilinearMap.contDiff` | `ContDiff 𝕜 n f` | Concludes that a continuous multilinear map is globally `n`-times continuously differentiable. |

**Auxiliary definitions used (from imports / context):**
- `CPolynomialOn`, `CPolynomialAt`: Predicates for “continuously polynomial” behavior (locally or globally).
- `ContDiffOn`, `ContDiffAt`, `ContDiff`: Standard notions of `n`-times continuously differentiable functions (on a set, at a point, or globally).
- `AnalyticOnNhd`: Local analyticity (used as a stronger property implying smoothness).
- `FormalMultilinearSeries`: Formal multilinear series, used to model Taylor expansions of multilinear maps.

---

### **2. Naming Conventions**

- **Predicates / properties**:
  - `is_`, `has_`, `cPolynomial_`, `contDiff_`, `analytic_`: Standard Lean/Lean-Mathlib style.
  - `CPolynomialOn`, `CPolynomialAt`: “Continuously polynomial on/at” — prefixed with `C` to distinguish from purely algebraic polynomial notions.
- **Theorems**:
  - `contDiffOn`, `contDiffAt`, `contDiff`: Suffixes indicate scope (`On`, `At`, or global).
  - `analyticOnNhd`: Suffix `Nhd` indicates neighborhood-based local analyticity.
- **Variables**:
  - `p`, `f`, `x`, `s`, `t`, `n`, `r`: Conventional mathematical notation.
  - `ι`, `E`, `F`: Standard for index sets and normed spaces.

---

### **3. Tactic Stack**

The proofs use a compact, high-level tactic style typical of modern Mathlib:

- `let`: Local definition introduction.
- `suffices ... from ...`: Reverse-chaining proof structure.
- `exact`: Direct application of a lemma.
- `.mono h`: Uses monotonicity of `ContDiffOn` w.r.t. subset restriction.
- `.uniqueDiffOn`: Applies `uniqueDiffOn` (a property of open sets where `ContDiffOn` behaves well).
- `.isOpen_cPolynomialAt`: Uses a known lemma about openness of the set where `f` is continuously polynomial.
- `.mpr`: From `iff`, applies reverse direction (used in `contDiff_iff_contDiffAt.mpr`).
- Implicit `aesop`-style automation is likely used in background lemmas (e.g., `analyticOnNhd`, `isOpen_cPolynomialAt`), though not visible here.

No explicit `simp`, `rw`, `ring`, or `linarith` appear — the proof is high-level and relies on pre-proved analytic/smoothness transfer lemmas.

---

### **4. Proof Logic**

- **Main idea**: Show that `CPolynomialOn` ⇒ `AnalyticOnNhd` ⇒ `ContDiffOn`.
  - First, define `t := {x | CPolynomialAt 𝕜 f x}` — the maximal open set where `f` is locally continuously polynomial.
  - Use `h : CPolynomialOn 𝕜 f s` to get `s ⊆ t`, then reduce to proving smoothness on `t`.
  - Prove `f` is analytically extendable near each point of `t` via `H.analyticOnNhd`, where `H : CPolynomialOn 𝕜 f t`.
  - Analytic ⇒ `C^∞` (via `AnalyticOnNhd.contDiffOn` + `uniqueDiffOn`).
- For `ContinuousMultilinearMap`, reduce to `CPolynomialAt` (via `f.cpolynomialAt`) and apply `contDiffAt`.

**Induction?** Not explicitly used — smoothness is derived via analyticity, avoiding inductive derivative constructions.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.FDeriv.Analytic` | Provides links between Fréchet differentiability, analyticity, and smoothness (e.g., `AnalyticOnNhd.contDiffOn`, `analyticOnNhd`). |
| `Mathlib.Analysis.Calculus.ContDiff.Defs` | Defines `ContDiffOn`, `ContDiffAt`, `ContDiff`, and key equivalences like `contDiff_iff_contDiffAt`. |

**No explicit use of `Mathlib.Analysis.Calculus.FDeriv.Basic` or `Multilinear` — but `FormalMultilinearSeries` is used, likely from `Mathlib.Analysis.NormedSpace.Multilinear` or similar.**

---

Let me know if you'd like a formalized dependency graph or a summary of the `CPolynomialAt`/`CPolynomialOn` definitions (not shown here).