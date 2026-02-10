Here's a structured technical metadata summary of the provided Lean 4 file, extracted for use in building a domain-specific AI agent focused on Galois theory and group actions on fields:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `FixedBy.subfield` | `FixedBy.subfield (m : M) : Subfield F` — the subfield of elements fixed by a monoid action `m`. |
| `FixedPoints.subfield` | `FixedPoints.subfield (M) : Subfield F` — the subfield of elements fixed by *all* elements of a monoid `M` acting on `F`. |
| `IsInvariantSubfield` | Typeclass: `S : Subfield F` is invariant under `M`-action if `m • x ∈ S` whenever `x ∈ S`. |
| `minpoly G F x` | `Polynomial (FixedPoints.subfield G F)` — minimal polynomial of `x ∈ F` over the fixed field `F^G`. Defined as `prodXSubSMul G F x` coerced to the fixed field. |
| `minpoly.monic`, `minpoly.eval₂`, `minpoly.irreducible` | Core properties of `minpoly`: monic, vanishes at `x`, and irreducible over `F^G`. |
| `isIntegral` | `IsIntegral (FixedPoints.subfield G F) x` — every `x ∈ F` is integral over the fixed field when `G` is finite. |
| `normal`, `isSeparable` | Instances showing `F / F^G` is a **normal** and **separable** extension (hence Galois when finite). |
| `finrank_le_card` | `finrank (F^G) F ≤ |G|` — degree of extension bounded by group order. |
| `finrank_eq_card` | `finrank (F^G) F = |G|` — equality when the action is **faithful** and `G` is finite. |
| `toAlgHom_bijective`, `toAlgHomEquiv` | Bijection between `G` and `F →ₐ[F^G] F` (algebra homomorphisms fixing `F^G`). |
| `toAlgAut_bijective`, `toAlgAutMulEquiv` | Bijection between `G` and algebra automorphisms `F ≃ₐ[F^G] F`. |
| `toAlgAut_surjective` | Surjectivity of the natural map `G → AlgAut(F / F^G)` (no faithfulness needed). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `FixedBy.` / `FixedPoints.` — for constructions related to fixed sets under actions.
  - `isIntegral`, `isSeparable`, `normal` — typeclass instances for properties of field extensions.
  - `smul_`, `mul_`, `inv_`, `add_` — for lemmas about interaction of action with ring operations (e.g., `smul_add`, `smul_mul'`, `smul_inv''`).
  - `coe_`, `map_`, `eval₂` — for coercion, map, and evaluation lemmas.

- **Suffixes**:
  - `_mem'` — membership proofs for subfield/subring definitions (e.g., `zero_mem'`, `one_mem'`, `mul_mem'`).
  - `_eq_`, `_le_`, `_ge_` — equality/inequality lemmas (e.g., `finrank_eq_card`, `finrank_le_card`).
  - `_aux` — auxiliary lemmas used in main proofs (e.g., `irreducible_aux`).
  - `_of_`, `_to_` — for maps or equivalences (e.g., `toAlgHomEquiv`, `toAlgAutMulEquiv`).

- **Special**:
  - `prodXSubSMul` — product over `g ∈ G` of `X - g • x`, key in defining minimal polynomials.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using definitional equalities, especially for `fixedPoints`, `smul`, `Subfield` membership. |
| `rw` / `rwa` | Rewriting using lemmas or assumptions (e.g., `smul_add`, `one_smul`, `eval₂`). |
| `congr_arg`, `congr_arg₂` | Proving equality of compound expressions by congruence. |
| `ext` / `ext x` | Extensionality for functions/sets (e.g., proving two subfields equal by extensionality). |
| `cases'` / `rcases` | Case analysis on existential or conjunction hypotheses. |
| `induction` / `Polynomial.induction_on` | Structural induction on polynomials. |
| `exact`, `refine`, `apply` | Goal-directed proof construction. |
| `have`, `suffices` | Introducing intermediate claims. |
| `convert`, `change`, `conv_lhs` | Fine-grained rewriting and goal manipulation. |
| `rwa`, `erw` | Rewriting with definitional equality (`erw`) or using assumptions (`rwa`). |
| `apply_fun`, `funext` | Functional extensionality and application. |
| `linearIndependent_iff'`, `Finsupp.mem_span_image_iff_linearCombination` | Advanced linear algebra lemmas. |

---

### **4. Proof Logic & Strategy**

- **Inductive/constructive definitions**: Subfields defined via `Subfield.copy` to ensure underlying set matches `fixedPoints`.
- **Invariant subfields**: Use `IsInvariantSubfield` to lift actions to subfields.
- **Minimal polynomial construction**:
  - Define `minpoly` as `prodXSubSMul` (product over orbit), then prove:
    - Monic (via `monic_toSubring`)
    - Vanishes at `x` (via `eval₂`)
    - Irreducible (via `irreducible_aux`, using coprimality of linear factors and evaluation).
- **Galois correspondence**:
  - Show `F / F^G` is finite, normal, separable → Galois extension.
  - Prove `dim_{F^G} F = |G|` under faithfulness using:
    - `finrank_le_card` (via linear independence lifting)
    - Reverse inequality via `toAlgHom_injective` and dimension bounds on `AlgHom`.
- **Bijections**:
  - Use `Equiv.ofBijective` / `MulEquiv.ofBijective` to promote injective + cardinality match to equivalence.
  - Surjectivity of `toAlgAut` uses quotient by kernel and faithfulness of induced action.

---

### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Polynomial.GroupRingAction` — group ring actions, orbit constructions.
- `Mathlib.Algebra.Ring.Action.Field`, `Mathlib.Algebra.Ring.Action.Invariant` — foundational theory of ring/field actions and invariants.
- `Mathlib.FieldTheory.Normal`, `Mathlib.FieldTheory.Separable` — definitions and properties of normal/separable extensions.
- `Mathlib.LinearAlgebra.FreeModule.Finite.Matrix` — finite-dimensional linear algebra (used for `finrank`, `rank`, `linearIndependent`).

**Domain Scope**:
- **Galois theory** (finite group actions on fields).
- **Invariant theory** (fixed fields, invariant subrings).
- **Module theory** (algebra structures, SMul, SMulCommClass).
- **Polynomial algebra** (minimal polynomials, separability, splitting).
- **Cardinal arithmetic** (rank, finrank, injectivity/surjectivity via cardinal bounds).

---

Let me know if you'd like a visual dependency graph or a formalization roadmap for Galois theory based on this module.