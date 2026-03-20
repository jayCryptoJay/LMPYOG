import { Router, type IRouter } from "express";
import { db, scriptsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/scripts", async (req, res) => {
  const scripts = await db.select().from(scriptsTable).orderBy(scriptsTable.updatedAt);
  res.json(scripts.reverse());
});

router.post("/scripts", async (req, res) => {
  const { title, episode, content, status } = req.body as {
    title?: string;
    episode?: string;
    content?: string;
    status?: string;
  };
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const [script] = await db
    .insert(scriptsTable)
    .values({
      title,
      episode: episode || null,
      content: content || "",
      status: status || "draft",
    })
    .returning();
  res.status(201).json(script);
});

router.get("/scripts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [script] = await db.select().from(scriptsTable).where(eq(scriptsTable.id, id));
  if (!script) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(script);
});

router.put("/scripts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, episode, content, status } = req.body as {
    title?: string;
    episode?: string;
    content?: string;
    status?: string;
  };
  const [script] = await db
    .update(scriptsTable)
    .set({
      ...(title !== undefined && { title }),
      ...(episode !== undefined && { episode }),
      ...(content !== undefined && { content }),
      ...(status !== undefined && { status }),
      updatedAt: new Date(),
    })
    .where(eq(scriptsTable.id, id))
    .returning();
  if (!script) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(script);
});

router.delete("/scripts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(scriptsTable).where(eq(scriptsTable.id, id));
  res.status(204).send();
});

export default router;
