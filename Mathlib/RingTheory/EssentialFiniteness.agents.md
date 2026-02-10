Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `Algebra.EssFiniteType` in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `EssFiniteType` | `class EssFiniteType : Prop` | Defines an `R`-algebra `S` as *essentially of finite type*: it is a localization of a finite-type `R`-algebra. |
| `EssFiniteType.finset` | `[EssFiniteType R S] → Finset S` | Chooses a finite subset `s ⊆ S` such that `S` is the localization of `R[s]`. |
| `EssFiniteType.subalgebra` | `[EssFiniteType R S] → Subalgebra R S` | The subalgebra `R[s]` (i.e., `adjoin R (finset R S)`), which is of finite type over `R`. |
| `EssFiniteType.submonoid` | `[EssFiniteType R S] → Submonoid (EssFiniteType.subalgebra R S)` | The submonoid of elements inverted to get `S`, namely the preimage of `IsUnit.submonoid S` under the inclusion `R[s] ↪ S`. |
| `essFiniteType_iff` | `EssFiniteType R S ↔ ∃ σ, ∀ s ∈ S, ∃ t ∈ R[σ], IsUnit t ∧ s·t ∈ R[σ]` | Equivalent characterization: `S` is essentially of finite type iff every element becomes regular after multiplying by a unit in some finitely generated subalgebra. |
| `essFiniteType_iff_exists_subalgebra` | `EssFiniteType R S ↔ ∃ S₀ M, FiniteType R S₀ ∧ IsLocalization M S` | Reformulation in terms of existence of a finite-type subalgebra and a submonoid whose localization gives `S`. |
| `EssFiniteType.comp` | `[EssFiniteType R S] → [EssFiniteType S T] → EssFiniteType R T` | Transitivity: composition of essentially finite-type algebras is essentially finite-type. |
| `EssFiniteType.baseChange` | `[EssFiniteType R S] → EssFiniteType T (T ⊗[R] S)` | Base change stability: tensoring an essentially finite-type algebra preserves the property. |
| `EssFiniteType.algHom_ext` | `[EssFiniteType R S] → (f g : S →ₐ[R] T) → (∀ s ∈ finset R S, f s = g s) → f = g` | **Main result**: algebra homomorphisms out of an essentially finite-type algebra are determined by their values on a *finite* subset. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `essFiniteType_`: for lemmas about the `EssFiniteType` class (e.g., `essFiniteType_iff`, `essFiniteType_cond_iff`).
  - `EssFiniteType.`: for definitions and instances (e.g., `EssFiniteType.finset`, `EssFiniteType.comp`).
- **Suffixes**:
  - `_iff`: for equivalence lemmas (e.g., `essFiniteType_iff`, `essFiniteType_cond_iff`).
  - `_aux`: for auxiliary lemmas used in proofs (e.g., `EssFiniteType.aux`).
  - `_mem_`: for membership lemmas (e.g., `EssFiniteType.adjoin_mem_finset`).
- **Variable naming**:
  - `σ`, `s`, `t`: typically finite sets or elements.
  - `S₀`, `S₁`, `S₂`: subalgebras or intermediate algebras.
  - `M`, `N`: submonoids.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `simp_rw`: rewriting using equivalences and definitions.
- `exact`, `refine`, `obtain`: constructing witnesses and applying existential quantifiers.
- `induction' ... using ...`: structural induction on tensor products (`TensorProduct.induction_on`).
- `apply ...`: applying lemmas or instances (e.g., `apply IsLocalization.ringHom_ext`).
- `ext`: extensionality for ring/algebra homomorphisms.
- `aesop`, `ring`, `simp`: likely used implicitly in `simpa`, `simp only`, or `exact`-based automation.
- `mul_mem`, `add_mem`, `Subalgebra.mem_map.mpr`: algebraic membership reasoning.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *constructive* pattern: use the definition `essFiniteType_iff` to extract finite sets and unit conditions, then construct witnesses for the target algebra.
  - **Induction** is used for tensor product elements (`TensorProduct.induction_on`) to reduce to simple tensors and sums.
  - **Localization-specific lemmas** like `IsLocalization.ringHom_ext` and `AlgHom.ext_of_adjoin_eq_top` are used to extend equality from dense subsets.
  - **Transitivity proofs** (`comp`, `baseChange`) involve:
    - Combining finite sets (`image ∪` or `image`).
    - Using `EssFiniteType.aux` to lift properties through scalar towers.
    - Verifying unit and closure conditions via algebraic manipulations (e.g., `mul_mem`, `smul_mem`).

- **Key logical flow**:
  1. Unfold `EssFiniteType` using `essFiniteType_iff`.
  2. Extract finite sets and unit conditions.
  3. Construct candidate finite set / submonoid for the target algebra.
  4. Prove required properties using algebraic closure and localization properties.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.RingTheory.FiniteType`: defines finite-type algebras.
  - `Mathlib.RingTheory.Localization.Defs`: defines localization and `IsLocalization`.
  - `Mathlib.RingTheory.TensorProduct.Basic`: for base change and tensor product constructions.

- **Scope**:
  - `open scoped TensorProduct`: enables `⊗[R]` notation.
  - `variable (R S T : Type*) [CommRing R] ...`: assumes commutative rings and algebra structures.
  - `variable {R S}`: for lemmas that don’t depend on `T`.

---

This module formalizes a foundational stability property of *essentially of finite type* algebras — a key class in algebraic geometry (e.g., morphisms locally of finite type). The `algHom_ext` lemma is particularly useful for proving uniqueness of extensions in deformation theory or moduli problems.