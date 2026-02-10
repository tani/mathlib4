### Technical Brief: Local Extremum and Line Derivatives in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type Signature | Purpose |
|------|----------------|---------|
| `IsExtrFilter` | `IsExtrFilter f l a` | `f` has a local extremum at `a` with respect to filter `l`. Generalizes local min/max via filters. |
| `HasLineDerivAt` | `HasLineDerivAt ℝ f f' a b` | `f` has directional (line) derivative `f'` at `a` in direction `b`. |
| `lineDeriv` | `lineDeriv ℝ f a b` | The line (directional) derivative of `f` at `a` in direction `b`, defined as `f'` when it exists, else 0. |
| `IsExtrOn` | `IsExtrOn f s a` | `f` has an extremum at `a` *on* set `s`. |
| `IsMinOn` / `IsMaxOn` | `IsMinOn f s a`, `IsMaxOn f s a` | `f` has a minimum/maximum at `a` on set `s`. |
| `HasLineDerivWithinAt` | `HasLineDerivWithinAt ℝ f f' s a b` | Directional derivative *within* set `s` at `a` in direction `b`. |
| `lineDerivWithin` | `lineDerivWithin ℝ f s a b` | Line derivative within `s`, defined analogously to `lineDeriv`. |

**Main Theorems (selected):**

| Theorem | Statement | Intuition |
|---------|-----------|-----------|
| `IsExtrFilter.hasLineDerivAt_eq_zero` | `IsExtrFilter f l a → HasLineDerivAt ℝ f f' a b → Tendsto (λ t ↦ a + t • b) (𝓝 0) l → f' = 0` | If `f` has an extremum at `a` along filter `l`, and the line `a + t•b` approaches `a` along `l`, then the line derivative must vanish. |
| `IsExtrFilter.lineDeriv_eq_zero` | `IsExtrFilter f l a → Tendsto (λ t ↦ a + t • b) (𝓝 0) l → lineDeriv ℝ f a b = 0` | Same as above, but for the *value* of the line derivative (uses classical choice to handle non-differentiable case). |
| `IsLocalExtr.lineDeriv_eq_zero` | `IsLocalExtr f a → lineDeriv ℝ f a = 0` | Classical Fermat’s theorem: local extremum ⇒ all line derivatives vanish. |
| `IsExtrOn.hasLineDerivWithinAt_eq_zero` | `IsExtrOn f s a → HasLineDerivWithinAt ℝ f f' s a b → (∀ᶠ t ∈ 𝓝 0, a + t • b ∈ s) → f' = 0` | Extremum on `s` + curve stays in `s` near `0` ⇒ line derivative within `s` is zero. |

---

#### **2. Naming Conventions**

- **`isExtr` / `isMin` / `isMax`**: Prefix for extremum-related predicates (`IsExtrFilter`, `IsMinOn`, etc.).
- **`hasLineDerivAt` / `hasLineDerivWithinAt`**: Prefix `has_` for existence of a derivative (constructive data).
- **`lineDeriv` / `lineDerivWithin`**: No prefix — the *value* of the derivative (function returning `ℝ`).
- **`_eq_zero` suffix**: Theorems asserting that a derivative equals zero under extremum assumptions.
- **`_within` suffix**: Refers to *within-set* variants (e.g., `lineDerivWithin`, `HasLineDerivWithinAt`).
- **`•` notation**: Scalar multiplication (`t • b`), used in parametrized lines.

---

#### **3. Tactic Stack**

- **`simp_rw` / `simp`**: Used to simplify goals using definitions (e.g., `simp` in `lineDeriv_zero_of_not_lineDifferentiableAt`).
- **`classical`**: Enables classical logic for case analysis on differentiability (e.g., `if hd : ... then ... else ...`).
- **`fun_prop`**: From `TopologicalSpace`/`Filter` infrastructure, to prove continuity/tenderness of maps (e.g., `Continuous.tendsto'`).
- **`exact` / `apply`**: Direct proof application (e.g., `exact h.hasLineDerivAt_eq_zero ...`).
- **`funext`**: To prove equality of functions (e.g., `lineDeriv ℝ f a = 0` is a function of `b`, so `funext b` is used).
- **`tendsto_principal.2`**: Converts a set-based eventual containment (`∀ᶠ x in principal s, ...`) to a filter tendsto statement.

---

#### **4. Proof Logic**

- **Structure**: All proofs follow a *unified pattern*:
  1. **Case split** on differentiability (using `if hd : ... then ... else ...`).
  2. If differentiable: apply a stronger lemma (e.g., `hasLineDerivAt_eq_zero`) using `hd.hasLineDerivAt`.
  3. If not differentiable: use a lemma like `lineDeriv_zero_of_not_lineDifferentiableAt` (which returns 0 by definition).
- **Key logical flow**:
  - `IsExtrFilter` ⇒ `IsLocalExtr` (via `comp_tendsto`) ⇒ `hasDerivAt_eq_zero` (classical calculus).
  - For *within-set* versions: use `HasLineDerivWithinAt` ⇒ `HasLineDerivAt'` (extension to ambient space) + `tendsto_principal`.
- **Induction**: Not used — all proofs are direct case analysis + composition of existing lemmas.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.LocalExtr.Basic`: Defines `IsLocalExtr`, `IsLocalMin`, `IsLocalMax`, and classical `hasDerivAt_eq_zero`.
  - `Mathlib.Analysis.Calculus.LineDeriv.Basic`: Defines `lineDeriv`, `HasLineDerivAt`, `LineDifferentiableAt`, etc.
- **Open scopes**:
  - `Topology`: For filters (`𝓝`, `tendsto`, `principal`), continuity (`Continuous`), etc.
- **Assumptions**:
  - `E` is a real module (`AddCommGroup`, `Module ℝ E`).
  - In later section: topological space with `ContinuousAdd` and `ContinuousSMul` (for `IsLocalExtr` variants).

---

#### **Summary**

This file formalizes **Fermat’s theorem for line derivatives** in full generality: extremum (local, on a set, min/max) ⇒ all line derivatives vanish, provided the direction stays in the domain (or filter). The structure is highly uniform, leveraging existing calculus infrastructure (`LocalExtr`, `LineDeriv`) and filter-theoretic reasoning. The proofs are mostly *reflexive* — reducing to known results via composition and case analysis — reflecting Lean’s emphasis on modularity and reuse.