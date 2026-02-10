### Technical Metadata Brief: Equalizers from Pullbacks and Binary Products (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `constructEqualizer` | `F : WalkingParallelPair ⥤ C ↦ C` | Constructs the equalizer object as a pullback of two product lifts. |
| `pullbackFst` | `constructEqualizer F ⟶ F.obj 0` | The first projection from the pullback, used as the equalizing morphism. |
| `pullbackFst_eq_pullback_snd` | `pullbackFst F = pullback.snd _ _` | Proves symmetry: the two projections from the pullback are equal in this context. |
| `equalizerCone` | `F : WalkingParallelPair ⥤ C ↦ Cone F` | Builds the equalizing cone using `pullbackFst` and the equality above. |
| `equalizerConeIsLimit` | `IsLimit (equalizerCone F)` | Shows the constructed cone is a limit cone — i.e., a genuine equalizer. |
| `hasEqualizers_of_hasPullbacks_and_binary_products` | `[HasBinaryProducts C] → [HasPullbacks C] → HasEqualizers C` | Main theorem: existence of equalizers follows from existence of pullbacks and binary products. |
| `preservesEqualizers_of_preservesPullbacks_and_binaryProducts` | `[PreservesLimitsOfShape (Discrete WalkingPair) G] → [PreservesLimitsOfShape WalkingCospan G] → PreservesLimitsOfShape WalkingParallelPair G` | Shows that a functor preserving pullbacks and binary products also preserves equalizers. |
| `constructCoequalizer` | `F : WalkingParallelPair ⥤ C ↦ C` | Dually constructs coequalizers via pushouts of coproduct descents. |
| `pushoutInl` / `pushoutInl_eq_pushout_inr` | `F.obj 1 ⟶ constructCoequalizer F` | Dual to `pullbackFst`; proves left/right pushout injections coincide. |
| `coequalizerCocone` / `coequalizerCoconeIsColimit` | `Cocone F`, `IsColimit _` | Dual cone and colimit proof for coequalizers. |
| `hasCoequalizers_of_hasPushouts_and_binary_coproducts` | `[HasBinaryCoproducts C] → [HasPushouts C] → HasCoequalizers C` | Dual main theorem: coequalizers exist if pushouts and binary coproducts exist. |
| `preservesCoequalizers_of_preservesPushouts_and_binaryCoproducts` | `[PreservesColimitsOfShape (Discrete WalkingPair) G] → [PreservesColimitsOfShape WalkingSpan G] → PreservesColimitsOfShape WalkingParallelPair G` | Dual preservation result for coequalizers. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `construct*`: defines the underlying object (e.g., `constructEqualizer`, `constructCoequalizer`)
  - `*Fst`, `*Snd`, `*Inl`, `*Inr`: projections/injections from universal constructions (`pullbackFst`, `pushoutInl`)
  - `*eq*`: proofs of equality between canonical morphisms (`pullbackFst_eq_pullback_snd`, `pushoutInl_eq_pushout_inr`)
  - `*Cone`, `*Cocone`: cone/cocone constructors (`equalizerCone`, `coequalizerCocone`)
  - `*IsLimit`, `*IsColimit`: proofs of (co)limit universal property

- **Suffixes**:
  - `OfHas*`: indicates construction from assumed limits/colimits (`hasEqualizers_of_hasPullbacks_and_binary_products`)
  - `Preserves*`: preservation lemmas for functors (`preservesEqualizers_of_preservesPullbacks_and_binaryProducts`)

- **Namespace usage**:
  - Implementation details hidden in nested namespaces:  
    `HasEqualizersOfHasPullbacksAndBinaryProducts`,  
    `HasCoequalizersOfHasPushoutsAndBinaryCoproducts`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` | Simplification using definitional equalities and lemmas (e.g., `prod.lift_fst`, `pullback.condition`) |
| `conv_rhs` / `conv` | Rewriting only the right-hand side or specific subterms |
| `convert` / `exact` | Matching up goals with known equalities or lemmas |
| `ext` | Extensionality for morphisms (e.g., in pullback/hom-ext arguments) |
| `rw` / `erw` | Rewriting using equations; `erw` allows metavariables |
| `rcases` / `intro` | Case analysis on sum types or existential hypotheses |
| `apply`, `refine` | Applying lemmas or constructing terms with holes |
| `dsimp`, `simp only [...]` | Targeted simplification with explicit lemmas |
| `rw [Iso.eq_comp_inv]`, `rw [Iso.eq_inv_comp]` | Manipulating isomorphisms in limit/colimit arguments |

---

#### **4. Proof Logic**

- **Equalizer construction**:
  1. Define object as pullback of `prod.lift (id, F(left))` and `prod.lift (id, F(right))`.
  2. Show the two pullback legs are equal via `pullback.condition` and `prod.lift_*`.
  3. Build cone using `Cone.ofFork`, leveraging equality to satisfy fork condition.
  4. Prove limit property:
     - `lift`: use `pullback.lift` on cone legs.
     - `fac`: case analysis on parallel pair morphisms; `simp` suffices.
     - `uniq`: use `pullback.hom_ext`, reduce to cone morphism naturality.

- **Preservation**:
  - Use `preservesLimit_of_preserves_limit_cone`.
  - Construct comparison map via `pullback.lift` followed by inverse of preserved pullback iso.
  - Verify factorization/uniqueness using naturality and `simp`-friendly lemmas.

- **Coequalizer duality**:
  - Mirror arguments with pushouts and coproducts.
  - Use `pushout.desc`, `pushout.hom_ext`, and dual lemmas.

- **Inductive/structural pattern**:
  - Most proofs follow a *universal property* pattern: define candidate, verify universal property via uniqueness/existence via universal constructions.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.CategoryTheory.Limits.Shapes.Equalizers`
- `Mathlib.CategoryTheory.Limits.Shapes.BinaryProducts`
- `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Pullbacks`
- `Mathlib.CategoryTheory.Limits.Preserves.Shapes.BinaryProducts`

**Scope**:
- Works in a general category `C` with:
  - Binary products (`HasBinaryProducts C`)
  - Pullbacks (`HasPullbacks C`)
  - Or dually: binary coproducts + pushouts for coequalizers.
- Universe polymorphism handled via explicit universe variables (`u`, `v`, `u'`, `v'`).
- Not intended as automatic instances (explicit theorems instead), to allow flexibility in construction.

---

This module formalizes a foundational result in categorical logic: **equalizers can be constructed from pullbacks and binary products**, and their preservation follows from preservation of those limits. It also provides the dual coequalizer result. The structure reflects Lean’s emphasis on explicit, reusable constructions over implicit instances.