# LMPYOG — Launch & Operating Plan

## How to run this whole thing, starting from zero.

This is the document that turns the repo into a working channel. The `README.md` tells you the *weekly* workflow. This tells you the *whole* system — how to launch, how to grow, and how to keep the machine running without burning out or getting demonetized.

Read this once, top to bottom. Then live in the [First 7 Days](#the-first-7-days-zero-to-scheduled) checklist.

---

## 1. The Core Idea — You're Running a Factory, Not Making Videos

The mistake every commentary channel makes: they treat each video as a fresh act of inspiration. That doesn't scale, and it burns you out by episode six.

LMPYOG is a **factory that converts public documents into sourced, sarcastic, clippable episodes on a predictable cadence.** The repo is the factory floor. Every story rides the same conveyor belt:

```
STORY IDEA  →  RESEARCH BRIEF  →  RECEIPTS PULL  →  SCRIPT DRAFT  →  VOICE CHECK  →  THUMBNAIL BRIEF  →  PUBLISH  →  CLIP
  (vault)        (skill)            (skill)           (skill)          (skill)          (skill)          (templates)  (X/Shorts)
```

Your only job is to keep stories moving down the belt. Inspiration is for the hook line — everything else is a process you already built. The skills in `skills/` are the machines. This plan is the operating manual.

**Three principles the whole system runs on:**

1. **Receipts are the moat.** Anyone can have a take. Almost nobody does the document work. Your competitive advantage is that every claim has a primary source on screen. Protect that — it's the entire brand.
2. **Work a week ahead, always.** You never publish from an empty buffer (see §3). A buffer is what separates a channel from a hobby.
3. **The clip is the ad; the long-form is the asset.** YouTube is where the value lives. X/Shorts clips are how strangers find you. One feeds the other (see §5).

---

## 2. The 90-Day Launch Arc

Don't "start a channel." Run four phases.

### Phase 0 — Foundation (Week 0, before a single upload)
The goal of week 0 is to never need week 0 again. You build assets and a buffer so launch week is pure output.

- [ ] **Lock channel identity** — handle, channel name, banner, the 2D avatar, brand palette (the title/thumbnail palette by pillar is in `skills/thumbnail-brief/SKILL.md`).
- [ ] **Claim the handles** — YouTube + X with the *same* handle. The clip-to-YouTube pipeline depends on people finding the same name in both places.
- [ ] **Record voice samples** — 5–10 minutes of you talking unscripted. Transcribe and drop into `reference/voice-samples/`. This is the single highest-leverage 30 minutes you'll spend — it's what makes `voice-check` sound like *you* and not a generic conservative voiceover. Instructions: `reference/voice-samples/README.md`.
- [ ] **Build the buffer: bank 3 full episodes before you publish ONE.** This is non-negotiable. It's what lets you survive a bad week without breaking cadence.
- [ ] **Pick your slot** — one fixed publish day + time per week. The algorithm and your audience both reward predictability. (Recommended: Thursday or Sunday evening ET — high political-content consumption windows.)
- [ ] **Set up the clip pipeline** — decide your tool for cutting verticals (CapCut, Descript, Opus Clip). You'll cut 2–3 clips per long-form.

### Phase 1 — Launch (Weeks 1–4)
Spend the buffer to make a loud entrance, then hold the line.

- [ ] **Don't trickle — signal life.** Publish your 3 banked episodes across the first 2 weeks, not one-and-done. A channel with 3 videos looks alive; a channel with 1 looks abandoned.
- [ ] **One pillar per episode, rotate** (see `research/CONTENT-CALENDAR.md`). Your first episode should be your strongest receipt — lead with the most undeniable document you have.
- [ ] **Cut 2–3 vertical clips per long-form** and post to X + Shorts. The punchline section of each script is engineered to be the clip (see the "clip test" in the anchor template).
- [ ] **Answer every comment for the first 48 hours.** Early engagement velocity is the strongest signal you can send a new channel. Pin a comment that asks a question to drive replies.
- [ ] **Keep refilling the buffer.** Every week you publish one, you draft one. Never let the buffer hit zero.

### Phase 2 — Cadence (Weeks 5–12)
This is where channels die or compound. The factory loop (§4) becomes muscle memory.

- [ ] **Run the weekly loop** exactly as in §4. Same day every week.
- [ ] **Hold a 2-episode buffer** at all times.
- [ ] **A/B test every title and thumbnail.** Log results in `publishing/title-formulas.md` (the A/B table is already there). After ~8 episodes you'll have real data on which formulas hit for *your* audience.
- [ ] **Week 8 retrospective.** Pull your numbers (§6). Which pillar performed? Which topic? Which thumbnail concept? Double down on the winner — kill or rework the loser.

### Phase 3 — Scale (Month 3+)
Only enter this once Phase 2 is automatic.

- [ ] **Monetize** (see §7) once you cross the YPP threshold.
- [ ] **Add a second weekly slot** — `RAPID FIRE` is the format built for this. It's shorter (6–8 min), pulls from the week's news, and reuses research you already did. It's the cheapest second episode you can make.
- [ ] **Repurpose deeper** — a weekly "Receipts" deep-dive can anchor a newsletter or a members tier later. Don't build it until the cadence is bulletproof.

---

## 3. The Buffer Rule (the one that keeps you alive)

```
Publishing without a buffer is how channels die.

  Minimum to launch:   3 episodes banked
  Steady state:        2 episodes always ahead
  Danger zone:         buffer = 1  → that week, draft TWO
  Never:               buffer = 0  → you're now making decisions while panicking
```

A buffer isn't a luxury — it's what lets you skip a bad week, chase a breaking story without dropping your scheduled drop, and edit calmly instead of shipping garbage at 2am. The whole factory exists to protect the buffer.

---

## 4. The Weekly Factory Loop

This is the `README.md` Monday–Friday workflow, restated as the recurring heartbeat. You're always working on *next week's* episode while *this week's* publishes itself from the buffer.

| Day | Stage | Action | Tool |
|---|---|---|---|
| **Mon** | Select | Triage `research/story-vault/`. Run `research-brief` on your top 3. Pick the winner: strongest primary source × cleanest demonetization × most timely. | `skills/research-brief` |
| **Tue** | Verify | Run `receipts-pull` on all 3 receipts. Save to `research/primary-docs/`. Save the brief to `research/weekly-briefs/`. No primary source = cut the claim. | `skills/receipts-pull` |
| **Wed** | Write | Run `script-draft` → read aloud → run `voice-check` → resolve every demonetization flag. Save to `scripts/drafts/`. | `skills/script-draft`, `skills/voice-check` |
| **Thu** | Produce | Run `thumbnail-brief` → send to animator. Record audio from the locked script. Move script to `scripts/final/`. | `skills/thumbnail-brief` |
| **Fri** | Publish & Clip | Finalize title (`publishing/title-formulas.md`) + description (`publishing/description-template.md`). Schedule the drop. Cut 2–3 clips for X/Shorts. | `publishing/` templates |

**The discipline:** the demonetization checklist in `scripts/templates/anchor-format.md` is a hard gate, not a suggestion. Every script gets a 🟢/🟡/🔴 rating before it leaves Wednesday. 🔴 never records.

---

## 5. The Growth Flywheel

```
        ┌─────────────────────────────────────────────┐
        │                                             │
        ▼                                             │
  CLIPS on X / Shorts  ──── strangers discover you ───┘
   (the punchline,                                     ▲
    60–90 sec, sourced)                                │
        │                                              │
        │  "wait, he showed the actual document"       │
        ▼                                              │
  LONG-FORM on YouTube  ──── builds trust + watch time │
   (the full receipts,                                 │
    9–12 min)                                          │
        │                                              │
        └──── subscribers + the receipts moat ─────────┘
```

- **The clip is the hook.** It earns the click with the punchline and the on-screen document. It should always end on a reason to go watch the full breakdown.
- **The long-form is the trust-builder.** This is where you show all three receipts and earn the subscribe.
- **The receipts are why it compounds.** Take-merchants are a commodity. "He reads the FARA filing so you don't have to" is a position nobody can copy without doing the work.

Every long-form must produce clips the same day it's cut. The clip pipeline is not optional — it's your only free distribution.

---

## 6. Metrics That Actually Matter

Ignore raw view counts — they're vanity and they'll wreck your judgment. Track these instead, in your weekly review:

| Metric | Why it matters | Healthy signal |
|---|---|---|
| **CTR (click-through rate)** | Tests your title + thumbnail, the two things you control most. | 4%+ early, 6%+ as you find your audience |
| **Avg view duration / %** | Tests whether the script holds. The hook and stakes sections live or die here. | 40%+ on a 10-min video |
| **First-48h retention curve** | Where do people drop? That's a script note for next time. | No cliff before 0:45 (the hook→stakes handoff) |
| **Clip → channel conversion** | Are clips actually sending people to YouTube? | Clips driving profile visits + sub lift |
| **Returning viewers** | The only real measure of a *channel* vs. a viral fluke. | Climbing month over month |

Log title/thumbnail A/B results in `publishing/title-formulas.md`. After 8 episodes, the data tells you which pillars and formulas to lean into.

---

## 7. Monetization Path (don't rush it)

1. **YouTube Partner Program** — the baseline. Threshold: 1,000 subs + 4,000 watch hours, *or* 1,000 subs + 10M Shorts views in 90 days. Clips help you hit the Shorts path fast; long-form builds the watch hours. Don't change content to chase it — the buffer + cadence get you there.
2. **Demonetization discipline IS monetization.** A 🟢 ad-friendly rating on every episode is worth more than any growth hack. One careless line that trips "harmful or dangerous content" can yellow-flag a whole channel. The QA gate in §4 protects your revenue directly.
3. **Beyond ads (Month 3+ only):** the `RECEIPTS` deep-dives are your premium asset — they're the natural anchor for a members tier, a Locals community, X subscriptions, or a paid newsletter. Build it *after* cadence is automatic, never before.

---

## 8. The First 7 Days (zero to scheduled)

Your literal starting-from-scratch checklist. Don't read more strategy — do these.

- **Day 1 — Identity.** Lock the channel name/handle on YouTube + X (same handle). Commission or set the 2D avatar. Pick your brand palette and weekly publish slot.
- **Day 2 — Voice.** Record 5–10 min of yourself talking unscripted about something you're fired up about. Transcribe it, save to `reference/voice-samples/`. Drop 5 story ideas into `research/story-vault/` (use the seed example there as a template).
- **Day 3 — Brief.** Run `research-brief` on your 3 strongest ideas. Pick episode 1: lead with your most undeniable document.
- **Day 4 — Receipts.** Run `receipts-pull` on every claim. Anything without a primary source gets cut. Save the brief to `research/weekly-briefs/`.
- **Day 5 — Script.** Run `script-draft` → read aloud → `voice-check` → clear all demonetization flags. Lock it.
- **Day 6 — Produce.** Run `thumbnail-brief`, send to animator. Record audio. Finalize title + description from the `publishing/` templates.
- **Day 7 — Don't publish yet.** Start episode 2. You're building the buffer (§3). Publish only once you have 3 banked. Then launch loud (Phase 1).

---

## 9. The Non-Negotiables (pin these above your desk)

1. **No receipt, no claim.** If you don't have the document, you don't have the story.
2. **Punch up, never down.** Public figures and institutions only. Never a private citizen.
3. **Sarcasm comes after the proof, never before.** Show the evidence, *then* land the joke.
4. **Every script clears the 🟢/🟡/🔴 gate before it records.** 🔴 never ships.
5. **Protect the buffer.** Everything else is downstream of cadence.
6. **The clip ends on a reason to watch the full thing.** Always.

---

*The repo is the factory. This plan is the operating manual. The skills are the machines. Go put 'em on game.*

*Last updated: 2026-06-20*
