import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
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

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertMovingRoom = z.infer<typeof insertMovingRoomSchema>;
export type MovingRoom = typeof movingRooms.$inferSelect;
export type InsertDisposalItem = z.infer<typeof insertDisposalItemSchema>;
export type DisposalItem = typeof disposalItems.$inferSelect;
