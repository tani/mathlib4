### Technical Metadata Brief: `Mathlib.Analysis.Normed.Module.AffineIsometry`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AffineIsometry` | `structure AffineIsometry extends P →ᵃ[𝕜] P₂` | An affine map whose linear part is a linear isometry (i.e., preserves norms). |
| `AffineIsometry.linearIsometry` | `f.linearIsometry : V →ₗᵢ[𝕜] V₂` | Extracts the linear isometry underlying an affine isometry. |
| `AffineIsometry.id` | `id : P →ᵃⁱ[𝕜] P` | Identity affine isometry. |
| `AffineIsometry.comp` | `comp : (P₂ →ᵃⁱ[𝕜] P₃) → (P →ᵃⁱ[𝕜] P₂) → (P →ᵃⁱ[𝕜] P₃)` | Composition of affine isometries. |
| `AffineIsometryEquiv` | `structure AffineIsometryEquiv extends P ≃ᵃ[𝕜] P₂` | Affine isometric *equivalence* (bijective affine isometry). |
| `AffineIsometryEquiv.linearIsometryEquiv` | `e.linearIsometryEquiv : V ≃ₗᵢ[𝕜] V₂` | Linear isometry equivalence underlying an affine isometry equivalence. |
| `AffineIsometryEquiv.refl` | `refl : P ≃ᵃⁱ[𝕜] P` | Identity equivalence. |
| `AffineIsometryEquiv.symm` | `symm : P₂ ≃ᵃⁱ[𝕜] P → P ≃ᵃⁱ[𝕜] P₂` | Inverse of an affine isometry equivalence. |
| `AffineIsometryEquiv.trans` | `trans : P₂ ≃ᵃⁱ[𝕜] P₃ → P ≃ᵃⁱ[𝕜] P₂ → P ≃ᵃⁱ[𝕜] P₃` | Composition of equivalences. |
| `AffineIsometryEquiv.instGroup` | `Group (P ≃ᵃⁱ[𝕜] P)` | Group structure on affine isometry automorphisms. |
| `AffineIsometry.map_vadd`, `map_vsub`, `dist_map` | `∀ p v, f (v +ᵥ p) = f.linearIsometry v +ᵥ f p` etc. | Fundamental behavior of affine isometries on vector addition, subtraction, and distance. |
| `AffineIsometryEquiv.toIsometryEquiv` | `e.toIsometryEquiv : P ≃ᵢ P₂` | Forgets affine structure to get an isometry equivalence. |
| `AffineIsometryEquiv.pointReflection` | `pointReflection x : P ≃ᵃⁱ[𝕜] P` | Reflection about point `x`. |
| `AffineSubspace.subtypeₐᵢ` | `subtypeₐᵢ : s →ᵃⁱ[𝕜] P` | Inclusion of an affine subspace as an affine isometry. |
| `AffineSubspace.isometryEquivMap` | `isometryEquivMap : E ≃ᵃⁱ[𝕜] E.map φ` | Restriction of an affine isometry to a nonempty affine subspace gives an equivalence onto its image. |
| `AffineMap.continuous_linear_iff` | `Continuous f.linear ↔ Continuous f` | For affine maps, continuity of linear part ⇔ continuity of map. |
| `AffineMap.isOpenMap_linear_iff` | `IsOpenMap f.linear ↔ IsOpenMap f` | Similarly for openness. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `linearIsometry`, `linearIsometryEquiv`: Extract linear part as (equiv) isometry.
  - `toAffineIsometry`, `toAffineIsometryEquiv`: Embed linear (equiv) isometry into affine world.
  - `coe_`, `coeFn_`, `coe_toAffineMap`: Coercion lemmas (e.g., `coe_comp`, `coe_id`).
  - `map_`, `dist_map`, `edist_map`, `nndist_map`: Distance-preserving properties.
  - `subtypeₐᵢ`, `equivMapOfInjective`, `isometryEquivMap`: Subspace-related constructions.
  - `vaddConst`, `constVAdd`, `constVSub`: Standard affine constructions (translation, subtraction).
  - `pointReflection`: Specialized automorphism.

- **Notation**:
  - `→ᵃⁱ[𝕜]` for `AffineIsometry`
  - `≃ᵃⁱ[𝕜]` for `AffineIsometryEquiv`
  - Superscript `ⁱ` (not `ᵢ`) to distinguish from linear isometries (`→ₗᵢ`, `≃ᵢ`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and simplifications:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for functions/structures (e.g., proving `f = g` by `∀ x, f x = g x`). |
| `rfl` | Reflexivity for definitional equalities (e.g., `coe_id : ⇑id = id`). |
| `simp` / `simp_rw` | Simplification using `@[simp]` lemmas (e.g., `map_vadd`, `coe_comp`). |
| `rw` | Rewriting using lemmas like `dist_map`, `map_vsub`. |
| `congr` | Congruence for structure equality (e.g., in `toAffineEquiv_injective`). |
| `convert` | Used in `vadd_vsub` to reduce to known isometries. |
| `aesop` | Not explicitly used here, but `simp` + `rw` dominate. |
| `cases` | Destructuring structure fields (e.g., in injectivity proofs). |
| `inhabited` / `instance` | For `Inhabited`, `Monoid`, `Group` instances. |

---

#### **4. Proof Logic**

- **Structure-based reasoning**: Most proofs are definitional or follow from `ext` + `simp`.
- **Reduction to linear case**: Many properties (e.g., continuity, openness, Lipschitz) reduce to the linear part via `linearIsometry` and known facts about linear isometries.
- **Equivalence with isometries**: `AffineIsometryEquiv` is often shown equivalent to `IsometryEquiv` via `toIsometryEquiv`.
- **Subspace constructions**: Use `subtypeₐᵢ` and `isometryEquivMap` to lift subspace structure; rely on `nonempty` instances and `simp`-friendly `@[simps]` attributes.
- **Specialized constructions** (e.g., `pointReflection`) are defined via composition of simpler equivalences (`constVSub`, `vaddConst`) and verified via `ext` + `rfl`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.CharP.Invertible` | For `Invertible (2 : 𝕜)` used in `pointReflection_fixed_iff`. |
| `Mathlib.Analysis.Normed.Operator.LinearIsometry` | Linear isometries (`→ₗᵢ`, `≃ₗᵢ`) and their properties. |
| `Mathlib.Analysis.Normed.Group.AddTorsor` | `NormedAddTorsor`, `PseudoMetricSpace`, `vadd`, `vsub`, distance. |
| `Mathlib.Analysis.Normed.Module.Basic` | Basic normed module theory (e.g., `norm_smul`, `two_nsmul`). |
| `Mathlib.LinearAlgebra.AffineSpace.Restrict` | Affine subspaces, `AffineSubspace`, `map`, `subtype`. |
| `Mathlib.Tactic.FailIfNoProgress` | Utility tactic (not heavily used in this file). |

---

### Summary

This file formalizes the theory of **affine isometries** and **affine isometric equivalences** between normed add-torsors over a normed field. It mirrors the structure of `AffineMap` and `LinearIsometry`, but enforces norm-preservation on the linear part. The development is clean, with many `@[simp]` lemmas and `@[simps]` attributes to support automation. Key themes include:
- Reduction to linear isometry theory,
- Equivalence with metric-level isometries,
- Subspace restriction and reflection constructions.

The notation and naming follow Lean’s `mathlib` conventions closely, with aesthetic choices (e.g., `ⁱ` superscript) to distinguish from linear isometries.