### Technical Metadata Brief: Boolean Rings in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `BooleanRing` | Typeclass extending `Ring α` with `∀ a, a * a = a` (idempotent multiplication). |
| `mul_self` | `∀ a, a * a = a` — defining axiom of Boolean rings. |
| `add_self` | `a + a = 0` — derived property (characteristic 2). |
| `neg_eq` | `-a = a` — follows from `add_self`. |
| `add_eq_zero'` | `a + b = 0 ↔ a = b` — equivalence in characteristic 2. |
| `mul_add_mul` | `a * b + b * a = 0` — commutator vanishes modulo 2. |
| `sub_eq_add` | `a - b = a + b` — subtraction = addition. |
| `mul_one_add_self` | `a * (1 + a) = 0` — consequence of idempotence and `add_self`. |
| `toCommRing` | Instance: every Boolean ring is a commutative ring (proven via `mul_add_mul`). |
| `sup`, `inf` | `sup a b := a + b + a * b`, `inf a b := a * b` — lattice operations induced on Boolean ring. |
| `toBooleanAlgebra` | Constructs a `BooleanAlgebra α` from `BooleanRing α`, with: <br> • `a ⊔ b = a + b + a * b` <br> • `a ⊓ b = a * b` <br> • `aᶜ = 1 + a` <br> • `a \ b = a * (1 + b)` |
| `AsBoolAlg` | Type synonym `α` used to equip a Boolean ring with Boolean algebra structure. |
| `ofBoolAlg`, `toBoolAlg` | Identity equivalences `α ≃ AsBoolAlg α`. |
| `ofBoolAlg_top`, `ofBoolAlg_bot`, etc. | Simplification lemmas for lattice operations under `ofBoolAlg`. |
| `RingHom.asBoolAlg` | Converts a ring homomorphism between Boolean rings into a bounded lattice homomorphism between their Boolean algebra versions. |
| `GeneralizedBooleanAlgebra.toNonUnitalCommRing` | Constructs a non-unital commutative ring from a generalized Boolean algebra (used for `BooleanAlgebra → BooleanRing`). |
| `BooleanAlgebra.toBooleanRing` | Constructs a Boolean ring from a Boolean algebra: <br> • `a + b = a ∆ b` (symmetric difference) <br> • `a * b = a ⊓ b` <br> • `-a = a`, `0 = ⊥`, `1 = ⊤`. |
| `AsBoolRing` | Type synonym for Boolean algebra viewed as Boolean ring. |
| `ofBoolRing_zero`, `ofBoolRing_one`, etc. | Simplification lemmas for ring ops under `ofBoolRing`. |
| `BoundedLatticeHom.asBoolRing` | Converts bounded lattice homomorphisms between Boolean algebras into ring homomorphisms between their Boolean ring versions. |
| `OrderIso.asBoolAlgAsBoolRing` | Order isomorphism `AsBoolAlg (AsBoolRing α) ≃o α`. |
| `RingEquiv.asBoolRingAsBoolAlg` | Ring isomorphism `AsBoolRing (AsBoolAlg α) ≃+* α`. |
| `Bool` instance | `Bool` is a Boolean ring with `and` as `*`, `xor` as `+`, `false` as `0`, `true` as `1`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ofBool*` / `toBool*`: Conversion functions between `α` and its synonym (`AsBoolRing α`, `AsBoolAlg α`).
  - `asBool*`: Functors on morphisms (e.g., `RingHom.asBoolAlg`, `BoundedLatticeHom.asBoolRing`).
- **Suffixes**:
  - `*Ring`, `*Algebra`: Denotes ring/algebra structures or conversions.
  - `*Eq*`: Equivalence or equality lemmas (e.g., `add_eq_zero'`, `ofBoolAlg_mul_ofBoolAlg_eq_left_iff`).
- **Operation names**:
  - `sup`, `inf`: Lattice ops defined from ring ops.
  - `mul_self`, `add_self`: Core idempotence/characteristic-2 properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `ring` | Simplifying polynomial expressions (e.g., expanding `(a + b)^2`). |
| `abel` | Abelian group reasoning (e.g., rearranging sums). |
| `rw [mul_self]`, `simp only [mul_self]` | Rewriting using idempotence. |
| `norm_num` | Simplifying numeric/Boolean literals (e.g., in `Bool` instance). |
| `cases a <;> rfl` | Case analysis on finite types (e.g., `Bool`). |
| `dsimp only [...]` | Definitional simplification for custom ops (`⊔`, `⊓`, etc.). |
| `simp_rw` | Rewriting with simplifier rules (e.g., `map_add f`, `map_mul f`). |
| `rwa [...]` | Rewrite + assumption (e.g., `rwa [self_eq_add_left]`). |

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a pattern of:
  1. **Expand definitions** (`dsimp only [...]`).
  2. **Apply ring/ring-like identities** (`ring`, `abel`).
  3. **Use derived lemmas** (`add_self`, `mul_self`, `neg_eq`) to reduce.
  4. **Simplify with `simp only`** for idempotent/characteristic-2 properties.
- **Induction**: Not used here (finite characteristic and algebraic identities suffice).
- **Equational reasoning**: Heavy use of `calc` blocks for multi-step equalities.
- **Symmetric difference**: Key tool in `AlgebraToRing` section; many proofs reduce to `symmDiff` properties (`symmDiff_comm`, `symmDiff_assoc`, etc.).

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.PUnitInstances.Algebra` | Provides `PUnit` ring instance (used for trivial Boolean ring). |
| `Mathlib.Tactic.Abel` | For reasoning in abelian groups (e.g., `abel` tactic). |
| `Mathlib.Tactic.Ring` | For ring arithmetic simplification (`ring` tactic). |
| `Mathlib.Order.Hom.Lattice` | Lattice homomorphisms and bounded lattice homs. |
| `Mathlib.Algebra.Ring.Equiv` | Ring isomorphisms (`RingEquiv`). |
| `scoped symmDiff` | Opens notation for symmetric difference `∆`. |

---

### Summary

This file formalizes the equivalence between **Boolean rings** (idempotent rings) and **Boolean algebras**, via two complementary constructions:
- **Ring → Algebra**: Define lattice ops as `a ⊔ b = a + b + ab`, complement as `1 + a`.
- **Algebra → Ring**: Define addition as symmetric difference (`∆`), multiplication as meet (`∧`).

It provides both **type-synonym encodings** (`AsBoolAlg`, `AsBoolRing`) and **locale-scoped instances** (`BooleanAlgebraOfBooleanRing`, `BooleanRingOfBooleanAlgebra`) for flexibility. The `Bool` example confirms correctness on the prototypical case.

The formalization is highly algebraic, relying on characteristic-2 identities and distributivity, with proofs streamlined by `ring`, `abel`, and `simp`-based automation.