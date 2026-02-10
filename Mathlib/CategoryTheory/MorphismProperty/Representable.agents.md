Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Relatively Representable Morphisms in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Functor.relativelyRepresentable` | `MorphismProperty D` | Defines when a morphism `f : X ⟶ Y` in `D` is *relatively representable* w.r.t. `F : C ⥤ D`: for all `g : F.obj a ⟶ Y`, there exists a pullback square as in the diagram. |
| `hf.pullback g` | `C` | Choice of object `b` in `C` such that `F.obj b` participates in the pullback of `f` and `g`. |
| `hf.snd g` | `hf.pullback g ⟶ a` | The "second projection" in `C` (before applying `F`). |
| `hf.fst g` | `F.obj (hf.pullback g) ⟶ X` | The "first projection" in `D` (image under `F` of the pullback cone). |
| `hf.fst' g` | `hf.pullback g ⟶ b` | Preimage of `hf.fst g` under `F`, assuming `F` is full. |
| `hf.isPullback g` | `IsPullback ...` | Witness that the square is a pullback. |
| `hf.hom_ext` | `(F.map a ≫ hf.fst g = F.map b ≫ hf.fst g) → (a ≫ hf.snd g = b ≫ hf.snd g) → a = b` | Extensionality lemma for morphisms into `hf.pullback g`, assuming `F` faithful. |
| `hf.hom_ext'` | `(a ≫ hf.fst' g = b ≫ hf.fst' g) → (a ≫ hf.snd g = b ≫ hf.snd g) → a = b` | Stronger extensionality assuming `F` fully faithful. |
| `hf.lift` | `c ⟶ hf.pullback g` | Universal lift from `F.obj c` into the pullback, assuming `F` full. |
| `hf.lift'` | `c ⟶ hf.pullback g` | Lift when domain lies in image of `F`, assuming `F` fully faithful. |
| `hf.symmetry` | `hf'.pullback g ⟶ hg.pullback f'` | Symmetry isomorphism for pullbacks of representable morphisms, assuming `F` fully faithful. |
| `hf.symmetryIso` | `hf'.pullback g ≅ hg.pullback f'` | Isomorphism version of symmetry. |
| `Functor.relativelyRepresentable.map` | `(f : a ⟶ b) ↦ F.relativelyRepresentable (F.map f)` | If `C` has pullbacks and `F` preserves them, then `F.map f` is relatively representable. |
| `Functor.relativelyRepresentable.of_isIso` | `[IsIso f] → F.relativelyRepresentable f` | Isomorphisms are relatively representable. |
| `Functor.relativelyRepresentable.isMultiplicative` | `IsMultiplicative F.relativelyRepresentable` | Class of relatively representable morphisms is multiplicative (closed under identities and composition). |
| `Functor.relativelyRepresentable.isStableUnderBaseChange` | `IsStableUnderBaseChange F.relativelyRepresentable` | Relatively representable morphisms are stable under base change. |
| `MorphismProperty.relative` | `MorphismProperty D` | A morphism `f` satisfies `P.relative F` if it is relatively representable and *all* represented pullbacks satisfy `P`. |
| `MorphismProperty.presheaf` | `MorphismProperty (Cᵒᵖ ⥤ Type v)` | Special case: `P.relative yoneda`, i.e., relative to the Yoneda embedding. |
| `MorphismProperty.relative_of_snd` | `(hf : F.relativelyRepresentable f) → (∀ g, P (hf.snd g)) → P.relative F f` | If all `snd` projections satisfy `P`, then `f` satisfies `P.relative`. |
| `MorphismProperty.relative_map` | `(f : a ⟶ b) → P f → P.relative F (F.map f)` | If `f` satisfies `P`, then `F.map f` satisfies `P.relative`, assuming `F` fully faithful, preserves pullbacks, and `P` stable under base change. |
| `MorphismProperty.relative_map_iff` | `P.relative F (F.map f) ↔ P f` | Equivalence under full faithfulness and pullback preservation. |
| `MorphismProperty.presheaf_monomorphisms_le_monomorphisms` | `(monomorphisms C).presheaf ≤ monomorphisms _` | Morphisms satisfying `(mono C).presheaf` are monomorphisms in presheaf category. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hf.` / `hg.` / `hf'`: Used for projections/constructs from hypotheses like `hf : F.relativelyRepresentable f`.
  - `isPullback`, `isPullback'`: Distinguishes between standard and variant (e.g., when domain lies in image of `F`).
  - `lift`, `lift'`: Standard vs. domain-in-image variant.
  - `fst`, `fst'`, `snd`: First/second projections; `'` indicates preimage under `F`.
  - `symmetry`, `symmetryIso`: Morphism vs. isomorphism version.

