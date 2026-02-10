Here's a structured technical metadata summary of the provided Lean 4 file on **Pythagorean Triples**, extracted for use in building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PythagoreanTriple` | `ℤ → ℤ → ℤ → Prop` | Defines a triple `(x, y, z)` satisfying `x² + y² = z²`. |
| `IsClassified` | `PythagoreanTriple x y z → Prop` | Says the triple is of the form `(k(m²−n²), k(2mn), k(m²+n²))` up to order, with `gcd(m,n)=1`. |
| `IsPrimitiveClassified` | `PythagoreanTriple x y z → Prop` | Primitive version: `k = 1`, `gcd(m,n)=1`, and `m,n` of opposite parity. |
| `circleEquivGen` | `K ≃ {p : K×K // p.1² + p.2² = 1 ∧ p.2 ≠ -1}` | Rational parametrization of unit circle (used for classification proof). |
| `sq_ne_two_fin_zmod_four` | `z : ZMod 4 → z * z ≠ 2` | Shows no square ≡ 2 mod 4 in `ZMod 4`. |
| `Int.sq_ne_two_mod_four` | `z : ℤ → z² % 4 ≠ 2` | Integer version of above. |
| `even_odd_of_coprime` | `gcd(x,y)=1 ⇒ x,y have opposite parity` | Critical parity analysis for handling prime 2. |
| `gcd_dvd` | `gcd(x,y) ∣ z` | Shows the gcd divides the hypotenuse. |
| `normalize` | Normalizes triple by dividing by `gcd(x,y)` to get primitive triple. |
| `isPrimitiveClassified_of_coprime_of_pos` | Main classification for primitive triples with `z > 0`. |
| `coprime_classification` | ↔ `∃ m,n` satisfying standard parametrization with parity & coprimality. |
| `coprime_classification'` | Refined version assuming `x` odd, `z > 0`, and `0 ≤ m`. |
| `classification` | Full classification: `PythagoreanTriple x y z ↔ ∃ k,m,n` in standard form. |

---

### **2. Naming Conventions**

- **Predicates & properties**:
  - `isClassified`, `isPrimitiveClassified`: suffix `-ified` for classification status.
  - `even_odd_of_coprime`, `coprime_of_coprime`: descriptive compound names.
- **Parity & modular arithmetic**:
  - `% 2 = 0 / 1`, `even`, `odd` encoded via `Int.emod_two_eq_zero_or_one`.
- **GCD-related**:
  - `gcd_dvd`, `coprime_of_coprime`, `normalize`, `gcd_div_gcd_div_gcd`.
- **Parametrization & circle**:
  - `circleEquivGen`, `circleEquivGen_apply`, `circleEquivGen_symm_apply`.
- **Auxiliary lemmas**:
  - `coprime_sq_sub_sq_add_of_even_odd`, `coprime_sq_sub_mul_of_odd_even`, etc.: pattern `coprime_*_of_*_of_*`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `fin_cases` | Exhaustive case analysis on `Fin n` or `ZMod n`. |
| `decide` | Solves decidable propositions (e.g., arithmetic in `ZMod 4`). |
| `ring` | Simplifies polynomial identities (used heavily in algebraic manipulations). |
| `field_simp`, `field_simp [hk x, div_pow]` | Simplifies field expressions, especially rational parametrizations. |
| `simp_rw`, `rw` | Rewriting with definitions and lemmas. |
| `cases'` | Case splitting on existentials or disjunctions. |
| `contrapose!` | Logical contrapositive + simplification. |
| `norm_cast` | Normalizes coercions (e.g., `ℤ → ℚ`). |
| ` positivity` | Proves positivity of expressions (e.g., `0 < m² + n²`). |
| `omega` | Solves linear integer arithmetic (e.g., parity constraints). |
| `aesop` (not explicit here, but implied by `omega`/`decide` usage) | Automated reasoning for first-order logic. |

---

### **4. Proof Logic & Strategy**

- **High-level structure**:
  1. **Parity analysis**: Show that in a primitive triple, `x,y` have opposite parity (`even_odd_of_coprime`).
  2. **Normalization**: Reduce general triple to primitive case via division by `gcd(x,y)`.
  3. **Rational parametrization**: Use `circleEquivGen` to map rational points on unit circle to slopes `m/n ∈ ℚ`.
  4. **Lift to integers**: Clear denominators to get integer parametrization `(m,n)`.
  5. **Coprimality & parity preservation**: Prove `gcd(m,n)=1` and opposite parity via lemmas like `coprime_sq_sub_mul_of_even_odd`.
  6. **Handle sign & scaling**: Use `mul_iff`, `normalize`, and `isClassified_of_normalize_isPrimitiveClassified` to lift back to general case.

- **Key logical flow**:
  - Induction not used; instead, case analysis on parity (`% 2`) and gcd (`= 0` or `≠ 0`).
  - Contrapositive + contradiction for impossible parity cases (e.g., both odd/even).
  - Use of rational field arithmetic (`ℚ`) to avoid division issues, then lift to integers.

---

### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Field.Basic` | Field arithmetic, used in `circleEquivGen`. |
| `Mathlib.Algebra.Order.Ring.Basic` | Ordered ring properties (e.g., positivity, order on `ℤ`). |
| `Mathlib.RingTheory.Int.Basic` | Basic integer arithmetic, divisibility, gcd. |
| `Mathlib.Tactic.Ring` | `ring` tactic for polynomial simplification. |
| `Mathlib.Tactic.FieldSimp` | `field_simp` for rational simplifications. |
| `Mathlib.Data.Int.NatPrime` | Prime divisibility, `dvd_mul`, `prime_two_or_dvd...`. |
| `Mathlib.Data.ZMod.Basic` | Modular arithmetic, especially `ZMod 4`. |

---

### **Summary for AI Agent**

- **Domain**: Number theory — specifically classification of integer solutions to `x² + y² = z²`.
- **Core technique**: Rational parametrization of unit circle + parity/gcd analysis.
- **Key lemmas**: Parity constraints (`even_odd_of_coprime`), coprimality preservation (`coprime_sq_sub_mul_*`), and normalization.
- **Proof style**: Case analysis on parity, modular arithmetic, and field-theoretic lifting between `ℚ` and `ℤ`.
- **Automation**: Heavy use of `ring`, `field_simp`, `decide`, and `omega` for routine algebraic steps.

Let me know if you'd like a visual proof dependency graph or a tactic-level trace of `classification`.