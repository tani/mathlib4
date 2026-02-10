### Technical Brief: Binary Products via Pullbacks and Terminal Objects in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isBinaryProductOfIsTerminalIsPullback` | `(F : Discrete WalkingPair ⥤ C) → (c : Cone F) → {X : C} → IsTerminal X → (f : F.obj left ⟶ X) → (g : F.obj right ⟶ X) → IsLimit (PullbackCone.mk ...)` → `IsLimit c` | Shows that a cone over a discrete pair is a limit (i.e., a product) if it arises as a pullback over a terminal object. |
| `isProductOfIsTerminalIsPullback` | `(f : X ⟶ Z) (g : Y ⟶ Z) (h : W ⟶ X) (k : W ⟶ Y) → IsTerminal Z → IsLimit (PullbackCone.mk ...) → IsLimit (BinaryFan.mk h k)` | Special case: pullback over terminal object gives binary product. |
| `isPullbackOfIsTerminalIsProduct` | Dual of above: product implies pullback over terminal object. |
| `limitConeOfTerminalAndPullbacks` | `[HasTerminal C] → [HasPullbacks C] → (F : Discrete WalkingPair ⥤ C) → LimitCone F` | Constructs a limit cone for any discrete pair using terminal object and pullbacks. |
| `hasBinaryProducts_of_hasTerminal_and_pullbacks` | `[HasTerminal C] → [HasPullbacks C] → HasBinaryProducts C` | Main theorem: existence of terminal object + pullbacks ⇒ existence of all binary products. |
| `preservesBinaryProducts_of_preservesTerminal_and_pullbacks` | `[HasTerminal C] [HasPullbacks C] → [PreservesLimitsOfShape (Discrete PEmpty) F] → [PreservesLimitsOfShape WalkingCospan F] → PreservesLimitsOfShape (Discrete WalkingPair) F` | Functors preserving terminal objects and pullbacks preserve binary products. |
| `prodIsoPullback` | `[HasTerminal C] [HasPullbacks C] [HasBinaryProduct X Y] → X ⨯ Y ≅ pullback (terminal.from X) (terminal.from Y)` | Explicit isomorphism between product and pullback over terminal. |
| `prodIsoPullback_hom_fst`, `prodIsoPullback_hom_snd`, etc. | Lemmas about how the iso interacts with projections/factors. | Used for simplification (`simp`-friendly). |
| `isBinaryCoproductOfIsInitialIsPushout`, `isCoproductOfIsInitialIsPushout`, etc. | Dual statements for coproducts via pushouts over initial object. | Symmetric dual theory. |
| `colimitCoconeOfInitialAndPushouts`, `hasBinaryCoproducts_of_hasInitial_and_pushouts`, `coprodIsoPushout`, etc. | Dual constructions and results for coproducts. | Completes the duality picture. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isBinaryProductOf...`, `isProductOf...`, `isPullbackOf...`: Characterize when a diagram is a product/pullback.
  - `hasBinaryProducts_of...`, `hasBinaryCoproducts_of...`: Existence theorems.
  - `preservesBinaryProducts_of...`: Preservation under functors.
  - `limitConeOf...`, `colimitCoconeOf...`: Construction of (co)limits from other limits.
  - `prodIsoPullback`, `coprodIsoPushout`: Isomorphisms between constructions.

- **Suffixes:**
  - `hom_fst`, `hom_snd`, `inv_fst`, `inv_snd`: Component-wise behavior of isomorphisms.
  - `inl_...`, `inr_...`: For coproduct injections.

- **Pattern:**
  - `isXOfYAndZ`: When `Y` and `Z` imply `X`.
  - `hasX_of_Y_and_Z`: Existence of `X` given `Y`, `Z`.
  - `preservesX_of_preservesY_and_Z`: Preservation under functors.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `apply` | Core proof step: applying lemmas or constructors. |
| `intro` / `intro m h₁ h₂` | Introducing variables/hypotheses. |
| `rw`, `simp`, `dsimp` | Rewriting using definitions or simplifying. |
| `exact` / `exacts [...]` | Finishing subgoals directly or in sequence. |
| `congr 1` | For proving equality of morphisms by congruence. |
| `rintro (_ | (_ | _))` | Case analysis on sum types (e.g., `WalkingPair`). |
| `simp only [...]` | Targeted simplification using specific lemmas. |
| `trans`, `symm`, `assoc` | Manipulating compositions and equalities. |
| `let ... := ...` | Local definitions for intermediate constructions. |

Most proofs follow a pattern:  
→ Define auxiliary (co)cone,  
→ Apply known (co)limit universal property,  
→ Use `hom_ext` to conclude uniqueness/factorization.

---

#### **4. Proof Logic**

**General proof strategy:**

1. **Construct auxiliary (co)cone** (e.g., `PullbackCone.mk` or `BinaryFan.mk`) using given data.
2. **Apply universal property** of known (co)limit (e.g., `IsLimit (PullbackCone.mk ...)`).
3. **Define lift/desc** using the universal property.
4. **Verify factorization** (`fac`) and **uniqueness** (`uniq`) using:
   - `hom_ext` (extensionality for limits/colimits),
   - `fac`, `fac_assoc`, and associativity of composition.

**Example flow for `isBinaryProductOfIsTerminalIsPullback`:**
- Given `c : Cone F`, assume it's a pullback over terminal `X`.
- Use `hc.lift` to define `lift s`.
- Prove `fac` by case analysis on `j : WalkingPair`.
- Prove `uniq` by constructing `c'` and applying `hc.hom_ext`.

**Dual proofs** follow same pattern, replacing:
- `IsTerminal` ↔ `IsInitial`
- `PullbackCone` ↔ `PushoutCocone`
- `Cone` ↔ `Cocone`
- `lift` ↔ `desc`
- `fac` ↔ `fac` (dual)

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Shapes.Terminal` | Terminal objects and their universal property. |
| `Mathlib.CategoryTheory.Limits.Shapes.BinaryProducts` | Binary products and fans. |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Pullbacks` | Preservation of pullbacks by functors. |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Terminal` | Preservation of terminal objects. |

These imports provide foundational definitions and lemmas for:
- Limits/colimits,
- Preservation,
- Specific shapes: terminal, pullback, binary product/coproduct.

---

### Summary

This file formalizes the classical categorical result:  
> **A category with pullbacks and a terminal object has all binary products.**  
It also provides the dual: **pushouts + initial object ⇒ binary coproducts**, and includes:
- Explicit constructions (`limitConeOfTerminalAndPullbacks`),
- Isomorphisms (`prodIsoPullback`),
- Preservation lemmas,
- Simplification lemmas (`@[reassoc (attr := simp)]`).

The structure is highly modular and reusable, with clear separation between:
- Existence theorems,
- Universal properties,
- Functorial behavior,
- Concrete isomorphisms.

This is a canonical example of Lean 4’s strength in formalizing abstract category theory with high fidelity.