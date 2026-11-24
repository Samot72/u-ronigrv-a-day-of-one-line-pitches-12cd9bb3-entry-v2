// "You already have the idea" — entry for
// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3 (A Day of One-Line Pitches).
//
// A dependency-free Node 22 program. It keeps a small curated pool of
// one-line pitches, checks every line in the pool against the
// competition gate (1 to 240 Unicode code points, single line, never
// blank), selects the headline pitch as the entry, writes it byte-exact
// to entry.txt inside the harness output directory, and re-reads the
// file to prove the bytes survived the round trip. No trailing newline:
// the file holds exactly the headline sentence, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The headline pitch, written for a friend who has never coded: the
// hard part (the idea) is already done, the ask is just describing it
// in plain words, and the risk is removed — if the first version is
// not what they pictured, they say so and the agent tries again.
const HEADLINE =
  "You already have the idea, so describe it in plain words on make.fun today and an AI agent will build your first working app while you watch — if it isn't what you pictured, say so and it tries again.";

// Supporting pool: earlier drafts and alternate angles on the same
// brief (pitch a non-coder on describing their app idea to an AI
// agent). They are kept in the program so the selection is explicit
// and every candidate is held to the same gate as the winner.
const POOL: readonly string[] = [
  HEADLINE,
  "Tell an AI agent what you want in one plain sentence and watch it turn your idea into a working app you can actually open.",
  "No code, no setup, no blank page: describe the app in your head and an agent builds the first version for you.",
  "Your idea is the hard part and you already have it — say it in plain words and let an agent do the typing.",
];

// Which pool entry is the submission. Kept as a named constant so the
// choice reads as a deliberate pick, not an accident of array order.
const CHOSEN_INDEX = 0;

const MIN_CHARS = 1;
const MAX_CHARS = 240;

function checkPitch(text: string): number {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("pitch must be a single line");
  }
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `pitch must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("pitch must not be blank");
  }
  return chars;
}

function selectPitch(): string {
  // Every line in the pool must pass the gate, not just the winner —
  // a broken alternate is a bug in the entry, not a spare.
  for (const line of POOL) {
    checkPitch(line);
  }
  const chosen = POOL[CHOSEN_INDEX];
  if (chosen !== HEADLINE) {
    throw new Error("selection drifted: chosen pitch is not the headline");
  }
  return chosen;
}

function main(): void {
  const pitch = selectPitch();
  const chars = checkPitch(pitch);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = resolve(outDir, "entry.txt");

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, pitch, "utf8");

  const back = readFileSync(outFile, "utf8");
  if (back !== pitch) {
    throw new Error("round-trip check failed: entry.txt differs from pitch");
  }

  console.log(`wrote ${outFile} (${chars} characters)`);
  console.log(pitch);
}

main();
