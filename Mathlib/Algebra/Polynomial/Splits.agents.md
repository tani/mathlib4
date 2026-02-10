Here's a structured technical brief extracted from the provided Lean 4 file on **splitting polynomials**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Splits i f` | `f : K[X] → Prop` | Predicate: `f.map i` is zero or all its irreducible factors over `L` have degree 1. |
| `splits_zero` | `Splits i (0 : K[X])` | Zero polynomial splits. |
| `splits_C` | `Splits i (C a)` | Constant polynomials split. |
| `splits_of_map_degree_eq_one` | `degree (f.map i) = 1 → Splits i f` | Degree-1 polynomials split. |
| `splits_of_degree_le_one` | `degree f ≤ 1 → Splits i f` | Polynomials of degree ≤1 split. |
| `splits_mul` | `Splits i f → Splits i g → Splits i (f * g)` | Product of splitting polynomials splits. |
| `splits_prod` | `(∀ j ∈ t, Splits i (s j)) → Splits i (∏ x ∈ t, s x)` | Finite product of splitting polynomials splits. |
| `splits_pow` | `Splits i f → Splits i (f ^ n)` | Powers of splitting polynomials split. |
| `splits_X` / `splits_X_sub_C` | `Splits i X`, `Splits i (X - C a)` | Linear monomials split. |
| `splits_map_iff` | `Splits j (f.map i) ↔ Splits (j.comp i) f` | Compatibility of splitting under composition of maps. |
| `splits_iff` | `Splits i f ↔ f = 0 ∨ ∀ g, Irreducible g → g ∣ f.map i → degree g = 1` | Simplified definition for polynomials over a field. |
| `exists_root_of_splits` | `Splits i f ∧ degree f ≠ 0 ⇒ ∃ x, eval₂ i x f = 0` | A splitting polynomial of nonzero degree has a root. |
| `natDegree_eq_card_roots` | `Splits i p ⇒ p.natDegree = #p.roots` | Degree equals number of roots (counted with multiplicity). |
| `eq_prod_roots_of_splits` | `Splits i p ⇒ p.map i = C(lc) * ∏ (X - a)` | Factorization into linear factors over `L`. |
| `aeval_eq_prod_aroots_sub_of_splits` | `aeval v p = lc * ∏ (v - a)` | Evaluation via linear factorization. |
| `splits_iff_exists_multiset` | `Splits i f ↔ ∃ s, f.map i = C(lc) * ∏ (X - a)` over multiset `s` | Equivalent characterization via multiset of roots. |
| `splits_iff_card_roots` | `Splits (RingHom.id K) p ↔ #p.roots = p.natDegree` | Splits iff number of roots equals degree. |
| `prod_roots_eq_coeff_zero_of_monic_of_splits` | Monic + splits ⇒ constant term = `(-1)^n * prod roots` | Vieta’s formula for constant term. |
| `sum_roots_eq_nextCoeff_of_monic_of_split` | Monic + splits ⇒ next coefficient = `-sum roots` | Vieta’s formula for next coefficient. |

---

### **2. Naming Conventions**

- **Predicates**: `Splits`, `splits_*` (e.g., `splits_zero`, `splits_mul`, `splits_prod`)
- **Equivalence lemmas**: `*_iff_*` (e.g., `splits_iff`, `splits_iff_card_roots`, `splits_iff_exists_multiset`)
- **Implication lemmas**: `splits_of_*` (e.g., `splits_of_degree_le_one`, `splits_of_map_eq_C`)
- **Root extraction**: `rootOfSplits`, `rootOfSplits'`, `exists_root_of_splits`
- **Factorization lemmas**: `eq_prod_roots_of_splits`, `aeval_eq_prod_aroots_sub_of_splits`
- **Vieta-style**: `prod_roots_eq_coeff_zero_of_monic_of_splits`, `sum_roots_eq_nextCoeff_of_monic_of_split`
- **Map/comp compatibility**: `splits_map_iff`, `splits_comp_of_splits`, `splits_of_algHom`
- **Special cases**: `splits_X`, `splits_X_sub_C`, `splits_X_pow`

Prefixes/suffixes:
- `splits_`: main predicate-related lemmas
- `*_iff_*`: bi-implications
- `*_of_*`: one-directional implications
- `*_iff_*`: iff characterizations
- `*_eq_*`: equality lemmas (e.g., `natDegree_eq_card_roots`)
- `*_mem_*`, `*_range`, `*_lift`: for algebraic structure (e.g., `mem_lift_of_splits_of_roots_mem_range`)

---

### **3. Tactic Stack**

Frequently used tactics:
- `simp` / `simp_rw` — simplification, especially with `map`, `coeff`, `degree`, `roots`
- `rw` — rewriting using lemmas like `map_mul`, `map_C`, `natDegree_eq_card_roots`
- `exact`, `assumption`, `intro`, `cases` — basic proof structure
- `have`, `suffices`, `by_cases` — intermediate claims and case splits
- `convert`, `congr`, `ext` — equality proofs, especially for polynomials
- `aesop` — not explicitly used, but `tauto`, `linarith`, `ring` may be used implicitly
- `multiset`-specific: `Multiset.map_le_map`, `Multiset.prod_dvd_prod_of_le`, `Multiset.card_zero`
- `invertibleOfNonzero`, `leadingCoeff_ne_zero`, `ne_zero_of_degree_gt` — algebraic reasoning about degrees
- `ring`, `linarith` — for arithmetic on `WithBot ℕ` degrees

---

### **4. Proof Logic**

- **Inductive structure**: Many proofs use induction on:
  - `Finset` for products (`splits_prod`, `splits_prod_iff`)
  - `nat` for powers (`splits_pow`)
  - Prime factorization in UFD context (`splits_of_exists_multiset`, `splits_of_splits_id`)
- **Case analysis**:
  - `if h : f.map i = 0 then ... else ...`
  - `if ha : a = 0 then ... else ...`
  - `lt_or_eq_of_le` for degree arguments
- **Deduction via irreducibility/primality**:
  - `irreducible_iff_prime` used to reduce to prime divisors
  - `dvd_mul` → `dvd_left` / `dvd_right` via `splits_mul` and `splits_of_splits_mul'`
- **Multiset reasoning**:
  - `eq_prod_roots_of_splits` → factorization via `roots`
  - `natDegree_eq_card_roots` ↔ `splits_iff_card_roots`
- **Algebraic lifting**:
  - `lifts_iff_liftsRing`, `mem_lift_of_splits_of_roots_mem_range`
  - Uses `algebraMap`, `rootSet`, `adjoin`, `image_rootSet`

---

### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.Algebra.Polynomial.FieldDivision`
- `Mathlib.Algebra.Polynomial.Lifts`
- `Mathlib.Data.List.Prime`
- `Mathlib.RingTheory.Adjoin.Basic`
- `Mathlib.RingTheory.Polynomial.Tower`

**Core algebraic structures assumed**:
- `[CommRing K]`, `[Field L]`, `[Field F]`
- `i : K →+* L` (ring homomorphism)
- `[Algebra R K]`, `[Algebra R L]`, `[IsScalarTower R K L]` for tower lemmas

**Key mathematical domains**:
- Polynomial rings over fields and commutative rings
- Irreducible/prime factorization
- Multisets of roots, degrees, natDegrees
- Adjoining roots, lifts of polynomials, algebra homomorphisms

---

Let me know if you'd like a diagram of the dependency graph or a summary of the main lemmas in proof assistant-friendly format (e.g., for automation or tactic search).