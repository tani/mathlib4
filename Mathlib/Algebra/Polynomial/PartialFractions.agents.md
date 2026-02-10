### Technical Metadata Brief: Partial Fractions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `div_eq_quo_add_rem_div_add_rem_div` | `∀ f g₁ g₂, g₁.Monic → g₂.Monic → IsCoprime g₁ g₂ → ∃ q r₁ r₂, ...` | **Two-denominator case**: Decomposes `f / (g₁g₂)` into `q + r₁/g₁ + r₂/g₂` with degree bounds on remainders. Core building block for general case. |
| `div_eq_quo_add_sum_rem_div` | `∀ f g s, (∀ i ∈ s, (g i).Monic) → Pairwise coprime → ∃ q r, ...` | **General partial fraction decomposition**: Extends the two-denominator result to arbitrary finite products via induction over `Finset`. |
| `modByMonic_add_div` (used implicitly) | `f = q * g + r` with `r.degree < g.degree` when `g` monic | Standard division algorithm for polynomials over integral domains; used to construct `q`, `r₁`, `r₂`. |
| `degree_modByMonic_lt` | `r = f %ₘ g → g.Monic → r.degree < g.degree` | Formalizes the degree bound on the remainder in polynomial division by a monic polynomial. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `div_...`: Indicates results about division or decomposition of rational functions.
  - `monic_...`: Used in lemmas involving monic polynomials (e.g., `monic_prod_of_monic` — imported/used).
- **Suffixes**:
  - `_lt`: Denotes degree-bounded results (`degree_modByMonic_lt`).
  - `_add_...`: Suggests additive decomposition (`quo_add_rem_div`, `quo_add_sum_rem_div`).
- **Quantifier style**: Implicit parameters via `{...}` (e.g., `{g₁ g₂}`), often used for structural hypotheses like `Monic`, `IsCoprime`.

---

#### **3. Tactic Stack**

| Tactic | Frequency / Role |
|--------|------------------|
| `rcases` | Used to unpack existential/coprime hypotheses (`hcoprime` → `⟨c, d, hcd⟩`). |
| `refine` | Core proof construction tool; builds the witness tuple `⟨q, r₁, r₂, ...⟩`. |
| `degree_modByMonic_lt` | Applied directly as a lemma to prove degree bounds on remainders. |
| `field_simp` | Simplifies expressions in the fraction field `K`, especially to cancel nonzero denominators. |
| `norm_cast` | Lifts equalities from `R[X]` to `K` (via `algebraMap R[X] K`). |
| `linear_combination` | Verifies the key algebraic identity in the two-denominator case using the Bezout identity `f * d * g₁ + f * c * g₂ = f`. |
| `induction' ... using Finset.induction_on` | Standard induction on finite sets (insertion of a new element). |
| `split_ifs`, `if_pos`, `if_neg`, `congr`, `rw [Finset.sum_insert]`, `push_cast`, `ring` | Used in the inductive step to manage piecewise definitions (`if i = a then ... else ...`) and simplify sums/products over finite sets. |

---

#### **4. Proof Logic**

- **Two-denominator case**:
  - Uses **Bezout’s identity** (`IsCoprime g₁ g₂ ⇒ ∃ c, d, c·g₁ + d·g₂ = 1`) to construct candidates:
    - `q = f·d /ₘ g₁ + f·c /ₘ g₂`
    - `r₁ = f·d %ₘ g₁`, `r₂ = f·c %ₘ g₂`
  - Verifies correctness via polynomial division (`modByMonic_add_div`) and algebraic manipulation (`linear_combination`).
  - Degree bounds follow from `degree_modByMonic_lt`.

- **General case**:
  - **Induction on `Finset`**:
    - **Base case** (`s = ∅`): Trivial decomposition (`q = f`, `r i = 0`).
    - **Inductive step**: Split `s = insert a b`, apply two-denominator case to `g a` and `∏_{i ∈ b} g i`, then use induction hypothesis on `b`.
  - Key technical steps:
    - Show `∏_{i ∈ b} g i` is monic (via `monic_prod_of_monic`).
    - Show `g a` is coprime to `∏_{i ∈ b} g i` (via `IsCoprime.prod_right` and pairwise coprimality).
    - Combine decompositions using algebraic properties of sums/products.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Polynomial.Div` | Polynomial division (`/ₘ`, `%ₘ`, `modByMonic_add_div`, `degree_modByMonic_lt`). |
| `Mathlib.Logic.Function.Basic` | Basic function theory (e.g., for `r : ι → R[X]`). |
| `Mathlib.RingTheory.Coprime.Lemmas` | Coprimality lemmas (`IsCoprime`, `prod_right`, `IsCoprime.symm`). |
| `Mathlib.RingTheory.Localization.FractionRing` | Fraction field construction (`IsFractionRing`, `algebraMap`, casting to `K`). |
| `Mathlib.Tactic.FieldSimp`, `LinearCombination` | Tactics for simplifying field expressions and verifying linear combinations. |

**Domain Scope**:  
- **Algebraic setting**: Integral domain `R`, its polynomial ring `R[X]`, and its fraction field `K`.  
- **Polynomial conditions**: Monic and pairwise coprime denominators.  
- **Goal**: Constructive partial fraction decomposition in `K(X)`.

---

#### **6. Notable Design Choices**

- **Use of `Finset`**: Generalizes from fixed `n` to arbitrary finite index sets.
- **Embedding into `K`**: All polynomials are cast to `K` (via `↑`) to interpret fractions.
- **Monicity assumption**: Critical for degree control in division algorithm; avoids needing to normalize denominators.
- **No uniqueness**: As noted in comments, uniqueness of decomposition remains unproven (scope for expansion).

--- 

Let me know if you'd like a formalized summary for documentation or a tactic-level trace of the proof.