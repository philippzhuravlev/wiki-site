import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

async function getAllPages(): Promise<Array<{ era: string; region: string }>> {
  const pages: Array<{ era: string; region: string }> = [];
  const eras = ['golden', 'steel', 'coal'];

  for (const era of eras) {
    try {
      const metadataPath = path.join(process.cwd(), 'src', 'content', era, 'metadata.json');
      const metadataContent = await fs.readFile(metadataPath, 'utf8');
      const { regions } = JSON.parse(metadataContent);

      regions.forEach((region: { id: string }) => {
        pages.push({ era, region: region.id });
      });
    } catch (error) {
      console.error(`Error loading metadata for ${era}:`, error);
    }
  }

  return pages;
}

export async function GET() {
  const pages = await getAllPages();
  
  if (pages.length === 0) {
    return NextResponse.json({ redirect: '/' });
  }

  const randomPage = pages[Math.floor(Math.random() * pages.length)];
  return NextResponse.json({ redirect: `/${randomPage.era}/${randomPage.region}` });
} 