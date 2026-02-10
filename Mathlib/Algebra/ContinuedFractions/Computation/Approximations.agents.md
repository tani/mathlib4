### Technical Brief: `Approximations.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `GenContFract.of` | `K → GenContFract K` | Constructs a generalized continued fraction from a value `v : K` in a floor ring. |
| `SimpContFract.of` | `K → SimpContFract K` | Constructs a *simple* continued fraction (all partial numerators = 1). |
| `ContFract.of` | `K → ContFract K` | Constructs a *regular* continued fraction (partial denominators ≥ 1, integers). |
| `of_partNum_eq_one` | `(of v).partNums.get? n = some a → a = 1` | Shows all partial numerators are 1. |
| `exists_int_eq_of_partDen` | `(of v).partDens.get? n = some b → ∃ z : ℤ, b = (z : K)` | Shows all partial denominators are integers. |
| `of_one_le_get?_partDen` | `(of v).partDens.get? n = some b → 1 ≤ b` | Shows all partial denominators ≥ 1. |
| `of_isSimpContFract` | `(of v).IsSimpContFract` | Proves `GenContFract.of v` is a simple continued fraction. |
| `SimpContFract.of_isContFract` | `(SimpContFract.of v).IsContFract` | Proves `SimpContFract.of v` is a regular continued fraction. |
| `fib_le_of_contsAux_b` | `(fib n : K) ≤ (of v).contsAux n .b` (under non-termination condition) | Lower bounds denominators by Fibonacci numbers. |
| `succ_nth_fib_le_of_nth_den` | `(fib (n + 1) : K) ≤ (of v).dens n` | Immediate corollary: denominator ≥ next Fibonacci number. |
| `le_of_succ_get?_den` | `b * (of v).dens n ≤ (of v).dens (n + 1)` | Shows recurrence inequality: $b_n B_n \le B_{n+1}$. |
| `abs_sub_convs_le` | `|v - (of v).convs n| ≤ 1 / ((of v).dens n * (of v).dens (n + 1))` | Main error bound for convergents. |
| `abs_sub_convergents_le'` | `|v - (of v).convs n| ≤ 1 / (b * B_n^2)` (with `b = b_n`) | Weaker but more convenient error bound. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: properties of `GenContFract.of v`.
  - `nth_`, `succ_nth_`: indexing into streams or sequences (e.g., `nth_stream_fr`, `succ_nth_stream_b`).
  - `contsAux_`, `den_`, `partDen_`, `partNum_`: for auxiliary continuants, denominators, partial denominators/numerators.
  - `abs_sub_`: error term bounds.

- **Suffixes**:
  - `_eq`: equality lemmas (e.g., `of_partNum_eq_one`).
  - `_le`, `_lt`: inequality lemmas (e.g., `abs_sub_convs_le`, `one_le_succ_nth_stream_b`).
  - `_mono`: monotonicity (e.g., `of_den_mono`).
  - `_nonneg`, `_pos`: sign properties (e.g., `zero_le_of_den`, `zero_lt_B`).

- **Helper notation**:
  - `Aₙ`, `Bₙ`: shorthand for `(of v).nums n`, `(of v).dens n`.
  - `bₙ`: `b` such that `(of v).partDens.get? n = some b`.

---

#### **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `grind` | High | Solves arithmetic inequalities, positivity, and ordering goals. |
| `gcongr` | High | Handles monotonicity in inequalities (e.g., $a ≤ b ⇒ ca ≤ cb$ for $c ≥ 0$). |
| `simp` / `simp only` | Very High | Simplifies definitions (`contsAux`, `den`, `convs`, `compExactValue`, etc.). |
| `rw` / `rwa` | High | Rewriting using lemmas, often with `at` to rewrite in hypotheses. |
| `cases` / `rcases` / `obtain` | High | Structural decomposition (e.g., `n`, `ifp`, stream equalities). |
| `have` / `suffices` | High | Intermediate lemma introduction and goal restructuring. |
| `calc` | Medium | Chain of inequalities (e.g., Fibonacci bounds). |
| ` positivity` | Medium | Proves positivity of expressions (e.g., denominators). |
| `linarith` / `lia` | Low-Medium | Linear arithmetic for ordering and integer bounds. |
| `induction` | Medium | Structural induction (e.g., `fib_le_of_contsAux_b`). |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Many proofs (e.g., `fib_le_of_contsAux_b`) use **strong induction on `n`**, with case analysis on `n = 0, 1, ≥2`.
  - Non-termination assumptions (`¬TerminatedAt`) are used to ensure existence of stream elements via `Option.ne_none_iff_exists'`.

