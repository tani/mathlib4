### Technical Metadata Brief: Krein-Milman Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `extremePoints` | `Set E → Set E` | Defines the set of extreme points of a subset of a real topological vector space. |
| `IsExtreme` | `ℝ → Set E → Set E → Prop` | Relates a set `t` to being an *extreme subset* of `s`: if a segment in `s` has an interior point in `t`, then the whole segment lies in `t`. |
| `IsExposed` | `ℝ → Set E → Set E → Prop` | Stronger than `IsExtreme`: `t` is *exposed* in `s` if there exists a continuous linear functional `l` such that `t = { y ∈ s | ∀ z ∈ s, l z ≤ l y }`. |
| `IsCompact.extremePoints_nonempty` | `IsCompact s → s.Nonempty → (s.extremePoints ℝ).Nonempty` | **Krein-Milman Lemma**: A nonempty compact set in a LCTVS has at least one extreme point. |
| `closure_convexHull_extremePoints` | `IsCompact s → Convex ℝ s → closure (convexHull ℝ (s.extremePoints ℝ)) = s` | **Krein-Milman Theorem**: A compact convex set is the closure of the convex hull of its extreme points. |
| `surjOn_extremePoints_image` | `f : E →ᴬ[ℝ] F → IsCompact s → SurjOn f (extremePoints ℝ s) (extremePoints ℝ (f '' s))` | Continuous affine maps map extreme points of a compact set *onto* the extreme points of its image (surjective on extreme points). |

---

#### **2. Naming Conventions**

- **Predicates / Properties**:
  - `is_...`: e.g., `isClosed`, `isCompact`, `isExtreme`, `isExposed`.
  - `extremePoints`: noun phrase, denotes the set of extreme points.
- **Theorems**:
  - `..._nonempty`: asserts nonemptiness of a set (e.g., `extremePoints_nonempty`).
  - `closure_...`: describes closure-related equalities (e.g., `closure_convexHull_extremePoints`).
- **Proof helpers**:
  - `of_isClosed_subset`, `exists_isMaxOn`, `sep_subset`: descriptive, often tied to specific lemmas or constructions.
- **Variables**:
  - `s`, `t`, `u`: subsets of the space `E`.
  - `x`, `y`, `z`, `w`: points in `E` or `F`.
  - `l`: continuous linear functional (often from Hahn-Banach separation).

---

#### **3. Tactic Stack**

The proofs rely heavily on the following tactics (in order of frequency/impact):

| Tactic | Usage |
|--------|-------|
| `zorn_superset` | Zorn’s Lemma application to find minimal extreme subsets. |
| `aesop` / `aesop_safe` | Automated reasoning for simple goals (e.g., set membership, continuity). |
| `simp_rw` / `simp` | Rewriting definitions (e.g., `extremePoints`, `IsExtreme`, `IsExposed`). |
| `linarith` | Handling linear inequalities from Hahn-Banach separation. |
| `rw [← ...]` | Rewriting equalities involving segments, images, closures. |
| `exacts [...]` | Sequencing multiple `exact` steps (e.g., in `zorn_superset` branch). |
| `by_contra` | Proof by contradiction (used in both lemma and theorem). |
| `obtain ⟨...⟩ := ...` | Destructuring existential/and goals (e.g., from Hahn-Banach or separation). |
| `convert` / `apply ...` | Applying lemmas like `geometric_hahn_banach_point_point`, `isExtreme.extremePoints_subset_extremePoints`. |

---

#### **4. Proof Logic**

- **Krein-Milman Lemma**:
  1. Define poset `S` of nonempty closed extreme subsets of `s`.
  2. Use Zorn’s lemma to get a *minimal* element `t ∈ S`.
  3. Assume `t` has two distinct points `x ≠ y`.
  4. Apply **geometric Hahn-Banach** to separate `x` and `y` via a continuous linear functional `l`.
  5. Consider the exposed subset `t₀ = { z ∈ t | ∀ w ∈ t, l w ≤ l z }`.
     - `t₀` is nonempty (maximizer exists by compactness), closed, and extreme in `s`.
     - `t₀ ⊂ t` (since `y ∉ t₀`), contradicting minimality of `t`.
  6. Conclude `t` is a singleton → extreme point exists.

- **Krein-Milman Theorem**:
  1. Assume `s ≠ closure(convexHull(extremePoints(s)))`.
  2. Pick `x ∈ s \ closure(...)`.
  3. Separate `x` from the closed convex set `closure(convexHull(...))` via Hahn-Banach.
  4. Let `t = { y ∈ s | ∀ z ∈ s, l z ≤ l y }` — exposed (hence extreme) subset of `s`.
  5. `t` is nonempty (maximizer exists), compact ⇒ by lemma, has an extreme point `y`.
  6. Show `y` is extreme in `s`, contradicting that `x` was outside the convex hull of *all* extreme points.

- **Surjectivity on extreme points**:
  1. For `w ∈ extremePoints(f '' s)`, consider fiber `f⁻¹({w}) ∩ s`.
  2. This fiber is nonempty & compact ⇒ has an extreme point `x`.
  3. Show `x ∈ extremePoints(s)` and `f(x) = w`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Exposed` | Defines `IsExposed`, `IsExtreme`, `extremePoints`, and basic properties. |
| `Mathlib.Analysis.NormedSpace.HahnBanach.Separation` | Provides geometric Hahn-Banach theorems (`geometric_hahn_banach_point_point`, `geometric_hahn_banach_closed_point`). |
| `Mathlib.Topology.Algebra.ContinuousAffineMap` | Defines `E →ᴬ[ℝ] F`, continuous affine maps, and their continuity/linearity properties. |

**Context assumptions**:
- `E`, `F`: real topological vector spaces, locally convex, Hausdorff (`T2`), with continuous scalar multiplication and additive group structure.
- `s ⊆ E`: subset under analysis (compact, convex in theorem).

---

### Summary

This file formalizes two cornerstone results in convex analysis: the **Krein-Milman lemma** (existence of extreme points) and **Krein-Milman theorem** (representation of compact convex sets via extreme points). The proofs are highly structural, leveraging:
- **Zorn’s Lemma** for minimality,
- **Hahn-Banach separation** for contradiction,
- **Exposed subsets** to construct proper extreme subsets,
- **Compactness** to guarantee maximizers and nonemptiness.

The formalization is clean, modular, and reflects the logical flow of the classical proofs in functional analysis.