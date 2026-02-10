### Technical Metadata Brief: Mazur–Ulam Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `midpoint_fixed` | `∀ x y : PE, ∀ e : PE ≃ᵢ PE, e x = x → e y = y → e (midpoint ℝ x y) = midpoint ℝ x y` | Shows that any isometric self-bijection fixing two points also fixes their midpoint. Core lemma for Mazur–Ulam. |
| `map_midpoint` | `∀ f : PE ≃ᵢ PF, ∀ x y, f (midpoint ℝ x y) = midpoint ℝ (f x) (f y)` | Proves that isometric bijections preserve midpoints — key step to deduce affinity. |
| `toRealLinearIsometryEquivOfMapZero` | `E ≃ᵢ F → f 0 = 0 → E ≃ₗᵢ[ℝ] F` | Converts an isometric bijection fixing 0 into a linear isometry equivalence. Direct application of Mazur–Ulam in vector space setting. |
| `toRealLinearIsometryEquiv` | `E ≃ᵢ F → E ≃ₗᵢ[ℝ] F` | Converts any isometric bijection between normed vector spaces into a linear isometry equivalence via translation: `x ↦ f x − f 0`. |
| `toRealAffineIsometryEquiv` | `PE ≃ᵢ PF → PE ≃ᵃⁱ[ℝ] PF` | Converts an isometric bijection between affine torsors into an affine isometry equivalence. Final form of Mazur–Ulam for affine spaces. |

**Auxiliary lemmas used in proofs**:
- `dist_pointReflection_fixed`, `dist_pointReflection_self_real`: distances under point reflections.
- `coe_toRealLinearIsometryEquivOfMapZero`, `coe_toRealAffineIsometryEquiv`: coherence lemmas ensuring definitional equality of underlying functions.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toReal*`: conversion from `IsometryEquiv` to richer structure (`LinearIsometryEquiv`, `AffineIsometryEquiv`).
  - `map_*`: statements about preservation of structure (e.g., `map_midpoint`).
  - `midpoint_*`: lemmas about behavior of maps on midpoints.

- **Suffixes**:
  - `_OfMapZero`: variant assuming `f 0 = 0`.
  - `_symm`: properties of inverses (e.g., `coe_toRealLinearIsometryEquivOfMapZero_symm`).
  - `_apply` / `_symm_apply`: explicit formulas for forward/inverse maps.

- **Notable patterns**:
  - `trans` used for composition of `IsometryEquiv`s.
  - `vaddConst`, `pointReflection`, `midpoint` from `Affine` and `Metric` libraries.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using definitional equalities, especially for `coe`, `trans`, `symm`, `midpoint`, `pointReflection`. |
| `rw` / `rwa` | Rewrite using lemmas like `dist_eq`, `dist_comm`, `pointReflection_fixed_iff`. |
| `calc` | Chain inequalities (e.g., triangle inequality in `midpoint_fixed`). |
| `exact`, `refine`, `apply` | Construct proofs of equalities or inequalities. |
| `linarith` | Solve linear inequalities over reals (e.g., `c ≤ c / 2 → c ≤ 0`). |
| `ext` | Extensionality for functions/maps (e.g., proving two `AffineIsometryEquiv`s equal). |
| `dsimp`, `unfold` | Unfold definitions (e.g., `trans_apply`, `coe_toIsometryEquiv`). |
| `cases` / `rcases` | Not heavily used here, but present in `midpoint_fixed` for destructuring subtype elements. |

---

#### **4. Proof Logic**

- **Structure of `midpoint_fixed`**:
  1. Define set `s` of isometries fixing `x` and `y`.
  2. Show boundedness of `dist (e z, z)` over `s`.
  3. Construct map `f(e) = R ∘ e⁻¹ ∘ R ∘ e`, where `R` is reflection at midpoint `z`.
  4. Prove `f` doubles distance: `dist (f e z, z) = 2 * dist (e z, z)`.
  5. Show `f` maps `s → s`.
  6. Use supremum argument: `c ≤ c/2 ⇒ c = 0`, so `e z = z`.

- **Structure of `map_midpoint`**:
  1. Construct `e = f⁻¹ ∘ R_{f(y)} ∘ f ∘ R_y`, where `R` is point reflection.
  2. Show `e` fixes `x` and `y`.
  3. Apply `midpoint_fixed` to get `e(z) = z`.
  4. Unfold `e` and simplify to deduce `f(midpoint x y) = midpoint (f x) (f y)`.

- **Structure of `toRealLinearIsometryEquivOfMapZero`**:
  1. Use `AddMonoidHom.ofMapMidpoint` to get additive map (midpoint-preserving ⇒ affine ⇒ linear over `ℝ`).
  2. Add continuity to get `ℝ`-linear map.
  3. Verify norm preservation using `dist_eq` and `h0`.

- **Structure of `toRealAffineIsometryEquiv`**:
  1. Translate torsor to vector space using basepoint.
  2. Reduce to vector-space case via `toRealLinearIsometryEquiv`.
  3. Reconstruct affine structure using `AffineIsometryEquiv.mk'`.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Topology.Instances.RealVectorSpace` | Basic theory of `ℝ`-normed vector spaces, continuity, topology. |
| `Mathlib.Analysis.Normed.Affine.Isometry` | Isometric maps between normed affine spaces, torsors, point reflections, midpoints. |

**Key underlying libraries used**:
- `Mathlib.MeasureTheory.Integration.IntegralNormedSpace` (indirectly via `normed_space` infrastructure).
- `Mathlib.Algebra.Module.Pointwise` (for `vaddConst`, torsor actions).
- `Mathlib.Topology.MetricSpace.Basic` (for `dist`, `midpoint`, `pointReflection`).
- `Mathlib.Algebra.Module.Affine` (for `AffineMap`, `AffineIsometryEquiv`).

---

### Summary

This formalization of the **Mazur–Ulam theorem** in Lean 4 demonstrates a deep interplay between metric geometry (isometries), affine geometry (midpoints, torsors), and linear algebra (real linearity). The proof strategy hinges on midpoint preservation, with a clever use of point reflections and supremum arguments to force fixed-point behavior. The final results provide canonical conversions from isometric bijections to linear/affine isometries — foundational for geometry of Banach spaces over `ℝ`.