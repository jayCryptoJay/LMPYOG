# LMPYOG — Let Me Put You On Game
## Channel Operations Repo

Conservative-leaning commentary channel exposing fake news, dark money, political hypocrisy, and foreign influence — with receipts. 2D animated avatar. Raw voice. No apology.

---

## Quick Start

**Full operating context:** `.claude/CLAUDE.md`
**Script template:** `scripts/templates/anchor-format.md`

---

## Weekly Workflow

### Monday — Story Selection
1. Drop story ideas and news links into `research/story-vault/` as `.md` files
2. Run `skills/research-brief` on your top 3 candidates
3. Pick this week's topic based on: strongest primary source + highest demonetization clearance + most timely

### Tuesday — Receipts & Research
1. Run `skills/receipts-pull` on every claim in the chosen brief
2. Verify all 3 receipts are saved in `research/primary-docs/`
3. Update the story vault entry with the confirmed sources
4. Save the completed brief to `research/weekly-briefs/YYYY-MM-DD-[slug].md`

### Wednesday — Script
1. Run `skills/script-draft` on the verified brief
2. Read the draft out loud — mark anything that feels off
3. Run `skills/voice-check` on the draft
4. Review all demonetization flags and resolve them
5. Save final draft to `scripts/drafts/`

### Thursday — Production Prep
1. Run `skills/thumbnail-brief` on the final script
2. Send thumbnail brief to the animator
3. Record audio from the voice-checked script
4. Move finalized script to `scripts/final/`

### Friday — Publishing
1. Finalize title using formulas in `publishing/title-formulas.md`
2. Write description using `publishing/description-template.md`
3. Add cards, end screen, chapters
4. Schedule or publish

---

## Directory Reference

```
lmpyog/
├── .claude/
│   └── CLAUDE.md              # Full operating context for Claude
├── research/
│   ├── story-vault/           # Raw story ideas, news links, initial notes
│   ├── primary-docs/          # Verified primary source receipts (saved by receipts-pull)
│   └── weekly-briefs/         # Completed research briefs, one per episode
├── scripts/
│   ├── templates/
│   │   └── anchor-format.md   # Master script template
│   ├── drafts/                # In-progress and voice-checked drafts
│   └── final/                 # Locked scripts (recorded from these)
├── thumbnails/
│   ├── assets/                # Source assets for thumbnails (logos, docs, etc.)
│   └── outputs/               # Delivered thumbnail files from animator
├── publishing/
│   ├── title-formulas.md      # Title patterns and A/B test log
│   └── description-template.md # YouTube description template
├── skills/
│   ├── research-brief/SKILL.md    # Story research + angle generation
│   ├── script-draft/SKILL.md      # Full draft generator from brief
│   ├── thumbnail-brief/SKILL.md   # 3 thumbnail concepts for animator
│   ├── receipts-pull/SKILL.md     # Primary source verification + saving
│   └── voice-check/SKILL.md       # Voice calibration + line rewrites
└── reference/
    ├── voice-samples/         # Your transcripts (calibrates voice-check skill)
    └── competitor-teardowns/  # Analysis of what's working in the space
```

---

## The 5 Content Pillars

| Pillar | Format | Hook style |
|---|---|---|
| Didn't Tell You | Long-form | The buried fact |
| Follow the Money | Long-form | The dollar amount |
| Caught Lacking | Long-form | The direct contradiction |
| Rapid Fire | Short-form (6–8 min) | List format |
| Receipts | Long-form deep-dive | The document |

---

## Tools

| Tool | Primary use in this workflow |
|---|---|
| Claude Code | Research briefs, script drafts, voice check, receipts pull |
| Gemini Advanced | Long PDF analysis (FARA exhibits, 990s, court filings) |
| ChatGPT Plus | Alternative title/thumbnail angle generation |
| Notion | Editorial calendar, episode pipeline status |

---

## First Thing To Do

1. Add your voice sample transcripts to `reference/voice-samples/` (5–10 min of your own material)
2. Drop your first story idea into `research/story-vault/`
3. Run the research-brief skill on it

See `reference/voice-samples/README.md` for instructions on the voice samples.

---

*Repo initialized: 2026-04-10*
