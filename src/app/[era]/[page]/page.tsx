import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { loadTextFile } from '@/lib/utils/file-utils';
import { renderWikiContent } from '@/lib/utils/render-utils';

interface PageProps {
  params: Promise<{ era: string; page: string }>;
}

interface RegionData {
  id: string;
  equivalents: Record<string, string>;
}

export default async function Page({ params }: PageProps) {
  const { era, page } = await params;
  
  try {
    // Load and validate metadata
    const metadataPath = path.join(process.cwd(), 'src', 'content', era, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const { regions } = JSON.parse(metadataContent);
    
    // Check if page exists in metadata
    const pageData = regions.find((r: RegionData) => r.id === page);
    if (!pageData) {
      notFound();
    }

    // Load the content file
    const content = await loadTextFile(`src/content/${era}/${page}.txt`);
    
    return (
      <div className="text-black">
        {await renderWikiContent(content)}
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    notFound();
  }
} 