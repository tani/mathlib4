### Technical Metadata Brief: Adjoint Triples in Lean 4 (Category Theory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isIso_unit_iff_isIso_counit` | `IsIso adj₁.unit ↔ IsIso adj₂.counit` | Establishes equivalence between the unit of the first adjunction and the counit of the second being isomorphisms. Core technical lemma for the main result. |
| `fullyFaithfulEquiv` | `F.FullyFaithful ≃ H.FullyFaithful` | Main theorem: For an adjoint triple `F ⊣ G ⊣ H`, `F` is fully faithful iff `H` is fully faithful. Provides an equivalence (bijection up to subsingleton) of the two properties. |

**Auxiliary constructions used:**
- `adj₁.comp adj₂`: Composition of adjunctions `F ⊣ G` and `G ⊣ H` yields `F ⋙ G ⊣ H ⋙ G`.
- `adj.ofNatIsoLeft`, `adj.ofNatIsoRight`: Construct new adjunctions from natural isomorphisms.
- `leftAdjointUniq`, `rightAdjointUniq`: Uniqueness of left/right adjoints up to unique isomorphism.
- `asIso`: Converts an isomorphism to a `Iso` object.
- `fullyFaithfulLOfIsIsoUnit`, `fullyFaithfulROfIsIsoCounit`: Standard results linking fully faithfulness to unit/counit isomorphisms.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isIso_`: Indicates a property about being an isomorphism (e.g., `isIso_unit`, `isIso_counit`).
  - `fullyFaithfulL/R_`: Left/right adjoint fully faithful criteria (e.g., `fullyFaithfulLOfIsIsoUnit`).
  - `ofNatIsoL/R`: Constructing adjunctions from natural isomorphisms.
- **Suffixes:**
  - `_iff_`: Biconditional statements (`isIso_unit_iff_isIso_counit`).
  - `_equiv`: Equivalence of propositions/types (`fullyFaithfulEquiv`).
- **Variable naming:**
  - `adj₁`, `adj₂`: Standard for two adjunctions in a triple.
  - `h`, `h'`: Proof terms for fully faithfulness.

---

#### **3. Tactic Stack**

- **Core tactics used:**
  - `intro`, `constructor`, `rw`, `apply`, `exact`, `infer_instance`
  - `simp_rw` (via `rw` + `simp`-friendly rewrites)
  - `subsingleton` reasoning: `Subsingleton.elim _ _`
- **Category-theoretic automation:**
  - `asIso`, `leftAdjointUniq`, `rightAdjointUniq`, `fullyFaithfulLOfIsIsoUnit`, etc., act as *tactic-like lemmas*.
  - Implicit use of typeclass inference (`haveI := h.full`, `infer_instance`).

No heavy automation like `aesop`, `ring`, or `linarith` — proof is largely *structure-driven* and *lemma-compositional*.

---

#### **4. Proof Logic**

- **Structure of `isIso_unit_iff_isIso_counit`:**
  1. Construct composite adjunction `F ⋙ G ⊣ H ⋙ G`.
  2. For `→`: Assume `adj₁.unit` is iso → use it to show `H ⋙ G ≅ 𝟭 C` → uniqueness of right adjoint gives `H ⋙ G = 𝟭 C` up to iso → then apply `adj₂.isIso_counit_of_iso`.
  3. For `←`: Symmetric argument using `adj₂.counit` iso ⇒ `F ⋙ G ≅ 𝟭 C` ⇒ uniqueness of left adjoint ⇒ `adj₁.unit` iso.

- **Structure of `fullyFaithfulEquiv`:**
  1. `toFun`: Assume `F` fully faithful ⇒ `adj₁.unit` iso (standard result) ⇒ by previous lemma, `adj₂.counit` iso ⇒ `H` fully faithful.
  2. `invFun`: Reverse direction using symmetry.
  3. `left/right_inv`: Follows because `FullyFaithful` is a subsingleton (property of fully faithful functors is propositional).

- **Logical flow:**  
  *Reduction via known equivalences* (unit/counit iso ↔ fully faithfulness for left/right adjoints) + *uniqueness of adjoints* + *subsingleton reasoning*.

---

#### **5. Imports & Scope**

- **Primary imports:**
  - `Mathlib.CategoryTheory.Adjunction.Unique`: Uniqueness of adjoints (e.g., `leftAdjointUniq`, `rightAdjointUniq`).
  - `Mathlib.CategoryTheory.Monad.Adjunction`: Likely for general adjunction machinery (e.g., `unit`, `counit`, `fullyFaithfulLOfIsIsoUnit`, etc.).

- **Domain scope:**
  - 2-category of categories, functors, natural transformations.
  - Focus on *adjoint triples* and *fully faithfulness* as a property.
  - No monads or higher categorical structure beyond basic adjunction theory.

---

### Summary

This file formalizes a foundational result in adjoint triple theory: **left adjoint fully faithful ⇔ right adjoint fully faithful**, leveraging:
- Composition of adjunctions,
- Uniqueness of adjoints,
- Subsingleton nature of fully faithfulness.

The proof is elegant and minimal, relying on high-level categorical principles rather than element-wise reasoning. The naming and structure reflect Lean’s category theory library conventions (Mathlib), emphasizing modularity and reuse of standard adjunction lemmas.