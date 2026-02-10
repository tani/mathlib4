### Technical Metadata Brief: `HigherFacesVanish` in Dold-Kan Correspondence (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HigherFacesVanish` | `def HigherFacesVanish {Y : C} {n : ℕ} (q : ℕ) (φ : Y ⟶ X _[n + 1]) : Prop` | A predicate stating that a morphism `φ` vanishes when composed with the *top `q` nonzero face maps* `X.δ j` (for `j ≥ max 1 (n+2-q)`). Central technical condition for homotopy projections. |
| `comp_δ_eq_zero` | `∀ j, j ≠ 0 → n + 2 ≤ j + q → φ ≫ X.δ j = 0` | Reformulation of `HigherFacesVanish` for `Fin (n+2)`, handling `j ≠ 0`. |
| `of_succ` | `HigherFacesVanish (q + 1) φ → HigherFacesVanish q φ` | Monotonicity: vanishing for more faces implies vanishing for fewer. |
| `of_comp` | `HigherFacesVanish q φ → HigherFacesVanish q (f ≫ φ)` | Stability under precomposition. |
| `comp_Hσ_eq` | `n = a + q → φ ≫ (Hσ q).f (n+1) = -φ ≫ X.δ (a+1) ≫ X.σ a` | Key technical identity: expresses composition with the homotopy operator `Hσ q` in terms of face and degeneracy maps, assuming `n = a + q`. Used to reduce to lower-dimensional cases. |
| `comp_Hσ_eq_zero` | `n < q → φ ≫ (Hσ q).f (n+1) = 0` | Vanishing of `φ` after applying `Hσ q` when `q` is large relative to `n`. |
| `induction` | `HigherFacesVanish q φ → HigherFacesVanish (q + 1) (φ ≫ (1 + Hσ q).f (n+1))` | Core inductive step: shows that applying `(1 + Hσ q)` increases the vanishing degree by 1. Enables induction on `q`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `HigherFacesVanish.`: Module namespace for lemmas about the predicate.
  - `comp_`: Indicates composition with a morphism (e.g., `comp_δ_eq_zero`, `comp_Hσ_eq`).
  - `of_`: Indicates a weakening or pullback property (e.g., `of_succ`, `of_comp`).
- **Suffixes**:
  - `_eq`: Equality statement (e.g., `comp_Hσ_eq`).
  - `_eq_zero`: Vanishing equality (e.g., `comp_Hσ_eq_zero`).
- **Variables**:
  - `q`: "vanishing degree" (number of top faces killed).
  - `n`: simplex dimension (`X _[n+1]`).
  - `a`: auxiliary variable used when `n = a + q`.
  - `j`: index for face maps (`Fin (n+1)` or `Fin (n+2)`).

---

#### **3. Tactic Stack**

- **Core automation**:
  - `omega`: Used extensively for arithmetic reasoning (`n < q`, `n = a + q`, bounds on `j`).
  - `simp only [...]`: Heavy use of targeted simplification with explicit lemmas (e.g., `Fin.mk_zero`, `δ_comp_σ_self`, `zsmul_comp`).
  - `rw [...]`: Rewriting with definitions (`Hσ`, `hσ'_eq`, `comp_zero`, `assoc`).
- **Algebraic simplification**:
  - `ring`: In `comp_Hσ_eq`, to verify linear combinations vanish.
  - `conv_lhs => congr ...`: To decompose complex expressions into subgoals.
- **Case analysis**:
  - `cases' Nat.le.dest ...`: Extract witness `a` from `n ≥ q`.
  - `cases' n with m hm`: Induction on `n`.
  - `by_cases hqn : n < q`: Split on comparison of `n` and `q`.
- **Homological algebra**:
  - `erw [...]`: Eager rewriting (e.g., `δ_comp_σ_of_le`, `δ_comp_σ_of_gt'`).
  - `convert v ...`: Use vanishing hypothesis to reduce goal.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - The main lemma `induction` proceeds by **induction on `q`**, but internally uses **case analysis on `n` vs. `q`**:
    1. **Case `n < q`**: Immediate from `comp_Hσ_eq_zero`.
    2. **Case `n ≥ q`**: Write `n = a + q`, apply `comp_Hσ_eq`, then:
       - Subcase `n = 0`: Direct verification.
       - Subcase `n = m + 1`: Further split on `j = a` or `j > a`.
         - If `j > a`, use face-degeneracy identities (`δ_comp_σ_of_gt'`, `δ_comp_σ_self`, `δ_comp_σ_succ`).
         - If `a < m`, use higher face vanishing (`v j ...`).
         - If `a = m`, reduce to `q = 1` and use `δ_comp_δ_self'`.
- **Key logical flow**:
  - **Goal**: Prove `φ ≫ (1 + Hσ q)` kills top `q+1` faces.
  - **Strategy**: Expand composition, apply vanishing hypothesis `v`, and simplify using simplicial identities.
  - **Critical tool**: `comp_Hσ_eq` rewrites `Hσ q` as a sum involving face/degeneracy maps; vanishing of top faces kills most terms.

---

#### **5. Imports & Scope**

- **Primary dependencies**:
  - `Mathlib.AlgebraicTopology.DoldKan.Homotopies`: Defines `Hσ q`, `P q`, and the homotopy machinery.
  - `Mathlib.Tactic.Ring`: For polynomial simplification in `comp_Hσ_eq`.
- **Implicit context**:
  - `C`: A preadditive category.
  - `X`: A simplicial object in `C`.
  - `δ j`, `σ j`: Face and degeneracy maps of `X`.
  - `Hσ q`: The homotopy operator used in the Dold-Kan projection strategy.
- **Scope**: Technical lemmas for `Projections.lean` and ultimately `Equivalence.lean` (proof of Dold-Kan equivalence).

---

### Summary

This file formalizes the *vanishing of higher faces* under homotopy operators — a foundational technical layer for the Dold-Kan correspondence in a general preadditive setting. The lemmas `comp_Hσ_eq` and `induction` are the linchpins, enabling inductive control over face map compositions via simplicial identities and arithmetic reasoning. The style is highly structured, with heavy use of `omega` and `simp only` to automate routine but delicate combinatorics of `Fin` and natural numbers.