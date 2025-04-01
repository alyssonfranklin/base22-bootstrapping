import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@/lib/data.server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get search query
    const query = searchParams.get('q');
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }
    
    // Get limit
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    // Perform search
    const results = await searchContent(query, limit);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in search API route:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}