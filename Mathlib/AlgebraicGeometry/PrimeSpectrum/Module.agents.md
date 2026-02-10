Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `LocalizedModule.subsingleton_iff_disjoint` | `{f : R} → Subsingleton (LocalizedModule (.powers f) M) ↔ Disjoint (basicOpen f) (support R M)` | Relates vanishing of localization `M[1/f]` to disjointness of basic open set `D(f)` with support of `M`. |
| `Module.stableUnderSpecialization_support` | `StableUnderSpecialization (support R M)` | Shows support is closed under specialization (i.e., if a prime is in support and specializes to another prime, the latter is also in support). |
| `Module.isClosed_support` | `[Module.Finite R M] → IsClosed (support R M)` | Proves support of a finite module is Zariski-closed. |
| `Module.support_subset_preimage_comap` | `[IsScalarTower R A M] → support A M ⊆ comap (algebraMap R A) ⁻¹' support R M` | Relates support over base ring `R` and extension of scalars `A`. |

**Support-related definitions used:**
- `Module.support R M`: Set of primes `𝔭` where localization `M_𝔭 ≠ 0`.
- `LocalizedModule (.powers f) M`: Localization of `M` at multiplicative set `{1, f, f², …}`.
- `PrimeSpectrum.basicOpen f`: Open subset `D(f) = {𝔭 | f ∉ 𝔭}`.
- `ZeroLocus I`, `support_eq_zeroLocus`: Support equals zero locus of annihilator ideal.
- `StableUnderSpecialization S`: For all `x ∈ S`, if `y ∈ closure ({x})`, then `y ∈ S`.

---

### **2. Naming Conventions**

- **Prefixes:**
  - `isClosed_`, `stableUnder_`, `subsingleton_`, `support_`, `localizedModule_`: indicate properties or constructions related to topology or module theory.
- **Suffixes:**
  - `_iff_disjoint`, `_preimage_comap`, `_iff_zeroLocus`: often denote logical equivalences or set-theoretic relationships.
- **Functional style:**
  - `comap`, `preimage`, `disjoint`, `zeroLocus`: standard topological/algebraic operations.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: rewriting using lemmas (e.g., `support_eq_zeroLocus`, `mem_support_iff_exists_annihilator`)
- `intro`, `intros`: for introducing variables and hypotheses
- `simp only [...] at ...`: simplification with explicit lemmas
- `apply`, `exact`: for applying known results
- `obtain ⟨m, hm⟩ := H`: destructing existential quantifiers
- `rfl`: reflexivity for definitional equalities
- `apply PrimeSpectrum.isClosed_zeroLocus`: leveraging algebraic geometry infrastructure

No heavy automation like `aesop`, `linarith`, or `ring` appears—proofs are mostly structural and rely on algebraic geometry lemmas.

---

### **4. Proof Logic**

- **Structure of proofs:**
  - Most proofs follow a *chain of equivalences* or *set inclusions*, using known characterizations (e.g., `mem_support_iff_exists_annihilator`, `zeroLocus` definitions).
  - For `subsingleton_iff_disjoint`: rewrites using `subsingleton_iff_support_subset`, then simplifies using topological identities (`basicOpen_eq_zeroLocus_compl`, `disjoint_compl_left_iff`).
  - For `stableUnderSpecialization_support`: uses element-wise reasoning with annihilators and specialization order (`le_iff_specializes`).
  - For `isClosed_support`: reduces to `zeroLocus` and applies a general result about closedness of zero loci.
  - For `support_subset_preimage_comap`: element-wise argument using definitions of support, comap, and scalar tower.

- **Induction / recursion**: Not used here—proofs are mostly direct and rely on algebraic geometry infrastructure.

---

### **5. Imports**

- `Mathlib.RingTheory.Support`: Provides definitions and basic lemmas about module support.
- `Mathlib.AlgebraicGeometry.PrimeSpectrum.Basic`: Supplies topological and scheme-theoretic tools (e.g., `basicOpen`, `zeroLocus`, `comap`, `specializes`, `stableUnderSpecialization`).

These imports indicate the file sits at the intersection of:
- Commutative algebra (module theory, localization, support)
- Algebraic geometry (prime spectrum topology, quasi-compactness, closed subsets)

---

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation or AI training).