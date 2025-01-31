import { getEquivalentRegion } from '@/lib/utils/era-utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentRegion = searchParams.get('currentRegion');
  const currentEra = searchParams.get('currentEra');
  const targetEra = searchParams.get('targetEra');

  if (!currentRegion || !currentEra || !targetEra) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const equivalent = await getEquivalentRegion(currentRegion, currentEra, targetEra);
  return NextResponse.json({ equivalent });
} 