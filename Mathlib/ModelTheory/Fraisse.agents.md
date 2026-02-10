### Technical Metadata Brief: Fraïssé Classes and Fraïssé Limits in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `age (M)` | `L.Structure M → Set (Bundled L.Structure)` | The *age* of a structure `M` is the class of finitely-generated `L`-structures embedding into `M`. |
| `Hereditary K` | `Prop` | `K` is closed under taking finitely-generated substructures (i.e., if `N ∈ K` and `P ↪ N`, `P` fg ⇒ `P ∈ K`). |
| `JointEmbedding K` | `Prop` | Any two structures in `K` embed into a common structure in `K`. Formalized via `DirectedOn`. |
| `Amalgamation K` | `Prop` | Amalgamation property: given embeddings `M ↪ N`, `M ↪ P` with `M,N,P ∈ K`, there exists `Q ∈ K` and embeddings `N ↪ Q`, `P ↪ Q` making the square commute. |
| `IsFraisse K` | `Class` | `K` is nonempty, all its members are fg, essentially countable, and satisfies `Hereditary`, `JointEmbedding`, `Amalgamation`. |
| `IsUltrahomogeneous L M` | `Prop` | Every embedding `S ↪ M` from fg substructure `S` extends to an automorphism of `M`. |
| `IsFraisseLimit K M` | `Structure` | `M` is a Fraïssé limit for `K`: countable, cg, ultrahomogeneous, and `age M = K`. |
| `age.is_equiv_invariant` | `N ≃[L] P ⇒ N ∈ age M ↔ P ∈ age M` | Age is invariant under isomorphism. |
| `age.countable_quotient` | `Countable M ⇒ (Quotient.mk' '' age M).Countable` | Age of a countable structure is essentially countable. |
| `exists_countable_is_age_of_iff` | `↔` | Characterizes when a class is the age of a *countable* structure in a language with countably many functions. |
| `IsUltrahomogeneous.extend_embedding` | `extend embedding from fg domain along embedding into larger structure` | Key technical lemma for building isomorphisms. |
| `IsUltrahomogeneous.amalgamation_age` | `age M` has amalgamation if `M` is ultrahomogeneous. | Connects ultrahomogeneity to Fraïssé properties. |
| `IsUltrahomogeneous.age_isFraisse` | `M ultrahomogeneous + countable ⇒ age M is Fraïssé` | Age of countable ultrahomogeneous structure is Fraïssé. |
| `IsFraisseLimit.nonempty_equiv` | `IsFraisseLimit K M ∧ IsFraisseLimit K N ⇒ Nonempty (M ≃[L] N)` | Uniqueness of Fraïssé limits up to isomorphism. |
| `empty.isFraisseLimit_of_countable_infinite` | `Countable + Infinite ⇒ Fraïssé limit of finite structures` | Core example: countably infinite sets are Fraïssé limits of finite sets. |
| `empty.isFraisse_finite` | `IsFraisse (finite structures)` | Class of finite structures in empty language is Fraïssé. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `age_`: properties of ages (`age.nonempty`, `age.hereditary`, `age.countable_quotient`, `age_directLimit`)
  - `is_`: properties of structures/classes (`isUltrahomogeneous`, `IsFraisse`, `IsFraisseLimit`)
  - `fg_`: finitely-generated related (`fg_iff_structure_fg`, `fg_closure`, `fg_substructure`)
  - `embed_`, `embedding_`: embedding-related (`Embedding.age_subset_age`, `equivRange`, `comp`)
  - `extend_`: extension of embeddings (`extend_embedding`)
  - `amalgamation_`: (`amalgamation_age`)

- **Suffixes**:
  - `_iff`: characterizations (`exists_countable_is_age_of_iff`, `isUltrahomogeneous_iff_IsExtensionPair`)
  - `_subset_age`: subset relations (`Embedding.age_subset_age`)
  - `_eq_age`: equality of ages (`Equiv.age_eq_age`)
  - `_invariant`: invariance under isomorphism (`is_equiv_invariant`, `is_equiv_invariant_of_fg`)

