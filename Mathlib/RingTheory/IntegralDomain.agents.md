### Technical Brief: Lean 4 File Metadata — *Integral Domains*

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mul_right_bijective_of_finite₀` | `a ≠ 0 → Bijective (b ↦ a * b)` | In a finite `CancelMonoidWithZero`, multiplication by a nonzero element is bijective. |
| `mul_left_bijective_of_finite₀` | `a ≠ 0 → Bijective (b ↦ b * a)` | Left multiplication by a nonzero element is bijective in finite `CancelMonoidWithZero`. |
| `Fintype.groupWithZeroOfCancel` | `[CancelMonoidWithZero M] [Fintype M] [Nontrivial M] → GroupWithZero M` | Constructs a `GroupWithZero` structure on a finite nontrivial `CancelMonoidWithZero`. |
| `exists_eq_pow_of_mul_eq_pow_of_coprime` | `[CommSemiring R] [IsDomain R] [GCDMonoid R] [Subsingleton Rˣ]`<br>`→ IsCoprime a b → a * b = c ^ n → ∃ d, a = d ^ n` | If coprime elements multiply to an `n`-th power, each is an `n`-th power (up to units). |
| `Finset.exists_eq_pow_of_mul_eq_pow_of_coprime` | Generalization of above to finite products over sets with pairwise coprime factors. |
| `Fintype.divisionRingOfIsDomain` | `[Ring R] [IsDomain R] [Fintype R] → DivisionRing R` | Every finite domain is a division ring. |
| `Fintype.fieldOfDomain` | `[CommRing R] [IsDomain R] [Fintype R] → Field R` | Every finite *commutative* domain is a field. |
| `Finite.isField_of_domain` | `[CommRing R] [IsDomain R] [Finite R] → IsField R` | Infinite version: finite integral domain ⇒ field (via `Fintype` coercion). |
| `card_nthRoots_subgroup_units` | Bounds size of fiber `{g | g^n = g₀}` by number of `n`-th roots of `f(g₀)` in `R`. |
| `isCyclic_of_subgroup_isDomain` | `[CommRing R] [IsDomain R] [Finite G] → Injective f : G →* Rˣ ⇒ IsCyclic G` | Finite subgroup of units of an integral domain is cyclic. |
| `subgroup_units_cyclic` | `[CommRing R] [IsDomain R] [Finite S ≤ Rˣ] → IsCyclic S` | Instance: finite subgroup of units of integral domain is cyclic. |
| `isCyclic_Rˣ` | `[CommRing R] [IsDomain R] [Finite Rˣ] → IsCyclic Rˣ` | Unit group of finite integral domain is cyclic. |
| `sum_hom_units_eq_zero` | `[Fintype G] [CommRing R] [IsDomain R]`<br>`→ f : G →* Rˣ, f ≠ 1 ⇒ ∑ g, f g = 0` | Nontrivial group homomorphism into units of integral domain sums to zero. |
| `sum_hom_units` | `[Decidable (f = 1)] ⇒ ∑ g, f g = if f = 1 then |G| else 0` | Full version of above: sum is group order iff homomorphism is trivial. |
| `div_eq_quo_add_rem_div` | `[Field K] [Algebra R[X] K] [IsFractionRing R[X] K]`<br>`→ g monic ⇒ ∃ q r, f/g = q + r/g ∧ deg(r) < deg(g)` | Polynomial division in fraction field with monic divisor. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `mul_*`: multiplication-related properties (`mul_right_bijective`, `mul_left_bijective`)
  - `exists_*`: existence lemmas (`exists_eq_pow_of_mul_eq_pow_of_coprime`)
  - `card_*`: cardinality bounds (`card_nthRoots_subgroup_units`, `card_fiber_eq_of_mem_range`)
  - `is_*`: structural properties (`isCyclic`, `isField`, `isDomain`)
  - `sum_*`: summation lemmas (`sum_hom_units`, `sum_hom_units_eq_zero`)
- **Suffixes:**
  - `_of_*`: conditions or sources (`of_subgroup_isDomain`, `of_cancel`, `of_mem_range`)
  - `_le`, `_eq`, `_zero`: inequality/equality/zero-targeted results
- **Type variables:**
  - `R`: ring / domain / field
  - `G`: group (often finite, acting via homomorphism into `Rˣ`)
  - `M`: `CancelMonoidWithZero`
  - `K`: field, often a fraction field

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop` | Automated reasoning for basic logic, injectivity, surjectivity, membership |
| `simp_rw` / `simp only` | Simplification with rewrite rules, especially for `Finset`, `MonoidHom`, `Units` |
| `field_simp` | Simplification in fields (e.g., cancel denominators) |
| `rw` / `rwa` | Rewriting using equalities, often with `at` or assumptions |
| `exact_mod_cast` / `norm_cast` | Typeclass coercion handling (e.g., `Rˣ → R`) |
| `cases'` / `cases` | Case analysis on existentials or decidable propositions |
| `congr_arg₂` / `congr_arg` | Congruence reasoning for equalities involving operations |
| `sum_congr` / `sum_comp` | Manipulating finite sums over sets/maps |
| `calc` / `trans` | Chain of equalities/inequalities |
| `norm_num` / `ring` | Arithmetic simplification (less frequent here) |
| `dsimp` | Dependent simplification (e.g., for type coercions) |

---

#### **4. Proof Logic**

- **Inductive/structural style**: Most proofs rely on structural properties of finite algebraic objects (e.g., bijectivity of multiplication, finiteness ⇒ injective ⇔ surjective).
- **Group-theoretic reduction**: Many results reduce to cyclic group structure via:
  - `isCyclic_of_card_pow_eq_one_le`
  - `IsCyclic.exists_monoid_generator`
- **Coprime factorization**: Leverages `GCDMonoid` and `Subsingleton Rˣ` to lift power decomposition from product to factors.
- **Summation over groups**: Uses:
  - Group cyclicity to parametrize image as powers of a generator.
  - Geometric sum identity (`geom_sum_mul`) to show sum of nontrivial characters is zero.
- **Polynomial division**: Uses monicness to ensure division algorithm works over base ring, then extends to fraction field.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.GeomSum` | Geometric sum identities (used in `sum_hom_units_eq_zero`) |
| `Mathlib.Algebra.Polynomial.Roots` | `nthRoots`, root-counting lemmas (e.g., `nthRoots.toFinset_card_le`) |
| `Mathlib.GroupTheory.SpecificGroups.Cyclic` | `isCyclic_of_card_pow_eq_one_le`, `pow_injOn_Iio_orderOf`, etc. |

**Domain scope**:  
- **Core objects**: Integral domains, finite groups, units, polynomial rings, fraction fields.  
- **Key themes**: Finiteness ⇒ algebraic regularity (e.g., field, cyclic unit group), group actions on rings, root counting, coprime factorization.

--- 

Let me know if you'd like a dependency graph or a formalized summary for downstream AI agent training.