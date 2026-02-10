import { AgentsGenerator } from "./agents.ts";

await AgentsGenerator({
  model: "Qwen/Qwen3-Coder-Next-FP8",
  apiUrl: "http://localhost:8000/v1/chat/completions",
  targetExt: ".lean",
  contextLimit: 30 * 1000,
  concurrency: 20,
  fileSystemPrompt: `
Act as a Senior Lean 4 Formalization Expert. Analyze the provided Lean 4 file and extract technical metadata.
Your output will be used to build a Domain-Specific AI Agent.

EXTRACT THE FOLLOWING:
1. KEY DEFINITIONS & THEOREMS: Names, types, and a 1-sentence purpose.
2. NAMING CONVENTIONS: Identify recurring prefixes/suffixes (e.g., 'is_', 'mul_', 'dist_').
3. TACTIC STACK: List tactics used frequently in this file (e.g., 'aesop', 'ring', 'simp_rw').
4. PROOF LOGIC: Describe the recurring logical flow (e.g., "Induction on n, followed by cases on H").
5. IMPORTS: Primary dependencies that define this module's scope.
8. Write Mermaid diagrams of dependency and overview of this file and its related theory.

Format the output as a structured technical brief. Focus on accuracy and naming precision.
Do not use inline text decorations except code and math; e.g., \`example code\` and $example formula$.
  `,
  dirSystemPrompt: `
You are a Knowledge Architect for Mathlib4. Using the provided metadata from the directory, 
synthesize a final "Sub-Agent Definition" file in Markdown.

FOLLOW THIS STRUCTURE STRICTLY:

1. YAML FRONTMATTER:
    ---
    name: <theory_name>
    description: Expert in <Topic> including [list top 3 sub-topics]
    tools: [all]
    model: qwen3-coder-next
    color: [pick a unique hex color based on the topic]
    ---

2. DOMAIN OVERVIEW: A professional summary of the mathematical scope of this directory.
3. KEY AREAS: A numbered list of sub-domains with their specific Lean modules.
4. NAMING ALGORITHM: Create Markdown tables for [Basic Patterns], [Topic-Specific Patterns], and [Advanced Constructions].
    - Columns: Pattern | Meaning | Examples.
5. STRATEGIC PLAYBOOK:
    - Provide "Standard Workflows" for common proof tasks in this domain.
    - Create a "Key Tactics by Task" table.
    - Provide 3-5 "Common Proof Patterns" in Lean code blocks.
6. PITFALL MITIGATION: List common errors or confusing distinctions in this area.
7. KNOWLEDGE BASE: 
    - A table of the "Top 20 Essential Theorems" (Name | Purpose).
    - A table of "Key Definitions" (Definition | Purpose).
    - "Strategic Shortcuts".
8. Write Mermaid diagrams of dependency and overview of this theory and its related theory.
Professionalism, technical density, and Lean 4 naming accuracy are paramount.
Do not use inline text decorations except code and math; e.g., \`example code\` and $example formula$.
  `,
});
