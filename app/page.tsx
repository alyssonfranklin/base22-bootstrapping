import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home - HRX Portal | North America',
  description: 'Welcome to the HRX North America Portal',
};

export default function Home() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to HRX North America</h1>
        <p>Your central hub for all company resources and information</p>
      </div>
      
      <div className="content-sections">
        <div className="featured-content">
          <h2>Featured Content</h2>
          <div className="featured-card">
            <div className="featured-image">
              {/* Image placeholder */}
              <div className="image-placeholder"></div>
            </div>
            <div className="featured-info">
              <span className="featured-badge">NEW</span>
              <h3>Annual Performance Reviews Start Next Week</h3>
              <p>Complete your self-assessment by June 15th. Learn more about the process and timeline.</p>
              <Link href="/news/performance-reviews" className="featured-link">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="content-grid">
          <div className="card">
            <h3>News & Announcements</h3>
            <ul className="quick-list">
              <li>
                <Link href="/news/health-benefits">
                  New Health Benefits for 2025
                </Link>
                <span className="list-date">May 12</span>
              </li>
              <li>
                <Link href="/news/office-renovation">
                  Office Renovation Update
                </Link>
                <span className="list-date">May 8</span>
              </li>
              <li>
                <Link href="/news/quarterly-results">
                  Q1 Financial Results
                </Link>
                <span className="list-date">Apr 30</span>
              </li>
            </ul>
            <Link href="/news" className="view-all-link">
              View All News
            </Link>
          </div>
          
          <div className="card">
            <h3>Quick Links</h3>
            <ul className="quick-list">
              <li>
                <Link href="/self-service/time-off">
                  Request Time Off
                </Link>
              </li>
              <li>
                <Link href="/self-service/expenses">
                  Submit Expenses
                </Link>
              </li>
              <li>
                <Link href="/it/service-desk">
                  IT Service Desk
                </Link>
              </li>
              <li>
                <Link href="/hr/benefits">
                  Benefits Portal
                </Link>
              </li>
              <li>
                <Link href="/workspace/learning">
                  Learning Portal
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3>Upcoming Events</h3>
            <ul className="events-list">
              <li>
                <div className="event-date">
                  <span className="event-month">MAY</span>
                  <span className="event-day">24</span>
                </div>
                <div className="event-info">
                  <Link href="/events/town-hall" className="event-title">
                    Quarterly Town Hall
                  </Link>
                  <span className="event-time">2:00 PM - 3:30 PM</span>
                </div>
              </li>
              <li>
                <div className="event-date">
                  <span className="event-month">JUN</span>
                  <span className="event-day">03</span>
                </div>
                <div className="event-info">
                  <Link href="/events/wellness" className="event-title">
                    Wellness Workshop
                  </Link>
                  <span className="event-time">11:00 AM - 12:00 PM</span>
                </div>
              </li>
              <li>
                <div className="event-date">
                  <span className="event-month">JUN</span>
                  <span className="event-day">15</span>
                </div>
                <div className="event-info">
                  <Link href="/events/picnic" className="event-title">
                    Company Summer Picnic
                  </Link>
                  <span className="event-time">1:00 PM - 5:00 PM</span>
                </div>
              </li>
            </ul>
            <Link href="/events" className="view-all-link">
              View All Events
            </Link>
          </div>
          
          <div className="card">
            <h3>My Tasks</h3>
            <div className="tasks-widget">
              <div className="task-stats">
                <div className="task-stat">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Due Today</span>
                </div>
                <div className="task-stat">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Upcoming</span>
                </div>
                <div className="task-stat">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <ul className="tasks-list">
                <li className="task-item">
                  <input type="checkbox" id="task1" className="task-checkbox" />
                  <label htmlFor="task1" className="task-label">Complete performance self-review</label>
                  <span className="task-due">Due Jun 15</span>
                </li>
                <li className="task-item">
                  <input type="checkbox" id="task2" className="task-checkbox" />
                  <label htmlFor="task2" className="task-label">Submit Q2 budget forecast</label>
                  <span className="task-due">Due May 25</span>
                </li>
                <li className="task-item">
                  <input type="checkbox" id="task3" className="task-checkbox" />
                  <label htmlFor="task3" className="task-label">Update contact information</label>
                  <span className="task-due">Due Today</span>
                </li>
              </ul>
              <Link href="/workspace/tasks" className="view-all-link">
                View All Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}