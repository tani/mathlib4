Here's a structured technical brief extracted from the provided Lean 4 file (`Analysis/Calculus/FDeriv/Basic.lean`), focusing on formalization metadata for domain-specific AI agent training:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasFDerivAtFilter` | `f : E → F → f' : E →L[𝕜] F → x : E → L : Filter E → Prop` | Generalized Fréchet derivative along a filter `L`; defined via `isLittleOTVS`. |
| `HasFDerivWithinAt` | `f : E → F → f' : E →L[𝕜] F → s : Set E → x : E → Prop` | Derivative of `f` at `x` *within* set `s`; uses filter `𝓝[s] x`. |
| `HasFDerivAt` | `f : E → F → f' : E →L[𝕜] F → x : E → Prop` | Standard Fréchet derivative at `x`; special case of `HasFDerivWithinAt` with `s = univ`. |
| `HasStrictFDerivAt` | `f : E → F → f' : E →L[𝕜] F → x : E → Prop` | Strict differentiability: `f y - f z - f'(y - z) = o(y - z)` as `y, z → x`. |
| `DifferentiableWithinAt` | `f : E → F → s : Set E → x : E → Prop` | Existence (not uniqueness) of a derivative within `s` at `x`. |
| `DifferentiableAt` | `f : E → F → x : E → Prop` | Existence of a derivative at `x`. |
| `DifferentiableOn` | `f : E → F → s : Set E → Prop` | Differentiability within `s` at all points of `s`. |
| `Differentiable` | `f : E → F → Prop` | Global differentiability (at all points). |
| `fderivWithin` | `f : E → F → s : Set E → x : E → E →L[𝕜] F` | *Choice* of derivative within `s` at `x`, or `0` if none exists or zero is a candidate. |
| `fderiv` | `f : E → F → x : E → E →L[𝕜] F` | `fderivWithin f univ x`; global derivative choice. |
| `UniqueDiffWithinAt` | `s : Set E → x : E → Prop` | Ensures uniqueness of derivative within `s` at `x` (tangent cone spans densely). |
| `UniqueDiffOn` | `s : Set E → Prop` | Uniform uniqueness of derivative on all points of `s`. |

#### Key Theorems:
| Name | Statement | Use |
|------|-----------|-----|
| `hasFDerivAtFilter_iff_isLittleO` | Equivalence of `HasFDerivAtFilter` and `isLittleO` formulation | Simplifies proofs using normed space analysis. |
| `hasStrictFDerivAt_iff_isLittleO` | Same for strict derivative | Enables use of `isLittleO` machinery. |
| `HasFDerivWithinAt.unique_on` | Two derivatives agree on `tangentConeAt s x` | Preliminary step toward uniqueness. |
| `UniqueDiffWithinAt.eq` | Under `UniqueDiffWithinAt`, derivative is unique | Justifies `fderivWithin` well-definedness. |
| `HasFDerivAtFilter.lim` | Convergence of difference quotients to derivative | Technical tool for tangent cone arguments. |
| `HasStrictFDerivAt.exists_lipschitzOnWith` | Strict differentiability ⇒ local Lipschitz | Used in inverse function theorem. |
| `fderiv.fderiv` | If `HasFDerivAt f f' x`, then `fderiv f x = f'` | Confirms `fderiv` picks correct derivative when unique. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `hasFDeriv`: for derivative existence (`HasFDerivAt`, `HasFDerivWithinAt`, `HasStrictFDerivAt`).
  - `differentiable`: for differentiability existence (`DifferentiableAt`, `DifferentiableWithinAt`, etc.).
  - `fderiv`: for derivative *selection* (`fderiv`, `fderivWithin`).
  - `uniqueDiff`: for uniqueness conditions (`UniqueDiffWithinAt`, `UniqueDiffOn`).

- **Suffixes**:
  - `WithinAt`: derivative within a set at a point.
  - `At`: derivative at a point (no set restriction).
  - `On`: differentiability on a set (universal quantification over points).
  - `Filter`: filter-based generalization (e.g., `HasFDerivAtFilter`).

- **Other patterns**:
  - `mono`, `insert`, `diff_singleton`, `inter`: indicate set-theoretic operations on domains.
  - `of_`, `of_nhdsWithin_eq_bot`, `of_nmem_closure`: “sufficient condition” lemmas.
  - `congr_nhds`, `congr`: lemmas about equivalence under neighborhood equality.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: for rewriting definitions (e.g., `hasFDerivWithinAt_univ`, `differentiableWithinAt_univ`).
- `rw`: for applying equivalences (e.g., `hasFDerivAtFilter_iff_isLittleO`).
- `exact`, `apply`, `intro`: standard proof construction.
- `conv`: for targeted rewriting (e.g., in `HasFDerivWithinAt.lim`).
- `tendsto_*` lemmas: `tendsto_nhds_unique`, `tendsto_add`, `tendsto_mul`, etc.
- `isLittleO_*`, `isBigO_*`: tactics for asymptotic analysis (`isLittleO_iff`, `isBigOWith`, `smul_isLittleO`).
- `ext`: extensionality for functions/linear maps.
- `split_ifs`, `if_pos`, `if_neg`: for reasoning about `if-then-else` definitions like `fderivWithin`.
- `rwa`, `convert`, `dsimp`: for fine-grained rewriting and simplification.

---

### **4. Proof Logic**

Typical proof structure:
1. **Unfold definitions**: Replace `HasFDerivWithinAt`, `DifferentiableAt`, etc., with their `isLittleO` or `tendsto` characterizations.
2. **Reduce to asymptotic analysis**: Use `isLittleO` lemmas (`mono`, `smul`, `add`, `comp_tendsto`, `congr`) to manipulate error terms.
3. **Leverage filter calculus**: Use properties of `𝓝`, `𝓝[s]`, `inf`, `sup`, `union`, `inter`, `insert`, `diff`.
4. **Uniqueness via tangent cone**: Show two derivatives agree on `tangentConeAt s x`, then apply `UniqueDiffWithinAt.eq`.
5. **Choice & irreducibility**: Use `Classical.choose` for existence, and `fderivWithin`/`fderiv` definitions to select a derivative (with fallback to `0`).
6. **Local-to-global**: Prove properties on neighborhoods (`IsOpen`, `mem_nhds`) and extend via `DifferentiableOn.eventually_differentiableAt`, etc.

---

### **5. Imports**

Core dependencies defining scope:
- `Mathlib.Analysis.Calculus.TangentCone`: defines `tangentConeAt`, `UniqueDiffWithinAt`, `UniqueDiffOn`.
- `Mathlib.Analysis.NormedSpace.OperatorNorm.Asymptotics`: asymptotics in normed spaces (e.g., `isLittleO`, `isBigO`).
- `Mathlib.Analysis.Asymptotics.TVS`: `isLittleOTVS`, filter-based asymptotics in topological vector spaces.

> **Note**: The file avoids committing to a specific normed space setting early; it starts in general TVS (`TVS` section) before specializing to normed spaces (`section` with `NormedAddCommGroup`, `NormedSpace`).

---

Let me know if you'd like this exported as JSON or YAML for ingestion into a domain-specific AI agent pipeline.