- **Structure names**:
  - `Bundled.{w} L.Structure`: used uniformly for structures in classes.
  - `Substructure`, `DirectLimit`, `PartialEquiv`, `Equiv`, `Embedding`: core types.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` / `simp_rw` | Simplification of structure embeddings, quotients, ages, fg conditions. |
| `rw` / `erw` | Rewriting using definitional equalities, especially for embeddings and quotients. |
| `exact`, `refine`, `apply` | Constructing witnesses (e.g., for `∃`, `Nonempty`, `DirectedOn`). |
| `cases'` / `obtain` / `have` / `let` | Decomposing hypotheses and constructing intermediate structures. |
| `ext` | Extensionality for functions/embeddings/substructures. |
| `dsimp`, `unfold`, `convert` | Unfolding definitions (e.g., `age`, `DirectedSystem`, `DirectLimit`). |
| `infer_instance` | Inferring typeclass instances (e.g., `L.Structure`, `FG`, `Countable`). |
| `apply Quotient.sound` / `Quotient.eq'` / `Quotient.mk_out` | Working with quotient structures (essential countability). |
| `aesop` / `tauto` / `linarith` | Not heavily used here; model-theoretic reasoning dominates. |
| `convert` / `congr_arg` | Proving equality of structures via isomorphism classes. |

---

#### **4. Proof Logic & Strategy**

- **Inductive/constructive style**: Proofs often construct explicit structures (e.g., substructures, direct limits, closures) and embeddings.
- **Quotient reasoning**: Essential for handling isomorphism classes (`Quotient.mk'`, `Quotient.out`, `Quotient.sound`).
- **Embedding-based reasoning**: Most arguments revolve around constructing embeddings and verifying commutativity.
- **Ultrahomogeneity ⇒ amalgamation**: A recurring pattern: use ultrahomogeneity to extend embeddings and build amalgams.
- **Fraïssé ⇒ uniqueness**: Use extension property (`IsExtensionPair`) to build back-and-forth isomorphisms.
- **Countability arguments**: Use `countable_range`, `congr_arg`, and `Set.ext` to show essential countability.
- **Direct limits**: Used to build Fraïssé limits; proofs involve `age_directLimit` and closure under directed unions.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.ModelTheory.FinitelyGenerated` | FG structures, substructures, closure, fg iff finite in empty language. |
| `Mathlib.ModelTheory.PartialEquiv` | Partial equivalences, extension pairs, back-and-forth systems. |
| `Mathlib.ModelTheory.Bundled` | `Bundled L.Structure`, homomorphisms, embeddings, quotients. |
| `Mathlib.Algebra.Order.Archimedean.Basic` | Possibly for `ULift ℕ`, countability arguments, or directed systems. |

**Scope**: Model theory of first-order structures, focusing on:
- Ages and Fraïssé classes,
- Ultrahomogeneous structures,
- Countable limits,
- Empty language as baseline example.

**Universe polymorphism**: Uses `universe u v w w'`, with `Language.{u, v}`, `Bundled.{w}`, etc.

---

#### **6. Notable Idioms & Patterns**

- **`fg_iff_structure_fg`**: Bridge between `Structure.FG` and `Substructure.FG`.
- **`equivRange`**: Converts embeddings to isomorphisms onto their range.
- **`closure L (s : Set M)`**: Used to generate fg substructures from finite sets.
- **`Substructure.subtype _`**: Canonical embedding of a substructure.
- **`inclusion le_sup_left/right`**: Inclusion maps into joins of substructures.
- **`DirectedSystem.natLERec`**: Constructing sequences of embeddings over `ℕ`.
- **`PartialEquiv.le_def`**: Used in `isExtensionPair` to compare partial equivalences.

---

#### **7. Future Work (from TODO)**

- **Existence of Fraïssé limits**: Not yet formalized — major next step.
- **Generalizations**: Beyond countable languages, uncountable Fraïssé classes, infinitary logic.

--- 

Let me know if you'd like a **dependency graph**, **proof outline for a key theorem** (e.g., `nonempty_equiv`), or **extraction of the `IsExtensionPair` interface**.