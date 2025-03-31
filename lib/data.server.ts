'use server';

import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

/**
 * Fetch events from JSON file (server-side only)
 */
export async function getEvents() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'events.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const events = JSON.parse(fileContents);
    return events || [];
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
}

/**
 * Get event by ID (server-side only)
 */
export async function getEventById(id: string) {
  const events = await getEvents();
  return events.find((event: any) => event.id === id) || null;
}

/**
 * Fetch news from JSON file (server-side only)
 */
export async function getNews() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const news = JSON.parse(fileContents);
    return news || [];
  } catch (error) {
    console.error('Error loading news:', error);
    return [];
  }
}

/**
 * Get news by ID (server-side only)
 */
export async function getNewsById(id: string) {
  const news = await getNews();
  return news.find((item: any) => item.id === id) || null;
}