### Technical Brief: `WithAbs` and Absolute Value Completions in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `WithAbs` | `AbsoluteValue R ℝ → Type _` | Type synonym for a semiring `R`, parameterized by an absolute value `v : R → ℝ`. Enables instance inference depending on `v`. |
| `WithAbs.equiv v` | `WithAbs v ≃ R` | Canonical equivalence (as sets/types) between `WithAbs v` and `R`. Used to transport structure. |
| `WithAbs.ringEquiv v` | `WithAbs v ≃+* R` | Canonical ring equivalence (preserves `+`, `*`, `0`, `1`). |
| `AbsoluteValue.Completion v` | `UniformSpace.Completion (WithAbs v)` | Completion of field `K` w.r.t. uniform structure induced by absolute value `v`. |
| `WithAbs.normedRing` | `NormedRing (WithAbs v)` | Induces a normed ring structure on `WithAbs v` from `v`. |
| `WithAbs.normedField` | `NormedField (WithAbs v)` | Induces a normed field structure on `WithAbs v` when `v` is on a field. |
| `WithAbs.isometry_of_comp` | `(∀ x, ‖f x‖ = v x) → Isometry f` | If embedding `f` respects the absolute value, then `f` is an isometry. |
| `WithAbs.uniformSpace_comap_eq_of_comp` | `(∀ x, ‖f x‖ = v x) → UniformSpace.comap f … = …` | Uniform structures induced by `f` and `v` coincide. |
| `WithAbs.isUniformInducing_of_comp` | `(∀ x, ‖f x‖ = v x) → IsUniformInducing f` | `f` preserves uniform structure (injective on Cauchy filters). |
| `AbsoluteValue.Completion.extensionEmbedding_of_comp` | `(∀ x, ‖f x‖ = v x) → v.Completion →+* L` | Universal property: extends `f` to completion. |
| `AbsoluteValue.Completion.isometry_extensionEmbedding_of_comp` | `(∀ x, ‖f x‖ = v x) → Isometry (extensionEmbedding_of_comp h)` | Extended embedding is an isometry. |
| `AbsoluteValue.Completion.isClosedEmbedding_extensionEmbedding_of_comp` | `(∀ x, ‖f x‖ = v x) → IsClosedEmbedding (extensionEmbedding_of_comp h)` | Extended embedding is a closed embedding. |
| `AbsoluteValue.Completion.locallyCompactSpace` | `[LocallyCompactSpace L] → LocallyCompactSpace v.Completion` | Local compactness descends along the embedding. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `WithAbs.`: All definitions/instances tied to the type synonym.
  - `equiv_`, `ringEquiv_`: For equivalences and ring isomorphisms.
  - `normedRing`, `normedField`: Instance names for normed structures.
  - `isometry_`, `isUniformInducing_`, `isClosedEmbedding_`: Properties of maps.
  - `extensionEmbedding_of_comp`: Extension of maps factoring through absolute value.

- **Suffixes**:
  - `_of_comp`: Indicates the result holds when the absolute value factors through a map `f`.
  - `_symm`: For inverses of equivalences (e.g., `equiv_symm_add`).
  - `_coe`: For coercion-related lemmas (e.g., `extensionEmbedding_of_comp_coe`).

- **Pattern**:
  - `equiv` and `ringEquiv` are canonical equivalences.
  - `normedRing`, `normedField` are *instances*, not lemmas.
  - `isometry_of_comp`, `uniformSpace_comap_eq_of_comp`, etc., follow a consistent pattern:  
    `property_of_comp (h : ∀ x, ‖f x‖ = v x)`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | For definitional equalities (e.g., `equiv_add`, `equiv_mul`). |
| `simp only [...]` | Simplifying with specific lemmas (e.g., `equiv_symm_add`, `extensionEmbedding_of_comp_coe`). |
| `rw [...]` | Rewriting using lemmas like `dist_eq`, `map_sub`. |
| `exact ...` | Finishing proofs with known facts. |
| `refine ...` | Partially constructing proofs (e.g., induction or extension). |
| `ext` | Extensionality for uniform spaces / pseudo metrics. |
| `isClosed_eq`, `continuous_dist`, `continuous_iff_continuous_dist` | For proving closedness/continuity in uniform/metric contexts. |
| `induction_on₂` | Induction on two arguments in completion (e.g., for `dist` lemmas). |

No heavy automation (e.g., `aesop`, `linarith`) is used—proofs are mostly structural and rely on metric/uniform space properties.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Step 1**: Show that `f` preserves distances (via `isometry_of_comp`), using `dist_eq` and hypothesis `h`.
  - **Step 2**: Lift this to uniform structures (`uniformSpace_comap_eq_of_comp`) and deduce uniform continuity / inducing.
  - **Step 3**: Use universal property of completion (`UniformSpace.Completion.extensionHom`) to extend `f`.
  - **Step 4**: Prove properties of the extension (isometry, closed embedding, local compactness) via:
    - Induction on completion elements (`induction_on₂`)
    - Continuity/closedness lemmas (`isClosed_eq`, `locallyCompactSpace`)
    - Preservation of structure (`extensionEmbedding_of_comp_coe`)

- **Key logical flow**:
  > Given `f : WithAbs v →+* L` with `‖f x‖ = v x`,  
  > ⇒ `f` is an isometry  
  > ⇒ uniform structures match  
  > ⇒ `f` is uniform-inducing  
  > ⇒ extends uniquely to `v.Completion →+* L`  
  > ⇒ extension is isometry, closed embedding, etc.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Group.Basic`: For group/ring structure.
- `Mathlib.Algebra.Order.AbsoluteValue.Basic`: Absolute values and their basic properties.
- `Mathlib.Analysis.Normed.Field.Basic`: Normed fields, norms, distances.
- `Mathlib.Analysis.Normed.Module.Completion`: Uniform space completion (core for `Completion`).

**Scope**:
- Noncomputable section (due to completion).
- Variable declarations for `R`, `S`, `K` with algebraic/order/normed assumptions.
- Focus on *Archimedean* completions (via real absolute values).
- Intended use: Constructing completions of number fields (see `NumberTheory.NumberField.Completion`).

---

### Summary

This file formalizes a *type-synonym trick* (`WithAbs`) to make absolute-value-dependent structures inferable, and builds the *completion of a field* with respect to an absolute value, proving its universal property and metric properties. It is foundational for constructing local fields (e.g., `ℝ`, `ℂ`, `ℚₚ`) from global ones (e.g., number fields). The proofs rely on uniform space theory and metric geometry, with a clean separation between the abstract type synonym and the concrete underlying field.