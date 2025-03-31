import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getEventById, formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = await getEventById(params.id);
  
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.'
    };
  }
  
  return {
    title: `${event.title} | HRX Events`,
    description: event.description || 'Join us for this exciting event.',
  };
}

export default async function EventDetail({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);
  
  if (!event) {
    notFound();
  }
  
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
  
  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        <h1 className="event-title">{event.title}</h1>
        
        <div className="event-meta">
          <div className="event-datetime">
            <span>{formattedDate}</span>
            <span>{timeRange}</span>
          </div>
          
          <div className="event-location">
            {event.location}
          </div>
          
          <div className="event-organizer">
            Organized by: {event.organizer}
          </div>
        </div>
      </div>
      
      <section className="event-featured-section">
        <div className="quote-and-image">
          <div className="event-quote-container">
            <blockquote className="event-quote">
              "Join us for this exciting event where we will share knowledge and connect with colleagues."
              <cite className="quote-author">HRX Events Team</cite>
            </blockquote>
          </div>
          
          <div className="event-featured-image">
            <div className="placeholder-image" />
          </div>
        </div>
      </section>
      
      <section className="event-description-section">
        <h2>About This Event</h2>
        {event.description.split('. ').map((sentence, index) => (
          <p key={index}>{sentence}.</p>
        ))}
      </section>
    </div>
  );
}