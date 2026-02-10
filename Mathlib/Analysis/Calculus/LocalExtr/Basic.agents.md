### Technical Brief: Local Extrema of Differentiable Functions (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `posTangentConeAt` | `Set E → E → Set E` | Defines the *positive tangent cone* to a set `s` at a point `x`, used to model directions along which one can approach `x` within `s` with a "positive speed" (i.e., scaling factors → ∞). |
| `mem_posTangentConeAt_of_frequently_mem` | `frequently x ∈ s ⇒ y ∈ posTangentConeAt s x` | Embeds frequently approaching points into the positive tangent cone via sequences. |
| `mem_posTangentConeAt_of_segment_subset` | `[x -[ℝ] x + y] ⊆ s ⇒ y ∈ posTangentConeAt s x` | If the segment from `x` to `x + y` lies in `s`, then `y` is in the positive tangent cone. |
| `sub_mem_posTangentConeAt_of_segment_subset` | `segment ℝ x y ⊆ s ⇒ y - x ∈ posTangentConeAt s x` | Variant for the segment between two points. |
| `posTangentConeAt_univ` | `posTangentConeAt univ a = univ` | Trivial case: whole space has full tangent cone. |
| `IsLocalMaxOn.hasFDerivWithinAt_nonpos` | `IsLocalMaxOn f s a → HasFDerivWithinAt f f' s a → y ∈ posTangentConeAt s a ⇒ f' y ≤ 0` | Core inequality: derivative in any tangent direction ≤ 0 at a local max. |
| `IsLocalMaxOn.hasFDerivWithinAt_eq_zero` | Same as above + `-y ∈ posTangentConeAt s a ⇒ f' y = 0` | If both `y` and `-y` are tangent, derivative vanishes. |
| `IsLocalMax.hasFDerivAt_eq_zero` | `IsLocalMax f a → HasFDerivAt f f' a ⇒ f' = 0` | **Fermat’s Theorem** (FDeriv version): derivative at local extremum is zero. |
| `IsLocalMax.fderiv_eq_zero` | `IsLocalMax f a ⇒ fderiv ℝ f a = 0` | Same, using `fderiv`. |
| `IsLocalExtr.hasFDerivAt_eq_zero` | `IsLocalExtr f a → HasFDerivAt f f' a ⇒ f' = 0` | Extremum (min or max) ⇒ derivative zero. |
| `IsLocalExtr.fderiv_eq_zero` | `IsLocalExtr f a ⇒ fderiv ℝ f a = 0` | Same for `fderiv`. |
| `IsLocalMax.hasDerivAt_eq_zero` / `deriv_eq_zero` | `IsLocalMax f a → HasDerivAt f f' a ⇒ f' = 0` | Real-line version of Fermat’s theorem (derivative version). |
| `one_mem_posTangentConeAt_iff_mem_closure` | `1 ∈ posTangentConeAt s a ↔ a ∈ closure (Ioi a ∩ s)` | Characterization of when `1` lies in the positive tangent cone on `ℝ`. |
| `one_mem_posTangentConeAt_iff_frequently` | `1 ∈ posTangentConeAt s a ↔ ∃ᶠ x in 𝓝[>] a, x ∈ s` | Equivalent formulation using frequently in the right neighborhood. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLocal*`: e.g., `IsLocalMax`, `IsLocalMin`, `IsLocalExtr`.
  - `hasFDeriv*`, `hasDeriv*`: for differentiability assumptions.
  - `fderiv*`, `deriv*`: for versions using the actual derivative operators.
  - `*Within*`: for local behavior relative to a subset `s`.
  - `*On*`: for restrictions to subsets (e.g., `IsLocalMaxOn`).
- **Suffixes**:
  - `_nonpos`, `_nonneg`, `_eq_zero`: indicate sign or vanishing of derivative.
  - `_iff_*`: for equivalence lemmas (e.g., `one_mem_posTangentConeAt_iff_mem_closure`).
- **Negation symmetry**:
  - `h.neg` used to derive min results from max ones (e.g., `h.neg.hasFDerivWithinAt_nonpos`).
- **Deprecation alias**:
  - `mem_posTangentConeAt_of_segment_subset'` (deprecated alias for `segment_subset` version).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rcases`, `obtain`, `rw`, `simp`, `simp_rw`
  - `filter_upwards`, `eventually`, `tendsto_*` lemmas (`tendsto_const_nhds`, `tendsto_add`, etc.)
  - `apply`, `exact`, `intro`, `ext`
