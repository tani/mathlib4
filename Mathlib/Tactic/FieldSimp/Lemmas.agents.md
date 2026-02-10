**Technical Brief: `Lemmas.lean` — Field Simplification Infrastructure in Lean 4**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `zpow'` | `zpow' : α → ℤ → α` (for `GroupWithZero α`) | Custom integer exponentiation where `0 ^ 0 := 0`, ensuring `zpow' a (m + n) = zpow' a m * zpow' a n` even for `a = 0`. |
| `zpow'_add` | `zpow' a (m + n) = zpow' a m * zpow' a n` | Homomorphism property of `zpow'` over addition. |
| `zpow'_eq_zero_iff` | `zpow' a n = 0 ↔ a = 0` | Characterizes when `zpow'` yields zero. |
| `zpow'_neg` | `zpow' a (-n) = (zpow' a n)⁻¹` | Compatibility with additive inverses. |
| `zpow'_mul` | `zpow' a (m * n) = zpow' (zpow' a m) n` | Compatibility with multiplication of exponents. |
| `mul_zpow'` | `[CommGroupWithZero α] ⇒ zpow' (a * b) n = zpow' a n * zpow' b n` | Distributivity over multiplication in commutative setting. |
| `list_prod_zpow'` | `zpow' (∏ l) r = ∏ map (fun x ↦ zpow' x r) l` | Extends `zpow'` homomorphism to list products. |
| `NF` | `NF M := List (ℤ × M)` | Normal-form representation for field expressions: list of `(exponent, atom)` pairs. |
| `NF.eval` | `[GroupWithZero M] ⇒ NF M → M` | Evaluates a normal form as `∏ zpow' x r` over list entries. |
| `NF.cons` / `::ᵣ` | `ℤ × M → NF M → NF M` | Cons cell for normal forms. |
| `NF.mul_eq_eval₂` | `((r₁, x) :: l₁).eval * ((r₂, x) :: l₂).eval = ((r₁ + r₂, x) :: l).eval` | Combines same-atom terms via exponent addition. |
| `NF.div_eq_eval₂` | `((r₁, x) :: l₁).eval / ((r₂, x) :: l₂).eval = ((r₁ - r₂, x) :: l).eval` | Combines same-atom terms via exponent subtraction. |
| `NF.inv` | `inv l := map (a, x) ↦ (-a, x)` | Inverse of normal form corresponds to negating exponents. |
| `NF.eval_inv` | `(l⁻¹).eval = l.eval⁻¹` | Compatibility of `eval` with `inv`. |
| `NF.zpow_apply` | `l ^ r = map (a, x) ↦ (r * a, x)` | Integer power on normal forms multiplies all exponents by `r`. |
| `NF.eval_zpow'` | `(l ^ r).eval = zpow' l.eval r` | `eval` commutes with `zpow'`. |
| `Sign` | `inductive Sign M | plus | minus (iM : Field M)` | Tracks sign (`+` or `-`) of expressions in tactic implementation. |
| `Sign.mul`, `Sign.div`, `Sign.pow`, `Sign.zpow`, `Sign.neg` | MetaM proofs of sign rules for operations | Construct correctness proofs for sign propagation under field operations. |

---

### 2. NAMING CONVENTIONS

- **`zpow'`**: Prime suffix indicates *variant* of standard `zpow`.
- **`NF.*`**: All normal-form operations prefixed with `NF.`.
- **`eval_*`**: Evaluation lemmas for `NF`.
- **`cons_*`**: Normal-form construction lemmas.
- **`Sign.*`**: Tactics for sign handling.
- **`subst_*`**: Substitution lemmas for simplifying equalities.
- **`eq_*` / `le_*` / `lt_*`**: Equality/inequality cancellation lemmas.
- **`of_*` / `ne_*`**: Lemmas conditional on nonzero assumptions.

---

### 3. TACTIC STACK

Frequent tactics used in proofs:

- `simp` / `simp only` / `simp +contextual`
- `by_cases` (for case splits on equalities like `a = 0`, `n = 0`)
- `rw`, `subst`, `ac_rfl`
- `exact`, `apply`, `congr!`
- `tauto`, `intro`, `split_ifs`
- `mod_cast` (for integer/natural number casting)
- `meta`-level tactics: `mkDecideProofQ`, `assumeInstancesCommute`, `pure`, `do`-blocks (in `Sign` section)

---

### 4. PROOF LOGIC

The proofs follow a **structured case analysis + simplification** pattern:

1. **Case split** on zero/nonzero of key variables (`a = 0`, `n = 0`, `r = 0`, etc.).
2. **Simplify** using `simp` with contextual knowledge (e.g., `zero_zpow`, `zpow_eq_zero_iff`).
3. **Apply known algebraic identities** (`zpow_add₀`, `mul_zpow`, `inv_mul`, etc.).
4. **Use `ac_rfl`** to handle associativity/commutativity in multiplicative contexts.
5. For `NF` lemmas: **inductive or structural reasoning** on lists, often via `map_list_prod` or `list_prod_zpow'`.
6. For `Sign`: **case analysis on sign**, then **constructive proof generation** using Lean’s metaprogramming.

---

### 5. IMPORTS & DEPENDENCIES

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.BigOperators.Group.List.Basic` | List products, `prod`, `map`, basic big operator theory. |
| `Mathlib.Algebra.Field.Power` | Standard `zpow`, `pow`, field exponentiation. |
| `Mathlib.Algebra.Order.GroupWithZero.Unbundled.Basic` | Ordered group-with-zero theory (for positivity/inequality lemmas). |
| `Mathlib.Util.Qq` | Quasi-quoting for metaprogramming (`Qq`). |
| `Mathlib.Algebra.Group.Int.Even` | Even/odd parity reasoning (used in `Sign.pow`, `Sign.zpow`). |

---

### 6. THEORY OVERVIEW & DEPENDENCY DIAGRAM

#### Core Theory Flow

```
GroupWithZero / CommGroupWithZero
         ↓
   zpow' (custom exponentiation)
         ↓
   NF M = List (ℤ × M)  ← normal forms
         ↓
   eval : NF M → M      ← interpretation
         ↓
   field_simp tactic orchestration
```

#### Dependency Graph (Mermaid)

```mermaid
graph TD
  A[GroupWithZero α] --> B[zpow' : α → ℤ → α]
  C[CommGroupWithZero α] --> D[mul_zpow', list_prod_zpow']
  B --> E[NF M := List (ℤ × M)]
  E --> F[NF.eval]
  F --> G[field_simp tactic]
  D --> G
  H[Sign M] --> G
  I[Mathlib.Util.Qq] --> H
  J[Mathlib.Algebra.Group.Int.Even] --> H
```

#### Overview of `Lemmas.lean`

This file provides **low-level algebraic infrastructure** for the `field_simp` tactic. It introduces:

- A **custom integer exponentiation** `zpow'` that behaves uniformly at `0`.
- A **normal-form representation** (`NF`) for field expressions as lists of `(exponent, atom)` pairs.
- **Evaluation lemmas** (`eval_*`) showing how `NF.eval` respects field operations.
- A **sign-tracking mechanism** (`Sign`) for metaprogramming support in handling negations and sign propagation.

These components collectively enable `field_simp` to normalize and simplify expressions in arbitrary fields (or `CommGroupWithZero`s), including handling division, powers, and sign-sensitive operations.

--- 

Let me know if you'd like a formalized dependency graph (e.g., in `leanpkg` format) or a high-level tactic flow diagram.
