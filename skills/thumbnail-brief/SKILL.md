# Skill: thumbnail-brief

## Name
Thumbnail Brief Generator

## Description
Given a finalized (or near-final) script, this skill generates 3 distinct thumbnail concepts for the animator — each with copy (3–4 words max), avatar expression/pose direction, background composition, text treatment, and the emotional hook the thumbnail should trigger. Output goes directly to the animator as a briefing document.

**When to trigger:**
- Script is in final or late-draft stage
- Episode title has at least 2 finalized candidates
- You have 48–72 hours before scheduled upload (thumbnails need iteration time)

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `script_path` | Yes | Path to the draft or final script |
| `title_candidates` | Yes | 2–3 title options being considered |
| `pillar` | Yes | Which content pillar (affects visual energy and framing) |
| `hook_line` | Yes | The hook line from the script (drives the thumbnail's emotional promise) |
| `channel_style` | No | Any current visual direction notes for the animator |

Example invocation:
```
Script: scripts/final/2026-04-10-ecohealth-money.md
Titles: ["The $40M Trail They Buried on Page 2", "NIH's Dark Money Problem Nobody's Talking About"]
Pillar: Follow the Money
Hook: The NIH sent $40 million to a nonprofit that lied on its federal grant application.
```

---

## Process Steps

1. **Extract emotional core** — identify the single emotion the story should make a viewer feel: betrayal, disgust, shock, vindication, "wait what"
2. **Extract the visual anchor** — what is the most concrete visual element in the story? (a dollar amount, a logo, a name, a document, a location)
3. **Generate Concept A: The Confrontation Frame**
   - Avatar expression: accusatory, leaning in, pointing or gesturing at the subject
   - Background: the institution or public figure being exposed
   - Copy: most damning 3–4 word phrase from the story
   - Color treatment: high contrast, red/black or channel brand palette
4. **Generate Concept B: The Reveal Frame**
   - Avatar expression: reading, pulling back a curtain, or looking at something off-screen
   - Background: the document, filing, or data being revealed
   - Copy: curiosity-driven — leaves a gap the click fills
   - Color treatment: cooler tones, more investigative feel
5. **Generate Concept C: The Reaction Frame**
   - Avatar expression: stunned, disbelieving, or darkly amused
   - Background: minimal — avatar and copy carry the frame
   - Copy: editorial — the punchline version
   - Color treatment: use an unexpected palette to stand out in recommendations feed
6. **Write animator brief** — format each concept with precise direction the animator can execute without a call

---

## Output Format

```markdown
# Thumbnail Brief: [EPISODE TITLE]
**Date:** [TODAY]
**Script:** [path]
**Pillar:** [PILLAR]
**Emotional target:** [betrayal / shock / vindication / "wait what"]
**Visual anchor:** [the most concrete story element]
**Animator turnaround needed:** [date]

---

## Concept A — THE CONFRONTATION
**Intended click trigger:** "Who's getting exposed?"
**Copy (3–4 words MAX):** [COPY]
**Copy placement:** [Top-left / Center / Bottom-right + font weight note]

**Avatar direction:**
- Expression: [specific — e.g., "one eyebrow raised, slight smirk, leaning forward"]
- Pose: [pointing right toward copy / arms crossed / gesturing outward]
- Facing: [toward camera / toward copy / slight 3/4 turn]

**Background:**
- Subject: [logo, building, document, person's official photo]
- Treatment: [blurred / high contrast overlay / color-washed]
- Colors: [specific hex or descriptive — e.g., "deep red #8B0000 with black gradient"]

**Text treatment:**
- Font weight: [Bold / Extra Bold]
- Outline: [yes/no — thick black if yes]
- Drop shadow: [yes/no]

**Notes for animator:** [Anything specific — "make the dollar amount the visual centerpiece," "avatar should look like they caught someone"]

---

## Concept B — THE REVEAL
**Intended click trigger:** "What did they find?"
**Copy (3–4 words MAX):** [COPY]
[Same structure as Concept A]

---

## Concept C — THE REACTION
**Intended click trigger:** "What's the take?"
**Copy (3–4 words MAX):** [COPY]
[Same structure as Concept A]

---

## CTR Prediction Notes
[Which concept is most likely to perform in recommendations vs. search vs. browse — and why]

## Title-Thumbnail Pairing
| Title | Best paired thumbnail concept | Reason |
|---|---|---|
| [Title 1] | Concept [X] | [one line] |
| [Title 2] | Concept [X] | [one line] |

## DO NOT (channel-specific guardrails)
- No fake shocked faces (the avatar is 2D — lean into stylized expression, not mimicry of human shock)
- No clickbait mismatch — thumbnail must match what the video actually delivers
- No red circles or arrows on real people's photos (legal risk)
- Keep copy readable at mobile thumbnail size (test at 168×94px equivalent)
```

---

## Visual Direction Notes by Pillar

| Pillar | Visual Energy | Palette Tendency | Copy Style |
|---|---|---|---|
| Didn't Tell You | Conspiratorial, quiet tension | Muted + one accent | Question or withhold |
| Follow the Money | Transactional, exposé | Green + black + red | Dollar amounts, numbers |
| Caught Lacking | Confrontational, gotcha | High contrast, split screen | Direct quote fragments |
| Rapid Fire | Fast, punchy, dense | Bright, energetic | List format or "X Things" |
| Receipts | Documentary, deliberate | Document textures, beige | "The [Document]" framing |

---

## Guardrails

- All copy must be 3–4 words max — no exceptions. Longer copy fails the 3-second scroll test.
- Never put a private citizen's face, name, or likeness in a thumbnail
- Never use stock photos of real political figures in a way that implies they said or did something they didn't
- If the visual anchor is a document, show the actual document (or a stylized version) — don't fake it
