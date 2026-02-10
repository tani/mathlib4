Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Discretized Exponentials in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tendsto_div_of_monotone_of_exists_subseq_tendsto_div` | `(u : ℕ → ℝ) → l : ℝ → Monotone u → (∀ a > 1, ∃ subseq c with growth ≤ a, u ∘ c / c → l) → u / id → l` | Main convergence result: if monotone `u` has subsequential averages `u(c n)/c n → l` along *exponentially growing* subsequences with ratio arbitrarily close to 1, then full sequence `u n / n → l`. |
| `tendsto_div_of_monotone_of_tendsto_div_floor_pow` | `(u : ℕ → ℝ) → l : ℝ → Monotone u → (c : ℕ → ℝ) → (∀ k, 1 < c k) → c → 1 → (∀ k, u ⌊c k ^ n⌋₊ / ⌊c k ^ n⌋₊ → l) → u n / n → l` | Specialization of above: convergence along *integer floors of powers* `⌊c^ n⌋₊` for a single sequence `c → 1⁺`. |
| `sum_div_pow_sq_le_div_sq` | `∑_{i < N, j < c^i} 1/(c^i)^2 ≤ C / j^2` | Bounds tail of geometric-like sum over exponential indices by `O(1/j²)`, with constant `C = c³/(c−1)`. |
| `mul_pow_le_nat_floor_pow` | `(1 − c⁻¹) * c^i ≤ ⌊c^i⌋₊` | Lower bound on floor of exponential: `c^i` is not much larger than its floor. |
| `sum_div_nat_floor_pow_sq_le_div_sq` | `∑_{i < N, j < ⌊c^i⌋₊} 1/⌊c^i⌋₊² ≤ C' / j²` | Analog of `sum_div_pow_sq_le_div_sq` but for discretized (floor) exponentials; constant `C' = c⁵/(c−1)³`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `tendsto_...`: convergence statements (often involving filters like `atTop`, `𝓝 l`).
  - `sum_...`: finite sums over index sets (`range`, `Ico`, filtered by inequalities).
  - `mul_...`, `pow_...`, `floor_...`: arithmetic properties involving multiplication, powers, or floor.
- **Suffixes:**
  - `_le_div_sq`, `_div_sq`: bounds comparing sums to `1/j²`.
  - `_of_monotone`, `_of_tendsto_div_floor_pow`: specify assumptions (monotonicity, convergence on subsequences).
- **Variables:**
  - `u`, `c`, `l`: standard for sequences, base of exponentials, and limit.
  - `N`, `j`, `i`: indices and thresholds.
  - `ε`, `a`, `k`: auxiliary reals/naturals in proofs.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `filter_upwards`, `eventually_atTop`: for working with filters and eventual behavior.
- `gcongr`: for monotonicity-based inequalities (especially with `≤`/`<`).
- `field_simp`, `ring`, `linarith`: algebraic simplification and linear arithmetic.
- `rw [← ...]`, `convert`, `ext1`: rewriting and extensionality.
- `exact`, `refine`, `obtain`, `rcases`: proof construction and case analysis.
- `simp only`, `simp_rw`: targeted simplification (e.g., `simp_rw [div_eq_inv_mul]`).
- `tendsto_order`, `tendsto_const_nhds`, `tendsto_id`, `tendsto_pow_atTop_atTop_of_one_lt`: analysis-specific lemmas for limits.

---

#### **4. Proof Logic**

- **Structure of main convergence proofs:**
  1. **Reduction to ε-bounds**: Show `u n / n ∈ (l − ε, l + ε)` eventually.
  2. **Subsequence sandwiching**: Use monotonicity of `u` to bound `u n / n` between `u(c N)/c(N−1)` and `u(c(N−1))/c N`.
  3. **Growth control**: Choose subsequence `c` with `c(N+1)/c N ≤ 1 + ε` (possible by assumption).
  4. **Algebraic manipulation**: Expand differences like `u n − n l`, apply bounds from convergence on subsequence.
  5. **Eliminate denominators**: Avoid sign issues by working with `u n − n l` instead of `u n / n`.
- **Summation bounds:**
  - Replace floor-based indices with real powers using `⌊c^i⌋₊ ≤ c^i`.
  - Use `mul_pow_le_nat_floor_pow` to relate `⌊c^i⌋₊` and `c^i`.
  - Reduce to geometric series with ratio `< 1`, then bound tail via geometric sum formula.

---

#### **5. Imports & Scope**

- **Core dependencies:**
  - `Mathlib.Analysis.SpecificLimits.Basic`: basic limit theory (filters, `atTop`, `𝓝`).
  - `Mathlib.Analysis.SpecialFunctions.Pow.Real`: real exponentiation (`rpow`), monotonicity, logs.
- **Domain:** Asymptotic analysis of sequences, especially those tied to exponential growth and discretization (floor of powers).
- **Mathlib context:** Lean 4, Mathlib v4, classical analysis with `ℝ`, `ℕ`, filters, topology.

---

Let me know if you'd like a diagram of the logical dependencies or a summary of how these results fit into larger projects (e.g., ergodic theory, Tauberian theorems).