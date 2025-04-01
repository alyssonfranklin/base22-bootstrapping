"use client";

import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useNavigation } from '@/lib/context/NavigationContext';
import { useEffect, useRef, KeyboardEvent } from 'react';

type MenuItem = {
  title: string;
  link?: string;
  items?: { title: string; link: string }[];
};

const menuItems: MenuItem[] = [
  {
    title: 'My Workspace',
    items: [
      { title: 'Dashboard', link: '/workspace/dashboard' },
      { title: 'Calendar', link: '/workspace/calendar' },
      { title: 'Tasks', link: '/workspace/tasks' },
      { title: 'Documents', link: '/workspace/documents' },
    ],
  },
  {
    title: 'Life & Career',
    items: [
      { title: 'Benefits', link: '/life-career/benefits' },
      { title: 'Training', link: '/life-career/training' },
      { title: 'Development', link: '/life-career/development' },
      { title: 'Well-being', link: '/life-career/wellbeing' },
      { title: 'Resource Catalog', link: '/catalog' },
    ],
  },
  {
    title: 'Self Service',
    items: [
      { title: 'Time Off', link: '/self-service/time-off' },
      { title: 'Expenses', link: '/self-service/expenses' },
      { title: 'Pay Information', link: '/self-service/pay' },
      { title: 'Personal Info', link: '/self-service/personal' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { title: 'Resource Directory', link: '/directory' },
      { title: 'Departments', link: '/departments' },
      { title: 'Locations', link: '/explore/locations' },
      { title: 'Knowledge Base', link: '/explore/knowledge' },
    ],
  },
  {
    title: 'News Feed',
    link: '/news',
    items: [
      { title: 'News Catalog', link: '/news' },
      { title: 'Announcements', link: '/news/announcements' },
      { title: 'Company Updates', link: '/news/updates' },
      { title: 'Events', link: '/events' },
      { title: 'Newsletter', link: '/news/newsletter' },
    ],
  },
];

export default function MainNavigation() {
  const { activeSection, setActiveSection, currentPage } = useNavigation();
  const navRef = useRef<HTMLDivElement>(null);
  
  const handleMenuToggle = (menuTitle: string) => {
    setActiveSection(activeSection === menuTitle ? null : menuTitle);
  };
  
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, menuTitle: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleMenuToggle(menuTitle);
        break;
      case 'Escape':
        if (activeSection === menuTitle) {
          setActiveSection(null);
        }
        break;
      case 'ArrowDown':
        if (activeSection === menuTitle) {
          event.preventDefault();
          // Focus first item in dropdown
          const firstDropdownItem = document.querySelector('.nav-dropdown-item a') as HTMLElement;
          if (firstDropdownItem) {
            firstDropdownItem.focus();
          }
        }
        break;
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && activeSection) {
        setActiveSection(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSection, setActiveSection]);
  
  return (
    <nav className="main-navigation-container" aria-label="Main navigation">
      <Link href="#main-content" className="skip-to-content">Skip to main content</Link>
      
      <div className="main-navigation" ref={navRef}>
        <NavigationMenu.Root orientation="horizontal" className="nav-root">
          <NavigationMenu.List className="nav-list-horizontal">
            {menuItems.map((item) => (
              <NavigationMenu.Item key={item.title} className="nav-item-horizontal">
                {item.items ? (
                  <DropdownMenu.Root open={activeSection === item.title} onOpenChange={() => handleMenuToggle(item.title)}>
                    <DropdownMenu.Trigger 
                      className="nav-dropdown-trigger focus-ring"
                      aria-expanded={activeSection === item.title}
                      aria-haspopup="true"
                      onKeyDown={(e) => handleKeyDown(e, item.title)}
                    >
                      {item.title}
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
                        className={`dropdown-arrow ${activeSection === item.title ? 'open' : ''}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </DropdownMenu.Trigger>
                    
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content 
                        className="nav-dropdown-content" 
                        sideOffset={4}
                        aria-label={`${item.title} submenu`}
                      >
                        {item.items.map((subItem) => (
                          <DropdownMenu.Item key={subItem.title} className="nav-dropdown-item">
                            <Link 
                              href={subItem.link} 
                              className="focus-ring"
                              onClick={() => setActiveSection(null)}
                            >
                              {subItem.title}
                            </Link>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                ) : (
                  <Link href={item.link || '/'} className="nav-link-horizontal focus-ring">
                    {item.title}
                  </Link>
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
      
      <nav className="breadcrumb-container" aria-label="Breadcrumb navigation">
        <div className="breadcrumbs">
          {currentPage.breadcrumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
              {index === currentPage.breadcrumbs.length - 1 ? (
                <span className="breadcrumb-item current" aria-current="page">{crumb.title}</span>
              ) : (
                <Link href={crumb.href} className="breadcrumb-item focus-ring">
                  {crumb.title}
                </Link>
              )}
            </span>
          ))}
        </div>
      </nav>
    </nav>
  );
}