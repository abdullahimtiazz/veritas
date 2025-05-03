import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendWaitlistConfirmation } from "./email";

// Simple authentication middleware for admin routes
const adminAuth = (req: Request, res: Response, next: Function) => {
  // In a real app, you would use proper authentication
  // For now, we'll use a simple admin secret approach
  const adminSecret = process.env.ADMIN_SECRET || 'admin123';
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== `Bearer ${adminSecret}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  next();
};

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
      
      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.email);
      if (existingEntry) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
      
      // Add to storage
      const savedEntry = await storage.addToWaitlist(waitlistEntry);
      
      // Send confirmation email
      const emailSent = await sendWaitlistConfirmation(savedEntry.email);
      
      res.status(201).json({
        message: "Successfully added to waitlist",
        data: savedEntry,
        emailSent,
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
  
  // Admin route to get all waitlist entries
  app.get("/api/admin/waitlist", adminAuth, async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      
      // Return with basic stats
      res.status(200).json({
        message: "Waitlist entries retrieved successfully",
        totalEntries: entries.length,
        data: entries,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve waitlist entries",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
  
  // Admin route to get a specific waitlist entry
  app.get("/api/admin/waitlist/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID format",
        });
      }
      
      const entry = await storage.getWaitlistEntry(id);
      if (!entry) {
        return res.status(404).json({
          message: "Entry not found",
        });
      }
      
      res.status(200).json({
        message: "Waitlist entry retrieved successfully",
        data: entry,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve waitlist entry",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
