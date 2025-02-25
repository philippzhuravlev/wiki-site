// this file is used to get the equivalent region for a given region and era

import { getEquivalentRegion } from '@/lib/utils/era-utils';
import { NextResponse } from 'next/server';

// GET request handler
export async function GET(request: Request) {
  // {} notation = destructuring, i.e. new URL(request.url).searchParams
  const { searchParams } = new URL(request.url);
  const currentRegion = searchParams.get('currentRegion');
  const currentEra = searchParams.get('currentEra');
  const targetEra = searchParams.get('targetEra');

  // Check if all parameters are present
  if (!currentRegion || !currentEra || !targetEra) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // Get the equivalent region
  const equivalent = await getEquivalentRegion(currentRegion, currentEra, targetEra);
  return NextResponse.json({ equivalent });
} 