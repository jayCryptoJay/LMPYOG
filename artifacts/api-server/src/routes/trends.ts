import { Router, type IRouter } from "express";
import { db, trendsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/trends", async (req, res) => {
  const trends = await db.select().from(trendsTable).orderBy(trendsTable.createdAt);
  res.json(trends.reverse());
});

router.post("/trends", async (req, res) => {
  const { title, volume, sentiment, active } = req.body as {
    title?: string;
    volume?: string;
    sentiment?: string;
    active?: boolean;
  };
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const [trend] = await db
    .insert(trendsTable)
    .values({
      title,
      volume: (volume as "Low" | "Medium" | "High") || "Medium",
      sentiment: sentiment || "Investigative",
      active: active !== undefined ? active : true,
    })
    .returning();
  res.status(201).json(trend);
});

router.delete("/trends/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(trendsTable).where(eq(trendsTable.id, id));
  res.status(204).send();
});

export default router;
