Here's a structured technical brief extracted from the provided Lean 4 file on **nilpotent groups**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `upperCentralSeriesStep H` | `Subgroup G` | Preimage of `center (G ⧸ H)` under quotient map; used to build the upper central series. |
| `upperCentralSeries G n` | `ℕ → Subgroup G` | The `n`-th term of the upper central series: `H₀ = ⊥`, `Hₙ₊₁ / Hₙ = center(G / Hₙ)`. |
| `lowerCentralSeries G n` | `ℕ → Subgroup G` | The `n`-th term of the lower central series: `H₀ = ⊤`, `Hₙ₊₁ = ⁅Hₙ, G⁆`. |
| `IsNilpotent G` | `Prop` | `G` is nilpotent iff `∃ n, upperCentralSeries G n = ⊤`. |
| `nilpotencyClass G` | `ℕ` | Minimal `n` such that `upperCentralSeries G n = ⊤`. |
| `IsAscendingCentralSeries H` | `Prop` | `H₀ = ⊥` and `⁅Hₙ₊₁, G⁆ ⊆ Hₙ`. |
| `IsDescendingCentralSeries H` | `Prop` | `H₀ = ⊤` and `⁅Hₙ, G⁆ ⊆ Hₙ₊₁`. |

#### **Main Theorems**
| Name | Statement |
|------|-----------|
| `nilpotent_iff_finite_ascending_central_series` | `G` nilpotent ⇔ ∃ ascending central series reaching `⊤`. |
| `nilpotent_iff_finite_descending_central_series` | `G` nilpotent ⇔ ∃ descending central series reaching `⊥`. |
| `nilpotent_iff_lowerCentralSeries` | `G` nilpotent ⇔ `lowerCentralSeries G n = ⊥` for some `n`. |
| `upperCentralSeries_nilpotencyClass` | `upperCentralSeries G (nilpotencyClass G) = ⊤`. |
| `lowerCentralSeries_nilpotencyClass` | `lowerCentralSeries G (nilpotencyClass G) = ⊥`. |
| `nilpotencyClass_quotient_center` | `nilpotencyClass (G ⧸ center G) = nilpotencyClass G - 1`. |
| `IsNilpotent.to_isSolvable` | Nilpotent ⇒ solvable. |
| `Subgroup.isNilpotent`, `nilpotent_quotient_of_nilpotent`, `nilpotent_of_surjective`, `nilpotent_of_mulEquiv` | Closure properties: subgroups, quotients, images, isomorphisms preserve nilpotency. |
| `nilpotencyClass_le_of_surjective`, `Subgroup.nilpotencyClass_le`, `nilpotencyClass_quotient_le` | Nilpotency class behaves monotonically under surjections, subgroups, quotients. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `upperCentralSeries`, `lowerCentralSeries`: denote the canonical series.
  - `isNilpotent`, `IsNilpotent`: predicate for nilpotency.
  - `nilpotencyClass`: function returning class.
  - `ascending`, `descending`: for general central series predicates.
- **Suffixes**:
  - `_step`: building block for upper central series.
  - `_le_`: monotonicity lemmas (e.g., `nilpotencyClass_le_of_surjective`).
  - `_eq_`: characterizations or equalities (e.g., `nilpotencyClass_quotient_center`).
  - `_iff_`: equivalence theorems (e.g., `nilpotent_iff_lowerCentralSeries`).
- **`mem_` / `comap_` / `map_`**: membership or behavior under homomorphisms.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `ext`, `apply`, `exact`, `intro`, `cases'`
- `group` (for simplifying group expressions)
- `ring` (for additive-like simplifications in abelian contexts)
- `apply_fun`, `convert`, `induction'`
- `closure_induction`, `commutator_le`, `mem_upperCentralSeries_succ_iff`
- `Nat.find_spec`, `Nat.find_le`, `Nat.find_mono`, `le_antisymm`
- `mul_mem`, `inv_mem`, `one_mem`, `Subgroup.normal_of_characteristic`
- `QuotientGroup.mk_surjective`, `MonoidHom.range_eq_map`, `Subgroup.comap_top`

---

### **4. Proof Logic**

- **Induction** on `n : ℕ` is standard for series properties (e.g., monotonicity, inclusion lemmas).
- **Equivalence proofs** (`↔`) often use:
  - `nilpotent_iff_*` to reduce to existence of finite central series.
  - `Nat.find_spec` / `Nat.find_le` for class-related equalities.
- **Inclusion arguments** rely on:
  - `ascending_central_series_le_upper`, `descending_central_series_ge_lower`.
  - `commutator_mem_commutator`, `lowerCentralSeries_antitone`.
- **Quotient arguments** use:
  - `comap_upperCentralSeries_quotient_center` to relate series across quotients.
  - `QuotientGroup.comap_comap_center` for central series behavior under successive quotients.
- **Class minimality** is handled via `Nat.find_min'` and monotonicity of `find`.

---

### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.GroupTheory.Solvable`
- `Mathlib.GroupTheory.Sylow`
- `Mathlib.Algebra.Group.Subgroup.Order`
- `Mathlib.GroupTheory.Commutator.Finite`

These indicate the formalization builds on:
- Solvability theory,
- Sylow theory (for broader group context),
- Subgroup arithmetic and order,
- Commutator subgroup machinery.

---

Let me know if you'd like a diagram of the series relationships or a summary of the API for working with nilpotent groups in Lean.