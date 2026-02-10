### Technical Metadata Brief: Catalan Numbers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `catalan : ℕ → ℕ` | Recursive function | Defines the *n*th Catalan number via convolution: `catalan (n+1) = ∑_{i=0}^n catalan i * catalan (n-i)` |
| `catalan_zero` | `catalan 0 = 1` | Base case of recursion |
| `catalan_succ` | `catalan (n+1) = ∑ i : Fin n.succ, catalan i * catalan (n - i)` | Recursive step (explicit sum over `Fin`) |
| `catalan_succ'` | `catalan (n+1) = ∑ ij ∈ antidiagonal n, catalan ij.1 * catalan ij.2` | Equivalent formulation using `antidiagonal n ⊆ ℕ × ℕ` |
| `catalan_eq_centralBinom_div` | `catalan n = Nat.centralBinom n / (n + 1)` | **Main theorem**: closed-form formula via central binomial coefficient |
| `succ_mul_catalan_eq_centralBinom` | `(n + 1) * catalan n = n.centralBinom` | Equivalent reformulation (avoids division) |
| `treesOfNumNodesEq : ℕ → Finset (Tree Unit)` | Finite set of binary trees with `n` nodes | Encodes combinatorial interpretation: binary trees with `n` internal nodes |
| `mem_treesOfNumNodesEq` | `x ∈ treesOfNumNodesEq n ↔ x.numNodes = n` | Characterizes membership in `treesOfNumNodesEq n` |
| `treesOfNumNodesEq_card_eq_catalan` | `#(treesOfNumNodesEq n) = catalan n` | **Main combinatorial result**: number of such trees equals Catalan number |

**Helper definitions**:
- `gosperCatalan : ℕ → ℕ → ℚ`  
  A telescoping sum helper used in the proof of `catalan_eq_centralBinom_div`.
- `pairwiseNode : Finset (Tree Unit) → Finset (Tree Unit) → Finset (Tree Unit)`  
  Constructs trees by pairing left/right subtrees from two finsets.

---

#### **2. Naming Conventions**

- **Predicates/properties**:  
  - `is_` prefix (e.g., `is_le`, `is_lt`) — used in `Fin`/`antidiagonal` lemmas.
  - `mem_` prefix (e.g., `mem_treesOfNumNodesEq`) — membership criteria.
- **Set/cardinality**:  
  - `card_` (e.g., `card_map`, `card_product`, `card_biUnion`) — cardinality lemmas.
- **Tree-related**:  
  - `treesOfNumNodesEq` — trees indexed by node count.
  - `pairwiseNode` — binary tree constructor from pairs.
- **Arithmetic helpers**:  
  - `succ_mul_`, `mul_succ_`, `sub_eq_`, `add_comm` — standard arithmetic rewrites.
- **Summation**:  
  - `sum_range`, `sum_antidiagonal_eq_sum_range_succ`, `sum_congr` — used heavily in proofs.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using lemmas, especially `catalan_zero`, `catalan_succ'`, `mem_treesOfNumNodesEq` |
| `induction' ... using Nat.case_strong_induction_on` | Strong induction on `n`, standard for recursive definitions like Catalan |
| `congr` / `ext1` | Proving equality of sums/trees by extensionality |
| `field_simp` + `ring` | Rational arithmetic simplification (critical in `gosper_trick`, `catalan_eq_centralBinom_div`) |
| `rw [h₁, h₂, h₃, h₄]` | Rewriting using algebraic identities (e.g., `succ_mul_centralBinom_succ`) |
| `norm_cast` | Moving between `ℕ` and `ℚ` (e.g., after `catalan_eq_centralBinom_div`) |
| `aesop` / `omega` | Not explicitly used here, but `omega` appears in `decreasing_by` for termination proofs |
| `cases'` + `simp` | Structural induction on `Tree Unit` (e.g., `Tree.unitRecOn`) |
| `apply ...; intros` | Goal-directed proof style for disjointness and injectivity |

---

#### **4. Proof Logic**

- **Structure of `catalan_eq_centralBinom_div` proof**:
  1. Lift to `ℚ` to handle division cleanly.
  2. Use **strong induction** on `n`.
  3. Replace `catalan i`, `catalan (n-i)` by induction hypothesis (IH) using `hd`.
  4. Apply `gosper_trick` to rewrite each term as a telescoping difference:  
     `gosperCatalan(n+1, i+1) - gosperCatalan(n+1, i)`
  5. Sum telescoping series → only endpoints remain.
  6. Compute endpoints using `gosper_catalan_sub_eq_central_binom_div`.
  7. Conclude equality in `ℚ`, then descend to `ℕ` using divisibility (`n.succ_dvd_centralBinom`).

- **Structure of `treesOfNumNodesEq_card_eq_catalan` proof**:
  1. Strong induction on `n`.
  2. Expand `treesOfNumNodesEq (n+1)` using its definition (union over `antidiagonal n`).
  3. Use `card_biUnion` + `card_map` + `card_product` to reduce to sum of products.
  4. Apply IH to each subtree count.
  5. Show disjointness of components (via `disjoint_left`) to ensure no overcounting.
  6. Match resulting sum with `catalan_succ'`.

---

#### **5. Imports & Scope**

**Core dependencies**:
- `Mathlib.Algebra.BigOperators.Fin` — finite sums over `Fin n`
- `Mathlib.Algebra.BigOperators.NatAntidiagonal` — sums over `antidiagonal n`
- `Mathlib.Algebra.CharZero.Lemmas` — ensures `ℚ` is a `CharZero` field (needed for division)
- `Mathlib.Data.Finset.NatAntidiagonal` — properties of `antidiagonal n ⊆ ℕ × ℕ`
- `Mathlib.Data.Nat.Choose.Central` — central binomial coefficients (`Nat.centralBinom`)
- `Mathlib.Data.Tree.Basic` — binary trees (`Tree Unit`), `numNodes`, etc.
- `Mathlib.Tactic.FieldSimp`, `GCongr`, `Positivity` — arithmetic & positivity reasoning

**Domain scope**:  
Combinatorics of binary trees, integer sequences, algebraic identities in `ℕ`/`ℚ`, and formal verification of classic combinatorial formulas.

--- 

Let me know if you'd like a diagram of the proof dependency graph or a summary of the `Tree`-theoretic lemmas.