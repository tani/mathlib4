Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

## 🔍 **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AdjoinRoot f` | `Type u` | Construction of the quotient ring `R[X]/(f)` for `f : R[X]`. |
| `mk f` | `R[X] →+* AdjoinRoot f` | Natural projection ring homomorphism. |
| `of f` | `R →+* AdjoinRoot f` | Embedding of base ring `R` into `AdjoinRoot f`. |
| `root f` | `AdjoinRoot f` | Image of `X` under `mk f`; the adjoined root. |
| `lift i x h` | `(i : R →+* S) → x : S → f.eval₂ i x = 0 → AdjoinRoot f →+* S` | Universal property: extends `i` sending `root f` to `x`. |
| `liftHom f x h` | `x : S → aeval x f = 0 → AdjoinRoot f →ₐ[R] S` | Algebraic version of `lift`. |
| `equiv f hf` | `(AdjoinRoot f →ₐ[F] L) ≃ {x // x ∈ f.aroots L}` | Bijection between algebra homomorphisms and roots of `f`. |
| `powerBasis' hg` | `PowerBasis R (AdjoinRoot g)` | Basis `1, root g, ..., root g^(d-1)` when `g` is monic of degree `d`. |
| `minpoly_root hf` | `minpoly K (root f) = f * C f.leadingCoeff⁻¹` | Minimal polynomial of `root f` over field `K`. |
| `isDomain_of_prime hf` | `Prime f → IsDomain (AdjoinRoot f)` | Quotient by prime ideal yields domain. |
| `instField [Fact (Irreducible f)]` | `Field (AdjoinRoot f)` | If `f` irreducible over field `K`, then `AdjoinRoot f` is a field. |
| `Minpoly.toAdjoin` | `AdjoinRoot (minpoly R x) →ₐ[R] adjoin R ({x})` | Surjective algebra map from adjunction by minimal polynomial. |
| `equiv' g pb h₁ h₂` | `AdjoinRoot g ≃ₐ[R] S` | Isomorphism when `S` has power basis and `g` is minimal polynomial of generator. |

---

## 📜 **2. Naming Conventions**

- **Prefixes**:
  - `mk_`: projection from polynomial ring to quotient (e.g., `mk`, `mk_C`, `mk_X`, `mk_self`, `mk_eq_zero`).
  - `of_`: embedding of base ring (e.g., `of`, `of.injective_of_degree_ne_zero`).
  - `lift_`: universal property maps (e.g., `lift`, `liftHom`, `lift_root`, `lift_of`).
  - `root_`: properties of the adjoined root (e.g., `root_isInv`, `isRoot_root`, `isAlgebraic_root`).
  - `powerBasis_`: basis constructions (e.g., `powerBasis'`, `powerBasisAux'`, `powerBasis_gen`).
  - `aeval_`: evaluation maps (e.g., `aeval_eq`, `aeval_algHom_eq_zero`).
  - `minpoly_`: minimal polynomial results (e.g., `minpoly_root`, `minpoly_powerBasis_gen`).

- **Suffixes**:
  - `_eq`: equality lemmas (e.g., `algebraMap_eq`, `lift_root`, `mk_eq_zero`).
  - `_hom`: homomorphism-related (e.g., `liftHom`, `modByMonicHom`, `toAdjoin`).
  - `_aux`: auxiliary constructions (e.g., `powerBasisAux'`, `equiv'`).
  - `_inst`: instance declarations (e.g., `instCommRing`, `instField`, `instSMulAdjoinRoot`).

---

## 🛠️ **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying goals using `@[simp]` lemmas (e.g., `mk_C`, `lift_root`, `aeval_eq`). |
| `rw` | Rewriting using equalities (especially `mk_eq_zero`, `aeval_eq`, `lift_of`). |
| `induction` / `induction_on` | Structural induction on `AdjoinRoot f` elements (via `Quotient.induction_on'`). |
| `ext` | Extensionality for ring/algebra homomorphisms (`algHom_ext`, `RingHom.ext`). |
| `apply` / `exact` | Goal-directed proof construction (e.g., using `mk_eq_zero.1`, `dvd_mul_right`). |
| `convert` | Flexible equality proof (e.g., `root_isInv`, `quotMapOfEquivQuotMapCMapSpanMk_mk`). |
| `rwa`, `rw [← ...]` | Rewriting with backward direction or using `←` to match terms. |
| `nontriviality` | To assume nontriviality of a domain (e.g., in `powerBasisAux'`). |
| `aesop` / `ring` | Not heavily used here; mostly manual simplification. |
| `have`, `suffices`, `by_cases` | Intermediate proof steps, especially in `isDomain_of_prime`, `minpoly_root`. |

---

## 🧠 **4. Proof Logic**

- **Structure**:
  - Most proofs follow **quotient induction** (`induction_on`) or **polynomial induction** (`Polynomial.induction_on`).
  - Universal properties (`lift`, `liftHom`) are proven via `Ideal.Quotient.lift_mk` and extensionality.
  - Field structure relies on `Prime f → IsMaximal (span {f})` in PID setting.
  - Power basis constructions use `modByMonicHom` to reduce polynomials modulo monic `g`, then verify basis properties via coefficient comparison.
  - Minimal polynomial computations use uniqueness of monic polynomials annihilating the root.

- **Common Patterns**:
  - Prove `f.eval₂ i (root f) = 0` → use `eval₂_root`.
  - Show injectivity of `of f` using `degree` or `monic` assumptions.
  - Use `aeval_eq` to relate `mk f p` and evaluation at `root f`.
  - For algebra isomorphisms: construct `liftHom` and inverse via `pb.lift`, then verify inverses via `induction_on`.

---

## 📦 **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Algebra.Defs` | Basic algebra definitions. |
| `Mathlib.Algebra.Polynomial.FieldDivision` | Division in polynomial rings over fields. |
| `Mathlib.FieldTheory.Minpoly.Basic` | Minimal polynomials and related theory. |
| `Mathlib.RingTheory.Adjoin.Basic` | Adjoining elements to rings/fields. |
| `Mathlib.RingTheory.FinitePresentation`, `FiniteType` | Finiteness conditions for algebras. |
| `Mathlib.RingTheory.Ideal.Quotient.Noetherian` | Quotients and Noetherian properties. |
| `Mathlib.RingTheory.PowerBasis` | Power basis theory (used for `AdjoinRoot` structure). |
| `Mathlib.RingTheory.PrincipalIdealDomain` | PID properties (e.g., irreducible ⇒ prime ⇒ maximal ideal). |
| `Mathlib.RingTheory.Polynomial.Quotient` | General quotient theory for polynomial rings. |

---

Let me know if you'd like a **diagram of dependencies**, **summary of key lemmas for automation**, or **extraction of proof patterns** for a specific sub-theory (e.g., field extensions, power bases, minimal polynomials).