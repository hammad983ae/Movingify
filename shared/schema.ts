import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  serviceType: text("service_type").notNull(), // "moving", "disposal", "transport"
  status: text("status").notNull().default("pending"), // "pending", "confirmed", "completed", "cancelled"
  data: jsonb("data").notNull(), // Service-specific data
  contactInfo: jsonb("contact_info").notNull(),
  scheduledDate: timestamp("scheduled_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const movingRooms = pgTable("moving_rooms", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  floor: text("floor").notNull(),
  roomType: text("room_type").notNull(),
  items: jsonb("items").notNull().default([]),
});

export const disposalItems = pgTable("disposal_items", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  category: text("category").notNull(),
  itemType: text("item_type").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const insertMovingRoomSchema = createInsertSchema(movingRooms).omit({
  id: true,
});

export const insertDisposalItemSchema = createInsertSchema(disposalItems).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertMovingRoom = z.infer<typeof insertMovingRoomSchema>;
export type MovingRoom = typeof movingRooms.$inferSelect;
export type InsertDisposalItem = z.infer<typeof insertDisposalItemSchema>;
export type DisposalItem = typeof disposalItems.$inferSelect;
