### Technical Brief: Change of Variables for Weierstrass Curves in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `VariableChange R` | `Structure` | Represents an *admissible linear change of variables* over a commutative ring `R`, encoded as a tuple `(u : Rˣ, r s t : R)`. Geometrically corresponds to `(X, Y) ↦ (u²X + r, u³Y + u²sX + t)`. |
| `VariableChange.id` | `VariableChange R` | Identity change of variables: `(1, 0, 0, 0)`. |
| `VariableChange.comp` | `VariableChange R → VariableChange R → VariableChange R` | Composition via matrix multiplication; defines the group operation. |
| `VariableChange.inv` | `VariableChange R → VariableChange R` | Inverse under composition; defined via matrix inversion. |
| `VariableChange.instGroup` | `Group (VariableChange R)` | Proves that `VariableChange R` forms a group under `comp`. |
| `variableChange` | `VariableChange R → WeierstrassCurve R → WeierstrassCurve R` | Action of a change of variables on a Weierstrass curve, updating coefficients `a₁, ..., a₆` via explicit formulas. |
| `variableChange_id` | `W.variableChange id = W` | Identity action is trivial. |
| `variableChange_comp` | `W.variableChange (C.comp C') = (W.variableChange C').variableChange C` | Compatibility of action with composition (i.e., left action). |
| `instMulActionVariableChange` | `MulAction (VariableChange R) (WeierstrassCurve R)` | Establishes that `variableChange` defines a multiplicative action. |
| `variableChange_b₂`, `variableChange_b₄`, ..., `variableChange_Δ` | `∀ C, (W.variableChange C).b_i = ...` | Explicit formulas for invariants (`b₂, b₄, b₆, b₈, c₄, c₆, Δ`) under change of variables. |
| `variableChange_j` | `(W.variableChange C).j = W.j` | **Main theorem**: *j-invariant is invariant* under admissible linear change of variables. |
| `VariableChange.map` | `VariableChange R → VariableChange A` (for `φ : R →+* A`) | Pushforward of a change of variables along a ring homomorphism. |
| `VariableChange.mapHom` | `VariableChange R →* VariableChange A` | `map` is a group homomorphism. |
| `map_variableChange` | `(W.map φ).variableChange (C.map φ) = (W.variableChange C).map φ` | Compatibility of base change and variable change. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `variableChange_`: properties of the action of `VariableChange` on curves.
  - `map_`: behavior under ring homomorphisms (e.g., `map`, `mapHom`, `map_variableChange`).
  - `coe_`, `inv_`: for coercions and inverses (e.g., `coe_variableChange_Δ'`, `inv_variableChange_Δ'`).
- **Suffixes**:
  - `_id`, `_comp`, `_left_inv`, `_assoc`: group-theoretic identities.
  - `_b₂`, `_b₄`, `_c₄`, `_j`: invariants of the curve.
- **Structure fields**:
  - `u`, `r`, `s`, `t`: standard notation for coefficients of the transformation.
- **Units**:
  - `u : Rˣ`, `u⁻¹`, `C.u`, `C.u⁻¹`: always use `Rˣ` for units; inverses via `.inv`.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp only [...]`: for targeted simplification using explicit definitions (`map_ofNat`, `map_neg`, etc.).
- `ring1`: for polynomial simplifications over commutative rings.
- `linear_combination`: for verifying identities involving units and powers (e.g., verifying `comp_left_inv`).
- `ext`: for extensionality (proving equality of structures by equality of components).
- `dsimp only`: for definitional simplification before `ring1`.
- `map_simp`: custom macro (defined at top) to simplify maps of ring homomorphisms.
- `rw [Units.ext_iff, ...]`: for reasoning about units and their coercions.

---

#### **4. Proof Logic**

- **Group structure**: Proven by:
  - Defining `id`, `comp`, `inv`.
  - Verifying group axioms via `simp` + `ring1` + `linear_combination`.
  - Key lemmas: `id_comp`, `comp_id`, `comp_left_inv`, `comp_assoc`.

- **Action on curves**:
  - Define `variableChange` by explicit coefficient formulas.
  - Prove `variableChange_id` and `variableChange_comp` via `ext` + `simp` + `ring1`.
  - Use these to instantiate `MulAction`.

- **Invariants**:
  - Prove formulas for `b_i`, `c_i`, `Δ` using `simp` + `ring1`.
  - Derive `variableChange_j` using:
    - `j = c₄³ / Δ`
    - `variableChange_c₄ = u⁻⁴ * c₄`
    - `variableChange_Δ = u⁻¹² * Δ`
    - Simplify `u⁻¹² / u⁻¹² = 1`.

- **Base change**:
  - Define `map` and `baseChange`.
  - Prove `mapHom` is a group homomorphism (`map_one`, `map_mul`) using `map_simp`.
  - Show naturality: `map_variableChange`.

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.AlgebraicGeometry.EllipticCurve.Weierstrass
  ```
  Provides:
  - `WeierstrassCurve R`
  - Coefficients `a₁, ..., a₆`, invariants `b₂, ..., b₈, c₄, c₆, Δ, j`
  - `IsElliptic`, `isElliptic_iff` (via nonzero discriminant)

- **Universe polymorphism**:
  - Uses `universe s u v w` for flexibility across types (e.g., rings, algebras).

- **Domain scope**:
  - **Elliptic curves** over arbitrary commutative rings.
  - Focus on *admissible linear changes* (standard in Silverman’s treatment).
  - Not about general isomorphisms (only those of the specified form).

---

#### **6. References & Context**

- **Primary reference**: Silverman, *The Arithmetic of Elliptic Curves*, Ch. III.
- **Purpose**: Formalize foundational change-of-variables machinery for elliptic curves, enabling future work on moduli, isomorphism classes, and invariants (e.g., j-invariant).
- **Status**: Complete for admissible linear changes; group action formalized; invariants computed.

--- 

This file is a cornerstone for formalizing elliptic curve theory in Lean, especially for results requiring invariance under change of coordinates.