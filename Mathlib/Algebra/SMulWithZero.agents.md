### Technical Brief: `SMulWithZero` and `MulActionWithZero` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SMulWithZero` | `class SMulWithZero [Zero R] [Zero M] extends SMulZeroClass R M` | Introduces scalar multiplication where `0 • m = 0` and `r • 0 = 0`. Extends `SMulZeroClass` with an additional `zero_smul` axiom. |
| `MulActionWithZero` | `class MulActionWithZero extends MulAction R M` | Extends `MulAction` to monoids with zero, requiring compatibility with `0` (both `r • 0 = 0` and `0 • m = 0`), `1` (acts as identity), and associativity. |
| `MulActionWithZero.toSMulWithZero` | `instance` | Forgets the `MulAction` structure to just `SMulWithZero`. |
| `MonoidWithZero.toMulActionWithZero` | `instance` | The canonical left action of a `MonoidWithZero` on itself. |
| `MonoidWithZero.toOppositeMulActionWithZero` | `instance` | Right action via opposite monoid. |
| `smulMonoidWithZeroHom` (mentioned in docstring) | `R →₀ₘ R` (not defined in snippet) | Bundled scalar multiplication as a `MonoidWithZero` homomorphism. |
| `Function.Injective.smulWithZero` | `smulWithZero` construction | Pullback of `SMulWithZero` along injective zero-preserving hom. |
| `Function.Surjective.smulWithZero` | `smulWithZero` construction | Pushforward of `SMulWithZero` along surjective zero-preserving hom. |
| `SMulWithZero.compHom` | `SMulWithZero R' M` | Precompose action with `ZeroHom R' → R`. |
| `Function.Injective.mulActionWithZero` / `Function.Surjective.mulActionWithZero` | `MulActionWithZero` constructions | Analogous pullback/pushforward for `MulActionWithZero`. |
| `MulActionWithZero.compHom` | `MulActionWithZero R' M` | Precompose action with `MonoidWithZeroHom R' → R`. |
| `MulActionWithZero.subsingleton` | `Subsingleton R → Subsingleton M` | If scalars are unique, then the acted-on type is too. |
| `MulActionWithZero.nontrivial` | `Nontrivial M → Nontrivial R` | Converse of above. |
| `smul_inv₀` | `(c • x)⁻¹ = c⁻¹ • x⁻¹` | Compatibility of inverse with scalar multiplication in `GroupWithZero`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `zero_`: e.g., `zero_smul`, `zero_mul`, `zero_nsmul`, `zero_zsmul` — action of `0` on the left.
  - `smul_`: e.g., `smul_zero`, `smul_eq_zero_of_left`, `smul_zero` — action on `0` in the module.
  - `mul_`: e.g., `mul_smul`, `mul_zero`, `zero_mul` — multiplicative properties.
  - `compHom`: composition with a homomorphism.
  - `to*`: forgetful or coercion instances (e.g., `toSMulWithZero`, `toMulActionWithZero`).
  - `Opposite*`: actions via opposite monoid (right actions).
  - `ite_`, `boole_`, `Pi.single_*`: case analysis / piecewise definitions.

- **Suffixes**:
  - `_class`: for typeclasses (e.g., `SMulWithZero`, `MulActionWithZero`).
  - `_hom`: for homomorphisms (e.g., `ZeroHom`, `MonoidWithZeroHom`).
  - `_class`, `_hom`, `_with_zero`: consistent with Lean’s naming for algebraic structures with zero.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying using `@[simp]` lemmas (`zero_smul`, `smul_zero`, `one_smul`, etc.). |
| `rw` / `rfl` | Rewriting using equalities or reflexivity. |
| `obtain rfl | h` | Case analysis on equality to `0` (common in `GroupWithZero` proofs). |
| `exact` / `refine` | Constructing proofs term-by-term. |
| `apply` / `intro` | Intro + apply pattern matching. |
| `aesop` | Not used in this file — lean on `simp` and `rw`. |
| `ring` / `abel` | Not used — arithmetic is handled via `nsmul`/`zsmul` lemmas. |
| `cases` / `rcases` | For existential quantifiers (e.g., surjectivity). |
| `show`, `by` | Explicit goal rewriting in proofs. |

---

#### **4. Proof Logic**

- **Inductive / structural proofs**: Most proofs are direct applications of axioms and `simp`-friendly lemmas.
- **Case analysis on `0`**: Especially in `GroupWithZero`, proofs split on whether a scalar or vector is zero (`eq_or_ne c 0`, `eq_or_ne x 0`).
- **Homomorphism lifting**: Pullback/pushforward constructions rely on:
  - Injectivity/surjectivity of underlying map.
  - Compatibility of action with homomorphism (`f (a • b) = a • f b`).
  - `map_zero` to handle zero preservation.
- **Instance construction**: Use `{ ... with }` to extend existing structures (e.g., `MulAction` + `SMulWithZero` → `MulActionWithZero`).
- **Uniqueness arguments**: `Subsingleton` proofs use `Subsingleton.elim` on scalars, then `zero_smul`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Action.Opposite` | Opposite monoid actions. |
| `Mathlib.Algebra.GroupWithZero.Action.Defs` | Definitions for actions of `GroupWithZero`. |
| `Mathlib.Algebra.GroupWithZero.Hom` | Homomorphisms of `GroupWithZero`. |
| `Mathlib.Algebra.GroupWithZero.Opposite` | Opposite monoid with zero. |

These imports indicate the module sits at the intersection of:
- **Monoid/group actions**,
- **Zero-compatible algebraic structures**,
- **Homomorphism-based transport of structures**.

---

### Summary

This file formalizes scalar multiplication with zero compatibility, generalizing `SMul` and `MulAction` to settings where `0` is absorbing. It provides:
- A robust typeclass hierarchy (`SMulWithZero`, `MulActionWithZero`),
- Transport lemmas along injective/surjective zero-preserving maps,
- Canonical actions of `MonoidWithZero` on itself,
- Compatibility with inverses in `GroupWithZero`.

The style is typical of Mathlib: minimal axioms, extensive use of `simp`, and careful handling of zero elements.