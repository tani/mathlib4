Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FixedPointFree` | `[One G] → (G → G) → Prop` | Defines a function `φ` as *fixed-point-free* if `φ g = g ⇒ g = 1`. |
| `commutatorMap` | `[Div G] → G → G` | Maps `g ↦ g / φ g`; generalizes commutators when `φ` is conjugation. |
| `commutatorMap_injective` | `FixedPointFree φ → Function.Injective (commutatorMap φ)` | Injectivity of the commutator map under fixed-point-freeness. |
| `commutatorMap_surjective` | `[Finite G] → FixedPointFree φ → Function.Surjective (commutatorMap φ)` | Surjectivity follows from injectivity + finiteness. |
| `prod_pow_eq_one` | `FixedPointFree φ → φ^[n] = id → ((List.range n).map (φ^[k] g)).prod = 1` | Product of iterates of `g` under `φ` is `1` when `φ^n = id`. |
| `coe_eq_inv_of_sq_eq_one` | `FixedPointFree φ → φ^[2] = id → φ = inv` | If `φ² = id`, then `φ(g) = g⁻¹`. |
| `coe_eq_inv_of_involutive` | `FixedPointFree φ → Involutive φ → φ = inv` | Same as above, but for involutive `φ`. |
| `commute_all_of_involutive` | `FixedPointFree φ → Involutive φ → Commute g h` | All elements commute if `φ` is a fixed-point-free involutive automorphism. |
| `commGroupOfInvolutive` | `FixedPointFree φ → Involutive φ → CommGroup G` | Constructs an abelian group structure under the above conditions. |
| `orderOf_ne_two_of_involutive` | `FixedPointFree φ → Involutive φ → orderOf g ≠ 2` | No element has order 2 under these assumptions. |
| `odd_card_of_involutive` | `FixedPointFree φ → Involutive φ → Odd (Nat.card G)` | Group order is odd. |
| `odd_orderOf_of_involutive` | `FixedPointFree φ → Involutive φ → Odd (orderOf g)` | Every element has odd order. |

---

### **2. Naming Conventions**

- **Predicates**: `FixedPointFree`, `Involutive`, `Commute`, `odd`, `commGroupOf...`
- **Maps/constructors**: `commutatorMap`, `prod_pow_eq_one`, `coe_eq_inv_of...`
- **Suffixes**:
  - `_of_...`: e.g., `commGroupOfInvolutive`, `odd_card_of_involutive`
  - `_eq_...`: e.g., `coe_eq_inv_of_sq_eq_one`, `prod_pow_eq_one`
- **Prefixes**:
  - `coe_`: coercion-related (`⇑φ`)
  - `comm_`: commutativity-related (`commute_all_of_involutive`, `commGroupOf...`)
  - `orderOf_`: order-related (`orderOf_ne_two_of_involutive`, `odd_orderOf_of_involutive`)

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]` — simplification with specific lemmas
- `rw [...]` — rewriting using equalities
- `rwa [...]` — rewrite + assumption
- `exact ...` / `refine ...` — constructing proofs
- `ext g` — extensionality for functions
- `by_contra` — proof by contradiction
- `obtain ⟨g, rfl⟩` — destructuring existential hypotheses
- `rwa [...] at key` — rewrite in a hypothesis
- `contradiction` — closing goals from contradictory assumptions

Also used:
- `aesop` (not explicitly shown, but likely in background)
- `ring`, `linarith`, `simp` — implicit in algebraic simplifications

---

### **4. Proof Logic**

- **Structure**: Most proofs follow a pattern:
  1. Use `FixedPointFree φ` to deduce `g = 1` from `φ g = g`.
  2. Derive key equalities (e.g., `g * φ g = 1`) via `prod_pow_eq_one` or direct computation.
  3. Apply algebraic rewrites (`inv_eq_iff_mul_eq_one`, `mul_inv_rev`, etc.) to convert between forms.
  4. Use finiteness (via `Finite.surjective_of_injective`) or group-theoretic facts (`orderOf_dvd_natCard`, `exists_prime_orderOf_dvd_card`) to derive global properties (e.g., odd order).
- **Induction**: Not used directly in this file; relies on lemmas like `List.prod_range_div'`.
- **Case analysis**: Used implicitly via `obtain ⟨g, rfl⟩` and `rwa`.

---

### **5. Imports**

- `Mathlib.GroupTheory.Perm.Cycle.Type` — provides permutation cycle theory and related infrastructure.
- Implicit imports via `GroupTheory.Perm` and `Mathlib.Data.Fintype.Basic`, `Mathlib.Data.List.Basic`, `Mathlib.Algebra.Group.Basic`, `Mathlib.Algebra.Group.Power`, etc., are assumed from usage of:
  - `→*` (monoid homomorphism)
  - `iterate_map_div`, `Function.iterate_succ_apply`
  - `List.prod_range_div'`
  - `orderOf`, `Nat.card`, `Fintype`, `Finite`, `Involutive`, `Commute`, `CommGroup`

---

Let me know if you'd like a dependency graph or a formalization roadmap for extending this file.