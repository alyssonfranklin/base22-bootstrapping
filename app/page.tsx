import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home - HRX Portal | North America',
  description: 'Welcome to the HRX North America Employee Portal',
};

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-background">
          {/* This would be replaced with an actual image in production */}
          <div className="placeholder-image hero-image" aria-hidden="true"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to your new Employee Experience</h1>
          <p className="hero-subtitle">
            Designed with the employees from various teams, this new platform is your new ally in your daily activities.
          </p>
          <Link href="/about" className="hero-button">
            LEARN MORE
          </Link>
          <div className="hero-indicators">
            <button className="indicator active" aria-label="Slide 1"></button>
            <button className="indicator" aria-label="Slide 2"></button>
            <button className="indicator" aria-label="Slide 3"></button>
          </div>
        </div>
      </section>

      {/* Top News Section */}
      <section className="news-section">
        <div className="section-header">
          <h2 className="section-title">Top News</h2>
          <Link href="/news" className="view-all-link">
            VIEW ALL
          </Link>
        </div>
        <div className="top-news-grid">
          <div className="news-card">
            <div className="news-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="news-content">
              <div className="news-date">August 23, 2023</div>
              <h3 className="news-title">Q2 Financial Results Exceed Expectations</h3>
              <p className="news-description">
                HRX announces strong second-quarter results with revenue growth of 15% year-over-year, exceeding market expectations.
              </p>
              <span className="category-tag">CORPORATE</span>
            </div>
          </div>
          
          <div className="news-card">
            <div className="news-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="news-content">
              <div className="news-date">August 17, 2023</div>
              <h3 className="news-title">New Sustainability Initiative Launched</h3>
              <p className="news-description">
                HRX introduces comprehensive sustainability program aimed at reducing carbon footprint by 30% by 2025.
              </p>
              <span className="category-tag">SUSTAINABILITY</span>
            </div>
          </div>
          
          <div className="news-card">
            <div className="news-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="news-content">
              <div className="news-date">August 15, 2023</div>
              <h3 className="news-title">Employee Wellness Program Expands</h3>
              <p className="news-description">
                New mental health resources and fitness benefits added to the employee wellness program, effective September 1.
              </p>
              <span className="category-tag">BENEFITS</span>
            </div>
          </div>
          
          <div className="news-card">
            <div className="news-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="news-content">
              <div className="news-date">August 10, 2023</div>
              <h3 className="news-title">Annual Company Picnic Announced</h3>
              <p className="news-description">
                Save the date! Annual company picnic scheduled for September 18 at Riverside Park. Family and friends welcome.
              </p>
              <span className="category-tag">EVENTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Departments Section */}
      <section className="departments-section">
        <div className="section-header">
          <h2 className="section-title">Featured Departments</h2>
          <Link href="/departments" className="view-all-link">
            VIEW ALL
          </Link>
        </div>
        <div className="departments-grid">
          <Link href="/departments/space-innovation" className="department-card">
            <div className="department-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <h3 className="department-title">Space Innovation</h3>
          </Link>
          
          <Link href="/departments/engineering" className="department-card">
            <div className="department-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <h3 className="department-title">Engineering</h3>
          </Link>
          
          <Link href="/departments/human-resources" className="department-card">
            <div className="department-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <h3 className="department-title">Human Resources</h3>
          </Link>
          
          <Link href="/departments/communications" className="department-card">
            <div className="department-image">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <h3 className="department-title">Communications</h3>
          </Link>
        </div>
      </section>

      {/* Other News Section */}
      <section className="other-news-section">
        <div className="section-header">
          <h2 className="section-title">Other News</h2>
          <Link href="/news" className="view-all-link">
            VIEW ALL
          </Link>
        </div>
        <ul className="other-news-list">
          <li className="other-news-item">
            <div className="news-thumbnail">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="other-news-content">
              <div className="other-news-meta">
                <span className="category-tag small">IT</span>
                <span className="news-date small">August 8, 2023</span>
              </div>
              <h3 className="other-news-title">IT System Maintenance Scheduled for Weekend</h3>
            </div>
          </li>
          
          <li className="other-news-item">
            <div className="news-thumbnail">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="other-news-content">
              <div className="other-news-meta">
                <span className="category-tag small">TRAINING</span>
                <span className="news-date small">August 7, 2023</span>
              </div>
              <h3 className="other-news-title">New Leadership Development Program Open for Applications</h3>
            </div>
          </li>
          
          <li className="other-news-item">
            <div className="news-thumbnail">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="other-news-content">
              <div className="other-news-meta">
                <span className="category-tag small">FACILITIES</span>
                <span className="news-date small">August 5, 2023</span>
              </div>
              <h3 className="other-news-title">Office Renovation Project Enters Final Phase</h3>
            </div>
          </li>
          
          <li className="other-news-item">
            <div className="news-thumbnail">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="other-news-content">
              <div className="other-news-meta">
                <span className="category-tag small">RECRUITMENT</span>
                <span className="news-date small">August 3, 2023</span>
              </div>
              <h3 className="other-news-title">Employee Referral Program Bonus Increased for Q3</h3>
            </div>
          </li>
          
          <li className="other-news-item">
            <div className="news-thumbnail">
              <div className="placeholder-image" aria-hidden="true"></div>
            </div>
            <div className="other-news-content">
              <div className="other-news-meta">
                <span className="category-tag small">POLICY</span>
                <span className="news-date small">August 1, 2023</span>
              </div>
              <h3 className="other-news-title">Updated Remote Work Policy Now Available</h3>
            </div>
          </li>
        </ul>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <div className="section-header">
          <h2 className="section-title">Quick Links</h2>
          <Link href="/links" className="view-all-link">
            VIEW ALL
          </Link>
        </div>
        <div className="quick-links-grid">
          <div className="quick-links-column">
            <Link href="/timesheet" className="quick-link">Timesheet</Link>
            <Link href="/benefits" className="quick-link">Benefits Information</Link>
            <Link href="/training" className="quick-link">Training Portal</Link>
            <Link href="/vacation" className="quick-link">Time-Off Request</Link>
            <Link href="/directory" className="quick-link">Employee Directory</Link>
          </div>
          <div className="quick-links-column">
            <Link href="/helpdesk" className="quick-link">IT Help Desk</Link>
            <Link href="/expenses" className="quick-link">Expense Reports</Link>
            <Link href="/payroll" className="quick-link">Payroll Portal</Link>
            <Link href="/parking" className="quick-link">Parking Information</Link>
            <Link href="/cafeteria" className="quick-link">Cafeteria Menu</Link>
          </div>
        </div>
      </section>

      {/* Highlighted Feature Section */}
      <section className="feature-section">
        <div className="feature-content">
          <h2 className="feature-title">Our Bold, New Digital Experience</h2>
          <p className="feature-description">
            Explore our new digital platform designed to enhance your employee experience. Access resources, 
            connect with colleagues, and stay informed about company updates all in one place.
          </p>
          <Link href="/about/digital-experience" className="feature-button">
            KNOW MORE
          </Link>
        </div>
        <div className="feature-image">
          <div className="placeholder-image" aria-hidden="true"></div>
        </div>
      </section>
    </div>
  );
}