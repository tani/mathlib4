### Technical Metadata Brief: FreeAlgebra in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Pre R X` | `Type u` (inductive) | Pre-algebra of formal expressions: generators from `X`, scalars from `R`, closed under `add`, `mul`. |
| `Rel R X` | `Pre R X → Pre R X → Prop` (inductive) | Smallest congruence making `Pre R X / Rel` an `R`-algebra. |
| `FreeAlgebra R X` | `Type u` (`Quot (Rel R X)`) | Free unital associative `R`-algebra on `X`. |
| `ι R : X → FreeAlgebra R X` | `ι R x = Quot.mk (Rel R X) (of x)` | Canonical inclusion of generators. |
| `lift R f` | `f : X → A` ↦ `FreeAlgebra R X →ₐ[R] A` | Universal property: unique algebra morphism extending `f`. |
| `liftAux R f` | Internal definition of `lift R f` | Used to construct `lift` via `Quot.liftOn`. |
| `equivMonoidAlgebraFreeMonoid` | `FreeAlgebra R X ≃ₐ[R] MonoidAlgebra R (FreeMonoid X)` | Explicit equivalence with monoid algebra over free monoid. |
| `induction` | Inductive principle for `FreeAlgebra` | Prove `∀ a, C a` by checking closure under algebra operations. |
| `ι_injective` | `[Nontrivial R] ⇒ Injective (ι R)` | Generators embed injectively. |
| `algebraMap_inj`, `algebraMap_eq_zero_iff`, etc. | Equivalences for `algebraMap R (FreeAlgebra R X)` | Injectivity and kernel properties of scalar embedding. |
| `hom_ext` | Extensionality for algebra morphisms | If two algebra maps agree on generators, they are equal. |
| `lift_unique`, `ι_comp_lift`, `lift_comp_ι` | Universal properties of `lift` | Characterize `lift` up to uniqueness and composition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isDomain`, `isScalarTower` (typeclass properties).
  - `inst_`: e.g., `instSMul`, `instZero`, `instAdd` (instance definitions).
  - `algebraMap_`: e.g., `algebraMap_inj`, `algebraMap_eq_zero_iff`.
  - `lift_`: e.g., `lift_ι_apply`, `lift_unique`, `lift_comp_ι`.
  - `ι_`: e.g., `ι_injective`, `ι_inj`, `ι_ne_zero`.
  - `quot_mk_eq_ι`: connects quotient construction to canonical map.

- **Suffixes**:
  - `_def`: irreducible definitions (`ι_def`, `liftAux_def`).
  - `_mem'`: membership conditions for subalgebras (`mul_mem'`, `add_mem'`, `algebraMap_mem'`).
  - `_compat`: compatibility conditions in `Rel` (e.g., `add_compat_left`).
  - `_distrib`, `_assoc`, `_comm`: algebraic laws encoded in `Rel`.

- **Notation helpers**:
  - `hasCoeGenerator`, `hasCoeSemiring`, `hasMul`, `hasAdd`, `hasZero`, `hasOne`, `hasSMul`: enable coercion and operator syntax (`↑x`, `r • a`, `a + b`, `a * b`, `1`, `0`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | Reflexivity for definitional equalities (e.g., `mk_mul`, `lift_ι_apply`). |
| `simp` / `simp only` | Simplify using lemmas, especially `lift_ι_apply`, `ι_def`, `algebraMap`, `map_*`. |
| `rw` | Rewrite using `Quot.sound`, `Rel.*`, `lift`, `algebraMap_*`. |
| `induction` | On inductive types (`Pre`, `Rel`, `FreeAlgebra` via `induction` principle). |
| `exact`, `refine`, `congr` | Build proofs stepwise, especially for `Quot.sound` applications. |
| `ext` | Extensionality for functions/morphisms (`hom_ext`, `AlgHom.ext_iff`). |
| `tauto` | Used in `liftAux.commutes'` for simple logic. |
| `change`, `dsimp` | Simplify goal to match known lemmas. |
| `have`, `let` | Introduce intermediate terms (e.g., `fa`, `fb` in `lift` proof). |
| `rcases`, `cases` | Destruct `Quot.mk`-based terms. |
| `convert`, `congr 1` | Match up to definitional equality (e.g., in `nsmul_succ`). |

---

#### **4. Proof Logic**

- **Construction Strategy**:
  1. **Pre-algebra**: Define `Pre R X` as free term algebra over `R` and `X`.
  2. **Quotient by `Rel`**: Impose algebraic laws via inductive relation.
  3. **Operations descend**: Use `Quot.map`/`Quot.map₂` with `Rel.*_compat` lemmas.
  4. **Structure proofs**: Prove ring/algebra laws by `Quot.sound` on `Rel` axioms.

- **Universal Property Proofs**:
  - Define `liftFun : Pre R X → A` by recursion.
  - Show `liftFun` respects `Rel` → descends to `FreeAlgebra`.
  - Use `Quot.liftOn` + induction on `Rel` to verify algebra homomorphism.
  - Show `lift` is equivalence via `lift_symm_apply`, `ι_comp_lift`, `lift_unique`.

- **Inductive Proofs**:
  - Use `induction` principle (not raw `Pre` induction) to avoid exposing implementation.
  - Subalgebra argument: define `C`-closed subalgebra, show it contains generators and scalars ⇒ contains all.

- **Embedding & Injectivity**:
  - Use `algebraMapInv` (lift of zero function) to left-inverse `algebraMap`.
  - For `ι_injective`, construct separating map `FreeAlgebra → R` using `if ... then 1 else 0`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Algebra.Subalgebra.Basic` | Subalgebras, `adjoin`, `algebraMap_mem'`. |
| `Mathlib.Algebra.Algebra.Tower` | `IsScalarTower`, `SMulCommClass`. |
| `Mathlib.RingTheory.Adjoin.Basic` | `Algebra.adjoin`, `adjoin_range_ι`. |
| `Mathlib.Algebra.MonoidAlgebra.Basic` | `MonoidAlgebra`, `of`, `lift`. |
| `Mathlib.Algebra.MonoidAlgebra.NoZeroDivisors` | `NoZeroDivisors` transfer via `equivMonoidAlgebraFreeMonoid`. |

---

### Summary

This file formalizes the **free unital associative algebra** over a commutative semiring `R` on a type `X`, using a **quotient-of-inductive-type** construction. It establishes the **universal property** (`lift`), proves structural properties (injectivity of `ι`, no zero-divisors, domain status), and connects to **monoid algebras** via `equivMonoidAlgebraFreeMonoid`. The implementation is carefully hidden behind `irreducible_def` and `induction` principles to enforce abstraction via universal properties.