- **Analysis-specific**:
  - `le_of_tendsto`, `le_antisymm`, `sub_nonpos.2`, `mul_nonpos_of_nonneg_of_nonpos`
  - `tangentConeAt.lim_zero`, `hasFDerivWithinAt.lim`
- **Classical reasoning**:
  - `classical`, `if ... then ... else ...` (for `fderiv`/`deriv` versions where differentiability is not assumed)
- **Ring/field simplifications**:
  - `ring`, `norm_num`, `linarith` (implicit via `aesop`-style reasoning in `le_of_tendsto` steps)
- **Filter/neighborhood reasoning**:
  - `mem_closure_of_tendsto`, `frequently_map`, `nhdsWithin`, `map_add_left_nhds_zero`

---

#### **4. Proof Logic**

- **Structure**:
  - **Induction/sequence extraction**: For `posTangentConeAt` membership, proofs often unpack the definition via `rcases` to get sequences `c : ℕ → ℝ`, `d : ℕ → E`.
  - **Tendsto manipulations**: Use convergence of `c n → ∞` and `c n • d n → y` to derive convergence of `a + d n → a` within `s`, then apply local extremum condition.
  - **Sign analysis**: For `≤ 0` or `= 0`, combine inequalities from `y` and `-y` via `le_antisymm`.
  - **Reduction to real line**: For `ℝ`-valued functions, reduce to `fderiv` versions using `hasDerivAt_iff_hasFDerivAt` and evaluation at `1`.
  - **Case splitting on differentiability**: For `fderiv`/`deriv` versions, split on whether `f` is differentiable; if not, use `fderivWithin_zero_of_not_differentiableWithinAt` or `deriv_zero_of_not_differentiableAt`.
  - **Symmetry via negation**: Min results derived from max via `h.neg`.

- **Typical flow**:
  1. Unpack `y ∈ posTangentConeAt s a` → sequences `c, d`.
  2. Use `IsLocalMaxOn` to get `f(a + d n) ≤ f(a)` eventually.
  3. Multiply by `c n ≥ 0` (eventually), get `c n (f(a + d n) - f(a)) ≤ 0`.
  4. Pass to limit using `HasFDerivWithinAt`’s linear approximation property (`hf.lim`).
  5. Conclude inequality; if both `y` and `-y` are tangent, apply antisymmetry.

---

#### **5. Imports**

- `Mathlib.Analysis.Calculus.Deriv.Add`: Provides foundational calculus tools (e.g., `HasFDerivWithinAt`, `fderivWithin`, `deriv`, differentiability lemmas).
- Implicit dependencies (via `NormedAddCommGroup`, `NormedSpace ℝ`, `Filter`, `Set`, `Topologie`, `Convex`):
  - `Mathlib.Analysis.NormedSpace.Basic`
  - `Mathlib.Topology.Basic`, `Mathlib.Topology.NhdsBasic`
  - `Mathlib.MeasureTheory.Integration.SimpleFunc`, `Mathlib.Topology.Segment`
  - `Mathlib.Algebra.Group.Basic`, `Mathlib.Analysis.Calculus.FDeriv.Basic`

> **Note**: The file is part of `Mathlib`, and builds on its robust theory of normed spaces, filters, and calculus. The `posTangentConeAt` definition is a workaround for the absence of a theory of normed semifields (e.g., `ℝ≥0`), as noted in the docstring.

--- 

Let me know if you'd like a diagram of the theorem dependencies or a summary of how this fits into the broader `Mathlib` calculus library.