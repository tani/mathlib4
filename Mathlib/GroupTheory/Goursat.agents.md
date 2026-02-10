### Technical Metadata Brief: Goursat’s Lemma for Subgroups (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `goursatFst` | `Subgroup (G × H) → Subgroup G` | Constructs the first normal subgroup `G' ≤ G` as the image under `fst ∘ I.subtype` of the kernel of `snd ∘ I.subtype`. |
| `goursatSnd` | `Subgroup (G × H) → Subgroup H` | Constructs the second normal subgroup `H' ≤ H` analogously using `snd ∘ I.subtype` and `fst ∘ I.subtype`. |
| `mem_goursatFst` | `g ∈ I.goursatFst ↔ (g, 1) ∈ I` | Characterizes membership in `goursatFst` via the fiber over `1 ∈ H`. |
| `mem_goursatSnd` | `h ∈ I.goursatSnd ↔ (1, h) ∈ I` | Dual characterization for `goursatSnd`. |
| `normal_goursatFst` | `I.goursatFst.Normal` | Proves `goursatFst` is a normal subgroup of `G`, assuming surjectivity of the first projection. |
| `normal_goursatSnd` | `I.goursatSnd.Normal` | Proves `goursatSnd` is normal in `H`, assuming surjectivity of the second projection. |
| `mk_goursatFst_eq_iff_mk_goursatSnd_eq` | `(x.1 = y.1) ↔ (x.2 = y.2)` in respective quotients | Key equivalence showing consistency of coset representatives across the two projections — essential for defining the isomorphism. |
| `goursatFst_prod_goursatSnd_le` | `I.goursatFst × I.goursatSnd ≤ I` | Shows that the product of the constructed normal subgroups lies inside `I`. |
| `goursat_surjective` | `∃ e : G ⧸ I.goursatFst ≃* H ⧸ I.goursatSnd, ...` | Main structural result under surjective projections: the image of `I` in the product of quotients is the graph of an isomorphism. |
| `goursat` | Full general form: `∃ G', H', M, N, e, ...` | Full statement of Goursat’s lemma for arbitrary subgroups (not necessarily surjectively projecting). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `goursat*`: All definitions and lemmas related to the lemma itself.
  - `mem_*`: Membership characterizations (e.g., `mem_goursatFst`).
  - `normal_*`: Normality lemmas.
- **Suffixes**:
  - `Fst`, `Snd`: Indicate dependency on first/second projection.
  - `le`: Subset/inclusion lemmas (e.g., `goursatFst_prod_goursatSnd_le`).
  - `eq_iff_eq`: Logical equivalences (e.g., `mk_goursatFst_eq_iff_mk_goursatSnd_eq`).
- **MonoidHom-based naming**:
  - `MonoidHom.fst`, `MonoidHom.snd`, `MonoidHom.prod`, `MonoidHom.range`, `MonoidHom.ker`, etc., used consistently.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp` / `simp_rw`: Extensive use for simplification, especially with `mem_*`, `QuotientGroup.eq_iff_div_mem`, and product/quotient structures.
  - `intro`, `exact`, `refine`, `obtain`: For proof construction and existential instantiation.
  - `rw`: Rewriting using lemmas like `QuotientGroup.ker_mk'`, `comap_map_eq_self`.
  - `ext`: Extensionality for subgroup equality.
  - `convert`: To align goals with known lemmas (e.g., `convert goursatFst_prod_goursatSnd_le`).
- **Advanced/auxiliary**:
  - `have`: Local assumptions (e.g., `have := normal_goursatFst hI₁`).
  - `simpa`: Simplify and discharge using assumptions.
  - `constructor`: For biconditional proofs.
  - `aesop`: Not explicitly used here, but could be for routine group-theoretic reasoning.

---

#### **4. Proof Logic**

- **Structure**:
  1. **Setup**: Assume `I ≤ G × H` with surjective projections.
  2. **Construction**:
     - Define `goursatFst`, `goursatSnd` as mapped kernels.
     - Prove they are normal (via `MonoidHom.ker_normal` and surjectivity).
  3. **Key Equivalence**:
     - Show coset equality in `G ⧸ goursatFst` ↔ coset equality in `H ⧸ goursatSnd`.
     - This ensures the map `x.1 ↦ x.2` descends to a well-defined isomorphism.
  4. **Application of `exists_mulEquiv_range_eq_graph`**:
     - Uses a general result about monoid homomorphisms with surjective domain and codomain to get an isomorphism whose graph matches the image.
  5. **General case (`goursat`)**:
     - Reduce to surjective case by restricting to the image subgroups `G' = I.map fst`, `H' = I.map snd`.
     - Apply `goursat_surjective` to the induced subgroup `I' ≤ G' × H'`.
     - Pull back via subgroup inclusions to recover the original `I`.

- **Inductive/structural reasoning**: No explicit induction; relies on categorical properties of subgroups, quotients, and monoid homomorphisms.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Group.Graph`: For graph-based characterizations of homomorphisms and isomorphisms.
  - `Mathlib.Algebra.Group.Subgroup.Basic`: Basic subgroup operations, maps, kernels, images.
  - `Mathlib.GroupTheory.QuotientGroup.Defs`: Quotient groups, normal subgroups, cosets, `QuotientGroup.mk'`, etc.

- **Domain scope**:
  - Pure group theory (not additive or module-theoretic here, though `to_additive` annotations suggest additive analogues are intended).
  - Focus on subgroups of direct products and their internal structure via quotients.

---

### Summary

This file formalizes **Goursat’s lemma** in Lean 4, a foundational result in group theory describing subgroups of direct products in terms of isomorphisms between quotient groups. It introduces explicit constructions (`goursatFst`, `goursatSnd`) and proves key properties (normality, inclusion, graph-isomorphism correspondence), culminating in both the surjective and general versions of the lemma. The formalization leverages Lean’s algebraic hierarchy and quotient group infrastructure, with heavy use of `simp`-based automation and homomorphism-theoretic reasoning.