### Technical Metadata Brief: `GroupTheory.Exponent`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Monoid.ExponentExists` | `Prop` | Predicate asserting existence of a *positive* `n` such that `∀ g, g ^ n = 1`. |
| `Monoid.exponent` | `ℕ` | Minimal such `n` if it exists; `0` otherwise. Noncomputable definition via `Nat.find`. |
| `AddMonoid.exponent` | `ℕ` | Additive counterpart: minimal `n > 0` with `∀ g, n • g = 0`, else `0`. |
| `Monoid.lcm_order_eq_exponent` | `[LeftCancelMonoid G] [Fintype G] ⇒ (Finset.univ : Finset G).lcm orderOf = exponent G` | For finite left cancel monoids, exponent equals lcm of element orders. |
| `Monoid.exponent_eq_iSup_orderOf` | `[CommMonoid G] [∀ g, 0 < orderOf g] ⇒ exponent G = ⨆ g, orderOf g` | In commutative cancel monoids with all finite orders, exponent is the supremum of orders. |
| `Monoid.exponent_pi` | `[Fintype ι] [∀ i, Monoid (M i)] ⇒ exponent (∀ i, M i) = lcm univ (exponent ∘ M)` | Exponent of finite product is lcm of exponents. |
| `Monoid.exponent_prod` | `exponent (M₁ × M₂) = lcm (exponent M₁) (exponent M₂)` | Special case of `exponent_pi` for binary products. |
| `MonoidHom.exponent_dvd` | `[Surjective f] ⇒ exponent M₂ ∣ exponent M₁` | Surjective homomorphism implies exponent of codomain divides that of domain. |
| `Monoid.order_dvd_exponent` | `orderOf g ∣ exponent G` | Order of any element divides the exponent. |
| `Monoid.exponent_dvd_iff_forall_pow_eq_one` | `exponent G ∣ n ↔ ∀ g, g ^ n = 1` | Characterizes divisibility by exponent via universal power identity. |
| `Monoid.exists_orderOf_eq_exponent` | `[CommMonoid G] [ExponentExists G] ⇒ ∃ g, orderOf g = exponent G` | In commutative monoids with finite exponent, some element achieves it. |
| `Monoid.exponent_eq_max'_orderOf` | `[CancelCommMonoid G] [Fintype G] ⇒ exponent G = max' (image orderOf univ)` | In finite cancel commutative monoids, exponent is the maximum element order. |
| `Monoid.exponent_eq_zero_iff_forall` | `exponent G = 0 ↔ ∀ n > 0, ∃ g, g ^ n ≠ 1` | Exponent zero iff no uniform exponent works. |
| `Monoid.exp_eq_one_iff` | `exponent G = 1 ↔ Subsingleton G` | Exponent one iff only identity element exists. |

---

#### **2. Naming Conventions**

- **Predicates**: `ExponentExists`, `isOfFinOrder`, `Subsingleton`
- **Main function**: `exponent`, `orderOf`
- **Additive variants**: prefixed with `AddMonoid.` or `AddGroup.`, e.g., `AddMonoid.exponent`, `AddMonoid.exponent_additive`
- **Multiplicative variants**: `exponent_multiplicative`, `exponent_additive`
- **Homomorphism-related**: `exponent_dvd_of_monoidHom`, `exponent_dvd`, `exponent_eq_of_mulEquiv`
- **Product-related**: `exponent_pi`, `exponent_prod`, `exponent_pi_eq_zero`
- **Special cases**: `exp_eq_one`, `inv_eq_self_of_exponent_two`, `mul_comm_of_exponent_two`
- **Order-related**: `orderOf_dvd_exponent`, `orderOf_le_exponent`, `orderOf_eq_prime`, `orderOf_mul_pow_eq_lcm`
- **Divisibility/characterization**: `exponent_dvd_iff_forall_pow_eq_one`, `exponent_min`, `exponent_min'`

Prefixes/suffixes:
- `is_`: predicate (e.g., `isOfFinOrder`)
- `orderOf_`: properties about element order
- `exponent_`: properties about global exponent
- `_dvd_`: divisibility statements
- `_eq_one`: identity element behavior
- `_iff_`: biconditional characterizations
- `_pi`, `_prod`: product-related

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification with definitional lemmas, especially for `pow`, `orderOf`, `exponent`
- `rw`: rewriting using key lemmas like `pow_exponent_eq_one`, `orderOf_dvd_iff_pow_eq_one`
- `apply`: applying lemmas like `exponent_min'`, `dvd_antisymm`, `Nat.find_min'`
- `by_cases` / `by_contra`: case analysis on `ExponentExists`, `orderOf g = 0`, etc.
- `rcases`, `obtain`: destructing existential/universal quantifiers
- `convert`, `congr!`: for equality proofs involving typeclass instances
- `aesop`: automated reasoning for simple goals (e.g., in `mul_not_mem_of_orderOf_eq_two`)
- `omega`: resolving linear arithmetic contradictions (e.g., in `exponent_min`)
- `group`: simplifying group expressions (e.g., in exponent-two section)
- `nth_rw`: targeted rewriting at specific positions
- `lift ... to Finset`: converting infinite sets to finite ones when finite

---

#### **4. Proof Logic**

Typical proof patterns:
- **Induction / minimal witness**: Use `Nat.find_min'` to prove minimality of `exponent`.
- **Divisibility antisymmetry**: Prove `a ∣ b` and `b ∣ a` to conclude `a = b` (e.g., `lcm_orderOf_eq_exponent`, `exponent_eq_of_mulEquiv`).
- **Case split on `ExponentExists`**: Often splits into `h : ExponentExists G` and `¬h`, using `dif_pos`/`dif_neg`.
- **Use of `orderOf_dvd_iff_pow_eq_one`**: Translate between order divisibility and power identities.
- **Finite vs infinite behavior**: Distinguish via `Fintype G`, `Finite G`, or `∀ g, 0 < orderOf g`.
- **Product decomposition**: Reduce to components via `Pi.evalMonoidHom`, `Prod.fst`, `Prod.snd`.
- **Structure lifting**: Use `MulEquiv` or `MonoidHom` to transfer exponent properties.
- **Prime factorization arguments**: Especially in `exists_orderOf_eq_pow_factorization_exponent`, leveraging `factorization`, `ordProj`, and coprimality.

---

#### **5. Imports**

Core dependencies defining scope:
- `Mathlib.GroupTheory.OrderOfElement`: `orderOf`, `IsOfFinOrder`, `pow_orderOf_eq_one`
- `Mathlib.Algebra.GCDMonoid.Finset`: `Finset.lcm`, `lcm` on finite sets
- `Mathlib.Algebra.GCDMonoid.Nat`: `Nat.lcm`, `Nat.gcd`, `Coprime`, `factorization`
- `Mathlib.Data.Nat.Factorization.Basic`: `factorization`, `primeFactorsList`, `ordProj`
- `Mathlib.Tactic.Peel`: for destructing `∃ n, ...` hypotheses
- `Mathlib.Algebra.Order.BigOperators.Ring.Finset`: `Finset.sum`, `Finset.prod`, `csSup`, etc.

Also relies on:
- `Classical` (via `open scoped Classical`)
- `MulOpposite`, `Submonoid`, `Subgroup`, `Pi`, `Prod`, `Set`, `Function`

---

This metadata captures the formal structure, naming discipline, and proof methodology of the `GroupTheory.Exponent` module in Lean 4, suitable for domain-specific AI agent training or formal verification tooling.