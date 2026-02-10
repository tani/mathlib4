Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `decomposition_Q` | `∀ (n q : ℕ), ((Q q).f (n + 1) : X _[n + 1] ⟶ X _[n + 1]) = ∑ i ∈ Finset.filter (λ i => i < q), (P i).f (n + 1) ≫ X.δ i.rev.succ ≫ X.σ (Fin.rev i)`<br>→ *Decomposes the idempotent endomorphism `Q q` as a sum of degeneracy postcompositions.* |
| `MorphComponents` | Structure with fields `a : X _[n+1] ⟶ Z`, `b : Fin (n+1) → (X _[n] ⟶ Z)`<br>→ *Encodes data needed to define morphisms `X _[n+1] ⟶ Z` using the decomposition from `decomposition_Q`.* |
| `MorphComponents.φ` | `X _[n+1] ⟶ Z` defined via `PInfty.f ≫ a + ∑ (P i).f ≫ X.δ ≫ b`<br>→ *Constructs a morphism from the component data.* |
| `MorphComponents.id` | Canonical `MorphComponents` with `a := PInfty.f`, `b i := X.σ i`<br>→ *Yields identity morphism under `φ` (via `decomposition_Q`).* |
| `MorphComponents.postComp` | Postcomposition of `MorphComponents` with `Z → Z'`<br>→ *Functorial in codomain.* |
| `MorphComponents.preComp` | Precomposition with `X' → X`<br>→ *Functorial in domain.* |

---

### 🔹 **Naming Conventions**

- **Prefixes:**
  - `decomposition_`: for structural decomposition lemmas (`decomposition_Q`)
  - `MorphComponents._`: for structure and its operations (`φ`, `id`, `postComp`, `preComp`)
  - `P_`, `Q_`, `PInfty_`: for projections in the Dold–Kan decomposition (`P i`, `Q q`, `PInfty`)
  - `δ`, `σ`: standard simplicial face and degeneracy maps (`X.δ`, `X.σ`)
- **Suffixes:**
  - `_f`: for components of natural transformations (e.g., `(P i).f (n+1)`)
  - `_app`: for components of simplicial object morphisms (`g.app (op [n+1])`)
- **Variables:**
  - `n`, `q`: natural numbers indexing degrees and projection levels
  - `i`, `i.rev`: elements of `Fin (n+1)` used for indexing summands

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `induction'` — for inductive arguments on `q`
- `simp only [...]` — targeted simplification using lemmas like `P_f_idem`, `P_add_Q_f`, `decomposition_Q`
- `congr` / `congr 1` — to reduce equality goals to component-wise equalities
- `aesop` — for automated reasoning in simple goals (e.g., `Finset.mem_filter`, arithmetic)
- `rw [...]` — rewriting using naturality, simplicial identities, and definitions
- `conv_rhs => rw [...]` — right-hand side rewriting in congruence contexts
- `ext` — extensionality for morphisms (especially in `Finset.sum` contexts)
- `omega` — for arithmetic reasoning (e.g., bounding indices, `≤`/`<` manipulations)

---

### 🔹 **Proof Logic**

- **Inductive decomposition**: Prove `decomposition_Q` by induction on `q`, handling base case (`q = 0`) via `Q_zero`, and inductive step via case analysis on `q + 1 ≤ n + 1`.
- **Case splitting**: Use `by_cases hqn : q + 1 ≤ n + 1` to distinguish when `Q q` stabilizes vs. when it evolves.
- **Sum manipulation**: Use `Finset.add_sum_erase` to split sums over `Finset.filter`, and `Finset.ext` to compare summands.
- **Simplicial identities**: Leverage naturality of `δ`, `σ`, and projections (`PInfty_f`, `P_f_naturality_assoc`, `SimplicialObject.δ_naturality_assoc`).
- **Structure-based construction**: Define morphisms via `MorphComponents.φ`, then verify correctness using `decomposition_Q` (e.g., `id_φ`).

---

### 🔹 **Imports & Dependencies**

- **Core imports**:
  - `Mathlib.AlgebraicTopology.DoldKan.PInfty` — provides `PInfty`, `P`, `Q`, and foundational decomposition lemmas.
- **Context assumptions**:
  - `[Category C] [Preadditive C]` — ensures hom-sets are abelian groups, sums exist, etc.
  - `X : SimplicialObject C` — object in the category of simplicial objects over `C`.
- **Relevant submodules**:
  - `CategoryTheory.Preadditive`, `Simplicial`, `Opposite`, `CategoryTheory.Category` — for categorical and simplicial infrastructure.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch visualization**, or **Lean-to-English glossary** for this module.