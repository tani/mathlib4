**Technical Brief: `Local.lean` — Jacobian Criterion for Formal Smoothness of Local Algebras**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FormallySmooth R S` | `Prop` | States that the `R`-algebra `S` is *formally smooth*: for any surjection `B → C` of `R`-algebras and map `S → C`, there exists a lift `S → B`. |
| `Ω[P/R]` | `P.Module` | The module of Kähler differentials of `P` over `R`. |
| `I/I²` | `S.Module` | Conormal module of the ideal `I = ker(P → S)`; appears in the cotangent complex. |
| `ResidueField S` | `Type*` | The residue field `k = S / maximalIdeal S`. |
| `cotangentComplexBaseChange R S P M` | `M →ₗ[?] ...` | Base change of the cotangent complex along `R → S → P → M`. |
| `lTensor M` | `N →ₗ[?] M ⊗_S N` | Left tensoring with module `M`. |

#### Theorems

| Name | Statement (informal) |
|------|----------------------|
| `FormallySmooth.iff_injective_lTensor_residueField` | For a presentation `P → S` with `P` formally smooth, `Ω[P/R]` finite free, and `ker(P → S)` f.g., `S` is formally smooth over `R` iff the induced map $k \otimes_S I/I^2 \to k \otimes_P \Omega_{P/R}$ is injective. |
| `FormallySmooth.iff_injective_cotangentComplexBaseChange_residueField` | Same as above, but phrased via `cotangentComplexBaseChange` to `ResidueField S`. |
| `FormallySmooth.iff_injective_cotangentComplexBaseChange` | Generalization: injectivity of $K \otimes_P \mathbb{L}_{P/R} \to K \otimes_S \mathbb{L}_{S/R}$ for *any* field extension $K$ of the residue field $k$, under mild hypotheses. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `FormallySmooth.` — namespace for results about formal smoothness.
  - `lTensor_` — left tensoring with a module.
  - `cotangentComplexBaseChange` — base change of cotangent complex.
  - `ResidueField` — residue field construction.
- **Suffixes**:
  - `_iff_injective_...` — characterizations of formal smoothness via injectivity.
  - `_baseChange` — indicates change of base ring/module.
- **Variables**:
  - `P` — a smooth ambient algebra (often localization of polynomial ring).
  - `S` — target local algebra.
  - `R` — base ring.
  - `I` — kernel of $P \to S$, often implicit via `P.ker`.

---

### 3. **Tactic Stack**

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (e.g., `formallySmooth_iff_split_injection`, `cotangentComplexBaseChange_eq_lTensor_cotangentComplex`). |
| `simp` | Simplifying tensor expressions, especially with `cotangentComplexBaseChange_tmul`. |
| `exact` / `refine` | Constructing proofs using known lemmas (e.g., injectivity/surjectivity lemmas). |
| `have` | Introducing intermediate facts (e.g., finiteness of cotangent module). |
| `ext` | Extensionality for linear maps (used in `cotangentComplexBaseChange` simplifications). |
| `apply` / `trans` | Chaining implications (e.g., via `Module.FaithfullyFlat.lTensor_injective_iff_injective`). |
| `algebra`-specific simplifiers (e.g., `AlgebraTensorModule.cancelBaseChange`) | Used to manipulate base change isomorphisms. |

---

### 4. **Proof Logic**

The proofs follow a **structural reduction strategy**:

1. **Reduction to split-injectivity**:
   - Use `formallySmooth_iff_split_injection` to reduce formal smoothness of `S` to splitting of the cotangent sequence.
2. **Apply local criterion**:
   - Use `IsLocalRing.split_injective_iff_lTensor_residueField_injective` to reduce to injectivity after tensoring with residue field.
3. **Identify cotangent complex**:
   - Use `P'.cotangentEquiv` and `cotangentComplexBaseChange_eq_lTensor_cotangentComplex` to relate conormal sequence and cotangent complex.
4. **Base change & faithflat descent**:
   - Use `Module.FaithfullyFlat.lTensor_injective_iff_injective` to descend injectivity from residue field to arbitrary field extension.
5. **Tensor isomorphism manipulations**:
   - Use `AlgebraTensorModule.cancelBaseChange` and associativity to rearrange tensor products and compare maps.

---

### 5. **Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.RingTheory.Flat.FaithfullyFlat.Basic` | Faithfully flat descent (used in final equivalence). |
| `Mathlib.RingTheory.LocalRing.Module` | Module theory over local rings, residue fields. |
| `Mathlib.RingTheory.Smooth.Basic` | Formal smoothness, smooth algebras. |
| `Mathlib.RingTheory.TensorProduct.Free` | Tensor products, especially with free modules (for `Ω[P/R]`). |

**Scope**: This file lies at the intersection of:
- **Local algebra** (residue fields, maximal ideals),
- **Homological algebra** (cotangent complex, conormal sequence),
- **Descent theory** (faithfully flat descent),
- **Smoothness criteria** (Jacobian criterion in local setting).

---

### 6. **Mermaid Diagrams**

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[Formal Smoothness] --> B[Split Injection Criterion]
  B --> C[Injectivity after Tensoring with k]
  C --> D[Residue Field Tensor]
  D --> E[Cotangent Complex Base Change]
  E --> F[Conormal Sequence I/I² → Ω_{P/R}]
  F --> G[Free & Finite Ω_{P/R}]
  G --> H[Presentation P → S]
  H --> A
  C --> I[Faithfully Flat Descent]
  I --> J[Arbitrary Field Extension K]
```

#### Overview of File Structure

```mermaid
flowchart LR
  subgraph Theory
    A[Local Algebra Setup] --> B[Formally Smooth R S]
    B --> C[Presentation 0 → I → P → S → 0]
    C --> D[Assumptions: P smooth, Ω_{P/R} f.f., I f.g.]
    D --> E[Main Theorem 1: k ⊗ I/I² → k ⊗ Ω injective ⇔ S smooth]
    D --> F[Main Theorem 2: Same for cotangent complex base change]
    D --> G[Main Theorem 3: Extend to any field extension K]
  end

  subgraph Tools
    H[ResidueField S] --> I[lTensor with k]
    J[Cotangent Complex] --> K[Base Change]
    L[IsLocalRing] --> M[Split-injective ⇔ injective after tensor]
    N[FaithfullyFlat] --> O[Descent of injectivity]
  end

  E --> H
  F --> K
  G --> K
  G --> O
```

---

### 7. **Mathematical Summary**

This file formalizes the **Jacobian criterion for formal smoothness in the local case**, extending classical results (e.g.,EGA IV, §17) to the setting of arbitrary local algebras via the cotangent complex. It shows that under mild finiteness and freeness assumptions on the cotangent module of a presentation, formal smoothness of a local algebra $S/R$ is equivalent to injectivity of the induced map on cotangent complexes after base change to the residue field (or any field extension thereof).

This is foundational for:
- Deformation theory,
- Local criteria for smoothness in algebraic geometry,
- Constructing moduli spaces via local presentations.

--- 

Let me know if you'd like a formalization-level dependency graph (e.g., `leanpkg` tree), or a comparison with the global Jacobian criterion in `Mathlib.RingTheory.Smooth.Jacobian`.
