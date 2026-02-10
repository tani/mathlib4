### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `RieszExtension.step` | `∀ (s : ConvexCone ℝ E) (f : E →ₗ.[ℝ] ℝ), (∀ x : f.domain, (x : E) ∈ s → 0 ≤ f x) → (∀ y, ∃ x : f.domain, (x : E) + y ∈ s) → f.domain ≠ ⊤ → ∃ g, f < g ∧ ∀ x : g.domain, (x : E) ∈ s → 0 ≤ g x` | Shows that a partially defined linear functional `f`, nonnegative on a convex cone `s ∩ dom(f)` and dense modulo `s`, can be extended one dimension further without violating nonnegativity. Core inductive step in Zorn’s lemma argument. |
| `RieszExtension.exists_top` | `∀ (p : E →ₗ.[ℝ] ℝ), (∀ x : p.domain, (x : E) ∈ s → 0 ≤ p x) → (∀ y, ∃ x : p.domain, (x : E) + y ∈ s) → ∃ q ≥ p, q.domain = ⊤ ∧ ∀ x : q.domain, (x : E) ∈ s → 0 ≤ q x` | Uses Zorn’s lemma to extend `f` to a maximal (hence total) linear functional on the whole space, still nonnegative on `s`. |
| `riesz_extension` | `∀ (s : ConvexCone ℝ E) (f : E →ₗ.[ℝ] ℝ), (∀ x : f.domain, (x : E) ∈ s → 0 ≤ f x) → (∀ y, ∃ x : f.domain, (x : E) + y ∈ s) → ∃ g : E →ₗ[ℝ] ℝ, (∀ x : f.domain, g x = f x) ∧ ∀ x ∈ s, 0 ≤ g x` | Final statement of M. Riesz extension theorem: extension to a globally defined linear functional nonnegative on `s`. |
| `exists_extension_of_le_sublinear` | `∀ (f : E →ₗ.[ℝ] ℝ) (N : E → ℝ), (∀ c > 0, ∀ x, N(c • x) = c * N x) → (∀ x y, N(x + y) ≤ N x + N y) → (∀ x : f.domain, f x ≤ N x) → ∃ g : E →ₗ[ℝ] ℝ, (∀ x : f.domain, g x = f x) ∧ ∀ x, g x ≤ N x` | Hahn–Banach theorem: extension of a linear functional dominated by a sublinear map `N`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `riesz_`: for theorems related to M. Riesz extension.
  - `exists_extension_of_le_sublinear`: descriptive naming for Hahn–Banach.
  - `step`, `exists_top`: internal helper lemmas in the Zorn’s lemma proof.
- **Suffixes**:
  - `_nonneg`, `_dense`: indicate assumptions about nonnegativity and density modulo cone.
  - `_hom`, `_add`: for homogeneity and subadditivity of `N`.
- **Variables**:
  - `s`: convex cone.
  - `f`, `g`: linear maps (often partial, via `→ₗ.[ℝ]`).
  - `N`: sublinear map.
  - `p`, `q`, `r`: partial linear maps (submodules as domains).
  - `x`, `y`: elements of `E` or product space `E × ℝ`.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rcases`, `rintro`, `obtain`: for destructuring existential/universal hypotheses.
  - `convert`, `rw`, `rwa`: rewriting using equalities/inequalities.
  - `simp only`, `simp`: simplification with precise lemmas.
  - `exact`, `by exact`: for direct proof terms.
  - `contrapose!`: for contrapositive reasoning.
  - `zorn_le_nonempty₀`: Zorn’s lemma application over a preorder with upper bounds.
  - `calc`: chaining inequalities/equalities.
  - `rwa`, `rw [← ...]`: rewriting with reverse direction or using algebraic identities.
  - `ring`, `linarith`: likely used implicitly in algebraic manipulations (e.g., `mul_inv_cancel`, `smul_smul` simplifications).
  - `aesop`: not explicitly visible, but may be used in background automation (not in this snippet).

#### 4. **Proof Logic**

- **Structure**:
  1. **Step Lemma**:
     - Given `f` not total, pick `y ∉ dom(f)`.
     - Construct bounds `c` using density of `s` and nonnegativity.
     - Define extension `g = f ⊔ span{y}` with value `-c` at `y`.
     - Prove `g` preserves nonnegativity on `s` via case analysis on scalar `r` (positive/negative/zero).
  2. **Zorn’s Lemma Application**:
     - Define poset `S` of partial linear maps nonnegative on `s`.
     - Show every chain in `S` has an upper bound (via `sSup` of domains and values).
     - Apply `zorn_le_nonempty₀` to get a maximal element `q`.
     - Show maximality implies totality (else contradict `step`).
  3. **Hahn–Banach via Riesz Extension**:
     - Encode sublinear dominance as a convex cone `s = {(x, t) | N x ≤ t}` in `E × ℝ`.
     - Lift `f` to `f' : (E × ℝ) →ₗ.[ℝ] ℝ`, `f'(x, y) = y - f(x)`.
     - Verify `f'` is nonnegative on `s ∩ dom(f')` and satisfies density condition.
     - Apply `riesz_extension` to get `g`, then project back to `E`.

- **Key Logical Flow**:
  - Inductive extension step → Zorn’s lemma → global extension.
  - Reduction of Hahn–Banach to Riesz extension via geometric embedding.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Cone.Basic` | Defines `ConvexCone`, basic properties (additive, scalar-closed subsets). |
| `Mathlib.Data.Real.Archimedean` | Used implicitly (e.g., for `exists_between`, Archimedean property may be needed in `step`). |
| `Mathlib.LinearAlgebra.LinearPMap` | Provides `LinearPMap`, `domain`, `supSpanSingleton`, `sSup`, ordering `≤` on partial maps — essential for handling partial linear maps and Zorn’s lemma setup. |

---

This metadata captures the formal structure, proof strategy, and dependencies of the Riesz extension and Hahn–Banach theorems as formalized in this Lean 4 file.