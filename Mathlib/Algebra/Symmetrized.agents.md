### Technical Metadata Brief: `SymAlg` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SymAlg (α : Type*)` | `Type* → Type*` | Defines the *symmetrized algebra* as the same underlying type as `α`, with notation `αˢʸᵐ`. |
| `sym : α ≃ αˢʸᵐ` | `Equiv.refl _` | Equivalence between original and symmetrized elements (injective, surjective, bijective). |
| `unsym : αˢʸᵐ ≃ α` | `Equiv.refl _` | Inverse of `sym`; maps symmetrized elements back to original. |
| `mul_def` | `a * b = sym (⅟ 2 * (unsym a * unsym b + unsym b * unsym a))` | Defines the symmetrized multiplication: $ a \circ b = \frac{1}{2}(ab + ba) $. |
| `unsym_mul` | `unsym (a * b) = ⅟ 2 * (unsym a * unsym b + unsym b * unsym a)` | Projection of multiplication in `αˢʸᵐ` to `α`. |
| `sym_mul_sym` | `sym a * sym b = sym (⅟ 2 * (a * b + b * a))` | Multiplication of embedded elements in `αˢʸᵐ`. |
| `mul_comm` | `a * b = b * a` | Proves commutativity of `*` in `αˢʸᵐ`. |
| `unsym_mul_self` | `unsym (a * a) = unsym a * unsym a` | Shows squaring coincides with original multiplication. |
| `sym_mul_self` | `sym (a * a) = sym a * sym a` | Embedding preserves squaring. |
| `nonAssocSemiring` | Instance `NonAssocSemiring αˢʸᵐ` | Constructs a *non-associative semiring* structure on `αˢʸᵐ`. |
| `nonAssocRing` | Instance `NonAssocRing αˢʸᵐ` | If `α` is a ring, `αˢʸᵐ` becomes a *non-associative ring*. |
| `isCommJordan` | Instance `IsCommJordan αˢʸᵐ` | Shows `αˢʸᵐ` satisfies the Jordan identity (commutative Jordan algebra). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sym_`: for operations lifting from `α` to `αˢʸᵐ` (e.g., `sym_add`, `sym_mul_sym`, `sym_one`).
  - `unsym_`: for operations projecting from `αˢʸᵐ` to `α` (e.g., `unsym_mul`, `unsym_add`, `unsym_one`).
- **Suffixes**:
  - `_def`: definitions (e.g., `mul_def`).
  - `_self`: self-multiplication (e.g., `mul_self`, `unsym_mul_self`).
- **Equiv names**:
  - `sym`, `unsym`: mutual inverses, used as equivalences.
- **Notation**:
  - `αˢʸᵐ`: postfix notation for `SymAlg α`.
  - `⅟ 2`: inverse of `2` in `α`, used in symmetrization.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: rewriting definitions (`mul_def`, `unsym_mul`, etc.)
- `simp`: simplifying using `@[simp]` lemmas (e.g., `sym_add`, `unsym_mul`, `sym_mul_sym`)
- `abel`: for commutative semiring-like reasoning (used in distributivity proofs)
- `congr`: for congruence steps (e.g., `congr 2`)
- `calc`: structured calculation blocks (e.g., in `isCommJordan` proof)
- `convert`: to match goals up to definitional equality
- `conv_rhs`: for right-hand side rewriting in conv mode
- `have`, `exact`, `apply`: for intermediate lemmas and goals

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *transport along equivalences* pattern:
  - Lift elements via `sym`, operate in `α`, then project back via `unsym`.
  - Use `unsym_injective.eq_iff'` or `sym_injective.eq_iff'` to reduce equalities in `αˢʸᵐ` to `α`.
- **Inductive/structural reasoning**:
  - Instance proofs (e.g., `addMonoid`, `module`) use `unsym_injective.*` family to *transport* algebraic structure along `unsym`.
- **Jordan identity proof**:
  - Uses `calc` blocks to expand both sides using `mul_def`.
  - Relies on `commute_half_left` (derived from `Commute.one_left`) to rearrange scalar multiples.
  - Simplifies using `mul_add`, `add_mul`, `mul_assoc`, and `abel` for linear algebra over `α`.
- **Distributivity proofs**:
  - Expand `*` via `mul_def`, use `← sym_add`, `mul_add`, `add_mul`, then `abel` to finish.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Jordan.Basic` | Provides `IsCommJordan`, Jordan algebra axioms. |
| `Mathlib.Algebra.Module.Defs` | Supplies module, semiring, ring, and additive structure needed for `SymAlg` instances. |

Other implicit dependencies (via Mathlib):
- `Mathlib.Data.Equiv.Basic` (for `Equiv.refl`, `Bijective`, etc.)
- `Mathlib.Algebra.Group.Basic`, `Mathlib.Algebra.Ring.Basic`, `Mathlib.Algebra.Module.Basic`
- `Mathlib.Data.Invertible` (for `Invertible (2 : α)`, `⅟ a`)
- `Mathlib.Data.Real.Basic` (implicitly, for `2`, `invOf`, etc.)

---

### Summary

This file formalizes the *symmetrization* of an algebra: turning any (possibly non-commutative) algebra into a *commutative* (but generally non-associative) algebra via $ a \circ b = \frac{1}{2}(ab + ba) $. It constructs `SymAlg α` as an equivalence class of types, equips it with algebraic structure via transport, and proves it satisfies Jordan algebra axioms. The proofs rely heavily on the invertibility of `2` and the bijective correspondence between `α` and `αˢʸᵐ`.