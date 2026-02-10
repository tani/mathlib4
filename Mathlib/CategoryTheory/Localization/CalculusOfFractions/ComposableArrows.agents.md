Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `essSurj_mapComposableArrows_of_hasRightCalculusOfFractions` | `(n : ℕ) → (L.mapComposableArrows n).EssSurj` | Proves essential surjectivity of `L.mapComposableArrows n` under the assumption that `W` has a *right* calculus of fractions. |
| `essSurj_mapComposableArrows` | `(n : ℕ) → (L.mapComposableArrows n).EssSurj` | Extends the result to the case where `W` has a *left* calculus of fractions, using duality. |
| `L.mapComposableArrows n` | `ComposableArrows C n ⥤ ComposableArrows D n` | The induced functor on `n`-fold composable arrows. |
| `L.IsLocalization W` | Class instance | States that `L` is the localization of `C` at the class `W` of morphisms. |
| `W.HasRightCalculusOfFractions` / `W.HasLeftCalculusOfFractions` | Class instances | Assumptions enabling fraction calculus (right or left) for `W`. |
| `mk₀`, `precomp`, `isoMk₀`, `isoMkSucc` | Constructors for isomorphisms in `ComposableArrows` | Used to build objects and isomorphisms in the category of composable arrows. |

---

### 📝 **Naming Conventions**

- **Functorial constructions**: `mapComposableArrows`, `op`, `rightOp`, `functor`, `symm`
- **Isomorphism constructors**:
  - `mk₀`, `mkSucc` → object constructors for `ComposableArrows`
  - `isoMk₀`, `isoMkSucc` → isomorphism constructors for `ComposableArrows`
- **Fraction calculus**:
  - `exists_rightFraction`, `exists_leftFraction` (implied by `HasRightCalculusOfFractions`)
- **Localization properties**:
  - `essSurj`, `objObjPreimageIso`, `isoOfHom`
- **Duality**:
  - `.op`, `opEquivalence`, ` Functor.essSurj_of_iso`, `essSurj_of_comp_fully_faithful`

---

### ⚙️ **Tactic Stack**

- `induction n with | zero | succ n hn =>` — structural induction on natural numbers.
- `obtain ⟨...⟩ := ...` — destructuring existential or product types.
- `refine ⟨...⟩` — constructing a witness for an existential goal.
- `dsimp`, `simp [← cancel_mono ..., hf']` — simplification using rewrite rules and cancellation lemmas.
- `exact ...` — closing goals directly when a term matches the goal type.

---

### 🧠 **Proof Logic**

- **Right calculus case** (`essSurj_mapComposableArrows_of_hasRightCalculusOfFractions`):
  - Induction on `n`.
  - Base case (`n = 0`): Use surjectivity of `mk₀` and essential surjectivity of `L` to lift an object in `D`.
  - Inductive step (`n + 1`):
    - Use `precomp_surjective` to decompose a composable arrow in `D`.
    - Apply induction hypothesis to get a preimage for the tail.
    - Use `exists_rightFraction` to lift the connecting morphism via right fraction calculus.
    - Assemble the preimage object and construct an isomorphism using `isoMkSucc`.

- **Left calculus case** (`essSurj_mapComposableArrows`):
  - Reduce to the right calculus case by passing to opposite categories:
    - Use `L.op` and `W.op`, which inherit the right calculus property.
    - Use `opEquivalence` and ` Functor.essSurj_of_iso` / `essSurj_of_comp_fully_faithful` to transfer essential surjectivity back.

---

### 📦 **Imports**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.ComposableArrows` | Provides the `ComposableArrows` category and its structure (objects = `n`-chains of composable arrows, morphisms = natural transformations). |
| `Mathlib.CategoryTheory.Localization.CalculusOfFractions` | Provides the calculus of fractions machinery: `HasLeftCalculusOfFractions`, `HasRightCalculusOfFractions`, `exists_rightFraction`, etc. |

---

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation, AI training, or proof planning).