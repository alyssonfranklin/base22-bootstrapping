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
    <footer className="footer-container">
      <div className="footer-main">
        <div className="footer-section newsletter-section">
          <h3 className="footer-heading">Subscribe to our Newsletter and never miss what&apos;s new!</h3>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit" className="newsletter-button">SIGN UP</button>
            </div>
          </form>
        </div>
        
        <div className="footer-columns">
          <div className="footer-section company-section">
            <div className="company-logo">HRX</div>
            <address className="company-address">
              1391 Timberlake Manor Parkway<br />
              Chesterfield, MO 63017<br />
              Phone: +1-314-292-2000
            </address>
            <div className="company-links">
              <Link href="/office-map" className="footer-link">Office Map</Link>
              <Link href="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>
          
          <div className="footer-section links-section">
            <h4 className="footer-column-title">My Workspace</h4>
            <ul className="footer-links">
              <li><Link href="/my-workspace/hr" className="footer-link">My HR</Link></li>
              <li><Link href="/my-workspace/money" className="footer-link">My Money</Link></li>
              <li><Link href="/my-workspace/health" className="footer-link">My Health</Link></li>
              <li><Link href="/my-workspace/job" className="footer-link">My Job</Link></li>
            </ul>
          </div>
          
          <div className="footer-section links-section">
            <h4 className="footer-column-title">Life & Career</h4>
            <ul className="footer-links">
              <li><Link href="/life-career/trainings" className="footer-link">Trainings</Link></li>
              <li><Link href="/life-career/life-events" className="footer-link">Life Events</Link></li>
              <li><Link href="/life-career/link-3" className="footer-link">Link Row 3</Link></li>
              <li><Link href="/life-career/link-4" className="footer-link">Link Row 4</Link></li>
            </ul>
          </div>
          
          <div className="footer-section links-section">
            <h4 className="footer-column-title">Everything HRX</h4>
            <ul className="footer-links">
              <li><Link href="/everything-hrx/global" className="footer-link">Global</Link></li>
              <li><Link href="/everything-hrx/north-america" className="footer-link">North America</Link></li>
              <li><Link href="/everything-hrx/south-america" className="footer-link">South America</Link></li>
              <li><Link href="/everything-hrx/europe-asia" className="footer-link">Europe & Asia</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-legal">
        <div className="legal-links">
          <Link href="/privacy" className="legal-link">Privacy Policy</Link>
          <Link href="/terms" className="legal-link">Terms of Use</Link>
          <Link href="/copyright" className="legal-link">Copyright</Link>
          <Link href="/ccpa" className="legal-link california-link">California Do Not Sell / Share My Personal Information</Link>
        </div>
        <div className="copyright">Copyright © {currentYear} HRX. All rights reserved.</div>
      </div>
    </footer>
  );
}