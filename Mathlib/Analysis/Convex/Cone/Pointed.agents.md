### Technical Metadata Brief: `PointedCone` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PointedCone 𝕜 E` | `Submodule {c : 𝕜 // 0 ≤ c} E` | Bundled definition of a *pointed cone* as a submodule over the nonnegative scalars. |
| `toConvexCone S` | `S : PointedCone 𝕜 E → ConvexCone 𝕜 E` | Forgets the scalar restriction, viewing a pointed cone as a convex cone. |
| `ConvexCone.toPointedCone hS` | `hS : S.Pointed → PointedCone 𝕜 E` | Constructs a pointed cone from a *pointed* convex cone. |
| `map f S` | `f : E →ₗ[𝕜] F → PointedCone 𝕜 E → PointedCone 𝕜 F` | Image of a pointed cone under a linear map (over full `𝕜`). |
| `comap f S` | `f : E →ₗ[𝕜] F → PointedCone 𝕜 F → PointedCone 𝕜 E` | Preimage of a pointed cone under a linear map. |
| `positive 𝕜 E` | `PointedCone 𝕜 E` | The pointed cone of nonnegative elements in an ordered module. |
| `dual S` | `S : PointedCone ℝ E → PointedCone ℝ E` | Inner dual cone (as a pointed cone), using `innerDualCone`. |
| `ext` | `(∀ x, x ∈ S ↔ x ∈ T) → S = T` | Extensionality for pointed cones (via underlying set). |
| `canLift` | `CanLift (ConvexCone 𝕜 E) (PointedCone 𝕜 E) (↑) ConvexCone.Pointed` | Shows every pointed convex cone lifts uniquely to a pointed cone. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toConvexCone`: coercion to convex cones.
  - `mem_`: membership lemmas (e.g., `mem_map`, `mem_comap`, `mem_positive`, `mem_dual`).
  - `coe_`: coercion lemmas (e.g., `coe_map`, `coe_comap`, `coe_toPointedCone`).
  - `map_`, `comap_`: structural lemmas for maps (e.g., `map_map`, `comap_comap`, `map_id`, `comap_id`).
- **Suffixes**:
  - `_pointed`: properties related to pointedness (e.g., `toConvexCone_pointed`).
  - `_positive`: related to the positive cone.
  - `_dual`: related to dual cone.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: for simplification and rewriting (especially with `SetLike.mem_coe`, `rfl`, etc.).
- `aesop`: for automated reasoning in simple goals (e.g., in `toConvexCone_pointed`).
- `convert`: to match goals up to definitional equality (e.g., in `ConvexCone.toPointedCone`).
- `cases' eq_or_lt_of_le hc`: case analysis on scalar inequality.
- `SetLike.coe_injective`: to prove equality of submodules/subsets by equality of underlying sets.
- ` rfl`: many lemmas are definitional (`norm_cast` variants).

---

#### **4. Proof Logic & Strategy**

- **Definitional reasoning dominates**: Most lemmas are immediate from definitions (`rfl`, `Iff.rfl`), especially membership and coercion lemmas.
- **Reduction to module theory**: Proofs often reduce to properties of `Submodule.map`/`comap`, leveraging existing API.
- **Case analysis on scalars**: When dealing with nonnegative scalars, proofs split on `c = 0` vs `c > 0` (e.g., `smul_mem'` in `toPointedCone`).
- **Use of `CanLift`**: To justify lifting from convex cones to pointed cones, leveraging `hS : S.Pointed`.
- **Extensionality via sets**: `ext` uses `SetLike.ext`, so equality is reduced to elementwise membership equivalence.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Analysis.Convex.Cone.InnerDual`: for `innerDualCone`, `pointed_innerDualCone`.
  - `Mathlib.Algebra.Order.Nonneg.Module`: for `𝕜≥0`, ordered module structure.
  - `Mathlib.Algebra.Module.Submodule.Basic`: for `Submodule`, `map`, `comap`.
- **Assumptions on types**:
  - `𝕜`: ordered semiring (often `ℝ` in dual cone section).
  - `E, F, G`: modules over `𝕜`, with additive commutative monoid structure.
  - For `positive` and `dual`: additional structure (ordered additive group, ordered `SMul`, normed inner product space over `ℝ`).

---

This module formalizes *pointed cones* as a structured subclass of convex cones, enabling use of module-theoretic tools while preserving convex-geometric intuition. The design prioritizes compatibility with existing `ConvexCone` and `Submodule` APIs.