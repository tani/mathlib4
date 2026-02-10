**Technical Brief: Resolution.lean (Lean 4 Formalization)**  
*Domain: Homological Representation Theory of Groups*  
*Authors: Amelia Livingston*  
*License: Apache 2.0*

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `classifyingSpaceUniversalCover G` | `SimplicialObject (Action (Type u) G)` | Simplicial $G$-set $EG$, diagonal $G$-action on $G^{n+1}$ |
| `cechNerveTerminalFromIso` | `cechNerveTerminalFrom (Action.ofMulAction G G) ≅ classifyingSpaceUniversalCover G` | Isomorphism between Čech nerve of $G \to *$ and $EG$ |
| `extraDegeneracyAugmentedCechNerve` | `ExtraDegeneracy (Arrow.mk (terminal.from G)).augmentedCechNerve` | Extra degeneracy for augmented Čech nerve (contractibility) |
| `compForgetAugmented.toModule` | `SimplicialObject.Augmented (ModuleCat k)` | Free $k$-module linearization of $EG$ |
| `Rep.standardComplex k G` | `ChainComplex (Rep k G)` | Standard resolution: alternating face map complex of $EG$ linearized |
| `Rep.standardComplex.d` | `((Fin (n+1) → G) →₀ k) →ₗ[k] (Fin n → G) →₀ k` | Differential: $(g_0,\dots,g_n) \mapsto \sum (-1)^i (g_0,\dots,\hat g_i,\dots,g_n)$ |
| `Rep.standardComplex.xIso` | `(standardComplex k G).X n ≅ Rep.ofMulAction k G (Fin (n+1) → G)` | Definitional iso identifying objects with diagonal representation |
| `Rep.standardComplex.d_eq` | `(standardComplex k G).d (n+1) n = ModuleCat.ofHom (d k G (n+1))` | Matches abstract differential with explicit $k$-linear map |
| `Rep.standardComplex.forget₂ToModuleCatHomotopyEquiv` | `HomotopyEquiv (standardComplex k G ⋙ forget₂) (k[0])` | Standard resolution is homotopy equivalent to $k$ in degree 0 |
| `Rep.standardComplex.ε` | `Rep.ofMulAction k G (Fin 1 → G) ⟶ Rep.trivial k G k` | Augmentation: $\sum n_i g_i \mapsto \sum n_i$ |
| `Rep.standardComplex.εToSingle₀` | `standardComplex k G ⟶ k[0]` | Chain map realizing augmentation as quasi-iso |
| `Rep.standardResolution` | `ProjectiveResolution (Rep.trivial k G k)` | Standard projective resolution (complex + quasi-iso π) |
| `Rep.standardResolution.extIso` | `Extⁿ(k, V) ≅ Hⁿ(Hom(P, V))` | Computes Ext via standard resolution |
| `barComplex.d` | `free k G (Gⁿ⁺¹) ⟶ free k G (Gⁿ)` | Bar differential: $g_0·(g_1,\dots,g_n) + \sum (-1)^{j+1}(g_0,\dots,g_jg_{j+1},\dots) + (-1)^{n+1}(g_0,\dots,g_{n-1})$ |
| `barComplex.d_single` | Explicit action of $d$ on basis elements |
| `barComplex.d_comp_diagonalSuccIsoFree_inv_eq` | $d \circ \text{iso}^{-1} = \text{iso}^{-1} \circ d_{\text{std}}$ | Commutativity of bar/std differentials via `diagonalSuccIsoFree` |
| `barComplex.isoStandardComplex` | `barComplex k G ≅ standardComplex k G` | Isomorphism of chain complexes (bar ≅ standard) |
| `barResolution` | `ProjectiveResolution (Rep.trivial k G k)` | Bar resolution (projective, via iso to standard) |
| `barResolution.extIso` | `Extⁿ(k, V) ≅ Hⁿ(Hom(\bar P, V))` | Ext computed via bar resolution |

---

### 2. NAMING CONVENTIONS

