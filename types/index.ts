// Common interfaces used throughout the application

// Base interface for content items with common properties
export interface BaseContentItem {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  role: string;
  profileImage?: string;
}

// News article content type
export interface NewsArticle extends BaseContentItem {
  content: string;
  author: string;
  date: string; // Legacy support
  publishedAt?: string;
  category: string;
  tags?: string[];
  image?: string;
  heroImage?: string; // Legacy support
  featured: boolean;
  htmlContent?: string;
}

export interface ArticleDetail extends NewsArticle {
  relatedArticles?: RelatedArticle[];
}

export interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
}

// Event content type
export interface Event extends BaseContentItem {
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  agenda?: EventAgendaItem[];
  featuredQuote?: string;
  quoteAuthor?: string;
  category?: string;
  registrationUrl?: string;
  registrationRequired?: boolean;
  maxAttendees?: number;
}

export interface EventAgendaItem {
  time: string;
  activity: string;
  speaker?: string;
  description?: string;
}

// Department content type
export interface Department extends BaseContentItem {
  shortTitle: string;
  detailedDescription: string;
  featuredImage?: string;
  lastUpdated?: string;
  commonQuestions?: DepartmentQuestion[];
  promotions?: DepartmentPromotion[];
  documents?: DocumentDownload[];
  supportOptions?: SupportOption[];
  artemisInfo?: {
    title: string;
    description: string;
  };
}

export interface DepartmentQuestion {
  question: string;
  answer: string;
}

export interface DepartmentPromotion {
  title: string;
  description: string;
}

export interface SupportOption {
  title: string;
  description: string;
  icon: 'mail' | 'phone' | 'tool' | 'clipboard' | string;
}

// Resource content type
export interface Resource extends BaseContentItem {
  category: string;
  lastUpdated: string;
  featured: boolean;
  url?: string;
  relatedResources?: string[]; // IDs of related resources
}

// Document content type for downloadable files
export interface DocumentDownload {
  id?: string;
  name: string;
  description?: string;
  size: string;
  format: string;
  url: string;
  uploadedAt?: string;
  category?: string;
}

// Legacy document interface
export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  uploadDate: string;
  category: string;
  department: string;
}

// Navigation structure interfaces
export interface NavigationItem {
  title: string;
  link?: string;
  href?: string; // Legacy support
  label?: string; // Legacy support
  items?: NavigationSubItem[];
  children?: NavigationItem[]; // Legacy support
  icon?: string;
}

export interface NavigationSubItem {
  title: string;
  link: string;
  icon?: string;
}

// Search result interface for unified search
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  contentType: 'news' | 'event' | 'department' | 'resource' | 'document';
  updatedAt: string;
}

// Pagination interface
export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Filter options interface
export interface FilterOptions {
  keyword?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  featured?: boolean;
  sortBy?: 'newest' | 'oldest' | 'alphabetical' | 'relevance';
  sortDirection?: 'asc' | 'desc';
}

// Error handling interface
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}
