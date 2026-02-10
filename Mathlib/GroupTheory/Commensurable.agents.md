Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Commensurable H K` | `Subgroup G → Subgroup G → Prop` | Defines that `H ∩ K` has finite index in both `H` and `K` (via `relindex ≠ 0`). |
| `Commensurable.refl` | `Commensurable H H` | Reflexivity of commensurability. |
| `Commensurable.symm` | `Commensurable H K → Commensurable K H` | Symmetry of commensurability. |
| `Commensurable.trans` | `Commensurable H K → Commensurable K L → Commensurable H L` | Transitivity of commensurability. |
| `Commensurable.equivalence` | `Equivalence (@Commensurable G _)` | Proves commensurability is an equivalence relation. |
| `quotConjEquiv H K g` | `K ⧸ H.subgroupOf K ≃ (g • K).1 ⧸ (g • H).subgroupOf (g • K)` | Equiv of quotient sets under conjugation action. |
| `commensurable_conj` | `Commensurable H K ↔ Commensurable (g • H) (g • K)` | Conjugation preserves/reflects commensurability. |
| `commensurable_inv` | `Commensurable (g • H) H ↔ Commensurable H (g⁻¹ • H)` | Relates conjugation by `g` and `g⁻¹`. |
| `commensurator' H` | `Subgroup (ConjAct G)` | Subgroup of `ConjAct G` where `g • H` is commensurable with `H`. |
| `commensurator H` | `Subgroup G` | Preimage of `commensurator' H` under `ConjAct.toConjAct`, i.e., elements `g ∈ G` s.t. `gHg⁻¹` is commensurable with `H`. |
| `commensurator'_mem_iff` | `g ∈ commensurator' H ↔ Commensurable (g • H) H` | Membership criterion for `commensurator'`. |
| `commensurator_mem_iff` | `g ∈ commensurator H ↔ Commensurable (ConjAct.toConjAct g • H) H` | Membership criterion for `commensurator`. |
| `Commensurable.eq` | `Commensurable H K → commensurator H = commensurator K` | Commensurable subgroups have equal commensurators. |

---

### **2. Naming Conventions**

- **Predicates**: `Commensurable` (capitalized, noun-like), `is_`-style not used.
- **Properties**: `refl`, `symm`, `trans`, `comm` (short for commutativity of ↔), `equivalence`.
- **Constructions**: `quotConjEquiv`, `commensurator'`, `commensurator`.
- **Membership lemmas**: `*_mem_iff` suffix (e.g., `commensurator'_mem_iff`).
- **Equivalence lemmas**: `*_iff` suffix (e.g., `commensurable_conj`).
- **Action notation**: `g • H` for conjugation action of `ConjAct G` on subgroups.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp [Commensurable]` — simplification using definition.
- `rw [...]` — rewriting using equivalences/membership lemmas.
- `exact`, `trans`, `and_congr`, `iff_congr` — logical manipulation.
- `dsimp`, `rw [← Quotient.eq'', ...]` — quotient/equiv reasoning.
- `rwa [...]` — rewrite + assumption.
- `Subgroup.ext` — extensionality for subgroups.
- `Cardinal.toNat_congr`, `Eq.congr_left` — cardinal arithmetic reasoning.

---

### **4. Proof Logic**

- **Reflexivity/Symmetry**: Immediate from definition (`simp`, `and_comm`).
- **Transitivity**: Uses `Subgroup.relindex_ne_zero_trans` on both indices.
- **Equivalence**: Combines `refl`, `symm`, `trans`.
- **Conjugation invariance**: Uses `quotConjEquiv` to show quotient sizes (indices) are preserved under conjugation, via `Cardinal.toNat_congr`.
- **Commensurator properties**: Proven by unfolding definitions and applying `trans`, `symm`, and `commensurable_conj`.
- **Equality of commensurators**: Uses `Subgroup.ext` and conjugation invariance (`commensurable_conj`) to show membership equivalence.

---

### **5. Imports**

- `Mathlib.GroupTheory.Index`: Provides `relindex`, finite index reasoning, and quotient group machinery.
- Implicitly relies on:
  - `Mathlib.GroupTheory.ConjAct`: For `ConjAct G`, `•` action, `toConjAct`.
  - `Mathlib.GroupTheory.Pointwise`: For `subgroupOf`, `quotient`, `Quotient.congr`, etc.
  - Core Lean/Mathlib: `Subgroup`, `QuotientGroup`, `Cardinal`, `Equivalence`.

---

Let me know if you'd like a visual dependency graph or a formalization roadmap for extending this file.