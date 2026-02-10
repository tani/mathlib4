### Technical Brief: Module Support in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Module.support R M` | `Set (PrimeSpectrum R)` | Defines the support of an `R`-module `M` as the set of primes `p` where the localization `Mₚ` is nontrivial. |
| `Module.mem_support_iff` | `p ∈ support R M ↔ Nontrivial (LocalizedModule p.asIdeal.primeCompl M)` | Characterizes membership in support via nontriviality of localization. |
| `Module.mem_support_iff_exists_annihilator` | `p ∈ support R M ↔ ∃ m, Ann(m) ≤ p.asIdeal` | Connects support to existence of a vector with annihilator contained in `p`. |
| `Module.support_eq_empty_iff` | `support R M = ∅ ↔ Subsingleton M` | Support is empty iff module is trivial (all elements zero). |
| `Module.support_of_exact` | For exact `0 → M → N → P → 0`, `support N = support M ∪ support P` | Supports behave additively over short exact sequences. |
| `Module.support_eq_zeroLocus` *(finite case)* | `support R M = zeroLocus (annihilator R M)` | For finite modules, support equals the vanishing locus of the global annihilator. |
| `LocalizedModule.exists_subsingleton_away` *(finite case)* | If `Mₚ = 0`, then `M[1/f] = 0` for some `f ∉ p` | Local vanishing implies global vanishing away from a principal open neighborhood. |
| `Module.annihilator_le_of_mem_support` | `p ∈ support R M ⇒ annihilator R M ≤ p.asIdeal` | Global annihilator lies in every prime in the support. |
| `Module.mem_support_iff_of_finite` *(finite case)* | `p ∈ support R M ↔ annihilator R M ≤ p.asIdeal` | Refines `mem_support_iff_exists_annihilator` using global annihilator for finite modules. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mem_`, `not_mem_`: Membership and negated membership lemmas.
  - `support_`: Core support-related results (`support_eq_empty`, `support_of_exact`, etc.).
  - `annihilator_`: Lemmas involving annihilators (`annihilator_le_of_mem_support`).
  - `subsingleton_`: Properties related to localized modules being subsingleton (i.e., zero).
- **Suffixes**:
  - `_iff`: Biconditional characterizations.
  - `_of_`: Specialized versions under assumptions (e.g., `of_exact`, `of_finite`, `of_injective`).
  - `_iff'`: Alternative equivalent formulations (often involving element-wise conditions).
- **Structure**:
  - `Module.support`, `LocalizedModule.exists_subsingleton_away`: Module-level and localized-module-level results.
  - `PrimeSpectrum.zeroLocus`, `PrimeSpectrum.mem_zeroLocus`: Zariski-topological notions used in support theory.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw`, `simp_rw` | Rewriting definitions (e.g., `mem_support_iff`, `annihilator`, `localized_module`) and simplifying with rewrite rules. |
| `simp only [...]` | Fine-grained simplification, often with `SetLike.le_def`, `Submodule.mem_annihilator_span_singleton`, etc. |
| `push_neg` | Pushing negations inward (e.g., in `not_mem_support_iff'`). |
| `contrapose!` | Turning implications into contrapositive forms for easier construction. |
| `exact`, `intro`, `cases`, `obtain` | Standard proof construction and destructuring. |
| `aesop` | Not present — suggests heavy reliance on manual simplification and algebraic reasoning. |
| `ring`, `linarith` | Not used — indicates focus on module-theoretic structure over arithmetic. |
| `ext` | Proving equality of sets/functions by extensionality. |
| `refine ⟨...⟩` | Constructing existentials and pairs explicitly. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Element-wise analysis**: Many lemmas reduce to checking conditions on individual elements `m : M`, especially via `mem_support_iff'` and `mem_support_iff_exists_annihilator`.
  - **Localization ↔ Annihilator correspondence**: Key bridge between local (module-theoretic) and global (ideal-theoretic) data.
  - **Exact sequences**: Use injectivity/surjectivity to lift/lower elements and relate supports via exactness.
  - **Finite case simplifications**: For finite modules, global annihilator suffices; proofs often use finite generation to reduce to spanning sets (`mem_support_iff_of_span_eq_top`).
  - **Zariski topology interplay**: Support is expressed as `zeroLocus` of an ideal; proofs use topological facts like `zeroLocus_iUnion₂`, `biUnion_of_singleton`, and complement manipulations.

- **Typical Flow**:
  1. Unfold definitions (`support`, `localized_module`, `annihilator`).
  2. Apply `simp_rw` or `rw` to reduce to ideal/module membership.
  3. Use `push_neg` or `contrapose!` to reframe goal.
  4. Construct witness (e.g., element `m`, element `r ∉ p`) or use finite generation to build one.
  5. Conclude via `exact`, `refine`, or `antisymm` for set equality.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.RingTheory.PrimeSpectrum`: Provides `PrimeSpectrum R`, Zariski topology, `zeroLocus`.
- `Mathlib.RingTheory.Localization.AtPrime`: Localizations at prime ideals, `LocalizedModule`.
- `Mathlib.Algebra.Exact`: `Function.Exact` for complexes.
- `Mathlib.Algebra.Module.LocalizedModule.Basic`: Localized modules, subsingleton criteria.

**Scope**:
- Focuses on **module-theoretic support** over **commutative rings**, with emphasis on:
  - Local behavior (localization at primes),
  - Global invariants (annihilator),
  - Homological algebra (exact sequences),
  - Finite generation conditions.

**Excluded**:
- No dependency on `TopologicalSpace` (explicitly asserted to avoid Zariski topology in basic `RingTheory` files).
- Future work hints at connections to:
  - Associated primes,
  - Base change of support under algebra maps (`Supp_A(A ⊗ M) = f♯⁻¹(Supp M)`).

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific lemma.