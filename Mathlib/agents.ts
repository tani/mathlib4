/**
 * @fileoverview Agents Generator - Coding Standards:
 * 1. Documentation: Use full TSDoc for all functions and interfaces.
 * 2. Type Safety: No 'any' keyword allowed. Use 'unknown' or specific types.
 * 3. Language: All comments and documentation must be in English.
 * 4. Complexity: Keep functions under 100 lines.
 * 5. Iteration: Provide descriptive comments for all loops explaining their intent.
 * 6. Environment: Target ES2024 and latest TypeScript.
 * 7. Dependencies: Restrict imports to the 'node:*' namespace only.
 * 8. License: Keep the license term
 * 9. Do not remove comments
 */

import { glob, readFile, writeFile, stat, readdir } from 'node:fs/promises';
import * as path from 'node:path';
import { styleText } from 'node:util';

/**
 * Configuration options for the Agents Generator.
 */
export interface AgentsGeneratorOptions {
  model: string;
  apiUrl: string;
  apiKey: string;
  concurrency: number;
  targetExt: string;
  ignoreDirs: string[];
  maxRetries: number;
  contextLimit: number;
  fileSystemPrompt: string;
  dirSystemPrompt: string;
}

/** @internal Default configuration values for Agents Generator */
const DEFAULT_CONFIG: AgentsGeneratorOptions = {
  model: 'Qwen/Qwen3-Coder-Next-FP8',
  apiUrl: 'http://localhost:8888/v1/chat/completions',
  apiKey: 'token-unused',
  concurrency: 10,
  targetExt: '.lean',
  ignoreDirs: ['node_modules', 'dist', 'build', 'target', 'vendor', 'out'],
  maxRetries: 3,
  contextLimit: 30000,
  fileSystemPrompt: 'Senior Architect. Output technical insights in ASCII Markdown.',
  dirSystemPrompt: 'Synthesize metadata into ASCII Markdown.'
};

interface LLMResponse {
  choices: Array<{ message: { content: string } }>;
}

interface UiSnapshot {
  phase: string;
  current: number;
  total: number;
  start: number;
  item: string;
  etcDone: number;
  etcRemaining: number;
}

interface Failure {
  file: string;
  error: string;
}

interface FileWorkPlan {
  allFiles: string[];
  workFiles: string[];
  skippedFiles: string[];
}

const truncate = (str: string, n: number): string =>
  str.length > n ? `${str.slice(0, n - 3)}...` : str.padEnd(n);

function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '---';
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);
  return `${h}h ${m}m ${s}s`;
}

function updateUI(
  phase: string,
  current: number,
  total: number,
  start: number,
  itemName: string,
  etcDone: number,
  etcRemaining: number
): void {
  const cols = process.stdout.columns || 80;
  const spinner = ['|', '/', '-', '\\'][Math.floor(Date.now() / 1000) % 4] ?? '|';
  const elapsedMs = Date.now() - start;
  const elapsed = formatDuration(elapsedMs);
  const etc = etcDone > 0 && etcRemaining > 0 ? formatDuration((elapsedMs / etcDone) * etcRemaining) : '---';
  const pct = total > 0 ? ((current / total) * 100).toFixed(1) : '0.0';
  const stats = ` [${phase}] ${pct}% (${current}/${total}) | ELAPSED: ${elapsed} | ETC: ${etc}`;
  const remaining = cols - stats.length - 10;
  const displayName = truncate(itemName, Math.max(10, remaining));
  process.stdout.write(`\r ${spinner}${stats} | ${styleText('dim', displayName)} `);
}

function tryUnrefTimer(timer: ReturnType<typeof setInterval>): void {
  const t = timer as unknown as { unref?: () => void };
  if (typeof t.unref === 'function') t.unref();
}

function startUiTicker(getSnapshot: () => UiSnapshot): () => void {
  const timer = setInterval(() => {
    const s = getSnapshot();
    updateUI(s.phase, s.current, s.total, s.start, s.item, s.etcDone, s.etcRemaining);
  }, 1000);
  tryUnrefTimer(timer);
  return () => clearInterval(timer);
}

function formatActiveItems(items: string[], maxItems: number): string {
  if (items.length === 0) return '[0]';
  const shown = items.slice(0, Math.max(1, maxItems));
  const names = shown.map(p => path.basename(p));
  const suffix = items.length > shown.length ? `, ...(+${items.length - shown.length})` : '';
  return `[${items.length}] ${names.join(', ')}${suffix}`;
}

async function writeIfChanged(target: string, next: string): Promise<void> {
  try {
    const cur = await readFile(target, 'utf-8');
    if (cur === next) return;
  } catch {
    // Proceed to write
  }
  await writeFile(target, next);
}

