import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to handle waitlist signups
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = insertWaitlistSchema.parse(req.body);
      
      // Add timestamp
      const waitlistEntry = {
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      // Add to storage
      const savedEntry = await storage.addToWaitlist(waitlistEntry);
      
      res.status(201).json({
        message: "Successfully added to waitlist",
        data: savedEntry,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      } else if (error instanceof Error) {
        res.status(500).json({
          message: "Failed to add to waitlist",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "An unknown error occurred",
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
