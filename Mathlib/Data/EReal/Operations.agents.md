**Technical Brief: `Operations.lean` (EReal Arithmetic)**  
*Domain: Extended Real Numbers (`EReal`), Lean 4 / Mathlib*

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `EReal.neg` | `EReal → EReal` | Pointwise negation: `⊥ ↦ ⊤`, `⊤ ↦ ⊥`, `x ↦ -x` for reals. |
| `EReal.add` | `EReal → EReal → EReal` | Extended real addition inherited from `WithBot (WithTop ℝ)`. Defined so `⊥ + ⊤ = ⊤ + ⊥ = ⊥`. |
| `EReal.sub` | `x - y := x + (-y)` | Subtraction via negation; inherits pathologies of addition. |
| `EReal.mul` | `EReal → EReal → EReal` | Multiplication with `0 * x = x * 0 = 0`, and sign-dependent behavior at infinities (e.g., `⊤ * ⊤ = ⊤`, `⊤ * ⊥ = ⊥`). |
| `negOrderIso` | `EReal ≃o ERealᵒᵈ` | Order-reversing isomorphism induced by negation. |
| `add_bot`, `bot_add` | `x + ⊥ = ⊥`, `⊥ + x = ⊥` | Left/right annihilation by bottom (`-∞`). |
| `top_add_top`, `top_add_coe`, `add_top_of_ne_bot` | `⊤ + ⊤ = ⊤`, `⊤ + x = ⊤` if `x ≠ ⊥` | Top (`+∞`) absorbs non-bottom elements. |
| `add_ne_top_iff_ne_top₂` | `x + y ≠ ⊤ ↔ x ≠ ⊤ ∧ y ≠ ⊤` (when `x, y ≠ ⊥`) | Characterizes when sum avoids `⊤`. |
| `neg_add` | `-(x + y) = -x - y` under `x ≠ ⊥ ∨ y ≠ ⊤`, `x ≠ ⊤ ∨ y ≠ ⊥` | Negation distributes over addition *except* at problematic infinities. |
| `mul_top_of_pos`, `mul_top_of_neg` | `0 < x → x * ⊤ = ⊤`, `x < 0 → x * ⊤ = ⊥` | Multiplication by `⊤` respects sign. |
| `mul_pos_iff`, `mul_nonneg_iff` | `0 < a * b ↔ (0 < a ∧ 0 < b) ∨ (a < 0 ∧ b < 0)` | Sign rules for product. |
| `mul_eq_top`, `mul_eq_bot` | Full case analysis for when product equals `⊤` or `⊥`. | Critical for reasoning about divergence. |
| `toENNReal_mul` | `(x * y).toENNReal = x.toENNReal * y.toENNReal` if `0 ≤ x` | Multiplicativity of `toENNReal` on nonnegative arguments. |
| `left_distrib_of_nonneg` (mentioned in docstring) | `0 ≤ x < ⊤ ⇒ x * (y + z) = x * y + x * z` | Distributivity recovered under boundedness. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `add_`, `mul_`, `sub_`, `neg_`: Basic operations.
  - `top_`, `bot_`: Special cases involving `⊤` or `⊥`.
  - `coe_`: Interaction with coercion from `ℝ`, `ℝ≥0∞`, `NNReal`.
  - `toReal_`, `toENNReal_`: Projection to `ℝ` or `ℝ≥0∞`.
- **Suffixes**:
  - `_of_ne_bot`, `_of_ne_top`: Hypotheses excluding infinities.
  - `_iff`: Biconditional characterizations (e.g., `add_ne_top_iff_ne_top₂`).
  - `_le`, `_lt`, `_pos`, `_nonneg`: Order-theoretic variants.
- **Suffixes for symmetry**:
  - `_left`, `_right`: Positional variants (e.g., `add_lt_add_left_coe`, `sub_le_of_le_add'`).
  - `_symm`, `_neg_left`: For symmetric/negation-invariant induction principles.

---

### 3. TACTIC STACK

| Tactic | Usage Frequency | Role |
|--------|-----------------|------|
| `induction` (on `EReal`) | Very High | Case analysis on `⊥`, `⊤`, `coe r`. Often nested (`induction x <;> induction y`). |
| `simp` / `simp_all` | Very High | Simplifies using `@[simp]` lemmas (e.g., `add_bot`, `neg_top`). |
| `rw` / `rwa` | High | Rewriting with definitions, lemmas, and equivalences. |
| `cases` | High | Splitting on `x = ⊥`, `x = ⊤`, or order comparisons (`le_total`, `lt_trichotomy`). |
| `aesop` | Medium | Automated reasoning for order and positivity goals. |
| `norm_cast` | Medium | Handles coercion normalization (e.g., `↑(-x) = -↑x`). |
| `push_neg` | Medium | Pushes negation inward in logical formulas (e.g., `mul_ne_top`). |
| `gcongr` | Low | For monotonicity/congruence in chains of inequalities. |
| `tauto` | Medium | Tactic for propositional logic (e.g., in `mul_eq_top` proofs). |
| `lift` | Medium | Lifting `x : EReal` to `ℝ` when `x ≠ ⊤ ∧ x ≠ ⊥`. |

