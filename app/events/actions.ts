'use server';

import eventsData from '@/data/events.json';

export async function getEvents() {
  return eventsData;
}

export async function getEventById(id: string) {
  return eventsData.find((event: any) => event.id === id) || null;
}

export async function getRelatedEvents(currentEventId: string, limit: number = 3) {
  // Filter out the current event and return up to 'limit' other events
  return eventsData
    .filter((event: any) => event.id !== currentEventId)
    .slice(0, limit);
}