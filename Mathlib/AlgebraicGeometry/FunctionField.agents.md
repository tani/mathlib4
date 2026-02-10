### Technical Brief: Function Field of Integral Schemes in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Scheme.functionField` | `[IrreducibleSpace X] → CommRingCat` | Defines the function field of an irreducible scheme as the stalk at its generic point. |
| `Scheme.germToFunctionField` | `[IrreducibleSpace X] → (U : X.Opens) [Nonempty U] → Γ(X, U) ⟶ X.functionField` | Canonical restriction map from sections over open `U` to the function field (germ at generic point). |
| `StalkFunctionFieldAlgebra` | `[IrreducibleSpace X] → Algebra (stalk x) functionField` | Induces algebra structure from stalks to function field via specialization maps. |
| `functionField_isScalarTower` | `[IrreducibleSpace X] → IsScalarTower Γ(U) (stalk x) functionField` | Ensures compatibility of scalar towers between sections, stalks, and function field. |
| `functionField_isFractionRing_of_affine` | `[IsDomain R] → IsFractionRing R (Spec R).functionField` | Shows that for affine integral schemes, the function field is the fraction field. |
| `functionField_isFractionRing_of_isAffineOpen` | `[IsIntegral X] → (U : X.Opens) [IsAffineOpen U] [Nonempty U] → IsFractionRing Γ(U) functionField` | Generalizes the above to arbitrary integral schemes using affine opens. |
| `germ_injective_of_isIntegral` | `[IsIntegral X] → Injective (germ U x)` | Germs at points in integral schemes are injective (i.e., sections are determined by their germs). |
| `Scheme.germToFunctionField_injective` | `[IsIntegral X] → Injective (germToFunctionField U)` | The canonical map into the function field is injective. |
| `genericPoint_eq_of_isOpenImmersion` | `[IsOpenImmersion f] → f(base)(genericPoint X) = genericPoint Y` | Generic points are preserved under open immersions between irreducible schemes. |
| `genericPoint_eq_bot_of_affine` | `[IsDomain R] → genericPoint (Spec R) = ⊥` | In affine case, generic point corresponds to the zero prime ideal. |
| `IsAffineOpen.primeIdealOf_genericPoint` | `[IsIntegral X] → primeIdealOf(genericPoint) = genericPoint(Spec Γ(U))` | Relates generic point on open affine to generic point of its ring of sections. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `functionField_`: Pertains to the function field construction.
  - `germ_`: Pertains to germs and their properties (e.g., injectivity, algebra structure).
  - `genericPoint_`: Pertains to properties of the generic point.
  - `stalk_`: Pertains to stalks and their relations (e.g., `stalkFunctionFieldAlgebra`, `stalkSpecializes`).
  - `isFractionRing_`: Pertains to fraction ring structures.

- **Suffixes:**
  - `_injective`: Indicates injectivity of a map.
  - `_of_`: Indicates dependency on a hypothesis (e.g., `of_isIntegral`, `of_affine`).
  - `_eq_`: Indicates equality involving a canonical object (e.g., `genericPoint_eq_bot_of_affine`).

- **Other patterns:**
  - `algebra`, `algebraMap`, `toAlgebra`: Used for algebra structures.
  - `isLocalization`, `isFractionRing`: Used for universal properties of localization/fraction fields.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `erw` | Rewriting definitions (especially for germs, stalks, opens). |
| `simp_rw` | Simplifying with rewriting (e.g., `RingHom.algebraMap_toAlgebra`). |
| `convert` | Matching goals up to definitional equality or using universal properties. |
| `congr` / `congr'` | Proving equality of structures (e.g., prime ideals, opens). |
| `ext` | Extensionality for types like `PrimeSpectrum`, `Opens`, sets. |
| `apply` / `exact` | Applying lemmas or hypotheses directly. |
| `cases` / `obtain` | Destructuring existential quantifiers (e.g., germ representatives). |
| `refine` / `exact` | Constructing instances (e.g., `Field`, `IsFractionRing`). |
| `aesop` / `tauto` | Rare; mostly used for trivial logical steps. |
| `ring` / `linarith` | Not prominent here—algebraic geometry focuses more on categorical/structural reasoning. |

---

#### **4. Proof Logic**

- **General Strategy:**
  - Prove statements about the function field by reducing to the **affine case**, where `Spec R` and its fraction field are well-understood.
  - Use **localization theory** (e.g., `StructureSheaf.IsLocalization.to_stalk`) to relate stalks and function fields.
  - Leverage **generic point properties** (`genericPoint_spec`) to relate openness, membership, and specialization.
  - Use **injectivity lemmas** (`germ_injective_of_isIntegral`) to lift injectivity from stalks to global sections.

- **Common Proof Patterns:**
  - **Affine reduction**: For integral `X`, cover with affine opens `U = Spec A`, then use:
    - `functionField_isFractionRing_of_isAffineOpen` to identify `K(X)` with `Frac(A)`.
    - `genericPoint_eq_of_isOpenImmersion` to ensure consistency across overlaps.
  - **Stalk-based reasoning**: Use `germ_exist` to represent stalk elements as sections over opens, then analyze membership of generic point in basic opens (`basicOpen`).
  - **Universal properties**: Prove `IsFractionRing` by verifying the universal property via `IsLocalization`.

- **Induction / Cases**:
  - Not typical; proofs rely more on categorical and sheaf-theoretic properties than structural induction.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Properties` | Core definitions: schemes, sheaves, stalks, generic points, open immersions. |
| `TopologicalSpace`, `CategoryTheory`, `CategoryTheory.Limits`, `TopCat` | Foundational tools for topology and categorical constructions (e.g., stalks as colimits). |
| `Opens`, `RingedSpace`, `StructureSheaf` | Sheaf-theoretic machinery (germs, sections, stalks, localization). |
| `AlgebraicGeometry.Scheme` (implicit) | Definitions like `genericPoint`, `presheaf`, `stalk`, `opens`. |
| `AlgebraicGeometry.IsFractionRing`, `IsLocalization` | Fraction ring and localization theory. |

---

### Summary

This file formalizes the **function field** of an **integral scheme** as the stalk at its **generic point**, and establishes that it behaves like the **field of fractions** in the affine case. Key results include:

- Injectivity of germ maps into the function field.
- Identification of the function field with the fraction field of sections over any affine open subset.
- Compatibility of algebra structures across stalks, sections, and the function field.

The formalization heavily relies on **sheaf theory**, **localization**, and **categorical universal properties**, with proofs often reducing to the affine case via open immersions and generic point properties.