---

### 4. PROOF LOGIC

**Typical proof structure**:

1. **Case analysis** on `x`, `y`, `z`, etc., using `induction x <;> induction y` or `cases x`.
2. **Simplify** using `simp` with `@[simp]` lemmas for `add_bot`, `top_add`, `neg_top`, etc.
3. **Handle problematic infinities** via hypotheses like `h : x ≠ ⊤`, `h' : y ≠ ⊥`, or disjunctions like `h : x ≠ ⊥ ∨ y ≠ ⊤`.
4. **Lift to reals** when both endpoints avoid `⊥` and `⊤`, then apply real arithmetic (`lift x to ℝ using ⟨hx, h'x⟩`).
5. **Use order properties** (e.g., `add_lt_add`, `le_sub_iff_add_le`) and duality via `negOrderIso`.
6. **Apply induction principles** (`induction₂_symm`, `induction₂_neg_left`) for binary properties, often with symmetry/negation invariance to reduce cases.

**Example flow** for `mul_pos_iff`:
- Induct on `a`, `b` using `induction₂_symm`.
- Simplify each case (`top_top`, `top_pos`, `coe_coe`, etc.).
- Use `coe_pos`, `coe_mul`, and real `mul_pos_iff` for the `coe_coe` case.
- Discharge remaining cases via `simp` and sign lemmas.

---

### 5. IMPORTS & DEPENDENCIES

| Module | Role |
|--------|------|
| `Mathlib.Data.EReal.Basic` | Core `EReal` definition (`WithBot (WithTop ℝ)`), coercion, order, basic ops. |
| `Batteries.Util.ProofWanted` | Provides `proof_wanted` for incomplete proofs (e.g., `recENNReal_neg_coe_ennreal`). |
| `ENNReal`, `NNReal` | Extended/nonnegative reals used in `toENNReal`, `toReal`, and multiplication. |

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (Module-Level)

```mermaid
graph TD
  A[Operations.lean] --> B[Mathlib.Data.EReal.Basic]
  A --> C[Batteries.Util.ProofWanted]
  A --> D[Mathlib.Data.EReal.Inv.lean] %% cited for CommMonoidWithZero instance
  B --> E[Mathlib.Data.WithBot.Basic]
  B --> F[Mathlib.Data.WithTop.Basic]
  B --> G[Mathlib.Data.Real.Basic]
  D --> B
```

#### Overview of `EReal` Arithmetic Structure

```mermaid
graph LR
  subgraph EReal_Structure
    A[EReal] -->|WithBot (WithTop ℝ)| B[LinearOrderedAddCommMonoid]
    A -->|neg| C[InvolutiveNeg]
    A -->|mul| D[CommMonoidWithZero]
    A -->|sub| E[SubNegZeroMonoid]
  end

  subgraph Pathologies
    B -->|bad at ⊥+⊤| F[No Group Structure]
    D -->|no distrib| G[No Ring Structure]
  end

  subgraph Workarounds
    C --> H[negOrderIso: EReal ≃o ERealᵒᵈ]
    D --> I[left_distrib_of_nonneg]
    E --> J[le_sub_iff_add_le]
  end
```

---

### 7. SIGNIFICANT ALGEBRAIC LIMITATIONS

- **No additive group**: `⊥ + ⊤ = ⊥` breaks invertibility.
- **No distributive ring**: `1 * ⊥ + (-1) * ⊥ ≠ (1 - 1) * ⊥`.
- **Multiplication is associative but not proven in this file** (125-case proof deferred to `Inv.lean`).
- **Subtraction lacks algebraic structure**: Only `SubNegZeroMonoid` is registered.

---

### 8. CONVENTIONS & DESIGN PRINCIPLES

- **Exponential/logarithm compatibility**: `⊥ + ⊤ = ⊥` ensures `exp`/`log` preserve operations between `EReal` and `ℝ≥0∞`.
- **Zero times infinity**: `0 * x = 0` (consistent with measure theory on `ℝ≥0∞`).
- **Sign-aware behavior**: Multiplication at infinities is defined via sign (e.g., `x < 0 ⇒ x * ⊤ = ⊥`).
- **Hypothesis minimality**: Lemmas like `add_lt_add_of_lt_of_le'` weaken assumptions at the cost of convenience.

--- 

*End of Technical Brief*
