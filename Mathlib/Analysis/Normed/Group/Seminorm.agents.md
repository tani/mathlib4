### Technical Metadata Brief: Group Seminorms and Norms in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `AddGroupSeminorm` | `structure` | A function `G → ℝ` preserving zero, subadditive, and invariant under negation. |
| `GroupSeminorm` | `structure` | Multiplicative analog: sends `1 ↦ 0`, submultiplicative, invariant under inversion. |
| `NonarchAddGroupSeminorm` | `structure` | Nonarchimedean additive seminorm: satisfies `f(x + y) ≤ max(f x, f y)`. |
| `AddGroupNorm` | `structure` | `AddGroupSeminorm` + `f x = 0 → x = 0`. |
| `GroupNorm` | `structure` | `GroupSeminorm` + `f x = 0 → x = 1`. |
| `NonarchAddGroupNorm` | `structure` | `NonarchAddGroupSeminorm` + `f x = 0 → x = 0`. |
| `NonarchAddGroupSeminormClass` | `class` | Typeclass for families of nonarchimedean additive seminorms; extends `NonarchimedeanHomClass`. |
| `NonarchAddGroupNormClass` | `class` | Typeclass for families of nonarchimedean norms; extends `NonarchAddGroupSeminormClass`. |
| `comp` (for `GroupSeminorm`) | `def` | Pullback of a group seminorm along a monoid homomorphism. |
| `inf_apply` | `theorem` | Explicit formula for infimum (meet) of two group seminorms in commutative groups: `(p ⊓ q) x = ⨅ y, p y + q (x / y)`. |
| `map_sub_le_max` | `theorem` | In nonarchimedean setting: `f(x - y) ≤ max(f x, f y)`. |
| `smul_apply`, `coe_smul`, `smul_sup` | `theorem`s | Scalar multiplication properties for seminorms/norms over `R`-actions factoring through `ℝ≥0`. |
| `ext` | `theorem` | Extensionality: pointwise equality implies equality of seminorms/norms. |
| `toFun_eq_coe`, `toGroupSeminorm_eq_coe`, etc. | `theorem`s | Identification of underlying function with coercion. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `map_`: properties about the function (e.g., `map_zero`, `map_add_le_add`, `map_mul_le_add`, `map_inv_eq_map`).
  - `coe_`: coercion-related lemmas (e.g., `coe_zero`, `coe_add`, `coe_smul`).
  - `apply_`: evaluation at a point (e.g., `zero_apply`, `add_apply`, `smul_apply`).
  - `eq_*_of_map_eq_*`: norm-defining injectivity condition (e.g., `eq_zero_of_map_eq_zero'`).
  - `le_*`, `lt_*`: order-theoretic characterizations (e.g., `le_def`, `lt_def`).
- **Suffixes**:
  - `'`: primed versions often denote axioms or properties in the structure definition (e.g., `map_zero'`, `add_le'`).
  - `Class`: typeclasses for abstract families of seminorms/norms (e.g., `NonarchAddGroupSeminormClass`).
- **Special**:
  - `toFun`, `toZeroHom`, `toGroupSeminorm`, `toNonarchAddGroupSeminorm`: projections to underlying functions/homs.
  - `comp`: composition with a homomorphism.
  - `sup`, `inf`, `max`, `min`: lattice operations.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification (especially for `toFun`, `coe`, `apply`). |
| `gcongr` | For proving inequalities under scalar multiplication or monotone operations. |
| `aesop` / `linarith` | For linear arithmetic over reals (e.g., positivity, ordering). |
| `rw` / `simp` | Standard rewriting and simplification (e.g., `map_zero`, `map_one`, `neg_eq_zero`). |
| `exact` / `refine` | For constructing proofs of inequalities (e.g., `refine le_trans _ _`). |
| `split_ifs` | Handling `if ... then ... else ...` expressions (e.g., in `apply_one`). |
| `ext` | Proving equality of functions/structures via extensionality. |
| ` positivity` | Proving nonnegativity of expressions (e.g., in `bddBelow` proofs). |
| `ciInf_le_of_le`, `le_ciInf` | For reasoning with infima over index types. |
| `max_le`, `le_max`, `sup_le` | Reasoning about max/sup in nonarchimedean contexts. |

---

#### **4. Proof Logic**

- **Structure definitions** are built using `structure`/`extends`, often with primed axioms (`map_zero'`, `add_le'`, etc.).
- **Lattice structure** (sup, inf) is constructed via:
  - Pointwise sup/inf for `AddGroupSeminorm`, `GroupSeminorm`, etc.
  - For `GroupSeminorm` on commutative groups, `inf` uses an infimum over a quotient-like expression: `⨅ y, p y + q (x / y)`.
- **Scalar multiplication** (`SMul`) is defined pointwise and verified using:
  - `NNReal.smul_def`, `smul_eq_mul`, and properties of `•` on `ℝ`.
  - `gcongr` + `map_*` lemmas to lift inequalities.
- **Norm-defining injectivity** (`eq_*_of_map_eq_zero'`) is typically proven via contradiction:
  - `of_not_not`, `map_pos_of_ne_one`, `map_pos_of_ne_zero`, and `zero_ne_one`.
- **Extensionality proofs** (`ext`) use `DFunLike.ext`.
- **Order properties** (`PartialOrder`, `SemilatticeSup`) are derived via `PartialOrder.lift` and `DFunLike.coe_injective`.
- **Nonarchimedean ⇒ Archimedean** is shown via `NonarchAddGroupSeminormClass.toAddGroupSeminormClass`, using:
  - `max_le`, `add_le_add`, and `le_trans` to derive `f(x + y) ≤ f x + f y`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.NNReal.Defs` | Definitions and properties of `ℝ≥0`, scalar multiplication, coercion to `ℝ`. |
| `Mathlib.Order.ConditionallyCompleteLattice.Group` | Tools for conditionally complete lattices, used in lattice constructions (e.g., sup/inf). |
| `Mathlib.Tactic.GCongr.CoreAttrs` | Tactics for congruence reasoning under monotone functions (e.g., `gcongr`). |

---

### Summary

This file formalizes **group (semi)norms** in Lean 4, distinguishing between additive and multiplicative settings, archimedean and nonarchimedean variants, and seminorms vs. norms. It defines structures, typeclasses, lattice and scalar module structures, and key properties like extensionality, monotonicity, and injectivity. The design avoids redundant fields (e.g., `NonarchAddGroupSeminorm` does *not* extend `AddGroupSeminorm`) and leverages `FunLike` and `DFunLike` for clean coercion and extensionality. Proofs rely heavily on `simp_rw`, `gcongr`, and lattice-theoretic reasoning over `ℝ`.