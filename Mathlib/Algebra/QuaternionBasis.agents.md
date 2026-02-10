### Technical Metadata Brief: `Mathlib.Algebra.Quaternion.Basis`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `QuaternionAlgebra.Basis` | `structure` | Bundled data encoding `i, j, k ∈ A` satisfying quaternionic relations over an `R`-algebra `A`. Encodes a *quaternionic structure* on a subspace of `A`. |
| `QuaternionAlgebra.Basis.self R` | `Basis ℍ[R,c₁,c₂] c₁ c₂` | Canonical basis for the standard quaternion algebra `ℍ[R,c₁,c₂]`. |
| `QuaternionAlgebra.Basis.compHom b f` | `Basis B c₁ c₂` | Pushforward of a basis `b` along an `R`-algebra homomorphism `f : A →ₐ[R] B`. |
| `QuaternionAlgebra.Basis.lift q x` | `A` | Linear combination expressing the image of `x : ℍ[R,c₁,c₂]` under the algebra map induced by basis `q`. |
| `QuaternionAlgebra.Basis.liftHom q` | `ℍ[R,c₁,c₂] →ₐ[R] A` | The `R`-algebra homomorphism induced by a basis `q`. Universal property: any quaternion basis in `A` gives a map from `ℍ[R,c₁,c₂]`. |
| `QuaternionAlgebra.lift` | `Basis A c₁ c₂ ≃ (ℍ[R,c₁,c₂] →ₐ[R] A)` | Equivalence between a quaternion basis in `A` and an algebra map from `ℍ[R,c₁,c₂]` to `A`. |
| `QuaternionAlgebra.hom_ext` | `f = g` if `f i = g i` and `f j = g j` | Extensionality for algebra maps out of `ℍ[R,c₁,c₂]`. |
| `Quaternion.hom_ext` | Same as above, specialized to `ℍ[R]` (i.e., `c₁ = c₂ = -1`). | |

**Key lemmas (simplified multiplication rules):**
- `i_mul_i`, `j_mul_j`, `i_mul_j`, `j_mul_i`: defining relations.
- `i_mul_k`, `k_mul_i`, `k_mul_j`, `j_mul_k`, `k_mul_k`: derived identities, all `simp`-ready.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `lift_`: for constructions/properties of the algebra map induced by a basis.
  - `compHom`: composition with an algebra homomorphism.
  - `self`: canonical basis for the standard quaternion algebra.
- **Suffixes:**
  - `_mul_`: binary multiplication lemmas (e.g., `i_mul_i`, `k_mul_j`).
  - `_hom`: homomorphism-related definitions (`liftHom`, `compHom`).
- **Structure fields:** `i`, `j`, `k`, `i_mul_i`, `j_mul_j`, `i_mul_j`, `j_mul_i`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only [...]`: heavily used for rewriting using `simp`-lemmas (e.g., `i_mul_i`, `j_mul_j`, etc.).
- `abel`: for solving commutative group/ring identities (e.g., in `lift_add`, `lift_mul`).
- `ext`: for extensionality proofs (structure equality, function equality).
- `rw [...]`: rewriting using defining equations or lemmas.
- `congr`: for congruence closure (e.g., in `lift.symm.injective`).
- `dsimp`, `convert`, `congr'`: for definitional simplification and unification.

---

#### **4. Proof Logic**

- **Structure extensionality (`ext`)**: Reduce to equality of `i` and `j`, since `k` is definitional.
- **Universal property (`liftHom`, `lift`)**:
  - Define `lift` as a linear map using coordinates.
  - Prove it preserves `+`, `*`, and scalar multiplication (via `lift_add`, `lift_mul`, `lift_smul`).
  - Use `simp` + `abel` to verify multiplication (long but routine computation).
- **Equivalence (`lift`)**:
  - Show `liftHom` and `compHom (Basis.self R)` are inverses.
  - `left_inv`: `ext` + `simp`.
  - `right_inv`: expand definitions, use `F.commutes`, and simplify.
- **Homomorphism extensionality (`hom_ext`)**:
  - Follows from injectivity of `lift` and `Basis.ext`.

---

#### **5. Imports & Dependencies**

- **Core imports:**
  - `Mathlib.Algebra.Quaternion`: defines the quaternion algebra `ℍ[R,c₁,c₂]`.
  - `Mathlib.Tactic.Ring`: used for ring simplifications (though `abel` is used more heavily here).
- **Implicit dependencies:**
  - `Mathlib.Algebra.Algebra.Basic`: for `Algebra R A`, `AlgHom`, `algebraMap`.
  - `Mathlib.Algebra.Ring.Basic`: for `Ring`, `CommRing`, `smul`, etc.
  - `Mathlib.Data.Product.Basic`: for `mk_add_mk`, `mk`-based simplifications.

---

#### **6. Notable Design Choices**

- **Redundant `k` field**: Included for convenience, even though `k = i * j` is definable.
- **`[simps!]` attribute**: Ensures `liftHom` and `compHom` unfold definitionally on `i`, `j`, `k`.
- **Bundled basis**: Unlike `Complex.lift`, this uses a *bundled* structure to carry necessary proofs (`i_mul_i`, etc.), avoiding proof-carrying arguments.
- **`ext` lemmas**: Both for basis equality and algebra hom equality, leveraging the minimal generating set `{i, j}`.

--- 

This module formalizes the *universal property* of quaternion algebras via structured bases, enabling clean reasoning about algebra maps out of `ℍ[R,c₁,c₂]`.