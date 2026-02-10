Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Functor.Linear` | `class` | A `Prop`-valued class stating that an additive functor `F : C ⥤ D` between `R`-linear preadditive categories induces an `R`-module morphism on each hom-group: `F.map (r • f) = r • F.map f`. |
| `map_smul` | `theorem` | Simplification lemma: `F.map (r • f) = r • F.map f`, derived from `Functor.Linear.map_smul`. |
| `mapLinearMap` | `def` | Constructs an `R`-linear map `(X ⟶ Y) →ₗ[R] F.obj X ⟶ F.obj Y` whose underlying function is `F.map`. |
| `coe_mapLinearMap` | `theorem` | Shows that the coercion of `F.mapLinearMap` to a function equals `F.map`. |
| `inducedFunctorLinear` | `instance` | Proves that the induced functor from a function `C → D` is `R`-linear when `D` is `R`-linear. |
| `fullSubcategoryInclusionLinear` | `instance` | Shows the inclusion of a full subcategory is `R`-linear. |
| `natLinear`, `intLinear`, `ratLinear` | `instance` | Prove that any additive functor is automatically `ℕ`-, `ℤ`-, and (under appropriate assumptions) `ℚ`-linear. |
| `inverseLinear` | `instance` | If an equivalence `e : C ≌ D` has a linear functor part, then its inverse is also linear. |

---

### **2. Naming Conventions**

- **Class names**: `Functor.Linear` — uses `Linear` suffix to indicate a property (i.e., being linear over `R`).
- **Instance names**: `natLinear`, `intLinear`, `ratLinear`, `inducedFunctorLinear`, `fullSubcategoryInclusionLinear` — all end with `Linear`, indicating they instantiate `Functor.Linear`.
- **Theorems/defs**:
  - `map_smul`, `mapLinearMap`, `coe_mapLinearMap` — follow pattern `map_*` for operations on morphisms.
  - `map_smul'` (in `mapLinearMap` definition) — prime suffix indicates a *proof* component of a structure (here, the `map_smul'` field of a linear map).
- **Variable naming**: `R`, `C`, `D`, `E`, `F`, `G`, `X`, `Y`, `f`, `r`, `e`, `Z` — standard category-theoretic and algebraic notation.

---

### **3. Tactic Stack**

- **`aesop_cat`** — used in the `Functor.Linear` class definition to discharge the proof obligation automatically (a custom tactic for category theory in Mathlib).
- **`simp`**, **`apply`**, **`rfl`**, **`by aesop_cat`** — used in proofs (e.g., `inverseLinear`, `map_units_smul`).
- **`simp_rw`** is *not* present, but `simp` is used heavily.
- **`apply map_smul`** — in `map_units_smul`, leveraging the `map_smul` theorem.

---

### **4. Proof Logic**

- **Structure**: Most proofs follow a pattern of:
  1. **Instantiating assumptions** (e.g., `[F.Additive] [Linear R F]`).
  2. **Using existing lemmas** (e.g., `map_smul`, `mapAddHom.map_nsmul`, `toRatLinearMap.map_smul`).
  3. **Simplifying** with `simp` and applying injectivity or functoriality where needed (e.g., `e.functor.map_injective` in `inverseLinear`).
- **Induction is not used** — proofs rely on algebraic properties of module morphisms and functoriality.
- **Instance proofs** are mostly one-liners or use `aesop_cat`/`simp` + `apply`.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Preadditive.AdditiveFunctor` | Provides `Additive` class and related infrastructure for additive functors. |
| `Mathlib.CategoryTheory.Linear.Basic` | Defines `Linear R C` (a category is `R`-linear) and basic constructions. |
| `Mathlib.Algebra.Module.LinearMap.Rat` | Supplies `toRatLinearMap` and related results for extending scalars to `ℚ`. |

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Category theory with enrichment over modules (specifically, preadditive and `R`-linear categories).
- **Key abstractions**: Functors, hom-modules, scalar multiplication compatibility.
- **Common proof patterns**: Use of `map_smul` to reduce linearity checks; leveraging existing algebraic lemmas (`mapAddHom.map_*`) for `ℕ`, `ℤ`, `ℚ`.
- **Automation**: Heavy use of `aesop_cat` for routine category-theoretic reasoning.

Let me know if you'd like a formalized tactic guide or a summary of how this fits into the broader `Linear` hierarchy in Mathlib.