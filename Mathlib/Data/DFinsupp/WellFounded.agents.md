### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DFinsupp.Lex r s` | `Π₀ i, α i → Π₀ i, α i → Prop` | Lexicographic order on dependent functions with finite support, defined via a relation `r : ι → ι → Prop` on indices and `s : ∀ i, α i → α i → Prop` on fibers. |
| `Pi.Lex r s` | `(∀ i, α i) → (∀ i, α i) → Prop` | Lexicographic order on dependent products, assuming `r` is a strict total order and `ι` finite. |
| `DFinsupp.Lex.acc_single` | `Acc (DFinsupp.Lex r s) (single i a)` | Accessibility of a `single` function under `Lex`, assuming accessibility of its value and well-foundedness of `rᶜ ⊓ ≠`. |
| `DFinsupp.Lex.acc` | `Acc (DFinsupp.Lex r s) x` | Accessibility of arbitrary `x : Π₀ i, α i`, assuming accessibility of all `single i (x i)` for `i ∈ x.support`. |
| `DFinsupp.Lex.wellFounded` | `WellFounded (DFinsupp.Lex r s)` | Main result: lexicographic order on `DFinsupp` is well-founded if `rᶜ ⊓ ≠` and each `s i` are well-founded, and `0` is not below any element (`¬s i a 0`). |
| `DFinsupp.Lex.wellFounded'` | `WellFounded (DFinsupp.Lex r s)` | Variant using trichotomy of `r`: if `r` is trichotomous and `r.swap` is well-founded, then `Lex` is well-founded. |
| `Pi.Lex.wellFounded` | `WellFounded (Pi.Lex r s)` | Lexicographic order on `Π i, α i` is well-founded when `ι` is finite, `r` is a strict total order, and each `s i` is well-founded. |
| `DFinsupp.wellFoundedLT` | `WellFoundedLT (Π₀ i, α i)` | Product order `<` on `DFinsupp` is well-founded under preorder + well-founded `<` on each fiber + `¬a < 0`. |
| `Pi.wellFoundedLT` | `WellFoundedLT (∀ i, α i)` | Product order `<` on `Π i, α i` is well-founded when `ι` is finite and each `<` on `α i` is well-founded. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `Lex.`: For lexicographic-order-specific lemmas (e.g., `Lex.acc`, `Lex.wellFounded`).
  - `dfinsupp.` / `Pi.` / `Function.`: Module-scoped theorems.
  - `wellFoundedLT`: For instances of `WellFoundedLT` typeclass.
- **Suffixes**:
  - `_of_finite`: When finiteness of `ι` is used to reduce to `Pi` case.
  - `_of_single`: When proof proceeds via single-element functions.
  - `_erase`: When proof uses `erase` operation on support.
- **Other patterns**:
  - `acc_`: Accessibility lemmas.
  - `wf` / `wf'`: Well-foundedness lemmas; `'` often denotes variant using trichotomy.
  - `invImage.wf`, `Subrelation.wf`: Proof tactics using standard well-foundedness preservation.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `intro`, `intro!`, `rintro`, `cases`, `split_ifs`, `subst`, `ext1`, `simp only`, `rw`, `rwa`
- `convert`, `exact`, `assumption`, `refine`, `apply`
- `induction' ... using Finset.induction`: Structural induction on finite sets (support).
- `haveI`, `letI`, `set`, `classical`: For typeclass inference and classical reasoning.
- `#adaptation_note`: Special Lean 4 note for `simp` configuration.
- `aesop`, `ring`, `linarith` not explicitly used here — focus is on order-theoretic reasoning.

#### 4. **Proof Logic**

- **Inductive structure**:
  - Prove accessibility (`Acc`) for `x : Π₀ i, α i` by induction on `x.support` (finite set).
  - Base case: `x = 0`, handled via `Lex.acc_zero`.
  - Inductive step: `x = single i (x i) + x.erase i`, then use `Lex.acc_of_single_erase` + game-add fibration lemma (`lex_fibration`).
- **Key logical flow**:
  1. Show `Acc` for `single i a` via induction on `rᶜ ⊓ ≠` and `s i`.
  2. Extend to arbitrary `x` via finite support induction.
  3. Upgrade to `WellFounded` via `⟨fun x => acc x⟩`.
- **Trichotomy variant**:
  - When `r` is trichotomous, `rᶜ ⊓ ≠` reduces to `r.swap`, so `Lex.wellFounded'` applies directly.
- **Product order reduction**:
  - Use `WellOrderingRel` (a well-order on `ι`) to embed product order `<` into lexicographic order `<_Lex`, via `InvImage.wf` and `Subrelation.wf`.

#### 5. **Imports**

Core dependencies shaping scope:
- `Mathlib.Data.DFinsupp.Lex`: Lexicographic order on `DFinsupp`.
- `Mathlib.Order.GameAdd`: Used in `lex_fibration` (game-theoretic sum for fibration).
- `Mathlib.Order.Antisymmetrization`: For embedding preorders into antisymmetric ones (`Antisymmetrization`).
- `Mathlib.SetTheory.Cardinal.Basic`: Possibly for `WellOrderingRel` or cardinality arguments.
- `Mathlib.Tactic.AdaptationNote`: For version-specific `simp` tuning.

These imports indicate the formalization sits at the intersection of:
- **Order theory** (well-foundedness, lexicographic/product orders),
- **Dependent types** (`Π₀`, `Π`, `DFinsupp`),
- **Game-theoretic reasoning** (via `GameAdd` in fibration),
- **Typeclass-driven abstraction** (`WellFoundedLT`, `CanonicallyOrderedAddCommMonoid`, etc.).