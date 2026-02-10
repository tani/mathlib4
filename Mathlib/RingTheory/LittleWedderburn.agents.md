### Technical Metadata Brief: Wedderburn’s Little Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `InductionHyp` | `Prop` | Internal induction hypothesis: *every proper subring of `D` is commutative*. |
| `InductionHyp.field` | `R < ⊤ → Field R` | Constructs a field structure on a proper subring `R` using the induction hypothesis. |
| `InductionHyp.center_eq_top` | `[Finite D] → Subring.center D = ⊤` | Core lemma: under the induction hypothesis, the center of `D` is all of `D`. |
| `center_eq_top` | `[Finite D] → Subring.center D = ⊤` | Main structural result: center of finite division ring is full ring (via strong induction). |
| `littleWedderburn` | `[DivisionRing D] [Finite D] → Field D` | **Main theorem**: every finite division ring is commutative (i.e., a field). |
| `Finite.isDomain_to_isField` | `[Ring D] [Finite D] [IsDomain D] → IsField D` | Corollary: finite integral domain ⇒ field. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsDomain`, `IsField`, `IsScalarTower` — typeclass properties.
  - `center_`: e.g., `Subring.center`, `center_eq_top`, `Subring.mem_center_iff` — center-related constructions.
  - `card_`: e.g., `card_eq_pow_finrank`, `card_units`, `card_congr` — cardinality lemmas.
  - `eval_`: e.g., `eval_dvd`, `eval_X`, `eval_pow`, `eval_sub` — evaluation of polynomials at ring elements.
  - `cyclotomic_`: e.g., `cyclotomic.dvd_X_pow_sub_one`, `evalRingHom` — cyclotomic polynomial properties.

- **Suffixes**:
  - `_eq_top`: equality of a subobject (e.g., center, centralizer) with the top element.
  - `_le_one_iff`: characterizations of triviality via dimension.
  - `_mul_smul_comm`: commutativity of scalar multiplication with ring multiplication.

- **Internal namespace**: `LittleWedderburn.InductionHyp` — all definitions/lemmas prefixed with `InductionHyp.` are internal proof machinery.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities (especially cardinalities, units, cyclotomic divisibility). |
| `simp` / `simp only` | Simplification with custom config (`zeta := false`) to avoid unwanted reductions. |
| `apply_fun` | Applying a function (e.g., `Nat.cast`) to both sides of an equation. |
| `exact`, `refine`, `obtain`, `cases` | Standard proof construction and destructuring. |
| `by_contra!` | Proof by contradiction (used twice: for center and centralizer ≠ top). |
| `convert` | Unification with flexibility in proof goals (e.g., `convert Set.card_lt_card hR`). |
| `have` / `suffices` | Intermediate lemma introduction or goal reformulation. |
| `set ... with ...` | Introducing new constants with definitional equalities. |
| `clear_value` | Removing definitional equalities to avoid interference. |
| `ring` / `linarith` | Implicitly used via `simp` and arithmetic reasoning (e.g., `tsub_pos_of_lt`). |

---

#### **4. Proof Logic**

The proof follows a **strong induction on the cardinality of `D`**, leveraging:

1. **Class equation for the multiplicative group `Dˣ`**:
   - `|Dˣ| = |Z(Dˣ)| + ∑ |cl(x)|`, where `cl(x)` are non-central conjugacy classes.
   - After translating to integers via `Nat.cast`, the equation becomes:
     ```
     qⁿ - 1 = q - 1 + ∑ |cl(x)|
     ```
     where `q = |Z|`, `n = finrank_Z D`.

2. **Cyclotomic polynomial divisibility**:
   - `Φₙ(q) ∣ qⁿ - 1`, but `Φₙ(q) ∤ q - 1` for `n > 1`.
   - Each conjugacy class size `|cl(x)| = (qⁿ - 1)/(qᵈ - 1)` for `d = finrank_Z Zx < n`.
   - Since `d ∣ n` and `d < n`, `Φₙ(q) ∣ |cl(x)|`, so `Φₙ(q) ∣ ∑ |cl(x)|`.
   - Contradiction unless `n = 1`, i.e., `D = Z`, so `D` is commutative.

3. **Inductive step**:
   - For any proper subring `R ⊂ D`, `|R| < |D|`, so by induction `R` is commutative.
   - Thus `InductionHyp D` holds, implying `center D = ⊤`, i.e., `D` is commutative.

4. **Final step**:
   - `littleWedderburn` upgrades the division ring to a field by adding `mul_comm`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.GroupTheory.ClassEquation` | Class equation for group actions (conjugacy classes). |
| `Mathlib.GroupTheory.GroupAction.ConjAct` | Conjugation action and centralizers. |
| `Mathlib.RingTheory.Polynomial.Cyclotomic.Eval` | Evaluation of cyclotomic polynomials and divisibility (`Φₙ(q) ∣ qⁿ - 1`). |
| `Mathlib.LinearAlgebra.FreeModule.StrongRankCondition` | Used for `finrank_mul_finrank`, `finrank_le_one_iff`, etc. |

**Key auxiliary structures used**:
- `Subring`, `Subgroup`, `Field`, `DivisionRing`, `Algebra`, `IsScalarTower`
- `ConjClasses`, `centralizer`, `unitsCentralizerEquiv`
- `cyclotomic`, `Polynomial.eval`, `finrank`, `card_eq_pow_finrank`

---

### Summary

This formalization of **Wedderburn’s Little Theorem** in Lean 4 is a sophisticated blend of:
- **Group-theoretic class equations**,
- **Cyclotomic polynomial arithmetic**,
- **Linear algebra over finite fields**,
- **Inductive reasoning on finite cardinalities**.

It showcases Lean’s strength in organizing complex algebraic proofs with precise dependency tracking and reusable abstractions.