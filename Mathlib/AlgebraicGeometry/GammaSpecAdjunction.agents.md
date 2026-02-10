Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `toΓSpecFun` | `X → PrimeSpectrum (Γ.obj (op X))` — canonical set map from a locally ringed space `X` to the prime spectrum of its global sections. |
| `toΓSpec_continuous` | `Continuous X.toΓSpecFun` — proves continuity of the underlying map. |
| `toΓSpecBase` | `X.toTopCat ⟶ Spec.topObj (Γ.obj (op X))` — bundled continuous map (the base of the unit). |
| `toΓSpecCApp` | Sheaf morphism on basic opens: `(structureSheaf (Γ.obj (op X))).val.obj (op (basicOpen r)) ⟶ X.presheaf.obj (op (X.toΓSpecMapBasicOpen r))`. |
| `toΓSpecCBasicOpens` | Natural transformation between presheaves on basic opens, commuting with restrictions. |
| `toΓSpecSheafedSpace` | Morphism of sheafed spaces `X.toSheafedSpace ⟶ Spec.toSheafedSpace.obj (op (Γ.obj (op X)))`. |
| `toΓSpec` | Morphism of **locally** ringed spaces `X ⟶ Spec.locallyRingedSpaceObj (Γ.obj (op X))` — the unit of the adjunction at `X`. |
| `identityToΓSpec` | Natural transformation `𝟭 LocallyRingedSpace ⟶ Γ.rightOp ⋙ Spec.toLocallyRingedSpace` — the unit of the adjunction. |
| `locallyRingedSpaceAdjunction` | Adjunction `Γ.rightOp ⊣ Spec.toLocallyRingedSpace` between `CommRingCatᵒᵖ` and `LocallyRingedSpace`. |
| `adjunction` | Adjunction `Scheme.Γ.rightOp ⊣ Scheme.Spec` between `CommRingCatᵒᵖ` and `Scheme`. |
| `Γ_Spec_left_triangle` | Left triangle identity: `toSpecΓ (Γ.obj (op X)) ≫ X.toΓSpec.c.app (op ⊤) = 𝟙 _`. |
| `right_triangle` | Right triangle identity for the adjunction on `CommRingCatᵒᵖ`. |
| `toStalk_stalkMap_toΓSpec` | Commutativity of stalk maps induced by the unit with germs: `toStalk _ _ ≫ X.toΓSpec.stalkMap x = X.presheaf.Γgerm x`. |
| `toΓSpec_preimage_zeroLocus_eq` | Preimage of zero locus under `toΓSpec` agrees with zero locus on `X`. |
| `comp_ring_hom_ext` | Extensionality principle for morphisms into `Spec`: if base and sheaf parts agree on basic opens, then morphisms are equal. |
| `Spec.fullyFaithfulToLocallyRingedSpace`, `Spec.fullyFaithful` | Proves `Spec` is fully faithful via adjunction. |
| `Spec.reflective`, `Reflective Spec.toLocallyRingedSpace` | `Spec` is a reflective embedding (right adjoint). |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `toΓSpec*`: canonical maps/unit components (e.g., `toΓSpecFun`, `toΓSpecBase`, `toΓSpecSheafedSpace`, `toΓSpec`).
  - `ΓSpec*`: adjunction-related definitions (`ΓSpec.adjunction`, `ΓSpec.locallyRingedSpaceAdjunction`, `ΓSpecIso`, `SpecΓIdentity`).
  - `identityToΓSpec`: unit as a natural transformation.
  - `toOpen`, `toToΓSpecMapBasicOpen`, `toΓSpecCApp`: sheaf-level maps.
  - `appTop`, `app`: section-level components of sheaf morphisms.
  - `homEquiv`: hom-set bijection from adjunction.
  - `Spec.map`, `Spec.preimage`: induced maps on `Spec`.
  - `SpecΓIdentity`, `SpecΓIso`: isomorphisms used in counit/unit inverses.

- **Suffixes**:
  - `_base`, `_c`, `__`: components of morphisms of sheafed/locally ringed spaces.
  - `_app`, `_appTop`: application on global sections or basic opens.
  - `_eq`, `_spec`, `_iff`: characterizing properties or equalities.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `erw`, `simp`, `simp only`, `simp_rw`
- `ext`, `ext1`, `congr`, `congr 1`, `congr 3`
- `apply`, `convert`, `refine`, `exact`
- `have`, `set`, `obtain`, `intro`, `rintro`
- `unfold`, `dsimp`, `change`, `convert`, `symm`
- `apply congr_arg`, `apply hom_ext`, `apply hom_ext_iff`, `apply Opens.ext`
- `apply IsLocalization.*`, `apply IsUnit_*`, `apply not_mem_prime_iff_unit_in_stalk`
- `apply Spec.basicOpen_hom_ext`, `apply Spec.map_injective`, `apply fullyFaithfulROfIsIsoCounit`
- `infer_instance`, `apply_instance`, `aesop` (not explicitly used, but `infer_instance` is common)

---

### **4. Proof Logic**

- **Structure of proofs**:
  - **Stepwise construction**: Build maps in stages: set-level → continuous → sheafed → locally ringed.
  - **Extensionality principles**: Use `hom_ext`, `Opens.ext`, `Spec.basicOpen_hom_ext`, `ringHom_ext` to reduce to basic opens or stalks.
  - **Localization arguments**: Heavy use of properties of localization (e.g., `IsLocalization.map_units`, `mem_maximalIdeal`, `isUnit_of_mul_isUnit_left`).
  - **Triangle identities**: Verified by unfolding definitions and simplifying using naturality, stalk properties, and sheaf restriction maps.
  - **Stalk-level analysis**: Many proofs reduce to stalks (e.g., `toStalk_stalkMap_toΓSpec`, `isUnit` checks via stalks).
  - **Naturality**: Proven via `comp_ring_hom_ext`, `naturality`, and `homEquiv` characterizations.

- **Induction / recursion**: Not used directly; proofs rely on algebraic geometry constructions (localization, stalks, sheafification).

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Restrict` | For restriction of schemes/locally ringed spaces. |
| `Mathlib.CategoryTheory.Adjunction.Limits` | For `PreservesLimits`, `Reflective`, etc. |
| `Mathlib.CategoryTheory.Adjunction.Reflective` | For reflective subcategory structure. |
| *(Implicitly)* `structure_sheaf.lean` | Used extensively for `structureSheaf`, `toOpen`, `germ`, `basicOpen`, etc. |
| *(Implicitly)* `Spec.lean` | For `Spec.locallyRingedSpaceObj`, `Spec.map`, `SpecΓIdentity`, etc. |

---

### **Domain-Specific AI Agent Notes**

- **Focus area**: Formalized algebraic geometry, especially scheme theory and adjunctions between global sections (`Γ`) and `Spec`.
- **Key abstractions**: Locally ringed spaces, sheaves of rings, stalks, germs, localization, basic opens.
- **Common proof patterns**:
  - Reduce to basic opens via basis extensionality.
  - Use stalk-level criteria for local properties (e.g., units, maximality).
  - Leverage adjunction universal properties for uniqueness/naturality.
- **Critical lemmas for automation**:
  - `toΓSpec_preimage_basicOpen_eq`
  - `toΓSpecCApp_spec`, `toΓSpecSheafedSpace_app_spec`
  - `toStalk_stalkMap_toΓSpec`
  - `comp_ring_hom_ext`
  - `Spec.map_injective`, `Spec.preimage_map`

Let me know if you'd like a dependency graph, tactic usage statistics, or a formalization roadmap for this file.