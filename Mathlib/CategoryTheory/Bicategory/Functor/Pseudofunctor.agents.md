Here's a structured technical metadata summary extracted from the provided Lean 4 file on **pseudofunctors** in bicategories:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Pseudofunctor B C` | A structure extending `PrelaxFunctor B C`, equipped with: <br> • `mapId a : map (𝟙 a) ≅ 𝟙 (obj a)` <br> • `mapComp f g : map (f ≫ g) ≅ map f ≫ map g` <br> • coherence conditions (`map₂_whisker_left`, `map₂_whisker_right`, `map₂_associator`, `map₂_left_unitor`, `map₂_right_unitor`) ensuring compatibility with bicategorical structure. |
| `Pseudofunctor.toOplax F` | Coercion to an **oplax functor**, using `hom` components of `mapId` and `mapComp`. |
| `Pseudofunctor.toLax F` | Coercion to a **lax functor**, using `inv` components of `mapId` and `mapComp`. |
| `Pseudofunctor.id B` | Identity pseudofunctor on bicategory `B`. |
| `Pseudofunctor.comp F G` | Composition of pseudofunctors `F : B → C`, `G : C → D`. |
| `Pseudofunctor.mkOfOplax F h` | Constructor: given an oplax functor `F` whose `mapId` and `mapComp` are isomorphisms (`F.PseudoCore`), produce a pseudofunctor. |
| `Pseudofunctor.mkOfOplax' F [IsIso ...]` | Variant of `mkOfOplax`, using `IsIso` instances instead of explicit `Iso`. |
| `Pseudofunctor.mkOfLax F h` | Constructor: given a lax functor `F` whose `mapId` and `mapComp` are isomorphisms, produce a pseudofunctor. |
| `Pseudofunctor.mkOfLax' F [IsIso ...]` | Variant of `mkOfLax'`, using `IsIso` and taking inverses of `asIso`. |
| `mapComp_id_left`, `mapComp_id_right`, etc. | Lemmas expressing how `mapComp` interacts with identity 1-morphisms, often in terms of unitors and `mapId`. |
| `whiskerLeft_mapId_hom`, `whiskerRight_mapId_hom`, etc. | Lemmas describing interaction of `mapId` with whiskering, expressed via `mapComp`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `mapId`, `mapComp`, `map₂_...`: denote components of the pseudofunctor.
  - `mkOfOplax`, `mkOfLax`, `mkOfOplax'`, `mkOfLax'`: constructors from oplax/lax functors.
  - `toOplax`, `toLax`: coercions to underlying oplax/lax functors.
- **Suffixes**:
  - `_hom`, `_inv`: refer to hom/inv parts of isomorphisms.
  - `_assoc`, `_left`, `_right`: indicate associator/unit-related identities.
  - `_whisker_left`, `_whisker_right`: denote naturality of `map₂` with respect to whiskering.
- **Iso vs IsIso**:
  - `Iso`-based constructors (`mkOfOplax`, `mkOfLax`) use explicit `Iso` data.
  - `IsIso`-based constructors (`mkOfOplax'`, `mkOfLax'`) infer isos via typeclass.

---

### **3. Tactic Stack**

- **`aesop_cat`**: Used in field definitions (`map₂_whisker_left`, etc.) to discharge bicategorical coherence proofs.
- **`simp` / `dsimp`**: Heavily used in proofs of lemmas (e.g., `mapComp_id_left_hom`, `whiskerRight_mapId_hom`) and in `simps`-generated projections.
- **`rw [...]`**: Rewriting with isomorphism properties (`hom_inv_id`, `comp_id`, `inv_comp_eq`, etc.).
- **`simp only [...]`**: For precise simplification in complex associator/unit manipulations.
- **`congrArg`**: To lift equalities between morphisms to equalities between isomorphisms (e.g., `congrArg (·.inv)`).
- **`Iso.ext`**: To prove equality of isomorphisms by extensionality.

---

### **4. Proof Logic**

- **Structure definitions** are verified using `aesop_cat`, which handles standard bicategorical coherence automatically.
- **Constructor proofs** (`mkOfOplax`, `mkOfLax`, etc.):
  - Reduce to properties of underlying oplax/lax functors.
  - Use naturality of `mapComp` and `mapId`, and properties of `hom`/`inv`.
- **Lemmas**:
  - Often proved by simplifying with `simps`-generated lemmas and rewriting using `hom_inv_id`, `comp_id`, and associativity.
  - Many rely on duality: proofs for `hom` and `inv` versions are symmetric.
  - Use `whiskerLeftIso`, `whiskerRightIso` to relate whiskering with `mapId` and `mapComp`.
- **Composition & identity**:
  - Defined via underlying prelax functors.
  - Coherence conditions verified by `simp` after unfolding definitions.

---

### **5. Imports**

- `Mathlib.CategoryTheory.Bicategory.Functor.Oplax`
- `Mathlib.CategoryTheory.Bicategory.Functor.Lax`

These imports provide:
- Definitions of **oplax** and **lax functors** between bicategories.
- Core infrastructure for functors, natural transformations, and bicategorical coherence data (e.g., `α_`, `λ_`, `ρ_`, `whiskerLeft`, `whiskerRight`, `Iso`, `IsIso`).

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for extending this module (e.g., pseudonatural transformations, modifications, or Gray tensor product).