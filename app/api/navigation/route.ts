import { NextRequest, NextResponse } from 'next/server';
import { getNavigation } from '@/lib/data.server';

export async function GET(request: NextRequest) {
  try {
    const navigation = await getNavigation();
    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Error in navigation API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch navigation data' },
      { status: 500 }
    );
  }
}