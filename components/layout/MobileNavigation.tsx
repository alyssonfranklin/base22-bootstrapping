import { useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigation } from '@/lib/context/NavigationContext';

export default function MobileNavigation() {
  const { mobileMenuOpen, setMobileMenuOpen } = useNavigation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const toggleItem = (title: string) => {
    setExpandedItems((prev) => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
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
        { title: 'Company Directory', link: '/explore/directory' },
        { title: 'Departments', link: '/explore/departments' },
        { title: 'Locations', link: '/explore/locations' },
        { title: 'Knowledge Base', link: '/explore/knowledge' },
      ],
    },
    {
      title: 'News Feed',
      link: '/news',
      items: [
        { title: 'Announcements', link: '/news/announcements' },
        { title: 'Company Updates', link: '/news/updates' },
        { title: 'Events', link: '/news/events' },
        { title: 'Newsletter', link: '/news/newsletter' },
      ],
    },
  ];
  
  return (
    <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-menu-overlay" />
        <Dialog.Content className="mobile-menu-content">
          <div className="mobile-menu-header">
            <Dialog.Title className="mobile-menu-title">Menu</Dialog.Title>
            <Dialog.Close className="mobile-menu-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Dialog.Close>
          </div>
          
          <div className="mobile-search">
            <input 
              type="text" 
              placeholder="Search this site" 
              className="mobile-search-input"
            />
            <button className="mobile-search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {menuItems.map((item) => (
                <li key={item.title} className="mobile-nav-item">
                  <div className="mobile-nav-parent">
                    {item.items ? (
                      <button 
                        className="mobile-nav-toggle"
                        onClick={() => toggleItem(item.title)}
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
                          className={`mobile-arrow ${expandedItems.includes(item.title) ? 'open' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    ) : (
                      <Link 
                        href={item.link || '/'} 
                        className="mobile-nav-link"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                  
                  {item.items && expandedItems.includes(item.title) && (
                    <ul className="mobile-subnav-list">
                      {item.items.map((subItem) => (
                        <li key={subItem.title} className="mobile-subnav-item">
                          <Link 
                            href={subItem.link} 
                            className="mobile-subnav-link"
                            onClick={closeMobileMenu}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mobile-menu-footer">
            <button className="mobile-action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Help
            </button>
            
            <button className="mobile-action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Bookmarks
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}