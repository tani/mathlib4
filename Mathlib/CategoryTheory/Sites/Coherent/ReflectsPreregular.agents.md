**Technical Metadata Brief**

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `Preregular` | A class of categories where any pair of parallel morphisms `f g : X ⇉ Y` admits a *preregular factorization*: an effective epimorphism `π : W → X` and a morphism `i : W → Y` such that `π ≫ f = π ≄ g` and `π ≫ i` is universal among such factorizations. | Captures a weak regularity condition (weaker than regularity), used in topos theory and categorical logic. |
| `Functor.reflects_preregular` | `Preregular D → [F.PreservesEffectiveEpis] → [F.ReflectsEffectiveEpis] → [F.EffectivelyEnough] → [F.Full] → [F.Faithful] → Preregular C` | Main theorem: under suitable conditions on a fully faithful functor `F : C → D`, preregularity descends from `D` to `C`. |
| `F.effectiveEpiOver W` | An effective epimorphism `F.obj W ⟶ X` (for some `X : D`) provided by `[F.EffectivelyEnough]`. | Used to lift objects of `D` to effective epis from the image of `F`. |
| `F.preimage` | Given `h : F.obj A ⟶ B`, produces a morphism `A ⟶ F⁻¹(B)` when `F` is full & faithful (i.e., `F.map_injective` applies). | Enables descent of morphisms along `F`. |
| `F.map_injective` | Injectivity of `F` on morphisms (from `[F.Faithful]`). | Used to verify equality of morphisms in `C` by mapping to `D`. |

---

### **2. Naming Conventions**

- **Functor properties**:  
  - `PreservesEffectiveEpis`, `ReflectsEffectiveEpis`, `EffectivelyEnough`, `Full`, `Faithful` — standard typeclass names for functorial properties.
- **Factorization data**:  
  - `exists_fac` — short for “exists factorization”, used in `Preregular.exists_fac`.
- **Lifting constructions**:  
  - `effectiveEpiOver W` — constructs an effective epi from `F.obj W`.
- **Descent operations**:  
  - `preimage` — descent of morphisms along fully faithful functors.
- **Proof helpers**:  
  - `map_injective`, `map_preimage` — lemmas about behavior of `F` on morphisms.

---

### **3. Tactic Stack**

- `obtain ⟨W, f', _, i, w⟩ := …` — destructures existential quantifier from `Preregular.exists_fac`.
- `refine ⟨_, …, ⟨…, …⟩⟩` — constructs the required preregular factorization in `C`.
- `simp only [Functor.map_preimage]` — simplifies using definitional properties of `F`.
- `infer_instance` — fills in typeclass goals automatically.
- `apply F.map_injective` + `simp [w]` — proves equality in `C` by mapping to `D` and using the witness `w`.

No heavy automation (e.g., `aesop`, `ring`, `linarith`) is used — the proof is mostly *constructive* and *typeclass-driven*.

---

### **4. Proof Logic**

1. **Lift the pair** `F.map f`, `F.map g` to `D`.
2. **Apply preregularity in `D`** to get a factorization `π : F.obj W → F.obj X` (via `F.effectiveEpiOver W`) and `i : F.obj W → F.obj Y`.
3. **Descend** the factorization to `C`:
   - Use `F.preimage` to pull back `π ≫ f'` and `π ≫ i` along `F`.
   - Show the pulled-back morphisms form a valid factorization in `C`.
4. **Verify universal property**:
   - Use `F.map_injective` to reduce verification to `D`, where it holds by `w`.
5. **Check effective epi condition**:
   - Use `F.effectiveEpi_of_map` to show the descent of an effective epi under `F` (requires `PreservesEffectiveEpis` and `ReflectsEffectiveEpis`).

The logic is *constructive descent* along a well-behaved functor.

---

### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.EffectiveEpi.Enough` | Provides `EffectivelyEnough` typeclass: existence of effective epis from image of `F`. |
| `Mathlib.CategoryTheory.EffectiveEpi.Preserves` | Defines `PreservesEffectiveEpis`, `ReflectsEffectiveEpis`. |
| `Mathlib.CategoryTheory.Sites.Coherent.RegularTopology` | Contains `Preregular` definition and related theory (e.g., `exists_fac`). |

These imports sit at the intersection of **effective epimorphisms**, **descent theory**, and **regular/coherent logic** in category theory.

--- 

Let me know if you'd like a formalized summary in Lean docstring format or a diagrammatic sketch of the factorization.