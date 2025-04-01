'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNavigation } from '@/lib/context/NavigationContext';
import { getDirectoryItems, getAllCategories } from './actions';
import { formatDate } from '@/lib/utils';

export default function DirectoryPage() {
  const { setCurrentPage: setNavCurrentPage } = useNavigation();
  const [directoryItems, setDirectoryItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  // Set breadcrumbs
  useEffect(() => {
    setNavCurrentPage({
      title: 'Resource Directory',
      breadcrumbs: [
        { title: 'Home', href: '/' },
        { title: 'Directory', href: '/directory' }
      ]
    });
  }, [setNavCurrentPage]);
  
  // Load directory data
  useEffect(() => {
    async function loadDirectoryData() {
      try {
        const items = await getDirectoryItems();
        const allCategories = await getAllCategories();
        
        setDirectoryItems(items);
        setFilteredItems(items);
        setCategories(allCategories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading directory data:', error);
        setIsLoading(false);
      }
    }
    
    loadDirectoryData();
  }, []);
  
  // Filter items when search term or category changes
  useEffect(() => {
    if (directoryItems.length === 0) return;
    
    const filtered = directoryItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || 
        item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, directoryItems]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results
      document.getElementById('directoryResults')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Helper function to generate pagination range with ellipsis
  const generatePaginationRange = () => {
    const delta = 1; // Number of pages to show on each side of current page
    const range = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show first page
        i === totalPages || // Always show last page
        (i >= currentPage - delta && i <= currentPage + delta) // Show pages around current page
      ) {
        range.push(i);
      } else if (
        (i === currentPage - delta - 1 && currentPage - delta > 1) || // Show ellipsis before current range
        (i === currentPage + delta + 1 && currentPage + delta < totalPages) // Show ellipsis after current range
      ) {
        range.push('ellipsis');
      }
    }
    
    // Remove duplicates and return
    return range.filter((item, index, self) => 
      item === 'ellipsis' ? item !== self[index - 1] : true
    );
  };
  
  if (isLoading) {
    return <div className="catalog-page">Loading directory...</div>;
  }
  
  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <h1 className="page-title">Catalog</h1>
      </header>
      
      <section className="catalog-filters">
        <div className="filter-group">
          <label htmlFor="keyword-search" className="filter-label">Filter by keyword</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              id="keyword-search"
              className="filter-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search by keyword"
            />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">Category</label>
          <select
            id="category-filter"
            className="filter-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>
      
      <section id="directoryResults" className="catalog-results">
        <div className="results-info">
          <p>Showing {currentItems.length} results of {filteredItems.length}</p>
        </div>
        
        <div className="catalog-grid">
          {currentItems.map(item => {
            const updateDate = new Date(item.lastUpdated);
            return (
              <div key={item.id} className="catalog-card">
                <div className="catalog-card-image">
                  <div className="placeholder-image" aria-hidden="true"></div>
                </div>
                <div className="catalog-card-content">
                  <h3 className="catalog-card-title">{item.title}</h3>
                  <p className="catalog-card-description">{item.description}</p>
                  <div className="catalog-card-labels">
                    <span className="catalog-card-label">{item.category}</span>
                    <span className="catalog-card-date">
                      {formatDate(updateDate, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {totalPages > 1 && (
          <div className="catalog-pagination">
            <button
              className="pagination-arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="pagination-numbers">
              {generatePaginationRange().map((item, index) => {
                if (item === 'ellipsis') {
                  return (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                  );
                }
                
                const page = item as number;
                return (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              className="pagination-arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}