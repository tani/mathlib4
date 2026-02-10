### Technical Brief: Group Actions on `DFinsupp` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DFinsupp.smul` | `SMul γ (Π₀ i, β i)` | Defines pointwise scalar multiplication on dependent functions with finite support (`Π₀`), induced from coordinate-wise actions. |
| `smul_apply` | `(b • v) i = b • v i` | Ensures scalar multiplication commutes with evaluation at each index. |
| `coe_smul` | `⇑(b • v) = b • ⇑v` | Relates the coercion of the `DFinsupp` to a function under scalar multiplication. |
| `smulCommClass` | `SMulCommClass γ δ (Π₀ i, β i)` | Proves that if scalars from `γ` and `δ` commute on each coordinate, they commute on `Π₀`. |
| `isScalarTower` | `IsScalarTower γ δ (Π₀ i, β i)` | Lifts associativity of scalar multiplication from coordinates to `Π₀`. |
| `isCentralScalar` | `IsCentralScalar γ (Π₀ i, β i)` | Lifts centrality of scalar action to `Π₀`. |
| `distribMulAction` | `DistribMulAction γ (Π₀ i, β i)` | Constructs a `DistribMulAction` on `Π₀` from coordinate-wise ones, using injectivity of coercion. |
| `module` | `Module γ (Π₀ i, β i)` | Constructs a module structure on `Π₀` over a semiring `γ`, using `DistribMulAction` and verifying module axioms. |
| `filterLinearMap` | `(Π₀ i, β i) →ₗ[γ] Π₀ i, β i` | `filter p` as a linear map (preserves addition and scalar multiplication). |
| `subtypeDomainLinearMap` | `(Π₀ i, β i) →ₗ[γ] Π₀ i : Subtype p, β i` | `subtypeDomain p` as a linear map. |
| `mk_smul` | `mk s (c • x) = c • mk s x` | Scalar multiplication commutes with `mk` (finite support function defined on a finite set). |
| `single_smul` | `single i (c • x) = c • single i x` | Scalar multiplication commutes with `single` (function supported at a single point). |
| `support_smul` | `(b • v).support ⊆ v.support` | Support of `b • v` is contained in support of `v`. |
| `comapDomain_smul`, `comapDomain'_smul` | `comapDomain h hh (r • f) = r • comapDomain h hh f` | Scalar multiplication commutes with domain restriction via injective maps. |
| `equivProdDFinsupp_smul` | `equivProdDFinsupp (r • f) = r • equivProdDFinsupp f` | Compatibility of scalar multiplication with the equivalence `equivProdDFinsupp`. |
| `distribMulAction₂` | `DistribMulAction γ (Π₀ (i : ι) (j : α i), δ i j)` | Lifts `DistribMulAction` to iterated `DFinsupp` (curried form). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `smul_`: scalar multiplication properties (`smul_apply`, `smul_zero`, `smul_comm`, `smul_assoc`, `op_smul_eq_smul`, `smul_comm_class`, etc.)
  - `filter_`, `subtypeDomain_`, `comapDomain_`, `mk_`, `single_`: operations on `DFinsupp`.
  - `coe_`: coercion-related lemmas (`coe_smul`, `coeFnAddMonoidHom`).
  - `is_`, `distribMulAction_`, `module_`: structure instances.

- **Suffixes**:
  - `_smul`: lemmas about interaction with scalar multiplication.
  - `_LinearMap`: linear maps derived from `DFinsupp` operations.
  - `_₂`: for lifted structures on nested `DFinsupp`s.

- **Pattern**: `op_smul_eq_smul` uses `op` for opposite monoid (i.e., right action ↔ left action).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for functions/`DFinsupp`s (core tactic). |
| `simp only [...]` | Simplification with specific lemmas (e.g., `smul_apply`, `add_apply`, `zero_apply`). |
| `split_ifs` | Handles `if-then-else` cases in definitions like `mk_apply`, `single_apply`. |
| `rw [...]` | Rewriting using known equalities (e.g., `smul_zero`, `smul_apply`). |
| `cases h` | Eliminates equality hypotheses (e.g., `h : i = j`). |
| `rfl` | Reflexivity for definitional equalities. |
| `simp` (without `only`) | Used in `filter_smul`, `subtypeDomain_smul`, etc., for automatic simplification. |
| `Function.Injective.distribMulAction` | Uses injectivity to lift structures. |

---

#### **4. Proof Logic**

- **Structure lifting**: Most proofs follow a *pointwise* strategy:
  1. Define the operation (e.g., `SMul`) pointwise.
  2. Prove properties (e.g., `smul_apply`) by `rfl`.
  3. For algebraic laws (e.g., `add_smul`, `zero_smul`, `smul_assoc`), apply `ext` to reduce to coordinates.
  4. Use `simp` with coordinate-wise axioms (e.g., `add_smul`, `smul_zero`) to finish.

- **Injectivity-based lifting**:
  - `distribMulAction` uses `Function.Injective.distribMulAction`, requiring:
    - `coeFnAddMonoidHom` (coercion to function) is injective.
    - Compatibility of scalar multiplication with coercion (`coe_smul`).

- **Decidable equality & finiteness**:
  - In `DecidableEq` section, proofs rely on `mk`/`single` and finite support.
  - `support_smul` uses `support_mapRange`, leveraging monotonicity of support under maps.

- **Equivariance proofs**:
  - For `comapDomain_smul`, `equivProdDFinsupp_smul`, use `ext` + `rw` to reduce to definitions.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Action.Prod` | Product actions, foundational for `SMul`, `DistribMulAction`. |
| `Mathlib.Algebra.GroupWithZero.Action.Pi` | Generalizes actions to dependent products (relevant for `Π₀`). |
| `Mathlib.Algebra.Module.LinearMap.Defs` | Defines linear maps (`→ₗ[γ]`) and their properties. |
| `Mathlib.Data.DFinsupp.Defs` | Core definitions of `DFinsupp`, `mk`, `single`, `filter`, `subtypeDomain`, `comapDomain`, etc. |

---

### Summary

This file formalizes how scalar multiplication, module, and distributive multiplicative action structures lift *pointwise* to dependent functions with finite support (`Π₀`). The proofs rely heavily on extensionality (`ext`), simplification (`simp`), and structural lifting via injectivity or decidable equality. The naming and structure follow Lean’s algebraic library conventions, emphasizing uniformity and reuse of existing action/module infrastructure.