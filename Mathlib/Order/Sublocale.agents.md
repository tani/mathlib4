### Technical Metadata Brief: `Sublocale.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Sublocale X` | `structure` | A sublocale of a frame `X` is a subset closed under all meets and Heyting implication. |
| `Sublocale.carrier` | `Set X` | Underlying set of a sublocale. |
| `Sublocale.sInf_mem'` | `∀ s ⊆ carrier, sInf s ∈ carrier` | Closure under arbitrary meets (internal axiom). |
| `Sublocale.himp_mem'` | `∀ a b, b ∈ carrier → a ⇨ b ∈ carrier` | Closure under Heyting implication (internal axiom). |
| `Sublocale.restrict S` | `FrameHom X S` | The *restriction map* from `X` to sublocale `S`, sending `x ↦ ⨅{s : S | x ≤ s}`. |
| `Sublocale.toNucleus S` | `Nucleus X` | The nucleus associated to sublocale `S`, defined via `restrict`. |
| `Nucleus.toSublocale n` | `Sublocale X` | The sublocale given by the range of nucleus `n`. |
| `nucleusIsoSublocale` | `(Nucleus X)ᵒᵈ ≃o Sublocale X` | Order-isomorphism between opposite nuclei and sublocales (duality). |
| `Sublocale.instCompleteLattice` | `CompleteLattice (Sublocale X)` | Sublocales form a complete lattice (via isomorphism with nuclei). |
| `Sublocale.instCoframe` | `Order.Coframe (Sublocale X)` | Sublocales form a coframe (dual of a frame). |

---

#### **2. Naming Conventions**

- **Structure fields**: `'` suffix for internal axioms (`sInf_mem'`, `himp_mem'`), no `'` for projections (`sInf_mem`, `himp_mem`).
- **Helper/auxiliary definitions**: `Aux` suffix (`restrictAux`, `giAux`).
- **Public-facing wrappers**: no `'`, often prefixed by type/class (`restrict`, `toNucleus`, `toSublocale`).
- **Simp lemmas**: `coe_`, `mk_`, `mem_`, `le_`, `map_`, `range_`, `to_`, `of_`.
- **Duality indicators**: `ofDual`, `toDual`, `ᵒᵈ` in isomorphisms.

---

#### **3. Tactic Stack**

Frequently used tactics:
- `simp` / `simp_rw` (especially with `contextual`, `norm_cast`, `ext`)
- `rw` / `change`
- `exact`, `intro`, `cases`
- `apply`, `refine`, `le_antisymm`
- `set_option backward.privateInPublic true` (for internal proofs)
- `ext`, `congr`, ` rfl`
- `calc` for chain reasoning
- `by simp +contextual [...]` for advanced simplification in subtype contexts

---

#### **4. Proof Logic**

- **Structure proofs**:
  - Use `ext` to prove equality of sublocales via membership.
  - Use `SetLike.ext` and `subtype.ext` for equality of subtype elements.
- **Lattice/frame constructions**:
  - Lift structure from `X` to `S` via `Subtype.*` instances (`semilatticeInf`, `orderTop`, `completeLatticeOfInf`).
  - Verify closure properties using `sInf_mem`, `himp_mem`.
- **Galois insertion proofs**:
  - Define `giAux` with `choice`, `gc`, `le_l_u`, `choice_eq`.
  - Use `giRestrict` to lift to `FrameHom` and prove frame homomorphism properties (`map_inf'`, `map_sSup'`, `map_top'`).
- **Nucleus ↔ Sublocale duality**:
  - Prove `range_toNucleus`, `restrict_toSublocale`, then show `nucleusIsoSublocale` is an order-isomorphism.
  - Use `← Nucleus.range_subset_range`, `SetLike.coe_subset_coe`, and `ext` for equivalence.

---

#### **5. Imports**

- `Mathlib.Order.Nucleus`: Defines nuclei on frames (idempotent, meet-preserving, inflationary endomorphisms).
- `Mathlib.Order.SupClosed`: Provides infrastructure for subsets closed under suprema (dual to `InfClosed` used here).

---

#### **6. Theory Overview & Dependencies**

##### **Dependency Diagram (Mermaid)**

```mermaid
graph TD
  A[Frame X] --> B[Nucleus X]
  A --> C[Sublocale X]
  B --> D[(Nucleus X)ᵒᵈ]
  C --> D
  D -- nucleusIsoSublocale --> C
  B -- toSublocale --> C
  C -- toNucleus --> B
  C --> E[CompleteLattice]
  C --> F[Coframe]
  B --> G[FrameHom X S]
  G --> H[Restriction Maps]
```

##### **Overview of File Structure**

1. **Introduction & Motivation**  
   - Sublocales generalize subspaces in point-free topology.
   - Duality with locales → frames → sublocales ↔ nuclei.

2. **Sublocale Definition**  
   - `structure Sublocale` with carrier, closure under meets and implication.

3. **Sublocale as a Lattice**  
   - `SetLike`, `PartialOrder`, `CompleteLattice`, `Coframe` instances.
   - Subtype structure inherits Heyting algebra / frame structure.

4. **Restriction Map & Galois Insertion**  
   - `restrict S : FrameHom X S` defined via meets over upper bounds in `S`.
   - `giRestrict S : GaloisInsertion (restrict S) (subtype.val)`.

5. **Nucleus ↔ Sublocale Correspondence**  
   - `toNucleus`, `toSublocale` are mutual inverses up to duality.
   - `nucleusIsoSublocale : (Nucleus X)ᵒᵈ ≃o Sublocale X`.

6. **Consequences**  
   - Sublocales inherit coframe structure.
   - Duality with nuclei yields categorical insights (e.g., sublocale lattice is co-frame).

---

#### **7. Key Lemmas & Their Roles**

| Lemma | Role |
|-------|------|
| `restrict_of_mem` | Shows restriction fixes elements of `S`. |
| `range_toNucleus` | Identifies range of nucleus with sublocale. |
| `toNucleus_le_toNucleus` | Encodes dual ordering: `S ≤ T ⇔ toNucleus T ≤ toNucleus S`. |
| `restrict_toSublocale` | Connects restriction with nucleus action. |
| `nucleusIsoSublocale` | Central theorem: sublocales ≃ opposite nuclei. |

---

#### **8. Future Work (from TODO)**

- Separate `sInf_mem` and `HImpClosed` definitions for reuse (e.g., in `CompleteSublattice`).
- Possibly formalize sublocale morphisms or categorical aspects (e.g., locale morphisms as frame homs in opposite category).

--- 

This file formalizes a foundational bridge between point-free topology (locales/frames) and order-theoretic logic (nuclei), with a focus on categorical duality and lattice-theoretic structure.
