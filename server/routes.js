import { createServer } from "http";
import { setupAuth } from "./auth.js";
import { storage } from "./storage.js";

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (!req.user.isApproved) {
    return res.status(403).json({ message: "Account pending approval" });
  }
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (req.user.role !== role && req.user.role !== "admin") {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}

export function registerRoutes(app) {
  // Setup authentication routes
  setupAuth(app);

  // Events endpoints
  app.get("/api/events", async (req, res, next) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/events", requireAuth, async (req, res, next) => {
    try {
      const eventData = {
        ...req.body,
        createdBy: req.user.id,
        isApproved: req.user.role === "admin", // Auto-approve for admins
      };
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  });

  // Sermons endpoints
  app.get("/api/sermons", async (req, res, next) => {
    try {
      const sermons = await storage.getAllSermons();
      res.json(sermons);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/sermons", requireAuth, async (req, res, next) => {
    try {
      if (req.user.role !== "admin" && req.user.role !== "coordinator") {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      const sermonData = {
        ...req.body,
        createdBy: req.user.id,
        isApproved: req.user.role === "admin", // Auto-approve for admins
      };
      const sermon = await storage.createSermon(sermonData);
      res.status(201).json(sermon);
    } catch (error) {
      next(error);
    }
  });

  // Contact endpoint
  app.post("/api/contact", async (req, res, next) => {
    try {
      const contact = await storage.createContact(req.body);
      res.status(201).json(contact);
    } catch (error) {
      next(error);
    }
  });

  // Gallery endpoint
  app.get("/api/gallery", async (req, res, next) => {
    try {
      const gallery = await storage.getAllGalleryItems();
      res.json(gallery);
    } catch (error) {
      next(error);
    }
  });

  // Admin endpoints
  app.get("/api/admin/stats", requireRole("admin"), async (req, res, next) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/pending-users", requireRole("admin"), async (req, res, next) => {
    try {
      const users = await storage.getPendingUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/admin/approve-user", requireRole("admin"), async (req, res, next) => {
    try {
      const { userId, approved } = req.body;
      const result = await storage.approveUser(userId, approved);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/pending-events", requireRole("admin"), async (req, res, next) => {
    try {
      const events = await storage.getPendingEvents();
      res.json(events);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/admin/approve-event", requireRole("admin"), async (req, res, next) => {
    try {
      const { eventId, approved } = req.body;
      const result = await storage.approveEvent(eventId, approved);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/pending-sermons", requireRole("admin"), async (req, res, next) => {
    try {
      const sermons = await storage.getPendingSermons();
      res.json(sermons);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/admin/approve-sermon", requireRole("admin"), async (req, res, next) => {
    try {
      const { sermonId, approved } = req.body;
      const result = await storage.approveSermon(sermonId, approved);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
