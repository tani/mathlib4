Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Group Action on Rings Applied to Polynomials**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `smul_eq_map` | `∀ m : M, HSMul.hSMul m = map (MulSemiringAction.toRingHom M R m)` | Identifies the scalar action on `R[X]` with the ring homomorphism induced by the action on `R`. |
| `Polynomial.distribMulAction` instance | `MulSemiringAction M R → MulSemiringAction M R[X]` | Extends a `MulSemiringAction` on `R` to one on `Polynomial R`. |
| `smul_X` | `∀ m : M, m • X = X` | Shows that the action fixes the indeterminate `X`. |
| `smul_eval_smul` | `∀ m f x, (m • f).eval (m • x) = m • f.eval x` | Compatibility of scalar multiplication with evaluation under equivariant action. |
| `eval_smul'` | `∀ g f x, f.eval (g • x) = g • (g⁻¹ • f).eval x` | Reformulation of evaluation under group action using inverse. |
| `smul_eval` | `∀ g f x, (g • f).eval x = g • f.eval (g⁻¹ • x)` | Dual to `eval_smul'`; action on polynomial vs. on point. |
| `prodXSubSMul` | `R → R[X]` | Product over orbit of `x` under `G`: `∏_{g ∈ G / Stab(x)} (X - g • x)`. |
| `prodXSubSMul.monic` | `Monic (prodXSubSMul G R x)` | The constructed polynomial is monic. |
| `prodXSubSMul.eval` | `eval x (prodXSubSMul G R x) = 0` | `x` is a root of the constructed polynomial. |
| `prodXSubSMul.smul` | `g • prodXSubSMul G R x = prodXSubSMul G R x` | The polynomial is invariant under the group action. |
| `prodXSubSMul.coeff` | `g • coeff n p = coeff n p` | Coefficients of `prodXSubSMul` are `G`-invariant. |
| `MulSemiringActionHom.polynomial` | `(P →+*[M] Q) → (P[X] →+*[M] Q[X])` | Lifts an equivariant ring map to a polynomial ring map. |
| `coe_polynomial` | `↑(g.polynomial) = map g` | The underlying function of `g.polynomial` is `map g`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `smul_`: scalar multiplication properties (`smul_X`, `smul_eval`, `smul_eval_smul`, `smul_one`, `smul_mul`).
  - `prodXSubSMul_`: properties of the orbit product polynomial (`prodXSubSMul.monic`, `prodXSubSMul.eval`, etc.).
  - `coe_`: coercion-related lemmas (`coe_polynomial`).
- **Suffixes**:
  - `_smul`: often denotes action compatibility (`smul_eval_smul`, `smul_X`).
  - `_hom`: homomorphism-related (`polynomial`, `toRingHom`).
- **`map_`**: used for properties of `map` under ring homomorphisms (`map_one`, `map_mul`, `map_X`, `map_zero`, `map_C`, `map_pow`, `map_add`, `map_smul`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: rewriting using equalities and simp lemmas.
- `induction_on`: structural induction on polynomials (base case constants, inductive step addition, monomial case).
- `simp`: simplification using `simp` lemmas (e.g., `eval_C`, `eval_X`, `map_C`, `map_X`).
- `ext`: extensionality (for function equality, coefficient equality).
- `change`, `convert`, `apply`, `exact`: standard proof scripting.
- `Finset.prod_bijective`, `Finset.smul_prod'`, `Finset.prod_eq_zero`: for manipulating finite products over group orbits.
- `aesop`, `ring`: likely used implicitly or in elaborated tactics (not explicit here, but `ring` is common in such contexts).

---

#### **4. Proof Logic**

- **Inductive structure**: Many proofs (e.g., `smul_eval_smul`, `polynomial.map_smul'`) use polynomial induction:
  - Base case: constants (`r : R`).
  - Inductive step: addition (`f + g`).
  - Monomial case: `X^n • r`.
- **Group-theoretic reasoning**:
  - Orbit-stabilizer decomposition (`G ⧸ Stabilizer`).
  - Use of `Fintype.prod_bijective` and `MulAction.bijective` to handle group actions on finite products.
- **Homomorphism lifting**:
  - `polynomial` constructor verifies equivariance via induction and uses `map_smul` from the input homomorphism.
- **Simplicity via `map`**: Many properties reduce to properties of `map`, especially via `smul_eq_map`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Polynomial.AlgebraMap`
- `Mathlib.Algebra.Polynomial.Monic`
- `Mathlib.GroupTheory.GroupAction.Hom`
- `Mathlib.GroupTheory.GroupAction.Quotient`
- `Mathlib.GroupTheory.GroupAction.Basic` (via `MulSemiringAction`)
- `Mathlib.Algebra.Ring.Action.Basic`

**Domain Scope**:
- **Algebraic structures**: Semirings, rings, commutative rings, groups, monoids.
- **Actions**: `MulSemiringAction`, `MulAction`, `DistribMulAction`.
- **Polynomial rings**: `R[X]`, `Polynomial`, `aeval`, `eval`, `monomial`, `coeff`, `monic`.
- **Equivariant maps**: `→+*[M]`, `MulSemiringActionHom`.

---

Let me know if you'd like a formalized summary in Lean or a diagram of the categorical relationships.