- **Stream → GCF translation**:
  - Lemmas about `IntFractPair.stream` (fractional/integer parts) are lifted to `GenContFract.of` via `exists_succ_get?_stream_of_gcf_of_get?_eq_some`.

- **Determinant + correctness**:
  - Error bounds (`sub_convs_eq`, `abs_sub_convs_le`) combine:
    - Finite correctness (`compExactValue_correctness_of_stream_eq_some`)
    - Determinant identity (`determinant_aux`)
    - Fibonacci lower bounds (`fib_le_of_contsAux_b`)
    - Positivity/monotonicity (`zero_le_of_den`, `of_den_mono`)

- **Bounding techniques**:
  - Use of `inv_pos`, `floor_le`, `one_le_inv₀` for fractional inverses.
  - `mul_le_mul_of_nonneg_right` to lift $1 ≤ b$ to $B_n ≤ b B_n$.
  - `div_le_div_of_nonneg_left` for reciprocal inequalities.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.ContinuedFractions.Determinant` | Determinant identity for continuants. |
| `Mathlib.Algebra.ContinuedFractions.Computation.CorrectnessTerminating` | Correctness of finite continued fractions. |
| `Mathlib.Algebra.Order.Ring.Basic` | Ordered ring theory (floor, positivity, ordering). |
| `Mathlib.Data.Nat.Fib.Basic` | Fibonacci numbers and basic properties. |
| `Mathlib.Tactic.Monotonicity` | Tactics like `gcongr`, `monotonicity`. |
| `Mathlib.Tactic.GCongr` | Generalized congruence reasoning for inequalities. |

---

#### **8. Mermaid Diagrams**

##### **Dependency Graph (Top-Level Imports)**

```mermaid
graph TD
  Approximations --> Determinant
  Approximations --> CorrectnessTerminating
  Approximations --> OrderedRing
  Approximations --> Fibonacci
  Approximations --> Monotonicity
  Approximations --> GCongr

  OrderedRing --> "Mathlib.Algebra.Order.Ring.Basic"
  Fibonacci --> "Mathlib.Data.Nat.Fib.Basic"
```

##### **Theoretical Overview of `Approximations.lean`**

```mermaid
graph TD
  A[GenContFract.of v] --> B[IntFractPair.stream v]
  B --> C[Integer part bₙ ≥ 1]
  B --> D[Fractional part frₙ ∈ [0,1)]
  C --> E[GenContFract.of v is Simple CF]
  E --> F[SimpContFract.of v]
  F --> G[ContFract.of v]
  D & E --> H[Continuants Aₙ, Bₙ]
  H --> I[Fibonacci lower bounds: Bₙ ≥ fib(n+1)]
  I --> J[Recurrence: bₙ Bₙ ≤ Bₙ₊₁]
  J & H --> K[Error bound: |v - Aₙ/Bₙ| ≤ 1/(Bₙ Bₙ₊₁)]
  K --> L[Convergence corollaries]
```

##### **Proof Flow for `abs_sub_convs_le`**

```mermaid
graph TD
  A[Stream n = some ifp] --> B[Finite correctness: v = compExactValue]
  B --> C{ifp.fr = 0?}
  C -->|Yes| D[v = convs n ⇒ error = 0]
  C -->|No| E[Unfold compExactValue]
  E --> F[Determinant identity: pA B - pB A = (-1)^n]
  F --> G[Algebraic simplification]
  G --> H[Fibonacci bounds on A,B]
  H --> I[Positivity of denominators]
  I --> J[Invert inequality: 1/den' ≤ 1/den]
  J --> K[Final bound: |error| ≤ 1/(Bₙ Bₙ₊₁)]
```

---

This file is foundational for proving convergence of continued fractions in `ApproximationCorollaries.lean`, and serves as a bridge between syntactic properties (`aᵢ = 1`, `bᵢ ∈ ℤ`, `bᵢ ≥ 1`) and analytic properties (error decay, convergence).
