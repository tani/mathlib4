### Technical Metadata Brief: `Data.ENNReal.Defs` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ENNReal` | `Type` ≡ `WithTop ℝ≥0` | Extended nonnegative reals `[0, ∞]`, defined as `WithTop` over `ℝ≥0`. |
| `∞` | `ENNReal` | Notation for `⊤ : WithTop ℝ≥0`, i.e., the top element. |
| `ofNNReal` | `ℝ≥0 → ENNReal` | Coercion embedding `ℝ≥0` into `ENNReal`. |
| `toNNReal` | `ENNReal → ℝ≥0` | Projects `a : ENNReal` to its real part if finite, else `0`. |
| `toReal` | `ENNReal → ℝ` | `coe ∘ toNNReal`, maps `∞` to `0`. |
| `ofReal` | `ℝ → ENNReal` | Embeds real numbers into `ENNReal` by truncating negatives to `0`. |
| `neTopEquivNNReal` | `{a // a ≠ ∞} ≃ ℝ≥0` | Equivalence between nonzero (i.e., finite) `ENNReal` and `ℝ≥0`. |
| `canLift` | `CanLift ENNReal ℝ≥0 ofNNReal (· ≠ ∞)` | Enables case analysis: `a = ∞` or `a ≠ ∞`, then lift to `ℝ≥0`. |
| `instInv` | `Inv ENNReal` | Inversion defined as `a⁻¹ = sInf { b | 1 ≤ a * b }`. |
| `instDivInvMonoid` | `DivInvMonoid ENNReal` | Makes `ENNReal` a `DivInvMonoid`, enabling division and integer powers. |
| `coe_injective` | `Injective (↑ : ℝ≥0 → ENNReal)` | Injectivity of coercion. |
| `coe_le_coe`, `coe_lt_coe` | `(↑r ≤ ↑q ↔ r ≤ q)`, `(↑r < ↑q ↔ r < q)` | Order preservation under coercion. |
| `coe_add`, `coe_mul`, `coe_pow`, `coe_natCast` | Preservation of algebraic ops under coercion. |
| `toNNReal_coe`, `toReal_ofReal`, `ofReal_toReal` | Simplification lemmas for compositions of coercions/projections. |
| `toNNReal_eq_zero_iff`, `toReal_eq_zero_iff` | Characterization of when projection yields `0`. |
| `lt_iff_exists_rat_btwn`, `lt_iff_exists_real_btwn`, `lt_iff_exists_nnreal_btwn` | Density characterizations of strict order. |
| `le_of_forall_pos_le_add` | Analogue of Archimedean characterization of ≤. |
| `exists_nat_gt` | For any finite `a : ENNReal`, ∃ `n : ℕ`, `a < n`. |
| `iUnion_Iio_coe_nat`, `iInter_Ici_coe_nat`, etc. | Covering/decomposition lemmas for intervals using naturals. |
| `ofNNRealHom` | `ℝ≥0 →+* ENNReal` | Ring homomorphism embedding `ℝ≥0` into `ENNReal`. |

**Notable Theorems (selected):**
- `ofReal_toReal_le`, `ofReal_toReal_eq_iff`: Relationship between `ofReal` and `toReal`.
- `toReal_ofReal_eq_iff`: `toReal(ofReal r) = r ↔ 0 ≤ r`.
- `mul_le_mul_left'`, `zero_le_one`: Used in `LinearOrderedCommMonoidWithZero` instance.
- `one_lt_two`, `two_lt_top`, `natCast_lt_top`: Basic order facts about naturals.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `coe_`: Coercion-related lemmas (e.g., `coe_add`, `coe_le_coe`).
  - `toNNReal_`, `toReal_`, `ofReal_`, `ofNNReal_`: Projection/embedding lemmas.
  - `natCast_`, `ofNat_`: Natural number coercion.
  - `iUnion_`, `iInter_`, `iSup_`, `iInf_`: Sup/inf over index families.
  - `neTop_`, `top_ne_`, `top_lt_`, `lt_top_`: Facts about `∞`.

