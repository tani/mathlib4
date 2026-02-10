Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `toDualContinuousMultilinearMap F` | Linear map `(⨂[𝕜] i, E i) →ₗ[𝕜] (ContinuousMultilinearMap 𝕜 E F →L[𝕜] F)` sending `x ↦ (f ↦ f.lift x)` |
| `injectiveSeminorm` | Seminorm on `⨂[𝕜] i, E i`, defined as `sSup` of operator norms of `toDualContinuousMultilinearMap G x` over all normed `G` in the same universe |
| `liftEquiv` | Linear equivalence `ContinuousMultilinearMap 𝕜 E F ≃ₗ[𝕜] (⨂[𝕜] i, E i) →L[𝕜] F` induced by `lift` |
| `liftIsometry` | Isometric linear equivalence `ContinuousMultilinearMap 𝕜 E F ≃ₗᵢ[𝕜] (⨂[𝕜] i, E i) →L[𝕜] F` |
| `tprodL` | Canonical continuous multilinear map `Πᵢ Eᵢ →ₗ[𝕜] ⨂[𝕜] i, Eᵢ` (the tensor product multilinear map) |
| `mapL f` | Continuous linear map `⨂[𝕜] i, E i →L[𝕜] ⨂[𝕜] i, E' i` induced by family `f : Π i, E i →L[𝕜] E' i` |
| `mapLMultilinear` | Continuous multilinear map `Πᵢ (Eᵢ →L[𝕜] E'ᵢ) →ₗ[𝕜] (⨂[𝕜] i, Eᵢ) →L[𝕜] ⨂[𝕜] i, E'ᵢ` sending `f ↦ mapL f` |
| `norm_eval_le_injectiveSeminorm` | Main property: `∀ f x, ‖f.lift x‖ ≤ ‖f‖ * injectiveSeminorm x` |
| `injectiveSeminorm_le_projectiveSeminorm` | `injectiveSeminorm ≤ projectiveSeminorm` |
| `injectiveSeminorm_tprod_le` | `injectiveSeminorm (⨂ₜ m) ≤ ∏ ‖m i‖` |
| `mapL_opNorm` | `‖mapL f‖ ≤ ∏ ‖f i‖` |
| `mapLMultilinear_opNorm` | `‖mapLMultilinear‖ ≤ 1` |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `toDual…`: Maps into dual-like spaces (e.g., `toDualContinuousMultilinearMap`)
  - `lift…`: Related to universal property of tensor product (e.g., `liftEquiv`, `liftIsometry`)
  - `mapL…`: Maps induced by families of linear maps (e.g., `mapL`, `mapLMultilinear`, `mapLIncl`)
  - `tprodL`: Canonical multilinear map into tensor product (`tprod` + `L` for linear/continuous)

- **Suffixes**:
  - `…Equiv`: Linear isomorphisms (`≃ₗ[𝕜]`)
  - `…Isometry`: Isometric linear equivalences (`≃ₗᵢ[𝕜]`)
  - `…L`: Continuous linear maps (`→L[𝕜]`)
  - `…Multilinear`: Multilinear maps (`ContinuousMultilinearMap`)

- **Other patterns**:
  - `…Seminorm`: Seminorms or properties about seminorms
  - `…opNorm`: Operator norm estimates

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification with explicit lemmas, especially for coercions and `apply`/`comp` |
| `ext` | Extensionality (for functions, linear maps, multilinear maps) |
| `rw [...]` | Rewriting using equalities/definitions |
| `apply ...` | Applying lemmas (e.g., `norm_le`, `le_opNorm`) |
| `exact ...` | Finishing goals directly |
| `induction x using PiTensorProduct.induction_on` | Structural induction on tensor product elements |
| `change ...`, `congr'`, `convert` | Goal manipulation |
| `refine ...`, `exact?` | Proof search / construction |
| `simp only [coerce_simps]` | Handling coercion simplifications (e.g., `LinearMap.coe_mkContinuous`) |
| `norm_num`, ` positivity` | Arithmetic and positivity goals |
| `apply csSup_le`, `le_antisymm` | Bounding suprema and proving equalities via inequalities |

---

### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by induction on tensor elements using `PiTensorProduct.induction_on`, reducing to simple tensors (`tprod`) and using additivity.
- **Norm estimates**: Most norm inequalities are proven via:
  - Bounding via `injectiveSeminorm` (definitionally or via `norm_eval_le_injectiveSeminorm`)
  - Using `opNorm_le_iff` to reduce to pointwise bounds
  - Leveraging `injectiveSeminorm_tprod_le` and `injectiveSeminorm_le_projectiveSeminorm`
- **Factorization trick**: To handle universes, proofs factor maps through coimages (quotients by kernels) to stay in the same universe as the tensor product.
- **Equivalence proofs**: Linear/isometric equivalences are proven by constructing inverse maps and verifying left/right inverses via `left_inv`, `right_inv`, and simplifications.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.NormedSpace.PiTensorProduct.ProjectiveSeminorm`
- `Mathlib.LinearAlgebra.Isomorphisms`

**Core dependencies**:
- `SeminormedAddCommGroup`, `NormedSpace`
- `ContinuousMultilinearMap`, `ContinuousLinearMap`
- `PiTensorProduct` infrastructure (e.g., `lift`, `tprod`, `map`, `projectiveSeminorm`)
- `Seminorm`, `sSup`, `BddAbove`

**Universe parameters**:
- `uι`, `u𝕜`, `uE`, `uF` for type universe levels
- Universe constraints ensure set-theoretic well-definedness (e.g., `Type (max uι u𝕜 uE)` for `G`)

---

Let me know if you'd like this exported as JSON or formatted for a specific documentation tool.