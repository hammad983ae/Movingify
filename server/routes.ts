import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBookingSchema, insertMovingRoomSchema, insertDisposalItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Create booking (protected)
  app.post("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookingData = insertBookingSchema.parse({ ...req.body, userId });
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // Get booking by ID (protected)
  app.get("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user's bookings (protected)
  app.get("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getBookingsByUserId(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update booking status (protected)
  app.patch("/api/bookings/:id/status", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create moving room (protected)
  app.post("/api/moving-rooms", isAuthenticated, async (req, res) => {
    try {
      const roomData = insertMovingRoomSchema.parse(req.body);
      const room = await storage.createMovingRoom(roomData);
      res.json(room);
    } catch (error) {
      console.error("Error creating moving room:", error);
      res.status(400).json({ error: "Invalid room data" });
    }
  });

  // Get moving rooms by booking ID (protected)
  app.get("/api/moving-rooms/booking/:bookingId", isAuthenticated, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const rooms = await storage.getMovingRoomsByBookingId(bookingId);
      res.json(rooms);
    } catch (error) {
      console.error("Error fetching moving rooms:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create disposal item (protected)
  app.post("/api/disposal-items", isAuthenticated, async (req, res) => {
    try {
      const itemData = insertDisposalItemSchema.parse(req.body);
      const item = await storage.createDisposalItem(itemData);
      res.json(item);
    } catch (error) {
      console.error("Error creating disposal item:", error);
      res.status(400).json({ error: "Invalid item data" });
    }
  });

  // Get disposal items by booking ID (protected)
  app.get("/api/disposal-items/booking/:bookingId", isAuthenticated, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const items = await storage.getDisposalItemsByBookingId(bookingId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching disposal items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
