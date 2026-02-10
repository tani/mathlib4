Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HigherFacesVanish.comp_σ` | `{Y : C} → {X : SimplicialObject C} → {n b q : ℕ} → {φ : Y ⟶ X _[n + 1]} → HigherFacesVanish q φ → n + 1 = b + q → HigherFacesVanish q (φ ≫ X.σ ⟨b, ...⟩)` | Shows that if a morphism `φ` vanishes on all higher faces, then so does its composition with a degeneracy `X.σ`, under a matching dimension condition. |
| `σ_comp_P_eq_zero` | `(X : SimplicialObject C) → {n q : ℕ} → (i : Fin (n + 1)) → n + 1 ≤ i + q → X.σ i ≫ (P q).f (n + 1) = 0` | Core vanishing lemma: degeneracy maps composed with the projector `P q` are zero when the degeneracy index is sufficiently small relative to `q`. |
| `σ_comp_PInfty` | `(X : SimplicialObject C) → {n : ℕ} → (i : Fin (n + 1)) → X.σ i ≫ PInfty.f (n + 1) = 0` | Immediate corollary of `σ_comp_P_eq_zero`: degeneracies vanish under the infinite projector `PInfty`. |
| `degeneracy_comp_PInfty` | `(X : SimplicialObject C) → (n : ℕ) → {Δ' : SimplexCategory} → (θ : [n] ⟶ Δ') → ¬Mono θ → X.map θ.op ≫ PInfty.f n = 0` | Main result: any non-monomorphic (i.e., non-injective) simplex map composed with `PInfty` is zero — formalizing that `PInfty` projects onto the normalized complex, killing degenerate simplices. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `σ_`: refers to degeneracy maps (`X.σ i`), standard in simplicial objects.
  - `P_`: refers to the finite approximations of the projector (e.g., `P q`, `P q n`).
  - `PInfty_`: refers to the limiting projector `PInfty`.
  - `HigherFacesVanish_`: predicates about vanishing of morphisms on higher faces.

- **Suffixes**:
  - `_eq_zero`: theorems asserting a composite equals zero.
  - `_comp_`: composition lemmas (e.g., `σ_comp_P_eq_zero`, `degeneracy_comp_PInfty`).
  - `_f`: projection to the `f` component of a natural transformation / morphism of chain complexes.

- **Other patterns**:
  - `assoc`, `reassoc`, `comp_id`, `zero_comp`, `add_comp`, etc., are used in rewriting (Lean’s `reassoc` attribute for `simp`).
  - `rev`, `succ`, `castSucc`, `mk`, `val`: standard `Fin`-related operations.

---

### 🔹 **Tactic Stack**

The proofs rely heavily on:

- `induction'`: structural induction on `q`.
- `fin_cases`: case analysis on `Fin` terms (e.g., `Fin 2`, `Fin 3`).
- `omega`: for automated reasoning about linear arithmetic over `ℕ`.
- `simp only [...]`: highly targeted simplification using many lemmas (especially about `Fin`, `σ`, `δ`, `P`, `Hσ`, etc.).
- `rw [...]`: rewriting with equalities and definitions (e.g., `P_succ`, `decomposition_Q`, `σ_comp_σ_assoc`).
- `erw`: rewriting with definitional equality (used for `v.comp_P_eq_self`, etc.).
- `obtain ⟨i, α, h⟩ := ...`: destructuring existential statements (e.g., decomposition of non-injective maps).
- `intro`, `intro h`, `by_cases h`: standard intro/case-splitting.
- `aesop` is *not* used — proofs are highly manual and rely on explicit simp sets.

---

### 🔹 **Proof Logic / Strategy**

- **Inductive structure**: Proofs proceed by induction on `q` (the "degree" of the projector `P q`).
- **Case splitting**:
  - On whether `n + 1 ≤ i + q` holds (for `σ_comp_P_eq_zero`).
  - On `n = 0` or `n > 0` (via `rcases n`).
  - On `Fin` indices (e.g., `i : Fin 2`).
- **Key decomposition**:
  - Use of `P_add_Q_f : P q + Q n q = 𝟙`, i.e., the decomposition of the identity into projectors.
  - Use of `HigherFacesVanish.of_P` to relate `P q` to face-vanishing conditions.
- **Simplicial identities**:
  - Heavy use of standard simplicial identities: `δ_comp_σ_self`, `δ_comp_σ_succ`, `σ_comp_σ`, etc.
- **Non-injective maps**:
  - Use of `SimplexCategory.eq_σ_comp_of_not_injective`: any non-mono map factors as a degeneracy followed by a mono.
  - Then reduce to `σ_comp_PInfty`.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicTopology.DoldKan.Decomposition` | Provides the decomposition `P q + Q n q = 𝟙`, definitions of `P q`, `Q n q`, `Hσ`, etc. |
| `Mathlib.Tactic.FinCases` | Enables `fin_cases` tactic for case analysis on `Fin` types. |
| `CategoryTheory.*` (multiple modules) | Provides foundational categorical infrastructure: preadditive categories, simplicial objects, homological complexes, natural transformations, etc. |

---

### 🔹 **Domain Context**

- **Mathematical area**: Homological algebra, specifically the **Dold–Kan correspondence**.
- **Goal**: Show that the projector `PInfty` onto the normalized complex kills degenerate simplices — a key step in proving the equivalence between simplicial objects and chain complexes in abelian categories.
- **Assumptions**:
  - `C` is a **preadditive** category (needed for additive structure, zero morphisms, biproducts).
  - `X` is a **simplicial object** in `C`.
  - Maps like `θ : [n] → Δ'` are interpreted via `SimplexCategory`, with `op` for contravariance.

---

Let me know if you'd like a **proof sketch diagram**, **dependency graph**, or **formalization recommendations** for extending this file.