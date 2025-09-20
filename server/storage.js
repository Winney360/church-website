import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.sermons = new Map();
    this.contacts = new Map();
    this.galleries = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Initialize with sample data for community groups
    this.initializeSampleData();
  }

  initializeSampleData() {
    // Initialize community groups (static data)
    const communityGroups = [
      {
        id: "sunday-school",
        name: "Sunday School",
        description: "Bible lessons and activities for children ages 4-12 during service time.",
        leader: "Mrs. Emily Davis",
        meetingTime: "Sundays 9:00 AM",
        location: "Children's Ministry Room",
        category: "sunday_school",
        icon: "fas fa-child",
        color: "bg-yellow-100 text-yellow-600"
      },
      {
        id: "youth-fellowship",
        name: "Youth Fellowship", 
        description: "Dynamic ministry for teens with games, discussions, and service projects.",
        leader: "Pastor Mike Wilson",
        meetingTime: "Fridays 7:00 PM",
        location: "Youth Center",
        category: "youth",
        icon: "fas fa-users",
        color: "bg-green-100 text-green-600"
      },
      {
        id: "women-fellowship",
        name: "Women Fellowship",
        description: "Bible study, prayer, and fellowship for women of all ages and backgrounds.",
        leader: "Mrs. Linda Thompson", 
        meetingTime: "Wednesdays 10:00 AM",
        location: "Fellowship Hall",
        category: "women",
        icon: "fas fa-female",
        color: "bg-pink-100 text-pink-600"
      },
      {
        id: "men-fellowship",
        name: "Men Fellowship",
        description: "Brotherhood, accountability, and growth in faith through study and service.",
        leader: "Deacon Robert Brown",
        meetingTime: "Saturdays 7:00 AM", 
        location: "Conference Room",
        category: "men",
        icon: "fas fa-male",
        color: "bg-blue-100 text-blue-600"
      }
    ];

    communityGroups.forEach(group => {
      this.galleries.set(group.id, group);
    });

    // Create admin user for testing
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      email: "admin@gracecommunity.church",
      mobile: null,
      password: "c9f0f895fb98ab9159f51fd0297e236d8bce70b3cf35c4f.8e8fbc1e7c7b1b0e", // password: admin123
      role: "admin",
      isApproved: true,
      createdAt: new Date()
    });
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(userData) {
    const id = randomUUID();
    const user = { 
      ...userData, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getPendingUsers() {
    return Array.from(this.users.values()).filter(user => !user.isApproved);
  }

  async approveUser(userId, approved) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (approved) {
      user.isApproved = true;
      this.users.set(userId, user);
      return { success: true, message: "User approved" };
    } else {
      this.users.delete(userId);
      return { success: true, message: "User rejected and removed" };
    }
  }

  // Event methods
  async getAllEvents() {
    return Array.from(this.events.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async createEvent(eventData) {
    const id = randomUUID();
    const event = { 
      ...eventData, 
      id, 
      date: new Date(eventData.date),
      createdAt: new Date() 
    };
    this.events.set(id, event);
    return event;
  }

  async getPendingEvents() {
    return Array.from(this.events.values()).filter(event => !event.isApproved);
  }

  async approveEvent(eventId, approved) {
    const event = this.events.get(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (approved) {
      event.isApproved = true;
      this.events.set(eventId, event);
      return { success: true, message: "Event approved" };
    } else {
      this.events.delete(eventId);
      return { success: true, message: "Event rejected and removed" };
    }
  }

  // Sermon methods
  async getAllSermons() {
    return Array.from(this.sermons.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async createSermon(sermonData) {
    const id = randomUUID();
    const sermon = { 
      ...sermonData, 
      id, 
      date: new Date(sermonData.date),
      createdAt: new Date() 
    };
    this.sermons.set(id, sermon);
    return sermon;
  }

  async getPendingSermons() {
    return Array.from(this.sermons.values()).filter(sermon => !sermon.isApproved);
  }

  async approveSermon(sermonId, approved) {
    const sermon = this.sermons.get(sermonId);
    if (!sermon) {
      throw new Error("Sermon not found");
    }

    if (approved) {
      sermon.isApproved = true;
      this.sermons.set(sermonId, sermon);
      return { success: true, message: "Sermon approved" };
    } else {
      this.sermons.delete(sermonId);
      return { success: true, message: "Sermon rejected and removed" };
    }
  }

  // Contact methods
  async createContact(contactData) {
    const id = randomUUID();
    const contact = { 
      ...contactData, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Gallery methods
  async getAllGalleryItems() {
    return Array.from(this.galleries.values());
  }

  // Admin stats
  async getAdminStats() {
    const totalMembers = Array.from(this.users.values()).filter(user => user.isApproved).length;
    const activeEvents = Array.from(this.events.values()).filter(event => 
      event.isApproved && new Date(event.date) >= new Date()
    ).length;
    const pendingUsers = Array.from(this.users.values()).filter(user => !user.isApproved).length;
    const pendingEvents = Array.from(this.events.values()).filter(event => !event.isApproved).length;
    const pendingSermons = Array.from(this.sermons.values()).filter(sermon => !sermon.isApproved).length;
    const pendingApprovals = pendingUsers + pendingEvents + pendingSermons;

    return {
      totalMembers,
      activeEvents,
      pendingApprovals
    };
  }
}

export const storage = new MemStorage();
