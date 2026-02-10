### Technical Metadata Brief: Adhesive Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPushout.IsVanKampen` | `IsPushout f g h i → Prop` | Defines when a pushout square is a *van Kampen colimit*: pullback stability of the colimit under base change. |
| `Adhesive` | `Class` | A category is *adhesive* if it has pullbacks and pushouts along monomorphisms, and such pushouts are van Kampen. |
| `Type.adhesive` | `instance : Adhesive (Type u)` | Shows `Type` is adhesive (key example). |
| `Adhesive.isPullback_of_isPushout_of_mono_left` | `IsPushout f g h i → [Mono f] → IsPullback f g h i` | In adhesive categories, pushouts along monos are pullbacks. |
| `Adhesive.mono_of_isPushout_of_mono_left` | `IsPushout f g h i → [Mono f] → Mono i` | Monos are stable under pushouts in adhesive categories. |
| `Adhesive.toRegularMonoCategory` | `instance : RegularMonoCategory C` | Monos in adhesive categories are regular monos (hence adhesive ⇒ balanced). |
| `adhesive_functor` | `instance : Adhesive (D ⥤ C)` | Functor category is adhesive if codomain is adhesive and has all limits/colimits. |
| `adhesive_of_preserves_and_reflects` | `theorem` | Adhesiveness transfers along functors preserving & reflecting pushout/pullback limits/colimits. |
| `adhesive_of_reflective` | `theorem` | Adhesiveness descends along reflective subcategories (with conditions). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate definitions (`isVanKampen`, `isPullback`, `isPushout`, `is_coprod_iff_isPushout`)
  - `van_kampen`: Relating to van Kampen colimits (`van_kampen`, `IsVanKampen`)
  - `mono_of_`, `isPullback_of_`: Derived properties from adhesiveness
- **Suffixes**:
  - `_left`, `_right`: Indicate which leg of the pushout square is assumed mono (`mono_of_mono_left`, `isPullback_of_mono_right`)
  - `_flip`: Symmetry variants (`flip`, `van_kampen'`)
- **Helper patterns**:
  - `of_`: Constructing proofs from universal properties (`of_hasPullback`, `of_horiz_isIso`, `of_vert_isIso`)
  - `has_`: Existence assumptions (`hasPullbacks`, `hasPushouts`, `hasPullback_of_mono_left`)

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `introv`, `intro`, `rintro` | Introduce variables/hypotheses |
| `simp`, `simp_rw`, `dsimp` | Simplify using definitional equalities and lemmas |
| `rw`, `erw` | Rewrite using equalities (especially with `erw` for elaboration) |
| `exact`, `refine`, `fapply` | Construct proofs term-by-term |
| `convert`, `congr` | Handle definitional equality gaps |
| `apply`, `exacts` | Apply lemmas and discharge goals |
| `constructor`, `cases`, `split` | Break down conjunctions, products, or inductive types |
| `ext`, `funext` | Extensionality for morphisms/natural transformations |
| `symm`, `eq_comm` | Flip equalities |
| `have`, `obtain`, `let` | Introduce intermediate facts/definitions |
| `rfl`, ` rfl` | Reflexivity proofs |
| `aesop` (not present here) — *absent* in this file; proofs are mostly manual or `simp`-driven |

> **Note**: Heavy use of `simp`-based automation (`simp only [...]`, `simp_rw`) and explicit construction via `refine`/`exact`.

---

#### **4. Proof Logic & Strategy**

- **Inductive/Universal Property Reasoning**:
  - Proofs often reduce to universal properties of limits/colimits (e.g., `IsColimit.hom_ext`, `IsPullback.of_hasPullback`).
  - Use of *cocone/uniqueness* arguments (e.g., `coconePointUniqueUpToIso`).
- **Base Change & Pullback Stability**:
  - Van Kampen condition is verified by unfolding the definition: given a diagram over a pushout, show it’s a pushout iff it’s a pullback.
- **Mono-Specific Tools**:
  - Leverage `IsKernelPair.id_of_mono`, `IsKernelPair.mono_of_isIso_fst`, and kernel pair characterizations.
- **Functoriality**:
  - For functor categories: use `evaluation` functor and its properties (`precompose_isIso_iff`, `map_reflective`).
- **Transfer Principles**:
  - Adhesiveness is transferred via:
    - Preservation/reflection of limits/colimits (`adhesive_of_preserves_and_reflects`)
    - Reflective adjunctions (`adhesive_of_reflective`), using properties of left/right adjoints.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Extensive` | Finitary extensivity used in `IsPushout.isVanKampen_inl` proof |
| `Mathlib.CategoryTheory.Limits.Shapes.KernelPair` | Kernel pairs for mono analysis (`IsKernelPair.*`) |
| `Mathlib.CategoryTheory.Limits.Constructions.EpiMono` | Basic epi/mono constructions (e.g., `Mono`, `_epi`) |

**Scope**:  
This file formalizes the theory of *adhesive categories* — a class of categories where pushouts along monomorphisms behave well (van Kampen), enabling gluing and decomposition arguments (e.g., in graph transformation, topos theory). It connects to:
- **Extensive categories** (via `FinitaryExtensive`)
- **Regular/mono categories** (via `RegularMonoCategory`)
- **Functor categories** and adjoint functor criteria

---

Let me know if you'd like a diagrammatic summary, a proof sketch of `Type.adhesive`, or automation suggestions for future formalization.