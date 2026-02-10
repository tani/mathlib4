Here is the structured technical metadata extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `IsConnected.of_constant_of_preserves_morphisms` | `∀ {C : Type u} [Category C] [IsConnected C] (F : C ⥤ Type v), (∀ f, F.map f = id) → ∃ c, ∀ X, F X = c` (implicit) | A criterion to prove a category is connected by showing any functor to `Type` that preserves morphisms (i.e., maps all morphisms to identities) is constant on objects. |
| `WidePullbackShape J` | `Category` | The indexing category for wide pullbacks over a diagram indexed by `J`. |
| `WidePushoutShape J` | `Category` | The indexing category for wide pushouts over a diagram indexed by `J`. |
| `instance {J} : IsConnected (WidePullbackShape J)` | `IsConnected (WidePullbackShape J)` | Proves that the shape category for wide pullbacks is connected. |
| `instance {J} : IsConnected (WidePushoutShape J)` | `IsConnected (WidePushoutShape J)` | Proves that the shape category for wide pushouts is connected. |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `is_`: Used in `IsConnected`, indicating a *property* of a category.
  - `Wide*Shape`: Standardized naming for indexing categories of wide limits/colimits (`WidePullbackShape`, `WidePushoutShape`).
  - `.term _`, `.init _`: Constructor names for the `WidePullbackShape` / `WidePushoutShape` inductive type (likely defined elsewhere), denoting the "terminal" and "initial" objects in the shape.

- **Pattern**:
  - `of_constant_of_preserves_morphisms`: Descriptive name indicating the proof strategy: show that a functor preserving morphisms (i.e., mapping all morphisms to identities) is constant ⇒ category is connected.

---

### **3. Tactic Stack**

- **Primary tactics used**:
  - `apply IsConnected.of_constant_of_preserves_morphisms`: Core proof strategy.
  - `intros`: Introduce hypotheses and variables.
  - `suffices ... from ...`: Replaces goal with a simpler sufficient condition.
  - `rintro ⟨⟩`: Destructure sum-like inductive types (e.g., `option J` or similar).
  - `exacts [rfl, H ...]`: Provide multiple proofs for multiple goals (here, two subgoals).
  - `rfl`: Reflexivity for definitional equalities.
  - `.term _`, `.init _`: Constructor applications (likely part of the shape definition).

- **No heavy automation** (e.g., `aesop`, `ring`, `simp`), indicating a lightweight, structural proof.

---

### **4. Proof Logic**

- **Strategy**: Use the categorical characterization of connectedness via functors to `Type`.
- **Steps**:
  1. Apply `IsConnected.of_constant_of_preserves_morphisms`.
  2. Let `F` be a functor from the shape category to `Type`, and assume `F` maps all morphisms to identities.
  3. Show `F` is constant on objects by proving `∀ i, F i = F none`.
  4. For `WidePullbackShape J`: The shape has objects `none` and `some i` for `i : J`. Morphisms only go from `some i` to `none`. So:
     - `F none = F none` trivially (`rfl`).
     - `F (some i) = F none` follows from `H (.term _)`, since `.term _ : some i ⟶ none` and `F.map (.term _) = id` ⇒ `F (some i) = F none`.
  5. For `WidePushoutShape J`: Dually, morphisms go from `none` to `some i`, so `F none = F (some i)` follows from `H (.init _)`.

- **Logical flow**: *Induction-free*, case analysis on the shape’s object structure, leveraging the definition of morphisms in the shape categories.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.IsConnected` | Provides the definition and key lemmas about connected categories, especially `IsConnected.of_constant_of_preserves_morphisms`. |
| `Mathlib.CategoryTheory.Limits.Shapes.WidePullbacks` | Defines `WidePullbackShape` and `WidePushoutShape` (likely via inductive types), and their morphism structures. |

> **Note**: The file assumes `WidePullbackShape J` and `WidePushoutShape J` are defined as categories with objects `option J` (or similar), and morphisms only from `some i` to `none` (pullback) or `none` to `some i` (pushout).

--- 

Let me know if you'd like the formal statement of `IsConnected.of_constant_of_preserves_morphisms` or the definition of `WidePullbackShape`.