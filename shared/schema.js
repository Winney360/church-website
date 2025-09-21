import { z } from "zod";

// User schema
export const insertUserSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().optional(),
  password: z.string().min(6),
  role: z.string().default("member"),
});

// Event schema
export const insertEventSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  date: z.string(), // ISO string (frontend safe)
  time: z.string(),
  location: z.string(),
  category: z.string(),
});

// Sermon schema
export const insertSermonSchema = z.object({
  title: z.string(),
  description: z.string(),
  pastor: z.string(),
  date: z.string(),
  duration: z.string(),
  audioUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});

// Contact schema
export const insertContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string(),
  isNewsletterSubscribed: z.boolean().default(false),
});
