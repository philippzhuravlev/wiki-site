import { NextResponse } from 'next/server';
import { getEquivalentRegion } from '@/lib/utils/era-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentEra = searchParams.get('currentEra');
  const targetEra = searchParams.get('targetEra');
  const currentPage = searchParams.get('currentPage');

  if (!currentEra || !targetEra || !currentPage) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const equivalent = await getEquivalentRegion(currentEra, targetEra, currentPage);
    return NextResponse.json({ equivalent });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to find equivalent page' }, { status: 500 });
  }
} 