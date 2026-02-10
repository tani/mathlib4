**Technical Brief: Analyticity of Harmonic Functions in Lean 4**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HarmonicAt` | `f : ℂ → ℝ → x : ℂ → Prop` | `f` is harmonic at `x`: real-valued function satisfying Laplace’s equation at `x`. |
| `HarmonicOnNhd` | `f : ℂ → ℝ → s : Set ℂ → Prop` | `f` is harmonic on a neighborhood `s`. |
| `HarmonicAt.differentiableAt_complex_partial` | `hf : HarmonicAt f x → DifferentiableAt ℂ (fun z ↦ fderiv ℝ f z 1 - I * fderiv ℝ f z I) x` | Shows that the complex combination of real Fréchet derivatives is complex-differentiable at `x`. |
| `HarmonicAt.analyticAt_complex_partial` | `hf : HarmonicAt f x → AnalyticAt ℂ (fun z ↦ fderiv ℝ f z 1 - I * fderiv ℝ f z I) x` | Upgrades differentiability to analyticity of the complex derivative combination. |
| `harmonic_is_realOfHolomorphic` | `HarmonicOnNhd f (ball z R) → ∃ F : ℂ → ℂ, AnalyticOnNhd ℂ F (ball z R) ∧ EqOn (F.re) f (ball z R)` | Constructs a holomorphic function `F` whose real part equals `f` on a ball. |
| `HarmonicAt.analyticAt` | `hf : HarmonicAt f x → AnalyticAt ℝ f x` | Main result: harmonic functions are real-analytic. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `HarmonicAt.`: Theorems about local harmonicity.
  - `analyticAt_`, `differentiableAt_`, `analyticOnNhd_`, `differentiableOn_`: Standard Mathlib naming for regularity properties.
- **Suffixes**:
  - `_complex_partial`: Refers to the complex-linear combination of real derivatives.
  - `_realOfHolomorphic`: Indicates construction of a holomorphic function whose real part matches `f`.
- **Helper variables**:
  - `g`, `F₀`, `F`: Standard for constructing primitives or holomorphic extensions.
  - `hR`, `h₁ε`, `h₂ε`, etc.: Local hypotheses or intermediate results.

---

### 3. TACTIC STACK

| Tactic | Usage Frequency | Purpose |
|--------|-----------------|---------|
| `fun_prop` | High | Propagates differentiability/continuity assumptions. |
| `simp` / `simp only` | Very High | Simplifies using definitional equalities, especially around `fderiv`, `ofRealCLM`, `I`, `re`, `im`. |
| `rw` | High | Rewriting using lemmas like `fderiv_sub`, `fderiv_comp`, `fderiv_clm_apply`. |
| `ring` / `ring_nf` | Medium | Simplifies algebraic expressions involving `I`, `re`, `im`, scalars. |
| `congr` | Medium | Used to split equality goals (e.g., after `ring`). |
| `norm_cast` | Low | Casts between `ℝ` and `ℂ`. |
| `aesop` | Medium | Solves simple goals involving set membership, neighborhoods, etc. |
| `obtain` / `by_cases` | Medium | Structural proof decomposition. |
| `ext` | Medium | Extensionality for functions/linear maps. |
| `nth_rw` | Low | Precise rewriting at specific positions. |

---

### 4. PROOF LOGIC

The logical flow follows a standard *local-to-global* pattern:

1. **Local Setup**:
   - Assume `f` is harmonic at `x` (`HarmonicAt f x`).
   - Define `g(z) = ∂₁f(z) - I·∂ᵢf(z)`.

2. **Complex Differentiability**:
   - Use `differentiableAt_complex_iff_differentiableAt_real` to reduce to real differentiability.
   - Apply chain rule (`fderiv_comp`, `fderiv_clm_apply`) and simplify using harmonicity (`hf.1.isSymmSndFDerivAt`, `hf.2.eq_of_nhds`).

3. **Analyticity of `g`**:
   - Use `DifferentiableOn.analyticAt` with the open set `{x | HarmonicAt f x}` (open by `isOpen_setOf_harmonicAt`).

4. **Global Construction (on a ball)**:
   - Assume `f` harmonic on `ball z R`.
   - Show `g` is differentiable on the ball.
   - Use `isExactOn_ball` to get `F₀` with `F₀' = g`.
   - Define `F = F₀ - F₀(z) + f(z)` to ensure `F(z) = f(z)`.
   - Prove `F.re = f` on the ball using convexity and uniqueness of primitives.

5. **Real Analyticity of `f`**:
   - Use local harmonic neighborhood to get a ball where `f = F.re`.
   - Use `analyticAt_congr` and closure properties (`reCLM.analyticAt.comp`, `restrictScalars`) to conclude `f` is real-analytic.

---

### 5. IMPORTS

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.FDeriv.Symmetric` | Symmetry of second Fréchet derivatives (used in `hf.1.isSymmSndFDerivAt`). |
| `Mathlib.Analysis.Complex.Conformal` | Tools for complex differentiability, `I`, `re`, `im`, `ofRealCLM`. |
| `Mathlib.Analysis.Complex.HasPrimitives` | `isExactOn_ball`, existence of primitives on balls. |
| `Mathlib.Analysis.InnerProductSpace.Harmonic.Basic` | Definition of harmonic functions, Laplacian, `HarmonicAt`, `HarmonicOnNhd`. |

---

### 6. DEPENDENCY & OVERVIEW DIAGRAM

```mermaid
graph TD
  A[HarmonicAt f x] --> B[FDeriv ℝ f · 1, FDeriv ℝ f · I]
  B --> C[Define g = ∂₁f - I·∂ᵢf]
  C --> D[Complex Differentiability of g]
  D --> E[Analyticity of g]
  
  A --> F[HarmonicOnNhd f (ball z R)]
  F --> G[g DifferentiableOn ball]
  G --> H[Existence of F₀ with F₀' = g]
  H --> I[Define F = F₀ - F₀(z) + f(z)]
  I --> J[F.re = f on ball]
  J --> K[f = Re(F), F holomorphic]
  K --> L[f is real-analytic]

  subgraph Theory
    M[Mathlib.Analysis.InnerProductSpace.Harmonic.Basic]
    N[Mathlib.Analysis.Calculus.FDeriv.Symmetric]
    O[Mathlib.Analysis.Complex.Conformal]
    P[Mathlib.Analysis.Complex.HasPrimitives]
  end

  A --> M
  D --> N
  D --> O
  H --> P
```

---

### 7. SUMMARY

This file establishes a foundational result in complex analysis: **harmonic functions on ℂ are real-analytic**, by constructing a holomorphic function whose real part equals the given harmonic function locally. The proof leverages:
- The Cauchy–Riemann operator combination `∂₁ - I·∂ᵢ`,
- Exactness of differentiable 1-forms on balls,
- Properties of Fréchet derivatives and their symmetry under harmonicity.

The structure is typical of modern Lean analysis proofs: high-level use of `fun_prop`, `simp`, and `rw`, with heavy reliance on Mathlib’s calculus and complex analysis libraries.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.dot` format) or a breakdown of `analyticAt_congr` and `reCLM` usage.
