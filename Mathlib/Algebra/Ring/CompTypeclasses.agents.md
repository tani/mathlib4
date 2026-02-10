### Technical Brief: `Mathlib.Algebra.Ring.Equiv.SurjectiveTriple`

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `RingHomId {R} (σ : R →+* R)` | `Prop` | Expresses that a ring homomorphism `σ` is equal to the identity map on `R`. |
| `RingHomCompTriple (σ₁₂ : R₁ →+* R₂) (σ₂₃ : R₂ →+* R₃) (σ₁₃ : outParam (R₁ →+* R₃))` | `Prop` | Encodes that `σ₂₃ ∘ σ₁₂ = σ₁₃`, used to avoid explicit compositions in semilinear map types. |
| `RingHomInvPair (σ : R₁ →+* R₂) (σ' : outParam (R₂ →+* R₁))` | `Prop` | States that `σ` and `σ'` are two-sided inverses: `σ' ∘ σ = id`, `σ ∘ σ' = id`. |
| `RingHomSurjective (σ : R₁ →+* R₂)` | `Prop` | Asserts that `σ` is surjective as a function. |

**Key Theorems / Instances:**

| Name | Statement | Use |
|------|-----------|-----|
| `RingHomCompTriple.comp_apply` | `σ₂₃ (σ₁₂ x) = σ₁₃ x` | Simplifies composition under `RingHomCompTriple`. |
| `RingHomInvPair.comp_apply_eq` | `σ' (σ x) = x` | Left-inverse property. |
| `RingHomInvPair.comp_apply_eq₂` | `σ (σ' x) = x` | Right-inverse property. |
| `RingHomInvPair.of_ringEquiv` | From `R₁ ≃+* R₂`, get `RingHomInvPair e e.symm` | Converts ring isomorphisms to inverse pairs. |
| `RingHomSurjective.comp` | `[RingHomCompTriple σ₁₂ σ₂₃ σ₁₃] → [RingHomSurjective σ₁₂] → [RingHomSurjective σ₂₃] → RingHomSurjective σ₁₃` | Surjectivity is preserved under composition (via triple). |
| `RingHomSurjective.invPair` | `[RingHomInvPair σ₁ σ₂] → RingHomSurjective σ₁` | Invertible maps are surjective. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `RingHomId`, `RingHomCompTriple`, `RingHomInvPair`, `RingHomSurjective`: Class names.
  - `comp_apply`, `comp_eq`, `comp_eq₂`: Properties about composition.
  - `ids`, `right_ids`: Instances involving identity morphisms.
  - `invPair`: From inverse pair to surjectivity.

- **Suffixes:**
  - `_eq`, `_eq₂`: Left/right inverse or composition equalities.
  - `apply`: Applied version of an equality (e.g., `comp_apply` vs `comp_eq`).
  - `symm`: Symmetric version (e.g., `symm` swaps inverse pair arguments).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

- `simp` / `simp only [...]`: To simplify using `comp_eq`, `comp_eq₂`, identity laws.
- `ext`: Extensionality for ring homomorphisms (to prove equality of functions).
- `rw [...]`: Rewriting using `comp_eq`, `comp_apply`, etc.
- `rwa [...]`: Rewrite + assumption.
- `by simp only [...]`: Common pattern for trivial proofs of instances.

---

#### **4. Proof Logic**

- **Instance proofs** (e.g., `ids`, `right_ids`, `invPair`) typically follow:
  - Use `ext` to reduce to pointwise equality.
  - Apply `simp` with `comp_eq` or identity lemmas.
- **Theorems about inverses**:
  - Use `comp_eq`/`comp_eq₂` + `RingHom.congr_fun` or `comp_apply`.
- **Surjectivity proofs**:
  - Construct preimage explicitly (e.g., `σ₂ x` for `σ₁` when `RingHomInvPair σ₁ σ₂`).
  - Or lift surjectivity through composition using `RingHomCompTriple.comp_eq`.

---

#### **5. Imports**

- `Mathlib.Algebra.Ring.Equiv`: Core ring homomorphism and equivalence theory.

This module builds on standard ring homomorphism infrastructure to support **semilinear algebra**, especially for handling conjugate-linear maps and their compositions (e.g., `Complex.conj`), ensuring typeclass inference resolves the correct ring homomorphism instead of leaving composite terms like `conj.comp conj`.

--- 

Let me know if you'd like a diagrammatic summary or a usage example (e.g., for semilinear maps).