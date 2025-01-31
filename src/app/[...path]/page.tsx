import { notFound } from 'next/navigation';
import { loadTextFile } from '@/lib/utils/file-utils';
import { renderWikiContent } from '@/lib/utils/render-utils';
import { getEquivalentRegion } from '@/lib/utils/era-utils';
import { promises as fs } from 'fs';
import * as pathLib from 'path';

interface PageProps {
  params: Promise<{ path: string[] }>;
}

const ERAS = ['golden', 'steel', 'coal'] as const;
type Era = typeof ERAS[number];

export default async function ContentPage({ params }: PageProps) {
  const { path } = await params;
  
  // Handle era routes
  if (ERAS.includes(path[0] as Era)) {
    const currentEra = path[0] as Era;

    if (path.length === 1) {
      // Era frontpage like /golden
      try {
        const content = await loadTextFile(`src/content/${currentEra}/frontpage.txt`);
        return (
          <div className="text-black">
            {await renderWikiContent(content)}
          </div>
        );
      } catch (error) {
        console.error('Error loading era frontpage:', error);
        notFound();
      }
    } else {
      // Era subpage like /golden/albrion
      const currentRegion = path[1];

      try {
        // Use consistent path format
        const metadataPath = pathLib.join(process.cwd(), 'src', 'content', currentEra, 'metadata.json');
        const metadataContent = await fs.readFile(metadataPath, 'utf8');
        const { regions } = JSON.parse(metadataContent);
        
        const regionExists = regions.some((r: { id: string }) => r.id === currentRegion);
        if (!regionExists) {
          notFound();
        }

        const content = await loadTextFile(`src/content/${currentEra}/${currentRegion}.txt`);
        return (
          <div className="text-black">
            {await renderWikiContent(content)}
          </div>
        );
      } catch (error) {
        console.error('Error loading era page:', error);
        notFound();
      }
    }
  }

  // Handle non-era routes like /about
  const pagePath = path.join(''); // Join the path array with empty separator
  try {
    const content = await loadTextFile(`src/content/${pagePath}.txt`);
    return (
      <div className="text-black">
        {await renderWikiContent(content)}
      </div>
    );
  } catch (error) {
    console.error('Error loading:', pagePath, error);
    notFound();
  }
} 