Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Purely Inseparable Extensions and Relative Perfect Closure**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPurelyInseparable` | `class IsPurelyInseparable : Prop` | Typeclass for purely inseparable algebraic extensions: every separable element lies in the base field. |
| `perfectClosure` | `def perfectClosure : IntermediateField F E` | Maximal purely inseparable subextension of `E / F`; elements `x ∈ E` with `x^(q^n) ∈ F` for some `n`, where `q = ringExpChar F`. |
| `isPurelyInseparable_iff_pow_mem` | `IsPurelyInseparable F E ↔ ∀ x, ∃ n, x^(q^n) ∈ range (algebraMap F E)` | Characterization of purely inseparable extensions via exponential characteristic powers. |
| `isPurelyInseparable_iff_natSepDegree_eq_one` | `IsPurelyInseparable F E ↔ ∀ x, (minpoly F x).natSepDegree = 1` | Pure inseparability ⇔ all minimal polynomials have separable degree 1. |
| `isPurelyInseparable_iff_minpoly_eq_X_pow_sub_C` | `∀ x, ∃ n, y, minpoly F x = X^(q^n) - C y` | Minimal polynomials are of the form `X^(q^n) - c`. |
| `isPurelyInseparable_iff_minpoly_eq_X_sub_C_pow` | `∀ x, ∃ n, minpoly F x = (X - x)^(q^n)` | Minimal polynomials split as pure powers of linear factors over `E`. |
| `isPurelyInseparable_of_finSepDegree_eq_one` | `finSepDegree F E = 1 → IsPurelyInseparable F E` | Finite separable degree 1 implies pure inseparability. |
| `IsPurelyInseparable.surjective_algebraMap_of_isSeparable` | `[IsPurelyInseparable F E] → [IsSeparable F E] → Function.Surjective (algebraMap F E)` | If extension is both separable and purely inseparable, then algebra map is surjective. |
| `IsPurelyInseparable.bijective_algebraMap_of_isSeparable` | `[Nontrivial E] → [NoZeroSMulDivisors F E] → bijective (algebraMap F E)` | Under same assumptions, algebra map is bijective. |
| `le_perfectClosure_iff` | `L ≤ perfectClosure F E ↔ IsPurelyInseparable F L` | Characterizes the perfect closure as the maximal purely inseparable subextension. |
| `IsPurelyInseparable.injective_comp_algebraMap` | `[IsReduced L] → injective (fun f ↦ f.comp (algebraMap F E))` | Purely inseparable extensions are *epimorphisms* in the category of fields. |
| `IsPurelyInseparable.of_injective_comp_algebraMap` | If `(E →+* L) → (F →+* L)` injective for algebraically closed `L`, then `E/F` purely inseparable | Converse: epimorphisms in fields are purely inseparable. |
| `separableClosure.isPurelyInseparable` | `[Algebra.IsAlgebraic F E] → IsPurelyInseparable (separableClosure F E) E` | Over the separable closure, the extension is purely inseparable. |
| `separableClosure_le_iff` | `[Algebra.IsAlgebraic F E] → L ≥ separableClosure F E ↔ IsPurelyInseparable L E` | Intermediate fields over which `E` is purely inseparable contain the separable closure. |
| `eq_separableClosure_iff` | `[Algebra.IsAlgebraic F E] → L = separableClosure F E ↔ IsSeparable F L ∧ IsPurelyInseparable L E` | Characterization of the separable closure as the maximal separable subextension with purely inseparable quotient. |
| `minpoly.map_eq_of_isSeparable_of_isPurelyInseparable` | If `E/F` purely inseparable and `x ∈ K` separable over `F`, then `minpoly F x = minpoly E x` | Minimal polynomials don’t change over purely inseparable base extensions for separable elements. |
| `Polynomial.Separable.map_irreducible_of_isPurelyInseparable` | If `f ∈ F[X]` separable irreducible and `E/F` purely inseparable, then `f` remains irreducible over `E` | Separable irreducibles stay irreducible over purely inseparable extensions. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isPurelyInseparable_`: properties/characterizations of pure inseparability.
  - `perfectClosure.`: operations on the perfect closure.
  - `separableClosure.`: operations on the separable closure.
  - `IsPurelyInseparable.`: lemmas about the typeclass.
  - `IntermediateField.`: lemmas about intermediate fields.

- **Suffixes:**
  - `_iff`: biconditional characterizations.
  - `_eq_one`: when separable degree is 1.
  - `_pow_mem`: when elements become base-field elements under Frobenius powers.
  - `_eq_X_pow_sub_C`, `_eq_X_sub_C_pow`: structural descriptions of minimal polynomials.

- **Other patterns:**
  - `tower_bot`, `tower_top`: behavior in towers.
  - `trans`: transitivity of pure inseparability.
  - `of_`, `of_injective_`, `of_surjective_`: implications from properties to pure inseparability.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: rewriting and simplification (especially with `minpoly`, `algebraMap`, `pow`, `frobenius`).
- `exact`, `refine`, `apply`: constructing proofs.
- `intro`, `intro x`, `intro hx`: introducing variables/hypotheses.
- `obtain ⟨x, hx⟩`: destructing existential hypotheses.
- `ext x`: extensionality for sets/functions.
- `convert`, `antisymm`: for equality of substructures.
- `nontriviality`, `haveI`: introducing class instances.
- `rwa`, `rfl`, `congr_arg`: standard equality reasoning.
- `ring`, `abel`: for additive/multiplicative simplifications (less frequent).
- `aesop`: for routine logical steps (not explicitly used here, but likely in background).

---

#### **4. Proof Logic**

- **Inductive/structural reasoning** on minimal polynomials and separable degrees.
- **Case analysis** on whether extensions are algebraic or transcendental (e.g., `isPurelyInseparable_of_finSepDegree_eq_one`).
- **Use of Frobenius powers** (`x ^ q^n`) to reduce to base field membership.
- **Characterization via minimal polynomials**: many proofs go through equivalent conditions on `minpoly`.
- **Tower arguments**: behavior in field towers (`tower_bot`, `tower_top`, `trans`).
- **Category-theoretic reasoning**: epimorphism characterization via injectivity of `Hom(E, L) → Hom(F, L)` for reduced/algebraically closed `L`.
- **Duality between separable and purely inseparable parts**: separable closure + perfect closure = whole extension, with trivial intersection.

---

#### **5. Imports**

- `Mathlib.Algebra.CharP.ExpChar`: exponential characteristic and Frobenius.
- `Mathlib.Algebra.CharP.IntermediateField`: interaction of `CharP`/`ExpChar` with intermediate fields.
- `Mathlib.FieldTheory.SeparableClosure`: separable closure, separable degree, minimal polynomials.

---

Let me know if you'd like a diagram of dependencies or a summary of the main logical flow for a specific theorem (e.g., `isPurelyInseparable_iff_pow_mem`).