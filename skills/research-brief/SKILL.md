# Skill: research-brief

## Name
Research Brief Generator

## Description
Given a raw story topic or a Story Vault entry, this skill produces a structured 1-page brief containing the 3 strongest angles, verified primary sources, cross-referenced financial/foreign influence disclosures, and a viability assessment for each angle. Trigger this skill before any script work begins.

**When to trigger:**
- You have a story idea and want to know if it has legs
- You've dropped a news link in the Story Vault and need it fleshed out
- You're picking this week's video topic and need to compare options

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `topic` | Yes | Topic sentence, story idea, or URL of news item |
| `pillar` | No | Which of the 5 pillars this might belong to (helps narrow angle) |
| `angle_priority` | No | "money", "hypocrisy", "buried" — what you care most about |
| `prior_coverage` | No | Any coverage you've already seen (links or summary) |

Example invocation:
```
Topic: The NIH's grant relationship with the EcoHealth Alliance after the pandemic
Pillar: Follow the Money
Angle priority: money
```

---

## Process Steps

1. **Query Story Vault** — check `research/story-vault/` for existing notes on the topic
2. **Web search** — use Brave/Fetch MCP to pull the 5 most recent news hits; note date, outlet, reporter
3. **Primary source hunt** — for every factual claim in step 2, identify the upstream primary document:
   - FARA.gov for foreign lobbying
   - OpenSecrets.org for campaign finance and dark money
   - USASpending.gov for federal grants and contracts
   - FEC.gov for direct campaign contributions
   - PACER / court websites for litigation
   - ProPublica Nonprofit Explorer for 990 filings
   - Congress.gov for legislation, committee hearings, floor votes
4. **Cross-reference** — check if any named entities appear in FARA, OpenSecrets, or USASpending in a relevant way
5. **Angle generation** — identify 3 distinct framings of the story using LMPYOG pillars:
   - Angle A: The buried/underreported frame
   - Angle B: The money/influence frame
   - Angle C: The hypocrisy/contradiction frame
6. **Viability check** — for each angle, assess:
   - Is there a primary source that can be put on screen?
   - Is there a clear villain (institution or public figure, not private citizen)?
   - Is the demonetization risk manageable?
7. **Output brief**

---

## Output Format

```markdown
# Research Brief: [TOPIC]
**Date:** [TODAY]
**Pillar fit:** [PILLAR(S)]
**Recommended angle:** [A / B / C]

---

## What Happened (50 words max)
[Plain-language summary of the story — no editorializing]

---

## Angle A — [Name the angle]
**Pillar:** Didn't Tell You / Follow the Money / Caught Lacking / Receipts
**Hook candidate:** [One sentence, <15 words]
**Primary source:** [Document name + URL]
**Key fact:** [Single most damning verifiable fact]
**Demonetization risk:** 🟢 / 🟡 / 🔴
**Viability:** Strong / Moderate / Weak — [one-line reason]

---

## Angle B — [Name the angle]
[Same structure]

---

## Angle C — [Name the angle]
[Same structure]

---

## Source List
| Source | Type | URL | Accessed |
|---|---|---|---|
| [name] | [FARA/FEC/990/News/Court] | [url] | [date] |

---

## Story Vault Entry
**File:** `research/story-vault/[TOPIC-SLUG].md`
**Status:** Ready for script / Needs more receipts / Pass

---

## Notes
[Anything that doesn't fit above — competing angles, timing considerations, related stories]
```

---

## Assumptions & Guardrails

- If no primary source exists for a claim, mark it **Unverified** — do not include in an angle
- If the only named target is a private citizen, flag and suggest a public figure substitute or drop the angle
- If a story's only source is a single outlet with no corroboration, mark angle viability as **Weak** and note it
- Check FARA.gov by searching the entity name — many relationships are buried in exhibit B filings
- Cross-reference with prior story vault entries before declaring a topic "new"
