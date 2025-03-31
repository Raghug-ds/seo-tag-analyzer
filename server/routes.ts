import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { analyzeWebsite } from "./services/seoAnalyzer";
import { parse as parseUrl } from "url";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to analyze a website
  app.get("/api/analyze", async (req, res) => {
    try {
      const { url } = req.query;

      if (!url || typeof url !== "string") {
        return res.status(400).json({
          message: "URL parameter is required",
        });
      }

      // Ensure URL has a protocol
      let formattedUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = `https://${url}`;
      }

      // Validate URL format
      try {
        new URL(formattedUrl);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid URL format",
        });
      }

      // Analyze the website
      const analysisResult = await analyzeWebsite(formattedUrl);
      return res.status(200).json(analysisResult);
    } catch (error) {
      console.error("Error analyzing website:", error);

      // Determine if it's a network error
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          return res.status(503).json({
            message: "Unable to reach the website. Please check if the URL is correct and the website is online.",
          });
        }
        return res.status(error.response.status).json({
          message: `Error fetching website: ${error.response.statusText}`,
        });
      }

      return res.status(500).json({
        message: "An unexpected error occurred while analyzing the website.",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
