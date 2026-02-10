Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `differentiableWithinAt_piLp` | `DifferentiableWithinAt 𝕜 f t y ↔ ∀ i, DifferentiableWithinAt 𝕜 (fun x => f x i) t y`<br>Characterizes differentiability within a set for functions into `PiLp` via componentwise differentiability. |
| `differentiableAt_piLp` | `DifferentiableAt 𝕜 f y ↔ ∀ i, DifferentiableAt 𝕜 (fun x => f x i) y`<br>Analogous to above, but for differentiability at a point. |
| `differentiableOn_piLp` | `DifferentiableOn 𝕜 f t ↔ ∀ i, DifferentiableOn 𝕜 (fun x => f x i) t`<br>Differentiability on a set ↔ componentwise differentiability on that set. |
| `differentiable_piLp` | `Differentiable 𝕜 f ↔ ∀ i, Differentiable 𝕜 fun x => f x i`<br>Global differentiability ↔ componentwise differentiability. |
| `hasStrictFDerivAt_piLp` | `HasStrictFDerivAt f f' y ↔ ∀ i, HasStrictFDerivAt (fun x => f x i) (PiLp.proj _ _ i ∘L f') y`<br>Characterizes strict Fréchet differentiability via projections. |
| `hasFDerivWithinAt_piLp` | `HasFDerivWithinAt f f' t y ↔ ∀ i, HasFDerivWithinAt (fun x => f x i) (PiLp.proj _ _ i ∘L f') t y`<br>Fréchet differentiability within a set ↔ componentwise versions with projected derivative. |
| `PiLp.hasStrictFDerivAt_equiv` | `HasStrictFDerivAt (WithLp.equiv ...) (PiLp.continuousLinearEquiv ...).toContinuousLinearMap f`<br>The equivalence `WithLp` ↔ `PiLp` is strictly Fréchet differentiable with derivative given by the linear equivalence. |
| `PiLp.hasStrictFDerivAt_equiv_symm` | Same as above for the inverse equivalence. |
| `PiLp.hasStrictFDerivAt_apply` | `HasStrictFDerivAt (fun f => f i) (proj p E i) f`<br>The evaluation map at index `i` is strictly Fréchet differentiable with derivative the projection. |
| `PiLp.hasFDerivAt_equiv`, `PiLp.hasFDerivAt_equiv_symm`, `PiLp.hasFDerivAt_apply` | Non-strict versions of the above (follow from strict ⇒ Fréchet). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `differentiable*`: for various notions of differentiability (`WithinAt`, `At`, `On`, bare `Differentiable`)
  - `hasFDeriv*`, `hasStrictFDerivAt*`: for existence of (strict) Fréchet derivatives
- **Suffixes**:
  - `_piLp`: indicates the theorem applies to `PiLp`-valued functions
  - `_equiv`, `_equiv_symm`: for equivalences and their inverses
  - `_apply`: for evaluation maps (application at a coordinate)
- **Projection notation**:
  - `PiLp.proj _ _ i`: projection onto the `i`-th component
  - `proj p E i`: shorthand used in `hasFDerivAt_apply`/`hasStrictFDerivAt_apply`

---

### **3. Tactic Stack**

- `rw [...]`: heavily used to rewrite using equivalences and known lemmas
- `rfl`: used after `rw` when both sides are definitionally equal
- `comp`: used in `hasStrictFDerivAt_apply` to compose derivatives
- `.of_isLittleO [...]`: used to prove strict differentiability via little-o estimates
- `congr_left`: used in `of_isLittleO` to simplify little-o conditions
- `sub_self`: used to reduce expressions like `f - f` to `0`

No heavy automation (e.g., `aesop`, `norm_cast`, `linarith`) appears—proofs are mostly structural and rely on known calculus lemmas.

---

### **4. Proof Logic**

- **Strategy**: Reduce properties of `PiLp`-valued functions to componentwise properties using the **continuous linear equivalence** `PiLp p E ≃L[𝕜] Π i, E i`.
- **Key steps**:
  1. Use `continuousLinearEquiv.comp_*_iff` lemmas to transfer differentiability/derivative properties across the equivalence.
  2. Apply known lemmas for `Π i, E i` (e.g., `differentiable_pi`, `hasFDerivWithinAt_pi'`).
  3. Simplify using `rfl` or `congr_left` + `sub_self` when needed.
- For strict differentiability of projections (`hasStrictFDerivAt_apply`), compose:
  - `hasStrictFDerivAt_equiv` (equivalence is strictly differentiable),
  - with `hasStrictFDerivAt_apply i` (evaluation is strictly differentiable on the product space),
  - via chain rule (`comp`).

---

### **5. Imports**

- `Mathlib.Analysis.Calculus.FDeriv.Prod`: for product space derivative lemmas (`differentiable_pi`, `hasFDerivWithinAt_pi'`, etc.)
- `Mathlib.Analysis.Calculus.FDeriv.Equiv`: for derivative behavior under equivalences (`comp_differentiableAt_iff`, `comp_hasStrictFDerivAt_iff`, etc.)
- `Mathlib.Analysis.Normed.Lp.PiLp`: defines `PiLp`, `WithLp`, projections, and the continuous linear equivalence `PiLp p E ≃L[𝕜] Π i, E i`

---

### **Domain-Specific AI Agent Notes**

- **Focus area**: Calculus on `PiLp` spaces (generalized `ℓ^p`-products of normed spaces).
- **Core tools**: Continuous linear equivalences, chain rule, componentwise analysis.
- **Typical tasks**: Proving differentiability/derivative formulas for function spaces built from `PiLp`, especially when reasoning about coordinate projections or equivalences with `WithLp`.
- **Pattern to recognize**: When a theorem involves `PiLp`, expect a reduction to `Π i, E i` via `continuousLinearEquiv`, followed by application of product-space lemmas.

Let me know if you'd like a formalized tactic script template or a summary of missing lemmas (e.g., higher-order derivatives).