### Technical Metadata Brief: `Mathlib.CountHeartbeats`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `runTacForHeartbeats` | `TSyntax `tacticSeq` → Bool → TacticM Nat` | Executes a tactic, optionally restoring the tactic state, and returns the number of heartbeats consumed. |
| `variation` | `List Nat → List Nat` | Computes `[min, max, stddev]` of a list of heartbeat counts (as `Nat`s), using floating-point arithmetic internally. |
| `logVariation` | `List Nat → m Unit` (with appropriate monad constraints) | Logs a user-friendly info message summarizing min, max, and standard deviation (in thousands and percent). |
| `elabForHeartbeats` | `TSyntax `command` → Bool → CommandElabM Nat` | Executes a command (with `maxHeartbeats := 0`), optionally restoring the environment state, and returns heartbeat count. |
| `count_heartbeats` (tactic) | Elaborator for `"count_heartbeats " tacticSeq` | Prints the heartbeat count of a single tactic execution. |
| `count_heartbeats!` (tactic) | Elaborator for `"count_heartbeats! " (num)? "in" tacticSeq` | Runs a tactic `n` times (default 10), logs min/max/stddev. |
| `count_heartbeats` (command) | Elaborator for `"count_heartbeats " "in" command` | Measures heartbeat usage of a command, suggests a new `maxHeartbeats` via `"Try this:"` if exceeded. |
| `guard_min_heartbeats` | Elaborator for `"guard_min_heartbeats " (num)? "in" command` | Fails if the command uses fewer heartbeats than a given threshold (default `maxHeartbeats`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `runTacForHeartbeats`, `elabForHeartbeats`: indicate functions that *run* something and *return* heartbeat counts.
  - `count_heartbeats`, `count_heartbeats!`: command/tactic names; `!` variant implies statistical aggregation.
  - `guard_min_heartbeats`: `guard_` prefix signals a *validation* or *assertion* tactic/command.

- **Suffixes**:
  - `ForHeartbeats`: indicates measurement of heartbeat usage.
  - `variation`: statistical summary function.

- **Other patterns**:
  - `revert : Bool := true`: parameter naming for state restoration behavior.
  - `counts` / `elapsed` / `max'`: descriptive variable names for numeric data.

---

#### **3. Tactic & Elaborator Stack**

- **Core Tactics / Meta Functions Used**:
  - `saveState`, `restoreState`, `get`, `set`: for state management.
  - `evalTactic`, `elabCommand`: for tactic/command execution.
  - `IO.getNumHeartbeats`: low-level heartbeat counter.
  - `logInfo`, `logError`: for reporting.
  - `Lean.Meta.Tactic.TryThis.addSuggestion`: for `"Try this:"` suggestions.
  - `quote`, `getRef`, `set_option hygiene false`: for syntax generation and hygiene control.

- **Common Tactics in Elaborators**:
  - `try ... finally`: for cleanup after measurement.
  - `mapM`, `foldl`, `map`: for list processing.
  - `match ... with`: for pattern-matching on syntax/numbers.

- **No heavy tactic automation** (e.g., `aesop`, `linarith`) — this is a *meta-level* tool, not a proof tactic.

---

#### **4. Proof / Execution Logic Flow**

- **Heartbeat Measurement Pattern**:
  1. Save current state (`saveState` / `get`).
  2. Set `maxHeartbeats := 0` to disable early termination.
  3. Execute target tactic/command.
  4. Compute elapsed = `final - initial`.
  5. Restore state if `revert := true`.
  6. Log or compare result.

- **Statistical Aggregation (`count_heartbeats!`)**:
  1. Run `n-1` times with `revert := true`.
  2. Run 1 final time with `revert := false`.
  3. Compute `variation` → `logVariation`.

- **Suggestion Logic (`count_heartbeats in cmd`)**:
  1. If `elapsed ≥ max`, double `max'` until `max' ≥ elapsed`.
  2. Suggest `set_option maxHeartbeats $m in $cmd` via `Try this`.

- **Guard Logic (`guard_min_heartbeats`)**:
  1. Measure `elapsed`.
  2. Fail if `elapsed < n` (via `logInfo`, but no error — *note: currently only logs, does not fail* — may need `fail` for strict guarding).

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean + Mathlib initialization (likely for `Init` + basic utilities). |
| `Lean.Util.Heartbeats` | Provides `IO.getNumHeartbeats`, heartbeat-related utilities. |
| `Lean.Meta.Tactic.TryThis` | Enables `"Try this:"` suggestions (e.g., `addSuggestion`). |

- **No heavy Mathlib imports** — this is a lightweight utility module focused on *measurement*, not mathematical content.

---

### Summary

This module provides **developer-facing tooling** for measuring and reporting Lean’s internal heartbeat counter during tactic/command execution. It supports:
- Single-run heartbeat logging (`count_heartbeats tac`),
- Statistical profiling (`count_heartbeats! n in tac/cmd`),
- Dynamic `maxHeartbeats` suggestion (`count_heartbeats in cmd`),
- Guarding against under-performance (`guard_min_heartbeats`).

Designed for **performance debugging and tuning**, especially for long-running declarations or `simp`-heavy proofs. All logic is *meta-level* (elaborator/tactic), with no reliance on core proof logic.