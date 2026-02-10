### Technical Brief: Ordered First-Order Structures in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `orderRel` | Inductive type with one binary relation symbol `.le : orderRel 2`. Represents the language of orders. |
| `Language.order` | Relational language `⟨∅, orderRel⟩` with one binary relation symbol. |
| `IsOrdered L` | Class asserting `L` has a designated symbol `leSymb : L.Relations 2`. |
| `Term.le`, `Term.lt` | Bounded formulas `t₁ ≤ t₂`, `t₁ < t₂` in an ordered language. |
| `orderLHom L` | Language homomorphism `Language.order →ᴸ L` mapping `.le` to `leSymb`. |
| `preorderTheory`, `partialOrderTheory`, `linearOrderTheory`, `dlo` | Theories in an ordered language: axioms for preorders, partial orders, linear orders, and dense linear orders without endpoints. |
| `noTopOrderSentence`, `noBotOrderSentence`, `denselyOrderedSentence` | Sentences expressing “no top”, “no bottom”, and “density” in the language. |
| `orderStructure [LE M]` | Structure on a type with `≤`, interpreting `.le` as the actual order. |
| `OrderedStructure [L.IsOrdered] [LE M] [L.Structure M]` | Class stating that `leSymb` is interpreted as `≤`. |
| `leOfStructure` | Induced `LE M` from a structure in an ordered language: `a ≤ b ↔ RelMap leSymb ![a,b]`. |
| `preorderOfModels`, `partialOrderOfModels`, `linearOrderOfModels` | Induced order-theoretic structures from models of the respective theories. |
| `HomClass.monotone`, `HomClass.strictMono` | Any `L.HomClass` morphism is monotone (strictly monotone if injective) under `OrderedStructure`. |
| `StrongHomClass.toOrderIsoClass` | Converts strong homomorphisms that are equivalences into order isomorphisms. |
| `dlo_isExtensionPair` | Key lemma: any model of linear orders embeds into a model of `dlo` over finitely generated substructures. |
| `isFraisseLimit_of_countable_nonempty_dlo` | A countable nonempty model of `dlo` is the Fraïssé limit of finite linear orders. |
| `isFraisse_finite_linear_order` | The class of finite linear orders is Fraïssé. |
| `aleph0_categorical_dlo` | `dlo` is ℵ₀-categorical ⇒ complete. |
| `dlo_isComplete` | `dlo` is complete (via ℵ₀-categoricity). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `leSymb`, `noTopOrder`, `noBotOrder`, `denselyOrdered`: indicate order-theoretic concepts.
  - `preorder`, `partialOrder`, `linearOrder`, `dlo`: theory names.
  - `ofModels`, `ofStructure`: constructions *from* models/structures to order-theoretic objects.
  - `realize_`: e.g., `realize_noTopOrder_iff`, `realize_denselyOrdered_iff`: connect satisfaction of sentences to model-theoretic properties.

- **Suffixes**:
  - `Theory`: theory (e.g., `preorderTheory`).
  - `Sentence`: sentence (e.g., `noTopOrderSentence`).
  - `Structure`: structure on a type (e.g., `orderStructure`).
  - `OfModels`, `OfStructure`: reverse direction (e.g., `leOfStructure`, `linearOrderOfModels`).

- **`order` namespace**: All definitions related to the base language `Language.order`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using `@[simp]` lemmas (e.g., `relMap_leSymb`, `Term.realize_le`). |
| `rw` | Rewrite using equivalences (e.g., `realize_noTopOrder_iff`). |
| `exact`, `intro`, `apply` | Standard proof construction. |
| `convert` | Align goals up to definitional equality (e.g., closure arguments). |
| `obtain ⟨...⟩` | Destruct existential/universal quantifiers. |
| `ext` | Extensionality for functions/structures. |
| `classical` | Enable classical logic for choice/constructibility arguments (e.g., Fraïssé). |
| `have`, `suffices` | Intermediate lemma introduction. |
| `inferInstance` | Automatically infer typeclass instances (e.g., `OrderedStructure`, `DecidableRel`). |
| `aesop` / `tauto` | Not explicitly used here, but `simp` + `rw` dominate. |
| `convert` + `simp` | Used in closure arguments (e.g., `Substructure.closure_insert`). |

---

#### **4. Proof Logic**

- **Structure ↔ Theory Correspondence**:
  - *Forward*: From `OrderedStructure M`, derive that `M ⊨ preorderTheory`, etc., via `Relations.realize_*`.
  - *Backward*: From `M ⊨ preorderTheory`, define `preorderOfModels M`, etc., using `Relations.realize_*`.

- **Homomorphism Properties**:
  - Monotonicity follows from `HomClass.map_rel` and `relMap_leSymb`.
  - Strict monotonicity adds injectivity (via `EmbeddingLike`).

- **Fraïssé Theory**:
  - Key step: `dlo_isExtensionPair` uses order-theoretic embedding lemmas (`Order.exists_orderEmbedding_insert`) and density/no endpoints.
  - Fraïssé limit ⇒ ℵ₀-categoricity ⇒ completeness.

- **Countability & Density**:
  - Use `Infinite.of_injective` and `embedding_from_cg` to show models of `dlo` are infinite.
  - `dlo_age` identifies finite substructures as exactly finite linear orders.

- **Isomorphism of Countable Dense Orders**:
  - Use Fraïssé limits: two countable dense orders are both Fraïssé limits ⇒ nonempty equivalence.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Algebra.CharZero.Infinite`: For infinitude results (e.g., `Infinite.of_injective`).
- `Mathlib.Data.Rat.Encodable`: To construct `ℚ` as a countable dense linear order.
- `Mathlib.ModelTheory.Complexity`, `Fraisse`: General Fraïssé theory.
- `Mathlib.Order.CountableDenseLinearOrder`: Classical order theory (e.g., `Order.iso_of_countable_dense`).

**Scope**:
- **Model theory of ordered structures**, especially:
  - First-order languages with a binary order relation.
  - Axiomatization of preorders, partial orders, linear orders, and dense linear orders without endpoints (`dlo`).
  - Fraïssé limits, categoricity, and completeness of `dlo`.
  - Interplay between order-theoretic and model-theoretic structures.

**Notable Exclusions**:
- No explicit use of topology or topology-related model theory (e.g., no o-minimality).
- Focus on *first-order* definability, not second-order or infinitary logic.

--- 

This module serves as a foundational bridge between classical order theory and model theory, with a focus on the rich structure of dense linear orders and their model-theoretic properties.