function extractLLMContent(data: unknown): string {
  if (typeof data !== 'object' || data === null) return '';
  const rec = data as Record<string, unknown>;
  const choices = rec.choices;
  if (!Array.isArray(choices) || choices.length === 0) return '';
  const first = choices[0];
  if (typeof first !== 'object' || first === null) return '';
  const firstRec = first as Record<string, unknown>;
  const msg = firstRec.message;
  if (typeof msg !== 'object' || msg === null) return '';
  const msgRec = msg as Record<string, unknown>;
  const content = msgRec.content;
  return typeof content === 'string' ? content : '';
}

async function fetchLLM(sys: string, usr: string, cfg: AgentsGeneratorOptions, retry = 0): Promise<string> {
  try {
    const res = await fetch(cfg.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.apiKey}` },
      body: JSON.stringify({
        model: cfg.model,
        messages: [{ role: 'system', content: sys }, { role: 'user', content: usr.slice(0, cfg.contextLimit) }],
        temperature: 0.1
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as unknown;
    const content = extractLLMContent(data);
    if (!content.trim()) throw new Error('Empty completion content');
    return content;
  } catch (err: unknown) {
    if (retry < cfg.maxRetries) {
      await new Promise<void>(r => setTimeout(r, 2 ** retry * 1000));
      return fetchLLM(sys, usr, cfg, retry + 1);
    }
    throw err instanceof Error ? err : new Error(String(err));
  }
}

async function shouldRegenerate(source: string, target: string): Promise<boolean> {
  try {
    const [s, t] = await Promise.all([stat(source), stat(target).catch(() => null)]);
    if (!t || t.size === 0) return true;
    return s.mtimeMs > t.mtimeMs;
  } catch {
    return true;
  }
}

async function runWithConcurrency(tasks: Array<() => Promise<void>>, limit: number): Promise<void> {
  const executing = new Set<Promise<void>>();
  for (const task of tasks) {
    let p: Promise<void>;
    p = task().finally(() => executing.delete(p));
    executing.add(p);
    if (executing.size >= limit) await Promise.race(executing);
  }
  await Promise.all(executing);
}

function normalizeDir(d: string): string {
  const norm = path.normalize(d);
  return norm === '' ? '.' : norm;
}

function buildConfig(userOptions: Partial<AgentsGeneratorOptions>): AgentsGeneratorOptions {
  return { ...DEFAULT_CONFIG, ...userOptions };
}

function createIsExcluded(cfg: AgentsGeneratorOptions): (p: string) => boolean {
  return (p: string): boolean =>
    p.split(path.sep).some(part => cfg.ignoreDirs.includes(part) || (part.startsWith('.') && part.length > 1));
}

async function collectTargetFiles(cfg: AgentsGeneratorOptions, isExcluded: (p: string) => boolean): Promise<string[]> {
  const allFiles: string[] = [];
  for await (const f of glob(`**/*${cfg.targetExt}`, { cwd: process.cwd() })) {
    if (!isExcluded(f)) allFiles.push(f);
  }
  return allFiles;
}

/**
 * Gets the output path by replacing the target extension with .agents.md.
 */
function getOutPath(filePath: string, ext: string): string {
  return `${filePath.slice(0, -ext.length)}.agents.md`;
}

async function createFileWorkPlan(files: string[], cfg: AgentsGeneratorOptions): Promise<FileWorkPlan> {
  const workFiles: string[] = [];
  const skippedFiles: string[] = [];
  // Loop through all files to check timestamps for regeneration need.
  for (const f of files) {
    const out = getOutPath(f, cfg.targetExt);
    if (await shouldRegenerate(f, out)) {
      workFiles.push(f);
    } else {
      skippedFiles.push(f);
    }
  }
  return { allFiles: files, workFiles, skippedFiles };
}

async function generateFileOutput(filePath: string, cfg: AgentsGeneratorOptions): Promise<void> {
  const out = getOutPath(filePath, cfg.targetExt);
  const content = await readFile(filePath, 'utf-8');
  const res = await fetchLLM(cfg.fileSystemPrompt, `Source: ${path.basename(filePath)}\n\n${content}`, cfg);
  await writeIfChanged(out, `${res.trim()}\n`);
}

async function runFilesPhase(plan: FileWorkPlan, cfg: AgentsGeneratorOptions, failures: Failure[], start: number): Promise<void> {
  const active: string[] = [];
  const totalAll = plan.allFiles.length;
  const totalWork = plan.workFiles.length;
  let doneAll = plan.skippedFiles.length;
  let doneWork = 0;

  const stopTicker = startUiTicker(() => ({
    phase: 'FILES',
    current: Math.min(totalAll, doneAll + active.length),
    total: totalAll,
    start,
    item: formatActiveItems(active, Math.max(1, cfg.concurrency)),
    etcDone: doneWork,
    etcRemaining: Math.max(0, totalWork - (doneWork + active.length))
  }));

  const tasks = plan.workFiles.map(f => async () => {
    active.push(f);
    try {
      await generateFileOutput(f, cfg);
      doneWork += 1;
    } catch (e: unknown) {
      failures.push({ file: f, error: e instanceof Error ? e.message : String(e) });
    } finally {
      const idx = active.indexOf(f);
      if (idx >= 0) active.splice(idx, 1);
      doneAll += 1;
    }
  });

  try {
    await runWithConcurrency(tasks, cfg.concurrency);
  } finally {
    stopTicker();
  }
}

async function collectDirs(isExcluded: (p: string) => boolean): Promise<string[]> {
  const dirs: string[] = [];
  for await (const d of glob('**/', { cwd: process.cwd() })) {
    if (!isExcluded(d)) dirs.push(normalizeDir(d));
  }
  dirs.sort((a, b) => b.split(path.sep).length - a.split(path.sep).length);
  return dirs;
}

async function buildDirContext(docPaths: string[]): Promise<string> {
  const chunks = await Promise.all(
    docPaths.map(async p => `### SRC: ${path.basename(p)}\n${await readFile(p, 'utf-8')}\n---\n`)
  );
  return chunks.join('');
}

async function shouldRegenerateDir(outPath: string, docPaths: string[]): Promise<boolean> {
  const stats = await Promise.all(docPaths.map(p => stat(p)));
  const latest = Math.max(...stats.map(s => s.mtimeMs));
  const current = await stat(outPath).catch(() => null);
  if (!current || current.size === 0) return true;
  return latest > current.mtimeMs;
}

async function synthesizeOneDir(dir: string, cfg: AgentsGeneratorOptions): Promise<void> {
  const entries = await readdir(dir);
  const docs = entries.filter(f => f.endsWith('.agents.md') && f !== 'AGENTS.md');
  if (docs.length === 0) return;

  const outPath = path.join(dir, 'AGENTS.md');
  const docPaths = docs.map(f => path.join(dir, f));
  if (!(await shouldRegenerateDir(outPath, docPaths))) return;

  const ctx = await buildDirContext(docPaths);
  const res = await fetchLLM(cfg.dirSystemPrompt, `Dir: ${path.basename(dir) || 'Root'}\n\n${ctx}`, cfg);
  await writeIfChanged(outPath, `${res.trim()}\n`);
}

async function runDirsPhase(dirs: string[], cfg: AgentsGeneratorOptions, failures: Failure[], start: number): Promise<void> {
  let done = 0;
  let currentDir = 'Root';

  const stopTicker = startUiTicker(() => ({
    phase: 'DIRS ',
    current: done,
    total: dirs.length,
    start,
    item: currentDir === 'Root' ? 'Root' : path.basename(currentDir),
    etcDone: done,
    etcRemaining: Math.max(0, dirs.length - done)
  }));

  try {
    // Process each directory to synthesize AGENTS.md
    for (let i = 0; i < dirs.length; i++) {
      const d = normalizeDir(dirs[i] ?? '.');
      currentDir = d === '.' ? 'Root' : d;
      try {
        await synthesizeOneDir(d, cfg);
      } catch (e: unknown) {
        failures.push({ file: `DIR:${d}`, error: e instanceof Error ? e.message : String(e) });
      } finally {
        done = i + 1;
      }
    }
  } finally {
    stopTicker();
  }
}

function reportFailures(failures: Failure[]): void {
  if (failures.length === 0) return;
  console.log('\n\n--- WARN: Some items failed ---\n');
  for (const f of failures) console.log(`- ${f.file}: ${f.error}`);
}

export async function AgentsGenerator(userOptions: Partial<AgentsGeneratorOptions> = {}): Promise<void> {
  const config = buildConfig(userOptions);
  const start = Date.now();
  console.log(styleText('bold', '\n--- Agents Generator: Code-to-ASCII ---\n'));

  const isExcluded = createIsExcluded(config);
  const failures: Failure[] = [];
  const allFiles = await collectTargetFiles(config, isExcluded);

  // Determine work plan based on timestamp comparison
  const plan = await createFileWorkPlan(allFiles, config);
  await runFilesPhase(plan, config, failures, start);

  console.log('\n\n--- PHASE 2: Synthesizing AGENTS.md ---\n');
  const dirs = await collectDirs(isExcluded);
  await runDirsPhase(dirs, config, failures, start);

  reportFailures(failures);
  console.log(`\n\n--- Done! Total Time: ${formatDuration(Date.now() - start)} ---\n`);
}
