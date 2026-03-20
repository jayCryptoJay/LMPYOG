import { Router, type IRouter } from "express";
import { db, episodesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/episodes", async (req, res) => {
  const episodes = await db.select().from(episodesTable).orderBy(episodesTable.createdAt);
  res.json(episodes.reverse());
});

router.post("/episodes", async (req, res) => {
  const { title, episodeNumber, season, status, scheduledDate, topic, notes } =
    req.body as {
      title?: string;
      episodeNumber?: number;
      season?: string;
      status?: string;
      scheduledDate?: string;
      topic?: string;
      notes?: string;
    };
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const [episode] = await db
    .insert(episodesTable)
    .values({
      title,
      episodeNumber: episodeNumber || null,
      season: season || "Season 1",
      status: (status as "planning" | "scripting" | "filming" | "editing" | "published") || "planning",
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      topic: topic || null,
      notes: notes || null,
    })
    .returning();
  res.status(201).json(episode);
});

router.put("/episodes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, episodeNumber, season, status, scheduledDate, publishedDate, youtubeUrl, topic, notes } =
    req.body as {
      title?: string;
      episodeNumber?: number;
      season?: string;
      status?: string;
      scheduledDate?: string;
      publishedDate?: string;
      youtubeUrl?: string;
      topic?: string;
      notes?: string;
    };
  const [episode] = await db
    .update(episodesTable)
    .set({
      ...(title !== undefined && { title }),
      ...(episodeNumber !== undefined && { episodeNumber }),
      ...(season !== undefined && { season }),
      ...(status !== undefined && { status }),
      ...(scheduledDate !== undefined && { scheduledDate: scheduledDate ? new Date(scheduledDate) : null }),
      ...(publishedDate !== undefined && { publishedDate: publishedDate ? new Date(publishedDate) : null }),
      ...(youtubeUrl !== undefined && { youtubeUrl }),
      ...(topic !== undefined && { topic }),
      ...(notes !== undefined && { notes }),
    })
    .where(eq(episodesTable.id, id))
    .returning();
  if (!episode) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(episode);
});

export default router;
