### Technical Brief: `Resolution.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `descFZero` | `Z ⟶ Y → InjectiveResolution Y → InjectiveResolution Z → J.cocomplex.X 0 ⟶ I.cocomplex.X 0`<br>Initial component of cochain map descent; uses factorization through injective object. |
| `descFOne` | `Z ⟶ Y → InjectiveResolution Y → InjectiveResolution Z → J.cocomplex.X 1 ⟶ I.cocomplex.X 1`<br>Second component; constructed via `descToInjective` using exactness at degree 0. |
| `descFSucc` | Inductive step: given `g : Jⁿ → Iⁿ`, `g' : Jⁿ⁺¹ → Iⁿ⁺¹` commuting with differentials, produces `g'' : Jⁿ⁺² → Iⁿ⁺²` commuting further. Uses `exact_succ` and `descToInjective`. |
| `desc` | `Z ⟶ Y → InjectiveResolution Y → InjectiveResolution Z → J.cocomplex ⟶ I.cocomplex`<br>Full cochain map descent of a morphism; built via `descFZero`, `descFOne`, and `descFSucc`. |
| `desc_commutes` | `J.ι ≫ desc f I J = (CochainComplex.single₀ C).map f ≫ I.ι`<br>Ensures descent commutes with resolution maps (i.e., `ι`-intertwining). |
| `descHomotopyZeroZero`, `descHomotopyZeroOne`, `descHomotopyZeroSucc` | Auxiliary components of homotopy between descent of zero map and zero cochain map. |
| `descHomotopyZero` | `Homotopy (desc 0) 0` — any descent of zero morphism is null-homotopic. |
| `descHomotopy` | Any two descents of same `f : Z → Y` are homotopic. |
| `descIdHomotopy` | `Homotopy (desc (𝟙 X)) (𝟙)` — descent of identity is homotopic to identity cochain map. |
| `descCompHomotopy` | `Homotopy (desc (f ≫ g)) (desc f ≫ desc g)` — descent respects composition up to homotopy. |
| `homotopyEquiv` | `I, J : InjectiveResolution X ⇒ HomotopyEquiv I.cocomplex J.cocomplex`<br>Any two injective resolutions of same object are homotopy equivalent. |
| `injectiveResolutions` | `C ⥤ HomotopyCategory C` (ℕ-indexed) — functorial assignment of injective resolutions in homotopy category, assuming enough injectives. |
| `InjectiveResolution.iso` | `(injectiveResolutions C).obj X ≅ I.cocomplex` in homotopy category — shows constructed functor is well-defined up to iso. |
| `ofCocomplex` | `CochainComplex C` — underlying cochain complex of the canonical injective resolution `of Z`. |
| `of` | `InjectiveResolution Z` — canonical injective resolution constructed from `Injective.under`, `Injective.syzygies`, and `Injective.d`. |
| `exact_f_d` | `(ShortComplex.mk f (d f)).Exact` — exactness of the short complex built from any morphism `f`. |
| `InjectivePresentation.shortComplex`, `shortExact_shortComplex` | Constructs a short exact sequence from an injective presentation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `desc*`: descent constructions (e.g., `desc`, `descFZero`, `descFOne`, `descFSucc`, `descHomotopy*`)
  - `of*`: canonical resolution construction (e.g., `ofCocomplex`, `of`)
  - `homotopy*`: homotopy-related constructions (e.g., `homotopyEquiv`, `descHomotopy*`)
  - `iso*`: isomorphisms in homotopy category (e.g., `iso`, `iso_hom_naturality`, `iso_inv_naturality`)
- **Suffixes**:
  - `Zero`, `One`, `Succ`: degree-specific components (0th, 1st, and higher).
  - `comm`: indicates commutativity condition (e.g., `desc_commutes`, `iso_hom_naturality`).
  - `exactAt`, `exact`: exactness lemmas.
- **General**:
  - `f`, `g`, `h`: morphisms or cochain maps.
  - `I`, `J`: injective resolutions.
  - `n`, `n + 1`, `n + 2`: indices for inductive constructions.

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|------------------|---------|
| `simp` / `simp only` | Very High | Simplify homological algebra expressions, especially using `assoc`, `zero_comp`, `sub_self`, `add_zero`, etc. |
| `rw` / `rewrite` | High | Apply lemmas like `desc_commutes`, `comp_descToInjective`, `exact_f_d`, `ofCocomplex_d_0_1`. |
| `aesop` | Medium | Automate routine reasoning (e.g., naturality, homotopy verification). |
| `apply` / `intro` / `exact` | Medium | Standard proof steps, especially in induction or exactness arguments. |
| `dsimp` | Medium | Simplify definitions (e.g., unfolding `ofCocomplex`, `descFSucc`). |
| `match` / `cases` | Medium | Structural induction on natural numbers (e.g., `ofCocomplex_exactAt_succ`). |
| `apply HomotopyCategory.eq_of_homotopy` | Medium | Prove equality of maps in homotopy category via homotopy. |
| `apply HomotopyEquiv.isoOfHomotopyEquiv` | Low | Construct isomorphisms in homotopy category from homotopy equivalences. |

