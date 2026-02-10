### Technical Brief: Kleene Algebras in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IdemSemiring α` | `class extends Semiring α, SemilatticeSup α` | Defines a semiring where addition is idempotent (`a + a = a`), inducing a natural semilattice order via `a ≤ b ↔ a + b = b`. |
| `IdemCommSemiring α` | `class extends CommSemiring α, IdemSemiring α` | Commutative version of idempotent semiring. |
| `KStar α` | `class with kstar : α → α` | Unary operator for Kleene star; used in Kleene algebras. |
| `KleeneAlgebra α` | `class extends IdemSemiring α, KStar α` | Idempotent semiring with Kleene star satisfying: <br> • `1 ≤ a∗` <br> • `a * a∗ ≤ a∗`, `a∗ * a ≤ a∗` <br> • Quasi-ideal absorption: `b * a ≤ b ⇒ b * a∗ ≤ b`, and symmetrically. |
| `add_eq_sup` | `a + b = a ⊔ b` | Connects semiring addition to lattice join. |
| `add_idem` | `a + a = a` | Idempotency of addition (defining property). |
| `one_le_kstar` | `1 ≤ a∗` | Kleene star dominates unit. |
| `mul_kstar_le_kstar`, `kstar_mul_le_kstar` | `a * a∗ ≤ a∗`, `a∗ * a ≤ a∗` | Star absorbs multiplication from left/right. |
| `mul_kstar_le_self`, `kstar_mul_le_self` | `b * a ≤ b ⇒ b * a∗ ≤ b`, `a * b ≤ b ⇒ a∗ * b ≤ b` | Inductive closure properties (least pre-fixpoint). |
| `kstar_mono` | `Monotone kstar` | Star is monotone w.r.t. induced order. |
| `kstar_eq_self` | `a∗ = a ↔ a * a = a ∧ 1 ≤ a` | Characterizes fixed points of star. |
| `kstar_idem` | `a∗∗ = a∗` | Star is idempotent. |
| `pow_le_kstar` | `a ^ n ≤ a∗` | All powers of `a` are bounded by `a∗`. |
| `kstar_zero` | `0∗ = 1` | Star of zero is one (in Kleene algebra). |
| `kstar_one` | `1∗ = 1` | Star of unit is unit. |
| `kstar_mul_kstar` | `a∗ * a∗ = a∗` | Star is multiplicatively idempotent. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `add_`, `mul_`, `kstar_`, `one_`, `le_`, `eq_`: indicate operation or relation.
  - `of_`: for constructing structures from simpler data (e.g., `IdemSemiring.ofSemiring`).
  - `inst_`, `to_`: for instance or coercion constructions (e.g., `toOrderBot`, `toMulLeftMono`).
- **Suffixes**:
  - `_def`: definition of notation/operation (e.g., `kstar_def`).
  - `_mono`: monotonicity lemmas.
  - `_le_`, `_le_self`: inequalities involving star or multiplication.
  - `_iff_`: equivalence characterizations (e.g., `add_eq_left_iff_le`).
- **Notation**:
  - `a∗` (postfix `∗`) for `kstar a`, scoped under `Computability`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification with `add_eq_sup`, `add_idem`, `kstar_*` lemmas.
- `rwa`: rewrite + assumption (e.g., to apply `add_eq_right_iff_le`).
- `rw`: rewriting using definitions and lemmas (especially `add_eq_sup`, `kstar_def`, `mul_*`).
- `exact`, `apply`, `intro`: basic proof construction.
- `antisymm`: for proving equality from two inequalities.
- `trans`: chaining inequalities.
- `rfl`: reflexivity for definitional equalities.
- `funext`: extensionality for function types (used in `Pi` instances).
- `Prod.ext`: extensionality for product types.
- `by_cases`, `cases`: less frequent, but used in `nsmul_eq_self`.

---

#### **4. Proof Logic**

- **Structure Construction**:
  - Many instances are built via `hf.semiring`, `hf.semilatticeSup`, etc., using injective pullbacks (`Function.Injective.*`).
  - `IdemSemiring.ofSemiring` constructs an idempotent semiring from a semiring with `∀ a, a + a = a`.
- **Inductive Reasoning**:
  - `nsmul_eq_self`, `pow_le_kstar` use induction on `n`.
- **Order-Theoretic Reasoning**:
  - Leverage induced order: `a ≤ b ↔ a + b = b`.
  - Use lattice properties (`sup_le`, `le_sup_left/right`) and monotonicity of multiplication.
- **Kleene Algebra Reasoning**:
  - Prove inequalities using absorption laws (`mul_kstar_le_self`, `kstar_mul_le_self`).
  - Show equality via `antisymm` + `le_trans` + `kstar_*` lemmas.
  - Use `kstar_le_of_mul_le_left/right` to bound star by candidates.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Order.Monoid.Canonical.Defs`: canonical ordered monoid structure.
- `Mathlib.Algebra.Ring.InjSurj`: injective/surjective ring homomorphisms (used for pullbacks).
- `Mathlib.Algebra.Ring.Pi`, `Prod`: product and function space ring structures.
- `Mathlib.Tactic.Monotonicity.Attr`: monotonicity attributes (e.g., `@[mono]`).

**Scope & Locale**:
- `Computability` locale defines `∗` notation.
- `IdemSemiring`, `KleeneAlgebra` are scoped modules with `variable [IdemSemiring α]` etc.
- `@[simp] add_eq_sup` is scoped to avoid performance issues with rich structures.

---

#### **6. Notable Design Choices**

- **Order Induction**: The order is *defined* from addition: `a ≤ b ↔ a + b = b`. This makes `IdemSemiring` a `SemilatticeSup` and `OrderBot`.
- **Priority Instances**: `IdemSemiring.toOrderBot`, `toCanonicallyOrderedAddCommMonoid`, etc., use `(priority := 100)` to avoid ambiguity.
- **Injective Pullback**: `Function.Injective.*` provides a uniform way to transfer algebraic structures along injective maps (e.g., substructures).
- **No `Subtype` Instances Yet**: TODO mentions `Subsemiring`, `Subring`, `Subalgebra` — not yet formalized.

--- 

This module provides a clean, order-theoretic foundation for Kleene algebras, suitable for applications in automata theory, program semantics, and verification.