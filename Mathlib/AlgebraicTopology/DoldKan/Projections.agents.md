### Technical Metadata Brief: Projections for the Dold-Kan Correspondence (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `P : ℕ → (K[X] ⟶ K[X])` | Inductive definition: `P 0 = 𝟙`, `P (q+1) = P q ≫ (𝟙 + Hσ q)` | Constructs a family of endomorphisms on the alternating face complex `K[X]`, intended as projections. |
| `Q (q : ℕ) : K[X] ⟶ K[X]` | `Q q := 𝟙 - P q` | Complementary projection to `P q`. |
| `P_zero` | `P 0 = 𝟙` | Base case of `P`. |
| `P_succ` | `P (q+1) = P q ≫ (𝟙 + Hσ q)` | Recursive step of `P`. |
| `P_f_0_eq` | `(P q).f 0 = 𝟙` | All `P q` act as identity in degree 0. |
| `Q_zero` | `Q 0 = 0` | Complement vanishes in degree 0. |
| `Q_succ` | `Q (q+1) = Q q - P q ≫ Hσ q` | Recursive formula for `Q`. |
| `P_add_Q` | `P q + Q q = 𝟙` | Decomposition of identity. |
| `HigherFacesVanish.of_P` | `HigherFacesVanish q ((P q).f (n+1))` | Vanishing of higher faces under `P q`. |
| `HigherFacesVanish.comp_P_eq_self` | `φ ≫ (P q).f (n+1) = φ` if `HigherFacesVanish q φ` | Characterization of elements fixed by `P q`. |
| `comp_P_eq_self_iff` | `φ ≫ (P q).f (n+1) = φ ↔ HigherFacesVanish q φ` | Equivalence between fixed points and vanishing condition. |
| `P_f_idem` | `(P q).f n ≫ (P q).f n = (P q).f n` | Idempotency of `P q` in each degree. |
| `Q_f_idem` | `(Q q).f n ≫ (Q q).f n = (Q q).f n` | Idempotency of `Q q` in each degree. |
| `P_idem` | `P q ≫ P q = P q` | Global idempotency of `P q`. |
| `Q_idem` | `Q q ≫ Q q = Q q` | Global idempotency of `Q q`. |
| `natTransP (q)` | Natural transformation `alternatingFaceMapComplex C ⟶ alternatingFaceMapComplex C` | `P q` is natural in `X`. |
| `P_f_naturality` | `f ≫ (P q).f n = (P q).f n ≫ f` | Degree-wise naturality of `P q`. |
| `Q_f_naturality` | Same as above for `Q q`. | Naturality of `Q q`. |
| `natTransQ (q)` | Natural transformation `alternatingFaceMapComplex C ⟶ alternatingFaceMapComplex C` | `Q q` is natural. |
| `map_P` | `G.map ((P q).f n) = (P q).f n` under additive `G` | Compatibility with additive functors. |
| `map_Q` | Same as `map_P` for `Q q`. | Compatibility of `Q q` with additive functors. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `P_`, `Q_`: For projections and their complements.
  - `natTrans`: For natural transformations (`natTransP`, `natTransQ`).
  - `map_`: For behavior under functors (`map_P`, `map_Q`).
  - `comp_`: For composition lemmas (`comp_P_eq_self`, `comp_P_eq_self_iff`).
  - `of_`: For lemmas derived from inductive structure (`of_P`).
  - `f_`: For degree-wise components (`P_f_0_eq`, `P_f_idem`, `P_f_naturality`).

- **Suffixes**:
  - `_eq`: Equality lemmas (`P_zero`, `Q_zero`, `P_f_0_eq`).
  - `_idem`: Idempotency (`P_f_idem`, `Q_idem`).
  - `_naturality`: Naturality (`P_f_naturality`, `Q_f_naturality`).
  - `_f`: Degree-wise version of a global statement.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `induction'`: Used repeatedly for induction on `q : ℕ`.
  - `simp only [...]`: Extensive simplification using lemmas and definitions.
  - `rw [...]`: Rewriting using equalities (e.g., `P_succ`, `Q_succ`, `comp_P_eq_self`).
  - `abel`: For abelian group/category-theoretic simplifications (e.g., `P_add_Q`, `Q_succ`).
  - `cases` / `obtain ⟨a, ha⟩`: For case analysis on natural numbers (e.g., `comp_P_eq_self`).
  - `omega`: For arithmetic reasoning (e.g., `of_P` base case).
  - `ext n`: Extensionality for natural transformations (e.g., `P_idem`, `Q_idem`).
  - `rfl`, `assumption`, `exact`: Basic proof automation.

- **Specialized**:
  - `reassoc_of%`: For reassoc attributes (e.g., in `natTransP`).
  - `erw`: Eager rewriting (used in `natTransP`).
  - `idem_of_id_sub_idem`: Lemma for idempotency of `1 - e` given `e² = e`.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs about `P q` and `Q q` proceed by induction on `q`.
  - Base case (`q = 0`) is trivial (`P 0 = 𝟙`, `Q 0 = 0`).
  - Inductive step uses recursive definitions (`P_succ`, `Q_succ`) and properties of `Hσ q`.

- **Vanishing arguments**:
  - `HigherFacesVanish.of_P` uses induction on `q` and leverages `Hσ q`'s action on higher faces.
  - `comp_P_eq_self` uses induction and case analysis on `n < q` vs `n ≥ q`, with `Fin.succ_mk` and arithmetic simplifications.

- **Naturality & functoriality**:
  - Naturality of `P q` is shown by induction, using naturality of `Hσ q` (`natTransHσ`).
  - Functor compatibility (`map_P`, `map_Q`) uses induction and `Functor.map_add`, `map_Hσ`.

- **Idempotency**:
  - Proven degree-wise (`P_f_idem`) using `HigherFacesVanish.comp_P_eq_self`.
  - Global idempotency (`P_idem`) follows by extensionality.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.AlgebraicTopology.DoldKan.Faces`: Provides `Hσ`, `HigherFacesVanish`, and face map machinery.
  - `Mathlib.CategoryTheory.Idempotents.Basic`: Provides tools for idempotent splittings.

- **Open namespaces**:
  - `CategoryTheory`, `Simplicial`, `DoldKan`, `Opposite`, `Limits`, `Preadditive`, `SimplicialObject`, `Idempotents`.

- **Scope**:
  - Works in a general preadditive category `C`.
  - Constructs endomorphisms of the alternating face complex `K[X]` for a simplicial object `X`.
  - Lays groundwork for defining `PInfty` (limit of `P q`) in `PInfty.lean`, used in the Dold-Kan equivalence.

--- 

Let me know if you'd like a dependency graph or a summary of how this file fits into the broader Dold-Kan proof strategy.