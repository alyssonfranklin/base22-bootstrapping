"use client";

import Link from 'next/link';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { useNavigation } from '@/lib/context/NavigationContext';

export default function Header() {
  const { setMobileMenuOpen, currentPage } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle mobile menu open
  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  // Focus search input when opening search
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      // Only apply header hiding on mobile/tablet
      if (window.innerWidth < 992) {
        const currentScrollY = window.scrollY;
        
        // Determine if we should show or hide the header
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      } else {
        // Always visible on desktop
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only submit search with content
    if (searchQuery.trim()) {
      // TODO: Implement actual search functionality
      console.log('Search for:', searchQuery);
      
      // Close mobile search after submission
      if (window.innerWidth < 768) {
        setSearchOpen(false);
      }
    }
  };

  // Handle keyboard navigation in user menu
  const handleUserMenuKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setUserMenuOpen(false);
    }
  };

  // Handle escape key to close search
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content focus-ring">
        Skip to main content
      </a>
    
      <header 
        className={`header ${!isHeaderVisible ? 'header-hidden' : ''}`}
        aria-label="Site header"
      >
        <div className="header-content">
          <div className="header-logo">
            <Link href="/" className="focus-ring" aria-label="HRX North America Home">
              <div className="logo-container">
                <span className="logo-text">HRX</span>
                <span className="logo-tag">NORTH AMERICA</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop search */}
          <div className={`search-container ${searchOpen ? 'search-open' : ''}`}>
            <form 
              role="search" 
              onSubmit={handleSearch}
              className="search-form"
            >
              <label htmlFor="site-search" className="sr-only">
                Search this site
              </label>
              <input 
                ref={searchInputRef}
                id="site-search"
                type="search" 
                placeholder="Search this site" 
                className="search-input focus-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                aria-label="Search this site"
              />
              <button 
                type="submit" 
                className="search-button focus-ring touch-target"
                aria-label="Submit search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>
          
          <div className="header-actions">
            {/* Mobile search toggle */}
            <button 
              className="icon-button md-only focus-ring touch-target" 
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              )}
            </button>
          
            <button 
              className="icon-button focus-ring touch-target" 
              aria-label="Help center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
            
            <button 
              className="icon-button focus-ring touch-target hide-xs" 
              aria-label="View bookmarks"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            
            <DropdownMenu.Root onOpenChange={setUserMenuOpen}>
              <DropdownMenu.Trigger asChild>
                <button 
                  className="user-menu-button focus-ring touch-target" 
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  onKeyDown={handleUserMenuKeyDown}
                >
                  <Avatar.Root className="avatar-root">
                    <Avatar.Fallback className="avatar-fallback">JD</Avatar.Fallback>
                  </Avatar.Root>
                </button>
              </DropdownMenu.Trigger>
              
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="dropdown-content" 
                  sideOffset={5}
                  align="end"
                  aria-label="User options"
                  ref={userMenuRef}
                >
                  <div className="user-dropdown-header">
                    <Avatar.Root className="avatar-root avatar-lg">
                      <Avatar.Fallback className="avatar-fallback">JD</Avatar.Fallback>
                    </Avatar.Root>
                    <div className="user-info">
                      <p className="user-name">John Doe</p>
                      <p className="user-email">john.doe@company.com</p>
                    </div>
                  </div>
                  
                  <DropdownMenu.Separator className="dropdown-separator" />
                  
                  <DropdownMenu.Item className="dropdown-item">
                    <Link href="/profile" className="focus-ring">My Profile</Link>
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item className="dropdown-item">
                    <Link href="/settings" className="focus-ring">Account Settings</Link>
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item className="dropdown-item">
                    <Link href="/preferences" className="focus-ring">Preferences</Link>
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Separator className="dropdown-separator" />
                  
                  <DropdownMenu.Item className="dropdown-item">
                    <button className="logout-button focus-ring">Sign Out</button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          
          <button 
            className="mobile-menu-button focus-ring touch-target" 
            aria-label="Open navigation menu" 
            aria-expanded="false"
            aria-controls="mobile-navigation"
            onClick={openMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}