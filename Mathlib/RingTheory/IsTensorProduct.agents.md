Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsTensorProduct f` | `Prop` — expresses that a bilinear map `f : M₁ →ₗ[R] M₂ →ₗ[R] M` realizes `M` as the tensor product `M₁ ⊗[R] M₂`, i.e., the induced linear map `TensorProduct.lift f : M₁ ⊗[R] M₂ → M` is bijective. |
| `IsBaseChange S f` | `Prop` — expresses that `f : M →ₗ[R] N` (with `N` an `S`-module) realizes `N` as the base change of `M` along `R → S`, i.e., the map `S × M → N, (s, m) ↦ s • f m` is the tensor product. |
| `Algebra.IsPushout` | `Prop` — asserts that a square of scalar towers<br>```\n  R → S<br>↓   ↓<br>R' → S'\n```\nis a pushout in the category of commutative rings/algebras, i.e., `S' ≅ S ⊗[R] R'`. |
| `TensorProduct.isTensorProduct` | `IsTensorProduct (TensorProduct.mk R M N)` — the canonical bilinear map `mk` makes the tensor product. |
| `TensorProduct.isBaseChange` | `IsBaseChange S (TensorProduct.mk R S M 1)` — `S ⊗[R] M` is the base change of `M` along `R → S`. |
| `IsTensorProduct.equiv` | `M₁ ⊗[R] M₂ ≃ₗ[R] M` — linear equivalence from the bijectivity assumption. |
| `IsTensorProduct.lift` | `M →ₗ[R] M'` — lift of a bilinear map through a tensor product. |
| `IsTensorProduct.map` | `M →ₗ[R] N` — map induced by pair of linear maps between tensor products. |
| `IsTensorProduct.inductionOn` | Induction principle for elements of `M` under tensor product structure. |
| `IsBaseChange.equiv` | `S ⊗[R] M ≃ₗ[S] N` — linear equivalence for base change. |
| `IsBaseChange.lift` | `N →ₗ[S] Q` — universal property: any `R`-linear map from `M` to an `S`-module factors through `f`. |
| `IsBaseChange.inductionOn` | Induction principle for `N` under base change. |
| `IsBaseChange.of_equiv` | Constructs `IsBaseChange` from an equivalence satisfying `e (1 ⊗ x) = f x`. |
| `IsBaseChange.of_lift_unique` | Characterization of base change via uniqueness of factorization. |
| `IsBaseChange.iff_lift_unique` | Equivalence between `IsBaseChange` and the universal property. |
| `Algebra.pushoutDesc` | Universal property of pushout: given commuting maps `S → A`, `R' → A`, produces unique `S' → A`. |
| `Algebra.IsPushout.comp_iff` | Pushout stability under composition: big rectangle is pushout iff right square is, given left square is. |

---

### **2. Naming Conventions**

- **Predicates**:
  - `is_` prefix: `IsTensorProduct`, `IsBaseChange`, `Algebra.IsPushout`
- **Equivalences / maps**:
  - `equiv`: `IsTensorProduct.equiv`, `IsBaseChange.equiv`
  - `lift`: `IsTensorProduct.lift`, `IsBaseChange.lift`
  - `map`: `IsTensorProduct.map`
  - `of_`: `IsTensorProduct.of_equiv`, `IsBaseChange.of_equiv`, `IsBaseChange.of_lift_unique`, `IsBaseChange.ofEquiv`, `IsBaseChange.of_comp`
  - `comp`: `IsBaseChange.comp`, `IsBaseChange.comp_iff`
- **Projection / helper lemmas**:
  - `toLinearMap`, `toAlgHom`, `restrictScalars`
  - `apply`, `symm_apply`, `inductionOn`, `ext`, `algHom_ext`, `algHom_ext'`
- **Pushout-specific**:
  - `pushoutDesc`, `comm`, `left`, `right`, `algHom_ext`

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` — heavily used for simplification, especially with `smul_tmul'`, `map_add`, `map_zero`, `one_smul`, etc.
- `rw` — rewriting using lemmas and definitions.
- `induction` / `inductionOn` — structural induction on tensor products or base changes.
- `convert_to`, `convert` — for equational reasoning with typeclass inference.
- `ext` — extensionality for linear maps / algebra homomorphisms.
- `ring` — for commutative ring identities (e.g., in `TensorProduct.isBaseChange`).
- `apply`, `exact`, `refine`, `assumption` — standard proof automation.
- `change`, `dsimp`, `congr` — for local rewriting and congruence closure.
- `letI`, `haveI`, `let _ :=` — for introducing instances and hypotheses.

---

### **4. Proof Logic**

- **Inductive structure**:
  - Proofs often proceed by induction on tensor product elements (`TensorProduct.inductionOn`, `IsTensorProduct.inductionOn`, `IsBaseChange.inductionOn`), using:
    - `zero` (additive identity),
    - `tmul` (pure tensors),
    - `add` (additivity).
- **Universal properties**:
  - Many results are proved via universal properties: uniqueness + existence of factorizations.
  - E.g., `IsBaseChange.of_lift_unique`, `Algebra.pushoutDesc`.
- **Equational reasoning**:
  - Heavy use of `simp` + `rw` to reduce to known identities (e.g., `smul_tmul'`, `mul_one`, `map_add`).
- **Equivalence-based reasoning**:
  - `LinearEquiv.ofBijective`, `LinearEquiv.ofLinear`, `AlgHom.ofLinearMap` used to construct equivalences/homomorphisms.
- **Diagram chasing**:
  - Pushout properties are verified by checking commutativity and uniqueness on generators (pure tensors or images of algebra maps).
- **Typeclass inference**:
  - Instances like `IsScalarTower`, `Module`, `Algebra` are introduced via `letI`, `haveI`, or `inferInstance`.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Module.ULift` — for `ULift` constructions (used in uniqueness proofs).
- `Mathlib.RingTheory.TensorProduct.Basic` — core tensor product theory.
- `Mathlib.Tactic.Ring` — for ring simplifications.

**Domain scope**:
- Commutative semirings and modules.
- Base change and tensor product of modules and algebras.
- Pushouts in the category of commutative rings/algebras.

**Key universe levels**:
- `u v₁ v₂ v₃ v₄` — used for type universe polymorphism.

---

Let me know if you'd like a visual diagram of the pushout square or a summary of how `pushoutDesc` interacts with `TensorProduct`.