- **Suffixes**:
  - `'`: Variant assuming `F` is full (or fully faithful).
  - `'_`: Variant assuming `F` is fully faithful (e.g., `lift'`, `hom_ext'`).
  - `'_snd`, `'_fst`: For properties of `snd`/`fst` projections.

- **General**:
  - `rep`: Short for "representable" (e.g., `hf.rep`).
  - `property`: Refers to the `P`-condition on pullbacks (e.g., `hf.property`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification, especially with `reassoc` lemmas.
- `rw`: Rewriting using `w`, `lift_fst`, `lift_snd`, etc.
- `exact`, `refine`, `obtain`: Constructing witnesses and goals.
- `apply`: Applying lemmas like `IsPullback.of_vert_isIso`, `hom_ext`, etc.
- `F.map_injective`, `F.map_surjective`: Exploiting fullness/faithfulness.
- `hom_ext`, `hom_ext'`: Extensionality lemmas for morphisms into pullbacks.
- `by simpa using ...`: Simplifying and applying a hypothesis.
- `symmetry`, `symm`: For reversing equations or isomorphisms.
- `aesop`: Likely used in routine goals (not explicitly visible, but common in Mathlib).

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Definitions are noncomputable but constructive in practice (via `choose` and `choose_spec`).
- **Universal property reasoning**: Most lemmas rely on the universal property of pullbacks (via `PullbackCone.IsLimit.lift`).
- **Faithfulness/fullness assumptions**: Many results require `F` to be full and/or faithful to lift or reflect structure.
- **Stability properties**: Proofs of multiplicative/stability under base change use:
  - `IsPullback.paste_horiz`, `IsPullback.paste_vert` for composing pullbacks.
  - `comp_mem`, `id_mem` from `IsMultiplicative`, `IsStableUnderBaseChange`.
- **Symmetry**: Proven via `lift'` and verified using `hom_ext'`.
- **Monomorphism case**: Uses `yoneda.congr_map`, `cancel_mono`, and extensionality of Yoneda embeddings.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.MorphismProperty.Limits`: Core definitions of `MorphismProperty`, `IsMultiplicative`, `IsStableUnderBaseChange`, etc.
- Implicit imports (via `CategoryTheory` namespace):
  - `CategoryTheory.Limits.Constructions.Pullbacks`
  - `CategoryTheory.Yoneda`
  - `CategoryTheory.MorphismProperty.Basic`
  - `CategoryTheory.Category.Presheaf`

---

#### **6. Domain-Specific AI Agent Notes**

- **Key abstractions**: `relativelyRepresentable`, `relative`, `presheaf`.
- **Critical assumptions**: Faithfulness/fullness of `F`, existence/preservation of pullbacks.
- **Common proof patterns**:
  - Use `hf.rep` to get representability.
  - Use `hf.property` to access `P`-condition on pullbacks.
  - Use `hf.lift`/`hf.lift'` for universal properties.
  - Use `hom_ext`/`hom_ext'` to prove morphism equality.
- **Typical goals**: Prove `P.relative F f`, `F.relativelyRepresentable f`, or verify stability/multiplicativity.

--- 

Let me know if you'd like a visualization of the pullback diagram or a proof sketch for a specific lemma.