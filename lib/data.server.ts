'use server';

import fs from 'fs';
import path from 'path';
import { 
  Event, 
  NewsArticle, 
  Department, 
  Resource, 
  DocumentDownload,
  NavigationItem,
  FilterOptions,
  PaginationResult
} from '@/types';

/**
 * Base function to load JSON data from file
 */
async function loadJsonData<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data || [];
  } catch (error) {
    console.error(`Error loading data from ${filename}:`, error);
    return [];
  }
}

/**
 * Function to save JSON data to file (only for development)
 */
async function saveJsonData<T>(filename: string, data: T[]): Promise<boolean> {
  if (process.env.NODE_ENV === 'production') {
    console.error('Cannot save data in production mode');
    return false;
  }
  
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving data to ${filename}:`, error);
    return false;
  }
}

/**
 * News data functions
 */
export async function getNews(): Promise<NewsArticle[]> {
  return loadJsonData<NewsArticle>('news.json');
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const news = await getNews();
  return news.find(item => item.id === id) || null;
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  const news = await getNews();
  return news.filter(item => item.category === category);
}

export async function getFeaturedNews(limit: number = 3): Promise<NewsArticle[]> {
  const news = await getNews();
  return news
    .filter(item => item.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Events data functions
 */
export async function getEvents(): Promise<Event[]> {
  return loadJsonData<Event>('events.json');
}

export async function getEventById(id: string): Promise<Event | null> {
  const events = await getEvents();
  return events.find(event => event.id === id) || null;
}

export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  
  return events
    .filter(event => new Date(event.startDate) > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
}

export async function getPastEvents(limit: number = 5): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  
  return events
    .filter(event => new Date(event.endDate) < now)
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
    .slice(0, limit);
}

export async function getRelatedEvents(currentEventId: string, limit: number = 3): Promise<Event[]> {
  const events = await getEvents();
  const currentEvent = events.find(event => event.id === currentEventId);
  
  if (!currentEvent) return [];
  
  return events
    .filter(event => event.id !== currentEventId)
    .sort((a, b) => {
      // Prioritize events in the same category
      if (a.category === currentEvent.category && b.category !== currentEvent.category) {
        return -1;
      }
      if (a.category !== currentEvent.category && b.category === currentEvent.category) {
        return 1;
      }
      
      // Then sort by date (closer to the current event date)
      const currentDate = new Date(currentEvent.startDate).getTime();
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      
      return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
    })
    .slice(0, limit);
}

/**
 * Department data functions
 */
export async function getDepartments(): Promise<Department[]> {
  return loadJsonData<Department>('departments.json');
}

export async function getDepartmentById(id: string): Promise<Department | null> {
  const departments = await getDepartments();
  return departments.find(dept => dept.id === id) || null;
}

export async function getRelatedDepartments(currentDeptId: string, limit: number = 3): Promise<Department[]> {
  const departments = await getDepartments();
  return departments
    .filter(dept => dept.id !== currentDeptId)
    .slice(0, limit);
}

/**
 * Resource data functions
 */
export async function getResources(): Promise<Resource[]> {
  return loadJsonData<Resource>('resources.json');
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const resources = await getResources();
  return resources.find(resource => resource.id === id) || null;
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  const resources = await getResources();
  return resources.filter(resource => resource.category === category);
}

export async function getFeaturedResources(limit: number = 3): Promise<Resource[]> {
  const resources = await getResources();
  return resources
    .filter(resource => resource.featured)
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit);
}

export async function getRelatedResources(currentResourceId: string, limit: number = 3): Promise<Resource[]> {
  const resources = await getResources();
  const currentResource = await getResourceById(currentResourceId);
  
  if (!currentResource) return [];
  
  // Get explicitly related resources first
  const relatedIds = currentResource.relatedResources || [];
  const explicitlyRelated = relatedIds
    .map(id => resources.find(r => r.id === id))
    .filter(Boolean) as Resource[];
  
  // If we have enough explicitly related resources, return those
  if (explicitlyRelated.length >= limit) {
    return explicitlyRelated.slice(0, limit);
  }
  
  // Otherwise, find additional related resources by category
  const additionalNeeded = limit - explicitlyRelated.length;
  const explicitIds = new Set([currentResourceId, ...explicitlyRelated.map(r => r.id)]);
  
  const additionalRelated = resources
    .filter(r => !explicitIds.has(r.id) && r.category === currentResource.category)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, additionalNeeded);
  
  return [...explicitlyRelated, ...additionalRelated];
}

/**
 * Documents data functions
 */
export async function getResourceDocuments(resourceId: string): Promise<DocumentDownload[]> {
  const resource = await getResourceById(resourceId);
  return resource?.documents || [];
}

export async function getDocumentsByCategory(category: string): Promise<DocumentDownload[]> {
  const resources = await getResources();
  
  return resources
    .filter(resource => resource.category === category)
    .flatMap(resource => resource.documents || []);
}

/**
 * Navigation data functions
 */
export async function getNavigation(): Promise<NavigationItem[]> {
  return loadJsonData<NavigationItem>('navigation.json');
}

/**
 * Search functionality
 */
export async function searchContent(query: string, limit: number = 10): Promise<any[]> {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const searchTerm = query.toLowerCase();
  const [news, events, departments, resources] = await Promise.all([
    getNews(),
    getEvents(),
    getDepartments(),
    getResources()
  ]);
  
  // Search in news
  const newsResults = news
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
    )
    .map(item => ({
      ...item,
      type: 'news',
      url: `/news/${item.id}`
    }));
  
  // Search in events
  const eventResults = events
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      (item.location && item.location.toLowerCase().includes(searchTerm))
    )
    .map(item => ({
      ...item,
      type: 'event',
      url: `/events/${item.id}`
    }));
  
  // Search in departments
  const departmentResults = departments
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.detailedDescription.toLowerCase().includes(searchTerm)
    )
    .map(item => ({
      ...item,
      type: 'department',
      url: `/departments/${item.id}`
    }));
  
  // Search in resources
  const resourceResults = resources
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    )
    .map(item => ({
      ...item,
      type: 'resource',
      url: `/directory/${item.id}`
    }));
  
  // Combine all results, sort by relevance (simple implementation - title matches are more relevant)
  const allResults = [...newsResults, ...eventResults, ...departmentResults, ...resourceResults]
    .sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
      const bTitleMatch = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      // If both or neither have title matches, sort by date
      // Use type-safe date extraction with optional chaining and nullish coalescing
      const getItemDate = (item: any): Date => {
        // Try to get any valid date property in a type-safe way
        const dateStr = 
          (item as any).date || 
          (item as any).publishedAt || 
          (item as any).updatedAt || 
          (item as any).lastUpdated || 
          (item as any).startDate || 
          (item as any).createdAt || 
          new Date().toISOString(); // Default to current date if none found
        
        return new Date(dateStr);
      };
      
      const aDate = getItemDate(a);
      const bDate = getItemDate(b);
      
      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, limit);
  
  return allResults;
}

/**
 * Generic functions for filtering, sorting, and pagination on the server
 */
export async function filterAndPaginateData<T extends Record<string, any>>(
  dataLoader: () => Promise<T[]>,
  options: FilterOptions = {},
  page: number = 1,
  pageSize: number = 10
): Promise<PaginationResult<T>> {
  const data = await dataLoader();
  
  // Filtering
  const filtered = data.filter(item => {
    // Keyword search
    if (options.keyword) {
      const keyword = options.keyword.toLowerCase();
      const searchableFields = [
        item.title, 
        item.description, 
        item.content, 
        item.category
      ].filter(Boolean);
      
      const matchesKeyword = searchableFields.some(field => 
        field?.toLowerCase().includes(keyword)
      );
      
      if (!matchesKeyword) return false;
    }
    
    // Category filter
    if (options.category) {
      if (item.category !== options.category) return false;
    }
    
    // Date range filter
    const getItemDate = (item: any, preferEndDate = false): Date => {
      // Try to get any valid date property in a type-safe way
      let dateStr;
      
      if (preferEndDate && (item as any).endDate) {
        dateStr = (item as any).endDate;
      } else {
        dateStr = 
          (item as any).date || 
          (item as any).startDate || 
          (item as any).publishedAt || 
          (item as any).updatedAt || 
          (item as any).createdAt ||
          (item as any).lastUpdated ||
          new Date().toISOString(); // Default to current date if none found
      }
      
      return new Date(dateStr);
    };
    
    if (options.startDate) {
      const startDate = new Date(options.startDate);
      const itemDate = getItemDate(item);
      if (itemDate < startDate) return false;
    }
    
    if (options.endDate) {
      const endDate = new Date(options.endDate);
      const itemDate = getItemDate(item, true); // Prefer end date for end range checks
      if (itemDate > endDate) return false;
    }
    
    // Tags filter
    if (options.tags && options.tags.length > 0 && item.tags) {
      if (!options.tags.some(tag => item.tags.includes(tag))) return false;
    }
    
    // Featured filter
    if (typeof options.featured === 'boolean') {
      if (item.featured !== options.featured) return false;
    }
    
    return true;
  });
  
  // Sorting
  const sortedData = [...filtered].sort((a, b) => {
    const sortDirection = options.sortDirection === 'desc' ? -1 : 1;
    
    // Helper function to safely get a date from an item
    const getItemDate = (item: any): Date => {
      // Try to get any valid date property in a type-safe way
      const dateStr = 
        (item as any).date || 
        (item as any).publishedAt || 
        (item as any).updatedAt || 
        (item as any).createdAt || 
        (item as any).lastUpdated || 
        (item as any).startDate || 
        new Date().toISOString(); // Default to current date if none found
      
      return new Date(dateStr);
    };
    
    switch (options.sortBy) {
      case 'newest':
        const aDate = getItemDate(a);
        const bDate = getItemDate(b);
        return sortDirection * (bDate.getTime() - aDate.getTime());
        
      case 'oldest':
        const aDateOld = getItemDate(a);
        const bDateOld = getItemDate(b);
        return sortDirection * (aDateOld.getTime() - bDateOld.getTime());
        
      case 'alphabetical':
        return sortDirection * a.title.localeCompare(b.title);
        
      default:
        return 0;
    }
  });
  
  // Pagination
  const total = sortedData.length;
  const totalPages = Math.ceil(total / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  
  return {
    items: sortedData.slice(startIndex, endIndex),
    total,
    page: currentPage,
    pageSize,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}