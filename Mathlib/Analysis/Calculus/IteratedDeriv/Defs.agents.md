### Technical Metadata Brief: `Mathlib.Analysis.Calculus.IteratedDeriv`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `iteratedDeriv n f x` | `ℕ → (𝕜 → F) → 𝕜 → F` | Defines the *n*-th derivative of `f : 𝕜 → F` as the *n*-th Fréchet derivative evaluated at `(1, ..., 1)`. |
| `iteratedDerivWithin n f s x` | `ℕ → (𝕜 → F) → Set 𝕜 → 𝕜 → F` | Same as above, but restricted to a domain `s`, using `iteratedFDerivWithin`. |
| `iteratedDeriv_eq_iterate` | `iteratedDeriv n f = deriv^[n] f` | Shows that `iteratedDeriv` coincides with naive iteration of `deriv`. |
| `iteratedDerivWithin_eq_iterate` | `iteratedDerivWithin n f s x = (derivWithin _ s)^[n] f x` | Same for within-domain derivatives, under `UniqueDiffOn s`. |
| `iteratedDeriv_succ` | `iteratedDeriv (n + 1) f = deriv (iteratedDeriv n f)` | Recurrence: next derivative = derivative of current. |
| `iteratedDerivWithin_succ` | `iteratedDerivWithin (n + 1) f s x = derivWithin (iteratedDerivWithin n f s) s x` | Same for within-domain, under `UniqueDiffWithinAt`. |
| `contDiff_iff_iteratedDeriv` | `ContDiff 𝕜 n f ↔ ...` | Reformulates `ContDiff` in terms of continuity/differentiability of `iteratedDeriv m f`. |
| `contDiffOn_iff_continuousOn_differentiableOn_deriv` | `ContDiffOn 𝕜 n f s ↔ ...` | Same for `ContDiffOn`, under `UniqueDiffOn s`. |
| `norm_iteratedFDeriv_eq_norm_iteratedDeriv` | `‖iteratedFDeriv n f x‖ = ‖iteratedDeriv n f x‖` | Norms of Fréchet and 1D iterated derivatives coincide. |
| `iteratedFDeriv_apply_eq_iteratedDeriv_mul_prod` | `(iteratedFDeriv n f x m) = (∏ i, m i) • iteratedDeriv n f x` | General Fréchet derivative evaluated on vector `m` = product of components × 1D derivative. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `iteratedDeriv` / `iteratedDerivWithin`: core definitions.
  - `iteratedFDeriv` / `iteratedFDerivWithin`: multilinear Fréchet analogues.
- **Suffixes**:
  - `_eq_iterate`: equivalence with iterative definition.
  - `_eq_equiv_comp`: expresses via `piFieldEquiv`.
  - `_succ` / `_succ'`: recurrence relations.
  - `_mul_prod`: product rule for multilinear evaluation.
  - `_within_univ`: relation between within-set and global versions.
- **Predicate-style names**:
  - `contDiff_*`, `continuousOn_*`, `differentiableOn_*`: properties of `iteratedDeriv`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting definitions (e.g., `iteratedDeriv`, `iteratedFDeriv`, `piFieldEquiv`). |
| `simp` / `simp only` | Simplifying using lemmas like `iteratedDeriv_zero`, `iteratedFDerivWithin_one_apply`. |
| `ext` | Extensionality to prove function equality. |
| `convert` + `rfl` | Matching up definitions via equivalences. |
| `induction` | Structural induction on `n` (e.g., `iteratedDerivWithin_eq_iterate`). |
| `change` | Rewriting goal to match known lemmas. |
| `rwa` | Rewrite + assumption (e.g., in `insert_eq_of_mem`). |
| `linear_isometry_equiv` lemmas | `LinearIsometryEquiv.norm_map`, `comp_continuousOn_iff`, etc., to transfer properties across equivalences. |
| `aesop` (implicit) | Likely used in background automation for simple goals (not explicitly shown, but standard in Mathlib). |

---

#### **4. Proof Logic**

- **High-level strategy**:
  - Leverage the *multilinear* Fréchet derivative (`iteratedFDeriv`) as a foundation.
  - Use the canonical equivalence `ContinuousMultilinearMap.piFieldEquiv` to translate between multilinear maps and functions `𝕜 → F`.
  - Prove properties for `iteratedDeriv` by transporting known results for `iteratedFDeriv` via this equivalence.
- **Inductive structure**:
  - Many theorems (e.g., `iteratedDerivWithin_eq_iterate`) are proved by induction on `n`, using base case `n = 0` (trivial) and step case via `iteratedDerivWithin_succ`.
- **Unique differentiability assumption**:
  - Crucial for `iteratedDerivWithin` results: `UniqueDiffWithinAt` / `UniqueDiffOn` ensures that within-domain derivatives are well-behaved and match the global notion.
- **Equivalence-based reasoning**:
  - Core lemmas like `iteratedDerivWithin_eq_equiv_comp` allow moving between `iteratedDeriv` and `iteratedFDeriv`, enabling reuse of multilinear theory.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Analysis.Calculus.Deriv.Basic
  import Mathlib.Analysis.Calculus.ContDiff.Defs
  ```
- **Domain**:
  - One-dimensional calculus over nontrivially normed fields `𝕜`.
  - Target space `F` is a normed vector space over `𝕜`.
- **Key abstractions**:
  - `ContDiff` / `ContDiffOn`: smoothness classes.
  - `deriv` / `derivWithin`: first derivative.
  - `iteratedFDeriv`: multilinear *n*-th derivative.
  - `UniqueDiffOn`: ensures uniqueness of derivatives on subsets.

---

This module formalizes the *equivalence* between the abstract multilinear Fréchet derivative framework and the concrete, iterative notion of derivatives in one dimension — a foundational step for higher-dimensional calculus and manifold theory in Lean.