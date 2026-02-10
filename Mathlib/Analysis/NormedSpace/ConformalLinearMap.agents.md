### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsConformalMap` | `f' : X →L[R] Y → Prop` | Defines a continuous linear map as conformal if it is a nonzero scalar multiple of a linear isometry. |
| `isConformalMap_id` | `IsConformalMap (id R M)` | Identity map is conformal (scalar = 1). |
| `IsConformalMap.smul` | `IsConformalMap f → c ≠ 0 → IsConformalMap (c • f)` | Scaling a conformal map by a nonzero scalar preserves conformality. |
| `isConformalMap_const_smul` | `c ≠ 0 → IsConformalMap (c • id R M)` | Multiplication-by-nonzero-constant map is conformal. |
| `LinearIsometry.isConformalMap` | `f' : M →ₗᵢ[R] N → IsConformalMap f'.toContinuousLinearMap` | Every linear isometry is conformal (scalar = 1). |
| `isConformalMap_of_subsingleton` | `[Subsingleton M] → f' : M →L[R] N → IsConformalMap f'` | All continuous linear maps on singleton domain spaces are conformal. |
| `IsConformalMap.comp` | `IsConformalMap g → IsConformalMap f → IsConformalMap (g.comp f)` | Composition of conformal maps is conformal. |
| `IsConformalMap.injective` | `IsConformalMap f → Function.Injective f` | Conformal maps are injective. |
| `IsConformalMap.ne_zero` | `[Nontrivial M'] → IsConformalMap f' → f' ≠ 0` | Nontrivial domain + conformality ⇒ nonzero map. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isConformalMap_`: for theorems establishing conformality of specific constructions (`id`, `smul`, `comp`, etc.).
  - `LinearIsometry.`: for lifting properties from linear isometries to conformal maps.
- **Suffixes**:
  - `isConformalMap_of_subsingleton`: descriptive suffix indicating special-case condition (`Subsingleton`).
- **Variable naming**:
  - `f`, `g`: generic continuous linear maps.
  - `c`, `cf`, `cg`: scalars; `li`, `lif`, `lig`: linear isometries.
  - `R`, `X`, `Y`, `M`, `N`, `G`, `M'`: type variables for normed spaces/fields.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rcases`: destruct existential quantifiers in definitions (`hf : IsConformalMap f`).
  - `refine`: construct proofs with holes (`?_`) to be filled later.
  - `rw`: rewrite using equalities (e.g., `smul_comp`, `comp_smul`, `mul_smul`, `one_smul`).
  - `simp`: simplify goals using simplification lemmas (`simp`, `simp [Subsingleton.elim x 0]`).
  - `rfl`: reflexivity for definitional equalities.
  - `exact`: apply a hypothesis directly when goal matches.
  - `intro`/`rintro`: introduce hypotheses (e.g., `rintro rfl`).
  - `cases`/`rcases` on `Subsingleton` or `Nontrivial` instances.

- **Domain-specific automation**:
  - `aesop` is *not* used here — proofs are mostly manual and rely on algebraic rewrites.
  - `ring`/`abel` are *not* used explicitly; arithmetic simplifications are done via `rw` + lemmas like `mul_smul`, `smul_comp`.

---

#### 4. **Proof Logic**

- **Structure**:
  - Proofs follow a *constructive existential pattern*: to show `IsConformalMap f`, produce `(c ≠ 0, li, f = c • li)`.
  - Induction is *not* used; proofs are algebraic and rely on properties of:
    - Scalar multiplication (`smul`),
    - Composition (`comp`),
    - Linear isometries (`li`),
    - Subsingleton/Nontrivial reasoning.
- **Typical flow**:
  1. Unpack assumptions using `rcases`.
  2. Construct witness `(c', li')` for the conclusion.
  3. Prove nonzero scalar condition (e.g., `mul_ne_zero`).
  4. Prove equality via `rw` using lemmas like `smul_comp`, `comp_smul`, `mul_smul`, `one_smul`.
  5. For injectivity/nonzero: use properties of linear isometries (`li.injective`) and scalar multiplication (`smul_right_injective`).

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Normed.Module.Basic` | Basic theory of normed modules/spaces over normed fields. |
| `Mathlib.Analysis.Normed.Operator.LinearIsometry` | Linear isometries between normed spaces (`→ₗᵢ`), their embedding into `→L`. |
| `Mathlib.LinearAlgebra.Basis.VectorSpace` | Used for `Subsingleton`/`Nontrivial` reasoning and vector space structure. |

> **Note**: The file is part of the `Analysis.Normed.Module` ecosystem, focusing on *continuous* linear maps (`→L`) and their interaction with isometries and scalar multiplication.

--- 

Let me know if you'd like a formalized summary in Lean or a diagram of dependencies.