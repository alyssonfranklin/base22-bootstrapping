import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Organization Portal',
  description: 'Welcome to the organization portal',
};

export default function Home() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to the Organization Portal</h1>
        <p>Your central hub for all organization resources and information</p>
      </div>
      
      <div className="content-grid">
        <div className="card">
          <h2>News & Announcements</h2>
          <p>Stay updated with the latest organizational news</p>
        </div>
        
        <div className="card">
          <h2>Quick Links</h2>
          <p>Access frequently used resources</p>
        </div>
        
        <div className="card">
          <h2>Upcoming Events</h2>
          <p>View and register for upcoming company events</p>
        </div>
        
        <div className="card">
          <h2>Resources</h2>
          <p>Find important documents and resources</p>
        </div>
      </div>
    </div>
  );
}
