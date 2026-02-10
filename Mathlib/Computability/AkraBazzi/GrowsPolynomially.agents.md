Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

## 📌 **Technical Brief: Akra-Bazzi Polynomial Growth Condition (`GrowsPolynomially`)**

### 1. 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `GrowsPolynomially` | `def GrowsPolynomially (f : ℝ → ℝ) : Prop` | Defines the polynomial growth condition: for all `b ∈ (0,1)`, `f(u)` is bounded between `c₁·f(x)` and `c₂·f(x)` for `u ∈ [b·x, x]` eventually as `x → ∞`. |
| `congr_of_eventuallyEq` | `lemma` | Shows `GrowsPolynomially` is preserved under eventual equality at `atTop`. |
| `iff_eventuallyEq` | `lemma` | Equivalence: `f =ᶠ g` ⇔ `GrowsPolynomially f ↔ GrowsPolynomially g`. |
| `eventually_atTop_le`, `eventually_atTop_ge` | `lemma` | Extract upper/lower bounds from the definition (for real inputs). |
| `eventually_atTop_le_nat`, `eventually_atTop_ge_nat` | `lemma` | Same as above but for natural inputs (`ℕ`). |
| `eventually_zero_of_frequently_zero` | `lemma` | If `f` is polynomially growing and frequently zero, then eventually zero. |
| `eventually_atTop_nonneg_or_nonpos` | `lemma` | A polynomially growing function is eventually nonnegative or nonpositive. |
| `eventually_atTop_zero_or_pos_or_neg` | `lemma` | Refines above: eventually zero, positive, or negative. |
| `neg`, `neg_iff`, `abs`, `norm` | `lemma` | Closure properties under sign change, absolute value, and norm. |
| `growsPolynomially_const`, `growsPolynomially_id` | `lemma` | Constants and identity function satisfy the condition. |
| `mul`, `const_mul`, `add`, `add_isLittleO`, `inv`, `div` | `lemma` | Closure under multiplication, addition (with nonnegativity), inversion, division. |
| `rpow`, `pow`, `zpow` | `lemma` | Closure under real/natural/integer powers (with nonnegativity assumption). |
| `growsPolynomially_rpow`, `growsPolynomially_pow`, `growsPolynomially_zpow` | `lemma` | Specific instances for `x ↦ x^p`. |
| `growsPolynomially_log` | `lemma` | Logarithm satisfies the condition (proof sketch incomplete in snippet). |

---

### 2. 📝 **Naming Conventions**

- **Prefixes**:
  - `growsPolynomially_`: for concrete examples (e.g., `growsPolynomially_id`, `growsPolynomially_log`).
  - `eventually_atTop_`: for lemmas extracting bounds from the definition.
  - `congr_`, `iff_`: for equivalence/congruence lemmas.
- **Suffixes**:
  - `_nat`: when the lemma applies to natural numbers instead of reals.
  - `_or_nonneg`, `_or_nonpos`, `_or_pos_or_neg`: for case analysis on sign behavior.
  - `_iff`: for bidirectional closure properties (`neg_iff`, `iff_eventuallyEq`).
- **Internal variables**:
  - `c₁`, `c₂`, `c₃`, `c₄`: constants in the definition.
  - `b`: scaling factor in `(0,1)`.
  - `u`, `x`: variables for input points.

---

### 3. 🛠️ **Tactic Stack**

The proofs rely heavily on the following tactics (in order of frequency):

| Tactic | Usage |
|--------|-------|
| `filter_upwards` | Core for handling `∀ᶠ` (eventually) quantifiers. |
| `gcongr` | For monotonicity arguments (especially with `≤`, `≥`, `rpow`, `mul`). |
| `simp only`, `simp_rw` | Simplification with precise control over rewrites. |
| `calc` | Chain of equalities/inequalities (common in bounding arguments). |
| `norm_num`, `linarith`, `ring` | Arithmetic simplifications and solving linear/real arithmetic goals. |
| `obtain`, `refine`, `exact` | Proof construction and goal decomposition. |
| `rw`, `rwa`, `convert` | Rewriting using lemmas or definitions. |
| ` positivity` | To prove positivity of expressions (e.g., `c₁ * c₃ > 0`). |
| `induction` | Used in `eventually_zero_of_frequently_zero` for induction on `m`. |
| `omega`, `interval_cases` | Rare, but used for interval reasoning. |

---

### 4. 🧠 **Proof Logic & Strategy**

- **Structure of proofs**:
  - Most proofs follow a **"definition unpacking → constant extraction → filter manipulation → bounding"** pattern.
  - For closure properties (`mul`, `add`, `rpow`, etc.), the standard approach is:
    1. Unpack assumptions for `f` and `g`.
    2. Combine constants (`c₁`, `c₂`, `c₃`, `c₄`) using algebraic operations (e.g., `min`, `max`, `mul`).
    3. Use `filter_upwards` to combine eventual bounds.
    4. Apply monotonicity (`gcongr`) or algebraic identities (`mul_rpow`, `log_mul`) to finish.

- **Case analysis**:
  - Many lemmas split on sign (`eventually_nonneg_or_nonpos`, `zero_or_pos_or_neg`).
  - Power lemmas (`rpow`) split on exponent sign (`0 ≤ p` vs `p < 0`).
  - `eventually_zero_of_frequently_zero` uses induction on integer exponents to propagate zeros.

- **Key insight**:
  - The definition uses `∀ b ∈ (0,1)`, but the proofs often fix `b = 1/2` (e.g., in `eventually_zero_of_frequently_zero`, `eventually_atTop_nonneg_or_nonpos`) due to equivalence.

---

### 5. 📦 **Imports & Dependencies**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.Asymptotics.AsymptoticEquivalent` | Provides `=o`, `~`, `eventually_eq`, etc., for asymptotic reasoning. |
| `Mathlib.Analysis.SpecialFunctions.Pow.Real` | Real exponentiation (`rpow`), monotonicity, algebraic laws. |
| `Mathlib.Algebra.Order.ToIntervalMod` | Possibly for interval arithmetic or modular reasoning (used minimally). |
| `Mathlib.Analysis.SpecialFunctions.Log.Base` | Logarithm with arbitrary base (`logb`), `Real.log`, monotonicity. |

Additional scoped notation:
- `open scoped Topology` → for filter-based asymptotics (`atTop`, `eventually`, etc.).
- `open Finset Real Filter Asymptotics` → for common operations on reals, filters, and asymptotics.

---

Let me know if you'd like a **diagram of closure properties**, **proof automation suggestions**, or a **formalization roadmap** for the Akra-Bazzi theorem itself.