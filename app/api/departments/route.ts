import { NextRequest, NextResponse } from 'next/server';
import { 
  getDepartments, 
  getDepartmentById, 
  getRelatedDepartments 
} from '@/lib/data.server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check for specific ID
    const id = searchParams.get('id');
    if (id) {
      const department = await getDepartmentById(id);
      
      if (!department) {
        return NextResponse.json(
          { error: 'Department not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(department);
    }
    
    // Check for related departments
    const relatedTo = searchParams.get('relatedTo');
    if (relatedTo) {
      const limit = parseInt(searchParams.get('limit') || '3', 10);
      const relatedDepartments = await getRelatedDepartments(relatedTo, limit);
      return NextResponse.json(relatedDepartments);
    }
    
    // Get all departments
    const departments = await getDepartments();
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error in departments API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments data' },
      { status: 500 }
    );
  }
}