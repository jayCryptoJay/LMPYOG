import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scriptsTable = pgTable("scripts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  episode: text("episode"),
  content: text("content").notNull().default(""),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertScriptSchema = createInsertSchema(scriptsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertScript = z.infer<typeof insertScriptSchema>;
export type Script = typeof scriptsTable.$inferSelect;

export const clipsTable = pgTable("clips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sourceUrl: text("source_url"),
  platform: text("platform").notNull().default("other"),
  timestamp: text("timestamp"),
  keywords: text("keywords").array().notNull().default([]),
  transcript: text("transcript"),
  season: text("season").notNull().default("Season 1"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertClipSchema = createInsertSchema(clipsTable).omit({ id: true, createdAt: true });
export type InsertClip = z.infer<typeof insertClipSchema>;
export type Clip = typeof clipsTable.$inferSelect;

export const episodesTable = pgTable("episodes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  episodeNumber: integer("episode_number"),
  season: text("season").notNull().default("Season 1"),
  status: text("status").notNull().default("planning"),
  scheduledDate: timestamp("scheduled_date"),
  publishedDate: timestamp("published_date"),
  youtubeUrl: text("youtube_url"),
  topic: text("topic"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEpisodeSchema = createInsertSchema(episodesTable).omit({ id: true, createdAt: true });
export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type Episode = typeof episodesTable.$inferSelect;

export const trendsTable = pgTable("trends", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  volume: text("volume").notNull().default("Medium"),
  sentiment: text("sentiment").notNull().default("Investigative"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTrendSchema = createInsertSchema(trendsTable).omit({ id: true, createdAt: true });
export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type Trend = typeof trendsTable.$inferSelect;
