Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `precoherent` | `(e : C ≌ D) → Precoherent D` | Shows that `Precoherent` is preserved under equivalence of categories. |
| `sheafCongrPrecoherent` | `(e : C ≌ D) → Sheaf (coherentTopology C) A ≌ Sheaf (coherentTopology D) A` | Constructs an equivalence of coherent sheaf toposes induced by an equivalence of precoherent categories. |
| `precoherent_isSheaf_iff` | `(e : C ≌ D) → (F : Cᵒᵖ ⥤ A) → IsSheaf (coherentTopology C) F ↔ IsSheaf (coherentTopology D) (e.inverse.op ⋙ F)` | Allows checking coherent sheaf condition after precomposing with the equivalence. |
| `precoherent_isSheaf_iff_of_essentiallySmall` | `[EssentiallySmall C] → (F : Cᵒᵖ ⥤ A) → IsSheaf (coherentTopology C) F ↔ IsSheaf (coherentTopology (SmallModel C)) ((equivSmallModel C).inverse.op ⋙ F)` | Special case for essentially small sites, reducing to the small model. |
| `preregular` | `(e : C ≌ D) → Preregular D` | Analogous to `precoherent`, but for `Preregular`. |
| `sheafCongrPreregular` | `(e : C ≌ D) → Sheaf (regularTopology C) A ≌ Sheaf (regularTopology D) A` | Equivalence of regular toposes induced by preregular equivalence. |
| `preregular_isSheaf_iff` | `(e : C ≌ D) → (F : Cᵒᵖ ⥤ A) → IsSheaf (regularTopology C) F ↔ IsSheaf (regularTopology D) (e.inverse.op ⋙ F)` | Regular sheaf condition transfer via equivalence. |
| `preregular_isSheaf_iff_of_essentiallySmall` | `[EssentiallySmall C] → ...` | Regular sheaf condition for essentially small sites. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `precoherent_`, `preregular_`: For properties preserved under equivalence.
  - `sheafCongr_`: For equivalences of sheaf categories.
  - `isSheaf_iff`: For characterizations of sheaf conditions under equivalence.

- **Suffixes**:
  - `_iff`: For biconditional statements (↔).
  - `_of_essentiallySmall`: For specialized versions when the site is essentially small.

- **Other patterns**:
  - `e.inverse.op ⋙ F`: Precomposition with the inverse equivalence’s opposite functor.
  - `equivSmallModel C`: Canonical equivalence from `C` to its small model.

---

### **3. Tactic Stack**

- **Core tactics**:
  - `rw`: Rewriting using equivalences and definitions (e.g., `coherentTopology.eq_induced`).
  - `simp only [...]`: Simplification with specific lemmas (e.g., `Functor.mem_inducedTopology_sieves_iff`).
  - `exact`: Supplying direct proofs or constructions.
  - `refine`: Partial proof construction, especially in `↔` proofs.
  - `haveI := ...`: Introducing instances derived from equivalences.

- **Category-theoretic helpers**:
  - `isoWhiskerRight`: Used to manipulate natural isomorphisms in composition.
  - `isSheaf_of_iso_iff`: Characterization of sheaf condition up to isomorphism.

---

### **4. Proof Logic**

- **General proof strategy**:
  1. Use `e.inverse.reflects_precoherent` / `reflects_preregular` to lift properties along equivalence.
  2. Construct induced equivalences of sheaf categories via `e.sheafCongr _ _ _`.
  3. For sheaf condition equivalences:
     - Use `refine` to split into forward/backward directions.
     - Apply `isSheaf_of_iso_iff` to reduce to an isomorphic presheaf.
     - Use `isoWhiskerRight` on the unit isomorphism to close the proof.

- **Inductive/structural pattern**:
  - Prove preservation of structure (`precoherent`, `preregular`) → construct induced equivalences → prove sheaf condition transfer.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Sites.Coherent.SheafComparison` | Provides tools for comparing sheaves over coherent topologies. |
| `Mathlib.CategoryTheory.Sites.Equivalence` | Core results on how Grothendieck topologies behave under categorical equivalences. |

---

Let me know if you'd like a diagrammatic summary or a formalized lemma list for automated processing.