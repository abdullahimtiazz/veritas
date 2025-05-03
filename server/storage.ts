import { users, waitlist, type User, type InsertUser, type InsertWaitlist, type Waitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Define the storage interface with the methods needed by the application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  addToWaitlist(entry: InsertWaitlist & { createdAt: string }): Promise<Waitlist>;
  getWaitlistEntries(): Promise<Waitlist[]>;
  getWaitlistEntry(id: number): Promise<Waitlist | undefined>;
  getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined>;
}

// Define the database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Waitlist methods
  async addToWaitlist(entry: InsertWaitlist & { createdAt: string }): Promise<Waitlist> {
    // Ensure receiveUpdates is not undefined
    const safeEntry = { 
      ...entry, 
      receiveUpdates: entry.receiveUpdates === undefined ? false : entry.receiveUpdates 
    };
    const result = await db.insert(waitlist).values(safeEntry).returning();
    return result[0];
  }
  
  async getWaitlistEntries(): Promise<Waitlist[]> {
    return db.select().from(waitlist);
  }
  
  async getWaitlistEntry(id: number): Promise<Waitlist | undefined> {
    const result = await db.select().from(waitlist).where(eq(waitlist.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined> {
    const result = await db.select().from(waitlist).where(eq(waitlist.email, email));
    return result.length > 0 ? result[0] : undefined;
  }
}

// Create and export the storage instance
export const storage = new DatabaseStorage();
