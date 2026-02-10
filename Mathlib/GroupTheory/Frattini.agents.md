### Technical Brief: Frattini Subgroup in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `frattini` | `def frattini (G : Type*) [Group G] : Subgroup G := Order.radical (Subgroup G)` | Defines the Frattini subgroup as the radical (i.e., intersection of all coatoms/maximal subgroups) in the subgroup lattice. |
| `frattini_le_coatom` | `lemma frattini_le_coatom {K : Subgroup G} (h : IsCoatom K) : frattini G ≤ K` | States that the Frattini subgroup is contained in every maximal subgroup (coatom). |
| `frattini_le_comap_frattini_of_surjective` | `lemma frattini_le_comap_frattini_of_surjective (hφ : Function.Surjective φ) : frattini G ≤ (frattini H).comap φ` | Relates Frattini subgroups under surjective homomorphisms. |
| `frattini_characteristic` | `instance frattini_characteristic : (frattini G).Characteristic` | Proves the Frattini subgroup is characteristic (invariant under all automorphisms). |
| `frattini_nongenerating` | `theorem frattini_nongenerating [IsCoatomic (Subgroup G)] {K : Subgroup G} (h : K ⊔ frattini G = ⊤) : K = ⊤` | Captures the “non-generating” property: if a subgroup together with the Frattini subgroup generates the whole group, then the subgroup alone already does. |
| `frattini_nilpotent` | `theorem frattini_nilpotent [Finite G] : Group.IsNilpotent (frattini G)` | Shows that for finite groups, the Frattini subgroup is nilpotent. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `frattini_`: Used for all definitions/lemmas related to the Frattini subgroup.
  - `isCoatom_`, `comap_`, `map_`, `subtype_`: Standard Mathlib naming for subgroup operations and properties.
- **Suffixes**:
  - `_le_`: For inequalities involving subgroups (e.g., `frattini_le_coatom`).
  - `_of_`: For conditions or assumptions (e.g., `frattini_nilpotent_of_finite`, though here it's implicit via `[Finite G]`).
  - `_characteristic`, `_nongenerating`: Descriptive suffixes indicating key properties.

---

#### **3. Tactic Stack**

The proofs use a combination of standard and advanced tactics:

- `simp_rw`: Rewriting with simplification (used in `frattini_le_comap_frattini_of_surjective`).
- `intro`, `apply`, `exact`: Basic proof scripting.
- `rw`, `clear`: For rewriting goals and cleaning up hypotheses.
- `have`: Introducing intermediate lemmas (e.g., `have frattini_argument := ...`).
- `apply ... .mp`: Modus ponens application (e.g., `normalizer_eq_top_iff.mp`).
- `exact ... .of_map_subtype`: Leveraging structure-preserving properties of subgroup embeddings.
- `isNilpotent_of_finite_tfae`: A powerful equivalence chain for finite nilpotent groups.

No heavy automation like `aesop` or `ring` is used—proofs rely on structural group-theoretic reasoning.

---

#### **4. Proof Logic**

- **General Strategy**:
  - Leverage lattice-theoretic properties of subgroups (`Order.radical`, `IsCoatomic`, `IsCoatom`) to reason about intersections and maximality.
  - Use homomorphism compatibility (e.g., `comap`, `map`, `subtype`) to transfer properties across groups.
  - For nilpotency: Apply the finite-characterization via Sylow subgroups being normal.
    - Use the *Frattini argument*: `Sylow.normalizer_sup_eq_top`.
    - Combine with the non-generating property to deduce normality in the ambient group.
    - Descend normality to the Frattini subgroup via subgroup embedding.

- **Inductive/Case Analysis**: Not prominent; proofs are mostly direct and structural.

---

#### **5. Imports & Scope**

- **Core Imports**:
  - `Mathlib.GroupTheory.Nilpotent`: Provides nilpotency criteria (e.g., `isNilpotent_of_finite_tfae`).
  - `Mathlib.Order.Radical`: Supplies the `radical` function (intersection of coatoms), used to define the Frattini subgroup.

- **Scope**:
  - Focuses on *elementary* properties of the Frattini subgroup in general and finite groups.
  - Assumes background knowledge of subgroup lattices, Sylow theory, and group actions (normalizers).
  - Does *not* cover cohomological or pro-p aspects—restricted to classical finite/abstract group theory.

--- 

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation or AI training).