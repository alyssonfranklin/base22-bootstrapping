import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export default function MainNavigation() {
  return (
    <nav className="main-navigation">
      <NavigationMenu.Root orientation="vertical" className="nav-root">
        <div className="nav-section">
          <h3 className="nav-section-title">Main</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link active">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link href="/news" className="nav-link">News & Announcements</Link>
            </li>
            <li className="nav-item">
              <Link href="/events" className="nav-link">Events</Link>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className="nav-section-title">Resources</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/documents" className="nav-link">Documents</Link>
            </li>
            <li className="nav-item">
              <Link href="/forms" className="nav-link">Forms</Link>
            </li>
            <li className="nav-item">
              <Link href="/policies" className="nav-link">Policies</Link>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className="nav-section-title">Departments</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/hr" className="nav-link">Human Resources</Link>
            </li>
            <li className="nav-item">
              <Link href="/it" className="nav-link">IT</Link>
            </li>
            <li className="nav-item">
              <Link href="/finance" className="nav-link">Finance</Link>
            </li>
            <li className="nav-item">
              <Link href="/marketing" className="nav-link">Marketing</Link>
            </li>
          </ul>
        </div>
      </NavigationMenu.Root>
    </nav>
  );
}
