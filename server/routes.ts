import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertMovingRoomSchema, insertDisposalItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // Get booking by ID
  app.get("/api/bookings/:id", async (req, res) => {
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

  // Get bookings by user ID
  app.get("/api/bookings/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookings = await storage.getBookingsByUserId(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id/status", async (req, res) => {
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

  // Create moving room
  app.post("/api/moving-rooms", async (req, res) => {
    try {
      const roomData = insertMovingRoomSchema.parse(req.body);
      const room = await storage.createMovingRoom(roomData);
      res.json(room);
    } catch (error) {
      console.error("Error creating moving room:", error);
      res.status(400).json({ error: "Invalid room data" });
    }
  });

  // Get moving rooms by booking ID
  app.get("/api/moving-rooms/booking/:bookingId", async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const rooms = await storage.getMovingRoomsByBookingId(bookingId);
      res.json(rooms);
    } catch (error) {
      console.error("Error fetching moving rooms:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create disposal item
  app.post("/api/disposal-items", async (req, res) => {
    try {
      const itemData = insertDisposalItemSchema.parse(req.body);
      const item = await storage.createDisposalItem(itemData);
      res.json(item);
    } catch (error) {
      console.error("Error creating disposal item:", error);
      res.status(400).json({ error: "Invalid item data" });
    }
  });

  // Get disposal items by booking ID
  app.get("/api/disposal-items/booking/:bookingId", async (req, res) => {
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
