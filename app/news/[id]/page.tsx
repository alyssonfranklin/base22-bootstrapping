"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useNavigation } from '@/lib/context/NavigationContext';
import { formatDate } from '@/lib/utils';

// Expanded mock article data for the detail page
const ARTICLE_DETAIL = {
  id: "article-1",
  title: "Venus Terraforming Dream Realized by SI!",
  author: "Dr. Elena Kazan",
  date: "2025-01-17T09:00:00Z",
  category: "Space Innovation",
  heroImage: "/images/news/venus-terraforming.jpg",
  content: `
    <p>In a breakthrough that redefines what humanity thought possible, HRX's Space Innovation division has successfully demonstrated the first phase of Venus terraforming technology. The prototype atmosphere processor, deployed last year, has already shown remarkable efficiency in converting Venus's toxic carbon dioxide atmosphere into breathable oxygen at rates 300% higher than theoretical models predicted.</p>
    
    <p>"This isn't just a scientific achievement; it's a paradigm shift in how we approach planetary habitability," said Dr. Marcus Wei, lead scientist on the project. "What we've accomplished fundamentally changes the timeline for potential human settlement beyond Earth."</p>
    
    <blockquote>
      The implications of this success extend far beyond Venus. We're essentially developing a planetary-scale life support system that could be adapted for Mars, Europa, or any celestial body humanity wishes to inhabit.
    </blockquote>
    
    <p>The Venus Atmospheric Modification Platform (VAMP) operates on principles initially developed for industrial carbon capture but scaled to planetary proportions. Specially engineered microorganisms, protected within pressurized conversion chambers, process the atmosphere and release oxygen while sequestering carbon in stable mineral forms.</p>
    
    <figure>
      <img src="/images/news/vamp-system.jpg" alt="Venus Atmospheric Modification Platform" />
      <figcaption>The Venus Atmospheric Modification Platform (VAMP) shown in an artist's rendering. Credit: HRX Space Innovation Division</figcaption>
    </figure>
    
    <p>Equally impressive is the platform's thermal management system, which can withstand Venus's extreme surface temperatures while maintaining optimal conditions for the processing organisms. This thermal regulation technology has immediate applications for Earth-based industries operating in extreme environments.</p>
    
    <div class="definition-block">
      <h4>Terraforming</h4>
      <p>The process of deliberately modifying a planet's atmosphere, temperature, surface topography or ecology to be similar to the environment of Earth to make it habitable by Earth-like life.</p>
    </div>
    
    <p>Financial markets have responded enthusiastically to the announcement, with HRX stock climbing 12% in the hours following the press conference. Investment analysts point to the dual value proposition of the technology—both as a long-term planetary development initiative and as a source of spin-off technologies with immediate commercial applications.</p>
    
    <p>"We're looking at a company that's now definitively leading in what will become a trillion-dollar industry," said financial analyst Sophia Chen of Global Investments. "The intellectual property alone from this project could drive HRX's growth for decades."</p>
    
    <p>The Venus project timeline has been accelerated based on these initial successes, with full atmospheric processing capacity now estimated to be achievable within 50 years—a fraction of the previous 200-year estimate. HRX has announced plans to send a human-crewed mission to establish the first research outpost in Venus's upper atmosphere by 2030.</p>
  `,
  tags: ["Space", "Innovation", "Terraforming", "Venus", "Research", "Investors"],
  relatedArticles: [
    {
      id: "related-1",
      title: "Mars Colony Reaches Population Milestone",
      excerpt: "The permanent settlement on Mars has now exceeded 500 residents, marking a significant milestone in sustainable off-world living.",
      image: "/images/news/mars-colony.jpg",
      date: "2025-01-10T14:20:00Z"
    },
    {
      id: "related-2",
      title: "Quantum Communication Breakthrough",
      excerpt: "Scientists at HRX's Quantum Computing division have achieved instantaneous data transmission across 1,500 kilometers, setting a new record.",
      image: "/images/news/quantum-comm.jpg",
      date: "2025-01-05T11:45:00Z"
    },
    {
      id: "related-3",
      title: "Space Tourism Program Expands",
      excerpt: "HRX announces new civilian space flight opportunities, including extended stays on the Lunar Gateway station.",
      image: "/images/news/space-tourism.jpg",
      date: "2024-12-28T16:30:00Z"
    }
  ]
};

export default function ArticlePage() {
  const { id } = useParams();
  const { setCurrentPage } = useNavigation();
  const [bookmarked, setBookmarked] = useState(false);
  
  // In a real application, we would fetch the article data based on the ID
  // Here we'll just use our mock data
  const article = ARTICLE_DETAIL;
  
  useEffect(() => {
    // Update breadcrumb when component mounts
    setCurrentPage({
      title: article.title,
      breadcrumbs: [
        { title: 'Home', href: '/' },
        { title: 'News', href: '/news' },
        { title: article.title, href: `/news/${article.id}` }
      ]
    });
  }, [article, setCurrentPage]);
  
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, we would save this to user preferences
  };
  
  return (
    <div className="article-page">
      <header className="article-header">
        <div className="article-meta">
          <span className="article-category">{article.category}</span>
          <span className="article-date">{formatDate(article.date)}</span>
        </div>
        <h1 className="article-title">{article.title}</h1>
        <div className="article-byline">By {article.author}</div>
        <button 
          className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`}
          onClick={toggleBookmark}
        >
          {bookmarked ? 'Added to My Links' : 'Add to My Links'}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </header>
      
      <div className="article-hero">
        <div className="placeholder-image hero-image" aria-hidden="true"></div>
      </div>
      
      <div className="article-content">
        <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        
        <div className="article-tags">
          <h3>Related Topics</h3>
          <div className="tags-container">
            {article.tags.map(tag => (
              <Link href={`/news/topics/${tag.toLowerCase()}`} key={tag} className="tag-button">
                {tag}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="social-sharing">
          <h3>Share this article</h3>
          <div className="social-icons">
            <a href="#" className="social-icon linkedin" aria-label="Share on LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
            </a>
            <a href="#" className="social-icon facebook" aria-label="Share on Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </a>
            <a href="#" className="social-icon twitter" aria-label="Share on Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="social-icon instagram" aria-label="Share on Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <section className="related-content">
        <h2>Related Content</h2>
        <div className="related-articles">
          {article.relatedArticles.map(related => (
            <Link href={`/news/${related.id}`} key={related.id} className="related-article-card">
              <div className="related-article-image">
                <div className="placeholder-image" aria-hidden="true"></div>
              </div>
              <div className="related-article-content">
                <span className="related-article-date">{formatDate(related.date)}</span>
                <h3 className="related-article-title">{related.title}</h3>
                <p className="related-article-excerpt">{related.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="newsletter-signup">
        <div className="newsletter-container">
          <h2>Stay Updated with Our Newsletter</h2>
          <p>Subscribe to receive the latest news, updates, and exclusive content directly in your inbox.</p>
          <form className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">SIGN UP</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}