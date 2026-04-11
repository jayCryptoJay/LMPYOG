# Voice Samples — Setup Guide

This folder powers the `voice-check` skill. Without content here, that skill operates on the generic LMPYOG voice profile from `.claude/CLAUDE.md` instead of *your actual voice* — which means it'll catch obvious problems but miss the subtle ones.

**The voice-check skill will always tell you if this folder is empty. Filling it should be the first thing you do.**

---

## What Goes Here

Transcripts of yourself talking — not scripts you wrote to be read, but recordings of you actually speaking. The more natural and off-the-cuff, the better. Scripted material teaches Claude your written voice. Unscripted material teaches it how you *actually* talk.

Best sources, in order:
1. Rough takes from previous recordings (including the bad ones you cut)
2. Voice memos you've sent to yourself or collaborators
3. Previous episode recordings transcribed (use Whisper or Otter.ai)
4. Long-form conversations where you're explaining something you care about
5. Previous scripts that you felt were "on" during recording

---

## How to Add a Sample

Create a file in this folder named `sample-[TOPIC-OR-DATE].md` with this format:

```markdown
# Voice Sample: [DESCRIPTION]
**Source:** [rough take / voice memo / episode transcript / etc.]
**Date recorded:** [YYYY-MM-DD]
**Context:** [What were you talking about? One sentence.]
**Transcription method:** [Manual / Whisper / Otter / etc.]

---

[TRANSCRIPT — as verbatim as possible. Include "um," "like," pauses marked as [...], restarts marked as — ]
```

Example filename: `sample-2026-04-08-dark-money-rant.md`

---

## How Many Samples Do You Need

| Samples loaded | Voice-check quality |
|---|---|
| 0 | Generic — catches structure problems, misses voice register |
| 1–2 | Basic — starts to catch vocabulary mismatches |
| 3–5 | Good — catches rhythm problems and overwritten lines |
| 6–10 | Strong — catches subtle register shifts, word choice drift |
| 10+ | Excellent — can flag lines that are almost right but slightly off |

**Target: 5 samples minimum before your first episode. 10 before you rely on voice-check as your final gate.**

---

## What the Skill Learns From These Samples

The voice-check skill reads these transcripts to extract:

1. **Sentence rhythm** — how you vary short and long sentences; where you naturally break for emphasis
2. **Vocabulary register** — which words are "you" and which are "someone writing for you"
3. **Transition style** — how you move between evidence and reaction; your characteristic connecting phrases
4. **Sarcasm signature** — how you deliver irony; the setup-to-landing ratio
5. **Second person consistency** — how naturally you use "you" vs. drifting to "people" or "Americans"
6. **Energy arc** — where your energy peaks in a monologue; what kinds of lines you speed through vs. land deliberately

---

## Privacy Note

These transcripts stay local in this repo and are only used by Claude Code in this session context. They are not uploaded anywhere unless you explicitly share this folder.

---

## Quick Start — If You Have Nothing Yet

If you have zero recordings to pull from, record yourself for 5–10 minutes right now doing this:
- Pick a topic you're passionate about (doesn't have to be a video topic)
- Record yourself explaining it to a friend who doesn't follow politics
- Don't script it — just talk
- Transcribe it (paste into Otter.ai or use `whisper` locally)
- Save it here as `sample-YYYY-MM-DD-unscripted.md`

That single recording will meaningfully improve voice-check output on your first episode.
