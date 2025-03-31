"use client";

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useNavigation } from '@/lib/context/NavigationContext';

// This would typically come from an API or CMS
const CATALOG_ITEMS = [
  {
    id: 1,
    title: "Password Access and Credentials",
    description: "Learn about the company's password policy and how to manage your credentials securely.",
    image: "/images/catalog/password.jpg",
    labels: ["IT", "Security"]
  },
  {
    id: 2,
    title: "Remote Work Guidelines",
    description: "Comprehensive guide for working remotely, including best practices and communication tools.",
    image: "/images/catalog/remote.jpg",
    labels: ["HR", "Policy"]
  },
  {
    id: 3,
    title: "Benefits Overview 2023",
    description: "Detailed information about your employee benefits package for the current year.",
    image: "/images/catalog/benefits.jpg",
    labels: ["HR", "Benefits"]
  },
  {
    id: 4,
    title: "Diversity and Inclusion Initiative",
    description: "Learn about our commitment to fostering a diverse and inclusive workplace environment.",
    image: "/images/catalog/diversity.jpg",
    labels: ["Culture", "HR"]
  },
  {
    id: 5,
    title: "Annual Performance Review Process",
    description: "Step-by-step guide to preparing for and conducting your annual performance review.",
    image: "/images/catalog/performance.jpg",
    labels: ["HR", "Career"]
  },
  {
    id: 6,
    title: "Company Travel Policy",
    description: "Guidelines for business travel, including expense reporting and approval processes.",
    image: "/images/catalog/travel.jpg",
    labels: ["Policy", "Finance"]
  },
  {
    id: 7,
    title: "Office Safety Procedures",
    description: "Important safety information and emergency procedures for all office locations.",
    image: "/images/catalog/safety.jpg",
    labels: ["Safety", "Facilities"]
  },
  {
    id: 8,
    title: "Learning and Development Resources",
    description: "Explore available training programs and professional development opportunities.",
    image: "/images/catalog/learning.jpg",
    labels: ["Training", "Career"]
  },
  {
    id: 9,
    title: "IT Support and Helpdesk",
    description: "How to get technical support and troubleshooting assistance for company systems.",
    image: "/images/catalog/support.jpg",
    labels: ["IT", "Support"]
  },
  {
    id: 10,
    title: "Health and Wellness Programs",
    description: "Information about wellness initiatives and health resources available to employees.",
    image: "/images/catalog/wellness.jpg",
    labels: ["Health", "Benefits"]
  },
  {
    id: 11,
    title: "Project Management Guidelines",
    description: "Best practices for managing projects and collaborating effectively with teams.",
    image: "/images/catalog/project.jpg",
    labels: ["Productivity", "Teams"]
  },
  {
    id: 12,
    title: "Internal Communication Channels",
    description: "Overview of communication tools and channels used within the organization.",
    image: "/images/catalog/communication.jpg",
    labels: ["Communication", "Tools"]
  },
  {
    id: 13,
    title: "Environmental Sustainability Efforts",
    description: "Learn about our company's initiatives to reduce environmental impact and promote sustainability.",
    image: "/images/catalog/sustainability.jpg",
    labels: ["Environment", "Corporate"]
  },
  {
    id: 14,
    title: "Employee Recognition Program",
    description: "Information about how to recognize colleagues and the rewards program.",
    image: "/images/catalog/recognition.jpg",
    labels: ["Culture", "HR"]
  },
  {
    id: 15,
    title: "Code of Conduct",
    description: "Guidelines for professional behavior and ethical standards expected from all employees.",
    image: "/images/catalog/conduct.jpg",
    labels: ["Policy", "Ethics"]
  },
  {
    id: 16,
    title: "Retirement Planning Resources",
    description: "Tools and information to help you plan for retirement and manage your 401(k).",
    image: "/images/catalog/retirement.jpg",
    labels: ["Finance", "Benefits"]
  },
];

// All unique labels from catalog items
const ALL_LABELS = Array.from(
  new Set(CATALOG_ITEMS.flatMap(item => item.labels))
).sort();

// This would normally be in the layout.js file
export const metadata = {
  title: 'Catalog - Life & Career - HRX Portal',
  description: 'Browse our catalog of life and career resources',
};

export default function CatalogPage() {
  const { setCurrentPage } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState(CATALOG_ITEMS);
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  // Update breadcrumb when component mounts
  useEffect(() => {
    setCurrentPage({
      title: 'Life & Career',
      breadcrumbs: [
        { title: 'Home', href: '/' },
        { title: 'Life & Career', href: '/catalog' }
      ]
    });
  }, [setCurrentPage]);
  
  // Filter items when search term or label changes
  useEffect(() => {
    const filtered = CATALOG_ITEMS.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLabel = selectedLabel === '' || 
        item.labels.includes(selectedLabel);
      
      return matchesSearch && matchesLabel;
    });
    
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedLabel]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(e.target.value);
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
          <label htmlFor="label-filter" className="filter-label">Label</label>
          <select
            id="label-filter"
            className="filter-select"
            value={selectedLabel}
            onChange={handleLabelChange}
          >
            <option value="">All Labels</option>
            {ALL_LABELS.map(label => (
              <option key={label} value={label}>{label}</option>
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
            <div key={item.id} className="catalog-card">
              <div className="catalog-card-image">
                <div className="placeholder-image" aria-hidden="true"></div>
              </div>
              <div className="catalog-card-content">
                <h3 className="catalog-card-title">{item.title}</h3>
                <p className="catalog-card-description">{item.description}</p>
                <div className="catalog-card-labels">
                  {item.labels.map(label => (
                    <span key={label} className="catalog-card-label">{label}</span>
                  ))}
                </div>
              </div>
            </div>
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