"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscribe logic would go here
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };
  
  return (
    <footer className="footer-container" aria-labelledby="footer-heading">
      <div className="footer-main">
        <div className="footer-section newsletter-section">
          <h3 id="footer-heading" className="footer-heading">Subscribe to our Newsletter</h3>
          <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Newsletter subscription">
            <div className="newsletter-input-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input focus-ring"
                value={email}
                onChange={handleEmailChange}
                required
                aria-label="Email address for newsletter"
                aria-required="true"
              />
              <button 
                type="submit" 
                className="newsletter-button focus-ring touch-target"
                aria-label="Subscribe to newsletter"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
        
        <div className="footer-columns">
          <div className="footer-section company-section">
            <div className="company-logo">HRX</div>
            <address className="company-address">
              1391 Timberlake Manor Parkway<br />
              Chesterfield, MO 63017<br />
              <a href="tel:+13142922000" className="footer-link">Phone: +1-314-292-2000</a>
            </address>
            <div className="company-links">
              <Link href="/office-map" className="footer-link focus-ring" aria-label="View office map">Office Map</Link>
              <Link href="/contact" className="footer-link focus-ring" aria-label="Contact us">Contact Us</Link>
            </div>
          </div>
          
          <nav className="footer-section links-section" aria-labelledby="nav-workspace">
            <h4 id="nav-workspace" className="footer-column-title">My Workspace</h4>
            <ul className="footer-links">
              <li><Link href="/my-workspace/hr" className="footer-link focus-ring">My HR</Link></li>
              <li><Link href="/my-workspace/money" className="footer-link focus-ring">My Money</Link></li>
              <li><Link href="/my-workspace/health" className="footer-link focus-ring">My Health</Link></li>
              <li><Link href="/my-workspace/job" className="footer-link focus-ring">My Job</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-section links-section" aria-labelledby="nav-career">
            <h4 id="nav-career" className="footer-column-title">Life & Career</h4>
            <ul className="footer-links">
              <li><Link href="/life-career/trainings" className="footer-link focus-ring">Trainings</Link></li>
              <li><Link href="/life-career/life-events" className="footer-link focus-ring">Life Events</Link></li>
              <li><Link href="/life-career/link-3" className="footer-link focus-ring">Link Row 3</Link></li>
              <li><Link href="/life-career/link-4" className="footer-link focus-ring">Link Row 4</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-section links-section" aria-labelledby="nav-hrx">
            <h4 id="nav-hrx" className="footer-column-title">Everything HRX</h4>
            <ul className="footer-links">
              <li><Link href="/everything-hrx/global" className="footer-link focus-ring">Global</Link></li>
              <li><Link href="/everything-hrx/north-america" className="footer-link focus-ring">North America</Link></li>
              <li><Link href="/everything-hrx/south-america" className="footer-link focus-ring">South America</Link></li>
              <li><Link href="/everything-hrx/europe-asia" className="footer-link focus-ring">Europe & Asia</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="footer-legal">
        <nav className="legal-links" aria-label="Legal navigation">
          <Link href="/privacy" className="legal-link focus-ring">Privacy Policy</Link>
          <Link href="/terms" className="legal-link focus-ring">Terms of Use</Link>
          <Link href="/copyright" className="legal-link focus-ring">Copyright</Link>
          <Link href="/ccpa" className="legal-link california-link focus-ring">California Do Not Sell / Share My Personal Information</Link>
        </nav>
        <div className="copyright">Copyright © {currentYear} HRX. All rights reserved.</div>
      </div>
    </footer>
  );
}