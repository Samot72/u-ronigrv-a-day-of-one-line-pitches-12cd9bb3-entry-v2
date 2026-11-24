// "You already have the idea" — entry for
// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3 (A Day of One-Line Pitches).
//
// A dependency-free Node 22 program. It holds one original sentence,
// checks it against the competition gate (1 to 240 Unicode code points,
// single line, never blank), writes it byte-exact to entry.txt inside
// the harness output directory, and re-reads the file to prove the
// bytes survived the round trip. No trailing newline: the file holds
// exactly the sentence, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The pitch, written for a friend who has never coded: the hard part
// (the idea) is already done, the ask is just describing it in plain
// words, and the risk is removed — if the first version is not what
// they pictured, they say so and the agent tries again.
const PITCH =
  "You already have the idea, so describe it in plain words on make.fun today and an AI agent will build your first working app while you watch — if it isn't what you pictured, say so and it tries again.";

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

function main(): void {
  const chars = checkPitch(PITCH);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = resolve(outDir, "entry.txt");

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, PITCH, "utf8");

  const back = readFileSync(outFile, "utf8");
  if (back !== PITCH) {
    throw new Error("round-trip check failed: entry.txt differs from pitch");
  }

  console.log(`wrote ${outFile} (${chars} characters)`);
  console.log(PITCH);
}

main();
