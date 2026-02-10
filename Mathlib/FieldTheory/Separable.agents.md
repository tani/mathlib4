Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Separable Polynomials and Extensions in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Polynomial.Separable f` | `f : R[X] → Prop` | `f` is separable iff `f` and `f'` are coprime (`IsCoprime f (derivative f)`). |
| `IsSeparable K x` | `x : K → Prop` | `x` is separable over `K` iff its minimal polynomial `minpoly K x` is separable. |
| `Algebra.IsSeparable K L` | `Prop` | `L` is separable over `K` iff every `x : L` is separable over `K`. |
| `separable_def` | `f.Separable ↔ IsCoprime f (derivative f)` | Definition equivalence. |
| `separable_def'` | `f.Separable ↔ ∃ a b, a * f + b * f' = 1` | Bézout characterization. |
| `separable_X_add_C` | `(X + C a).Separable` | Linear polynomials are separable. |
| `separable_X_sub_C` | `(X - C x).Separable` | Shifted linear polynomials are separable. |
| `separable_C` | `(C r).Separable ↔ IsUnit r` | Constant polynomials are separable iff the constant is a unit. |
| `Separable.squarefree` | `Separable f → Squarefree f` | Separable ⇒ square-free. |
| `separable_iff_derivative_ne_zero` (for irreducible `f`) | `f.Separable ↔ derivative f ≠ 0` | For irreducibles, separability ⇔ nonzero derivative. |
| `nodup_roots` | `Separable f → f.roots.Nodup` | Separable polynomials have distinct roots. |
| `card_rootSet_eq_natDegree` | Under splitting, `#roots = degree` iff separable. | Counts roots in splitting fields. |
| `separable_prod_X_sub_C_iff` | `∏ (X - C (f i)).Separable ↔ Function.Injective f` | Product of linear factors separable ⇔ injective roots. |
| `IsSeparable.of_integral` (char 0) | `IsIntegral x → IsSeparable x` | In char 0, integral elements are separable. |
| `AlgEquiv.isSeparable_iff` | `IsSeparable (e x) ↔ IsSeparable x` | Separability preserved under algebra isomorphism. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `separable_`: for lemmas about `Polynomial.Separable`.
  - `isUnit_`, `isCoprime_`, `isIntegral_`, `isSeparable_`: for properties of elements/structures.
  - `of_`, `mul_`, `map_`, `tower_`, `injective_`, `nodup_`: indicate proof strategy or structure.
- **Suffixes**:
  - `_iff`: bi-implication lemmas.
  - `_left`, `_right`: for left/right factors in products.
  - `_iff_of_splits`: conditional equivalence under splitting assumptions.
- **Special**:
  - `expand`, `contract`: used in `CharP` context for Frobenius-related constructions.

#### **3. Tactic Stack**

Frequent tactics used:
- `rw`, `simp`, `simp_rw`: for rewriting definitions and simplifying.
- `exact`, `refine`, `convert`: for constructing proofs.
- `intro`, `cases`, `rcases`, `obtain`: for destructuring hypotheses.
- `ring`, `ring1`: for polynomial arithmetic simplifications.
- `apply`, `apply_fun`: for applying lemmas and mapping functions.
- `contrapose!`, `by_contra`, `classical`: for classical reasoning.
- `Finset.induction_on`, `Multiset` lemmas: for finite/multiset inductions.
- `nontriviality`, `subsingleton_or_nontrivial`: for handling degenerate cases.

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern: *unfold definition → apply coprimality/Bézout → manipulate using derivative/product rules → conclude*.
  - Induction is used for `of_pow'`, `separable_prod'`, and `exists_separable_of_irreducible`.
  - In `CharP` section: Frobenius expansion (`expand`) and contraction (`contract`) are central; proofs often split on derivative being zero or not.
  - For field extensions: tower lemmas (`tower_top`, `tower_bot`) use minimal polynomial divisibility and mapping.
- **Common Patterns**:
  - Use `separable_def'` to construct explicit Bézout coefficients.
  - Use `nodup_roots` or `card_rootSet_eq_natDegree` to link separability with root multiplicity.
  - Use `separable_iff_derivative_ne_zero` for irreducibles to reduce to derivative nonzero.

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Polynomial.Expand`: Frobenius map (`expand`) and related lemmas.
- `Mathlib.Algebra.Polynomial.Splits`: splitting fields and root sets.
- `Mathlib.Algebra.Squarefree.Basic`: square-free polynomials.
- `Mathlib.FieldTheory.IntermediateField.Basic`: field extensions and intermediate fields.
- `Mathlib.FieldTheory.Minpoly.Field`: minimal polynomials over fields.
- `Mathlib.RingTheory.Polynomial.Content`: content and Gauss’s lemma (used implicitly).
- `Mathlib.RingTheory.PowerBasis`: power bases (used in `expand` context).
- `Mathlib.Data.ENat.Lattice`: extended naturals for multiplicities.

**Scope**:
- General setting: `CommSemiring`, `CommRing`, `IsDomain`, `Field`.
- Key extensions: separability of elements, extensions, and minimal polynomials.
- Includes both algebraic and field-theoretic aspects, with emphasis on characteristic `p` behavior.

---

Let me know if you'd like a diagram of dependencies or a summary of how this fits into the broader `Mathlib` separability ecosystem (e.g., relation to `PerfectField`, `Galois`, `Normal`).