'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  NewsArticle, 
  Event, 
  Resource, 
  Department,
  PaginationResult,
  FilterOptions,
  ApiError
} from '@/types';
import { processData } from '@/lib/dataUtils';

// Define the shape of our data context
interface DataContextType {
  // Loading states
  isLoadingNews: boolean;
  isLoadingEvents: boolean;
  isLoadingResources: boolean;
  isLoadingDepartments: boolean;
  isSearching: boolean;
  
  // Error states
  newsError: ApiError | null;
  eventsError: ApiError | null;
  resourcesError: ApiError | null;
  departmentsError: ApiError | null;
  searchError: ApiError | null;
  
  // Data states
  news: NewsArticle[];
  events: Event[];
  resources: Resource[];
  departments: Department[];
  
  // Filter states
  newsFilters: FilterOptions;
  eventFilters: FilterOptions;
  resourceFilters: FilterOptions;
  
  // Pagination states
  newsPage: number;
  eventsPage: number;
  resourcesPage: number;
  
  // Paginated results
  paginatedNews: PaginationResult<NewsArticle> | null;
  paginatedEvents: PaginationResult<Event> | null;
  paginatedResources: PaginationResult<Resource> | null;
  
  // Search state
  searchQuery: string;
  searchResults: any[];
  
  // Actions
  setNewsFilters: (filters: FilterOptions) => void;
  setEventFilters: (filters: FilterOptions) => void;
  setResourceFilters: (filters: FilterOptions) => void;
  setNewsPage: (page: number) => void;
  setEventsPage: (page: number) => void;
  setResourcesPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  refreshData: () => void;
  clearErrors: () => void;
}

// Create the context with default values
const DataContext = createContext<DataContextType>({
  // Loading states
  isLoadingNews: false,
  isLoadingEvents: false,
  isLoadingResources: false,
  isLoadingDepartments: false,
  isSearching: false,
  
  // Error states
  newsError: null,
  eventsError: null,
  resourcesError: null,
  departmentsError: null,
  searchError: null,
  
  // Data states
  news: [],
  events: [],
  resources: [],
  departments: [],
  
  // Filter states
  newsFilters: {},
  eventFilters: {},
  resourceFilters: {},
  
  // Pagination states
  newsPage: 1,
  eventsPage: 1,
  resourcesPage: 1,
  
  // Paginated results
  paginatedNews: null,
  paginatedEvents: null,
  paginatedResources: null,
  
  // Search state
  searchQuery: '',
  searchResults: [],
  
  // Actions (placeholders)
  setNewsFilters: () => {},
  setEventFilters: () => {},
  setResourceFilters: () => {},
  setNewsPage: () => {},
  setEventsPage: () => {},
  setResourcesPage: () => {},
  setSearchQuery: () => {},
  refreshData: () => {},
  clearErrors: () => {}
});

// Hook to use the data context
export const useData = () => useContext(DataContext);

