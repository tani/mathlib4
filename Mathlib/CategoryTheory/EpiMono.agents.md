### Technical Brief: Epimorphisms, Monomorphisms, and Split (Co)limits in Category Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Epi`, `Mono` | `CategoryTheory.Category` (primitive) | Standard categorical epimorphisms/monomorphisms (left/right cancellable). |
| `SplitMono f` | `Structure` | A morphism `f : X ⟶ Y` equipped with a *retraction* `r : Y ⟶ X` such that `f ≫ r = 𝟙 X`. |
| `IsSplitMono f` | `Class Prop` | Predicate asserting existence of a `SplitMono f`. |
| `SplitEpi f` | `Structure` | A morphism `f : X ⟶ Y` equipped with a *section* `s : Y ⟶ X` such that `s ≫ f = 𝟙 Y`. |
| `IsSplitEpi f` | `Class Prop` | Predicate asserting existence of a `SplitEpi f`. |
| `retraction f` | `Y ⟶ X` (noncomputable) | Canonical retraction for `IsSplitMono f`. |
| `section_ f` | `Y ⟶ X` (noncomputable) | Canonical section for `IsSplitEpi f`. |
| `isIso_of_epi_of_isSplitMono` | `f : X ⟶ Y`, `[IsSplitMono f]`, `[Epi f] ⊢ IsIso f` | A split mono that is epi is an isomorphism. |
| `isIso_of_mono_of_isSplitEpi` | `f : X ⟶ Y`, `[Mono f]`, `[IsSplitEpi f] ⊢ IsIso f` | A split epi that is mono is an isomorphism. |
| `isSplitMono_of_mono` | `[SplitMonoCategory C]`, `[Mono f] ⊢ IsSplitMono f` | In a *split mono category*, every mono splits. |
| `isSplitEpi_of_epi` | `[SplitEpiCategory C]`, `[Epi f] ⊢ IsSplitEpi f` | In a *split epi category*, every epi splits. |
| `SplitMono.map` | `SplitMono f ⇒ SplitMono (F.map f)` | Split monos are preserved under any functor (absolute monos). |
| `SplitEpi.map` | `SplitEpi f ⇒ SplitEpi (F.map f)` | Split epis are preserved under any functor (absolute epis). |
| `Groupoid.ofTruncSplitMono` | `(∀ f, Trunc (IsSplitMono f)) ⇒ Groupoid C` | If every morphism has a *truncated* retraction, the category is a groupoid. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isSplitMono`, `isSplitEpi`: Class predicates (propositional).
  - `SplitMono`, `SplitEpi`: Structured witnesses (data + proofs).
  - `retraction`, `section_`: Canonical choice functions for split structures.
  - `of_`: Conversion from stronger to weaker structure (e.g., `of_iso`, `of_epi_section`).
- **Suffixes**:
  - `_id`: Identity law for split structures (e.g., `SplitMono.id`, `SplitEpi.id`).
  - `_isSplitMono`, `_isSplitEpi`: Instance lemmas (e.g., `IsSplitMono.mono`, `IsSplitEpi.epi`).
  - `unop_`, `op_`: Duality across opposite categories (e.g., `unop_mono_of_epi`, `op_epi_of_mono`).
- **Special**:
  - `section_` (with underscore): Avoids conflict with reserved keyword `section`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `aesop_cat`, `aesop`: Used in `structure` definitions (`id` fields) and `simp`-based reasoning.
  - `simp`, `simpa`: For simplifying compositions and identities.
  - `rw`, `replace`: Rewriting and hypothesis manipulation.
  - `cancel_epi`, `cancel_mono`: Custom cancellation lemmas for epi/mono.
  - `unop_inj`, `op_inj`: Injectivity of `op`/`unop` on homs.
  - `some`: From `Nonempty.some` to extract witness from `Nonempty`.
  - `apply`, `intro`, `exact`: Standard proof scripting.

- **Proof automation**:
  - `aesop apply safe`: Used in `@[ext, aesop apply safe]` attributes for `SplitMono`/`SplitEpi`.
  - `reassoc (attr := simp)`: Registers `id` lemmas for automatic reassociation under `simp`.

---

#### **4. Proof Logic**

- **Structure-based reasoning**:
  - Prove properties for `SplitMono f` first (as a structure), then lift to `IsSplitMono f` via `Nonempty.intro`.
  - Use `hf.exists_splitMono.some` to extract a concrete splitting from the propositional class.

- **Duality**:
  - Many results come in dual pairs (e.g., `unop_mono_of_epi` ↔ `unop_epi_of_mono`, `SplitMono.map` ↔ `SplitEpi.map`).
  - Opposite category (`Cᵒᵖ`) used to transfer mono/epi properties via `op`/`unop`.

- **Iso criteria**:
  - To prove `IsIso f`, construct inverse `g` and two equations: `f ≫ g = 𝟙`, `g ≫ f = 𝟙`.
  - Use `cancel_epi`/`cancel_mono` to reduce one equation using the other (e.g., `isIso_of_epi_of_isSplitMono`).

- **Functoriality**:
  - `SplitMono.map`/`SplitEpi.map` show preservation under functors; instances lift to `IsSplitMono`/`IsSplitEpi`.

- **Groupoid construction**:
  - Uses `Groupoid.ofIsIso`: Show every morphism is iso.
  - Extract retractions via `Trunc` (computable choice), then apply `IsIso.of_mono_retraction`.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.CategoryTheory.Opposites`: For `op`, `unop`, and duality lemmas.
  - `Mathlib.CategoryTheory.Groupoid`: For `Groupoid` typeclass and `ofIsIso`.

- **Scope**:
  - Defines foundational facts about *split* monos/epis and their relation to general monos/epis and isos.
  - Introduces *split mono/epi categories* (where all monos/epis split).
  - Connects to absolute (functor-preserving) monos/epis via `SplitMono.map`/`SplitEpi.map`.
  - Enables categorical reasoning in settings like toposes, abelian categories, or groupoids.

---

This module serves as a **bridge between structural properties** (mono/epi) and **constructive splitting**, enabling powerful iso criteria and facilitating categorical logic (e.g., in topos theory or homological algebra).