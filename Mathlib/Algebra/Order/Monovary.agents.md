### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `MonovaryOn f g s` | `f` and `g` are *monovarying* on `s`: for all `i, j ∈ s`, `i < j → f i ≤ f j → g i ≤ g j` (i.e., they preserve order jointly). |
| `AntivaryOn f g s` | `f` and `g` are *antivarying* on `s`: for all `i, j ∈ s`, `i < j → f i ≤ f j → g j ≤ g i` (i.e., they reverse order jointly). |
| `Monovary f g` | Global version of `MonovaryOn` over the entire domain (`s = univ`). |
| `Antivary f g` | Global version of `AntivaryOn`. |
| `monovaryOn_inv_left`, `antivaryOn_inv_left`, etc. | Characterise interaction of inversion with monovariance/antivariance (e.g., `f⁻¹` monovaries with `g` iff `f` antivaries with `g`). |
| `MonovaryOn.mul_left`, `AntivaryOn.mul_left`, etc. | Closure properties: pointwise product of two monovarying (resp. antivarying) functions w.r.t. same `g` is monovarying (resp. antivarying). |
| `MonovaryOn.pow_left`, `pow_left₀`, etc. | Powers preserve monovariance/antivariance under positivity assumptions. |
| `monovaryOn_iff_forall_smul_nonneg`, `antivaryOn_iff_forall_smul_nonpos` | Equivalence between monovariance and nonnegativity (resp. nonpositivity) of `(f j - f i) • (g j - g i)` for all `i, j ∈ s`. |
| `monovaryOn_iff_smul_rearrangement`, `antivaryOn_iff_smul_rearrangement` | **Rearrangement inequality characterisation**: `f` and `g` monovary iff `f i • g j + f j • g i ≤ f i • g i + f j • g j` for all `i, j ∈ s`. |
| `monovaryOn_iff_mul_rearrangement`, `antivaryOn_iff_mul_rearrangement` | Specialisation of above to `α = β = ℝ` (or linearly ordered ring), where `•` becomes `*`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `monovaryOn_`, `antivaryOn_`: statements about *restricted* (on set `s`) monovariance/antivariance.
  - `monovary_`, `antivary_`: global versions (no restriction).
  - `*_left`, `*_right`: indicate which argument (left or right function) is being transformed (e.g., `inv_left` acts on `f`, `inv_right` on `g`).
  - `*_₀`: variants requiring *nonnegativity* (`0 ≤`) or *positivity* (`0 <`) assumptions on the functions involved (e.g., `mul_left₀`, `pow_left₀`, `inv_left₀`).
- **Suffixes**:
  - `inv`, `mul`, `div`, `pow`: operation applied to one of the functions.
- **Alias pattern**:
  - `alias ⟨MonovaryOn.of_X, AntivaryOn.X⟩ := thm` — dual introduction/elimination rules for monovary/antivary pairs.

#### 3. **Tactic Stack**

- `simp` / `simp_rw`: heavily used for unfolding definitions (`MonovaryOn`, `AntivaryOn`, `inv`, `smul`, etc.).
- `rw`: for rewriting using equivalences (e.g., `monovaryOn_iff_forall_smul_nonneg`).
- `exact`, `intro`, `introv`, `cases`: basic proof structure.
- `mul_le_mul'`, `div_le_div''`, `pow_le_pow_left'`, `pow_le_pow_left₀`: ordered algebra lemmas for manipulating inequalities.
- `lt_or_lt_of_mul_lt_mul`, `lt_or_lt_of_div_lt_div`: used in `LinearOrderedCommGroup`/`LinearOrderedSemiring` to handle strictness.
- `forall₂_swap`, `forall_swap`, `forall₃_congr`, `forall₄_congr`, `forall₅_congr`: for manipulating quantifier order and congruences.
- `symm`: to flip equivalences/inequalities when needed (e.g., `h.symm.mul_left₀`).
- `erw`: rewrite with definitional equality (e.g., for `inv_lt_inv₀`).

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs are *direct* and *elementwise*: unfold definitions, take arbitrary `i, j ∈ s`, assume `i < j`, and show required inequality using algebraic properties.
  - For `inv`, `div`, `pow`, proofs often reduce to known lemmas (`inv_le_inv₀`, `div_le_div₀`, `pow_le_pow_left₀`) or use symmetry (`symm`).
  - In `LinearOrderedCommGroup`, proofs often use `lt_or_lt_of_mul_lt_mul` to split into cases based on strict inequality.
  - For rearrangement characterisations, proofs go via `monovaryOn_iff_forall_smul_nonneg` and algebraic simplifications (`smul_sub`, `sub_smul`, etc.).
- **Induction**: Not used here — all results are pointwise and algebraic.
- **Duality**: Many lemmas come in monovary/antivary pairs, often proved by symmetry or `forall_swap`.

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.Group.Instances` | Basic ordered group theory (e.g., `OrderedCommGroup`, inversion monotonicity). |
| `Mathlib.Algebra.Order.Module.OrderedSMul` | Ordered module structure (`OrderedSMul`), needed for `•` and rearrangement characterisation. |
| `Mathlib.Algebra.Order.Module.Synonym` | Type synonyms and aliases for ordered modules. |
| `Mathlib.Algebra.Order.Monoid.Unbundled.MinMax` | Min/max operations and related order properties in monoids. |
| `Mathlib.Order.Monotone.Monovary` | Core definitions of `MonovaryOn`, `AntivaryOn`, `Monovary`, `Antivary`. |

---

This file is a *comprehensive algebraic toolkit* for reasoning about monovariance under standard operations (inv, mul, div, pow) in ordered algebraic structures, culminating in a clean equivalence with the rearrangement inequality — a key result in analysis and combinatorics.