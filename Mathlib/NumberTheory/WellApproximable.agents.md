Here is the **technical metadata** extracted from the provided Lean 4 formalization:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `approxOrderOf` | `SeminormedGroup A → ℕ → ℝ → Set A` | Set of elements within distance `δ` of a point of exact order `n`. |
| `wellApproximable` | `SeminormedGroup A → (ℕ → ℝ) → Set A` | Limsup of `approxOrderOf A n (δ n)`; points approximable by infinitely many `δₙ`-balls around order-`n` points. |
| `mem_approxOrderOf_iff` | `a ∈ approxOrderOf A n δ ↔ ∃ b, orderOf b = n ∧ a ∈ ball b δ` | Characterizes membership in `approxOrderOf`. |
| `mem_wellApproximable_iff` | `a ∈ wellApproximable A δ ↔ a ∈ blimsup ...` | Membership in limsup set. |
| `approxOrderOf.image_pow_subset_of_coprime` | `(0 < m) → n.Coprime m → y ↦ y^m '' approxOrderOf A n δ ⊆ approxOrderOf A n (m * δ)` | Power map expands `approxOrderOf` by factor `m` when coprime. |
| `approxOrderOf.image_pow_subset` | `(0 < m) → y ↦ y^m '' approxOrderOf A (n*m) δ ⊆ approxOrderOf A n (m * δ)` | Power map image inclusion for non-coprime case. |
| `approxOrderOf.smul_subset_of_coprime` | `(orderOf a).Coprime n → a • approxOrderOf A n δ ⊆ approxOrderOf A (orderOf a * n) δ` | Scalar multiplication inclusion under coprimality. |
| `approxOrderOf.smul_eq_of_mul_dvd` | `(0 < n) → orderOf a ^ 2 ∣ n → a • approxOrderOf A n δ = approxOrderOf A n δ` | Scalar multiplication equality when square divides `n`. |
| `mem_approxAddOrderOf_iff` (for `UnitAddCircle`) | `x ∈ approxAddOrderOf n δ ↔ ∃ m < n, gcd m n = 1 ∧ ‖x - m/n‖ < δ` | Concrete description in terms of reduced fractions. |
| `mem_addWellApproximable_iff` | `x ∈ addWellApproximable δ ↔ {n | ∃ m < n, gcd m n = 1 ∧ ‖x - m/n‖ < δ n}.Infinite` | Limsup condition rephrased as infinitely many rational approximations. |
| `AddCircle.addWellApproximable_ae_empty_or_univ` *(Gallagher’s Ergodic Theorem)* | `(Tendsto δ atTop (𝓝 0)) → (∀ᵐ x, x ∉ E) ∨ ∀ᵐ x, x ∈ E` | Main result: for circle, `E = addWellApproximable` is a.e. empty or a.e. full. |
| `NormedAddCommGroup.exists_norm_nsmul_le` *(Generalized Dirichlet)* | Under compact+connected+Haar assumptions, `∃ j ∈ [1,n], ‖j • ξ‖ ≤ δ` given volume growth condition. | General metric-geometric approximation lemma. |
| `AddCircle.exists_norm_nsmul_le` *(Dirichlet on circle)* | `∃ j ∈ [1,n], ‖j • ξ‖ ≤ T / (n+1)` | Classical Dirichlet approximation on the circle. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `approxOrderOf`, `approxAddOrderOf`: for sets near elements of given order.
  - `wellApproximable`, `addWellApproximable`: limsup sets for Diophantine approximation.
  - `mem_..._iff`: iff-characterizations of membership.
  - `image_...`, `smul_...`: behavior under group operations (powers, scalar mult).
  - `vadd_...`, `nsmul_...`: additive notation variants.

- **Suffixes**:
  - `_iff`: logical equivalence lemmas.
  - `_subset`, `_eq`: inclusion/equality results.
  - `_ae_empty_or_univ`: almost-everywhere dichotomy.
  - `_of_coprime`, `_of_mul_dvd`: conditional lemmas based on number-theoretic hypotheses.

- **Notation**:
  - `𝕊` for `AddCircle T`.
  - `∣` / `∤`, `∣∣` for divisibility and square-divisibility.
  - `Icc 1 n` for integer interval `[1, n]`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification with precise lemmas (e.g., definitions, `mem_setOf_eq`, `image_`, `smul_`). |
| `rw [...]` | Rewriting using equalities (e.g., `mul_div_cancel`, `orderOf_pow'`). |
| `convert ... using 1` | Flexibly match goals up to definitional equality. |
| `exact`, `apply`, `intro`, `cases` | Basic proof structure. |
| `tauto` | Tactic for propositional logic (used in set-theoretic manipulations). |
| `congr` | Congruence reasoning (e.g., for set equality). |
| `ext` | Extensionality for sets/functions. |
| `have`, `suffices`, `by_cases` | Intermediate lemma introduction and case splits. |
| `exact?` / `aesop` (not explicit here, but implied by `tauto`, `linarith`) | Automation for simple goals. |
| `linarith` | Linear arithmetic over reals (e.g., in Dirichlet proof). |
| `rw [← ...]` | Reverse rewriting for substitution (e.g., `← orderOf_inv`). |
| `convert ... using ...` | Used in `image_pow_subset` to reduce to known ball inclusion. |

---

### **4. Proof Logic**

- **Structure of `addWellApproximable_ae_empty_or_univ`**:
  1. **Partition** the limsup set `E` into three parts indexed by prime divisibility (`p ∤ n`, `p ∣∣ n`, `p² ∣ n`).
  2. Show each part is *almost invariant* under an ergodic transformation:
     - `A p`: invariant under `y ↦ p • y`
     - `B p`: invariant under `y ↦ p • y + 1/p`
     - `C p`: invariant under translation `y ↦ y + 1/p`
  3. Apply ergodicity (`ergodic_nsmul`, `ergodic_nsmul_add`) to deduce `A p`, `B p` are a.e. empty or full.
  4. If any is full ⇒ `E` is full.
  5. Otherwise, `E` ≈ `C p` for all primes `p`, and `C p` is invariant under all `1/p`-translations.
  6. Use `ae_empty_or_univ_of_forall_vadd_ae_eq_self` to conclude dichotomy.

- **Dirichlet-type proofs**:
  - Use volume growth condition to force overlap of balls `closedBall(j • ξ, δ/2)`.
  - Apply `exists_lt_mem_inter_of_not_pairwise_disjoint` to extract `j - i` with small norm.
  - In `AddCircle`, reduce to Haar measure (`volume`) and compute ball volumes explicitly.

---

### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Dynamics.Ergodic.AddCircle` | Ergodic theory on the circle: `ergodic_nsmul`, `ergodic_nsmul_add`, `ae_empty_or_univ_of_forall_vadd_ae_eq_self`. |
| `Mathlib.MeasureTheory.Covering.LiminfLimsup` | Tools for limsup of sets (`blimsup`, `thickening`, `liminf/limsup` in measure theory). |

**Domain**: Metric number theory, specifically *metric Diophantine approximation* on the circle.  
**Mathlib modules involved**: Measure theory, topological groups, ergodic theory, seminormed groups, additive order theory.

---

Let me know if you'd like a **diagram of dependencies**, **proof sketch in natural language**, or **formalization roadmap** for the remaining TODOs.