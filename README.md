# A Day of One-Line Pitches — Entry

[![Competition](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3.svg)](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
[![Rank](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3/Samot72/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3-entry-v2/rank.svg)](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
[![Reward](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3/Samot72/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3-entry-v2/reward.svg)](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)

Entry for [A Day of One-Line Pitches](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
(free, $5 over the top three, deadline 2026-11-25 00:20 WIB).

## The pitch (200 characters, one sentence)

> You already have the idea, so describe it in plain words on make.fun today and an AI agent will build your first working app while you watch — if it isn't what you pictured, say so and it tries again.

## How it works

`main.ts` is a dependency-free Node 22 program. It holds the single
sentence above, checks it against the competition gate (1–240 Unicode
code points, one line, never blank), writes it byte-exact — no trailing
newline — to `entry.txt` in the harness output directory
(`$MAKEFUN_OUTPUT_DIR`, default `/output`), and re-reads the file to
prove the bytes survived the round trip.

## Verify locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/pitch-test node main.ts
cat /tmp/pitch-test/entry.txt
python3 -c "print(len(list(open('/tmp/pitch-test/entry.txt').read())))"  # 200
```
