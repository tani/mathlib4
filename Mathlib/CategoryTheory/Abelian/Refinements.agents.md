### Technical Brief: Refinements in Abelian Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `epi_iff_surjective_up_to_refinements` | `f : X ⟶ Y : C` → `Epi f ↔ ∀ A y, ∃ A', π : Epi π, x, π ≫ y = x ≫ f` | Characterizes epimorphisms as morphisms that are *surjective up to refinements*: any map into the codomain can be lifted after precomposing with an epimorphism. |
| `surjective_up_to_refinements_of_epi` | `[Epi f] → ∀ A y, ∃ ...` | Direct consequence of the above equivalence; provides the lifting data when `f` is epi. |
| `ShortComplex.exact_iff_exact_up_to_refinements` | `S.Exact ↔ ∀ A x₂, x₂ ≫ g = 0 ⇒ ∃ refinement, π ≫ x₂ = x₁ ≫ f` | Exactness of a short complex is equivalent to being exact *up to refinements*: any cycle (i.e., map killing `g`) can be lifted modulo an epimorphism. |
| `ShortComplex.Exact.exact_up_to_refinements` | `hS : S.Exact → ...` | Instantiation of the above equivalence: given exactness, produces the refinement for any cycle. |
| `ShortComplex.eq_liftCycles_homologyπ_up_to_refinements` | `γ : A ⟶ S.homology ⇒ ∃ refinement, π ≫ γ = liftCycles z hz ≫ homologyπ` | Shows that any map into homology factors through the lift of a cycle, up to refinement — mimicking element-wise surjectivity of `homologyπ`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `epi_`, `surjective_up_to_refinements_of_`: indicate properties related to epimorphisms and refinements.
  - `exact_up_to_refinements`: used for characterizations of exactness via refinements.
- **Suffixes:**
  - `_up_to_refinements`: core pattern for statements involving lifting up to epimorphic precomposition.
  - `_of_epi`: derived lemmas assuming an epimorphism.
- **Other patterns:**
  - `liftCycles`, `homologyπ`, `iCycles`: standard constructions in short complexes.
  - `eq_..._up_to_refinements`: equality modulo refinement.

---

#### **3. Tactic Stack**

The proofs rely heavily on:
- `rw` (rewrite) for manipulating compositions and universal properties.
- `simp` / `simp only` for simplifying identities involving `iCycles`, `liftCycles`, `homologyπ`.
- `exact` / `obtain` / `refine` for existential constructions.
- `congr 1` for proving equality of morphisms by congruence (often after `rw`).
- `cancel_mono` for canceling monomorphisms on one side (used in homology-related lemmas).
- `assoc` for associativity of composition.
- `inferInstance` for automatically inferring `Epi π` from context.

No heavy automation like `aesop` or `ring` is used — the proofs are mostly structural and diagram-chase-like.

---

#### **4. Proof Logic**

- **Structure of proofs:**
  - Most results follow a *two-directional* pattern (`↔` or `↔`-based `constructor`), where:
    - **(→)** direction uses universal properties (e.g., pullbacks for epimorphisms).
    - **(←)** direction constructs a factorization using the assumed lifting property.
- **Key logical moves:**
  - Use of **pullbacks** to construct refinements in the `epi ⇒ surj up to refinements` direction.
  - Application of `epi_of_epi_fac` to deduce epi-ness from factorization with epi.
  - In homology lemmas: factor through `homologyπ`, then lift via `iCycles` and `liftCycles`.
  - Cancellation lemmas (`cancel_mono`) are crucial to relate lifted cycles to original data.

- **Diagram-chasing style:**
  - Elements are replaced by morphisms `A ⟶ X`.
  - Refinements (`π : A' ⟶ A`, `Epi π`) simulate “local” or “covering” changes, analogous to Grothendieck topology covers.

---

#### **5. Imports**

- `Mathlib.Algebra.Homology.ShortComplex.Exact`: provides foundational definitions and lemmas about exactness of short complexes in abelian categories.
- Core category theory infrastructure (via `open Category Limits`):
  - Pullbacks, limits, monos/epis, universal properties.
- Implicit use of `Abelian C`: full power of abelian category axioms (e.g., existence of pullbacks, factorizations, mono-epi decomposition).

---

#### **Summary**

This file formalizes a *refinement-based* approach to diagram chasing in abelian categories, avoiding the need for the Freyd–Mitchell embedding theorem. It shows that classical element-wise properties (epi = surjective, exactness = cycles = boundaries) can be recovered *up to epimorphic refinements*, i.e., by allowing precomposition with covers. This aligns with local-to-global reasoning in sheaf theory and Grothendieck topologies.

The formalization is minimal, elegant, and highly reusable — especially for future developments in homological algebra in general abelian categories.