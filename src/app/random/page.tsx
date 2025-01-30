import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

async function getAllPages(): Promise<Array<{ era: string; region: string }>> {
  const pages: Array<{ era: string; region: string }> = [];
  const eras = ['golden', 'steel', 'coal'];

  for (const era of eras) {
    try {
      // Read metadata for this era
      const metadataPath = path.join(process.cwd(), 'src', 'content', era, 'metadata.json');
      const metadataContent = await fs.readFile(metadataPath, 'utf8');
      const { regions } = JSON.parse(metadataContent);

      // Add each region from this era
      regions.forEach((region: { id: string }) => {
        pages.push({ era, region: region.id });
      });
    } catch (error) {
      console.error(`Error loading metadata for ${era}:`, error);
    }
  }

  return pages;
}

export default async function RandomPage() {
  const pages = await getAllPages();
  
  if (pages.length === 0) {
    redirect('/');
  }

  // Pick a random page
  const randomPage = pages[Math.floor(Math.random() * pages.length)];
  
  redirect(`/${randomPage.era}/${randomPage.region}`);
} 