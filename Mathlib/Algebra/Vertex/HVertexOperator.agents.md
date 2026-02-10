Here is a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Heterogeneous Vertex Operators via Hahn Series**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HVertexOperator` | `V →ₗ[R] HahnModule Γ R W` | An `R`-linear map from module `V` to Γ-indexed Hahn series with coefficients in `W`. Generalizes meromorphic fields in 2D CFT. |
| `coeff` | `HVertexOperator → Γ → (V →ₗ[R] W)` | Extracts the Γ-degree coefficient of a vertex operator as an `R`-linear map `V → W`. |
| `coeff_inj` | `Function.Injective coeff` | Ensures vertex operators are determined by their coefficients. |
| `of_coeff` | `(∀ x, support (f · x).IsPWO) → HVertexOperator` | Constructs a vertex operator from a coefficient function satisfying PWO support condition. |
| `compHahnSeries` | `U → HahnSeries Γ' (HahnSeries Γ W)` | For `A : HVertexOperator Γ R V W`, `B : HVertexOperator Γ' R U V`, gives the iterated Hahn series composite on input `u : U`. |
| `comp` | `HVertexOperator (Γ' ×ₗ Γ) R U W` | The composite vertex operator, using lexicographic product order on `Γ' × Γ`. |
| `comp_coeff` | `(comp A B).coeff (g', g) = A.coeff g ∘ₗ B.coeff g'` | Describes coefficients of composite vertex operator in terms of components. |
| `ext` | `(∀ v, A v = B v) → A = B` | Extensionality principle for vertex operators. |
| `coeff_isPWOsupport` | `((of R).symm (A v)).coeff.support.IsPWO` | Guarantees each coefficient series has well-ordered support (PWO = "partially well-ordered", i.e., well-ordered in this context). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `coeff_`: relates to coefficient extraction.
  - `comp_`: composition-related (e.g., `compHahnSeries`, `comp`).
  - `of_`: construction from data (e.g., `of_coeff`, `of R`).
- **Suffixes**:
  - `_coeff`: coefficient version of an operation.
  - `_support`: properties about support (e.g., `coeff_isPWOsupport`).
- **Notable**:
  - `ofLex`: projection from `Γ' ×ₗ Γ` (lex product) to components.
  - `ofIterate`: used in `comp` to build a Hahn module from an iterated series.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `ext`: for extensionality (function, linear map, Hahn series).
- `simp` / `simp only`: simplification with definitional equalities and lemmas.
- `rw`: rewriting using equalities (e.g., `← HahnSeries.add_coeff`).
- `intro`, `apply`, `exact`: basic proof structure.
- `congrFun`, `congrArg`: for functional extensionality.
- `set_tac` / `aesop` (not explicitly used here, but `simp` dominates).
- `ring` / `linarith` not prominent — algebraic structure handled via `simp` + lemmas.

#### **4. Proof Logic**

- **Structure**: Proofs typically proceed by:
  1. **Extensionality** (`ext`) to reduce to pointwise equality.
  2. **Simplification** (`simp`) using `simps`-generated lemmas (e.g., `coeff_apply`, `compHahnSeries_coeff`).
  3. **Support verification** for Hahn series: using `isPWO_support'` and monotonicity of support under linear maps.
  4. **Linearity checks**: `map_add'`, `map_smul'` verified via `ext` + `simp`.
- **Key reasoning pattern**:
  - For `compHahnSeries`, support PWO is shown via subset argument: `support (A (coeff B g' u)) ⊆ support (coeff B g' u)`, then pull back via `B u`.
  - For `comp`, uses `HahnSeries.ofIterate` and properties of `of`/`symm` to ensure module structure.

#### **5. Imports & Dependencies**

- **Core dependency**:  
  `Mathlib.RingTheory.HahnSeries.Multiplication` — provides `HahnSeries`, `HahnModule`, `of`, `coeff`, support properties, and multiplication structure.
- **Assumptions**:
  - `Γ` is a `PartialOrder` (for Hahn series indexing).
  - `Γ'` is an `OrderedCancelAddCommMonoid` (for lex product and composition).
  - `R` is a `CommRing`.
  - `V, W, U` are `R`-modules (via `AddCommGroup` + `Module`).
- **Notable missing** (TODO):
  - `HahnSeries Γ R`-module structure on `HVertexOperator` (requires PR #19062).
  - curry/uncurry for tensor inputs.
  - Formal variable API (e.g., `T`-function analog for Laurent polynomials).

---

This file formalizes a flexible, heterogeneous version of vertex operators using Hahn series, enabling composition and scalar multiplication in multivariable settings (e.g., `R((X))((Y))`). It sets up foundational API for further development in vertex algebra theory in Lean.