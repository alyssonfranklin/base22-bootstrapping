import Link from 'next/link';
import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { useNavigation } from '@/lib/context/NavigationContext';

export default function Header() {
  const { setMobileMenuOpen } = useNavigation();
  
  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };
  
  return (
    <header className="header">
      <div className="header-logo">
        <Link href="/">
          <div className="logo-container">
            <span className="logo-text">HRX</span>
            <span className="logo-tag">NORTH AMERICA</span>
          </div>
        </Link>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search this site" 
          className="search-input"
        />
        <button className="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      
      <div className="header-actions">
        <button className="icon-button" aria-label="Help">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>
        
        <button className="icon-button" aria-label="Bookmarks">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="user-menu-button">
              <Avatar.Root className="avatar-root">
                <Avatar.Fallback className="avatar-fallback">JD</Avatar.Fallback>
              </Avatar.Root>
            </button>
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" sideOffset={5}>
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
                <Link href="/profile">My Profile</Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item className="dropdown-item">
                <Link href="/settings">Account Settings</Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item className="dropdown-item">
                <Link href="/preferences">Preferences</Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Separator className="dropdown-separator" />
              
              <DropdownMenu.Item className="dropdown-item">
                <button className="logout-button">Sign Out</button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      
      <button className="mobile-menu-button" aria-label="Menu" onClick={openMobileMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </header>
  );
}