---

#### **4. Proof Logic**

- **Inductive Construction**:
  - `desc` and `descHomotopyZero` are built inductively: degree 0 → 1 → ≥2.
  - Each step uses exactness (`exact₀`, `exact_succ`) and injectivity (`descToInjective`) to lift maps.
- **Homotopy Uniqueness**:
  - Any two descents of same `f` differ by a homotopy (`descHomotopy`).
  - Homotopies themselves are constructed inductively (via `descHomotopyZeroZero`, `descHomotopyZeroOne`, `descHomotopyZeroSucc`).
- **Functoriality**:
  - `injectiveResolutions` is defined on objects via `injectiveResolution` (choice via `HasInjectiveResolution`).
  - On morphisms: `desc f`.
  - Identity and composition preserved *up to homotopy*, hence well-defined in homotopy category.
- **Canonical Resolution**:
  - `of Z` uses `Injective.under Z` (injective hull), then syzygies (`Injective.syzygies`) and differentials (`Injective.d`) to build a resolution.
  - Exactness at each degree proven separately (`ofCocomplex_exactAt_succ`), using `exact_f_d`.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Homology.HomotopyCategory` | Homotopy category of cochain complexes; target of `injectiveResolutions`. |
| `Mathlib.Algebra.Homology.ShortComplex.ShortExact` | Short exact sequences of short complexes; used in `InjectivePresentation`. |
| `Mathlib.CategoryTheory.Abelian.Exact` | Exactness in abelian categories (e.g., `exact_f_d`). |
| `Mathlib.CategoryTheory.Preadditive.Injective.Resolution` | Core definitions: `InjectiveResolution`, `Injective.under`, `Injective.syzygies`, `Injective.d`. |
| `Mathlib.Data.Set.Subsingleton` | Used for uniqueness of choices (e.g., `HasInjectiveResolution.out`). |
| `Mathlib.Tactic.AdaptationNote` | Internal tactic support. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Abelian C] --> B[HasZeroObject C]
  A --> C[HasZeroMorphisms C]
  A --> D[EnoughInjectives C]
  D --> E[HasInjectiveResolution Z]
  E --> F[InjectiveResolution Z]
  F --> G[desc : Z ⟶ Y → J.cocomplex ⟶ I.cocomplex]
  G --> H[descHomotopy : desc(f) unique up to homotopy]
  H --> I[homotopyEquiv : I ≃ J]
  I --> J[injectiveResolutions : C ⥤ HoCh(C)]
  D --> K[of Z : InjectiveResolution Z]
  K --> L[ofCocomplex Z]
  L --> M[exactAt_succ]
  M --> N[of isInjectiveResolution]
```

##### **Overview of `Resolution.lean`**

```mermaid
flowchart LR
  subgraph Definitions
    D1[descFZero, descFOne, descFSucc]
    D2[desc]
    D3[descHomotopyZeroZero, descHomotopyZeroOne, descHomotopyZeroSucc]
    D4[descHomotopyZero]
    D5[descHomotopy]
    D6[descIdHomotopy]
    D7[descCompHomotopy]
    D8[homotopyEquiv]
    D9[ofCocomplex]
    D10[of]
  end

  subgraph Theorems
    T1[desc_commutes]
    T2[descHomotopyZero]
    T3[descHomotopy]
    T4[descIdHomotopy]
    T5[descCompHomotopy]
    T6[homotopyEquiv_hom_ι]
    T7[homotopyEquiv_inv_ι]
    T8[ofCocomplex_exactAt_succ]
    T9[exact_f_d]
  end

  subgraph Functors
    F1[injectiveResolutions : C ⥤ HoCh(C)]
  end

  subgraph Applications
    A1[InjectivePresentation.shortComplex]
    A2[shortExact_shortComplex]
  end

  D1 --> D2
  D2 --> T1
  D3 --> D4
  D4 --> T2
  D5 --> T3
  D6 --> T4
  D7 --> T5
  D8 --> T6 & T7
  D9 --> D10
  D10 --> T8
  A1 --> A2
  F1 <--> D8
```

---

#### **7. Theory Scope**

- **Context**: Abelian categories with enough injectives.
- **Goal**: Construct derived functors (implicitly), via injective resolutions and their homotopy theory.
- **Key Insight**: Injective resolutions are unique up to homotopy equivalence, enabling well-defined derived functors in the homotopy category.
- **Future Use**: Foundation for derived categories, derived functors (e.g., `Ext`, `Tor`), and spectral sequences.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a dependency graph for specific lemmas.
