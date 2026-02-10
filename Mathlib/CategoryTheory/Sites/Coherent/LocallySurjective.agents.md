Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `regularTopology.isLocallySurjective_iff` | `Presheaf.IsLocallySurjective (regularTopology C) f ↔ ∀ X y, ∃ φ x, f x = G φ y` | Characterizes local surjectivity for the **regular topology** via effective epimorphisms. |
| `extensiveTopology.surjective_of_isLocallySurjective_sheaf_of_types` | `IsLocallySurjective (extensiveTopology C) f ⇒ f.app X_surj` | Shows that local surjectivity for the **extensive topology** implies objectwise surjectivity (for sheaves of types). |
| `extensiveTopology.presheafIsLocallySurjective_iff` | `IsLocallySurjective (extensiveTopology C) f ↔ ∀ X, f.app X_surj` | Full equivalence for presheaves (under finite product preservation and concrete category assumptions). |
| `extensiveTopology.isLocallySurjective_iff` | `IsLocallySurjective f ↔ ∀ X, f.val.app X_surj` | Specialization to **sheaves** for the extensive topology. |
| `regularTopology.isLocallySurjective_sheaf_of_types` | `IsLocallySurjective (coherentTopology C) f ⇒ IsLocallySurjective (regularTopology C) f` | Shows that local surjectivity for the **coherent topology** implies it for the **regular topology** (for sheaves of types). |
| `coherentTopology.presheafIsLocallySurjective_iff` | `IsLocallySurjective (coherentTopology C) f ↔ IsLocallySurjective (regularTopology C) f` | Equivalence of local surjectivity for **coherent** and **regular** topologies (for presheaves under preregular + finitary extensive assumptions). |
| `coherentTopology.isLocallySurjective_iff` | `IsLocallySurjective f ↔ IsLocallySurjective (regularTopology C) f.val` | Equivalence for **sheaves** over the coherent topology. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isLocallySurjective`: Used for properties of morphisms of (pre)sheaves.
  - `presheafIsLocallySurjective`: For presheaf-level characterizations.
  - `surjective_of_isLocallySurjective`: Implication direction (local ⇒ objectwise surjective).
- **Suffixes**:
  - `_iff`: Biconditional theorems.
  - `_of_le`: Used when one coverage is coarser than another.
  - `_sheaf_of_types`: For results specific to sheaves valued in `Type w`.
- **Topology-specific qualifiers**:
  - `regularTopology`, `coherentTopology`, `extensiveTopology`: Used as namespace prefixes.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `constructor`: For biconditional proofs.
- `rw`, `erw`: Rewriting using lemmas or definitional equalities.
- `obtain` / `cases'`: Extracting witnesses from existential hypotheses.
- `refine`: Partial proof construction.
- `simp only`, `simp`: Simplification with specific lemmas.
- `change`: Adjusting goal to match a known form.
- `convert`: Up to definitional equality, with manual proof of remaining goals.
- `apply`, `exact`: Standard proof steps.
- `have`, `set`: Introducing intermediate facts or definitions.
- `congrFun`, `congrArg`: For extensionality arguments.
- `Functor.mapIso`, `Iso.symm_hom`, `Iso.trans_hom`: Manipulating isomorphisms in functor categories.

---

### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-directional** (`↔`) pattern: `constructor` → `intro h` / `intro h'`.
  - For ⇒ direction: Use hypothesis to get a sieve containing a morphism, then extract data (e.g., effective epimorphism + witness).
  - For ⇐ direction: Construct a sieve (often using `top_mem'`, `mem_sieves_iff_hasEffectiveEpi`, etc.) and verify it satisfies the required condition.
- **Key reasoning patterns**:
  - **Induction / finite choice**: When handling finite families (e.g., `α : Finset` or `Fintype α`), use `Fintype.ofFinite` and product/sum universal properties.
  - **Limit preservation**: Use `PreservesProduct.iso`, `isLimitOfPreserves`, and `Types.productLimitCone.isLimit` to transport limits through functors.
  - **Concrete category lifting**: Use `Concrete.isLimit_ext` to reduce to `Type`-level arguments.
  - **Coverage comparisons**: Use `Coverage.gi`, `extensive_regular_generate_coherent`, and monotonicity of coverage inclusion.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Sites.Coherent.ExtensiveTopology` | Defines extensive topology and its relation to coherent/regular topologies. |
| `Mathlib.CategoryTheory.Sites.Coherent.SheafComparison` | Tools for comparing sheaves across topologies (e.g., `whiskerRight`, `Presheaf.imageSieve`). |
| `Mathlib.CategoryTheory.Sites.LocallySurjective` | Core definitions and basic lemmas about `IsLocallySurjective`. |

---

### **Domain-Specific AI Agent Notes**

- **Target domain**: Category theory, especially topos theory and sheaf theory on sites defined by coverage conditions (regular, coherent, extensive).
- **Key assumptions**:
  - `Preregular C`: Ensures regular topology is well-behaved.
  - `FinitaryPreExtensive` / `FinitaryExtensive C`: Ensures finite coproducts behave like disjoint unions.
  - `PreservesFiniteProducts`: Needed to preserve product structure (e.g., for sheaf comparison).
  - `ConcreteCategory D`: Allows lifting to type-level arguments.
- **Common proof patterns**:
  - Translate between sieve membership and existence of covering morphisms/families.
  - Use isomorphisms between product and coproduct constructions in extensive categories.
  - Leverage concrete structure to reduce to surjectivity in `Type`.

Let me know if you'd like a visualization of the dependency graph or a tactic-level proof sketch for any of the main lemmas.