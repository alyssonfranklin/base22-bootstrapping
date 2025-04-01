import { NextRequest, NextResponse } from 'next/server';
import { 
  getEvents, 
  getEventById, 
  getUpcomingEvents, 
  getPastEvents,
  getRelatedEvents,
  filterAndPaginateData 
} from '@/lib/data.server';
import { FilterOptions } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check for specific ID
    const id = searchParams.get('id');
    if (id) {
      const event = await getEventById(id);
      
      if (!event) {
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(event);
    }
    
    // Check for upcoming events
    if (searchParams.get('upcoming') === 'true') {
      const limit = parseInt(searchParams.get('limit') || '5', 10);
      const upcomingEvents = await getUpcomingEvents(limit);
      return NextResponse.json(upcomingEvents);
    }
    
    // Check for past events
    if (searchParams.get('past') === 'true') {
      const limit = parseInt(searchParams.get('limit') || '5', 10);
      const pastEvents = await getPastEvents(limit);
      return NextResponse.json(pastEvents);
    }
    
    // Check for related events
    const relatedTo = searchParams.get('relatedTo');
    if (relatedTo) {
      const limit = parseInt(searchParams.get('limit') || '3', 10);
      const relatedEvents = await getRelatedEvents(relatedTo, limit);
      return NextResponse.json(relatedEvents);
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
    
    // Get paginated and filtered events
    const result = await filterAndPaginateData(
      getEvents,
      filterOptions,
      page,
      pageSize
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in events API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events data' },
      { status: 500 }
    );
  }
}