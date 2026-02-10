Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `Fintype.isPrimePow_card_of_field` | `[Fintype α] [Field α] → IsPrimePow ‖α‖` | Shows that any finite field has prime power cardinality. |
| `Fintype.nonempty_field_iff` | `[Fintype α] → Nonempty (Field α) ↔ IsPrimePow ‖α‖` | Characterizes when a finite type admits a field structure: iff its cardinality is a prime power. |
| `Fintype.not_isField_of_card_not_prime_pow` | `[Fintype α] [Ring α] → ¬IsPrimePow ‖α‖ → ¬IsField α` | Contrapositive of the above: if a finite ring’s cardinality isn’t a prime power, it cannot be a field. |
| `Infinite.nonempty_field` | `[Infinite α] → Nonempty (Field α)` | Shows that any infinite type can be equipped with a field structure. |
| `Field.nonempty_iff` | `Nonempty (Field α) ↔ IsPrimePow #α` | Full classification: a type admits a field structure iff its cardinality is a prime power (including infinite cardinals, since `IsPrimePow` for infinite cardinals is always true). |

> **Note**: In Lean’s `Cardinal`, `IsPrimePow κ` for infinite `κ` is defined as `κ = ℵ₀` or `κ` is a strong limit cardinal of uncountable cofinality — but in this context, the equivalence uses `Cardinal.isPrimePow_iff`, which simplifies for infinite cardinals to `True`, aligning with `Infinite.nonempty_field`.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isPrimePow_`: predicates involving `IsPrimePow`.
  - `nonempty_field`: existence of a field structure.
  - `card_`/`Fintype.card`: cardinality-related lemmas (`‖α‖` is notation for `Fintype.card α`).
- **Suffixes**:
  - `_of_field`: derived from the assumption of a field structure.
  - `_iff`: biconditional characterizations.
  - `not_..._of_...`: contrapositive forms.

---

### **3. Tactic Stack**

The proofs use a combination of:
- `cases'`: for destructuring existential/universal hypotheses (e.g., `CharP.exists`, `fintypeOrInfinite`).
- `rw`: rewriting using lemmas like `ZMod.card`, `GaloisField.card`, `Module.card_fintype`.
- `simp`: simplification with `Cardinal` and `Fintype`-related simp lemmas.
- `exact`: after simplification, to close goals directly.
- `map`: applied to `Cardinal.eq.1 this` to transport field structure along cardinal equality.
- `equivOfCardEq`: constructs an equivalence from equal finite cardinalities.
- `field`: constructor to lift field structure via equivalence.

No heavy automation (e.g., `aesop`, `linarith`) is used — the proofs are largely structural and rely on known library results.

---

### **4. Proof Logic**

- **Finite case (`Fintype.isPrimePow_card_of_field`)**:
  - Use `CharP.exists` to get characteristic `p`.
  - Equip the field with a `ZMod p`-algebra structure.
  - Use a finite basis (via `IsNoetherian.finsetBasis`) to relate cardinality to `p^n`.
  - Apply `isPrimePow_pow_iff` and `Module.finrank_pos.ne'`.

- **Finite classification (`Fintype.nonempty_field_iff`)**:
  - One direction via `isPrimePow_card_of_field`.
  - Other direction: construct `GaloisField p n`, use `Fintype.equivOfCardEq` to transfer structure.

- **Infinite case (`Infinite.nonempty_field`)**:
  - Reduce to showing `#α = #FractionRing(MvPolynomial α (ULift ℚ))`.
  - Use `simp` to simplify the right-hand side (the fraction field of a polynomial ring over ℚ has cardinality equal to the index set, i.e., `#α`).

- **Full classification (`Field.nonempty_iff`)**:
  - Split on `fintypeOrInfinite α`.
  - Finite case: apply `Fintype.nonempty_field_iff`.
  - Infinite case: use `Infinite.nonempty_field` and simplify using `Cardinal.infinite_iff`.

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Field.ULift` | For `ULift`-based field constructions (used in `Infinite.nonempty_field`). |
| `Mathlib.Algebra.MvPolynomial.Cardinal` | Cardinal arithmetic for multivariate polynomial rings. |
| `Mathlib.Data.Nat.Factorization.PrimePow` | Background on prime powers in `ℕ`. |
| `Mathlib.Data.Rat.Encodable` | Ensures ℚ is countable (used implicitly in `FractionRing (MvPolynomial ... ℚ)`). |
| `Mathlib.FieldTheory.Finite.GaloisField` | Construction and cardinality of finite Galois fields — key for finite case. |
| `Mathlib.RingTheory.Localization.Cardinality` | Cardinality of localizations (e.g., fraction fields). |
| `Mathlib.SetTheory.Cardinal.Divisibility` | Tools for cardinal arithmetic and divisibility, especially for infinite cardinals. |

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Field theory + cardinal arithmetic.
- **Key proof patterns**:
  - Use of `GaloisField` for finite fields.
  - Reduction to known cardinalities via equivalences (`equivOfCardEq`).
  - Handling finite vs. infinite via `fintypeOrInfinite`.
- **Critical lemmas**:
  - `GaloisField.card p n hn.ne'`
  - `CharP.exists`
  - `Cardinal.isPrimePow_iff`
  - `Module.card_fintype`

Let me know if you'd like a tactic-level trace or a visualization of the proof DAG.