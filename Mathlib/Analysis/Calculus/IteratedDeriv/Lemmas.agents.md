Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `iteratedDerivWithin` | `ℕ → (𝕜 → F) → Set 𝕜 → 𝕜 → F` | n-th iterated derivative of `f` within set `s` at point `x` |
| `iteratedDeriv` | `ℕ → (𝕜 → F) → 𝕜 → F` | Global n-th iterated derivative (i.e., within `univ : Set 𝕜`) |
| `iteratedDerivWithin_congr` | `Set.EqOn f g s → Set.EqOn (iteratedDerivWithin n f s) (iteratedDerivWithin n g s) s` | If `f = g` on `s`, then their iterated derivatives agree on `s` |
| `iteratedDerivWithin_add` | `ContDiffOn n f s → ContDiffOn n g s → iteratedDerivWithin n (f + g) s x = ...` | Linearity of iterated derivative for sums |
| `iteratedDerivWithin_const_add` | `0 < n → iteratedDerivWithin n (c + f) s x = iteratedDerivWithin n f s x` | Constant addition doesn’t affect higher derivatives |
| `iteratedDerivWithin_const_smul` | `iteratedDerivWithin n (c • f) s x = c • iteratedDerivWithin n f s x` | Scalar multiplication commutes with iterated derivative |
| `iteratedDerivWithin_neg` | `iteratedDerivWithin n (-f) s x = -iteratedDerivWithin n f s x` | Negation commutes with iterated derivative |
| `iteratedDerivWithin_sub` | `ContDiffOn n f s → ContDiffOn n g s → ...` | Subtraction behaves linearly |
| `iteratedDerivWithin_comp_const_smul` | `ContDiffOn n f s → c ∈ 𝕜 → MapsTo (c * ·) s s → ...` | Chain rule for scaling argument: derivative scales by `c^n` |
| `iteratedDeriv_add`, `iteratedDeriv_neg`, etc. | Analogues of above for global `iteratedDeriv` | Derived from `iteratedDerivWithin` using `univ` |
| `iteratedDeriv_comp_const_smul` (global) | `ContDiff n f → iteratedDeriv n (f ∘ (c * ·)) = c^n • (iteratedDeriv n f ∘ (c * ·))` | Global scaling chain rule |
| `iteratedDeriv_comp_neg` | `iteratedDeriv n (f ∘ (-·)) = (-1)^n • (iteratedDeriv n f ∘ (-·))` | Chain rule for negation (special case of scaling by `-1`) |
| `iteratedDeriv_comp_const_add`, `iteratedDeriv_comp_add_const` | Translation invariance of iterated derivative | Shows `iteratedDeriv n (f(s + ·)) = iteratedDeriv n f (s + ·)` |
| `Filter.EventuallyEq.iteratedDeriv_eq` | `f =ᶠ[𝓝 x] g → iteratedDeriv n f x = iteratedDeriv n g x` | Iterated derivatives depend only on germ at `x` |
| `Set.EqOn.iteratedDeriv_of_isOpen` | `Set.EqOn f g s ∧ IsOpen s → Set.EqOn (iteratedDeriv n f) (iteratedDeriv n g) s` | Equality on open sets lifts to derivatives |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `iteratedDerivWithin_`: for local (within-set) iterated derivatives.
  - `iteratedDeriv_`: for global (on `univ`) iterated derivatives.
  - `contDiff_`, `contDiffOn_`: related to continuity/differentiability assumptions.
- **Suffixes**:
  - `_add`, `_sub`, `_neg`, `_smul`, `_mul`: indicate behavior under algebraic operations.
  - `_const_`: indicates constant terms involved (e.g., `const_add`, `const_smul`).
  - `_comp_`: indicates composition with a function (e.g., `comp_const_smul`, `comp_neg`).
- **Special**:
  - `_congr`: congruence lemmas (equality under pointwise equality).
  - `_of_succ`: used in inductive proofs to reduce from `n+1` to `n`.
  - `_succ`, `_zero`: base and step cases in induction.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `induction n with | zero | succ n IH =>` — standard induction on natural numbers.
- `rw [...]` — rewriting using lemmas/definitions (especially `iteratedDerivWithin_succ`, `derivWithin`, etc.).
- `simp only [...]` — simplification with specific lemmas (often `iteratedDerivWithin`, `derivWithin`, `smul_eq_mul`, etc.).
- `exact ...` / `refine ...` — constructing proofs using previously established facts.
- `intro ...` / `intro y hy` — introducing variables and hypotheses.
- `have : ... := ...` — intermediate claims, often for differentiability or uniqueness.
- `filter_upwards [...]` — for neighborhood/filter-based arguments (in `EventuallyEq.iteratedDeriv_eq`).
- `funext` — extensionality for functions (used in translation invariance proofs).
- `linarith`, `ring`, `simp` — arithmetic simplifications (especially for powers like `c ^ n`, `(-1)^n`).

---

### **4. Proof Logic**

- **Inductive structure**: Most proofs proceed by induction on `n : ℕ`, with base case `n = 0` (using `iteratedDerivWithin_zero`) and inductive step using `iteratedDerivWithin_succ`.
- **Differentiability assumptions**: Often require `ContDiffOn n f s` or `ContDiff n f` to ensure existence of derivatives and applicability of lemmas like `differentiableOn_iteratedDerivWithin`.
- **Uniqueness of diff.**: `UniqueDiffOn` and `UniqueDiffWithinAt` assumptions are used to apply `derivWithin_congr`, `derivWithin`, etc.
- **Congruence lemmas**: Many proofs reduce to showing pointwise equality via `derivWithin_congr` or `iteratedDerivWithin_congr`.
- **Translation/scaling lemmas**: Proven via induction + chain rule (`deriv_comp_const_smul`, `deriv_comp_add_const`, etc.).
- **Germ-based reasoning**: For `EventuallyEq.iteratedDeriv_eq`, uses filter theory (`nhdsWithin_le_nhds`, `iteratedFDerivWithin_eq`).

---

### **5. Imports**

Core dependencies defining the scope:
- `Mathlib.Analysis.Calculus.ContDiff.Basic` — continuity and differentiability classes (`ContDiff`, `ContDiffOn`).
- `Mathlib.Analysis.Calculus.Deriv.Mul` — product rule and related derivative lemmas.
- `Mathlib.Analysis.Calculus.Deriv.Shift` — translation invariance of derivatives.
- `Mathlib.Analysis.Calculus.IteratedDeriv.Defs` — definitions and basic properties of `iteratedDerivWithin`.

> **Note**: This file extends `IteratedDeriv.Defs` with results requiring richer analysis infrastructure (e.g., `ContDiff`, `UniqueDiffOn`, `derivWithin` properties).

---

Let me know if you'd like a diagram of dependencies or a categorized list of lemmas by use-case (e.g., linearity, chain rule, invariance).