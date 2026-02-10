### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConformalAt` | `def ConformalAt (f : X → Y) (x : X) := ∃ f' : X →L[ℝ] Y, HasFDerivAt f f' x ∧ IsConformalMap f'` | Defines that a map `f` is conformal at point `x` if it is real Fréchet differentiable at `x` and its differential is a conformal linear map. |
| `Conformal` | `def Conformal (f : X → Y) := ∀ x : X, ConformalAt f x` | Global notion: `f` is conformal if it is conformal at every point. |
| `conformalAt_id` | `∀ x, ConformalAt id x` | Identity map is conformal at every point. |
| `conformalAt_const_smul` | `c ≠ 0 → ConformalAt (c • ·) x` | Multiplication by a nonzero scalar is conformal at every point. |
| `Subsingleton.conformalAt` | `[Subsingleton X] → ConformalAt f x` | In a subsingleton space, any map is conformal (trivial case). |
| `conformalAt_iff_isConformalMap_fderiv` | `ConformalAt f x ↔ IsConformalMap (fderiv ℝ f x)` | Equivalence between local conformality and the differential being conformal. |
| `conformalAt.comp` | `ConformalAt g (f x) → ConformalAt f x → ConformalAt (g ∘ f) x` | Composition of conformal maps is conformal. |
| `conformalAt.const_smul` | `c ≠ 0 → ConformalAt f x → ConformalAt (c • f) x` | Scaling a conformal map by a nonzero constant preserves conformality. |
| `conformal_id`, `conformal_const_smul` | Global versions of above for `Conformal` | Show identity and nonzero scalar multiplication are globally conformal. |
| `Conformal.comp`, `Conformal.const_smul` | Global closure properties | Show class of conformal maps is closed under composition and nonzero scaling. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `conformalAt_`: for theorems about *local* conformality (`ConformalAt`).
  - `conformal_`: for theorems about *global* conformality (`Conformal`).
  - `isConformalMap_`: for properties of *linear* conformal maps (imported from `ConformalLinearMap`).
- **Suffixes**:
  - `_id`, `_const_smul`, `_comp`: indicate structural properties (identity, scalar multiplication, composition).
- **Pattern**:
  - `conformalAt_*` and `conformal_*` mirror the structure of `ConformalAt` vs `Conformal`.
  - `*_of_subsingleton`, `*_of_not_differentiableAt`: handle edge cases.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rcases` / `rintro`: destruct existential or implication hypotheses.
- `rwa [hf.fderiv]`: rewrite using `fderiv` characterization.
- `by_cases h : DifferentiableAt ℝ f x`: case split on differentiability.
- `nontriviality X`: handle trivial/subsingleton cases automatically.
- `exact`, `constructor`, `intro`, `apply`: basic proof structure.
- `let ⟨f', hfderiv, hf'⟩ := hf`: destruct `ConformalAt` hypothesis.
- `h₁.differentiableAt`, `h₁.comp x hf₁`, etc.: use field accessors from structured hypotheses.

#### 4. **Proof Logic**

- **Structure**:
  - Proofs of `ConformalAt` properties typically:
    1. Introduce the differential `f'`.
    2. Show `HasFDerivAt` using calculus lemmas (`hasFDerivAt_id`, `const_smul`, `comp`).
    3. Show `IsConformalMap f'` using imported results (`isConformalMap_id`, `isConformalMap_const_smul`, `comp`).
  - For equivalences like `conformalAt_iff_isConformalMap_fderiv`:
    - One direction uses `fderiv` uniqueness (via `hf.fderiv`).
    - The other splits on differentiability: if differentiable, use `fderiv`; else, use `fderiv_zero_of_not_differentiableAt` and contradiction with `IsConformalMap.ne_zero`.
- **Induction/Case Analysis**:
  - Not used here — mostly direct construction and case splits on differentiability or subsingleness.

#### 5. **Imports**

- `Mathlib.Analysis.NormedSpace.ConformalLinearMap`: defines `IsConformalMap` for linear maps (core to `ConformalAt`).
- `Mathlib.Analysis.Calculus.FDeriv.Add`: provides calculus tools like `hasFDerivAt_id`, `hasFDerivAt_of_subsingleton`, `fderiv_zero_of_not_differentiableAt`, etc.

> **Note**: The file avoids inner product structure (hence no `InnerProductSpace` import), focusing on general real normed spaces. Conformality is defined via linear differential being conformal (i.e., scalar multiple of an isometry), *not* requiring orientation preservation — complex conjugation is conformal here.