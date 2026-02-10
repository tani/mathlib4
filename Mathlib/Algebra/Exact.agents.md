### Technical Metadata Brief: Exactness of a Pair in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Function.Exact` | `[Zero P] → (f : M → N) → (g : N → P) → Prop` | Defines exactness of a pair of functions: `g y = 0 ↔ y ∈ range f`. |
| `AddMonoidHom.exact_iff` | `Exact f g ↔ ker g = range f` | Equates functional exactness with equality of kernel and range for additive maps. |
| `LinearMap.exact_iff` | `Exact f g ↔ LinearMap.ker g = LinearMap.range f` | Same as above, specialized to linear maps over semirings/modules. |
| `Exact.comp_eq_zero` | `Exact f g → g ∘ f = 0` | Shows that exactness implies composition is zero. |
| `Exact.of_comp_of_mem_range` | `g ∘ f = 0 → (∀ x, g x = 0 → x ∈ range f) → Exact f g` | A standard criterion for exactness: zero composition + kernel ⊆ range. |
| `Exact.linearMap_ker_eq` | `Exact f g → ker g = range f` | Extracts equality of kernel and range from exactness. |
| `Exact.splitSurjectiveEquiv` | `Exact f g → Injective f → { l // g ∘ₗ l = id } ≃ { e // ... }` | Splitting lemma: existence of a section ⇔ splitting of the sequence. |
| `Exact.splitInjectiveEquiv` | `Exact f g → Surjective g → { l // l ∘ₗ f = id } ≃ { e // ... }` | Dual splitting lemma: existence of a retraction ⇔ splitting. |
| `Exact.split_tfae` | `List.TFAE [...]` | Equivalent characterizations of split exact sequences (Splitting Lemma). |
| `Exact.linearEquivOfSurjective` | `Exact f g → Surjective g → (N ⧸ range f) ≃ₗ P` | Isomorphism induced by an exact sequence ending in surjection. |
| `Exact.exact_mapQ_iff` | Condition for descending exactness to quotients. | Used for exactness in quotient modules. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exact_`: for lemmas about `Exact` (e.g., `exact_of_comp_eq_zero_of_ker_le_range`)
  - `of_`: for introduction rules (e.g., `of_comp_of_mem_range`)
  - `comp_`: for composition-related facts (e.g., `comp_eq_zero`, `comp_injective`)
  - `linearMap_`, `addMonoidHom_`: module-specific variants (e.g., `linearMap_ker_eq`)
  - `split_`: for splitting lemmas (`splitSurjectiveEquiv`, `split_tfae`)
  - `iff_of_`: for equivalence under structural assumptions (`iff_of_ladder_linearEquiv`)

- **Suffixes**:
  - `_eq_zero`: when composition is zero
  - `_le_range`, `_in_range`: inclusion conditions
  - `_surjective`, `_injective`: assumptions on maps
  - `_Equiv`, `_Equiv'`: for equivalences or bijections

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying goals using definitions (`exact_iff`, `ker`, `range`, etc.) |
| `rw` / `rwa` | Rewriting using lemmas or equivalences |
| `ext` | Extensionality for functions/products/modules |
| `congr` / `congr_arg` / `congrFun` | Proving function equality or applying congruence |
| `intro` / `intro x` | Introducing variables/hypotheses |
| `apply`, `exact`, `assumption` | Goal-directed proof steps |
| `tfae_have`, `tfae_finish` | For proving lists of equivalent statements |
| `have`, `suffices`, `obtain` | Intermediate lemma introduction |
| `convert` / `refine` | Partial proof construction with holes |
| `dsimp`, `change` | Simplifying definitions or changing goal form |
| `cases` / `induction` | For inductive types or quotients (e.g., `Submodule.Quotient.mk`) |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs follow a *two-way implication* (`↔`) structure: prove both directions separately.
  - For `Exact f g`, proofs often reduce to showing:
    - `g y = 0 → y ∈ range f` (kernel ⊆ range)
    - `y ∈ range f → g y = 0` (range ⊆ kernel, usually from `g ∘ f = 0`)
  - Many lemmas use `exact_iff` to convert between functional and algebraic formulations.
  - Splitting lemmas use constructions like:
    - `LinearEquiv.ofBijective` to build isomorphisms from injective + surjective maps.
    - Explicit inverses via sections/retractions.
  - Diagram-chasing arguments (e.g., `exact_iff_of_surjective_of_bijective_of_injective`) use:
    - Surjectivity to lift elements,
    - Bijectivity to replace elements,
    - Injectivity to compare images.

- **Inductive/Quotient Handling**:
  - Quotient maps (`Submodule.mkQ`, `Submodule.subtype`) and their kernels/ranges are central.
  - Lemmas like `exact_subtype_mkQ`, `exact_map_mkQ_range` use `Submodule.ker_mkQ`, `Submodule.range_subtype`.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Algebra.Module.Submodule.Range`
- `Mathlib.LinearAlgebra.Prod`
- `Mathlib.LinearAlgebra.Quotient.Basic`

**Domain Scope**:
- **Algebraic context**: additive groups, semirings, rings, modules.
- **Maps considered**:
  - General functions (`Function.Exact`)
  - Additive homomorphisms (`AddMonoidHom`)
  - Linear maps (`LinearMap`)
- **Structures**:
  - Submodules, quotients, products
  - Linear equivalences (`LinearEquiv`)
  - Splitting via sections/retractions

**Notable Absences** (as per TODO):
- `SemilinearMap`, `SemilinearMapClass`
- Multiplicative version (e.g., `Function.AddExact` → `Function.Exact`)

---

Let me know if you'd like a **diagrammatic summary**, **proof automation suggestions**, or a **formalization roadmap** for the TODO items.