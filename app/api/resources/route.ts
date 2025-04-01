import { NextRequest, NextResponse } from 'next/server';
import { 
  getResources, 
  getResourceById, 
  getResourcesByCategory, 
  getFeaturedResources,
  getRelatedResources,
  getResourceDocuments
} from '@/lib/data.server';
import { FilterOptions } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check for specific ID
    const id = searchParams.get('id');
    if (id) {
      const resource = await getResourceById(id);
      
      if (!resource) {
        return NextResponse.json(
          { error: 'Resource not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(resource);
    }
    
    // Check for featured resources
    if (searchParams.get('featured') === 'true') {
      const limit = parseInt(searchParams.get('limit') || '3', 10);
      const featuredResources = await getFeaturedResources(limit);
      return NextResponse.json(featuredResources);
    }
    
    // Check for category
    const category = searchParams.get('category');
    if (category) {
      const categoryResources = await getResourcesByCategory(category);
      return NextResponse.json(categoryResources);
    }
    
    // Check for related resources
    const relatedTo = searchParams.get('relatedTo');
    if (relatedTo) {
      const limit = parseInt(searchParams.get('limit') || '3', 10);
      const relatedResources = await getRelatedResources(relatedTo, limit);
      return NextResponse.json(relatedResources);
    }
    
    // Check for documents
    const resourceId = searchParams.get('documents');
    if (resourceId) {
      const documents = await getResourceDocuments(resourceId);
      return NextResponse.json(documents);
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
    
    // Get all resources and return
    const allResources = await getResources();
    return NextResponse.json(allResources);
  } catch (error) {
    console.error('Error in resources API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources data' },
      { status: 500 }
    );
  }
}