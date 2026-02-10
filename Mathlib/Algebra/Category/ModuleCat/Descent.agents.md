**Technical Brief: `Descent.lean` (Faithfully Flat Descent for Modules)**  
*Source: Descent.lean (Lean 4, Mathlib)*  
*Date: 2025-04-05*  

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ModuleCat.preservesFiniteLimits_tensorLeft_of_ringHomFlat` | `hf : f.Flat → PreservesFiniteLimits (tensorLeft (ModuleCat.of A B))` | Shows that tensoring with $B$ over $A$ (via a flat ring map $f: A \to B$) preserves finite limits. |
| `ModuleCat.preservesFiniteLimits_extendScalars_of_flat` | `hf : f.Flat → PreservesFiniteLimits (extendScalars f)` | Extends the above to extension of scalars functor: it preserves finite limits when $f$ is flat. |
| `ModuleCat.reflectsIsomorphisms_extendScalars_of_faithfullyFlat` | `hf : f.FaithfullyFlat → (extendScalars f).ReflectsIsomorphisms` | Proves that extension of scalars along a *faithfully* flat map reflects isomorphisms. |
| `comonadicExtendScalars` | `hf : f.FaithfullyFlat → ComonadicLeftAdjoint (extendScalars f)` | Main theorem: extension of scalars along a faithfully flat map is *comonadic*, i.e., induces an equivalence between $B$-modules and coalgebras over the induced comonad. |

---

### 2. NAMING CONVENTIONS

- **Functorial actions**:  
  - `extendScalars f`: extension of scalars along $f: A \to B$  
  - `restrictScalars f`: restriction of scalars along $f$  
  - `tensorLeft M`: left tensor functor $-\otimes_A M$  
- **Properties**:  
  - `PreservesFiniteLimits`, `ReflectsIsomorphisms`: standard categorical properties  
  - `Flat`, `FaithfullyFlat`: ring-theoretic assumptions on $f$  
- **Module-theoretic constructions**:  
  - `ModuleCat.of A M`: object of module category corresponding to $A$-module $M$  
  - `lTensor B g`: linear tensor map $g \otimes \mathrm{id}_B$  
- **Adjoint/comonad-related**:  
  - `extendRestrictScalarsAdj f`: the canonical adjunction $ \text{extendScalars } f \dashv \text{restrictScalars } f $  
  - `ComonadicLeftAdjoint`: typeclass encoding comonadicity of a left adjoint  

Prefixes/suffixes:  
- `ModuleCat.`: for lemmas in the module category context  
- `_of_`: linking ring-theoretic data (`f`) to categorical properties  
- `_iff_`: biconditional characterizations (e.g., `lTensor_bijective_iff_bijective`)  

---

### 3. TACTIC STACK

| Tactic | Frequency | Role |
|--------|-----------|------|
| `algebraize [f]` | High | Converts between module-theoretic and categorical expressions (e.g., `tensorLeft (ModuleCat.of A B)` ↔ `lTensor B`) |
| `rw [...] at h ⊢` | Medium | Rewrites using equivalences (e.g., `isIso_iff_bijective`, `lTensor_bijective_iff_bijective`) |
| `rwa [...]` | Medium | Rewrites and applies assumption in one step |
| `exact ⟨inferInstance⟩` | Medium | Uses typeclass inference to fill in instances (e.g., flatness ⇒ finite limit preservation) |
| `change ...` | Low | Renames or simplifies goal/target for clarity |
| `convert ...` | Medium | Matches goal to a known theorem up to definitional equality of arguments |

---

### 4. PROOF LOGIC

The logical flow follows a standard *comonadic descent* strategy:

1. **Finite limit preservation**:  
   - Use flatness of $f$ to show that tensoring with $B$ (viewed as an $A$-module via $f$) preserves finite limits.  
   - Then lift this to extension of scalars using the fact that `extendScalars f ⋙ restrictScalars f ≅ tensorLeft B`.

2. **Reflection of isomorphisms**:  
   - Faithful flatness ⇒ the base change functor reflects isomorphisms.  
   - Key step: reduce to injectivity/surjectivity of $g \otimes \mathrm{id}_B$, then apply `Module.FaithfullyFlat.lTensor_bijective_iff_bijective`.

3. **Comonadicity**:  
   - Apply the general criterion:  
     > A left adjoint $L$ is comonadic if it preserves finite limits *and* reflects isomorphisms,  
     > and the comparison functor has equalizers of $L$-split pairs.  
   - Use `Comonad.comonadicOfHasPreservesFSplitEqualizersOfReflectsIsomorphisms` with:  
     - $L = \text{extendScalars } f$,  
     - $R = \text{restrictScalars } f$,  
     - The adjunction `extendRestrictScalarsAdj f` provides the needed equalizers (via `FSplitEqualizers` instance).

---

### 5. IMPORTS (Primary Dependencies)

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Category.ModuleCat.ChangeOfRings` | Defines `extendScalars`, `restrictScalars`, and their adjunction |
| `Mathlib.CategoryTheory.Monad.Comonadicity` | General comonadicity criteria (e.g., Beck’s criterion) |
| `Mathlib.RingTheory.Flat.CategoryTheory` | Flatness ⇒ finite limit preservation for tensor functors |
| `Mathlib.RingTheory.RingHom.FaithfullyFlat` | Faithful flatness ⇒ reflection of isomorphisms & bijectivity of tensor maps |

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[CommRing A, B] --> B[f : A →+* B]
  B --> C[Flat f]
  B --> D[FaithfullyFlat f]
  C --> E[PreservesFiniteLimits (extendScalars f)]
  D --> F[ReflectsIsomorphisms (extendScalars f)]
  E & F --> G[ComonadicExtendScalars f]
  G --> H[Effective Descent for Mod(-)]
```

#### Overview of File Structure

```mermaid
flowchart LR
  subgraph Theory
    A[ModuleCat] -->|tensorLeft| B[PreservesFiniteLimits]
    A -->|extendScalars| C[Comonadicity]
    D[Flat] --> B
    E[FaithfullyFlat] --> C
  end

  subgraph Tools
    F[algebraize] --> A
    G[Comonadicity Criterion] --> C
    H[Module.FaithfullyFlat.lTensor_bijective_iff_bijective] --> E
  end

  C --> I[Descent for pseudofunctor Mod(-)]
```

---

### 7. REMARKS & FUTURE WORK

- The file establishes *comonadicity* of extension of scalars along faithfully flat maps — a key step toward proving *effective descent* for modules.
- The final comment indicates that the *pseudofunctor* $\mathbf{Mod}(-) : \mathbf{CRing}^\mathrm{op} \to \mathbf{Cat}$ has effective descent relative to faithfully flat maps — this is the main goal of the broader project (not yet formalized here).
- The use of `algebraize` and `ConcreteCategory.isIso_iff_bijective` reflects a hybrid algebra–category-theoretic style, typical of modern Mathlib formalizations.

--- 

Let me know if you'd like a formalized statement of the *effective descent* theorem (once available), or a comparison with the classical Grothendieck descent theory.
