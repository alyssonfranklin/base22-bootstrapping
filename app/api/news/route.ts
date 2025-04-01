import { NextRequest, NextResponse } from 'next/server';
import { getNews, getNewsById, getNewsByCategory, getFeaturedNews, filterAndPaginateData } from '@/lib/data.server';
import { FilterOptions } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check for specific ID
    const id = searchParams.get('id');
    if (id) {
      const article = await getNewsById(id);
      
      if (!article) {
        return NextResponse.json(
          { error: 'News article not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(article);
    }
    
    // Check for featured flag
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      const limit = parseInt(searchParams.get('limit') || '3', 10);
      const featuredNews = await getFeaturedNews(limit);
      return NextResponse.json(featuredNews);
    }
    
    // Check for category
    const category = searchParams.get('category');
    if (category) {
      const categoryNews = await getNewsByCategory(category);
      return NextResponse.json(categoryNews);
    }
    
    // Handle filtering and pagination
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    
    const filterOptions: FilterOptions = {
      keyword: searchParams.get('keyword') || undefined,
      category: searchParams.get('category') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'newest',
      sortDirection: (searchParams.get('sortDirection') as any) || 'desc'
    };
    
    // If tags are provided as comma-separated list
    const tags = searchParams.get('tags');
    if (tags) {
      filterOptions.tags = tags.split(',');
    }
    
    // Get paginated and filtered news
    const result = await filterAndPaginateData(
      getNews,
      filterOptions,
      page,
      pageSize
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in news API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}