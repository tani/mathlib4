### Technical Metadata Brief: `EReal.exp` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `EReal.exp` | `EReal → ℝ≥0∞` | Extension of real exponential to extended reals: maps `⊥ ↦ 0`, `⊤ ↦ ∞`, and `x : ℝ ↦ ENNReal.ofReal (Real.exp x)` |
| `exp_bot` | `exp ⊥ = 0` | Definitional simplification for bottom element |
| `exp_top` | `exp ⊤ = ∞` | Definitional simplification for top element |
| `exp_coe` | `exp (x : ℝ) = ENNReal.ofReal (Real.exp x)` | Compatibility with real embedding |
| `exp_eq_zero_iff` | `exp x = 0 ↔ x = ⊥` | Characterizes when exponential is zero |
| `exp_eq_top_iff` | `exp x = ∞ ↔ x = ⊤` | Characterizes when exponential is infinite |
| `exp_strictMono` | `StrictMono exp` | Exponential is strictly increasing on `EReal` |
| `exp_lt_exp_iff` | `exp a < exp b ↔ a < b` | Strict monotonicity in inequality form |
| `exp_le_exp_iff` | `exp a ≤ exp b ↔ a ≤ b` | Monotonicity in non-strict inequality form |
| `exp_neg` | `exp (-x) = (exp x)⁻¹` | Exponential of negation equals inverse |
| `exp_add` | `exp (x + y) = exp x * exp y` | Exponential preserves addition as multiplication |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exp_`: Standard prefix for all lemmas/definitions related to `EReal.exp`.
  - `is_`, `mem_`, `coerce_`, etc., are *not* used here — this is a focused module on `exp`.
- **Suffixes**:
  - `_iff`: Used for biconditional characterizations (`exp_eq_zero_iff`, `exp_lt_exp_iff`, etc.).
  - `_bot`, `_top`, `_coe`: For special cases involving `⊥`, `⊤`, or real coercion.
  - `_mono`, `_lt`, `_le`: For monotonicity and order-related lemmas.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `induction x` / `induction y`: Structural induction on `EReal` (cases: `⊥`, `x : ℝ`, `⊤`)
- `simp` / `simp_rw`: Simplification using `@[simp]` lemmas and rewriting
- `rw`: Rewriting using known identities (e.g., `Real.exp_add`, `ENNReal.ofReal_inv_of_pos`)
- `exact`, `mod_cast`, `cast`, ` rfl`: Standard proof automation
- `ENNReal.ofReal_lt_ofReal_iff'.mpr`: For translating inequalities under `ENNReal.ofReal`
- `Real.exp_pos`, `Real.exp_nonneg`: Basic real analysis facts used in preconditions

No heavy automation like `aesop` or `linarith` is used — the proofs are mostly structural and case-based.

---

#### **4. Proof Logic**

- **Structure**: Proofs proceed by *induction on the extended real argument(s)*, splitting into three cases:
  1. `x = ⊥`
  2. `x = (c : ℝ)` (real coercion)
  3. `x = ⊤`
- **Monotonicity proofs** (`exp_strictMono`, `exp_lt_exp_iff`, etc.) use:
  - Induction on both `a` and `b`
  - Reduction to real case via `exp_coe`, then apply `Real.exp_lt_exp_of_lt`
  - Use of `ENNReal.ofReal_lt_ofReal_iff'` to lift real inequalities
- **Algebraic properties** (`exp_neg`, `exp_add`) use:
  - Case analysis + simplification for `⊥`, `⊤`
  - For real arguments: rewrite using `ENNReal.ofReal_*` lemmas (e.g., `ofReal_inv_of_pos`, `ofReal_mul`)
  - Apply known real identities (`Real.exp_neg`, `Real.exp_add`)
  - Handle infinities via `ENNReal.mul_top`, `ENNReal.top_mul`, etc.

---

#### **5. Imports & Dependencies**

- **Core imports**:
  - `Mathlib.Data.Complex.Exponential`: Provides `Real.exp` and related lemmas (e.g., `Real.exp_add`, `Real.exp_neg`, `Real.exp_pos`)
  - `Mathlib.Data.Real.EReal`: Defines `EReal`, `ENNReal`, and their order/topological structure
- **Implicit dependencies** (via `ENNReal` and `EReal`):
  - `Mathlib.Data.ENNReal.Basic`, `Mathlib.Data.ENNReal.Operations`, `Mathlib.Data.ENNReal.Instances`
  - `Mathlib.Data.EReal.Basic`, `Mathlib.Data.EReal.Arithmetic`
- **Key lemmas used from other libraries**:
  - `Real.exp_pos`, `Real.exp_nonneg`
  - `ENNReal.ofReal_mul`, `ENNReal.ofReal_inv_of_pos`, `ENNReal.mul_top`, `ENNReal.top_mul`
  - `StrictMono.lt_iff_lt`, `StrictMono.le_iff_le`

---

#### **6. Domain-Specific AI Agent Notes**

- **Target domain**: Real analysis on extended reals, especially measure theory or probability (where `EReal` and `ℝ≥0∞` are common).
- **Typical use cases**:
  - Defining extended exponential distributions
  - Proving continuity/monotonicity of extended functions
  - Formalizing information-theoretic quantities (e.g., entropy, KL divergence) with infinities
- **Pattern to recognize**:
  - When seeing `exp` in `EReal`, expect case analysis on `⊥`, `⊤`, and reals.
  - Expect `ENNReal.ofReal` to bridge real-valued exponentials to extended nonnegative reals.

--- 

Let me know if you'd like a formalized summary in a specific format (e.g., JSON, YAML, or a Lean doc-string template).