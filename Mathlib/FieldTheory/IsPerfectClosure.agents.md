Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `pNilradical R p` | `Ideal R` | Generalized nilradical: `nilradical R` if `1 < p`, else `⊥`. Characterized by elements `x` with `x ^ p ^ n = 0` for some `n`. |
| `IsPRadical i p` | `Prop` | Ring homomorphism `i : K →+* L` is *p-radical*: every `x ∈ L` has some `x ^ p ^ n ∈ im(i)`, and `ker(i) ⊆ pNilradical K p`. Generalizes purely inseparable extensions. |
| `IsPerfectClosure i p` | `Abbrev` | `IsPRadical i p` under assumption `[PerfectRing L p]`. Says `L` is a *perfect closure* of `K` via `i`. |
| `lift i j p` | `L →+* M` | Universal property: given `i : K →+* L` (p-radical), `j : K →+* M`, and `M` perfect, lifts `j` uniquely to `L →+* M`. |
| `liftEquiv M i p` | `(K →+* M) ≃ (L →+* M)` | Equivalence of hom-sets induced by `lift`. Generalizes `PerfectClosure.lift`. |
| `equiv i j p` | `L ≃+* M` | Isomorphism between two perfect closures `L`, `M` of `K`. |
| `PerfectClosure.isPRadical` | `IsPRadical (PerfectClosure.of K p) p` | Absolute perfect closure is p-radical (hence a perfect closure). |
| `IsPRadical.isPurelyInseparable` | `IsPurelyInseparable K L` | For fields, p-radical ⇔ purely inseparable. |
| `IsPurelyInseparable.isPRadical` | `IsPRadical (algebraMap K L) p` | Converse: purely inseparable ⇒ p-radical. |
| `IsPRadical.trans` | `IsPRadical (f.comp i) p` | Composition of p-radial maps is p-radial. |
| `IsPRadical.injective_comp_of_perfect` | `Function.Injective (fun f ↦ f.comp i)` | Map induced by precomposition with a p-radial map is injective into perfect rings. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `pNilradical`: indicates dependence on a prime power exponent `p`.
  - `IsPRadical`, `IsPerfectClosure`: predicate-style naming for properties of ring homomorphisms.
  - `lift`, `liftEquiv`, `equiv`: standard universal property naming (analogous to `IsAlgClosed.lift`, `IsSepClosed.lift`).
  - `comp`: for compositions (e.g., `lift_comp`, `equiv_comp`).
- **Suffixes**:
  - `_apply`: for lemmas about application of functions (e.g., `lift_apply`, `equiv_apply`).
  - `_eq`: for equality lemmas (e.g., `equiv_self`, `lift_comp_lift`).
  - `_of_`: for specialization (e.g., `injective_comp_of_perfect`, `pNilradical_prime`).
- **Pattern**:
  - `⟨type⟩_of_⟨condition⟩`: e.g., `injective_comp_of_pNilradical_eq_bot`.
  - `⟨term⟩_apply`: often used for simplification lemmas (`lift_self_apply`, `lift_id_apply`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions, especially `mem_pNilradical`, `map_pow`, `iterateFrobenius_def`. |
| `simp` | Simplifying goals using `@[simp]` lemmas (e.g., `lift_comp_apply`, `liftAux_self_apply`). |
| `exact` / `assumption` | Closing trivial goals. |
| `ext` | Extensionality for ring homomorphisms/equivalences. |
| `apply_fun` | Applying a function to both sides of an equation (e.g., injectivity proofs). |
| `convert` | Matching goals up to definitional equality (e.g., `convert Ideal.zero_mem _`). |
| `rcases` / `obtain` | Extracting witnesses from existential quantifiers (e.g., `⟨n, y, h⟩`). |
| `nth_rw` | Rewriting at a specific position (e.g., `nth_rw 1 [iterateFrobeniusEquiv_symm_add_apply]`). |
| `conv` / `conv_lhs` | Localized rewriting in complex expressions. |
| `ring` / `abel` | Not explicitly used here, but `pow_add`, `pow_mul`, etc., suggest ring reasoning. |
| `aesop` | Not present — proofs are mostly manual and structure-driven. |

---

### **4. Proof Logic**

- **Inductive/constructive style**: Proofs often proceed by:
  1. **Unfolding definitions** (e.g., `mem_pNilradical`, `IsPRadical`).
  2. **Extracting witnesses** from `∃` using `obtain`/`rcases`.
  3. **Using Frobenius iterates** and their invertibility in perfect rings (`iterateFrobeniusEquiv`).
  4. **Verifying ring homomorphism properties** (e.g., `map_add'`, `map_mul'`) via explicit computation using `liftAux_apply`.
- **Key logical flow**:
  - For `lift`: define candidate function (`liftAux`), prove it’s well-defined (independent of choice of `n, y`), then verify ring homomorphism axioms.
  - For `equiv`: define as `lift`, then show inverse is `liftAux` in opposite direction.
  - For `injective_comp`: reduce to injectivity of Frobenius powers modulo `pNilradical = ⊥`.
- **Equational reasoning**: Heavy use of `pow_mul`, `pow_add`, `sub_pow_expChar_pow`, and Frobenius functoriality.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.FieldTheory.PurelyInseparable` | Provides `IsPurelyInseparable`, `isPurelyInseparable_iff_pow_mem`, etc. |
| `Mathlib.FieldTheory.PerfectClosure` | Defines `PerfectClosure`, `PerfectClosure.of`, `iterate_frobenius`, etc. |

These imports anchor the development in field/ring theory with emphasis on:
- Frobenius endomorphism,
- nilradicals,
- purely inseparable extensions,
- perfect rings/closures.

---

Let me know if you'd like a diagram of the universal property or a dependency graph of definitions.