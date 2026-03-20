import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/research", async (req, res) => {
  const { query } = req.body as { query?: string };
  if (!query) {
    res.status(400).json({ error: "query is required" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || "";

  if (!apiKey) {
    res.json({
      query,
      content: `[Research simulation for: "${query}"]\n\nThis is a placeholder response. To enable live AI research, add your GEMINI_API_KEY environment variable. The system will then query Gemini with web grounding to find FCC filings, FARA disclosures, SEC filings, and primary source documentation related to your investigation target.`,
      sources: [],
    });
    return;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `ACT AS AN INVESTIGATIVE REPORTER for the YouTube channel "Let Me Put You On Game" (LMPYOG). Your specialty is narrative journalism exposing media ownership, foreign influence, and institutional corruption. Provide a detailed investigative report on the following topic using verifiable primary sources (FCC filings, FARA disclosures, SEC filings, Congress.gov data, court records): ${query}. Focus on money trails, foreign influence, news distortion patterns, and billionaire media ownership. Structure your response clearly with headers. Provide THE GAME — the receipts that the mainstream media won't cover.`,
                },
              ],
            },
          ],
          tools: [{ google_search: {} }],
        }),
      }
    );

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
        groundingMetadata?: {
          groundingAttributions?: Array<{
            web?: { title?: string; uri?: string };
          }>;
          searchEntryPoint?: { renderedContent?: string };
        };
      }>;
    };

    const content =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No results found. Please try a different query.";

    const groundingAttributions =
      data.candidates?.[0]?.groundingMetadata?.groundingAttributions || [];
    const sources = groundingAttributions
      .filter((s) => s.web?.uri)
      .map((s) => ({
        title: s.web?.title || s.web?.uri || "",
        uri: s.web?.uri || "",
      }));

    res.json({ query, content, sources });
  } catch (err) {
    req.log.error({ err }, "Research request failed");
    res.status(500).json({ error: "Research failed. Try again." });
  }
});

export default router;
