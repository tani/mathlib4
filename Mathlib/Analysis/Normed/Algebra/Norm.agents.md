### Technical Brief: Algebra Norms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `AlgebraNorm` | `structure` | Defines a ring norm on an `R`-algebra `S` compatible with the `R`-action (i.e., `‖r • s‖ = ‖r‖·‖s‖`). Extends both `RingNorm` and `Seminorm`. |
| `MulAlgebraNorm` | `structure` | A multiplicative version: a multiplicative ring norm on `S` compatible with `R`. Extends `MulRingNorm` and `Seminorm`. |
| `AlgebraNormClass` | `class` | Typeclass for families of algebra norms (functor-like); used for abstraction over norm implementations. |
| `MulAlgebraNormClass` | `class` | Analogous to `AlgebraNormClass`, but for multiplicative algebra norms. |
| `toRingSeminorm'` | `def` | Extracts the underlying ring seminorm from an `AlgebraNorm`. |
| `restriction` | `def` | Restricts an algebra norm to a subalgebra. |
| `isScalarTower_restriction` | `def` | Restricts an algebra norm along a scalar tower, assuming injectivity of the middle map. |
| `extends_norm'`, `extends_norm` | `theorem` | Show that an algebra norm with `f(1) = 1` extends the base norm on `R`. |
| `toRingNorm` (in `MulRingNorm`) | `def` | Forgets multiplicativity to get a plain ring norm. |
| `isPowMul` | `theorem` | Proves that multiplicative ring norms are power-multiplicative (`f(xⁿ) = f(x)ⁿ`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isScalarTower_restriction`, `isPowMul` — often used for properties or constructions relying on structural assumptions.
  - `to_`: e.g., `toRingSeminorm'`, `toRingNorm` — for coercion or projection functions.
  - `ext_`: e.g., `extends_norm'`, `extends_norm` — for theorems about extension properties.

- **Suffixes**:
  - `'` (prime): e.g., `extends_norm'`, `map_zero'`, `smul'` — typically variants of a main theorem/definition, often slightly more general or auxiliary.
  - `Class`: e.g., `AlgebraNormClass`, `MulAlgebraNormClass` — for typeclasses encoding the interface of a family of norms.

- **Structure/Class Names**:
  - `AlgebraNorm`, `MulAlgebraNorm`: concrete structures.
  - `AlgebraNormClass`, `MulAlgebraNormClass`: typeclasses for abstraction.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with precise lemmas (e.g., `map_zero`, `map_add`, `algebraMap_smul`). |
| `rw [...]` | Rewriting using definitions or theorems (e.g., `Algebra.algebraMap_eq_smul_one`, `toFun_eq_coe`). |
| `congr` | For extensionality proofs (e.g., `ext` lemmas). |
| `cases` | Destructuring inductive types (e.g., `cases f; cases f'` in injectivity proofs). |
| `erw` | Rewrite with definitional equality (used in `toFun_eq_coe` proof). |
| `ext` | Extensionality for functions/structures (via `DFunLike.ext`). |
| `exact`, `refine`, `apply` | Goal-directed proof steps (e.g., `exact f.smul' _ _`). |
| `omega` | For simple arithmetic goals (e.g., in `isPowMul`). |
| `aesop` | Not present here — likely not needed due to heavy use of `simp` and manual rewriting. |

---

#### **4. Proof Logic**

- **Structure Proofs**: Most proofs are straightforward verifications of properties inherited from components (`RingNorm`, `Seminorm`, etc.).
- **Extensionality**: Proofs of equality of norms use `ext` + `DFunLike.ext`, reducing to pointwise equality.
- **Restriction Proofs**: Use `simp` + `map_*` lemmas to lift properties from ambient algebra to subalgebra or tower.
- **Injectivity Handling**: In `isScalarTower_restriction`, injectivity of `algebraMap A S` is used to lift `f(algebraMap A S x) = 0 ⇒ x = 0`.
- **Multiplicative → Ring Norm**: `toRingNorm` converts multiplicative data to ring norm data via `le_of_eq` (since `f(x*y) = f(x)*f(y)` implies `f(x*y) ≤ f(x)*f(y)`).

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  ```lean
  import Mathlib.Analysis.Normed.Ring.Seminorm
  import Mathlib.Analysis.Seminorm
  ```
- **Domain Scope**:
  - Normed rings and algebras over seminormed commutative rings.
  - Compatible with scalar towers and subalgebras.
  - Focus on compatibility of norms with algebra structure (`smul` action).
- **Key Concepts Leveraged**:
  - `RingNorm`, `MulRingNorm`, `Seminorm`, `RingSeminorm`
  - `FunLike`, `DFunLike`, `Subalgebra`, `IsScalarTower`
  - `NormedField`, `Algebra`, `algebraMap`, `smul`

---

This module formalizes foundational notions of *algebra-compatible norms*, enabling further development in functional analysis, non-archimedean geometry, or valuation theory within Lean.