import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema from the original file
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// SEO Analysis schema
export const seoAnalysis = pgTable("seo_analysis", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  overallScore: integer("overall_score").notNull(),
  validCount: integer("valid_count").notNull(),
  warningCount: integer("warning_count").notNull(),
  errorCount: integer("error_count").notNull(),
  metaTags: jsonb("meta_tags").notNull(),
  issues: jsonb("issues").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalysis).omit({
  id: true,
});

export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalysis.$inferSelect;

// Tag type definition
export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string().nullable(),
  content: z.string().nullable(),
  status: z.enum(["success", "warning", "error"]),
  statusText: z.string(),
  category: z.enum(["essential", "social", "other"]),
  description: z.string(),
  recommendation: z.string().optional(),
  info: z.string().optional(),
});

export type Tag = z.infer<typeof tagSchema>;

// Issue type definition
export const issueSchema = z.object({
  type: z.enum(["error", "warning"]),
  message: z.string(),
});

export type Issue = z.infer<typeof issueSchema>;

// Analysis Response schema for the API
export const previewSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  url: z.string().nullable(),
  image: z.string().nullable(),
});

export type Preview = z.infer<typeof previewSchema>;

export const recommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  impact: z.enum(["high", "medium", "low"]),
  category: z.enum(["technical", "content", "performance", "social"]),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

export const analysisResponseSchema = z.object({
  url: z.string().url(),
  overallScore: z.number(),
  validCount: z.number(),
  warningCount: z.number(),
  errorCount: z.number(),
  tags: z.array(tagSchema),
  issues: z.array(issueSchema),
  recommendations: z.array(recommendationSchema).optional(),
  googlePreview: previewSchema.optional(),
  facebookPreview: previewSchema.optional(),
  twitterPreview: previewSchema.optional(),
  rawHtml: z.string().optional(),
  lastUpdated: z.string(),
});

export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;
