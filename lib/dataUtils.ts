import { 
  FilterOptions, 
  PaginationResult,
  ApiError,
  NewsArticle,
  Event,
  Department,
  Resource,
  DocumentDownload
} from '@/types';

/**
 * Client-side data utilities for working with data retrieved from server
 */

/**
 * Filter an array of items based on filter options
 */
export function filterItems<T extends Record<string, any>>(
  items: T[],
  options: FilterOptions = {}
): T[] {
  if (!items || items.length === 0) return [];
  
  return items.filter(item => {
    // Keyword search across title, description, and other text fields
    if (options.keyword && options.keyword.trim() !== '') {
      const keyword = options.keyword.toLowerCase();
      const searchableFields = [
        item.title, 
        item.description, 
        item.content, 
        item.category
      ].filter(Boolean);
      
      // Check if any field contains the keyword
      const matchesKeyword = searchableFields.some(field => 
        field?.toLowerCase().includes(keyword)
      );
      
      if (!matchesKeyword) return false;
    }
    
    // Category filter
    if (options.category && options.category !== '') {
      if (item.category !== options.category) return false;
    }
    
    // Date range filter
    if (options.startDate) {
      const startDate = new Date(options.startDate);
      const itemDate = new Date(item.date || item.startDate || item.publishedAt || item.updatedAt || item.createdAt);
      if (itemDate < startDate) return false;
    }
    
    if (options.endDate) {
      const endDate = new Date(options.endDate);
      const itemDate = new Date(item.date || item.endDate || item.publishedAt || item.updatedAt || item.createdAt);
      if (itemDate > endDate) return false;
    }
    
    // Tag filtering
    if (options.tags && options.tags.length > 0 && item.tags) {
      if (!options.tags.some(tag => item.tags.includes(tag))) return false;
    }
    
    // Featured filter
    if (typeof options.featured === 'boolean') {
      if (item.featured !== options.featured) return false;
    }
    
    return true;
  });
}

/**
 * Sort an array of items based on filter options
 */
export function sortItems<T extends Record<string, any>>(
  items: T[],
  options: FilterOptions = {}
): T[] {
  if (!items || items.length === 0) return [];
  
  const direction = options.sortDirection === 'desc' ? -1 : 1;
  const sortBy = options.sortBy || 'newest';
  
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        const aDate = new Date(a.date || a.publishedAt || a.updatedAt || a.createdAt || a.lastUpdated);
        const bDate = new Date(b.date || b.publishedAt || b.updatedAt || b.createdAt || b.lastUpdated);
        return direction * (bDate.getTime() - aDate.getTime());
        
      case 'oldest':
        const aDateOld = new Date(a.date || a.publishedAt || a.updatedAt || a.createdAt || a.lastUpdated);
        const bDateOld = new Date(b.date || b.publishedAt || b.updatedAt || b.createdAt || b.lastUpdated);
        return direction * (aDateOld.getTime() - bDateOld.getTime());
        
      case 'alphabetical':
        return direction * a.title.localeCompare(b.title);
        
      default:
        return 0;
    }
  });
}

/**
 * Paginate an array of items
 */
export function paginateItems<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 10
): PaginationResult<T> {
  if (!items || items.length === 0) {
    return {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
  
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  
  return {
    items: items.slice(startIndex, endIndex),
    total: totalItems,
    page: currentPage,
    pageSize,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}

/**
 * Process data with filtering, sorting, and pagination in one call
 */
export function processData<T extends Record<string, any>>(
  data: T[],
  options: FilterOptions = {},
  page: number = 1,
  pageSize: number = 10
): PaginationResult<T> {
  // Apply filtering
  const filteredItems = filterItems<T>(data, options);
  
  // Apply sorting
  const sortedItems = sortItems<T>(filteredItems, options);
  
  // Apply pagination
  return paginateItems<T>(sortedItems, page, pageSize);
}

/**
 * Get related items based on categories and tags
 */
export function getRelatedItems<T extends Record<string, any>>(
  currentItem: T,
  allItems: T[],
  limit: number = 3
): T[] {
  if (!currentItem || !allItems || allItems.length === 0) return [];
  
  // Remove the current item
  const otherItems = allItems.filter(item => item.id !== currentItem.id);
  
  // Score each item based on similarity
  const scoredItems = otherItems.map(item => {
    let score = 0;
    
    // Same category is a strong signal
    if (item.category === currentItem.category) {
      score += 3;
    }
    
    // Matching tags
    if (currentItem.tags && item.tags) {
      const matchingTags = currentItem.tags.filter(tag => item.tags.includes(tag));
      score += matchingTags.length;
    }
    
    // Title keyword matching
    if (currentItem.title && item.title) {
      const words = currentItem.title.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 3 && item.title.toLowerCase().includes(word)) {
          score += 1;
        }
      });
    }
    
    return { item, score };
  });
  
  // Sort by score and return top N
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(scored => scored.item);
}

/**
 * Create an error object for consistent error handling
 */
export function createError(
  code: string,
  message: string,
  details?: any
): ApiError {
  return {
    code,
    message,
    details
  };
}

/**
 * Type guard functions
 */
export function isNewsArticle(item: any): item is NewsArticle {
  return item && 
    typeof item.title === 'string' &&
    typeof item.content === 'string' &&
    typeof item.author === 'string';
}

export function isEvent(item: any): item is Event {
  return item && 
    typeof item.title === 'string' &&
    typeof item.startDate === 'string' &&
    typeof item.endDate === 'string';
}

export function isDepartment(item: any): item is Department {
  return item && 
    typeof item.title === 'string' &&
    typeof item.shortTitle === 'string' &&
    typeof item.detailedDescription === 'string';
}

export function isResource(item: any): item is Resource {
  return item && 
    typeof item.title === 'string' &&
    typeof item.category === 'string' &&
    typeof item.lastUpdated === 'string';
}

export function isDocumentDownload(item: any): item is DocumentDownload {
  return item && 
    typeof item.name === 'string' &&
    typeof item.size === 'string' &&
    typeof item.format === 'string' &&
    typeof item.url === 'string';
}