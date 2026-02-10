Here's a structured technical metadata brief extracted from the provided Lean 4 file on **simplicial sets** (`SSet`), suitable for building a domain-specific AI agent in the Lean/proof assistant ecosystem:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SSet` | `Type (u + 1)` | Category of simplicial sets: `SimplicialObject (Type u)` |
| `standardSimplex` | `SimplexCategory ⥤ SSet` | Yoneda embedding `y : SimplexCategory → SSet`, composed with `uliftFunctor` |
| `Δ[n]` | `SSet` | `n`-th standard simplex: `standardSimplex.obj (SimplexCategory.mk n)` |
| `id n` | `Δ[n] _[n]` | Canonical non-degenerate `n`-simplex in `Δ[n]` |
| `const n k m` | `Δ[n].obj m` | Degenerate `m`-simplex concentrated at vertex `k` |
| `edge n a b hab` | `Δ[n] _[1]` | Edge from `a` to `b` in `Δ[n]`, for `a ≤ b` |
| `triangle a b c hab hbc` | `Δ[n] _[2]` | 2-simplex with vertices `a, b, c`, for `a ≤ b ≤ c` |
| `boundary n` | `SSet` | Boundary simplicial set: subsimplicial set of `Δ[n]` of non-surjective simplices |
| `∂Δ[n]` | `SSet` | Notation for `boundary n` |
| `boundaryInclusion n` | `∂Δ[n] ⟶ Δ[n]` | Canonical inclusion of boundary into standard simplex |
| `horn n i` | `SSet` | `i`-th horn: subsimplicial set of `Δ[n]` where image ∪ `{i}` ≠ full simplex |
| `Λ[n, i]` | `SSet` | Notation for `horn n i` |
| `hornInclusion n i` | `Λ[n, i] ⟶ Δ[n]` | Inclusion of horn into standard simplex |
| `horn.face i j h` | `Λ[n+1, i] _[n]` | `j`-th face of horn (excluding `i`) |
| `horn.edge n i a b hab H` | `Λ[n, i] _[1]` | Edge in horn, assuming `{i, a, b}` small enough |
| `horn.primitiveEdge h₀ hₙ j` | `Λ[n, i] _[1]` | Edge between consecutive vertices, for horns in quasicategories |
| `horn.primitiveTriangle h₀ hₙ k h` | `Λ[n+3, i] _[2]` | Triangle of three consecutive vertices in horn |
| `horn.hom_ext` | `∀ σ₁ σ₂, (∀ j ≠ i, σ₁(face i j) = σ₂(face i j)) → σ₁ = σ₂` | Extensionality for horn morphisms |
| `SSet.yonedaEquiv` | `(standardSimplex.obj n ⟶ X) ≃ X.obj (op n)` | Yoneda lemma for simplicial sets |
| `asOrderHom` | `Δ[n].obj m → OrderHom (Fin (m+1)) (Fin (n+1))` | Equivalence between simplices and monotone maps |
| `truncation n` | `SSet ⥤ SSet.Truncated n` | Truncation functor (truncates simplices above dimension `n`) |
| `sk n`, `cosk n` | `SSet ⥤ SSet` | `n`-skeleton and `n`-coskeleton endofunctors |
| `skAdj n`, `coskAdj n` | `sk n ⊣ truncation n`, `truncation n ⊣ cosk n` | Adjunctions between skeleton/truncation/coskeleton |
| `Augmented.standardSimplex` | `SimplexCategory ⥤ SSet.Augmented` | Augmented standard simplex (with augmentation to terminal) |

---

### 🔹 **Naming Conventions**

| Pattern | Meaning | Examples |
|--------|---------|----------|
| `Δ[n]`, `∂Δ[n]`, `Λ[n, i]` | Standard notation for standard simplex, boundary, horn | `Δ[2]`, `∂Δ[3]`, `Λ[4, 1]` |
| `id n`, `const n k m`, `edge n a b hab`, `triangle a b c hab hbc` | Constructors for simplices in `Δ[n]` | `id 2`, `const 3 1 [1]`, `edge 2 0 2 le_rfl` |
| `face i j h`, `edge n i a b hab H`, `primitiveEdge h₀ hₙ j` | Horn-specific constructors | `face 1 0 h₀1`, `primitiveEdge h0 h2 1` |
| `boundaryInclusion`, `hornInclusion` | Inclusion maps of sub-simplicial sets | `boundaryInclusion 3`, `hornInclusion 2 1` |
| `sk n`, `cosk n`, `truncation n` | Functors on `SSet` | `sk 2`, `cosk 1`, `truncation 0` |
| `δ i`, `σ i` | Face and degeneracy maps (inherited from `SimplicialObject`) | `S.δ 0`, `S.σ 1` |
| `asOrderHom`, `objEquiv`, `yonedaEquiv` | Equivalences / projections to order-theoretic data | `asOrderHom α`, `yonedaEquiv X n` |

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs and constructions:

