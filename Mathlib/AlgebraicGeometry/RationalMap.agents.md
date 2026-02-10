Here is a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `PartialMap X Y` | A morphism from a **dense open subscheme** of `X` to `Y`. Encodes domain (`X.Opens`) + dense condition + morphism. |
| `PartialMap.equiv f g` | Equivalence relation: `f` and `g` agree on some dense open subset of their common domain intersection. |
| `RationalMap X Y` | Quotient of `PartialMap X Y` by `equiv`. Notation: `X ⤏ Y`. |
| `PartialMap.toRationalMap` | Canonical map `PartialMap X Y → RationalMap X Y`. |
| `RationalMap.fromFunctionField` | For irreducible `X`, any rational map `X ⤏ Y` induces a morphism `Spec K(X) → Y`. |
| `RationalMap.ofFunctionField` | For integral `X`, any morphism `Spec K(X) → Y` (over `S`) spreads out to a rational map `X ⤏ Y`. |
| `RationalMap.equivFunctionField` | **Main theorem**: For integral `X`, locally finite type `Y → S`, there is a bijection: <br> `{f : Spec K(X) → Y // f ≫ sY = X.fromSpecStalk _ ≫ sX} ≃ {f : X ⤏ Y // f.compHom sY = sX.toRationalMap}` |
| `RationalMap.equivFunctionFieldOver` | Over-`S` version of `equivFunctionField`, using `IsOver` conditions. |
| `RationalMap.domain f` | Supremum (union) of domains of all partial maps representing `f`. Open subscheme of `X`. |
| `RationalMap.toPartialMap` | If `X` is reduced and `Y` is separated, any rational map `f : X ⤏ Y` has a **canonical representative** on its domain `f.domain`. |
| `PartialMap.fromSpecStalkOfMem` | Restriction of a partial map to stalks: `Spec 𝒪ₓ → Y` for `x ∈ domain`. |
| `PartialMap.ofFromSpecStalk` | Spreading out: given `Spec 𝒪ₓ → Y`, under suitable conditions (e.g., `X` integral, `Y` l.f.t.), get a partial map `X ⤏ Y`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isOver`, `isDominant`, `isReduced`, `isSeparated`, `isIntegral`, `isGermInjectiveAt`: properties of schemes/morphisms.
  - `fromSpecStalk`, `fromFunctionField`: constructions factoring through stalks or function field.
  - `toPartialMap`, `toRationalMap`: coercion/embedding into more structured objects.
  - `restrict`, `compHom`: operations on partial/rational maps.
  - `equiv`, `ext`, `ext_iff`: equivalence and extensionality lemmas.

- **Suffixes**:
  - `_of_`: e.g., `ofFromSpecStalk`, `ofFunctionField` — constructions *from* a morphism on a special object.
  - `_restrict`: restriction to smaller open.
  - `_toRationalMap`, `_toPartialMap`: coercion to rational/partial maps.

- **Notable patterns**:
  - `homOfLE`: morphism induced by inclusion of opens.
  - `ι`, `hom`, `domain`: standard fields in `PartialMap`.
  - `spread_out_...`: lemmas about extending morphisms from stalks.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities, especially for `PartialMap` fields. |
| `rw` / `convert` / `congr` | Rewriting and congruence closure for equality proofs. |
| `ext` / `ext1` | Extensionality for structures (e.g., `PartialMap`, `Opens`). |
| `dsimp` | Definitional simplification (e.g., unfolding `restrict`, `compHom`). |
| `exact`, `refine`, `obtain`, `cases` | Proof construction and destructing existentials. |
| `have`, `set`, `generalize_proofs` | Intermediate lemma introduction and proof management. |
| `apply`, `apply_fun`, `funext` | Functional extensionality and application. |
| `topological` lemmas: `dense_inter`, `dense_univ`, `mem_sSup`, `isDominant_of_isOpenImmersion` | Used heavily in density/dominance arguments. |
| `category` lemmas: `assoc`, `id_comp`, `Iso.eq_inv_comp`, `cancel_mono`, `cancel_epi` | Categorical reasoning in `Scheme`. |
| `aesop` (implicit via `infer_instance`) | Used in typeclass inference and trivial goals. |

---

### **4. Proof Logic**

- **Induction & Quotient Reasoning**:
  - Rational maps are defined via `Quotient`, so many proofs use `Quotient.lift`, `Quotient.inductionOn`, or `Quotient.exists_rep`.
  - Equivalence proofs often construct a common dense open subset (e.g., intersection of domains).

- **Spreading Out**:
  - Core technique: use `spread_out_of_isGermInjective'` (from `SpreadingOut` import) to extend morphisms from stalks or function field to partial maps.
  - Requires conditions: `X` integral / germ-injective at point, `Y` locally of finite type over base.

- **Uniqueness via Separatedness**:
  - Key lemma: `ext_of_isDominant_of_isSeparated'` — two morphisms agreeing on a dense open subset are equal if target is separated.
  - Used in proving `equiv_iff_of_isSeparated`, `equiv_toPartialMap_iff_of_isSeparated`, etc.

- **Gluing**:
  - `openCoverDomain.glueMorphisms` constructs global morphism on domain from compatible local ones.
  - Requires separatedness of `Y` to ensure uniqueness of gluing.

- **Stalk/Function Field Calculations**:
  - Many lemmas relate `fromSpecStalkOfMem` and `fromFunctionField` under restriction or composition.
  - Use `Spec.map_comp`, `stalkMap_comp`, `IsIso.eq_inv_comp`, `stalkCongr_hom`.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.SpreadingOut` | Provides `spread_out_of_isGermInjective'`, key for extending morphisms from stalks. |
| `Mathlib.AlgebraicGeometry.FunctionField` | Defines function field `K(X)` and `fromSpecStalk` for irreducible schemes. |
| `Mathlib.AlgebraicGeometry.Morphisms.Separated` | Provides `IsSeparated`, `ext_of_isDominant_of_isSeparated'`, and related lemmas. |

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Scheme theory, especially rational maps, function fields, and spreading out.
- **Key mathematical objects**: `Scheme`, `PartialMap`, `RationalMap`, `Spec K(X)`, stalks, dense opens.
- **Common proof patterns**:
  - Reduce to partial maps, prove equivalence, then descend to rational maps.
  - Use separatedness to upgrade agreement on dense opens to global equality.
  - Use integral/reduced assumptions to control stalks and function fields.
- **Critical lemmas for automation**:
  - `equiv_iff_of_isSeparated`, `equiv_toPartialMap_iff_of_isSeparated`, `RationalMap.eq_of_fromFunctionField_eq`, `RationalMap.fromFunctionField_ofFunctionField`.

Let me know if you'd like a formalized tactic guide or a proof strategy generator for this module.