### Technical Brief: Bundled Subsemirings in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AddSubmonoidWithOneClass S R` | `class` | States that `S` is a type of subsets of `R` containing `0`, `1`, and closed under `+`. Extends `AddSubmonoidClass` and `OneMemClass`. |
| `SubsemiringClass S R` | `class` | States that `S` is a type of subsets of `R` that are both multiplicative and additive submonoids. Extends `SubmonoidClass` and `AddSubmonoidClass`. |
| `Subsemiring R` | `structure` | A bundled subsemiring of a `NonAssocSemiring R`: a subset closed under `0`, `1`, `+`, and `*`. Extends `Submonoid R` and `AddSubmonoid R`. |
| `subtype s : s →+* R` | `def` | Natural inclusion homomorphism from a subsemiring `s` into `R`. |
| `toNonAssocSemiring`, `toSemiring`, `toCommSemiring` | `instance` | Endows a subsemiring with the corresponding semiring structure (inherited from `R`). |
| `coe_pow` | `@[simp]` theorem | Ensures exponentiation in `s` matches that in `R`. |
| `eqLocusS f g : Subsemiring R` | `def` | Subsemiring of elements where two ring homomorphisms `f, g : R →+* S` agree. |
| `domRestrict f s` | `def` | Restriction of a ring homomorphism `f : R →+* S` to a subsemiring `s ≤ R`. |
| `mk' s sm hm sa ha` | `def` | Constructs a `Subsemiring R` from a set `s` and compatible submonoid `sm` and additive submonoid `sa`. |
| `copy S s hs` | `def` | Rebuilds a subsemiring with a definitional equality on carrier. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `coe_`: coercion-related (e.g., `coe_subtype`, `coe_pow`, `coe_zero`, `coe_one`).
  - `mem_`: membership in carrier (e.g., `mem_top`, `mem_inf`, `mem_mk'`).
  - `to_`: projection to underlying structures (e.g., `toSubmonoid`, `toAddSubmonoid`, `toNonAssocSemiring`).
  - `subtype`: canonical inclusion map.
  - `eqLocusS`: “S” suffix indicates semiring version of `eqLocus`.
  - `domRestrict`: domain restriction of a morphism.

- **Class naming**:
  - `*Class` suffix: unbundled properties (e.g., `SubsemiringClass`, `AddSubmonoidWithOneClass`).
  - `Subsemiring` (no suffix): bundled object.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplifying goals using `@[simp]` lemmas (e.g., `coe_subtype`, `mem_inf`). |
| `induction` | Structural induction on `ℕ` (e.g., `natCast_mem`, `coe_pow`). |
| `rw` / `simp_rw` | Rewriting using definitional equalities (e.g., `← ha`, `hm.symm`). |
| `exact` / `apply` | Directly applying lemmas or instances (e.g., `zero_mem`, `one_mem`). |
| `congr` / `congr_arg` | Proving equality of terms via congruence (e.g., `zero_ne_one`). |
| `ext` | Extensionality for sets/subsemirings (`SetLike.ext`, `Subsemiring.ext`). |
| `cases` | Destructuring proofs/structures (e.g., `cases p; cases q`). |
| `aesop` | Automated reasoning for safe introduction rules (e.g., `natCast_mem`, `ofNat_mem`). |

---

#### **4. Proof Logic**

- **Induction + Simplification**: Most structural properties (e.g., `natCast_mem`, `coe_pow`) are proven by induction on `ℕ`, followed by `simp` using base cases (`zero_mem`, `one_mem`) and inductive steps (`add_mem`, `mul_mem`).
- **Extensionality**: Subsemiring equality is typically shown via `ext` + `SetLike.ext_iff`.
- **Inheritance via `Subtype`**: Many instances (`toNonAssocSemiring`, `noZeroDivisors`, etc.) are derived using `Subtype.coe_injective.*`, leveraging injectivity of coercion to transfer structure.
- **Definitional glue**: Proofs often use `simpa` or `exact` with `ha ▸ ...` or `hm ▸ ...` to rewrite using definitional equalities (e.g., `↑sa = s`).
- **Case analysis on equality**: To prove `0 ≠ 1` in subsemiring, assume equality and push forward via `subtype` to get contradiction in `R`.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.RingTheory.NonUnitalSubsemiring.Defs
  ```
  Provides foundational definitions like `NonUnitalSubsemiringClass`, used to derive `SubsemiringClass`.

- **Implicit dependencies** (via `Mathlib` hierarchy):
  - `Mathlib.Algebra.MonoidWithZero.Defs`
  - `Mathlib.Algebra.Submonoid.Defs`
  - `Mathlib.Algebra.AddMonoid.Defs`
  - `Mathlib.Algebra.Ring.Defs` (via `NonAssocSemiring`, `Semiring`, etc.)
  - `Mathlib.Data.Set.Basic` (for `SetLike`, `Set.mem_univ`, etc.)

---

### Summary

This file formalizes **bundled subsemirings** in Lean 4, building on unbundled classes (`SubsemiringClass`, `AddSubmonoidWithOneClass`) and defining the concrete type `Subsemiring R`. It provides:
- Inherited algebraic structure on subsemirings,
- Canonical inclusion maps (`subtype`),
- Standard constructions (intersection, top, restriction, equality locus),
- A rich set of `@[simp]` lemmas for coercion and membership.

The design follows Mathlib’s **bundled vs. unbundled** philosophy, balancing definitional convenience with modular typeclass inference.