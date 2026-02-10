Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `Data.ENNReal.Basic`-style Properties of `ℝ≥0∞`**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mul_lt_mul` | `a < c → b < d → a * b < c * d` — monotonicity of multiplication (strict in both args) |
| `mul_left_strictMono` | `a ≠ 0 ∧ a ≠ ∞ → StrictMono (a * ·)` — left-multiplication by nonzero finite element is strictly increasing |
| `mul_eq_mul_left` | `a ≠ 0 ∧ a ≠ ∞ → a * b = a * c ↔ b = c` — left-cancellation for multiplication |
| `mul_le_mul_left` | `a ≠ 0 ∧ a ≠ ∞ → a * b ≤ a * c ↔ b ≤ c` — equivalence of order under left-multiplication |
| `pow_right_strictMono` | `n ≠ 0 → StrictMono fun a ↦ a ^ n` — strict monotonicity of power function (for nonzero exponent) |
| `pow_lt_pow_left` | `a < b ∧ n ≠ 0 → a ^ n < b ^ n` — strict power monotonicity |
| `addLECancellable_iff_ne` | `AddLECancellable a ↔ a ≠ ∞` — characterizes left-cancellability for addition |
| `cancel_of_ne` | `a ≠ ∞ → AddLECancellable a` — finite elements are additively cancellable |
| `sub_eq_of_eq_add` | `b ≠ ∞ ∧ a = c + b → a - b = c` — truncated subtraction recovers summands |
| `add_sub_cancel_left/right` | `a ≠ ∞ → a + b - a = b` and symmetric — cancellation laws for subtraction |
| `sub_lt_self` | `a ≠ ∞ ∧ a ≠ 0 ∧ b ≠ 0 → a - b < a` — subtraction reduces value (when defined) |
| `mul_top'`, `top_mul'` | `a * ∞ = if a = 0 then 0 else ∞` — multiplication with infinity (conditional) |
| `mul_eq_top_iff` | `a * b = ∞ ↔ (a ≠ 0 ∧ b = ∞) ∨ (a = ∞ ∧ b ≠ 0)` — when product is infinite |
| `sum_eq_top` | `∑ f = ∞ ↔ ∃ i, f i = ∞` — sum is infinite iff some term is |
| `pow_eq_top_iff` | `a ^ n = ∞ ↔ a = ∞ ∧ n ≠ 0` — power is infinite iff base is infinite and exponent nonzero |
| `coe_sub`, `top_sub_coe`, `sub_top` | Compatibility of coercion `ℝ≥0 → ℝ≥0∞` with truncated subtraction |
| `toNNReal_sum`, `toReal_sum` | Summation commutes with coercion to `NNReal` / `Real` (when finite) |

#### **2. Naming Conventions**

- **Prefixes**:
  - `mul_`, `add_`, `pow_`, `sub_`, `top_`, `coe_`, `toNNReal_`, `toReal_`, `addLECancellable_`
  - `left`, `right` for argument position (e.g., `mul_left_mono`, `add_right_inj`)
  - `ne`, `lt`, `le` for relational properties (e.g., `mul_ne_top`, `lt_add_right`)
- **Suffixes**:
  - `'` (prime) for weaker variants (e.g., `sub_eq_of_eq_add'`)
  - `_iff` for equivalence lemmas (e.g., `mul_eq_mul_left_iff`)
  - `cancel`, `inj`, `mono`, `lt`, `le`, `eq` for logical flavor (e.g., `add_right_inj`, `mul_left_mono`)
- **`gcongr` attribute**: Used for monotonicity lemmas that are *congruences* for `≤`/`<`.

#### **3. Tactic Stack**

- **Core tactics**: `simp`, `rw`, `refine`, `exact`, `contrapose!`, `intro`, `cases`, `induction`
- **Order-specific**:
  - `linarith` (via `aesop`)
  - `aesop` with custom rule sets (`[finiteness]`)
  - `ring`, `omega` (not explicitly used, but implied by `linarith`-style reasoning)
- **Structure-specific**:
  - `lift ... using` — for lifting from `ℝ≥0` to `ℝ≥0∞` using finiteness assumptions
  - `convert` — for transferring lemmas from `WithTop`
  - `simpa using` — for simplifying goals using a given proof
  - `rwa`, `rw [*, *]` — for rewriting with multiple lemmas

#### **4. Proof Logic**

- **Induction**: Used for `pow`-related lemmas (e.g., `pow_ne_top`, `pow_lt_top`)
- **Case analysis**:
  - On `a = ∞` or `a ≠ ∞`
  - On `a = 0` or `a ≠ 0`
  - On `n = 0` or `n ≠ 0` (for natural numbers)
- **Equivalence chaining**:
  - Many lemmas are proved via `↔`-introduction: split into `→` and `←`, often using monotonicity or cancellation.
- **Reduction to `WithTop`**:
  - Many results are lifted from `WithTop α` (e.g., `WithTop.mul_lt_mul`, `WithTop.add_eq_top`)
  - Porting notes indicate explicit re-proofs for `ℝ≥0∞` where `WithTop` lemmas no longer auto-apply.
- **Cancellation-based reasoning**:
  - Leverages `AddLECancellable` to reduce `a + b ≤ a + c` to `b ≤ c`, etc.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.BigOperators.WithTop`
  - `Mathlib.Algebra.GroupWithZero.Divisibility`
  - `Mathlib.Data.ENNReal.Basic`
  - `Mathlib.Data.NNReal.Basic`
- **Scope**:
  - Focuses on *elementary algebraic and order-theoretic properties* of `ℝ≥0∞`
  - Excludes inversion/division (handled in `Data.ENNReal.Inv`)
  - Includes interaction with `NNReal`, `Real`, `Finset` sums/products, and interval notation (`Iio`, `Ioo`, `Ico`)
- **Notable abstractions**:
  - Uses `WithTop` as a template for many constructions
  - Leverages `CanonicallyOrderedCommSemiring` for `pow_pos`, `mul_pos`, etc.

---

This summary captures the formal structure, naming discipline, and proof methodology of the file, suitable for building a domain-specific AI agent for reasoning about extended non-negative reals.