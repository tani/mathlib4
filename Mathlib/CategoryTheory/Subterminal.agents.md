### Technical Metadata Brief: Subterminal Objects in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSubterminal A` | `Prop` | Defines `A` as subterminal: for all `Z`, any two morphisms `Z ⟶ A` are equal. |
| `IsSubterminal.def` | `IsSubterminal A ↔ ∀ ⦃Z⦄ (f g : Z ⟶ A), f = g` | Equational definition of `IsSubterminal`. |
| `IsSubterminal.mono_isTerminal_from` | `IsSubterminal A → IsTerminal T → Mono (hT.from A)` | Shows that the unique map from a subterminal object to a terminal object is mono. |
| `IsSubterminal.mono_terminal_from` | `IsSubterminal A → Mono (terminal.from A)` | Special case of above when terminal exists. |
| `isSubterminal_of_mono_isTerminal_from` | `IsTerminal T → Mono (hT.from A) → IsSubterminal A` | Converse: if the map to a terminal object is mono, then `A` is subterminal. |
| `isSubterminal_of_mono_terminal_from` | `Mono (terminal.from A) → IsSubterminal A` | Converse special case. |
| `isSubterminal_of_isTerminal` | `IsTerminal T → IsSubterminal T` | Terminal objects are subterminal. |
| `isSubterminal_of_terminal` | `IsSubterminal (⊤_ C)` | Terminal object (when exists) is subterminal. |
| `IsSubterminal.isIso_diag` | `IsSubterminal A → HasBinaryProduct A A → IsIso (diag A)` | Subterminal ⇒ diagonal is iso. |
| `isSubterminal_of_isIso_diag` | `IsIso (diag A) → IsSubterminal A` | Diagonal iso ⇒ subterminal. |
| `IsSubterminal.isoDiag` | `A ⨯ A ≅ A` | Explicit iso between `A` and `A ⨯ A` when `A` is subterminal. |
| `Subterminals C` | `Type u₁` | Full subcategory of subterminal objects. |
| `subterminalInclusion C` | `Subterminals C ⥤ C` | Inclusion functor. |
| `subterminalsEquivMonoOverTerminal` | `Subterminals C ≌ MonoOver (⊤_ C)` | Equivalence between subterminal objects and monos into terminal object. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isSubterminal_...`: Theorems about the predicate `IsSubterminal`.
  - `IsSubterminal...`: Methods/lemmas on the *proof* of `IsSubterminal A`.
  - `subterminal...`: Related to the *subcategory* `Subterminals C`.
  - `monoOver...`: Related to `MonoOver` (arrows with monic codomain).
- **Suffixes**:
  - `_from`: Morphism *from* an object (e.g., `terminal.from A`).
  - `_diag`: Diagonal morphism `A ⟶ A ⨯ A`.
  - `_iso`: Isomorphism (e.g., `isoDiag`).
  - `_incl` / `_inclusion`: Inclusion functors.
- **Pattern**: `X.mono_Y` or `X.iso_Y` for morphism properties (mono, iso) involving `X`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Automated category-theoretic reasoning (e.g., diagram chasing, uniqueness). |
| `simp` / `simp_rw` | Simplification using definitional equalities and lemmas (e.g., `prod.lift_fst`, `diag`). |
| `subsingleton` | Exploits subsingleton instances (e.g., hom-sets in thin categories). |
| `rw [← cancel_mono ...]` | Cancelling monos on left in equalities. |
| `ext1` / `ext` | Extensionality for morphisms (especially in `MonoOver`). |
| ` rfl` / `congr` | For trivial equalities (e.g., identity maps, compositions). |
| `apply hT.hom_ext` | Using terminal object’s universal property. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most equivalences are proven via two implications:
    - `IsSubterminal A → diagonal iso` (via uniqueness of maps into `A`).
    - `diagonal iso → IsSubterminal A` (via factorization through `diag` and uniqueness).
  - Monomorphism ↔ subterminal equivalence uses:
    - `cancel_mono` to reduce to uniqueness.
    - `hom_ext` for terminal objects.
  - Equivalence `Subterminals C ≌ MonoOver (⊤_ C)`:
    - `functor`: sends `A` to `A → ⊤`, which is mono if `A` is subterminal.
    - `inverse`: sends mono `M → ⊤` to `M`, which is subterminal because monos into terminal are unique.
    - Unit/counit are trivial (identity iso) due to thinness of hom-sets.

- **Induction**: Not used — proofs rely on universal properties and uniqueness.

- **Subsingleton reasoning**: Central due to thinness of `Subterminals C` (`Subsingleton (X ⟶ Y)`).

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Shapes.BinaryProducts` | Needed for `HasBinaryProduct`, `diag`, `prod.fst`, `prod.snd`. |
| `Mathlib.CategoryTheory.Limits.Shapes.Terminal` | For `IsTerminal`, `terminal`, `terminal.from`. |
| `Mathlib.CategoryTheory.Subobject.MonoOver` | For `MonoOver`, `Over`, and equivalence with subobjects. |

---

#### **6. Additional Notes**

- **Thinness**: Hom-sets in `Subterminals C` are subsingletons (`subterminals_thin`), making it a *preorder category*.
- **Inhabited**: If `C` has a terminal object, `Subterminals C` is inhabited (`instance Inhabited`).
- **Equivalence**: The equivalence `Subterminals C ≌ MonoOver (⊤_ C)` is foundational for later results (e.g., Heyting algebra structure on subobject lattices in LCCCs).
- **TODOs** indicate future work on exponential ideals and topos-theoretic applications.

--- 

Let me know if you'd like a diagrammatic summary or a tactic-level proof sketch for a specific theorem.