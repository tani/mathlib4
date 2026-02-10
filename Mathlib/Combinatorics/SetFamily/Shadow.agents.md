### Technical Metadata Brief: Shadows and Upper Shadows of Set Families in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `shadow` | `Finset (Finset α) → Finset (Finset α)` | Computes the *shadow*: all subsets obtained by removing one element from any set in the family. |
| `upShadow` | `Finset (Finset α) → Finset (Finset α)` | Computes the *upper shadow*: all supersets obtained by adding one element to any set in the family. |
| `∂` (notation) | `FinsetFamily` scoped notation for `shadow` | Shorthand for shadow operation. |
| `∂⁺` (notation) | `FinsetFamily` scoped notation for `upShadow` | Shorthand for upper shadow operation. |
| `mem_shadow_iff` | `t ∈ ∂ 𝒜 ↔ ∃ s ∈ 𝒜, ∃ a ∈ s, erase s a = t` | Characterizes membership in shadow via erasure. |
| `mem_shadow_iff_insert_mem` | `t ∈ ∂ 𝒜 ↔ ∃ a ∉ t, insert a t ∈ 𝒜` | Dual characterization: `t` is in shadow iff it can be extended into `𝒜`. |
| `mem_shadow_iterate_iff_exists_card` | `t ∈ ∂^[k] 𝒜 ↔ ∃ u, #u = k ∧ Disjoint t u ∧ t ∪ u ∈ 𝒜` | `k`-fold shadow: sets obtainable by removing `k` elements. |
| `mem_shadow_iterate_iff_exists_sdiff` | `t ∈ ∂^[k] 𝒜 ↔ ∃ s ∈ 𝒜, t ⊆ s ∧ #(s \ t) = k` | Equivalent formulation using set difference. |
| `mem_upShadow_iff` | `t ∈ ∂⁺ 𝒜 ↔ ∃ s ∈ 𝒜, ∃ a ∉ s, insert a s = t` | Membership in upper shadow via insertion. |
| `mem_upShadow_iff_erase_mem` | `t ∈ ∂⁺ 𝒜 ↔ ∃ a ∈ t, erase t a ∈ 𝒜` | Dual to shadow: `t` in upper shadow iff it erases into `𝒜`. |
| `mem_upShadow_iterate_iff_exists_card` | `t ∈ ∂⁺^[k] 𝒜 ↔ ∃ u, #u = k ∧ u ⊆ t ∧ t \ u ∈ 𝒜` | `k`-fold upper shadow via adding `k` elements. |
| `sized_shadow` | `(𝒜 : Set (Finset α)).Sized r → (∂ 𝒜).Sized (r - 1)` | Shadow reduces cardinality of sets by 1. |
| `sized_upShadow` | `(𝒜 : Set (Finset α)).Sized r → (∂⁺ 𝒜).Sized (r + 1)` | Upper shadow increases cardinality by 1. |
| `shadow_compls` | `∂ 𝒜ᶜˢ = (∂⁺ 𝒜)ᶜˢ` | Shadow and upper shadow commute with complementation. |
| `upShadow_compls` | `∂⁺ 𝒜ᶜˢ = (∂ 𝒜)ᶜˢ` | Dual of above. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `shadow_`, `upShadow_`: for definitions and lemmas about shadows.
  - `mem_`: for membership characterizations.
  - `sized_`: for lemmas about families of uniformly sized sets.
  - `erase_`, `insert_`: for operations on individual sets.
- **Suffixes**:
  - `_iff`: for biconditional lemmas (↔).
  - `_mono`: for monotonicity lemmas.
  - `_iterate`: for iterated shadow/upShadow.
  - `_compls`: for complement-related lemmas.
- **Variable conventions**:
  - `a, b : α`: ground elements.
  - `s, t : Finset α`: individual sets.
  - `𝒜, ℬ : Finset (Finset α)`: set families.
  - `k, r : ℕ`: natural numbers (often cardinalities or iteration counts).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: for rewriting using lemmas and definitions (especially `mem_shadow_iff`, `erase_mem`, `card_erase`, etc.).
- `aesop`: for automated reasoning in set-theoretic contexts (e.g., `mem_shadow_iff_insert_mem`, `mem_upShadow_iff_erase_mem`).
- `induction'`: for induction on natural numbers (especially for iterated shadows).
- `rw`: for rewriting with equivalences and equalities.
- `exact`, `refine`, `constructor`: for structured proof construction.
- `ext`: for extensionality proofs (e.g., `shadow_compls`, `upShadow_compls`).
- `cases'`: for destructuring existential hypotheses.
- `set_option tactic.skipAssignedInstances false`: used to avoid issues with instance resolution in complex proofs.

---

#### **4. Proof Logic**

- **Inductive structure**: Many proofs (especially for iterated shadows) proceed by induction on `k`, with base case `k = 0` and step using `iterate_succ`.
- **Equivalence chaining**: Proofs often chain equivalences using `refine ... trans`, `exists_congr`, and `and_congr_right`.
- **Set-theoretic reasoning**: Heavy use of:
  - `card_sdiff`, `card_mono`, `card_erase_of_mem`
  - `subset`, `disjoint`, `insert`, `erase`, `sdiff`
  - `covBy_iff_card_sdiff_eq_one`, `covBy_iff_exists_erase/insert`
- **Duality via complement**: Complement lemmas (`shadow_compls`, `upShadow_compls`) use `compl_involutive.toPerm` and `simp [compl_involutive.eq_iff]`.
- **Cardinality arguments**: Many proofs reduce to arithmetic on cardinalities (e.g., `#s = #t + k` ↔ `#(s \ t) = k`).

---

#### **5. Imports**

- `Mathlib.Data.Finset.Grade`: Provides grading and sized families machinery (`Sized`, `card_le_card`, etc.).
- `Mathlib.Data.Finset.Sups`: Provides `sup` (supremum over finsets), used to define shadow/upShadow as unions over families.
- `Mathlib.Logic.Function.Iterate`: Provides iteration of functions (`f^[k]`), used for iterated shadows.

---

This module formalizes foundational concepts in extremal set theory (e.g., Kruskal–Katona theorem context), with a focus on precise, reusable characterizations and duality between shadow and upper shadow via complementation.