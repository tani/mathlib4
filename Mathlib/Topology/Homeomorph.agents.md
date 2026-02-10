### Technical Brief: Homeomorphisms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Homeomorph X Y` | `Type u → Type v → [TopologicalSpace X] → [TopologicalSpace Y] → Type (max u v)` | Type of homeomorphisms (topological isomorphisms) between `X` and `Y`. Notation: `X ≃ₜ Y`. |
| `Homeomorph.mk` | `(a : X ≃ Y) → Continuous a → Continuous a.symm → X ≃ₜ Y` | Constructor: builds a homeomorphism from an equivalence with continuous forward and inverse maps. |
| `Homeomorph.symm` | `X ≃ₜ Y → Y ≃ₜ X` | Inverse of a homeomorphism. |
| `Homeomorph.trans` | `X ≃ₜ Y → Y ≃ₜ Z → X ≃ₜ Z` | Composition of homeomorphisms. |
| `Homeomorph.refl` | `X ≃ₜ X` | Identity homeomorphism. |
| `Homeomorph.homeomorphOfContinuousOpen` | `(e : X ≃ Y) → Continuous e → IsOpenMap e → X ≃ₜ Y` | Characterization: a continuous open bijection is a homeomorphism. |
| `Homeomorph.homeomorphOfContinuousClosed` | `(e : X ≃ Y) → Continuous e → IsClosedMap e → X ≃ₜ Y` | Characterization: a continuous closed bijection is a homeomorphism. |
| `Homeomorph.isInducing`, `isQuotientMap`, `isEmbedding`, `isOpenEmbedding`, `isClosedEmbedding` | `X ≃ₜ Y → Prop` | Properties of a homeomorphism viewed as a map: inducing, quotient, embedding, open/closed embedding. |
| `Homeomorph.isCompact_image`, `isConnected_image`, `isPreconnected_image`, etc. | `s : Set X → Prop ↔ Prop` | Preservation of topological properties under homeomorphism (e.g., compactness, connectedness). |
| `Homeomorph.locallyConnectedSpace`, `locallyCompactSpace_iff` | `[LocallyConnectedSpace Y] → LocallyConnectedSpace X`, etc. | Transfer of local topological properties via homeomorphism. |
| `Homeomorph.prodCongr`, `sumCongr`, `piCongr`, `piCongrLeft`, `piCongrRight` | `(X ≃ₜ X') → (Y ≃ₜ Y') → X × Y ≃ₜ X' × Y'`, etc. | Construct homeomorphisms on products, sums, and dependent products. |
| `Homeomorph.subtype`, `sets`, `setCongr` | Lifts homeomorphisms to subtypes/sets. | Enables restriction of homeomorphisms to subsets. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Properties of maps (e.g., `isInducing`, `isOpenMap`, `isCompact_image`).
  - `coe_`: Coercions to functions (e.g., `coe_toEquiv`, `coe_prodCongr`).
  - `symm_`: Inverse-related operations (e.g., `symm_apply_apply`, `symm_trans_apply`).
  - `homeomorph_`: Constructors or special cases (e.g., `homeomorphOfContinuousOpen`, `homeomorphOfUnique`).
- **Suffixes**:
  - `_congr`: Congruence-style constructions (e.g., `prodCongr`, `sumCongr`, `piCongr`).
  - `_comm`, `_assoc`: Structural isomorphisms (e.g., `prodComm`, `sumAssoc`, `sumSumSumComm`).
  - `_of_`: From a structure to a homeomorphism (e.g., `ofIsEmbedding`, `homeomorphOfUnique`).
- **Special**:
  - `ulift`: Universe-lifting homeomorphism.
  - `punitProd`, `prodPUnit`: Canonical homeomorphisms with unit types.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for functions/sets (e.g., proving `h = h'` by pointwise equality). |
| `simp` / `simp_rw` | Simplification using `@[simp]` lemmas (e.g., `apply_symm_apply`, `symm_apply_apply`). |
| `funext` | Proving function extensionality (e.g., `h ∘ h.symm = id`). |
| `convert` | Matching goals up to definitional equality (e.g., `continuous_invFun` proofs). |
| `rw [← ...]` | Rewriting using symmetry of equalities (e.g., `rw [← image_symm]`). |
| `by continuity` / `fun_prop` | Proving continuity of composite maps (used heavily in `continuous_toFun`, `continuous_invFun`). |
| `aesop` / `tauto` | Rare; mostly manual case analysis or algebraic reasoning. |
| `exact`, `assumption` | Used in short proofs (e.g., `refl_symm`). |

---

#### **4. Proof Logic**

- **Structure**: Proofs often follow this pattern:
  1. **Extensionality**: Use `ext` to reduce to pointwise equality.
  2. **Simplify**: Apply `simp` with `@[simp]` lemmas (e.g., `symm_apply_apply`, `apply_symm_apply`).
  3. **Continuity**: Use `by continuity` or `fun_prop` to discharge continuity goals.
  4. **Transfer via symmetry**: Use `h.symm` to reduce statements about `h` to known properties (e.g., `isCompact_image` via `h.symm.isCompact_preimage`).
  5. **Embedding/Quotient Map lemmas**: Leverage `isEmbedding`, `isOpenMap`, etc., to reuse topological properties.

- **Common idioms**:
  - Proving `h '' s = t` ↔ `s = h ⁻¹' t` via `h.toEquiv.image_eq_preimage`.
  - Using `h.isEmbedding` to inherit separation axioms (`T0`, `T1`, etc.).
  - Using `h.isOpenMap` / `h.isClosedMap` to prove continuity of inverse.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Logic.Equiv.Fin` | Finite equivalences (used for `Equiv.equivOfIsEmpty`, etc.). |
| `Mathlib.Topology.Algebra.Support` | Support-related lemmas (e.g., `HasCompactMulSupport`). |
| `Mathlib.Topology.Connected.LocallyConnected` | Locally connected spaces. |
| `Mathlib.Topology.ContinuousMap.Defs` | Basic continuity definitions. |
| `Mathlib.Topology.DenseEmbedding` | Dense embeddings and related properties. |

---

### Summary

This file formalizes **homeomorphisms** (`≃ₜ`) as equivalences with continuous forward and inverse maps. It establishes foundational properties (identity, composition, inverse), proves preservation of topological properties (compactness, connectedness, separation axioms), and constructs homeomorphisms for standard constructions (products, sums, function spaces). The proofs rely heavily on `simp`, `ext`, and continuity tactics, with a strong emphasis on leveraging embedding/quotient map theory.