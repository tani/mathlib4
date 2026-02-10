Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `mono_iff_fst_eq_snd` | `Mono f ↔ c.fst = c.snd` (under `IsLimit c`) | Characterizes monomorphisms via equality of the two legs of the pullback cone over `f`. |
| `mono_iff_isIso_fst` | `Mono f ↔ IsIso c.fst` (under `IsLimit c`) | Monos are exactly those `f` for which the first leg of the pullback cone is an iso. |
| `mono_iff_isIso_snd` | `Mono f ↔ IsIso c.snd` (under `IsLimit c`) | Same as above, but for the second leg (via `flipIsLimit`). |
| `mono_iff_isPullback` | `Mono f ↔ IsPullback (𝟙 X) (𝟙 X) f f` | Fundamental characterization: `f` is mono iff the square with identity maps is a pullback. |
| `epi_iff_inl_eq_inr` | `Epi f ↔ c.inl = c.inr` (under `IsColimit c`) | Dual to `mono_iff_fst_eq_snd`: epis iff the two legs of the pushout cocone over `f` are equal. |
| `epi_iff_isIso_inl` | `Epi f ↔ IsIso c.inl` (under `IsColimit c`) | Epis iff the left leg of the pushout cocone is an iso. |
| `epi_iff_isIso_inr` | `Epi f ↔ IsIso c.inr` (under `IsColimit c`) | Same for the right leg (via `flipIsColimit`). |
| `epi_iff_isPushout` | `Epi f ↔ IsPushout f f (𝟙 Y) (𝟙 Y)` | Dual of `mono_iff_isPullback`: `f` is epi iff the square with identity maps is a pushout. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `mono_`, `epi_`: indicate the property being characterized (monomorphism / epimorphism).
  - `isIso_`, `isPullback_`, `isPushout_`: indicate categorical properties (isomorphism, pullback/pushout).
- **Suffixes**:
  - `_eq_`: equality of legs (e.g., `fst_eq_snd`, `inl_eq_inr`).
  - `_isIso_`: isomorphism condition on a leg (e.g., `isIso_fst`, `isIso_inl`).
  - `_isPullback`, `_isPushout`: full square characterization.
- **Helper lemmas** use `hc : IsLimit c` or `hc : IsColimit c` to assume the cone/cocone is universal.

---

### **3. Tactic Stack**

- **Core tactics**:
  - `constructor`: for bi-implication proofs.
  - `intro`, `intro h`, `intro hf`, etc.
  - `rw`, `simp only`, `dsimp`, `simp`.
- **Category-theoretic automation**:
  - `cancel_mono`, `cancel_epi`: used to cancel monos/epis in equations.
  - `PullbackCone.IsLimit.lift'`, `PushoutCocone.IsColimit.desc'`: for universal properties.
  - `PullbackCone.IsLimit.hom_ext`, `PushoutCocone.IsColimit.hom_ext`: extensionality for limits/colimits.
  - `IsSplitEpi.mk`, `IsSplitMono.mk`: to construct split epis/monos.
- **Algebraic simplification**:
  - `assoc`, `id_comp`, `comp_id`, `reassoc_of%`, `hφ₁`, `hφ₂`: for rewriting compositions and identities.

---

### **4. Proof Logic**

- **Structure**:
  - Proofs are mostly symmetric between mono and epi cases.
  - Each equivalence is proven via `constructor`, splitting into `→` and `←`.
- **Common pattern**:
  1. Use universal property (`lift'` / `desc'`) to get a mediating morphism.
  2. Use `hom_ext` to reduce to component-wise equalities.
  3. Simplify using identities and assumptions (e.g., `hf`, `h`).
- **Key ideas**:
  - For `→`: assume mono/epi, then use cancellation to deduce leg equality or isomorphism.
  - For `←`: assume leg equality or isomorphism, then use universal property to show cancellation.
  - Use `flipIsLimit` / `flipIsColimit` to swap legs and reuse lemmas.

---

### **5. Imports**

- `Mathlib.CategoryTheory.Limits.Shapes.Pullback.CommSq`: provides:
  - `PullbackCone`, `IsPullback`, `IsLimit`, `IsColimit`, `CommSq`.
  - Helper lemmas like `isLimitMkIdId`, `of_isLimit`, etc.

This file is part of the `CategoryTheory.Limits` hierarchy and builds foundational results linking universal properties (pullbacks/pushouts) with structural properties of morphisms (mono/epi).

--- 

Let me know if you'd like a diagrammatic rendering of the squares or a formalization of related results (e.g., regular monos/epis).