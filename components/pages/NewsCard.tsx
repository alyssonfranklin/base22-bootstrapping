import Card from '@/components/ui/Card';
import { NewsItem } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';

interface NewsCardProps {
  news: NewsItem;
  showFullContent?: boolean;
}

export default function NewsCard({ news, showFullContent = false }: NewsCardProps) {
  const { title, content, author, date, category } = news;
  
  return (
    <Card className="news-card">
      <div className="news-header">
        <h3 className="news-title">{title}</h3>
        <span className="news-category">{category}</span>
      </div>
      
      <div className="news-content">
        {showFullContent ? content : truncateText(content, 150)}
      </div>
      
      <div className="news-footer">
        <span className="news-author">{author}</span>
        <span className="news-date">{formatDate(date)}</span>
      </div>
    </Card>
  );
}
