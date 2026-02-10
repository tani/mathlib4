Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Divisible and Rootable (Additive/Monoid/Group) Structures**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DivisibleBy A α` | `class` | Constructive definition: existence of `div : A → α → A` s.t. `div a 0 = 0` and `n • div a n = a` for `n ≠ 0`. |
| `RootableBy A α` | `class` | Constructive definition: existence of `root : A → α → A` s.t. `root a 0 = 1` and `(root a n)^n = a` for `n ≠ 0`. |
| `divisibleByOfSMulRightSurj` | `theorem` | From surjectivity of `n • _`, derive `DivisibleBy`. |
| `smul_right_surj_of_divisibleBy` | `theorem` | From `DivisibleBy`, derive surjectivity of `n • _`. |
| `rootableByOfPowLeftSurj` | `noncomputable def` | From surjectivity of `a ↦ a^n`, construct `RootableBy`. |
| `pow_left_surj_of_rootableBy` | `theorem` | From `RootableBy`, derive surjectivity of `a ↦ a^n`. |
| `Prod.divisibleBy`, `Pi.divisibleBy` | `instance` | Products and dependent products preserve divisibility. |
| `Prod.rootableBy`, `Pi.rootableBy` | `instance` | Products and dependent products preserve rootability. |
| `AddCommGroup.divisibleByIntOfSMulTopEqTop` | `noncomputable def` | If `n • ⊤ = ⊤` for all `n ≠ 0`, then `DivisibleBy A ℤ`. |
| `AddCommGroup.smul_top_eq_top_of_divisibleBy_int` | `theorem` | `DivisibleBy A ℤ` implies `n • ⊤ = ⊤`. |
| `divisibleByIntOfCharZero` | `instance` | Any `CharZero` division ring is `ℤ`-divisible via `q / n`. |
| `AddGroup.divisibleByIntOfDivisibleByNat`, `AddGroup.divisibleByNatOfDivisibleByInt` | `theorem` | For additive groups, `ℕ`-divisibility ⇔ `ℤ`-divisibility. |
| `Group.rootableByIntOfRootableByNat`, `Group.rootableByNatOfRootableByInt` | `def` | For groups, `ℕ`-rootability ⇔ `ℤ`-rootability. |
| `QuotientAddGroup.divisibleBy`, `QuotientGroup.rootableBy` | `instance` | Quotients preserve divisibility/rootability. |
| `Function.Surjective.divisibleBy`, `Function.Surjective.rootableBy` | `def` | Surjective homomorphic images preserve divisibility/rootability. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `divisibleBy*`: additive divisibility-related terms.
  - `rootableBy*`: multiplicative rootability-related terms.
  - `smul_top_eq_top*`: relates scalar multiplication of top subgroup to divisibility.
  - `of*`: implication from non-constructive to constructive definition (e.g., `divisibleByOfSMulRightSurj`).
  - `*Of*`: reverse direction (e.g., `divisibleByIntOfSMulTopEqTop`).
- **Suffixes**:
  - `*Surj`: surjectivity-based characterizations.
  - `*Top`: top subgroup (`⊤`) usage.
  - `*Hom`, `*Quotient`, `*Prod`, `*Pi`: structural preservation under constructions.
- **Type parameters**:
  - `A`, `B`: additive monoids/groups or monoids/groups.
  - `α`: indexing type (e.g., scalars like `ℕ`, `ℤ`).
  - `ι`: index set for products.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: rewriting with simplification (e.g., `dif_neg`, `zpow_natCast`).
- `norm_num`: for numeric simplification (e.g., `div_zero`, `zsmul_eq_mul`).
- `rw`: rewriting using lemmas or definitions.
- `induction`: structural induction (e.g., on `n : ℕ` or `z : ℤ`).
- `exact`, `assumption`, `trivial`: for straightforward goals.
- `generalize_proofs`: to name and reuse proof terms.
- `Classical.dec`, `classical`: for classical reasoning (e.g., in `rootableByOfPowLeftSurj`).
- `funext`: extensionality for functions (e.g., in `Pi.*` instances).
- `Prod.ext`, `ULift.ext`: extensionality for product/ULift types.

---

#### **4. Proof Logic**

- **Constructive ↔ Classical Equivalence**:
  - Most results follow a pattern:  
    `surjectivity of operation ⇒ constructive class ⇒ surjectivity`.
  - E.g., `rootableByOfPowLeftSurj` constructs `root` using choice from surjectivity; `pow_left_surj_of_rootableBy` extracts surjectivity from the class.

- **Inductive Proofs**:
  - For `ℤ`-rootability/divisibility from `ℕ`, proofs use induction on natural part of integers (e.g., `rootableByIntOfRootableByNat` handles positive and negative integers separately).

- **Structural Preservation**:
  - Products/PIs: use pointwise definitions and `funext`.
  - Quotients: rely on surjectivity of quotient map (`QuotientGroup.mk_surjective`).
  - Homomorphic images: use surjectivity + homomorphism property to lift roots/divisors.

- **Characteristic Zero**:
  - Uses field division (`q / n`) and properties of `CharZero` to show `n • (q / n) = q`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Group.ULift`: for lifting structures to `ULift`.
- `Mathlib.Algebra.Group.Subgroup.Pointwise`: for scalar multiplication on subgroups.
- `Mathlib.Algebra.Module.NatInt`: for `ℤ`/`ℕ`-scalar actions.
- `Mathlib.GroupTheory.QuotientGroup.Defs`: for quotient groups.
- `Mathlib.Tactic.NormNum.Eq`: for numeric normalization.

**Scope**:
- Focuses on **constructive algebra** over additive monoids/groups and monoids/groups.
- Emphasizes equivalence between:
  - constructive definitions (via `div`/`root` functions),
  - classical surjectivity conditions (`n • _` or `a ↦ a^n` surjective),
  - structural properties (`n • ⊤ = ⊤`, characteristic zero).
- Targets applications in module theory, group theory, and model theory (e.g., divisible abelian groups as injective objects).

---

Let me know if you'd like a visual dependency graph or a summary of proof obligations for a specific theorem.