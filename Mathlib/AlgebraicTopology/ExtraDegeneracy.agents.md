### Technical Brief: `ExtraDegeneracy` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ExtraDegeneracy X` | `structure` for `X : SimplicialObject.Augmented C` | Encodes a *formal extra degeneracy* datum: maps `s' : point.obj X → X_[0]` and `s n : X_[n] → X_[n+1]` satisfying simplicial identities mimicking an extra degeneracy `σ₋₁`. |
| `ed.s'` | `point.obj X ⟶ drop.obj X _[0]` | Augmentation component of the extra degeneracy. |
| `ed.s n` | `drop.obj X _[n] ⟶ drop.obj X _[n + 1]` | Family of “extra degeneracy” maps for each degree `n`. |
| `ed.s'_comp_ε` | `s' ≫ X.hom.app (op [0]) = 𝟙 _` | Ensures `s'` is a section of the augmentation `ε : X_[0] → π₀X`. |
| `ed.s₀_comp_δ₁` | `s 0 ≫ δ¹ = ε ≫ s'` | Compatibility between `s₀` and the first face map `δ¹`. |
| `ed.s_comp_δ₀` | `s n ≫ δ⁰ = 𝟙 _` | `s n` is a section of the 0-th face map `δ⁰`. |
| `ed.s_comp_δ` | `s (n+1) ≫ δⁱ⁺¹ = δⁱ ≫ s n` | Naturality of `s n` w.r.t. all face maps `δⁱ`. |
| `ed.s_comp_σ` | `s n ≫ σⁱ⁺¹ = σⁱ ≫ s (n+1)` | Naturality of `s n` w.r.t. all degeneracy maps `σⁱ`. |
| `ExtraDegeneracy.map F ed` | `ExtraDegeneracy ((F : C ⥤ D).obj X)` | Functoriality: extra degeneracy is preserved under any functor `F`. |
| `ExtraDegeneracy.ofIso e ed` | `ExtraDegeneracy Y` given `e : X ≅ Y` | Transport of extra degeneracy along isomorphism of augmented simplicial objects. |
| `StandardSimplex.extraDegeneracy Δ` | `ExtraDegeneracy (standardSimplex.obj Δ)` | Explicit construction of extra degeneracy on standard simplex via `shiftFun`. |
| `Arrow.AugmentedCechNerve.extraDegeneracy f S` | `ExtraDegeneracy (f.augmentedCechNerve)` | Extra degeneracy on Čech nerve of a *split epi* `f`, using section `S`. |
| `ExtraDegeneracy.homotopyEquiv ed` | `HomotopyEquiv (AltFaceMapComplex (drop X)) (Single₀ (point X))` | In preadditive `C`, extra degeneracy ⇒ augmentation `ε` is a homotopy equivalence. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `s'`: denotes the *augmentation-level* extra degeneracy map.
  - `s n`: denotes the degree-`n` extra degeneracy map.
  - `ed.`: prefix for projections from an `ExtraDegeneracy` instance.
- **Suffixes**:
  - `_comp_ε`: identity involving composition with augmentation `ε`.
  - `_comp_δ₀`, `_comp_δ`, `_comp_σ`: identities involving face (`δ`) or degeneracy (`σ`) maps.
  - `shift`: used in `shiftFun`, `shift` — constructs maps sending `0 ↦ 0`, `i+1 ↦ f i`.
- **Helper lemmas**:
  - `s_comp_δ₀`, `s₀_comp_δ₁`, etc., are marked with `@[reassoc]` and `@[simp]` for normalization.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp only [...]` with extensive rewriting using naturality lemmas (`δ_naturality`, `σ_naturality`, `lift_π`, `lift_base`, etc.)
- `ext1`, `ext`: extensionality for morphisms (especially in `SimplexCategory.Hom` and pullbacks).
- `fin_cases`: case analysis on `Fin n` elements.
- `split_ifs`, `dsimp`, `erw`: for handling dependent `if`-expressions (`dite`) and rewriting up to definitional equality.
- `congr_app`, `Functor.mapIso`, `assoc`, `comp_id`, `id_comp`: basic category-theoretic simplifications.
- `rfl`, `subsingleton`: for trivial equalities in subsingleton types (e.g., `Hom` in preadditive categories).
- `rw [Fin.ext_iff]`, `Fin.succ_above_*`: for reasoning about `Fin` indices.

---

#### **4. Proof Logic**

- **Structure verification**: Proofs of `ExtraDegeneracy` axioms follow a uniform pattern:
  1. **Define** candidate maps (`s'`, `s n`) explicitly (e.g., via `shiftFun`, pullback lifts).
  2. **Verify axioms** by:
     - Extending morphisms (`ext1`, `SimplexCategory.Hom.ext`).
     - Reducing to pointwise equalities on `Fin` indices.
     - Using `shiftFun_0`, `shiftFun_succ`, `Fin.pred_succ`, etc.
     - Applying naturality and universal properties (e.g., `WidePullback.lift_π`, `lift_base`).
- **Functoriality & isomorphism transport**:
  - `map`: uses `F.map_comp`, `F.map_id`, and rewriting of axioms.
  - `ofIso`: uses naturality of isomorphisms and `drop.mapIso`, `point.mapIso`.
- **Homotopy equivalence** (`homotopyEquiv`):
  - Construct homotopy operator `h` as `(-s i)` when `j = i+1`, else `0`.
  - Prove `d h + h d = id - η ε` (chain homotopy) using:
    - `Preadditive` structure (`neg_comp`, `zsmul_comp`, `sum_comp`).
    - Axioms `s_comp_δ₀`, `s₀_comp_δ₁`, `s_comp_δ`, `s_comp_σ`.
    - Explicit sums over `Fin 2` and `Fin (i+2)`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.AlgebraicTopology.AlternatingFaceMapComplex`: defines alternating face map complex and its augmentation.
- `Mathlib.AlgebraicTopology.SimplicialSet.Basic`: foundational simplicial set / object theory.
- `Mathlib.AlgebraicTopology.CechNerve`: Čech nerve construction.
- `Mathlib.Algebra.Homology.Homotopy`: homotopy theory in chain complexes.
- `Mathlib.Tactic.FinCases`: case analysis on `Fin` indices.

**Domain**:
- Augmented simplicial objects in a category `C`.
- Special cases: simplicial sets (`SSet`), Čech nerves of split epis, standard simplices.
- Preadditive categories with zero object (for homotopy equivalence result).

---

### Summary

This file formalizes *extra degeneracy* — a key technical tool in simplicial homotopy theory — in full generality for augmented simplicial objects. It provides:
- A robust structural definition (`ExtraDegeneracy`) with axioms mirroring degeneracy identities.
- Constructive examples (standard simplex, Čech nerve of split epi).
- Functoriality and isomorphism invariance.
- A major application: extra degeneracy ⇒ augmentation is a homotopy equivalence in preadditive settings.

The formalization is highly structured, leveraging Lean’s typeclass inference and simplicial calculus, with proofs guided by explicit index manipulation and naturality.