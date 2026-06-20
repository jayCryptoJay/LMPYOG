# LMPYOG — Content Calendar & Pillar Rotation

The factory needs a schedule so you're never staring at a blank page on Monday. This is the rotation engine: which pillar runs which week, how the batch flows, and where each episode lives as it moves down the belt.

See `LAUNCH-PLAN.md` for the operating system this calendar plugs into.

---

## The Pillar Rotation

Don't run the same pillar two weeks in a row — variety keeps the channel from feeling like a single-note rant and gives the algorithm different audiences to test you against. A clean 5-week rotation cycles all pillars:

| Week | Pillar | Format | Why this slot |
|---|---|---|---|
| 1 | **Receipts** | Long-form deep-dive (9–12m) | Lead cycles with your strongest document — it sets the "this guy does the work" reputation |
| 2 | **Follow the Money** | Long-form (9–12m) | Dollar-amount hooks have the highest CTR; great for browse/recommendations |
| 3 | **Caught Lacking** | Long-form (9–12m) | The contradiction format clips best — highest share rate on X |
| 4 | **Didn't Tell You** | Long-form (9–12m) | The "you were denied this" frame drives the strongest subscribe intent |
| 5 | **Rapid Fire** | Short-form (6–8m) | Cheapest episode — reuses the week's research, resets you before cycle repeats |

After Week 5, repeat. Adjust the order based on what your Week 8 retrospective (`LAUNCH-PLAN.md` §2) says is performing.

**Breaking-story override:** if a document drops that's too good to wait on, jump the rotation. The buffer (`LAUNCH-PLAN.md` §3) is exactly what gives you permission to do this without dropping your scheduled episode.

---

## Episode Tracker

One row per episode. Move the **Stage** field as it rides the conveyor belt. Keep the buffer column honest — that's the number that keeps you alive.

| # | Target drop | Pillar | Working title | Stage | Buffer after |
|---|---|---|---|---|---|
| 01 | [DATE] | Receipts | [title] | Vault → Brief → Receipts → Draft → Voice → Thumb → **Final** → Published | — |
| 02 | [DATE] | Follow the Money | [title] | | |
| 03 | [DATE] | Caught Lacking | [title] | | |
| 04 | [DATE] | Didn't Tell You | [title] | | |
| 05 | [DATE] | Rapid Fire | [title] | | |

**Stage legend:** `Vault` (idea logged) → `Brief` (research-brief run) → `Receipts` (sources verified) → `Draft` (script-draft run) → `Voice` (voice-check cleared) → `Thumb` (thumbnail-brief sent) → `Final` (locked, recorded) → `Published`.

---

## Clip Tracker

Every long-form spins off 2–3 verticals. Log them so nothing dies in your camera roll.

| Source episode | Clip | Hook line | Platform | Posted |
|---|---|---|---|---|
| 01 | Clip A (the punchline) | [line] | X + Shorts | [ ] |
| 01 | Clip B (the kicker receipt) | [line] | X + Shorts | [ ] |

---

## Story Vault Triage (every Monday)

When you sit down Monday, rank the vault by these three before running `research-brief`:

1. **Strongest primary source** — which story has the most undeniable document on screen?
2. **Cleanest demonetization** — which clears the 🟢/🟡/🔴 gate easiest?
3. **Most timely** — which one is the audience already primed to care about this week?

The winner of all three is this week's episode. The other two stay in the vault for next cycle.

---

*Last updated: 2026-06-20*
