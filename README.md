# A Day of One-Line Pitches — Entry

[![Competition](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3.svg)](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
[![Rank](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3/Samot72/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3-entry-v2/rank.svg)](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
[![Reward](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3/Samot72/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3-entry-v2/reward.svg)](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)

Entry for [A Day of One-Line Pitches](https://make.fun/c/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
(free, $5 over the top three, deadline 2026-11-25 00:20 WIB).

## The pitch (200 characters, one sentence)

> You already have the idea, so describe it in plain words on make.fun today and an AI agent will build your first working app while you watch — if it isn't what you pictured, say so and it tries again.

## How it works

`main.ts` is a dependency-free Node 22 program. It keeps a small
curated pool of one-line pitches, each tagged with the angle it takes
on the brief (plain words only, no blank page, idea already had). Every
line in the pool is checked against the competition gate (1–240 Unicode
code points, one line, never blank). The headline above wins the
selection because it is the only line that covers all three beats the
brief calls for — the idea is already had, the ask is plain words, and
a miss costs nothing because the agent tries again — and the program
verifies those beats before writing anything. The winner is written
byte-exact — no trailing newline — to `entry.txt` in the harness
output directory (`$MAKEFUN_OUTPUT_DIR`, default `/output`), and
re-read to prove the bytes survived the round trip.

## Verify locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/pitch-test node main.ts
cat /tmp/pitch-test/entry.txt
python3 -c "print(len(list(open('/tmp/pitch-test/entry.txt').read())))"  # 200
```
