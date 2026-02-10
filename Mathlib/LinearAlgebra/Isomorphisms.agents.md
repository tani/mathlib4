### Technical Metadata Brief: Isomorphism Theorems for Modules in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `quotKerEquivRange` | `(M ⧸ LinearMap.ker f) ≃ₗ[R] LinearMap.range f` | **First Isomorphism Theorem**: quotient by kernel ≅ image/range. |
| `quotKerEquivOfSurjective` | `(M ⧸ LinearMap.ker f) ≃ₗ[R] M₂` (given `hf : Surjective f`) | Special case of first iso thm when map is surjective (range = top). |
| `subToSupQuotient` | `p →ₗ[R] (p ⊔ p') ⧸ comap (subtype) p'` | Intermediate linear map used to construct second iso thm. |
| `quotientInfToSupQuotient` | `p ⧸ comap p.subtype (p ⊓ p') →ₗ[R] (p ⊔ p') ⧸ comap (subtype) p'` | Canonical map from `p/(p ∩ p')` to `(p + p')/p'`. |
| `quotientInfEquivSupQuotient` | `p ⧸ (p ⊓ p') ≃ₗ[R] (p ⊔ p') ⧸ p'` | **Second Isomorphism Theorem**: canonical iso between quotient constructions. |
| `quotientQuotientEquivQuotientAux` | `(M ⧸ S) ⧸ (T.map S.mkQ) →ₗ[R] M ⧸ T` | Pre-equivalence for third iso thm. |
| `quotientQuotientEquivQuotient` | `((M ⧸ S) ⧸ (T.map S.mkQ)) ≃ₗ[R] M ⧸ T` | **Third (Noether) Isomorphism Theorem**: `(M/S)/(T/S) ≅ M/T`. |
| `quotientQuotientEquivQuotientSup` | Same domain/codomain as above but codomain rewritten as `M ⧸ S ⊔ T` | Variant using suprema instead of ≤. |
| `card_quotient_mul_card_quotient` | `Nat.card (S.map T.mkQ) * Nat.card (M ⧸ S) = Nat.card (M ⧸ T)` | Cardinality corollary of third iso thm (index multiplication). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `quotient*`: constructions involving quotients.
  - `quotKer*`: specifically about quotient by kernel.
  - `subToSupQuotient`, `quotientInfToSupQuotient`: maps between quotient constructions involving inf/sup.
  - `quotientQuotient*`: nested quotients (third iso thm).
- **Suffixes**:
  - `Equiv`: indicates a linear equivalence (`≃ₗ`).
  - `Aux`: auxiliary definition (often intermediate step).
  - `mk`, `mkQ`: quotient construction functions (`Quotient.mk`, `Submodule.Quotient.mkQ`).
- **Pattern**: `XIsoY` → `X ≃ₗ Y`; `XToY` → `X →ₗ Y`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities/simp lemmas (e.g., `mem_comap`, `range_liftQ`, `ker_liftQ_eq_bot`). |
| `simp` / `simp only` | Simplifying goals using definitional equalities and lemmas (e.g., `quotientInfEquivSupQuotient_apply_mk`). |
| `exact` / `apply` | Closing goals directly or via lemmas (e.g., `exact fun ⟨x, hx1⟩ hx2 => ⟨hx1, hx2⟩`). |
| `induction_on` | Induction on quotient elements (e.g., `Submodule.Quotient.induction_on`). |
| `cases` | Case analysis on existential hypotheses (e.g., `rcases mem_sup.1 hx with ⟨y, hy, z, hz, rfl⟩`). |
| `liftQ`, `mkQ`, `inclusion`, `subtype` | Module-specific constructors used in term mode. |
| `trans` | Chaining equivalences (e.g., `f.quotKerEquivRange.trans ...`). |
| `ofInjective`, `ofSurjective`, `ofBijective` | Constructing linear equivalences from injective/surjective maps. |

---

#### **4. Proof Logic & Strategy**

- **First Isomorphism Theorem**:
  - Construct a map via `liftQ` using kernel containment.
  - Prove injectivity (`ker_eq_bot`) and surjectivity (`range_liftQ`).
  - Combine into `LinearEquiv.ofInjective` / `ofSurjective`.

- **Second Isomorphism Theorem**:
  - Define `subToSupQuotient` as a map from `p` to `(p ⊔ p')/p'`.
  - Show kernel contains `p ∩ p'` → induces map on quotient `p/(p ∩ p')`.
  - Prove injectivity/surjectivity via element-wise reasoning (`mem_comap`, `mem_sup`).
  - Use `LinearEquiv.ofBijective`.

- **Third Isomorphism Theorem**:
  - Define `quotientQuotientEquivQuotientAux` using `liftQ` and `mapQ`.
  - Prove bijectivity via induction on nested quotients (`Submodule.Quotient.induction_on`).
  - Use `mapQ` for inverse direction.

- **General Pattern**:
  - **Step 1**: Define candidate map (often via `liftQ` or `mkQ`).
  - **Step 2**: Prove well-definedness (kernel containment).
  - **Step 3**: Prove injectivity/surjectivity (element chasing or `ker_eq_bot`, `range_eq_top`).
  - **Step 4**: Construct equivalence using `LinearEquiv.of*`.

---

#### **5. Imports & Dependencies**

- **Core Import**:
  ```lean
  import Mathlib.LinearAlgebra.Quotient.Basic
  ```
- **Implicit Dependencies** (via `Submodule`, `LinearMap`, `Quotient`):
  - `Mathlib.Algebra.Module.Basic`
  - `Mathlib.Algebra.Module.Quotient`
  - `Mathlib.Algebra.Module.Submodule.Basic`
  - `Mathlib.Algebra.Module.LinearMap.Basic`
  - `Mathlib.Order.Filter.Basic` (for `comap`, `map`, `le`, `sup`, `inf`)
  - `Mathlib.Data.Equiv.Basic` (for `LinearEquiv`)

- **Universe Polymorphism**:
  - Uses `universe u v` and type variables `R M M₂ M₃` with `Ring`, `AddCommGroup`, `Module` instances.

---

### Summary

This file formalizes the three classical isomorphism theorems for modules over a ring in Lean 4, leveraging quotient constructions, linear maps, and submodule operations. The proofs follow a standard pattern: define a natural map, verify it's well-defined, then prove bijectivity. The naming and structure reflect Lean’s emphasis on modularity, reuse, and explicitness in algebraic constructions.