### Technical Brief: Topology on the Upper Half Plane (`ℍ`) in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `instance : TopologicalSpace ℍ` | `TopologicalSpace ℍ` | Equips the upper half plane with the subspace topology induced from `ℂ`. |
| `isOpenEmbedding_coe` | `IsOpenEmbedding ((↑) : ℍ → ℂ)` | The inclusion map `ℍ ↪ ℂ` is an open embedding (since `ℍ = {z : ℂ | 0 < z.im}` is open). |
| `isEmbedding_coe` | `IsEmbedding ((↑) : ℍ → ℂ)` | The inclusion is a topological embedding (hence a homeomorphism onto its image). |
| `continuous_coe`, `continuous_re`, `continuous_im` | `Continuous` | Continuity of inclusion and real/imaginary part projections on `ℍ`. |
| `instance : SecondCountableTopology ℍ`, `T3Space ℍ`, `T4Space ℍ`, `LocallyCompactSpace ℍ`, `LocPathConnectedSpace ℍ` | Various topological class instances | Standard topological properties inherited from `ℂ` via embedding. |
| `instance : ContractibleSpace ℍ` | `ContractibleSpace ℍ` | `ℍ` is contractible (via convexity of `{z : ℍ | 0 < z.im}`). |
| `instance : NoncompactSpace ℍ` | `NoncompactSpace ℍ` | `ℍ` is not compact (e.g., preimage of `Ioi 0` under `im` is not compact). |
| `verticalStrip A B` | `ℍ → Prop` (as a subset of `ℍ`) | Vertical strip: `{z ∈ ℍ | |z.re| ≤ A ∧ B ≤ z.im}`. Used for local compactness/compactness arguments. |
| `subset_verticalStrip_of_isCompact` | `IsCompact K → ∃ A B, 0 < B ∧ K ⊆ verticalStrip A B` | Every compact subset lies in some vertical strip. |
| `ModularGroup_T_zpow_mem_verticalStrip` | `z ∈ ℍ, 0 < N → ∃ n : ℤ, T^(N*n) • z ∈ verticalStrip N z.im` | Technical lemma about modular group action: some power of `T = (z ↦ z+1)` brings a point into a vertical strip. |
| `ofComplex : PartialHomeomorph ℂ ℍ` | `PartialHomeomorph ℂ ℍ` | A partial homeomorphism extending the inclusion `ℍ ↪ ℂ` to a (partial) inverse on `ℂ`. |
| `↑ₕ f` (notation) | `f ∘ ofComplex` | Extension of a function `f : ℍ → ℂ` to `ℂ` via `ofComplex`. |
| `ofComplex_apply`, `ofComplex_apply_eq_ite`, `ofComplex_apply_of_im_pos`, etc. | Various lemmas about `ofComplex` | Describes behavior of `ofComplex`: identity on `ℍ`, conditional definition on `ℂ`, continuity, etc. |
| `eventuallyEq_coe_comp_ofComplex` | `coe ∘ ofComplex =ᶠ[𝓝 z] id` near `z` with `0 < z.im` | Near points in `ℍ`, `ofComplex` is a local inverse to inclusion. |

---

#### **2. Naming Conventions**

- **`coe` / `↑`**: Standard coercion notation for subtype inclusion (`ℍ → ℂ`).
- **`ofComplex`**: “Section” or “extension” from `ℂ` to `ℍ` (partial inverse of `coe`).
- **`verticalStrip`**: Descriptive name for geometric region; parameters `A`, `B` denote width/height bounds.
- **`isEmbedding`, `isOpenEmbedding`**: Standard Mathlib prefixes for embedding properties.
- **`continuous_`, `locallyCompactSpace`, `locPathConnectedSpace`**: Standard instance naming.
- **`mem_`, `subset_`, `mono_`, `anti_`**: Standard for membership, inclusion, monotonicity/antitonicity lemmas.
- **`comp_ofComplex`**: Composition with `ofComplex`; prefix `comp_` indicates precomposition.
- **`eventuallyEq_`**: For filters and neighborhoods.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `ofComplex_apply`, `vadd_re`, `im_mk`). |
| `rw` / `rw [← ...]` | Rewriting using equalities (e.g., `closure_preimage_im`, `add_comm`). |
| `norm_cast` | Cast simplification (e.g., between `ℝ` and `ℂ`, `ℕ` and `ℤ`). |
| `apply`, `exact`, `intro`, `rintro` | Basic proof structure. |
| `cases` / `rcases` | Decomposition of hypotheses (e.g., `eq_empty_or_nonempty`, `isMaxOn`, `isMinOn`). |
| `filter_upwards` | Filter-based reasoning (e.g., proving eventual equality). |
| `ring` / `linarith` | Algebraic simplification and linear arithmetic. |
| `aesop` / `tauto` | Not heavily used here; more manual proofs. |
| `apply ... le` / `apply ... lt` | Order reasoning (e.g., `abs_eq_self.2`, `Int.sub_floor_div_mul_nonneg`). |

---

#### **4. Proof Logic & Strategy**

- **Topological structure**: Derived via `subtype` and openness of `{z : ℂ | 0 < z.im}`.
- **Embedding properties**: Proven via general lemmas (`subtypeVal`, `isOpen_lt`).
- **Contractibility**: Uses convexity of the half-space `{z | 0 < im z}`.
- **Noncompactness**: Contrapositive: assume compactness → preimage of `Ioi 0` compact → closed → contradiction at boundary `im = 0`.
- **Compact subsets in vertical strips**: Uses extreme value theorem (`isMaxOn`, `isMinOn`) on `|re z|` and `im z`.
- **Modular group lemma**: Uses integer floor function to bound real part modulo 1; algebraic simplification (`vadd_re`, `Int.sub_floor_div_mul_*`).
- **`ofComplex` behavior**: Case analysis on `im z > 0` vs `im z ≤ 0`; uses ` Classical.choice` for non-`ℍ` points.

---

#### **5. Imports & Scope**

**Primary dependencies** (define scope and foundational context):

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Complex.UpperHalfPlane.Basic` | Core definitions of `ℍ`, real/imag parts, modular group action. |
| `Mathlib.Analysis.Convex.Contractible` | Contractibility of convex sets. |
| `Mathlib.Analysis.LocallyConvex.WithSeminorms` | Locally convex topology tools (used implicitly via `ℂ`). |
| `Mathlib.Analysis.Complex.Convex` | Convexity in `ℂ`. |
| `Mathlib.Analysis.Complex.ReImTopology` | Topology of `ℂ` via `re`, `im`. |
| `Mathlib.Topology.Homotopy.Contractible` | General contractibility facts. |
| `Mathlib.Topology.PartialHomeomorph` | `PartialHomeomorph` machinery. |

**Notable logical assumptions**:
- Classical logic (`Classical.choice`) used in `ofComplex` for non-`ℍ` inputs.
- `noncomputable section`: Indicates reliance on classical choice or non-computable definitions.

---

### Summary

This file formalizes the standard topology on the upper half plane `ℍ ⊆ ℂ`, establishing it as a contractible, locally compact, locally path-connected, noncompact, separable, normal topological space. It introduces tools for working with compact subsets (via vertical strips), the modular group action, and a partial homeomorphism `ofComplex` to extend functions from `ℍ` to `ℂ`. The proofs rely heavily on continuity of `re`, `im`, convexity, and elementary real analysis (e.g., extreme value theorem, floor function properties).