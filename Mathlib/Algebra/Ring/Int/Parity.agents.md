### Technical Metadata Brief: `Mathlib.Algebra.Ring.Int.Parity`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `odd_iff` | `Odd n ↔ n % 2 = 1` | Characterizes odd integers via modulo 2. |
| `not_odd_iff` | `¬Odd n ↔ n % 2 = 0` | Complement of oddness: evenness via modulo. |
| `not_odd_zero` | `¬Odd (0 : ℤ)` | Zero is not odd (simplifies proofs). |
| `not_odd_iff_even` / `not_even_iff_odd` | `¬Odd n ↔ Even n`, `¬Even n ↔ Odd n` | Logical equivalence between even/odd and their negations. |
| `even_or_odd` | `Even n ∨ Odd n` | Every integer is even or odd (law of excluded middle for parity). |
| `even_or_odd'` | `∃ k, n = 2 * k ∨ n = 2 * k + 1` | Explicit existential form of parity decomposition. |
| `even_xor'_odd` / `even_xor'_odd'` | `Xor' (Even n) (Odd n)` | Mutual exclusivity and exhaustiveness of parity. |
| `even_add'` / `even_sub'` | `Even (m + n) ↔ (Odd m ↔ Odd n)` | Parity of sum/difference depends on parity equivalence. |
| `odd_mul` | `Odd (m * n) ↔ Odd m ∧ Odd n` | Product is odd iff both factors are odd. |
| `odd_pow` | `Odd (m ^ n) ↔ Odd m ∨ n = 0` | Power parity: odd base or zero exponent. |
| `odd_add` / `odd_sub` | `Odd (m + n) ↔ (Odd m ↔ Even n)` | Parity of sum/difference with one odd. |
| `ne_of_odd_add` | `Odd (m + n) → m ≠ n` | If sum is odd, summands differ. |
| `four_dvd_add_or_sub_of_odd` | `Odd a ∧ Odd b → 4 ∣ a + b ∨ 4 ∣ a - b` | Sum or difference of two odds divisible by 4. |
| `two_mul_ediv_two_of_odd` | `Odd n → 2 * (n / 2) = n - 1` | Structural property of odd integers under division. |
| `natAbs_even` / `natAbs_odd` | `Even n.natAbs ↔ Even n`, `Odd n.natAbs ↔ Odd n` | Parity preserved under absolute value. |
| `odd_coe_nat` | `Odd (n : ℤ) ↔ Odd n` | Compatibility of parity with coercion from `ℕ`. |
| `isSquare_natCast_iff` | `IsSquare (n : ℤ) ↔ IsSquare n` | Squareness preserved under coercion to `ℤ`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `odd_`, `even_`: Core parity lemmas.
  - `not_`: Negated parity properties (`not_odd_iff`, `not_even_iff_odd`).
  - `natAbs_`: Absolute value interactions.
  - `of_mul_left`, `of_mul_right`: Projection lemmas from compound statements.
- **Suffixes**:
  - `'` (prime): Alternate or reformulated versions (e.g., `odd_add'`, `even_sub'`).
  - `'_` (underscore): Variant with different quantifier structure or symmetry (e.g., `even_xor'_odd`).
- **`[parity_simps]` attribute**: Marks lemmas for use in `simp`-based parity simplification (e.g., `odd_mul`, `odd_pow`, `odd_add`, `odd_sub`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`: Rewriting using equivalences (`odd_iff`, `even_iff`, etc.).
  - `simp` / `simp only`: Simplification with `parity_simps` lemmas and definitions.
  - `cases`: Case analysis on `even_or_odd`, `Xor'`, or existential witnesses.
  - `convert`: Used to reduce goals to known equalities (e.g., in division lemmas).
  - `intro` / `rintro`: Introducing hypotheses and destructuring existentials.
  - `exact`, `assumption`: Closing goals with existing hypotheses.
  - `ring`: Implicitly used in simplifications involving arithmetic (e.g., `mul_add`, `add_assoc`).
  - `aesop`: Not explicitly used here, but `simp` + `parity_simps` serves similar purpose.

---

#### **4. Proof Logic**

- **Inductive/Case-based reasoning**:
  - Parity decomposition (`even_or_odd`) is the primary proof strategy.
  - Existential witnesses (`⟨k, rfl⟩`) are extracted from `even_or_odd'` or `odd_iff`.
- **Equivalence chaining**:
  - Many proofs use `↔`-elimination (`mp`/`mpr`) and transitivity (`trans`) to relate parity to modulo arithmetic.
- **Logical duality**:
  - Negation-based reasoning (`not_odd_iff_even`) used to switch between even/odd.
- **Algebraic manipulation**:
  - Division algorithm (`ediv_add_emod'`) and modular arithmetic (`emod_add_ediv`) used to derive structural identities (e.g., `2 * (n / 2) = n - 1` for odd `n`).
- **Symmetry & commutativity**:
  - `add_comm`, `mul_comm`, and related rewrites used to align terms for simplification.

---

#### **5. Imports**

- `Mathlib.Algebra.Ring.Parity`: Core parity infrastructure (definitions, basic lemmas).
- `Mathlib.Algebra.Ring.Int.Defs`: Definitions and basic properties of `ℤ`, including `even`, `odd`, `%`, `/`, `natAbs`, `ofNat`, coercion.

> **Scope**: This module formalizes foundational parity theory for the integers, emphasizing equivalence with modulo arithmetic, closure properties (sum, product, power), and interactions with absolute value and coercion from naturals. It serves as a low-level dependency for higher-level number-theoretic developments in Mathlib.

--- 

Let me know if you'd like a dependency graph or a summary of how this module integrates with other parity-related files (e.g., `Mathlib.Algebra.Ring.Nat.Parity`).