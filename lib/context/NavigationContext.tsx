"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type NavigationContextType = {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  currentPage: {
    title: string;
    breadcrumbs: { title: string; href: string }[];
  };
  setCurrentPage: (page: { title: string; breadcrumbs: { title: string; href: string }[] }) => void;
};

const defaultContext: NavigationContextType = {
  activeSection: null,
  setActiveSection: () => {},
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
  currentPage: {
    title: 'Home',
    breadcrumbs: [{ title: 'Home', href: '/' }],
  },
  setCurrentPage: () => {},
};

const NavigationContext = createContext<NavigationContextType>(defaultContext);

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState({
    title: 'Home',
    breadcrumbs: [{ title: 'Home', href: '/' }],
  });

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        mobileMenuOpen,
        setMobileMenuOpen,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};