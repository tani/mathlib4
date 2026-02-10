Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `TopologicalSpace.Fiber` API**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sigmaIsoHom` | `C((x : Fiber f) × x.val, S)` | Canonical continuous map from the disjoint union (indexed by fibers of `f`) to `S`, sending each component to its image under `f`. |
| `sigmaIsoHom_inj` | `Function.Injective (sigmaIsoHom f)` | Proves injectivity of `sigmaIsoHom f`, using properties of fibers and equality in sigma types. |
| `sigmaIsoHom_surj` | `Function.Surjective (sigmaIsoHom f)` | Proves surjectivity of `sigmaIsoHom f`, constructing a preimage for any `s : S`. |
| `sigmaIncl` | `a : Fiber f → C(a.val, S)` | Inclusion of a single fiber component `a.val` (a subspace of `S`) into `S`. |
| `sigmaInclIncl` | `{X : Type*} → (g : Y → X) → (a : Fiber (g ∘ f)) → (b : Fiber (f ∘ (sigmaIncl (g ∘ f) a))) → C(b.val, (Fiber.mk f (b.preimage).val).val)` | Relates fibers of a composition `g ∘ f` to intermediate fibers via `f`, used for coherence in fiberwise constructions. |
| `CompactSpace x.val` (instance) | `x : Fiber l → CompactSpace x.val` | Each fiber of a *locally constant* map `l : S → Y` (with `S` compact) is compact. |
| `Finite (Fiber l)` (instance) | `Finite (Fiber l)` | The index set of fibers (i.e., the number of connected components in the fiber bundle) is finite when `S` is compact and `l` is locally constant. |

> **Note**: `Fiber f` is shorthand for `Σ y : Y, f ⁻¹' {y}`, i.e., the total space of the fiber bundle induced by `f`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sigma_`: Indicates constructions involving the sigma type (disjoint union) over fibers.
  - `is_`: Not used here, but `isCompact` appears in the proof of the compactness instance.
- **Suffixes**:
  - `_hom`: Denotes a continuous map (`C(-, S)`), consistent with `ContinuousMap` terminology.
  - `_incl`: Denotes inclusion maps (e.g., `sigmaIncl`, `sigmaInclIncl`).
- **Functional composition**: `g ∘ f` used in fiber definitions (`Fiber (g ∘ f)`), and `preimage`/`image` lemmas reference standard function theory.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `intro`, `rintro`, `refine`, `rw`, `simp`, `simp only`, `have`, `exact`
- **Domain-specific tactics**:
  - `Sigma.subtype_ext`: For proving equality in subtype/sigma types.
  - `simp [← hx, ← hy, h]`: Rewriting equalities using fiber membership (`Fiber.mem_iff_eq_image`).
  - `rw [Set.mem_preimage, Set.mem_singleton_iff]`: To unpack fiber membership conditions.
  - `simp [sigmaIncl]`: Simplifying definitions of inclusion maps.
- **No heavy automation** (e.g., `aesop`, `ring`, `linarith`) — proofs are mostly manual and structural.

---

#### **4. Proof Logic**

- **Structure**:
  - **Injectivity proofs**: Use `Sigma.subtype_ext` + `simp` to reduce to equality in the base and fiber components.
  - **Surjectivity proofs**: Construct an explicit preimage using `⟨⟨⟨_, ⟨⟨_, Set.mem_range_self _⟩, rfl⟩⟩, ⟨_, rfl⟩⟩, rfl⟩`, leveraging that every `s ∈ S` lies in the fiber over `f(s)`.
  - **Compactness instance**: Uses equivalence `isCompact_iff_compactSpace` and the fact that fibers of locally constant maps are closed (hence compact in a compact space).
  - **Finiteness instance**: Derives from `l.range_finite` (a property of locally constant maps on compact spaces) and `Finite.Set.finite_range`.

- **Pattern**: Induction-free; relies on direct element-chasing and topological properties (closed fibers, compactness, finiteness of image).

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Topology.LocallyConstant.Basic`: Provides `LocallyConstant`, its properties (e.g., finite range, closed fibers).
  - `Mathlib.Logic.Function.FiberPartition`: Defines `Fiber`, `Fiber.mk`, `Fiber.map`, `Fiber.preimage`, etc.

- **Scope**:
  - Focuses on *topological* aspects of fibers of functions `f : S → Y`, especially when `S` is compact and `f` is locally constant.
  - Designed for use in higher categorical / condensed mathematics (c.f. PR #14027), particularly for constructing the counit of an adjunction between sets and condensed sets.

---

Let me know if you'd like a diagrammatic summary or formalization recommendations for extending this API.