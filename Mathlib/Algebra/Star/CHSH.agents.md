Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsCHSHTuple` | A `Prop`-valued structure defining a CHSH tuple: four self-adjoint involutions `A₀, A₁, B₀, B₁` in a `*`-monoid, with `Aᵢ` commuting with `Bⱼ`. Encodes physical assumptions (observables, ±1 outcomes, spacelike separation). |
| `CHSH_id` | An algebraic identity: `(2 - Σ)² = 4·(2 - Σ)` where `Σ = A₀B₀ + A₀B₁ + A₁B₀ - A₁B₁`, valid in *commutative* rings under CHSH conditions. Used to show positivity of `2 - Σ`. |
| `CHSH_inequality_of_comm` | **CHSH inequality**: In a *commutative* ordered `*`-ℝ-algebra, `Σ ≤ 2`. Proof uses `CHSH_id` to show `2 - Σ ≥ 0`. |
| `tsirelson_inequality_aux` | Technical identity: `√2 · (√2)³ = √2 · (2·(√2)⁻¹ + 4·((√2)⁻¹·2⁻¹))`. Critical for coefficient simplification in Tsirelson’s bound. |
| `sqrt_two_inv_mul_self` | `(√2)⁻¹ · (√2)⁻¹ = 2⁻¹`. Used to simplify products of inverse square roots. |
| `tsirelson_inequality` | **Tsirelson’s bound**: In *any* ordered `*`-ℝ-algebra (not necessarily commutative), `Σ ≤ √2³ = 2√2`. Proof constructs an explicit sum-of-squares decomposition: `2√2 - Σ = (√2)⁻¹·(P² + Q²)` for carefully chosen `P, Q`. |

---

### **2. Naming Conventions**

- **Prefixes & Suffixes**:
  - `is_` prefix for predicate structures (`IsCHSHTuple`).
  - `*_sa` suffix for self-adjointness (`A₀_sa`, `B₁_sa`).
  - `*_inv` suffix for involution property (`A₀_inv`, `B₁_inv`).
  - `*_commutes` suffix for commutativity (`A₀B₀_commutes`, `A₁B₁_commutes`).
  - `*_id` suffix for identities/lemmas (`CHSH_id`).
  - `*_aux` suffix for auxiliary lemmas (`tsirelson_inequality_aux`).
  - `tsirelson_` prefix for lemmas specific to Tsirelson’s bound.
  - `P`, `Q` used for auxiliary expressions in sum-of-squares decomposition.

---

### **3. Tactic Stack**

Frequently used tactics in this file:
- `linear_combination` (in `CHSH_id`): To verify polynomial identities via coefficient matching.
- `simp only [...]` (extensively): To apply known equalities (e.g., involutions, self-adjointness, commutativity).
- `ring_nf`, `abel_nf`: For simplifying polynomial expressions and collecting coefficients.
- `norm_num`: For numeric simplification (e.g., verifying positivity of `2`, `1/4`, etc.).
- `rw [...]` / `convert ... using 1`: For rewriting and congruence-based substitutions.
- `simpa only [...] using ...`: To discharge goals by simplifying with a given proof.
- ` positivity`: To prove nonnegativity of expressions (e.g., sums of squares, scalar multiples).
- `mul_left_cancel₀`, `inv_mul_cancel₀`: For canceling nonzero scalars.

---

### **4. Proof Logic**

- **CHSH inequality (commutative case)**:
  1. Define `P = 2 - Σ`.
  2. Prove `P² = 4P` using `CHSH_id`.
  3. Show `P = (1/4)·(P²)` (requires `2⁻¹`).
  4. Use self-adjointness of `P` to write `P = (1/4)·(star P * P)`.
  5. Conclude `P ≥ 0` via `smul_nonneg` and `star_mul_self_nonneg`.
  6. Deduce `Σ ≤ 2`.

- **Tsirelson inequality (noncommutative case)**:
  1. Define auxiliary elements `P = (√2)⁻¹·(A₁ + A₀) - B₀`, `Q = (√2)⁻¹·(A₁ - A₀) + B₁`.
  2. Compute `√2³ - Σ = (√2)⁻¹·(P² + Q²)` via algebraic expansion and simplification.
  3. Use:
     - `Aᵢ² = 1`, `Bⱼ² = 1` (involutions),
     - `AᵢBⱼ = BⱼAᵢ` (commutativity across groups),
     - `star(Aᵢ) = Aᵢ`, `star(Bⱼ) = Bⱼ` (self-adjointness),
     - `tsirelson_inequality_aux` and `sqrt_two_inv_mul_self` to simplify coefficients.
  4. Show `P² ≥ 0`, `Q² ≥ 0` (as `star(P) = P`, `star(Q) = Q`).
  5. Conclude RHS ≥ 0 ⇒ `Σ ≤ √2³`.

---

### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.CharP.Invertible`: For invertibility of scalars like `2`, `√2`.
- `Mathlib.Algebra.Order.Star.Basic`: Ordered `*`-rings and `*`-algebras.
- `Mathlib.Algebra.Ring.Regular`: Regular elements (used implicitly via invertibility).
- `Mathlib.Data.Real.Sqrt`: Real square roots, especially `√2`.
- `Mathlib.Tactic.Polyrith`: Polynomial ring reasoning (via `abel`, `linear_combination`).

**Domain Scope**:
- Ordered `*`-algebras over `ℝ` (with `OrderedSMul`, `StarModule`).
- No topological structure assumed (e.g., no `C*`-algebra or von Neumann algebra structure).
- Purely algebraic treatment—avoids measure theory or functional analysis.

---

Let me know if you'd like a diagram of the logical dependencies or a summary of the physical interpretation mapping.