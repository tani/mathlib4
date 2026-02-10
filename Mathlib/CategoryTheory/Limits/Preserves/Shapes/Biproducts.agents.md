### Technical Metadata Brief: Preservation of Biproducts in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mapBicone` | `F : C ⥤ D → [PreservesZeroMorphisms F] → Bicone f → Bicone (F.obj ∘ f)` | Maps a bicone over `f` to a bicone over `F.obj ∘ f` via functoriality. |
| `mapBinaryBicone` | `BinaryBicone X Y → BinaryBicone (F.obj X) (F.obj Y)` | Special case of `mapBicone` for binary biproducts. |
| `PreservesBiproduct f F` | `Prop` | Functor `F` maps *every* bilimit bicone over `f` to a bilimit bicone over `F.obj ∘ f`. |
| `isBilimitOfPreserves` | `{b : Bicone f} → b.IsBilimit → (F.mapBicone b).IsBilimit` | Extracts the image bilimit under assumption of preservation. |
| `PreservesBiproductsOfShape J F` | `Prop` | `F` preserves biproducts of all diagrams of shape `J`. |
| `PreservesFiniteBiproducts F` | `Prop` | `F` preserves biproducts over all finite index types. |
| `PreservesBiproducts F` | `Prop` | `F` preserves biproducts of arbitrary shape (at universe level `w₁`). |
| `preservesBiproducts_shrink` | Lemma | Monotonicity of preservation across universe levels. |
| `PreservesBinaryBiproduct X Y F` | `Prop` | `F` preserves binary biproducts of `X` and `Y`. |
| `preservesBinaryBiproduct_of_preservesBiproduct` | Lemma | Preservation of biproducts over `pairFunction X Y` implies preservation of binary biproduct `X ⊞ Y`. |
| `biproductComparison F f` | `F.obj (⨁ f) ⟶ ⨁ (F.obj ∘ f)` | Canonical comparison morphism from image of biproduct to biproduct of images. |
| `biproductComparison' F f` | `⨁ (F.obj ∘ f) ⟶ F.obj (⨁ f)` | Canonical comparison in opposite direction. |
| `mapBiproduct F f` | `F.obj (⨁ f) ≅ ⨁ (F.obj ∘ f)` | Isomorphism when `F` preserves biproduct `f`. |
| `biprodComparison F X Y` | `F.obj (X ⊞ Y) ⟶ F.obj X ⊞ F.obj Y` | Binary version of `biproductComparison`. |
| `biprodComparison' F X Y` | `F.obj X ⊞ F.obj Y ⟶ F.obj (X ⊞ Y)` | Binary version of `biproductComparison'`. |
| `mapBiprod F X Y` | `F.obj (X ⊞ Y) ≅ F.obj X ⊞ F.obj Y` | Isomorphism when `F` preserves binary biproduct `X ⊞ Y`. |
| `preservesBiproduct_of_monoBiproductComparison` *(implicit)* | — | Not explicitly named, but used in comments: if `biproductComparison` is mono (or epi), then `F` preserves biproduct. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `map*`: Functorial image (e.g., `mapBicone`, `mapBinaryBicone`, `mapBiproduct`, `mapBiprod`).
  - `biproduct*`, `biprod*`: Biproduct-specific constructions.
  - `preserves*`: Preservation classes/lemmas (`PreservesBiproduct`, `preservesBinaryBiproduct_of_...`).
  - `is*OfPreserves`: Constructing limits from preservation assumption (`isBilimitOfPreserves`, `isBinaryBilimitOfPreserves`).

- **Suffixes**:
  - `Comparison` / `Comparison'`: Canonical morphisms between image and target biproducts.
  - `OfShape`, `OfPreserves`, `OfBinary`: Distinguish shape-based vs object-based preservation.

- **Infixes**:
  - `⊞` for binary biproduct (standard in Mathlib).
  - `⨁` for general biproduct (indexed coproduct + product).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop` | Automated reasoning for split epis/monos, identity simplifications. |
| `simp` / `simp only` | Simplification using `simps`-generated lemmas (`mapBicone`, `biprodComparison_fst`, etc.). |
| `ext` | Extensionality for morphisms (especially biproduct universal properties). |
| `rw` / `rewrite` | Rewriting using definitions (`mapBiproduct_hom`, `biproduct.lift_π`, etc.). |
| `dsimp` | Definitional simplification (e.g., `Function.comp_def`). |
| `rcases` / `cases` | Case analysis on `J`-indexed types (e.g., `rcases j with ⟨⟨⟩⟩`). |
| `haveI` | Introducing instance hypotheses (e.g., `hasBiproduct_of_preserves`). |
| `exact` / `assumption` | Rarely explicit; mostly handled by `aesop`/`simp`. |

---

#### **4. Proof Logic**

- **Structure**:
  - **Induction/Case Analysis**: On finite index types (e.g., `pairFunction`, `WalkingPair`) to reduce binary case to general.
  - **Universal Property Reasoning**: Use of `IsBilimit` elimination/introduction via `isBilimitOfPreserves`, `biproduct.uniqueUpToIso`, `biprod.uniqueUpToIso`.
  - **Splitting Arguments**: Showing `biproductComparison` is split epi/mono ⇒ iso (via `splitEpiBiproductComparison`, `splitMonoBiproductComparison'`).
  - **Functoriality**: Leveraging `F.map_comp`, `F.map_id`, `F.map_zero` (via `PreservesZeroMorphisms`).
  - **Whiskering & Equiv Transfer**: For universe-shrinking and shape equivalence (`whiskerIsBilimitIff`, `Equivalence.ulift`).

- **Typical Flow**:
  1. Assume `b.IsBilimit`.
  2. Apply `isBilimitOfPreserves` to get `(F.mapBicone b).IsBilimit`.
  3. Use `biproduct.uniqueUpToIso` to construct `mapBiproduct`.
  4. Prove equations (e.g., `mapBiproduct_hom`) by `ext` + `simp`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.Biproducts` | Core biproduct theory: definitions, universal properties, `biproduct`, `biprod`, `Bicone`, `BinaryBicone`. |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Zero` | `PreservesZeroMorphisms`, foundational for biproduct preservation (biproducts require zero morphisms). |

**Domain Scope**:  
- Additive-like behavior in general categories (not necessarily additive).  
- Focus on *preservation* of finite biproducts under functors preserving zero morphisms.  
- Applications: Homological algebra, derived functors, stable homotopy theory (via stable ∞-categories or triangulated categories).

--- 

Let me know if you'd like a diagrammatic summary or a formalization roadmap for extending this module.