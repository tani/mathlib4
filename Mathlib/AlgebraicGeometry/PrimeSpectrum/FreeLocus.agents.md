Here's a structured technical metadata summary of the provided Lean 4 file, extracted for use in building a domain-specific AI agent focused on algebraic geometry and module theory:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `freeLocus` | `Set (PrimeSpectrum R)` | The set of primes `p` where the localization `Mₚ` is free over `Rₚ`. |
| `mem_freeLocus` | `p ∈ freeLocus R M ↔ Module.Free ...` | Characterization of membership in the free locus. |
| `mem_freeLocus_of_isLocalization` | Equivalence under isomorphism of localizations | Allows replacing the localized module with any isomorphic localization. |
| `mem_freeLocus_iff_tensor` | `p ∈ freeLocus R M ↔ Module.Free Rₚ (Rₚ ⊗[R] M)` | Relates freeness at stalks to tensor product with residue field. |
| `freeLocus_congr` | `M ≃ₗ[R] M' ⇒ freeLocus R M = freeLocus R M'` | Invariance of free locus under linear isomorphism. |
| `comap_freeLocus_le` | `comap f ⁻¹' freeLocus R M ≤ freeLocus A (A ⊗[R] M)` | Behavior under base change (monoid homomorphism `R → A`). |
| `freeLocus_localization` | `freeLocus (Localization S) (LocalizedModule S M) = comap (algebraMap R _) ⁻¹' freeLocus R M` | Compatibility with localization of the base ring. |
| `freeLocus_eq_univ_iff` | `[FP] ⇒ (freeLocus = ⊤ ↔ Projective M)` | Main global criterion: free locus is whole space iff `M` is projective (under finite presentation). |
| `freeLocus_eq_univ` | `[FP] [Flat] ⇒ freeLocus = ⊤` | Immediate corollary: flat + finitely presented ⇒ free locus is all of `Spec R`. |
| `basicOpen_subset_freeLocus_iff` | `[FP] ⇒ D(f) ⊆ freeLocus ↔ Projective (M_f)` | Local criterion on principal open subsets. |
| `isOpen_freeLocus` | `[FP] ⇒ IsOpen (freeLocus R M)` | The free locus is open under finite presentation. |
| `rankAtStalk` | `Spec R → ℕ` | Sends `p ↦ rank_{Rₚ}(Mₚ)` (finite rank due to finite presentation). |
| `isLocallyConstant_rankAtStalk_freeLocus` | `[FP] ⇒ rankAtStalk|_{freeLocus}` is locally constant | Rank is locally constant on the free locus. |
| `isLocallyConstant_rankAtStalk` | `[FP] [Flat] ⇒ rankAtStalk` is locally constant | Extends previous result to all of `Spec R` when `M` is flat. |

> **Notation**: `[FP]` abbreviates `[Module.FinitePresentation R M]`.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `freeLocus_`: for lemmas about the free locus.
  - `rankAtStalk_`: for rank-related properties.
  - `mem_`: membership criteria.
  - `isLocallyConstant_`: for local constancy results.

- **Suffixes**:
  - `_iff`: characterizations via biconditionals.
  - `_of_`: implications from structural assumptions (e.g., `of_isLocalization`, `of_flat_of_isLocalRing`).
  - `_le`, `_subset`: inclusion statements.
  - `_preimage`, `_comap`: base change behavior.

- **Pattern**:
  - `lemma X_Y_iff_Z`: equivalence between a property `X` and condition `Z` under assumption `Y`.
  - `lemma X_of_Y`: implication from assumption `Y` to conclusion `X`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp_rw` / `simp` | Rewriting with definitions and equivalences (e.g., `Set.eq_univ_iff_forall`, `mem_freeLocus`). |
| `ext` / `ext p` | Extensionality for sets/functions. |
| `rw [← ...]` | Rewriting using known equivalences (especially localization isomorphisms). |
| `apply ...` / `exact ...` | Direct proof steps, especially for module properties (e.g., `Module.free_of_flat_of_isLocalRing`). |
| `have` / `obtain` | Intermediate constructions (e.g., localizations, algebra structures). |
| `letI` | Introducing typeclass instances for later use. |
| `convert` / `congr` | Proving equality up to definitional or propositional equivalence. |
| `rfl` | Reflexivity for definitional equalities. |
| `aesop` / `tauto` | Not explicitly used here — lean relies on manual algebraic reasoning. |
| `ring` | Not used — algebraic manipulations are handled via `simp` and explicit lemmas. |

> **Note**: Heavy use of `IsLocalization` and `IsLocalizedModule` infrastructure; proofs often construct intermediate isomorphisms and verify module/localization properties.

---

### **4. Proof Logic**

- **General Strategy**:
  - Reduce to local properties using localization.
  - Use the fact that over a local ring, flat + finitely presented ⇒ free (`Module.free_of_flat_of_isLocalRing`).
  - For openness: construct a principal open neighborhood inside the free locus using finite presentation.
  - For local constancy of rank: use trivialization on a basic open set and compare ranks via localization isomorphisms.

- **Common Proof Patterns**:
  - **Induction/Case analysis on localization**: e.g., `Localization.AtPrime`, `Localization.Away`.
  - **Transport along equivalences**: e.g., `Module.Free.iff_of_ringEquiv`, `finrank_of_isLocalizedModule_of_free`.
  - **Descent via localization**: e.g., lifting properties from `Mₚ` to neighborhoods.

- **Key Lemmas as Building Blocks**:
  - `mem_freeLocus_iff_tensor`: connects freeness to tensor product.
  - `freeLocus_localization`: enables descent to localizations.
  - `freeLocus_eq_univ_iff`: global characterization.
  - `isLocallyConstant_rankAtStalk_freeLocus`: local triviality of rank.

---

### **5. Imports & Scope**

**Primary Dependencies**:

| Module | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.PrimeSpectrum.Basic` | Topological space `Spec R`, basic opens, structure sheaf. |
| `Mathlib.RingTheory.Flat.Stability` | Stability properties of flat modules. |
| `Mathlib.RingTheory.LocalProperties.Projective` | Local criteria for projectivity. |
| `Mathlib.RingTheory.LocalRing.Module` | Modules over local rings (e.g., flat + finite ⇒ free). |
| `Mathlib.RingTheory.Localization.Free` | Free modules over localizations. |
| `Mathlib.RingTheory.Localization.LocalizationLocalization` | Iterated localization isomorphisms. |
| `Mathlib.Topology.LocallyConstant.Basic` | Locally constant functions and their properties. |
| `Mathlib.RingTheory.TensorProduct.Free` | Tensor products and freeness. |

**Domain Scope**:
- **Algebraic Geometry**: `Spec R`, structure sheaf, stalks, local properties.
- **Commutative Algebra**: flatness, projectivity, finite presentation, localization.
- **Module Theory**: ranks, local triviality, behavior under base change.

---

Let me know if you'd like a formalized *ontology* or *proof sketch database* derived from this file for downstream AI reasoning.