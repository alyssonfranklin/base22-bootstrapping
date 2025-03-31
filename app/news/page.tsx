import { Metadata } from 'next';
import NewsCard from '@/components/pages/NewsCard';
import news from '@/data/news.json';

export const metadata: Metadata = {
  title: 'News & Announcements - Organization Portal',
  description: 'Latest news and announcements from the organization',
};

export default function NewsPage() {
  const featuredNews = news.filter(item => item.featured);
  const regularNews = news.filter(item => !item.featured);
  
  return (
    <div className="news-page">
      <h1>News & Announcements</h1>
      
      {featuredNews.length > 0 && (
        <section className="featured-news">
          <h2>Featured News</h2>
          <div className="news-grid">
            {featuredNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </section>
      )}
      
      <section className="all-news">
        <h2>All News</h2>
        <div className="news-grid">
          {regularNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