| Tactic | Usage |
|--------|-------|
| `rfl` | Definitional equalities (e.g., `id_eq_objEquiv_symm`, `coe_edge_down_toOrderHom`) |
| `simp only [...]` | Simplification with precise lemmas, especially for `Fin`, `OrderHom`, `Set` |
| `ext` / `hom_ext` | Proving equality of morphisms via extensionality |
| `apply Subtype.ext` | Equality in subtype (e.g., for horns/boundaries) |
| `fin_cases` | Case analysis on `Fin n` elements |
| `obtain ⟨x, hx⟩` / `rcases` | Existential destructuring (e.g., surjectivity negation) |
| `rw [...] at *` | Rewriting in goals and hypotheses |
| `contrapose!` | Turning implications into contrapositive form |
| `omega` | Solving linear arithmetic over `ℕ`, `Fin` |
| `decide` | Proving propositional tautologies (e.g., small finite cases) |
| `apply Nat.card_le_card` | Cardinality arguments for subsets of `Fin n` |
| `apply Nat.le_of_lt_succ` | Reasoning about `Fin` bounds |

---

### 🔹 **Proof Logic & Strategy**

- **Extensionality**: Morphisms in `SSet` are equal if their components are equal (`hom_ext`), and horn morphisms are determined by their action on faces (`horn.hom_ext`).
- **Yoneda-based reasoning**: Many constructions (e.g., `id n`, `yonedaEquiv`) rely on the Yoneda embedding and its universal property.
- **Order-theoretic encoding**: Simplices in `Δ[n]` are monotone maps `Fin (m+1) → Fin (n+1)`, and sub-simplicial sets (boundary/horn) are defined via properties of these maps (surjectivity, range containment).
- **Cardinality arguments**: Horn conditions often reduce to checking `#{i, a, b} ≤ n`, using `Finset.card_le_card` and `omega`.
- **Inductive/constructive definitions**: Simplices like `edge`, `triangle`, `primitiveEdge`, `primitiveTriangle` are built via `objMk` + monotonicity proofs.
- **Factorization lemmas**: Key lemmas like `factor_δ_spec` (used in `horn.hom_ext`) rely on factorization of monotone maps into degeneracies and faces.

---

### 🔹 **Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.AlgebraicTopology.SimplicialObject.Basic` | Core definitions: `SimplicialObject`, face/degeneracy maps, naturality |
| `Mathlib.CategoryTheory.Limits.Shapes.Types` | Limits/colimits in `Type`, used for `uliftFunctor`, colimits for `S1` |
| `Mathlib.CategoryTheory.Yoneda` | Yoneda embedding `yoneda`, Yoneda lemma (`yonedaEquiv`) |
| `Mathlib.Data.Fin.VecNotation` | Syntax for vectors (`![a, b, c]`) and `Fin` operations |
| `Mathlib.Tactic.FinCases` | Case analysis on `Fin n` elements |
| `CategoryTheory.Limits.Types` | `uliftFunctor`, terminal objects, etc. |

---

### 🔹 **Future Work / Open Gaps**

- API for morphisms like `Δ[n] → ∂Δ[n]` induced by non-surjective order-preserving maps is incomplete.
- More lemmas about horn-filling conditions, especially for quasicategories.
- Better automation for cardinality arguments in horns (e.g., `#{i, a, b} ≤ n`).
- Integration with homotopy theory (e.g., Kan complexes, model structures).

---

Let me know if you'd like a **graphical dependency map**, **API cheat sheet**, or **example tactic scripts** for common constructions (e.g., building a horn morphism, proving `∂Δ[2] ≅ S1`).