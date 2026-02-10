### Technical Brief: `Mathlib.Algebra.Ring.Hom`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `NonUnitalRingHom α β` | `structure` extending `α →ₙ* β`, `α →+ β` | Bundled homomorphisms of *non-unital* (non-associative) semirings: additive monoid + multiplicative semigroup homomorphisms. |
| `RingHom α β` | `structure` extending `α →* β`, `α →+ β`, `α →ₙ+* β`, `α →*₀ β` | Bundled homomorphisms of (unital) semirings/rings: preserves `0`, `1`, `+`, `*`. |
| `NonUnitalRingHomClass F α β` | `class` extending `MulHomClass`, `AddMonoidHomClass` | Typeclass for families of non-unital ring homs; enables polymorphism over hom types. |
| `RingHomClass F α β` | `class` extending `MonoidHomClass`, `AddMonoidHomClass`, `MonoidWithZeroHomClass` | Typeclass for families of (unital) ring homs. |
| `NonUnitalRingHom.id α` | `def` | Identity non-unital ring hom. |
| `RingHom.id α` | `def` | Identity ring hom. |
| `NonUnitalRingHom.comp g f` | `def` | Composition of non-unital ring homs. |
| `RingHom.comp g f` | `def` | Composition of ring homs. |
| `RingHom.mk'` | `def` | Constructs a `RingHom` from a monoid hom that preserves addition (useful for rings). |
| `AddMonoidHom.mkRingHomOfMulSelfOfTwoNeZero` | `def` | Constructs a ring hom from an additive hom that preserves squaring, assuming `2 ≠ 0` and `f 1 = 1`. |
| `RingHom.map_zero`, `map_one`, `map_add`, `map_mul` | `theorem` | Fundamental properties of ring homs. |
| `RingHom.ext` | `theorem` | Extensionality: homs equal if they agree on all inputs. |
| `RingHom.codomain_trivial_iff_map_one_eq_zero` | `theorem` | `β` trivial (`0 = 1`) ⇔ `f 1 = 0`. |
| `RingHom.map_one_ne_zero` | `theorem` | If `β` nontrivial, then `f 1 ≠ 0`. |
| `RingHom.domain_nontrivial` | `theorem` | If `β` nontrivial and `f : α →+* β`, then `α` nontrivial. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `NonUnitalRingHom.*`: for non-unital homs.
  - `RingHom.*`: for unital homs.
  - `coe_*`: coercion-related lemmas (e.g., `coe_comp`, `coe_id`).
  - `map_*`: properties of how homs act on operations (`map_zero`, `map_mul`, `map_pow`, `map_neg`, `map_sub`).
  - `mk_*`: constructors or special constructions (`mk'`, `mkRingHomOfMulSelfOfTwoNeZero`).
  - `copy`: for redefining homs with equal `toFun` to fix definitional issues.

- **Suffixes**:
  - `_class`: typeclass names (`NonUnitalRingHomClass`, `RingHomClass`).
  - `_inj*`: injectivity lemmas (`coe_addMonoidHom_injective`, `coe_monoidHom_injective`).
  - `_def`: definitions of operations (`one_def`, `mul_def`).
  - `_iff`: equivalence lemmas (`codomain_trivial_iff_map_one_eq_zero`).

- **Infix Notations**:
  - `→ₙ+*` for `NonUnitalRingHom`
  - `→+*` for `RingHom`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs and simplifications:

| Tactic | Usage |
|--------|-------|
| `ext` | Proving equality of homs via extensionality. |
| `simp` / `simp only` | Simplifying coercions, compositions, and `map_*` lemmas. |
| `rfl` | Proving definitional equalities (e.g., `coe_id`, `comp_apply`). |
| `rw` | Rewriting using lemmas like `map_add`, `map_mul`, `coe_comp`. |
| `split_ifs` | Handling `ite` (if-then-else) expressions in `map_ite_*`. |
| `cases` | Destructuring bundled homs (e.g., in `coe_injective'`). |
| `congr` | Congruence closure for equality proofs. |
| `apply DFunLike.*` | Leveraging `DFunLike` infrastructure for extensionality and coercion. |
| `induction` | Inductive proofs (e.g., `npow` in `Monoid` instance). |
| `aesop` / `linarith` | Not explicitly used here, but `ring`, `abel`, and `linarith` are common in related files. |

---

#### **4. Proof Logic**

- **Structure Proofs**: Bundled homs are defined via structures extending multiple hom classes (`→*`, `→+`, etc.). Proofs often involve destructuring and reassembling components.
- **Extensionality**: Most equality proofs use `ext` (via `DFunLike.ext`), reducing to pointwise equality.
- **Simplification**: Heavy use of `simp` with `initialize_simps_projections` to normalize coercions (`coe_*` lemmas).
- **Composition & Identity**: Verified via `rfl` or `ext`, leveraging definitional equality of underlying functions.
- **Typeclass Reasoning**: `RingHomClass`/`NonUnitalRingHomClass` allow generic reasoning over hom families; coercions (`coe`) and instances (`CoeTC`) automate embedding.
- **Special Constructions**:
  - `mkRingHomOfMulSelfOfTwoNeZero`: Uses algebraic manipulation of `f((x+y)²)` to derive multiplicativity, assuming `2 ≠ 0`.
  - `codomain_trivial_iff_*`: Logical equivalences proven via bidirectional implication (`↔`), often using `map_one` and `map_mul`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Pi.Basic` | General product and hom infrastructure (e.g., `Pi` types, homs). |
| `Mathlib.Algebra.GroupWithZero.Hom` | Homomorphisms for `GroupWithZero`, foundational for `MonoidWithZeroHom`. |
| `Mathlib.Algebra.Ring.Defs` | Core ring/semiring definitions (`NonAssocSemiring`, `Ring`, etc.). |
| `Mathlib.Algebra.Ring.Basic` | Basic ring theory (e.g., `map_neg`, `map_sub`, `npow`). |

> **Note**: This file builds on `Group.Pi.Basic` and `GroupWithZero.Hom` for bundled hom infrastructure, and `Ring.Defs`/`Basic` for algebraic structure definitions.

--- 

This module provides the foundational bundled homomorphism infrastructure for rings and semirings in Mathlib, following the same design pattern as group/monoid homs.