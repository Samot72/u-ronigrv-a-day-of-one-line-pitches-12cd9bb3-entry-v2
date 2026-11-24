// "You already have the idea" — entry for
// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3 (A Day of One-Line Pitches).
//
// A dependency-free Node 22 program. It keeps a small curated pool of
// one-line pitches, each tagged with the angle it takes on the brief.
// Every line in the pool is checked against the competition gate
// (1 to 240 Unicode code points, single line, never blank), and the
// headline pitch is selected only if it covers all three beats the
// brief calls for: the idea is already had, the ask is plain words,
// and a miss costs nothing because the agent tries again. The winner
// is written byte-exact to entry.txt inside the harness output
// directory and re-read to prove the bytes survived the round trip.
// No trailing newline: the file holds exactly the headline sentence.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The headline pitch, written for a friend who has never coded: the
// hard part (the idea) is already done, the ask is just describing it
// in plain words, and the risk is removed — if the first version is
// not what they pictured, they say so and the agent tries again.
const HEADLINE =
  "You already have the idea, so describe it in plain words on make.fun today and an AI agent will build your first working app while you watch — if it isn't what you pictured, say so and it tries again.";

interface PoolEntry {
  angle: string;
  line: string;
}

// Supporting pool: earlier drafts and alternate angles on the same
// brief (pitch a non-coder on describing their app idea to an AI
// agent). Each one leans on a single beat; the headline is the only
// line that carries all three, which is why it wins the selection.
const POOL: readonly PoolEntry[] = [
  { angle: "all three beats", line: HEADLINE },
  {
    angle: "plain words only",
    line: "Tell an AI agent what you want in one plain sentence and watch it turn the idea in your head into a working app you can actually open.",
  },
  {
    angle: "no blank page",
    line: "No code, no setup, no blank page staring back: describe the app you keep picturing and an agent builds the first version for you.",
  },
  {
    angle: "idea already had",
    line: "The hard part of an app is the idea, and you already have it — say it out loud in plain words and let an agent do the typing.",
  },
];

// The three beats the winning pitch has to hit, as fragments that must
// appear in the selected line.
const REQUIRED_BEATS: readonly string[] = ["idea", "plain words", "tries again"];

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
  for (const entry of POOL) {
    checkPitch(entry.line);
  }
  const winner = POOL.find((entry) => entry.line === HEADLINE);
  if (winner === undefined) {
    throw new Error("selection drifted: headline is not in the pool");
  }
  for (const beat of REQUIRED_BEATS) {
    if (!winner.line.includes(beat)) {
      throw new Error(`selection drifted: headline misses beat "${beat}"`);
    }
  }
  return winner.line;
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
