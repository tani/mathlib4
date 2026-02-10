### Technical Metadata Brief: `CentroidHom` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CentroidHom α` | `structure` extending `α →+ α` | Type of *centroid homomorphisms*: additive monoid maps commuting with both left and right multiplication in a non-unital, non-associative semiring `α`. |
| `CentroidHomClass F α` | `class` extending `AddMonoidHomClass F α α` | Typeclass stating that `F` is a type of maps satisfying centroid conditions (`map_mul_left`, `map_mul_right`). Used for typeclass-based polymorphism. |
| `map_mul_left`, `map_mul_right` | `f (a * b) = a * f b`, `f (a * b) = f a * b` | Defining properties of centroid homomorphisms (commutation with multiplication). |
| `toEnd f` | `f : CentroidHom α → AddMonoid.End α` | Embedding centroid homomorphisms into additive monoid endomorphisms. |
| `toEndRingHom α` | `CentroidHom α →+* AddMonoid.End α` | Ring homomorphism from centroid to endomorphism ring (used to transfer ring structure). |
| `comp g f` | `CentroidHom α → CentroidHom α → CentroidHom α` | Composition of centroid homomorphisms (multiplication in the centroid ring). |
| `centerToCentroid z` | `NonUnitalSubsemiring.center α →ₙ+* CentroidHom α` | Canonical homomorphism from center of `α` into centroid. |
| `centerIsoCentroid` | `Subsemiring.center α ≃+* CentroidHom α` | Isomorphism between center and centroid when `α` is a *non-associative semiring* (i.e., has unit). |
| `mem_center_iff` (non-associative case) | `a ∈ center α ↔ R a = L a ∧ L a ∈ range(toEndRingHom)` | Characterization of central elements via left/right multiplication operators. |
| `commRing` | `(∀ a b, (∀ r, a * r * b = 0) → a = 0 ∨ b = 0) → CommRing (CentroidHom α)` | If `α` is a *prime associative ring*, then its centroid is commutative. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `map_*`: Properties of maps preserving structure (`map_mul_left`, `map_mul_right`, `map_zero`, `map_add`, `map_neg`, `map_sub`).
  - `coe_*`: Coercion lemmas (`coe_zero`, `coe_one`, `coe_add`, `coe_mul`, `coe_comp`, `coe_toAddMonoidHom`, `coe_natCast`, `coe_intCast`, `coe_neg`, `coe_sub`).
  - `toEnd_*`: Lemmas about embedding into `AddMonoid.End`.
  - `centerToCentroid_*`: Lemmas about canonical maps from center to centroid.
- **Suffixes**:
  - `_apply`: Application of morphism to element (`id_apply`, `zero_apply`, `add_apply`, `mul_apply`, `smul_apply`).
  - `_eq_coe`: Definitional equality of coercion (`toFun_eq_coe`, `toAddMonoidHom_eq_coe`).
  - `_injective`: Injectivity of canonical maps (`toEnd_injective`, `coe_toAddMonoidHom_injective`).
  - `_hom`: Homomorphism types (`CentroidHom`, `centerToCentroid`, `centerToCentroidCenter`).
- **Structure fields**:
  - `map_*'` (prime): Structure field in `CentroidHom` (e.g., `map_mul_left'`).
  - `map_*` (no prime): Class method in `CentroidHomClass`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`, `ext`, `congr`, `simp`, `simp_rw`
- `induction` (especially for `pow` lemmas)
- `rw [*, *]` for rewriting using structure field lemmas
- `aesop` (in `mem_center_iff` for commutative case)
- `dsimp`, `change`, `exact`, `apply`, `intro`, `cases`
- `swap` (for reordering arguments in `AddCommGroup`/`Semiring` instances)
- `ring`-style reasoning via `toEnd_injective.*` (e.g., `toEnd_injective.semiring`, `toEnd_injective.ring`)

---

#### **4. Proof Logic & Strategy**

- **Structure-based reasoning**: Proofs often proceed by destructuring `CentroidHom` into its underlying additive monoid homomorphism and verifying centroid conditions.
- **Extensionality**: `ext` (via `DFunLike.ext`) is used to prove equality of centroid homomorphisms by pointwise equality.
- **Transfer of algebraic structure**: Ring/semiring/group structures on `CentroidHom α` are *transported* along the injective map `toEnd : CentroidHom α ↪ AddMonoid.End α`, using lemmas like `toEnd_zero`, `toEnd_add`, `toEnd_mul`, etc.
- **Induction**: Used for `pow`-related lemmas (e.g., `toEnd_pow`, `hasNPowNat`).
- **Centralizer/commutator reasoning**: In `centroid_eq_centralizer_mulLeftRight`, the centroid is identified as the centralizer of left/right multiplication operators in `AddMonoid.End α`.
- **Use of `simp` with `norm_cast`**: Many lemmas are marked `@[simp, norm_cast]` to simplify coercions and normalize terms.

---

#### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.Algebra.Algebra.Defs`
- `Mathlib.Algebra.Group.Action.Pi`
- `Mathlib.Algebra.Module.Hom`
- `Mathlib.GroupTheory.GroupAction.Ring`
- `Mathlib.RingTheory.NonUnitalSubsemiring.Basic`
- `Mathlib.Algebra.Ring.Subsemiring.Basic`

**Scope**:
- Works in the context of **non-unital, non-associative semirings/rings** (`NonUnitalNonAssocSemiring`, `NonUnitalNonAssocRing`, `NonAssocSemiring`, `NonUnitalRing`).
- Extends to modules, distributive multiplicative actions, and scalar actions (`SMul`, `DistribMulAction`, `Module`).
- Builds toward algebra structures over commutative semirings (`Algebra R (CentroidHom α)` under centrality condition).

---

### Summary

This file formalizes the **centroid** of a non-unital, non-associative algebra as a ring of additive endomorphisms commuting with left and right multiplication. It uses the `DFunLike` design pattern to support polymorphism via typeclasses (`CentroidHomClass`). The centroid is shown to inherit a ring structure via embedding into `AddMonoid.End α`, and connections to centers, centralizers, and module/algebra structures are established. Key results include:
- Ring structure on `CentroidHom α`
- Isomorphism `center α ≅ CentroidHom α` for unital non-associative semirings
- Commutativity of centroid under primality assumptions

This is foundational for further work in non-associative algebra (e.g., Jordan algebras, structure theory of rings).