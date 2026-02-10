Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPullback.map` | `h : sq.IsPullback → F : C ⥤ D → [PreservesLimit (cospan sq.f₂₄ sq.f₃₄) F] → (sq.map F).IsPullback` | Shows that pullback squares are preserved under functors that preserve the relevant limit (cospan). |
| `IsPullback.of_map` | `F : C ⥤ D → [ReflectsLimit (cospan sq.f₂₄ sq.f₃₄) F] → (sq.map F).IsPullback → sq.IsPullback` | Shows that pullbacks can be reflected: if the image is a pullback, so was the original, under functors reflecting the limit. |
| `IsPullback.map_iff` | `[PreservesLimit … F] → [ReflectsLimit … F] → (sq.map F).IsPullback ↔ sq.IsPullback` | Equivalence between pullback-ness of `sq` and its image under `F`, when `F` both preserves and reflects the limit. |
| `IsPushout.map`, `IsPushout.of_map`, `IsPushout.map_iff` | Analogous to above for pushouts (using colimits over spans). | Dual statements for pushout squares. |
| `isPullback_iff_map_coyoneda_isPullback` | `sq.IsPullback ↔ ∀ (X : Cᵒᵖ), (sq.map (coyoneda.obj X)).IsPullback` | Characterizes pullback squares via the co-Yoneda embedding: a square is a pullback iff all its co-Yoneda images are. |
| `isPushout_iff_op_map_yoneda_isPullback` | `sq.IsPushout ↔ ∀ (X : C), (sq.op.map (yoneda.obj X)).IsPullback` | Dual: a square is a pushout iff the opposite square becomes a pullback after applying Yoneda. |
| `IsPullback.iff_of_equiv` | Under componentwise equivalences commuting with square edges, `sq₁.IsPullback ↔ sq₂.IsPullback` | Shows pullback-ness is invariant under equivalence of squares (up to commuting isomorphisms). |
| `IsPullback.of_equiv` | `sq₁.IsPullback → sq₂.IsPullback` | Immediate corollary of the above. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isPullback_`, `isPushout_`: predicates on squares.
  - `map`, `of_map`: indicate forward/reflecting behavior under functors.
  - `iff_of_`, `of_`: logical implications (↔ or →).
- **Suffixes**:
  - `_map`: image under a functor.
  - `_iff`: biconditional characterizations.
  - `_equiv`: invariance under equivalence of squares.
- **Functor-specific**:
  - `coyoneda.obj X`, `yoneda.obj X`: embeddings used for internal characterization.
  - `uliftFunctor`: used to compare squares in different universes.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `exact`, `refine`, `apply`: basic proof construction.
- `rw [← …]`: rewriting using equivalences or definitions.
- `ext`: extensionality (for morphisms, equivalences).
- `simpa [types_comp, uliftFunctor_map] using …`: simplification with custom lemmas.
- `apply ULift.down_injective`: injectivity of `ULift.down`.
- `all_goals`: applies same tactic to all goals (used in `iff_of_equiv`).
- `Iso.refl`, `PullbackCone.ext`: category-theoretic reasoning helpers.

---

### **4. Proof Logic**

- **General pattern**:
  - For preservation/reflection lemmas: use `mk` + `isLimitPullbackConeMapOfIsLimit` (or colimit dual).
  - For `map_iff`: combine `map` and `of_map`.
  - For co/Yoneda characterizations:
    - `→`: apply `map` to each co/Yoneda functor.
    - `←`: use universal property via `isLimitCoyonedaEquiv` / `isColimitYonedaEquiv`, then apply `mk`.
  - For equivalence invariance (`iff_of_equiv`):
    - Lift squares to same universe via `uliftFunctor`.
    - Use `isoMk` to build an isomorphism of squares.
    - Prove commutativity of the lifted square using `congrFun` and `simpa`.

- **Inductive/structural reasoning**: mostly based on universal properties of (co)limits and Yoneda embeddings.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.Pullback.Square` | Defines `Square`, `IsPullback`, `IsPushout`, and basic constructions like `pullbackCone`, `pushoutCocone`. |
| `Mathlib.CategoryTheory.Limits.Yoneda` | Provides `yoneda`, `coyoneda`, and their universal properties (e.g., `isLimitCoyonedaEquiv`, `isColimitYonedaEquiv`). |
| `Mathlib.CategoryTheory.Limits.Preserves.Ulift` | Supplies `uliftFunctor`, used to compare objects across universes; ensures equivalence invariance across universe levels. |

---

Let me know if you'd like a diagrammatic summary or a formalization checklist for similar lemmas.