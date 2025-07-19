import {
  users,
  bookings,
  movingRooms,
  disposalItems,
  type User,
  type UpsertUser,
  type Booking,
  type InsertBooking,
  type MovingRoom,
  type InsertMovingRoom,
  type DisposalItem,
  type InsertDisposalItem
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUserId(userId: string): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  createMovingRoom(room: InsertMovingRoom): Promise<MovingRoom>;
  getMovingRoomsByBookingId(bookingId: number): Promise<MovingRoom[]>;
  
  createDisposalItem(item: InsertDisposalItem): Promise<DisposalItem>;
  getDisposalItemsByBookingId(bookingId: number): Promise<DisposalItem[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async createMovingRoom(insertRoom: InsertMovingRoom): Promise<MovingRoom> {
    const [room] = await db
      .insert(movingRooms)
      .values(insertRoom)
      .returning();
    return room;
  }

  async getMovingRoomsByBookingId(bookingId: number): Promise<MovingRoom[]> {
    return await db.select().from(movingRooms).where(eq(movingRooms.bookingId, bookingId));
  }

  async createDisposalItem(insertItem: InsertDisposalItem): Promise<DisposalItem> {
    const [item] = await db
      .insert(disposalItems)
      .values(insertItem)
      .returning();
    return item;
  }

  async getDisposalItemsByBookingId(bookingId: number): Promise<DisposalItem[]> {
    return await db.select().from(disposalItems).where(eq(disposalItems.bookingId, bookingId));
  }
}

export const storage = new DatabaseStorage();
