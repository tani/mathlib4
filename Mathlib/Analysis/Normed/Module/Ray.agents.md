### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SameRay` | Predicate on vectors in a real normed space | Captures the geometric notion that two vectors lie on the same ray from the origin (i.e., one is a nonnegative scalar multiple of the other). |
| `norm_add` | `SameRay ℝ x y → ‖x + y‖ = ‖x‖ + ‖y‖` | Triangle inequality becomes equality for vectors on the same ray. |
| `norm_sub` | `SameRay ℝ x y → ‖x - y‖ = |‖x‖ - ‖y‖|` | Distance between vectors on the same ray equals absolute difference of norms. |
| `norm_smul_eq` | `SameRay ℝ x y → ‖x‖ • y = ‖y‖ • x` | Characterization of same-ray vectors via proportional scaling by norms. |
| `sameRay_iff_norm_smul_eq` | `SameRay ℝ x y ↔ ‖x‖ • y = ‖y‖ • x` | Equivalence between same-ray relation and norm-proportional scaling. |
| `sameRay_iff_inv_norm_smul_eq_of_ne` | `x ≠ 0 ∧ y ≠ 0 → (SameRay ℝ x y ↔ ‖x‖⁻¹ • x = ‖y‖⁻¹ • y)` | Same-ray iff unit vectors coincide (for nonzero vectors). |
| `sameRay_iff_inv_norm_smul_eq` | `SameRay ℝ x y ↔ x = 0 ∨ y = 0 ∨ ‖x‖⁻¹ • x = ‖y‖⁻¹ • y` | Full characterization including zero vectors. |
| `sameRay_iff_of_norm_eq` | `‖x‖ = ‖y‖ → (SameRay ℝ x y ↔ x = y)` | Same norm + same ray ⇒ equality. |
| `SameRay.eq_of_norm_eq` | `SameRay ℝ x y → ‖x‖ = ‖y‖ → x = y` | Direct consequence: equal norms on same ray imply equality. |
| `SameRay.norm_eq_iff` | `SameRay ℝ x y → (‖x‖ = ‖y‖ ↔ x = y)` | Norm equality characterizes equality on a ray. |
| `norm_injOn_ray_left`, `norm_injOn_ray_right` | Injectivity of norm on a ray (left/right) | Norm is injective when restricted to a ray (excluding zero). |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `sameRay_`: for equivalences/characterizations of `SameRay`.
  - `norm_`: for lemmas about norms under same-ray assumptions.
  - `norm_injOn_ray_`: injectivity of norm on a ray.
- **Suffixes**:
  - `_eq`: for equivalences or equalities.
  - `_iff`: for biconditional statements.
  - `_of_ne`: for results requiring nonzero assumptions.
  - `_left` / `_right`: for symmetry variants (e.g., `norm_injOn_ray_left` vs `norm_injOn_ray_right`).
- **Aliases**:
  - `alias ⟨SameRay.inv_norm_smul_eq, _⟩ := sameRay_iff_inv_norm_smul_eq_of_ne` — defines forward direction as a named lemma.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rcases h.exists_eq_smul with ⟨u, a, b, ha, hb, -, rfl, rfl⟩` — unpacks the definition of `SameRay`.
  - `rw [...]` — rewriting using lemmas like `norm_smul_of_nonneg`, `add_smul`, `smul_comm`, etc.
  - `wlog ... generalizing ... with H` — well-ordering/ symmetry reduction (used in `norm_sub`).
  - `simp only [...]` — simplification with precise control over rewrite rules.
  - `rwa [...]` — rewrite + assumption (used in `sameRay_iff_inv_norm_smul_eq_of_ne`).
  - `simpa only [...] using ...` — simplifies goal using a given proof.
  - `exact`, `intro`, `apply`, `cases`, `induction` — standard Lean tactics.

---

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs start by **unpacking the definition** of `SameRay` via `rcases h.exists_eq_smul`, reducing to the case where `x = a • u`, `y = b • u` for some `u` and `a, b ≥ 0`.
  - Then, **norm properties** (e.g., `norm_smul_of_nonneg`, `norm_add`, `norm_sub`) are applied.
  - **Symmetry arguments** (e.g., `wlog`) are used to reduce cases (as in `norm_sub`).
  - For equivalences (`↔`), proofs are split into two directions:
    - `→`: use `SameRay.norm_smul_eq` or direct computation.
    - `←`: construct the witness for `exists_eq_smul` using norms or inverses.
  - Zero cases are handled separately (e.g., `eq_or_ne x 0`, `eq_or_ne y 0`) and simplified using `SameRay.zero_left`, `SameRay.zero_right`.

---

#### 5. **Imports**

- `Mathlib.LinearAlgebra.Ray`: defines the `SameRay` predicate and basic properties.
- `Mathlib.Analysis.NormedSpace.Real`: provides foundational results about real normed spaces (e.g., `norm_smul_of_nonneg`, `norm_of_nonneg`, `norm_pos_iff`, etc.).

These imports indicate the module is part of the **analysis/geometry of normed spaces over ℝ**, with emphasis on **metric and linear-algebraic interactions**.

--- 

Let me know if you'd like a diagram of dependencies or a summary of how this fits into the broader `Mathlib` library.