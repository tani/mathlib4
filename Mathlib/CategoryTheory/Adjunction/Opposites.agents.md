### Technical Metadata Brief: `CategoryTheory.Adjunction.Opposite`

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `unop` | `{F : Cᵒᵖ ⥤ Dᵒᵖ} {G : Dᵒᵖ ⥤ Cᵒᵖ} → G ⊣ F → F.unop ⊣ G.unop` | Converts an adjunction between opposite functors into an adjunction between their unop (i.e., original) versions. Swaps unit and counit via `NatTrans.unop`. |
| `op` | `{F : C ⥤ D} {G : D ⥤ C} → G ⊣ F → F.op ⊣ G.op` | Converts an adjunction between functors into one between their opposites (`op`), again swapping unit and counit via `NatTrans.op`. |
| `leftAdjointsCoyonedaEquiv` | `{F F' : C ⥤ D} {G : D ⥤ C} → F ⊣ G → F' ⊣ G → F.op ⋙ coyoneda ≅ F'.op ⋙ coyoneda` | Constructs a natural isomorphism between compositions of two left adjoints with the co-Yoneda embedding, using hom-set equivalences from the two adjunctions. Used to prove uniqueness of left adjoints up to iso. |
| `natIsoOfRightAdjointNatIso` | `{F F' : C ⥤ D} {G G' : D ⥤ C} → F ⊣ G → F' ⊣ G' → G ≅ G' → F ≅ F'` | Shows that if two right adjoints are naturally isomorphic, then so are their left adjoints. Uses `leftAdjointsCoyonedaEquiv` and fully-faithfulness of co-Yoneda. |
| `natIsoOfLeftAdjointNatIso` | `{F F' : C ⥤ D} {G G' : D ⥤ C} → F ⊣ G → F' ⊣ G' → F ≅ F' → G ≅ G'` | Dual of above: if left adjoints are isomorphic, then right adjoints are. Uses `op` to reduce to previous case. |

> **Note**: Several deprecated aliases are provided for historical naming consistency (e.g., `adjointOfOpAdjointOp`, `opAdjointOpOfAdjoint`, etc.), all pointing to `unop` or `op`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `unop`: for constructions involving `unop` (i.e., going from `Cᵒᵖ ⥤ Dᵒᵖ` back to `C ⥤ D`)
  - `op`: for constructions involving `op` (i.e., lifting functors to opposite categories)
- **Suffixes**:
  - `Equiv`: used for isomorphisms derived from hom-set equivalences (`homEquiv`)
  - `natIsoOf...`: indicates construction of a natural isomorphism from some input (e.g., `natIsoOfRightAdjointNatIso`)
- **Structure**:
  - `leftAdjoints...`, `rightAdjoint...`: distinguishes whether the construction concerns left or right adjoints.

---

#### **3. Tactic Stack**

- **Core tactics used in proofs**:
  - `simp`: heavily used via `@[simps]` attribute on definitions (`unop`, `op`)
  - `Quiver.Hom.op_inj`, `Quiver.Hom.unop_inj`: used to prove triangle identities by reducing to known ones in the opposite setting
  - `by simp`: in `op` definition for triangle identities
  - `NatIso.ofComponents`: used to build natural isomorphisms pointwise
  - `trans`, `symm`: for manipulating hom-isomorphisms
  - `whiskeringRight`, `isoEquiv`: from `Coyoneda.fullyFaithful`

> No heavy automation like `aesop`, `ring`, or `linarith` appears—proofs rely on structural properties of opposites and Yoneda.

---

#### **4. Proof Logic**

- **For `unop` and `op`**:
  - Define unit/counit via `NatTrans.unop`/`NatTrans.op` of the original counit/unit.
  - Prove triangle identities by applying injectivity of `op`/`unop` on homs (`op_inj`, `unop_inj`) to reduce to the original triangle identities.

- **For `leftAdjointsCoyonedaEquiv`**:
  - Construct component-wise isomorphism using hom-set equivalence:
    $$
    \hom(F'(X), Y) \xrightarrow{\sim} \hom(X, G(Y)) \xrightarrow{\sim} \hom(F(X), Y)
    $$
    i.e., `adj1.homEquiv ∘ adj2.homEquiv.symm`
  - Lift to natural isomorphism via `NatIso.ofComponents`.

- **For `natIsoOfRightAdjointNatIso`**:
  - Use the natural isomorphism `r : G ≅ G'` to twist one adjunction into the other.
  - Apply `leftAdjointsCoyonedaEquiv` to get an iso between `F.op ⋙ coyoneda` and `F'.op ⋙ coyoneda`.
  - Use fully-faithfulness of co-Yoneda (`Coyoneda.fullyFaithful`) to descend to `F ≅ F'`.

- **For `natIsoOfLeftAdjointNatIso`**:
  - Reduce to previous case by applying `op` to both adjunctions and using `NatIso.op l`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Adjunction.Basic` | Core adjunction theory: units, counits, triangle laws, homEquiv |
| `Mathlib.CategoryTheory.Yoneda` | Yoneda embedding, co-Yoneda, fully-faithful properties |
| `Mathlib.CategoryTheory.Opposites` | Definitions of `op`, `unop`, `op_inj`, `unop_inj`, etc. |

> These imports indicate the file sits at the intersection of **adjunction theory**, **opposite categories**, and **Yoneda embedding**—a foundational layer for categorical uniqueness results.

--- 

Let me know if you'd like a formalized summary in Lean doc-string format or a diagrammatic explanation of the constructions.