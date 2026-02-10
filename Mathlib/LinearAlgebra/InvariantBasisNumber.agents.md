Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `StrongRankCondition R` | `Prop` | States: any injective linear map `Rⁿ → Rᵐ` implies `n ≤ m`. |
| `le_of_fin_injective` | `∀ {n m}, (Rⁿ →ₗ Rᵐ) → Injective → n ≤ m` | Extracts inequality from injective maps under `StrongRankCondition`. |
| `strongRankCondition_iff_succ` | `StrongRankCondition R ↔ ∀ n f : R^{n+1} → Rⁿ, ¬Injective f` | Equivalent characterization using maps from one higher dimension. |
| `strongRankCondition_of_orzechProperty` | `[Nontrivial R] → [OrzechProperty R] → StrongRankCondition R` | Orzech property ⇒ strong rank condition (for nontrivial rings). |
| `card_le_of_injective` | `[StrongRankCondition R] → (α → R) →ₗ (β → R) → Injective → #α ≤ #β` | Extends strong rank condition to arbitrary finite types. |
| `RankCondition R` | `Prop` | States: any surjective linear map `Rⁿ → Rᵐ` implies `m ≤ n`. |
| `le_of_fin_surjective` | `∀ {n m}, (Rⁿ →ₗ Rᵐ) → Surjective → m ≤ n` | Extracts inequality from surjective maps under `RankCondition`. |
| `rankCondition_of_strongRankCondition` | `[StrongRankCondition R] → RankCondition R` | Strong rank condition ⇒ rank condition. |
| `InvariantBasisNumber R` | `Prop` | States: any linear equivalence `Rⁿ ≃ Rᵐ` implies `n = m`. |
| `eq_of_fin_equiv` | `∀ {n m}, (Rⁿ ≃ₗ Rᵐ) → n = m` | Core property of IBN: uniqueness of rank. |
| `invariantBasisNumber_of_rankCondition` | `[RankCondition R] → InvariantBasisNumber R` | Rank condition ⇒ IBN. |
| `invariantBasisNumber_of_nontrivial_of_commRing` | `[CommRing R] → [Nontrivial R] → InvariantBasisNumber R` | Nontrivial commutative rings have IBN (via quotient by maximal ideal). |
| `induced_equiv` | `(R^ι ≃ₗ R^ι') → (R^ι / I^ι) ≃ₗ[R/I] (R^ι' / I^ι')` | Induces module isomorphism modulo ideal. |
| `IsNoetherianRing.strongRankCondition` | `[IsNoetherianRing R] → [Nontrivial R] → StrongRankCondition R` | Noetherian rings satisfy strong rank condition. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `le_of_...`: Extract inequality from existence of (injective/surjective) maps.
  - `card_le_of_...`: Generalize inequalities to finite types (`α`, `β`).
  - `induced_...`: Maps or equivalences induced on quotients.
  - `invariantBasisNumber_of_...`, `rankCondition_of_...`, `strongRankCondition_of_...`: Implication chains between properties.

- **Suffixes**:
  - `_equiv`: Linear equivalence (`≃ₗ`).
  - `_map`: Linear map (`→ₗ`).
  - `_iff_...`: Logical equivalence (↔) characterizations.

- **Module notation**:
  - `Fin n → R`: Free module of rank `n`.
  - `α → R`, `α →₀ R`: Free module over finite type `α` (all functions / finitely supported functions).
  - `R ⧸ I`: Quotient module/ring.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `refine`, `exact`, `convert_to`, `congr`: For structured proof construction.
- `simp`, `simp only`, `simp_rw`: Simplification with lemmas (e.g., `update_apply`, `LinearEquiv.map_smulₛₗ`).
- `aesop`: For simple goals involving subsingleton reasoning.
- `intro`, `rintro`, `ext`: Intro + extensionality.
- `convert_to ... congr`: For reducing to congruence of terms.
- `by_contra`, `contradiction`: For negation handling.
- `apply`, `apply_fun`, `rw`: Rewriting and application.
- `exact?` (implied): For `mk_iff`-generated lemmas.

---

### **4. Proof Logic**

- **General proof strategy**:
  - Reduce to standard case (`Fin n → R`) via `LinearEquiv.funCongrLeft` or `Finsupp.linearEquivFunOnFinite`.
  - Use `mk_iff` to generate `iff`-style characterizations (e.g., `strongRankCondition_iff_succ`).
  - For commutative rings: lift isomorphism modulo maximal ideal → use field case (`R/I` is a field) → apply known IBN for fields.

- **Common pattern**:
  - Prove implication chain:  
    `OrzechProperty ⇒ StrongRankCondition ⇒ RankCondition ⇒ IBN`  
    and  
    `Nontrivial CommRing ⇒ IBN` (via quotient by maximal ideal).
  - Use splitting of surjective maps (`splittingOfFunOnFintypeSurjective_injective`) to derive injective maps for rank condition.

- **Inductive/structural reasoning**:
  - Rarely induction; mostly algebraic manipulation and module-theoretic constructions (e.g., induced maps on quotients).

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.RingTheory.Ideal.Quotient.Basic` | Quotient rings/modules, `Ideal.pi`, `Quotient.liftOn'`, etc. |
| `Mathlib.RingTheory.Noetherian.Orzech` | Orzech property for Noetherian rings. |
| `Mathlib.RingTheory.OrzechProperty` | Definition and basic facts about Orzech property. |
| `Mathlib.RingTheory.PrincipalIdealDomain` | (Possibly for future use; not directly used here.) |
| `Mathlib.LinearAlgebra.Finsupp.Pi` | `Finsupp`, `linearEquivFunOnFinite`, `Pi`-constructions for free modules. |

---

### **6. Summary of Logical Dependencies**

```
OrzechProperty + Nontrivial ⇒ StrongRankCondition
StrongRankCondition ⇒ RankCondition
RankCondition ⇒ InvariantBasisNumber

Nontrivial CommRing ⇒ InvariantBasisNumber
(Nontrivial Noetherian Ring ⇒ StrongRankCondition ⇒ RankCondition ⇒ IBN)
```

---

Let me know if you'd like this exported as JSON or YAML for ingestion into an AI agent pipeline.