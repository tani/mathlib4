### Technical Brief: `DiffContOnCl` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `DiffContOnCl` | `structure DiffContOnCl (f : E → F) (s : Set E) : Prop` | Predicate asserting that `f` is differentiable on `s` and continuous on `closure s`. Core definition. |
| `differentiableOn` | `hf.differentiableOn : DifferentiableOn 𝕜 f s` | First projection: differentiability on the set. |
| `continuousOn` | `hf.continuousOn : ContinuousOn f (closure s)` | Second projection: continuity on the closure. |
| `DifferentiableOn.diffContOnCl` | `DifferentiableOn 𝕜 f (closure s) → DiffContOnCl 𝕜 f s` | Lifts differentiability on the *closure* to `DiffContOnCl` on `s`. |
| `Differentiable.diffContOnCl` | `Differentiable 𝕜 f → DiffContOnCl 𝕜 f s` | If `f` is globally differentiable, then it satisfies `DiffContOnCl` on *any* set `s`. |
| `IsClosed.diffContOnCl_iff` | `IsClosed s → (DiffContOnCl 𝕜 f s ↔ DifferentiableOn 𝕜 f s)` | When `s` is closed, continuity on `closure s = s` is automatic if differentiable on `s`. |
| `diffContOnCl_univ` | `DiffContOnCl 𝕜 f univ ↔ Differentiable 𝕜 f` | Special case of above for `s = univ`. |
| `diffContOnCl_const` | `DiffContOnCl 𝕜 (fun _ => c) s` | Constant functions satisfy `DiffContOnCl`. |
| `comp` | `DiffContOnCl f s → DiffContOnCl g t → MapsTo g t s → DiffContOnCl (f ∘ g) t` | Chain rule for `DiffContOnCl`. |
| `mk_ball` | `DifferentiableOn f (ball x r) → ContinuousOn f (closedBall x r) → DiffContOnCl f (ball x r)` | Construct `DiffContOnCl` on open balls using continuity on the closed ball. |
| `differentiableAt` / `differentiableAt'` | `DiffContOnCl f s → IsOpen s → x ∈ s → DifferentiableAt f x` | Local differentiability at interior points. |
| `mono` | `DiffContOnCl f s → t ⊆ s → DiffContOnCl f t` | Restriction to subsets preserves `DiffContOnCl`. |
| `add`, `sub`, `neg`, `add_const`, `sub_const`, etc. | Various algebraic closure properties | `DiffContOnCl` is closed under pointwise addition, subtraction, negation, constants, etc. |
| `smul`, `const_smul`, `smul_const` | Scalar multiplication closure | Closure under scalar multiplication (both scalar-valued and constant vectors). |
| `inv` | `DiffContOnCl f s → (∀ x ∈ closure s, f x ≠ 0) → DiffContOnCl f⁻¹ s` | Closure under pointwise inversion (nonvanishing on closure). |
| `Differentiable.comp_diffContOnCl` | `Differentiable f → DiffContOnCl g t → DiffContOnCl (f ∘ g) t` | Chain rule variant where outer function is globally differentiable. |
| `DifferentiableOn.diffContOnCl_ball` | `DifferentiableOn f U → closedBall c R ⊆ U → DiffContOnCl f (ball c R)` | Apply `DiffContOnCl` on balls when `f` is differentiable on a neighborhood. |

---

#### **2. Naming Conventions**

- **Predicate prefix**: `DiffContOnCl` — short for *Differentiable and Continuous on Closure*.
- **Projection fields**: `hf.1`, `hf.2` (i.e., `differentiableOn`, `continuousOn`).
- **Algebraic operations**:
  - `add`, `sub`, `neg`, `add_const`, `sub_const`, `const_add`, `const_sub`
  - `smul`, `const_smul`, `smul_const`
- **Closure under operations**: All operations preserve `DiffContOnCl`, with names reflecting the operation (`inv`, `comp`, `mono`, etc.).
- **Construction helpers**:
  - `mk_ball`, `diffContOnCl_const`, `Differentiable.diffContOnCl`, `DifferentiableOn.diffContOnCl_ball`
- **Equivalence lemmas**:
  - `diffContOnCl_univ`, `IsClosed.diffContOnCl_iff`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rcases` / `cases` — for case analysis (e.g., on `r = 0`).
- `rw` — rewriting definitions (e.g., `closure_ball`, `closedBall_zero`).
- `exact` / `apply` — applying lemmas or projections.
- `mono` — for monotonicity of `closure` and continuity/differentiability.
- `continuousOn_const`, `differentiableOn_const`, etc. — used implicitly via `simp` or `exact`.
- `subset_closure`, `closure_mono`, `closure_ball_subset_closedBall` — standard closure facts.
- `continuousOn.comp`, `differentiableOn.comp` — composition lemmas.
- `inv₀`, `const_smul`, `smul` — used in `inv`, `smul`, etc., proofs.

No heavy automation (e.g., `aesop`, `ring`, `linarith`) appears — proofs are mostly direct application of known lemmas.

---

#### **4. Proof Logic**

- **Structure-based reasoning**: Proofs often decompose `DiffContOnCl` into its two components (`differentiableOn`, `continuousOn`) and prove each separately.
- **Closure properties**: Most theorems follow by combining:
  - Known closure properties of `DifferentiableOn`/`ContinuousOn` (from imports),
  - Topological facts about closures (`closure_mono`, `closure_ball`, etc.).
- **Local-to-global**: `differentiableAt` lemmas use neighborhood filters (`mem_nhds`) to lift global differentiability on `s` to local differentiability at interior points.
- **Ball-specific arguments**: Use of `closure_ball x r = closedBall x r` (when `r ≠ 0`) and continuity on closed balls to infer continuity on closures.

---

#### **5. Imports**

- `Mathlib.Analysis.NormedSpace.Real` — foundational normed space theory over `ℝ`.
- `Mathlib.Analysis.Calculus.FDeriv.Add`, `Mul` — calculus lemmas for Fréchet derivative, especially for algebraic operations (`add`, `mul`, `neg`, etc.).

These imports provide:
- `DifferentiableOn`, `ContinuousOn`, `DifferentiableAt`, `Differentiable`
- Algebraic closure lemmas for differentiability/continuity (e.g., `add`, `mul`, `neg`)
- Topological facts about closures, balls, continuity, etc.

---

### Summary

`DiffContOnCl` formalizes a standard analytic condition in complex analysis: *differentiable on a domain, continuous up to the boundary*. The file establishes its basic algebraic and topological closure properties, local behavior, and interaction with composition and scalar multiplication. It is designed to support future development in complex analysis (e.g., Cauchy’s theorem, Morera’s theorem), where such conditions are ubiquitous.