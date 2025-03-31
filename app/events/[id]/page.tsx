import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getEventById, getRelatedEvents } from '../actions';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = await getEventById(params.id);
  
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.'
    };
  }
  
  return {
    title: `${event.title} | Space Industries Events`,
    description: event.description || 'Join us for this exciting event.',
  };
}

export default async function EventDetail({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);
  
  if (!event) {
    notFound();
  }
  
  // Get related events
  const relatedEvents = await getRelatedEvents(params.id, 3);
  
  // Format the dates
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  // Format time range
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const startTime = new Intl.DateTimeFormat('en-US', timeOptions).format(startDate);
  const endTime = new Intl.DateTimeFormat('en-US', timeOptions).format(endDate);
  const timeRange = `${startTime} - ${endTime}`;
  
  // Format date
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(startDate);
  
  // Format month and day for related events
  const getMonthShort = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'short' });
  };
  
  const getDay = (date: Date) => {
    return date.getDate();
  };
  
  return (
    <div className="event-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="event-breadcrumb">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li>{event.title}</li>
        </ul>
      </nav>
      
      <div className="event-detail-header">
        <h1 className="event-title">{event.title}</h1>
        
        <div className="event-meta">
          <div className="event-datetime">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{formattedDate}</span>
            <span>{timeRange}</span>
          </div>
          
          <div className="event-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {event.location}
          </div>
          
          <div className="event-organizer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Organized by: {event.organizer}
          </div>
        </div>
      </div>
      
      <section className="event-featured-section">
        <div className="quote-and-image">
          <div className="event-quote-container">
            <blockquote className="event-quote">
              &ldquo;{event.featuredQuote || "Space Industries International believes in celebrating innovation not just in technology, but in the culinary arts as well. Our annual festival represents our commitment to excellence in all domains."}&rdquo;
              <cite className="quote-author">{event.quoteAuthor || "Dr. Eleanor Reeves, CEO of Space Industries International"}</cite>
            </blockquote>
          </div>
          
          <div className="event-featured-image">
            {/* In a production app, this would be a real image */}
            <div className="placeholder-image">
              <div className="business-person-silhouette"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="event-description-section">
        <h2>About This Event</h2>
        {event.description.split('. ').map((sentence, index) => (
          <p key={index}>{sentence}.</p>
        ))}
      </section>
      
      {/* Agenda Section */}
      {event.agenda && event.agenda.length > 0 && (
        <section className="event-agenda-section">
          <h2>Agenda:</h2>
          <div className="agenda-items">
            {event.agenda.map((item: any, index: number) => (
              <div className="agenda-item" key={index}>
                <div className="agenda-time">{item.time}</div>
                <div className="agenda-activity">
                  <h3>{item.activity}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Related Events Section */}
      {relatedEvents && relatedEvents.length > 0 && (
        <section className="related-events-section">
          <h2>Other Events You May Like</h2>
          <div className="related-events-grid">
            {relatedEvents.map((relatedEvent: any) => {
              const eventDate = new Date(relatedEvent.startDate);
              return (
                <Link 
                  href={`/events/${relatedEvent.id}`} 
                  key={relatedEvent.id}
                  className="related-event-card"
                >
                  <div className="event-date-block">
                    <span className="event-month">{getMonthShort(eventDate)}</span>
                    <span className="event-day">{getDay(eventDate)}</span>
                  </div>
                  <div className="related-event-details">
                    <h3 className="related-event-title">{relatedEvent.title}</h3>
                    <div className="related-event-time">
                      {new Intl.DateTimeFormat('en-US', timeOptions).format(eventDate)}
                    </div>
                    <div className="related-event-location">{relatedEvent.location}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}