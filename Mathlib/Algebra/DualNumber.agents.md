### Technical Metadata Brief: Dual Numbers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DualNumber R` | `Type u → Type u` | Type of dual numbers over `R`, defined as `TrivSqZeroExt R R`. |
| `DualNumber.eps` | `[Zero R] [One R] ⇒ DualNumber R` | The canonical element `ε` satisfying `ε² = 0`. |
| `DualNumber.lift` | `{fe : (A →ₐ[R] B) × B // fe.2 * fe.2 = 0 ∧ ∀ a, Commute fe.2 (fe.1 a)} ≃ (A[ε] →ₐ[R] B)` | Universal property: classifies `R`-algebra maps out of `A[ε]` by maps `A → B` and a square-zero element commuting with the image. |
| `DualNumber.algHom_ext` | `⦃f g : R[ε] →ₐ[R] A⦄ → f ε = g ε → f = g` | Extensionality: algebra maps out of `R[ε]` are determined by their value on `ε`. |
| `DualNumber.algHom_ext'` | `⦃f g : A[ε] →ₐ[R] B⦄ → ... → f = g` | Stronger extensionality for maps from `A[ε]`, requiring agreement on `A` and on `ε`-multiples. |
| `DualNumber.snd_mul` | `[Semiring R] ⇒ snd (x * y) = fst x * snd y + snd x * fst y` | Derivation-like Leibniz rule for the `snd` component of multiplication. |
| `DualNumber.eps_mul_eps` | `[Semiring R] ⇒ ε * ε = 0` | Defining property of `ε`. |
| `DualNumber.commute_eps_left/right` | `[Semiring R] ⇒ Commute ε x`, `Commute x ε` | `ε` commutes with all elements. |
| `DualNumber.lift_apply_apply` | `lift fe a = fe.val.1 a.fst + fe.val.1 a.snd * fe.val.2` | Explicit formula for `lift`. |
| `DualNumber.lift_apply_eps` | `lift fe ε = fe.val.2` | `lift` sends `ε` to the chosen square-zero element. |
| `DualNumber.instRepr` | `[Repr R] ⇒ Repr (DualNumber R)` | Representation instance for pretty-printing dual numbers as `a + b*ε`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `eps_`: for properties of `ε` (e.g., `eps_mul_eps`, `fst_eps`, `snd_eps`).
  - `lift_`: for universal property and its behavior (e.g., `lift_apply_apply`, `lift_apply_eps`, `lift_smul`).
  - `algHom_ext`: extensionality principles for algebra homomorphisms.
  - `inr_eq_smul_eps`: relates `inr` to scalar multiplication by `ε`.
  - `commute_eps_*`: symmetry of commutation with `ε`.

- **Notation**:
  - `R[ε]` ≡ `DualNumber R`
  - `ε` ≡ `DualNumber.eps`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `ext`: for extensionality (especially `algHom_ext`, `algHom_ext'`).
- `simp` / `simp only`: to simplify using `@[simp]` lemmas (e.g., `fst_eps`, `snd_eps`, `eps_mul_eps`).
- `rw`: rewriting using definitions and lemmas (e.g., `inr_eq_smul_eps`, `lift_apply_apply`).
- `dsimp`: used in `algHom_ext` to unfold definitions.
- `show`: to guide type inference or clarify goals.
- `exact`, `refine`, `apply`: for constructing proofs and equivalences (especially in `lift` definition).
- `mul_mul_mul_comm`, `right_comm`, `map_mul`, `map_one`: algebraic rewrites leveraging ring/semiring structure.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Extensionality**: Prove equality of algebra homomorphisms by checking agreement on generators (`A` and `ε`), often via `algHom_ext` or `algHom_ext'`.
  - **Universal property (`lift`)**:
    - Constructed via `Equiv.trans` to `TrivSqZeroExt.liftEquiv`.
    - Involves verifying algebra homomorphism axioms (multiplicativity, `R`-linearity) using assumptions on `fe.val.2`.
    - Inverse direction uses `fg.val.2 1` to recover the square-zero element.
  - **Simplification lemmas** (`@[simp]`):
    - Proven by unfolding definitions and applying `simp` with ring axioms and `TrivSqZeroExt` lemmas.
  - **Inductive/structural reasoning**:
    - For `lift_apply_apply`, `lift_apply_inl`, etc., direct computation using `fst`/`snd` projections and `inl`/`inr` behavior.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Algebra.TrivSqZeroExt
  ```
  - All dual number API is built on top of `TrivSqZeroExt R R`, reusing its structure and lemmas.

- **Implicit dependencies** (via `TrivSqZeroExt` and typeclass inference):
  - `Mathlib.Algebra.Ring.Basic`, `Mathlib.Algebra.Module.Basic`, `Mathlib.Algebra.Algebra.Basic`
  - `Mathlib.Data.Product`, `Mathlib.Data.Equiv.Basic`
  - `Mathlib.Data.Repr` (for `instRepr`)

---

### Summary

This file formalizes **dual numbers** as a special case of `TrivSqZeroExt`, emphasizing:
- A clean interface via notation (`R[ε]`, `ε`),
- A universal property (`lift`) mirroring `Complex.lift`,
- Extensionality principles for algebra maps,
- Explicit computational lemmas (`snd_mul`, `eps_mul_eps`, etc.),
- All leveraging existing `TrivSqZeroExt` infrastructure.

The design reflects Lean 4 best practices: minimal duplication, reuse of abstractions, and rich `@[simp]` API for automation.