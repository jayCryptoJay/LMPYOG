# Skill: script-draft

## Name
Script Draft Generator

## Description
Given a completed Research Brief and a chosen angle, this skill produces a full draft script in the anchor-format template — with placeholder receipts replaced by actual sourced content, demonetization risk flags embedded inline, and a voice-readiness score for each section. This is the first draft, not the final — it gets routed through voice-check before recording.

**When to trigger:**
- Research Brief is complete with a chosen angle
- All 3 receipts have confirmed primary sources
- Demonetization risk for the chosen angle is 🟢 or manageable 🟡

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `brief_path` | Yes | Path to completed research brief in `research/story-vault/` or `research/weekly-briefs/` |
| `angle` | Yes | Which angle from the brief to develop (A, B, or C) |
| `pillar` | Yes | Which content pillar this episode belongs to |
| `target_runtime` | No | Default 9–12 min. Specify if different (e.g., Rapid Fire = 6–8 min) |
| `style_notes` | No | Any specific tone direction for this episode ("go harder on the sarcasm," "keep it more serious") |

Example invocation:
```
Brief: research/weekly-briefs/2026-04-07-ecohealth.md
Angle: B (Follow the Money)
Pillar: Follow the Money
Target runtime: 10 min
Style notes: End the punchline section on a dark joke, not just straight analysis
```

---

## Process Steps

1. **Load brief** — read the brief file, extract the chosen angle's hook candidate, primary source, and key fact
2. **Load voice samples** — read files in `reference/voice-samples/` to calibrate sentence rhythm and vocabulary (flag if no samples exist yet)
3. **Load anchor template** — use `scripts/templates/anchor-format.md` as the structural skeleton
4. **Draft HOOK** — adapt the hook candidate from the brief; test against the <15-word rule; try 3 variants and pick the strongest
5. **Draft STAKES** — write the viewer relevance paragraph; connect the story to something the viewer pays for, votes for, or is affected by
6. **Draft PROOF** — populate all 3 receipts with:
   - Exact quotes or data points from primary sources (not paraphrased)
   - Source attribution labeled for on-screen display
   - Setup and reaction lines per receipt
7. **Draft PUNCHLINE** — write the sarcastic synthesis; must pass the clip test (standalone without context)
8. **Draft CTA** — standard template with next video tease (leave tease blank if unknown)
9. **Inline demonetization scan** — flag every line that creates risk, using this format:
   ```
   [DEMONETIZATION RISK] Line: "[quoted line]" — Reason: [why]. Fix: [alternative]
   ```
10. **Output draft** to `scripts/drafts/[YYYY-MM-DD]-[topic-slug].md`

---

## Output Format

The output is a fully populated version of `scripts/templates/anchor-format.md` with:

```markdown
# DRAFT: [EPISODE TITLE CANDIDATE]
**Date drafted:** [TODAY]
**Brief:** [path to brief]
**Angle:** [A/B/C] — [angle name]
**Pillar:** [PILLAR]
**Estimated runtime:** [X] min at 140 wpm
**Voice check status:** Pending
**Demonetization risk:** 🟢 / 🟡 / 🔴

---

[FULL ANCHOR FORMAT SECTIONS WITH ALL PLACEHOLDERS FILLED]

---

## Demonetization Flags
[ALL FLAGS FROM STEP 9, OR "None identified" if clean]

## Title Candidates
1. [Title option 1]
2. [Title option 2]
3. [Title option 3]

## Hook Variants Considered
1. [Hook A — chosen]
2. [Hook B]
3. [Hook C]

## Notes for Voice Check
[Any lines that feel flat, any sections that need punching up, specific instructions]
```

---

## Quality Criteria

Before outputting, verify:
- [ ] Hook is under 15 words and is a verifiable fact
- [ ] Every claim in PROOF traces to a named primary source in the brief's source list
- [ ] No private citizens named as targets
- [ ] All 3 receipts are distinct — not variations of the same point
- [ ] Punchline passes the clip test (can stand alone)
- [ ] Demonetization flags are present or "None identified" confirmation is explicit
- [ ] Word count matches target runtime (140 wpm × target minutes)

---

## Guardrails

- Never paraphrase quotes from primary sources — use exact verbatim text with attribution
- If a receipt isn't verified, write `[RECEIPT NEEDED: describe what's missing]` rather than fabricating
- If voice samples don't exist yet in `reference/voice-samples/`, note this and draft in a neutral register, flagging for voice-check revision
- Do not editorialize in the PROOF section — reactions should follow evidence, not lead it
