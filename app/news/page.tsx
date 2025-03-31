"use client";

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useNavigation } from '@/lib/context/NavigationContext';

// This would typically come from an API or CMS
const NEWS_ITEMS = [
  {
    id: "news-1",
    title: "Password Management Updates",
    description: "Learn about the company's new password policy and how to manage your credentials securely.",
    image: "/images/news/security.jpg",
    category: "IT",
    date: "2025-03-20"
  },
  {
    id: "news-2",
    title: "Remote Work Guidelines",
    description: "Comprehensive guide for working remotely, including best practices and communication tools.",
    image: "/images/news/remote.jpg",
    category: "HR",
    date: "2025-03-18"
  },
  {
    id: "news-3",
    title: "Benefits Overview 2025",
    description: "Detailed information about your employee benefits package for the current year.",
    image: "/images/news/benefits.jpg",
    category: "Benefits",
    date: "2025-03-15"
  },
  {
    id: "news-4",
    title: "Diversity and Inclusion Initiative",
    description: "Learn about our commitment to fostering a diverse and inclusive workplace environment.",
    image: "/images/news/diversity.jpg",
    category: "Culture",
    date: "2025-03-12"
  },
  {
    id: "news-5",
    title: "Annual Performance Review Process",
    description: "Step-by-step guide to preparing for and conducting your annual performance review.",
    image: "/images/news/performance.jpg",
    category: "HR",
    date: "2025-03-10"
  },
  {
    id: "news-6",
    title: "Company Travel Policy",
    description: "Guidelines for business travel, including expense reporting and approval processes.",
    image: "/images/news/travel.jpg",
    category: "Policy",
    date: "2025-03-08"
  },
  {
    id: "news-7",
    title: "Office Safety Procedures",
    description: "Important safety information and emergency procedures for all office locations.",
    image: "/images/news/safety.jpg",
    category: "Facilities",
    date: "2025-03-05"
  },
  {
    id: "news-8",
    title: "Leadership Development Program",
    description: "Explore available training programs and professional development opportunities.",
    image: "/images/news/leadership.jpg",
    category: "Training",
    date: "2025-03-01"
  },
  {
    id: "news-9",
    title: "IT Support and Helpdesk Changes",
    description: "How to get technical support and troubleshooting assistance for company systems.",
    image: "/images/news/support.jpg",
    category: "IT",
    date: "2025-02-28"
  },
  {
    id: "news-10",
    title: "Health and Wellness Programs",
    description: "Information about wellness initiatives and health resources available to employees.",
    image: "/images/news/wellness.jpg",
    category: "Benefits",
    date: "2025-02-25"
  },
  {
    id: "news-11",
    title: "Project Management Guidelines",
    description: "Best practices for managing projects and collaborating effectively with teams.",
    image: "/images/news/project.jpg",
    category: "Productivity",
    date: "2025-02-20"
  },
  {
    id: "news-12",
    title: "New Communication Channels",
    description: "Overview of communication tools and channels used within the organization.",
    image: "/images/news/communication.jpg",
    category: "Communication",
    date: "2025-02-18"
  },
  {
    id: "news-13",
    title: "Environmental Sustainability Efforts",
    description: "Learn about our company's initiatives to reduce environmental impact and promote sustainability.",
    image: "/images/news/sustainability.jpg",
    category: "Corporate",
    date: "2025-02-15"
  },
  {
    id: "news-14",
    title: "Employee Recognition Program",
    description: "Information about how to recognize colleagues and the rewards program.",
    image: "/images/news/recognition.jpg",
    category: "Culture",
    date: "2025-02-10"
  },
  {
    id: "news-15",
    title: "Code of Conduct Updates",
    description: "Guidelines for professional behavior and ethical standards expected from all employees.",
    image: "/images/news/conduct.jpg",
    category: "Policy",
    date: "2025-02-05"
  },
  {
    id: "news-16",
    title: "Retirement Planning Resources",
    description: "Tools and information to help you plan for retirement and manage your 401(k).",
    image: "/images/news/retirement.jpg",
    category: "Finance",
    date: "2025-02-01"
  },
  // Simulating more items to reach 42 total
  ...Array.from({ length: 26 }).map((_, i) => ({
    id: `news-${i + 17}`,
    title: `Additional News Item ${i + 1}`,
    description: "This is a placeholder for additional news items to demonstrate pagination functionality.",
    image: "/images/news/placeholder.jpg",
    category: i % 4 === 0 ? "IT" : i % 4 === 1 ? "HR" : i % 4 === 2 ? "Corporate" : "Benefits",
    date: `2025-01-${30 - (i % 30)}`
  }))
];

// All unique categories from news items
const ALL_CATEGORIES = Array.from(
  new Set(NEWS_ITEMS.map(item => item.category))
).sort();

export const metadata: Metadata = {
  title: 'News Catalog - HRX Portal',
  description: 'Browse our catalog of news and announcements',
};

export default function NewsPage() {
  const { setCurrentPage: setNavCurrentPage } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState(NEWS_ITEMS);
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  // Update breadcrumb when component mounts
  useEffect(() => {
    setNavCurrentPage({
      title: 'Life & Career',
      breadcrumbs: [
        { title: 'Home', href: '/' },
        { title: 'Life & Career', href: '/news' }
      ]
    });
  }, [setNavCurrentPage]);
  
  // Filter items when search term or category changes
  useEffect(() => {
    const filtered = NEWS_ITEMS.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || 
        item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory]);
  
  // Handle article click - in a real app, this would navigate to the article detail page
  const handleArticleClick = (id: string) => {
    // In a real app, this would use router.push
    console.log(`Navigate to article: ${id}`);
  };
  
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
      document.getElementById('catalogResults')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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
            />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">Label</label>
          <select
            id="category-filter"
            className="filter-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Labels</option>
            {ALL_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>
      
      <section id="catalogResults" className="catalog-results">
        <div className="results-info">
          <p>Showing {currentItems.length} results of {filteredItems.length}</p>
        </div>
        
        <div className="catalog-grid">
          {currentItems.map(item => (
            <Link href={`/news/${item.id}`} key={item.id} className="catalog-card">
              <div className="catalog-card-image">
                <div className="placeholder-image" aria-hidden="true"></div>
              </div>
              <div className="catalog-card-content">
                <h3 className="catalog-card-title">{item.title}</h3>
                <p className="catalog-card-description">{item.description}</p>
                <div className="catalog-card-labels">
                  <span className="catalog-card-label">{item.category}</span>
                  <span className="catalog-card-date">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="catalog-pagination">
            <button
              className="pagination-arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? 'page' : undefined}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              className="pagination-arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
