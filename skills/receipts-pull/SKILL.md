# Skill: receipts-pull

## Name
Receipts Pull — Primary Source Hunter

## Description
Given a specific claim made in a research brief or script draft, this skill hunts the authoritative primary source document that proves the claim, saves it with a structured citation to `research/primary-docs/`, and returns a receipt entry ready to paste into a script. If the claim cannot be verified with a primary source, the skill says so — clearly — rather than finding a secondary source and calling it verified.

**When to trigger:**
- A research brief has an angle but the primary source is listed as TBD
- A script draft has `[RECEIPT NEEDED]` placeholder
- You want to verify a specific claim before recording
- You're stress-testing a brief before investing script time

---

## Inputs

| Input | Required | Description |
|---|---|---|
| `claim` | Yes | The specific factual claim to verify, verbatim |
| `context` | No | Topic/story context (helps narrow search) |
| `source_hint` | No | Any lead on where the source might be (e.g., "NIH grant database," "FARA filing for [entity]") |
| `output_slug` | No | Filename slug for saving the receipt (defaults to auto-generated from claim) |

Example invocation:
```
Claim: "EcoHealth Alliance received $3.1 million in NIH grants between 2014 and 2019"
Context: NIH / EcoHealth / grant funding investigation
Source hint: USASpending.gov, NIH Reporter
Output slug: ecohealth-nih-grants-2014-2019
```

---

## Process Steps

1. **Parse the claim** — identify:
   - The named entity (who did the thing)
   - The action or amount (what they did)
   - The timeframe (when)
   - The jurisdiction or database most likely to hold this record

2. **Select the right database** — use this routing logic:
   | Claim type | Primary source to check first |
   |---|---|
   | Federal grant or contract | USASpending.gov → NIH Reporter → Grants.gov |
   | Foreign lobbying / foreign agent | FARA.gov → DOJ FARA database search |
   | Campaign contribution | FEC.gov → OpenSecrets.org |
   | Dark money / 501(c)(4) | ProPublica Nonprofit Explorer → IRS 990 filings |
   | Congressional vote or statement | Congress.gov → C-SPAN archive |
   | Court filing or judgment | PACER.gov → CourtListener (free) → state court portals |
   | Federal regulation or rulemaking | Federal Register → Regulations.gov |
   | Inspector General report | agency IG website → OIG.gov |
   | Government contract | USASpending.gov → SAM.gov |
   | State-level lobbying | state ethics commission or lobbying disclosure portal |

3. **Execute search** — query the identified database using Fetch MCP or Brave Search MCP; search by entity name, grant number, filing ID, or case number as appropriate

4. **Locate the specific record** — find the document (not a news article about the document) that contains the claim

5. **Extract the verbatim evidence** — pull the exact line, figure, or passage that proves the claim; note page number, section, or field name

6. **Cross-check against the claim** — verify that what the source actually says matches what the claim asserts; flag any discrepancy

7. **Save the receipt** — create a structured receipt file in `research/primary-docs/`

8. **Return receipt entry** — formatted and ready to paste into the script's PROOF section

---

## Output — Receipt File

Saved to: `research/primary-docs/[output-slug].md`

```markdown
# Receipt: [CLAIM SUMMARY]
**Saved:** [DATE]
**Claim verified:** [YES / NO / PARTIAL — explain if partial or no]

---

## The Claim
> "[exact claim being verified]"

## The Source
| Field | Value |
|---|---|
| Document name | [official document title] |
| Source type | [FARA / FEC / 990 / Court / USASpending / etc.] |
| URL | [direct link to document or record] |
| Database | [which database this was found in] |
| Filed/published | [date] |
| Accessed | [today's date] |
| Record ID | [grant number / case number / filing ID / etc.] |

## The Verbatim Evidence
> "[exact quote or data point from the document — no paraphrase]"
> — [Document name], [page/section/field]

## Discrepancy Check
[Does the source say exactly what the claim says? If not, explain the gap.]
- Claim says: [X]
- Source says: [Y]
- Verdict: ✅ Verified / ⚠️ Partial / ❌ Not supported

## Script-Ready Receipt Entry
```
RECEIPT — [CLAIM TOPIC]
Source: [Document name] ([SOURCE TYPE])
Quote: "[verbatim evidence]"
On-screen label: "[DOCUMENT NAME — SOURCE TYPE]"
URL for description: [URL]
```

## Notes
[Anything the researcher should know — related filings, document quirks, access issues, recommended follow-up]
```

---

## Verification Failure Protocol

If a primary source cannot be found for the claim:
1. Search one level down — is there a named investigative reporter who reviewed the actual document?
2. If yes: note it as **secondary verified** (a journalist saw the primary doc) — still weaker than primary
3. If no primary or credible secondary exists: return `CLAIM UNVERIFIED` with this format:

```markdown
# Receipt: UNVERIFIED — [CLAIM SUMMARY]
**Verdict:** ❌ Not supported by primary source
**Searched:** [list of databases checked]
**Closest found:** [description of what was found, if anything]
**Recommendation:** Remove this claim from the script / seek alternative primary source / reframe claim more narrowly
```

---

## Guardrails

- A news article reporting on a document is NOT a primary source — find the document
- Screenshots of tweets are not primary sources
- Wikipedia is not a source — it's a starting point for finding sources
- If a FARA filing is referenced, pull the actual exhibit, not just the registrant entry
- For 990 filings, cross-reference with ProPublica Nonprofit Explorer AND the IRS TEOS database
- Always save the receipt file even for unverified claims — it documents what was searched