// Data provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Loading states
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Error states
  const [newsError, setNewsError] = useState<ApiError | null>(null);
  const [eventsError, setEventsError] = useState<ApiError | null>(null);
  const [resourcesError, setResourcesError] = useState<ApiError | null>(null);
  const [departmentsError, setDepartmentsError] = useState<ApiError | null>(null);
  const [searchError, setSearchError] = useState<ApiError | null>(null);
  
  // Data states
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  
  // Filter states
  const [newsFilters, setNewsFilters] = useState<FilterOptions>({});
  const [eventFilters, setEventFilters] = useState<FilterOptions>({});
  const [resourceFilters, setResourceFilters] = useState<FilterOptions>({});
  
  // Pagination states
  const [newsPage, setNewsPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const [resourcesPage, setResourcesPage] = useState(1);
  
  // Paginated results
  const [paginatedNews, setPaginatedNews] = useState<PaginationResult<NewsArticle> | null>(null);
  const [paginatedEvents, setPaginatedEvents] = useState<PaginationResult<Event> | null>(null);
  const [paginatedResources, setPaginatedResources] = useState<PaginationResult<Resource> | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Function to fetch news data
  const fetchNews = async () => {
    try {
      setIsLoadingNews(true);
      setNewsError(null);
      
      // Fetch news data from API or client-side cache
      const response = await fetch('/api/news');
      
      if (!response.ok) {
        throw {
          code: 'NEWS_FETCH_ERROR',
          message: `Failed to fetch news: ${response.status} ${response.statusText}`
        };
      }
      
      const data = await response.json();
      setNews(data);
      
      // Process pagination
      const processed = processData<NewsArticle>(data, newsFilters, newsPage, 10);
      setPaginatedNews(processed);
      
      setIsLoadingNews(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsError({
        code: 'NEWS_FETCH_ERROR',
        message: 'Failed to fetch news data',
        details: error
      });
      setIsLoadingNews(false);
    }
  };
  
  // Function to fetch events data
  const fetchEvents = async () => {
    try {
      setIsLoadingEvents(true);
      setEventsError(null);
      
      // Fetch events data from API or client-side cache
      const response = await fetch('/api/events');
      
      if (!response.ok) {
        throw {
          code: 'EVENTS_FETCH_ERROR',
          message: `Failed to fetch events: ${response.status} ${response.statusText}`
        };
      }
      
      const data = await response.json();
      setEvents(data);
      
      // Process pagination
      const processed = processData<Event>(data, eventFilters, eventsPage, 10);
      setPaginatedEvents(processed);
      
      setIsLoadingEvents(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEventsError({
        code: 'EVENTS_FETCH_ERROR',
        message: 'Failed to fetch events data',
        details: error
      });
      setIsLoadingEvents(false);
    }
  };
  
  // Function to fetch resources data
  const fetchResources = async () => {
    try {
      setIsLoadingResources(true);
      setResourcesError(null);
      
      // Fetch resources data from API or client-side cache
      const response = await fetch('/api/resources');
      
      if (!response.ok) {
        throw {
          code: 'RESOURCES_FETCH_ERROR',
          message: `Failed to fetch resources: ${response.status} ${response.statusText}`
        };
      }
      
      const data = await response.json();
      setResources(data);
      
      // Process pagination
      const processed = processData<Resource>(data, resourceFilters, resourcesPage, 10);
      setPaginatedResources(processed);
      
      setIsLoadingResources(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResourcesError({
        code: 'RESOURCES_FETCH_ERROR',
        message: 'Failed to fetch resources data',
        details: error
      });
      setIsLoadingResources(false);
    }
  };
  
  // Function to fetch departments data
  const fetchDepartments = async () => {
    try {
      setIsLoadingDepartments(true);
      setDepartmentsError(null);
      
      // Fetch departments data from API or client-side cache
      const response = await fetch('/api/departments');
      
      if (!response.ok) {
        throw {
          code: 'DEPARTMENTS_FETCH_ERROR',
          message: `Failed to fetch departments: ${response.status} ${response.statusText}`
        };
      }
      
      const data = await response.json();
      setDepartments(data);
      
      setIsLoadingDepartments(false);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartmentsError({
        code: 'DEPARTMENTS_FETCH_ERROR',
        message: 'Failed to fetch departments data',
        details: error
      });
      setIsLoadingDepartments(false);
    }
  };
  
  // Function to search content
  const searchContent = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setIsSearching(true);
      setSearchError(null);
      
      // Search from API
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw {
          code: 'SEARCH_ERROR',
          message: `Search failed: ${response.status} ${response.statusText}`
        };
      }
      
      const data = await response.json();
      setSearchResults(data);
      
      setIsSearching(false);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchError({
        code: 'SEARCH_ERROR',
        message: 'Failed to search content',
        details: error
      });
      setIsSearching(false);
    }
  };
  
  // Function to clear all errors
  const clearErrors = () => {
    setNewsError(null);
    setEventsError(null);
    setResourcesError(null);
    setDepartmentsError(null);
    setSearchError(null);
  };
  
  // Effect to update paginated news when filters or page changes
  useEffect(() => {
    if (news.length > 0) {
      const processed = processData<NewsArticle>(news, newsFilters, newsPage, 10);
      setPaginatedNews(processed);
    }
  }, [news, newsFilters, newsPage]);
  
  // Effect to update paginated events when filters or page changes
  useEffect(() => {
    if (events.length > 0) {
      const processed = processData<Event>(events, eventFilters, eventsPage, 10);
      setPaginatedEvents(processed);
    }
  }, [events, eventFilters, eventsPage]);
  
  // Effect to update paginated resources when filters or page changes
  useEffect(() => {
    if (resources.length > 0) {
      const processed = processData<Resource>(resources, resourceFilters, resourcesPage, 10);
      setPaginatedResources(processed);
    }
  }, [resources, resourceFilters, resourcesPage]);
  
  // Effect to trigger search when query changes
  useEffect(() => {
    searchContent(searchQuery);
  }, [searchQuery]);
  
  // Function to refresh all data
  const refreshData = () => {
    fetchNews();
    fetchEvents();
    fetchResources();
    fetchDepartments();
  };
  
  // Initial data load
  useEffect(() => {
    refreshData();
  }, []);
  
  // Combine all values and functions to provide
  const contextValue: DataContextType = {
    // Loading states
    isLoadingNews,
    isLoadingEvents,
    isLoadingResources,
    isLoadingDepartments,
    isSearching,
    
    // Error states
    newsError,
    eventsError,
    resourcesError,
    departmentsError,
    searchError,
    
    // Data states
    news,
    events,
    resources,
    departments,
    
    // Filter states
    newsFilters,
    eventFilters,
    resourceFilters,
    
    // Pagination states
    newsPage,
    eventsPage,
    resourcesPage,
    
    // Paginated results
    paginatedNews,
    paginatedEvents,
    paginatedResources,
    
    // Search state
    searchQuery,
    searchResults,
    
    // Actions
    setNewsFilters,
    setEventFilters,
    setResourceFilters,
    setNewsPage,
    setEventsPage,
    setResourcesPage,
    setSearchQuery,
    refreshData,
    clearErrors
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Custom error boundary component
export function DataErrorBoundary({ children }: { children: ReactNode }) {
  const { 
    newsError, 
    eventsError, 
    resourcesError, 
    departmentsError, 
    searchError,
    clearErrors
  } = useData();
  
  // Check if any error exists
  const hasError = newsError || eventsError || resourcesError || departmentsError || searchError;
  
  if (!hasError) {
    return <>{children}</>;
  }
  
  // Render error UI
  return (
    <div className="data-error-boundary">
      <h2>Something went wrong</h2>
      <p>We encountered an error while loading data.</p>
      
      {/* Show specific errors */}
      {newsError && (
        <div className="error-item">
          <strong>News Error:</strong> {newsError.message}
        </div>
      )}
      
      {eventsError && (
        <div className="error-item">
          <strong>Events Error:</strong> {eventsError.message}
        </div>
      )}
      
      {resourcesError && (
        <div className="error-item">
          <strong>Resources Error:</strong> {resourcesError.message}
        </div>
      )}
      
      {departmentsError && (
        <div className="error-item">
          <strong>Departments Error:</strong> {departmentsError.message}
        </div>
      )}
      
      {searchError && (
        <div className="error-item">
          <strong>Search Error:</strong> {searchError.message}
        </div>
      )}
      
      <button 
        className="retry-button"
        onClick={() => {
          clearErrors();
          window.location.reload();
        }}
      >
        Try Again
      </button>
    </div>
  );
}