### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `cfc_tsub`, `cfcₙ_tsub` | Subtraction compatibility of continuous functional calculus (unital / nonunital) under pointwise inequality on spectrum. |
| `Unitization.instPartialOrder`, `Unitization.instStarOrderedRing` | Define the *spectral order* on the unitization `A⁺¹` of a nonunital C*-algebra `A`. |
| `Unitization.inr_le_iff`, `Unitization.inr_nonneg_iff` | Characterize order and nonnegativity of embedded elements `(a : A⁺¹)` in terms of `A`. |
| `cfc_nnreal_le_iff` | Equivalence between functional inequality `cfc f a ≤ cfc g a` and pointwise inequality `f ≤ g` on spectrum (for `ℝ≥0`-valued functions). |
| `CFC.exists_pos_algebraMap_le_iff` | Characterizes existence of a positive scalar `r` with `r ≤ a` via strict positivity of spectrum. |
| `IsSelfAdjoint.le_algebraMap_norm_self`, `IsSelfAdjoint.neg_algebraMap_norm_le_self` | Bounds a self-adjoint element `a` between `±‖a‖`. |
| `CStarAlgebra.mul_star_le_algebraMap_norm_sq`, `CStarAlgebra.star_mul_le_algebraMap_norm_sq` | Bounds `a*a*` and `**a*a` by `‖a‖²`. |
| `CStarAlgebra.norm_le_norm_of_nonneg_of_le` | Monotonicity of norm on nonnegative elements in nonunital C*-algebras: `0 ≤ a ≤ b ⇒ ‖a‖ ≤ ‖b‖`. |
| `CStarAlgebra.conjugate_le_norm_smul`, `CStarAlgebra.conjugate_le_norm_smul'` | Generalized Cauchy–Schwarz-type inequality: `a* b a ≤ ‖b‖ • (a* a)` (and symmetric variant). |
| `CStarAlgebra.inv_le_inv`, `CStarAlgebra.inv_le_inv_iff` | Order-reversing behavior of inversion: `0 ≤ a ≤ b ⇒ b⁻¹ ≤ a⁻¹`, and iff version. |
| `CStarAlgebra.norm_le_one_iff_of_nonneg`, `nnnorm_le_one_iff_of_nonneg`, etc. | Norm-characterizations of membership in intervals `[0, r]`, `[0, 1]`, `[0, n]`. |
| `CStarAlgebra.isClosed_nonneg`, `instance OrderClosedTopology` | Nonnegative cone is closed ⇒ order topology is compatible with topology. |
| `CStarAlgebra.pow_nonneg`, `pow_monotone`, `pow_antitone` | Positivity and monotonicity/antitonicity of powers in C*-algebras. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `cfc_`, `cfcₙ_`: Continuous functional calculus (unital / nonunital).
  - `inr_`: Embedding into unitization (`inr : A → A⁺¹`).
  - `norm_`, `nnnorm_`: Norm vs. nonnegative norm (`‖·‖` vs `‖·‖₊`).
  - `le_`, `inv_`, `conjugate_`: Order-theoretic or inversion-related properties.
  - `isClosed_`, `isUnit_`: Topological / algebraic properties.

- **Suffixes:**
  - `_le_iff`, `_iff_le`: Bidirectional order-characterizations.
  - `_of_nonneg`, `_nonneg`: Assumptions of nonnegativity.
  - `_mem_Icc_`: Membership in closed intervals.
  - `_rpow_`, `_pow_`: Power-related lemmas.

- **Notable patterns:**
  - `algebraMap ℝ A r` often abbreviated as `r` when contextually clear.
  - `cfc f a` used for functional calculus; `cfcₙ f a` for nonunital version.
  - `a ^ (p : ℝ)` for real powers via functional calculus.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `cfc_tac`, `cfc_cont_tac`, `cfc_zero_tac` | Custom tactics for functional calculus (e.g., proving `0 ≤ a`, continuity, `f(0)=0`). |
| `aesop`, `simp`, `simp_rw` | Simplification and automation (especially for algebraic rewrites). |
| `rw`, `convert`, `refine`, `exact` | Core rewriting and proof construction. |
| `nontriviality`, `subsingleton_or_nontrivial` | Handling trivial vs nontrivial cases. |
| `peel`, `obtain ⟨r, hr, hr_min⟩` | Existential unpacking and optimization arguments. |
| `calc` | Chain-of-inequalities proofs. |
| `fun_prop`, `norm_num`, `ring` | Propagation of properties, numeric normalization, ring simplifications. |
| `conv_rhs => rw [...]` | Right-hand side rewriting in conv mode. |

---

#### 4. **Proof Logic**

- **Inductive structure**: Most proofs proceed by:
  1. Reducing to the unital case via unitization (`Unitization`).
  2. Applying functional calculus (`cfc_*`) to reduce order statements to spectral ones.
  3. Using spectral properties (e.g., `spectrum.norm_le_norm_of_mem`, `spectralRadius_mem_spectrum`).
  4. Leveraging continuity and monotonicity of real functions (e.g., `id`, `x ↦ x²`, `x ↦ x^p`).
  5. Handling edge cases (trivial/nontrivial, zero/nonzero) via `subsingleton_or_nontrivial`, `nontriviality`.

- **Common proof patterns**:
  - *Order ↔ spectrum*: `a ≤ b ↔ spectrum a ≤ spectrum b` (via `cfc_le_iff`, `le_algebraMap_iff_spectrum_le`).
  - *Norm ↔ spectrum*: `‖a‖ = max spectrum |x|` (via `spectralRadius_eq_nnnorm`, `norm_mem_spectrum_of_nonneg`).
  - *Inversion reverses order*: via conjugation with `b^(-1/2)` and norm estimates (`le_iff_norm_sqrt_mul_rpow`).
  - *Closedness of positive cone*: via `isClosed_eq`, `isClosed_le`, and spectral characterizations.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Instances` | Core C*-algebra and functional calculus infrastructure. |
| `Mathlib.Analysis.CStarAlgebra.Unitization` | Unitization of nonunital C*-algebras, spectral order. |
| `Mathlib.Analysis.SpecialFunctions.ContinuousFunctionalCalculus.Rpow` | Real powers (`rpow`) in C*-algebras. |
| `Mathlib.Topology.ContinuousMap.StarOrdered` | Star-ordered structures and continuity. |

---

### Summary

This file formalizes foundational order-theoretic and norm-theoretic properties of C*-algebras using the **continuous functional calculus**, especially leveraging the **spectral order** on unitizations. It establishes key inequalities (e.g., `a ≤ ‖a‖`, `a*a* ≤ ‖a‖²`), monotonicity of norm on positive elements, order-reversing inversion, and topological properties (closedness of positive cone). The proofs rely heavily on spectral theory, functional calculus, and careful handling of unital vs nonunital cases via unitization.