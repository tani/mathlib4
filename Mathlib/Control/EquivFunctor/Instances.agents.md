**Technical Metadata Brief: `EquivFunctor` Instances in Lean 4**

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `EquivFunctorUnique` | Instance `EquivFunctor Unique` — maps equivalences to unique-element type congruences via `Equiv.uniqueCongr`. Ensures `equiv_rw` can rewrite under `Unique`. |
| `EquivFunctorPerm` | Instance `EquivFunctor Perm` — maps an equivalence `e : α ≃ β` and permutation `p : Perm α` to the conjugated permutation `e⁻¹ ∘ p ∘ e` on `β`. Enables rewriting permutations under equivalences. |
| `EquivFunctorFinset` | Instance `EquivFunctor Finset` — maps `e : α ≃ β` and `s : Finset α` to `s.map e.toEmbedding`. Provides a *computable* alternative to the classical lawful functor instance. Enables `equiv_rw` on finite sets. |
| `EquivFunctorFintype` | Instance `EquivFunctor Fintype` — maps `e : α ≃ β` (with `β` finite) to `Fintype.ofBijective e e.bijective`. Allows rewriting finiteness structure under equivalences. |

*Note:* All instances satisfy the `EquivFunctor` interface: `map_refl'` and `map_trans'` proofs ensure coherence with identity and composition of equivalences.

---

### **2. Naming Conventions**

- **Prefixes / Suffixes:**
  - `EquivFunctor*` — naming pattern for `EquivFunctor` instances.
  - `map` — used uniformly for the action of an equivalence on the structure.
  - `map_refl'`, `map_trans'` — standard suffixes for coherence proofs in `EquivFunctor`.
- **Helper functions:**
  - `toEmbedding` — used to extract an embedding from an equivalence for `Finset.map`.
  - `uniqueCongr` — canonical congruence for unique types.
  - `ofBijective` — constructs a `Fintype` from a bijective map.

---

### **3. Tactic Stack**

- **Core tactics used:**
  - `ext` — extensionality (to prove equality of functions/sets).
  - `simp` — simplification, often with lemmas like `eq_iff_true_of_subsingleton`, `h'`, or `ha₁`, `ha₂`.
  - `constructor` — for biconditional or existential goals (e.g., in `Finset` case).
  - `intro` / `intro h'` — to unpack hypotheses.
  - `rw` — rewriting using equalities (e.g., `← ha₂`).
  - `apply`, `exists` — for existential introduction (especially in `Finset` proof).
  - `simp [h']` — to discharge goals using hypotheses.

*No heavy automation (e.g., `aesop`, `ring`, `linarith`) is used — proofs are mostly structural and rely on `simp`-based reasoning.*

---

### **4. Proof Logic**

- **Pattern:**  
  Proofs follow a standard *extensionality + simplification* strategy:
  1. **Extensionality (`ext`)** to reduce to pointwise equality.
  2. **Simplification (`simp`)** using properties of equivalences (e.g., `symm_trans_apply`, `trans_symm`, etc.).
  3. For `Finset`, a detailed element-wise argument:
     - Use `ext _ a` to introduce an element `a : β`.
     - Split biconditional with `constructor`.
     - Forward direction: unpack witness using `h'` and rewrite.
     - Reverse direction: construct witness using `Equiv.symm` and `simp`.
- **Induction is not used** — all proofs are direct and rely on definitional properties of equivalences and the structures involved.

---

### **5. Imports**

- `Mathlib.Data.Fintype.Basic`  
  → Provides `Fintype`, `ofBijective`, and basic finiteness reasoning.
- `Mathlib.Control.EquivFunctor`  
  → Defines the `EquivFunctor` typeclass and `equiv_rw` infrastructure.

*No additional dependencies (e.g., `Mathlib.Data.Finset.Basic`, `Mathlib.Data.Perm.Basic`) are imported directly — their usage is via the `EquivFunctor` interface and `Equiv` namespace.*

--- 

**Summary:** This file formalizes *computable* and *coherent* `EquivFunctor` instances for `Unique`, `Perm`, `Finset`, and `Fintype`, enabling `equiv_rw`-based rewriting under these type constructors. Proofs are lightweight, extensionality-driven, and rely on `simp`-based automation.