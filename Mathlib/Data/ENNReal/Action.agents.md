**Technical Brief: `Action.lean` — Scalar Multiplication on `ℝ≥0∞`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MulAction.compHom` | `(M : Type*) [MulAction ℝ≥0∞ M] → MulAction ℝ≥0 M` | Restricts a `MulAction` over `ℝ≥0∞` to `ℝ≥0` via `ofNNRealHom`. |
| `DistribMulAction.compHom` | `(M : Type*) [AddMonoid M] [DistribMulAction ℝ≥0∞ M] → DistribMulAction ℝ≥0 M` | Restricts `DistribMulAction`s analogously. |
| `Module.compHom` | `(M : Type*) [AddCommMonoid M] [Module ℝ≥0∞ M] → Module ℝ≥0 M` | Restricts `Module`s over `ℝ≥0∞` to `ℝ≥0`. |
| `Algebra.compHom` | `(A : Type*) [Semiring A] [Algebra ℝ≥0∞ A] → Algebra ℝ≥0 A` | Restricts `Algebra`s over `ℝ≥0∞` to `ℝ≥0`. |
| `smul_def` | `c • x = (c : ℝ≥0∞) • x` | Equates scalar multiplication over `ℝ≥0` with its embedding into `ℝ≥0∞`. |
| `smul_top` | `c • ∞ = if c = 0 then 0 else ∞` | Describes scalar multiplication by top element `∞`. |
| `nnreal_smul_ne_top_iff` | `x • y ≠ ⊤ ↔ y ≠ ⊤` (when `x ≠ 0`) | Characterizes when scalar multiplication preserves non-top-ness. |
| `nnreal_smul_lt_top_iff` | `x • y < ⊤ ↔ y < ⊤` (when `x ≠ 0`) | Characterizes strict inequality with `∞`. |
| `smul_toNNReal` | `(a • b).toNNReal = a * b.toNNReal` | Compatibility of scalar multiplication with `toNNReal`. |
| `toReal_smul` | `(r • s).toReal = r • s.toReal` | Compatibility with `toReal`. |
| `instance PosSMulStrictMono` | `PosSMulStrictMono ℝ≥0 ℝ≥0∞` | Scalar multiplication by positive reals is strictly monotone. |
| `instance SMulPosMono` | `SMulPosMono ℝ≥0 ℝ≥0∞` | Scalar multiplication by nonnegative reals is monotone. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `nnreal_`: Pertains to `ℝ≥0` (nonnegative reals).
  - `coe_`: Relates to coercion (`↑`), e.g., `coe_smul`, `coe_pos`.
  - `smul_`: Pertains to scalar multiplication (`•`).
- **Suffixes**:
  - `_def`: Definition or computational content (e.g., `smul_def`, `smul_def'`).
  - `_iff`: Logical equivalence (e.g., `nnreal_smul_ne_top_iff`).
  - `_left`, `_right`: For left/right actions or commutativity (e.g., `smulCommClass_left`).
- **`compHom`**: Indicates restriction via a homomorphism (`ofNNRealHom`).

---

### 3. **Tactic Stack**

- `simp`, `simp_rw`: For simplification using definitions and lemmas (e.g., `smul_def`, `ENNReal.coe_mul`).
- `rw`: Rewriting using equalities (e.g., `← smul_one_mul`, `smul_eq_mul`).
- `change`: To adjust the goal’s syntax to match a known lemma.
- `rfl`: Reflexivity for definitional equalities.
- `by simp [Algebra.commutes]`, `by simp [← Algebra.smul_def …]`: Targeted simplification for algebraic structure.
- `mul_lt_mul_right`, `mul_le_mul_left`: From `Mathlib.Data.ENNReal.Basic` for monotonicity.
- `coe_pos.2`, `coe_ne_top`, `coe_le_coe.2`: Coercion lemmas for `ℝ≥0 → ℝ≥0∞`.

---

### 4. **Proof Logic**

- **Strategy**: Most proofs follow a *restriction pattern*:
  1. Use `compHom` to define instances via `ofNNRealHom : ℝ≥0 →+* ℝ≥0∞`.
  2. Prove definitional compatibility (e.g., `smul_def`) via `rfl`.
  3. For properties involving `∞`, use case analysis (`if ... then ... else ...`) or lemmas like `mul_top'`, `smul_eq_zero`.
  4. For equivalences (`↔`), prove both directions separately, often using `smul_top` and `ne_of_gt`/`ne_of_lt`.
  5. For monotonicity instances, apply known lemmas from `ENNReal` (e.g., `mul_lt_mul_right`).

- **Induction**: Not used here — the proofs are mostly algebraic and rely on existing `ENNReal` lemmas.

---

### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Module.Torsion.Field` | Provides torsion-free module context and related lemmas (used in `smul_top`). |
| `Mathlib.Data.ENNReal.Operations` | Core operations on `ℝ≥0∞`, including `mul_top'`, `mul_lt_mul_right`, `toNNReal`, `toReal`. |

---

### 6. **Dependency & Theory Overview (Mermaid Diagrams)**

#### **Module Dependency Graph**
```mermaid
graph TD
  A[Action.lean] --> B[Mathlib.Algebra.Module.Torsion.Field]
  A --> C[Mathlib.Data.ENNReal.Operations]
  A --> D[Mathlib.Data.ENNReal.Basic] % implicit via ENNReal namespace
  A --> E[Mathlib.Algebra.Module]
  A --> F[Mathlib.Algebra.Algebra]
  A --> G[Mathlib.Algebra.MonoidWithZero]
```

#### **Conceptual Overview**
```mermaid
flowchart LR
  subgraph "Base Types"
    R[ℝ≥0] --> R∞[ℝ≥0∞]
  end

  subgraph "Algebraic Structures"
    MA[MulAction] -->|restrict| MA_R[MulAction over ℝ≥0]
    DMA[DistribMulAction] -->|restrict| DMA_R[DistribMulAction over ℝ≥0]
    M[Module] -->|restrict| M_R[Module over ℝ≥0]
    A[Algebra] -->|restrict| A_R[Algebra over ℝ≥0]
  end

  R∞ -->|via ofNNRealHom| R
  MA -->|via compHom| MA_R
  DMA -->|via compHom| DMA_R
  M -->|via compHom| M_R
  A -->|via compHom| A_R

  R∞ -->|mul, toNNReal, toReal| R
```

#### **Key Theoretical Insight**
- The file formalizes the *functoriality* of scalar restriction along the inclusion `ofNNRealHom : ℝ≥0 ↪ ℝ≥0∞`.
- It ensures that algebraic structures defined over `ℝ≥0∞` behave well when restricted to `ℝ≥0`, especially with respect to the top element `∞`.
- The lemmas `nnreal_smul_ne_top_iff`, `nnreal_smul_lt_top_iff` are critical for reasoning about boundedness and non-top-ness under scalar multiplication.

--- 

Let me know if you'd like a formalized dependency graph in `leanpkg` format or a summary of how this fits into the broader `Mathlib` architecture.