- **Suffixes:**
  - `_iff`: Equivalence lemmas (e.g., `coe_le_coe_iff`, `toReal_eq_zero_iff`).
  - `_mono`, `_strictMono`: Monotonicity/strict monotonicity.
  - `_hom`: Homomorphism definitions (`ofNNRealHom`).
  - `_eq_iff`, `_ne_iff`: Characterizations of equality/inequality.

- **Pattern:**
  - `coe_toNNReal_eq_toReal`: Composition of coercion and projection.
  - `ofReal_natCast`: Embedding of natural numbers via `ofReal`.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplification of coercions, projections, and order facts. |
| `rw` | Rewriting using lemmas like `coe_le_coe`, `toNNReal_coe`, etc. |
| `exact`, `refine`, `apply` | Direct proof steps, especially for order and algebraic properties. |
| `lift ... to ℝ≥0 using ...` | Leveraging `canLift` to reduce to finite case. |
| `rcases`, `cases` | Case analysis on `a : ENNReal` (finite vs `∞`). |
| `ext` | Extensionality for sets/functions. |
| `contrapose!` | Contrapositive reasoning (e.g., in `le_of_forall_pos_le_add`). |
| `aesop` | Automated reasoning for finiteness, inequality goals (e.g., `coe_ne_top`). |
| `rwa`, `rw [...] at *` | Rewriting in hypotheses. |
| `norm_cast` | Normalizing casts (e.g., `coe_zero`, `coe_one`). |
| `linarith`, `nlinarith` | Linear/nonlinear arithmetic (used implicitly via `aesop`). |
| `interval_cases`, `omega` | Not present here (Lean 4 style avoids them in favor of `aesop`). |

---

#### **4. Proof Logic**

- **Induction/Case Analysis Pattern:**
  - Most proofs about `a : ENNReal` split into:
    1. `a = ∞` (top case),
    2. `a ≠ ∞` → lift to `r : ℝ≥0` using `canLift`.
  - Example: `toReal_eq_zero_iff`, `le_of_forall_pos_le_add`, `lt_iff_exists_add_pos_lt`.

- **Order Reasoning:**
  - Leverages `WithTop` order structure: `a ≤ ∞`, `↑r < ∞`, `¬∞ ≤ ↑r`.
  - Uses density lemmas (`lt_iff_exists_rat_btwn`, etc.) to reduce to ℚ/ℝ/ℝ≥0.

- **Algebraic Structure:**
  - Relies on `WithTop`-derived instances: `CanonicallyOrderedCommSemiring`, `LinearOrderedAddCommMonoidWithTop`, `DivInvMonoid`.
  - Proofs often reduce to `ℝ≥0` via coercion lemmas (`coe_add`, `coe_mul`, etc.).

- **Set-Theoretic Arguments:**
  - Interval decompositions (`iUnion_Iio_coe_nat`, etc.) use `ext`, `mem_iUnion`, and `exists_nat_gt`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.Ring.WithTop` | Provides `WithTop`-based ordered ring/semiring structures. |
| `Mathlib.Algebra.Order.Sub.WithTop` | Defines subtraction on `WithTop`. |
| `Mathlib.Data.NNReal.Defs` | Defines `ℝ≥0` (nonnegative reals), used as base for `ENNReal`. |

**Key Dependencies:**
- `WithTop` infrastructure (order, algebra, lattice).
- `NNReal` (nonnegative reals) and its coercion to `ℝ`.
- `CompleteLinearOrder`, `DenselyOrdered`, `CanonicallyOrderedCommSemiring` typeclasses.

---

### Summary

This file establishes the foundational structure of `ENNReal = WithTop ℝ≥0`, including:
- **Order & lattice** (complete linear order, dense, bounded),
- **Algebra** (semiring, division, inversion),
- **Coercions & projections** (`ofNNReal`, `toNNReal`, `toReal`, `ofReal`),
- **Equivalences** (`neTopEquivNNReal`),
- **Interval calculus** (covering lemmas over naturals),
- **Tactic support** (`canLift`, `positivity` extensions).

It serves as the base for measure theory (`MeasureTheory.Measure`) and extended metric spaces (`EMetricSpace`), where `edist` and measures take values in `ENNReal`.