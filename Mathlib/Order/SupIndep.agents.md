### Technical Brief: Supremum Independence in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `Finset.SupIndep s f` | `Prop` | Finite-indexed family `f : ι → α` is *supremum independent* on finite set `s : Finset ι` if for all `t ⊆ s`, `i ∈ s \ t`, `f i` is disjoint from `⊔_{j ∈ t} f j`. Avoids `erase` to avoid decidability assumptions. |
| `sSupIndep s` | `Prop` | A set `s : Set α` in a complete lattice is *supremum independent* if each `a ∈ s` is disjoint from `sSup (s \ {a})`. |
| `iSupIndep f` | `Prop` | An indexed family `f : ι → α` is *supremum independent* if each `f i` is disjoint from `⨆_{j ≠ i} f j`. |
| `Finset.supIndep_iff_pairwiseDisjoint` | `s.SupIndep f ↔ s.PairwiseDisjoint f` | In a **distributive lattice**, supremum independence ⇔ pairwise disjointness. |
| `CompleteLattice.sSupIndep_iff_pairwiseDisjoint` | `sSupIndep s ↔ s.PairwiseDisjoint id` | Same for sets in a **complete lattice** (frame or distributive). |
| `CompleteLattice.iSupIndep_iff_pairwiseDisjoint` | `iSupIndep f ↔ Pairwise (Disjoint on f)` | Same for indexed families in a **frame** (or distributive complete lattice). |
| `Finset.SupIndep.pairwiseDisjoint` | `s.SupIndep f → s.PairwiseDisjoint f` | Supremum independence ⇒ pairwise disjointness (holds in any lattice with ⊥). |
| `Finset.supIndep_pair` | `({i, j}).SupIndep f ↔ Disjoint (f i) (f j)` | Characterization for binary sets (requires `i ≠ j`). |
| `Finset.supIndep_univ_bool` / `Finset.supIndep_univ_fin_two` | `univ.SupIndep f ↔ Disjoint (f false) (f true)` / `Disjoint (f 0) (f 1)` | Special cases for `Bool` and `Fin 2`. |
| `Finset.SupIndep.sup` / `biUnion` / `sigma` / `product` | Bind operations for `SupIndep` | Generalize independence under set-theoretic constructions (e.g., `s.sup g`, `s.biUnion g`, `s.sigma g`, `s ×ˢ t`). |
| `iSupIndep.supIndep'` | `iSupIndep f → s.SupIndep f` | Indexed-family independence implies finite subset independence. |
| `iSupIndep_iff_supIndep_univ` | `[Fintype ι] ⇒ iSupIndep f ↔ univ.SupIndep f` | Equivalence between indexed and finite-universe independence. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `supIndep_`, `SupIndep_`: For finite sets (`Finset`).
  - `sSupIndep_`: For arbitrary sets (`Set`).
  - `iSupIndep_`: For indexed families (`ι → α`).
- **Suffixes**:
  - `_iff_pairwiseDisjoint`: Equivalence with pairwise disjointness (in distributive/frame settings).
  - `_pairwiseDisjoint`: One-direction implication (always holds).
  - `_iff_disjoint_erase`: Alternative definition using `erase` (requires `DecidableEq`).
- **Aliases**:
  - Deprecated aliases (e.g., `SetIndependent`, `Independent`) marked with `@[deprecated (since := "2024-11-24")]`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: Rewriting and simplification (especially with `sup`, `iSup`, `disjoint`, `sSup`).
- `aesop`: Automated reasoning for first-order logic (e.g., in `iSupIndep_def''`).
- `exact`, `refine`, `convert`: Constructing proofs with partial information.
- `intro`, `cases`, `obtain`, `rintro`: Intro/elimination of quantifiers and disjunctions.
- `by_contra`, `contradiction`: Proof by contradiction.
- `ext`: Extensionality for sets/functions.
- `apply`, `mono`, `mono_right`, `mono_left`: Monotonicity reasoning (especially for `≤`, `sup`, `sSup`).
- `convert ... using n`: Flexibility in matching goals with hypotheses.
- `classical`: For classical reasoning (e.g., decidability assumptions).
- `haveI : DecidableEq ι := Classical.decEq _`: Explicitly importing decidability.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-directional strategy** (`↔`):
    - **→**: Use definition of `SupIndep`/`iSupIndep`/`sSupIndep` to derive disjointness of arbitrary pairs.
    - **←**: Assume pairwise disjointness and use lattice properties (e.g., `disjoint_sup_right`, `disjoint_iSup_iff`) to show full independence.
- **Induction**:
  - `Finset.induction_on` used for finite-set properties (e.g., `supIndep_antimono_fun`, `supIndep_pair`).
- **Case analysis**:
  - `eq_or_ne`, `or.elim`, `sum.elim` for handling equality/inequality of indices.
- **Monotonicity & lattice lemmas**:
  - `sup_mono`, `iSup_mono`, `disjoint_sSup_right`, `disjoint_iSup_iff` are heavily used to lift disjointness from subsets to suprema.
- **Equational reasoning**:
  - `sup_eq_iSup`, `sSup_image`, `sup_image`, `sup_singleton`, `sup_empty`, `iSup_subtype`, `iSup_and`, etc., used to rewrite suprema into equivalent forms.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Data.Finset.Sigma`: For `sigma`, `biUnion`, `image`, `map`.
- `Mathlib.Data.Finset.Pairwise`: For `PairwiseDisjoint`.
- `Mathlib.Data.Finset.Powerset`: Not directly used, but likely for related set operations.
- `Mathlib.Data.Fintype.Basic`: For `Fintype`, `univ`, `Fin 2`, `Bool`.
- `Mathlib.Order.CompleteLatticeIntervals`: For `CompleteLattice`, `OrderBot`, `DistribLattice`, `Frame`.

**Scope**:
- Lattices with bottom (`OrderBot`), distributive lattices, complete lattices, and frames.
- Focus on **disjointness** and **supremum decomposition** in ordered algebraic structures.
- Applications include linear algebra (subspace independence), module theory (direct sum embeddings), and topology (open set independence).

--- 

This module formalizes a foundational concept in lattice theory with strong ties to linear algebra and measure theory, emphasizing the equivalence (in distributive settings) between independence and pairwise disjointness.