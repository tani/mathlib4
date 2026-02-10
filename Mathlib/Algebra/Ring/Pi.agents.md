### Technical Brief: Pi Instances for Rings in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Pi.distrib` | `[∀ i, Distrib (f i)] → Distrib (∀ i, f i)` | Constructs pointwise distributivity for `Π`-types. |
| `Pi.hasDistribNeg` | `[∀ i, Mul (f i)] [∀ i, HasDistribNeg (f i)] → HasDistribNeg (∀ i, f i)` | Ensures distributivity of negation over multiplication in `Π`-types. |
| `Pi.addMonoidWithOne` | `[∀ i, AddMonoidWithOne (f i)] → AddMonoidWithOne (∀ i, f i)` | Lifts `AddMonoidWithOne` structure pointwise. |
| `Pi.addGroupWithOne` | `[∀ i, AddGroupWithOne (f i)] → AddGroupWithOne (∀ i, f i)` | Lifts `AddGroupWithOne` structure pointwise. |
| `Pi.nonUnitalNonAssocSemiring` | `[∀ i, NonUnitalNonAssocSemiring (f i)] → NonUnitalNonAssocSemiring (∀ i, f i)` | Constructs pointwise non-unital, non-associative semiring. |
| `Pi.nonUnitalSemiring`, `Pi.nonAssocSemiring`, `Pi.semiring`, `Pi.commSemiring` | Various | Hierarchical lifting of semiring structures (with/without unity, associativity, commutativity). |
| `Pi.nonUnitalNonAssocRing`, `Pi.nonUnitalRing`, `Pi.nonAssocRing`, `Pi.ring`, `Pi.commRing` | Various | Analogous lifting for ring-like structures (with additive group structure). |
| `Pi.nonUnitalRingHom` | `(g : ∀ i, γ →ₙ+* f i) → γ →ₙ+* ∀ i, f i` | Constructs a non-unital ring homomorphism from a family of such. |
| `Pi.ringHom` | `(g : ∀ i, γ →+* f i) → γ →+* ∀ i, f i` | Constructs a ring homomorphism from a family of such. |
| `Pi.evalNonUnitalRingHom`, `Pi.evalRingHom` | `(i : I) → (∀ i, f i) →ₙ+* f i` or `→+* f i` | Evaluation map at a point, upgraded to a (non-unital) ring homomorphism. |
| `Pi.constNonUnitalRingHom`, `Pi.constRingHom` | `β →ₙ+* α → β` or `→+* α → β` | Constant function map, upgraded to a (non-unital) ring homomorphism. |
| `Pi.NonUnitalRingHom.compLeft`, `Pi.RingHom.compLeft` | `(α →ₙ+* β) → (I → α) →ₙ+* I → β` | Precomposition with a (non-unital) ring homomorphism. |
| `Pi.nonUnitalRingHom_injective`, `Pi.ringHom_injective` | Injectivity criteria | Proves injectivity of `Pi.nonUnitalRingHom` / `Pi.ringHom` under pointwise injectivity. |
| `Pi.evalRingHom_surjective` (via `RingHomSurjective`) | Surjectivity of evaluation | Shows evaluation maps are surjective when codomain is a semiring. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Pi.`: All definitions and instances live in the `Pi` namespace.
  - `nonUnital`, `nonAssoc`: Used to distinguish weaker algebraic structures (e.g., no unit, no associativity).
  - `compLeft`: For precomposition-induced maps.
  - `const`, `eval`: For constant/evaluation maps.

- **Suffixes**:
  - `Hom`: For homomorphism types (`MulHom`, `AddMonoidHom`, `RingHom`, etc.).
  - `nonUnitalRingHom`, `ringHom`: Distinguish based on presence of unit preservation.

- **Structure composition**:
  - Instances often combine multiple components using `{ ... with }`, e.g.:
    ```lean
    { Pi.distrib, Pi.addCommMonoid, Pi.mulZeroClass with }
    ```

---

#### **3. Tactic Stack**

- **`ext`**: Used repeatedly to prove extensionality of functions (pointwise equality).
- **`funext`**: To extend pointwise equalities to function equality.
- **`simp` / `simp_rw`**: Implicitly used via `@[simps]` attributes to generate simplification lemmas.
- **`exact`**: For applying lemmas directly (e.g., `mul_add`, `add_mul`).
- **`intros`**: To introduce variables and hypotheses in proofs.
- **`__`**: Used in instance declarations to inherit missing fields (e.g., `__ := addGroup`).
- **`classical`**: In surjectivity proof (`is_surjective`), to pick a witness.

---

#### **4. Proof Logic**

- **Structure lifting**: Most proofs follow a *pointwise* pattern:
  1. Introduce arbitrary index `i`.
  2. Use `ext` to reduce to proving equality at `i`.
  3. Apply the corresponding property from the component type `f i`.
  4. Use `exact` or `simp` to conclude.

- **Homomorphism construction**:
  - Define underlying function (e.g., `fun x b => g b x`).
  - Prove additivity and multiplicativity separately (often via `addMonoidHom`, `mulHom` constructors).
  - Use `@[simps]` to automatically generate projection lemmas.

- **Injectivity proofs**:
  - Reduce to injectivity of component homs (e.g., `mulHom_injective`, `monoidHom_injective`).
  - Require `Nonempty I` to avoid vacuity.

- **Surjectivity proofs**:
  - Construct a witness using case analysis (`if h : · = i then ... else ...`).
  - Use `simp` to verify the witness maps correctly.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Algebra.Group.Pi.Lemmas`: Basic `Π`-type group lemmas.
  - `Mathlib.Algebra.GroupWithZero.Pi`: `Π`-types with zero and negation.
  - `Mathlib.Algebra.Ring.CompTypeclasses`: Typeclass composition utilities.
  - `Mathlib.Algebra.Ring.Hom.Defs`: Definitions of ring homomorphisms.

- **Scope**:
  - Focuses on lifting algebraic structures (semirings, rings, etc.) to function spaces `Π i, f i`.
  - Covers both *pointwise* algebraic operations and *homomorphic* constructions (`ringHom`, `eval`, `const`, `compLeft`).
  - Supports both unital and non-unital, associative and non-associative variants.

---

### Summary

This file formalizes the standard categorical fact that the category of (non-unital, non-associative, etc.) rings is cartesian closed under `Π`-types. It provides a systematic hierarchy of instances and homomorphisms for `Π`-types, with proofs largely relying on pointwise reasoning and extensionality. The design reflects Lean’s typeclass inference and the Mathlib philosophy of modularity and reuse.