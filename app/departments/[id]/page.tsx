'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useNavigation } from '@/lib/context/NavigationContext';
import { getDepartmentById } from '../actions';
import { formatDate } from '@/lib/utils';

export default function DepartmentDetail() {
  const params = useParams();
  const { setNavCurrentPage } = useNavigation();
  const [department, setDepartment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>(['0']); // First item open by default

  useEffect(() => {
    async function loadDepartment() {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const data = await getDepartmentById(id as string);
        setDepartment(data);
        setIsLoading(false);

        if (data) {
          setNavCurrentPage({
            title: data.title,
            breadcrumbs: [
              { title: 'Home', href: '/' },
              { title: 'Departments', href: '/departments' },
              { title: data.shortTitle, href: `/departments/${data.id}` }
            ]
          });
        }
      } catch (error) {
        console.error('Error loading department:', error);
        setIsLoading(false);
      }
    }

    loadDepartment();
  }, [params.id, setNavCurrentPage]);

  const toggleAccordionItem = (itemId: string) => {
    setOpenAccordionItems((prev) => 
      prev.includes(itemId) 
        ? prev.filter(item => item !== itemId) 
        : [...prev, itemId]
    );
  };

  if (isLoading) {
    return <div className="department-page">Loading department information...</div>;
  }

  if (!department) {
    return <div className="department-page">Department not found</div>;
  }

  const lastUpdatedDate = new Date(department.lastUpdated);

  return (
    <div className="department-page">
      {/* Department Header */}
      <div className="department-header">
        <h1 className="department-title">{department.title}</h1>
        <div className="department-last-updated">
          Last updated: {formatDate(lastUpdatedDate)}
        </div>
      </div>

      {/* Featured Image */}
      <div className="department-featured-image">
        <div className="department-placeholder-image">
          {/* In a production app, this would be a real image */}
          <div className="department-silhouette"></div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="department-layout">
        {/* Main Content Area */}
        <div className="department-main-content">
          {/* Description Section */}
          <section className="department-description">
            {department.detailedDescription.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          {/* Artemis Section */}
          {department.artemisInfo && (
            <section className="artemis-section">
              <h2>{department.artemisInfo.title}</h2>
              <p>{department.artemisInfo.description}</p>
            </section>
          )}

          {/* Common Questions Accordion */}
          {department.commonQuestions && department.commonQuestions.length > 0 && (
            <section className="accordion-section">
              <h2>Common Questions</h2>
              <div className="department-accordion" role="accordion">
                {department.commonQuestions.map((question: any, index: number) => {
                  const isOpen = openAccordionItems.includes(index.toString());
                  return (
                    <div className="accordion-item" key={index}>
                      <button 
                        className="accordion-trigger" 
                        onClick={() => toggleAccordionItem(index.toString())}
                        aria-expanded={isOpen}
                        aria-controls={`content-${index}`}
                      >
                        {question.question}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="accordion-icon"
                          data-state={isOpen ? 'open' : 'closed'}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      {isOpen && (
                        <div 
                          className="accordion-content" 
                          role="region" 
                          id={`content-${index}`}
                          aria-labelledby={`heading-${index}`}
                        >
                          <p>{question.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="department-sidebar">
          {/* Promotions Section */}
          {department.promotions && department.promotions.length > 0 && (
            <div className="sidebar-section">
              <h3>Department Promotions</h3>
              {department.promotions.map((promotion: any, index: number) => (
                <div className="promotion-item" key={index}>
                  <div className="promotion-title">{promotion.title}</div>
                  <div className="promotion-description">{promotion.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Downloads Section */}
          {department.documents && department.documents.length > 0 && (
            <div className="sidebar-section">
              <h3>Downloads</h3>
              <ul className="document-list">
                {department.documents.map((document: any, index: number) => (
                  <li className="document-item" key={index}>
                    <div className="document-icon">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="document-info">
                      <div className="document-name">{document.name}</div>
                      <div className="document-metadata">{document.format} • {document.size}</div>
                    </div>
                    <a href={document.url} className="document-download" title="Download document">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Section */}
          {department.supportOptions && department.supportOptions.length > 0 && (
            <div className="sidebar-section">
              <h3>Support</h3>
              <div className="support-options">
                {department.supportOptions.map((option: any, index: number) => (
                  <div className="support-option" key={index}>
                    <div className="support-icon">
                      {option.icon === 'mail' && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      )}
                      {option.icon === 'phone' && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      )}
                      {option.icon === 'tool' && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                      )}
                      {option.icon === 'clipboard' && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                      )}
                    </div>
                    <div className="support-title">{option.title}</div>
                    <div className="support-description">{option.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}