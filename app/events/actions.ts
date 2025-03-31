'use server';

import eventsData from '@/data/events.json';

export async function getEvents() {
  return eventsData;
}

export async function getEventById(id: string) {
  return eventsData.find((event: any) => event.id === id) || null;
}