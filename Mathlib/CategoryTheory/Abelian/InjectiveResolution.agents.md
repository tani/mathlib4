### Technical Metadata Brief: Injective Resolutions in Abelian Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `descFZero` | `Z ⟶ Y → InjectiveResolution Y → InjectiveResolution Z → J.cocomplex.X 0 ⟶ I.cocomplex.X 0`<br>Constructs the 0th component of a chain map descent using factorization through injectives. |
| `descFOne` | `Z ⟶ Y → InjectiveResolution Y → InjectiveResolution Z → J.cocomplex.X 1 ⟶ I.cocomplex.X 1`<br>Extends the descent to degree 1 using exactness and injectivity. |
| `descFSucc` | Inductive step: given `g : Jⁿ → Iⁿ`, constructs `g'' : Jⁿ⁺² → Iⁿ⁺²` making the diagram commute, using exactness at `n+1`. |
| `desc` | `Z ⟶ Y → InjectiveResolution Y → InjectiveResolution Z → J.cocomplex ⟶ I.cocomplex`<br>Constructs the full chain map descent of `f : Z → Y`. |
| `desc_commutes` | `J.ι ≫ desc f I J = (CochainComplex.single₀ C).map f ≫ I.ι`<br>Ensures the descent intertwines with resolution maps. |
| `descHomotopyZeroZero`, `descHomotopyZeroOne`, `descHomotopyZeroSucc` | Auxiliary components for constructing a homotopy from a chain map with `I.ι ≫ f = 0` to zero. |
| `descHomotopyZero` | `Homotopy f 0` when `I.ι ≫ f = 0`. |
| `descHomotopy` | Any two descents of the same `f` are homotopic. |
| `descIdHomotopy` | `Homotopy (desc (𝟙 X) I I) (𝟙 I.cocomplex)` — descent of identity is homotopic to identity. |
| `descCompHomotopy` | `Homotopy (desc (f ≫ g) K I) (desc f J I ≫ desc g K J)` — descent respects composition up to homotopy. |
| `homotopyEquiv` | `I.cocomplex ≃ₕ J.cocomplex` for any two injective resolutions `I, J` of same object. |
| `injectiveResolutions` | Functor `C ⥤ HomotopyCategory C` sending `X` to its chosen injective resolution (up to homotopy). |
| `InjectiveResolution.iso` | `(injectiveResolutions C).obj X ≅ I.cocomplex` in homotopy category. |
| `ofCocomplex` | Cochain complex underlying the canonical injective resolution `of Z`. |
| `of` | `InjectiveResolution Z` constructed via syzygies: `Z → I⁰ → I¹ → I² → …` using `Injective.under`, `syzygies`, and `d`. |
| `exact_f_d` | `ShortComplex.mk f (d f)` is exact — used to prove exactness of `ofCocomplex`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `desc_`: descent constructions (e.g., `desc`, `descFZero`, `descFOne`, `descFSucc`, `descHomotopy`, `descHomotopyZeroZero`, etc.)
  - `of_`: canonical resolution construction (e.g., `ofCocomplex`, `of`)
  - `homotopy_`: homotopy-related constructions (e.g., `homotopyEquiv`, `descIdHomotopy`, `descCompHomotopy`)
- **Suffixes**:
  - `_zero`, `_one`, `_succ`: degree-specific components (0th, 1st, inductive step).
  - `_comm`: commutativity properties (e.g., `descFOne_zero_comm`, `comp_descHomotopyZeroZero`)
  - `_assoc`: associativity or naturality lemmas (e.g., `comp_descHomotopyZeroZero_assoc`)
- **`iso_`**: isomorphisms in homotopy category (e.g., `iso_hom_naturality`, `iso_inv_naturality`)

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using definitions, especially of `cocomplex`, `ι`, `d`, `desc`, homotopy components. |
| `aesop_cat` | Automated category-theoretic reasoning (commutativity, factorization, mono/epi properties). |
| `rw` / `apply` / `exact` | Rewrite using lemmas, apply known results. |
| `dsimp` | Simplify definitional equalities (e.g., unfolding `ofCocomplex`, `desc`). |
| `match n with` | Structural induction on natural numbers (for `ofCocomplex_exactAt_succ`). |
| `apply HomotopyCategory.eq_of_homotopy` | Prove equality in homotopy category by showing homotopy. |
| `apply descHomotopy` | Prove two chain maps are homotopic via `descHomotopy`. |
| `congr_arg`, `congr_fun` | Equality reasoning for morphisms and components. |
| `cancel_mono`, `cancel_epi` | Cancellation lemmas for monos/epis. |
| `infer_instance` | Automatically infer class instances (e.g., `Injective`, `Exact`). |

---

#### **4. Proof Logic**

- **Inductive Construction**:
  - `desc` and homotopies are built inductively: degree 0 → 1 → n → n+1.
  - Each step uses exactness (`exact₀`, `exact_succ`) and injectivity (`descToInjective`) to lift maps.
- **Homotopy Uniqueness**:
  - Any two descents of same `f` differ by a homotopy (`descHomotopy`).
  - Zero descents are homotopic to zero (`descHomotopyZero`).
- **Functoriality up to Homotopy**:
  - Identity and composition descend only up to homotopy → `injectiveResolutions` is a functor into the *homotopy* category.
- **Resolution Uniqueness up to Homotopy Equivalence**:
  - `homotopyEquiv` shows any two injective resolutions are homotopy equivalent.
- **Canonical Resolution (`of`)**:
  - Built via syzygies: `Z → I⁰ → I¹ → …` where `I⁰ = Injective.under Z`, `Iⁿ⁺¹ = Injective.syzygies (dⁿ)`, `dⁿ = Injective.d`.
  - Exactness proven via `exact_f_d` and induction.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Preadditive.InjectiveResolution` | Core definitions of injective resolutions, `Injective`, `syzygies`, `d`, `ι`. |
| `Mathlib.Algebra.Homology.HomotopyCategory` | Homotopy category of cochain complexes, homotopies, quotient functor. |
| `Mathlib.Data.Set.Subsingleton` | Used implicitly for uniqueness of morphisms up to homotopy (e.g., `HomotopyEquiv`). |
| `Mathlib.Tactic.AdaptationNote` | Marks performance-sensitive definitions (e.g., `of` is `irreducible_def` due to slow elaboration). |

**Domain**: Abelian categories with enough injectives (`[Abelian C] [EnoughInjectives C]`).  
**Target**: Homotopy category of cochain complexes over `C`.  
**Main Goal**: Construct a functor `C → Ho(Ch⁺(C))` classifying injective resolutions.

--- 

Let me know if you'd like a diagrammatic summary or a proof sketch of `desc` or `of`.