import { z } from 'zod';
import type { NewsArticle, Event, Department, Resource, DocumentDownload } from '@/types';

// Zod schema for Document
export const DocumentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  size: z.string(),
  format: z.string(),
  url: z.string().url(),
  uploadedAt: z.string().datetime().optional(),
  category: z.string().optional()
});

// Zod schema for Event agenda item
export const EventAgendaItemSchema = z.object({
  time: z.string(),
  activity: z.string(),
  speaker: z.string().optional(),
  description: z.string().optional()
});

// Zod schema for NewsArticle
export const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string().datetime(),
  publishedAt: z.string().datetime().optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  heroImage: z.string().optional(),
  featured: z.boolean(),
  htmlContent: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

// Zod schema for Event
export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string(),
  organizer: z.string(),
  agenda: z.array(EventAgendaItemSchema).optional(),
  featuredQuote: z.string().optional(),
  quoteAuthor: z.string().optional(),
  category: z.string().optional(),
  registrationUrl: z.string().url().optional(),
  registrationRequired: z.boolean().optional(),
  maxAttendees: z.number().positive().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

// Zod schema for Department
export const DepartmentSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  shortTitle: z.string(),
  description: z.string(),
  detailedDescription: z.string(),
  featuredImage: z.string().optional(),
  lastUpdated: z.string().datetime().optional(),
  commonQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.string()
    })
  ).optional(),
  promotions: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ).optional(),
  documents: z.array(DocumentSchema).optional(),
  supportOptions: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })
  ).optional(),
  artemisInfo: z.object({
    title: z.string(),
    description: z.string()
  }).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

// Zod schema for Resource
export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  category: z.string(),
  lastUpdated: z.string().datetime(),
  featured: z.boolean(),
  url: z.string().url().optional(),
  relatedResources: z.array(z.string()).optional(),
  documents: z.array(DocumentSchema).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

/**
 * Validate news article data against schema
 */
export function validateNewsArticle(data: unknown): NewsArticle | null {
  try {
    return NewsArticleSchema.parse(data);
  } catch (error) {
    console.error('News article validation error:', error);
    return null;
  }
}

/**
 * Validate event data against schema
 */
export function validateEvent(data: unknown): Event | null {
  try {
    return EventSchema.parse(data);
  } catch (error) {
    console.error('Event validation error:', error);
    return null;
  }
}

/**
 * Validate department data against schema
 */
export function validateDepartment(data: unknown): Department | null {
  try {
    return DepartmentSchema.parse(data);
  } catch (error) {
    console.error('Department validation error:', error);
    return null;
  }
}

/**
 * Validate resource data against schema
 */
export function validateResource(data: unknown): Resource | null {
  try {
    return ResourceSchema.parse(data);
  } catch (error) {
    console.error('Resource validation error:', error);
    return null;
  }
}

/**
 * Validate document data against schema
 */
export function validateDocument(data: unknown): DocumentDownload | null {
  try {
    return DocumentSchema.parse(data);
  } catch (error) {
    console.error('Document validation error:', error);
    return null;
  }
}

/**
 * Validate an array of items against their respective schemas
 */
export function validateDataArray<T>(
  data: unknown[],
  validator: (item: unknown) => T | null
): T[] {
  if (!Array.isArray(data)) {
    return [];
  }
  
  return data
    .map(item => validator(item))
    .filter((item): item is T => item !== null);
}