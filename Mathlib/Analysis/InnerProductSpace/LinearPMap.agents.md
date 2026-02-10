Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Metadata Brief: `LinearPMap` on Hilbert Spaces**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsFormalAdjoint` | `T.IsFormalAdjoint S ↔ ∀ x ∈ dom T, y ∈ dom S, ⟨T x, y⟩ = ⟨x, S y⟩` | Formalizes the adjoint relation between two partially defined linear maps. |
| `adjointDomain` | `Submodule 𝕜 F` | Domain of the adjoint: all `y ∈ F` such that `x ↦ ⟨y, T x⟩` is continuous on `dom T`. |
| `adjointDomainMkCLM` | `T.adjointDomain → T.domain →L[𝕜] 𝕜` | Continuous linear functional `x ↦ ⟨y, T x⟩` for `y ∈ dom T†`. |
| `adjointDomainMkCLMExtend` | `T.adjointDomain → E →L[𝕜] 𝕜` | Unique continuous extension of `adjointDomainMkCLM y` to all of `E`, assuming `dom T` is dense. |
| `adjointAux` | `T.adjointDomain →ₗ[𝕜] E` | Linear map `y ↦` Riesz representative of `adjointDomainMkCLMExtend y`, assuming `dom T` dense. |
| `adjoint` | `F →ₗ.[𝕜] E` | Full adjoint operator: `adjointAux` if `dom T` dense, else zero map on `adjointDomain`. |
| `adjoint_isFormalAdjoint` | `T†.IsFormalAdjoint T` | Fundamental property: `T†` satisfies the adjoint identity on its domain. |
| `IsFormalAdjoint.le_adjoint` | `T.IsFormalAdjoint S ⇒ S ≤ T†` | Maximality: any formal adjoint is contained in the adjoint. |
| `toPMap_adjoint_eq_adjoint_toPMap_of_dense` | `(A.toPMap p)† = A.adjoint.toPMap ⊤` | Compatibility of adjoints between `ContinuousLinearMap` and `LinearPMap` under density. |
| `instStar` | `Star (E →ₗ.[𝕜] E)` | Defines `star := adjoint`, enabling `A†` notation. |
| `IsSelfAdjoint.dense_domain` | `IsSelfAdjoint A ⇒ Dense dom A` | Self-adjointness implies dense domain (nontrivial due to junk-value definition). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `isFormalAdjoint`: Predicate naming for relational properties.
  - `adjointDomain*`: Domain-related constructions.
  - `adjointAux`: Auxiliary definitions used in construction.
  - `toPMap_*`: Conversions between `ContinuousLinearMap` and `LinearPMap`.
- **Suffixes**:
  - `MkCLM`: “Make Continuous Linear Map”.
  - `Extend`: Extension of a map (e.g., `adjointDomainMkCLMExtend`).
  - `apply`: Application lemmas (e.g., `adjoint_apply_of_dense`).
- **Notation**:
  - `⟪x, y⟫`: `inner 𝕜 E x y`.
  - `T†`: Adjoint of `T`, localized in `LinearPMap`.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: Simplification with precise lemmas (e.g., `inner_add_left`, `toDual_symm_apply`).
- `rw [...]`: Rewriting using definitions or lemmas (e.g., `h.symm`, `adjoint_apply_of_dense`).
- `funext`, `fun _ => ...`: Extensionality and lambda introduction.
- `by_contra`, `contradiction`: For density arguments and junk-value handling.
- `exact`, `convert ... using 1`: Precision in continuity/continuity-of-composition proofs.
- `fun_prop`: Propagation of continuity goals (e.g., for `innerSL` compositions).
- `ring`, `linarith`: Implicitly used in inner product algebra (not explicit here, but standard in such contexts).
- `simp only [AddHom.coe_mk, ...]`: Handling coercion chains.

#### **4. Proof Logic & Strategy**

- **Inductive/constructive structure**:
  - Definitions built in layers: domain → functional → extension → Riesz representer.
- **Density as a key assumption**:
  - Many results split on `Dense dom T` vs `¬Dense dom T`.
  - Junk-value pattern: `if hT : Dense ... then ... else 0`.
- **Riesz Representation Theorem**:
  - Central to `adjointAux`: uses `InnerProductSpace.toDual` and its inverse.
- **Uniqueness via inner product density**:
  - `eq_of_inner_left` used to prove equality of vectors by testing against all `x ∈ dom T`.
- **Maximality via containment**:
  - `le_adjoint` proves inclusion of submodules (`S.domain ⊆ T†.domain`) and equality of maps on that domain.

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.InnerProductSpace.Adjoint`: Riesz representation, adjoints in Hilbert spaces.
  - `Mathlib.Topology.Algebra.Module.Equiv`: Module equivalences, continuity, and topology of modules.
- **Scopes & locals**:
  - `noncomputable section`, `RCLike 𝕜`, `ComplexConjugate` scope for `†`.
  - Local notation `⟪x, y⟫` for inner product.
- **Assumptions**:
  - `𝕜`: `RCLike` (i.e., `ℝ` or `ℂ`).
  - `E`, `F`: Normed additive commutative groups + inner product spaces over `𝕜`.
  - `CompleteSpace E` often required (e.g., for Riesz, extensions).

---

Let me know if you'd like a diagram of dependencies or a summary of how junk-value handling affects self-adjointness.