| Pattern | Meaning | Examples |
|--------|---------|----------|
| `is_` / `has_` | Predicate properties (not used here) | — |
| `*_complex` | Chain/simplicial complex | `standardComplex`, `barComplex` |
| `*_resolution` | Projective resolution (complex + π) | `standardResolution`, `barResolution` |
| `*_iso*` | Isomorphisms (objects, complexes, cones) | `cechNerveTerminalFromIso`, `isoStandardComplex`, `diagonalSuccIsoFree` |
| `*_homotopyEquiv` | Homotopy equivalence of complexes | `forget₂ToModuleCatHomotopyEquiv` |
| `*_toModule` | Linearization via `ModuleCat.free` | `compForgetAugmented.toModule` |
| `*_augmented` | Augmented simplicial objects | `compForgetAugmented`, `extraDegeneracyCompForgetAugmented` |
| `*_of` | Construction from data (e.g., action, set) | `ofMulAction`, `ofHom`, `ofIso` |
| `*_single` | Basis element (finsupp/single) | `d_single`, `single_apply` |
| `*_def` / `*_eq` | Definitional or simplification lemmas | `d_def`, `d_eq`, `d_comp_ε` |
| `*_f_0_eq` | Component at degree 0 of homotopy equivalence | `forget₂ToModuleCatHomotopyEquiv_f_0_eq` |

---

### 3. TACTIC STACK

| Tactic | Frequency | Role |
|--------|-----------|------|
| `simp` / `simp only` | Very high | Simplify using `@[simp]` lemmas, especially for `Finsupp`, `single`, `Fin`, `limit`, `homotopyEquiv` |
| `ext` | High | Extensionality for functions, morphisms, finsupp, matrices |
| `rw` / `rwa` | High | Rewrite using isomorphisms, naturality, definitions |
| `exact` / `assumption` | Medium | Closing goals where data is available |
| `congr` | Medium | Congruence for function extensionality |
| `apply` / `refine` | Medium | Construct morphisms, isomorphisms, chain maps |
| `change` | Medium | Change goal to definitionally equal form |
| `dsimp` | Medium | Simplify definitional equalities (e.g., whiskering, map of complexes) |
| `linarith` / `ring` | Low | Arithmetic in $k$ (e.g., signs $(-1)^i$) — mostly handled by `simp` |
| `aesop` / `tauto` | Low | Not used — proofs are constructive and rely on explicit computation |
| `induction` | Low | Not used — homological arguments use naturality/homotopy, not induction on $n$ |

---

### 4. PROOF LOGIC

**High-level proof strategy:**

1. **Simplicial setup**  
   - Define $EG$ as `classifyingSpaceUniversalCover G`, a simplicial $G$-set $[n] \mapsto G^{n+1}$ with diagonal action.  
   - Show $EG \cong \check{C}(G \to *)$, the Čech nerve of $G \to *$, via `cechNerveTerminalFromIso`.  
   - Use `ExtraDegeneracy` to prove contractibility of the augmented Čech nerve.

2. **Linearization & homotopy**  
   - Apply `ModuleCat.free k` to get an augmented simplicial $k$-module with extra degeneracy.  
   - Take alternating face map complex → `standardComplex k G`.  
   - Use `ExtraDegeneracy.homotopyEquiv` to deduce:  
     $$
     \text{standardComplex } k\, G \simeq k[0]
     $$
     as complexes of $k$-modules (`forget₂ToModuleCatHomotopyEquiv`).

3. **Exactness & resolution**  
   - Define augmentation $\varepsilon: k[G] \to k$, verify $d \circ \varepsilon = 0$.  
   - Lift to chain map $\varepsilon_{\bullet}: \text{standardComplex} \to k[0]$.  
   - Show $\varepsilon_{\bullet}$ is a quasi-isomorphism (`quasiIso_forget₂_εToSingle₀`).  
   - Package as `standardResolution`.

4. **Bar resolution construction**  
   - Define bar complex objects: $P_n = k[G^{n+1}] \cong (G^n \to_0 k[G])$ (pointwise left regular rep).  
   - Define bar differential $d_{\text{bar}}$ explicitly.  
   - Introduce `diagonalSuccIsoFree`: isomorphism $k[G^{n+1}] \xrightarrow{\sim} (G^n \to_0 k[G])$,  
     $(g_0,\dots,g_n) \mapsto g_0 \cdot (g_0^{-1}g_1, \dots, g_{n-1}^{-1}g_n)$.  
   - Prove commutativity:  
     $$
     d_{\text{bar}} \circ \text{iso}^{-1} = \text{iso}^{-1} \circ d_{\text{std}}
     $$
     via `d_comp_diagonalSuccIsoFree_inv_eq`.  
   - Conclude bar complex is chain complex (since $d_{\text{std}}^2 = 0$), and iso to standard resolution.  
   - Transfer projectivity & quasi-iso → `barResolution`.

