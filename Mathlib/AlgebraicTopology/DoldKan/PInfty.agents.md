### Technical Metadata Brief: Construction of `PInfty` in the Dold-Kan Correspondence (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PInfty` | `K[X] ⟶ K[X]` | Endomorphism of the alternating face map complex obtained as the limit of projections `P q`. Projects onto the normalized Moore subcomplex. |
| `QInfty` | `K[X] ⟶ K[X]` | Defined as `1 - PInfty`. Projects onto the degenerate subcomplex (complementary projector). |
| `P_is_eventually_constant` | `n ≤ q ⇒ (P (q+1)).f n = (P q).f n` | Shows that the components of `P q` stabilize in low degrees — key for defining the limit. |
| `Q_is_eventually_constant` | `n ≤ q ⇒ (Q (q+1)).f n = (Q q).f n` | Follows from `P_is_eventually_constant`; ensures stabilization of `Q q`. |
| `PInfty_f` | `(PInfty.f n) = (P n).f n` | Computes the degree-`n` component of `PInfty`. |
| `PInfty_idem`, `QInfty_idem` | `PInfty ≫ PInfty = PInfty`, `QInfty ≫ QInfty = QInfty` | Idempotency of `PInfty` and `QInfty`. |
| `PInfty_comp_QInfty`, `QInfty_comp_PInfty` | Both compositions = `0` | Orthogonality of the projectors. |
| `PInfty_add_QInfty` | `PInfty + QInfty = 1` | Complementary decomposition of identity. |
| `natTransPInfty` | `alternatingFaceMapComplex C ⟶ alternatingFaceMapComplex C` | Natural transformation induced by `PInfty`, i.e., a functorial endomorphism of the alternating face map complex. |
| `karoubi_PInfty_f` | `(PInfty.f n).f = Y.p ≫ (PInfty.f n : K[Y.X])` | Computes `PInfty` on objects of the Karoubi envelope in terms of the underlying simplicial object and idempotent splitting. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `P_`, `Q_`: for finite-stage projections (from `Projections.lean`).
  - `PInfty_`, `QInfty_`: for the limiting projectors.
  - `natTransPInfty_`: for natural transformations derived from `PInfty`.
- **Suffixes**:
  - `_f`: for component morphisms in degree `n` (e.g., `PInfty_f n`).
  - `_idem`: for idempotency lemmas.
  - `_naturality`: for naturality squares.
  - `_comp_`: for composition lemmas (e.g., `PInfty_comp_QInfty`).
- **`[reassoc (attr := simp)]`**: Indicates lemmas tagged for automatic rewriting in `reassoc` mode and added to `simp` set.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification using explicit rewrite rules (often with `rfl`, `add_right_eq_self`, etc.). |
| `ext n` | Extensionality for chain maps: reduce to degree-`n` components. |
| `dsimp [QInfty]` | Delta-simplification to unfold definitions like `QInfty := 1 - PInfty`. |
| `rw [...]` | Rewrite using proven equalities (e.g., `h₃₂`, `h₄₃`, `h₁₄`). |
| `exact ...` | Direct proof application (e.g., `exact (HigherFacesVanish.of_P q n).comp_Hσ_eq_zero ...`). |
| `let ... := ...` | Local definitions for intermediate objects (e.g., `Y₁`, `Y₂`, `P₁`, `P₂`). |
| `have h := ...` | Introduce intermediate facts (e.g., `h₃₂`, `h₄₃`, `h₁₄`). |
| `simp only [Karoubi.decompId_p_f, Karoubi.comp_f]` | Simplify homs in Karoubi envelope using structural lemmas. |
| `Karoubi.hom_ext_iff.mp` | Use extensionality in Karoubi category to prove equality of morphisms. |

No heavy automation like `aesop` or `ring` is used — proofs are mostly structural and rely on explicit computation and known lemmas from `Projections.lean`.

---

#### **4. Proof Logic**

- **Stabilization Lemma**: Prove `P_is_eventually_constant` by induction on `n`, using `HigherFacesVanish.of_P` to kill higher face maps.
- **Limit Construction**: Define `PInfty` as a chain map using the stabilized components `(P n).f n`, verifying commutativity with differentials via `P (n+1).comm`.
- **Idempotency & Orthogonality**: Follow directly from corresponding properties of `P q`, `Q q`, and component-wise simplification.
- **Naturality**: Lifted from `P_f_naturality` at degree `n = q`, using stabilization.
- **Karoubi Envelope Computation**: Uses:
  - Functoriality of `PInfty` under base change (`map_PInfty_f`),
  - Naturality of `natTransPInfty_f`,
  - The universal property of idempotent splittings in Karoubi envelopes (`Idempotents.natTrans_eq`).
- **Overall Strategy**: Pass to the limit in degrees, verify compatibility with simplicial structure and Karoubi completion, and ensure compatibility with the abelian category context (for the Dold-Kan equivalence).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicTopology.DoldKan.Projections` | Defines finite-stage projectors `P q`, `Q q`, their properties (idempotency, vanishing faces, naturality). |
| `Mathlib.CategoryTheory.Idempotents.FunctorCategories` | Provides tools for handling idempotent splittings in functor categories (used in Karoubi envelope computations). |
| `Mathlib.CategoryTheory.Idempotents.FunctorExtension` | Enables extension of functors through Karoubi envelopes (e.g., `karoubiFunctorCategoryEmbedding`). |

**Scope**: This file formalizes the *construction* of the limiting projector `PInfty`, a key ingredient in the Dold-Kan equivalence (see `Equivalence.lean`). It operates in the generality of a preadditive category `C`, with simplicial objects and chain complexes of homological algebra.

--- 

Let me know if you'd like a diagrammatic summary or a dependency graph of lemmas.