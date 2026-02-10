### Technical Brief: `IsSMulRegular` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSMulRegular` | `def IsSMulRegular [SMul R M] (c : R) := Function.Injective ((c • ·) : M → M)` | Defines an element `c ∈ R` as *M-regular* if left multiplication by `c` on `M` is injective. |
| `isLeftRegular_iff` | `IsLeftRegular a ↔ IsSMulRegular R a` | Shows equivalence between left-regularity in `R` and `R`-regularity of `R` acting on itself. |
| `isRightRegular_iff` | `IsRightRegular a ↔ IsSMulRegular R (MulOpposite.op a)` | Relates right-regularity to `Rᵐᵒᵖ`-regularity. |
| `smul` | `ra : IsSMulRegular M a → rs : IsSMulRegular M s → IsSMulRegular M (a • s)` | Product of `M`-regular elements is `M`-regular (under scalar tower). |
| `smul_iff` | `IsSMulRegular M (a • b) ↔ IsSMulRegular M b` (when `a` is `M`-regular) | Characterizes when multiplying by an `M`-regular element preserves regularity. |
| `mul_iff_right` | `IsSMulRegular M (a * b) ↔ IsSMulRegular M b` (when `a` is `M`-regular) | Multiplication on left by regular element doesn’t affect regularity of right factor. |
| `mul_and_mul_iff` | `IsSMulRegular M (a * b) ∧ IsSMulRegular M (b * a) ↔ IsSMulRegular M a ∧ IsSMulRegular M b` | Two elements are regular iff both products are regular. |
| `pow` | `IsSMulRegular M a → IsSMulRegular M (a ^ n)` | Powers of regular elements are regular. |
| `pow_iff` | `0 < n → IsSMulRegular M (a ^ n) ↔ IsSMulRegular M a` | Regularity of a positive power implies regularity of base. |
| `zero_iff_subsingleton` | `IsSMulRegular M (0 : R) ↔ Subsingleton M` | `0` is regular iff module is trivial. |
| `isSMulRegular_of_group` | `[MulAction G R] → IsSMulRegular R g` | Any group element acting on a type via `MulAction` is regular. |
| `Units.isSMulRegular` | `IsSMulRegular M (a : R)` for `a : Rˣ` | Units are always regular. |
| `IsSMulRegular.eq_zero_of_smul_eq_zero` | `r • x = 0 → x = 0` when `r` is regular | Regular elements cancel zero: `r • x = 0 ⇒ x = 0`. |
| `Equiv.isSMulRegular_congr` | `IsSMulRegular M r ↔ IsSMulRegular M' s` under equivariance | Regularity is preserved under equivariant maps. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isSMulRegular_`: for lemmas about `IsSMulRegular`.
  - `of_`: for implications where regularity of a composite implies regularity of a component (e.g., `of_smul`, `of_mul`).
  - `mul_`, `smul_`, `pow_`: for properties involving multiplication, scalar multiplication, or powers.
  - `_iff`: for biconditional characterizations.

- **Suffixes**:
  - `_iff`: biconditional statements (e.g., `smul_iff`, `mul_iff`, `zero_iff_subsingleton`).
  - `_congr`: for congruence under equivalence (e.g., `Equiv.isSMulRegular_congr`).
  - `_class`: used in typeclass constraints (e.g., `MulActionHomClass`, `IsScalarTower`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp` | Rewriting definitions (`one_smul`, `smul_zero`, etc.), simplifying goals. |
| `intro` / `intro h` | Introducing hypotheses for injectivity proofs. |
| `convert` / `congr_arg` | Proving equality via applying functions (e.g., `convert congr_arg (g⁻¹ • ·) h`). |
| `dsimp only [...]` | Simplifying definitions with specific lemmas (e.g., `Function.comp_def`). |
| `repeat' rw [...]` | Repeated rewriting (e.g., in `zero` lemma). |
| `induction` | Structural induction on `ℕ` (e.g., for `pow`). |
| `exact`, `assumption` | Closing goals directly from hypotheses. |
| `push_neg` | Pushing negations inward (e.g., in `not_zero_iff`). |
| `apply`, `refine` | Applying lemmas with holes (`?_`) to be filled. |
| `aesop` | Not explicitly used here, but could help in simple algebraic reasoning. |

---

#### **4. Proof Logic**

- **Core Strategy**: Most proofs follow a pattern of:
  1. **Unfolding definition**: `IsSMulRegular` is `Function.Injective ((c • ·))`, so proofs start by assuming `r • x = r • y` and aim to deduce `x = y`.
  2. **Using injectivity of known regular elements**: e.g., if `a` is regular and `a • (s • x) = a • (s • y)`, then `s • x = s • y`.
  3. **Leveraging associativity**: `smul_assoc` is heavily used to rearrange `(a • s) • x = a • (s • x)`.
  4. **Induction**: For powers (`pow`), induction on `n` with base case `n = 0` and step using `pow_succ`.
  5. **Equivalence via two directions**: For `↔` lemmas, split into `→` and `←`, often using `⟨_, _⟩` for pairs.

- **Special Cases**:
  - **Group elements**: Use inverses to cancel action (`g⁻¹ • (g • x) = x`).
  - **Units**: Reduce to `of_mul_eq_one` using inverse element.
  - **Zero element**: Use `zero_smul` and subsingleton reasoning.

---

#### **5. Imports & Scope**

- **Primary Dependencies**:
  ```lean
  import Mathlib.Algebra.Regular.Basic
  import Mathlib.GroupTheory.GroupAction.Hom
  ```
- **Core Concepts Used**:
  - `SMul`, `SMulZeroClass`, `IsScalarTower`
  - `MulAction`, `MulActionHomClass`
  - `Monoid`, `Group`, `Units`, `MonoidWithZero`
  - `MulOpposite`, `Function.Injective`, `Subsingleton`, `Nontrivial`
- **Mathematical Context**:
  - Generalizes `IsLeftRegular`/`IsRightRegular` to module actions.
  - Applies to arbitrary `R`-modules `M`, with minimal assumptions (no need for ring structure unless needed).
  - Emphasizes multiplicative behavior; additive structure is irrelevant except for zero.

---

This module formalizes a foundational notion in commutative algebra and module theory — regular elements — in a highly general and reusable way, suitable for both ring/module theory and more abstract action-theoretic settings.