5. **Computational payoff**  
   - Use `barResolution` to define inhomogeneous cochains (in related files).  
   - `extIso` lemmas identify $\mathrm{Ext}^n_{kG}(k, V) \cong H^n(\mathrm{Hom}(P_\bullet, V))$.

**Logical flow per major lemma:**  
- *Isomorphisms*: Construct componentwise, prove naturality via `NatIso.ofComponents`, use `Iso.ext`.  
- *Chain maps*: Use `HomologicalComplex.mk` or `toSingle₀Equiv` to verify $d \circ f = f \circ d$.  
- *Homotopy*: Use `HomotopyEquiv.ofIso` + `ExtraDegeneracy.homotopyEquiv`.  
- *Exactness*: Reduce to $k$-module level via `forget₂`, use contractibility.

---

### 5. IMPORTS & DEPENDENCIES

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Category.ModuleCat.Projective` | Projectivity of free modules, projective resolutions |
| `Mathlib.AlgebraicTopology.ExtraDegeneracy` | Contractibility via extra degeneracy ⇒ homotopy equivalence |
| `Mathlib.CategoryTheory.Abelian.Ext` | Derived functors $\mathrm{Ext}^n$, `isoExt` |
| `Mathlib.RepresentationTheory.Rep` | Category of $k$-linear $G$-representations, `Rep.ofMulAction`, `diagonalSuccIsoFree` |
| `Mathlib.CategoryTheory.Functor.ReflectsIso.Balanced` | (Used implicitly for isomorphism criteria) |

**Core libraries used:**  
- `SimplicialObject`, `SimplicialObject.Augmented`, `AlgebraicTopology`  
- `Finsupp`, `MonoidAlgebra`, `ModuleCat`, `Rep`  
- `CategoryTheory.Limits`, `HomologicalComplex`, `Ext`

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[Group G, CommRing k] --> B[Action (Type u) G]
  B --> C[SimplicialObject (Action G)]
  C --> D[classifyingSpaceUniversalCover G]
  D --> E[Čech nerve of G → *]
  E --> F[ExtraDegeneracy]
  F --> G[HomotopyEquiv to k[0]]
  G --> H[standardComplex k G]
  H --> I[standardResolution]
  
  D --> J[linearization k G]
  J --> H
  
  H --> K[forget₂ → ModuleCat]
  K --> G
  
  H --> L[barComplex k G]
  L --> M[diagonalSuccIsoFree iso]
  M --> N[barResolution]
  N --> O[Ext computation]
  
  I --> O
  N --> O
```

#### File Overview (Resolution.lean)

```mermaid
flowchart LR
  subgraph SimplicialSetup
    A1[Monoid G] --> A2[classifyingSpaceUniversalCover]
    A2 --> A3[cechNerveTerminalFromIso]
    A3 --> A4[ExtraDegeneracy]
  end

  subgraph Linearization
    A4 --> B1[compForgetAugmented.toModule]
    B1 --> B2[extraDegeneracyCompForgetAugmentedToModule]
    B2 --> B3[HomotopyEquiv to k[0]]
  end

  subgraph StandardResolution
    B3 --> C1[standardComplex]
    C1 --> C2[ε: augmentation]
    C2 --> C3[εToSingle₀: quasi-iso]
    C3 --> C4[standardResolution]
  end

  subgraph BarResolution
    C1 --> D1[diagonalSuccIsoFree]
    D1 --> D2[barComplex]
    D2 --> D3[isoStandardComplex]
    D3 --> D4[barResolution]
  end

  subgraph Applications
    C4 --> E1[Ext_iso_std]
    D4 --> E2[Ext_iso_bar]
    E1 & E2 --> E3[Group Cohomology]
  end
```

---

### 7. SUMMARY

This file constructs two explicit projective resolutions of the trivial representation $k$ in the category of $k$-linear $G$-representations:  
- **Standard resolution**: via simplicial $G$-set $EG$, linearization, alternating face maps.  
- **Bar resolution**: via $G$-equivariant isomorphism to standard resolution, using `diagonalSuccIsoFree`.  

Both are shown to be *homotopy equivalent* to $k$ in degree 0, hence exact, and thus valid resolutions for computing $\mathrm{Ext}$ (group cohomology). The bar resolution is especially useful for explicit cochain calculations.

The formalization leverages Lean’s homological algebra infrastructure (`HomologicalComplex`, `Ext`, `ProjectiveResolution`) and simplicial homotopy theory (`ExtraDegeneracy`, `AlgebraicTopology.alternatingFaceMapComplex`) to give a clean, reusable foundation for group (co)homology.
