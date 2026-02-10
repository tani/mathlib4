Here's a structured technical metadata extraction for the provided Lean 4 file on the **Class Equation**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConjClasses G` | Type | Type of conjugacy classes of group `G`, defined via `MulAction` (via `ConjClasses.mk : G → ConjClasses G`) |
| `carrier` | `ConjClasses G → Set G` | The underlying set of a conjugacy class |
| `noncenter G` | `Set (ConjClasses G)` | Subset of conjugacy classes *not* contained in the center (i.e., nontrivial conjugacy classes) |
| `sum_conjClasses_card_eq_card` | `[Fintype (ConjClasses G)] → [Fintype G] → (∀ x, Fintype x.carrier) → ∑ x, x.carrier.toFinset.card = Fintype.card G` | States that the disjoint union of conjugacy classes bijects with `G`; hence sum of sizes = group order |
| `Group.sum_card_conj_classes_eq_card` | `[Finite G] → ∑ᶠ x, x.carrier.ncard = Nat.card G` | Finitary version using `∑ᶠ` (fintype-independent cardinal sum) |
| `Group.nat_card_center_add_sum_card_noncenter_eq_card` | `[Finite G] → Nat.card (center G) + ∑ᶠ x ∈ noncenter G, Nat.card x.carrier = Nat.card G` | **Class equation**: group order = center size + sum of nontrivial conjugacy class sizes |
| `Group.card_center_add_sum_card_noncenter_eq_card` | `[Group G] → [∀ x, Fintype x.carrier] → [Fintype G] → [Fintype (center G)] → [Fintype (noncenter G)] → Fintype.card (center G) + ∑ x ∈ (noncenter G).toFinset, x.carrier.toFinset.card = Fintype.card G` | Fintype-based variant of the class equation (uses `Fintype.card` instead of `Nat.card`) |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `sum_...`: Summation over conjugacy classes.
  - `card_...`: Relates to cardinalities (`Fintype.card`, `Nat.card`).
  - `noncenter`: Refers to non-central (i.e., nontrivial) conjugacy classes.
- **Suffixes**:
  - `_eq_card`: Indicates equality with group order.
  - `_center`: Pertains to the center subgroup.
- **Module-level**:
  - `Group.` prefix for theorems (e.g., `Group.nat_card_center_add_sum_card_noncenter_eq_card`).
  - `ConjClasses` used for type and operations on conjugacy classes.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification with definitional lemmas (e.g., `Set.toFinset_card`, `Finset.mem_sdiff`).
- `convert`: Adjusting goals using definitional equality or congruence.
- `rw`: Rewriting using equalities (e.g., `Nat.card_eq_fintype_card`, `Set.toFinset_compl`).
- `congr`: Splitting equalities of sums/products.
- `exact`, `refine`, `swap`: Goal management and proof construction.
- `cases`: Eliminating `Nonempty` or `Fintype` instances.
- `convert ... using 2`: Fine-grained control over which argument to match.
- `finsum_eq_sum_of_fintype`, `finsum_cond_eq_sum_of_cond_iff`: Bridging finsum and finite sums.

---

### **4. Proof Logic**

- **High-level strategy**:
  1. **Partition argument**: Use `Equiv.sigmaFiberEquiv` to show `Σ x : ConjClasses G, x.carrier ≃ G`, yielding the base sum identity.
  2. **Center + noncenter decomposition**: Split conjugacy classes into central (singleton classes) and noncentral ones via `Finset.sum_sdiff`.
  3. **Cardinality conversions**: Translate between `Nat.card`, `Fintype.card`, and set-theoretic cardinalities (`ncard`, `toFinset.card`).
  4. **Singleton class characterization**: Show that a conjugacy class has size 1 iff its representative lies in the center (`⟨g⟩` singleton ↔ `g ∈ center G`).
  5. **Fintype vs. Finite**: Use `nonempty_fintype` to switch between finite and fintype settings.

- **Key logical step**:
  - Use `mk_bijOn G` (from `ConjFinite`) to relate center to complement of noncenter classes.
  - Prove `x.carrier.ncard = 1 ↔ x ∈ (noncenter G)ᶜ` via `Set.not_nontrivial_iff` and properties of conjugacy classes.

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Finprod` | For `∑ᶠ`, finsum machinery |
| `Mathlib.Algebra.Group.ConjFinite` | `ConjClasses`, `mk_bijOn`, conjugacy class structure |
| `Mathlib.Algebra.Group.Subgroup.Finite` | Finiteness lemmas for subgroups |
| `Mathlib.Data.Set.Card` | `ncard`, `toFinset_card`, cardinal arithmetic |
| `Mathlib.GroupTheory.Subgroup.Center` | `Subgroup.center`, basic properties |

**Domain scope**: Finite group theory, group actions (conjugation), partitioning via orbits (conjugacy classes), and combinatorial group theory.

--- 

Let me know if you'd like a diagram of the proof dependencies or a tactic trace for a specific theorem.