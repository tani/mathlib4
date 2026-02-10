Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Birkhoff Representation in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `InfIrred s` | `s : UpperSet α` is *inf-irreducible*: `s ≠ ⊤` and `s ≤ t ⊔ u ⇒ s ≤ t ∨ s ≤ u`. Used to characterize minimal non-top upper sets. |
| `SupIrred s` | `s : LowerSet α` is *sup-irreducible*: `s ≠ ⊥` and `t ⊔ u ≤ s ⇒ t ≤ s ∨ u ≤ s`. Used to characterize maximal non-bot lower sets. |
| `OrderEmbedding.supIrredLowerSet` | `α ↪o {s : LowerSet α // SupIrred s}` — Embedding of a finite poset into sup-irreducible lower sets via `a ↦ Iic a`. |
| `OrderEmbedding.infIrredUpperSet` | `α ↪o {s : UpperSet α // InfIrred s}` — Dual embedding via `a ↦ Ici a`. |
| `OrderIso.supIrredLowerSet` | `α ≃o {s : LowerSet α // SupIrred s}` — Isomorphism for finite posets (surjectivity + embedding ⇒ equivalence). |
| `OrderIso.infIrredUpperSet` | `α ≃o {s : UpperSet α // InfIrred s}` — Dual isomorphism. |
| `OrderIso.lowerSetSupIrred` | `α ≃o LowerSet {a : α // SupIrred a}` — **Birkhoff Representation for finite distributive lattices**: `α` ≅ lower sets of its sup-irreducible elements. |
| `OrderEmbedding.birkhoffSet` | `α ↪o Set {a : α // SupIrred a}` — Explicit embedding into powerset of sup-irreducibles. |
| `OrderEmbedding.birkhoffFinset` | `α ↪o Finset {a : α // SupIrred a}` — Same, but into finite subsets (via `Fintype.finsetOrderIsoSet`). |
| `LatticeHom.birkhoffSet`, `LatticeHom.birkhoffFinset` | Injective lattice homomorphisms `α →ₐ Set (...)`, `α →ₐ Finset (...)`. |
| `exists_birkhoff_representation` | `∃ β, DecidableEq β, Fintype β, f : LatticeHom α (Finset β), Injective f` — Abstract existence of Birkhoff embedding, avoiding decidability issues. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `supIrred`, `infIrred`: denote (sup/inf)-irreducible elements.
  - `birkhoff`: used for embeddings/isomorphisms related to Birkhoff representation.
  - `Iic`, `Ici`: standard notation for lower/upper closures (`↓a`, `↑a`).
- **Suffixes**:
  - `_apply`: lemma stating definition’s action on an element.
  - `_surjective`, `_injective`: properties of embeddings/isomorphisms.
  - `_symm_apply`: action of inverse of an isomorphism.
- **Structure**:
  - `OrderEmbedding.*`, `OrderIso.*`, `LatticeHom.*`: categorically structured embeddings/isomorphisms/homomorphisms.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop`: for automated reasoning (e.g., surjectivity proofs).
- `simp`: heavy use, especially with `@[simp]` lemmas for `supIrred`, `infIrred`, and embeddings.
- `rw`, `exact`, `refine`: standard proof scripting.
- `ext`: extensionality for set equality.
- `cases`, `obtain`: for destructuring existential hypotheses (e.g., `exists_minimal_wrt`, `exists_supIrred_decomposition`).
- `dsimp`, `convert`: for simplifying and aligning definitions.
- `have`, `by_cases`: for auxiliary assumptions (e.g., `by_cases h : IsEmpty α`).
- `classical`: for classical reasoning (e.g., in `lowerSetSupIrred` and `exists_birkhoff_representation`).

#### **4. Proof Logic**

- **Structure**:
  1. **Characterization lemmas** (`infIrred_Ici`, `supIrred_Iic`, `infIrred_iff_of_finite`, `supIrred_iff_of_finite`) establish that in finite posets, irreducible (upper/lower) sets are exactly principal (co)principal filters.
  2. **Embeddings** (`supIrredLowerSet`, `infIrredUpperSet`) are defined via `a ↦ Iic a` / `Ici a`, and shown to be order-embeddings using `map_rel_iff'`.
  3. **Surjectivity** is proved using extremal element arguments (minimal/maximal w.r.t. identity on finite sets), then `RelIso.ofSurjective` upgrades embeddings to isomorphisms.
  4. **Distributive lattice case**:
     - Uses *sup-irreducible decomposition* (`exists_supIrred_decomposition` — assumed or provable in distributive lattices).
     - Defines isomorphism `α ≃ LowerSet (SupIrred α)` via:
       - `a ↦ ↓a ∩ SupIrred(α)`
       - inverse: finite sup of sup-irreducibles in a lower set.
     - Proves lattice homomorphism properties (preserves `⊔`, `⊓`) for `birkhoffSet`/`birkhoffFinset`.
- **Decidability handling**:
  - `[@DecidablePred α SupIrred]` is assumed for definability of `Finset`-based embeddings.
  - `exists_birkhoff_representation` avoids explicit decidability by abstracting over `β`.

#### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Order.Interval.Finset.Basic`: finite intervals, `Finset`-based constructions.
- `Mathlib.Data.Fintype.Order`: finite types with order-theoretic structure.
- `Mathlib.Order.Irreducible`: definitions of `SupIrred`, `InfIrred`.
- `Mathlib.Order.UpperLower.Basic`: upper/lower sets, closures, duality.

---

This file formalizes the *object-level* part of finite Stone duality: the equivalence between finite distributive lattices and finite posets (via lower sets and sup-irreducibles). It avoids morphism-level functoriality (a TODO), focusing on representation and embedding theorems.