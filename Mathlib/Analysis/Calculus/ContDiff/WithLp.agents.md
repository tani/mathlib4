**Technical Metadata Brief: Lean 4 File — `Mathlib.Analysis.Calculus.ContDiff.PiLp`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `contDiffWithinAt_piLp` | `ContDiffWithinAt 𝕜 n f t y ↔ ∀ i, ContDiffWithinAt 𝕜 n (fun x => f x i) t y` | Characterizes *n*-times continuous differentiability *within* a set `t` at a point `y` for functions into `PiLp p E` via componentwise differentiability. |
| `contDiffAt_piLp` | `ContDiffAt 𝕜 n f y ↔ ∀ i, ContDiffAt 𝕜 n (fun x => f x i) y` | Same as above, but for *pointwise* differentiability at `y`. |
| `contDiffOn_piLp` | `ContDiffOn 𝕜 n f t ↔ ∀ i, ContDiffOn 𝕜 n (fun x => f x i) t` | Characterizes *n*-times continuous differentiability *on* a set `t`. |
| `contDiff_piLp` | `ContDiff 𝕜 n f ↔ ∀ i, ContDiff 𝕜 n fun x => f x i` | Global version: differentiability on the whole domain. |

All four theorems rely on:
- `PiLp.continuousLinearEquiv p 𝕜 E`: the canonical continuous linear equivalence between `H → PiLp p E` and `∀ i, H → E i`.
- Standard lemmas `contDiffWithinAt_pi`, `contDiffAt_pi`, etc., from `Mathlib.Analysis.Calculus.ContDiff.Basic`.

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `contDiffWithinAt_`, `contDiffAt_`, `contDiffOn_`, `contDiff_`: standard Lean/Lean Mathlib naming for differentiability variants.
  - `piLp_`: indicates the theorem applies specifically to the `PiLp` space (product of normed spaces with ℓᵖ norm).
- **Suffixes**:
  - `_piLp`: used to distinguish versions specialized to `PiLp` from generic product-space results (`_pi`).
- **Variable naming**:
  - `f`, `f'`: typical for functions and their derivatives.
  - `t`, `y`: standard for sets and points in differentiability contexts.
  - `ι`, `E`, `H`: standard for index type, family of spaces, and domain space.

---

### 3. **Tactic Stack**

- `rw [...]`: used repeatedly to rewrite using equivalences and known lemmas.
- `rfl`: used after rewriting to close trivial equalities (e.g., identity of terms after `rw`).
- Implicit use of:
  - `continuousLinearEquiv.comp_contDiffWithinAt_iff`, etc., from `Mathlib.Analysis.Normed.Space.ContDiff` — these are *iff*-friendly lemmas for composition with continuous linear equivalences.

No explicit tactic annotations (e.g., `simp`, `aesop`, `ring`) appear in the proof terms — the proofs are purely equational, leveraging existing `iff`-based lemmas.

---

### 4. **Proof Logic**

- **Strategy**: Each theorem follows the same pattern:
  1. Use the fact that `PiLp p E` is continuously linearly equivalent to `∀ i, E i`.
  2. Apply the general lemma `continuousLinearEquiv.comp_contDiffWithinAt_iff` (and analogues) to reduce differentiability of `f` to that of `f` composed with the equivalence.
  3. Use the known product-space characterization (`contDiffWithinAt_pi`, etc.) to reduce to componentwise differentiability.
  4. Conclude via `rfl` (since the right-hand sides match exactly).

- **No induction or case analysis** is needed — the proofs are purely equational and rely on pre-established categorical/analytic properties of `PiLp`.

---

### 5. **Imports**

- `Mathlib.Analysis.Calculus.ContDiff.Basic`: provides:
  - `ContDiffWithinAt`, `ContDiffAt`, `ContDiffOn`, `ContDiff` definitions.
  - `contDiffWithinAt_pi`, `contDiffAt_pi`, etc.
  - `continuousLinearEquiv.comp_contDiffWithinAt_iff`, etc.
- `Mathlib.Analysis.Normed.Lp.PiLp`: provides:
  - `PiLp` type and its normed space structure.
  - `PiLp.continuousLinearEquiv`: the key equivalence `H → PiLp p E ≃L[𝕜] ∀ i, H → E i`.

These imports define the ambient context: calculus on normed spaces and the structure of ℓᵖ products.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a diagram of the logical dependencies.