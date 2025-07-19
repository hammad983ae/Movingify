import { 
  users, 
  bookings, 
  movingRooms, 
  disposalItems, 
  type User, 
  type InsertUser,
  type Booking,
  type InsertBooking,
  type MovingRoom,
  type InsertMovingRoom,
  type DisposalItem,
  type InsertDisposalItem
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  createMovingRoom(room: InsertMovingRoom): Promise<MovingRoom>;
  getMovingRoomsByBookingId(bookingId: number): Promise<MovingRoom[]>;
  
  createDisposalItem(item: InsertDisposalItem): Promise<DisposalItem>;
  getDisposalItemsByBookingId(bookingId: number): Promise<DisposalItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private movingRooms: Map<number, MovingRoom>;
  private disposalItems: Map<number, DisposalItem>;
  private currentUserId: number;
  private currentBookingId: number;
  private currentMovingRoomId: number;
  private currentDisposalItemId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.movingRooms = new Map();
    this.disposalItems = new Map();
    this.currentUserId = 1;
    this.currentBookingId = 1;
    this.currentMovingRoomId = 1;
    this.currentDisposalItemId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  async createMovingRoom(insertRoom: InsertMovingRoom): Promise<MovingRoom> {
    const id = this.currentMovingRoomId++;
    const room: MovingRoom = { ...insertRoom, id };
    this.movingRooms.set(id, room);
    return room;
  }

  async getMovingRoomsByBookingId(bookingId: number): Promise<MovingRoom[]> {
    return Array.from(this.movingRooms.values()).filter(
      (room) => room.bookingId === bookingId
    );
  }

  async createDisposalItem(insertItem: InsertDisposalItem): Promise<DisposalItem> {
    const id = this.currentDisposalItemId++;
    const item: DisposalItem = { ...insertItem, id };
    this.disposalItems.set(id, item);
    return item;
  }

  async getDisposalItemsByBookingId(bookingId: number): Promise<DisposalItem[]> {
    return Array.from(this.disposalItems.values()).filter(
      (item) => item.bookingId === bookingId
    );
  }
}

export const storage = new MemStorage();
