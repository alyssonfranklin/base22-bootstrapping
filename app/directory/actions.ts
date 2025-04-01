'use server';

import directoryData from '@/data/directory.json';

export async function getDirectoryItems() {
  return directoryData;
}

export async function getDirectoryItemById(id: string) {
  return directoryData.find((item: any) => item.id === id) || null;
}

export async function getAllCategories() {
  const categories = Array.from(
    new Set(directoryData.map((item: any) => item.category))
  ).sort();
  
  return categories;
}