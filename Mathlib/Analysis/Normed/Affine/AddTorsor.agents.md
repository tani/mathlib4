### Technical Brief: Normed Affine Torsors in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AffineSubspace.direction` | `s.direction : Set W` | Direction (underlying linear subspace) of an affine subspace `s`. |
| `isClosed_direction_iff` | `IsClosed s.direction ↔ IsClosed s` | Characterizes closedness of an affine subspace via its direction. |
| `homothety` | `homothety p c q` | Homothety (scaling) centered at `p` with ratio `c`, mapping `q` to `p + c • (q -ᵥ p)`. |
| `lineMap` | `lineMap p₁ p₂ c` | Point on the line from `p₁` to `p₂` at parameter `c` (i.e., `p₁ + c • (p₂ -ᵥ p₁)`). |
| `midpoint` | `midpoint 𝕜 p₁ p₂` | Midpoint of `p₁` and `p₂`, defined as `lineMap p₁ p₂ (1/2)`. Requires `Invertible 2`. |
| `pointReflection` | `Equiv.pointReflection p q` | Reflection of space about point `q` with center `p`. |
| `DilationEquiv.smulTorsor` | `E ≃ᵈ P` | Dilation equivalence (scaling by nonzero `k`) from vector space `E` to torsor `P`, sending `0 ↦ c`. |
| `lipschitzWith_lineMap` | `LipschitzWith (nndist p₁ p₂) (lineMap p₁ p₂)` | `lineMap` is Lipschitz with constant `nndist p₁ p₂`. |
| `antilipschitzWith_lineMap` | `AntilipschitzWith (nndist p₁ p₂)⁻¹ (lineMap p₁ p₂)` | `lineMap` is antilipschitz (i.e., bi-Lipschitz) when `p₁ ≠ p₂`. |
| `eventually_homothety_mem_of_mem_interior` | `∀ᶠ δ in 𝓝 (1 : 𝕜), homothety x δ y ∈ s` | For `y` in interior of `s`, homotheties with ratio near `1` map `y` into `s`. |
| `AffineMap.ofMapMidpoint` | `P →ᵃ[ℝ] Q` | Constructs an affine map from a continuous map preserving midpoints. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `dist_`, `nndist_`: Distance-related lemmas (e.g., `dist_center_homothety`, `nndist_lineMap_left`).
  - `isClosed_`, `eventually_`, `lipschitzWith_`, `antilipschitzWith_`: Properties of maps/spaces.
  - `smulTorsor_`, `pointReflection_`, `midpoint_`, `homothety_`, `lineMap_`: Function-specific lemmas.

- **Suffixes**:
  - `_left`, `_right`, `_self`, `_center`: Positional variants (e.g., `dist_left_midpoint`, `dist_homothety_self`).
  - `_le`, `_le'`: Inequality lemmas (e.g., `dist_midpoint_midpoint_le`, `dist_midpoint_midpoint_le'`).
  - `_iff`: Biconditional characterizations (e.g., `isClosed_direction_iff`).

- **Special**:
  - `ofMapMidpoint`: Construction pattern (`of...`) for canonical objects from structural properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `dist_eq_norm_vsub`, `lineMap_apply`). |
| `rw` | Rewriting using equalities (especially `dist_comm`, `vsub_eq_sub`, `midpoint`, `homothety_eq_lineMap`). |
| `exact` / `apply` | Direct proof completion or lemma application. |
| `norm_num`, `ring`, `linarith` | Arithmetic simplifications (especially for `‖c‖`, `‖1 - c‖`, etc.). |
| `aesop` | Automated reasoning for metric/distance goals (e.g., in `smulTorsor_preimage_ball`). |
| `conv_lhs` | Focused left-hand side rewriting (used in `ofMapMidpoint`). |
| `apply_rules` | Rule chaining for structured proofs (e.g., continuity arguments). |
| `NNReal.eq` | Converts real equalities to nonnegative real ones (via `nndist`). |

---

#### **4. Proof Logic & Strategy**

- **Structure**: Most proofs follow a *computational* style:
  1. **Unfold definitions** (`homothety`, `lineMap`, `midpoint`, `vsub`, `smul`).
  2. **Rewrite distances** using `dist_eq_norm_vsub` or `dist_eq_norm`.
  3. **Apply algebraic simplifications** (`norm_smul`, `norm_sub`, `inv_smul`, `div_eq_inv_mul`).
  4. **Use symmetry/commutativity** (`dist_comm`, `vsub_vsub_vadd_cancel_right`).
  5. **Leverage known lemmas** (e.g., `dist_lineMap_lineMap` for line segment distances).
- **Induction/Case analysis** appears in:
  - `AffineSubspace.isClosed_direction_iff`: Cases on `s` being empty or nonempty.
  - `eventually_homothety_mem_of_mem_interior`: Cases on `y = x` or `y ≠ x`.
- **Metric/topological arguments**:
  - Use of `eventually` filters and neighborhoods (`𝓝`).
  - Reliance on `Metric.isOpen_iff`, `nhds_basis_norm_lt`.
- **Continuity & Lipschitz**:
  - Proofs often reduce to bounding distances via `LipschitzWith.of_dist_le_mul` or `AntilipschitzWith.of_le_mul_dist`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.CharP.Invertible`: For `Invertible 2` assumptions (e.g., in `invertibleTwo` section).
- `Mathlib.Analysis.Normed.Module.Basic`: Normed vector spaces, scalar multiplication.
- `Mathlib.Analysis.Normed.Group.AddTorsor`: Torsor structure over normed additive groups.
- `Mathlib.LinearAlgebra.AffineSpace.AffineSubspace`: Affine subspaces, directions.
- `Mathlib.Topology.Instances.RealVectorSpace`: Topology of real vector spaces.

**Domain Scope**:
- **Normed additive torsors** over normed vector spaces (e.g., points over a vector space).
- **Metric geometry** in normed affine spaces: distances, midpoints, homotheties, Lipschitz continuity.
- **Real and general normed field scalars** (`𝕜`), with special handling for `ℝ` and invertible `2`.

---

### Summary

This file formalizes foundational metric-geometric properties of **normed affine torsors**, emphasizing:
- Distance behavior under **homotheties**, **line maps**, and **midpoints**.
- Topological properties like **closedness** and **interior membership** under homothetic deformation.
- Constructive characterization of **affine maps** via midpoint preservation.

It serves as a core reference for metric geometry in Lean’s `Mathlib`, especially in contexts involving convexity, continuity, and Lipschitz analysis on affine spaces.