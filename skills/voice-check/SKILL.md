# Skill: voice-check

## Name
Voice Check — Draft Rewriter

## Description
Given a script draft, this skill identifies lines that are flat, over-written, or out of register with the channel's voice — then rewrites them to match. It uses transcripts in `reference/voice-samples/` as calibration material. The goal is not to homogenize the script but to find the lines that sound like someone else wrote them and make them sound like you.

**When to trigger:**
- Script draft is complete and has passed the demonetization review
- Before recording — this is the last editorial gate before audio
- Anytime a section feels "off" during a read-through

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `script_path` | Yes | Path to the script draft to review |
| `focus_sections` | No | Which sections to prioritize (e.g., "punchline only" or "hook and stakes") |
| `intensity` | No | "light" (flag only the worst offenders), "full" (review every line). Default: full |
| `specific_notes` | No | Any direction from the creator ("the punchline feels too corporate," "stakes section is too passive") |

Example invocation:
```
Script: scripts/drafts/2026-04-10-ecohealth-money.md
Focus: full
Specific notes: The stakes section reads too much like a news broadcast. Make it more personal.
```

---

## Process Steps

1. **Load voice samples** — read all files in `reference/voice-samples/`; if the directory is empty, output a warning and proceed with the LMPYOG voice description from CLAUDE.md
2. **Extract voice fingerprint** — from samples, identify:
   - Average sentence length and rhythm patterns
   - Vocabulary register (formal vs. colloquial, specific words the creator favors)
   - How the creator transitions between evidence and reaction
   - How the creator uses repetition or callback for effect
   - Characteristic openers and closers
   - Where the creator breaks rhythm intentionally for emphasis
3. **Read the full draft** — scan for structural compliance first (is it in anchor format?)
4. **Flag voice problems** — identify lines that exhibit these failure modes:
   - **Broadcast news voice** — passive constructions, hedging language, "officials say," "according to reports"
   - **Over-formal** — vocabulary or syntax that's clearly not how this creator talks
   - **Under-punched** — analytical lines that miss the sarcasm opportunity that the evidence earned
   - **Preamble bloat** — setup sentences that delay the point without adding tension
   - **Cliché** — phrases that every political commentator uses (call them out by name)
   - **Passive voice where active would land harder**
   - **Lost second person** — script drifted from "you" to "people" or "viewers"
5. **Rewrite flagged lines** — provide the original, the diagnosis, and the rewritten version
6. **Score each section** — rate HOOK / STAKES / PROOF / PUNCHLINE / CTA on voice match (1–5)
7. **Read-aloud test** — note any lines that would be physically awkward to say at pace (tongue twisters, breath breaks needed, rhythm breaks)
8. **Output voice-checked draft** to `scripts/drafts/[original-name]-vc.md`

---

## Voice Fingerprint Reference (from CLAUDE.md — used if no samples exist)

Until voice samples are loaded, apply these LMPYOG voice defaults:

**Sentence rhythm:**
- Short declarative sentences after long setups. The contrast is the punch.
- Never three passive constructions in a row.
- Rhetorical questions used sparingly — when used, answer them immediately.

**Vocabulary:**
- Colloquial but not sloppy. Smart but not academic.
- Specific over vague: "forty million dollars" not "significant funding"
- Numbers always spelled out in speech: "forty million" not "$40M" (for the script)

**Transitions:**
- "Here's where it gets good" — transitions to the kicker receipt
- "Let me show you what I mean" — transitions to evidence
- "So let me get this straight" — opens the punchline recap
- These are the creator's transition signatures — use them, don't replace them

**Second person:**
- The viewer is always "you" — not "people," not "Americans," not "viewers"
- Their money, their government, their media

**Sarcasm placement:**
- Sarcasm earns its spot *after* evidence, never before
- The punchline should land as: [evidence recap] → [the absurd logical conclusion] → [the devastating single sentence]

---

## Output Format

```markdown
# Voice Check Report: [SCRIPT TITLE]
**Date:** [TODAY]
**Script:** [path]
**Voice samples loaded:** [YES — N files / NO — using CLAUDE.md defaults]
**Intensity:** [light / full]

---

## Section Scores (Voice Match 1–5)
| Section | Score | Notes |
|---|---|---|
| HOOK | [1–5] | [one line] |
| STAKES | [1–5] | [one line] |
| PROOF — Receipt 1 | [1–5] | [one line] |
| PROOF — Receipt 2 | [1–5] | [one line] |
| PROOF — Receipt 3 | [1–5] | [one line] |
| PUNCHLINE | [1–5] | [one line] |
| CTA | [1–5] | [one line] |
**Overall:** [X/5]

---

## Flagged Lines & Rewrites

### Flag 1
**Section:** [which section]
**Failure mode:** [broadcast voice / over-formal / under-punched / preamble bloat / cliché / passive voice / lost second person]

**Original:**
> "[original line]"

**Diagnosis:** [one sentence on what's wrong]

**Rewrite:**
> "[rewritten line]"

---

[Repeat for each flagged line]

---

## Read-Aloud Notes
[Any lines that are hard to say at pace, need a breath break marked, or have rhythm problems]

## Clip Candidates
[Lines in the punchline section that could be standalone clips — list them]

## Final Notes
[Overall assessment — is this ready to record, or does it need another pass?]
```

---

## Voice-Check Quality Bar

A script is voice-check cleared when:
- [ ] All section scores are 3/5 or higher (HOOK and PUNCHLINE must be 4/5 or higher)
- [ ] No broadcast-voice or passive constructions remain unchallenged
- [ ] Second person is consistent throughout
- [ ] At least one clip candidate identified in the punchline section
- [ ] No read-aloud problems flagged

---

## Guardrails

- Do not rewrite evidence-bearing lines in PROOF — only the setup and reaction lines around them
- Do not change proper nouns, dollar amounts, dates, or direct quotes
- Do not remove sarcasm — amplify it where the evidence has been shown
- If the script has no voice samples to calibrate against, make this explicit in the report and use CLAUDE.md defaults
- Preserve the creator's characteristic transition phrases — do not replace them with alternatives
