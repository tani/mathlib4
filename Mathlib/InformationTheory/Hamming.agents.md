### Technical Brief: Hamming Spaces in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hammingDist x y` | `∀ i, β i → ∀ i, β i → ℕ` | Counts positions where `x i ≠ y i`. |
| `hammingNorm x` | `∀ i, β i → ℕ` | Counts positions where `x i ≠ 0`. |
| `Hamming β` | `Type _` | Type synonym for `∀ i, β i`, equipped with Hamming metric/norm. |
| `toHamming`, `ofHamming` | `Equiv.refl _` | Identity equivalences between `∀ i, β i` and `Hamming β`. |
| `hammingDist_self` | `hammingDist x x = 0` | Identity of indiscernibles (reflexivity). |
| `hammingDist_comm` | `hammingDist x y = hammingDist y x` | Symmetry of distance. |
| `hammingDist_triangle` | `hammingDist x z ≤ hammingDist x y + hammingDist y z` | Triangle inequality. |
| `eq_of_hammingDist_eq_zero` | `hammingDist x y = 0 → x = y` | Separation (T₀/T₁). |
| `hammingDist_eq_zero` | `hammingDist x y = 0 ↔ x = y` | Equivalence of zero distance and equality. |
| `hammingDist_zero_right` | `hammingDist x 0 = hammingNorm x` | Relates distance to norm. |
| `hammingDist_eq_hammingNorm` | `[AddGroup] ⇒ hammingDist x y = hammingNorm (x - y)` | Core identity: distance = norm of difference. |
| `hammingNorm_smul` | `[SMulWithZero] ⇒ IsSMulRegular k ⇒ ‖k • x‖ = ‖x‖` | Norm invariance under regular scalar multiplication. |
| `normedAddCommGroup` instance | `NormedAddCommGroup (Hamming β)` | Hamming space is a normed additive commutative group. |
| `metricSpace` instance | `MetricSpace (Hamming β)` | Hamming space is a metric space (discrete topology). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hammingDist_*`: properties of the *distance* function.
  - `hammingNorm_*`: properties of the *norm* function.
  - `dist_*`, `norm_*`, `zero_*`, `smul_*`: analogues of standard metric/normed group lemmas.
- **Suffixes**:
  - `_left`, `_right`, `_comm`: indicate direction or symmetry (e.g., `triangle_left`, `comm`).
  - `_le_card_fintype`: bound by cardinality of index type.
  - `_comp_*`: behavior under composition with functions.
- **Equivalences**:
  - `toHamming`, `ofHamming`: bidirectional casting (identity via `Equiv.refl`).
  - `toHamming_zero`, `ofHamming_add`, etc.: naturality squares commute.

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|-----------------|---------|
| `simp_rw` | High | Rewriting with definitional equalities and lemmas like `ne_comm`, `sub_ne_zero`. |
| `rw` | High | Standard rewriting, especially for symmetry (`hammingDist_comm`). |
| `exact` / `refine` | Medium | Constructing proofs using lemmas like `card_mono`, `le_antisymm`. |
| `push_cast` | Medium | Lifting proofs from `ℕ` to `ℝ≥0∞` or normed structures. |
| `mod_cast` | Medium | Casting between `ℕ` and `ℝ≥0∞` in metric/normed contexts. |
| `funext` | Low | Extensionality for functions (e.g., proving `swap_hammingDist`). |
| `card_mono`, `card_union_le` | Medium | Set-theoretic cardinality reasoning. |
| `aesop` | Not present | No use of automated tactic in this file. |

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *computational* style:
  1. Unfold definitions (`hammingDist`, `hammingNorm`, `dist`, `norm`).
  2. Reduce to set-theoretic cardinality statements (e.g., subsets of `ι`).
  3. Use monotonicity (`card_mono`) or inclusion-exclusion (`card_union_le`) for inequalities.
  4. Apply `le_antisymm` for equalities (e.g., `hammingDist_comp`).
- **Induction**: Not used — finite sets and decidable equality allow direct set reasoning.
- **Case analysis**: Rare; decidability (`DecidableEq`) enables classical reasoning via `classical`.
- **Key pattern**: Prove inequality first, then symmetry or injectivity to get equality.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Group.Basic` | Provides `normedAddCommGroup`, `dist`, `norm`, and related API. |
| `Finset`, `Function` | For set cardinalities (`#{...}`), function extensionality, injectivity. |

**Scope**:  
- Finite index type `ι` (`Fintype ι`) and decidable equality (`DecidableEq`) are essential.  
- Works over arbitrary dependent types `β : ι → Type*`, with algebraic structure (e.g., `AddGroup`, `SMul`, `Zero`) lifted pointwise.  
- Designed for coding theory: minimum distance of a code = minimal `hammingDist` between distinct codewords.

---

### Summary

This file formalizes the **Hamming metric and norm** on finite product spaces, establishing:
- A discrete metric space structure (`MetricSpace`, `DiscreteTopology`).
- A normed additive commutative group structure (`NormedAddCommGroup`).
- Full compatibility with algebraic operations (`+`, `-`, `•`, `0`, `-`).
- Tight correspondence between `hammingDist` and `hammingNorm` via subtraction.

It serves as foundational infrastructure for coding theory in Lean, especially for defining and reasoning about error-correcting codes.