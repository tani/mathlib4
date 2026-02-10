### Technical Metadata Brief: `Order.radical` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Order.radical` | `radical (α : Type*) [Preorder α] [OrderTop α] [InfSet α] : α` | Defines the *order radical* as the infimum of all coatoms in a lattice. Generalizes Frattini subgroup (subgroup lattice) and Jacobson radical (ideal lattice). |
| `Order.radical_le_coatom` | `∀ a, IsCoatom a → radical α ≤ a` | States that the radical is below every coatom — immediate from definition of infimum. |
| `OrderIso.map_radical` | `∀ f : α ≃o β, f (radical α) = radical β` | Shows that order isomorphisms preserve the radical — i.e., radical is an *order-theoretic invariant*. |
| `Order.radical_nongenerating` | `∀ a, a ⊔ radical α = ⊤ → a = ⊤` (under `IsCoatomic α`) | In a coatomic lattice, if adding the radical to an element yields the top, then the element was already top. Captures the idea that the radical is “non-generating” — it doesn’t help reach the top unless you’re already there. |

---

#### **2. Naming Conventions**

- **Prefix `Order.`**: All definitions/lemmas are namespaced under `Order`, indicating they live in the order-theoretic context.
- **Suffix `_coatom`**: Used for properties involving coatoms (e.g., `radical_le_coatom`, `radical_nongenerating`).
- **`map_` prefix**: Standard for functors/isomorphisms acting on structures (`map_radical`).
- **`_le_` / `_ge_`**: Standard comparison lemmas (`radical_le_coatom`).
- **`_congr` / `_congr`-style**: Used in `iInf_congr` for equivalence under relabeling.

---

#### **3. Tactic Stack**

- `simp only [...]`: Used to simplify using precise rewrite rules (e.g., `map_iInf`, `iInf_congr`).
- `fapply`: Used to apply a theorem with multiple goals, focusing on the first (e.g., `fapply Equiv.iInf_congr`).
- `obtain (rfl | w)`: Case analysis on a disjunction (here, `eq_top_or_exists_le_coatom`).
- `obtain ⟨m, c, le⟩`: Destructure existential quantifier.
- `rw [...] at *`: Rewriting hypotheses (e.g., `rw [h, top_le_iff] at q`).
- `simpa using ...`: Final simplification using a given fact.

---

#### **4. Proof Logic**

- **Definition-based reasoning**: Most proofs rely on unfolding definitions (`unfold Order.radical`) and applying universal properties (e.g., `biInf_le` for infima).
- **Case analysis**: In `radical_nongenerating`, the coatomic property gives a dichotomy: either `a = ⊤` or `a ≤ m` for some coatom `m`. This is leveraged via `eq_top_or_exists_le_coatom`.
- **Monotonicity & lattice identities**: Supremum monotonicity (`sup_le`) and top-element properties (`top_le_iff`) are central.
- **Functoriality**: For `map_radical`, the proof uses that order isomorphisms commute with infima (`map_iInf`) and that equivalence preserves indexed infima (`iInf_congr`).

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Order.CompleteLattice`: Provides `CompleteLattice`, `iInf`, `sup`, `top`, etc.
  - `Mathlib.Order.Atoms`: Provides `IsCoatom`, `IsCoatomic`, foundational coatom-related lemmas.

- **Domain scope**: Lattice theory, especially *coatomic* lattices (where every element ≤ top is below a coatom). Applications include:
  - Group theory: Subgroup lattice → Frattini subgroup.
  - Ring theory: Ideal lattice → Jacobson radical.
  - More generally: Any coatomic complete lattice.

---

Let me know if you'd like a formalized summary in a `README.md`-style docstring or a module-level comment template.