### Technical Brief: Local Maxima in Normed Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsMaxFilter` | `IsMaxFilter (g : α → ℝ) l c` | `g` has a maximum along filter `l` at `c`. |
| `IsMaxOn` | `IsMaxOn (g : α → ℝ) s c` | `g` has a maximum on set `s` at `c`. |
| `IsLocalMaxOn` | `IsLocalMaxOn (g : α → ℝ) s c` | `g` has a local maximum on set `s` at `c`. |
| `IsLocalMax` | `IsLocalMax (g : α → ℝ) c` | `g` has a local maximum at `c`. |
| `SameRay ℝ x y` | `SameRay ℝ x y` | Vectors `x`, `y` lie on the same ray over `ℝ` (i.e., `∃ r ≥ 0, y = r • x`). |
| `norm_add_sameRay` | `IsMaxFilter (norm ∘ f) l c → SameRay ℝ (f c) y → IsMaxFilter (fun x ↦ ‖f x + y‖) l c` | Core lemma: adding a vector on the same ray as `f c` preserves the maximum of the norm composition. |
| `norm_add_self` | `IsMaxFilter (norm ∘ f) l c → IsMaxFilter (fun x ↦ ‖f x + f c‖) l c` | Special case of `norm_add_sameRay` with `y = f c`. |
| `IsMaxOn.norm_add_sameRay`, `IsMaxOn.norm_add_self` | Analogous to above, for maxima *on a set*. | Extend `norm_add_sameRay`/`norm_add_self` to `IsMaxOn`. |
| `IsLocalMaxOn.norm_add_sameRay`, `IsLocalMaxOn.norm_add_self` | Analogous for local maxima *on a set*. | Extend to `IsLocalMaxOn`. |
| `IsLocalMax.norm_add_sameRay`, `IsLocalMax.norm_add_self` | Analogous for *global* local maxima (at a point). | Extend to `IsLocalMax`. |

All theorems are consequences of the base case `IsMaxFilter.norm_add_sameRay`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `IsMaxFilter`, `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`: indicate the *type* of maximum.
  - `norm_`: indicates the theorem involves the norm function `‖·‖`.
  - `sameRay`: indicates the vector added lies on the same ray as `f c`.
  - `self`: indicates the vector added is `f c` itself.

- **Suffixes**:
  - `_sameRay`: general case with arbitrary `y` on same ray.
  - `_self`: special case with `y = f c`.

- **Structure**:
  - `IsMaxFilter.norm_add_sameRay` → `IsMaxOn.norm_add_sameRay` → `IsLocalMaxOn.norm_add_sameRay` → `IsLocalMax.norm_add_sameRay`
  - Mirrors the hierarchy of maximum notions: filter → on set → local on set → local at point.

---

#### **3. Tactic Stack**

- **`calc`**: Used in `IsMaxFilter.norm_add_sameRay` to chain inequalities.
- **`norm_add_le`**: Applies triangle inequality.
- **`add_le_add_right`**: Lifts inequality under addition.
- **`.symm`**: Applies symmetry of equality (e.g., `hy.norm_add.symm`).
- **`rfl`**: Reflexivity for `SameRay.rfl` (since `f c` is trivially on the same ray as itself).
- **`mono`**: Monotonicity of `IsMaxFilter` under pointwise inequality.

No heavy automation (e.g., `aesop`, `ring`, `simp`) is used—proofs are mostly direct and rely on basic norm properties and order reasoning.

---

#### **4. Proof Logic**

- **Core idea**: If `‖f(x)‖ ≤ ‖f(c)‖` near `c` (in filter sense), and `y` lies on the same ray as `f(c)`, then:
  - By triangle inequality: `‖f(x) + y‖ ≤ ‖f(x)‖ + ‖y‖`
  - Since `‖f(x)‖ ≤ ‖f(c)‖`, this is ≤ `‖f(c)‖ + ‖y‖`
  - By `SameRay` property: `‖f(c)‖ + ‖y‖ = ‖f(c) + y‖`
  - So `‖f(x) + y‖ ≤ ‖f(c) + y‖`, i.e., `x ↦ ‖f(x) + y‖` has a maximum at `c`.

- **Proof pattern**:
  1. Use `h.mono` to reduce to showing pointwise inequality.
  2. Chain via `calc`:
     - `norm_add_le` → `add_le_add_right hx` → `hy.norm_add.symm`.
  3. For `self` cases, apply `SameRay.rfl`.
  4. For `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`, reuse `IsMaxFilter` versions via coercion (e.g., `IsMaxOn` is defined as `IsMaxFilter` on `Filter.principal s ⊔ l` or similar).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Module.Ray` | Defines `SameRay`, basic ray properties, and `norm_add` lemmas for rays. |
| `Mathlib.Topology.Order.LocalExtr` | Defines `IsMaxFilter`, `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`, and their relationships. |

These imports provide the foundational notions of:
- Rays in normed spaces (especially over `ℝ`),
- Filter-based extremum notions,
- Topological order-theoretic maximum/minimum machinery.

---

### Summary

This file formalizes a key stability property of maxima under addition of vectors lying on the same ray as the extremal value in a normed space. The structure is clean and modular: one core lemma (`norm_add_sameRay`) is proved for `IsMaxFilter`, then specialized and lifted to increasingly local notions of maxima. The proofs are elementary but rely crucially on triangle inequality and ray geometry.