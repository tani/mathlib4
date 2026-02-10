### Technical Brief: `Mathlib.FieldTheory.Galois.Polynomial`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Gal p` | `p.SplittingField ≃ₐ[F] p.SplittingField` | The Galois group of a polynomial `p`, defined as the group of `F`-algebra automorphisms of its splitting field. |
| `restrict p E` | `(E ≃ₐ[F] E) →* p.Gal` | Restriction homomorphism from automorphisms of a superfield `E` to `Gal(p)`, assuming `p` splits in `E`. |
| `mapRoots p E` | `rootSet p p.SplittingField → rootSet p E` | Map between root sets induced by the algebra map `p.SplittingField → E`. |
| `rootsEquivRoots p E` | `rootSet p p.SplittingField ≃ rootSet p E` | Bijection between root sets in the splitting field and in any splitting extension `E`. |
| `galAction p E` | `MulAction (Gal p) (rootSet p E)` | Action of `Gal(p)` on the roots of `p` in `E`, via conjugation through `rootsEquivRoots`. |
| `galActionHom p E` | `Gal p →* Equiv.Perm (rootSet p E)` | Permutation representation of the Galois group action on roots. |
| `restrictDvd hpq` | `q.Gal →* p.Gal` | Induced map on Galois groups when `p ∣ q`. |
| `restrictProd p q` | `(p * q).Gal →* Gal p × Gal q` | Embedding of the Galois group of a product into the product of Galois groups. |
| `restrictComp hq` | `(p.comp q).Gal →* p.Gal` | Restriction map for composition of polynomials, assuming `q` is non-constant. |

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ext` | `(∀ x ∈ rootSet p _, σ x = τ x) → σ = τ` | Extensionality: automorphisms are determined by their action on roots. |
| `uniqueGalOfSplits h` | `p.Splits id → Unique (Gal p)` | If `p` splits over `F`, then `Gal(p)` is trivial (unique element). |
| `restrict_smul` | `↑(restrict ϕ • x) = ϕ x` | Compatibility of restriction with the Galois action on roots. |
| `galActionHom_injective` | `Function.Injective (galActionHom)` | Faithfulness of the action on roots: `Gal(p)` embeds into permutations of roots. |
| `restrictProd_injective` | `Function.Injective (restrictProd)` | `Gal(p*q)` embeds as a subgroup of `Gal(p) × Gal(q)`. |
| `card_of_separable hp` | `Fintype.card (Gal p) = finrank F (SplittingField p)` | For separable `p`, size of Galois group equals degree of splitting field. |
| `galAction_isPretransitive hp` | `MulAction.IsPretransitive (Gal p) (rootSet p E)` | For irreducible `p`, the action on roots is pretransitive (single orbit). |
| `prime_degree_dvd_card hp_deg` | `p.natDegree ∣ Fintype.card (Gal p)` | For irreducible `p` of prime degree over char 0 field, degree divides group order. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `galAction*`: related to group action on roots.
  - `restrict*`: restriction maps from larger automorphism groups.
  - `mapRoots*`, `rootsEquivRoots*`: bijections/maps between root sets.
  - `uniqueGal*`: triviality/uniqueness results when polynomial splits.

- **Suffixes**:
  - `Hom`: homomorphism version (e.g., `galActionHom`, `restrictDvd`).
  - `Aux`: auxiliary definitions (e.g., `galActionAux`).
  - `def`: definition names (e.g., `restrictDvd_def`, `galAction_def`).
  - `of_*`: constructions from assumptions (e.g., `uniqueGalOfSplits`, `galAction_of_separable`).

- **Operators**:
  - `•`: used for group action (e.g., `ϕ • x`).
  - `↑`: coercion from `AlgEquiv` to function.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Proving equality of functions/automorphisms by extensionality. |
| `rw [...]` | Rewriting using lemmas like `Equiv.apply_symm_apply`, `AlgEquiv.ext_iff`, `rootSet_def`. |
| `simp only [...]` | Simplifying goals using definitional equalities and instance lemmas. |
| `rcases / cases'` | Decomposing existential or disjunctive hypotheses (e.g., `Multiset.mem_add`). |
| `apply`, `exact` | Direct proof steps, especially in induction or divisibility arguments. |
| `haveI : Fact (...)` | Introducing facts as instances for later use (e.g., splitting conditions). |
| `convert rfl` | Proving definitional equalities (e.g., `restrictDvd_def`). |
| `induction ... using WfDvdMonoid.induction_on_irreducible` | Structural induction on polynomials via irreducible factorization. |
| `ring`, `aesop` | Not heavily used here; algebraic simplifications are mostly manual or via `simp`. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction**: Many proofs (e.g., `splits_in_splittingField_of_comp`) use well-founded induction on polynomials via `WfDvdMonoid.induction_on_irreducible`.
  - **Case analysis**: On whether polynomials are zero or units (e.g., `restrictDvd_def`, `restrictProd_injective`).
  - **Root-based reasoning**: Most arguments rely on properties of `rootSet`, especially:
    - `rootSet_mapsTo`: automorphisms permute roots.
    - `rootsEquivRoots`: bijection between root sets in splitting field and extensions.
    - `mem_rootSet`: characterizes membership in terms of minpoly divisibility.
  - **Algebraic properties**:
    - Use of `Normal`, `IsGalois`, `IsIntegral`, `minpoly` to relate field extensions and automorphisms.
    - `AlgEquiv.restrictNormal_commutes` and `AlgEquiv.ext_iff` are central to proving equality of automorphisms.

- **Common proof patterns**:
  - Show two automorphisms agree on roots → conclude they are equal (`ext`).
  - Lift automorphisms via universal property of splitting fields.
  - Use `restrict_surjective` + `Normal` to get surjectivity of restriction maps.
  - For injectivity: show kernel is trivial using faithfulness of action (`galActionHom_injective`).

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.FieldTheory.Galois.Basic` | Core Galois theory: normal extensions, Galois correspondence, automorphism groups. |
| `Mathlib.FieldTheory.SplittingField` | Splitting fields, their universal property, and properties like `splits`, `IsSplittingField`. |
| `Mathlib.RingTheory.Minpoly` | Minimal polynomials, integrality, and their relation to roots and automorphisms. |
| `Mathlib.Module.Finite` | Finite-dimensional vector spaces, `finrank`, `Fintype.card`. |
| `Mathlib.Algebra.Equiv` | Algebra isomorphisms (`≃ₐ`), `AlgEquiv`, `MulAction`. |
| `Mathlib.Data.Finset.Aroot` | Roots of polynomials as multisets/finsets (`rootSet`, `aroots`). |

---

#### **6. Domain-Specific AI Agent Notes**

- **Key domain**: Galois theory of polynomials over fields, especially:
  - Splitting fields and their automorphism groups.
  - Actions on root sets and permutation representations.
  - Embeddings between Galois groups of related polynomials (divisors, products, compositions).
- **Critical lemmas for automation**:
  - `ext`, `galActionHom_injective`, `restrict_smul`, `card_of_separable`.
  - `restrictDvd_surjective`, `restrictProd_injective`, `prime_degree_dvd_card`.
- **Common proof obligations**:
  - Verifying splitting conditions (`Fact (p.Splits ...)`) for applying `restrict`.
  - Showing irreducibility/separability to apply structure theorems.
  - Coercing between root sets via `rootsEquivRoots`.

Let me know if you'd like a tactic suggestion database or a proof sketch generator for this domain.