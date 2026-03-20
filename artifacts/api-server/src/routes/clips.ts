import { Router, type IRouter } from "express";
import { db, clipsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/clips", async (req, res) => {
  const clips = await db.select().from(clipsTable).orderBy(clipsTable.createdAt);
  res.json(clips.reverse());
});

router.post("/clips", async (req, res) => {
  const { title, sourceUrl, platform, timestamp, keywords, transcript, season, notes } =
    req.body as {
      title?: string;
      sourceUrl?: string;
      platform?: string;
      timestamp?: string;
      keywords?: string[];
      transcript?: string;
      season?: string;
      notes?: string;
    };
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const [clip] = await db
    .insert(clipsTable)
    .values({
      title,
      sourceUrl: sourceUrl || null,
      platform: (platform as "youtube" | "cspan" | "other") || "other",
      timestamp: timestamp || null,
      keywords: keywords || [],
      transcript: transcript || null,
      season: season || "Season 1",
      notes: notes || null,
    })
    .returning();
  res.status(201).json(clip);
});

router.delete("/clips/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(clipsTable).where(eq(clipsTable.id, id));
  res.status(204).send();
});

export default router;
