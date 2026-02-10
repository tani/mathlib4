### Technical Brief: Monoid Representations in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Representation` | `G →* V →ₗ[k] V` | A monoid homomorphism from `G` to the monoid of `k`-linear endomorphisms of `V`. |
| `trivial` | `1 : G →* V →ₗ[k] V` | The trivial representation: every group element acts as identity. |
| `IsTrivial ρ` | `Prop` | Predicate asserting `ρ g x = x` for all `g, x`. |
| `asAlgebraHom ρ` | `MonoidAlgebra k G →ₐ[k] Module.End k V` | Converts a representation into an algebra homomorphism from the monoid algebra. |
| `asModule ρ` | `V` (type synonym) | Equips `V` with a `MonoidAlgebra k G`-module structure via `asAlgebraHom`. |
| `ofModule M` | `Representation k G (RestrictScalars k (MonoidAlgebra k G) M)` | Constructs a representation from a `MonoidAlgebra k G`-module `M`. |
| `ofMulAction k G H` | `Representation k G (H →₀ k)` | Induced representation from a `MulAction G H` on the finitely supported functions `H →₀ k`. |
| `ofDistribMulAction k G A` | `Representation k G A` | Converts a compatible `DistribMulAction G A` into a linear representation. |
| `ofMulDistribMulAction M G` | `Representation ℤ M (Additive G)` | For `MulDistribMulAction M G`, gives a `ℤ`-linear representation on `Additive G`. |
| `tprod ρV ρW` | `Representation k G (V ⊗[k] W)` | Tensor product representation: `g ↦ ρV g ⊗ ρW g`. |
| `linHom ρV ρW` | `Representation k G (V →ₗ[k] W)` | Conjugation action: `g ⋅ f = ρW g ∘ f ∘ ρV g⁻¹`. |
| `dual ρV` | `Representation k G (Module.Dual k V)` | Dual representation: `g ⋅ f = f ∘ ρV g⁻¹`. |
| `asGroupHom ρ` | `G →* Units (V →ₗ[k] V)` | When `G` is a group, upgrades representation to a group homomorphism into invertible linear maps. |
| `ofMulActionSelfAsModuleEquiv` | `(ofMulAction k G G).asModule ≃ₗ[MonoidAlgebra k G] MonoidAlgebra k G` | Isomorphism between left regular representation and regular module structure on `k[G]`. |

**Key Theorems:**
- `asAlgebraHom_single`, `asAlgebraHom_of`: Behavior of `asAlgebraHom` on `single` and `of`.
- `ofModule_asAlgebraHom_apply_apply`, `ofModule_asModule_act`: Compatibility of `ofModule` and `asAlgebraHom`.
- `ofMulAction_apply`: Explicit formula for `ofMulAction` on basis elements.
- `ofMulAction_self_smul_eq_mul`: Left regular action matches multiplication in `k[G]`.
- `dualTensorHom_comm`: `dualTensorHom` is `G`-equivariant.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `as*`: Constructions *from* representation to other structures (e.g., `asAlgebraHom`, `asGroupHom`, `asModule`).
  - `of*`: Constructions *from* other structures *to* representation (e.g., `ofMulAction`, `ofDistribMulAction`, `ofModule`).
  - `is*`: Predicate classes (e.g., `IsTrivial`).
- **Suffixes:**
  - `apply`: Applied to functions/elements (e.g., `ofMulAction_apply_apply`, `linHom_apply`).
  - `act`: Action-related (e.g., `ofModule_asModule_act`).
  - `Equiv`/`Equiv'`: Equivalences (e.g., `asModuleEquiv`, `ofMulActionSelfAsModuleEquiv`).
  - `Hom`: Hom-space constructions (e.g., `linHom`, `dualTensorHom`).
- **Notation:**
  - `ρV ⊗ ρW` for `tprod ρV ρW`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Dominant for simplification, especially with `@[simp]` lemmas.
- `ext`: Extensionality for functions, linear maps, and module homomorphisms.
- `rw`: Rewriting using definitions and lemmas (e.g., `rw [MonoidAlgebra.single_mul_apply]`).
- `dsimp`: Used to unfold definitions before `simp`.
- `induction_on`: Structural induction on `MonoidAlgebra` elements (e.g., `x.induction_on`).
- `apply_fun`: To apply a function to both sides of an equation (e.g., injectivity arguments).
- `congr` / `congr_arg`: For congruence reasoning.
- `ring`: For commutative semiring/module arithmetic (less frequent here).
- `aesop`: For `IsTrivial` instance proofs.

---

#### **4. Proof Logic & Strategy**

- **Inductive Proofs on `MonoidAlgebra`:**  
  Proofs about `asAlgebraHom`, `ofModule`, etc., often use `MonoidAlgebra.induction_on`, reducing to:
  - `single g r` (basis case),
  - sums (`map_add`),
  - scalar multiples (`map_smul`).

- **Extensionality for Linear Maps:**  
  To prove `f = g : V →ₗ[k] W`, use `LinearMap.ext fun x => ...`, then simplify with `simp_rw` and `comp_*` lemmas.

- **Equivalence of Categories:**  
  The equivalence `Representation k G V ≃ Module (MonoidAlgebra k G) V` is established via:
  - `asModule` / `ofModule` (type synonyms + module structures),
  - `asModuleEquiv` / `ofModule_asModule_act` (compatibility lemmas),
  - `smul_ofModule_asModule` (module action compatibility).

- **Group Case Upgrade:**  
  When `G` is a group, representations factor through invertible endomorphisms:
  - `asGroupHom` uses `MonoidHom.toHomUnits`.
  - `ofMulAction_apply` uses `smul_inv_smul` to relate action to inverse.

- **Equivariance Proofs:**  
  For `dualTensorHom_comm`, use `ext` + `simp` with `transpose_apply`, `comp_*`, and `map_*`.

---

#### **5. Imports & Scope**

**Primary Imports:**
- `Mathlib.LinearAlgebra.Contraction`: For `dualTensorHom`, tensor product tools.
- `Mathlib.Algebra.Group.Equiv.TypeTags`: For `MonoidHom.toHomUnits`, type-tagged equivalences.

**Core Dependencies:**
- `MonoidAlgebra`: Central object; used to model group algebras.
- `Module`, `AddCommMonoid`, `CommSemiring`: Foundational typeclass assumptions.
- `LinearMap`, `TensorProduct`: For constructing `linHom`, `tprod`, `dual`.

**Domain Scope:**
- **Monoid representations** over commutative semirings.
- Generalizes to groups (via `Units`), modules over group algebras, and induced actions (e.g., `MulAction`, `DistribMulAction`).
- Includes categorical equivalence with modules over `MonoidAlgebra`.

--- 

This module formalizes the foundational bridge between monoid actions and linear algebra, enabling representation-theoretic reasoning in Lean 4.