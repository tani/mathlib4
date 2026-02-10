Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConvexOn.smul'` | `ConvexOn 𝕜 s f → ConvexOn 𝕜 s g → (∀ x ∈ s, 0 ≤ f x) → (∀ x ∈ s, 0 ≤ g x) → MonovaryOn f g s → ConvexOn 𝕜 s (f • g)` | Product of nonnegative monovarying convex functions is convex. |
| `ConcaveOn.smul'` | `ConcaveOn 𝕜 s f → ConcaveOn 𝕜 s g → (∀ x ∈ s, 0 ≤ f x) → (∀ x ∈ s, 0 ≤ g x) → AntivaryOn f g s → ConcaveOn 𝕜 s (f • g)` | Product of nonnegative antivarying concave functions is concave. |
| `ConvexOn.smul''` | `ConvexOn 𝕜 s f → ConvexOn 𝕜 s g → (∀ x ∈ s, f x ≤ 0) → (∀ x ∈ s, g x ≤ 0) → AntivaryOn f g s → ConcaveOn 𝕜 s (f • g)` | Product of nonpositive antivarying convex functions is concave. |
| `ConcaveOn.smul''` | `ConcaveOn 𝕜 s f → ConcaveOn 𝕜 s g → (∀ x ∈ s, f x ≤ 0) → (∀ x ∈ s, g x ≤ 0) → MonovaryOn f g s → ConvexOn 𝕜 s (f • g)` | Product of nonpositive monovarying concave functions is convex. |
| `ConvexOn.smul_concaveOn`, `ConcaveOn.smul_convexOn`, etc. | Mixed convex/concave cases with sign constraints and variation assumptions | Generalize product rules to mixed convexity/concavity and sign combinations. |
| `ConvexOn.mul`, `ConcaveOn.mul`, etc. | Specializations of `smul'`/`smul''`/… to scalar multiplication (`*`) in `𝕜` | Simplified versions for real-valued functions (i.e., `E = F = 𝕜`). |
| `ConvexOn.pow` | `ConvexOn 𝕜 s f → (∀ x ∈ s, 0 ≤ f x) → ∀ n, ConvexOn 𝕜 s (f ^ n)` | Powers of nonnegative convex functions are convex. |
| `convexOn_pow` | `∀ n, ConvexOn 𝕜 (Ici 0) (x ↦ x ^ n)` | Monomial `x^n` is convex on `[0, ∞)` for all `n : ℕ`. |
| `Even.convexOn_pow` | `Even n → ConvexOn 𝕜 univ (x ↦ x ^ n)` | Monomial `x^n` is convex on all of `𝕜` when `n` is even. |
| `convexOn_zpow` | `∀ n : ℤ, ConvexOn 𝕜 (Ioi 0) (x ↦ x ^ n)` | Monomial `x^n` is convex on `(0, ∞)` for all integers `n`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `ConvexOn.` / `ConcaveOn.`: Indicates the type of convexity/concavity of the result.
  - `smul_`: For scalar multiplication (`•`) versions.
  - `mul_`: For multiplication (`*`) in the base field (i.e., `𝕜`-valued functions).
  - `pow`: For power functions.
- **Suffixes**:
  - `'`, `''`, `'_`, `'_`: Distinguish variants with different sign assumptions (e.g., `smul'` vs `smul''`).
  - `concaveOn`, `convexOn`: Indicate mixed convexity/concavity cases (e.g., `mul_concaveOn`, `mul_convexOn'`).
- **Variation assumptions**:
  - `MonovaryOn`: Same monotonic direction.
  - `AntivaryOn`: Opposite monotonic direction.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `refine`: To construct proofs step-by-step.
- `gcongr`: For congruence reasoning with inequalities (especially in `calc` blocks).
- `simp_rw`, `simp only`, `simp`: Simplification with rewrites and definitional equalities.
- `abel`, `ring`: For commutative ring manipulations (e.g., distributing scalars).
- `field_simp`: For field simplifications (used in `convexOn_zpow`).
- ` positivity`: To prove nonnegativity of expressions.
- `rw`, `calc`: For rewriting and chaining inequalities/equalities.
- `exact`, `assumption`: To close goals directly.
- `cases` / `obtain`: To decompose hypotheses (e.g., `obtain rfl := eq_sub_of_add_eq hab`).

---

### **4. Proof Logic**

- **Structure**: Most proofs follow a pattern:
  1. **Unfold definitions**: Use `dsimp` or `simp` to expand `ConvexOn`/`ConcaveOn`.
  2. **Apply convexity/concavity assumptions**: Use `hf.2`, `hg.2` to get inequalities.
  3. **Combine inequalities**: Use `smul_le_smul`, `add_le_add`, `trans`, `trans'`.
  4. **Algebraic manipulation**: Use `abel`, `ring`, `simp` to rearrange terms.
  5. **Use variation condition**: Apply `hfg.smul_add_smul_le_smul_add_smul` (or its variants) to handle cross terms like `f x • g y + f y • g x`.
  6. **Sign constraints**: Use `hf₀`, `hg₀` to ensure nonnegativity needed for `smul_le_smul`.
- **Inductive step for powers**: `ConvexOn.pow` uses induction on `n`, with base case `n = 0` (constant function) and step case `n + 1` via `mul`.
- **Integer powers**: `convexOn_zpow` splits into `n ≥ 0` (via `convexOn_pow`) and `n < 0` (via `zpow_negSucc`, `inv_pow`, and field arithmetic).

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.Monovary` | Defines `MonovaryOn`, `AntivaryOn`, and related lemmas. |
| `Mathlib.Algebra.Order.Ring.Basic` | Basic order-theoretic ring theory (e.g., `smul_le_smul`, `nonneg` lemmas). |
| `Mathlib.Analysis.Convex.Function` | Core definitions: `ConvexOn`, `ConcaveOn`, `ConvexSet`, etc. |
| `Mathlib.Tactic.FieldSimp` | Tactics for simplifying field expressions (used in `convexOn_zpow`). |

---

### **Domain-Specific AI Agent Notes**

- **Focus area**: Formalization of convex analysis over ordered algebraic structures.
- **Key concepts**: Convexity/concavity, monotonic variation, sign constraints, monomial functions.
- **Common patterns**:
  - Use of `smul` vs `*` depending on whether functions map into a module or the base field.
  - Symmetry between convex/concave and positive/negative cases via negation.
  - Inductive proofs for powers, with base case handled by `convexOn_const`.
- **Potential extensions**:
  - Generalize to `n`-ary products.
  - Extend to fractional powers or exponential functions.
  - Add continuity/differentiability conditions for stronger convexity criteria.

--- 

Let me know if you'd like a diagram of the dependency graph or a summary of the `monovary`/`antivary` lemmas used.